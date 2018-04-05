/**
* @module vue-mdc-adapterlinear-progress 0.13.2
* @exports VueMDCLinearProgress
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCLinearProgress = factory());
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

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /* global CustomEvent */

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @template A
   */
  var MDCFoundation = function () {
    createClass(MDCFoundation, null, [{
      key: "cssClasses",

      /** @return enum{cssClasses} */
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports every
        // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
        return {};
      }

      /** @return enum{strings} */

    }, {
      key: "strings",
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
        return {};
      }

      /** @return enum{numbers} */

    }, {
      key: "numbers",
      get: function get$$1() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
        return {};
      }

      /** @return {!Object} */

    }, {
      key: "defaultAdapter",
      get: function get$$1() {
        // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
        // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
        // validation.
        return {};
      }

      /**
       * @param {A=} adapter
       */

    }]);

    function MDCFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, MDCFoundation);

      /** @protected {!A} */
      this.adapter_ = adapter;
    }

    createClass(MDCFoundation, [{
      key: "init",
      value: function init() {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
      }
    }, {
      key: "destroy",
      value: function destroy() {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
      }
    }]);
    return MDCFoundation;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @template F
   */

  var MDCComponent = function () {
    createClass(MDCComponent, null, [{
      key: 'attachTo',

      /**
       * @param {!Element} root
       * @return {!MDCComponent}
       */
      value: function attachTo(root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new MDCFoundation());
      }

      /**
       * @param {!Element} root
       * @param {F=} foundation
       * @param {...?} args
       */

    }]);

    function MDCComponent(root) {
      var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      classCallCheck(this, MDCComponent);

      /** @protected {!Element} */
      this.root_ = root;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      this.initialize.apply(this, args);
      // Note that we initialize foundation here and not within the constructor's default param so that
      // this.root_ is defined and can be used within the foundation class.
      /** @protected {!F} */
      this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
      this.foundation_.init();
      this.initialSyncWithDOM();
    }

    createClass(MDCComponent, [{
      key: 'initialize',
      value: function initialize() /* ...args */{}
      // Subclasses can override this to do any additional setup work that would be considered part of a
      // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
      // initialized. Any additional arguments besides root and foundation will be passed in here.


      /**
       * @return {!F} foundation
       */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
      }

      /**
       * Wrapper method to add an event listener to the component's root element. This is most useful when
       * listening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'listen',
      value: function listen(evtType, handler) {
        this.root_.addEventListener(evtType, handler);
      }

      /**
       * Wrapper method to remove an event listener to the component's root element. This is most useful when
       * unlistening for custom events.
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: 'unlisten',
      value: function unlisten(evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
      }

      /**
       * Fires a cross-browser-compatible custom event from the component root of the given type,
       * with the given data.
       * @param {string} evtType
       * @param {!Object} evtData
       * @param {boolean=} shouldBubble
       */

    }, {
      key: 'emit',
      value: function emit(evtType, evtData) {
        var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var evt = void 0;
        if (typeof CustomEvent === 'function') {
          evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble
          });
        } else {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }

        this.root_.dispatchEvent(evt);
      }
    }]);
    return MDCComponent;
  }();

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  // Public functions to access getAnimationName() for JavaScript events or CSS
  // property names.

  var transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var cssClasses = {
    CLOSED_CLASS: 'mdc-linear-progress--closed',
    INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
    REVERSED_CLASS: 'mdc-linear-progress--reversed'
  };

  var strings = {
    PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar',
    BUFFER_SELECTOR: '.mdc-linear-progress__buffer'
  };

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var MDCLinearProgressFoundation = function (_MDCFoundation) {
    inherits(MDCLinearProgressFoundation, _MDCFoundation);
    createClass(MDCLinearProgressFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          getPrimaryBar: function getPrimaryBar() /* el: Element */{},
          getBuffer: function getBuffer() /* el: Element */{},
          hasClass: function hasClass() {
            return (/* className: string */false
            );
          },
          removeClass: function removeClass() /* className: string */{},
          setStyle: function setStyle() /* el: Element, styleProperty: string, value: string */{}
        };
      }
    }]);

    function MDCLinearProgressFoundation(adapter) {
      classCallCheck(this, MDCLinearProgressFoundation);
      return possibleConstructorReturn(this, (MDCLinearProgressFoundation.__proto__ || Object.getPrototypeOf(MDCLinearProgressFoundation)).call(this, _extends(MDCLinearProgressFoundation.defaultAdapter, adapter)));
    }

    createClass(MDCLinearProgressFoundation, [{
      key: 'init',
      value: function init() {
        this.determinate_ = !this.adapter_.hasClass(cssClasses.INDETERMINATE_CLASS);
        this.reverse_ = this.adapter_.hasClass(cssClasses.REVERSED_CLASS);
        this.progress_ = 0;
      }
    }, {
      key: 'setDeterminate',
      value: function setDeterminate(isDeterminate) {
        this.determinate_ = isDeterminate;
        if (this.determinate_) {
          this.adapter_.removeClass(cssClasses.INDETERMINATE_CLASS);
          this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
        } else {
          this.adapter_.addClass(cssClasses.INDETERMINATE_CLASS);
          this.setScale_(this.adapter_.getPrimaryBar(), 1);
          this.setScale_(this.adapter_.getBuffer(), 1);
        }
      }
    }, {
      key: 'setProgress',
      value: function setProgress(value) {
        this.progress_ = value;
        if (this.determinate_) {
          this.setScale_(this.adapter_.getPrimaryBar(), value);
        }
      }
    }, {
      key: 'setBuffer',
      value: function setBuffer(value) {
        if (this.determinate_) {
          this.setScale_(this.adapter_.getBuffer(), value);
        }
      }
    }, {
      key: 'setReverse',
      value: function setReverse(isReversed) {
        this.reverse_ = isReversed;
        if (this.reverse_) {
          this.adapter_.addClass(cssClasses.REVERSED_CLASS);
        } else {
          this.adapter_.removeClass(cssClasses.REVERSED_CLASS);
        }
      }
    }, {
      key: 'open',
      value: function open() {
        this.adapter_.removeClass(cssClasses.CLOSED_CLASS);
      }
    }, {
      key: 'close',
      value: function close() {
        this.adapter_.addClass(cssClasses.CLOSED_CLASS);
      }
    }, {
      key: 'setScale_',
      value: function setScale_(el, scaleValue) {
        var _this2 = this;

        var value = 'scaleX(' + scaleValue + ')';
        transformStyleProperties.forEach(function (transformStyleProperty) {
          _this2.adapter_.setStyle(el, transformStyleProperty, value);
        });
      }
    }]);
    return MDCLinearProgressFoundation;
  }(MDCFoundation);

  var ProgressPropType = {
    type: [Number, String],
    validator: function validator(value) {
      return Number(value) >= 0 && Number(value) <= 1;
    }
  };

  var mdcLinearProgress = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-linear-progress", class: _vm.classes, style: _vm.styles, attrs: { "role": "progressbar" } }, [_c('div', { staticClass: "mdc-linear-progress__buffering-dots" }), _vm._v(" "), _c('div', { ref: "buffer", staticClass: "mdc-linear-progress__buffer" }), _vm._v(" "), _c('div', { ref: "primary", staticClass: "mdc-linear-progress__bar mdc-linear-progress__primary-bar" }, [_c('span', { staticClass: "mdc-linear-progress__bar-inner" })]), _vm._v(" "), _vm._m(0)]);
    }, staticRenderFns: [function () {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" }, [_c('span', { staticClass: "mdc-linear-progress__bar-inner" })]);
    }],
    name: 'mdc-linear-progress',
    props: {
      'open': { type: Boolean, default: true },
      'indeterminate': Boolean,
      'reverse': Boolean,
      'accent': Boolean,
      'progress': ProgressPropType,
      'buffer': ProgressPropType
    },
    data: function data() {
      return {
        classes: { 'mdc-linear-progress--accent': this.accent },
        styles: {}
      };
    },

    watch: {
      open: function open() {
        if (this.open) {
          this.foundation.open();
        } else {
          this.foundation.close();
        }
      },
      progress: function progress() {
        this.foundation.setProgress(Number(this.progress));
      },
      buffer: function buffer() {
        this.foundation.setBuffer(Number(this.buffer));
      },
      indeterminate: function indeterminate() {
        this.foundation.setDeterminate(!this.indeterminate);
      },
      reverse: function reverse() {
        this.foundation.setReverse(this.reverse);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCLinearProgressFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        getPrimaryBar: function getPrimaryBar() /* el: Element */{
          return _this.$refs.primary;
        },
        getBuffer: function getBuffer() /* el: Element */{
          return _this.$refs.buffer;
        },
        hasClass: function hasClass(className) {
          _this.$el.classList.contains(className);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className);
        },
        setStyle: function setStyle(el, styleProperty, value) {
          el.style[styleProperty] = value;
        }
      });
      this.foundation.init();

      this.foundation.setReverse(this.reverse);
      this.foundation.setProgress(Number(this.progress));
      this.foundation.setBuffer(Number(this.buffer));
      this.foundation.setDeterminate(!this.indeterminate);
      if (this.open) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var plugin = BasePlugin({
    mdcLinearProgress: mdcLinearProgress
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLXByb2dyZXNzLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lYXItcHJvZ3Jlc3MvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saW5lYXItcHJvZ3Jlc3MvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvbGluZWFyLXByb2dyZXNzL21kYy1saW5lYXItcHJvZ3Jlc3MudnVlIiwiLi4vLi4vY29tcG9uZW50cy9saW5lYXItcHJvZ3Jlc3MvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2xpbmVhci1wcm9ncmVzcy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IHtNRENGb3VuZGF0aW9uLCBNRENDb21wb25lbnR9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgbm9QcmVmaXg6IHN0cmluZyxcbiAqICAgd2Via2l0UHJlZml4OiBzdHJpbmcsXG4gKiAgIHN0eWxlUHJvcGVydHk6IHN0cmluZ1xuICogfX1cbiAqL1xubGV0IFZlbmRvclByb3BlcnR5TWFwVHlwZTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBldmVudFR5cGVNYXAgPSB7XG4gICdhbmltYXRpb25zdGFydCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbnN0YXJ0JyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25TdGFydCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25pdGVyYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25pdGVyYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2l0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ3RyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBjc3NQcm9wZXJ0eU1hcCA9IHtcbiAgJ2FuaW1hdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC1hbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNmb3JtJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNmb3JtJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zZm9ybScsXG4gIH0sXG4gICd0cmFuc2l0aW9uJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikge1xuICByZXR1cm4gKHdpbmRvd09ialsnZG9jdW1lbnQnXSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpIHtcbiAgcmV0dXJuIChldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwIHx8IGV2ZW50VHlwZSBpbiBjc3NQcm9wZXJ0eU1hcCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59IG1hcFxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpIHtcbiAgcmV0dXJuIG1hcFtldmVudFR5cGVdLnN0eWxlUHJvcGVydHkgaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGJyb3dzZXIgcHJlZml4IGZvciBDU1MzIGFuaW1hdGlvbiBldmVudHNcbiAqIGFuZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgaWYgKCFoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHx8ICFldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gZXZlbnRUeXBlO1xuICB9XG5cbiAgY29uc3QgbWFwID0gLyoqIEB0eXBlIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovIChcbiAgICBldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwID8gZXZlbnRUeXBlTWFwIDogY3NzUHJvcGVydHlNYXBcbiAgKTtcbiAgY29uc3QgZWwgPSB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSgnZGl2Jyk7XG4gIGxldCBldmVudE5hbWUgPSAnJztcblxuICBpZiAobWFwID09PSBldmVudFR5cGVNYXApIHtcbiAgICBldmVudE5hbWUgPSBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnROYW1lID0gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbiAgfVxuXG4gIHJldHVybiBldmVudE5hbWU7XG59XG5cbi8vIFB1YmxpYyBmdW5jdGlvbnMgdG8gYWNjZXNzIGdldEFuaW1hdGlvbk5hbWUoKSBmb3IgSmF2YVNjcmlwdCBldmVudHMgb3IgQ1NTXG4vLyBwcm9wZXJ0eSBuYW1lcy5cblxuY29uc3QgdHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzID0gWyd0cmFuc2Zvcm0nLCAnV2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ01TVHJhbnNmb3JtJ107XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbmV4cG9ydCB7dHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzLCBnZXRDb3JyZWN0RXZlbnROYW1lLCBnZXRDb3JyZWN0UHJvcGVydHlOYW1lfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBDTE9TRURfQ0xBU1M6ICdtZGMtbGluZWFyLXByb2dyZXNzLS1jbG9zZWQnLFxuICBJTkRFVEVSTUlOQVRFX0NMQVNTOiAnbWRjLWxpbmVhci1wcm9ncmVzcy0taW5kZXRlcm1pbmF0ZScsXG4gIFJFVkVSU0VEX0NMQVNTOiAnbWRjLWxpbmVhci1wcm9ncmVzcy0tcmV2ZXJzZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIFBSSU1BUllfQkFSX1NFTEVDVE9SOiAnLm1kYy1saW5lYXItcHJvZ3Jlc3NfX3ByaW1hcnktYmFyJyxcbiAgQlVGRkVSX1NFTEVDVE9SOiAnLm1kYy1saW5lYXItcHJvZ3Jlc3NfX2J1ZmZlcicsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5pbXBvcnQge3RyYW5zZm9ybVN0eWxlUHJvcGVydGllc30gZnJvbSAnQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleCc7XG5cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBnZXRQcmltYXJ5QmFyOiAoKSA9PiAvKiBlbDogRWxlbWVudCAqLyB7fSxcbiAgICAgIGdldEJ1ZmZlcjogKCkgPT4gLyogZWw6IEVsZW1lbnQgKi8ge30sXG4gICAgICBoYXNDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiBmYWxzZSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGU6ICgvKiBlbDogRWxlbWVudCwgc3R5bGVQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZGV0ZXJtaW5hdGVfID0gIXRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5JTkRFVEVSTUlOQVRFX0NMQVNTKTtcbiAgICB0aGlzLnJldmVyc2VfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLlJFVkVSU0VEX0NMQVNTKTtcbiAgICB0aGlzLnByb2dyZXNzXyA9IDA7XG4gIH1cblxuICBzZXREZXRlcm1pbmF0ZShpc0RldGVybWluYXRlKSB7XG4gICAgdGhpcy5kZXRlcm1pbmF0ZV8gPSBpc0RldGVybWluYXRlO1xuICAgIGlmICh0aGlzLmRldGVybWluYXRlXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLklOREVURVJNSU5BVEVfQ0xBU1MpO1xuICAgICAgdGhpcy5zZXRTY2FsZV8odGhpcy5hZGFwdGVyXy5nZXRQcmltYXJ5QmFyKCksIHRoaXMucHJvZ3Jlc3NfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLklOREVURVJNSU5BVEVfQ0xBU1MpO1xuICAgICAgdGhpcy5zZXRTY2FsZV8odGhpcy5hZGFwdGVyXy5nZXRQcmltYXJ5QmFyKCksIDEpO1xuICAgICAgdGhpcy5zZXRTY2FsZV8odGhpcy5hZGFwdGVyXy5nZXRCdWZmZXIoKSwgMSk7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvZ3Jlc3ModmFsdWUpIHtcbiAgICB0aGlzLnByb2dyZXNzXyA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmRldGVybWluYXRlXykge1xuICAgICAgdGhpcy5zZXRTY2FsZV8odGhpcy5hZGFwdGVyXy5nZXRQcmltYXJ5QmFyKCksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRCdWZmZXIodmFsdWUpIHtcbiAgICBpZiAodGhpcy5kZXRlcm1pbmF0ZV8pIHtcbiAgICAgIHRoaXMuc2V0U2NhbGVfKHRoaXMuYWRhcHRlcl8uZ2V0QnVmZmVyKCksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRSZXZlcnNlKGlzUmV2ZXJzZWQpIHtcbiAgICB0aGlzLnJldmVyc2VfID0gaXNSZXZlcnNlZDtcbiAgICBpZiAodGhpcy5yZXZlcnNlXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLlJFVkVSU0VEX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLlJFVkVSU0VEX0NMQVNTKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5DTE9TRURfQ0xBU1MpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkNMT1NFRF9DTEFTUyk7XG4gIH1cblxuICBzZXRTY2FsZV8oZWwsIHNjYWxlVmFsdWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9ICdzY2FsZVgoJyArIHNjYWxlVmFsdWUgKyAnKSc7XG4gICAgdHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzLmZvckVhY2goKHRyYW5zZm9ybVN0eWxlUHJvcGVydHkpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGUoZWwsIHRyYW5zZm9ybVN0eWxlUHJvcGVydHksIHZhbHVlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IHJvbGU9XCJwcm9ncmVzc2JhclwiIGNsYXNzPVwibWRjLWxpbmVhci1wcm9ncmVzc1wiIFxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiA6c3R5bGU9XCJzdHlsZXNcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWRjLWxpbmVhci1wcm9ncmVzc19fYnVmZmVyaW5nLWRvdHNcIj48L2Rpdj5cbiAgICA8ZGl2IHJlZj1cImJ1ZmZlclwiIGNsYXNzPVwibWRjLWxpbmVhci1wcm9ncmVzc19fYnVmZmVyXCI+PC9kaXY+XG4gICAgPGRpdiByZWY9XCJwcmltYXJ5XCIgY2xhc3M9XCJtZGMtbGluZWFyLXByb2dyZXNzX19iYXIgbWRjLWxpbmVhci1wcm9ncmVzc19fcHJpbWFyeS1iYXJcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibWRjLWxpbmVhci1wcm9ncmVzc19fYmFyLWlubmVyXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtZGMtbGluZWFyLXByb2dyZXNzX19iYXIgbWRjLWxpbmVhci1wcm9ncmVzc19fc2Vjb25kYXJ5LWJhclwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtZGMtbGluZWFyLXByb2dyZXNzX19iYXItaW5uZXJcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PiAgXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1EQ0xpbmVhclByb2dyZXNzRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbGluZWFyLXByb2dyZXNzL2ZvdW5kYXRpb24nXG5cbmNvbnN0IFByb2dyZXNzUHJvcFR5cGUgPSB7XG4gIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gIHZhbGlkYXRvciAodmFsdWUpIHtcbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlKSA+PSAwICYmIE51bWJlcih2YWx1ZSkgPD0gMVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1saW5lYXItcHJvZ3Jlc3MnLFxuICBwcm9wczoge1xuICAgICdvcGVuJzogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH0sXG4gICAgJ2luZGV0ZXJtaW5hdGUnOiBCb29sZWFuLFxuICAgICdyZXZlcnNlJzogQm9vbGVhbixcbiAgICAnYWNjZW50JzogQm9vbGVhbixcbiAgICAncHJvZ3Jlc3MnOiBQcm9ncmVzc1Byb3BUeXBlLFxuICAgICdidWZmZXInOiBQcm9ncmVzc1Byb3BUeXBlXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7J21kYy1saW5lYXItcHJvZ3Jlc3MtLWFjY2VudCc6IHRoaXMuYWNjZW50fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3BlbiAoKSB7XG4gICAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBwcm9ncmVzcyAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0UHJvZ3Jlc3MoTnVtYmVyKHRoaXMucHJvZ3Jlc3MpKVxuICAgIH0sXG4gICAgYnVmZmVyICgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRCdWZmZXIoTnVtYmVyKHRoaXMuYnVmZmVyKSlcbiAgICB9LFxuICAgIGluZGV0ZXJtaW5hdGUgKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldERldGVybWluYXRlKCF0aGlzLmluZGV0ZXJtaW5hdGUpXG4gICAgfSxcbiAgICByZXZlcnNlICgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRSZXZlcnNlKHRoaXMucmV2ZXJzZSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENMaW5lYXJQcm9ncmVzc0ZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgfSxcbiAgICAgIGdldFByaW1hcnlCYXI6ICgpID0+IC8qIGVsOiBFbGVtZW50ICovIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMucHJpbWFyeVxuICAgICAgfSxcbiAgICAgIGdldEJ1ZmZlcjogKCkgPT4gLyogZWw6IEVsZW1lbnQgKi8ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5idWZmZXJcbiAgICAgIH0sXG4gICAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLiRlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBzZXRTdHlsZTogKGVsLCBzdHlsZVByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBlbC5zdHlsZVtzdHlsZVByb3BlcnR5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpXG5cbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0UmV2ZXJzZSh0aGlzLnJldmVyc2UpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldFByb2dyZXNzKE51bWJlcih0aGlzLnByb2dyZXNzKSlcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0QnVmZmVyKE51bWJlcih0aGlzLmJ1ZmZlcikpXG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldERldGVybWluYXRlKCF0aGlzLmluZGV0ZXJtaW5hdGUpXG4gICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLm9wZW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uY2xvc2UoKVxuICAgIH1cbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNMaW5lYXJQcm9ncmVzcyBmcm9tICcuL21kYy1saW5lYXItcHJvZ3Jlc3MudnVlJ1xuXG5leHBvcnQge1xuICBtZGNMaW5lYXJQcm9ncmVzc1xufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjTGluZWFyUHJvZ3Jlc3Ncbn0pIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsInZtIiwia2V5IiwiY29tcG9uZW50IiwibmFtZSIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiYXJncyIsImluaXRpYWxpemUiLCJmb3VuZGF0aW9uXyIsImdldERlZmF1bHRGb3VuZGF0aW9uIiwiaW5pdCIsImluaXRpYWxTeW5jV2l0aERPTSIsIkVycm9yIiwiZGVzdHJveSIsImV2dFR5cGUiLCJoYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMiLCJjc3NDbGFzc2VzIiwiQ0xPU0VEX0NMQVNTIiwiSU5ERVRFUk1JTkFURV9DTEFTUyIsIlJFVkVSU0VEX0NMQVNTIiwic3RyaW5ncyIsIlBSSU1BUllfQkFSX1NFTEVDVE9SIiwiQlVGRkVSX1NFTEVDVE9SIiwiTURDTGluZWFyUHJvZ3Jlc3NGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJnZXRQcmltYXJ5QmFyIiwiZ2V0QnVmZmVyIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNldFN0eWxlIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJkZWZhdWx0QWRhcHRlciIsImRldGVybWluYXRlXyIsInJldmVyc2VfIiwicHJvZ3Jlc3NfIiwiaXNEZXRlcm1pbmF0ZSIsInNldFNjYWxlXyIsInZhbHVlIiwiaXNSZXZlcnNlZCIsImVsIiwic2NhbGVWYWx1ZSIsImZvckVhY2giLCJ0cmFuc2Zvcm1TdHlsZVByb3BlcnR5IiwiUHJvZ3Jlc3NQcm9wVHlwZSIsInR5cGUiLCJOdW1iZXIiLCJTdHJpbmciLCJ2YWxpZGF0b3IiLCJyZW5kZXIiLCJwcm9wcyIsIkJvb2xlYW4iLCJkZWZhdWx0IiwiZGF0YSIsImNsYXNzZXMiLCJhY2NlbnQiLCJzdHlsZXMiLCJ3YXRjaCIsIm9wZW4iLCJjbG9zZSIsInByb2dyZXNzIiwic2V0UHJvZ3Jlc3MiLCJidWZmZXIiLCJzZXRCdWZmZXIiLCJpbmRldGVybWluYXRlIiwic2V0RGV0ZXJtaW5hdGUiLCJyZXZlcnNlIiwic2V0UmV2ZXJzZSIsIm1vdW50ZWQiLCJjbGFzc05hbWUiLCIkc2V0IiwiJHJlZnMiLCJwcmltYXJ5IiwiJGVsIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCIkZGVsZXRlIiwic3R5bGVQcm9wZXJ0eSIsInN0eWxlIiwiYmVmb3JlRGVzdHJveSIsIm1kY0xpbmVhclByb2dyZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0VBQU8sU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7RUFDaEM7RUFDQSxNQUFJQyxPQUFPLElBQVg7RUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7RUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ3hDO0VBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7RUFDRDtFQUNELE1BQUlGLElBQUosRUFBVTtFQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7RUFDRDtFQUNGOztFQ1pNLFNBQVNNLFVBQVQsQ0FBcUJDLFVBQXJCLEVBQWlDO0VBQ3RDLFNBQU87RUFDTEMsYUFBUyxRQURKO0VBRUxDLGFBQVMsaUJBQUNDLEVBQUQsRUFBUTtFQUNmLFdBQUssSUFBSUMsR0FBVCxJQUFnQkosVUFBaEIsRUFBNEI7RUFDMUIsWUFBSUssWUFBWUwsV0FBV0ksR0FBWCxDQUFoQjtFQUNFRCxXQUFHRSxTQUFILENBQWFBLFVBQVVDLElBQXZCLEVBQTRCRCxTQUE1QjtFQUNIO0VBQ0YsS0FQSTtFQVFMTDtFQVJLLEdBQVA7RUFVRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQ1hEOztFQ0FBOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCQTs7O01BR01POzs7O0VBQ0o7NkJBQ3dCO0VBQ3RCO0VBQ0E7RUFDQSxhQUFPLEVBQVA7RUFDRDs7RUFFRDs7Ozs2QkFDcUI7RUFDbkI7RUFDQTtFQUNBLGFBQU8sRUFBUDtFQUNEOztFQUVEOzs7OzZCQUNxQjtFQUNuQjtFQUNBO0VBQ0EsYUFBTyxFQUFQO0VB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
