(function () {

    // Global data store
    var moviesApp = window.moviesApp = { };

    // One of the "scopes" to watch
    var searchPage = moviesApp.searchPage = { };

    // Initial array initialization
    searchPage.results = [ ];

    // Listening for user input
    $("#searchTerm").on('input propertychange paste', _.debounce(queryForShows, 700));

    function queryForShows() {

        var query = $('#searchTerm').val();

        if (query) {

            var data = { query: query, api_key: 'e9b8a919d917289a7ddbcfddb8f55ae5' };

            $.get( "http://api.themoviedb.org/3/search/movie?" + $.param(data), function(data) {
                searchPage.results = data.results;
            });
        } else {
            // clearing search results
            searchPage.results = [];
        }
    }

})();