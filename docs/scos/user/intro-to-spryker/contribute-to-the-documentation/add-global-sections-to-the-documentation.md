---
title: Add global sections to the documentation
description: Learn how to add a new global section to Spryker docs.
last_updated: Jul 18, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/adding-a-new-product-to-the-documentation-site.html
  - /docs/scos/user/intro-to-spryker/contributing-to-documentation/adding-product-sections-to-the-documentation.html
  - /docs/scos/user/intro-to-spryker/contribute-to-the-documentation/add-product-sections-to-the-documentation.html
related:
  - title: Build the documentation site
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/build-the-documentation-site.html
  - title: Edit documentation via pull requests
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/edit-documentation-via-pull-requests.html
  - title: Report documentation issues
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/report-documentation-issues.html
  - title: Review pull requests
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/review-pull-requests.html
  - title: Style, syntax, formatting, and general rules
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/style-formatting-general-rules.html
  - title: Markdown syntax
    link: docs/scos/user/intro-to-spryker/contribute-to-the-documentation/markdown-syntax.html
---

This document describes how to add global sections to the documentation, like the existing Development or Cloud administration sections.

In this document, we assume that you need to create a new section *acp* with the *user* and *dev* roles. Make sure to adjust the provided examples to your requirements.

To add a new section, take the following steps.

## 1. Create a folder for the section

In the `/docs` directory, create a folder for the section per role. In this example, the folders are `/docs/acp/user` and `/docs/acp/dev`.

## 2. Create sidebars

In `_data/sidebars`, create sidebars for the new section per role: `{product_name}_{role}_sidebar.yml`. For the *acp* section with user and developer roles, create `acp_dev_sidebar.yml` and `acp_user_sidebar.yml` sidebar files.

To learn how to populate sidebar files, see [Sidebars](/docs/scos/user/intro-to-spryker/contribute-to-the-documentation/general-rules-and-guidance-for-adding-new-documents.html#sidebars).

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

## 6. Configure Algolia

To configure Algolia in the repository and the Algolia app, take the following steps.

### Configure Algolia in the repository

1. In `algolia_config/`, create YML configuration files per role: `algolia_config/_acp_dev.yml` and `algolia_config/_acp_user.yml`.

2. In both files, exclude generic pages and the pages of all the existing projects from indexing.

{% info_block warningBox "Excluding the files you are adding" %}

If you are adding configuration for two roles, you also need to exclude them from indexing each other. In the following examples, this is indicated by the following entries:
* `docs/acp/dev/**/*.md`
* `docs/acp/user/**/*.md`

{% endinfo_block %}


**algolia_config/_acp_user.yml**
```yaml
algolia:
  index_name: 'acp_user'
  files_to_exclude:
    - index.md
    - 404.md
    - search.md
    - docs/marketplace/user/**/*.md
    - docs/marketplace/dev/**/*.md
    - docs/scos/user/**/*.md
    - docs/scos/dev/**/*.md
    - docs/paas-plus/dev/**/*.md
    - docs/fes/dev/**/*.md
    - docs/cloud/dev/**/*.md
    - docs/pbc/all/**/*.md
    - docs/sdk/dev/**/*.md
    - docs/acp/dev/**/*.md
```

**algolia_config/_acp_dev.yml**
```yaml
algolia:
  index_name: 'acp_dev'
  files_to_exclude:
    - index.md
    - 404.md
    - search.md
    - docs/marketplace/user/**/*.md
    - docs/marketplace/dev/**/*.md
    - docs/scos/user/**/*.md
    - docs/scos/dev/**/*.md
    - docs/paas-plus/dev/**/*.md
    - docs/fes/dev/**/*.md
    - docs/cloud/dev/**/*.md
    - docs/pbc/all/**/*.md
    - docs/sdk/dev/**/*.md
    - docs/acp/user/**/*.md
```


3. In the Algolia configuration file of each existing section, exclude the project for both roles from indexing:

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
    - docs/acp/dev/**/*.md
    - docs/acp/user/**/*.md   
```

4. In `.github/workflows/ci.yml`, add the Algolia configuration files you've created:

```yaml
jobs:
  ...
  algolia_search:
    ...
    steps:
      ...
      - run: bundle exec jekyll algolia --config=_config.yml,algolia_config/_acp_dev.yml
        env: # Or as an environment variable
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
      - run: bundle exec jekyll algolia --config=_config.yml,algolia_config/_acp_user.yml
        env: # Or as an environment variable
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}          
```

<a name="add-product-names-for-the-search"></a>

5. In `_config.yml`, in the `algolia: indices:` section, add indexes per role:

```yaml
algolia:
  ...
  indices:
    ...
    - name: 'acp_user'
      title: 'ACP User'
    - name: 'acp_dev'
      title: 'ACP Developer'
```

### Configure Algolia in the Algolia app

To configure the search in the Algolia app, take the following steps.

#### Create an index

1. In the Algloia web interface, go to [Indices](https://www.algolia.com/apps/IBBSSFT6M1/indices).
2. Select **Create Index**.
3. In the **Create index** window, enter the **Index name**.
4. Click **Create**.
  This shows a success message and opens the page of the created index.

#### Add searchable attributes

1. Click the **Configuration** tab.
2. Click **+  Add a Searchable Attribute**.
3. Enter `title` and press `Enter`.
4. Repeat steps 2-3 until you add the following attributes in the provided order and make them either ordered or unordered for search:

| ATTRIBUTE | VALUE |
| - | - |
| title | ordered |
| headings | ordered |
| content | unordered |
| collection,categories,tags | unordered |
| url | ordered |

#### Add ranking attributes

1. Go to **RELEVANCE ESSENTIALS > Ranking and Sorting**.
2. Click **+  Add custom ranking attribute**.
3. Enter `date` and press `Enter`.
4. Repeat steps 2-3 until you add the following attributes in the provided order and make them either ascending or descending:

| ATTRIBUTE | VALUE |
| - | - |
| date | descending |
| custom_ranking.heading | descending |
| custom_ranking.position | ascending |

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
2. Click **+  Add an Attribute**.
3. Enter `categories` and press `Enter`.
4. Repeat steps 2-3 until you add the following attributes in the provided order and make them either searchable or not searchable:

| ATTRIBUTE | VALUE |
| - | - |
| categories | searchable |
| collection | searchable |
| tags | searchable |
| title | searchable |
| type | not searchable |

#### Configure highlighting

1. Go to **PAGINATION AND DISPLAY > Highlighting**.
2. In the **Attributes to highlight** section, click **+  Add an Attribute**.
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
2. Click **+  Add an Attribute**.
3. Enter `content` and press `Enter`.

#### Add unretrievable attributes

1. Go to **SEARCH BEHAVIOR > Retrieved attributes**.
2. In the **Unretrievable attributes** section, click **+  Add an Attribute**.
3. Enter `custom_ranking` and press `Enter`.
#### Configure duplicating and grouping

1. Go to **SEARCH BEHAVIOR > Deduplication and Grouping**.
2. For **Distinct**, select **true**.
3. In the **Attribute for Distinct** section, enter `url` and press `Enter`.
4. Click **Review and Save Settings**.
5. Review the settings and click **Save Settings**.
This shows a success message. After you merge the PR and it's deployed to master, you will be able to search across the new section.
