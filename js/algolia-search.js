const AlgoliaSearch = {
    pageConfig: {},
    searchIndices: [],
    init(searchClient, indices, pageConfig) {
        this.searchClient = searchClient;
        this.pageConfig = Object.assign({
            hitsPerPage: 20,
            container: '#tabs',
            searchboxId: "#searchbox",
            navigationId: "#search-navigation",
            hitsClassName: "search-results-main",
            statsClassName: "search-results-stats",
            paginationClassName: "search-results-pagination"
        }, pageConfig);
        this.initIndices(indices, searchClient);

        return this;
    },
    initIndices(indices, searchClient) {
        // init extra indices
        let extraIndices = [];
        indices.slice(1).forEach(index => extraIndices.push(this.initSearchIndex(index, searchClient)));
        // init main index
        let mainIndex = this.initSearchIndex(indices[0], searchClient, helper => {
            extraIndices.forEach(extraIndex => extraIndex.helper.setQuery(helper.state.query).search());
            helper.search();
        }, true);

        this.searchIndices = [mainIndex].concat(extraIndices);
    },
    initSearchIndex(indexConfig, searchClient, searchFunction, routing) {
        let index = instantsearch({
            indexName: indexConfig.name,
            searchClient: searchClient,
            searchFunction: searchFunction,
            searchParameters: {
                hitsPerPage: this.pageConfig.hitsPerPage
            },
            routing: routing
        });
        index.title = indexConfig.title;

        return index;
    },
    addSearchWidgets() {
        this.searchIndices.forEach((searchIndex, index) => {
            // add search box only for the main index
            if (index === 0) {
                searchIndex.addWidget(
                    instantsearch.widgets.searchBox({
                        container: this.pageConfig.searchboxId,
                        placeholder: "Search",
                        showSubmit: false,
                        autofocus: true,
                        showLoadingIndicator: false
                    })
                );
            }

            // hits widget
            searchIndex.addWidget(
                instantsearch.widgets.hits({
                    container: $(`#tabs-${searchIndex.indexName} .${this.pageConfig.hitsClassName}`).get(0),
                    hitsPerPage: this.pageConfig.hitsPerPage,
                    escapeHTML: true,
                    templates: {
                        item: function(item) {
                            let title = typeof item._highlightResult.title !== 'undefined'
                                ? item._highlightResult.title.value
                                : item.title;
                            let content = typeof item._highlightResult.content !== 'undefined'
                                ? item._highlightResult.content.value
                                : '';
                            let url = item.url

                            return (
                                '<div class="hit"><h2 class="hit-name">' +
                                `<a href="${url}">${title}</a>` +
                                `</h2><div class="hit-content">${content}</div></div>`
                            );
                        },
                        empty:
                            '<div class="no-results"><p>No results found.</p></div>'
                    }
                })
            );

            // stats widget
            searchIndex.addWidget(
                instantsearch.widgets.stats({
                    container: $(`#tabs-${searchIndex.indexName} .${this.pageConfig.statsClassName}`).get(0),
                    templates: {
                        text: '{{#hasNoResults}}0 results{{/hasNoResults}}{{#hasOneResult}}1 result{{/hasOneResult}}{{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}} found',
                    },
                })
            );

            // pagination widget
            searchIndex.addWidget(
                instantsearch.widgets.pagination({
                    container: $(`#tabs-${searchIndex.indexName} .${this.pageConfig.paginationClassName}`).get(0),
                    scrollTo: this.pageConfig.searchboxId
                })
            );
        })
    },
    render() {
        let $container = $(this.pageConfig.container);
        $container = this.addNavigation($container);
        $container = this.addTabs($container);
        this.addSearchWidgets();
        this.startIndices();
        $container.tabs();
    },
    startIndices() {
        // start extra-indices
        for (let i = 1; i < this.searchIndices.length; i++) {
            this.searchIndices[i].start();
        }
        // start main index
        this.searchIndices[0].start();
    },
    addNavigation($container) {
        let $navList = $(`<ul id="${this.pageConfig.navigationId}"></ul>`);
        this.searchIndices.map(searchIndex => {
            let $navItem = $(`<li><a href="#tabs-${searchIndex.indexName}">${searchIndex.title}</a></li>`);
            $navList.append($navItem);
        });
        $container.append($navList);

        return $container;
    },
    addTabs($container) {
        this.searchIndices.forEach(searchIndex => {
            let $contentContainer = $(`<div id="tabs-${searchIndex.indexName}"></div>`);
            let contentContainerHtml = `<div class="${this.pageConfig.statsClassName}"></div>` +
                `<div class="${this.pageConfig.hitsClassName}"></div>` +
                `<div class="${this.pageConfig.paginationClassName}"></div>`;

            $contentContainer.append(contentContainerHtml);

            $container.append($contentContainer);
        })

        return $container;
    }
}
