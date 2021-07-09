const Suggestions = {
    searchClient: null,
    defaultHitsPerPage: 5,
    init(searchClient, indicesConfig, autocompleteConfig) {
        this.searchClient = searchClient;
        const sources = indicesConfig.map(indexConfig => this.createSource(indexConfig));
        const {searchInput, options} = autocompleteConfig;
        autocomplete(searchInput, options, sources).one("autocomplete:updated", function(e){
            $('.search-popup__more').show();
        }).on("autocomplete:updated", function(e){
            $('.search-popup__more').attr({'href': `/search?query=${e.target.value}`});
        });
        this.bindSearchEvents(searchInput);
    },
    createSource(indexConfig) {
        return {
            source: autocomplete.sources.hits(
                this.searchClient.initIndex(indexConfig.name),
                {
                    hitsPerPage: indexConfig.hitsPerPage || this.defaultHitsPerPage
                }
            ),
            name: indexConfig.name,
            templates: {
                header: `<div class="aa-dropdown-menu__title">${indexConfig.title}</div>`,
                suggestion(suggestion) {
                    let title = suggestion._highlightResult.title
                        ? suggestion._highlightResult.title.value
                        : suggestion.title;

                    if (typeof title === 'undefined') {
                        title = suggestion.slug;
                    }

                    return `<a href="${suggestion.url}">${title}</a>`;
                },
                empty: '<div class="aa-dropdown-menu__empty"><i class="icon-search"></i>No results found</div>',
            },
        };
    },
    bindSearchEvents(searchInput) {
        $(document).keyup(function(event) {
            if (event.which == 27) {
                $("body").removeClass("search-active");
            }
        });

        $(searchInput).on("keypress", function(event) {
            let value = autocomplete.escapeHighlightedString(
                event.target.value
            );

            if (!value) {
                return;
            }

            if (event.which == 13) {
                window.location = $(this).closest('form').attr('action') + `?query=${value}`;
            }
        });
    }
};
