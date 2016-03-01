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
