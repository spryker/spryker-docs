This document describes how to enable [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html) on the latest codebase.

## Enable Dynamic Multistore

{% info_block warningBox "Project version" %}
If your project version is below 202307.0, you need to update to the latest codebase first, see [Install Dynamic Multistore](/docs/pbc/all/dynamic-multistore/202410.0/base-shop/install-dynamic-multistore.html) page.
{% endinfo_block %}

### Here are the steps that needs to be performed to enable Dynamic Multistore.

{% info_block warningBox "Staging environment" %}
     Make sure that **all** steps above are performed (and fully tested) on staging before applying it on production setup, to avoid unexpected downtime and data loss.
{% endinfo_block %}


1. Make sure that your custom Backoffice, MerchantPortal, Console Commands, Gateway, BackendAPI code do not use `StoreFacade::getCurrentStore()` as well as `StoreClient::getCurrentStore()` methods, they are no longer available in any other application except GlueStorefront and Storefront.
2. Make sure that you custom console commands (and the places where they are executed) updated to the new format, see  [details](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/difference-between-modes.html#Deployment file difference).

3. Be aware that after enabling Dynamic Multistore mode, your basic domain structure will change from store to region for all the applications(Example https://yves.de.mysprykershop.com => https://yves.eu.mysprykershop.com), make sure that it is expected. If external systems are impacted by this - necessary redirects are set, so SEO of your site is not impacted.

4. The Dynamic Store feature itself does not require any database changes, in case you've already migrated to the latest demoshop version.

5. Dynamic Multistore introduce some changes in RabbitMQ messages structure, so it is **important** that:
   - During server migration we do not have unprocessed messages in the queue. Make sure that all messages are processed **before** enabling Maintenance Mode.
   - Make sure that `Maintainance Mode` is enabled during migration to make sure that no new messages are added to the queue before the migration is finished.
   (Expected downtime is limited to the deployment time, normally it takes less than 1hr)

5. Update AWS deployment files to Dynamic Multistore mode, see  [details](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/difference-between-modes.html#Difference in console commands execution).

6. Run normal deploy for your server pipeline.


{% info_block warningBox "Verification" %}
- Make sure your store is accessible at `https://yves.eu.mysprykershop.com` or `https://backoffice.eu.mysprykershop.com`.
- Make sure the store switcher is displayed on the Storefront.


Congratulations! Now you have Dynamic Multistore feature up and running.
{% endinfo_block %}

## Rollback

### Rollback procedure is opposite, and contains the following steps:

{% info_block warningBox "Staging environment" %}
Make sure that **all** steps above are performed (and fully tested) on staging before applying it on production setup, to avoid unexpected downtime and data loss.
{% endinfo_block %}

1. Be aware that after disabling Dynamic Multistore mode, your basic domain structure will change from region to store, make sure that it is expected. If external systems are impacted by this - necessary redirects are set, so SEO of your site is not impacted.
2. Disabling Dynamic Store feature itself does not require any database changes.
3. Dynamic Multistore introduce some changes in RabbitMQ messages structure, so it is **important** that:
    - During server migration you do not have unprocessed messages in the queue. Make sure that all messages are processed **before** enabling Maintenance Mode.
    - Make sure that `Maintainance Mode` is enabled during migration to make sure that no new messages are added to the queue before the migration is finished.
      (Expected downtime is limited to the deployment time, normally it takes less than 1hr)
4. Revert changes for you deployment files to Dynamic Multistore OFF mode, see  [details](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/difference-between-modes.html#Difference in console commands execution).
6. Run normal deploy for your server pipeline.

{% info_block warningBox "Verification" %}
- Make sure your store is accessible at `https://yves.de.mysprykershop.com` or `https://backoffice.de.mysprykershop.com`.
- Make sure the store switcher is **not** displayed on the Storefront.
{% endinfo_block %}
