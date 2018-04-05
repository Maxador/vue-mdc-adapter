/**
* @module vue-mdc-adapterelevation 0.13.2
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

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

var index = BasePlugin({
  mdcElevation: mdcElevation
});

export default index;
export { mdcElevation };
//# sourceMappingURL=index.js.map
