---
title: UI components library
description: UI components library contains Angular components.
template: concept-topic-template
last_updated: Jan 12, 2024
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/ui-components-library/
  - /docs/scos/dev/front-end-development/202204.0/marketplace/ui-components-library/ui-components-library.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/ui-components-library/ui-components-library.html

related:
  - title: Actions
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/actions/ui-components-library-actions.html
  - title: Cache
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/cache/ui-components-library-cache-service.html
  - title: Data Transformers
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/data-transformers/data-transformers.html
  - title: Datasources
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/datasources/datasources.html
  - title: Persistence
    link: docs/dg/dev/frontend-development/page.version/marketplace/ui-components-library/persistence/persistence.html
---

Separate from Spryker Core, there is a set of UI Angular components that are distributed independently via npm. Each package can be installed via npm or yarn commands:

```bash
npm install @spryker/package_name
```

```bash
yarn add @spryker/package_name
```

Under the hood, the components are built using Angular 9, rxjs and Ant Design. These components are used in the core modules of the Merchant Portal. You can use them in the Angular ecosystem as default Angular components, or you can transform them into web components and reuse them in Spryker Twig modules. For more details about web components in Twig modules, see [Web Components](/docs/dg/dev/frontend-development/{{page.version}}/marketplace/web-components.html).

Many UI Components have extension points, and some of them must be configured on a project-level. For example, `Table` or `Datasource`.

## Available UI components

The following is a list of available UI components:

- @spryker/actions ([npm](https://www.npmjs.com/package/@spryker/actions))
  - @spryker/actions.close-drawer ([npm](https://www.npmjs.com/package/@spryker/actions.close-drawer), [story](https://spy-storybook.web.app/?path=/story/closedraweractionhandlerservice--primary))
  - @spryker/actions.drawer ([npm](https://www.npmjs.com/package/@spryker/actions.drawer), [story](https://spy-storybook.web.app/?path=/story/draweractionhandlerservice--primary))
  - @spryker/actions.http ([npm](https://www.npmjs.com/package/@spryker/actions.http), [story](https://spy-storybook.web.app/?path=/story/httpactionhandlerservice--primary))
  - @spryker/actions.notification ([npm](https://www.npmjs.com/package/@spryker/actions.notification), [story](https://spy-storybook.web.app/?path=/story/notificationactionhandlerservice--primary))
  - @spryker/actions.redirect ([npm](https://www.npmjs.com/package/@spryker/actions.redirect), [story](https://spy-storybook.web.app/?path=/story/redirectactionhandlerservice--primary))
  - @spryker/actions.refresh-drawer ([npm](https://www.npmjs.com/package/@spryker/actions.refresh-drawer), [story](https://spy-storybook.web.app/?path=/story/refreshdraweractionhandlerservice--primary))
  - @spryker/actions.refresh-parent-table ([npm](https://www.npmjs.com/package/@spryker/actions.refresh-parent-table), [story](https://spy-storybook.web.app/?path=/story/refreshparenttableactionhandlerservice--primary))
  - @spryker/actions.refresh-table ([npm](https://www.npmjs.com/package/@spryker/actions.refresh-table), [story](https://spy-storybook.web.app/?path=/story/refreshtableactionhandlerservice--primary))
- @spryker/ajax-action ([npm](https://www.npmjs.com/package/@spryker/ajax-action), [story](https://spy-storybook.web.app/?path=/story/ajaxactioncomponent--primary))
- @spryker/ajax-form ([npm](https://www.npmjs.com/package/@spryker/ajax-form), [story](https://spy-storybook.web.app/?path=/story/ajaxformcomponent--primary))
- @spryker/autocomplete ([npm](https://www.npmjs.com/package/@spryker/autocomplete), [story](https://spy-storybook.web.app/?path=/story/autocompletecomponent--primary))
- @spryker/button ([npm](https://www.npmjs.com/package/@spryker/button), stories: [core](https://spy-storybook.web.app/?path=/story/buttoncomponent--primary), [link](https://spy-storybook.web.app/?path=/story/buttonlinkcomponent--primary), [toggle](https://spy-storybook.web.app/?path=/story/buttontogglecomponent--primary), [ajax](https://spy-storybook.web.app/?path=/story/buttonajaxcomponent--primary))
- @spryker/button.action ([npm](https://www.npmjs.com/package/@spryker/button.action), [story](https://spy-storybook.web.app/?path=/story/buttonactioncomponent--primary))
- @spryker/button.icon ([npm](https://www.npmjs.com/package/@spryker/button.icon), [story](https://spy-storybook.web.app/?path=/story/buttoniconcomponent--primary))
- @spryker/cache ([npm](https://www.npmjs.com/package/@spryker/cache))
- @spryker/cache.static ([npm](https://www.npmjs.com/package/@spryker/cache.static))
- @spryker/card ([npm](https://www.npmjs.com/package/@spryker/card), [story](https://spy-storybook.web.app/?path=/story/cardcomponent--primary))
- @spryker/checkbox ([npm](https://www.npmjs.com/package/@spryker/checkbox), [story](https://spy-storybook.web.app/?path=/story/checkboxcomponent--primary))
- @spryker/chips ([npm](https://www.npmjs.com/package/@spryker/chips), [story](https://spy-storybook.web.app/?path=/story/chipscomponent--primary))
- @spryker/collapsible ([npm](https://www.npmjs.com/package/@spryker/collapsible), [story](https://spy-storybook.web.app/?path=/story/collapsiblecomponent--primary))
- @spryker/data-serializer ([npm](https://www.npmjs.com/package/@spryker/data-serializer))
- @spryker/data-transformer ([npm](https://www.npmjs.com/package/@spryker/data-transformer))
  - @spryker/data-transformer.array-map ([npm](https://www.npmjs.com/package/@spryker/data-transformer.array-map))
  - @spryker/data-transformer.chain ([npm](https://www.npmjs.com/package/@spryker/data-transformer.chain))
  - @spryker/data-transformer.collate ([npm](https://www.npmjs.com/package/@spryker/data-transformer.collate))
  - @spryker/data-transformer.configurator.table ([npm](https://www.npmjs.com/package/@spryker/data-transformer.configurator.table))
  - @spryker/data-transformer.date-parse ([npm](https://www.npmjs.com/package/@spryker/data-transformer.date-parse))
  - @spryker/data-transformer.date-serialize ([npm](https://www.npmjs.com/package/@spryker/data-transformer.date-serialize))
  - @spryker/data-transformer.filter.equals ([npm](https://www.npmjs.com/package/@spryker/data-transformer.filter.equals))
  - @spryker/data-transformer.filter.range ([npm](https://www.npmjs.com/package/@spryker/data-transformer.filter.range))
  - @spryker/data-transformer.filter.text ([npm](https://www.npmjs.com/package/@spryker/data-transformer.filter.text))
  - @spryker/data-transformer.lens ([npm](https://www.npmjs.com/package/@spryker/data-transformer.lens))
  - @spryker/data-transformer.object-map ([npm](https://www.npmjs.com/package/@spryker/data-transformer.object-map))
  - @spryker/data-transformer.pluck ([npm](https://www.npmjs.com/package/@spryker/data-transformer.pluck))
- @spryker/datasource ([npm](https://www.npmjs.com/package/@spryker/datasource))
  - @spryker/datasource.dependable ([npm](https://www.npmjs.com/package/@spryker/datasource.dependable), [story](https://spy-storybook.web.app/?path=/story/datasourcedependableservice--primary))
  - @spryker/datasource.http ([npm](https://www.npmjs.com/package/@spryker/datasource.http))
  - @spryker/datasource.inline ([npm](https://www.npmjs.com/package/@spryker/datasource.inline), [story](https://spy-storybook.web.app/?path=/story/datasourceinline--primary))
  - @spryker/datasource.inline.table ([npm](https://www.npmjs.com/package/@spryker/datasource.inline.table), [story](https://spy-storybook.web.app/?path=/story/tabledatasourceinlineservice--with-table))
  - @spryker/datasource.trigger ([npm](https://www.npmjs.com/package/@spryker/datasource.trigger))
  - @spryker/datasource.trigger.change ([npm](https://www.npmjs.com/package/@spryker/datasource.trigger.change), [story](https://spy-storybook.web.app/?path=/story/changedatasourcetriggerservice--primary))
  - @spryker/datasource.trigger.input ([npm](https://www.npmjs.com/package/@spryker/datasource.trigger.input), [story](https://spy-storybook.web.app/?path=/story/inputdatasourcetriggerservice--primary))
- @spryker/date-picker ([npm](https://www.npmjs.com/package/@spryker/date-picker), [story](https://spy-storybook.web.app/?path=/story/datepickercomponent--primary))
- @spryker/drawer ([npm](https://www.npmjs.com/package/@spryker/drawer), [story](https://spy-storybook.web.app/?path=/story/drawerscomponent--primary))
- @spryker/dropdown ([npm](https://www.npmjs.com/package/@spryker/dropdown), [story](https://spy-storybook.web.app/?path=/story/dropdowncomponent--primary))
- @spryker/form-item ([npm](https://www.npmjs.com/package/@spryker/form-item), [story](https://spy-storybook.web.app/?path=/story/formitemcomponent--primary))
- @spryker/grid ([npm](https://www.npmjs.com/package/@spryker/grid), [story](https://spy-storybook.web.app/?path=/story/gridcomponent--primary))
- @spryker/header ([npm](https://www.npmjs.com/package/@spryker/header), [story](https://spy-storybook.web.app/?path=/story/headercomponent--primary))
- @spryker/headline ([npm](https://www.npmjs.com/package/@spryker/headline), [story](https://spy-storybook.web.app/?path=/story/headlinecomponent--primary))
- @spryker/html-renderer ([npm](https://www.npmjs.com/package/@spryker/html-renderer), [story](https://spy-storybook.web.app/?path=/story/htmlrenderercomponent--with-static-html))
- @spryker/icon ([npm](https://www.npmjs.com/package/@spryker/icon), [story](https://spy-storybook.web.app/?path=/story/iconcomponent--all-icons))
- @spryker/input ([npm](https://www.npmjs.com/package/@spryker/input), [story](https://spy-storybook.web.app/?path=/story/inputcomponent--primary))
- @spryker/input.password ([npm](https://www.npmjs.com/package/@spryker/input.password), [story](https://spy-storybook.web.app/?path=/story/inputpasswordcomponent--primary))
- @spryker/interception ([npm](https://www.npmjs.com/package/@spryker/interception))
- @spryker/label ([npm](https://www.npmjs.com/package/@spryker/label), [story](https://spy-storybook.web.app/?path=/story/labelcomponent--primary))
- @spryker/layout ([npm](https://www.npmjs.com/package/@spryker/layout), [story](https://spy-storybook.web.app/?path=/story/layoutcomponent--primary))
- @spryker/link ([npm](https://www.npmjs.com/package/@spryker/link), [story](https://spy-storybook.web.app/?path=/story/linkcomponent--primary))
- @spryker/locale ([npm](https://www.npmjs.com/package/@spryker/locale), stories: [switcher](https://spy-storybook.web.app/?path=/story/localeswitchercomponent--primary), [modules](https://spy-storybook.web.app/?path=/story/localemodule--de))
- @spryker/logo ([npm](https://www.npmjs.com/package/@spryker/logo), [story](https://spy-storybook.web.app/?path=/story/logocomponent--primary))
- @spryker/modal ([npm](https://www.npmjs.com/package/@spryker/modal), [story](https://spy-storybook.web.app/?path=/story/modalcomponent--primary))
- @spryker/navigation ([npm](https://www.npmjs.com/package/@spryker/navigation), [story](https://spy-storybook.web.app/?path=/story/navigationcomponent--primary))
- @spryker/notification ([npm](https://www.npmjs.com/package/@spryker/notification), [story](https://spy-storybook.web.app/?path=/story/notificationcomponent--primary))
- @spryker/pagination ([npm](https://www.npmjs.com/package/@spryker/pagination), [story](https://spy-storybook.web.app/?path=/story/paginationcomponent--primary))
- @spryker/persistence ([npm](https://www.npmjs.com/package/@spryker/persistence))
- @spryker/popover ([npm](https://www.npmjs.com/package/@spryker/popover), [story](https://spy-storybook.web.app/?path=/story/popovercomponent--popover))
- @spryker/radio ([npm](https://www.npmjs.com/package/@spryker/radio), stories: [component](https://spy-storybook.web.app/?path=/story/radiocomponent--primary), [group](https://spy-storybook.web.app/?path=/story/radiogroupcomponent--primary))
- @spryker/select ([npm](https://www.npmjs.com/package/@spryker/select), [story](https://spy-storybook.web.app/?path=/story/selectcomponent--primary))
- @spryker/sidebar ([npm](https://www.npmjs.com/package/@spryker/sidebar), [story](https://spy-storybook.web.app/?path=/story/sidebarcomponent--primary))
- @spryker/spinner ([npm](https://www.npmjs.com/package/@spryker/spinner), [story](https://spy-storybook.web.app/?path=/story/spinnercomponent--primary))
- @spryker/styles ([npm](https://www.npmjs.com/package/@spryker/styles))
- @spryker/table ([npm](https://www.npmjs.com/package/@spryker/table), [story](https://spy-storybook.web.app/?path=/story/tablecomponent--primary))
  - @spryker/table.column.autocomplete ([npm](https://www.npmjs.com/package/@spryker/table.column.autocomplete), [story](https://spy-storybook.web.app/?path=/story/tablecolumnautocompletecomponent--primary))
  - @spryker/table.column.chip ([npm](https://www.npmjs.com/package/@spryker/table.column.chip), [story](https://spy-storybook.web.app/?path=/story/tablecolumnchipcomponent--primary))
  - @spryker/table.column.date ([npm](https://www.npmjs.com/package/@spryker/table.column.date), [story](https://spy-storybook.web.app/?path=/story/tablecolumndatecomponent--primary))
  - @spryker/table.column.dynamic ([npm](https://www.npmjs.com/package/@spryker/table.column.dynamic), [story](https://spy-storybook.web.app/?path=/story/tablecolumndynamiccomponent--primary))
  - @spryker/table.column.image ([npm](https://www.npmjs.com/package/@spryker/table.column.image), [story](https://spy-storybook.web.app/?path=/story/tablecolumnimagecomponent--primary))
  - @spryker/table.column.input ([npm](https://www.npmjs.com/package/@spryker/table.column.input), [story](https://spy-storybook.web.app/?path=/story/tablecolumninputcomponent--primary))
  - @spryker/table.column.select ([npm](https://www.npmjs.com/package/@spryker/table.column.select), [story](https://spy-storybook.web.app/?path=/story/tablecolumnselectcomponent--primary))
  - @spryker/table.column.text ([npm](https://www.npmjs.com/package/@spryker/table.column.text), [story](https://spy-storybook.web.app/?path=/story/tablecolumntextcomponent--primary))
  - @spryker/table.feature.batch-actions ([npm](https://www.npmjs.com/package/@spryker/table.feature.batch-actions), [story](https://spy-storybook.web.app/?path=/story/tablebatchactionsfeaturecomponent--via-html))
  - @spryker/table.feature.editable ([npm](https://www.npmjs.com/package/@spryker/table.feature.editable), [story](https://spy-storybook.web.app/?path=/story/tableeditablefeaturecomponent--via-html))
  - @spryker/table.feature.filters ([npm](https://www.npmjs.com/package/@spryker/table.feature.filters), [story](https://spy-storybook.web.app/?path=/story/tablefiltersfeaturecomponent--via-html))
  - @spryker/table.feature.pagination ([npm](https://www.npmjs.com/package/@spryker/table.feature.pagination), [story](https://spy-storybook.web.app/?path=/story/tablepaginationfeaturecomponent--via-html))
  - @spryker/table.feature.row-actions ([npm](https://www.npmjs.com/package/@spryker/table.feature.row-actions), [story](https://spy-storybook.web.app/?path=/story/tablerowactionsfeaturecomponent--via-html))
  - @spryker/table.feature.search ([npm](https://www.npmjs.com/package/@spryker/table.feature.search), [story](https://spy-storybook.web.app/?path=/story/tablesearchfeaturecomponent--via-html))
  - @spryker/table.feature.selectable ([npm](https://www.npmjs.com/package/@spryker/table.feature.selectable), [story](https://spy-storybook.web.app/?path=/story/tableselectablefeaturecomponent--via-html))
  - @spryker/table.feature.settings ([npm](https://www.npmjs.com/package/@spryker/table.feature.settings), [story](https://spy-storybook.web.app/?path=/story/tablesettingsfeaturecomponent--via-html))
  - @spryker/table.feature.sync-state ([npm](https://www.npmjs.com/package/@spryker/table.feature.sync-state), [story](https://spy-storybook.web.app/?path=/story/tablesyncstatefeaturecomponent--via-html))
  - @spryker/table.feature.title ([npm](https://www.npmjs.com/package/@spryker/table.feature.title), [story](https://spy-storybook.web.app/?path=/story/tabletitlefeaturecomponent--via-html))
  - @spryker/table.feature.total ([npm](https://www.npmjs.com/package/@spryker/table.feature.total), [story](https://spy-storybook.web.app/?path=/story/tabletotalfeaturecomponent--via-html))
  - @spryker/table.filter.date-range ([npm](https://www.npmjs.com/package/@spryker/table.filter.date-range), [story](https://spy-storybook.web.app/?path=/story/tablefilterdaterangecomponent--via-html))
  - @spryker/table.filter.select ([npm](https://www.npmjs.com/package/@spryker/table.filter.select), [story](https://spy-storybook.web.app/?path=/story/tablefiltersselectcomponent--via-html))
  - @spryker/table.filter.tree-select ([npm](https://www.npmjs.com/package/@spryker/table.filter.tree-select), [story](https://spy-storybook.web.app/?path=/story/tablefiltertreeselectcomponent--via-html))
- @spryker/tabs ([npm](https://www.npmjs.com/package/@spryker/tabs), [story](https://spy-storybook.web.app/?path=/story/tabscomponent--primary))
- @spryker/textarea ([npm](https://www.npmjs.com/package/@spryker/textarea), [story](https://spy-storybook.web.app/?path=/story/textareacomponent--primary))
- @spryker/toggle ([npm](https://www.npmjs.com/package/@spryker/toggle), [story](https://spy-storybook.web.app/?path=/story/togglecomponent--primary))
- @spryker/tree-select ([npm](https://www.npmjs.com/package/@spryker/tree-select), [story](https://spy-storybook.web.app/?path=/story/treeselectcomponent--primary))
- @spryker/unsaved-changes ([npm](https://www.npmjs.com/package/@spryker/unsaved-changes))
  - @spryker/unsaved-changes.guard.browser ([npm](https://www.npmjs.com/package/@spryker/unsaved-changes.guard.browser))
  - @spryker/unsaved-changes.guard.drawer ([npm](https://www.npmjs.com/package/@spryker/unsaved-changes.guard.drawer), [story](https://spy-storybook.web.app/?path=/story/unsavedchangesguarddrawer--primary))
  - @spryker/unsaved-changes.guard.navigation ([npm](https://www.npmjs.com/package/@spryker/unsaved-changes.guard.navigation), [story](https://spy-storybook.web.app/?path=/story/unsavedchangesguardnavigation--primary))
  - @spryker/unsaved-changes.monitor.form ([npm](https://www.npmjs.com/package/@spryker/unsaved-changes.monitor.form), [story](https://spy-storybook.web.app/?path=/story/unsavedchangesmonitorform--primary))
- @spryker/user-menu ([npm](https://www.npmjs.com/package/@spryker/user-menu), [story](https://spy-storybook.web.app/?path=/story/usermenucomponent--primary))
- @spryker/utils ([npm](https://www.npmjs.com/package/@spryker/utils))
- @spryker/utils.date.adapter.date-fns ([npm](https://www.npmjs.com/package/@spryker/utils.date.adapter.date-fns))
- @spryker/web-components ([npm](https://www.npmjs.com/package/@spryker/web-components))
