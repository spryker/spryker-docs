---
title: Style, syntax, formatting, and general rules
description: Learn how to style and format your docs.
template: concept-topic-template
related:
  - title: Markdown syntax
    link: docs/scos/user/intro-to-spryker/contributing-to-documentation/markdown-syntax.html
---

This document describes the sructure, main style, syntax and formatting rules of the [Spryker documents](https://github.com/spryker/spryker-docs).

## Directory structure

The main directory for holding all the documents is [docs](https://github.com/spryker/spryker-docs/tree/master/docs) at the root of the project. The second layer is **product** directories: [marketplace](https://github.com/spryker/spryker-docs/tree/master/docs/marketplace), [scos](https://github.com/spryker/spryker-docs/tree/master/docs/scos), [cloud](https://github.com/spryker/spryker-docs/tree/master/docs/cloud), etc. Under each **product** directory, there are **realm** directories: [user](https://github.com/spryker/spryker-docs/tree/master/docs/scos/user) and [dev](https://github.com/spryker/spryker-docs/tree/master/docs/scos/dev). Each of these directories contains category directories with optional sub-categories. Category or sub-category directories contain documents. Some categories are versioned to reflect differences for various releases, so each version of the sub-category is located in a separate folder, for example, see [Features](https://github.com/spryker/spryker-docs/tree/master/docs/scos/user/features). For more details on versioning pages, see [Working with versions](#working-with-versions).

![directory structure](https://confluence-connect.gliffy.net/embed/image/6c2666bb-31e3-40d9-b00f-c616f47351ea.png?utm_medium=live&utm_source=custom)

## Creating documents and categories

We use [Markdown](https://en.wikipedia.org/wiki/Markdown) (.md) to write documents. All documents reside in the [docs](https://github.com/spryker/spryker-docs/tree/master/docs) directory.  See [Directory structure](#directory-structure) for details on how this directory is organized. You can use any text editor such as [VSCode](https://code.visualstudio.com) or [Atom](https://atom.io) for creating the files in Markdown. For information about specific Markdown syntax for documentation, see [Markdown syntax](/docs/scos/user/intro-to-spryker/contributing-to-documentation/markdown-syntax.html).

You can create new pages in any documentation category or sub-category under the **realm** directories (**user**, **dev**). You can also create directories for new categories under the **realm** directories.

<a name="example-document"></a>
For example, to create a new *sample-category* category and a *foo-bar* page under it for a Marketplace business user, you create a new directory called `sample-category` under `/docs/marketplace/user`. After that, create the file `foo-bar.md` in that directory. Thus, the path to your new page would be: `/docs/marketplace/user/sample-category/foo-bar.md`.

{% info_block warningBox "Warning" %}

Currently, the maximum nesting level in the documentation categories is 3. This means that for each category you can have only one sub-category. For example, `marketplace/user/features/202108.0/merchant/`, where `features` is the category (first level of nesting), `202108.0` is the version (does not affect the level of nesting) `merchant` is the sub-category (second level of nesting). The third level of nesting are the .md files under the sub-category.

{% endinfo_block %}

{% info_block infoBox "Info" %}

You can use any valid URL characters in the names of your document files or category directories. It is strongly recommended to use dashes (`-`) instead of underscores (`_`) in the names because these names will eventually be mapped to URLs, and underscores have a negative impact when it comes to SEO. 

{% endinfo_block %}

### Templates

To keep our docs consistent, we have templates for all types of documents. The templates are stored in the [_templates](https://github.com/spryker/spryker-docs/tree/master/_templates) directory. Therefore, every time you need to create a new document, pick the right template from this folder, copy it to your new page, and write the document based on the structure of the template and instructions therein.

| TEMPLATE   | DESCRIPTION  |
| ---------------- | ---------------- |
| [back-office-user-guide-template](https://github.com/spryker/spryker-docs/blob/master/_templates/back-office-user-guide-template.md) | Use this template for creating [Back Office user guides](/docs/scos/user/back-office-user-guides/{{site.version}}/customer/customer-customer-access-customer-groups/managing-customers.html) or [Merchant Portal user guides.](/docs/marketplace/user/merchant-portal-user-guides/{{site.version}}/offers/managing-product-offers.html) |
| [concept-topic-template](https://github.com/spryker/spryker-docs/blob/master/_templates/concept-topic-template.md) | Use this template for creating general and technical conceptual topics, such as [feature overviews](/docs/scos/user/features/{{site.version}}/catalog-feature-overview.html) or [technical articles](/docs/marketplace/dev/front-end/angular-components.html). |
| [feature-walkthrough-template](https://github.com/spryker/spryker-docs/blob/master/_templates/feature-walkthrough-template.md) | Use this template for creating feature [walkthrough guides](/docs/marketplace/dev/feature-walkthroughs/{{site.version}}/marketplace-order-management-feature-walkthrough/marketplace-order-management-feature-walkthrough.html). |
| [feature-integration-guide-template](https://github.com/spryker/spryker-docs/blob/master/_templates/feature-integration-guide-template.md) | Use this template while working on the [integration guides](/docs/scos/dev/feature-integration-guides/{{site.version}}/agent-assist-feature-integration.html). Check the [instructions on formatting for the integration guides](https://github.com/spryker/spryker-docs/blob/master/_templates/formatting-templates-for-feature-integration-guides.md). |
| [glue-api-storefront-guide-template](https://github.com/spryker/spryker-docs/blob/master/_templates/glue-api-storefront-guide-template.md) | Use this template for creating [Glue API guides](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-b2b-account/retrieving-company-users.html). |
| [data-export-template](https://github.com/spryker/spryker-docs/blob/master/_templates/data-export-template.md) | Use this template for creating documents on [data export](/docs/scos/dev/data-export/{{site.version}}/data-export-orders-.csv-files-format.html). |
| [data-import-template](https://github.com/spryker/spryker-docs/blob/master/_templates/data-import-template.md) | Use this template for creating documents on [data import](/docs/marketplace/dev/data-import/{{site.version}}/file-details-merchant-category.csv.html). |
| [module-migration-guide-template](https://github.com/spryker/spryker-docs/blob/master/_templates/module-migration-guide-template.md) | Use this template for creating [module migration guides](/docs/scos/dev/module-migration-guides/migration-guide-merchantgui.html#upgrading-from-version-1-to-version-2). |
| [troubleshooting-guide-template](https://github.com/spryker/spryker-docs/blob/master/_templates/troubleshooting-guide-template.md) | Use this template for creating [troubleshooting pages](/docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/rabbitmq-zed.critical-phpamqplib-exception-amqpchannelclosedexception-channel-connection-is-closed.html). |
| [howto-guide-template](https://github.com/spryker/spryker-docs/blob/master/_templates/howto-guide-template.md) | Use this template for creating [howto guides](/docs/scos/dev/tutorials-and-howtos/howtos/howto-add-a-new-shipment-method.html#setting-up-the-state-machine). |
| [best-practices-file-template](https://github.com/spryker/spryker-docs/blob/master/_templates/best-practices-file-template.md) | Use this template for creating [best practices](/docs/scos/user/back-office-user-guides/{{site.version}}/catalog/products/creating-service-offerings-best-practices.html) docs. |

{% info_block warningBox "Warning" %}

Make sure that the front matter of your document contains the name of the template.

{% endinfo_block %}

### Front matter

Every document must have a YAML front matter block. This block consists of key-value pairs delimited by 3 dashes from each side and must come before any content in the document. The supported parameters on our documentation website are:

```
---
title: Foo bar document
description: Exemplary description text.
last_updated: Dec 09, 2021
template: concept-topic-template
tags: [new, B2B, B2C]
redirect_from: 
	-/docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting.html
	-/docs/marketplace/dev/feature-integration-guides/202108.0/combined-product-offer-import-integration.html
related:
	- title: How to extend an existing Gui table
		link: docs/marketplace/dev/howtos/how-to-extend-gui-table.html
  - title: Sales Data Export feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/sales-data-export-feature-integration.html
---
```

| FRONT MATTER PARAMETER | DESCRIPTION   | FORMAT WITH EXPLANATION | EXAMPLE | REQUIRED? |
| ---------------------- | ---------- | -------- | --------- | ---------|
| title                  | The name of the document.  | Text. Keep in mind, that if you have special characters in title like column or apostrophe, the title should be in single quotes.  |   <ul><li>Creating product lists</li><li>'HowTo: Force HTTPS'</li></ul> | *✓*       |
| description            | Short description of what this page is about. |  Sentence.   | Learn how to use the front matter.  | *✓*       |
| last_updated           | Last updated date of the page to be displayed on the website. | Date in the format: Mon-DD-YYYY (month abbreviation, day with leading zeros, year)  | Jun 16, 2021  |           |
| template               | [Template](#templates) based on which the page was created. |  Name of the template from [Github repository](https://github.com/spryker/spryker-docs/tree/master/_templates) without the extension of the file (.md). | feature-integration-guide-template | *✓*       |
| tags                   | Tag names. |  The name of the tag in brackets. |  [B2B], [B2C] |           |
| redirect_from          | Allows setting up redirects for pages whose location changes or pages that are completely deleted from the documentation. To set up a redirect, press the **tab** button and enter the path starting with `/docs` and containing the exact version, if the document is [versioned](#page-version). | - /path/to/a/file.html  | -/docs/cloud/dev/spryker-cloud-commerce-os/troubleshooting.html  |          |
| related                | Shows the list of articles related to the page you are on. To add a related article, press the **tab** button and enter the name of the article in the `title` parameter and the link to the file in the `link` parameter. |  Mind the _link_ parameter: no dash before _link_, no slash before _docs_. Always use _page.version_ in the link for related articles, even for unversioned articles! | - title: Title of the related page<br/>   link: path/to/a/file.html |           |

For more information about front matter, see the [Jekyll's official website](https://jekyllrb.com/docs/front-matter/).

## Adding documents to the navigation

Once you created a new document, you must add to the sidebar navigation. Keep in mind that a path to a document file will be fully mapped to an URL of that document except that `.md` extension will be replaced with `.html`. This means that the document from the [example above](#example-document) can be accessed in the browser with zero configuration by visiting `http://localhost:4000/docs/marketplace/user/sample-category/foo-bar.html`.

### Sidebars

Each _product/realm_ set has its own sidebar, which is represented by a YAML file in the [_data/sidebar](https://github.com/spryker/spryker-docs/tree/master/_data/sidebars) directory. The sidebar name is `{product}_{realm}_sidebar.yml`. So, for example, for the Marketplace user documentation, the sidebar file is called `marketplace_user_sidebar.html`. The sidebar consists of the list of files files that are present in the navigation. As a best practice, as soon as you create a new page, add it to your sidebar (so you don’t forget about the page).

```
- product: SCOS
  nested:
  - title: Sample category
    nested:
    - title: Intro to Spryker
      url: /docs/scos/user/sample-category/foo-bar.html
```

- The **product** key represents the top level category for the sidebar. It is entered once at the top of the sidebar.
- The **nested** key describes the nested items of the category—pages or sub-categories.
- The first **title** key sets the category name as it will be displayed in the sidebar.
- The second **title** key in this example sets the page title.
- The **url** key must specify the absolute URL to the document page.

### Creating landing pages for the main categories

For each main category, like *Setup*, *Feature integration guides,* *HowTos*, etc., you can create the *index.md.* file. This lets you open category pages without specific files in the link. For example, let’s do that for the *Glue API guides* section of the developer guide:

1. In `docs/marketplace/dev/glue-api-guides`, add the *index.md* file. Make sure you specify the title in the file.

2. In the `marketplace_dev_sidebar.yml` file, add URL for the *Glue API guides* element. You don’t have to write *index.html* in the end of the link, the link will work without it:  

```
- title: Glue API guides         
  url: /docs/marketplace/dev/glue-api-guides/
```

3. Save the changes.

If you now open the Glue API guides category, your page looks like this:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/landing-page-for-category.png)

## Working with versions

We have two types of versions: page versions and the global website version.

The versions are managed in the *config.yml* file*. 

### Page version

The *page version* is the version of the **current page**. Therefore, page versions apply to the [versioned pages](https://github.com/spryker/spryker-docs/tree/master/docs/scos/user/shop-user-guides) only. The page versions reside in the *version-related scopes* section of the *config.yml* file:

![config yaml](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/config-yaml.png)

To add a new version for the versioned categories:

1. In the *config.yml* file, *version-related scopes* section add the version with the *scope* and *values* parameters as shown in the picture above.
2. In the main categories for which the version you added should exist, create the folder named as the *version* value from the previous step. For example, if  you created version `202221.0` in *config.yml* -> *version-related scopes,* the folder should also be called `202221.0`.
3. Add the file that should be in the new version, to the folder:

![files list](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/files-list.png)

You can make a reference to the currently opened version of the versioned page using the `{% raw %}{{page.version}}{% endraw %}` variable in text and in links. For example, if you open a document in version `202108.0` in the editor and write there:

```
This feature requires version {{page.version}} of the Merchants feature.
For details on the feature, see [Merchant feature overview](/docs/marketplace/user/features/{% raw %}{{page.version}}{% endraw %}/merchants/merchants-feature-overview.html).
```

on the website, your text will look like this:

```
This feature requires version 202108.0 of the Merchants feature.
For details on the feature, see Merchant feature overview(link to merchants-feature-overview.html version 202108.0).
```

{% info_block infoBox "Info" %}

You can use the `{% raw %}{{page.version}}{% endraw %}` variable only when you refer to versioned pages on versioned pages. To make a reference to the latest page version on a versioned page to an unversioned page, use the `{% raw %}{{site.version}}{% endraw %}` variable described in the next section. To make a reference on an unversioned page to an unversioned page, do not use any variable.

{% endinfo_block %}

### Global site version

The *global version* is the main website version. Usually, we make the version of the latest release the main website version. The global version is applied to both versioned and unversioned pages. It is specified in the first line of the *config.yml* file:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/site-version.png)

To make a reference to the main (last) website version on either versioned or unversioned pages, use the `{% raw %}{{site.version}}{% endraw %}`. For example, if the main version of your website is 2020109.0, if you write 

```
For details on the feature, see [Merchant feature overview](/docs/marketplace/user/features/{% raw %}{{site.version}}{% endraw %}/merchants/merchants-feature-overview.html).
```

the `Merchant feature overview` link will take the user to the `Merchant feature overview` article in version 2020109.0.

## Deleting pages

If you happen to delete the unnecessary or outdated page from the website, make sure to set up a redirect for it. See [Front matter](#front-matter) to learn how to set up redirects.

## Troubleshooting

This section contains most coming issues that you may face while working with docs and expected ways how to resolve the problem.

### Filename too long in Git for Windows
If you face the “Filename too long” error, or an error like this one *“spryker.github.io/vendor/bundle/ruby/2.7.0/gems/jekyll-4.2.0/lib/jekyll/convertible.rb:222:in `write': No such file or directory @ rb_sysopen - E:/Jekyll/spryker.github.io/_site/docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-content-and-search-attribute-cart-based-catalog-personalization-spryker-commerce-os/tutorial-content-and-search-attribute-cart-based-catalog-personalization.html (Errno::ENOENT)”*, run the following command to circumvent it:

```bash
git config --system core.longpaths true
```


This command only solves the problem by being specific to the current project.

### Escaping Liquid template tags

Jekyll supports a Liquid templating system. All features can be found on page [Liquid](https://shopify.github.io/liquid/basics/introduction/).

Beware that Liquid syntax uses the same tags as Twig. To prevent Twig tags processing use *{% raw %} //Twig template {% endraw %}*

In case, your page requires a Twig code sample to be inserted, enter the above-mentioned placeholder in the beginning and at the end of the code sample. Example:

![liquid syntax](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/liquid-syntax.png)

To get rid of the extra lines in the code sample, use *{%- raw -%}code sample{% endraw %}* placeholder.