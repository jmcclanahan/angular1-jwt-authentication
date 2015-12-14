'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.decorator:DateMaskDecorator
 * @description
 * # DateMask Decorator
 * Decorator of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
  .decorator('uibDatepickerPopupDirective', function($delegate) {
    var directive = $delegate[0];
    var link = directive.link;

    directive.compile = function () {
      return function (scope, element, attrs) {
        link.apply(this, arguments);
        element.mask("99/99/9999");
      };
    };

    return $delegate;
  });
