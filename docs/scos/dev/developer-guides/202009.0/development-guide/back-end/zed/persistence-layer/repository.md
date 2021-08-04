---
title: Repository
originalLink: https://documentation.spryker.com/v6/docs/repository
redirect_from:
  - /v6/docs/repository
  - /v6/docs/en/repository
---

Since Kernel version 3.2 it's possible to use a Repository class in your persistence layer. The repository implements the [repository pattern](https://martinfowler.com/eaaCatalog/repository.html), which means you have a clear separation between business and persistence layers. Propel entities are not allowed outside the persistence layer. We are using transfer objects instead. This separation enables switching to different database systems or ORMs, you could even use NOSQL to store your data.

Each module must have the Repository class in `Persistence/ModuleNameRepository`. The repository must extend `\Spryker\Zed\Kernel\Persistence\AbstractRepository` which will provide a few helper methods when working with Propel entities.

See [Blog module](https://github.com/spryker/blog-example) for reference - it was built using the Repository. For example, the `BlogRepository` class:

```php
use Spryker\Zed\Kernel\Persistence\AbstractRepository;

/**
* @method \Spryker\Zed\Blog\Persistence\BlogPersistenceFactory getFactory()
*/
class BlogRepository extends AbstractRepository implements BlogRepositoryInterface
{
   /**
   * @param string $firstName
   *
   * @return \Generated\Shared\Transfer\SpyBlogEntityTransfer
   */
   public function findBlogByName($firstName)
   {
       $customerQuery = $this->queryBlogByName($firstName)
             ->joinWithSpyBlogComment();

       return $this->buildQueryFromCriteria($customerQuery)->find()[0];
   }
}    
```

## EntityTransfers

With the Publish and Synchronize feature, we have added a new transfer generation for `EntityTransfers`. The `EntityTransfers` are a direct representation of SQL tables, `EntityTransfer` has all properties and relations defined, also it holds FQCN to the Propel entity it is mapped to. This FQCN is used when mapping entity when data is persisted. Names of `EntityTransfers` start with `Spy`, followed by the table name, and then the `EntityTransfer` suffix. For example, `SpyBlogEntityTransfer` would map to SpyBlog Propel entity.

## Abstract Repository Class

There are a few helper methods in `\Spryker\Zed\Kernel\Persistence\AbstractRepository`, `public function build QueryFromCriteria(ModelCriteria $modelCriteria, CriteriaTransfer $criteriaTransfer = null);`

`ModelCriteria` is a pre-built concrete propel query. The `CriteriaTransfer` is the basic query filtering, limit, offset, ordering. It will use custom formatter `\Spryker\Zed\Kernel\Persistence\Repository\TransferObjectFormatter` to transform database data to EntityTransfers. It will be then returned by repository itself, which saves you from manual mapping of data to transfer when data represented in transfers and entities is exactly the same.

`public function populateCollectionWithRelation(array &$collection, &relation, Criteria &criteria = null)` will populate `&collection` with related data. For example, you need to return a list of blog posts with all the comments. Then, you can make the main query like this:

```php
    $collection = $this->buildQueryFromCriteria($blogQuery, $blogCriteriaFilterTransfer->getCriteria())
        ->find();
```

Then, add another call:

```php
        $comments = $this->populateCollectionWithRelation($collection, 'SpyBlogComment');
```

The last statement will update blog collection with related comments. This will produce two queries: one for blog posts and another for comments. If, for example, you need to populate each comment with the related customer data, run:

```php
       $this->populateCollectionWithRelation($comments, 'SpyBlogCustomer');
```

This will populate comments with customer data, and the whole blog collection will have three level of relations:

```php
      - SpyBlog[]
        - SpyBlogComment[]
          - SpyBlogCustomer[]
```

This is a recommended approach to populate lists when limited usage is required, because Propel does not allow limiting the usage when join "with*" is used.

## Manual Mapping

When you have custom transfers which cannot be automatically mapped to entities, you have to create customer mapper classes. For example, create `\Spryker\Zed\Blog\Persistence\Propel\Mapper\BlogMapper` which will know how to map from transfer to propel entity - create it in Factory.

```php
namespace Spryker\Zed\Blog\Persistence;

use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

class BlogPersistenceFactory extends AbstractPersistenceFactory
{
        /**
             * @return \Spryker\Zed\Blog\Persistence\Propel\Mapper\BlogMapper
             */
            public function createBlogMapper()
            {
                return new BlogMapper();
            }
        }
```

## Conventions

#### Querying

* When returning filtered collections by certain field, use `find{Entity}CollectionBy{field}($field, CriteriaTransfer $criteriaTransfer)`. For example, `findBlogCollectionByFirstName($firstName, CriteriaTransfer $criteriaTransfer = null)`
* When returning a single item: `find{Entity}By{field}`. For example: `public function findBlogByName($firstName)`.
* When counting records `public function count{Entity}By{Name}({name})`. For example: `public function countBlogByName($firstName)`.

Those three queries share the same queries. For better reusability, it's recommended to extract this logic to a protected method. For example:

```php
        /**
          * @param string $name
          *
          * @return \Orm\Zed\Blog\Persistence\SpyBlogQuery
          */
         protected function queryBlogByName($name)
         {
             return $this->getFactory()
                 ->createBlogQuery()
                 ->filterByName($name);
         }
  
```



## Repository Availability

The repository is available in all ZED layers where Spryker classes are resolvable. Get it in factories, controllers, facades or plugins using the `getRepository` method. If you want to use some methods from Repository, you have to create a Facade method in a corresponding module which would delegate to Repository.

## Related Spryks

You might use the following definitions to generate related code:

* `vendor/bin/console spryk:run AddZedPersistenceRepository` - Add Zed Persistence Repository
* `vendor/bin/console spryk:run AddZedPersistenceRepositoryInterface` - Add Zed Persistence Repository Interface
* `vendor/bin/console spryk:run AddZedPersistenceRepositoryInterfaceMethod` - Add Zed Persistence Repository Interface Method
* `vendor/bin/console spryk:run AddZedPersistenceRepositoryMethod` - Add Zed Persistence Repository Method

See the [Spryk](https://documentation.spryker.com/docs/spryk-201903) documentation for details.

