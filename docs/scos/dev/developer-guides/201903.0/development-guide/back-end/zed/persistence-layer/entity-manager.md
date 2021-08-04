---
title: Entity Manager
originalLink: https://documentation.spryker.com/v2/docs/entity-manager
redirect_from:
  - /v2/docs/entity-manager
  - /v2/docs/en/entity-manager
---

From Kernel version 3.2, it is possible to create an entity manager class in your persistence layer. It will be responsible for saving, updating, and deleting data. Using the class, you can separate data from persistence details (Propel).

It is important not to overuse the entity manager or repository for your logic. These two concepts should only be used for data persistence in entities. Combination of multiple calls and the entire logic should be done in the business layer by delegating calls to corresponding entities/repositories to keep the persistence layer separated from the business layer.

As an example on using an entity manager, see the [Company module](https://github.com/spryker/company).

## Entity Transfers

With the Publish and Synchronize feature, we have added a new transfer generation for `EntityTransfers`. The `EntityTransfers` are a direct representation of SQL tables. `EntityTransfer` has all properties, and relations defined and holds FQCN to the Propel entity it is mapped to. This FQCN is used when mapping the entity as the data is persisted. 

## AbstractEntityManager Class

Abstract entity manager has one public helper method `save()` to save the `EntityTransfer` trees. If you call `$this->save(SpyBlogEntityTransfer)` on your module, `EntityManager` will try to save the whole tree in a single transaction, and you will get another transfer back with primary foreign keys populated.

**Example:**

```php
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
* @method \Spryker\Zed\Blog\Persistence\BlogPersistenceFactory getFactory()
*/
class BlogEntityManager extends AbstractEntityManager implements BlogEntityManagerInterface, EntityManagerInterface
{
    /**
    *
    * @api
    *
    * @param \Generated\Shared\Transfer\SpyBlogEntityTransfer $blogEntityTransfer
    *
    * @return \Generated\Shared\Transfer\SpyBlogEntityTransfer
    */
    public function saveBlog(SpyBlogEntityTransfer $blogEntityTransfer)
    {
      return $this->save($blogEntityTransfer);
    }
}
    	
```

It's a good practice to include a saver method for each saved entity, even if it can be automatically mapped, as this way, you define contracts.

Deletion would be done the same way you normally do with Propel.

```php
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
* @method \Spryker\Zed\Blog\Persistence\BlogPersistenceFactory getFactory()
*/
class BlogEntityManager extends AbstractEntityManager implements BlogEntityManagerInterface, EntityManagerInterface
{
   /**
   * @api
   *
   * @param int $idBlog
   */
   public function deleteBlogById($idBlog)
   {
     $this->getFactory()
       ->createBlogQuery()
       ->filterByIdBlog($idBlog)
       ->delete();
   }
 }
```

## Entity Manager Availability

The main idea is to keep entity manager inside its own module and have control over how data is persisted. It cannot be located by Spryker dependency locator. So it cannot be used by other modules. If you need to save from another module, you have to provide a Facade method. The entity manager is available in the same module as Factories and Facade, and can be accessed by calling `getEntityManager`. Also, you need to define autocomplete namespace the same way as for other magic classes.

```php
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
* @method \Spryker\Zed\Blog\Persistence\BlogRepositoryInterface getRepository()
* @method \Spryker\Zed\Blog\Persistence\BlogEntityManagerInterface getEntityManager()
*/
class BlogBusinessFactory extends AbstractBusinessFactory
{
  ../facade methods
}
    
```

## Transaction Handling

If there is a need to make your whole operation atomic, and you need to control it, you can include a transaction trait in your business class.

The following transaction handler implements a generic interface and removes a dependency on Propel from Business.

```php
namespace Spryker\Zed\Blog\Business\Model;

use Spryker\Zed\Kernel\Persistence\EntityManager\TransactionTrait;

class Blog
{
  use TransactionTrait;

  /**
  * @param \Generated\Shared\Transfer\SpyBlogEntityTransfer $blogTransfer
  *
  * @return \Generated\Shared\Transfer\SpyBlogEntityTransfer
  */
  public function save(SpyBlogEntityTransfer $blogTransfer)
  {
    return $this->getTransactionHandler()->handleTransaction(function() use($blogTransfer) {

      // Everything in this blog will be done in a single transaction.

      return $this->executeSaveBlogTransaction($blogTransfer);
    });
  }
}
  
```

## Related Spryks

You might use the following definitions to generate related code:

* `vendor/bin/console spryk:run AddZedPersistenceEntityManager` - Add Zed Persistence Entity Manager
* `vendor/bin/console spryk:run AddZedPersistenceEntityManagerInterface` - Add Zed Persistence Entity Manager Interface
* `vendor/bin/console spryk:run AddZedPersistenceEntityManagerInterfaceMethod` - Add Zed Persistence Entity Manager Interface Method
* `vendor/bin/console spryk:run AddZedPersistenceEntityManagerMethod` - Add Zed Persistence Entity Manager Method

See the [Spryk](https://documentation.spryker.com/v2/docs/spryk-201903) documentation for details.
