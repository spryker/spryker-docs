---
title: Style, syntax, formatting, and general rules
description: Learn how to style and format your docs.
template: concept-topic-template
---

This page contains details on how to work with the 

## Directory structure

The main directory for holding all the documents is `docs` at the root of the project. The second layer is **product** directories: *marketplace*, *scos*, *cloud* etc. Under each **product** directory, there are **realm** directories: *user*, *dev*, and admin (for cloud product). Each of these directories contains category directories with optional sub-categories. Category/sub-category directories contain documents.

![directory structure](https://confluence-connect.gliffy.net/embed/image/6c2666bb-31e3-40d9-b00f-c616f47351ea.png?utm_medium=live&utm_source=custom)

## Adding documents

### Creating documents and categories

#### General

We use [Markdown](https://en.wikipedia.org/wiki/Markdown) (.md) to write documents. All documents reside in the [docs](https://github.com/spryker/spryker-docs/tree/master/docs) directory.  See [Directory structure](#directory-structure) for details on how this directory is organized. You can use any text editor such as [VSCode](https://code.visualstudio.com) or [Atom](https://atom.io) for creating the files in Markdown. 

{% info_block errorBox "Templates" %}

To keep our docs consistent, we have templates for all types of documents. The templates are stored in the [_templates] (https://github.com/spryker/spryker-docs/tree/master/_templates) directory. Therefore, every time you need to create a new document, pick the right template from this folder, copy it to your new page, and write the document based on the structure of the template and instructions therein.

{% endinfo_block %}

You can create new pages in any documentation category or sub-category under the **realm** directories (**user**, **dev**). You can also create directories for new categories under the **realm** directories.

For example, to create a new *sample-category* category and a *foo-bar* page under it for a Marketplace business user, you create a new directory called `sample-category` under `/docs/marketplace/user`. After that, create the file `foo-bar.md` in that directory. Thus, the path to your new page would be: `/docs/marketplace/user/sample-category/foo-bar.md`.

{% info_block warningBox "Warning" %}

Currently, the maximum nesting level in the documentation categories is 3. This means that for each category you can have only one sub-category. For example, `marketplace/user/features/20201.08/merchant/`, where `features` is the category (first level of nesting), `202108.0` is the version (does not affect the level of nesting) `merchant` is its sub-category (second level of nesting). The third level of nesting would be the .md files under the sub-category.

{% endinfo_block %}

{% info_block infoBox "Info" %}

You can use any valid URL characters in the names of your document files/category directories. It is strongly recommended to use dashes (`-`) instead of underscores (`_`) in the names because these names will eventually be mapped to URLs, and underscores have a negative impact when it comes to SEO. 

{% endinfo_block %}

#### Front matter

Every document must have YAML front matter block. This block consists of key-value pairs delimited by 3 dashes from each side and must come before any content in the document. Example:

```
---
title: Foo bar document
tags: [new, document]
---
```

This block must include the document’s title. It can also include *tags*, *keywords*, *summary*, and other metadata. You can read more about front matter on Jekyll’s official [website](https://jekyllrb.com/docs/front-matter/).

##### Related articles

To add related articles, in the front matter, add the _related_ parameter with the values as in the example below. Mind the _link_ parameter: no dash before _link_, no slash before _docs_:

```md
related: 
    - title: Discount
      link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-promotions-and-discounts-feature-walkthrough.html
```

{% info_block warningBox "Warning" %}

Always use page.version in the link for related articles, even for unversioned articles!

{% endinfo_block %}

Example the whole front matter with the related articles:

```md
---
title: Marketplace Promotions and Discounts feature overview
description: This document contains concept information for the Marketplace Promotions and Discounts feature.
template: concept-topic-template
related: 
    - title: Discount
      link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-promotions-and-discounts-feature-walkthrough.html
---
```

How it looks on the website:

![related articles in the front matter](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/related-articles-in-the-front-matter.png)

##### Setting up redirects

To redirect from one page on the docs website to another, use the `redirect_from:` parameter in the front matter, press the **tab** button and enter the path starting with `/docs` and containing the exact version, if the document is versioned. For example:

```md
redirect_from:  
  - /docs/marketplace/dev/feature-integration-guides/202108.0/combined-product-offer-import-integration.html
```

#### Liquid

Jekyll supports a Liquid templating system. All features can be found on page [Liquid](https://shopify.github.io/liquid/basics/introduction/).

Beware that Liquid syntax uses the same tags as Twig. To prevent Twig tags processing use `{% raw %} //Twig template {% endraw %}`

In case, your page requires a Twig code sample to be inserted, enter the above-mentioned placeholder in the beginning and at the end of the code sample. Example:

![liquid syntax](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/liquid-syntax.png)

To get rid of the extra lines in the code sample, use `{%- raw -%}code sample{% endraw %}` placeholder.

### Adding documents to the navigation

Once a new document is created, it must be added to the sidebar navigation. Keep in mind that a path to a document file will be fully mapped to a URL of that document except that `.md` extension will be replaced with `.html`. This means that the document from the example above can be accessed in the browser with zero configuration by visiting `http://localhost:4000/docs/marketplace/user/sample-category/foo-bar.html`.

#### Sidebars

Each _product/realm_ set has its own sidebar, which is represented by a YAML file in the `_data/sidebar` directory. The sidebar name is `{product}_{realm}_sidebar.yml`. So, for example, for Marketplace user documentation, the sidebar file would be called `marketplace_user_sidebar.html`. 

```
- title: Sample category
  output: web
  folderitems:
    - title: Foo bar
      url: /docs/marketplace/user/sample-category/foo-bar.html
      output: web 
```

- The first **title** key sets the category name as it will be displayed in the sidebar.
- The **output** key must be preset and must be always set to *web.*
- The **folderitems** key describes the nested items of the category - pages or sub-categories.
- The second **title** key in this example sets the page title.
- The **url** key must specify the absolute URL to the document page.
- The second **output** key must also be present.

### Creating landing pages for the main categories

For each main category, like *Setup*, *Feature integration guides,* *HowTos*, etc., you can create the *index.md.* file. This will allow to open category pages without specific files in the link. For example, let’s do that for the *Glue API guides* section of the developer guide:

1. In `docs/marketplace/dev/glue-api-guides`, add the *index.md* file. Make sure you specify the title in the file.

2. In the `marketplace_dev_sidebar.yml` file, add URL for the *Glue API guides* element. You don’t have to write *index.html* in the end of the link, the link will work without it:  

```
- title: Glue API guides         
  url: /docs/marketplace/dev/glue-api-guides/
```   

3. Save the changes.

If you now open the Glue API guides category, your page will look like this:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/landing-page-for-category.png)

## Working with versions

We have two types of versions: page versions and the global website version.

The versions are managed in the *config.yml* file*.* 

### Page version

The *page version* is the version of the **current page**. Therefore, they apply to the [versioned pages](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/2248441943/Jekyll+test+drive#Structure-and-versioning) only. The page versions reside in the *version-related scopes* section of the *config.yml* file:

![config yaml](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/config-yaml.png)

To add a new version for the versioned categories:

1. In the *config.yml* file, *version-related scopes* section add the version with the *scope* and *values* parameters as shown in the picture above.
2. In the main categories for which the version you added should exist, create the folder named as the *version* value from step one. For example, if  you created version `202221.0` in *config.yml* -> *version-related scopes,* the folder should also be called `202221.0`.
3. Add the file that should be in the new version, to the folder:

![files list](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/files-list.png)

You can make a reference to the currently opened version of the versioned page using the `{{page.version}}` variable in text and in links. For example, if you open a document in version `202106.0` in the editor and write there

```
This feature requires version {{page.version}} of the Merchants feature.
For details on the feature, see [Merchant feature overview](/docs/marketplace/user/features/{{ page.version }}/merchants/merchants-feature-overview.html).
```

on the website, your text will look like this:

```
This feature requires version 202106.0 of the Merchants feature.
For details on the feature, see Merchant feature overview(link to merchants-feature-overview.html version 202106.0).
```

{% info_block infoBox "Info" %}

You can use the `{{page.version}}` variable only when you refer to versioned pages on versioned pages. To make a reference to the latest page version on a versioned page to an unversioned page, use the `{{site.version}}` variable described in the next section. To make a reference on an unversioned page to an unversioned page, do not use any variable.

{% endinfo_block %}

### Global site version

The *global version* is the main website version. Usually, we make the version of the latest release the main website version. The global version is applied to both versioned and unversioned pages. It is specified in the first line of the *config.yml* file:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/intro-to-spryker/contributing-to-documentation/site-version.png)

To make a reference to the main (last) website version on either versioned or unversioned pages, use the `{{site.version}}`. For example, if the main version of your website is 2020109.0, if you write 

```
For details on the feature, see [Merchant feature overview](/docs/marketplace/user/features/{{site.version}}/merchants/merchants-feature-overview.html).
```

the `Merchant feature overview` link will take the user to the `Merchant feature overview` article in version 2020109.0.

## Deleting pages

If you happen to delete the unnecessary or outdated page from the website, make sure to set up a redirect for it. See [Setting up redirects on this page](#setting-up-redirects).

## Troubleshooting

This section contains most coming issues that you may face while working with docs and expected ways how to resolve the problem.

### Filename too long in Git for Windows
If you face the “Filename too long” error, or an error like this one *“spryker.github.io/vendor/bundle/ruby/2.7.0/gems/jekyll-4.2.0/lib/jekyll/convertible.rb:222:in `write': No such file or directory @ rb_sysopen - E:/Jekyll/spryker.github.io/_site/docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-content-and-search-attribute-cart-based-catalog-personalization-spryker-commerce-os/tutorial-content-and-search-attribute-cart-based-catalog-personalization.html (Errno::ENOENT)”*, run the following command to circumvent it:

```bash
git config --system core.longpaths true
```


This command only solves the problem by being specific to the current project.
 