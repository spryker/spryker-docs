To integrate Dynamic multistore feature in your project, you need to:

- [Define the region stores context by domain](#define-the-region-stores-context-by-domain)
- [Integration Dynamic Store feature](#integration-dynamic-store-feature)
- [Deploy file changes and enable dynamic store feature](#deploy-file-changes-and-enable-dynamic-store-feature)
- [Delete store in database](#delete-store-in-database)


## Define the region stores context by domain

Since implementation dynamic multistore features you can define region or store by domains or by headers.
We recommend defining region by domains, which is supported by default for dynamic store. 


{% info_block infoBox "Recomedations for changing domain name" %}

For example, you have an existing store that uses the domain de.spryker.shop. With the integration of Dynamic Store, you have also started using the domain eu.spryker.shop. 
We recommend making de.spryker.shop a mirror of eu.spryker.shop to preserve the availability of old links in search engines.

{% endinfo_block %}

## Integration Dynamic Store feature

To install it, you need to do the following:

{% info_block warningBox "Note" %}

Spryker Shop Suite contains Dynamic store out of the box. If your project has the latest Shop Suite master merged, you can proceed directly to step <a href="#enabling-ds">2. Enable Dynamic Store</a>.

{% endinfo_block %}

### Install feature core

Follow the steps below to install the feature core.

To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{site.version}}   | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/spryker-core-feature-integration.html) |
| Spryker Dynamic multistore | {{site.version}} | [Dynamic multistore feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/) |


### Install the required modules using Composer

Please note if you don't use some features, you can skip some packages for update.

Minimum version for packages 

For Dynamic Store feature you need to update the following packages:

| MODULE                      | MIN VERSION                                  |
|-----------------------------|---------------------------------------------|
| Country                     | 4.0.0                                       |
| CountryDataImport           | 0.1.0                                       |
| CountryGui                  | 1.0.0                                       |
| Currency                    | 4.0.0                                       |
| CurrencyDataImport          | 0.1.0                                       |
| CurrencyGui                 | 1.0.0                                       |
| Locale                      | 4.0.0                                       |
| LocaleDataImport            | 0.1.0                                       |
| LocaleGui                   | 1.0.0                                       |
| ToreContextGui              | 1.0.0                                       |
| ToreDataImport              | 0.1.0                                       |
| ToreExtension               | 1.0.0                                       |
| ToreGuiExtension            | 1.0.0                                       |
| ToreStorage                 | 1.0.0                                       |
| Shop/storeWidget            | 1.0.0                                       |
| Eco/payone                  | 4.5.0                                       |
| AbbitMq                     | 2.16.0                                      |
| AclEntityDataImport         | 0.2.2                                       |
| AclMerchantPortal           | 1.10.0                                      |
| Application                 | 3.32.0                                      |
| Availability                | 9.17.0                                      |
| AvailabilityGui             | 6.8.0                                       |
| AvailabilityNotification    | 1.3.0                                       |
| CartCurrencyConnector       | 1.2.0                                       |
| CatalogPriceProductConnector | 1.5.0                                       |
| CatalogSearchRestApi        | 2.8.0                                       |
| Category                    | 5.12.0                                      |
| CategoryDataFeed            | 0.2.4                                       |
| CategoryDiscountConnector   | 1.2.0                                       |
| CategoryGui                 | 2.2.0                                       |
| CategoryImage               | 1.2.0                                       |
| CategoryImageGui            | 1.6.0                                       |
| CategoryStorage             | 2.6.0                                       |
| Cms                         | 7.12.0                                      |
| CmsBlock                    | 3.5.0                                       |
| CmsBlockCategoryConnector   | 2.7.0                                       |
| CmsBlockGui                 | 2.10.0                                      |
| CmsBlockProductConnector    | 1.5.0                                       |
| CmsBlockStorage             | 2.5.0                                       |
| CmsGui                      | 5.11.0                                      |
| CmsPageSearch               | 2.6.0                                       |
| CmsSlotBlockCategoryGui     | 1.3.0                                       |
| CmsSlotBlockCmsGui          | 1.1.0                                       |
| CmsSlotBlockProductCategoryConnector | 1.4.0                                       |
| CmsSlotBlockProductCategoryGui | 1.1.0                                       |
| CmsSlotLocaleConnector      | 1.1.0                                       |
| CmsStorage                  | 2.7.0                                       |
| Collector                   | 6.8.0                                       |
| CommentDataImport           | 0.1.1                                       |
| CompanyBusinessUnitDataImport | 0.5.3                                       |
| CompanyRoleDataImport       | 0.1.3                                       |
| CompanySupplierDataImport   | 0.1.4                                       |
| CompanySupplierGui          | 1.3.0                                       |
| CompanyUnitAddress          | 1.15.0                                      |
| CompanyUnitAddressDataImport | 0.3.3                                       |
| CompanyUnitAddressGui       | 1.3.0                                       |
| CompanyUserDataImport       | 0.2.1                                       |
| Config                      | 3.6.0                                       |
| ConfigurableBundle          | 2.2.0                                       |
| ConfigurableBundleCartsRestApi | 0.1.3                                       |
| ConfigurableBundleDataImport | 0.2.2                                       |
| ConfigurableBundleGui       | 1.4.0                                       |
| ConfigurableBundleStorage   | 2.6.0                                       |
| Console                     | 4.12.0                                      |
| Content                     | 2.3.0                                       |
| ContentFileGui              | 2.2.0                                       |
| ContentGui                  | 2.6.0                                       |
| ContentProductGui           | 1.2.0                                       |
| ContentProductSetGui        | 1.2.0                                       |
| ContentStorage              | 2.6.0                                       |
| Customer                    | 7.50.0                                      |
| CustomerApi                 | 0.2.2                                       |
| DataImport                  | 1.21.0                                      |
| Dataset                     | 1.2.0                                       |
| Discount                    | 9.30.0                                      |
| FileManager                 | 2.2.0                                       |
| FileManagerGui              | 2.4.0                                       |
| FileManagerStorage          | 2.3.0                                       |
| GiftCardMailConnector       | 1.2.0                                       |
| Glossary                    | 3.13.0                                      |
| Http                        | 1.9.0                                       |
| Nel                         | 3.72.0                                      |
| Log                         | 3.14.0                                      |
| Mail                        | 4.11.0                                      |
| ManualOrderEntryGui         | 0.9.4                                       |
| MerchantGui                 | 3.10.0                                      |
| MerchantProduct             | 1.4.0                                       |
| MerchantProductStorage      | 1.4.0                                       |
| MerchantProfile             | 1.1.0                                       |
| MerchantProfileDataImport   | 0.6.1                                       |
| MerchantProfileGui          | 1.1.0                                       |
| MerchantProfileMerchantPortalGui | 2.1.0                                       |
| MerchantRelationshipSalesOrderThreshold | 1.3.0                                       |
| MerchantRelationshipSalesOrderThresholdDataImport | 0.1.3                                       |
| MerchantRelationshipSalesOrderThresholdGui | 1.8.0                                       |
| MerchantSalesOrderDataExport | 0.2.1                                       |
| MerchantSwitcher            | 0.6.3                                       |
| Money                       | 2.12.0                                      |
| Monitoring                  | 2.8.0                                       |
| MultiCart                   | 1.9.0                                       |
| MultiCartDataImport         | 0.1.7                                       |
| Navigation                  | 2.7.0                                       |
| NavigationGui               | 2.9.0                                       |
| NavigationStorage           | 1.10.0                                      |
| OfferGui                    | 0.3.10                                      |
| Oms                         | 11.23.0                                     |
| IstentCart                  | 3.6.0                                       |
| IceCartConnector            | 6.9.0                                       |
| IceProduct                  | 4.39.0                                      |
| IceProductDataImport        | 0.1.14                                      |
| IceProductMerchantRelationshipDataImport | 0.2.3                                       |
| IceProductMerchantRelationshipStorage | 1.16.0                                      |
| IceProductOffer             | 1.4.0                                       |
| IceProductOfferDataImport   | 0.7.2                                       |
| IceProductOfferGui          | 1.2.0                                       |
| IceProductOfferStorage      | 1.3.0                                       |
| IceProductSchedule          | 2.6.0                                       |
| IceProductScheduleDataImport | 0.1.5                                       |
| IceProductVolume            | 3.4.0                                       |
| IceProductVolumeGui         | 3.3.0                                       |
| Oduct                       | 6.31.0                                      |
| OductAbstractDataFeed       | 0.2.7                                       |
| OductAlternative            | 1.3.0                                       |
| OductAlternativeProductLabelConnector | 1.2.0                                       |
| OductAttribute              | 1.12.0                                      |
| OductAttributeGui           | 1.5.0                                       |
| OductBarcodeGui             | 1.3.0                                       |
| OductBundle                 | 7.14.0                                      |
| OductCartConnector          | 4.10.0                                      |
| OductCategory               | 4.20.0                                      |
| OductCategoryFilterGui      | 2.4.0                                       |
| OductCategoryStorage        | 2.5.0                                       |
| OductConfiguration          | 1.2.0                                       |
| OductConfigurationStorage   | 1.1.0                                       |
| OductCustomerPermission     | 1.3.0                                       |
| OductDiscontinued           | 1.10.0                                      |
| OductDiscontinuedGui        | 1.5.0                                       |
| OductDiscontinuedProductLabelConnector | 1.4.0                                       |
| OductDiscontinuedStorage    | 1.15.0                                      |
| OductDiscountConnector      | 5.2.0                                       |
| OductImage                  | 3.14.0                                      |
| OductLabel                  | 3.6.0                                       |
| OductLabelGui               | 3.4.0                                       |
| OductLabelStorage           | 2.7.0                                       |
| OductListGui                | 2.3.0                                       |
| OductManagement             | 0.19.34                                     |
| OductMerchantPortalGui      | 3.1.0                                       |
| OductNew                    | 1.5.0                                       |
| OductOfferGui               | 1.4.0                                       |
| OductOfferMerchantPortalGui | 2.1.0                                       |
| OductOption                 | 8.14.0                                      |
| OductOptionStorage          | 1.14.0                                      |
| OductOptionsRestApi         | 1.3.0                                       |
| OductPackagingUnit          | 4.7.0                                       |
| OductPageSearch             | 3.30.0                                      |
| OductPricesRestApi          | 1.7.0                                       |
| OductRelation               | 3.3.0                                       |
| OductRelationGui            | 1.4.0                                       |
| OductReview                 | 2.11.0                                      |
| OductReviewGui              | 1.6.0                                       |
| OductReviewSearch           | 1.8.0                                       |
| OductSearch                 | 5.18.0                                      |
| OductSet                    | 1.7.0                                       |
| OductSetGui                 | 2.7.0                                       |
| OductSetPageSearch          | 1.8.0                                       |
| OductStorage                | 1.37.0                                      |
| Opel                        | 3.37.0                                      |
| QuickOrder                  | 3.1.0                                       |
| Quote                       | 2.18.0                                      |
| QuoteExtension              | 1.8.0                                       |
| QuoteRequestDataImport      | 0.2.1                                       |
| QuoteRequestsRestApi        | 0.1.6                                       |
| TRequestValidator           | 1.5.0                                       |
| Ales                        | 11.37.0                                     |
| AlesDataExport              | 0.2.1                                       |
| AlesInvoice                 | 1.3.0                                       |
| AlesMerchantPortalGui       | 2.1.0                                       |
| AlesOms                     | 0.1.2                                       |
| AlesOrderThreshold          | 1.8.0                                       |
| AlesOrderThresholdDataImport | 0.1.4                                       |
| AlesOrderThresholdGui       | 1.9.0                                       |
| AlesReturn                  | 1.5.0                                       |
| AlesReturnGui               | 1.6.0                                       |
| AlesReturnSearch            | 1.1.0                                       |
| Cheduler                    | 1.3.0                                       |
| ChedulerJenkins             | 1.3.0                                       |
| Arch                        | 8.20.0                                      |
| ArchElasticsearch           | 1.15.0                                      |
| ArchExtension               | 1.2.0                                       |
| Hipment                     | 8.11.0                                      |
| HipmentDataImport           | 1.2.0                                       |
| HoppingListDataImport       | 0.2.1                                       |
| TockAddress                 | 1.1.0                                       |
| TockAddressDataImport       | 0.1.1                                       |
| Torage                      | 3.20.0                                      |
| Tore                        | 1.18.0                                      |
| ToreGui                     | 1.2.0                                       |
| ToresRestApi                | 1.1.0                                       |
| Nchronization               | 1.16.0                                      |
| Tax                         | 5.13.0                                      |
| TaxProductConnector         | 4.7.0                                       |
| Testify                     | 3.48.0                                      |
| Touch                       | 4.6.0                                       |
| Translator                  | 1.11.0                                      |
| Url                         | 3.11.0                                      |
| UrlCollector                | 1.3.0                                       |
| UrlStorage                  | 1.16.0                                      |
| UserLocale                  | 1.3.0                                       |
| UserLocaleGui               | 1.1.0                                       |
| UserMerchantPortalGui       | 2.1.0                                       |
| UtilDateTime                | 1.3.0                                       |
| ZedRequest                  | 3.19.0                                      |
| ZedRequestExtension         | 1.1.0                                       |
| Shop/customerPage           | 2.41.0                                      |
| Shop/shopUi                 | 1.67.0                                      |
| NchronizationBehavior       | 1.10.0                                      |
| Agent                       | 1.5.2                                       |
| AssetStorage                | 1.2.1                                       |
| AuthRestApi                 | 2.14.2                                      |
| AvailabilityStorage         | 2.7.1                                       |
| BusinessOnBehalf            | 1.1.3                                       |
| Calculation                 | 4.12.1                                      |
| Cart                        | 7.11.1                                      |
| CartCodesRestApi            | 1.4.1                                       |
| CartsRestApi                | 5.22.1                                      |
| CategoryImageStorage        | 1.6.1                                       |
| CategoryNavigationConnector | 1.0.3                                       |
| CategoryPageSearch          | 2.2.1                                       |
| Checkout                    | 6.4.3                                       |
| CmsSlotBlock                | 1.1.1                                       |
| CmsSlotStorage              | 1.2.1                                       |
| Comment                     | 1.2.2                                       |
| Company                     | 1.5.2                                       |
| CompanyBusinessUnit         | 2.14.3                                      |
| CompanyBusinessUnitGui      | 2.10.1                                      |
| CompanyBusinessUnitSalesConnector | 1.1.1                                       |
| CompanyRole                 | 1.7.2                                       |
| CompanySalesConnector       | 1.1.1                                       |
| CompanyUser                 | 2.15.2                                      |
| CompanyUserInvitation       | 1.3.2                                       |
| CompanyUserStorage          | 1.5.1                                       |
| CompanyUsersRestApi         | 2.5.1                                       |
| ConfigurableBundleNote      | 1.0.1                                       |
| ConfigurableBundlePageSearch | 1.4.1                                       |
| CustomerAccessStorage       | 1.7.1                                       |
| CustomerNote                | 1.1.1                                       |
| CustomerUserConnector       | 1.0.4                                       |
| Development                 | 3.34.4                                      |
| GiftCard                    | 1.8.1                                       |
| GlossaryStorage             | 1.11.1                                      |
| Gui                         | 3.47.2                                      |
| MerchantOms                 | 1.0.3                                       |
| MerchantOpeningHoursStorage | 1.0.2                                       |
| MerchantProductOfferSearch  | 1.4.1                                       |
| MerchantProductOfferStorage | 2.0.1                                       |
| MerchantProductOfferWishlist | 1.2.1                                       |
| MerchantProductOfferWishlistRestApi | 1.1.1                                       |
| MerchantProductSearch       | 1.2.1                                       |
| MerchantSalesOrder          | 1.1.2                                       |
| MerchantSalesReturn         | 1.0.1                                       |
| MerchantSearch              | 1.0.1                                       |
| MerchantStorage             | 1.1.1                                       |
| Oauth                       | 2.8.1                                       |
| OauthCompanyUser            | 2.2.1                                       |
| OauthPermission             | 1.3.1                                       |
| OmsProductOfferReservation  | 1.0.2                                       |
| OrderCustomReference        | 1.0.1                                       |
| Ayment                      | 5.10.2                                      |
| Mission                     | 1.5.4                                       |
| IceProductMerchantRelationship | 1.9.1                                       |
| IceProductOfferVolume       | 1.0.3                                       |
| IceProductScheduleGui       | 2.3.1                                       |
| IceProductStorage           | 4.9.1                                       |
| OductAlternativeStorage     | 1.11.1                                      |
| OductBundleStorage          | 1.1.1                                       |
| OductCategorySearch         | 1.1.1                                       |
| OductConfigurationWishlist  | 1.0.2                                       |
| OductConfigurationWishlistsRestApi | 1.1.2                                       |
| OductGroupStorage           | 1.4.1                                       |
| OductImageCartConnector     | 1.2.4                                       |
| OductLabelCollector         | 1.3.1                                       |
| OductLabelSearch            | 2.3.1                                       |
| OductMeasurementUnit        | 5.3.2                                       |
| OductOffer                  | 1.5.1                                       |
| OductOfferAvailability      | 1.1.2                                       |
| OductOfferAvailabilityStorage | 1.0.2                                       |
| OductOfferShoppingList      | 1.0.1                                       |
| OductOptionCartConnector    | 7.1.3                                       |
| OductPackagingUnitStorage   | 5.2.1                                       |
| OductRelationStorage        | 2.3.1                                       |
| OductReviewStorage          | 1.5.1                                       |
| QuoteApproval               | 1.6.2                                       |
| QuoteRequest                | 2.4.2                                       |
| Outer                       | 1.15.1                                      |
| AlesConfigurableBundle      | 1.5.2                                       |
| AlesPayment                 | 1.3.1                                       |
| AlesProductConnector        | 1.8.2                                       |
| HaredCart                   | 1.19.1                                      |
| HaredCartsRestApi           | 1.2.6                                       |
| HipmentCartConnector        | 2.1.2                                       |
| HipmentsRestApi             | 1.6.2                                       |
| HoppingList                 | 4.10.1                                      |
| HoppingListNote             | 1.2.1                                       |
| HoppingListProductOptionConnector | 1.4.2                                       |
| Tock                        | 8.5.1                                       |
| TockDataImport              | 1.2.1                                       |
| TorageDatabase              | 1.2.1                                       |
| TaxProductStorage           | 1.3.1                                       |
| TaxStorage                  | 1.4.1                                       |
| Twig                        | 3.18.1                                      |
| Wishlist                    | 8.7.2                                       |
| WishlistsRestApi            | 1.6.2                                       |
|-----------------------------|---------------------------------------------|

Min version for Spryker-Shop modules:

| MODULE                      | MIN VERSION                                  |
|-----------------------------|---------------------------------------------|
| CatalogPage                 | 1.25.0                                      |
| CheckoutPage                | 3.24.0                                      |
| CmsPage                     | 1.8.0                                       |
| CompanyPage                 | 2.21.0                                      |
| ConfigurableBundleWidget    | 1.8.0                                       |
| CustomerPage                | 2.41.0                                      |
| CustomerReorderWidget       | 6.14.0                                      |
| LanguageSwitcherWidget      | 1.5.0                                       |
| MoneyWidget                 | 1.7.0                                       |
| DuctMeasurementUnitWidget   | 1.2.0                                       |
| DuctNewPage                 | 1.4.0                                       |
| DuctPackagingUnitWidget     | 1.5.0                                       |
| DuctSearchWidget            | 3.5.0                                       |
| QuickOrderPage              | 4.9.0                                       |
| Application                 | 1.15.0                                      |
| Ui                          | 1.67.0                                      |
| IngListPage                 | 1.9.0                                       |
| ToreWidget                  | 1.0.0                                       |
|-----------------------------|---------------------------------------------|

Commands for update packages: 

```bash
composer require spryker/country:"^4.0.0" --update-with-dependencies
composer require spryker/country-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/country-gui:"^1.0.0" --update-with-dependencies
composer require spryker/currency:"^4.0.0" --update-with-dependencies
composer require spryker/currency-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/currency-gui:"^1.0.0" --update-with-dependencies
composer require spryker/locale:"^4.0.0" --update-with-dependencies
composer require spryker/locale-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/locale-gui:"^1.0.0" --update-with-dependencies
composer require spryker/store-context-gui:"^1.0.0" --update-with-dependencies
composer require spryker/store-data-import:"^0.1.0" --update-with-dependencies
composer require spryker/store-extension:"^1.0.0" --update-with-dependencies
composer require spryker/store-gui-extension:"^1.0.0" --update-with-dependencies
composer require spryker/store-storage:"^1.0.0" --update-with-dependencies
composer require spryker-shop/store-widget:"^1.0.0" --update-with-dependencies
composer require spryker-eco/payone:"^4.5.0" --update-with-dependencies
composer require spryker/rabbit-mq:"^2.16.0" --update-with-dependencies
composer require spryker/acl-entity-data-import:"^0.2.2" --update-with-dependencies
composer require spryker/acl-merchant-portal:"^1.10.0" --update-with-dependencies
composer require spryker/application:"^3.32.0" --update-with-dependencies
composer require spryker/availability:"^9.17.0" --update-with-dependencies
composer require spryker/availability-gui:"^6.8.0" --update-with-dependencies
composer require spryker/availability-notification:"^1.3.0" --update-with-dependencies
composer require spryker/cart-currency-connector:"^1.2.0" --update-with-dependencies
composer require spryker/catalog-price-product-connector:"^1.5.0" --update-with-dependencies
composer require spryker/catalog-search-rest-api:"^2.8.0" --update-with-dependencies
composer require spryker/category:"^5.12.0" --update-with-dependencies
composer require spryker/category-data-feed:"^0.2.4" --update-with-dependencies
composer require spryker/category-discount-connector:"^1.2.0" --update-with-dependencies
composer require spryker/category-gui:"^2.2.0" --update-with-dependencies
composer require spryker/category-image:"^1.2.0" --update-with-dependencies
composer require spryker/category-image-gui:"^1.6.0" --update-with-dependencies
composer require spryker/category-storage:"^2.6.0" --update-with-dependencies
composer require spryker/cms:"^7.12.0" --update-with-dependencies
composer require spryker/cms-block:"^3.5.0" --update-with-dependencies
composer require spryker/cms-block-category-connector:"^2.7.0" --update-with-dependencies
composer require spryker/cms-block-gui:"^2.10.0" --update-with-dependencies
composer require spryker/cms-block-product-connector:"^1.5.0" --update-with-dependencies
composer require spryker/cms-block-storage:"^2.5.0" --update-with-dependencies
composer require spryker/cms-gui:"^5.11.0" --update-with-dependencies
composer require spryker/cms-page-search:"^2.6.0" --update-with-dependencies
composer require spryker/cms-slot-block-category-gui:"^1.3.0" --update-with-dependencies
composer require spryker/cms-slot-block-cms-gui:"^1.1.0" --update-with-dependencies
composer require spryker/cms-slot-block-product-category-connector:"^1.4.0" --update-with-dependencies
composer require spryker/cms-slot-block-product-category-gui:"^1.1.0" --update-with-dependencies
composer require spryker/cms-slot-locale-connector:"^1.1.0" --update-with-dependencies
composer require spryker/cms-storage:"^2.7.0" --update-with-dependencies
composer require spryker/collector:"^6.8.0" --update-with-dependencies
composer require spryker/comment-data-import:"^0.1.1" --update-with-dependencies
composer require spryker/company-business-unit-data-import:"^0.5.3" --update-with-dependencies
composer require spryker/company-role-data-import:"^0.1.3" --update-with-dependencies
composer require spryker/company-supplier-data-import:"^0.1.4" --update-with-dependencies
composer require spryker/company-supplier-gui:"^1.3.0" --update-with-dependencies
composer require spryker/company-unit-address:"^1.15.0" --update-with-dependencies
composer require spryker/company-unit-address-data-import:"^0.3.3" --update-with-dependencies
composer require spryker/company-unit-address-gui:"^1.3.0" --update-with-dependencies
composer require spryker/company-user-data-import:"^0.2.1" --update-with-dependencies
composer require spryker/config:"^3.6.0" --update-with-dependencies
composer require spryker/configurable-bundle:"^2.2.0" --update-with-dependencies
composer require spryker/configurable-bundle-carts-rest-api:"^0.1.3" --update-with-dependencies
composer require spryker/configurable-bundle-data-import:"^0.2.2" --update-with-dependencies
composer require spryker/configurable-bundle-gui:"^1.4.0" --update-with-dependencies
composer require spryker/configurable-bundle-storage:"^2.6.0" --update-with-dependencies
composer require spryker/console:"^4.12.0" --update-with-dependencies
composer require spryker/content:"^2.3.0" --update-with-dependencies
composer require spryker/content-file-gui:"^2.2.0" --update-with-dependencies
composer require spryker/content-gui:"^2.6.0" --update-with-dependencies
composer require spryker/content-product-gui:"^1.2.0" --update-with-dependencies
composer require spryker/content-product-set-gui:"^1.2.0" --update-with-dependencies
composer require spryker/content-storage:"^2.6.0" --update-with-dependencies
composer require spryker/customer:"^7.50.0" --update-with-dependencies
composer require spryker/customer-api:"^0.2.2" --update-with-dependencies
composer require spryker/data-import:"^1.21.0" --update-with-dependencies
composer require spryker/dataset:"^1.2.0" --update-with-dependencies
composer require spryker/discount:"^9.30.0" --update-with-dependencies
composer require spryker/file-manager:"^2.2.0" --update-with-dependencies
composer require spryker/file-manager-gui:"^2.4.0" --update-with-dependencies
composer require spryker/file-manager-storage:"^2.3.0" --update-with-dependencies
composer require spryker/gift-card-mail-connector:"^1.2.0" --update-with-dependencies
composer require spryker/glossary:"^3.13.0" --update-with-dependencies
composer require spryker/http:"^1.9.0" --update-with-dependencies
composer require spryker/kernel:"^3.72.0" --update-with-dependencies
composer require spryker/log:"^3.14.0" --update-with-dependencies
composer require spryker/mail:"^4.11.0" --update-with-dependencies
composer require spryker/manual-order-entry-gui:"^0.9.4" --update-with-dependencies
composer require spryker/merchant-gui:"^3.10.0" --update-with-dependencies
composer require spryker/merchant-product:"^1.4.0" --update-with-dependencies
composer require spryker/merchant-product-storage:"^1.4.0" --update-with-dependencies
composer require spryker/merchant-profile:"^1.1.0" --update-with-dependencies
composer require spryker/merchant-profile-data-import:"^0.6.1" --update-with-dependencies
composer require spryker/merchant-profile-gui:"^1.1.0" --update-with-dependencies
composer require spryker/merchant-profile-merchant-portal-gui:"^2.1.0" --update-with-dependencies
composer require spryker/merchant-relationship-sales-order-threshold:"^1.3.0" --update-with-dependencies
composer require spryker/merchant-relationship-sales-order-threshold-data-import:"^0.1.3" --update-with-dependencies
composer require spryker/merchant-relationship-sales-order-threshold-gui:"^1.8.0" --update-with-dependencies
composer require spryker/merchant-sales-order-data-export:"^0.2.1" --update-with-dependencies
composer require spryker/merchant-switcher:"^0.6.3" --update-with-dependencies
composer require spryker/money:"^2.12.0" --update-with-dependencies
composer require spryker/monitoring:"^2.8.0" --update-with-dependencies
composer require spryker/multi-cart:"^1.9.0" --update-with-dependencies
composer require spryker/multi-cart-data-import:"^0.1.7" --update-with-dependencies
composer require spryker/navigation:"^2.7.0" --update-with-dependencies
composer require spryker/navigation-gui:"^2.9.0" --update-with-dependencies
composer require spryker/navigation-storage:"^1.10.0" --update-with-dependencies
composer require spryker/offer-gui:"^0.3.10" --update-with-dependencies
composer require spryker/oms:"^11.23.0" --update-with-dependencies
composer require spryker/persistent-cart:"^3.6.0" --update-with-dependencies
composer require spryker/price-cart-connector:"^6.9.0" --update-with-dependencies
composer require spryker/price-product:"^4.39.0" --update-with-dependencies
composer require spryker/price-product-data-import:"^0.1.14" --update-with-dependencies
composer require spryker/price-product-merchant-relationship-data-import:"^0.2.3" --update-with-dependencies
composer require spryker/price-product-merchant-relationship-storage:"^1.16.0" --update-with-dependencies
composer require spryker/price-product-offer:"^1.4.0" --update-with-dependencies
composer require spryker/price-product-offer-data-import:"^0.7.2" --update-with-dependencies
composer require spryker/price-product-offer-gui:"^1.2.0" --update-with-dependencies
composer require spryker/price-product-offer-storage:"^1.3.0" --update-with-dependencies
composer require spryker/price-product-schedule:"^2.6.0" --update-with-dependencies
composer require spryker/price-product-schedule-data-import:"^0.1.5" --update-with-dependencies
composer require spryker/price-product-volume:"^3.4.0" --update-with-dependencies
composer require spryker/price-product-volume-gui:"^3.3.0" --update-with-dependencies
composer require spryker/product:"^6.31.0" --update-with-dependencies
composer require spryker/product-abstract-data-feed:"^0.2.7" --update-with-dependencies
composer require spryker/product-alternative:"^1.3.0" --update-with-dependencies
composer require spryker/product-alternative-product-label-connector:"^1.2.0" --update-with-dependencies
composer require spryker/product-attribute:"^1.12.0" --update-with-dependencies
composer require spryker/product-attribute-gui:"^1.5.0" --update-with-dependencies
composer require spryker/product-barcode-gui:"^1.3.0" --update-with-dependencies
composer require spryker/product-bundle:"^7.14.0" --update-with-dependencies
composer require spryker/product-cart-connector:"^4.10.0" --update-with-dependencies
composer require spryker/product-category:"^4.20.0" --update-with-dependencies
composer require spryker/product-category-filter-gui:"^2.4.0" --update-with-dependencies
composer require spryker/product-category-storage:"^2.5.0" --update-with-dependencies
composer require spryker/product-configuration:"^1.2.0" --update-with-dependencies
composer require spryker/product-configuration-storage:"^1.1.0" --update-with-dependencies
composer require spryker/product-customer-permission:"^1.3.0" --update-with-dependencies
composer require spryker/product-discontinued:"^1.10.0" --update-with-dependencies
composer require spryker/product-discontinued-gui:"^1.5.0" --update-with-dependencies
composer require spryker/product-discontinued-product-label-connector:"^1.4.0" --update-with-dependencies
composer require spryker/product-discontinued-storage:"^1.15.0" --update-with-dependencies
composer require spryker/product-discount-connector:"^5.2.0" --update-with-dependencies
composer require spryker/product-image:"^3.14.0" --update-with-dependencies
composer require spryker/product-label:"^3.6.0" --update-with-dependencies
composer require spryker/product-label-gui:"^3.4.0" --update-with-dependencies
composer require spryker/product-label-storage:"^2.7.0" --update-with-dependencies
composer require spryker/product-list-gui:"^2.3.0" --update-with-dependencies
composer require spryker/product-management:"^0.19.34" --update-with-dependencies
composer require spryker/product-merchant-portal-gui:"^3.1.0" --update-with-dependencies
composer require spryker/product-new:"^1.5.0" --update-with-dependencies
composer require spryker/product-offer-gui:"^1.4.0" --update-with-dependencies
composer require spryker/product-offer-merchant-portal-gui:"^2.1.0" --update-with-dependencies
composer require spryker/product-option:"^8.14.0" --update-with-dependencies
composer require spryker/product-option-storage:"^1.14.0" --update-with-dependencies
composer require spryker/product-options-rest-api:"^1.3.0" --update-with-dependencies
composer require spryker/product-packaging-unit:"^4.7.0" --update-with-dependencies
composer require spryker/product-page-search:"^3.30.0" --update-with-dependencies
composer require spryker/product-prices-rest-api:"^1.7.0" --update-with-dependencies
composer require spryker/product-relation:"^3.3.0" --update-with-dependencies
composer require spryker/product-relation-gui:"^1.4.0" --update-with-dependencies
composer require spryker/product-review:"^2.11.0" --update-with-dependencies
composer require spryker/product-review-gui:"^1.6.0" --update-with-dependencies
composer require spryker/product-review-search:"^1.8.0" --update-with-dependencies
composer require spryker/product-search:"^5.18.0" --update-with-dependencies
composer require spryker/product-set:"^1.7.0" --update-with-dependencies
composer require spryker/product-set-gui:"^2.7.0" --update-with-dependencies
composer require spryker/product-set-page-search:"^1.8.0" --update-with-dependencies
composer require spryker/product-storage:"^1.37.0" --update-with-dependencies
composer require spryker/propel:"^3.37.0" --update-with-dependencies
composer require spryker/quick-order:"^3.1.0" --update-with-dependencies
composer require spryker/quote:"^2.18.0" --update-with-dependencies
composer require spryker/quote-extension:"^1.8.0" --update-with-dependencies
composer require spryker/quote-request-data-import:"^0.2.1" --update-with-dependencies
composer require spryker/quote-requests-rest-api:"^0.1.6" --update-with-dependencies
composer require spryker/rest-request-validator:"^1.5.0" --update-with-dependencies
composer require spryker/sales:"^11.37.0" --update-with-dependencies
composer require spryker/sales-data-export:"^0.2.1" --update-with-dependencies
composer require spryker/sales-invoice:"^1.3.0" --update-with-dependencies
composer require spryker/sales-merchant-portal-gui:"^2.1.0" --update-with-dependencies
composer require spryker/sales-oms:"^0.1.2" --update-with-dependencies
composer require spryker/sales-order-threshold:"^1.8.0" --update-with-dependencies
composer require spryker/sales-order-threshold-data-import:"^0.1.4" --update-with-dependencies
composer require spryker/sales-order-threshold-gui:"^1.9.0" --update-with-dependencies
composer require spryker/sales-return:"^1.5.0" --update-with-dependencies
composer require spryker/sales-return-gui:"^1.6.0" --update-with-dependencies
composer require spryker/sales-return-search:"^1.1.0" --update-with-dependencies
composer require spryker/scheduler:"^1.3.0" --update-with-dependencies
composer require spryker/scheduler-jenkins:"^1.3.0" --update-with-dependencies
composer require spryker/search:"^8.20.0" --update-with-dependencies
composer require spryker/search-elasticsearch:"^1.15.0" --update-with-dependencies
composer require spryker/search-extension:"^1.2.0" --update-with-dependencies
composer require spryker/shipment:"^8.11.0" --update-with-dependencies
composer require spryker/shipment-data-import:"^1.2.0" --update-with-dependencies
composer require spryker/shopping-list-data-import:"^0.2.1" --update-with-dependencies
composer require spryker/stock-address:"^1.1.0" --update-with-dependencies
composer require spryker/stock-address-data-import:"^0.1.1" --update-with-dependencies
composer require spryker/storage:"^3.20.0" --update-with-dependencies
composer require spryker/store:"^1.18.0" --update-with-dependencies
composer require spryker/store-gui:"^1.2.0" --update-with-dependencies
composer require spryker/stores-rest-api:"^1.1.0" --update-with-dependencies
composer require spryker/synchronization:"^1.16.0" --update-with-dependencies
composer require spryker/tax:"^5.13.0" --update-with-dependencies
composer require spryker/tax-product-connector:"^4.7.0" --update-with-dependencies
composer require spryker/testify:"^3.48.0" --update-with-dependencies
composer require spryker/touch:"^4.6.0" --update-with-dependencies
composer require spryker/translator:"^1.11.0" --update-with-dependencies
composer require spryker/url:"^3.11.0" --update-with-dependencies
composer require spryker/url-collector:"^1.3.0" --update-with-dependencies
composer require spryker/url-storage:"^1.16.0" --update-with-dependencies
composer require spryker/user-locale:"^1.3.0" --update-with-dependencies
composer require spryker/user-locale-gui:"^1.1.0" --update-with-dependencies
composer require spryker/user-merchant-portal-gui:"^2.1.0" --update-with-dependencies
composer require spryker/util-date-time:"^1.3.0" --update-with-dependencies
composer require spryker/zed-request:"^3.19.0" --update-with-dependencies
composer require spryker/zed-request-extension:"^1.1.0" --update-with-dependencies
composer require spryker-shop/customer-page:"^2.41.0" --update-with-dependencies
composer require spryker-shop/shop-ui:"^1.67.0" --update-with-dependencies
composer require spryker/synchronization-behavior:"^1.10.0" --update-with-dependencies
composer require spryker/agent:"^1.5.2" --update-with-dependencies
composer require spryker/asset-storage:"^1.2.1" --update-with-dependencies
composer require spryker/auth-rest-api:"^2.14.2" --update-with-dependencies
composer require spryker/availability-storage:"^2.7.1" --update-with-dependencies
composer require spryker/business-on-behalf:"^1.1.3" --update-with-dependencies
composer require spryker/calculation:"^4.12.1" --update-with-dependencies
composer require spryker/cart:"^7.11.1" --update-with-dependencies
composer require spryker/cart-codes-rest-api:"^1.4.1" --update-with-dependencies
composer require spryker/carts-rest-api:"^5.22.1" --update-with-dependencies
composer require spryker/category-image-storage:"^1.6.1" --update-with-dependencies
composer require spryker/category-navigation-connector:"^1.0.3" --update-with-dependencies
composer require spryker/category-page-search:"^2.2.1" --update-with-dependencies
composer require spryker/checkout:"^6.4.3" --update-with-dependencies
composer require spryker/cms-slot-block:"^1.1.1" --update-with-dependencies
composer require spryker/cms-slot-storage:"^1.2.1" --update-with-dependencies
composer require spryker/comment:"^1.2.2" --update-with-dependencies
composer require spryker/company:"^1.5.2" --update-with-dependencies
composer require spryker/company-business-unit:"^2.14.3" --update-with-dependencies
composer require spryker/company-business-unit-gui:"^2.10.1" --update-with-dependencies
composer require spryker/company-business-unit-sales-connector:"^1.1.1" --update-with-dependencies
composer require spryker/company-role:"^1.7.2" --update-with-dependencies
composer require spryker/company-sales-connector:"^1.1.1" --update-with-dependencies
composer require spryker/company-user:"^2.15.2" --update-with-dependencies
composer require spryker/company-user-invitation:"^1.3.2" --update-with-dependencies
composer require spryker/company-user-storage:"^1.5.1" --update-with-dependencies
composer require spryker/company-users-rest-api:"^2.5.1" --update-with-dependencies
composer require spryker/configurable-bundle-note:"^1.0.1" --update-with-dependencies
composer require spryker/configurable-bundle-page-search:"^1.4.1" --update-with-dependencies
composer require spryker/customer-access-storage:"^1.7.1" --update-with-dependencies
composer require spryker/customer-note:"^1.1.1" --update-with-dependencies
composer require spryker/customer-user-connector:"^1.0.4" --update-with-dependencies
composer require spryker/development:"^3.34.4" --update-with-dependencies
composer require spryker/gift-card:"^1.8.1" --update-with-dependencies
composer require spryker/glossary-storage:"^1.11.1" --update-with-dependencies
composer require spryker/gui:"^3.47.2" --update-with-dependencies
composer require spryker/merchant-oms:"^1.0.3" --update-with-dependencies
composer require spryker/merchant-opening-hours-storage:"^1.0.2" --update-with-dependencies
composer require spryker/merchant-product-offer-search:"^1.4.1" --update-with-dependencies
composer require spryker/merchant-product-offer-storage:"^2.0.1" --update-with-dependencies
composer require spryker/merchant-product-offer-wishlist:"^1.2.1" --update-with-dependencies
composer require spryker/merchant-product-offer-wishlist-rest-api:"^1.1.1" --update-with-dependencies
composer require spryker/merchant-product-search:"^1.2.1" --update-with-dependencies
composer require spryker/merchant-sales-order:"^1.1.2" --update-with-dependencies
composer require spryker/merchant-sales-return:"^1.0.1" --update-with-dependencies
composer require spryker/merchant-search:"^1.0.1" --update-with-dependencies
composer require spryker/merchant-storage:"^1.1.1" --update-with-dependencies
composer require spryker/oauth:"^2.8.1" --update-with-dependencies
composer require spryker/oauth-company-user:"^2.2.1" --update-with-dependencies
composer require spryker/oauth-permission:"^1.3.1" --update-with-dependencies
composer require spryker/oms-product-offer-reservation:"^1.0.2" --update-with-dependencies
composer require spryker/order-custom-reference:"^1.0.1" --update-with-dependencies
composer require spryker/payment:"^5.10.2" --update-with-dependencies
composer require spryker/permission:"^1.5.4" --update-with-dependencies
composer require spryker/price-product-merchant-relationship:"^1.9.1" --update-with-dependencies
composer require spryker/price-product-offer-volume:"^1.0.3" --update-with-dependencies
composer require spryker/price-product-schedule-gui:"^2.3.1" --update-with-dependencies
composer require spryker/price-product-storage:"^4.9.1" --update-with-dependencies
composer require spryker/product-alternative-storage:"^1.11.1" --update-with-dependencies
composer require spryker/product-bundle-storage:"^1.1.1" --update-with-dependencies
composer require spryker/product-category-search:"^1.1.1" --update-with-dependencies
composer require spryker/product-configuration-wishlist:"^1.0.2" --update-with-dependencies
composer require spryker/product-configuration-wishlists-rest-api:"^1.1.2" --update-with-dependencies
composer require spryker/product-group-storage:"^1.4.1" --update-with-dependencies
composer require spryker/product-image-cart-connector:"^1.2.4" --update-with-dependencies
composer require spryker/product-label-collector:"^1.3.1" --update-with-dependencies
composer require spryker/product-label-search:"^2.3.1" --update-with-dependencies
composer require spryker/product-measurement-unit:"^5.3.2" --update-with-dependencies
composer require spryker/product-offer:"^1.5.1" --update-with-dependencies
composer require spryker/product-offer-availability:"^1.1.2" --update-with-dependencies
composer require spryker/product-offer-availability-storage:"^1.0.2" --update-with-dependencies
composer require spryker/product-offer-shopping-list:"^1.0.1" --update-with-dependencies
composer require spryker/product-option-cart-connector:"^7.1.3" --update-with-dependencies
composer require spryker/product-packaging-unit-storage:"^5.2.1" --update-with-dependencies
composer require spryker/product-relation-storage:"^2.3.1" --update-with-dependencies
composer require spryker/product-review-storage:"^1.5.1" --update-with-dependencies
composer require spryker/quote-approval:"^1.6.2" --update-with-dependencies
composer require spryker/quote-request:"^2.4.2" --update-with-dependencies
composer require spryker/router:"^1.15.1" --update-with-dependencies
composer require spryker/sales-configurable-bundle:"^1.5.2" --update-with-dependencies
composer require spryker/sales-payment:"^1.3.1" --update-with-dependencies
composer require spryker/sales-product-connector:"^1.8.2" --update-with-dependencies
composer require spryker/shared-cart:"^1.19.1" --update-with-dependencies
composer require spryker/shared-carts-rest-api:"^1.2.6" --update-with-dependencies
composer require spryker/shipment-cart-connector:"^2.1.2" --update-with-dependencies
composer require spryker/shipments-rest-api:"^1.6.2" --update-with-dependencies
composer require spryker/shopping-list:"^4.10.1" --update-with-dependencies
composer require spryker/shopping-list-note:"^1.2.1" --update-with-dependencies
composer require spryker/shopping-list-product-option-connector:"^1.4.2" --update-with-dependencies
composer require spryker/stock:"^8.5.1" --update-with-dependencies
composer require spryker/stock-data-import:"^1.2.1" --update-with-dependencies
composer require spryker/storage-database:"^1.2.1" --update-with-dependencies
composer require spryker/tax-product-storage:"^1.3.1" --update-with-dependencies
composer require spryker/tax-storage:"^1.4.1" --update-with-dependencies
composer require spryker/twig:"^3.18.1" --update-with-dependencies
composer require spryker/wishlist:"^8.7.2" --update-with-dependencies
composer require spryker/wishlists-rest-api:"^1.6.2" --update-with-dependencies
composer require spryker-shop/catalog-page:"^1.25.0" --update-with-dependencies
composer require spryker-shop/checkout-page:"^3.24.0" --update-with-dependencies
composer require spryker-shop/cms-page:"^1.8.0" --update-with-dependencies
composer require spryker-shop/company-page:"^2.21.0" --update-with-dependencies
composer require spryker-shop/configurable-bundle-widget:"^1.8.0" --update-with-dependencies
composer require spryker-shop/customer-reorder-widget:"^6.14.0" --update-with-dependencies
composer require spryker-shop/language-switcher-widget:"^1.5.0" --update-with-dependencies
composer require spryker-shop/money-widget:"^1.7.0" --update-with-dependencies
composer require spryker-shop/product-measurement-unit-widget:"^1.2.0" --update-with-dependencies
composer require spryker-shop/product-new-page:"^1.4.0" --update-with-dependencies
composer require spryker-shop/product-packaging-unit-widget:"^1.5.0" --update-with-dependencies
composer require spryker-shop/product-search-widget:"^3.5.0" --update-with-dependencies
composer require spryker-shop/quick-order-page:"^4.9.0" --update-with-dependencies
composer require spryker-shop/shop-application:"^1.15.0" --update-with-dependencies
composer require spryker-shop/shopping-list-page:"^1.9.0" --update-with-dependencies
```

If you can’t install the required version, run the following command to see what else you need to update:

```bash
composer why-not spryker/module-name:1.0.0
```

And for check installed modules run:

```bash
composer show spryker/*
```


{% info_block warningBox "Verification" %}

Make sure that the new modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                          |
|-----------------------------|---------------------------------------------|
| Country                     | vendor/spryker/country/                     |
| CountryDataImport           | vendor/spryker/country-data-import/         |
| CountryGui                  | vendor/spryker/country-gui/                 |
| Currency                    | vendor/spryker/currency/                    |
| CurrencyDataImport          | vendor/spryker/currency-data-import/        |
| CurrencyGui                 | vendor/spryker/currency-gui/                |
| Locale                      | vendor/spryker/locale/                      |
| LocaleDataImport            | vendor/spryker/locale-data-import/          |
| LocaleGui                   | vendor/spryker/locale-gui/                  |
| ToreContextGui              | vendor/spryker/store-context-gui/           |
| ToreDataImport              | vendor/spryker/store-data-import/           |
| ToreExtension               | vendor/spryker/store-extension/             |
| ToreGuiExtension            | vendor/spryker/store-gui-extension/         |
| ToreStorage                 | vendor/spryker/store-storage/               |
| Shop/storeWidget            | vendor/spryker-shop/store-widget/           |
| Eco/payone                  | vendor/spryker-eco/payone/                  |
| AbbitMq                     | vendor/spryker/rabbit-mq/                   |
| AclEntityDataImport         | vendor/spryker/acl-entity-data-import/      |
| AclMerchantPortal           | vendor/spryker/acl-merchant-portal/         |
| Application                 | vendor/spryker/application/                 |
| Availability                | vendor/spryker/availability/                |
| AvailabilityGui             | vendor/spryker/availability-gui/            |
| AvailabilityNotification    | vendor/spryker/availability-notification/   |
| CartCurrencyConnector       | vendor/spryker/cart-currency-connector/     |
| CatalogPriceProductConnector | vendor/spryker/catalog-price-product-connector/ |
| CatalogSearchRestApi        | vendor/spryker/catalog-search-rest-api/     |
| Category                    | vendor/spryker/category/                    |
| CategoryDataFeed            | vendor/spryker/category-data-feed/          |
| CategoryDiscountConnector   | vendor/spryker/category-discount-connector/ |
| CategoryGui                 | vendor/spryker/category-gui/                |
| CategoryImage               | vendor/spryker/category-image/              |
| CategoryImageGui            | vendor/spryker/category-image-gui/          |
| CategoryStorage             | vendor/spryker/category-storage/            |
| Cms                         | vendor/spryker/cms/                         |
| CmsBlock                    | vendor/spryker/cms-block/                   |
| CmsBlockCategoryConnector   | vendor/spryker/cms-block-category-connector/ |
| CmsBlockGui                 | vendor/spryker/cms-block-gui/               |
| CmsBlockProductConnector    | vendor/spryker/cms-block-product-connector/ |
| CmsBlockStorage             | vendor/spryker/cms-block-storage/           |
| CmsGui                      | vendor/spryker/cms-gui/                     |
| CmsPageSearch               | vendor/spryker/cms-page-search/             |
| CmsSlotBlockCategoryGui     | vendor/spryker/cms-slot-block-category-gui/ |
| CmsSlotBlockCmsGui          | vendor/spryker/cms-slot-block-cms-gui/      |
| CmsSlotBlockProductCategoryConnector | vendor/spryker/cms-slot-block-product-category-connector/ |
| CmsSlotBlockProductCategoryGui | vendor/spryker/cms-slot-block-product-category-gui/ |
| CmsSlotLocaleConnector      | vendor/spryker/cms-slot-locale-connector/   |
| CmsStorage                  | vendor/spryker/cms-storage/                 |
| Collector                   | vendor/spryker/collector/                   |
| CommentDataImport           | vendor/spryker/comment-data-import/         |
| CompanyBusinessUnitDataImport | vendor/spryker/company-business-unit-data-import/ |
| CompanyRoleDataImport       | vendor/spryker/company-role-data-import/    |
| CompanySupplierDataImport   | vendor/spryker/company-supplier-data-import/ |
| CompanySupplierGui          | vendor/spryker/company-supplier-gui/        |
| CompanyUnitAddress          | vendor/spryker/company-unit-address/        |
| CompanyUnitAddressDataImport | vendor/spryker/company-unit-address-data-import/ |
| CompanyUnitAddressGui       | vendor/spryker/company-unit-address-gui/    |
| CompanyUserDataImport       | vendor/spryker/company-user-data-import/    |
| Config                      | vendor/spryker/config/                      |
| ConfigurableBundle          | vendor/spryker/configurable-bundle/         |
| ConfigurableBundleCartsRestApi | vendor/spryker/configurable-bundle-carts-rest-api/ |
| ConfigurableBundleDataImport | vendor/spryker/configurable-bundle-data-import/ |
| ConfigurableBundleGui       | vendor/spryker/configurable-bundle-gui/     |
| ConfigurableBundleStorage   | vendor/spryker/configurable-bundle-storage/ |
| Console                     | vendor/spryker/console/                     |
| Content                     | vendor/spryker/content/                     |
| ContentFileGui              | vendor/spryker/content-file-gui/            |
| ContentGui                  | vendor/spryker/content-gui/                 |
| ContentProductGui           | vendor/spryker/content-product-gui/         |
| ContentProductSetGui        | vendor/spryker/content-product-set-gui/     |
| ContentStorage              | vendor/spryker/content-storage/             |
| Customer                    | vendor/spryker/customer/                    |
| CustomerApi                 | vendor/spryker/customer-api/                |
| DataImport                  | vendor/spryker/data-import/                 |
| Dataset                     | vendor/spryker/dataset/                     |
| Discount                    | vendor/spryker/discount/                    |
| FileManager                 | vendor/spryker/file-manager/                |
| FileManagerGui              | vendor/spryker/file-manager-gui/            |
| FileManagerStorage          | vendor/spryker/file-manager-storage/        |
| GiftCardMailConnector       | vendor/spryker/gift-card-mail-connector/    |
| Glossary                    | vendor/spryker/glossary/                    |
| Http                        | vendor/spryker/http/                        |
| Nel                         | vendor/spryker/kernel/                      |
| Log                         | vendor/spryker/log/                         |
| Mail                        | vendor/spryker/mail/                        |
| ManualOrderEntryGui         | vendor/spryker/manual-order-entry-gui/      |
| MerchantGui                 | vendor/spryker/merchant-gui/                |
| MerchantProduct             | vendor/spryker/merchant-product/            |
| MerchantProductStorage      | vendor/spryker/merchant-product-storage/    |
| MerchantProfile             | vendor/spryker/merchant-profile/            |
| MerchantProfileDataImport   | vendor/spryker/merchant-profile-data-import/ |
| MerchantProfileGui          | vendor/spryker/merchant-profile-gui/        |
| MerchantProfileMerchantPortalGui | vendor/spryker/merchant-profile-merchant-portal-gui/ |
| MerchantRelationshipSalesOrderThreshold | vendor/spryker/merchant-relationship-sales-order-threshold/ |
| MerchantRelationshipSalesOrderThresholdDataImport | vendor/spryker/merchant-relationship-sales-order-threshold-data-import/ |
| MerchantRelationshipSalesOrderThresholdGui | vendor/spryker/merchant-relationship-sales-order-threshold-gui/ |
| MerchantSalesOrderDataExport | vendor/spryker/merchant-sales-order-data-export/ |
| MerchantSwitcher            | vendor/spryker/merchant-switcher/           |
| Money                       | vendor/spryker/money/                       |
| Monitoring                  | vendor/spryker/monitoring/                  |
| MultiCart                   | vendor/spryker/multi-cart/                  |
| MultiCartDataImport         | vendor/spryker/multi-cart-data-import/      |
| Navigation                  | vendor/spryker/navigation/                  |
| NavigationGui               | vendor/spryker/navigation-gui/              |
| NavigationStorage           | vendor/spryker/navigation-storage/          |
| OfferGui                    | vendor/spryker/offer-gui/                   |
| Oms                         | vendor/spryker/oms/                         |
| IstentCart                  | vendor/spryker/persistent-cart/             |
| IceCartConnector            | vendor/spryker/price-cart-connector/        |
| IceProduct                  | vendor/spryker/price-product/               |
| IceProductDataImport        | vendor/spryker/price-product-data-import/   |
| IceProductMerchantRelationshipDataImport | vendor/spryker/price-product-merchant-relationship-data-import/ |
| IceProductMerchantRelationshipStorage | vendor/spryker/price-product-merchant-relationship-storage/ |
| IceProductOffer             | vendor/spryker/price-product-offer/         |
| IceProductOfferDataImport   | vendor/spryker/price-product-offer-data-import/ |
| IceProductOfferGui          | vendor/spryker/price-product-offer-gui/     |
| IceProductOfferStorage      | vendor/spryker/price-product-offer-storage/ |
| IceProductSchedule          | vendor/spryker/price-product-schedule/      |
| IceProductScheduleDataImport | vendor/spryker/price-product-schedule-data-import/ |
| IceProductVolume            | vendor/spryker/price-product-volume/        |
| IceProductVolumeGui         | vendor/spryker/price-product-volume-gui/    |
| Oduct                       | vendor/spryker/product/                     |
| OductAbstractDataFeed       | vendor/spryker/product-abstract-data-feed/  |
| OductAlternative            | vendor/spryker/product-alternative/         |
| OductAlternativeProductLabelConnector | vendor/spryker/product-alternative-product-label-connector/ |
| OductAttribute              | vendor/spryker/product-attribute/           |
| OductAttributeGui           | vendor/spryker/product-attribute-gui/       |
| OductBarcodeGui             | vendor/spryker/product-barcode-gui/         |
| OductBundle                 | vendor/spryker/product-bundle/              |
| OductCartConnector          | vendor/spryker/product-cart-connector/      |
| OductCategory               | vendor/spryker/product-category/            |
| OductCategoryFilterGui      | vendor/spryker/product-category-filter-gui/ |
| OductCategoryStorage        | vendor/spryker/product-category-storage/    |
| OductConfiguration          | vendor/spryker/product-configuration/       |
| OductConfigurationStorage   | vendor/spryker/product-configuration-storage/ |
| OductCustomerPermission     | vendor/spryker/product-customer-permission/ |
| OductDiscontinued           | vendor/spryker/product-discontinued/        |
| OductDiscontinuedGui        | vendor/spryker/product-discontinued-gui/    |
| OductDiscontinuedProductLabelConnector | vendor/spryker/product-discontinued-product-label-connector/ |
| OductDiscontinuedStorage    | vendor/spryker/product-discontinued-storage/ |
| OductDiscountConnector      | vendor/spryker/product-discount-connector/  |
| OductImage                  | vendor/spryker/product-image/               |
| OductLabel                  | vendor/spryker/product-label/               |
| OductLabelGui               | vendor/spryker/product-label-gui/           |
| OductLabelStorage           | vendor/spryker/product-label-storage/       |
| OductListGui                | vendor/spryker/product-list-gui/            |
| OductManagement             | vendor/spryker/product-management/          |
| OductMerchantPortalGui      | vendor/spryker/product-merchant-portal-gui/ |
| OductNew                    | vendor/spryker/product-new/                 |
| OductOfferGui               | vendor/spryker/product-offer-gui/           |
| OductOfferMerchantPortalGui | vendor/spryker/product-offer-merchant-portal-gui/ |
| OductOption                 | vendor/spryker/product-option/              |
| OductOptionStorage          | vendor/spryker/product-option-storage/      |
| OductOptionsRestApi         | vendor/spryker/product-options-rest-api/    |
| OductPackagingUnit          | vendor/spryker/product-packaging-unit/      |
| OductPageSearch             | vendor/spryker/product-page-search/         |
| OductPricesRestApi          | vendor/spryker/product-prices-rest-api/     |
| OductRelation               | vendor/spryker/product-relation/            |
| OductRelationGui            | vendor/spryker/product-relation-gui/        |
| OductReview                 | vendor/spryker/product-review/              |
| OductReviewGui              | vendor/spryker/product-review-gui/          |
| OductReviewSearch           | vendor/spryker/product-review-search/       |
| OductSearch                 | vendor/spryker/product-search/              |
| OductSet                    | vendor/spryker/product-set/                 |
| OductSetGui                 | vendor/spryker/product-set-gui/             |
| OductSetPageSearch          | vendor/spryker/product-set-page-search/     |
| OductStorage                | vendor/spryker/product-storage/             |
| Opel                        | vendor/spryker/propel/                      |
| QuickOrder                  | vendor/spryker/quick-order/                 |
| Quote                       | vendor/spryker/quote/                       |
| QuoteExtension              | vendor/spryker/quote-extension/             |
| QuoteRequestDataImport      | vendor/spryker/quote-request-data-import/   |
| QuoteRequestsRestApi        | vendor/spryker/quote-requests-rest-api/     |
| TRequestValidator           | vendor/spryker/rest-request-validator/      |
| Ales                        | vendor/spryker/sales/                       |
| AlesDataExport              | vendor/spryker/sales-data-export/           |
| AlesInvoice                 | vendor/spryker/sales-invoice/               |
| AlesMerchantPortalGui       | vendor/spryker/sales-merchant-portal-gui/   |
| AlesOms                     | vendor/spryker/sales-oms/                   |
| AlesOrderThreshold          | vendor/spryker/sales-order-threshold/       |
| AlesOrderThresholdDataImport | vendor/spryker/sales-order-threshold-data-import/ |
| AlesOrderThresholdGui       | vendor/spryker/sales-order-threshold-gui/   |
| AlesReturn                  | vendor/spryker/sales-return/                |
| AlesReturnGui               | vendor/spryker/sales-return-gui/            |
| AlesReturnSearch            | vendor/spryker/sales-return-search/         |
| Cheduler                    | vendor/spryker/scheduler/                   |
| ChedulerJenkins             | vendor/spryker/scheduler-jenkins/           |
| Arch                        | vendor/spryker/search/                      |
| ArchElasticsearch           | vendor/spryker/search-elasticsearch/        |
| ArchExtension               | vendor/spryker/search-extension/            |
| Hipment                     | vendor/spryker/shipment/                    |
| HipmentDataImport           | vendor/spryker/shipment-data-import/        |
| HoppingListDataImport       | vendor/spryker/shopping-list-data-import/   |
| TockAddress                 | vendor/spryker/stock-address/               |
| TockAddressDataImport       | vendor/spryker/stock-address-data-import/   |
| Torage                      | vendor/spryker/storage/                     |
| Tore                        | vendor/spryker/store/                       |
| ToreGui                     | vendor/spryker/store-gui/                   |
| ToresRestApi                | vendor/spryker/stores-rest-api/             |
| Nchronization               | vendor/spryker/synchronization/             |
| Tax                         | vendor/spryker/tax/                         |
| TaxProductConnector         | vendor/spryker/tax-product-connector/       |
| Testify                     | vendor/spryker/testify/                     |
| Touch                       | vendor/spryker/touch/                       |
| Translator                  | vendor/spryker/translator/                  |
| Url                         | vendor/spryker/url/                         |
| UrlCollector                | vendor/spryker/url-collector/               |
| UrlStorage                  | vendor/spryker/url-storage/                 |
| UserLocale                  | vendor/spryker/user-locale/                 |
| UserLocaleGui               | vendor/spryker/user-locale-gui/             |
| UserMerchantPortalGui       | vendor/spryker/user-merchant-portal-gui/    |
| UtilDateTime                | vendor/spryker/util-date-time/              |
| ZedRequest                  | vendor/spryker/zed-request/                 |
| ZedRequestExtension         | vendor/spryker/zed-request-extension/       |
| Shop/customerPage           | vendor/spryker-shop/customer-page/          |
| Shop/shopUi                 | vendor/spryker-shop/shop-ui/                |
| NchronizationBehavior       | vendor/spryker/synchronization-behavior/    |
| Agent                       | vendor/spryker/agent/                       |
| AssetStorage                | vendor/spryker/asset-storage/               |
| AuthRestApi                 | vendor/spryker/auth-rest-api/               |
| AvailabilityStorage         | vendor/spryker/availability-storage/        |
| BusinessOnBehalf            | vendor/spryker/business-on-behalf/          |
| Calculation                 | vendor/spryker/calculation/                 |
| Cart                        | vendor/spryker/cart/                        |
| CartCodesRestApi            | vendor/spryker/cart-codes-rest-api/         |
| CartsRestApi                | vendor/spryker/carts-rest-api/              |
| CategoryImageStorage        | vendor/spryker/category-image-storage/      |
| CategoryNavigationConnector | vendor/spryker/category-navigation-connector/ |
| CategoryPageSearch          | vendor/spryker/category-page-search/        |
| Checkout                    | vendor/spryker/checkout/                    |
| CmsSlotBlock                | vendor/spryker/cms-slot-block/              |
| CmsSlotStorage              | vendor/spryker/cms-slot-storage/            |
| Comment                     | vendor/spryker/comment/                     |
| Company                     | vendor/spryker/company/                     |
| CompanyBusinessUnit         | vendor/spryker/company-business-unit/       |
| CompanyBusinessUnitGui      | vendor/spryker/company-business-unit-gui/   |
| CompanyBusinessUnitSalesConnector | vendor/spryker/company-business-unit-sales-connector/ |
| CompanyRole                 | vendor/spryker/company-role/                |
| CompanySalesConnector       | vendor/spryker/company-sales-connector/     |
| CompanyUser                 | vendor/spryker/company-user/                |
| CompanyUserInvitation       | vendor/spryker/company-user-invitation/     |
| CompanyUserStorage          | vendor/spryker/company-user-storage/        |
| CompanyUsersRestApi         | vendor/spryker/company-users-rest-api/      |
| ConfigurableBundleNote      | vendor/spryker/configurable-bundle-note/    |
| ConfigurableBundlePageSearch | vendor/spryker/configurable-bundle-page-search/ |
| CustomerAccessStorage       | vendor/spryker/customer-access-storage/     |
| CustomerNote                | vendor/spryker/customer-note/               |
| CustomerUserConnector       | vendor/spryker/customer-user-connector/     |
| Development                 | vendor/spryker/development/                 |
| GiftCard                    | vendor/spryker/gift-card/                   |
| GlossaryStorage             | vendor/spryker/glossary-storage/            |
| Gui                         | vendor/spryker/gui/                         |
| MerchantOms                 | vendor/spryker/merchant-oms/                |
| MerchantOpeningHoursStorage | vendor/spryker/merchant-opening-hours-storage/ |
| MerchantProductOfferSearch  | vendor/spryker/merchant-product-offer-search/ |
| MerchantProductOfferStorage | vendor/spryker/merchant-product-offer-storage/ |
| MerchantProductOfferWishlist | vendor/spryker/merchant-product-offer-wishlist/ |
| MerchantProductOfferWishlistRestApi | vendor/spryker/merchant-product-offer-wishlist-rest-api/ |
| MerchantProductSearch       | vendor/spryker/merchant-product-search/     |
| MerchantSalesOrder          | vendor/spryker/merchant-sales-order/        |
| MerchantSalesReturn         | vendor/spryker/merchant-sales-return/       |
| MerchantSearch              | vendor/spryker/merchant-search/             |
| MerchantStorage             | vendor/spryker/merchant-storage/            |
| Oauth                       | vendor/spryker/oauth/                       |
| OauthCompanyUser            | vendor/spryker/oauth-company-user/          |
| OauthPermission             | vendor/spryker/oauth-permission/            |
| OmsProductOfferReservation  | vendor/spryker/oms-product-offer-reservation/ |
| OrderCustomReference        | vendor/spryker/order-custom-reference/      |
| Ayment                      | vendor/spryker/payment/                     |
| Mission                     | vendor/spryker/permission/                  |
| IceProductMerchantRelationship | vendor/spryker/price-product-merchant-relationship/ |
| IceProductOfferVolume       | vendor/spryker/price-product-offer-volume/  |
| IceProductScheduleGui       | vendor/spryker/price-product-schedule-gui/  |
| IceProductStorage           | vendor/spryker/price-product-storage/       |
| OductAlternativeStorage     | vendor/spryker/product-alternative-storage/ |
| OductBundleStorage          | vendor/spryker/product-bundle-storage/      |
| OductCategorySearch         | vendor/spryker/product-category-search/     |
| OductConfigurationWishlist  | vendor/spryker/product-configuration-wishlist/ |
| OductConfigurationWishlistsRestApi | vendor/spryker/product-configuration-wishlists-rest-api/ |
| OductGroupStorage           | vendor/spryker/product-group-storage/       |
| OductImageCartConnector     | vendor/spryker/product-image-cart-connector/ |
| OductLabelCollector         | vendor/spryker/product-label-collector/     |
| OductLabelSearch            | vendor/spryker/product-label-search/        |
| OductMeasurementUnit        | vendor/spryker/product-measurement-unit/    |
| OductOffer                  | vendor/spryker/product-offer/               |
| OductOfferAvailability      | vendor/spryker/product-offer-availability/  |
| OductOfferAvailabilityStorage | vendor/spryker/product-offer-availability-storage/ |
| OductOfferShoppingList      | vendor/spryker/product-offer-shopping-list/ |
| OductOptionCartConnector    | vendor/spryker/product-option-cart-connector/ |
| OductPackagingUnitStorage   | vendor/spryker/product-packaging-unit-storage/ |
| OductRelationStorage        | vendor/spryker/product-relation-storage/    |
| OductReviewStorage          | vendor/spryker/product-review-storage/      |
| QuoteApproval               | vendor/spryker/quote-approval/              |
| QuoteRequest                | vendor/spryker/quote-request/               |
| Outer                       | vendor/spryker/router/                      |
| AlesConfigurableBundle      | vendor/spryker/sales-configurable-bundle/   |
| AlesPayment                 | vendor/spryker/sales-payment/               |
| AlesProductConnector        | vendor/spryker/sales-product-connector/     |
| HaredCart                   | vendor/spryker/shared-cart/                 |
| HaredCartsRestApi           | vendor/spryker/shared-carts-rest-api/       |
| HipmentCartConnector        | vendor/spryker/shipment-cart-connector/     |
| HipmentsRestApi             | vendor/spryker/shipments-rest-api/          |
| HoppingList                 | vendor/spryker/shopping-list/               |
| HoppingListNote             | vendor/spryker/shopping-list-note/          |
| HoppingListProductOptionConnector | vendor/spryker/shopping-list-product-option-connector/ |
| Tock                        | vendor/spryker/stock/                       |
| TockDataImport              | vendor/spryker/stock-data-import/           |
| TorageDatabase              | vendor/spryker/storage-database/            |
| TaxProductStorage           | vendor/spryker/tax-product-storage/         |
| TaxStorage                  | vendor/spryker/tax-storage/                 |
| Twig                        | vendor/spryker/twig/                        |
| Wishlist                    | vendor/spryker/wishlist/                    |
| WishlistsRestApi            | vendor/spryker/wishlists-rest-api/          |
|-----------------------------|---------------------------------------------|

{% endinfo_block %}



{% info_block warningBox "Verification Spryker-Shop modules" %}

Make sure that the new modules have been installed or updated in the following directories:

| MODULE                      | EXPECTED DIRECTORY                          |
|-----------------------------|---------------------------------------------|
| CatalogPage                 | vendor/spryker-shop/catalog-page/           |
| CheckoutPage                | vendor/spryker-shop/checkout-page/          |
| CmsPage                     | vendor/spryker-shop/cms-page/               |
| CompanyPage                 | vendor/spryker-shop/company-page/           |
| ConfigurableBundleWidget    | vendor/spryker-shop/configurable-bundle-widget/ |
| CustomerPage                | vendor/spryker-shop/customer-page/          |
| CustomerReorderWidget       | vendor/spryker-shop/customer-reorder-widget/ |
| LanguageSwitcherWidget      | vendor/spryker-shop/language-switcher-widget/ |
| MoneyWidget                 | vendor/spryker-shop/money-widget/           |
| ProductMeasurementUnitWidget | vendor/spryker-shop/product-measurement-unit-widget/ |
| ProductNewPage              | vendor/spryker-shop/product-new-page/       |
| ProductPackagingUnitWidget  | vendor/spryker-shop/product-packaging-unit-widget/ |
| ProductSearchWidget         | vendor/spryker-shop/product-search-widget/  |
| QuickOrderPage              | vendor/spryker-shop/quick-order-page/       |
| ShopApplication             | vendor/spryker-shop/shop-application/       |
| ShopUi                      | vendor/spryker-shop/shop-ui/                |
| ShoppingListPage            | vendor/spryker-shop/shopping-list-page/     |
| StoreWidget                 | vendor/spryker-shop/store-widget/           |

{% endinfo_block %}

### Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:
    
```bash 

console transfer:generate
console propel:install
console transfer:generate

```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                       | TYPE   | EVENT   |
|---------------------------------------|--------|---------|
| spy_store.fk_currency                 | column | added   |
| spy_store.fk_locale                   | column | added   |
| spy_country_store                     | table  | added   |
| spy_locale_store                      | table  | added   |
| spy_currency_store                    | table  | added   |

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CurrencyCriteria | class | created | src/Generated/Shared/Transfer/CurrencyCriteriaTransfer  |
| LocaleConditions | class | created | src/Generated/Shared/Transfer/LocaleConditionsTransfer  |
| SearchContext.storeName | property | added | src/Generated/Shared/Transfer/SearchContextTransfer |
| SchedulerJob.region     | property | added | src/Generated/Shared/Transfer/SchedulerJobTransfer  |
| ProductConcrete.stores            | property | added | src/Generated/Shared/Transfer/ProductConcreteTransfer  |
| Customer.storeName                | property | added | src/Generated/Shared/Transfer/CustomerTransfer  |
| Store.defaultCurrencyIsoCode      | property | added | src/Generated/Shared/Transfer/CustomerTransfer  |

{% endinfo_block %}

 
### Change configuration 

{% info_block warningBox "Configuration store.php" %}

Dynamic store allows not to use the configuration in the file `config/Shared/stores.php` where setup configureation for  store's. 

{% endinfo_block %}

1. Change the default configuration file. 
Allow configurations for queues to be set dynamically.

Modify your configuration file

```
config/Shared/config_default.php
```

Change the following code block:

```php
<?php
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
$connectionKeys = array_keys($rabbitConnections);
$defaultKey = reset($connectionKeys);
if (getenv('SPRYKER_CURRENT_REGION')) {
    $defaultKey = getenv('SPRYKER_CURRENT_REGION');
}
if (getenv('APPLICATION_STORE') && (bool)getenv('SPRYKER_DYNAMIC_STORE_MODE') === false) {
    $defaultKey = getenv('APPLICATION_STORE');
}
foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];
    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === $defaultKey;
}
```

to

```php
<?php 

$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
$connectionKeys = array_keys($rabbitConnections);
$defaultKey = reset($connectionKeys);
if (getenv('SPRYKER_CURRENT_REGION')) {
    $defaultKey = getenv('SPRYKER_CURRENT_REGION');
}
if (getenv('APPLICATION_STORE') && (bool)getenv('SPRYKER_DYNAMIC_STORE_MODE') === false) {
    $defaultKey = getenv('APPLICATION_STORE');
}
foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];
    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === $defaultKey;
}
```

This code allows to set the configuration for queues dynamically. Use environment variables `SPRYKER_CURRENT_REGION` and `APPLICATION_STORE` to set the configuration for queues.
    

###  Change configuration for Jenkins jobs.

Delete the variable `$allStores` and its use in the configuration of the jobs through the `stores` parameter.

```
config/Zed/cronjobs/jenkins.php
```

So, the code block should be delete in you configuration file.


```php
$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

```

So, job configuration will be like this:

```php
$jobs[] = [
    'name' => 'job-name',
    'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '0 6 * * *',
    'enable' => true,
];
```

For jobs `queue-worker-start`, `apply-price-product-schedule` add parameter `storeAware` with value `true`


```php
$jobs[] = [
    'name' => 'queue-worker-start',
    'command' => '$PHP_BIN vendor/bin/console queue:worker:start',
    'schedule' => '* * * * *',
    'enable' => true,
    'storeAware' => true,
];

$jobs[] = [
    'name' => 'apply-price-product-schedule',
    'command' => '$PHP_BIN vendor/bin/console price-product-schedule:apply',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'storeAware' => true,
];
```
Please add the following code to the end of the configuration of the jobs in the configuration of the current region (if it is set).

```php

if (getenv('SPRYKER_CURRENT_REGION')) {
    foreach ($jobs as $job) {
        $job['region'] = getenv('SPRYKER_CURRENT_REGION');
    }
}
```

### Change the configuration of the RabbitMQ queue.


The configuration of the RabbitMQ connection is set in the configuration file `config/Shared/config_default.php` and `config/Shared/config_ci.php`.

```
src/Pyz/Client/RabbitMq/RabbitMqConfig.php
```

```php 
<?php 

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\StoreStorage\StoreStorageConfig;


class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<array<string>>
     */
    public function getQueuePools(): array
    {
        return [
            'synchronizationPool' => [
                'EU-connection',
            ],
        ];
    }

    /**
     * @return string|null
     */
    public function getDefaultLocaleCode(): ?string
    {
        return 'en_US';
    }


    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE,
        ];
    } 
}    

```

### Change the configuration of the Store module.

```
src/Pyz/Client/Store/StoreDependencyProvider.php
```
```php
<?php

namespace Pyz\Client\Store;

use Spryker\Client\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;
use Spryker\Client\StoreStorage\Plugin\Store\StoreStorageStoreExpanderPlugin;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Client\StoreExtension\Dependency\Plugin\StoreExpanderPluginInterface>
     */
    protected function getStoreExpanderPlugins(): array
    {
        return [
            new StoreStorageStoreExpanderPlugin(),
        ];
    }
}
```

### Adjust the configuration of the ZedRequest module. 

```
src/Pyz/Client/ZedRequest/ZedRequestDependencyProvider.php
```

Class `ZedRequestDependencyProvider` should be extended from `Spryker\Client\ZedRequest\ZedRequestDependencyProvider` and the method `getMetaDataProviderPlugins` should be overridden, Like this:

```php
<?php

namespace Pyz\Client\ZedRequest;

use Spryker\Client\Currency\Plugin\ZedRequestMetaDataProviderPlugin;
use Spryker\Client\Locale\Plugin\ZedRequest\LocaleMetaDataProviderPlugin;
use Spryker\Client\Store\Plugin\ZedRequest\StoreMetaDataProviderPlugin;
use Spryker\Client\ZedRequest\ZedRequestDependencyProvider as SprykerZedRequestDependencyProvider;

class ZedRequestDependencyProvider extends SprykerZedRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ZedRequestExtension\Dependency\Plugin\MetaDataProviderPluginInterface>
     */
    protected function getMetaDataProviderPlugins(): array
    {
        return [
            'currency' => new ZedRequestMetaDataProviderPlugin(),
            'store' => new StoreMetaDataProviderPlugin(),
            'locale' => new LocaleMetaDataProviderPlugin(),            
        ];
    }
}

```


### Adjust GlueApplicationDependencyProvider class. 

Remove `SetStoreCurrentLocaleBeforeActionPlugin` plugin from the `getControllerBeforeActionPlugins` method and add `StoreHttpHeaderApplicationPlugin` and `LocaleApplicationPlugin` plugins instead.

```
src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php
```

```php
<?php 

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
use Spryker\Glue\Locale\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Glue\StoresRestApi\Plugin\GlueStorefrontApiApplication\StoreHttpHeaderApplicationPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @deprecated Will be removed without replacement.
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface>
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
            new StoreHttpHeaderApplicationPlugin(),
            new LocaleApplicationPlugin(),
        ];
    }
}
```


### Adjust GlueStorefrontApiApplicationDependencyProvider.

Add `StoreHttpHeaderApplicationPlugin` plugin to the `getApplicationPlugins` method.

```
src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php
```

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\StoresRestApi\Plugin\GlueStorefrontApiApplication\StoreHttpHeaderApplicationPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new StoreHttpHeaderApplicationPlugin(),
        ];
}

```


### Add RouterConfig class.

Addd the following code to the `RouterConfig` class, use the following code:

```
src/Pyz/Yves/Router/RouterConfig.php
```

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Client\Kernel\Container;
use Spryker\Yves\Router\RouterConfig as SprykerRouterConfig;

/**
 * @method \Spryker\Shared\Router\RouterConfig getSharedConfig()
 */
class RouterConfig extends SprykerRouterConfig
{
    /**
     * @see \Spryker\Yves\Router\Plugin\RouterEnhancer\LanguagePrefixRouterEnhancerPlugin
     *
     * @return array<string>
     */
    public function getAllowedLanguages(): array
    {
        return (new Container())->getLocator()->locale()->client()->getAllowedLanguages();
    }
}
```


### Addjust ShopApplicationDependencyProvider

Add `StoreSwitcherWidget` to the `getGlobalWidgets` method. 

```
src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php
```

```php
<?php 
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\StoreWidget\Widget\StoreSwitcherWidget;


class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            StoreSwitcherWidget::class,
        ];
    }
}
```

### Adjust ApplicationDependencyProvider. 

Add `CurrencyBackendGatewayApplicationPlugin`, `LocaleBackendGatewayApplicationPlugin`, `StoreBackendGatewayApplicationPlugin`, `RequestBackendGatewayApplicationPlugin` plugins to the `getBackendGatewayApplicationPlugins` method.

```
src/Pyz/Zed/Application/ApplicationDependencyProvider.php
```

```php 
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Currency\Communication\Plugin\Application\CurrencyBackendGatewayApplicationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleBackendGatewayApplicationPlugin;
use Spryker\Zed\Store\Communication\Plugin\Application\StoreBackendGatewayApplicationPlugin;
use Spryker\Zed\ZedRequest\Communication\Plugin\Application\RequestBackendGatewayApplicationPlugin;


class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackendGatewayApplicationPlugins(): array
    {
        return [
            new RequestBackendGatewayApplicationPlugin(),
            new StoreBackendGatewayApplicationPlugin(),
            new LocaleBackendGatewayApplicationPlugin(),
            new CurrencyBackendGatewayApplicationPlugin(),
        ];
    }
}
```

###  Add method to CustomerConfig class.


Add the following code to the `CustomerConfig` class, use the following code:

```
src/Pyz/Zed/Customer/CustomerConfig.php
```

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    /**
     * {@inheritDoc}
     *
     * @return string|null
     */
    public function getCustomerSequenceNumberPrefix(): ?string
    {
        return 'customer';
    }
}

```

### Adjust PublisherDependencyProvider class.

Add publisher plugins to the `getPublisherPlugins` method.

```
src/Pyz/Zed/Publisher/PublisherDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CountryStore\CountryStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CurrencyStore\CurrencyStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\LocaleStore\LocaleStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreSynchronizationTriggeringPublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\StorePublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getStoreStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new StorePublisherTriggerPlugin(),
        ];
    }
    
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getStoreStoragePlugins(): array
    {
        return [
            new StoreWritePublisherPlugin(),
            new StoreSynchronizationTriggeringPublisherPlugin(),
            new CurrencyStoreWritePublisherPlugin(),
            new CountryStoreWritePublisherPlugin(),
            new LocaleStoreWritePublisherPlugin(),
        ];
    }
}
```

###  Enable SynchronizationStorageQueueMessageProcessorPlugin in the QueueDependencyProvider class.

For synchronization storage queue, add the `SynchronizationStorageQueueMessageProcessorPlugin` plugin to the `getProcessorMessagePlugins` method.

```
src/Pyz/Zed/Queue/QueueDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Zed\Kernel\Container;
use Spryker\Shared\StoreStorage\StoreStorageConfig;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

### Create StoreDependencyProvider class.

StoreDependencyProvider class is used to register new plugins for the Store module. 

Add the following code to the `StoreDependencyProvider` class:


```
src/Pyz/Zed/Store/StoreDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Store;

use Spryker\Zed\Country\Communication\Plugin\Store\CountryStoreCollectionExpanderPlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostCreatePlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostUpdatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStoreCollectionExpanderPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostCreatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostUpdatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreCreateValidationPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostUpdatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreCreateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStoreCollectionExpanderPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostUpdatePlugin;
use Spryker\Zed\Search\Communication\Plugin\Store\SearchSetupSourcesStorePostCreatePlugin;
use Spryker\Zed\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreCreateValidationPluginInterface>
     */
    protected function getStorePreCreateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreCreateValidationPlugin(),
            new DefaultCurrencyStorePreCreateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreUpdateValidationPluginInterface>
     */
    protected function getStorePreUpdateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreUpdateValidationPlugin(),
            new DefaultCurrencyStorePreUpdateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostCreatePluginInterface>
     */
    protected function getStorePostCreatePlugins(): array
    {
        return [
            new CountryStorePostCreatePlugin(),
            new CurrencyStorePostCreatePlugin(),
            new DefaultLocaleStorePostCreatePlugin(),
            new LocaleStorePostCreatePlugin(),
            new SearchSetupSourcesStorePostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostUpdatePluginInterface>
     */
    protected function getStorePostUpdatePlugins(): array
    {
        return [
            new CountryStorePostUpdatePlugin(),
            new CurrencyStorePostUpdatePlugin(),
            new DefaultLocaleStorePostUpdatePlugin(),
            new LocaleStorePostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StoreCollectionExpanderPluginInterface>
     */
    protected function getStoreCollectionExpanderPlugins(): array
    {
        return [
            new CountryStoreCollectionExpanderPlugin(),
            new CurrencyStoreCollectionExpanderPlugin(),
            new LocaleStoreCollectionExpanderPlugin(),
        ];
    }
}

```

### Create class `StoreGuiDependencyProvider`.

The `StoreGuiDependencyProvider` class is used to register new plugins for the StoreGui module. 

Add the following code to the `StoreGuiDependencyProvider` class:

```
src/Pyz/Zed/StoreGui/StoreGuiDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\StoreGui;

use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\AssignedCountriesStoreViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormTabExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreTableExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\AssignedCurrenciesStoreViewExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormTabExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormViewExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreTableExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\AssignedLocalesStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\DefaultLocaleStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormTabExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreTableExpanderPlugin;
use Spryker\Zed\StoreGui\StoreGuiDependencyProvider as SprykerStoreGuiDependencyProvider;

class StoreGuiDependencyProvider extends SprykerStoreGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormExpanderPluginInterface>
     */
    protected function getStoreFormExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormExpanderPlugin(),
            new CurrencyStoreFormExpanderPlugin(),
            new CountryStoreFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormViewExpanderPluginInterface>
     */
    protected function getStoreFormViewExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormViewExpanderPlugin(),
            new CurrencyStoreFormViewExpanderPlugin(),
            new CountryStoreFormViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormTabExpanderPluginInterface>
     */
    protected function getStoreFormTabsExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormTabExpanderPlugin(),
            new CurrencyStoreFormTabExpanderPlugin(),
            new CountryStoreFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreViewExpanderPluginInterface>
     */
    protected function getStoreViewExpanderPlugins(): array
    {
        return [
            new DefaultLocaleStoreViewExpanderPlugin(),
            new AssignedLocalesStoreViewExpanderPlugin(),
            new AssignedCurrenciesStoreViewExpanderPlugin(),
            new AssignedCountriesStoreViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreTableExpanderPluginInterface>
     */
    protected function getStoreTableExpanderPlugins(): array
    {
        return [
            new LocaleStoreTableExpanderPlugin(),
            new CurrencyStoreTableExpanderPlugin(),
            new CountryStoreTableExpanderPlugin(),
        ];
    }
}
```

### Create class StoreStorageConfig.

```
src/Pyz/Zed/StoreStorage/StoreStorageConfig.php
```

```php
<?php

namespace Pyz\Zed\StoreStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\CompanyUserStorage\CompanyUserStorageConfig;
use Spryker\Shared\CustomerAccessStorage\CustomerAccessStorageConstants;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Shared\MerchantSearch\MerchantSearchConfig;
use Spryker\Shared\MerchantStorage\MerchantStorageConfig;
use Spryker\Shared\NavigationStorage\NavigationStorageConstants;
use Spryker\Shared\ProductMeasurementUnitStorage\ProductMeasurementUnitStorageConfig;
use Spryker\Shared\ProductPackagingUnitStorage\ProductPackagingUnitStorageConfig;
use Spryker\Shared\ProductReviewSearch\ProductReviewSearchConfig;
use Spryker\Shared\SalesReturnSearch\SalesReturnSearchConfig;
use Spryker\Zed\StoreStorage\StoreStorageConfig as SprykerStoreStorageConfig;

class StoreStorageConfig extends SprykerStoreStorageConfig
{
    /**
     * @return string|null
     */
    public function getStoreSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return array<string>
     */
    public function getStoreCreationResourcesToReSync(): array
    {
        return [
            GlossaryStorageConfig::TRANSLATION_RESOURCE_NAME,
            ProductReviewSearchConfig::PRODUCT_REVIEW_RESOURCE_NAME,
            NavigationStorageConstants::RESOURCE_NAME,
            ProductMeasurementUnitStorageConfig::PRODUCT_MEASUREMENT_UNIT_RESOURCE_NAME,
            ProductPackagingUnitStorageConfig::PRODUCT_PACKAGING_UNIT_RESOURCE_NAME,
            CustomerAccessStorageConstants::CUSTOMER_ACCESS_RESOURCE_NAME,
            CompanyUserStorageConfig::COMPANY_USER_RESOURCE_NAME,
            MerchantStorageConfig::MERCHANT_RESOURCE_NAME,
            SalesReturnSearchConfig::RETURN_REASON_RESOURCE_NAME,
            MerchantSearchConfig::MERCHANT_RESOURCE_NAME,
        ];
    }
}

```

### Add plugin to StoreGuiDependencyProvider.


```
src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\StoreStorage\Communication\Plugin\Synchronization\StoreSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new StoreSynchronizationDataPlugin(),
        ];
    }
}

```

### Change CodeBucketConfig class.

Please, adjust the `CodeBucketConfig` class to your needs. For example, you can replace a new code bucket.

```
src/SprykerConfig/CodeBucketConfig.php
```

```php
<?php

namespace SprykerConfig;

use Spryker\Shared\Kernel\CodeBucket\Config\AbstractCodeBucketConfig;

class CodeBucketConfig extends AbstractCodeBucketConfig
{
    /**
     * @return array<string>
     */
    public function getCodeBuckets(): array
    {
        return [
            'EU',
            'US',
        ];
    }

    /**
     * @deprecated This method implementation will be removed when environment configs are cleaned up.
     *
     * @return string
     */
    public function getDefaultCodeBucket(): string
    {
        $codeBuckets = $this->getCodeBuckets();

        return defined('APPLICATION_REGION') ? APPLICATION_REGION : reset($codeBuckets);
    }
}

```

### Dataimport and console commands.

Due to release new major version of `spryker/locale`, `spryker/currency`, `spryker/country` modules, we need to adjust data import.

##### Remove class list: 

- `src/Pyz/Zed/DataImport/Business/Model/Store/StoreReader.php` 
- `src/Pyz/Zed/DataImport/Business/Model/Store/StoreWriterStep.php` 


### Adjust DataImportBusinessFactory` class.

Remove mthod `createStoreImporter` and in method `getDataImporterByType` remove the following code with case `DataImportConfig::IMPORT_TYPE_STORE`

```
src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php
```

```php

    case DataImportConfig::IMPORT_TYPE_STORE:
        return $this->createStoreImporter($dataImportConfigurationActionTransfer);
```


### Adjust `ProductStockBulkPdoDataSetWriter::persistAvailability()` method.


```
src/Pyz/Zed/DataImport/Business/Model/ProductStock/Writer/ProductStockBulkPdoDataSetWriter.php
```

Replace following code:

```php

    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);
        $storeTransfer = $this->storeFacade->getCurrentStore();

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservations = $this->getReservationsBySkus($skus);

        $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservations);

        $sharedStores = $storeTransfer->getStoresWithSharedPersistence();
        foreach ($sharedStores as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservations);
        }

        $this->updateBundleAvailability();
    }
```
to code:

```php

    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservations = $this->getReservationsBySkus($skus);

        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservations);
        }

        $this->updateBundleAvailability();
    }
```

### Adjust `ProductStockBulkPdoMariaDbDataSetWriter::persistAvailability()` method.

You need to replace the following code:

```
src/Pyz/Zed/DataImport/Business/Model/ProductStock/Writer/ProductStockBulkPdoMariaDbDataSetWriter.php
```

```php

    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);
        $storeTransfer = $this->storeFacade->getCurrentStore();

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservationItems = $this->getReservationsBySkus($skus);

        $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservationItems);

        $sharedStores = $storeTransfer->getStoresWithSharedPersistence();
        foreach ($sharedStores as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservationItems);
        }

        $this->updateBundleAvailability();
    }

```

Replace method `persistAvailability` with the following code:

```php
    /**
     * @return void
     */
    protected function persistAvailability(): void
    {
        $skus = $this->dataFormatter->getCollectionDataByKey(static::$stockProductCollection, static::COLUMN_CONCRETE_SKU);

        $concreteSkusToAbstractMap = $this->mapConcreteSkuToAbstractSku($skus);
        $reservationItems = $this->getReservationsBySkus($skus);

        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $this->updateAvailability($skus, $storeTransfer, $concreteSkusToAbstractMap, $reservationItems);
        }

        $this->updateBundleAvailability();
    }

```

### Adjust `ProductStockPropelDataSetWriter::updateAvailability()` and `ProductStockPropelDataSetWriter::getStoreIds()` methods.

Replace the following code:


```
src/Pyz/Zed/DataImport/Business/Model/ProductStock/Writer/ProductStockPropelDataSetWriter.php
```

```php
    /**
     * @return array<int>
     */
    protected function getStoreIds(): array
    {
        $storeTransfer = $this->storeFacade->getCurrentStore();
        $storeIds = [$storeTransfer->getIdStoreOrFail()];

        foreach ($storeTransfer->getStoresWithSharedPersistence() as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $storeIds[] = $storeTransfer->getIdStoreOrFail();
        }

        return $storeIds;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function updateAvailability(DataSetInterface $dataSet): void
    {
        $storeTransfer = $this->storeFacade->getCurrentStore();

        $this->updateAvailabilityForStore($dataSet, $storeTransfer);

        foreach ($storeTransfer->getStoresWithSharedPersistence() as $storeName) {
            $storeTransfer = $this->storeFacade->getStoreByName($storeName);
            $this->updateAvailabilityForStore($dataSet, $storeTransfer);
        }
    }

```

replace with the following code: 

```php
    /**
     * @return array<int>
     */
    protected function getStoreIds(): array
    {
        $storeIds = [];

        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $storeIds[] = $storeTransfer->getIdStoreOrFail();
        }

        return $storeIds;
    }

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    protected function updateAvailability(DataSetInterface $dataSet): void
    {
        foreach ($this->storeFacade->getStoresAvailableForCurrentPersistence() as $storeTransfer) {
            $this->updateAvailabilityForStore($dataSet, $storeTransfer);
        }
    }
```

### Adjust DataImportConfig class.

Replace method `getDefaultYamlConfigPath()` with the following code:

```php
    /**
     * @return string|null
     */
    public function getDefaultYamlConfigPath(): ?string
    {
        $regionDir = defined('APPLICATION_REGION') ? APPLICATION_REGION : 'EU';

        return APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data/import/local/full_' . $regionDir . '.yml';
    }
```

### Add new plugins to `DataImportDependencyProvider`.

```
src/Pyz/Zed/DataImport/DataImportDependencyProvider.php
```
```php
namespace Pyz\Zed\DataImport;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\StoreDataImport\Communication\Plugin\DataImport\StoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\DefaultLocaleStoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\LocaleStoreDataImportPlugin;
use Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport\CountryStoreDataImportPlugin;
use Spryker\Zed\CurrencyDataImport\Communication\Plugin\DataImport\CurrencyStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new StoreDataImportPlugin(),
            new CountryStoreDataImportPlugin(),
            new CurrencyStoreDataImportPlugin(),
            new LocaleStoreDataImportPlugin(),
            new DefaultLocaleStoreDataImportPlugin(),
        ];     
    }
}
```

### Adjust ConsoleDependencyProvider.

```
src/Pyz/Zed/Console/ConsoleDependencyProvider.php
```

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\StoreDataImport\StoreDataImportConfig;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Zed\LocaleDataImport\LocaleDataImportConfig;
use Spryker\Zed\CountryDataImport\CountryDataImportConfig;
use Spryker\Zed\CurrencyDataImport\CurrencyDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @var string
     */
    protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CountryDataImportConfig::IMPORT_TYPE_COUNTRY_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CurrencyDataImportConfig::IMPORT_TYPE_CURRENCY_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_LOCALE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_DEFAULT_LOCALE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . StoreDataImportConfig::IMPORT_TYPE_STORE),            
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        $applicationPlugins[] = new LocaleApplicationPlugin();

        return $applicationPlugins;
    }

}
```


### Preparing csv files for configure stores, locales, currencies, countries via data import 

Example for DE store locales configurations: 
`data/import/common/DE/locale_store.csv`

```
locale_name,store_name
en_US,DE
de_DE,DE
```

Example for DE store default locale:
`data/import/common/DE/default_locale_store.csv`

```
locale_name,store_name
en_US,DE
```

Example for DE store currency-store configurations:
`data/import/common/DE/currency_store.csv`

```csv
currency_code,store_name,is_default
EUR,DE,1
CHF,DE,0
```

Example for DE store coutry-store configurations:
`data/import/common/DE/country_store.csv`

```
store_name,country
DE,DE
DE,FR
```

Use data import command for import configuration


```bash 
vendor/bin/console data:import:locale-store 
vendor/bin/console data:import:default-locale-store
vendor/bin/console data:import:currency-store   
vendor/bin/console data:import:country-store
```

### Add translations

Add new translation files for widget labls.

**1. Append glossary according to your configuration:**

By default, the glossary is located in the following directory:

```
data/import/common/common/glossary.csv
```

CSV file example:

```csv
store_widget.switcher.store,Store:,en_US
store_widget.switcher.store,Shop:,de_DE
```

**2. Add the glossary keys use command:**

```bash
console data:import:glossary
```

**3. Generate new translation cache:**

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the spy_glossary table in the database.

{% endinfo_block %}


## Deploy file changes and enable dynamic store feature 

Due to chnage ideology of region insted store configuration, you need to change deploy file for enable dynamic store feature.

1. Change `deploy.yml` file for enable dynamic store feature.

For example development deoploy file for EU region:

```
deploy.dev.dynamic-store.yml
```

```yml
version: '0.1'

namespace: spryker-dynamic-store
tag: 'dev'

environment: docker.dev
image:
    # ...
    environment:
        # ...
        SPRYKER_DYNAMIC_STORE_MODE: true # Enable dynamic store feature 
    node:
        version: 16
        npm: 8

regions:
    EU:
        # Services for EU region. Use one of the following services: mail, database, broker, key_value_store, search for all stores in EU region.
        services:
            mail:
                sender:
                    name: Spryker No-Reply
                    email: no-reply@spryker.local
            database:
                database: eu-docker
                username: spryker
                password: secret

            broker:
                namespace: eu-docker
            key_value_store:
                namespace: 1
            search:
                namespace: eu_search
    # ...

groups:
    EU:
        region: EU
        applications:
            merchant_portal_eu:
                application: merchant-portal
                endpoints:
                    mp.eu.spryker.local: # Changed Merchant portal endpoint for EU region. Use new domain name for EU region.
                        region: EU
                        entry-point: MerchantPortal
                        primal: true
                        services:
                            session:
                                namespace: 7
            # Changed Yves endpoint for EU region. Use new domain name for all stores in EU region.
            yves_eu: 
                application: yves
                endpoints:
                    yves.eu.spryker.local:
                        region: EU # Use region instead store name for all stores in EU region
                        services:
                            session:
                                namespace: 1
            # Same for Glue endpoints
            glue_eu: 
                application: glue
                endpoints:
                    glue.eu.spryker.local:
                        region: EU
            glue_storefront_eu:
                application: glue-storefront
                endpoints:
                    glue-storefront.eu.spryker.local:
                        region: EU
            glue_backend_eu:
                application: glue-backend
                endpoints:
                    glue-backend.eu.spryker.local:
                        region: EU
            backoffice_eu:
                application: backoffice
                endpoints:
                    backoffice.eu.spryker.local:
                        region: EU
                        primal: true
                        services:
                            session:
                                namespace: 3
            backend_gateway_eu:
                application: backend-gateway
                endpoints:
                    backend-gateway.eu.spryker.local:
                        region: EU
                        primal: true
            backend_api_eu:
                application: zed
                endpoints:
                    backend-api.eu.spryker.local:
                        region: EU
                        entry-point: BackendApi

    US:
        # ...
 
# ...
docker:
    # ...
    testing:
        region: EU # Use EU region for testing insted store. 

```

New configuration for deploy file use region instead store name for services, endpoints, applications, etc.
Evnironment variable `SPRYKER_DYNAMIC_STORE_MODE` enable dynamic store feature, by default it is disabled.
Also you need to change domain name for all endpoints in EU region.
Please, check `deploy.dev.dynamic-store.yml` file for more details.


## Data migration 

Data in database migration for dynamic store feature is not required. 
Propel migration will be executed automatically and added new tables for dynamic store feature and populate new tables with data via data import.
For correct work of dynamic store feature you need to add new data structure for search and storage engines.

First of all, you need to truncate all data from search and storage engines.
Next step is run sync:data command for populate new data structure for search and storage engines.

```bash
vendor/bin/console sync:data
```

All data will be populated in search and storage engines.

{% info_block warningBox "Verification" %}


#### Storage engine

Data is stored with keys that contain the name store, if you use Redis as a key-value store.
The key name follows this format: `kv:{store}:{locale}:{resource-type}:{key}`.

Note that the key name can be different, depending on the configuration of the project.
Below is a list of keys, taking into account the default configuration out of the box.

Example list of keys where `xxx` - is a store name: 

- `kv:availability:xxx:*`
- `kv:price_product_abstract:xxx:*`
- `kv:price_product_abstract_merchant_relationship:xxx:*`
- `kv:price_product_concrete:xxx:*`
- `kv:price_product_concrete_merchant_relationship:xxx:*`
- `kv:product_abstract:xxx:*`
- `kv:product_abstract_category:xxx:*`
- `kv:product_abstract_option:xxx:*`
- `kv:product_abstract_relation:xxx:*`
- `kv:product_concrete_measurement_unit:xxx:*`
- `kv:product_concrete_product_offer_price:xxx:*`
- `kv:product_concrete_product_offers:xxx:*`
- `kv:product_label_dictionary:xxx:*`
- `kv:product_offer:xxx:*`
- `kv:product_offer_availability:xxx:*`
- `kv:category_node:xxx:*`
- `kv:category_tree:at:*`
- `kv:cms_block:xxx:*`
- `kv:cms_page:xxx:*`
- `kv:merchant:xxx:*`
- `kv:price_product_abstract_merchant_relationship:xxx:*`
- `kv:store:xxx`

Also appear new keys for dynamic store feature:
`kv:store_list:` and delete store name XXX values in stores. 
```json
{"stores":["AT","DE","XXX"],"_timestamp":111111111111}
``` 

### Search engine

If you are using Elasticsearch, following indexes are available in the standard configuration (example: `xxx` -  store name): 

- `spryker_xxx_merchant`.
- `spryker_xxx_page`.
- `spryker_xxx_product-review`.
- `spryker_xxx_return_reason`.

{% endinfo_block %} 


## Delete store in database

How to delete store you can find by link [How To: Delete store when using the dynamic store feature](docs/scos/dev/tutorials-and-howtos/howtos/howto-store-delete.html)


## Note: Codeception tests suite configuration changes

For correct work tests with dynamic store feature, you need to add the following helper `ContainerHelper` and `StoreDependencyHelper` to the codeception.yml files:


```yml
suites:
    GroupName:
        actor: GroupNameTester
        modules:
            enabled:
                - Asserts
                .
                .
                .
                - \SprykerTest\Service\Container\Helper\ContainerHelper
                - \SprykerTest\Shared\Store\Helper\StoreDependencyHelper

```