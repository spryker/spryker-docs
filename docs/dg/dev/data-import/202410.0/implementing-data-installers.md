---
title: Implementing data installers
description: Use the guide to extend the Importer module and import customer data using a .CSV file
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-customer-import
originalArticleId: 3745e837-5a33-4131-9cd2-fbc625020e8d
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-customer-import.html
---

This document describes how to extend the `Installer` module.

Customer data is used as an example; you can implement installers for any data.

## Implement the customer installer

Create `src/Pyz/Zed/Customer/Business/Installer/CustomerInstaller`:

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
        $customerInstallData = []; //prepare customer data
        foreach ($customerInstallData as $customerData) {
            $customerTransfer = new CustomerTransfer();
            $customerTransfer->fromArray($customerData);
            $this->customerWriter->add($customerTransfer);
        }
    }
}
```

**Interface**

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

## Add a method to facade

1. To add the method that calls the customer installer, override the facade by creating `Pyz\Zed\Customer\Business\CustomerFacade`:

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

2. Override `CustomerBusinessFactory` and `CustomerConfig`:

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

## Create the installer plugin

Create the `CustomerInstallerPlugin` installer plugin which implements `InstallerPluginInterface` under  `Pyz\Zed\Customer\Communication\Plugin\Installer`:

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

## Register the new data installer plugin

Register the data installer plugin in `InstallerDependencyProvider`:

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

## Run the data installer

To test the customer data installer, run the data installer from the command line:

```bash
vendor/bin/console setup:init-db
```

That's it! The new customer data installer is up and running.
