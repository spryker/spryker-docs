

## Upgrading from version 1.* to version 2.*

In version 2, validity dates allow presetting date boundaries for each navigation node to control their own and their descendants visibility.

- Upgrade `Navigation` module to at least 2.0.0 version. See [Upgrade the Navigation module](/docs/pbc/all/content-management-system/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-navigation-module.html) to learn how to migrate the `Navigation` module.
- Update the `NavigationGui` module to at least 2.0.0 version in your `composer.json`.
- Make sure the new Zed user interface assets are built by running `npm run zed` (or `antelope build zed` for older versions).

Now, validity dates will be stored in Storage.

To apply validity dates on navigation node display, take a look on Install the Navigation feature.
