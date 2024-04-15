---last_updated: Apr 3, 2020

title: Zed Administration Schema
originalLink: https://documentation.spryker.com/v5/docs/db-schema-zed-administration
originalArticleId: e01f51f2-9124-4391-900e-519f0525fb35
redirect_from:
  - /v5/docs/db-schema-zed-administration
  - /v5/docs/en/db-schema-zed-administration
---

## Zed Administration

### Zed Users and ACL

{% info_block infoBox %}
There can be multiple admin users with roles and permissions.
{% endinfo_block %}
![Zed users and ACL](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Zed+Administration+Schema/zed-users-acl.png)

**Structure**:

* Users belong to Groups (e.g. "Operation Manager").
* Groups have Roles (e.g. "Manage Orders").
* Roles have Rules which define what the Role is allowed or disallowed to do.
* A Rule is a URL.
* type - allow/deny.
* `bundle/controller/action` - describes an URL (e.g. `oms/trigger/trigger-event-for-order-items`). Each segment can be replaced by a wildcard (e.g. `oms/*/*`).
* The term *"bundle"* is deprecated and was substituted by the term *"module"*. We kept the column name for BC reasons.

