/**
* @module vue-mdc-adaptertabs 0.13.2
* @exports VueMDCTabs
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCTabs = factory());
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var CustomLink = {
    name: 'custom-link',
    functional: true,
    props: {
      tag: { type: String, default: 'a' },
      link: Object
    },
    render: function render(h, context) {
      var element = void 0;
      var data = _extends({}, context.data);

      if (context.props.link && context.parent.$router) {
        // router-link case
        element = context.parent.$root.$options.components['router-link'];
        data.props = _extends({ tag: context.props.tag }, context.props.link);
        if (data.on.click) {
          data.nativeOn = { click: data.on.click };
        }
      } else {
        // element fallback
        element = context.props.tag;
      }

      return h(element, data, context.children);
    }
  };

  var CustomLinkMixin = {
    props: {
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
      CustomLink: CustomLink
    }
  };

  /* global CustomEvent */

  function emitCustomEvent(el, evtType, evtData) {
    var shouldBubble = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

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
    el.dispatchEvent(evt);
  }

  function extractIconProp(iconProp) {
    if (typeof iconProp === 'string') {
      return {
        classes: { 'material-icons': true },
        content: iconProp
      };
    } else if (iconProp instanceof Array) {
      return {
        classes: iconProp.reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {})
      };
    } else if ((typeof iconProp === 'undefined' ? 'undefined' : _typeof(iconProp)) === 'object') {
      return {
        classes: iconProp.className.split(' ').reduce(function (result, value) {
          return _extends(result, defineProperty({}, value, true));
        }, {}),
        content: iconProp.textContent
      };
    }
  }

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
    ACTIVE: 'mdc-tab--active'
  };

  var strings = {
    SELECTED_EVENT: 'MDCTab:selected'
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

  var MDCTabFoundation = function (_MDCFoundation) {
    inherits(MDCTabFoundation, _MDCFoundation);
    createClass(MDCTabFoundation, null, [{
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
          removeClass: function removeClass() /* className: string */{},
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          getOffsetLeft: function getOffsetLeft() {
            return (/* number */0
            );
          },
          notifySelected: function notifySelected() {}
        };
      }
    }]);

    function MDCTabFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, MDCTabFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabFoundation.__proto__ || Object.getPrototypeOf(MDCTabFoundation)).call(this, _extends(MDCTabFoundation.defaultAdapter, adapter)));

      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.isActive_ = false;
      _this.preventDefaultOnClick_ = false;

      _this.clickHandler_ = function (evt) {
        if (_this.preventDefaultOnClick_) {
          evt.preventDefault();
        }
        _this.adapter_.notifySelected();
      };

      _this.keydownHandler_ = function (evt) {
        if (evt.key && evt.key === 'Enter' || evt.keyCode === 13) {
          _this.adapter_.notifySelected();
        }
      };
      return _this;
    }

    createClass(MDCTabFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'getComputedWidth',
      value: function getComputedWidth() {
        return this.computedWidth_;
      }
    }, {
      key: 'getComputedLeft',
      value: function getComputedLeft() {
        return this.computedLeft_;
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        return this.isActive_;
      }
    }, {
      key: 'setActive',
      value: function setActive(isActive) {
        this.isActive_ = isActive;
        if (this.isActive_) {
          this.adapter_.addClass(cssClasses.ACTIVE);
        } else {
          this.adapter_.removeClass(cssClasses.ACTIVE);
        }
      }
    }, {
      key: 'preventsDefaultOnClick',
      value: function preventsDefaultOnClick() {
        return this.preventDefaultOnClick_;
      }
    }, {
      key: 'setPreventDefaultOnClick',
      value: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.preventDefaultOnClick_ = preventDefaultOnClick;
      }
    }, {
      key: 'measureSelf',
      value: function measureSelf() {
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.computedLeft_ = this.adapter_.getOffsetLeft();
      }
    }]);
    return MDCTabFoundation;
  }(MDCFoundation);

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

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Ripple. Provides an interface for managing
   * - classes
   * - dom
   * - CSS variables
   * - position
   * - dimensions
   * - scroll position
   * - event handlers
   * - unbounded, active and disabled states
   *
   * Additionally, provides type information for the adapter to the Closure
   * compiler.
   *
   * Implement this adapter for your framework of choice to delegate updates to
   * the component in your framework of choice. See architecture documentation
   * for more details.
   * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
   *
   * @record
   */
  var MDCRippleAdapter = function () {
    function MDCRippleAdapter() {
      classCallCheck(this, MDCRippleAdapter);
    }

    createClass(MDCRippleAdapter, [{
      key: "browserSupportsCssVars",

      /** @return {boolean} */
      value: function browserSupportsCssVars() {}

      /** @return {boolean} */

    }, {
      key: "isUnbounded",
      value: function isUnbounded() {}

      /** @return {boolean} */

    }, {
      key: "isSurfaceActive",
      value: function isSurfaceActive() {}

      /** @return {boolean} */

    }, {
      key: "isSurfaceDisabled",
      value: function isSurfaceDisabled() {}

      /** @param {string} className */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /** @param {!EventTarget} target */

    }, {
      key: "containsEventTarget",
      value: function containsEventTarget(target) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "registerDocumentInteractionHandler",
      value: function registerDocumentInteractionHandler(evtType, handler) {}

      /**
       * @param {string} evtType
       * @param {!Function} handler
       */

    }, {
      key: "deregisterDocumentInteractionHandler",
      value: function deregisterDocumentInteractionHandler(evtType, handler) {}

      /**
       * @param {!Function} handler
       */

    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}

      /**
       * @param {!Function} handler
       */

    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}

      /**
       * @param {string} varName
       * @param {?number|string} value
       */

    }, {
      key: "updateCssVariable",
      value: function updateCssVariable(varName, value) {}

      /** @return {!ClientRect} */

    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}

      /** @return {{x: number, y: number}} */

    }, {
      key: "getWindowPageOffset",
      value: function getWindowPageOffset() {}
    }]);
    return MDCRippleAdapter;
  }();

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

  var cssClasses$1 = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings$1 = {
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
  };

  var numbers = {
    PADDING: 10,
    INITIAL_ORIGIN_SCALE: 0.6,
    DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
    FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
    TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
  };

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

  /**
   * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
   * @private {boolean|undefined}
   */
  var supportsCssVariables_ = void 0;

  /**
   * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
   * @private {boolean|undefined}
   */
  var supportsPassive_ = void 0;

  /**
   * @param {!Window} windowObj
   * @return {boolean}
   */
  function detectEdgePseudoVarBug(windowObj) {
    // Detect versions of Edge with buggy var() support
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    var document = windowObj.document;
    var node = document.createElement('div');
    node.className = 'mdc-ripple-surface--test-edge-var-bug';
    document.body.appendChild(node);

    // The bug exists if ::before style ends up propagating to the parent element.
    // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
    // but Firefox is known to support CSS custom properties correctly.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = windowObj.getComputedStyle(node);
    var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
    node.remove();
    return hasPseudoVarBug;
  }

  /**
   * @param {!Window} windowObj
   * @param {boolean=} forceRefresh
   * @return {boolean|undefined}
   */

  function supportsCssVariables(windowObj) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
      return supportsCssVariables_;
    }

    var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
    if (!supportsFunctionPresent) {
      return;
    }

    var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

    if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
      supportsCssVariables_ = !detectEdgePseudoVarBug(windowObj);
    } else {
      supportsCssVariables_ = false;
    }
    return supportsCssVariables_;
  }

  //
  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|{passive: boolean}}
   */
  function applyPassive() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_ === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}

      supportsPassive_ = isSupported;
    }

    return supportsPassive_ ? { passive: true } : false;
  }

  /**
   * @param {!Object} HTMLElementPrototype
   * @return {!Array<string>}
   */
  function getMatchesProperty(HTMLElementPrototype) {
    return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
      return p in HTMLElementPrototype;
    }).pop();
  }

  /**
   * @param {!Event} ev
   * @param {!{x: number, y: number}} pageOffset
   * @param {!ClientRect} clientRect
   * @return {!{x: number, y: number}}
   */
  function getNormalizedEventCoords(ev, pageOffset, clientRect) {
    var x = pageOffset.x,
        y = pageOffset.y;

    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;

    var normalizedX = void 0;
    var normalizedY = void 0;
    // Determine touch point relative to the ripple container.
    if (ev.type === 'touchstart') {
      normalizedX = ev.changedTouches[0].pageX - documentX;
      normalizedY = ev.changedTouches[0].pageY - documentY;
    } else {
      normalizedX = ev.pageX - documentX;
      normalizedY = ev.pageY - documentY;
    }

    return { x: normalizedX, y: normalizedY };
  }

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

  // Activation events registered on the root element of each instance for activation
  var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

  // Deactivation events registered on documentElement when a pointer-related down event occurs
  var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

  // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
  /** @type {!Array<!EventTarget>} */
  var activatedTargets = [];

  /**
   * @extends {MDCFoundation<!MDCRippleAdapter>}
   */

  var MDCRippleFoundation = function (_MDCFoundation) {
    inherits(MDCRippleFoundation, _MDCFoundation);
    createClass(MDCRippleFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$1;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$1;
      }
    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
          isUnbounded: function isUnbounded() /* boolean */{},
          isSurfaceActive: function isSurfaceActive() /* boolean */{},
          isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
          registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
          computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
          getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
        };
      }
    }]);

    function MDCRippleFoundation(adapter) {
      classCallCheck(this, MDCRippleFoundation);

      /** @private {number} */
      var _this = possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

      _this.layoutFrame_ = 0;

      /** @private {!ClientRect} */
      _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

      /** @private {!ActivationStateType} */
      _this.activationState_ = _this.defaultActivationState_();

      /** @private {number} */
      _this.initialSize_ = 0;

      /** @private {number} */
      _this.maxRadius_ = 0;

      /** @private {function(!Event)} */
      _this.activateHandler_ = function (e) {
        return _this.activate_(e);
      };

      /** @private {function(!Event)} */
      _this.deactivateHandler_ = function (e) {
        return _this.deactivate_(e);
      };

      /** @private {function(?Event=)} */
      _this.focusHandler_ = function () {
        return requestAnimationFrame(function () {
          return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      };

      /** @private {function(?Event=)} */
      _this.blurHandler_ = function () {
        return requestAnimationFrame(function () {
          return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      };

      /** @private {!Function} */
      _this.resizeHandler_ = function () {
        return _this.layout();
      };

      /** @private {!{left: number, top:number}} */
      _this.unboundedCoords_ = {
        left: 0,
        top: 0
      };

      /** @private {number} */
      _this.fgScale_ = 0;

      /** @private {number} */
      _this.activationTimer_ = 0;

      /** @private {number} */
      _this.fgDeactivationRemovalTimer_ = 0;

      /** @private {boolean} */
      _this.activationAnimationHasEnded_ = false;

      /** @private {!Function} */
      _this.activationTimerCallback_ = function () {
        _this.activationAnimationHasEnded_ = true;
        _this.runDeactivationUXLogicIfReady_();
      };

      /** @private {?Event} */
      _this.previousActivationEvent_ = null;
      return _this;
    }

    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     * @return {boolean}
     * @private
     */


    createClass(MDCRippleFoundation, [{
      key: 'isSupported_',
      value: function isSupported_() {
        return this.adapter_.browserSupportsCssVars();
      }

      /**
       * @return {!ActivationStateType}
       */

    }, {
      key: 'defaultActivationState_',
      value: function defaultActivationState_() {
        return {
          isActivated: false,
          hasDeactivationUXRun: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false,
          activationEvent: null,
          isProgrammatic: false
        };
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        if (!this.isSupported_()) {
          return;
        }
        this.registerRootHandlers_();

        var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
            ROOT = _MDCRippleFoundation$.ROOT,
            UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

        requestAnimationFrame(function () {
          _this2.adapter_.addClass(ROOT);
          if (_this2.adapter_.isUnbounded()) {
            _this2.adapter_.addClass(UNBOUNDED);
          }
          _this2.layoutInternal_();
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        if (!this.isSupported_()) {
          return;
        }
        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();

        var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
            ROOT = _MDCRippleFoundation$2.ROOT,
            UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

        requestAnimationFrame(function () {
          _this3.adapter_.removeClass(ROOT);
          _this3.adapter_.removeClass(UNBOUNDED);
          _this3.removeCssVars_();
        });
      }

      /** @private */

    }, {
      key: 'registerRootHandlers_',
      value: function registerRootHandlers_() {
        var _this4 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
        });
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }

      /**
       * @param {!Event} e
       * @private
       */

    }, {
      key: 'registerDeactivationHandlers_',
      value: function registerDeactivationHandlers_(e) {
        var _this5 = this;

        if (e.type === 'keydown') {
          this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        } else {
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
          });
        }
      }

      /** @private */

    }, {
      key: 'deregisterRootHandlers_',
      value: function deregisterRootHandlers_() {
        var _this6 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }

      /** @private */

    }, {
      key: 'deregisterDeactivationHandlers_',
      value: function deregisterDeactivationHandlers_() {
        var _this7 = this;

        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
        });
      }

      /** @private */

    }, {
      key: 'removeCssVars_',
      value: function removeCssVars_() {
        var _this8 = this;

        var strings = MDCRippleFoundation.strings;

        Object.keys(strings).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings[k], null);
          }
        });
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'activate_',
      value: function activate_(e) {
        var _this9 = this;

        if (this.adapter_.isSurfaceDisabled()) {
          return;
        }

        var activationState = this.activationState_;
        if (activationState.isActivated) {
          return;
        }

        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
        if (isSameInteraction) {
          return;
        }

        activationState.isActivated = true;
        activationState.isProgrammatic = e === null;
        activationState.activationEvent = e;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

        var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
          return _this9.adapter_.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          // Immediately reset activation state, while preserving logic that prevents touch follow-on events
          this.resetActivationState_();
          return;
        }

        if (e) {
          activatedTargets.push( /** @type {!EventTarget} */e.target);
          this.registerDeactivationHandlers_(e);
        }

        requestAnimationFrame(function () {
          // This needs to be wrapped in an rAF call b/c web browsers
          // report active states inconsistently when they're called within
          // event handling code:
          // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
          // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
          activationState.wasElementMadeActive = e && e.type === 'keydown' ? _this9.adapter_.isSurfaceActive() : true;
          if (activationState.wasElementMadeActive) {
            _this9.animateActivation_();
          } else {
            // Reset activation state immediately if element was not made active.
            _this9.activationState_ = _this9.defaultActivationState_();
          }

          // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
          activatedTargets = [];
        });
      }

      /**
       * @param {?Event=} event Optional event containing position information.
       */

    }, {
      key: 'activate',
      value: function activate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.activate_(event);
      }

      /** @private */

    }, {
      key: 'animateActivation_',
      value: function animateActivation_() {
        var _this10 = this;

        var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
            VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
            VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
        var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
            FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
            FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


        var translateStart = '';
        var translateEnd = '';

        if (!this.adapter_.isUnbounded()) {
          var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
              startPoint = _getFgTranslationCoor.startPoint,
              endPoint = _getFgTranslationCoor.endPoint;

          translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
          translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
        }

        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);

        // Force layout in order to re-trigger the animation.
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () {
          return _this10.activationTimerCallback_();
        }, DEACTIVATION_TIMEOUT_MS);
      }

      /**
       * @private
       * @return {{startPoint: PointType, endPoint: PointType}}
       */

    }, {
      key: 'getFgTranslationCoordinates_',
      value: function getFgTranslationCoordinates_() {
        var _activationState_ = this.activationState_,
            activationEvent = _activationState_.activationEvent,
            wasActivatedByPointer = _activationState_.wasActivatedByPointer;


        var startPoint = void 0;
        if (wasActivatedByPointer) {
          startPoint = getNormalizedEventCoords(
          /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame_.width / 2,
            y: this.frame_.height / 2
          };
        }
        // Center the element around the start point.
        startPoint = {
          x: startPoint.x - this.initialSize_ / 2,
          y: startPoint.y - this.initialSize_ / 2
        };

        var endPoint = {
          x: this.frame_.width / 2 - this.initialSize_ / 2,
          y: this.frame_.height / 2 - this.initialSize_ / 2
        };

        return { startPoint: startPoint, endPoint: endPoint };
      }

      /** @private */

    }, {
      key: 'runDeactivationUXLogicIfReady_',
      value: function runDeactivationUXLogicIfReady_() {
        var _this11 = this;

        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _activationState_2 = this.activationState_,
            hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
            isActivated = _activationState_2.isActivated;

        var activationHasEnded = hasDeactivationUXRun || !isActivated;

        if (activationHasEnded && this.activationAnimationHasEnded_) {
          this.rmBoundedActivationClasses_();
          this.adapter_.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer_ = setTimeout(function () {
            _this11.adapter_.removeClass(FG_DEACTIVATION);
          }, numbers.FG_DEACTIVATION_MS);
        }
      }

      /** @private */

    }, {
      key: 'rmBoundedActivationClasses_',
      value: function rmBoundedActivationClasses_() {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
      }
    }, {
      key: 'resetActivationState_',
      value: function resetActivationState_() {
        var _this12 = this;

        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () {
          return _this12.previousActivationEvent_ = null;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      }

      /**
       * @param {?Event} e
       * @private
       */

    }, {
      key: 'deactivate_',
      value: function deactivate_(e) {
        var _this13 = this;

        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
          return;
        }

        var state = /** @type {!ActivationStateType} */_extends({}, activationState);

        if (activationState.isProgrammatic) {
          var evtObject = null;
          requestAnimationFrame(function () {
            return _this13.animateDeactivation_(evtObject, state);
          });
          this.resetActivationState_();
        } else {
          this.deregisterDeactivationHandlers_();
          requestAnimationFrame(function () {
            _this13.activationState_.hasDeactivationUXRun = true;
            _this13.animateDeactivation_(e, state);
            _this13.resetActivationState_();
          });
        }
      }

      /**
       * @param {?Event=} event Optional event containing position information.
       */

    }, {
      key: 'deactivate',
      value: function deactivate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.deactivate_(event);
      }

      /**
       * @param {Event} e
       * @param {!ActivationStateType} options
       * @private
       */

    }, {
      key: 'animateDeactivation_',
      value: function animateDeactivation_(e, _ref) {
        var wasActivatedByPointer = _ref.wasActivatedByPointer,
            wasElementMadeActive = _ref.wasElementMadeActive;

        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady_();
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this14 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
          _this14.layoutInternal_();
          _this14.layoutFrame_ = 0;
        });
      }

      /** @private */

    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this15 = this;

        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);

        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function getBoundedRadius() {
          var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
          return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };

        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
        this.fgScale_ = this.maxRadius_ / this.initialSize_;

        this.updateLayoutCssVars_();
      }

      /** @private */

    }, {
      key: 'updateLayoutCssVars_',
      value: function updateLayoutCssVars_() {
        var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
            VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
            VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
            VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
            VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

        if (this.adapter_.isUnbounded()) {
          this.unboundedCoords_ = {
            left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
            top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
          };

          this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
          this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
        }
      }

      /** @param {boolean} unbounded */

    }, {
      key: 'setUnbounded',
      value: function setUnbounded(unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

        if (unbounded) {
          this.adapter_.addClass(UNBOUNDED);
        } else {
          this.adapter_.removeClass(UNBOUNDED);
        }
      }
    }]);
    return MDCRippleFoundation;
  }(MDCFoundation);

  var RippleBase = function (_MDCRippleFoundation) {
    inherits(RippleBase, _MDCRippleFoundation);
    createClass(RippleBase, null, [{
      key: 'isSurfaceActive',
      value: function isSurfaceActive(ref) {
        return ref[RippleBase.MATCHES](':active');
      }
    }, {
      key: 'MATCHES',
      get: function get$$1() {
        /* global HTMLElement */
        return RippleBase._matches || (RippleBase._matches = getMatchesProperty(HTMLElement.prototype));
      }
    }]);

    function RippleBase(vm, options) {
      classCallCheck(this, RippleBase);
      return possibleConstructorReturn(this, (RippleBase.__proto__ || Object.getPrototypeOf(RippleBase)).call(this, _extends({
        browserSupportsCssVars: function browserSupportsCssVars() {
          return supportsCssVariables(window);
        },
        isUnbounded: function isUnbounded() {
          return false;
        },
        isSurfaceActive: function isSurfaceActive() {
          return vm.$el[RippleBase.MATCHES](':active');
        },
        isSurfaceDisabled: function isSurfaceDisabled() {
          return vm.disabled;
        },
        addClass: function addClass(className) {
          vm.$set(vm.classes, className, true);
        },
        removeClass: function removeClass(className) {
          vm.$delete(vm.classes, className);
        },

        containsEventTarget: function containsEventTarget(target) {
          return vm.$el.contains(target);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          vm.$el.addEventListener(evt, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          vm.$el.removeEventListener(evt, handler);
        },
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.addEventListener(evtType, handler, applyPassive());
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.removeEventListener(evtType, handler, applyPassive());
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        updateCssVariable: function updateCssVariable(varName, value) {
          vm.$set(vm.styles, varName, value);
        },
        computeBoundingRect: function computeBoundingRect() {
          return vm.$el.getBoundingClientRect();
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return { x: window.pageXOffset, y: window.pageYOffset };
        }
      }, options)));
    }

    return RippleBase;
  }(MDCRippleFoundation);

  var mdcTab = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', { staticClass: "mdc-tab", class: _vm.classes, style: _vm.styles, attrs: { "link": _vm.link }, on: { "click": _vm.dispatchEvent } }, [!!_vm.hasIcon ? _c('i', { ref: "icon", staticClass: "mdc-tab__icon", class: _vm.hasIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("icon", [_vm._v(_vm._s(_vm.hasIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasText ? _c('span', { class: { 'mdc-tab__icon-text': !!_vm.hasIcon } }, [_vm._t("default")], 2) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-tab',
    mixins: [CustomLinkMixin, DispatchEventMixin],
    props: {
      active: Boolean,
      icon: [String, Array, Object]
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      hasIcon: function hasIcon() {
        if (this.icon || this.$slots.icon) {
          this.icon ? extractIconProp(this.icon) : {};
        }
        return false;
      },
      hasText: function hasText() {
        return !!this.$slots.default;
      }
    },
    methods: {
      getComputedWidth: function getComputedWidth() {
        return this.foundation.getComputedWidth();
      },
      getComputedLeft: function getComputedLeft() {
        return this.foundation.getComputedLeft();
      },
      isActive: function isActive() {
        return this.foundation.isActive();
      },
      setActive: function setActive(isActive) {
        this.foundation.setActive(isActive);
      },
      isDefaultPreventedOnClick: function isDefaultPreventedOnClick() {
        return this.foundation.preventsDefaultOnClick();
      },
      setPreventDefaultOnClick: function setPreventDefaultOnClick(preventDefaultOnClick) {
        this.foundation.setPreventDefaultOnClick(preventDefaultOnClick);
      },
      measureSelf: function measureSelf() {
        this.foundation.measureSelf();
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this.$el.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this.$el.removeEventListener(type, handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        getOffsetLeft: function getOffsetLeft() {
          return _this.$el.offsetLeft;
        },
        notifySelected: function notifySelected() {
          emitCustomEvent(_this.$el, MDCTabFoundation.strings.SELECTED_EVENT, { tab: _this }, true);
        }
      });
      this.foundation.init();
      this.setActive(this.active);
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
      this.ripple.destroy();
    }
  };

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

  /** @const {Object<string, !VendorPropertyMapType>} */
  var eventTypeMap = {
    'animationstart': {
      noPrefix: 'animationstart',
      webkitPrefix: 'webkitAnimationStart',
      styleProperty: 'animation'
    },
    'animationend': {
      noPrefix: 'animationend',
      webkitPrefix: 'webkitAnimationEnd',
      styleProperty: 'animation'
    },
    'animationiteration': {
      noPrefix: 'animationiteration',
      webkitPrefix: 'webkitAnimationIteration',
      styleProperty: 'animation'
    },
    'transitionend': {
      noPrefix: 'transitionend',
      webkitPrefix: 'webkitTransitionEnd',
      styleProperty: 'transition'
    }
  };

  /** @const {Object<string, !VendorPropertyMapType>} */
  var cssPropertyMap = {
    'animation': {
      noPrefix: 'animation',
      webkitPrefix: '-webkit-animation'
    },
    'transform': {
      noPrefix: 'transform',
      webkitPrefix: '-webkit-transform'
    },
    'transition': {
      noPrefix: 'transition',
      webkitPrefix: '-webkit-transition'
    }
  };

  /**
   * @param {!Object} windowObj
   * @return {boolean}
   */
  function hasProperShape(windowObj) {
    return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
  }

  /**
   * @param {string} eventType
   * @return {boolean}
   */
  function eventFoundInMaps(eventType) {
    return eventType in eventTypeMap || eventType in cssPropertyMap;
  }

  /**
   * @param {string} eventType
   * @param {!Object<string, !VendorPropertyMapType>} map
   * @param {!Element} el
   * @return {string}
   */
  function getJavaScriptEventName(eventType, map, el) {
    return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  /**
   * Helper function to determine browser prefix for CSS3 animation events
   * and property names.
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getAnimationName(windowObj, eventType) {
    if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
      return eventType;
    }

    var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
    var el = windowObj['document']['createElement']('div');
    var eventName = '';

    if (map === eventTypeMap) {
      eventName = getJavaScriptEventName(eventType, map, el);
    } else {
      eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    }

    return eventName;
  }

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectPropertyName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

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

  var cssClasses$2 = {
    UPGRADED: 'mdc-tab-bar-upgraded'
  };

  var strings$2 = {
    TAB_SELECTOR: '.mdc-tab',
    INDICATOR_SELECTOR: '.mdc-tab-bar__indicator',
    CHANGE_EVENT: 'MDCTabBar:change'
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

  var MDCTabBarFoundation = function (_MDCFoundation) {
    inherits(MDCTabBarFoundation, _MDCFoundation);
    createClass(MDCTabBarFoundation, null, [{
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$2;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$2;
      }
    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {},
          unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          getOffsetWidth: function getOffsetWidth() {
            return (/* number */0
            );
          },
          setStyleForIndicator: function setStyleForIndicator() /* propertyName: string, value: string */{},
          getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
            return (/* number */0
            );
          },
          notifyChange: function notifyChange() /* evtData: {activeTabIndex: number} */{},
          getNumberOfTabs: function getNumberOfTabs() {
            return (/* number */0
            );
          },
          isTabActiveAtIndex: function isTabActiveAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setTabActiveAtIndex: function setTabActiveAtIndex() /* index: number, isActive: true */{},
          isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex() {
            return (/* index: number */ /* boolean */false
            );
          },
          setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex() /* index: number, preventDefaultOnClick: boolean */{},
          measureTabAtIndex: function measureTabAtIndex() /* index: number */{},
          getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          },
          getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex() {
            return (/* index: number */ /* number */0
            );
          }
        };
      }
    }]);

    function MDCTabBarFoundation(adapter) {
      classCallCheck(this, MDCTabBarFoundation);

      var _this = possibleConstructorReturn(this, (MDCTabBarFoundation.__proto__ || Object.getPrototypeOf(MDCTabBarFoundation)).call(this, _extends(MDCTabBarFoundation.defaultAdapter, adapter)));

      _this.isIndicatorShown_ = false;
      _this.computedWidth_ = 0;
      _this.computedLeft_ = 0;
      _this.activeTabIndex_ = 0;
      _this.layoutFrame_ = 0;
      _this.resizeHandler_ = function () {
        return _this.layout();
      };
      return _this;
    }

    createClass(MDCTabBarFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.addClass(cssClasses$2.UPGRADED);
        this.adapter_.bindOnMDCTabSelectedEvent();
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        var activeTabIndex = this.findActiveTabIndex_();
        if (activeTabIndex >= 0) {
          this.activeTabIndex_ = activeTabIndex;
        }
        this.layout();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.removeClass(cssClasses$2.UPGRADED);
        this.adapter_.unbindOnMDCTabSelectedEvent();
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this2 = this;

        this.forEachTabIndex_(function (index) {
          return _this2.adapter_.measureTabAtIndex(index);
        });
        this.computedWidth_ = this.adapter_.getOffsetWidth();
        this.layoutIndicator_();
      }
    }, {
      key: 'layoutIndicator_',
      value: function layoutIndicator_() {
        var isIndicatorFirstRender = !this.isIndicatorShown_;

        // Ensure that indicator appears in the right position immediately for correct first render.
        if (isIndicatorFirstRender) {
          this.adapter_.setStyleForIndicator('transition', 'none');
        }

        var translateAmtForActiveTabLeft = this.adapter_.getComputedLeftForTabAtIndex(this.activeTabIndex_);
        var scaleAmtForActiveTabWidth = this.adapter_.getComputedWidthForTabAtIndex(this.activeTabIndex_) / this.adapter_.getOffsetWidth();

        var transformValue = 'translateX(' + translateAmtForActiveTabLeft + 'px) scale(' + scaleAmtForActiveTabWidth + ', 1)';
        this.adapter_.setStyleForIndicator(getCorrectPropertyName(window, 'transform'), transformValue);

        if (isIndicatorFirstRender) {
          // Force layout so that transform styles to take effect.
          this.adapter_.getOffsetWidthForIndicator();
          this.adapter_.setStyleForIndicator('transition', '');
          this.adapter_.setStyleForIndicator('visibility', 'visible');
          this.isIndicatorShown_ = true;
        }
      }
    }, {
      key: 'findActiveTabIndex_',
      value: function findActiveTabIndex_() {
        var _this3 = this;

        var activeTabIndex = -1;
        this.forEachTabIndex_(function (index) {
          if (_this3.adapter_.isTabActiveAtIndex(index)) {
            activeTabIndex = index;
            return true;
          }
        });
        return activeTabIndex;
      }
    }, {
      key: 'forEachTabIndex_',
      value: function forEachTabIndex_(iterator) {
        var numTabs = this.adapter_.getNumberOfTabs();
        for (var index = 0; index < numTabs; index++) {
          var shouldBreak = iterator(index);
          if (shouldBreak) {
            break;
          }
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this4 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }

        this.layoutFrame_ = requestAnimationFrame(function () {
          _this4.layoutInternal_();
          _this4.layoutFrame_ = 0;
        });
      }
    }, {
      key: 'switchToTabAtIndex',
      value: function switchToTabAtIndex(index, shouldNotify) {
        var _this5 = this;

        if (index === this.activeTabIndex_) {
          return;
        }

        if (index < 0 || index >= this.adapter_.getNumberOfTabs()) {
          throw new Error('Out of bounds index specified for tab: ' + index);
        }

        var prevActiveTabIndex = this.activeTabIndex_;
        this.activeTabIndex_ = index;
        requestAnimationFrame(function () {
          if (prevActiveTabIndex >= 0) {
            _this5.adapter_.setTabActiveAtIndex(prevActiveTabIndex, false);
          }
          _this5.adapter_.setTabActiveAtIndex(_this5.activeTabIndex_, true);
          _this5.layoutIndicator_();
          if (shouldNotify) {
            _this5.adapter_.notifyChange({ activeTabIndex: _this5.activeTabIndex_ });
          }
        });
      }
    }, {
      key: 'getActiveTabIndex',
      value: function getActiveTabIndex() {
        return this.findActiveTabIndex_();
      }
    }]);
    return MDCTabBarFoundation;
  }(MDCFoundation);

  var mdcTabBar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "mdc-tab-bar", class: _vm.classes }, [_vm._t("default"), _vm._v(" "), _c('span', { ref: "indicator", staticClass: "mdc-tab-bar__indicator", style: _vm.indicatorStyles })], 2);
    }, staticRenderFns: [],
    name: 'mdc-tab-bar',
    props: {
      'indicator-primary': Boolean,
      'indicator-accent': Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-tab-bar--indicator-primary': this.indicatorPrimary,
          'mdc-tab-bar--indicator-accent': this.indicatorAccent
        },
        indicatorStyles: {},
        tabs: []
      };
    },

    methods: {
      onSelect: function onSelect(_ref) {
        var detail = _ref.detail;
        var tab = detail.tab;

        var index = this.tabs.indexOf(tab);
        if (index < 0) {
          throw new Error('mdc-tab-bar internal error: index not found');
        }
        this.foundation.switchToTabAtIndex(index, true);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCTabBarFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {
          _this.$el.addEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {
          return _this.$el.removeEventListener(MDCTabFoundation.strings.SELECTED_EVENT, _this.onSelect);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this.$el.offsetWidth;
        },
        setStyleForIndicator: function setStyleForIndicator(propertyName, value) {
          return _this.$set(_this.indicatorStyles, propertyName, value);
        },
        getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
          return _this.$refs.indicator.offsetWidth;
        },
        notifyChange: function notifyChange(evtData) {
          _this.$emit('change', evtData.activeTabIndex);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this.tabs.length;
        },
        isTabActiveAtIndex: function isTabActiveAtIndex(index) {
          return _this.tabs[index].isActive();
        },
        setTabActiveAtIndex: function setTabActiveAtIndex(index, isActive) {
          _this.tabs[index].setActive(isActive);
        },
        isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex(index) {
          return _this.tabs[index].isDefaultPreventedOnClick();
        },
        setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex(index, preventDefaultOnClick) {
          _this.tabs[index].setPreventDefaultOnClick(preventDefaultOnClick);
        },
        measureTabAtIndex: function measureTabAtIndex(index) {
          return _this.tabs[index].measureSelf();
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this.tabs[index].getComputedWidth();
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this.tabs[index].getComputedLeft();
        }
      });

      var resetTabs = function resetTabs() {
        var tabElements = [].slice.call(_this.$el.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR));
        _this.tabs = tabElements.map(function (el) {
          return el.__vue__;
        });

        var hasText = void 0,
            hasIcon = void 0;
        var tabs = _this.tabs;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tab = _step.value;

            if (tab.hasText) {
              hasText = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = tabs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _tab = _step2.value;

            if (_tab.hasIcon) {
              hasIcon = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (hasText && hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icons-with-text', true);
        } else if (hasIcon) {
          _this.$set(_this.classes, 'mdc-tab-bar--icon-tab-bar', true);
        }

        if (_this.foundation) {
          var activeTabIndex = _this.foundation.getActiveTabIndex();
          if (activeTabIndex >= 0) {
            _this.foundation.switchToTabAtIndex(activeTabIndex, true);
          } else {
            _this.foundation.switchToTabAtIndex(0, true);
          }
          _this.foundation.layout();
        }
      };

      resetTabs();

      this.slotObserver = new MutationObserver(function () {
        return resetTabs();
      });
      this.slotObserver.observe(this.$el, { childList: true, subtree: true });

      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();
      this.foundation.destroy();
    }
  };

  var plugin = BasePlugin({
    mdcTab: mdcTab,
    mdcTabBar: mdcTabBar
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tbGluay5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWljb24uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZXZlbnQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGFicy90YWIvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90YWJzL3RhYi9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy90YWJzL21kYy10YWIudnVlIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9hbmltYXRpb24vaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RhYnMvdGFiLWJhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RhYnMvdGFiLWJhci9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy90YWJzL21kYy10YWItYmFyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdGFicy9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdGFicy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tTGluayA9IHtcbiAgbmFtZTogJ2N1c3RvbS1saW5rJyxcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcbiAgcHJvcHM6IHtcbiAgICB0YWc6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnYScgfSxcbiAgICBsaW5rIDogT2JqZWN0LFxuICB9LFxuICByZW5kZXIgKGgsIGNvbnRleHQpIHtcbiAgICBsZXQgZWxlbWVudCBcbiAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQuZGF0YSlcblxuICAgIGlmIChjb250ZXh0LnByb3BzLmxpbmsgJiYgY29udGV4dC5wYXJlbnQuJHJvdXRlcikge1xuICAgICAgLy8gcm91dGVyLWxpbmsgY2FzZVxuICAgICAgZWxlbWVudCA9IGNvbnRleHQucGFyZW50LiRyb290LiRvcHRpb25zLmNvbXBvbmVudHNbJ3JvdXRlci1saW5rJ10gXG4gICAgICBkYXRhLnByb3BzID0gT2JqZWN0LmFzc2lnbih7dGFnOiBjb250ZXh0LnByb3BzLnRhZ30sIGNvbnRleHQucHJvcHMubGluaylcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XG4gICAgICAgIGRhdGEubmF0aXZlT24gPSB7Y2xpY2s6IGRhdGEub24uY2xpY2sgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbGVtZW50IGZhbGxiYWNrXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wcm9wcy50YWcgXG4gICAgfSBcblxuICAgIHJldHVybiBoKGVsZW1lbnQsIGRhdGEsIGNvbnRleHQuY2hpbGRyZW4pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEN1c3RvbUxpbmtNaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcbiAgICBleGFjdDogQm9vbGVhbixcbiAgICBhcHBlbmQ6IEJvb2xlYW4sXG4gICAgcmVwbGFjZTogQm9vbGVhbixcbiAgICBhY3RpdmVDbGFzczogU3RyaW5nLFxuICAgIGV4YWN0QWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaW5rICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvICYmIHtcbiAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgIGV4YWN0OiB0aGlzLmV4YWN0LFxuICAgICAgICBhcHBlbmQ6IHRoaXMuYXBwZW5kLFxuICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXG4gICAgICAgIGFjdGl2ZUNsYXNzOiB0aGlzLmFjdGl2ZUNsYXNzLFxuICAgICAgICBleGFjdEFjdGl2ZUNsYXNzOiB0aGlzLmV4YWN0QWN0aXZlQ2xhc3MsXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb21wb25lbnRzIDogeyBcbiAgICBDdXN0b21MaW5rIFxuICB9XG59IiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQgKGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBleHRyYWN0SWNvblByb3AgKGljb25Qcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBpY29uUHJvcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsYXNzZXM6IHsgJ21hdGVyaWFsLWljb25zJyA6IHRydWV9LFxuICAgICAgICBjb250ZW50OiBpY29uUHJvcCBcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaWNvblByb3AgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICByZXR1cm4geyBcbiAgICAgICAgY2xhc3NlczogaWNvblByb3AucmVkdWNlKFxuICAgICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCx7W3ZhbHVlXTp0cnVlfSksXG4gICAgICAgICAge30pLFxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpY29uUHJvcCA9PT0gJ29iamVjdCcpe1xuICAgICAgcmV0dXJuIHsgXG4gICAgICAgIGNsYXNzZXM6IGljb25Qcm9wLmNsYXNzTmFtZS5zcGxpdCgnICcpLnJlZHVjZShcbiAgICAgICAgICAocmVzdWx0LCB2YWx1ZSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQse1t2YWx1ZV06dHJ1ZX0pLFxuICAgICAgICAgIHt9KSxcbiAgICAgICAgY29udGVudDogaWNvblByb3AudGV4dENvbnRlbnQgXG4gICAgICB9XG4gICAgfVxuICB9XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xuICBwcm9wczoge1xuICAgICdldmVudCc6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXksXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkaXNwYXRjaEV2ZW50IChldnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZ0LnR5cGUpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEFDVElWRTogJ21kYy10YWItLWFjdGl2ZScsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaW5ncyA9IHtcbiAgU0VMRUNURURfRVZFTlQ6ICdNRENUYWI6c2VsZWN0ZWQnLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ1RhYkZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0T2Zmc2V0V2lkdGg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0T2Zmc2V0TGVmdDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBub3RpZnlTZWxlY3RlZDogKCkgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGFiRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgdGhpcy5jb21wdXRlZFdpZHRoXyA9IDA7XG4gICAgdGhpcy5jb21wdXRlZExlZnRfID0gMDtcbiAgICB0aGlzLmlzQWN0aXZlXyA9IGZhbHNlO1xuICAgIHRoaXMucHJldmVudERlZmF1bHRPbkNsaWNrXyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jbGlja0hhbmRsZXJfID0gKGV2dCkgPT4ge1xuICAgICAgaWYgKHRoaXMucHJldmVudERlZmF1bHRPbkNsaWNrXykge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5U2VsZWN0ZWQoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5rZXlkb3duSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LmtleSAmJiBldnQua2V5ID09PSAnRW50ZXInIHx8IGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVNlbGVjdGVkKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25IYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIGdldENvbXB1dGVkV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRXaWR0aF87XG4gIH1cblxuICBnZXRDb21wdXRlZExlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRMZWZ0XztcbiAgfVxuXG4gIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQWN0aXZlXztcbiAgfVxuXG4gIHNldEFjdGl2ZShpc0FjdGl2ZSkge1xuICAgIHRoaXMuaXNBY3RpdmVfID0gaXNBY3RpdmU7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmVfKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuQUNUSVZFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkFDVElWRSk7XG4gICAgfVxuICB9XG5cbiAgcHJldmVudHNEZWZhdWx0T25DbGljaygpIHtcbiAgICByZXR1cm4gdGhpcy5wcmV2ZW50RGVmYXVsdE9uQ2xpY2tfO1xuICB9XG5cbiAgc2V0UHJldmVudERlZmF1bHRPbkNsaWNrKHByZXZlbnREZWZhdWx0T25DbGljaykge1xuICAgIHRoaXMucHJldmVudERlZmF1bHRPbkNsaWNrXyA9IHByZXZlbnREZWZhdWx0T25DbGljaztcbiAgfVxuXG4gIG1lYXN1cmVTZWxmKCkge1xuICAgIHRoaXMuY29tcHV0ZWRXaWR0aF8gPSB0aGlzLmFkYXB0ZXJfLmdldE9mZnNldFdpZHRoKCk7XG4gICAgdGhpcy5jb21wdXRlZExlZnRfID0gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRMZWZ0KCk7XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7IXt4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4geyF7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICgpID0+IHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpXG4gICAgKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXG4gICAgICAoKSA9PiB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKVxuICAgICk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IXtsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc1N1cHBvcnRlZF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IG51bGwsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIHdyYXBwZWQgaW4gYW4gckFGIGNhbGwgYi9jIHdlYiBicm93c2Vyc1xuICAgICAgLy8gcmVwb3J0IGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW5cbiAgICAgIC8vIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBnZXRNYXRjaGVzUHJvcGVydHksIGFwcGx5UGFzc2l2ZX0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuXG4gIHN0YXRpYyBnZXQgTUFUQ0hFUyAoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgICggUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZSAocmVmKSB7XG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICh2bSwgb3B0aW9ucykge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oe1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgfSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgfSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIGFkZENsYXNzIChjbGFzc05hbWUpIHtcbiAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiB2bS4kZWwuY29udGFpbnModGFyZ2V0KSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIH0sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoe3g6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0fSlcbiAgICAgIH0sXG4gICAgfSwgb3B0aW9ucykpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59ICAiLCI8dGVtcGxhdGU+XHJcbiAgPGN1c3RvbS1saW5rIGNsYXNzPVwibWRjLXRhYlwiIFxyXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIDpzdHlsZT1cInN0eWxlc1wiXHJcbiAgICA6bGluaz1cImxpbmtcIiBcclxuICAgIEBjbGljaz1cImRpc3BhdGNoRXZlbnRcIj5cclxuXHJcbiAgICA8aSByZWY9XCJpY29uXCIgdi1pZj1cIiEhaGFzSWNvblwiXHJcbiAgICAgIHRhYmluZGV4PVwiMFwiIFxyXG4gICAgICBjbGFzcz1cIm1kYy10YWJfX2ljb25cIiAgXHJcbiAgICAgIDpjbGFzcz1cImhhc0ljb24uY2xhc3Nlc1wiPlxyXG4gICAgICA8c2xvdCBuYW1lPVwiaWNvblwiPnt7IGhhc0ljb24uY29udGVudCB9fTwvc2xvdD5cclxuICAgIDwvaT5cclxuXHJcbiAgICA8c3BhbiA6Y2xhc3M9XCJ7J21kYy10YWJfX2ljb24tdGV4dCc6ICEhaGFzSWNvbn1cIiB2LWlmPVwiaGFzVGV4dFwiPlxyXG4gICAgICA8c2xvdD48L3Nsb3Q+ICBcclxuICAgIDwvc3Bhbj5cclxuXHJcbiAgPC9jdXN0b20tbGluaz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENUYWJGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90YWJzL3RhYi9mb3VuZGF0aW9uJ1xyXG5pbXBvcnQge0N1c3RvbUxpbmtNaXhpbiwgRGlzcGF0Y2hFdmVudE1peGluLCBlbWl0Q3VzdG9tRXZlbnQsIGV4dHJhY3RJY29uUHJvcCB9IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7UmlwcGxlQmFzZX0gZnJvbSAnLi4vcmlwcGxlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtdGFiJyxcclxuICBtaXhpbnM6IFtDdXN0b21MaW5rTWl4aW4sIERpc3BhdGNoRXZlbnRNaXhpbl0sXHJcbiAgcHJvcHM6IHtcclxuICAgIGFjdGl2ZTogQm9vbGVhbixcclxuICAgIGljb246IFtTdHJpbmcsIEFycmF5LCBPYmplY3RdLFxyXG4gIH0sXHJcbiAgZGF0YSAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7fSxcclxuICAgICAgc3R5bGVzOiB7fVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGhhc0ljb24gKCkge1xyXG4gICAgICBpZiAodGhpcy5pY29uIHx8IHRoaXMuJHNsb3RzLmljb24pIHtcclxuICAgICAgICB0aGlzLmljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy5pY29uKSA6IHt9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgaGFzVGV4dCAoKSB7XHJcbiAgICAgIHJldHVybiAhIXRoaXMuJHNsb3RzLmRlZmF1bHRcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGdldENvbXB1dGVkV2lkdGggKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uLmdldENvbXB1dGVkV2lkdGgoKVxyXG4gICAgfSxcclxuICAgIGdldENvbXB1dGVkTGVmdCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb24uZ2V0Q29tcHV0ZWRMZWZ0KClcclxuICAgIH0sXHJcbiAgICBpc0FjdGl2ZSAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb24uaXNBY3RpdmUoKVxyXG4gICAgfSxcclxuICAgIHNldEFjdGl2ZSAoaXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldEFjdGl2ZShpc0FjdGl2ZSlcclxuICAgIH0sXHJcbiAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbi5wcmV2ZW50c0RlZmF1bHRPbkNsaWNrKClcclxuICAgIH0sXHJcbiAgICBzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2sgKHByZXZlbnREZWZhdWx0T25DbGljaykge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0UHJldmVudERlZmF1bHRPbkNsaWNrKHByZXZlbnREZWZhdWx0T25DbGljaylcclxuICAgIH0sXHJcbiAgICBtZWFzdXJlU2VsZiAoKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5tZWFzdXJlU2VsZigpXHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkICgpIHtcclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENUYWJGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+XHJcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+XHJcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcclxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxyXG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGdldE9mZnNldFdpZHRoOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLm9mZnNldFdpZHRoXHJcbiAgICAgIH0sXHJcbiAgICAgIGdldE9mZnNldExlZnQ6ICgpID0+XHJcbiAgICAgICAgdGhpcy4kZWwub2Zmc2V0TGVmdCxcclxuICAgICAgbm90aWZ5U2VsZWN0ZWQ6ICgpID0+IHtcclxuICAgICAgICBlbWl0Q3VzdG9tRXZlbnQodGhpcy4kZWwsXHJcbiAgICAgICAgICBNRENUYWJGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsIHt0YWI6IHRoaXN9LCB0cnVlKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxyXG4gICAgdGhpcy5zZXRBY3RpdmUodGhpcy5hY3RpdmUpXHJcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXHJcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xyXG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxyXG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBub1ByZWZpeDogc3RyaW5nLFxuICogICB3ZWJraXRQcmVmaXg6IHN0cmluZyxcbiAqICAgc3R5bGVQcm9wZXJ0eTogc3RyaW5nXG4gKiB9fVxuICovXG5sZXQgVmVuZG9yUHJvcGVydHlNYXBUeXBlO1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGV2ZW50VHlwZU1hcCA9IHtcbiAgJ2FuaW1hdGlvbnN0YXJ0Jzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uc3RhcnQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0JyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbml0ZXJhdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAndHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGNzc1Byb3BlcnR5TWFwID0ge1xuICAnYW5pbWF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LWFuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2Zvcm0nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2Zvcm0nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB7XG4gIHJldHVybiAod2luZG93T2JqWydkb2N1bWVudCddICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddID09PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkge1xuICByZXR1cm4gKGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgfHwgZXZlbnRUeXBlIGluIGNzc1Byb3BlcnR5TWFwKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gbWFwXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCkge1xuICByZXR1cm4gbWFwW2V2ZW50VHlwZV0uc3R5bGVQcm9wZXJ0eSBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgYnJvd3NlciBwcmVmaXggZm9yIENTUzMgYW5pbWF0aW9uIGV2ZW50c1xuICogYW5kIHByb3BlcnR5IG5hbWVzLlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICBpZiAoIWhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikgfHwgIWV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSkge1xuICAgIHJldHVybiBldmVudFR5cGU7XG4gIH1cblxuICBjb25zdCBtYXAgPSAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi8gKFxuICAgIGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgPyBldmVudFR5cGVNYXAgOiBjc3NQcm9wZXJ0eU1hcFxuICApO1xuICBjb25zdCBlbCA9IHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddKCdkaXYnKTtcbiAgbGV0IGV2ZW50TmFtZSA9ICcnO1xuXG4gIGlmIChtYXAgPT09IGV2ZW50VHlwZU1hcCkge1xuICAgIGV2ZW50TmFtZSA9IGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudE5hbWUgPSBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZTtcbn1cblxuLy8gUHVibGljIGZ1bmN0aW9ucyB0byBhY2Nlc3MgZ2V0QW5pbWF0aW9uTmFtZSgpIGZvciBKYXZhU2NyaXB0IGV2ZW50cyBvciBDU1Ncbi8vIHByb3BlcnR5IG5hbWVzLlxuXG5jb25zdCB0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMgPSBbJ3RyYW5zZm9ybScsICdXZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTVNUcmFuc2Zvcm0nXTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0UHJvcGVydHlOYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuZXhwb3J0IHt0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMsIGdldENvcnJlY3RFdmVudE5hbWUsIGdldENvcnJlY3RQcm9wZXJ0eU5hbWV9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFVQR1JBREVEOiAnbWRjLXRhYi1iYXItdXBncmFkZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIFRBQl9TRUxFQ1RPUjogJy5tZGMtdGFiJyxcbiAgSU5ESUNBVE9SX1NFTEVDVE9SOiAnLm1kYy10YWItYmFyX19pbmRpY2F0b3InLFxuICBDSEFOR0VfRVZFTlQ6ICdNRENUYWJCYXI6Y2hhbmdlJyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7Z2V0Q29ycmVjdFByb3BlcnR5TmFtZX0gZnJvbSAnQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleCc7XG5cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENUYWJCYXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBiaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50OiAoKSA9PiB7fSxcbiAgICAgIHVuYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudDogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBnZXRPZmZzZXRXaWR0aDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBzZXRTdHlsZUZvckluZGljYXRvcjogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldE9mZnNldFdpZHRoRm9ySW5kaWNhdG9yOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIG5vdGlmeUNoYW5nZTogKC8qIGV2dERhdGE6IHthY3RpdmVUYWJJbmRleDogbnVtYmVyfSAqLykgPT4ge30sXG4gICAgICBnZXROdW1iZXJPZlRhYnM6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgaXNUYWJBY3RpdmVBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIHNldFRhYkFjdGl2ZUF0SW5kZXg6ICgvKiBpbmRleDogbnVtYmVyLCBpc0FjdGl2ZTogdHJ1ZSAqLykgPT4ge30sXG4gICAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrRm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIGJvb2xlYW4gKi8gZmFsc2UsXG4gICAgICBzZXRQcmV2ZW50RGVmYXVsdE9uQ2xpY2tGb3JUYWJBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciwgcHJldmVudERlZmF1bHRPbkNsaWNrOiBib29sZWFuICovKSA9PiB7fSxcbiAgICAgIG1lYXN1cmVUYWJBdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBnZXRDb21wdXRlZFdpZHRoRm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0Q29tcHV0ZWRMZWZ0Rm9yVGFiQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIgKi8pID0+IC8qIG51bWJlciAqLyAwLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUYWJCYXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICB0aGlzLmlzSW5kaWNhdG9yU2hvd25fID0gZmFsc2U7XG4gICAgdGhpcy5jb21wdXRlZFdpZHRoXyA9IDA7XG4gICAgdGhpcy5jb21wdXRlZExlZnRfID0gMDtcbiAgICB0aGlzLmFjdGl2ZVRhYkluZGV4XyA9IDA7XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuVVBHUkFERUQpO1xuICAgIHRoaXMuYWRhcHRlcl8uYmluZE9uTURDVGFiU2VsZWN0ZWRFdmVudCgpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIGNvbnN0IGFjdGl2ZVRhYkluZGV4ID0gdGhpcy5maW5kQWN0aXZlVGFiSW5kZXhfKCk7XG4gICAgaWYgKGFjdGl2ZVRhYkluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiSW5kZXhfID0gYWN0aXZlVGFiSW5kZXg7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0KCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgdGhpcy5hZGFwdGVyXy51bmJpbmRPbk1EQ1RhYlNlbGVjdGVkRXZlbnQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZm9yRWFjaFRhYkluZGV4XygoaW5kZXgpID0+IHRoaXMuYWRhcHRlcl8ubWVhc3VyZVRhYkF0SW5kZXgoaW5kZXgpKTtcbiAgICB0aGlzLmNvbXB1dGVkV2lkdGhfID0gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aCgpO1xuICAgIHRoaXMubGF5b3V0SW5kaWNhdG9yXygpO1xuICB9XG5cbiAgbGF5b3V0SW5kaWNhdG9yXygpIHtcbiAgICBjb25zdCBpc0luZGljYXRvckZpcnN0UmVuZGVyID0gIXRoaXMuaXNJbmRpY2F0b3JTaG93bl87XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBpbmRpY2F0b3IgYXBwZWFycyBpbiB0aGUgcmlnaHQgcG9zaXRpb24gaW1tZWRpYXRlbHkgZm9yIGNvcnJlY3QgZmlyc3QgcmVuZGVyLlxuICAgIGlmIChpc0luZGljYXRvckZpcnN0UmVuZGVyKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9ySW5kaWNhdG9yKCd0cmFuc2l0aW9uJywgJ25vbmUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2xhdGVBbXRGb3JBY3RpdmVUYWJMZWZ0ID0gdGhpcy5hZGFwdGVyXy5nZXRDb21wdXRlZExlZnRGb3JUYWJBdEluZGV4KHRoaXMuYWN0aXZlVGFiSW5kZXhfKTtcbiAgICBjb25zdCBzY2FsZUFtdEZvckFjdGl2ZVRhYldpZHRoID1cbiAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRXaWR0aEZvclRhYkF0SW5kZXgodGhpcy5hY3RpdmVUYWJJbmRleF8pIC8gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aCgpO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtVmFsdWUgPSBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZUFtdEZvckFjdGl2ZVRhYkxlZnR9cHgpIHNjYWxlKCR7c2NhbGVBbXRGb3JBY3RpdmVUYWJXaWR0aH0sIDEpYDtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9ySW5kaWNhdG9yKGdldENvcnJlY3RQcm9wZXJ0eU5hbWUod2luZG93LCAndHJhbnNmb3JtJyksIHRyYW5zZm9ybVZhbHVlKTtcblxuICAgIGlmIChpc0luZGljYXRvckZpcnN0UmVuZGVyKSB7XG4gICAgICAvLyBGb3JjZSBsYXlvdXQgc28gdGhhdCB0cmFuc2Zvcm0gc3R5bGVzIHRvIHRha2UgZWZmZWN0LlxuICAgICAgdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRXaWR0aEZvckluZGljYXRvcigpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvckluZGljYXRvcigndHJhbnNpdGlvbicsICcnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGVGb3JJbmRpY2F0b3IoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgICAgdGhpcy5pc0luZGljYXRvclNob3duXyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZmluZEFjdGl2ZVRhYkluZGV4XygpIHtcbiAgICBsZXQgYWN0aXZlVGFiSW5kZXggPSAtMTtcbiAgICB0aGlzLmZvckVhY2hUYWJJbmRleF8oKGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1RhYkFjdGl2ZUF0SW5kZXgoaW5kZXgpKSB7XG4gICAgICAgIGFjdGl2ZVRhYkluZGV4ID0gaW5kZXg7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhY3RpdmVUYWJJbmRleDtcbiAgfVxuXG4gIGZvckVhY2hUYWJJbmRleF8oaXRlcmF0b3IpIHtcbiAgICBjb25zdCBudW1UYWJzID0gdGhpcy5hZGFwdGVyXy5nZXROdW1iZXJPZlRhYnMoKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbnVtVGFiczsgaW5kZXgrKykge1xuICAgICAgY29uc3Qgc2hvdWxkQnJlYWsgPSBpdGVyYXRvcihpbmRleCk7XG4gICAgICBpZiAoc2hvdWxkQnJlYWspIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cblxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICBzd2l0Y2hUb1RhYkF0SW5kZXgoaW5kZXgsIHNob3VsZE5vdGlmeSkge1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5hY3RpdmVUYWJJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZUYWJzKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT3V0IG9mIGJvdW5kcyBpbmRleCBzcGVjaWZpZWQgZm9yIHRhYjogJHtpbmRleH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2QWN0aXZlVGFiSW5kZXggPSB0aGlzLmFjdGl2ZVRhYkluZGV4XztcbiAgICB0aGlzLmFjdGl2ZVRhYkluZGV4XyA9IGluZGV4O1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAocHJldkFjdGl2ZVRhYkluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJBY3RpdmVBdEluZGV4KHByZXZBY3RpdmVUYWJJbmRleCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJBY3RpdmVBdEluZGV4KHRoaXMuYWN0aXZlVGFiSW5kZXhfLCB0cnVlKTtcbiAgICAgIHRoaXMubGF5b3V0SW5kaWNhdG9yXygpO1xuICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSh7YWN0aXZlVGFiSW5kZXg6IHRoaXMuYWN0aXZlVGFiSW5kZXhffSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRBY3RpdmVUYWJJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWN0aXZlVGFiSW5kZXhfKCk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPG5hdiBjbGFzcz1cIm1kYy10YWItYmFyXCIgOmNsYXNzPVwiY2xhc3Nlc1wiPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgICA8c3BhbiByZWY9XCJpbmRpY2F0b3JcIiBjbGFzcz1cIm1kYy10YWItYmFyX19pbmRpY2F0b3JcIiBcbiAgICAgIDpzdHlsZT1cImluZGljYXRvclN0eWxlc1wiPjwvc3Bhbj5cbiAgPC9uYXY+ICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDVGFiQmFyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGFicy90YWItYmFyL2ZvdW5kYXRpb24nXG5pbXBvcnQgTURDVGFiRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGFicy90YWIvZm91bmRhdGlvbidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXRhYi1iYXInLFxuICBwcm9wczoge1xuICAgICdpbmRpY2F0b3ItcHJpbWFyeSc6IEJvb2xlYW4sXG4gICAgJ2luZGljYXRvci1hY2NlbnQnOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgICdtZGMtdGFiLWJhci0taW5kaWNhdG9yLXByaW1hcnknOiB0aGlzLmluZGljYXRvclByaW1hcnksXG4gICAgICAgICdtZGMtdGFiLWJhci0taW5kaWNhdG9yLWFjY2VudCc6IHRoaXMuaW5kaWNhdG9yQWNjZW50XG4gICAgICB9LFxuICAgICAgaW5kaWNhdG9yU3R5bGVzOiB7fSxcbiAgICAgIHRhYnM6IFtdXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25TZWxlY3QgKHtkZXRhaWx9KSB7XG4gICAgICBjb25zdCB7dGFifSA9IGRldGFpbFxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRhYnMuaW5kZXhPZih0YWIpXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWRjLXRhYi1iYXIgaW50ZXJuYWwgZXJyb3I6IGluZGV4IG5vdCBmb3VuZCcpXG4gICAgICB9XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc3dpdGNoVG9UYWJBdEluZGV4KGluZGV4LCB0cnVlKVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ1RhYkJhckZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT5cbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcbiAgICAgIGJpbmRPbk1EQ1RhYlNlbGVjdGVkRXZlbnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBNRENUYWJGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsIHRoaXMub25TZWxlY3QpXG4gICAgICB9LFxuICAgICAgdW5iaW5kT25NRENUYWJTZWxlY3RlZEV2ZW50OiAoKSA9PlxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIE1EQ1RhYkZvdW5kYXRpb24uc3RyaW5ncy5TRUxFQ1RFRF9FVkVOVCwgdGhpcy5vblNlbGVjdCksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PlxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGdldE9mZnNldFdpZHRoOiAoKSA9PlxuICAgICAgICB0aGlzLiRlbC5vZmZzZXRXaWR0aCxcbiAgICAgIHNldFN0eWxlRm9ySW5kaWNhdG9yOiAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT5cbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuaW5kaWNhdG9yU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKSxcbiAgICAgIGdldE9mZnNldFdpZHRoRm9ySW5kaWNhdG9yOiAoKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLmluZGljYXRvci5vZmZzZXRXaWR0aCxcbiAgICAgIG5vdGlmeUNoYW5nZTogKGV2dERhdGEpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZXZ0RGF0YS5hY3RpdmVUYWJJbmRleClcbiAgICAgIH0sXG4gICAgICBnZXROdW1iZXJPZlRhYnM6ICgpID0+XG4gICAgICAgIHRoaXMudGFicy5sZW5ndGgsXG4gICAgICBpc1RhYkFjdGl2ZUF0SW5kZXg6IChpbmRleCkgPT5cbiAgICAgICAgdGhpcy50YWJzW2luZGV4XS5pc0FjdGl2ZSgpLFxuICAgICAgc2V0VGFiQWN0aXZlQXRJbmRleDogKGluZGV4LCBpc0FjdGl2ZSkgPT4ge1xuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLnNldEFjdGl2ZShpc0FjdGl2ZSlcbiAgICAgIH0sXG4gICAgICBpc0RlZmF1bHRQcmV2ZW50ZWRPbkNsaWNrRm9yVGFiQXRJbmRleDogKGluZGV4KSA9PlxuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLmlzRGVmYXVsdFByZXZlbnRlZE9uQ2xpY2soKSxcbiAgICAgIHNldFByZXZlbnREZWZhdWx0T25DbGlja0ZvclRhYkF0SW5kZXg6IChpbmRleCwgcHJldmVudERlZmF1bHRPbkNsaWNrKSA9PiB7XG4gICAgICAgIHRoaXMudGFic1tpbmRleF0uc2V0UHJldmVudERlZmF1bHRPbkNsaWNrKHByZXZlbnREZWZhdWx0T25DbGljaylcbiAgICAgIH0sXG4gICAgICBtZWFzdXJlVGFiQXRJbmRleDogKGluZGV4KSA9PlxuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLm1lYXN1cmVTZWxmKCksXG4gICAgICBnZXRDb21wdXRlZFdpZHRoRm9yVGFiQXRJbmRleDogKGluZGV4KSA9PlxuICAgICAgICB0aGlzLnRhYnNbaW5kZXhdLmdldENvbXB1dGVkV2lkdGgoKSxcbiAgICAgIGdldENvbXB1dGVkTGVmdEZvclRhYkF0SW5kZXg6IChpbmRleCkgPT5cbiAgICAgICAgdGhpcy50YWJzW2luZGV4XS5nZXRDb21wdXRlZExlZnQoKVxuICAgIH0pXG5cbiAgICBjb25zdCByZXNldFRhYnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0YWJFbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoXG4gICAgICAgIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoTURDVGFiQmFyRm91bmRhdGlvbi5zdHJpbmdzLlRBQl9TRUxFQ1RPUikpXG4gICAgICB0aGlzLnRhYnMgPSB0YWJFbGVtZW50cy5tYXAoKGVsKSA9PiBlbC5fX3Z1ZV9fKVxuXG4gICAgICBsZXQgaGFzVGV4dCwgaGFzSWNvblxuICAgICAgY29uc3QgdGFicyA9IHRoaXMudGFic1xuICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcbiAgICAgICAgaWYgKHRhYi5oYXNUZXh0KSB7XG4gICAgICAgICAgaGFzVGV4dCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCB0YWIgb2YgdGFicykge1xuICAgICAgICBpZiAodGFiLmhhc0ljb24pIHtcbiAgICAgICAgICBoYXNJY29uID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc1RleHQgJiYgaGFzSWNvbikge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLXRhYi1iYXItLWljb25zLXdpdGgtdGV4dCcsIHRydWUpXG4gICAgICB9IGVsc2UgaWYgKGhhc0ljb24pIHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgJ21kYy10YWItYmFyLS1pY29uLXRhYi1iYXInLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhYkluZGV4ID0gdGhpcy5mb3VuZGF0aW9uLmdldEFjdGl2ZVRhYkluZGV4KClcbiAgICAgICAgaWYgKGFjdGl2ZVRhYkluZGV4ID49IDApIHtcbiAgICAgICAgICB0aGlzLmZvdW5kYXRpb24uc3dpdGNoVG9UYWJBdEluZGV4KGFjdGl2ZVRhYkluZGV4LCB0cnVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZm91bmRhdGlvbi5zd2l0Y2hUb1RhYkF0SW5kZXgoMCwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvdW5kYXRpb24ubGF5b3V0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldFRhYnMoKVxuXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiByZXNldFRhYnMoKSlcbiAgICB0aGlzLnNsb3RPYnNlcnZlci5vYnNlcnZlKHRoaXMuJGVsLCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KVxuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLnNsb3RPYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1RhYiBmcm9tICcuL21kYy10YWIudnVlJ1xuaW1wb3J0IG1kY1RhYkJhciBmcm9tICcuL21kYy10YWItYmFyLnZ1ZSdcblxuZXhwb3J0IHsgXG4gIG1kY1RhYiwgXG4gIG1kY1RhYkJhciBcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY1RhYiwgXG4gIG1kY1RhYkJhciBcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiQ3VzdG9tTGluayIsImZ1bmN0aW9uYWwiLCJwcm9wcyIsInRhZyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwibGluayIsIk9iamVjdCIsInJlbmRlciIsImgiLCJjb250ZXh0IiwiZWxlbWVudCIsImRhdGEiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsInBhcmVudCIsIiRyb3V0ZXIiLCIkcm9vdCIsIiRvcHRpb25zIiwib24iLCJjbGljayIsIm5hdGl2ZU9uIiwiY2hpbGRyZW4iLCJDdXN0b21MaW5rTWl4aW4iLCJ0byIsImV4YWN0IiwiQm9vbGVhbiIsImFwcGVuZCIsInJlcGxhY2UiLCJhY3RpdmVDbGFzcyIsImV4YWN0QWN0aXZlQ2xhc3MiLCJjb21wdXRlZCIsImVtaXRDdXN0b21FdmVudCIsImVsIiwiZXZ0VHlwZSIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImV4dHJhY3RJY29uUHJvcCIsImljb25Qcm9wIiwiY2xhc3NlcyIsImNvbnRlbnQiLCJBcnJheSIsInJlZHVjZSIsInJlc3VsdCIsInZhbHVlIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJ0ZXh0Q29udGVudCIsIkRpc3BhdGNoRXZlbnRNaXhpbiIsIm1ldGhvZHMiLCIkZW1pdCIsImV2ZW50IiwidGFyZ2V0IiwiZXZlbnRUYXJnZXQiLCJhcmdzIiwiZXZlbnRBcmdzIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsImNzc0NsYXNzZXMiLCJBQ1RJVkUiLCJzdHJpbmdzIiwiU0VMRUNURURfRVZFTlQiLCJNRENUYWJGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImdldE9mZnNldFdpZHRoIiwiZ2V0T2Zmc2V0TGVmdCIsIm5vdGlmeVNlbGVjdGVkIiwiZGVmYXVsdEFkYXB0ZXIiLCJjb21wdXRlZFdpZHRoXyIsImNvbXB1dGVkTGVmdF8iLCJpc0FjdGl2ZV8iLCJwcmV2ZW50RGVmYXVsdE9uQ2xpY2tfIiwiY2xpY2tIYW5kbGVyXyIsInByZXZlbnREZWZhdWx0Iiwia2V5ZG93bkhhbmRsZXJfIiwia2V5Q29kZSIsImlzQWN0aXZlIiwicHJldmVudERlZmF1bHRPbkNsaWNrIiwiTURDUmlwcGxlQWRhcHRlciIsImhhbmRsZXIiLCJ2YXJOYW1lIiwiUk9PVCIsIlVOQk9VTkRFRCIsIkJHX0ZPQ1VTRUQiLCJGR19BQ1RJVkFUSU9OIiwiRkdfREVBQ1RJVkFUSU9OIiwiVkFSX0xFRlQiLCJWQVJfVE9QIiwiVkFSX0ZHX1NJWkUiLCJWQVJfRkdfU0NBTEUiLCJWQVJfRkdfVFJBTlNMQVRFX1NUQVJUIiwiVkFSX0ZHX1RSQU5TTEFURV9FTkQiLCJudW1iZXJzIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJzdXBwb3J0c1Bhc3NpdmVfIiwiZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1ZyIsIndpbmRvd09iaiIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJoYXNQc2V1ZG9WYXJCdWciLCJib3JkZXJUb3BTdHlsZSIsInJlbW92ZSIsInN1cHBvcnRzQ3NzVmFyaWFibGVzIiwiZm9yY2VSZWZyZXNoIiwic3VwcG9ydHNGdW5jdGlvblByZXNlbnQiLCJDU1MiLCJzdXBwb3J0cyIsImV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMiLCJ3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMiLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXNzaXZlIiwiZSIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsIlBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiYWN0aXZhdGVkVGFyZ2V0cyIsIk1EQ1JpcHBsZUZvdW5kYXRpb24iLCJicm93c2VyU3VwcG9ydHNDc3NWYXJzIiwiaXNVbmJvdW5kZWQiLCJpc1N1cmZhY2VBY3RpdmUiLCJpc1N1cmZhY2VEaXNhYmxlZCIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwibGF5b3V0RnJhbWVfIiwiZnJhbWVfIiwid2lkdGgiLCJoZWlnaHQiLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJsdXJIYW5kbGVyXyIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImxheW91dEludGVybmFsXyIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiZm9yRWFjaCIsImtleXMiLCJrIiwiaW5kZXhPZiIsImFjdGl2YXRpb25TdGF0ZSIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50IiwiaXNTYW1lSW50ZXJhY3Rpb24iLCJoYXNBY3RpdmF0ZWRDaGlsZCIsImxlbmd0aCIsInNvbWUiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJjbGVhclRpbWVvdXQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJzZXRUaW1lb3V0IiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwiTWF0aCIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJGVsIiwiZGlzYWJsZWQiLCIkc2V0IiwiJGRlbGV0ZSIsImNvbnRhaW5zIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJtaXhpbnMiLCJhY3RpdmUiLCJpY29uIiwiaGFzSWNvbiIsIiRzbG90cyIsImhhc1RleHQiLCJnZXRDb21wdXRlZFdpZHRoIiwiZm91bmRhdGlvbiIsImdldENvbXB1dGVkTGVmdCIsInNldEFjdGl2ZSIsImlzRGVmYXVsdFByZXZlbnRlZE9uQ2xpY2siLCJwcmV2ZW50c0RlZmF1bHRPbkNsaWNrIiwic2V0UHJldmVudERlZmF1bHRPbkNsaWNrIiwibWVhc3VyZVNlbGYiLCJtb3VudGVkIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRMZWZ0IiwidGFiIiwiaW5pdCIsInJpcHBsZSIsImJlZm9yZURlc3Ryb3kiLCJkZXN0cm95IiwiZXZlbnRUeXBlTWFwIiwibm9QcmVmaXgiLCJ3ZWJraXRQcmVmaXgiLCJzdHlsZVByb3BlcnR5IiwiY3NzUHJvcGVydHlNYXAiLCJoYXNQcm9wZXJTaGFwZSIsImV2ZW50Rm91bmRJbk1hcHMiLCJldmVudFR5cGUiLCJnZXRKYXZhU2NyaXB0RXZlbnROYW1lIiwibWFwIiwic3R5bGUiLCJnZXRBbmltYXRpb25OYW1lIiwiZXZlbnROYW1lIiwiZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSIsIlVQR1JBREVEIiwiVEFCX1NFTEVDVE9SIiwiSU5ESUNBVE9SX1NFTEVDVE9SIiwiQ0hBTkdFX0VWRU5UIiwiTURDVGFiQmFyRm91bmRhdGlvbiIsImJpbmRPbk1EQ1RhYlNlbGVjdGVkRXZlbnQiLCJ1bmJpbmRPbk1EQ1RhYlNlbGVjdGVkRXZlbnQiLCJzZXRTdHlsZUZvckluZGljYXRvciIsImdldE9mZnNldFdpZHRoRm9ySW5kaWNhdG9yIiwibm90aWZ5Q2hhbmdlIiwiZ2V0TnVtYmVyT2ZUYWJzIiwiaXNUYWJBY3RpdmVBdEluZGV4Iiwic2V0VGFiQWN0aXZlQXRJbmRleCIsImlzRGVmYXVsdFByZXZlbnRlZE9uQ2xpY2tGb3JUYWJBdEluZGV4Iiwic2V0UHJldmVudERlZmF1bHRPbkNsaWNrRm9yVGFiQXRJbmRleCIsIm1lYXN1cmVUYWJBdEluZGV4IiwiZ2V0Q29tcHV0ZWRXaWR0aEZvclRhYkF0SW5kZXgiLCJnZXRDb21wdXRlZExlZnRGb3JUYWJBdEluZGV4IiwiaXNJbmRpY2F0b3JTaG93bl8iLCJhY3RpdmVUYWJJbmRleF8iLCJhY3RpdmVUYWJJbmRleCIsImZpbmRBY3RpdmVUYWJJbmRleF8iLCJmb3JFYWNoVGFiSW5kZXhfIiwiaW5kZXgiLCJsYXlvdXRJbmRpY2F0b3JfIiwiaXNJbmRpY2F0b3JGaXJzdFJlbmRlciIsInRyYW5zbGF0ZUFtdEZvckFjdGl2ZVRhYkxlZnQiLCJzY2FsZUFtdEZvckFjdGl2ZVRhYldpZHRoIiwidHJhbnNmb3JtVmFsdWUiLCJpdGVyYXRvciIsIm51bVRhYnMiLCJzaG91bGRCcmVhayIsInNob3VsZE5vdGlmeSIsIkVycm9yIiwicHJldkFjdGl2ZVRhYkluZGV4IiwiaW5kaWNhdG9yUHJpbWFyeSIsImluZGljYXRvckFjY2VudCIsImluZGljYXRvclN0eWxlcyIsInRhYnMiLCJvblNlbGVjdCIsInN3aXRjaFRvVGFiQXRJbmRleCIsInByb3BlcnR5TmFtZSIsIiRyZWZzIiwiaW5kaWNhdG9yIiwicmVzZXRUYWJzIiwidGFiRWxlbWVudHMiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX192dWVfXyIsImdldEFjdGl2ZVRhYkluZGV4Iiwic2xvdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZGlzY29ubmVjdCIsIm1kY1RhYiIsIm1kY1RhYkJhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0VBQ2hDO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJRixJQUFKLEVBQVU7RUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0VBQ0Q7RUFDRjs7RUNaTSxTQUFTTSxVQUFULENBQXFCQyxVQUFyQixFQUFpQztFQUN0QyxTQUFPO0VBQ0xDLGFBQVMsUUFESjtFQUVMQyxhQUFTLGlCQUFDQyxFQUFELEVBQVE7RUFDZixXQUFLLElBQUlDLEdBQVQsSUFBZ0JKLFVBQWhCLEVBQTRCO0VBQzFCLFlBQUlLLFlBQVlMLFdBQVdJLEdBQVgsQ0FBaEI7RUFDRUQsV0FBR0UsU0FBSCxDQUFhQSxVQUFVQyxJQUF2QixFQUE0QkQsU0FBNUI7RUFDSDtFQUNGLEtBUEk7RUFRTEw7RUFSSyxHQUFQO0VBVUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
