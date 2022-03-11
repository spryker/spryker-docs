---
title: Managing CMS Redirects
description: The guide provides procedures on how to update or delete URL redirects in the Back Office.
last_updated: Jul 31, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v2/docs/editing-cms-redirects
originalArticleId: 797b20d3-7cb8-4044-9ab6-51f44633209c
redirect_from:
  - /v2/docs/editing-cms-redirects
  - /v2/docs/en/editing-cms-redirects
related:
  - title: Creating CMS Redirects
    link: docs/scos/user/back-office-user-guides/page.version/content/redirects/creating-cms-redirects.html
---

This topic provides a list of steps to edit or delete a redirect in the Back Office.
***
To start managing CMS redirects, navigate to the **Content Management > Redirects** section.
***

## Editing a CMS Redirect

**To edit a CMS redirect:**
1. On the **CMS Redirect** page in the _Actions_ column, click **Edit** next to the URL you want to update.
2. On the **Edit a CMS redirect** page, you can update the following information:
   * Url
   * To URL
   * Redirect status code
3. To keep the changes, click **Save**.

  {% info_block infoBox %}
  
  See the [CMS Redirects: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/content/redirects/references/cms-redirects-references.html) article to learn more information about the attributes you need to enter.

  {% endinfo_block %}

  {% info_block warningBox %}
  
  Keep in mind that if you modify the **existing** URL from which a redirect is configured, a new URL will be created and added to the list of CMS redirects.
  
  {% endinfo_block %}

***

**Tips and tricks**

On the **Edit a CMS redirect** page, you can do the following:

* Create a new CMS redirect by clicking **+Add CMS Redirect** in the top right corner of the page.
* Return to the list of redirects by clicking **Back to CMS** in the top right corner of the page.
***

## Deleting a CMS Redirect 

**To delete a CMS redirect:**
1. Navigate to the **Content Management > Redirects**. 
2. On the **CMS Redirect** page in the _Actions_ column, click **Delete** next to the URL you want to delete. 
3. This will successfully delete the redirect and remove it from the list of redirects.
4. 
***

**What's next?**
To learn more about attributes you enter on the page, see the [CMS Redirects: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/content/redirects/references/cms-redirects-references.html) article.
