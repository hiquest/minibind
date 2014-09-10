(function () {

    // Accessing global data store for out app, it will create it if not exists
    var app = minibind('showSearchApp');

    // Scope store for search page, we're putting it into the `app`
    var searchPage = app.searchPage = {};

    // Some data
    searchPage.searchResults = [];

    var onSearchInput = function() {
        searchPage.searchResults.push({title: 'Title 1'});
        searchPage.searchResults.push({title: 'Title 2'});
        searchPage.searchResults.push({title: 'Title 3'});
    };

    $('#searchTerm').on('input propertychange paste', _.debounce(onSearchInput, 700));


})m();