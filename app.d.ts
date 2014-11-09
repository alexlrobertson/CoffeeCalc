/// <reference path="typings/tsd.d.ts" />
interface BrewRatio {
    name: string;
    ratio: number;
}
declare class CalculatorController {
    brewRatios: BrewRatio[];
    coffee: number;
    ratio: number;
    constructor(brewRatios: ng.IPromise<BrewRatio[]>);
    type(): BrewRatio;
    water(): number;
    cups(): number;
}
declare function brewRatiosService($http: ng.IHttpService, $q: ng.IQService, $log: ng.ILogService): ng.IPromise<BrewRatio[]>;
