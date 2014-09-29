(function () {

    // Accessing global data store for out app, it will create it if not exists
    var app = minibind('showSearchApp');

    // Scope store for search page, we're putting it into the `app`
    var searchPage = app.searchPage = {};

    // Initially search results is empty
    searchPage.results = [];

    // Listening for user input
    onChangeDebounced('#searchTerm', queryForShows);

    function queryForShows() {

        ifVal('#searchTerm').then(fireQuery).else(resetFilter);

        function resetFilter() {
            searchPage.results = [];
        }

        function fireQuery(term) {
            $.get( "http://localhost:3000/tvdb/query?query=" + term, function(data) {
                searchPage.results = data;
            });
        }
    }

})();