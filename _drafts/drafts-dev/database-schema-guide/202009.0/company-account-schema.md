---last_updated: Aug 27, 2020

title: Company Account Schema
originalLink: https://documentation.spryker.com/v6/docs/db-schema-company-account
originalArticleId: e3b1a9f8-a7a6-4037-ad8f-56df623cc622
redirect_from:
  - /v6/docs/db-schema-company-account
  - /v6/docs/en/db-schema-company-account
---


## Company

### Company and Business Units

Companies can contain many business units, which are made up of one or more company users. By providing this structure customer (buyers) on a Spryker system may accurately model their purchasing processes according to their real company structure.
![Company business units](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Company+Account+Schema/company-business-units.png)

**Structure**:

* **Company**:

  - A Company has a name, a status (New => Approved => Declined) and a list of addresses.
  - Companies can be toggled per Store.
  - There is also a Company Type which is not used at the moment.

* **Business Units**: Each company consists of multiple Business Units (at least one)

  - A Business Unit represents a part of a company. For instance, for a company like "Hilton Hotels", each hotel can be a Business Unit.
  - Business Units can have the hierarchical structure. For instance, a hotel has a bar and a restaurant.


### Company and Business Unit Addresses

{% info_block infoBox %}
Companies and Business Units have multiple Addresses which can be used during the Checkout.
{% endinfo_block %}
![Company and Business unit addresses](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Company+Account+Schema/company-business-unit-address.png)

**Structure**:

* Companies have multiple Addresses (~ Company's Address Book) which can be assigned to multiple Business Units.
* One of the assigned Addresses per Business Units can the default billing address.
* Addresses can also get Labels as a way to differentiate the addresses from each other.

### Company Users

A Company has multiple Users which belong to the Company's Business Units.
![Company users](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Company+Account+Schema/company-user.png)

**Structure**:

* A Company User is a virtual entity without their own identity. It's more a relation between a Customer, a Company and a Business Unit.
* A Company User is related to only one Company Business Unit but there can be multiple Company Users per Customer. So, as a result, a Customer can be indirectly related to multiple Companies and Company Business Units. In this case, the Customer needs to select a Company Business Unit during the login because a lot of other relations are depending on the current Business Unit.

### Company User Roles & Permissions

A Company User can have one or multiple Roles which define what the User is allowed or disallowed to do.
![Company user roles and permissions](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Company+Account+Schema/company-user-roles-permissions.png)

**Structure**:

* **Roles**:

  - A Company has a set of Roles (e.g. "Admin", "Buyer", "Engineer").
  - There is no *is_admin* flag. The "Admin" is a normal Role which needs to be configured.
  - Roles are assigned to Users (many-to-many).

* **Permissions**:

  - Permissions are implemented as PHP Classes so that they are more powerful than just black- or whitelists that are based on URLs.
  - The PHP Class is identified by the key which must match the plugins that are configured in *PermissionDependencyProvider*.

* **Permission Configuration**: Permissions can be configured per Role. This means that there can be additional values which are evaluated when the Permission is checked.<br>
E.g. A Buyer is allowed to add products up to 500.- to the Cart. The "500" is a parameter in this case which needs to be configured.

  - *spy_permission::configuration_signature* -  This is the interface description of the underlying Plugin. So it says which fields are there, which are optional and which types are used. The data is stored as JSON.
  - *spy_company_role_to_permission::configuration* - This is the specific configuration of a Permission in the context of a Role. The data is stored as JSON.


### Permission Groups (for Quotes and Shopping Lists)

Shopping Lists and Quotes can be shared with Company Users. This sharing can be regulated with the help of Permissions.
![Permission groups](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Company+Account+Schema/permission-groups.png)

**Structure**:

* The Permission can be related to a Permission Group (many-to-many)
* A Permission Group defines the access as either *READ_ONLY* or *FULL_ACCESS* (or others like "Read and Write")
* The Permission Group is related to the object (Quote or Shopping List) and the Business User
* The Shopping List can also be restricted for Company Business Units (not shown in the schema)
