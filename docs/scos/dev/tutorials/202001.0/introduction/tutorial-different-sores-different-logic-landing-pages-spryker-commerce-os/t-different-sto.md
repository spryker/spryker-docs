---
title: Tutorial - Different Sores Different Logic - Landing Pages - Spryker Commerce OS
originalLink: https://documentation.spryker.com/v4/docs/t-different-stores-different-logic-landing-pages
redirect_from:
  - /v4/docs/t-different-stores-different-logic-landing-pages
  - /v4/docs/en/t-different-stores-different-logic-landing-pages
---

{% info_block infoBox %}
This tutorial is also available on the Spryker Training web-site. For more information and hands-on exercises, visit the [Spryker Training](https://training.spryker.com/courses/developer-bootcamp
{% endinfo_block %} web-site.)

## Challenge Description
Spryker supports a possibility of having multi-stores. Not just that, it also supports having different logic for different stores in a very elegant and simple way. 

Just extend the functionality for a specific store and postfix the module name with your store name. 

In this task, you will simply implement different home pages for the Backend Office for different stores.

{% info_block infoBox %}
You can use the same steps for any other logic in the shop.
{% endinfo_block %}

## Extend the DE Store
The fist thing to do is to override the current home page. There is a set of steps you need to follow in order to override the current homepage: 

1. Add a _Controller_ directory in the **Communication** layer of the Application module in Zed in `src/Pyz/Zed`.
2. Inside the added _Controller_ directory, extend the `IndexController` to return just a string when calling the `indexAction()`.

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

3. Check the [Backend Office](http://zed.de.suite.local/) to see the new message for the DE store.

## Add the New DEMO Store
The next thing to do is to add a new store and a new home page for it. 

1. Add a new store and call it **DEMO**. To do so, simply add a new array key to the store configuration file in `config/Shared/stores.php`.

```
$stores['DEMO'] = $stores['DE'];
```
2. Create a `config_default_DEMO.php` and a `config_default_development_DEMO.php`. You can copy other config files.
3. Add a new Zed module to `src/Pyz/Zed` and call it **ApplicationDEMO**. This naming is a convention in Spryker. 

{% info_block infoBox %}
To extend the logic for a specific shop, the module name should be `$moduleName$shopName`.
{% endinfo_block %}
4. Inside the new module, add a **Communication** layer directory and a **Controller** directory inside.
5. Then, add a new `IndexController` for the DEMO store.

{% info_block infoBox %}
The main difference between the `IndexController` in step 1 and this controller is the namespace, and of course the output.
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

6. The shop is ready to support both landing pages for both stores. What is left now is modifying the virtual machine to redirect you to the right store. Change the store in _Nginx_ config for zed:

    1. Copy `nginx` config for DE store with a new name `sudo cp /etc/nginx/sites-available/DE_development_zed /etc/nginx/sites-available/DEMO_development_zed`.
    2. Open the config file `sudo vim /etc/nginx/sites-available/DEMO_development_zed`.
    3. Change `$application_store` to DEMO.
    4. Change the `server_name` to `~^zed\\.demo\\..+\\.local$`.
    5. If you use devVM, add a new host to `/etc/hosts` with ip VM.
    6. Save the changes.

7. Restart _Nginx_ by running `sudo /etc/init.d/nginx restart`.
8. Finally, run `console data:import:store`. This command will create a store record in our `spy_store database` table. 

Check the [Backend Office](http://zed.de.suite.local/) again to see the new message for the DEMO store.

<!-- Last review date: Jul 18, 2018 by Hussam Hebbo, Anastasija Datsun -->
