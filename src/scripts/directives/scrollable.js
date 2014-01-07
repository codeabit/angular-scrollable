angular.module('scrollable').directive('scrollable', [
    'scrollableOptions', '$timeout', function(scrollableOptions, $timeout) {

  'use strict';

  return {
    link: function(scope, element, attrs) {
      jQuery(function() {
        // We must have non-static position
        var cssPos = element.css('position');
        if('static' === cssPos) {
          element.css('position', 'relative');
        }

        // We'll use our own scrollbars thank you very much
        element.css('overflow', 'hidden');

        // Make it so
        var opts = attrs.scrollable ? scope.$eval(attrs.scrollable) : {};
        opts = angular.extend(scrollableOptions.get(), opts);

        /**
         * A bit of a hack, we need the underlying elements to have their
         * heights calculated first? Possible related to:
         * @see https://github.com/noraesae/perfect-scrollbar/issues/65
         *
         * Seems to be only needed when the item element getting hit with this
         * directive is being pulled in via a route, ngInclude, or otherwise
         * isn't on the initial page load.
         */
        $timeout(function() {
          element.perfectScrollbar(opts);
        });
      });
    }
  };
}]);
