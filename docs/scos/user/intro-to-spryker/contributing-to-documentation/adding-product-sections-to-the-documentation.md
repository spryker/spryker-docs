---
title: Adding product sections to the documentation
description: Learn how to add a new product to the Spryker docs.
template: howto-guide-template
redirect_from:
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/adding-a-new-product-to-the-documentation-site.html
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

2. Under the product scope you have added in the previous step, add the product roles with their paths and sidebars. The sidebar names should match those you've created in [1. Create sidebars for the product](#create-sidebars-for-the-product). For example:

```yaml
defaults:
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

4. In the `sidebars:` section, add the names of the sidebars you've created in [1. Create sidebars for the new product](#create-sidebars-for-the-product). For example:

```yaml
sidebars:
  ...
  - aop_dev_sidebar
  - aop_user_sidebar
```

## 3. Add the product to the homepage

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

## 4. Add CI checks for the product

To add CI checks for the product per role, do the following:

1. In `.github/workflows/ci.yml`, add CI configuration per role as follows:

```yaml
jobs:
  ...
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

      - uses: actions/download-artifact@v2

      - name: Unpack artifacts
        run: tar -xf build-result/result.tar.gz

      - run: bundle exec rake check_aop_dev

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
```
2. In `Rakefile`, add checks for each role. In `options[:file_ignore]` of both checks, exclude all other projects and roles. For example:
```
...
task :check_aop_user do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/marketplace\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/dev\/.+/,    
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/
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
    /docs\/fes\/.+/,
    /docs\/paas-plus\/.+/
  ]
  HTMLProofer.check_directory("./_site", options).run
end
```
3. In `Rakefile`, in `options[:file_ignore]` of all the existing checks, exclude the new project for both roles. For example:

```
...
task :check_mp_dev do
  options = commonOptions.dup
  options[:file_ignore] = [
    /docs\/scos\/.+/,
    /docs\/cloud\/.+/,
    /docs\/aop\/.+/,
    /docs\/marketplace\/user\/.+/,
  ]
...  
```
## 5. Configure the Algolia search for the new project

To configure the Algolia search for the product, you need to configure the search in the *spryker-docs* repository and the Algolia app for Spryker docs.

### Configure the Algolia search in the repository

1. In `algolia_config/`, create YML configuration files per role. For example, `algolia_config/_aop_dev.yml` and `algolia_config/_aop_user.yml`.

2. In both files, exclude generic pages and the pages of all the existing projects from indexing. Example:

```yaml
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
3. In the Algolia configuration file of each existing project, exclude the project for both roles from indexing. Example:
**algolia_config/_scos_dev.yml**
```yaml
algolia:
  index_name: 'scos_dev'
  files_to_exclude:
    - index.md
    - 404.md
    - search.md
    - docs/marketplace/user/**/*.md
    - docs/marketplace/dev/**/*.md
    - docs/cloud/dev/**/*.md
    - docs/scos/user/**/*.md
    - docs/paas-plus/dev/**/*.md
    - docs/aop/dev/**/*.md
    - docs/aop/user/**/*.md   
```

4. In `.github/workflows/ci.yml`, add the Algolia configuration files you've created. Example:

```yaml
jobs:
  ...
  algolia_search:
    ...
    steps:
      ...
      - run: bundle exec jekyll algolia --config=_config.yml,algolia_config/_aop_dev.yml
        env: # Or as an environment variable
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
      - run: bundle exec jekyll algolia --config=_config.yml,algolia_config/_aop_user.yml
        env: # Or as an environment variable
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}          
```
<a name="add-product-names-for-the-search"></a>

5. In `_config.yml`, in the `algolia: indices:` section, add indexes for products per role. For example:

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

### Configuring the Algolia search in the Algolia app

To configure the search in the Algolia app of the Spryker docs, do the following.
#### Create an index

1. In the Algloia web interface, go to [Indices](https://www.algolia.com/apps/IBBSSFT6M1/indices).
2. Select **Create Index**.
3. In the **Create index** window, enter the **Index name**
  This shows a success message and opens the page of the created index.

#### Add searchable attributes   
1. Click the **Configuration** tab.
2. Click **+  Add a Searchable Attribute**.
3. Enter `title` and press `Enter`.
4. Repeat steps 2-3 until you add the following attributes in the provided order:
    * title
    * headings
    * content
    * collection,categories,tags
    * url

#### Add ranking attributes

1. Go to **RELEVANCE ESSENTIALS > Ranking and Sorting**.
2. Click **+  Add custom ranking attribute**.
3. Enter `date` and press `Enter`.
4. Repeat steps 2-3 until you add the following attributes in the provided order:
    * date
    * custom_ranking.heading
    * custom_ranking.position

#### Configure languages

1. Go to **RELEVANCE OPTIMIZATIONS > Language**.
2. In the **Index Languages** section, click **+ Select one or more languages**.
3. Enter `English` and press `Enter`.
4. In the **Query Languages** section, click **+ Select one or more languages**.
5. Enter `English` and press `Enter`.
6. Toggle **Ignore plural**.
7. Enter `English` and press `Enter`.

#### Add facet attributes

1. Go to **FILTERING AND FACETING > Facets**.
2. Click **+  Add an Attrribute**.
3. Enter `categories` and press `Enter`.
4. Repeat steps 2-3 until you add the following attributes in the provided order:
    * categories
    * collection
    * tags
    * title
    * type

#### Configure highliting

1. Go to **PAGINATION AND DISPLAY > Highlighting**.
2. In the **Attributes to highlight** section, click **+  Add an Attrribute**.
3. Enter `categories` and press `Enter`.
4. Repeat steps 2-3 until you add the following attributes in the provided order:
    * categories
    * collection
    * content
    * headings
    * html
    * tags
    * title
    * type
5. In the **Highlight prefix tag** section, replace the default value with `<em class="ais-Highlight">`.    
#### Add snippeting attributes

1. Go to **PAGINATION AND DISPLAY > Snippeting**.
2. Click **+  Add an Attrribute**.
3. Enter `content` and press `Enter`.

#### Add unretrievable attributes

1. Go to **SEARCH BEHAVIOR > Retrieved attributes**.
2. In the **Unretrievable attributes** section, click **+  Add an Attrribute**.
3. Enter `custom_ranking` and press `Enter`.
#### Configure duplicating and grouping

1. Go to **SEARCH BEHAVIOR > Deduplication and Grouping**.
2. For **Distinct**, select **true**.
3. In the **Attribute for Distinct** section, enter `url` and press `Enter`.
That's it. Now, you should be able to search within your new projects at the Spryker docs website.
