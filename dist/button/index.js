/**
* @module vue-mdc-adapterbutton 0.13.2
* @exports default
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

import { RippleMixin } from '../ripple';

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

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* global CustomEvent */

var CustomButton = {
  name: 'custom-button',
  functional: true,
  props: {
    link: Object
  },
  render: function render(h, context) {
    var element = void 0;
    var data = _extends({}, context.data);

    if (context.props.link && context.parent.$router) {
      // router-link case
      element = context.parent.$root.$options.components['router-link'];
      data.props = _extends({ tag: context.props.tag }, context.props.link);
      data.attrs.role = 'button';
      if (data.on.click) {
        data.nativeOn = { click: data.on.click };
      }
    } else if (data.attrs && data.attrs.href) {
      // href case
      element = 'a';
      data.attrs.role = 'button';
    } else {
      // button fallback
      element = 'button';
    }

    return h(element, data, context.children);
  }
};

var CustomButtonMixin = {
  props: {
    href: String,
    disabled: Boolean,
    to: [String, Object],
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String
  },
  computed: {
    link: function link() {
      return this.to && {
        to: this.to,
        exact: this.exact,
        append: this.append,
        replace: this.replace,
        activeClass: this.activeClass,
        exactActiveClass: this.exactActiveClass
      };
    }
  },
  components: {
    CustomButton: CustomButton
  }
};

var DispatchEventMixin = {
  props: {
    'event': String,
    'event-target': Object,
    'event-args': Array
  },
  methods: {
    dispatchEvent: function dispatchEvent(evt) {
      this.$emit(evt.type);
      if (this.event) {
        var target = this.eventTarget || this.$root;
        var args = this.eventArgs || [];
        target.$emit.apply(target, [this.event].concat(toConsumableArray(args)));
      }
    }
  }
};

var mdcButtonBase = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-button', { ref: "root", class: _vm.classes, style: _vm.styles, attrs: { "href": _vm.href, "link": _vm.link, "disabled": _vm.disabled }, on: { "click": _vm.dispatchEvent } }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'mdc-button-base',
  mixins: [DispatchEventMixin, CustomButtonMixin, RippleMixin],
  data: function data() {
    return {
      classes: {},
      styles: {}
    };
  }
};

var mdcButton = {
  name: 'mdc-button',
  extends: mdcButtonBase,
  props: {
    raised: Boolean,
    unelevated: Boolean,
    stroked: Boolean,
    dense: Boolean,
    accent: Boolean
  },
  data: function data() {
    return {
      classes: {
        'mdc-button': true,
        'mdc-button--raised': this.raised,
        'mdc-button--unelevated': this.unelevated,
        'mdc-button--stroked': this.stroked,
        'mdc-button--dense': this.dense,
        'mdc-button--accent': this.accent
      }
    };
  },

  watch: {
    raised: function raised() {
      this.$set(this.classes, 'mdc-button--raised', this.raised);
    },
    unelevated: function unelevated() {
      this.$set(this.classes, 'mdc-button--unelevated', this.unelevated);
    },
    stroked: function stroked() {
      this.$set(this.classes, 'mdc-button--stroked', this.stroked);
    },
    dense: function dense() {
      this.$set(this.classes, 'mdc-button--dense', this.dense);
    },
    accent: function accent() {
      this.$set(this.classes, 'mdc-button--accent', this.accent);
    }
  }
};

var index = BasePlugin({
  mdcButton: mdcButton
});

export default index;
export { mdcButtonBase, mdcButton };
//# sourceMappingURL=index.js.map
