---
title: Adding a new product to the documentation site
description: Learn how to add a new product to the Spryker docs.
template: howto-guide-template
---

When we launch a new product, you need to create a separate section for it. Usually, there are two roles per product — user and developer. In this article, we assume that you need to create a new product *aop* with the *user* and *dev* roles.

To add a new product, follow these steps.

## 1. Create sidebars for the product

In `_data/sidebars`, create sidebars for the new product per role. For each role, there should be a separate YML file in the following format: `{product_name}_{role}_sidebar.yml`. For example, for the *aop* product with user and developer roles, create `aop_dev_sidebar.yml` and `aop_user_sidebar.yml` sidebar files.

To learn how to populate sidebar files, see [Sidebars](/docs/scos/user/intro-to-spryker/contributing-to-documentation/style-formatting-general-rules.html#sidebars).

## 2. Add the product to the configuration

To add the new product with its roles to the configuration, in `_config.yml`, do the following:

1. In the `defaults:` section, add the new product with its path and product name value to the scope. For example:

```yaml
defaults:
  ...
  -
    scope:
      path: "docs/aop"
    values:
      product: "aop"
```

2. Under the product scope you have added in the previous step, add the product roles with their paths and sidebars. The sidebar names should match those you've created in [1. Create sidebars for the new product](#create-sidebars-for-the-new-product). For example:

```yaml
  ...
  -
    scope:
      path: "docs/aop/dev"
    values:
      sidebar: "aop_dev_sidebar"
      role: "dev"
  -
    scope:
      path: "docs/aop/user"
    values:
      sidebar: "aop_user_sidebar"
      role: "user"
```
3. Optional: To version one or more categories in your new product, in the `versioned_categories:` section, add the product name and the categories to version. For example:

```yaml
versioned_categories:
  ...
  aop:
    user:
      - features
      - back-office-user-guides
    dev:
      - feature-integration-guides
      - feature-walkthroughs
      - glue-api-guides
 ```

4. In the `sidebars:` section, add the names of the sidebars you've created in [1. Create sidebars for the new product](#create-sidebars-for-the-new-product). For example:

```yaml
sidebars:
  ...
  - aop_dev_sidebar
  - aop_user_sidebar
```
<a name="step-five"></a>
5. To index the product in the search engine, in `algolia: indices:`, add the product name and titles for each role. For example:

```yaml
algolia:
  ...
  indices:
    ...
    - name: 'aop_user'
      title: 'AOP User'
    - name: 'aop_dev'
      title: 'AOP Developer'
```

## 2. Add the product to the homepage

To add the new product to the top navigation and the role boxes on the homepage, do the following:

1. In `_includes/topnav.html`, in the `<div class="main-nav dropdown">` class, add the names for the new guides. For example:
```html
{% raw %}
<div class="main-nav dropdown">
    <a href="/" class="main-nav__opener {% if page.layout == 'home' %}main-nav__opener--grey{% endif %} nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="main-nav__opener-label">Select Product</span>
        <span class="main-nav__opener-text">
            ...
            {% elsif page.product == 'aop' and page.role == 'dev' %}
            App Orchestration Platform developer guide
            {% elsif page.product == 'aop' and page.role == 'user' %}
            App Orchestration Platform users guide
            ...
{% endraw %}
```
2. In `<ul class="main-nav__drop main-nav__drop--mob-static dropdown-menu" aria-labelledby="navbarDropdownMenuLink">`, add the product under the last existing product. For example:
```html
                                        <ul class="main-nav__drop main-nav__drop--mob-static dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            ...
                                            <li class="dropdown">
                                                <a href="/" class="main-nav__drop-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    App Orchestration Platform
                                                    <i class="main-nav__drop-link-arrow icon-arrow-right"></i>
                                                </a>
                                                <ul class="main-nav__drop dropdown-menu">
                                                    <li>
                                                        <a href="/docs/aop/dev/setup/system-requirements.html" class="main-nav__drop-link">
                                                            <span class="main-nav__drop-link-title">
                                                                <i class="icon-developer"></i>
                                                                Developer
                                                            </span>
                                                            <span class="main-nav__drop-link-subtitle">AOP developer guide</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/docs/aop/user/intro-to-aop/aop-overview.html" class="main-nav__drop-link">
                                                            <span class="main-nav__drop-link-title">
                                                                <i class="icon-business"></i>
                                                                Business User
                                                            </span>
                                                            <span class="main-nav__drop-link-subtitle">AOP users guide</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
```
3. In `_layouts/home.html`, do the following:

    1. In `<h2 class="card__heading-title">Developer guides</h2>`, add a link to the document that should open when a user opens the developer guide of the product. For example:

    ```html
                                <h2 class="card__heading-title">Developer guides</h2>
                            </div>                            
                            <p>Developer guides are intended for backend developers, frontend developers, and devOps engineers. They cover all the technical aspects of the Spryker products and will help you to improve your understanding of the system, install your Spryker project, and customize it to your needs.</p>
                        </div>                        
                        <div class="card__footer">
                            <ul class="card__links">
                                ...
                                <li><a href="/docs/aop/dev/setup/system-requirements.html">App Orchestration Platform developeguides</a></li>                            
                            ...    

    ```



    2. In `<h2 class="card__heading-title">Business User guides</h2>`, add a link to the document that should open when a user opens the developer guide of the product. For example:
    ```html
                                <h2 class="card__heading-title">Business User guides</h2>
                            </div>
                            <p>Business User guides will help shop administrators and shop owners manage their stores from the shop administration area or the Back Office.</p>                        
                        </div>
                        <div class="card__footer">
                            <ul class="card__links">                                        
                                ...
                                <li><a href="/docs/aop/user/intro-to-aop/aop-overview.html">App Orchestration Platform user guides</a></li>
                            ...    
    ```

## Add CI checks for the product

To add CI checks for the product per role, do the following:

1. In `ci.yml`, add CI configuration per role as follows:

```yaml
  link_validation_check_aop_dev:
    name: Links validation (check_aop_dev)
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
          key: ${{ runner.os }}-check_aop_dev-htmlproofer

  link_validation_check_aop_user:
    name: Links validation (check_aop_user)
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
          key: ${{ runner.os }}-check_aop_user-htmlproofer

      - uses: actions/download-artifact@v2

      - name: Unpack artifacts
        run: tar -xf build-result/result.tar.gz

      - run: bundle exec rake check_aop_user

      - uses: actions/download-artifact@v2

      - name: Unpack artifacts
        run: tar -xf build-result/result.tar.gz

      - run: bundle exec rake check_aop

```
2. In the [Rakefile](https://github.com/spryker/spryker-docs/blob/master/Rakefile) file, add checks for each role. Make sure to exclude all other projects and roles from each check by adding the path to the new project in `options[:file_ignore]`. Follow this example:
```
task :check_aop_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/dev\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_aop_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/dev\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_aop_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/user\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end

task :check_aop_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/user\/.+/,
  ]
  HTMLProofer.check_directory("./_site", options).run
end
```
3. In the [Rakefile](https://github.com/spryker/spryker-docs/blob/master/Rakefile) file, in `options[:file_ignore]`, exclude the new project from checks in all other projects and roles. For example:

```
task :check_mp_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/.+/,
    /docs\/marketplace\/user\/.+/,
  ]
```
## Configure the Algolia search for the new project

{% info_block warningBox "Prerequisites" %}

Make sure you completed [step 5](#step-five) from the *Add the new product with roles to the config file section*.

{% endinfo_block %}

To configure the Algolia search for your product, you need to configure the search in the *spryker-docs* repository, and then in the Algolia app for Spryker docs.

### Configuring the Algolia search in the repository

To configure the Algolia search for your project in the repository, do the following:

1. In the [config.yml](https://github.com/spryker/spryker-docs/blob/master/_config.yml) file, in the *algolia* section, add the project name and title:

```
    - name: 'aop'
      title: 'App Orchestration Platform'
```

2. In the [algolia_config](https://github.com/spryker/spryker-docs/tree/master/algolia_config) folder, create the YML file for your project and exclude all other projects from it:

```
algolia:
  index_name: 'aop'
  files_to_exclude:
    - index.md
    - 404.md
    - search.md
    - docs/marketplace/user/**/*.md
    - docs/marketplace/dev/**/*.md
    - docs/scos/user/**/*.md
    - docs/scos/dev/**/*.md
    - docs/paas-plus/dev/**/*.md
    - docs/cloud/dev**/*.md

```
3. In the same [algolia_config](https://github.com/spryker/spryker-docs/tree/master/algolia_config) folder, go to the YML file of each project and exclude the newly created project from them.

4. Go to the [github/workflow/ci](https://github.com/spryker/spryker-docs/blob/master/.github/workflows/ci.yml) file and add the files you created at step 2:

```

      - run: bundle exec jekyll algolia --config=_config.yml,algolia_config/_fes_dev.yml
        env: # Or as an environment variable
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
```

### Configuring the Algolia search in the Algolia app

Now you need to configure the search in the Algolia app of the Spryker docs. Do the following:

1. Go to https://www.algolia.com/apps/IBBSSFT6M1/indices click **Create Index**.
2. In the opened window, enter the name exactly as you specified in [step 1](#configuring-the-algolia-search-in-the-repository) where you adjusted the config.yml file for the *algolia* section.
3. In the created index, go to **Configuration** and add the attributes as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/searchable-attributes).
4. In **RELEVANCE ESSENTIALS > Ranking and sorting**, add custom rankings as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/ranking-and-sorting).
5. In **RELEVANCE OPTIMIZATIONS > Language**, select *English*.
6. In **FILTERING AND FACETING > Facets**, add facets as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/facets).
7. In **PAGINATION AND DISPLAY > Highlighting**, add the values as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/paas_plus_dev/highlighting).
8. In **PAGINATION AND DISPLAY > Snippeting**, add attribute as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/snippeting).
9. In **SEARCH BEHAVIOR > Retrieved attribute**, add attributes as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/retrieved-attributes)
10. In **SEARCH BEHAVIOR > Deduplication and grouping**, add the attributes as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/paas_plus_dev/deduplication-and-grouping).

That's it. Now, you should be able to search within your new projects at the Spryker docs website.
