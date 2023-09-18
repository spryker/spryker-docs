

## Upgrading from version 1.4.0 to 1.5.0

In the version `1.5.0` of the `Chart` module, we have updated `plotly.js` dependency from version `1.54.5` to `2.26.0`.
We need to upgrade to the latest major to get the latest improvements, as well as performance in runtime and tooling.
You can find more details about the changes on the [Chart module release](https://github.com/spryker/chart/releases) page.


*Estimated migration time: 15 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `Chart` module to the new version:

```bash
composer update spryker/chart:"^1.5.0" --update-with-dependencies
```

2. `1.5.0` module version requires update `@spryker/oryx-for-zed` dependency to the `3.1`+ version and `webpack` dependency to the `5.88`+ version at the project level. 
In the root `package.json` file, update dependencies to the following versions or higher:

```json
{
    "@spryker/oryx-for-zed": "^3.1.0",
    "webpack": "^5.88.2"
}
```

3. Run and build the Backoffice frontend:

```bash
docker/sdk cli npm install
docker/sdk up --assets
```

Or

```bash
npm install && npm run zed
```
