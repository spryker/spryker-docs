## Upgrading from version 1.5.0 to version 1.6.1

In version 1.6.1 of the Chart module, we  updated the dev dependencies with Node.js polyfills. For more details about the changes, see the [Chart module release page](https://github.com/spryker/chart/releases).

*Estimated migration time: 15 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the Chart module using Composer:

```bash
composer update spryker/chart:"^1.6.1" --update-with-dependencies
```

2. On the project level, update the the `@spryker/oryx-for-zed` dependency to version 3.3 or higher:

```json
{
    "@spryker/oryx-for-zed": "^3.3.0"
}
```

3. Run and build the Back Office frontend:

```bash
docker/sdk cli npm install
docker/sdk up --assets
```

## Upgrading from version 1.4.0 to version 1.5.0

In version 1.5.0 of the Chart module, we've updated the `plotly.js` dependency from version 1.54.5 to 2.26.0. For more details about the changes, see the [Chart module release page](https://github.com/spryker/chart/releases).

Upgrade to the latest major version to incorporate the latest improvements and optimize both runtime and processing performance.


*Estimated migration time: 15 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the Chart module to the new version:

```bash
composer update spryker/chart:"^1.5.0" --update-with-dependencies
```

2. The 1.5.0 module version requires an update of the `@spryker/oryx-for-zed` dependency to version 3.1 or later, as well as an update of the `webpack` dependency to version 5.88 or later at the project level.
To perform the updates, in the root `package.json` file, update the dependencies to the following versions or newer:

```json
{
    "@spryker/oryx-for-zed": "^3.1.0",
    "webpack": "^5.88.2"
}
```

3. Run and build the Back Office frontend:

```bash
docker/sdk cli npm install
docker/sdk up --assets
```

or

```bash
npm install && npm run zed
```
