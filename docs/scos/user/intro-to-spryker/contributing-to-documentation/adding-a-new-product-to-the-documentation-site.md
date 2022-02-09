---
title: Adding a new product to the documentation site
description: Learn how to add a new product to the Spryker docs.
template: howto-guide-template
---

Whenever a new Spryker product is launched, you need to create a separate section for it. Usually, there are two roles per product—user and developer. However, there might be exceptions. In this article, we consider that you have to create a new product *aop* with the *user* and *developer* roles.

To add a new product, follow these steps.

## 1. Create sidebars for the new product

In *data->sidebars*, add sidebars for your new product with roles. For each role, there should be a separate .YML file in the following format: `{product_name}_{role}_sidebar.yml`. To separate words in the sidebar, use an underscore. For example, for our new *aop* product, we create *aop_dev_sidebar.yml* and *aop_user_sidebar.yml* sidebar files.

See [Sidebars](/docs/scos/user/intro-to-spryker/contributing-to-documentation/style-formatting-general-rules.html#sidebars) for details on how to populate the sidebar files.

## 2. Add the new product with roles to the config file

Now, open the [config.yml](https://github.com/spryker/spryker-docs/blob/master/_config.yml) file and add the new product with its role to it. Do the following:

1. In the *defaults* section, add the new product with its path and product name value to the scope. For example:

```
-
    scope:
      path: "docs/aop"
    values:
      product: "aop"

```

2. In the *defaults* section, under the product scope you added at the previous step, add the product roles with their paths and sidebars. The sidebar names should match those you created at step [1. Create sidebars for the new product](#create-sidebars-for-the-new-product). For example:
```
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
3. Optional: If you want to version some of the categories in your new product, in the *versioned_categories* section, add your product name and the categories that should be versioned. For example:

```
aop:
    user:
      - features
      - back-office-user-guides
    dev:
      - feature-integration-guides
      - feature-walkthroughs
      - glue-api-guides
 ``` 

4. In the *sidebars* section, add the sidebars for your new product. The sidebars should match those created at step [1. Create sidebars for the new product](#create-sidebars-for-the-new-product). For example:

```
- aop_dev_sidebar
- aop_user_sidebar
```
<a name="step-five"></a>
5. To index your new product in the search engine, in the *algolia* section, in *indices*, add the product name and titles for each role. For example:

```
- name: 'aop_user'
  title: 'AOP User'
- name: 'aop_dev'
  title: 'AOP Developer'
```

## 2. Add the product to the homepage

Next, you have to add the new product to the top navigation on the homepage and to the role boxes on the homepage. Do the following:

1. Go to [_includes/topnav.html](https://github.com/spryker/spryker-docs/blob/master/_includes/topnav.html)
   
  a. In the `<div class="main-nav dropdown">` class, add names for your guides following this format:
   
  ```
  {% raw %}
  {% elsif page.product == '{product_name}' and page.role == 'dev' %}
  {Product name} developer guide
  {% elsif page.product == '{product_name}' and page.role == 'user' %}
  {Product name} users guide
  {% endraw %}
  ```
  For example:

  ```
  {% raw %}
  {% elsif page.product == 'aop' and page.role == 'dev' %}
  App Orchestration Platform developer guide
  {% elsif page.product == 'aop' and page.role == 'user' %}
  App Orchestration Platform users guide
  {% endraw %}
  ```
  b. In `<ul class="main-nav__drop main-nav__drop--mob-static dropdown-menu" aria-labelledby="navbarDropdownMenuLink">`, add the following code under the last `</li>` tag of the already published product:
   ```
   
                                            <li class="dropdown">
                                                <a href="/" class="main-nav__drop-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {Product name}
                                                    <i class="main-nav__drop-link-arrow icon-arrow-right"></i>
                                                </a>
                                                <ul class="main-nav__drop dropdown-menu">
                                                    <li>
                                                        <a href="/docs/{product-name}/dev/{link-to-main-page-of-dev-guides.html}" class="main-nav__drop-link">
                                                            <span class="main-nav__drop-link-title">
                                                                <i class="icon-developer"></i>
                                                                Developer
                                                            </span>
                                                            <span class="main-nav__drop-link-subtitle">{Product name} developer guide</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/docs/{product-name}/user/{link-to-main-page-of-dev-guides.html}" class="main-nav__drop-link">
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

   For example:

   ```
   
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
2. Go to [_layouts/home.html](https://github.com/spryker/spryker-docs/blob/master/_layouts/home.html):<br>
   
    a. In `<h2 class="card__heading-title">Developer guides</h2>`, add links to your product's developer guides. For example:
   ```
   <li><a href="/docs/aop/dev/setup/system-requirements.html">App Orchestration Platform developer guides</a></li>
   ```
    b. In `<h2 class="card__heading-title">Business User guides</h2>`,add links to your product's business user guides. For example:
   ```
   <li><a href="/docs/aop/user/intro-to-aop/aop-overview.html">App Orchestration Platform user guides</a></li>
   ```

## Add CI checks for the new product

You need to add CI checks for each role per project. For this, do the following:

1. In the [ci.yml](https://github.com/spryker/spryker-docs/blob/master/.github/workflows/ci.yml) file, add the `link_validation_check_{project-name}_dev` and `link_validation_check_{project-name}_user` sections following the example below:

```
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

To configure the Algolia search for your product, you need to configure the search in the spryker-docs repository, and then in the Algolia app for Spryker docs.

### Configuring the Algolia search in the repository

To configure the Algolia search for your project in the repository, do the following:

1. In the [config.yml](https://github.com/spryker/spryker-docs/blob/master/_config.yml) file, in the *algolia* section, add the project name and title:

```
    - name: 'aop'
      title: 'App Orchestration Platform'
```

2. In the [algolia_config](https://github.com/spryker/spryker-docs/tree/master/algolia_config) folder, create the .YML file for your project and exclude all other projects from it:

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
3. In the same [algolia_config](https://github.com/spryker/spryker-docs/tree/master/algolia_config) folder, go to the .YML file of each project and exclude the newly created project from them.
	
4. Go to the [github/workflow/ci](https://github.com/spryker/spryker-docs/blob/master/.github/workflows/ci.yml) file and add the files you created at step 2:

```

      - run: bundle exec jekyll algolia --config=_config.yml,algolia_config/_fes_dev.yml
        env: # Or as an environment variable
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
```

### Configuring the Algolia search in the Algolia app

Now you need to configure the search in the Algolia app of the Spryker docs. Do the following:

1. Go to https://www.algolia.com/apps/IBBSSFT6M1/indices click **Create Index**. 
2. In the opened window, enter the name exactly as you specified at [step 1](#configuring-the-algolia-search-in-the-repository) where you adjusted the config.yml file for the *algolia* section.
3. In the created index, go to **Configuration** and add the attributes as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/searchable-attributes).
4. In **RELEVANCE ESSENTIALS > Ranking and sorting**, add custom rankings as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/ranking-and-sorting).
5. In **RELEVANCE OPTIMIZATIONS > Language**, select *English*.
6. In **FILTERING AND FACETING > Facets**, add facets as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/facets).
7. In **PAGINATION AND DISPLAY > Highlighting**, add the values as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/paas_plus_dev/highlighting).
8. In **PAGINATION AND DISPLAY > Snippeting**, add attribute as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/snippeting).
9. In **SEARCH BEHAVIOR > Retrieved attribute**, add attributes as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/scos_dev/retrieved-attributes)
10. In **SEARCH BEHAVIOR > Deduplication and grouping**, add the attributes as for the [scos_dev project](https://www.algolia.com/apps/IBBSSFT6M1/explorer/configuration/paas_plus_dev/deduplication-and-grouping).

That's it. Now, you should be able to search within your new projects at the Spryker docs website.
