---
title: Using database transactions
description: Use the guide to understand how to handle database transactions within your Spryker based projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-database-transactions
originalArticleId: a9cf7e3b-bf1d-4e27-9614-478a6dcc5204
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-database-transaction-handling.html
---

{% info_block warningBox %}

To reduce boilerplate code and properly handle database transactions you can use `Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait`.

{% endinfo_block %}

To use database transactions in the `DatabaseTransactionHandlingExample` class:

```php
<?php

use Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait;

class DatabaseTransactionHandlingExample
{

    use TransactionTrait;

    /**
     * @param string $fooName
     * @param \Bar[] $barCollection
     *
     * @return \Foo
     */
    public function createFoo($fooName, array $barCollection)
    {
        return $this->getTransactionHandler()->handleTransaction(function () use ($fooName, $barCollection) {
            return $this->executeCreateFooTransaction($fooName, $barCollection);
        });
    }

    /**
     * @param string $fooName
     * @param \Bar[] $barCollection
     *
     * @return \Foo
     */
    protected function executeCreateFooTransaction($fooName, array $barCollection)
    {
        $fooEntity = new Foo();
        $fooEntity->setFooName($fooName);
        $fooEntity->save();

        foreach ($barCollection as $bar) {
            $bar->setFkFoo($fooEntity->getIdFoo());
            $bar->save();
        }

        return $fooEntity;
    }

}
```

In case of any error, the transaction will be rolled back and an exception will be re-thrown. The code only has one method. The `$connection` parameter is optional and if not specified `Propel::getConnection()` will be used.

```php
<?php

    /**
     * @param \Closure $callback
     *
     * @throws \Exception
     * @throws \Throwable
     *
     * @return mixed
     */
    public function handleTransaction(Closure $callback)
    {
        if (!$this->connection) {
            $this->connection = Propel::getConnection();
        }

        $this->connection->beginTransaction();

        try {
            $result = $callback();

            $this->connection->commit();

            return $result;
        } catch (Exception $exception) {
            $this->connection->rollBack();
            throw $exception;
        } catch (Throwable $exception) {
            $this->connection->rollBack();
            throw $exception;
        }
    }
```
