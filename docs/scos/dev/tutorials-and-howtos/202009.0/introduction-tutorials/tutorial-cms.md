---
title: Tutorial - CMS
description: Use the tutorial to create a static Contact Us page with its own template and integrate it to Yves.
originalLink: https://documentation.spryker.com/v6/docs/t-cms
originalArticleId: f1707899-09c5-4923-b348-dc4943396400
redirect_from:
  - /v6/docs/t-cms
  - /v6/docs/en/t-cms
---

<!--used to be: http://spryker.github.io/challenge/cms/-->

## Challenge Description
Create a static _Contact Us_ page and integrate it into Yves. Then, create your own template and use it.

## Challenge Solving Highlights
### Static page
For creating a static page, follow the steps:
1. Go to Zed UI and open the [CMS Pages](http://zed.de.demoshop.local/cms-gui/list-page) backend. Add a CMS page that uses the URL `/de/contact`.
2. Add the text you would like to show on the static page.
3. Activate the page.
The page is there! You can see the page [here](http://www.de.demoshop.local/de/contact).

### Templates
1. To use your own templates, create a template under `src/Pyz/Yves/Cms/Theme/default/template` and call it `contact`.
2. Add a placeholder and call it `MyPlaceholder`. You can open some other templates to see how it’s done.
3. Go back to the [CMS Pages](http://zed.de.demoshop.local/cms-gui/list-page) backend and edit your page, then change the template to use `contact`.
4. Add a new text to the placeholder `MyPlaceholder`.
Go back to the [page](http://www.de.demoshop.local/de/contact) and have a look at the changes.

## References

| Documentation | Description |
| --- | --- |
| [CMS Manual](/docs/scos/dev/features/202009.0/cms/cms.html)  |
|  [Implementing URL Routing in Yves](/docs/scos/dev/developer-guides/202009.0/development-guide/back-end/yves/implementing-url-routing-in-yves.html)| Steps to implement URL Routing in Yves |
| [Glossary Creation](/docs/scos/user/user-guides/202009.0/back-office-user-guide/administration/glossary/managing-glossary.html) |Glossary module documentation  |
| [Cronjob Scheduling](/docs/scos/dev/back-end-development/cronjobs/cronjob-scheduling.html) | Set up cron jobs in Jenkins |

<!-- Last review date: Sep 11, 2017_

[//]: # (by Theodoros Liokos) -->
