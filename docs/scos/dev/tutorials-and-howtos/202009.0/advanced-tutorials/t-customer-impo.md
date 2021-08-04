---
title: Tutorial - Customer Import
originalLink: https://documentation.spryker.com/v6/docs/t-customer-import
redirect_from:
  - /v6/docs/t-customer-import
  - /v6/docs/en/t-customer-import
---

<!--used to be: http://spryker.github.io/tutorials/zed/import-customers/-->
This tutorial describes the steps you need to follow to extend the `Installer` module functionality.

In this example, we’ll import customer data; of course you can update the code in this tutorial to fit your need.

## Implementing Customer Installer
Create the `CustomerInstaller` class under the `src/Pyz/Zed/Customer/Business/Installer/` folder.

Place the following code in the `CustomerInstaller` class:

**Code sample:**
    
```php
<?php

namespace Pyz\Zed\Customer\Business\Installer;

use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Zed\Customer\CustomerConfig;
use Spryker\Zed\Customer\Business\Customer\CustomerInterface;
use Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait;

class CustomerInstaller implements CustomerInstallerInterface
{
    use TransactionTrait;

    /**
     * @var \Pyz\Zed\Customer\CustomerConfig
     */
    protected $customerConfig;
    /**
     * @var \Spryker\Zed\Customer\Business\Customer\CustomerInterface
     */
    protected $customerWriter;

    /**
     * CustomerInstaller constructor.
     *
     * @param \Spryker\Zed\Customer\Business\Customer\CustomerInterface $customerWriter
     * @param \Pyz\Zed\Customer\CustomerConfig $customerConfig
     */
    public function __construct(
        CustomerInterface $customerWriter,
        CustomerConfig $customerConfig
    )
    {
        $this->customerConfig = $customerConfig;
        $this->customerWriter = $customerWriter;
    }

    /**
     * @return void
     */
    public function install(): void
    {
        $this->getTransactionHandler()->handleTransaction(function () {
            $this->executeInstallTransaction();
        });
    }

    /**
     * @return void
     */
    protected function executeInstallTransaction(): void
    {
        $сustomerInstallData = []; //prepare customer data
        foreach ($сustomerInstallData as $customerData) {
            $customerTransfer = new CustomerTransfer();
            $customerTransfer->fromArray($customerData);
            $this->customerWriter->add($customerTransfer);
        }
    }
}
```

**Interface:**

```php
<?php

namespace Pyz\Zed\Customer\Business\Installer;

interface CustomerInstallerInterface
{
    /**
     * @return void
     */
    public function install(): void;
}
```

## Adding a method to Facade
In the `CustomerFacade`, add a method that calls a new customer installer.

To override the facade, create `CustomerFacade` under the `Pyz\Zed\Customer\Business` folder:

```php
<?php

namespace Pyz\Zed\Customer\Business;

use Spryker\Zed\Customer\Business\CustomerFacade as SprykerCustomerFacade;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerBusinessFactory getFactory()
 */
class CustomerFacade extends SprykerCustomerFacade
{
    public function installCustomer(): void
    {
        $this->getFactory()
            ->createCustomerInstaller()
            ->install();
    }
}
```

Also, you need to override `CustomerBusinessFactory` and `CustomerConfig`:

```php
<?php

namespace Pyz\Zed\Customer\Business;

use Pyz\Zed\Customer\Business\Installer\CustomerInstaller;
use Pyz\Zed\Customer\Business\Installer\CustomerInstallerInterface;
use Spryker\Zed\Customer\Business\CustomerBusinessFactory as SprykerCustomerBusinessFactory;

/**
 * @method \Spryker\Zed\Customer\Persistence\CustomerEntityManagerInterface getFacade()
 * @method \Pyz\Zed\Customer\CustomerConfig getConfig()
 */
class CustomerBusinessFactory extends SprykerCustomerBusinessFactory
{
    /**
     * @return \Pyz\Zed\Customer\Business\Installer\CustomerInstallerInterface
     */
    public function createCustomerInstaller(): CustomerInstallerInterface
    {
        return new CustomerInstaller(
            $this->createCustomer(),
            $this->getConfig()
        );
    }
}
```

## Creating the Installer plugin
Create the `CustomerInstallerPlugin` installer plugin  which implements `InstallerPluginInterface` under  `Pyz\Zed\Customer\Communication\Plugin\Installer`:

```php
<?php

namespace Pyz\Zed\Customer\Communication\Plugin\Installer;

use Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerFacade getFacade()
 */
class CustomerInstallerPlugin extends AbstractPlugin implements InstallerPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return void
     */
    public function install(): void
    {
        $this->getFacade()->installCustomer();
    }
}
```

## Registering the New Data Installer Plugin
Now, we’re almost ready to test the new data installer; we just need to register it in `InstallerDependencyProvider`:

```php
<?php
...
   /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            ...
            new CustomerInstallerPlugin(),
        ];
    }
...
```
To test the customer data installer, run the data install from the command line:

```bash
vendor/bin/console setup:init-db
```
