/// <reference path="typings/tsd.d.ts"/>

interface BrewRatio {
  name: string;
  ratio: number;
}

class CalculatorController {
  public brewRatios:Array<BrewRatio> = [];
  public coffee:number = 38;
  public ratio:number = 13;

  public constructor(brewRatios:ng.IPromise<Array<BrewRatio>>) {
    brewRatios.then((data:Array<BrewRatio>) => {
      this.brewRatios = data;
    });
  }

  public type() : BrewRatio {
    var itemsByCloseness = _.sortBy(
      this.brewRatios,
      function (item:BrewRatio) : number {
        return Math.abs(this.ratio - item.ratio);
      },
      this
    );

    return _.first(itemsByCloseness);
  }

  public water() : number {
    return this.ratio * this.coffee;
  }

  public cups() : number {
    return (1 / 236.588) * this.water();
  }
}

function brewRatiosService($http:ng.IHttpService, $q:ng.IQService, $log:ng.ILogService) : ng.IPromise<Array<BrewRatio>> {
  var deferred = $q.defer();

  $http.get('ratios.json')
    .success(function (data:Array<BrewRatio>) {
      deferred.resolve(data);
    })
    .error(function (msg, code) {
      deferred.reject(msg);
      $log.error(msg, code);
    });

  return deferred.promise;
}

angular.module("coffee", [])
  .service('brewRatios', brewRatiosService)
  .directive("coffeeCalculator", function () : ng.IDirective {
    return {
      restrict: 'A',
      controller: CalculatorController,
      controllerAs: 'calculator'
    };
  })
