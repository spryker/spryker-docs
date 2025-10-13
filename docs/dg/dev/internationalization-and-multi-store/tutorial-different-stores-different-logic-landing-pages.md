---
title: "Tutorial: Different stores, different logic - landing pages"
description: The tutorial describes how you can extend the functionality to set up different home pages per specific stores.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-different-stores-different-logic-landing-pages
originalArticleId: d40e7b5d-eb47-4ab4-a51d-2e14b18dc22b
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-different-stores-different-logic-landing-pages-spryker-commerce-os.html
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-different-sores-different-logic-landing-pages-spryker-commerce-os.html
---

{% info_block infoBox %}

This tutorial is also available on the Spryker Training website. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp) website.

{% endinfo_block %}

## Challenge description

Spryker lets you have multi-stores and different logic for different stores in a very elegant and simple way.

Just extend the functionality for a specific store and postfix the module name with your store name.

This tutorial shows how to implement different home pages for the Back Office for different stores.

{% info_block infoBox %}

You can use the same steps for any other logic in the shop.

{% endinfo_block %}

## Extend the DE store

Override the current home page. There is a set of steps you need to follow to override the current homepage:

1. In the `Communication` layer of the `Application` module, in Zed, in `src/Pyz/Zed`, add the `Controller` directory.
2. Inside `Controller`, extend `IndexController` to return just a string when calling `indexAction()`.

```php
namespace Pyz\Zed\Application\Communication\Controller;

use Spryker\Zed\Application\Communication\Controller\IndexController as SprykerIndexController;

class IndexController extends SprykerIndexController
{
	/**
	 * @return string
	 */
	public function indexAction()
	{
		return 'Hello DE Store!';
	}
}
```

3. Check the Backend Office (`https://zed.mysprykershop.com/`) to see the new message for the DE store.

## Add the new DEMO store

Add a new store and a new home page for it.

1. Add a new store and call it `DEMO` by adding a new array key to the store configuration file in `config/Shared/stores.php`.

```php
$stores['DEMO'] = $stores['DE'];
```

2. Create `config_default_DEMO.php` and `config_default_development_DEMO.php`. You can copy other config files.
3. Add a new Zed module to `src/Pyz/Zed` and call it `ApplicationDEMO`. This naming is a convention in Spryker.

{% info_block infoBox %}

To extend the logic for a specific shop, the module name must be `$moduleName$shopName`.

{% endinfo_block %}

4. Inside the new module, add a `Communication` layer directory with a `Controller` directory inside.
5. Add a new `IndexController` for the DEMO store.

{% info_block infoBox %}

The main difference between `IndexController` in step 1 and this controller is the namespace and the output.

{% endinfo_block %}

```php
namespace Pyz\Zed\ApplicationDEMO\Communication\Controller;

use Spryker\Zed\Kernel\Communication\Controller\AbstractController;

class IndexController extends AbstractController
{
	/**
	 * @return string
	 */
	public function indexAction()
	{
		return 'Hello DEMO Store!!!';
	}
}
```

1. The shop is ready to support both landing pages for both stores. Modify the virtual machine to redirect you to the right store. For this, change the store in the `nginx` config for Zed:

    1. Copy the `nginx` config for DE store with a new name `sudo cp /etc/nginx/sites-available/DE_development_zed /etc/nginx/sites-available/DEMO_development_zed`.
    2. Open the config file `sudo vim /etc/nginx/sites-available/DEMO_development_zed`.
    3. Change `$application_store` to `DEMO`.
    4. Change `server_name` to `~^zed\\.demo\\..+\\.local$`.
    5. If you use dev VM, add a new host to `/etc/hosts` with IP VM.
    6. Save the changes.

2. Restart Nginx by running `sudo /etc/init.d/nginx restart`.
3. Create a store record in your `spy_store database` table:

```bash
console data:import:store
```

To see the new message for the DEMO store, heck the Backend Office (`https://zed.mysprykershop.com/`) again.

<!-- Last review date: Jul 18, 2018 by Hussam Hebbo, Anastasija Datsun -->
