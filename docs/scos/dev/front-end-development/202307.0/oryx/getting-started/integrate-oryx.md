Oryx was implemented with thoughts about integration into another frontend Frameworks. 
So it can be relatively easily done with the next steps: 


1. First of all Oryx dependencies have to be added into `package.json`:

```json
{
  ...
  "dependencies": {
    "@spryker-oryx/presets": "^1.0.0",
    "@spryker-oryx/themes": "^1.0.0"
  },
  ...
}
```

There are two main packages that are required for Oryx to work properly: `@spryker-oryx/presets` and `@spryker-oryx/themes`. `presets` contains typical feature sets and `themes` provides a set of themes that can be used with Oryx.
More information about packages can be found in [Oryx packages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-packages.html) and specifically about [presets](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-presets.html).

2. Make sure you are using `nodenext` or `node16` Module resolution in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node16"
  }
}
```

It's necessary to be able to export components and other stuff from Oryx packages from sub-packages with difficult path (ex. @spryker-oryx/ui/button). 

3. Add all necessary env variables:

```
SCOS_BASE_URL=https://glue.de.faas-suite-prod.cloud.spryker.toys
ORYX_FEATURE_VERSION=latest
```

The only required variable is `SCOS_BASE_URL` that is used to fetch data from Glue API. `ORYX_FEATURE_VERSION` is used to opt-in specific version of Oryx features. 

4. Setup Oryx builder:

```ts
export const app = appBuilder()
    .withFeature(storefrontFeatures)
    .withTheme(storefrontTheme)
    .withAppOptions({ components: { root: 'body' } })
    .withEnvironment(import.meta.env)
    .create();
```

Here you can find an example of possible configuration to build Oryx application.

{% info_block warningBox %}
There are additinal steps can be required to integrate Oryx into your application. For example, you can need to add a new route to your router. Or adjust your webpack configuration. But it all depends on specific setup and technologies that you are using.
{% endinfo_block %}