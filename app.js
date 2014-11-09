/// <reference path="typings/tsd.d.ts"/>
var CalculatorController = (function () {
    function CalculatorController(brewRatios) {
        var _this = this;
        this.brewRatios = [];
        this.coffee = 38;
        this.ratio = 13;
        brewRatios.then(function (data) {
            _this.brewRatios = data;
        });
    }
    CalculatorController.prototype.type = function () {
        var itemsByCloseness = _.sortBy(this.brewRatios, function (item) {
            return Math.abs(this.ratio - item.ratio);
        }, this);
        return _.first(itemsByCloseness);
    };
    CalculatorController.prototype.water = function () {
        return this.ratio * this.coffee;
    };
    CalculatorController.prototype.cups = function () {
        return (1 / 236.588) * this.water();
    };
    return CalculatorController;
})();
angular.module("coffee", []).service('brewRatios', function ($http, $q, $log) {
    var deferred = $q.defer();
    $http.get('ratios.json').success(function (data) {
        deferred.resolve(data);
    }).error(function (msg, code) {
        deferred.reject(msg);
        $log.error(msg, code);
    });
    return deferred.promise;
}).directive("coffeeCalculator", function () {
    return {
        restrict: 'A',
        controller: CalculatorController,
        controllerAs: 'calculator'
    };
});
