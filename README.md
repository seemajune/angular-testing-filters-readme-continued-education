# Testing Filters

## Overview

Now that we can utilise the power of filters, let's test them to make sure they're returning the correct data.

## Objectives

- Describe filter testing
- Write a unit test for filters

## Setup tests

As we learned earlier, we can use either filters in the DOM or in our controllers.

We're going to be writing our filter's tests using Karma and Jasmine - this means we will have to be using the filters in our controllers as we cannot test our DOM.

The tests we are about to write are quite similar to tests we've done before. We will be using a controller that filters a list, and we'll be ensuring that filtered list is correct.

Let's take our basic controller. We've got a list of people, a search term and our filtered list. We've got a function to call to re-filter our list when the search term changes.

```js
function ContactController($filter) {
    this.list = [{
        name: 'Bob'
    }, {
        name: 'Tom'
    }];

    this.search = 'B';

    this.filteredList = $filter('filter')(this.list, this.search);

    this.changeFilter = function () {
        this.filteredList = $filter('filter')(this.list, this.search);
    };
}

angular
    .module('app')
    .controller('ContactController', ContactController);
```

We can now inject this into our tests and checkout the result of `this.filteredList`.

```js
describe('ContactController', function () {
    var $controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));


    it('should filter the results correctly', function () {
        var $scope = {};
        $controller('ContactController as vm', {$scope: $scope});

        // $scope.vm holds all of our values
    });
});
```

We can access the filtered list via `$scope.vm.filteredList`. Now, our search term is simply `"B"` - meaning we should only receive an array with Bob in it back from the filter. Let's test this out:

```js
describe('ContactController', function () {
    var $controller;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));


    it('should filter the results correctly', function () {
        var $scope = {};
        $controller('ContactController as vm', {$scope: $scope});

        expect($scope.vm.filteredList[0]).toEqual({name: 'Bob'});
    });
});
```

If you run the tests now, they will pass!

Now, we need to test that we can change our filter too. To do this, we're going to change `$scope.vm.search` (our search critera) to `"T"`. We can then call our function to re-filter our list, and check the first result again.

```js
it('should re-filter the results correctly when changing search term', function () {
    var $scope = {};
    $controller('ContactController as vm', {$scope: $scope});

    $scope.vm.search = 'T';

    $scope.vm.changeFilter();

    expect($scope.vm.filteredList[0]).toEqual({name: 'Tom'});
});
```

Success!
