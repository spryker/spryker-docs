const AlgoliaSearch = {
    pageConfig: {},
    searchIndices: [],
    init(searchClient, indices, pageConfig) {
        this.searchClient = searchClient;
        this.pageConfig = Object.assign({
            hitsPerPage: 10,
            container: '#search-tabs',
            searchboxId: "#searchbox",
            navigationId: "#search-navigation",
            hitsClassName: "search-results__main",
            statsClassName: "search-results__stats",
            paginationClassName: "search-results__pagination"
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
            // add searchbox widget only to the main index
            if (index === 0) {
                searchIndex.addWidget(
                    instantsearch.widgets.searchBox({
                        container: this.pageConfig.searchboxId,
                        placeholder: "Search",
                        showSubmit: false,
                        autofocus: true,
                        showLoadingIndicator: false,
                        cssClasses: {
                            input: 'search-panel__input',
                            reset: 'search-panel__reset',
                        },
                    })
                );
            }

            // stats
            searchIndex.addWidget(
                instantsearch.widgets.stats({
                    container: $(`#tabs-${searchIndex.indexName} .${this.pageConfig.statsClassName}`).get(0),
                    templates: {
                         text: '{{#hasNoResults}}<span class="search-results__empty"><i class="search-results__empty-icon icon-search"></i> <span class="search-results__empty-title">No results found for "{{query}}"</span><span class="search-results__empty-subtitle">Please check your spelling or try another keyword</span></span>{{/hasNoResults}}\
                                {{#hasOneResult}}<span class="search-results__details">1 result for <span class="search-results__details-mark">{{query}}</span></span>{{/hasOneResult}}\
                                {{#hasManyResults}}<span class="search-results__details">{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results for <span class="search-results__details-mark">{{query}}</span></span>{{/hasManyResults}}',
                    },
                })
            );

            // hits
            searchIndex.addWidget(
                instantsearch.widgets.hits({
                    container: $(`#tabs-${searchIndex.indexName} .${this.pageConfig.hitsClassName}`).get(0),
                    hitsPerPage: this.pageConfig.hitsPerPage,
                    escapeHTML: true,
                    cssClasses: {
                      list: 'search-results__list',
                      item: 'search-results__list-item',
                    },
                    templates: {
                        item: function(item) {
                            let title = typeof item._highlightResult.title !== 'undefined'
                                ? item._highlightResult.title.value
                                : item.title;

                            if (typeof title === 'undefined') {
                                title = item.slug;
                            }

                            let content = typeof item._highlightResult.content !== 'undefined'
                                ? item._highlightResult.content.value
                                : '';
                            let url = item.url

                            return (
                                `<div class="search-results__item"><h2 class="search-results__item-title">
                                <a href="${url}" class="search-results__item-link">${title}</a>
                                </h2><div class="search-results__item-content"><p>${content}</p></div></div>`
                            );
                        },
                        empty: '',
                    }
                })
            );

            // pagination
            // Create the render function
            const renderPagination = (renderOptions) => {
                const {
                    pages,
                    currentRefinement,
                    nbPages,
                    isFirstPage,
                    isLastPage,
                    refine,
                    createURL,
                } = renderOptions;

                if (renderOptions.nbHits) {
                    this.pageConfig.badges[renderOptions.instantSearchInstance.indexName].html(renderOptions.nbHits);
                } else {
                    this.pageConfig.badges[renderOptions.instantSearchInstance.indexName].html('');
                }

                const container = $(`#tabs-${searchIndex.indexName} .${this.pageConfig.paginationClassName}`).get(0);
                const searchboxId = this.pageConfig.searchboxId;

                container.innerHTML = (!currentRefinement && !nbPages)? "": `
                <div class="search-results__pagination"><div class="pagination"><ul class="pagination__list">
                  ${
                    !isFirstPage
                      ? `
                        <li class="pagination__list-item pagination__list-item--first">
                          <a
                            href="${createURL(0)}"
                            data-value="${0}"
                            class="pagination__link"
                          >«</a>
                        </li>
                        <li class="pagination__list-item pagination__list-item--prev">
                          <a
                            href="${createURL(currentRefinement - 1)}"
                            data-value="${currentRefinement - 1}"
                            class="pagination__link"
                          >‹</a>
                        </li>
                        `
                      : ''
                  }
                  ${pages
                    .map(
                      page => `
                        <li class="pagination__list-item ${currentRefinement === page ? 'pagination__list-item--active' : ''}">
                          <a
                            href="${createURL(page)}"
                            data-value="${page}"
                            class="pagination__link"
                          >${page + 1}</a>
                        </li>
                      `
                    )
                    .join('')}
                    ${
                      !isLastPage
                        ? `
                          <li class="pagination__list-item pagination__list-item--next">
                            <a
                              href="${createURL(currentRefinement + 1)}"
                              data-value="${currentRefinement + 1}"
                              class="pagination__link"
                            >›</a>
                          </li>
                          <li class="pagination__list-item pagination__list-item--last">
                            <a
                              href="${createURL(nbPages - 1)}"
                              data-value="${nbPages - 1}"
                              class="pagination__link"
                            >»</a>
                          </li>
                          `
                        : ''
                    }
                </ul></div></div>
                `;

                [...container.querySelectorAll('a')].forEach(element => {
                    element.addEventListener('click', event => {
                      event.preventDefault();
                      refine(event.currentTarget.dataset.value);
                      let scrollPos = document.querySelector(searchboxId).getBoundingClientRect().top + window.scrollY;
                      window.scrollTo(0, scrollPos);
                    });
                });
            };

            // Create the custom widget
            const customPagination = instantsearch.connectors.connectPagination(
              renderPagination
            );

            // Instantiate the custom widget
            searchIndex.addWidgets([
              customPagination({
                container: $(`#tabs-${searchIndex.indexName} .${this.pageConfig.paginationClassName}`).get(0),
                padding: (window.innerWidth < 1024) ? 1 : 2,
              })
            ]);
        });
    },
    render() {
        let $container = $(this.pageConfig.container);
        $container = this.addNavigation($container);
        $container = this.addTabs($container);
        this.findBadges();
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
        let $navList = $(`<ul id="${this.pageConfig.navigationId}" class="tabs__list"></ul>`);
        this.pageConfig.badges = {};
        this.searchIndices.map(searchIndex => {
            let $navItem = $(`<li class="tabs__list-item"><a href="#tabs-${searchIndex.indexName}" class="tabs__link">${searchIndex.title}<span class="badge" id="badge-${searchIndex.indexName}"></span></a></li>`);
            $navList.append($navItem);
            this.pageConfig.badges[searchIndex.indexName] = searchIndex.indexName;
        });
        $container.append($navList);

        return $container;
    },
    findBadges() {
        for (let key in this.pageConfig.badges) {
            if (this.pageConfig.badges.hasOwnProperty(key)) {
                this.pageConfig.badges[key] = $(`#badge-${this.pageConfig.badges[key]}`);
            }
        }
    },
    addTabs($container) {
        this.searchIndices.forEach(searchIndex => {
            let $contentContainer = $(`<div id="tabs-${searchIndex.indexName}" class="tabs__content"></div>`);
            let contentContainerHtml = `<div class="${this.pageConfig.statsClassName}"></div>` +
                `<div class="${this.pageConfig.hitsClassName}"></div>` +
                `<div class="${this.pageConfig.paginationClassName}"></div>`;

            $contentContainer.append(contentContainerHtml);

            $container.append($contentContainer);
        })

        return $container;
    }
}
