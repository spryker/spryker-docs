---
title: "Tutorial: CMS"
description: Use the tutorial to create a static Contact Us page with its own template and integrate it to Yves.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-cms
originalArticleId: 010de313-e57b-49d1-9350-b31a6e2e1ed7
redirect_from:
  - /2021080/docs/t-cms
  - /2021080/docs/en/t-cms
  - /docs/t-cms
  - /docs/en/t-cms
  - /v6/docs/t-cms
  - /v6/docs/en/t-cms
  - /v5/docs/t-cms
  - /v5/docs/en/t-cms
  - /v4/docs/t-cms
  - /v4/docs/en/t-cms
  - /v3/docs/t-cms
  - /v3/docs/en/t-cms
  - /v2/docs/t-cms
  - /v2/docs/en/t-cms
  - /v1/docs/t-cms
  - /v1/docs/en/t-cms
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-cms.html
  - /docs/pbc/all/content-management-system/202307.0/tutorials-and-howtos/tutorial-cms.html
related:
  - title: Implement URL routing in Yves
    link: docs/scos/dev/back-end-development/yves/implement-url-routing-in-yves.html
  - title: Cronjob scheduling
    link: docs/scos/dev/sdk/cronjob-scheduling.html
---

<!--used to be: http://spryker.github.io/challenge/cms/-->

## Challenge description

Create a static **Contact Us** page and integrate it into Yves. Then, create your own template and use it.

## Create a static page

1. Go to Zed UI and open the CMS Pages `https://zed.mysprykershop.com/cms-gui/list-page` backend.
2. Add a CMS page that uses the URL `/de/contact`.
3. Add the text you want to show on the static page.
4. Activate the page.
   You can see the page [here](https://mysprykershop.com/de/contact).

## Use your own template

1. Under `src/Pyz/Yves/Cms/Theme/default/template`, create a template and call it `contact`.
2. Add a placeholder and call it `MyPlaceholder`. You can open some other templates to see how it’s done.
3. Go back to the CMS Pages(`https://zed.mysprykershop.com/cms-gui/list-page`) backend and edit your page
4. Change the template to use `contact`.
5. Add new text to the placeholder `MyPlaceholder`.
6. Go back to the [page](https://mysprykershop.com/de/contact) and have a look at the changes.
