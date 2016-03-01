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

    it('should re-filter the results correctly when changing search term', function () {
        var $scope = {};
        $controller('ContactController as vm', {$scope: $scope});

        $scope.vm.search = 'T';

        $scope.vm.changeFilter();

        expect($scope.vm.filteredList[0]).toEqual({name: 'Tom'});
    });

});
