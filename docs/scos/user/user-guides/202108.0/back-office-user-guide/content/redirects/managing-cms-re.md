---
title: Managing CMS redirects
originalLink: https://documentation.spryker.com/2021080/docs/managing-cms-redirects
redirect_from:
  - /2021080/docs/managing-cms-redirects
  - /2021080/docs/en/managing-cms-redirects
---

This topic describes how to manage redirects in the Back Office.

## Prerequisites

To start managing CMS redirects, go to **Content** > **Redirects**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Editing a CMS redirect

To edit a CMS redirect:
1. On the *CMS Redirect* page in the _Actions_ column, click **Edit** next to the URL you want to update.
2. On the *Edit a CMS redirect* page, you can update the following information:
    * Url
    * To URL
    * Redirect status code
3. To keep the changes, click **Save**.

{% info_block warningBox %}
If you modify the *existing* URL from which a redirect is configured, a new URL will be created and added to the list of CMS redirects.
{% endinfo_block %}

**Tips & tricks**
On the *Edit a CMS redirect* page, you can do the following:

* Create a new CMS redirect by clicking **+Add CMS Redirect** in the top right corner of the page.
* Return to the list of redirects by clicking **Back to CMS** in the top right corner of the page.

### Reference information: Editing a CMS redirect

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ID | Redirect identifier. |
|From Url  | URL from which a new URL destination is configured. |
| To Url | New URL destination. |
| Status | Redirect status code. |
| Actions | Set of actions that is performed on a redirect. |

On the *CMS Redirects* page, you can also:

* Switch to the page where you can create a new redirect.
* Sort content items by *ID* and *From Url*.
* Filter content items by *ID*, *From Url*, *To Url*, and *Status*.

## Deleting a CMS Redirect

To delete a CMS redirect:
1. Navigate to **Content** > **Redirects**. 
2. On the *CMS Redirect* page in the _Actions_ column, click **Delete** next to the URL you want to delete. 
3. This will successfully delete the redirect and remove it from the list of redirects.

