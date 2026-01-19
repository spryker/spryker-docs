---
title: Extend Composable UI with custom Angular modules
description: Learn how to extend Composable UI with custom Angular components and modules for advanced use cases.
template: howto-guide-template
related:
  - title: Composable UI overview
    link: docs/dg/dev/backend-development/composable-ui/composable-ui.html
  - title: Entity configuration reference
    link: docs/dg/dev/backend-development/composable-ui/entity-configuration-reference.html
---

This document describes how to extend Composable UI with custom Angular components when the standard configuration-driven approach doesn't meet your requirements.

## When to extend

Consider custom Angular development when you need:

- Complex UI interactions not supported by standard components
- Custom visualizations (charts, graphs, maps)
- Integration with third-party JavaScript libraries
- Highly specialized business logic in the UI

{% info_block warningBox "Consider alternatives first" %}

Before creating custom components, verify that the requirement cannot be met using:
- Standard component configuration options
- Component composition with slots
- Custom CSS styling

{% endinfo_block %}

## Falcon UI architecture

Composable UI uses Falcon UI, an Angular-based SPA that renders configuration-driven components. Understanding its architecture helps when extending.

### Directory structure

```text
src/SprykerFeature/FalconUi/src/SprykerFeature/Zed/FalconUi/Presentation/Application/
├── app/
│   ├── core/                    # Core services and utilities
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── services/            # Shared services
│   │   └── table-filters/       # Custom table filter components
│   ├── modules/                 # Feature modules
│   └── ui-lib-internal-extends/ # Component extensions
├── main.ts                      # Application bootstrap
├── styles.less                  # Global styles
└── angular.json                 # Angular configuration
```

### Key concepts

- **Component Builder**: Renders components based on YAML configuration
- **Dynamic Forms**: Form generation from configuration
- **Table Module**: Data tables with filtering, pagination, and actions
- **Interceptors**: Handle authentication and error responses

## Creating a custom component

### Step 1: Create the component

Create a new component in the appropriate directory:

```typescript
// app/custom-components/my-chart/my-chart.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'falcon-my-chart',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="my-chart-container">
            <canvas #chartCanvas></canvas>
        </div>
    `,
    styles: [`
        .my-chart-container {
            width: 100%;
            height: 300px;
        }
    `]
})
export class MyChartComponent implements OnInit {
    @Input() config?: {
        type: string;
        dataUrl: string;
        options?: Record<string, unknown>;
    };

    ngOnInit(): void {
        if (this.config?.dataUrl) {
            this.loadChartData();
        }
    }

    private loadChartData(): void {
        // Implement chart data loading and rendering
    }
}
```

### Step 2: Register the component

Register your component with the Component Builder:

```typescript
// app/modules/custom-components.module.ts
import { NgModule } from '@angular/core';
import { MyChartComponent } from '../custom-components/my-chart/my-chart.component';

// Register with component builder
export const CUSTOM_COMPONENTS = {
    'MyChartComponent': MyChartComponent,
};

@NgModule({
    imports: [MyChartComponent],
    exports: [MyChartComponent],
})
export class CustomComponentsModule { }
```

### Step 3: Use in configuration

Reference your custom component in entity YAML:

```yaml
view:
    components:
        chart.sales.overview:
            component: MyChartComponent
            inputs:
                config:
                    type: 'line'
                    dataUrl: '/api/sales/statistics'
                    options:
                        showLegend: true
```

## Creating a custom table filter

### Step 1: Create the filter component

```typescript
// app/core/table-filters/table-filter-custom.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterComponent, TableFilterBase } from '@spryker/table.feature.filters';

export interface TableFilterCustom extends TableFilterBase<string> {
    type: 'custom';
    typeOptions: {
        placeholder?: string;
        // Add custom options
    };
}

@Component({
    selector: 'falcon-table-filter-custom',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="custom-filter">
            <!-- Custom filter UI -->
            <input
                [value]="filterValue"
                [placeholder]="config?.typeOptions?.placeholder"
                (input)="onValueChange($event)"
            />
        </div>
    `,
})
export class TableFilterCustomComponent implements TableFilterComponent<TableFilterCustom> {
    @Input() config?: TableFilterCustom;
    @Input() value?: string;
    @Output() valueChange = new EventEmitter<string>();

    filterValue: string = '';

    ngOnInit(): void {
        this.filterValue = this.value || '';
    }

    onValueChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.filterValue = value;
        this.valueChange.emit(value);
    }
}
```

### Step 2: Register the filter

Add the filter to the table module configuration:

```typescript
// app/modules/table.module.ts
import { TableFilterCustomComponent } from '../core/table-filters/table-filter-custom.component';

// In the module configuration
TableFiltersFeatureModule.withFilterComponents({
    select: TableFilterSelectComponent,
    'date-range': TableFilterDateRangeComponent,
    'custom': TableFilterCustomComponent,  // Add custom filter
}),
```

### Step 3: Use in configuration

```yaml
table.entity.list:
    component: TableComponent
    dataSource:
        url: '/entities'
    filters:
        - id: 'myField'
          title: 'My Filter'
          type: 'custom'
          placeholder: 'Enter value...'
```

## Creating a custom form control

### Step 1: Create the control component

```typescript
// app/core/dynamic-forms/reactive-controls/color-picker/color-picker.component.ts
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'falcon-color-picker',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="color-picker">
            <input
                type="color"
                [value]="value"
                (input)="onColorChange($event)"
                [disabled]="disabled"
            />
            <span class="color-value">{{ value }}</span>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent),
            multi: true,
        },
    ],
})
export class ColorPickerComponent implements ControlValueAccessor {
    value: string = '#000000';
    disabled: boolean = false;

    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(value: string): void {
        this.value = value || '#000000';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onColorChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
        this.onTouched();
    }
}
```

### Step 2: Register the control

Register with the dynamic forms system to use in YAML configuration.

### Step 3: Use in configuration

```yaml
field.product.color:
    name: 'color'
    controlType: 'color-picker'
    label: 'Product Color'
```

## Extending existing components

### Override component behavior

Create an extended version of an existing component:

```typescript
// app/ui-lib-internal-extends/extended-table.component.ts
import { Component } from '@angular/core';
import { TableComponent } from '@spryker/table';

@Component({
    selector: 'falcon-extended-table',
    template: `
        <!-- Extended template with additional features -->
        <div class="table-toolbar">
            <button (click)="exportData()">Export</button>
        </div>
        <spy-table [config]="config"></spy-table>
    `,
})
export class ExtendedTableComponent extends TableComponent {
    exportData(): void {
        // Custom export functionality
    }
}
```

## Building and deploying

### Development build

```bash
npm run falcon:build
```

### Production build

```bash
npm run falcon:build:production
```

### Watch mode for development

```bash
npm run falcon:build:watch
```

## Best practices

### 1. Follow Angular conventions

- Use standalone components when possible
- Implement proper change detection strategies
- Handle component lifecycle correctly

### 2. Maintain compatibility

- Ensure custom components work with the Component Builder
- Follow the same input/output patterns as standard components
- Test with different configuration scenarios

### 3. Keep components focused

- Each component should have a single responsibility
- Extract reusable logic into services
- Use composition over inheritance

### 4. Document custom components

- Add JSDoc comments to component inputs
- Create usage examples in configuration
- Document any limitations or requirements

### 5. Test thoroughly

- Write unit tests for custom components
- Test integration with the Component Builder
- Verify behavior with different configurations

## Troubleshooting

### Component not rendering

1. Verify the component is registered correctly
2. Check the browser console for errors
3. Verify the component selector matches the configuration

### Inputs not received

1. Check that `@Input()` decorators are present
2. Verify input names match the configuration
3. Check for typos in the YAML configuration

### Styles not applied

1. Verify styles are included in the component
2. Check for CSS specificity issues
3. Use `::ng-deep` carefully for child component styling
