---
title: Adding and Using External Libraries in Yves
originalLink: https://documentation.spryker.com/v1/docs/adding-using-external-libraries-yves
redirect_from:
  - /v1/docs/adding-using-external-libraries-yves
  - /v1/docs/en/adding-using-external-libraries-yves
---

## Adding and Using External Library in Your Project via npm

To install library and add it to dependencies, run the following command:

```bash
npm i name-of-library
```

Now, you can use it in any component:

<details open>
<suammry>name-of-your-component.ts</summary>
    
```php
import Component from 'ShopUi/models/component';
import nameOfLibrary from 'name-of-library';
 
export default class NameOfYourComponent extends Component {
	protected connectedCallback(): void {
		nameOfLibrary.someMethod();
	}
}
```
    
</br>
</details>

You can also import SCSS, CSS:

<details open>
<summary>index.ts</summary>
    
    
```typescript
import 'name-of-library/path-to-the-styles/name-of-file.scss';
```
   
</br>
</details>
    
If you need to make sure that DOM is ready, use this instead of `connectedCallback`:

<details open>
<summary>name-of-your-component.ts</summary>
    
```typescript
import Component from 'ShopUi/models/component';
import nameOfLibrary from 'name-of-library';
 
export default class NameOfYourComponent extends Component {
	protected mountCallback(): void {
		nameOfLibrary.someMethod();
	}
}
```
    
</br>
</details>

Also, you can come across an old method `readyCallback()`, which is deprecated.

If the library does not export anything, you can import a module for its side effects only:

<details open>
<summary>name-of-your-component.ts</summary>
    
```typescript
import Component from 'ShopUi/models/component';
import 'name-of-library/path-to-the-styles/name-of-file.js';
 
export default class NameOfYourComponent extends Component {
	protected mountCallback(): void {
		window.someLibraryMethod();
	}
}
```
    
</br>
</details>

If you need some images or fonts from a library separately, copy them to `frontend/assets/images` or `frontend/assets/fonts` and use them after that.

## Adding and Using External Library in Your Project Without npm
If a library has source on CDN, use a molecule `script-loader` to load the library:

<details open>
<summary>name-of-your-component.twig</summary>
    
```twig
{% raw %}{%{% endraw %} include molecule('script-loader') with {
	attributes: {
		src: 'https://url-to-the-lib/name-of-file.js',
		},
} only {% raw %}%}{% endraw %}
```
    
</br>
</details>

If you have just a source of the library, you need to add it into your component and use it by relative path:

<details open>
<summary>name-of-your-component.ts</summary>
    
```twig
import Component from 'ShopUi/models/component';
import nameOfLibrary from './name-of-library';
 
export default class NameOfYourComponent extends Component {
	protected connectedCallback(): void {
		nameOfLibrary.someMethod();
	}
}
```
    
</br>
</details>
