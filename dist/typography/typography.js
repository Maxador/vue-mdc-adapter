/**
* @module vue-mdc-adaptertypography 0.13.2
* @exports VueMDCTypography
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCTypography = factory());
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

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  /* global CustomEvent */

  var typos = ['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading1', 'subheading2', 'body1', 'body2', 'caption', 'button'];

  var mdcTypoMixin = function mdcTypoMixin(name) {
    return {
      render: function render(createElement) {
        var _class;

        return createElement(this.tag, {
          'class': (_class = {
            'mdc-typo': true
          }, defineProperty(_class, name, true), defineProperty(_class, 'mdc-typography--' + this.typo, true), defineProperty(_class, 'mdc-typography--adjust-margin', this.adjustMargin), _class),
          'attrs': this.$attrs,
          'on': this.$listeners
        }, this.$slots.default);
      }
    };
  };

  function mdcTypoPropMixin(defaultTag, defaultTypo, validTypos) {
    return {
      props: {
        'tag': {
          type: String,
          default: defaultTag
        },
        'typo': {
          type: String,
          default: defaultTypo,
          validator: function validator(value) {
            return validTypos.indexOf(value) !== -1;
          }
        },
        'adjust-margin': {
          type: Boolean,
          default: false
        }
      }
    };
  }

  var mdcTextSection = {
    name: 'mdc-text-section',
    props: {
      'tag': {
        type: String,
        default: 'section'
      }
    },
    render: function render(createElement) {
      return createElement(this.tag, {
        'class': {
          'mdc-typography': true,
          'mdc-text-section': true
        },
        'attrs': this.$attrs,
        'on': this.$listeners
      }, this.$slots.default);
    }
  };

  var mdcText = {
    name: 'mdc-text',
    mixins: [mdcTypoMixin('mdc-text'), mdcTypoPropMixin('p', 'body1', typos)]
  };

  var mdcDisplay = {
    name: 'mdc-display',
    mixins: [mdcTypoMixin('mdc-display'), mdcTypoPropMixin('h1', 'display1', ['display4', 'display3', 'display2', 'display1'])]
  };

  var mdcHeadline = {
    name: 'mdc-headline',
    mixins: [mdcTypoMixin('mdc-headline'), mdcTypoPropMixin('h2', 'headline', ['headline'])]
  };

  var mdcTitle = {
    name: 'mdc-title',
    mixins: [mdcTypoMixin('mdc-title'), mdcTypoPropMixin('h3', 'title', ['title'])]
  };

  var mdcSubHeading = {
    name: 'mdc-subheading',
    mixins: [mdcTypoMixin('mdc-subheading'), mdcTypoPropMixin('h4', 'subheading2', ['subheading1', 'subheading2'])]
  };

  var mdcBody = {
    name: 'mdc-body',
    mixins: [mdcTypoMixin('mdc-body'), mdcTypoPropMixin('p', 'body1', ['body1', 'body2'])]
  };

  var mdcCaption = {
    name: 'mdc-caption',
    mixins: [mdcTypoMixin('mdc-caption'), mdcTypoPropMixin('span', 'caption', ['caption'])]
  };

  var plugin = BasePlugin({
    mdcTextSection: mdcTextSection,
    mdcText: mdcText,
    mdcBody: mdcBody,
    mdcCaption: mdcCaption,
    mdcDisplay: mdcDisplay,
    mdcHeadline: mdcHeadline,
    mdcSubHeading: mdcSubHeading,
    mdcTitle: mdcTitle
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvbWRjLXR5cG9ncmFwaHkuanMiLCIuLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0IChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4gICIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luIChjb21wb25lbnRzKSB7IFxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogKHZtKSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfSBcbn1cblxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQgKGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImNvbnN0IHR5cG9zID0gW1xuICAnZGlzcGxheTQnLCBcbiAgJ2Rpc3BsYXkzJywgXG4gICdkaXNwbGF5MicsIFxuICAnZGlzcGxheTEnLCBcbiAgJ2hlYWRsaW5lJyxcbiAgJ3RpdGxlJyxcbiAgJ3N1YmhlYWRpbmcxJyxcbiAgJ3N1YmhlYWRpbmcyJyxcbiAgJ2JvZHkxJyxcbiAgJ2JvZHkyJyxcbiAgJ2NhcHRpb24nLFxuICAnYnV0dG9uJ1xuXVxuXG5leHBvcnQgY29uc3QgbWRjVHlwb01peGluID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHRoaXMudGFnLCB7XG4gICAgICAgICdjbGFzcyc6IHtcbiAgICAgICAgICAnbWRjLXR5cG8nOiB0cnVlLFxuICAgICAgICAgIFtuYW1lXTogdHJ1ZSxcbiAgICAgICAgICBbYG1kYy10eXBvZ3JhcGh5LS0ke3RoaXMudHlwb31gXTogdHJ1ZSxcbiAgICAgICAgICAnbWRjLXR5cG9ncmFwaHktLWFkanVzdC1tYXJnaW4nOiB0aGlzLmFkanVzdE1hcmdpblxuICAgICAgICB9LFxuICAgICAgICAnYXR0cnMnOiB0aGlzLiRhdHRycyxcbiAgICAgICAgJ29uJzogdGhpcy4kbGlzdGVuZXJzXG4gICAgICB9LFxuICAgICAgdGhpcy4kc2xvdHMuZGVmYXVsdCApXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZGNUeXBvUHJvcE1peGluKGRlZmF1bHRUYWcsIGRlZmF1bHRUeXBvLCB2YWxpZFR5cG9zKSB7XG4gIHJldHVybiAge1xuICAgIHByb3BzOiB7XG4gICAgICAndGFnJzogeyBcbiAgICAgICAgdHlwZTogU3RyaW5nLCBcbiAgICAgICAgZGVmYXVsdDogZGVmYXVsdFRhZyBcbiAgICAgIH0sXG4gICAgICAndHlwbyc6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBkZWZhdWx0VHlwbyxcbiAgICAgICAgdmFsaWRhdG9yOiAgKHZhbHVlKSA9PiB2YWxpZFR5cG9zLmluZGV4T2YodmFsdWUpICE9PSAtMVxuICAgICAgfSxcbiAgICAgICdhZGp1c3QtbWFyZ2luJzogeyBcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1kY1RleHRTZWN0aW9uID0ge1xuICBuYW1lOiAnbWRjLXRleHQtc2VjdGlvbicsXG4gIHByb3BzOiB7XG4gICAgJ3RhZyc6IHtcbiAgICAgIHR5cGU6IFN0cmluZywgXG4gICAgICBkZWZhdWx0OiAnc2VjdGlvbicgXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodGhpcy50YWcsIHtcbiAgICAgICdjbGFzcyc6IHtcbiAgICAgICAgJ21kYy10eXBvZ3JhcGh5JzogdHJ1ZSxcbiAgICAgICAgJ21kYy10ZXh0LXNlY3Rpb24nOiB0cnVlLFxuICAgICAgfSxcbiAgICAgICdhdHRycyc6IHRoaXMuJGF0dHJzLFxuICAgICAgJ29uJzogdGhpcy4kbGlzdGVuZXJzXG4gICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdCApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1kY1RleHQgPSB7XG4gIG5hbWU6ICdtZGMtdGV4dCcsXG4gIG1peGluczogW1xuICAgIG1kY1R5cG9NaXhpbignbWRjLXRleHQnKSwgXG4gICAgbWRjVHlwb1Byb3BNaXhpbigncCcsICdib2R5MScsIHR5cG9zKVxuICBdLFxufVxuXG5leHBvcnQgY29uc3QgbWRjRGlzcGxheSA9IHtcbiAgbmFtZTogJ21kYy1kaXNwbGF5JyxcbiAgbWl4aW5zOiBbIFxuICAgIG1kY1R5cG9NaXhpbignbWRjLWRpc3BsYXknKSwgXG4gICAgbWRjVHlwb1Byb3BNaXhpbignaDEnLCAnZGlzcGxheTEnLCBbJ2Rpc3BsYXk0JywgJ2Rpc3BsYXkzJywgJ2Rpc3BsYXkyJywgJ2Rpc3BsYXkxJ10pXSxcbn1cblxuZXhwb3J0IGNvbnN0IG1kY0hlYWRsaW5lID0ge1xuICBuYW1lOiAnbWRjLWhlYWRsaW5lJyxcbiAgbWl4aW5zOiBbIFxuICAgIG1kY1R5cG9NaXhpbignbWRjLWhlYWRsaW5lJyksIFxuICAgIG1kY1R5cG9Qcm9wTWl4aW4oJ2gyJywgJ2hlYWRsaW5lJywgWydoZWFkbGluZSddKV0sXG59XG5cbmV4cG9ydCBjb25zdCBtZGNUaXRsZSA9IHtcbiAgbmFtZTogJ21kYy10aXRsZScsXG4gIG1peGluczogWyBcbiAgICBtZGNUeXBvTWl4aW4oJ21kYy10aXRsZScpLCBcbiAgICBtZGNUeXBvUHJvcE1peGluKCdoMycsICd0aXRsZScsIFsndGl0bGUnXSldLFxufVxuXG5leHBvcnQgY29uc3QgbWRjU3ViSGVhZGluZyA9IHtcbiAgbmFtZTogJ21kYy1zdWJoZWFkaW5nJyxcbiAgbWl4aW5zOiBbIFxuICAgIG1kY1R5cG9NaXhpbignbWRjLXN1YmhlYWRpbmcnKSwgXG4gICAgbWRjVHlwb1Byb3BNaXhpbignaDQnLCAnc3ViaGVhZGluZzInLCBbJ3N1YmhlYWRpbmcxJywgJ3N1YmhlYWRpbmcyJ10pXSxcbn1cblxuZXhwb3J0IGNvbnN0ICBtZGNCb2R5ID0ge1xuICBuYW1lOiAnbWRjLWJvZHknLFxuICBtaXhpbnM6IFtcbiAgICBtZGNUeXBvTWl4aW4oJ21kYy1ib2R5JyksIFxuICAgIG1kY1R5cG9Qcm9wTWl4aW4oJ3AnLCAnYm9keTEnLCBbJ2JvZHkxJywgJ2JvZHkyJ10pXSxcbn1cblxuZXhwb3J0IGNvbnN0IG1kY0NhcHRpb24gPSB7XG4gIG5hbWU6ICdtZGMtY2FwdGlvbicsXG4gIG1peGluczogW1xuICAgIG1kY1R5cG9NaXhpbignbWRjLWNhcHRpb24nKSwgXG4gICAgbWRjVHlwb1Byb3BNaXhpbignc3BhbicsICdjYXB0aW9uJywgWydjYXB0aW9uJ10pXSxcbn1cbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCB7ICBcbiAgbWRjVGV4dFNlY3Rpb24sXG4gIG1kY1RleHQsXG4gIG1kY0JvZHksXG4gIG1kY0NhcHRpb24sXG4gIG1kY0Rpc3BsYXksXG4gIG1kY0hlYWRsaW5lLFxuICBtZGNTdWJIZWFkaW5nLFxuICBtZGNUaXRsZVxufSBmcm9tICcuL21kYy10eXBvZ3JhcGh5LmpzJ1xuXG5leHBvcnQge1xuICBtZGNUZXh0U2VjdGlvbixcbiAgbWRjVGV4dCxcbiAgbWRjQm9keSxcbiAgbWRjQ2FwdGlvbixcbiAgbWRjRGlzcGxheSxcbiAgbWRjSGVhZGxpbmUsXG4gIG1kY1N1YkhlYWRpbmcsXG4gIG1kY1RpdGxlXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNUZXh0U2VjdGlvbixcbiAgbWRjVGV4dCxcbiAgbWRjQm9keSxcbiAgbWRjQ2FwdGlvbixcbiAgbWRjRGlzcGxheSxcbiAgbWRjSGVhZGxpbmUsXG4gIG1kY1N1YkhlYWRpbmcsXG4gIG1kY1RpdGxlXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsInZtIiwia2V5IiwiY29tcG9uZW50IiwibmFtZSIsInR5cG9zIiwibWRjVHlwb01peGluIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsInRhZyIsInR5cG8iLCJhZGp1c3RNYXJnaW4iLCIkYXR0cnMiLCIkbGlzdGVuZXJzIiwiJHNsb3RzIiwiZGVmYXVsdCIsIm1kY1R5cG9Qcm9wTWl4aW4iLCJkZWZhdWx0VGFnIiwiZGVmYXVsdFR5cG8iLCJ2YWxpZFR5cG9zIiwicHJvcHMiLCJ0eXBlIiwiU3RyaW5nIiwidmFsaWRhdG9yIiwidmFsdWUiLCJpbmRleE9mIiwiQm9vbGVhbiIsIm1kY1RleHRTZWN0aW9uIiwibWRjVGV4dCIsIm1peGlucyIsIm1kY0Rpc3BsYXkiLCJtZGNIZWFkbGluZSIsIm1kY1RpdGxlIiwibWRjU3ViSGVhZGluZyIsIm1kY0JvZHkiLCJtZGNDYXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0VBQU8sU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7RUFDaEM7RUFDQSxNQUFJQyxPQUFPLElBQVg7RUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7RUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ3hDO0VBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7RUFDRDtFQUNELE1BQUlGLElBQUosRUFBVTtFQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7RUFDRDtFQUNGOztFQ1pNLFNBQVNNLFVBQVQsQ0FBcUJDLFVBQXJCLEVB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
