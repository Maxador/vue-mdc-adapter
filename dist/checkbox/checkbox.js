/**
* @module vue-mdc-adaptercheckbox 0.13.2
* @exports VueMDCCheckbox
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCCheckbox = factory());
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

  var DispatchFocusMixin = {
    data: function data() {
      return { hasFocus: false };
    },

    methods: {
      onMouseDown: function onMouseDown() {
        this._active = true;
      },
      onMouseUp: function onMouseUp() {
        this._active = false;
      },
      onFocusEvent: function onFocusEvent() {
        var _this = this;

        // dispatch async to let time to other focus event to propagate
        setTimeout(function () {
          return _this.dispatchFocusEvent();
        }, 0);
      },
      onBlurEvent: function onBlurEvent() {
        var _this2 = this;

        // dispatch async to let time to other focus event to propagate
        // also filtur blur if mousedown
        this._active || setTimeout(function () {
          return _this2.dispatchFocusEvent();
        }, 0);
      },
      dispatchFocusEvent: function dispatchFocusEvent() {
        var hasFocus = this.$el === document.activeElement || this.$el.contains(document.activeElement);
        if (hasFocus != this.hasFocus) {
          this.$emit(hasFocus ? 'focus' : 'blur');
          this.hasFocus = hasFocus;
        }
      }
    },
    mounted: function mounted() {
      this.$el.addEventListener('focusin', this.onFocusEvent);
      this.$el.addEventListener('focusout', this.onBlurEvent);
      this.$el.addEventListener('mousedown', this.onMouseDown);
      this.$el.addEventListener('mouseup', this.onMouseUp);
    },
    beforeDestroy: function beforeDestroy() {
      this.$el.removeEventListener('focusin', this.onFocusEvent);
      this.$el.removeEventListener('focusout', this.onBlurEvent);
      this.$el.removeEventListener('mousedown', this.onMouseDown);
      this.$el.removeEventListener('mouseup', this.onMouseUp);
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

  var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings = {
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
        return cssClasses;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
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

        var strings$$1 = MDCRippleFoundation.strings;

        Object.keys(strings$$1).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings$$1[k], null);
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
   * @extends MDCComponent<!MDCRippleFoundation>
   */

  var MDCRipple = function (_MDCComponent) {
    inherits(MDCRipple, _MDCComponent);

    /** @param {...?} args */
    function MDCRipple() {
      var _ref;

      classCallCheck(this, MDCRipple);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /** @type {boolean} */
      var _this = possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

      _this.disabled = false;

      /** @private {boolean} */
      _this.unbounded_;
      return _this;
    }

    /**
     * @param {!Element} root
     * @param {{isUnbounded: (boolean|undefined)}=} options
     * @return {!MDCRipple}
     */


    createClass(MDCRipple, [{
      key: 'setUnbounded_',


      /**
       * Closure Compiler throws an access control error when directly accessing a
       * protected or private property inside a getter/setter, like unbounded above.
       * By accessing the protected property inside a method, we solve that problem.
       * That's why this function exists.
       * @private
       */
      value: function setUnbounded_() {
        this.foundation_.setUnbounded(this.unbounded_);
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.foundation_.activate();
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.foundation_.deactivate();
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.foundation_.layout();
      }

      /** @return {!MDCRippleFoundation} */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        return new MDCRippleFoundation(MDCRipple.createAdapter(this));
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
      }
    }, {
      key: 'unbounded',


      /** @return {boolean} */
      get: function get$$1() {
        return this.unbounded_;
      }

      /** @param {boolean} unbounded */
      ,
      set: function set$$1(unbounded) {
        this.unbounded_ = Boolean(unbounded);
        this.setUnbounded_();
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$isUnbounded = _ref2.isUnbounded,
            isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (isUnbounded !== undefined) {
          ripple.unbounded = /** @type {boolean} */isUnbounded;
        }
        return ripple;
      }

      /**
       * @param {!RippleCapableSurface} instance
       * @return {!MDCRippleAdapter}
       */

    }, {
      key: 'createAdapter',
      value: function createAdapter(instance) {
        var MATCHES = getMatchesProperty(HTMLElement.prototype);

        return {
          browserSupportsCssVars: function browserSupportsCssVars() {
            return supportsCssVariables(window);
          },
          isUnbounded: function isUnbounded() {
            return instance.unbounded;
          },
          isSurfaceActive: function isSurfaceActive() {
            return instance.root_[MATCHES](':active');
          },
          isSurfaceDisabled: function isSurfaceDisabled() {
            return instance.disabled;
          },
          addClass: function addClass(className) {
            return instance.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return instance.root_.classList.remove(className);
          },
          containsEventTarget: function containsEventTarget(target) {
            return instance.root_.contains(target);
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            return instance.root_.addEventListener(evtType, handler, applyPassive());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            return instance.root_.removeEventListener(evtType, handler, applyPassive());
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
            return instance.root_.style.setProperty(varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return instance.root_.getBoundingClientRect();
          },
          getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          }
        };
      }
    }]);
    return MDCRipple;
  }(MDCComponent);

  /**
   * @license
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

  /**
   * @record
   */

  var MDCSelectionControl = function () {
    function MDCSelectionControl() {
      classCallCheck(this, MDCSelectionControl);
    }

    createClass(MDCSelectionControl, [{
      key: 'ripple',

      /** @return {?MDCRipple} */
      get: function get$$1() {}
    }]);
    return MDCSelectionControl;
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

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Checkbox. Provides an interface for managing
   * - classes
   * - dom
   * - event handlers
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

  var MDCCheckboxAdapter = function () {
    function MDCCheckboxAdapter() {
      classCallCheck(this, MDCCheckboxAdapter);
    }

    createClass(MDCCheckboxAdapter, [{
      key: 'addClass',

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

    }, {
      key: 'removeClass',
      value: function removeClass(className) {}

      /**
       * Sets an attribute with a given value on the input element.
       * @param {string} attr
       * @param {string} value
       */

    }, {
      key: 'setNativeControlAttr',
      value: function setNativeControlAttr(attr, value) {}

      /**
       * Removes an attribute from the input element.
       * @param {string} attr
       */

    }, {
      key: 'removeNativeControlAttr',
      value: function removeNativeControlAttr(attr) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'registerAnimationEndHandler',
      value: function registerAnimationEndHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'deregisterAnimationEndHandler',
      value: function deregisterAnimationEndHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'registerChangeHandler',
      value: function registerChangeHandler(handler) {}

      /** @param {!EventListener} handler */

    }, {
      key: 'deregisterChangeHandler',
      value: function deregisterChangeHandler(handler) {}

      /** @return {!MDCSelectionControlState} */

    }, {
      key: 'getNativeControl',
      value: function getNativeControl() {}
    }, {
      key: 'forceLayout',
      value: function forceLayout() {}

      /** @return {boolean} */

    }, {
      key: 'isAttachedToDOM',
      value: function isAttachedToDOM() {}
    }]);
    return MDCCheckboxAdapter;
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

  /** @const {string} */
  var ROOT = 'mdc-checkbox';

  /** @enum {string} */
  var cssClasses$1 = {
    UPGRADED: 'mdc-checkbox--upgraded',
    CHECKED: 'mdc-checkbox--checked',
    INDETERMINATE: 'mdc-checkbox--indeterminate',
    DISABLED: 'mdc-checkbox--disabled',
    ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
    ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
    ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
    ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
    ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
    ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked'
  };

  /** @enum {string} */
  var strings$1 = {
    NATIVE_CONTROL_SELECTOR: '.' + ROOT + '__native-control',
    TRANSITION_STATE_INIT: 'init',
    TRANSITION_STATE_CHECKED: 'checked',
    TRANSITION_STATE_UNCHECKED: 'unchecked',
    TRANSITION_STATE_INDETERMINATE: 'indeterminate',
    ARIA_CHECKED_ATTR: 'aria-checked',
    ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed'
  };

  /** @enum {number} */
  var numbers$1 = {
    ANIM_END_LATCH_MS: 250
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

  /** @const {!Array<string>} */
  var CB_PROTO_PROPS = ['checked', 'indeterminate'];

  /**
   * @extends {MDCFoundation<!MDCCheckboxAdapter>}
   */

  var MDCCheckboxFoundation = function (_MDCFoundation) {
    inherits(MDCCheckboxFoundation, _MDCFoundation);
    createClass(MDCCheckboxFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$1;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$1;
      }

      /** @return enum {numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers$1;
      }

      /** @return {!MDCCheckboxAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCCheckboxAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            setNativeControlAttr: function setNativeControlAttr() {},
            removeNativeControlAttr: function removeNativeControlAttr() {},
            registerAnimationEndHandler: function registerAnimationEndHandler() /* handler: EventListener */{},
            deregisterAnimationEndHandler: function deregisterAnimationEndHandler() /* handler: EventListener */{},
            registerChangeHandler: function registerChangeHandler() /* handler: EventListener */{},
            deregisterChangeHandler: function deregisterChangeHandler() /* handler: EventListener */{},
            getNativeControl: function getNativeControl() /* !MDCSelectionControlState */{},
            forceLayout: function forceLayout() {},
            isAttachedToDOM: function isAttachedToDOM() /* boolean */{}
          }
        );
      }
    }]);

    function MDCCheckboxFoundation(adapter) {
      classCallCheck(this, MDCCheckboxFoundation);

      /** @private {string} */
      var _this = possibleConstructorReturn(this, (MDCCheckboxFoundation.__proto__ || Object.getPrototypeOf(MDCCheckboxFoundation)).call(this, _extends(MDCCheckboxFoundation.defaultAdapter, adapter)));

      _this.currentCheckState_ = strings$1.TRANSITION_STATE_INIT;

      /** @private {string} */
      _this.currentAnimationClass_ = '';

      /** @private {number} */
      _this.animEndLatchTimer_ = 0;

      _this.animEndHandler_ = /** @private {!EventListener} */function () {
        return _this.handleAnimationEnd();
      };

      _this.changeHandler_ = /** @private {!EventListener} */function () {
        return _this.handleChange();
      };
      return _this;
    }

    createClass(MDCCheckboxFoundation, [{
      key: 'init',
      value: function init() {
        this.currentCheckState_ = this.determineCheckState_(this.getNativeControl_());
        this.adapter_.addClass(cssClasses$1.UPGRADED);
        this.adapter_.registerChangeHandler(this.changeHandler_);
        this.installPropertyChangeHooks_();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterChangeHandler(this.changeHandler_);
        this.uninstallPropertyChangeHooks_();
      }

      /** @return {boolean} */

    }, {
      key: 'isChecked',
      value: function isChecked() {
        return this.getNativeControl_().checked;
      }

      /** @param {boolean} checked */

    }, {
      key: 'setChecked',
      value: function setChecked(checked) {
        this.getNativeControl_().checked = checked;
      }

      /** @return {boolean} */

    }, {
      key: 'isIndeterminate',
      value: function isIndeterminate() {
        return this.getNativeControl_().indeterminate;
      }

      /** @param {boolean} indeterminate */

    }, {
      key: 'setIndeterminate',
      value: function setIndeterminate(indeterminate) {
        this.getNativeControl_().indeterminate = indeterminate;
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.getNativeControl_().disabled;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.getNativeControl_().disabled = disabled;
        if (disabled) {
          this.adapter_.addClass(cssClasses$1.DISABLED);
        } else {
          this.adapter_.removeClass(cssClasses$1.DISABLED);
        }
      }

      /** @return {?string} */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.getNativeControl_().value;
      }

      /** @param {?string} value */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.getNativeControl_().value = value;
      }

      /**
       * Handles the animationend event for the checkbox
       */

    }, {
      key: 'handleAnimationEnd',
      value: function handleAnimationEnd() {
        var _this2 = this;

        clearTimeout(this.animEndLatchTimer_);
        this.animEndLatchTimer_ = setTimeout(function () {
          _this2.adapter_.removeClass(_this2.currentAnimationClass_);
          _this2.adapter_.deregisterAnimationEndHandler(_this2.animEndHandler_);
        }, numbers$1.ANIM_END_LATCH_MS);
      }

      /**
       * Handles the change event for the checkbox
       */

    }, {
      key: 'handleChange',
      value: function handleChange() {
        this.transitionCheckState_();
      }

      /** @private */

    }, {
      key: 'installPropertyChangeHooks_',
      value: function installPropertyChangeHooks_() {
        var _this3 = this;

        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
          // We have to check for this descriptor, since some browsers (Safari) don't support its return.
          // See: https://bugs.webkit.org/show_bug.cgi?id=49739
          if (validDescriptor(desc)) {
            var nativeCbDesc = /** @type {!ObjectPropertyDescriptor} */{
              get: desc.get,
              set: function set$$1(state) {
                desc.set.call(nativeCb, state);
                _this3.transitionCheckState_();
              },
              configurable: desc.configurable,
              enumerable: desc.enumerable
            };
            Object.defineProperty(nativeCb, controlState, nativeCbDesc);
          }
        });
      }

      /** @private */

    }, {
      key: 'uninstallPropertyChangeHooks_',
      value: function uninstallPropertyChangeHooks_() {
        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = /** @type {!ObjectPropertyDescriptor} */Object.getOwnPropertyDescriptor(cbProto, controlState);
          if (validDescriptor(desc)) {
            Object.defineProperty(nativeCb, controlState, desc);
          }
        });
      }

      /** @private */

    }, {
      key: 'transitionCheckState_',
      value: function transitionCheckState_() {
        var nativeCb = this.adapter_.getNativeControl();
        if (!nativeCb) {
          return;
        }
        var oldState = this.currentCheckState_;
        var newState = this.determineCheckState_(nativeCb);
        if (oldState === newState) {
          return;
        }

        // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
        if (this.isIndeterminate()) {
          this.adapter_.setNativeControlAttr(strings$1.ARIA_CHECKED_ATTR, strings$1.ARIA_CHECKED_INDETERMINATE_VALUE);
        } else {
          this.adapter_.removeNativeControlAttr(strings$1.ARIA_CHECKED_ATTR);
        }

        // Check to ensure that there isn't a previously existing animation class, in case for example
        // the user interacted with the checkbox before the animation was finished.
        if (this.currentAnimationClass_.length > 0) {
          clearTimeout(this.animEndLatchTimer_);
          this.adapter_.forceLayout();
          this.adapter_.removeClass(this.currentAnimationClass_);
        }

        this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
        this.currentCheckState_ = newState;

        // Check for parentNode so that animations are only run when the element is attached
        // to the DOM.
        if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
          this.adapter_.addClass(this.currentAnimationClass_);
          this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
        }
      }

      /**
       * @param {!MDCSelectionControlState} nativeCb
       * @return {string}
       * @private
       */

    }, {
      key: 'determineCheckState_',
      value: function determineCheckState_(nativeCb) {
        var TRANSITION_STATE_INDETERMINATE = strings$1.TRANSITION_STATE_INDETERMINATE,
            TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;


        if (nativeCb.indeterminate) {
          return TRANSITION_STATE_INDETERMINATE;
        }
        return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
      }

      /**
       * @param {string} oldState
       * @param {string} newState
       * @return {string}
       */

    }, {
      key: 'getTransitionAnimationClass_',
      value: function getTransitionAnimationClass_(oldState, newState) {
        var TRANSITION_STATE_INIT = strings$1.TRANSITION_STATE_INIT,
            TRANSITION_STATE_CHECKED = strings$1.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = strings$1.TRANSITION_STATE_UNCHECKED;
        var _MDCCheckboxFoundatio = MDCCheckboxFoundation.cssClasses,
            ANIM_UNCHECKED_CHECKED = _MDCCheckboxFoundatio.ANIM_UNCHECKED_CHECKED,
            ANIM_UNCHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_UNCHECKED_INDETERMINATE,
            ANIM_CHECKED_UNCHECKED = _MDCCheckboxFoundatio.ANIM_CHECKED_UNCHECKED,
            ANIM_CHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_CHECKED_INDETERMINATE,
            ANIM_INDETERMINATE_CHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_CHECKED,
            ANIM_INDETERMINATE_UNCHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_UNCHECKED;


        switch (oldState) {
          case TRANSITION_STATE_INIT:
            if (newState === TRANSITION_STATE_UNCHECKED) {
              return '';
            }
          // fallthrough
          case TRANSITION_STATE_UNCHECKED:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
          case TRANSITION_STATE_CHECKED:
            return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
          // TRANSITION_STATE_INDETERMINATE
          default:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
        }
      }

      /**
       * @return {!MDCSelectionControlState}
       * @private
       */

    }, {
      key: 'getNativeControl_',
      value: function getNativeControl_() {
        return this.adapter_.getNativeControl() || {
          checked: false,
          indeterminate: false,
          disabled: false,
          value: null
        };
      }
    }]);
    return MDCCheckboxFoundation;
  }(MDCFoundation);

  /**
   * @param {ObjectPropertyDescriptor|undefined} inputPropDesc
   * @return {boolean}
   */


  function validDescriptor(inputPropDesc) {
    return !!inputPropDesc && typeof inputPropDesc.set === 'function';
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

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Form Field. Provides an interface for managing
   * - event handlers
   * - ripple activation
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
  var MDCFormFieldAdapter = function () {
    function MDCFormFieldAdapter() {
      classCallCheck(this, MDCFormFieldAdapter);
    }

    createClass(MDCFormFieldAdapter, [{
      key: "registerInteractionHandler",

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */
      value: function registerInteractionHandler(type, handler) {}

      /**
       * @param {string} type
       * @param {!EventListener} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}
    }, {
      key: "activateInputRipple",
      value: function activateInputRipple() {}
    }, {
      key: "deactivateInputRipple",
      value: function deactivateInputRipple() {}
    }]);
    return MDCFormFieldAdapter;
  }();

  /**
   * @license
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

  /** @enum {string} */
  var cssClasses$2 = {
    ROOT: 'mdc-form-field'
  };

  /** @enum {string} */
  var strings$2 = {
    LABEL_SELECTOR: '.mdc-form-field > label'
  };

  /**
   * @license
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

  /**
   * @extends {MDCFoundation<!MDCFormFieldAdapter>}
   */

  var MDCFormFieldFoundation = function (_MDCFoundation) {
    inherits(MDCFormFieldFoundation, _MDCFoundation);
    createClass(MDCFormFieldFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses$2;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$2;
      }

      /** @return {!MDCFormFieldAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          activateInputRipple: function activateInputRipple() {},
          deactivateInputRipple: function deactivateInputRipple() {}
        };
      }
    }]);

    function MDCFormFieldFoundation(adapter) {
      classCallCheck(this, MDCFormFieldFoundation);

      /** @private {!EventListener} */
      var _this = possibleConstructorReturn(this, (MDCFormFieldFoundation.__proto__ || Object.getPrototypeOf(MDCFormFieldFoundation)).call(this, _extends(MDCFormFieldFoundation.defaultAdapter, adapter)));

      _this.clickHandler_ = /** @type {!EventListener} */function () {
        return _this.handleClick_();
      };
      return _this;
    }

    createClass(MDCFormFieldFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      }

      /** @private */

    }, {
      key: 'handleClick_',
      value: function handleClick_() {
        var _this2 = this;

        this.adapter_.activateInputRipple();
        requestAnimationFrame(function () {
          return _this2.adapter_.deactivateInputRipple();
        });
      }
    }]);
    return MDCFormFieldFoundation;
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
  function getCorrectEventName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

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

  var mdcCheckbox = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-checkbox-wrapper", class: _vm.formFieldClasses }, [_c('div', { ref: "root", staticClass: "mdc-checkbox", class: _vm.classes, style: _vm.styles }, [_c('input', { ref: "control", staticClass: "mdc-checkbox__native-control", attrs: { "id": _vm._uid, "type": "checkbox", "name": _vm.name }, domProps: { "value": _vm.value }, on: { "change": _vm.onChange } }), _vm._v(" "), _c('div', { staticClass: "mdc-checkbox__background" }, [_c('svg', { staticClass: "mdc-checkbox__checkmark", attrs: { "viewBox": "0 0 24 24" } }, [_c('path', { staticClass: "checkbox__checkmark-path", attrs: { "fill": "none", "stroke": "white", "d": "M1.73,12.91 8.1,19.28 22.79,4.59" } })]), _vm._v(" "), _c('div', { staticClass: "mdc-checkbox__mixedmark" })])]), _vm._v(" "), _c('label', { ref: "label", attrs: { "for": _vm._uid } }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-checkbox',
    mixins: [DispatchFocusMixin],
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean,
      indeterminate: Boolean,
      disabled: Boolean,
      label: String,
      'align-end': Boolean,
      value: {
        type: String,
        default: function _default() {
          return 'on';
        }
      },
      name: String
    },
    data: function data() {
      return {
        styles: {},
        classes: {}
      };
    },

    computed: {
      hasLabel: function hasLabel() {
        return this.label || this.$slots.default;
      },
      formFieldClasses: function formFieldClasses() {
        return {
          'mdc-form-field': this.hasLabel,
          'mdc-form-field--align-end': this.hasLabel && this.alignEnd
        };
      }
    },
    watch: {
      checked: function checked(value) {
        this.foundation.setChecked(value);
      },
      disabled: function disabled(value) {
        this.foundation.setDisabled(value);
      },
      indeterminate: function indeterminate(value) {
        this.foundation.setIndeterminate(value);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCCheckboxFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        setNativeControlAttr: function setNativeControlAttr(attr, value) {
          _this.$refs.control.setAttribute(attr, value);
        },
        removeNativeControlAttr: function removeNativeControlAttr(attr) {
          _this.$refs.control.removeAttribute(attr);
        },
        registerAnimationEndHandler: function registerAnimationEndHandler(handler) {
          return _this.$refs.root.addEventListener(getCorrectEventName(window, 'animationend'), handler);
        },
        deregisterAnimationEndHandler: function deregisterAnimationEndHandler(handler) {
          return _this.$refs.root.removeEventListener(getCorrectEventName(window, 'animationend'), handler);
        },
        registerChangeHandler: function registerChangeHandler(handler) {
          return _this.$refs.control.addEventListener('change', handler);
        },
        deregisterChangeHandler: function deregisterChangeHandler(handler) {
          return _this.$refs.control.removeEventListener('change', handler);
        },
        getNativeControl: function getNativeControl() {
          return _this.$refs.control;
        },
        forceLayout: function forceLayout() {
          return _this.$refs.root.offsetWidth;
        },
        isAttachedToDOM: function isAttachedToDOM() {
          return Boolean(_this.$el.parentNode);
        }
      });

      this.ripple = new RippleBase(this, {
        isUnbounded: function isUnbounded() {
          return true;
        },
        isSurfaceActive: function isSurfaceActive() {
          return RippleBase.isSurfaceActive(_this.$refs.control);
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$refs.control.addEventListener(evt, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$refs.control.addEventListener(evt, handler);
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this.$refs.root.getBoundingClientRect();
        }
      });

      this.formField = new MDCFormFieldFoundation({
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          _this.$refs.label.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          _this.$refs.label.removeEventListener(type, handler);
        },
        activateInputRipple: function activateInputRipple() {
          _this.ripple && _this.ripple.activate();
        },
        deactivateInputRipple: function deactivateInputRipple() {
          _this.ripple && _this.ripple.deactivate();
        }
      });

      this.foundation.init();
      this.ripple.init();
      this.formField.init();
      this.foundation.setChecked(this.checked);
      this.foundation.setDisabled(this.disabled);
      this.foundation.setIndeterminate(this.indeterminate);
    },
    beforeDestroy: function beforeDestroy() {
      this.formField.destroy();
      this.ripple.destroy();
      this.foundation.destroy();
    },

    methods: {
      onChange: function onChange() {
        this.$emit('update:indeterminate', this.foundation.isIndeterminate());
        this.$emit('change', this.foundation.isChecked());
      }
    }
  };

  var plugin = BasePlugin({
    mdcCheckbox: mdcCheckbox
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWZvY3VzLW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NlbGVjdGlvbi1jb250cm9sL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9jaGVja2JveC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9jaGVja2JveC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoZWNrYm94L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Zvcm0tZmllbGQvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZm9ybS1maWVsZC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Zvcm0tZmllbGQvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYW5pbWF0aW9uL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy9jaGVja2JveC9tZGMtY2hlY2tib3gudnVlIiwiLi4vLi4vY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2hlY2tib3gvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0IChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4gICIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luIChjb21wb25lbnRzKSB7IFxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogKHZtKSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfSBcbn1cblxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQgKGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEZvY3VzTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiAge2hhc0ZvY3VzOiBmYWxzZX1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZVxuICAgIH0sXG4gICAgb25Nb3VzZVVwICgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlXG4gICAgfSxcbiAgICBvbkZvY3VzRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIG9uQmx1ckV2ZW50ICgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgLy8gYWxzbyBmaWx0dXIgYmx1ciBpZiBtb3VzZWRvd25cbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIGRpc3BhdGNoRm9jdXNFdmVudCgpIHtcbiAgICAgIGxldCBoYXNGb2N1cyA9IHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IHRoaXMuJGVsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBoYXNGb2N1c1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHshe3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7IXt4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgKCkgPT4gdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRClcbiAgICApO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICgpID0+IHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpXG4gICAgKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshe2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB9XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgd3JhcHBlZCBpbiBhbiByQUYgY2FsbCBiL2Mgd2ViIGJyb3dzZXJzXG4gICAgICAvLyByZXBvcnQgYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpblxuICAgICAgLy8gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAZXh0ZW5kcyBNRENDb21wb25lbnQ8IU1EQ1JpcHBsZUZvdW5kYXRpb24+XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZSBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKiBAcGFyYW0gey4uLj99IGFyZ3MgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge3tpc1VuYm91bmRlZDogKGJvb2xlYW58dW5kZWZpbmVkKX09fSBvcHRpb25zXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGV9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCwge2lzVW5ib3VuZGVkID0gdW5kZWZpbmVkfSA9IHt9KSB7XG4gICAgY29uc3QgcmlwcGxlID0gbmV3IE1EQ1JpcHBsZShyb290KTtcbiAgICAvLyBPbmx5IG92ZXJyaWRlIHVuYm91bmRlZCBiZWhhdmlvciBpZiBvcHRpb24gaXMgZXhwbGljaXRseSBzcGVjaWZpZWRcbiAgICBpZiAoaXNVbmJvdW5kZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmlwcGxlLnVuYm91bmRlZCA9IC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gKGlzVW5ib3VuZGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJpcHBsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFSaXBwbGVDYXBhYmxlU3VyZmFjZX0gaW5zdGFuY2VcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQWRhcHRlcihpbnN0YW5jZSkge1xuICAgIGNvbnN0IE1BVENIRVMgPSB1dGlsLmdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHV0aWwuc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiBpbnN0YW5jZS51bmJvdW5kZWQsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IGluc3RhbmNlLnJvb3RfW01BVENIRVNdKCc6YWN0aXZlJyksXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gaW5zdGFuY2UuZGlzYWJsZWQsXG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gaW5zdGFuY2Uucm9vdF8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IGluc3RhbmNlLnJvb3RfLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgaW5zdGFuY2Uucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiBpbnN0YW5jZS5yb290Xy5zdHlsZS5zZXRQcm9wZXJ0eSh2YXJOYW1lLCB2YWx1ZSksXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiBpbnN0YW5jZS5yb290Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+ICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCB1bmJvdW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudW5ib3VuZGVkXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXQgdW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIHRoaXMudW5ib3VuZGVkXyA9IEJvb2xlYW4odW5ib3VuZGVkKTtcbiAgICB0aGlzLnNldFVuYm91bmRlZF8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zdXJlIENvbXBpbGVyIHRocm93cyBhbiBhY2Nlc3MgY29udHJvbCBlcnJvciB3aGVuIGRpcmVjdGx5IGFjY2Vzc2luZyBhXG4gICAqIHByb3RlY3RlZCBvciBwcml2YXRlIHByb3BlcnR5IGluc2lkZSBhIGdldHRlci9zZXR0ZXIsIGxpa2UgdW5ib3VuZGVkIGFib3ZlLlxuICAgKiBCeSBhY2Nlc3NpbmcgdGhlIHByb3RlY3RlZCBwcm9wZXJ0eSBpbnNpZGUgYSBtZXRob2QsIHdlIHNvbHZlIHRoYXQgcHJvYmxlbS5cbiAgICogVGhhdCdzIHdoeSB0aGlzIGZ1bmN0aW9uIGV4aXN0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldFVuYm91bmRlZF8oKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRVbmJvdW5kZWQodGhpcy51bmJvdW5kZWRfKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5sYXlvdXQoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDUmlwcGxlRm91bmRhdGlvbn0gKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENSaXBwbGVGb3VuZGF0aW9uKE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyKHRoaXMpKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICB0aGlzLnVuYm91bmRlZCA9ICdtZGNSaXBwbGVJc1VuYm91bmRlZCcgaW4gdGhpcy5yb290Xy5kYXRhc2V0O1xuICB9XG59XG5cbi8qKlxuICogU2VlIE1hdGVyaWFsIERlc2lnbiBzcGVjIGZvciBtb3JlIGRldGFpbHMgb24gd2hlbiB0byB1c2UgcmlwcGxlcy5cbiAqIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZ3VpZGVsaW5lcy9tb3Rpb24vY2hvcmVvZ3JhcGh5Lmh0bWwjY2hvcmVvZ3JhcGh5LWNyZWF0aW9uXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIFJpcHBsZUNhcGFibGVTdXJmYWNlIHt9XG5cbi8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS5yb290XztcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIGJsZWVkcyBvdXQgb2YgdGhlIGJvdW5kcyBvZiB0aGUgZWxlbWVudC5cbiAqIEB0eXBlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLnVuYm91bmRlZDtcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIGlzIGF0dGFjaGVkIHRvIGEgZGlzYWJsZWQgY29tcG9uZW50LlxuICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUuZGlzYWJsZWQ7XG5cbmV4cG9ydCB7TURDUmlwcGxlLCBNRENSaXBwbGVGb3VuZGF0aW9uLCBSaXBwbGVDYXBhYmxlU3VyZmFjZSwgdXRpbH07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDUmlwcGxlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2luZGV4Jztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgY2hlY2tlZDogYm9vbGVhbixcbiAqICAgaW5kZXRlcm1pbmF0ZTogYm9vbGVhbixcbiAqICAgZGlzYWJsZWQ6IGJvb2xlYW4sXG4gKiAgIHZhbHVlOiA/c3RyaW5nXG4gKiB9fVxuICovXG5sZXQgTURDU2VsZWN0aW9uQ29udHJvbFN0YXRlO1xuXG4vKipcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDU2VsZWN0aW9uQ29udHJvbCB7XG4gIC8qKiBAcmV0dXJuIHs/TURDUmlwcGxlfSAqL1xuICBnZXQgcmlwcGxlKCkge31cbn1cblxuZXhwb3J0IHtNRENTZWxlY3Rpb25Db250cm9sU3RhdGUsIE1EQ1NlbGVjdGlvbkNvbnRyb2x9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX0gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdGlvbi1jb250cm9sL2luZGV4JztcblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIENoZWNrYm94LiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENDaGVja2JveEFkYXB0ZXIge1xuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIGF0dHJpYnV0ZSB3aXRoIGEgZ2l2ZW4gdmFsdWUgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0TmF0aXZlQ29udHJvbEF0dHIoYXR0ciwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gYXR0cmlidXRlIGZyb20gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqL1xuICByZW1vdmVOYXRpdmVDb250cm9sQXR0cihhdHRyKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyICovXG4gIHJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyICovXG4gIGRlcmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXIgKi9cbiAgcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXIgKi9cbiAgZGVyZWdpc3RlckNoYW5nZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKiogQHJldHVybiB7IU1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX0gKi9cbiAgZ2V0TmF0aXZlQ29udHJvbCgpIHt9XG5cbiAgZm9yY2VMYXlvdXQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0F0dGFjaGVkVG9ET00oKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDaGVja2JveEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBjb25zdCB7c3RyaW5nfSAqL1xuY29uc3QgUk9PVCA9ICdtZGMtY2hlY2tib3gnO1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFVQR1JBREVEOiAnbWRjLWNoZWNrYm94LS11cGdyYWRlZCcsXG4gIENIRUNLRUQ6ICdtZGMtY2hlY2tib3gtLWNoZWNrZWQnLFxuICBJTkRFVEVSTUlOQVRFOiAnbWRjLWNoZWNrYm94LS1pbmRldGVybWluYXRlJyxcbiAgRElTQUJMRUQ6ICdtZGMtY2hlY2tib3gtLWRpc2FibGVkJyxcbiAgQU5JTV9VTkNIRUNLRURfQ0hFQ0tFRDogJ21kYy1jaGVja2JveC0tYW5pbS11bmNoZWNrZWQtY2hlY2tlZCcsXG4gIEFOSU1fVU5DSEVDS0VEX0lOREVURVJNSU5BVEU6ICdtZGMtY2hlY2tib3gtLWFuaW0tdW5jaGVja2VkLWluZGV0ZXJtaW5hdGUnLFxuICBBTklNX0NIRUNLRURfVU5DSEVDS0VEOiAnbWRjLWNoZWNrYm94LS1hbmltLWNoZWNrZWQtdW5jaGVja2VkJyxcbiAgQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEU6ICdtZGMtY2hlY2tib3gtLWFuaW0tY2hlY2tlZC1pbmRldGVybWluYXRlJyxcbiAgQU5JTV9JTkRFVEVSTUlOQVRFX0NIRUNLRUQ6ICdtZGMtY2hlY2tib3gtLWFuaW0taW5kZXRlcm1pbmF0ZS1jaGVja2VkJyxcbiAgQU5JTV9JTkRFVEVSTUlOQVRFX1VOQ0hFQ0tFRDogJ21kYy1jaGVja2JveC0tYW5pbS1pbmRldGVybWluYXRlLXVuY2hlY2tlZCcsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIE5BVElWRV9DT05UUk9MX1NFTEVDVE9SOiBgLiR7Uk9PVH1fX25hdGl2ZS1jb250cm9sYCxcbiAgVFJBTlNJVElPTl9TVEFURV9JTklUOiAnaW5pdCcsXG4gIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRDogJ2NoZWNrZWQnLFxuICBUUkFOU0lUSU9OX1NUQVRFX1VOQ0hFQ0tFRDogJ3VuY2hlY2tlZCcsXG4gIFRSQU5TSVRJT05fU1RBVEVfSU5ERVRFUk1JTkFURTogJ2luZGV0ZXJtaW5hdGUnLFxuICBBUklBX0NIRUNLRURfQVRUUjogJ2FyaWEtY2hlY2tlZCcsXG4gIEFSSUFfQ0hFQ0tFRF9JTkRFVEVSTUlOQVRFX1ZBTFVFOiAnbWl4ZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBBTklNX0VORF9MQVRDSF9NUzogMjUwLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX0gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdGlvbi1jb250cm9sL2luZGV4JztcbmltcG9ydCBNRENDaGVja2JveEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKiogQGNvbnN0IHshQXJyYXk8c3RyaW5nPn0gKi9cbmNvbnN0IENCX1BST1RPX1BST1BTID0gWydjaGVja2VkJywgJ2luZGV0ZXJtaW5hdGUnXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDQ2hlY2tib3hBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDQ2hlY2tib3hGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDQ2hlY2tib3hBZGFwdGVyfSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENDaGVja2JveEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0TmF0aXZlQ29udHJvbEF0dHI6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlTmF0aXZlQ29udHJvbEF0dHI6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQ2hhbmdlSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0TmF0aXZlQ29udHJvbDogKCkgPT4gLyogIU1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZSAqLyB7fSxcbiAgICAgIGZvcmNlTGF5b3V0OiAoKSA9PiB7fSxcbiAgICAgIGlzQXR0YWNoZWRUb0RPTTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0NoZWNrYm94Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtzdHJpbmd9ICovXG4gICAgdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV8gPSBzdHJpbmdzLlRSQU5TSVRJT05fU1RBVEVfSU5JVDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzXyA9ICcnO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hbmltRW5kTGF0Y2hUaW1lcl8gPSAwO1xuXG4gICAgdGhpcy5hbmltRW5kSGFuZGxlcl8gPSAvKiogQHByaXZhdGUgeyFFdmVudExpc3RlbmVyfSAqLyAoXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZUFuaW1hdGlvbkVuZCgpKTtcblxuICAgIHRoaXMuY2hhbmdlSGFuZGxlcl8gPSAvKiogQHByaXZhdGUgeyFFdmVudExpc3RlbmVyfSAqLyAoXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZUNoYW5nZSgpKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV8gPSB0aGlzLmRldGVybWluZUNoZWNrU3RhdGVfKHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLlVQR1JBREVEKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQ2hhbmdlSGFuZGxlcih0aGlzLmNoYW5nZUhhbmRsZXJfKTtcbiAgICB0aGlzLmluc3RhbGxQcm9wZXJ0eUNoYW5nZUhvb2tzXygpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcl8pO1xuICAgIHRoaXMudW5pbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18oKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0NoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5jaGVja2VkO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCAqL1xuICBzZXRDaGVja2VkKGNoZWNrZWQpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNJbmRldGVybWluYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkuaW5kZXRlcm1pbmF0ZTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGluZGV0ZXJtaW5hdGUgKi9cbiAgc2V0SW5kZXRlcm1pbmF0ZShpbmRldGVybWluYXRlKSB7XG4gICAgdGhpcy5nZXROYXRpdmVDb250cm9sXygpLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5nZXROYXRpdmVDb250cm9sXygpLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHs/c3RyaW5nfSAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVDb250cm9sXygpLnZhbHVlO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7P3N0cmluZ30gdmFsdWUgKi9cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBhbmltYXRpb25lbmQgZXZlbnQgZm9yIHRoZSBjaGVja2JveFxuICAgKi9cbiAgaGFuZGxlQW5pbWF0aW9uRW5kKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1FbmRMYXRjaFRpbWVyXyk7XG4gICAgdGhpcy5hbmltRW5kTGF0Y2hUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3ModGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXIodGhpcy5hbmltRW5kSGFuZGxlcl8pO1xuICAgIH0sIG51bWJlcnMuQU5JTV9FTkRfTEFUQ0hfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGNoYW5nZSBldmVudCBmb3IgdGhlIGNoZWNrYm94XG4gICAqL1xuICBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgdGhpcy50cmFuc2l0aW9uQ2hlY2tTdGF0ZV8oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBpbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18oKSB7XG4gICAgY29uc3QgbmF0aXZlQ2IgPSB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCk7XG4gICAgY29uc3QgY2JQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihuYXRpdmVDYik7XG5cbiAgICBDQl9QUk9UT19QUk9QUy5mb3JFYWNoKChjb250cm9sU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNiUHJvdG8sIGNvbnRyb2xTdGF0ZSk7XG4gICAgICAvLyBXZSBoYXZlIHRvIGNoZWNrIGZvciB0aGlzIGRlc2NyaXB0b3IsIHNpbmNlIHNvbWUgYnJvd3NlcnMgKFNhZmFyaSkgZG9uJ3Qgc3VwcG9ydCBpdHMgcmV0dXJuLlxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDk3MzlcbiAgICAgIGlmICh2YWxpZERlc2NyaXB0b3IoZGVzYykpIHtcbiAgICAgICAgY29uc3QgbmF0aXZlQ2JEZXNjID0gLyoqIEB0eXBlIHshT2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfSAqLyAoe1xuICAgICAgICAgIGdldDogZGVzYy5nZXQsXG4gICAgICAgICAgc2V0OiAoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGRlc2Muc2V0LmNhbGwobmF0aXZlQ2IsIHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNoZWNrU3RhdGVfKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGRlc2MuY29uZmlndXJhYmxlLFxuICAgICAgICAgIGVudW1lcmFibGU6IGRlc2MuZW51bWVyYWJsZSxcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXRpdmVDYiwgY29udHJvbFN0YXRlLCBuYXRpdmVDYkRlc2MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVuaW5zdGFsbFByb3BlcnR5Q2hhbmdlSG9va3NfKCkge1xuICAgIGNvbnN0IG5hdGl2ZUNiID0gdGhpcy5nZXROYXRpdmVDb250cm9sXygpO1xuICAgIGNvbnN0IGNiUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmF0aXZlQ2IpO1xuXG4gICAgQ0JfUFJPVE9fUFJPUFMuZm9yRWFjaCgoY29udHJvbFN0YXRlKSA9PiB7XG4gICAgICBjb25zdCBkZXNjID0gLyoqIEB0eXBlIHshT2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfSAqLyAoXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY2JQcm90bywgY29udHJvbFN0YXRlKSk7XG4gICAgICBpZiAodmFsaWREZXNjcmlwdG9yKGRlc2MpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXRpdmVDYiwgY29udHJvbFN0YXRlLCBkZXNjKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB0cmFuc2l0aW9uQ2hlY2tTdGF0ZV8oKSB7XG4gICAgY29uc3QgbmF0aXZlQ2IgPSB0aGlzLmFkYXB0ZXJfLmdldE5hdGl2ZUNvbnRyb2woKTtcbiAgICBpZiAoIW5hdGl2ZUNiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV87XG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmRldGVybWluZUNoZWNrU3RhdGVfKG5hdGl2ZUNiKTtcbiAgICBpZiAob2xkU3RhdGUgPT09IG5ld1N0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIGFyaWEtY2hlY2tlZCBpcyBzZXQgdG8gbWl4ZWQgaWYgY2hlY2tib3ggaXMgaW4gaW5kZXRlcm1pbmF0ZSBzdGF0ZS5cbiAgICBpZiAodGhpcy5pc0luZGV0ZXJtaW5hdGUoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXROYXRpdmVDb250cm9sQXR0cihcbiAgICAgICAgc3RyaW5ncy5BUklBX0NIRUNLRURfQVRUUiwgc3RyaW5ncy5BUklBX0NIRUNLRURfSU5ERVRFUk1JTkFURV9WQUxVRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlTmF0aXZlQ29udHJvbEF0dHIoc3RyaW5ncy5BUklBX0NIRUNLRURfQVRUUik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdG8gZW5zdXJlIHRoYXQgdGhlcmUgaXNuJ3QgYSBwcmV2aW91c2x5IGV4aXN0aW5nIGFuaW1hdGlvbiBjbGFzcywgaW4gY2FzZSBmb3IgZXhhbXBsZVxuICAgIC8vIHRoZSB1c2VyIGludGVyYWN0ZWQgd2l0aCB0aGUgY2hlY2tib3ggYmVmb3JlIHRoZSBhbmltYXRpb24gd2FzIGZpbmlzaGVkLlxuICAgIGlmICh0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzc18ubGVuZ3RoID4gMCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYW5pbUVuZExhdGNoVGltZXJfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9yY2VMYXlvdXQoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3ModGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfKTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzc18gPSB0aGlzLmdldFRyYW5zaXRpb25BbmltYXRpb25DbGFzc18ob2xkU3RhdGUsIG5ld1N0YXRlKTtcbiAgICB0aGlzLmN1cnJlbnRDaGVja1N0YXRlXyA9IG5ld1N0YXRlO1xuXG4gICAgLy8gQ2hlY2sgZm9yIHBhcmVudE5vZGUgc28gdGhhdCBhbmltYXRpb25zIGFyZSBvbmx5IHJ1biB3aGVuIHRoZSBlbGVtZW50IGlzIGF0dGFjaGVkXG4gICAgLy8gdG8gdGhlIERPTS5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc0F0dGFjaGVkVG9ET00oKSAmJiB0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzc18ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyh0aGlzLmN1cnJlbnRBbmltYXRpb25DbGFzc18pO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXIodGhpcy5hbmltRW5kSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENTZWxlY3Rpb25Db250cm9sU3RhdGV9IG5hdGl2ZUNiXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRldGVybWluZUNoZWNrU3RhdGVfKG5hdGl2ZUNiKSB7XG4gICAgY29uc3Qge1xuICAgICAgVFJBTlNJVElPTl9TVEFURV9JTkRFVEVSTUlOQVRFLFxuICAgICAgVFJBTlNJVElPTl9TVEFURV9DSEVDS0VELFxuICAgICAgVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQsXG4gICAgfSA9IHN0cmluZ3M7XG5cbiAgICBpZiAobmF0aXZlQ2IuaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgcmV0dXJuIFRSQU5TSVRJT05fU1RBVEVfSU5ERVRFUk1JTkFURTtcbiAgICB9XG4gICAgcmV0dXJuIG5hdGl2ZUNiLmNoZWNrZWQgPyBUUkFOU0lUSU9OX1NUQVRFX0NIRUNLRUQgOiBUUkFOU0lUSU9OX1NUQVRFX1VOQ0hFQ0tFRDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkU3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1N0YXRlXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGdldFRyYW5zaXRpb25BbmltYXRpb25DbGFzc18ob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG4gICAgY29uc3Qge1xuICAgICAgVFJBTlNJVElPTl9TVEFURV9JTklULFxuICAgICAgVFJBTlNJVElPTl9TVEFURV9DSEVDS0VELFxuICAgICAgVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQsXG4gICAgfSA9IHN0cmluZ3M7XG5cbiAgICBjb25zdCB7XG4gICAgICBBTklNX1VOQ0hFQ0tFRF9DSEVDS0VELFxuICAgICAgQU5JTV9VTkNIRUNLRURfSU5ERVRFUk1JTkFURSxcbiAgICAgIEFOSU1fQ0hFQ0tFRF9VTkNIRUNLRUQsXG4gICAgICBBTklNX0NIRUNLRURfSU5ERVRFUk1JTkFURSxcbiAgICAgIEFOSU1fSU5ERVRFUk1JTkFURV9DSEVDS0VELFxuICAgICAgQU5JTV9JTkRFVEVSTUlOQVRFX1VOQ0hFQ0tFRCxcbiAgICB9ID0gTURDQ2hlY2tib3hGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG5cbiAgICBzd2l0Y2ggKG9sZFN0YXRlKSB7XG4gICAgY2FzZSBUUkFOU0lUSU9OX1NUQVRFX0lOSVQ6XG4gICAgICBpZiAobmV3U3RhdGUgPT09IFRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VEKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAvLyBmYWxsdGhyb3VnaFxuICAgIGNhc2UgVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQ6XG4gICAgICByZXR1cm4gbmV3U3RhdGUgPT09IFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRCA/IEFOSU1fVU5DSEVDS0VEX0NIRUNLRUQgOiBBTklNX1VOQ0hFQ0tFRF9JTkRFVEVSTUlOQVRFO1xuICAgIGNhc2UgVFJBTlNJVElPTl9TVEFURV9DSEVDS0VEOlxuICAgICAgcmV0dXJuIG5ld1N0YXRlID09PSBUUkFOU0lUSU9OX1NUQVRFX1VOQ0hFQ0tFRCA/IEFOSU1fQ0hFQ0tFRF9VTkNIRUNLRUQgOiBBTklNX0NIRUNLRURfSU5ERVRFUk1JTkFURTtcbiAgICAvLyBUUkFOU0lUSU9OX1NUQVRFX0lOREVURVJNSU5BVEVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5ld1N0YXRlID09PSBUUkFOU0lUSU9OX1NUQVRFX0NIRUNLRUQgP1xuICAgICAgICBBTklNX0lOREVURVJNSU5BVEVfQ0hFQ0tFRCA6IEFOSU1fSU5ERVRFUk1JTkFURV9VTkNIRUNLRUQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFNRENTZWxlY3Rpb25Db250cm9sU3RhdGV9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXROYXRpdmVDb250cm9sXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5nZXROYXRpdmVDb250cm9sKCkgfHwge1xuICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICBpbmRldGVybWluYXRlOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdFByb3BlcnR5RGVzY3JpcHRvcnx1bmRlZmluZWR9IGlucHV0UHJvcERlc2NcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHZhbGlkRGVzY3JpcHRvcihpbnB1dFByb3BEZXNjKSB7XG4gIHJldHVybiAhIWlucHV0UHJvcERlc2MgJiYgdHlwZW9mIGlucHV0UHJvcERlc2Muc2V0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDaGVja2JveEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIEZvcm0gRmllbGQuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gcmlwcGxlIGFjdGl2YXRpb25cbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ0Zvcm1GaWVsZEFkYXB0ZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIGFjdGl2YXRlSW5wdXRSaXBwbGUoKSB7fVxuXG4gIGRlYWN0aXZhdGVJbnB1dFJpcHBsZSgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0Zvcm1GaWVsZEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWZvcm0tZmllbGQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBMQUJFTF9TRUxFQ1RPUjogJy5tZGMtZm9ybS1maWVsZCA+IGxhYmVsJyxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDRm9ybUZpZWxkQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0Zvcm1GaWVsZEFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENGb3JtRmllbGRGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDRm9ybUZpZWxkQWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBhY3RpdmF0ZUlucHV0UmlwcGxlOiAoKSA9PiB7fSxcbiAgICAgIGRlYWN0aXZhdGVJbnB1dFJpcHBsZTogKCkgPT4ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUV2ZW50TGlzdGVuZXJ9ICovXG4gICAgdGhpcy5jbGlja0hhbmRsZXJfID0gLyoqIEB0eXBlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKFxuICAgICAgKCkgPT4gdGhpcy5oYW5kbGVDbGlja18oKSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgaGFuZGxlQ2xpY2tfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWN0aXZhdGVJbnB1dFJpcHBsZSgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkYXB0ZXJfLmRlYWN0aXZhdGVJbnB1dFJpcHBsZSgpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3JtRmllbGRGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgbm9QcmVmaXg6IHN0cmluZyxcbiAqICAgd2Via2l0UHJlZml4OiBzdHJpbmcsXG4gKiAgIHN0eWxlUHJvcGVydHk6IHN0cmluZ1xuICogfX1cbiAqL1xubGV0IFZlbmRvclByb3BlcnR5TWFwVHlwZTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBldmVudFR5cGVNYXAgPSB7XG4gICdhbmltYXRpb25zdGFydCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbnN0YXJ0JyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25TdGFydCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25pdGVyYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25pdGVyYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2l0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ3RyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBjc3NQcm9wZXJ0eU1hcCA9IHtcbiAgJ2FuaW1hdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC1hbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNmb3JtJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNmb3JtJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zZm9ybScsXG4gIH0sXG4gICd0cmFuc2l0aW9uJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikge1xuICByZXR1cm4gKHdpbmRvd09ialsnZG9jdW1lbnQnXSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpIHtcbiAgcmV0dXJuIChldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwIHx8IGV2ZW50VHlwZSBpbiBjc3NQcm9wZXJ0eU1hcCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59IG1hcFxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpIHtcbiAgcmV0dXJuIG1hcFtldmVudFR5cGVdLnN0eWxlUHJvcGVydHkgaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGJyb3dzZXIgcHJlZml4IGZvciBDU1MzIGFuaW1hdGlvbiBldmVudHNcbiAqIGFuZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgaWYgKCFoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHx8ICFldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gZXZlbnRUeXBlO1xuICB9XG5cbiAgY29uc3QgbWFwID0gLyoqIEB0eXBlIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovIChcbiAgICBldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwID8gZXZlbnRUeXBlTWFwIDogY3NzUHJvcGVydHlNYXBcbiAgKTtcbiAgY29uc3QgZWwgPSB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSgnZGl2Jyk7XG4gIGxldCBldmVudE5hbWUgPSAnJztcblxuICBpZiAobWFwID09PSBldmVudFR5cGVNYXApIHtcbiAgICBldmVudE5hbWUgPSBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnROYW1lID0gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbiAgfVxuXG4gIHJldHVybiBldmVudE5hbWU7XG59XG5cbi8vIFB1YmxpYyBmdW5jdGlvbnMgdG8gYWNjZXNzIGdldEFuaW1hdGlvbk5hbWUoKSBmb3IgSmF2YVNjcmlwdCBldmVudHMgb3IgQ1NTXG4vLyBwcm9wZXJ0eSBuYW1lcy5cblxuY29uc3QgdHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzID0gWyd0cmFuc2Zvcm0nLCAnV2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ01TVHJhbnNmb3JtJ107XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbmV4cG9ydCB7dHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzLCBnZXRDb3JyZWN0RXZlbnROYW1lLCBnZXRDb3JyZWN0UHJvcGVydHlOYW1lfTtcbiIsImltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcydcbmltcG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGdldE1hdGNoZXNQcm9wZXJ0eSwgYXBwbHlQYXNzaXZlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XG5cbiAgc3RhdGljIGdldCBNQVRDSEVTICgpIHtcbiAgICAvKiBnbG9iYWwgSFRNTEVsZW1lbnQgKi9cbiAgICByZXR1cm4gUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxuICAgICAgKCBSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gIH1cblxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlIChyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3IgKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbih7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXG4gICAgICB9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXG4gICAgICB9LFxuICAgICAgYWRkQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgfSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KVxuICAgICAgfSxcbiAgICB9LCBvcHRpb25zKSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn0gICIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9Zm9ybUZpZWxkQ2xhc3NlcyBjbGFzcz1cIm1kYy1jaGVja2JveC13cmFwcGVyXCI+XG4gICAgPGRpdiByZWY9XCJyb290XCIgY2xhc3M9XCJtZGMtY2hlY2tib3hcIlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiA6c3R5bGU9XCJzdHlsZXNcIj5cbiAgICAgIDxpbnB1dCByZWY9XCJjb250cm9sXCIgOmlkPVwiX3VpZFwiIHR5cGU9XCJjaGVja2JveFwiIDpuYW1lPVwibmFtZVwiXG4gICAgICAgIGNsYXNzPVwibWRjLWNoZWNrYm94X19uYXRpdmUtY29udHJvbFwiIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgQGNoYW5nZT1cIm9uQ2hhbmdlXCIvPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1jaGVja2JveF9fYmFja2dyb3VuZFwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwibWRjLWNoZWNrYm94X19jaGVja21hcmtcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2hlY2tib3hfX2NoZWNrbWFyay1wYXRoXCJcbiAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgIGQ9XCJNMS43MywxMi45MSA4LjEsMTkuMjggMjIuNzksNC41OVwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZGMtY2hlY2tib3hfX21peGVkbWFya1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGxhYmVsIHJlZj1cImxhYmVsXCIgIDpmb3I9XCJfdWlkXCJcbiAgICA+PHNsb3Q+e3tsYWJlbH19PC9zbG90PjwvbGFiZWw+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbi8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuaW1wb3J0IE1EQ0NoZWNrYm94Rm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvY2hlY2tib3gvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDRm9ybUZpZWxkRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZm9ybS1maWVsZC9mb3VuZGF0aW9uJztcbmltcG9ydCB7IGdldENvcnJlY3RFdmVudE5hbWUgfSBmcm9tICdAbWF0ZXJpYWwvYW5pbWF0aW9uJztcbmltcG9ydCB7IERpc3BhdGNoRm9jdXNNaXhpbiB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgUmlwcGxlQmFzZSB9IGZyb20gJy4uL3JpcHBsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1jaGVja2JveCcsXG4gIG1peGluczogW0Rpc3BhdGNoRm9jdXNNaXhpbl0sXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ2NoZWNrZWQnLFxuICAgIGV2ZW50OiAnY2hhbmdlJyxcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBjaGVja2VkOiBCb29sZWFuLFxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICAnYWxpZ24tZW5kJzogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuICdvbic7XG4gICAgICB9LFxuICAgIH0sXG4gICAgbmFtZTogU3RyaW5nLFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdHlsZXM6IHt9LFxuICAgICAgY2xhc3Nlczoge30sXG4gICAgfTtcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBoYXNMYWJlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVsIHx8IHRoaXMuJHNsb3RzLmRlZmF1bHQ7XG4gICAgfSxcbiAgICBmb3JtRmllbGRDbGFzc2VzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ21kYy1mb3JtLWZpZWxkJzogdGhpcy5oYXNMYWJlbCxcbiAgICAgICAgJ21kYy1mb3JtLWZpZWxkLS1hbGlnbi1lbmQnOiB0aGlzLmhhc0xhYmVsICYmIHRoaXMuYWxpZ25FbmQsXG4gICAgICB9O1xuICAgIH0sXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY2hlY2tlZCh2YWx1ZSkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldENoZWNrZWQodmFsdWUpO1xuICAgIH0sXG4gICAgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh2YWx1ZSk7XG4gICAgfSxcbiAgICBpbmRldGVybWluYXRlKHZhbHVlKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0SW5kZXRlcm1pbmF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDQ2hlY2tib3hGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcbiAgICAgIHNldE5hdGl2ZUNvbnRyb2xBdHRyOiAoYXR0ciwgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5jb250cm9sLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlTmF0aXZlQ29udHJvbEF0dHI6IGF0dHIgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmNvbnRyb2wucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvdywgJ2FuaW1hdGlvbmVuZCcpLFxuICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICksXG4gICAgICBkZXJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvdywgJ2FuaW1hdGlvbmVuZCcpLFxuICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICksXG4gICAgICByZWdpc3RlckNoYW5nZUhhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5jb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckNoYW5nZUhhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5jb250cm9sLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZXIpLFxuICAgICAgZ2V0TmF0aXZlQ29udHJvbDogKCkgPT4gdGhpcy4kcmVmcy5jb250cm9sLFxuICAgICAgZm9yY2VMYXlvdXQ6ICgpID0+IHRoaXMuJHJlZnMucm9vdC5vZmZzZXRXaWR0aCxcbiAgICAgIGlzQXR0YWNoZWRUb0RPTTogKCkgPT4gQm9vbGVhbih0aGlzLiRlbC5wYXJlbnROb2RlKSxcbiAgICB9KTtcblxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcywge1xuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IFJpcHBsZUJhc2UuaXNTdXJmYWNlQWN0aXZlKHRoaXMuJHJlZnMuY29udHJvbCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpO1xuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5jb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKTtcbiAgICAgIH0sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZWZzLnJvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtRmllbGQgPSBuZXcgTURDRm9ybUZpZWxkRm91bmRhdGlvbih7XG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMubGFiZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbiAgICAgIH0sXG4gICAgICBhY3RpdmF0ZUlucHV0UmlwcGxlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucmlwcGxlICYmIHRoaXMucmlwcGxlLmFjdGl2YXRlKCk7XG4gICAgICB9LFxuICAgICAgZGVhY3RpdmF0ZUlucHV0UmlwcGxlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucmlwcGxlICYmIHRoaXMucmlwcGxlLmRlYWN0aXZhdGUoKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpO1xuICAgIHRoaXMucmlwcGxlLmluaXQoKTtcbiAgICB0aGlzLmZvcm1GaWVsZC5pbml0KCk7XG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldENoZWNrZWQodGhpcy5jaGVja2VkKTtcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldEluZGV0ZXJtaW5hdGUodGhpcy5pbmRldGVybWluYXRlKTtcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLmZvcm1GaWVsZC5kZXN0cm95KCk7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpO1xuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTppbmRldGVybWluYXRlJywgdGhpcy5mb3VuZGF0aW9uLmlzSW5kZXRlcm1pbmF0ZSgpKTtcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuZm91bmRhdGlvbi5pc0NoZWNrZWQoKSk7XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNDaGVja2JveCBmcm9tICcuL21kYy1jaGVja2JveC52dWUnXG5cbmV4cG9ydCB7XG4gIG1kY0NoZWNrYm94XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNDaGVja2JveFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJEaXNwYXRjaEZvY3VzTWl4aW4iLCJkYXRhIiwiaGFzRm9jdXMiLCJtZXRob2RzIiwib25Nb3VzZURvd24iLCJfYWN0aXZlIiwib25Nb3VzZVVwIiwib25Gb2N1c0V2ZW50Iiwic2V0VGltZW91dCIsImRpc3BhdGNoRm9jdXNFdmVudCIsIm9uQmx1ckV2ZW50IiwiJGVsIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY29udGFpbnMiLCIkZW1pdCIsIm1vdW50ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiYmVmb3JlRGVzdHJveSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDQ29tcG9uZW50Iiwicm9vdCIsImZvdW5kYXRpb24iLCJ1bmRlZmluZWQiLCJyb290XyIsImFyZ3MiLCJpbml0aWFsaXplIiwiZm91bmRhdGlvbl8iLCJnZXREZWZhdWx0Rm91bmRhdGlvbiIsImluaXQiLCJpbml0aWFsU3luY1dpdGhET00iLCJFcnJvciIsImRlc3Ryb3kiLCJldnRUeXBlIiwiaGFuZGxlciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJldnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJNRENSaXBwbGVBZGFwdGVyIiwiY2xhc3NOYW1lIiwidGFyZ2V0IiwidmFyTmFtZSIsInZhbHVlIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsInN0cmluZ3MiLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsImlzU3VwcG9ydGVkIiwicGFzc2l2ZSIsImUiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwieCIsInkiLCJkb2N1bWVudFgiLCJsZWZ0IiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFgiLCJub3JtYWxpemVkWSIsInR5cGUiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNvbnRhaW5zRXZlbnRUYXJnZXQiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJnZXRXaW5kb3dQYWdlT2Zmc2V0IiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJkZWZhdWx0QWRhcHRlciIsImxheW91dEZyYW1lXyIsImZyYW1lXyIsIndpZHRoIiwiaGVpZ2h0IiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJibHVySGFuZGxlcl8iLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsInVuYm91bmRlZENvb3Jkc18iLCJmZ1NjYWxlXyIsImFjdGl2YXRpb25UaW1lcl8iLCJmZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8iLCJhY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfIiwiYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfIiwicnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfIiwiaXNBY3RpdmF0ZWQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiYWN0aXZhdGlvbkV2ZW50IiwiaXNQcm9ncmFtbWF0aWMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJsYXlvdXRJbnRlcm5hbF8iLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsImZvckVhY2giLCJPYmplY3QiLCJrZXlzIiwiayIsImluZGV4T2YiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJsZW5ndGgiLCJzb21lIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicHVzaCIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwiZXZlbnQiLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJjbGVhclRpbWVvdXQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJtYXhEaW0iLCJNYXRoIiwibWF4IiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIk1EQ1JpcHBsZSIsImRpc2FibGVkIiwidW5ib3VuZGVkXyIsInNldFVuYm91bmRlZCIsImFjdGl2YXRlIiwiZGVhY3RpdmF0ZSIsImNyZWF0ZUFkYXB0ZXIiLCJkYXRhc2V0IiwiQm9vbGVhbiIsInNldFVuYm91bmRlZF8iLCJyaXBwbGUiLCJpbnN0YW5jZSIsIk1BVENIRVMiLCJ1dGlsIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIk1EQ1NlbGVjdGlvbkNvbnRyb2wiLCJNRENDaGVja2JveEFkYXB0ZXIiLCJhdHRyIiwiVVBHUkFERUQiLCJDSEVDS0VEIiwiSU5ERVRFUk1JTkFURSIsIkRJU0FCTEVEIiwiQU5JTV9VTkNIRUNLRURfQ0hFQ0tFRCIsIkFOSU1fVU5DSEVDS0VEX0lOREVURVJNSU5BVEUiLCJBTklNX0NIRUNLRURfVU5DSEVDS0VEIiwiQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEUiLCJBTklNX0lOREVURVJNSU5BVEVfQ0hFQ0tFRCIsIkFOSU1fSU5ERVRFUk1JTkFURV9VTkNIRUNLRUQiLCJOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUiIsIlRSQU5TSVRJT05fU1RBVEVfSU5JVCIsIlRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRCIsIlRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VEIiwiVFJBTlNJVElPTl9TVEFURV9JTkRFVEVSTUlOQVRFIiwiQVJJQV9DSEVDS0VEX0FUVFIiLCJBUklBX0NIRUNLRURfSU5ERVRFUk1JTkFURV9WQUxVRSIsIkFOSU1fRU5EX0xBVENIX01TIiwiQ0JfUFJPVE9fUFJPUFMiLCJNRENDaGVja2JveEZvdW5kYXRpb24iLCJzZXROYXRpdmVDb250cm9sQXR0ciIsInJlbW92ZU5hdGl2ZUNvbnRyb2xBdHRyIiwicmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyIiwiZGVyZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXIiLCJyZWdpc3RlckNoYW5nZUhhbmRsZXIiLCJkZXJlZ2lzdGVyQ2hhbmdlSGFuZGxlciIsImdldE5hdGl2ZUNvbnRyb2wiLCJmb3JjZUxheW91dCIsImlzQXR0YWNoZWRUb0RPTSIsImN1cnJlbnRDaGVja1N0YXRlXyIsImN1cnJlbnRBbmltYXRpb25DbGFzc18iLCJhbmltRW5kTGF0Y2hUaW1lcl8iLCJhbmltRW5kSGFuZGxlcl8iLCJoYW5kbGVBbmltYXRpb25FbmQiLCJjaGFuZ2VIYW5kbGVyXyIsImhhbmRsZUNoYW5nZSIsImRldGVybWluZUNoZWNrU3RhdGVfIiwiZ2V0TmF0aXZlQ29udHJvbF8iLCJpbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18iLCJ1bmluc3RhbGxQcm9wZXJ0eUNoYW5nZUhvb2tzXyIsImNoZWNrZWQiLCJpbmRldGVybWluYXRlIiwidHJhbnNpdGlvbkNoZWNrU3RhdGVfIiwibmF0aXZlQ2IiLCJjYlByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJjb250cm9sU3RhdGUiLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidmFsaWREZXNjcmlwdG9yIiwibmF0aXZlQ2JEZXNjIiwiZ2V0Iiwic2V0IiwiY2FsbCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIm9sZFN0YXRlIiwibmV3U3RhdGUiLCJpc0luZGV0ZXJtaW5hdGUiLCJnZXRUcmFuc2l0aW9uQW5pbWF0aW9uQ2xhc3NfIiwiaW5wdXRQcm9wRGVzYyIsIk1EQ0Zvcm1GaWVsZEFkYXB0ZXIiLCJMQUJFTF9TRUxFQ1RPUiIsIk1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24iLCJhY3RpdmF0ZUlucHV0UmlwcGxlIiwiZGVhY3RpdmF0ZUlucHV0UmlwcGxlIiwiY2xpY2tIYW5kbGVyXyIsImhhbmRsZUNsaWNrXyIsImV2ZW50VHlwZU1hcCIsIm5vUHJlZml4Iiwid2Via2l0UHJlZml4Iiwic3R5bGVQcm9wZXJ0eSIsImNzc1Byb3BlcnR5TWFwIiwiaGFzUHJvcGVyU2hhcGUiLCJldmVudEZvdW5kSW5NYXBzIiwiZXZlbnRUeXBlIiwiZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZSIsIm1hcCIsImVsIiwiZ2V0QW5pbWF0aW9uTmFtZSIsImV2ZW50TmFtZSIsImdldENvcnJlY3RFdmVudE5hbWUiLCJSaXBwbGVCYXNlIiwicmVmIiwiX21hdGNoZXMiLCJvcHRpb25zIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwic3R5bGVzIiwicmVuZGVyIiwibWl4aW5zIiwibW9kZWwiLCJwcm9wIiwicHJvcHMiLCJsYWJlbCIsIlN0cmluZyIsImRlZmF1bHQiLCJjb21wdXRlZCIsImhhc0xhYmVsIiwiJHNsb3RzIiwiZm9ybUZpZWxkQ2xhc3NlcyIsImFsaWduRW5kIiwid2F0Y2giLCJzZXRDaGVja2VkIiwic2V0RGlzYWJsZWQiLCJzZXRJbmRldGVybWluYXRlIiwiJHJlZnMiLCJjb250cm9sIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwib2Zmc2V0V2lkdGgiLCJwYXJlbnROb2RlIiwiZm9ybUZpZWxkIiwib25DaGFuZ2UiLCJpc0NoZWNrZWQiLCJtZGNDaGVja2JveCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0VBQ2hDO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJRixJQUFKLEVBQVU7RUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0VBQ0Q7RUFDRjs7RUNaTSxTQUFTTSxVQUFULENBQXFCQyxVQUFy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
