(function () {

    // Global data store, it will create one if it doesn't exists
    var app = minibind('showSearchApp');

    // Scope store for search page, we're putting it into the `app`
    var searchPage = app.searchPage = {};

    // Initially search results are empty
    searchPage.results = [];

    // Listening for user input
    onChangeDebounced('#searchTerm', queryForShows);

    function queryForShows() {

        var term = $('#searchTerm').val();

        if (term) {
            $.get( "http://localhost:3000/tvdb/query?query=" + term, function(data) {
                searchPage.results = data;
            });
        } else {
            // clearing search results
            searchPage.results = [];
        }
    }

})();