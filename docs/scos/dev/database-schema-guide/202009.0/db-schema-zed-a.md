---
title: Zed Administration Schema
originalLink: https://documentation.spryker.com/v6/docs/db-schema-zed-administration
redirect_from:
  - /v6/docs/db-schema-zed-administration
  - /v6/docs/en/db-schema-zed-administration
---

## Zed Administration

### Zed Users and ACL

{% info_block infoBox %}
There can be multiple admin users with roles and permissions.
{% endinfo_block %}
![Zed users and ACL](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Zed+Administration+Schema/zed-users-acl.png){height="" width=""}

**Structure**:

* Users belong to Groups (e.g. "Operation Manager").
* Groups have Roles (e.g. "Manage Orders").
* Roles have Rules which define what the Role is allowed or disallowed to do.
* A Rule is a URL.
* type - allow/deny.
* `bundle/controller/action` - describes an URL (e.g. `oms/trigger/trigger-event-for-order-items`). Each segment can be replaced by a wildcard (e.g. `oms/*/*`).
* The term *"bundle"* is deprecated and was substituted by the term *"module"*. We kept the column name for BC reasons.

