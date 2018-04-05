/**
* @module vue-mdc-adaptertheme 0.13.2
* @exports VueMDCTheme
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCTheme = factory());
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

  var CustomElement = {
    functional: true,
    render: function render(createElement, context) {
      return createElement(context.props.is || context.props.tag || 'div', context.data, context.children);
    }
  };

  /* global CustomEvent */

  var THEME_COLORS = ['primary', 'secondary', 'background', 'primary-light', 'secondary-light', 'secondary-dark', 'primary-dark'];

  var THEME_STYLES = ['text-primary', 'text-secondary', 'text-hint', 'text-icon', 'text-disabled'];

  var mdcTheme = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-element', { staticClass: "mdc-theme", class: _vm.classes, attrs: { "tag": _vm.tag } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-theme',
    components: {
      CustomElement: CustomElement
    },
    props: {
      tag: { type: String, default: 'div' },
      color: String,
      background: String
    },
    computed: {
      classes: function classes() {
        var classes = {};

        if (this.color && THEME_COLORS.indexOf(this.color) !== -1) {
          classes['mdc-theme--' + this.color] = true;
        }

        if (this.background && THEME_COLORS.indexOf(this.background) !== -1) {
          classes['mdc-theme--' + this.background + '-bg'] = true;

          if (this.color && THEME_STYLES.indexOf(this.color) !== -1) {
            classes['mdc-theme--' + this.color + '-on-' + this.background] = true;
          }
        }
        return classes;
      }
    }
  };

  var plugin = BasePlugin({
    mdcTheme: mdcTheme
  });

  // import './styles.scss'

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWVsZW1lbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy90aGVtZS9tZGMtdGhlbWUudnVlIiwiLi4vLi4vY29tcG9uZW50cy90aGVtZS9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdGhlbWUvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0IChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4gICIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luIChjb21wb25lbnRzKSB7IFxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogKHZtKSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfSBcbn1cblxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUVsZW1lbnQgPSB7XG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFxuICAgICAgY29udGV4dC5wcm9wcy5pcyB8fCBjb250ZXh0LnByb3BzLnRhZyB8fCAnZGl2JywgXG4gICAgICBjb250ZXh0LmRhdGEsXG4gICAgICBjb250ZXh0LmNoaWxkcmVuKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50TWl4aW4gPSB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21FbGVtZW50XG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50IChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCI8dGVtcGxhdGU+XG4gIDxjdXN0b20tZWxlbWVudCA6dGFnPVwidGFnXCIgXG4gICAgY2xhc3M9XCJtZGMtdGhlbWVcIlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIj5cbiAgICA8c2xvdCAvPlxuICA8L2N1c3RvbS1lbGVtZW50PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0PlxuaW1wb3J0IHsgQ3VzdG9tRWxlbWVudCB9IGZyb20gJy4uL2Jhc2UnXG5cblxuY29uc3QgVEhFTUVfQ09MT1JTID0gW1xuICAncHJpbWFyeScsXG4gICdzZWNvbmRhcnknLFxuICAnYmFja2dyb3VuZCcsXG4gICdwcmltYXJ5LWxpZ2h0JyxcbiAgJ3NlY29uZGFyeS1saWdodCcsXG4gICdzZWNvbmRhcnktZGFyaycsXG4gICdwcmltYXJ5LWRhcmsnXG5dXG5cbmNvbnN0IFRIRU1FX1NUWUxFUyA9IFtcbiAgJ3RleHQtcHJpbWFyeScsXG4gICd0ZXh0LXNlY29uZGFyeScsXG4gICd0ZXh0LWhpbnQnLFxuICAndGV4dC1pY29uJyxcbiAgJ3RleHQtZGlzYWJsZWQnXG5dXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10aGVtZScsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBDdXN0b21FbGVtZW50XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7dHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnZGl2JyB9LFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgYmFja2dyb3VuZDogU3RyaW5nXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICBsZXQgY2xhc3NlcyA9IHt9XG5cbiAgICAgIGlmICh0aGlzLmNvbG9yICYmIFRIRU1FX0NPTE9SUy5pbmRleE9mKHRoaXMuY29sb3IpICE9PSAtMSkge1xuICAgICAgICAgIGNsYXNzZXNbYG1kYy10aGVtZS0tJHt0aGlzLmNvbG9yfWBdID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5iYWNrZ3JvdW5kICYmIFRIRU1FX0NPTE9SUy5pbmRleE9mKHRoaXMuYmFja2dyb3VuZCkgIT09IC0xKSB7XG4gICAgICAgIGNsYXNzZXNbYG1kYy10aGVtZS0tJHt0aGlzLmJhY2tncm91bmR9LWJnYF0gPSB0cnVlXG5cbiAgICAgICAgaWYgKHRoaXMuY29sb3IgJiYgVEhFTUVfU1RZTEVTLmluZGV4T2YodGhpcy5jb2xvcikgIT09IC0xKSB7XG4gICAgICAgICAgY2xhc3Nlc1tgbWRjLXRoZW1lLS0ke3RoaXMuY29sb3J9LW9uLSR7dGhpcy5iYWNrZ3JvdW5kfWBdID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xhc3Nlc1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQge0Jhc2VQbHVnaW59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjVGhlbWUgZnJvbSAnLi9tZGMtdGhlbWUudnVlJ1xuXG5leHBvcnQge1xuICBtZGNUaGVtZVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjVGhlbWVcbn0pXG4iLCIvLyBpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiQ3VzdG9tRWxlbWVudCIsImZ1bmN0aW9uYWwiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsInByb3BzIiwiaXMiLCJ0YWciLCJkYXRhIiwiY2hpbGRyZW4iLCJUSEVNRV9DT0xPUlMiLCJUSEVNRV9TVFlMRVMiLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsImNvbG9yIiwiYmFja2dyb3VuZCIsImNvbXB1dGVkIiwiY2xhc3NlcyIsImluZGV4T2YiLCJtZGNUaGVtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0VBQ2hDO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFB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
