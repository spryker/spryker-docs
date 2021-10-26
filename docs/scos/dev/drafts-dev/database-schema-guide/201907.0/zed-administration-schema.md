---last_updated: Nov 22, 2019

title: Zed Administration Schema
originalLink: https://documentation.spryker.com/v3/docs/db-schema-zed-administration
originalArticleId: aba026c9-d4fc-4be7-a7d7-af4875be189f
redirect_from:
  - /v3/docs/db-schema-zed-administration
  - /v3/docs/en/db-schema-zed-administration
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

