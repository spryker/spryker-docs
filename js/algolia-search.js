const AlgoliaSearch = {
    $searchInput: null,
    $resultsContainer: null,
    apiClient: null,
    resultTemplate: null,
    init: function (config, apiClient) {
        this.$searchInput = $(config.searchInput);
        this.$resultsContainer = $(config.resultsContainer);
        this.resultTemplate = config.resultTemplate;
        this.apiClient = apiClient;

        this.bindEventListeners();
    },
    bindEventListeners: function () {
        let keyupHandler = debounce(this.executeSearch.bind(this));
        $(this.$searchInput).keyup(() => {
            keyupHandler();
        })
    },
    executeSearch: function () {
        let searchTerm = this.$searchInput.val();
        this.apiClient.search(searchTerm, this.renderResults);
    },
    renderResults: function (results) {
        AlgoliaSearch.$resultsContainer.empty();
        results.forEach((result) => {
            let template = AlgoliaSearch.resultTemplate.replace(/\{(\w+)\}/g, '${result.\$1}');
            template = eval('`' + template + '`')
            AlgoliaSearch.$resultsContainer.append($(template));
        });
    }
};

function debounce(fn, timeout = 500){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    };
}
