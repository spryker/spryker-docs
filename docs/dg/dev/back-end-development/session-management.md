---
title: Session management
last_updated: Oct 4, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/session-management-201903
originalArticleId: 53d2c060-c45d-45a8-8d00-d0f1b10c7dbb
redirect_from:
  - /docs/scos/dev/back-end-development/session-management.html
related:
  - title: Session handlers
    link: docs/scos/dev/back-end-development/session-handlers.html
---

In Spryker Commerce OS, session behavior is supported by `User`, `Customer`, and `CustomerPage` modules.

The following document provides an overview of how sessions are handled in Zed and Yves, as well as describes possible use cases for both of them.

## Zed

In Zed (backend), sessions are managed by the following javascript:

`vendor/spryker/spryker/Bundles/Gui/assets/Zed/js/modules/update-session.js`

The script handles sessions as follows:

1. Gets the session's lifetime (`SessionConstants::ZED_SESSION_TIME_TO_LIVE`) from the [configuration file](#configuration-file).
2. Stores this value in the browser's local storage or a specific cookie with the current timestamp.
3. When a page is loaded, the javascript timeout function is used for refreshing the session. Timeout is calculated by the following formula:

{% info_block infobox %}

*timeout = ((current_timestamp - session_started_at) - (session_lifetime - refresh_before_session_end)) * -1*

**Example:**

Current time: 10:00 (1543399200)

Session lifetime: 30m (18000)

Session started at: 9:35 (1543397700)

Session refresh before end: 5m (300)

((1543399200 - 1543397700) - (1800-300))*-1 = 0

{% endinfo_block %}

4. When time is out, sends the Ajax request to the PHP controller to extend the session's lifetime.
5. Refreshes data in the browser's storage after the Ajax request is complete.

## Yves

In Yves (frontend), sessions are managed by the following widget:
`vendor/spryker/spryker-shop/Bundles/UpdateSessionTtlWidget/src/SprykerShop/Yves/UpdateSessionTtlWidget/Widget/UpdateSessionTtlWidget.php`

The widget handles sessions as follows:

1. Gets session lifetime (`SessionConstants::YVES_SESSION_TIME_TO_LIVE`) from configuration the [configuration file](#configuration-file).

2. When a page is loaded, checks whether the session update is necessary. Check calculation is based on the following formula:

{% info_block warningBox %}

timeout = ((current_timestamp - session_started_at) - (session_lifetime - refresh_before_session_end)) * -1.

{% endinfo_block %}

3. If time is out, refreshes the session.

<a name="configuration-file"></a> All the constants for session behavior are taken from the following configuration file:

`config/Shared/config_default.php`

However, depending on your environment, the values can be taken from the corresponding config files in config/Shared, if mentioned there.

{% info_block infoBox %}

By default, the session's lifetime value is 30 minutes while the session's check is set to be performed 5 minutes prior to the session timeout.

{% endinfo_block %}

## Use cases

Based on the introduced formula and configuration values, the following scenarios can be assumed for both Yves and Zed:

### Scenario #1

1. A user logs into Yves or Zed.
2. The user performs certain actions.
3. If the interval between the user's actions does not exceed 25 minutes, the user is not logged out.

### Scenario #2

1. A user logs into Yves or Zed.
2. The user performs certain actions.
3. The user does not perform any actions for more than 25 minutes.
4. Upon performing any action, the user is redirected to the corresponding login page.
