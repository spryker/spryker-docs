---
title: Add global sections to the docs
description: Learn how to add a new global section to Spryker docs.
last_updated: Jul 18, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/adding-a-new-product-to-the-documentation-site.html
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/adding-product-sections-to-the-documentation.html
  - /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/add-product-sections-to-the-documentation.html
  - /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/add-global-sections-to-the-documentation.html

related:
  - title: Build the documentation site
    link: docs/about/all/about-the-docs/run-the-docs-locally.html
  - title: Edit documentation via pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/edit-the-docs-using-a-web-browser.html
  - title: Report documentation issues
    link: docs/about/all/about-the-docs/contribute-to-the-docs/report-docs-issues.html
  - title: Review pull requests
    link: docs/about/all/about-the-docs/contribute-to-the-docs/review-docs-pull-requests.html
  - title: Markdown syntax
    link: docs/about/all/about-the-docs/style-guide/markdown-syntax.html
---

This document describes how to add global sections to the documentation, like the existing Development or Cloud administration sections.

In this document, we assume that you need to create a new section *acp* with the *user* and *dev* roles. Make sure to adjust the provided examples to your requirements.

To add a new section, take the following steps.

## 1. Create a folder for the section

In the `/docs` directory, create a folder for the section per role. In this example, the folders are `/docs/acp/user` and `/docs/acp/dev`.

## 2. Create sidebars

In `_data/sidebars`, create sidebars for the new section per role: `{product_name}_{role}_sidebar.yml`. For the *acp* section with user and developer roles, create `acp_dev_sidebar.yml` and `acp_user_sidebar.yml` sidebar files.

To learn how to populate sidebar files, see [Sidebars](/docs/about/all/about-the-docs/style-guide/general-rules-and-guidance-for-adding-docs.html#sidebars).

## 3. Update the configuration

In `_config.yml`, do the following:

1. In the `defaults:` section, add the scope as follows:

```yaml
defaults:
  ...
  -
    scope:
      path: "docs/acp"
    values:
      product: "acp"
```

2. Under the product scope you have added in the previous step, add the product roles with their paths and sidebars. The sidebar names should match those you've created in [1. Create sidebars](#create-sidebars).

```yaml
defaults:
  ...
  -
    scope:
      path: "docs/acp/dev"
    values:
      sidebar: "acp_dev_sidebar"
      role: "dev"
  -
    scope:
      path: "docs/acp/user"
    values:
      sidebar: "acp_user_sidebar"
      role: "user"
```

3. Optional: To version one or more categories in the section, in the `versioned_categories:` section, add the section and the categories to version.

```yaml
versioned_categories:
  ...
  acp:
    user:
      - features
      - back-office-user-guides
    dev:
      - feature-integration-guides
      - feature-walkthroughs
      - glue-api-guides
 ```

4. In the `sidebars:` section, add the names of the sidebars you've created in [1. Create sidebars](#create-sidebars).

```yaml
sidebars:
  ...
  - acp_dev_sidebar
  - acp_user_sidebar
```

## 4. Update the homepage

To add the new section to the top navigation and the role boxes on the homepage, do the following:

1. In `_includes/topnav.html`, in the `<div class="main-nav dropdown">` class, add the names of the guides:

```html
{% raw %}
<div class="main-nav dropdown">
    <a href="/" class="main-nav__opener {% if page.layout == 'home' %}main-nav__opener--grey{% endif %} nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="main-nav__opener-label">Select a guide</span>
        <span class="main-nav__opener-text">
            ...
            {% elsif page.product == 'acp' and page.role == 'dev' %}
            App Composition Platform developer guide
            {% elsif page.product == 'acp' and page.role == 'user' %}
            App Composition Platform user guide
            ...
{% endraw %}
```

2. In `<ul class="main-nav__drop main-nav__drop--mob-static dropdown-menu" aria-labelledby="navbarDropdownMenuLink">`, add the drop-down menu items under the last item:

```html
                                        <ul class="main-nav__drop main-nav__drop--mob-static dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            ...
                                            <li class="dropdown">
                                                <a href="/" class="main-nav__drop-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    App Composition Platform
                                                    <i class="main-nav__drop-link-arrow icon-arrow-right"></i>
                                                </a>
                                                <ul class="main-nav__drop dropdown-menu">
                                                    <li>
                                                        <a href="/docs/acp/dev/setup/system-requirements.html" class="main-nav__drop-link">
                                                            <span class="main-nav__drop-link-title">
                                                                <i class="icon-developer"></i>
                                                                Developer
                                                            </span>
                                                            <span class="main-nav__drop-link-subtitle">ACP developer guide</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/docs/acp/user/intro-to-acp/acp-overview.html" class="main-nav__drop-link">
                                                            <span class="main-nav__drop-link-title">
                                                                <i class="icon-business"></i>
                                                                Business User
                                                            </span>
                                                            <span class="main-nav__drop-link-subtitle">ACP users guide</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
```

3. In `_layouts/home.html`, in `<h2 class="card__heading-title">Developer guides</h2>`, add a home page menu item with a link to the starting document of the developer guide of the section:

```html
                            <h2 class="card__heading-title">Developer guides</h2>
                        </div>                            
                        <p>Developer guides are intended for backend developers, frontend developers, and devOps engineers. They cover all the technical aspects of the Spryker products and will help you to improve your understanding of the system, install your Spryker project, and customize it to your needs.</p>
                    </div>                        
                    <div class="card__footer">
                        <ul class="card__links">
                            ...
                            <li><a href="/docs/acp/dev/setup/system-requirements.html">App Composition Platform developer guides</a></li>                            
                        ...    
```

4. In `<h2 class="card__heading-title">Business User guides</h2>`, add a home page menu item with a link to the starting document of the business user guide of the section:

    ```html
                                <h2 class="card__heading-title">Business User guides</h2>
                            </div>
                            <p>Business User guides will help shop administrators and shop owners manage their stores from the shop administration area or the Back Office.</p>                        
                        </div>
                        <div class="card__footer">
                            <ul class="card__links">                                        
                                ...
                                <li><a href="/docs/acp/user/intro-to-acp/acp-overview.html">App Composition Platform user guides</a></li>
                            ...    
    ```

## 5. Add CI checks

1. In `.github/workflows/ci.yml`, add CI configuration per role as follows:

```yaml
jobs:
  ...
  link_validation_check_acp_dev:
    name: Links validation (check_acp_dev)
    needs: jekyll_build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Ruby
        uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
        with:
          ruby-version: 2.6
          bundler-cache: true

      - name: Cache HTMLProofer
        id: cache-htmlproofer
        uses: actions/cache@v2
        with:
          path: tmp/.htmlproofer
          key: ${{ runner.os }}-check_acp_dev-htmlproofer

      - uses: actions/download-artifact@v2

      - name: Unpack artifacts
        run: tar -xf build-result/result.tar.gz

      - run: bundle exec rake check_acp_dev

  link_validation_check_acp_user:
    name: Links validation (check_acp_user)
    needs: jekyll_build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Ruby
        uses: ruby/setup-ruby@477b21f02be01bcb8030d50f37cfec92bfa615b6
        with:
          ruby-version: 2.6
          bundler-cache: true

      - name: Cache HTMLProofer
        id: cache-htmlproofer
        uses: actions/cache@v2
        with:
          path: tmp/.htmlproofer
          key: ${{ runner.os }}-check_acp_user-htmlproofer

      - uses: actions/download-artifact@v2

      - name: Unpack artifacts
        run: tar -xf build-result/result.tar.gz

      - run: bundle exec rake check_acp_user
```

2. In `Rakefile`, add checks for each role. In `options[:file_ignore]` of both checks, exclude all other projects and roles:

```
...
task :check_acp_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/acp\/dev\/.+/,    
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_acp_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/acp\/user\/.+/,    
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end
```

3. In `Rakefile`, in `options[:file_ignore]` of all the existing checks, exclude the new section:

```
...
task :check_mp_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/acp\/.+/,
    /docs\/marketplace\/user\/.+/,
  ]
...  
```

After you merge the PR and it's deployed to master, you will see the added section on the website.
