export function affixTopDirective ($window) {
  'ngInject';
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      let offset = element[0].getBoundingClientRect();
      let placeholder, affix;

      angular.element($window).bind('scroll', function() {
        if (this.pageYOffset >= offset.top-parseInt(attrs.affixTop)) {
          element.addClass('affix-top');
          element.css({
            top: attrs.affixTop+'px'
          });
          if(!affix) {
            placeholder = angular.element('<div/>');
            placeholder.css({
              height: element.height(),
              display: 'block'
            });
            element.after(placeholder);
            affix = true;
          }
        } else {
          if (affix) {
            element.removeClass('affix-top');
            element.removeAttr('style');
            placeholder.css({ display: 'none' });
            affix = false;
          }
        }
        scope.$apply();
      });
    }
  }
}