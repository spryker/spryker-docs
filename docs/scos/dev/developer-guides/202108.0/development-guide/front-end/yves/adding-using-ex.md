---
title: Adding and Using External Libraries in Yves
originalLink: https://documentation.spryker.com/2021080/docs/adding-using-external-libraries-yves
redirect_from:
  - /2021080/docs/adding-using-external-libraries-yves
  - /2021080/docs/en/adding-using-external-libraries-yves
---

## Adding and Using External Library in Your Project via npm

To install library and add it to dependencies, run the following command:

```bash
npm i name-of-library
```

Now, you can use it in any component:

**name-of-your-component.ts**
    
```php
import Component from 'ShopUi/models/component';
import nameOfLibrary from 'name-of-library';
 
export default class NameOfYourComponent extends Component {
	protected connectedCallback(): void {
		nameOfLibrary.someMethod();
	}
}
```

You can also import SCSS, CSS:

**index.ts**    
    
```typescript
import 'name-of-library/path-to-the-styles/name-of-file.scss';
```
    
If you need to make sure that DOM is ready, use this instead of `connectedCallback`:

**name-of-your-component.ts**
    
```typescript
import Component from 'ShopUi/models/component';
import nameOfLibrary from 'name-of-library';
 
export default class NameOfYourComponent extends Component {
	protected mountCallback(): void {
		nameOfLibrary.someMethod();
	}
}
```

Also, you can come across an old method `readyCallback()`, which is deprecated.

If the library does not export anything, you can import a module for its side effects only:

**name-of-your-component.ts**
    
```typescript
import Component from 'ShopUi/models/component';
import 'name-of-library/path-to-the-styles/name-of-file.js';
 
export default class NameOfYourComponent extends Component {
	protected mountCallback(): void {
		window.someLibraryMethod();
	}
}
```

If you need some images or fonts from a library separately, copy them to `frontend/assets/images` or `frontend/assets/fonts` and use them after that.

## Adding and Using External Library in Your Project Without npm
If a library has source on CDN, use a molecule `script-loader` to load the library:

**name-of-your-component.twig**
    
```twig
{% raw %}{%{% endraw %} include molecule('script-loader') with {
	attributes: {
		src: 'https://url-to-the-lib/name-of-file.js',
		},
} only {% raw %}%}{% endraw %}
```

If you have just a source of the library, you need to add it into your component and use it by relative path:

**name-of-your-component.ts**
    
```twig
import Component from 'ShopUi/models/component';
import nameOfLibrary from './name-of-library';
 
export default class NameOfYourComponent extends Component {
	protected connectedCallback(): void {
		nameOfLibrary.someMethod();
	}
}
```
