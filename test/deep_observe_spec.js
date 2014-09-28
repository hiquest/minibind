describe('deepObserve', function() {

    var observable, callback;

    beforeEach(function() {
        observable = { attr: 'b', nested: {c: 'd'}, nestedArray: [{u: 5}, {v: 10}] };
        callback = jasmine.createSpy('callback');
        deepObserve(observable, callback);
    });

    itFiresOn('plain attribute added', function() {
        observable.newAttr = 't';
    });

    itFiresOn('plain attribute removed', function() {
        delete observable.attr;
    });

    itFiresOn('plain attribute changed', function() {
        observable.attr = 't';
    });

    itFiresOn('object attribute changed', function() {
        observable.nested = {};
    });

    itFiresOn('nested plain attr changed', function() {
        observable.nested.c = 'newC';
    });

    itFiresOn('nested plain attr removed', function() {
        delete observable.nested.c;
    });

    itFiresOn('nested plain attr added', function() {
        observable.nested.cc = 'newC';
    });

    itFiresOn('nested array plain attr changed', function() {
        observable.nestedArray[0] = 'newC';
    });


    // Helpers
    function itFiresOn(text, fn) {
        it('runs callback on ' + text, function(done) {
            fn();
            setTimeout(function() {
                expect(callback).toHaveBeenCalled();
                done();
            }, 50);
        });
    }

});