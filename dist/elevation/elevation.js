/**
* @module vue-mdc-adapterelevation 0.13.2
* @exports VueMDCElevation
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCElevation = factory());
}(this, (function () { 'use strict';

  function autoInit(plugin) {
    // Auto-install
    var _Vue = null;
    if (typeof window !== 'undefined') {
      _Vue = window.Vue;
    } else if (typeof global !== 'undefined') {
      /*global global*/
      _Vue = global.Vue;
    }
    if (_Vue) {
      _Vue.use(plugin);
    }
  }

  function BasePlugin(components) {
    return {
      version: '0.13.2',
      install: function install(vm) {
        for (var key in components) {
          var component = components[key];
          vm.component(component.name, component);
        }
      },
      components: components
    };
  }

  /* global CustomEvent */

  var mdcElevation = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-elevation" });
    }, staticRenderFns: [],
    name: 'mdc-elevation',
    props: {}
  };

  var plugin = BasePlugin({
    mdcElevation: mdcElevation
  });

  // import './styles.scss'

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmF0aW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZWxldmF0aW9uL21kYy1lbGV2YXRpb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy9lbGV2YXRpb24vaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2VsZXZhdGlvbi9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibWRjLWVsZXZhdGlvblwiPjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1lbGV2YXRpb24nLFxuICBwcm9wczoge1xuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNFbGV2YXRpb24gZnJvbSAnLi9tZGMtZWxldmF0aW9uLnZ1ZSdcblxuZXhwb3J0IHtcbiAgbWRjRWxldmF0aW9uXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNFbGV2YXRpb25cbn0pXG4iLCIvLyBpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwicmVuZGVyIiwicHJvcHMiLCJtZGNFbGV2YXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjtFQUNoQztFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtFQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDeEM7RUFDQUgsV0FBT0csT0FBT0QsR0FBZDtFQUNEO0VBQ0QsTUFBSUYsSUFBSixFQUFVO0VBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtFQUNEO0VBQ0Y7O0VDWk0sU0FBU00sVUFBVCxDQUFxQkMsVUFBckIsRUFBaUM7RUFDdEMsU0FBTztFQUNMQyxhQUFTLFFBREo7RUFFTEMsYUFBUyxpQkFBQ0MsRUFBRCxFQUFRO0VBQ2YsV0FBSyxJQUFJQyxHQUFULElBQWdCSixVQUFoQixFQUE0QjtFQUMxQixZQUFJSyxZQUFZTCxXQUFXSSxHQUFYLENBQWhCO0VBQ0VELFdBQUdFLFNBQUgsQ0FBYUEsVUFBVUMsSUFBdkIsRUFBNEJELFNBQTVCO0VBQ0g7RUFDRixLQVBJO0VBUUxMO0VBUkssR0FBUDtFQVVEOztFQ1hEOztBQ0tBLHFCQUFlLEVBQUNPOztLQUFELHFCQUFBO0VBQ2JELFFBQU0sZUFETztFQUViRSxTQUFPO0VBRk0sQ0FBZjs7QUNFQSxlQUFlVCxXQUFXO0VBQ3hCVTtFQUR3QixDQUFYLENBQWY7O0VDUEE7QUFDQTtFQUlBakIsU0FBU0MsTUFBVDs7Ozs7Ozs7In0=
