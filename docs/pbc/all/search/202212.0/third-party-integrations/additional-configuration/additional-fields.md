## Additional fields

Spryker's Algolia PBC integration allows adding additional data to exported products.
At this moment this is achieved using preconfigured `searchMetadata` field on ProductConcrete and ProductAbstract transfers.

### Filling `searchMetadata` field
There's multiple ways of adding search metadata but we'll implement a `ProductConcreteExpanderPlugin` as an example.

Create a new plugin implementing `ProductConcreteExpanderPluginInterface`. After this you can add any logic inside that plugin's `expand` method to add necessary metadata to ProductConcrete transfers.

```php
  
use Spryker\Zed\Kernel\Communication\AbstractPlugin;  
use Spryker\Zed\ProductExtension\Dependency\Plugin\ProductConcreteExpanderPluginInterface;

class SearchMetadataExampleProductConcreteExpanderPlugin extends AbstractPlugin implements ProductConcreteExpanderPluginInterface  
{  
    /**  
     * @param array<\Generated\Shared\Transfer\ProductConcreteTransfer> $productConcreteTransfers  
     *  
     * @return array<\Generated\Shared\Transfer\ProductConcreteTransfer>  
     */  
    public function expand(array $productConcreteTransfers): array  
    {  
        foreach ($productConcreteTransfers as $productConcreteTransfer) 
        {
	        $productConcreteTransfer->addSearchMetadata('isBestseller', true);
	        // ...
	        // OR
	        // ...
	        $searchMetadata = [
		        'isBestseller' => true,
		        'popularity' => 100,
	        ];

			$productConcreteTransfer->setSearchMetadata($searchMetadata);
        }
        
		return $productConcreteTransfers;
    }  
}
```

Please keep in mind that this field should be an associative array. Allowed values are all scalars and arrays.

#### Using `searchMetadata` field in Algolia

Algolia product object `searchMetadata` field is a simple object which can be used in any index configuration just like any other field.

##### Ranking setup

Open Algolia index configuration page on "Ranking and sorting" section. Click "Add custom ranking attribute" and select a field of `searchMetadata` attribute to use for ranking.

(TBD Image showing ranking configuration example here).

Adjust ranking priority by draggin newly added element in the ranking list. You can also change ranking order using dropdown on the right side of the list.

##### Faceting setup

Open Algolia index configuration page on "Facets" section. Click "Add an Attribute" to add any field of `searchMetadata` attribute to use as facet. Configure facet options as necessary.

##### Algolia and Glue API facets interaction

When used with Algolia PBC, Spryker facets configuration is ignored and Algolia facets configuration is used instead. This means, that Glue API response fields "valueFacets" and "rangeFacets" will include facets configured in Algolia. Be wary that setting any Algolia facet to "filter only" mode will remove it from corresponding field in Glue API response.
