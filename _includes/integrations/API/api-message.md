Here is an API playground allowing you to try the API out directly in the page without having to use external tools.

Authentication:
1. Send a correct e-mail and password to `/access-tokens` endpoint (for example `sonia@spryker.com` and `change123`).
2. Copy the value of `accessToken` from the response.
3. Click Authorize and paste the value.

The token will be valid for 8 hours.

Pay attention, that for some APIs the lock icon might not reflect the actual state when [Customer Access feature](https://docs.spryker.com/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-access-feature-overview) is active. In case of receiving Access Denied, check the settings in the Backoffice or in [your code](https://docs.spryker.com/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/manage-customer-access-to-glue-api-resources).
