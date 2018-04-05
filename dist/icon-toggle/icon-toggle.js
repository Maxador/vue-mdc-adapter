/**
* @module vue-mdc-adaptericon-toggle 0.13.2
* @exports VueMDCIconToggle
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCIconToggle = factory());
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

    /* eslint no-unused-vars: [2, {"args": "none"}] */

    /**
     * Adapter for MDC Icon Toggle. Provides an interface for managing
     * - classes
     * - dom
     * - inner text
     * - event handlers
     * - event dispatch
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

    var MDCIconToggleAdapter = function () {
      function MDCIconToggleAdapter() {
        classCallCheck(this, MDCIconToggleAdapter);
      }

      createClass(MDCIconToggleAdapter, [{
        key: "addClass",

        /** @param {string} className */
        value: function addClass(className) {}

        /** @param {string} className */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * @param {string} type
         * @param {!EventListener} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(type, handler) {}

        /**
         * @param {string} type
         * @param {!EventListener} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(type, handler) {}

        /** @param {string} text */

      }, {
        key: "setText",
        value: function setText(text) {}

        /** @return {number} */

      }, {
        key: "getTabIndex",
        value: function getTabIndex() {}

        /** @param {number} tabIndex */

      }, {
        key: "setTabIndex",
        value: function setTabIndex(tabIndex) {}

        /**
         * @param {string} name
         * @return {string}
         */

      }, {
        key: "getAttr",
        value: function getAttr(name) {}

        /**
         * @param {string} name
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(name, value) {}

        /** @param {string} name */

      }, {
        key: "rmAttr",
        value: function rmAttr(name) {}

        /** @param {!IconToggleEvent} evtData */

      }, {
        key: "notifyChange",
        value: function notifyChange(evtData) {}
      }]);
      return MDCIconToggleAdapter;
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

    /** @enum {string} */
    var cssClasses = {
      ROOT: 'mdc-icon-toggle',
      DISABLED: 'mdc-icon-toggle--disabled'
    };

    /** @enum {string} */
    var strings = {
      DATA_TOGGLE_ON: 'data-toggle-on',
      DATA_TOGGLE_OFF: 'data-toggle-off',
      ARIA_PRESSED: 'aria-pressed',
      ARIA_DISABLED: 'aria-disabled',
      ARIA_LABEL: 'aria-label',
      CHANGE_EVENT: 'MDCIconToggle:change'
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
     * @extends {MDCFoundation<!MDCIconToggleAdapter>}
     */

    var MDCIconToggleFoundation = function (_MDCFoundation) {
      inherits(MDCIconToggleFoundation, _MDCFoundation);
      createClass(MDCIconToggleFoundation, null, [{
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
            setText: function setText() /* text: string */{},
            getTabIndex: function getTabIndex() {
              return (/* number */0
              );
            },
            setTabIndex: function setTabIndex() /* tabIndex: number */{},
            getAttr: function getAttr() {
              return (/* name: string */ /* string */''
              );
            },
            setAttr: function setAttr() /* name: string, value: string */{},
            rmAttr: function rmAttr() /* name: string */{},
            notifyChange: function notifyChange() /* evtData: IconToggleEvent */{}
          };
        }
      }]);

      function MDCIconToggleFoundation(adapter) {
        classCallCheck(this, MDCIconToggleFoundation);

        /** @private {boolean} */
        var _this = possibleConstructorReturn(this, (MDCIconToggleFoundation.__proto__ || Object.getPrototypeOf(MDCIconToggleFoundation)).call(this, _extends(MDCIconToggleFoundation.defaultAdapter, adapter)));

        _this.on_ = false;

        /** @private {boolean} */
        _this.disabled_ = false;

        /** @private {number} */
        _this.savedTabIndex_ = -1;

        /** @private {?IconToggleState} */
        _this.toggleOnData_ = null;

        /** @private {?IconToggleState} */
        _this.toggleOffData_ = null;

        _this.clickHandler_ = /** @private {!EventListener} */function () {
          return _this.toggleFromEvt_();
        };

        /** @private {boolean} */
        _this.isHandlingKeydown_ = false;

        _this.keydownHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
          if (isSpace(evt)) {
            _this.isHandlingKeydown_ = true;
            return evt.preventDefault();
          }
        };

        _this.keyupHandler_ = /** @private {!EventListener} */function ( /** @type {!KeyboardKey} */evt) {
          if (isSpace(evt)) {
            _this.isHandlingKeydown_ = false;
            _this.toggleFromEvt_();
          }
        };
        return _this;
      }

      createClass(MDCIconToggleFoundation, [{
        key: 'init',
        value: function init() {
          this.refreshToggleData();
          this.savedTabIndex_ = this.adapter_.getTabIndex();
          this.adapter_.registerInteractionHandler('click', this.clickHandler_);
          this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
          this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
        }
      }, {
        key: 'refreshToggleData',
        value: function refreshToggleData() {
          var _MDCIconToggleFoundat = MDCIconToggleFoundation.strings,
              DATA_TOGGLE_ON = _MDCIconToggleFoundat.DATA_TOGGLE_ON,
              DATA_TOGGLE_OFF = _MDCIconToggleFoundat.DATA_TOGGLE_OFF;

          this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
          this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
          this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
          this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
        }

        /** @private */

      }, {
        key: 'toggleFromEvt_',
        value: function toggleFromEvt_() {
          this.toggle();
          var isOn = this.on_;

          this.adapter_.notifyChange( /** @type {!IconToggleEvent} */{ isOn: isOn });
        }

        /** @return {boolean} */

      }, {
        key: 'isOn',
        value: function isOn() {
          return this.on_;
        }

        /** @param {boolean=} isOn */

      }, {
        key: 'toggle',
        value: function toggle() {
          var isOn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.on_;

          this.on_ = isOn;

          var _MDCIconToggleFoundat2 = MDCIconToggleFoundation.strings,
              ARIA_LABEL = _MDCIconToggleFoundat2.ARIA_LABEL,
              ARIA_PRESSED = _MDCIconToggleFoundat2.ARIA_PRESSED;


          if (this.on_) {
            this.adapter_.setAttr(ARIA_PRESSED, 'true');
          } else {
            this.adapter_.setAttr(ARIA_PRESSED, 'false');
          }

          var _ref = this.on_ ? this.toggleOffData_ : this.toggleOnData_,
              classToRemove = _ref.cssClass;

          if (classToRemove) {
            this.adapter_.removeClass(classToRemove);
          }

          var _ref2 = this.on_ ? this.toggleOnData_ : this.toggleOffData_,
              content = _ref2.content,
              label = _ref2.label,
              cssClass = _ref2.cssClass;

          if (cssClass) {
            this.adapter_.addClass(cssClass);
          }
          if (content) {
            this.adapter_.setText(content);
          }
          if (label) {
            this.adapter_.setAttr(ARIA_LABEL, label);
          }
        }

        /**
         * @param {string} dataAttr
         * @return {!IconToggleState}
         */

      }, {
        key: 'parseJsonDataAttr_',
        value: function parseJsonDataAttr_(dataAttr) {
          var val = this.adapter_.getAttr(dataAttr);
          if (!val) {
            return {};
          }
          return (/** @type {!IconToggleState} */JSON.parse(val)
          );
        }

        /** @return {boolean} */

      }, {
        key: 'isDisabled',
        value: function isDisabled() {
          return this.disabled_;
        }

        /** @param {boolean} isDisabled */

      }, {
        key: 'setDisabled',
        value: function setDisabled(isDisabled) {
          this.disabled_ = isDisabled;

          var DISABLED = MDCIconToggleFoundation.cssClasses.DISABLED;
          var ARIA_DISABLED = MDCIconToggleFoundation.strings.ARIA_DISABLED;


          if (this.disabled_) {
            this.savedTabIndex_ = this.adapter_.getTabIndex();
            this.adapter_.setTabIndex(-1);
            this.adapter_.setAttr(ARIA_DISABLED, 'true');
            this.adapter_.addClass(DISABLED);
          } else {
            this.adapter_.setTabIndex(this.savedTabIndex_);
            this.adapter_.rmAttr(ARIA_DISABLED);
            this.adapter_.removeClass(DISABLED);
          }
        }

        /** @return {boolean} */

      }, {
        key: 'isKeyboardActivated',
        value: function isKeyboardActivated() {
          return this.isHandlingKeydown_;
        }
      }]);
      return MDCIconToggleFoundation;
    }(MDCFoundation);

    /**
     * @param {!KeyboardKey} keyboardKey
     * @return {boolean}
     */
    function isSpace(keyboardKey) {
      return keyboardKey.key === 'Space' || keyboardKey.keyCode === 32;
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

    var mdcIConToggle = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "mdc-icon-toggle", class: _vm.classes, style: _vm.styles, attrs: { "role": "button", "aria-pressed": "false", "tabindex": _vm.tabIndex, "data-toggle-on": _vm.toggleOnData, "data-toggle-off": _vm.toggleOffData } }, [_c('i', { class: _vm.iconClasses, attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.text))])]);
      }, staticRenderFns: [],
      name: 'mdc-icon-toggle',
      props: {
        toggleOn: [String, Object],
        toggleOff: [String, Object],
        value: Boolean,
        disabled: Boolean,
        accent: Boolean
      },
      data: function data() {
        return {
          classes: {
            'mdc-icon-toggle--accent': this.accent
          },
          styles: {},
          iconClasses: {},
          tabIndex: 0,
          text: ''
        };
      },

      watch: {
        value: function value(_value) {
          this.foundation && this.foundation.toggle(_value);
        },
        disabled: function disabled(_disabled) {
          this.foundation && this.foundation.setDisabled(_disabled);
        },
        toggleOnData: function toggleOnData() {
          this.foundation && this.foundation.refreshToggleData();
        },
        toggleOffData: function toggleOffData() {
          this.foundation && this.foundation.refreshToggleData();
        },
        accent: function accent(value) {
          this.$set(this.classes, 'mdc-icon-toggle--secondary', value);
        }
      },
      computed: {
        toggleOnData: function toggleOnData() {
          var toggle = this.toggleOn;
          return toggle && JSON.stringify(typeof toggle === 'string' ? {
            content: toggle,
            cssClass: 'material-icons'
          } : {
            content: toggle.icon || toggle.content,
            label: toggle.label,
            cssClass: toggle.icon ? 'material-icons' : toggle.cssClass
          });
        },
        toggleOffData: function toggleOffData() {
          var toggle = this.toggleOff;
          return toggle && JSON.stringify(typeof toggle === 'string' ? {
            content: toggle,
            cssClass: 'material-icons'
          } : {
            content: toggle.icon || toggle.content,
            label: toggle.label,
            cssClass: toggle.icon ? 'material-icons' : toggle.cssClass
          });
        }
      },
      mounted: function mounted() {
        var _this = this;

        this.foundation = new MDCIconToggleFoundation({
          addClass: function addClass(className) {
            return _this.$set(_this.iconClasses, className, true);
          },
          removeClass: function removeClass(className) {
            return _this.$delete(_this.iconClasses, className);
          },
          registerInteractionHandler: function registerInteractionHandler(evt, handler) {
            return _this.$el.addEventListener(evt, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
            return _this.$el.removeEventListener(evt, handler);
          },
          setText: function setText(text) {
            _this.text = text;
          },
          getTabIndex: function getTabIndex() {
            return _this.tabIndex;
          },
          setTabIndex: function setTabIndex(tabIndex) {
            _this.tabIndex = tabIndex;
          },
          getAttr: function getAttr(name, value) {
            return _this.$el.getAttribute(name, value);
          },
          setAttr: function setAttr(name, value) {
            _this.$el.setAttribute(name, value);
          },
          rmAttr: function rmAttr(name) {
            _this.$el.removeAttribute(name);
          },
          notifyChange: function notifyChange(evtData) {
            _this.$emit('input', evtData.isOn);
          }
        });
        this.foundation.init();
        this.foundation.toggle(this.value);
        this.foundation.setDisabled(this.disabled);

        this.ripple = new RippleBase(this, {
          isUnbounded: function isUnbounded() {
            return true;
          },
          isSurfaceActive: function isSurfaceActive() {
            return _this.foundation.isKeyboardActivated();
          }
        });
        this.ripple.init();
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation.destroy();
        this.ripple.destroy();
      }
    };

    var plugin = BasePlugin({
      mdcIConToggle: mdcIConToggle
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi10b2dnbGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2ljb24tdG9nZ2xlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2ljb24tdG9nZ2xlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvaWNvbi10b2dnbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvaWNvbi10b2dnbGUvbWRjLWljb24tdG9nZ2xlLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvaWNvbi10b2dnbGUvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL2ljb24tdG9nZ2xlL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50IChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBJY29uIFRvZ2dsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBpbm5lciB0ZXh0XG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIGV2ZW50IGRpc3BhdGNoXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5cbmNsYXNzIE1EQ0ljb25Ub2dnbGVBZGFwdGVyIHtcbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHshRXZlbnRMaXN0ZW5lcn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAqL1xuICBzZXRUZXh0KHRleHQpIHt9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0VGFiSW5kZXgoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge251bWJlcn0gdGFiSW5kZXggKi9cbiAgc2V0VGFiSW5kZXgodGFiSW5kZXgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGdldEF0dHIobmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRBdHRyKG5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAqL1xuICBybUF0dHIobmFtZSkge31cblxuICAvKiogQHBhcmFtIHshSWNvblRvZ2dsZUV2ZW50fSBldnREYXRhICovXG4gIG5vdGlmeUNoYW5nZShldnREYXRhKSB7fVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBpc09uOiBib29sZWFuLFxuICogfX1cbiAqL1xubGV0IEljb25Ub2dnbGVFdmVudDtcblxuZXhwb3J0IHtNRENJY29uVG9nZ2xlQWRhcHRlciwgSWNvblRvZ2dsZUV2ZW50fTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtaWNvbi10b2dnbGUnLFxuICBESVNBQkxFRDogJ21kYy1pY29uLXRvZ2dsZS0tZGlzYWJsZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBEQVRBX1RPR0dMRV9PTjogJ2RhdGEtdG9nZ2xlLW9uJyxcbiAgREFUQV9UT0dHTEVfT0ZGOiAnZGF0YS10b2dnbGUtb2ZmJyxcbiAgQVJJQV9QUkVTU0VEOiAnYXJpYS1wcmVzc2VkJyxcbiAgQVJJQV9ESVNBQkxFRDogJ2FyaWEtZGlzYWJsZWQnLFxuICBBUklBX0xBQkVMOiAnYXJpYS1sYWJlbCcsXG4gIENIQU5HRV9FVkVOVDogJ01EQ0ljb25Ub2dnbGU6Y2hhbmdlJyxcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtNRENJY29uVG9nZ2xlQWRhcHRlciwgSWNvblRvZ2dsZUV2ZW50fSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0ljb25Ub2dnbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDSWNvblRvZ2dsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgc2V0VGV4dDogKC8qIHRleHQ6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBnZXRUYWJJbmRleDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBzZXRUYWJJbmRleDogKC8qIHRhYkluZGV4OiBudW1iZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0QXR0cjogKC8qIG5hbWU6IHN0cmluZyAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgc2V0QXR0cjogKC8qIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBybUF0dHI6ICgvKiBuYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoLyogZXZ0RGF0YTogSWNvblRvZ2dsZUV2ZW50ICovKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDSWNvblRvZ2dsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLm9uXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNhdmVkVGFiSW5kZXhfID0gLTE7XG5cbiAgICAvKiogQHByaXZhdGUgez9JY29uVG9nZ2xlU3RhdGV9ICovXG4gICAgdGhpcy50b2dnbGVPbkRhdGFfID0gbnVsbDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0ljb25Ub2dnbGVTdGF0ZX0gKi9cbiAgICB0aGlzLnRvZ2dsZU9mZkRhdGFfID0gbnVsbDtcblxuICAgIHRoaXMuY2xpY2tIYW5kbGVyXyA9IC8qKiBAcHJpdmF0ZSB7IUV2ZW50TGlzdGVuZXJ9ICovIChcbiAgICAgICgpID0+IHRoaXMudG9nZ2xlRnJvbUV2dF8oKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc0hhbmRsaW5nS2V5ZG93bl8gPSBmYWxzZTtcblxuICAgIHRoaXMua2V5ZG93bkhhbmRsZXJfID0gLyoqIEBwcml2YXRlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKCgvKiogQHR5cGUgeyFLZXlib2FyZEtleX0gKi8gZXZ0KSA9PiB7XG4gICAgICBpZiAoaXNTcGFjZShldnQpKSB7XG4gICAgICAgIHRoaXMuaXNIYW5kbGluZ0tleWRvd25fID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5rZXl1cEhhbmRsZXJfID0gLyoqIEBwcml2YXRlIHshRXZlbnRMaXN0ZW5lcn0gKi8gKCgvKiogQHR5cGUgeyFLZXlib2FyZEtleX0gKi8gZXZ0KSA9PiB7XG4gICAgICBpZiAoaXNTcGFjZShldnQpKSB7XG4gICAgICAgIHRoaXMuaXNIYW5kbGluZ0tleWRvd25fID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9nZ2xlRnJvbUV2dF8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5yZWZyZXNoVG9nZ2xlRGF0YSgpO1xuICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRhYkluZGV4KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmtleXVwSGFuZGxlcl8pO1xuICB9XG5cbiAgcmVmcmVzaFRvZ2dsZURhdGEoKSB7XG4gICAgY29uc3Qge0RBVEFfVE9HR0xFX09OLCBEQVRBX1RPR0dMRV9PRkZ9ID0gTURDSWNvblRvZ2dsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICB0aGlzLnRvZ2dsZU9uRGF0YV8gPSB0aGlzLnBhcnNlSnNvbkRhdGFBdHRyXyhEQVRBX1RPR0dMRV9PTik7XG4gICAgdGhpcy50b2dnbGVPZmZEYXRhXyA9IHRoaXMucGFyc2VKc29uRGF0YUF0dHJfKERBVEFfVE9HR0xFX09GRik7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5rZXl1cEhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB0b2dnbGVGcm9tRXZ0XygpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIGNvbnN0IHtvbl86IGlzT259ID0gdGhpcztcbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSgvKiogQHR5cGUgeyFJY29uVG9nZ2xlRXZlbnR9ICovICh7aXNPbn0pKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc09uKCkge1xuICAgIHJldHVybiB0aGlzLm9uXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW49fSBpc09uICovXG4gIHRvZ2dsZShpc09uID0gIXRoaXMub25fKSB7XG4gICAgdGhpcy5vbl8gPSBpc09uO1xuXG4gICAgY29uc3Qge0FSSUFfTEFCRUwsIEFSSUFfUFJFU1NFRH0gPSBNRENJY29uVG9nZ2xlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgaWYgKHRoaXMub25fKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoQVJJQV9QUkVTU0VELCAndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoQVJJQV9QUkVTU0VELCAnZmFsc2UnKTtcbiAgICB9XG5cbiAgICBjb25zdCB7Y3NzQ2xhc3M6IGNsYXNzVG9SZW1vdmV9ID1cbiAgICAgICAgdGhpcy5vbl8gPyB0aGlzLnRvZ2dsZU9mZkRhdGFfIDogdGhpcy50b2dnbGVPbkRhdGFfO1xuXG4gICAgaWYgKGNsYXNzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY2xhc3NUb1JlbW92ZSk7XG4gICAgfVxuXG4gICAgY29uc3Qge2NvbnRlbnQsIGxhYmVsLCBjc3NDbGFzc30gPSB0aGlzLm9uXyA/IHRoaXMudG9nZ2xlT25EYXRhXyA6IHRoaXMudG9nZ2xlT2ZmRGF0YV87XG5cbiAgICBpZiAoY3NzQ2xhc3MpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3MpO1xuICAgIH1cbiAgICBpZiAoY29udGVudCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUZXh0KGNvbnRlbnQpO1xuICAgIH1cbiAgICBpZiAobGFiZWwpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihBUklBX0xBQkVMLCBsYWJlbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhQXR0clxuICAgKiBAcmV0dXJuIHshSWNvblRvZ2dsZVN0YXRlfVxuICAgKi9cbiAgcGFyc2VKc29uRGF0YUF0dHJfKGRhdGFBdHRyKSB7XG4gICAgY29uc3QgdmFsID0gdGhpcy5hZGFwdGVyXy5nZXRBdHRyKGRhdGFBdHRyKTtcbiAgICBpZiAoIXZhbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gLyoqIEB0eXBlIHshSWNvblRvZ2dsZVN0YXRlfSAqLyAoSlNPTi5wYXJzZSh2YWwpKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGlzYWJsZWQgKi9cbiAgc2V0RGlzYWJsZWQoaXNEaXNhYmxlZCkge1xuICAgIHRoaXMuZGlzYWJsZWRfID0gaXNEaXNhYmxlZDtcblxuICAgIGNvbnN0IHtESVNBQkxFRH0gPSBNRENJY29uVG9nZ2xlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtBUklBX0RJU0FCTEVEfSA9IE1EQ0ljb25Ub2dnbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgIHRoaXMuc2F2ZWRUYWJJbmRleF8gPSB0aGlzLmFkYXB0ZXJfLmdldFRhYkluZGV4KCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFRhYkluZGV4KC0xKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cihBUklBX0RJU0FCTEVELCAndHJ1ZScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhESVNBQkxFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0VGFiSW5kZXgodGhpcy5zYXZlZFRhYkluZGV4Xyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJtQXR0cihBUklBX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRElTQUJMRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0tleWJvYXJkQWN0aXZhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLmlzSGFuZGxpbmdLZXlkb3duXztcbiAgfVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBrZXk6IHN0cmluZyxcbiAqICAga2V5Q29kZTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgS2V5Ym9hcmRLZXk7XG5cbi8qKlxuICogQHBhcmFtIHshS2V5Ym9hcmRLZXl9IGtleWJvYXJkS2V5XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1NwYWNlKGtleWJvYXJkS2V5KSB7XG4gIHJldHVybiBrZXlib2FyZEtleS5rZXkgPT09ICdTcGFjZScgfHwga2V5Ym9hcmRLZXkua2V5Q29kZSA9PT0gMzI7XG59XG5cblxuLyoqIEByZWNvcmQgKi9cbmNsYXNzIEljb25Ub2dnbGVTdGF0ZSB7fVxuXG4vKipcbiAqIFRoZSBhcmlhLWxhYmVsIHZhbHVlIG9mIHRoZSBpY29uIHRvZ2dsZSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vIGFyaWEtbGFiZWwuXG4gKiBAZXhwb3J0IHtzdHJpbmd8dW5kZWZpbmVkfVxuICovXG5JY29uVG9nZ2xlU3RhdGUucHJvdG90eXBlLmxhYmVsO1xuXG4vKipcbiAqIFRoZSB0ZXh0IGZvciB0aGUgaWNvbiB0b2dnbGUsIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBubyB0ZXh0LlxuICogQGV4cG9ydCB7c3RyaW5nfHVuZGVmaW5lZH1cbiAqL1xuSWNvblRvZ2dsZVN0YXRlLnByb3RvdHlwZS5jb250ZW50O1xuXG4vKipcbiAqIFRoZSBDU1MgY2xhc3MgdG8gYWRkIHRvIHRoZSBpY29uIHRvZ2dsZSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vIENTUyBjbGFzcy5cbiAqIEBleHBvcnQge3N0cmluZ3x1bmRlZmluZWR9XG4gKi9cbkljb25Ub2dnbGVTdGF0ZS5wcm90b3R5cGUuY3NzQ2xhc3M7XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ljb25Ub2dnbGVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58e3Bhc3NpdmU6IGJvb2xlYW59fVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV8gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHshQXJyYXk8c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIHJldHVybiBbXG4gICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvcicsICdtYXRjaGVzJyxcbiAgXS5maWx0ZXIoKHApID0+IHAgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpLnBvcCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHshe3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7IXt4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiBFdmVudCxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5kZWFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgKCkgPT4gdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRClcbiAgICApO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICgpID0+IHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpXG4gICAgKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshe2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RXZlbnR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzU3VwcG9ydGVkXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogbnVsbCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB9XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAoIXRoaXMuaXNTdXBwb3J0ZWRfKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSBudWxsO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID1cbiAgICAgIGUgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZSgodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgd3JhcHBlZCBpbiBhbiByQUYgY2FsbCBiL2Mgd2ViIGJyb3dzZXJzXG4gICAgICAvLyByZXBvcnQgYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpblxuICAgICAgLy8gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKGUpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICBjb25zdCBldnRPYmplY3QgPSBudWxsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZXZ0T2JqZWN0LCBzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBkZWFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwge3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gbWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsImltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcydcbmltcG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGdldE1hdGNoZXNQcm9wZXJ0eSwgYXBwbHlQYXNzaXZlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnXG5cbmV4cG9ydCBjbGFzcyBSaXBwbGVCYXNlIGV4dGVuZHMgTURDUmlwcGxlRm91bmRhdGlvbiB7XG5cbiAgc3RhdGljIGdldCBNQVRDSEVTICgpIHtcbiAgICAvKiBnbG9iYWwgSFRNTEVsZW1lbnQgKi9cbiAgICByZXR1cm4gUmlwcGxlQmFzZS5fbWF0Y2hlcyB8fFxuICAgICAgKCBSaXBwbGVCYXNlLl9tYXRjaGVzID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSkpXG4gIH1cblxuICBzdGF0aWMgaXNTdXJmYWNlQWN0aXZlIChyZWYpIHtcbiAgICByZXR1cm4gcmVmW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICB9XG5cbiAgY29uc3RydWN0b3IgKHZtLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbih7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpXG4gICAgICB9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS4kZWxbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gICAgICB9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLmRpc2FibGVkXG4gICAgICB9LFxuICAgICAgYWRkQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICB2bS4kc2V0KHZtLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHZtLiRkZWxldGUodm0uY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IHZtLiRlbC5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdm0uJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgdm0uJHNldCh2bS5zdHlsZXMsIHZhck5hbWUsIHZhbHVlKVxuICAgICAgfSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgfSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KVxuICAgICAgfSxcbiAgICB9LCBvcHRpb25zKSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUmlwcGxlTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5yaXBwbGUuZGVzdHJveSgpXG4gIH1cbn0gICIsIjx0ZW1wbGF0ZT5cbiAgPHNwYW4gY2xhc3M9XCJtZGMtaWNvbi10b2dnbGVcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1wcmVzc2VkPVwiZmFsc2VcIlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiA6c3R5bGU9XCJzdHlsZXNcIlxuICAgIDp0YWJpbmRleD1cInRhYkluZGV4XCJcbiAgICA6ZGF0YS10b2dnbGUtb249XCJ0b2dnbGVPbkRhdGFcIlxuICAgIDpkYXRhLXRvZ2dsZS1vZmY9XCJ0b2dnbGVPZmZEYXRhXCI+XG4gICAgPGkgOmNsYXNzPVwiaWNvbkNsYXNzZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57e3RleHR9fTwvaT5cbiAgPC9zcGFuPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENJY29uVG9nZ2xlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvaWNvbi10b2dnbGUvZm91bmRhdGlvbidcbmltcG9ydCB7UmlwcGxlQmFzZX0gZnJvbSAnLi4vcmlwcGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtaWNvbi10b2dnbGUnLFxuICBwcm9wczoge1xuICAgIHRvZ2dsZU9uOiBbU3RyaW5nLCBPYmplY3RdLFxuICAgIHRvZ2dsZU9mZjogW1N0cmluZywgT2JqZWN0XSxcbiAgICB2YWx1ZTogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBhY2NlbnQ6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1pY29uLXRvZ2dsZS0tYWNjZW50JzogdGhpcy5hY2NlbnRcbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHt9LFxuICAgICAgaWNvbkNsYXNzZXM6IHt9LFxuICAgICAgdGFiSW5kZXg6IDAsXG4gICAgICB0ZXh0OiAnJyxcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWUgKHZhbHVlKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLnRvZ2dsZSh2YWx1ZSlcbiAgICB9LFxuICAgIGRpc2FibGVkIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZChkaXNhYmxlZClcbiAgICB9LFxuICAgIHRvZ2dsZU9uRGF0YSAoKSB7XG4gICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24ucmVmcmVzaFRvZ2dsZURhdGEoKVxuICAgIH0sXG4gICAgdG9nZ2xlT2ZmRGF0YSAoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5yZWZyZXNoVG9nZ2xlRGF0YSgpXG4gICAgfSxcbiAgICBhY2NlbnQgKHZhbHVlKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCAnbWRjLWljb24tdG9nZ2xlLS1zZWNvbmRhcnknLCB2YWx1ZSlcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHRvZ2dsZU9uRGF0YSAoKSB7XG4gICAgICBsZXQgdG9nZ2xlID0gdGhpcy50b2dnbGVPblxuICAgICAgcmV0dXJuIHRvZ2dsZSAmJiBKU09OLnN0cmluZ2lmeSgodHlwZW9mIHRvZ2dsZSA9PT0gJ3N0cmluZycpID8geyBcbiAgICAgICAgY29udGVudDogdG9nZ2xlLCBcbiAgICAgICAgY3NzQ2xhc3M6ICdtYXRlcmlhbC1pY29ucycgXG4gICAgICB9IDoge1xuICAgICAgICBjb250ZW50OiB0b2dnbGUuaWNvbiB8fCB0b2dnbGUuY29udGVudCxcbiAgICAgICAgbGFiZWw6IHRvZ2dsZS5sYWJlbCxcbiAgICAgICAgY3NzQ2xhc3M6IHRvZ2dsZS5pY29uID8gJ21hdGVyaWFsLWljb25zJyA6IHRvZ2dsZS5jc3NDbGFzc1xuICAgICAgfSlcbiAgICB9ICxcbiAgICB0b2dnbGVPZmZEYXRhICgpIHtcbiAgICAgIGxldCB0b2dnbGUgPSB0aGlzLnRvZ2dsZU9mZlxuICAgICAgcmV0dXJuIHRvZ2dsZSAmJiBKU09OLnN0cmluZ2lmeSgodHlwZW9mIHRvZ2dsZSA9PT0gJ3N0cmluZycpID8geyBcbiAgICAgICAgY29udGVudDogdG9nZ2xlLCBcbiAgICAgICAgY3NzQ2xhc3M6ICdtYXRlcmlhbC1pY29ucycgXG4gICAgICB9IDoge1xuICAgICAgICBjb250ZW50OiB0b2dnbGUuaWNvbiB8fCB0b2dnbGUuY29udGVudCxcbiAgICAgICAgbGFiZWw6IHRvZ2dsZS5sYWJlbCxcbiAgICAgICAgY3NzQ2xhc3M6IHRvZ2dsZS5pY29uID8gJ21hdGVyaWFsLWljb25zJyA6IHRvZ2dsZS5jc3NDbGFzc1xuICAgICAgfSlcbiAgICB9LFxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDSWNvblRvZ2dsZUZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuJHNldCh0aGlzLmljb25DbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmljb25DbGFzc2VzLCBjbGFzc05hbWUpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnQsIGhhbmRsZXIpID0+XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyKSxcbiAgICAgIHNldFRleHQ6ICh0ZXh0KSA9PiB7IHRoaXMudGV4dCA9IHRleHQgfSxcbiAgICAgIGdldFRhYkluZGV4OiAoKSA9PiB0aGlzLnRhYkluZGV4LFxuICAgICAgc2V0VGFiSW5kZXg6ICh0YWJJbmRleCkgPT4geyB0aGlzLnRhYkluZGV4ID0gdGFiSW5kZXggfSxcbiAgICAgIGdldEF0dHI6IChuYW1lLCB2YWx1ZSkgPT4gdGhpcy4kZWwuZ2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSxcbiAgICAgIHNldEF0dHI6IChuYW1lLCB2YWx1ZSkgPT4geyB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIH0sXG4gICAgICBybUF0dHI6IChuYW1lKSA9PiB7IHRoaXMuJGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoZXZ0RGF0YSkgPT4geyB0aGlzLiRlbWl0KCdpbnB1dCcsIGV2dERhdGEuaXNPbikgfVxuICAgIH0pXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIHRoaXMuZm91bmRhdGlvbi50b2dnbGUodGhpcy52YWx1ZSlcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZClcblxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcywge1xuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHRoaXMuZm91bmRhdGlvbi5pc0tleWJvYXJkQWN0aXZhdGVkKCksXG4gICAgfSlcbiAgICB0aGlzLnJpcHBsZS5pbml0KClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKVxuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNJQ29uVG9nZ2xlIGZyb20gJy4vbWRjLWljb24tdG9nZ2xlLnZ1ZSdcblxuZXhwb3J0IHtcbiAgbWRjSUNvblRvZ2dsZVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUGx1Z2luKHtcbiAgbWRjSUNvblRvZ2dsZVxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDSWNvblRvZ2dsZUFkYXB0ZXIiLCJjbGFzc05hbWUiLCJ0eXBlIiwiaGFuZGxlciIsInRleHQiLCJ0YWJJbmRleCIsInZhbHVlIiwiZXZ0RGF0YSIsImNzc0NsYXNzZXMiLCJST09UIiwiRElTQUJMRUQiLCJzdHJpbmdzIiwiREFUQV9UT0dHTEVfT04iLCJEQVRBX1RPR0dMRV9PRkYiLCJBUklBX1BSRVNTRUQiLCJBUklBX0RJU0FCTEVEIiwiQVJJQV9MQUJFTCIsIkNIQU5HRV9FVkVOVCIsIk1EQ0ljb25Ub2dnbGVGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInNldFRleHQiLCJnZXRUYWJJbmRleCIsInNldFRhYkluZGV4IiwiZ2V0QXR0ciIsInNldEF0dHIiLCJybUF0dHIiLCJub3RpZnlDaGFuZ2UiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwib25fIiwiZGlzYWJsZWRfIiwic2F2ZWRUYWJJbmRleF8iLCJ0b2dnbGVPbkRhdGFfIiwidG9nZ2xlT2ZmRGF0YV8iLCJjbGlja0hhbmRsZXJfIiwidG9nZ2xlRnJvbUV2dF8iLCJpc0hhbmRsaW5nS2V5ZG93bl8iLCJrZXlkb3duSGFuZGxlcl8iLCJldnQiLCJpc1NwYWNlIiwicHJldmVudERlZmF1bHQiLCJrZXl1cEhhbmRsZXJfIiwicmVmcmVzaFRvZ2dsZURhdGEiLCJwYXJzZUpzb25EYXRhQXR0cl8iLCJ0b2dnbGUiLCJpc09uIiwiY2xhc3NUb1JlbW92ZSIsImNzc0NsYXNzIiwiY29udGVudCIsImxhYmVsIiwiZGF0YUF0dHIiLCJ2YWwiLCJKU09OIiwicGFyc2UiLCJpc0Rpc2FibGVkIiwia2V5Ym9hcmRLZXkiLCJrZXlDb2RlIiwiTURDUmlwcGxlQWRhcHRlciIsInRhcmdldCIsImV2dFR5cGUiLCJ2YXJOYW1lIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwiZG9jdW1lbnQiLCJub2RlIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVkU3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJyZW1vdmUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsImZvcmNlUmVmcmVzaCIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiQ1NTIiwic3VwcG9ydHMiLCJleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIiwid2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzIiwiYXBwbHlQYXNzaXZlIiwiZ2xvYmFsT2JqIiwidW5kZWZpbmVkIiwiaXNTdXBwb3J0ZWQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsImUiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwieCIsInkiLCJkb2N1bWVudFgiLCJsZWZ0IiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFgiLCJub3JtYWxpemVkWSIsImNoYW5nZWRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIkFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsImFjdGl2YXRlZFRhcmdldHMiLCJNRENSaXBwbGVGb3VuZGF0aW9uIiwiYnJvd3NlclN1cHBvcnRzQ3NzVmFycyIsImlzVW5ib3VuZGVkIiwiaXNTdXJmYWNlQWN0aXZlIiwiaXNTdXJmYWNlRGlzYWJsZWQiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwidXBkYXRlQ3NzVmFyaWFibGUiLCJjb21wdXRlQm91bmRpbmdSZWN0IiwiZ2V0V2luZG93UGFnZU9mZnNldCIsImxheW91dEZyYW1lXyIsImZyYW1lXyIsIndpZHRoIiwiaGVpZ2h0IiwiYWN0aXZhdGlvblN0YXRlXyIsImRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfIiwiaW5pdGlhbFNpemVfIiwibWF4UmFkaXVzXyIsImFjdGl2YXRlSGFuZGxlcl8iLCJhY3RpdmF0ZV8iLCJkZWFjdGl2YXRlSGFuZGxlcl8iLCJkZWFjdGl2YXRlXyIsImZvY3VzSGFuZGxlcl8iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJibHVySGFuZGxlcl8iLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsInVuYm91bmRlZENvb3Jkc18iLCJmZ1NjYWxlXyIsImFjdGl2YXRpb25UaW1lcl8iLCJmZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8iLCJhY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfIiwiYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfIiwicnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfIiwiaXNBY3RpdmF0ZWQiLCJoYXNEZWFjdGl2YXRpb25VWFJ1biIsIndhc0FjdGl2YXRlZEJ5UG9pbnRlciIsIndhc0VsZW1lbnRNYWRlQWN0aXZlIiwiYWN0aXZhdGlvbkV2ZW50IiwiaXNQcm9ncmFtbWF0aWMiLCJpc1N1cHBvcnRlZF8iLCJyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJsYXlvdXRJbnRlcm5hbF8iLCJkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJyZW1vdmVDc3NWYXJzXyIsImZvckVhY2giLCJPYmplY3QiLCJrZXlzIiwiayIsImluZGV4T2YiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJsZW5ndGgiLCJzb21lIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicHVzaCIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwiZXZlbnQiLCJ0cmFuc2xhdGVTdGFydCIsInRyYW5zbGF0ZUVuZCIsImdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18iLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJjbGVhclRpbWVvdXQiLCJybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18iLCJzZXRUaW1lb3V0IiwiYWN0aXZhdGlvbkhhc0VuZGVkIiwic3RhdGUiLCJldnRPYmplY3QiLCJhbmltYXRlRGVhY3RpdmF0aW9uXyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibWF4RGltIiwiTWF0aCIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJGVsIiwiZGlzYWJsZWQiLCIkc2V0IiwiY2xhc3NlcyIsIiRkZWxldGUiLCJjb250YWlucyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwicmVuZGVyIiwicHJvcHMiLCJ0b2dnbGVPbiIsIlN0cmluZyIsInRvZ2dsZU9mZiIsIkJvb2xlYW4iLCJhY2NlbnQiLCJkYXRhIiwiaWNvbkNsYXNzZXMiLCJ3YXRjaCIsImZvdW5kYXRpb24iLCJzZXREaXNhYmxlZCIsInRvZ2dsZU9uRGF0YSIsInRvZ2dsZU9mZkRhdGEiLCJjb21wdXRlZCIsInN0cmluZ2lmeSIsImljb24iLCJtb3VudGVkIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiJGVtaXQiLCJpbml0IiwicmlwcGxlIiwiaXNLZXlib2FyZEFjdGl2YXRlZCIsImJlZm9yZURlc3Ryb3kiLCJkZXN0cm95IiwibWRjSUNvblRvZ2dsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0lBQ2hDO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0lBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUN4QztJQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0lBQ0Q7SUFDRCxNQUFJRixJQUFKLEVBQVU7SUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0lBQ0Q7SUFDRjs7SUNaTSxTQUFTTSxVQUFULENBQXFCQyxVQUFyQixFQUFpQztJQUN0QyxTQUFPO0lBQ0xDLGFBQVMsUUFESjtJQUVMQyxhQUFTLGlCQUFDQyxFQUFELEVBQVE7SUFDZixXQUFLLElBQUlDLEdBQVQsSUFBZ0JKLFVBQWhCLEVBQTRCO0lBQzFCLFlBQUlLLFlBQVlMLFdBQVdJLEdBQVgsQ0FBaEI7SUFDRUQsV0FBR0UsU0FBSCxDQUFhQSxVQUFVQyxJQUF2QixFQUE0QkQsU0FBNUI7SUFDSDtJQUNGLEtBUEk7SUFRTEw7SUFSSyxHQUFQO0lBVUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNYRDs7SUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQkE7OztRQUdNTzs7OztJQUNKOytCQUN3QjtJQUN0QjtJQUNBO0lBQ0EsYUFBTyxFQUFQO0lBQ0Q7O0lBRUQ7Ozs7K0JBQ3FCO0lBQ25CO0lBQ0E7SUFDQSxhQUFPLEVBQVA7SUFDRDs7SUFFRDs7OzsrQkFDcUI7SUFDbkI7SUFDQTtJQUNBLGFBQU8sRUFBUDtJQUNEOztJQUVEOzs7OytCQUM0QjtJQUMxQjtJQUNBO0lBQ0E7SUFDQSxhQUFPLEVBQVA7SUFDRDs7SUFFRDs7Ozs7O0lBR0EsMkJBQTBCO0lBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJO0lBQUE7O0lBQ3hCO0lBQ0EsU0FBS0MsUUFBTCxHQUFnQkQsT0FBaEI7SUFDRDs7OzsrQkFFTTtJQUNMO0lBQ0Q7OztrQ0FFUztJQUNSO0lBQ0Q7Ozs7O0lDaEVIOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTs7SUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW1CTUU7Ozs7Ozs7O0lBQ0o7aUNBQ1NDLFdBQVc7O0lBRXBCOzs7O29DQUNZQSxXQUFXOztJQUV2Qjs7Ozs7OzttREFJMkJDLE1BQU1DLFNBQVM7O0lBRTFDOzs7Ozs7O3FEQUk2QkQsTUFBTUMsU0FBUzs7SUFFNUM7Ozs7Z0NBQ1FDLE1BQU07O0lBRWQ7Ozs7c0NBQ2M7O0lBRWQ7Ozs7b0NBQ1lDLFVBQVU7O0lBRXRCOzs7Ozs7O2dDQUlRVCxNQUFNOztJQUVkOzs7Ozs7O2dDQUlRQSxNQUFNVSxPQUFPOztJQUVyQjs7OzsrQkFDT1YsTUFBTTs7SUFFYjs7OztxQ0FDYVcsU0FBUzs7Ozs7SUNsRnhCOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTtJQUNBLElBQU1DLGFBQWE7SUFDakJDLFFBQU0saUJBRFc7SUFFakJDLFlBQVU7SUFGTyxDQUFuQjs7SUFLQTtJQUNBLElBQU1DLFVBQVU7SUFDZEMsa0JBQWdCLGdCQURGO0lBRWRDLG1CQUFpQixpQkFGSDtJQUdkQyxnQkFBYyxjQUhBO0lBSWRDLGlCQUFlLGVBSkQ7SUFLZEMsY0FBWSxZQUxFO0lBTWRDLGdCQUFjO0lBTkEsQ0FBaEI7O0lDeEJBOzs7Ozs7Ozs7Ozs7Ozs7OztJQXNCQTs7OztRQUdNQzs7OzsrQkFDb0I7SUFDdEIsYUFBT1YsVUFBUDtJQUNEOzs7K0JBRW9CO0lBQ25CLGFBQU9HLE9BQVA7SUFDRDs7OytCQUUyQjtJQUMxQixhQUFPO0lBQ0xRLGtCQUFVLDJDQUE2QixFQURsQztJQUVMQyxxQkFBYSw4Q0FBNkIsRUFGckM7SUFHTEMsb0NBQTRCLGdGQUFnRCxFQUh2RTtJQUlMQyxzQ0FBOEIsa0ZBQWdELEVBSnpFO0lBS0xDLGlCQUFTLHFDQUF3QixFQUw1QjtJQU1MQyxxQkFBYTtJQUFBLDhCQUFtQjtJQUFuQjtJQUFBLFNBTlI7SUFPTEMscUJBQWEsNkNBQTRCLEVBUHBDO0lBUUxDLGlCQUFTO0lBQUEsaURBQXFDO0lBQXJDO0lBQUEsU0FSSjtJQVNMQyxpQkFBUyxvREFBdUMsRUFUM0M7SUFVTEMsZ0JBQVEsb0NBQXdCLEVBVjNCO0lBV0xDLHNCQUFjLHNEQUFvQztJQVg3QyxPQUFQO0lBYUQ7OztJQUVELG1DQUFZL0IsT0FBWixFQUFxQjtJQUFBOztJQUduQjtJQUhtQixpSkFDYmdDLFNBQWNaLHdCQUF3QmEsY0FBdEMsRUFBc0RqQyxPQUF0RCxDQURhOztJQUluQixVQUFLa0MsR0FBTCxHQUFXLEtBQVg7O0lBRUE7SUFDQSxVQUFLQyxTQUFMLEdBQWlCLEtBQWpCOztJQUVBO0lBQ0EsVUFBS0MsY0FBTCxHQUFzQixDQUFDLENBQXZCOztJQUVBO0lBQ0EsVUFBS0MsYUFBTCxHQUFxQixJQUFyQjs7SUFFQTtJQUNBLFVBQUtDLGNBQUwsR0FBc0IsSUFBdEI7O0lBRUEsVUFBS0MsYUFBTCxtQ0FDRTtJQUFBLGFBQU0sTUFBS0MsY0FBTCxFQUFOO0lBQUEsS0FERjs7SUFHQTtJQUNBLFVBQUtDLGtCQUFMLEdBQTBCLEtBQTFCOztJQUVBLFVBQUtDLGVBQUwsbUNBQXlELHNDQUE2QkMsR0FBN0IsRUFBcUM7SUFDNUYsVUFBSUMsUUFBUUQsR0FBUixDQUFKLEVBQWtCO0lBQ2hCLGNBQUtGLGtCQUFMLEdBQTBCLElBQTFCO0lBQ0EsZUFBT0UsSUFBSUUsY0FBSixFQUFQO0lBQ0Q7SUFDRixLQUxEOztJQU9BLFVBQUtDLGFBQUwsbUNBQXVELHNDQUE2QkgsR0FBN0IsRUFBcUM7SUFDMUYsVUFBSUMsUUFBUUQsR0FBUixDQUFKLEVBQWtCO0lBQ2hCLGNBQUtGLGtCQUFMLEdBQTBCLEtBQTFCO0lBQ0EsY0FBS0QsY0FBTDtJQUNEO0lBQ0YsS0FMRDtJQS9CbUI7SUFxQ3BCOzs7OytCQUVNO0lBQ0wsV0FBS08saUJBQUw7SUFDQSxXQUFLWCxjQUFMLEdBQXNCLEtBQUtuQyxRQUFMLENBQWN5QixXQUFkLEVBQXRCO0lBQ0EsV0FBS3pCLFFBQUwsQ0FBY3NCLDBCQUFkLENBQXlDLE9BQXpDLEVBQWtELEtBQUtnQixhQUF2RDtJQUNBLFdBQUt0QyxRQUFMLENBQWNzQiwwQkFBZCxDQUF5QyxTQUF6QyxFQUFvRCxLQUFLbUIsZUFBekQ7SUFDQSxXQUFLekMsUUFBTCxDQUFjc0IsMEJBQWQsQ0FBeUMsT0FBekMsRUFBa0QsS0FBS3VCLGFBQXZEO0lBQ0Q7Ozs0Q0FFbUI7SUFBQSxrQ0FDd0IxQix3QkFBd0JQLE9BRGhEO0lBQUEsVUFDWEMsY0FEVyx5QkFDWEEsY0FEVztJQUFBLFVBQ0tDLGVBREwseUJBQ0tBLGVBREw7O0lBRWxCLFdBQUtzQixhQUFMLEdBQXFCLEtBQUtXLGtCQUFMLENBQXdCbEMsY0FBeEIsQ0FBckI7SUFDQSxXQUFLd0IsY0FBTCxHQUFzQixLQUFLVSxrQkFBTCxDQUF3QmpDLGVBQXhCLENBQXRCO0lBQ0Q7OztrQ0FFUztJQUNSLFdBQUtkLFFBQUwsQ0FBY3VCLDRCQUFkLENBQTJDLE9BQTNDLEVBQW9ELEtBQUtlLGFBQXpEO0lBQ0EsV0FBS3RDLFFBQUwsQ0FBY3VCLDRCQUFkLENBQTJDLFNBQTNDLEVBQXNELEtBQUtrQixlQUEzRDtJQUNBLFdBQUt6QyxRQUFMLENBQWN1Qiw0QkFBZCxDQUEyQyxPQUEzQyxFQUFvRCxLQUFLc0IsYUFBekQ7SUFDRDs7SUFFRDs7Ozt5Q0FDaUI7SUFDZixXQUFLRyxNQUFMO0lBRGUsVUFFSEMsSUFGRyxHQUVLLElBRkwsQ0FFUmhCLEdBRlE7O0lBR2YsV0FBS2pDLFFBQUwsQ0FBYzhCLFlBQWQsaUNBQTRELEVBQUNtQixVQUFELEVBQTVEO0lBQ0Q7O0lBRUQ7Ozs7K0JBQ087SUFDTCxhQUFPLEtBQUtoQixHQUFaO0lBQ0Q7O0lBRUQ7Ozs7aUNBQ3lCO0lBQUEsVUFBbEJnQixJQUFrQix1RUFBWCxDQUFDLEtBQUtoQixHQUFLOztJQUN2QixXQUFLQSxHQUFMLEdBQVdnQixJQUFYOztJQUR1QixtQ0FHWTlCLHdCQUF3QlAsT0FIcEM7SUFBQSxVQUdoQkssVUFIZ0IsMEJBR2hCQSxVQUhnQjtJQUFBLFVBR0pGLFlBSEksMEJBR0pBLFlBSEk7OztJQUt2QixVQUFJLEtBQUtrQixHQUFULEVBQWM7SUFDWixhQUFLakMsUUFBTCxDQUFjNEIsT0FBZCxDQUFzQmIsWUFBdEIsRUFBb0MsTUFBcEM7SUFDRCxPQUZELE1BRU87SUFDTCxhQUFLZixRQUFMLENBQWM0QixPQUFkLENBQXNCYixZQUF0QixFQUFvQyxPQUFwQztJQUNEOztJQVRzQixpQkFZbkIsS0FBS2tCLEdBQUwsR0FBVyxLQUFLSSxjQUFoQixHQUFpQyxLQUFLRCxhQVpuQjtJQUFBLFVBV05jLGFBWE0sUUFXaEJDLFFBWGdCOztJQWN2QixVQUFJRCxhQUFKLEVBQW1CO0lBQ2pCLGFBQUtsRCxRQUFMLENBQWNxQixXQUFkLENBQTBCNkIsYUFBMUI7SUFDRDs7SUFoQnNCLGtCQWtCWSxLQUFLakIsR0FBTCxHQUFXLEtBQUtHLGFBQWhCLEdBQWdDLEtBQUtDLGNBbEJqRDtJQUFBLFVBa0JoQmUsT0FsQmdCLFNBa0JoQkEsT0FsQmdCO0lBQUEsVUFrQlBDLEtBbEJPLFNBa0JQQSxLQWxCTztJQUFBLFVBa0JBRixRQWxCQSxTQWtCQUEsUUFsQkE7O0lBb0J2QixVQUFJQSxRQUFKLEVBQWM7SUFDWixhQUFLbkQsUUFBTCxDQUFjb0IsUUFBZCxDQUF1QitCLFFBQXZCO0lBQ0Q7SUFDRCxVQUFJQyxPQUFKLEVBQWE7SUFDWCxhQUFLcEQsUUFBTCxDQUFjd0IsT0FBZCxDQUFzQjRCLE9BQXRCO0lBQ0Q7SUFDRCxVQUFJQyxLQUFKLEVBQVc7SUFDVCxhQUFLckQsUUFBTCxDQUFjNEIsT0FBZCxDQUFzQlgsVUFBdEIsRUFBa0NvQyxLQUFsQztJQUNEO0lBQ0Y7O0lBRUQ7Ozs7Ozs7MkNBSW1CQyxVQUFVO0lBQzNCLFVBQU1DLE1BQU0sS0FBS3ZELFFBQUwsQ0FBYzJCLE9BQWQsQ0FBc0IyQixRQUF0QixDQUFaO0lBQ0EsVUFBSSxDQUFDQyxHQUFMLEVBQVU7SUFDUixlQUFPLEVBQVA7SUFDRDtJQUNELDZDQUF3Q0MsS0FBS0MsS0FBTCxDQUFXRixHQUFYO0lBQXhDO0lBQ0Q7O0lBRUQ7Ozs7cUNBQ2E7SUFDWCxhQUFPLEtBQUtyQixTQUFaO0lBQ0Q7O0lBRUQ7Ozs7b0NBQ1l3QixZQUFZO0lBQ3RCLFdBQUt4QixTQUFMLEdBQWlCd0IsVUFBakI7O0lBRHNCLFVBR2YvQyxRQUhlLEdBR0hRLHdCQUF3QlYsVUFIckIsQ0FHZkUsUUFIZTtJQUFBLFVBSWZLLGFBSmUsR0FJRUcsd0JBQXdCUCxPQUoxQixDQUlmSSxhQUplOzs7SUFNdEIsVUFBSSxLQUFLa0IsU0FBVCxFQUFvQjtJQUNsQixhQUFLQyxjQUFMLEdBQXNCLEtBQUtuQyxRQUFMLENBQWN5QixXQUFkLEVBQXRCO0lBQ0EsYUFBS3pCLFFBQUwsQ0FBYzBCLFdBQWQsQ0FBMEIsQ0FBQyxDQUEzQjtJQUNBLGFBQUsxQixRQUFMLENBQWM0QixPQUFkLENBQXNCWixhQUF0QixFQUFxQyxNQUFyQztJQUNBLGFBQUtoQixRQUFMLENBQWNvQixRQUFkLENBQXVCVCxRQUF2QjtJQUNELE9BTEQsTUFLTztJQUNMLGFBQUtYLFFBQUwsQ0FBYzBCLFdBQWQsQ0FBMEIsS0FBS1MsY0FBL0I7SUFDQSxhQUFLbkMsUUFBTCxDQUFjNkIsTUFBZCxDQUFxQmIsYUFBckI7SUFDQSxhQUFLaEIsUUFBTCxDQUFjcUIsV0FBZCxDQUEwQlYsUUFBMUI7SUFDRDtJQUNGOztJQUVEOzs7OzhDQUNzQjtJQUNwQixhQUFPLEtBQUs2QixrQkFBWjtJQUNEOzs7TUF2S21DMUM7O0lBa0x0Qzs7OztJQUlBLFNBQVM2QyxPQUFULENBQWlCZ0IsV0FBakIsRUFBOEI7SUFDNUIsU0FBT0EsWUFBWWhFLEdBQVosS0FBb0IsT0FBcEIsSUFBK0JnRSxZQUFZQyxPQUFaLEtBQXdCLEVBQTlEO0lBQ0Q7O0lDak5EOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQTs7SUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBcUJNQzs7Ozs7Ozs7SUFDSjtpREFDeUI7O0lBRXpCOzs7O3NDQUNjOztJQUVkOzs7OzBDQUNrQjs7SUFFbEI7Ozs7NENBQ29COztJQUVwQjs7OztpQ0FDUzNELFdBQVc7O0lBRXBCOzs7O29DQUNZQSxXQUFXOztJQUV2Qjs7Ozs0Q0FDb0I0RCxRQUFROztJQUU1Qjs7Ozs7OzttREFJMkJDLFNBQVMzRCxTQUFTOztJQUU3Qzs7Ozs7OztxREFJNkIyRCxTQUFTM0QsU0FBUzs7SUFFL0M7Ozs7Ozs7MkRBSW1DMkQsU0FBUzNELFNBQVM7O0lBRXJEOzs7Ozs7OzZEQUlxQzJELFNBQVMzRCxTQUFTOztJQUV2RDs7Ozs7OzhDQUdzQkEsU0FBUzs7SUFFL0I7Ozs7OztnREFHd0JBLFNBQVM7O0lBRWpDOzs7Ozs7OzBDQUlrQjRELFNBQVN6RCxPQUFPOztJQUVsQzs7Ozs4Q0FDc0I7O0lBRXRCOzs7OzhDQUNzQjs7Ozs7SUMxR3hCOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCQSxJQUFNRSxlQUFhO0lBQ2pCO0lBQ0E7SUFDQTtJQUNBQyxRQUFNLHFCQUpXO0lBS2pCdUQsYUFBVyxnQ0FMTTtJQU1qQkMsY0FBWSx5Q0FOSztJQU9qQkMsaUJBQWUsNENBUEU7SUFRakJDLG1CQUFpQjtJQVJBLENBQW5COztJQVdBLElBQU14RCxZQUFVO0lBQ2R5RCxZQUFVLG1CQURJO0lBRWRDLFdBQVMsa0JBRks7SUFHZEMsZUFBYSxzQkFIQztJQUlkQyxnQkFBYyx1QkFKQTtJQUtkQywwQkFBd0IsaUNBTFY7SUFNZEMsd0JBQXNCO0lBTlIsQ0FBaEI7O0lBU0EsSUFBTUMsVUFBVTtJQUNkQyxXQUFTLEVBREs7SUFFZEMsd0JBQXNCLEdBRlI7SUFHZEMsMkJBQXlCLEdBSFg7SUFJZEMsc0JBQW9CLEdBSk47SUFLZEMsZ0JBQWMsR0FMQTtJQUFBLENBQWhCOztJQ3JDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQkE7Ozs7SUFJQSxJQUFJQyw4QkFBSjs7SUFFQTs7OztJQUlBLElBQUlDLHlCQUFKOztJQUVBOzs7O0lBSUEsU0FBU0Msc0JBQVQsQ0FBZ0NDLFNBQWhDLEVBQTJDO0lBQ3pDO0lBQ0E7SUFDQSxNQUFNQyxXQUFXRCxVQUFVQyxRQUEzQjtJQUNBLE1BQU1DLE9BQU9ELFNBQVNFLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtJQUNBRCxPQUFLcEYsU0FBTCxHQUFpQix1Q0FBakI7SUFDQW1GLFdBQVNHLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkgsSUFBMUI7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQSxNQUFNSSxnQkFBZ0JOLFVBQVVPLGdCQUFWLENBQTJCTCxJQUEzQixDQUF0QjtJQUNBLE1BQU1NLGtCQUFrQkYsa0JBQWtCLElBQWxCLElBQTBCQSxjQUFjRyxjQUFkLEtBQWlDLE9BQW5GO0lBQ0FQLE9BQUtRLE1BQUw7SUFDQSxTQUFPRixlQUFQO0lBQ0Q7O0lBRUQ7Ozs7OztJQU1BLFNBQVNHLG9CQUFULENBQThCWCxTQUE5QixFQUErRDtJQUFBLE1BQXRCWSxZQUFzQix1RUFBUCxLQUFPOztJQUM3RCxNQUFJLE9BQU9mLHFCQUFQLEtBQWlDLFNBQWpDLElBQThDLENBQUNlLFlBQW5ELEVBQWlFO0lBQy9ELFdBQU9mLHFCQUFQO0lBQ0Q7O0lBRUQsTUFBTWdCLDBCQUEwQmIsVUFBVWMsR0FBVixJQUFpQixPQUFPZCxVQUFVYyxHQUFWLENBQWNDLFFBQXJCLEtBQWtDLFVBQW5GO0lBQ0EsTUFBSSxDQUFDRix1QkFBTCxFQUE4QjtJQUM1QjtJQUNEOztJQUVELE1BQU1HLDRCQUE0QmhCLFVBQVVjLEdBQVYsQ0FBY0MsUUFBZCxDQUF1QixZQUF2QixFQUFxQyxLQUFyQyxDQUFsQztJQUNBO0lBQ0E7SUFDQSxNQUFNRSxvQ0FDSmpCLFVBQVVjLEdBQVYsQ0FBY0MsUUFBZCxDQUF1QixtQkFBdkIsS0FDQWYsVUFBVWMsR0FBVixDQUFjQyxRQUFkLENBQXVCLE9BQXZCLEVBQWdDLFdBQWhDLENBRkY7O0lBS0EsTUFBSUMsNkJBQTZCQyxpQ0FBakMsRUFBb0U7SUFDbEVwQiw0QkFBd0IsQ0FBQ0UsdUJBQXVCQyxTQUF2QixDQUF6QjtJQUNELEdBRkQsTUFFTztJQUNMSCw0QkFBd0IsS0FBeEI7SUFDRDtJQUNELFNBQU9BLHFCQUFQO0lBQ0Q7O0lBRUQ7SUFDQTs7Ozs7O0lBTUEsU0FBU3FCLFlBQVQsR0FBZ0U7SUFBQSxNQUExQ0MsU0FBMEMsdUVBQTlCckgsTUFBOEI7SUFBQSxNQUF0QjhHLFlBQXNCLHVFQUFQLEtBQU87O0lBQzlELE1BQUlkLHFCQUFxQnNCLFNBQXJCLElBQWtDUixZQUF0QyxFQUFvRDtJQUNsRCxRQUFJUyxjQUFjLEtBQWxCO0lBQ0EsUUFBSTtJQUNGRixnQkFBVWxCLFFBQVYsQ0FBbUJxQixnQkFBbkIsQ0FBb0MsTUFBcEMsRUFBNEMsSUFBNUMsRUFBa0QsRUFBQyxJQUFJQyxPQUFKLEdBQWM7SUFDL0RGLHdCQUFjLElBQWQ7SUFDRCxTQUZpRCxFQUFsRDtJQUdELEtBSkQsQ0FJRSxPQUFPRyxDQUFQLEVBQVU7O0lBRVoxQix1QkFBbUJ1QixXQUFuQjtJQUNEOztJQUVELFNBQU92QixtQkFBbUIsRUFBQ3lCLFNBQVMsSUFBVixFQUFuQixHQUFxQyxLQUE1QztJQUNEOztJQUVEOzs7O0lBSUEsU0FBU0Usa0JBQVQsQ0FBNEJDLG9CQUE1QixFQUFrRDtJQUNoRCxTQUFPLENBQ0wsdUJBREssRUFDb0IsbUJBRHBCLEVBQ3lDLFNBRHpDLEVBRUxDLE1BRkssQ0FFRSxVQUFDQyxDQUFEO0lBQUEsV0FBT0EsS0FBS0Ysb0JBQVo7SUFBQSxHQUZGLEVBRW9DRyxHQUZwQyxFQUFQO0lBR0Q7O0lBRUQ7Ozs7OztJQU1BLFNBQVNDLHdCQUFULENBQWtDQyxFQUFsQyxFQUFzQ0MsVUFBdEMsRUFBa0RDLFVBQWxELEVBQThEO0lBQUEsTUFDckRDLENBRHFELEdBQzdDRixVQUQ2QyxDQUNyREUsQ0FEcUQ7SUFBQSxNQUNsREMsQ0FEa0QsR0FDN0NILFVBRDZDLENBQ2xERyxDQURrRDs7SUFFNUQsTUFBTUMsWUFBWUYsSUFBSUQsV0FBV0ksSUFBakM7SUFDQSxNQUFNQyxZQUFZSCxJQUFJRixXQUFXTSxHQUFqQzs7SUFFQSxNQUFJQyxvQkFBSjtJQUNBLE1BQUlDLG9CQUFKO0lBQ0E7SUFDQSxNQUFJVixHQUFHaEgsSUFBSCxLQUFZLFlBQWhCLEVBQThCO0lBQzVCeUgsa0JBQWNULEdBQUdXLGNBQUgsQ0FBa0IsQ0FBbEIsRUFBcUJDLEtBQXJCLEdBQTZCUCxTQUEzQztJQUNBSyxrQkFBY1YsR0FBR1csY0FBSCxDQUFrQixDQUFsQixFQUFxQkUsS0FBckIsR0FBNkJOLFNBQTNDO0lBQ0QsR0FIRCxNQUdPO0lBQ0xFLGtCQUFjVCxHQUFHWSxLQUFILEdBQVdQLFNBQXpCO0lBQ0FLLGtCQUFjVixHQUFHYSxLQUFILEdBQVdOLFNBQXpCO0lBQ0Q7O0lBRUQsU0FBTyxFQUFDSixHQUFHTSxXQUFKLEVBQWlCTCxHQUFHTSxXQUFwQixFQUFQO0lBQ0Q7O0lDMUlEOzs7Ozs7Ozs7Ozs7Ozs7OztJQThEQTtJQUNBLElBQU1JLHlCQUF5QixDQUFDLFlBQUQsRUFBZSxhQUFmLEVBQThCLFdBQTlCLEVBQTJDLFNBQTNDLENBQS9COztJQUVBO0lBQ0EsSUFBTUMsbUNBQW1DLENBQUMsVUFBRCxFQUFhLFdBQWIsRUFBMEIsU0FBMUIsQ0FBekM7O0lBRUE7SUFDQTtJQUNBLElBQUlDLG1CQUFtQixFQUF2Qjs7SUFFQTs7OztRQUdNQzs7OzsrQkFDb0I7SUFDdEIsYUFBTzNILFlBQVA7SUFDRDs7OytCQUVvQjtJQUNuQixhQUFPRyxTQUFQO0lBQ0Q7OzsrQkFFb0I7SUFDbkIsYUFBTytELE9BQVA7SUFDRDs7OytCQUUyQjtJQUMxQixhQUFPO0lBQ0wwRCxnQ0FBd0Isd0RBQTZCLEVBRGhEO0lBRUxDLHFCQUFhLG9DQUFvQixFQUY1QjtJQUdMQyx5QkFBaUIsd0NBQW9CLEVBSGhDO0lBSUxDLDJCQUFtQiwwQ0FBb0IsRUFKbEM7SUFLTHBILGtCQUFVLDJDQUE2QixFQUxsQztJQU1MQyxxQkFBYSw4Q0FBNkIsRUFOckM7SUFPTG9ILDZCQUFxQix5REFBZ0MsRUFQaEQ7SUFRTG5ILG9DQUE0QixtRkFBbUQsRUFSMUU7SUFTTEMsc0NBQThCLHFGQUFtRCxFQVQ1RTtJQVVMbUgsNENBQW9DLDJGQUFtRCxFQVZsRjtJQVdMQyw4Q0FBc0MsNkZBQW1ELEVBWHBGO0lBWUxDLCtCQUF1Qiw2REFBa0MsRUFacEQ7SUFhTEMsaUNBQXlCLCtEQUFrQyxFQWJ0RDtJQWNMQywyQkFBbUIsaUVBQTBDLEVBZHhEO0lBZUxDLDZCQUFxQiwrQ0FBdUIsRUFmdkM7SUFnQkxDLDZCQUFxQiwyREFBbUM7SUFoQm5ELE9BQVA7SUFrQkQ7OztJQUVELCtCQUFZakosT0FBWixFQUFxQjtJQUFBOztJQUduQjtJQUhtQix5SUFDYmdDLFNBQWNxRyxvQkFBb0JwRyxjQUFsQyxFQUFrRGpDLE9BQWxELENBRGE7O0lBSW5CLFVBQUtrSixZQUFMLEdBQW9CLENBQXBCOztJQUVBO0lBQ0EsVUFBS0MsTUFBTCw2QkFBMEMsRUFBQ0MsT0FBTyxDQUFSLEVBQVdDLFFBQVEsQ0FBbkIsRUFBMUM7O0lBRUE7SUFDQSxVQUFLQyxnQkFBTCxHQUF3QixNQUFLQyx1QkFBTCxFQUF4Qjs7SUFFQTtJQUNBLFVBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7O0lBRUE7SUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCOztJQUVBO0lBQ0EsVUFBS0MsZ0JBQUwsR0FBd0IsVUFBQzdDLENBQUQ7SUFBQSxhQUFPLE1BQUs4QyxTQUFMLENBQWU5QyxDQUFmLENBQVA7SUFBQSxLQUF4Qjs7SUFFQTtJQUNBLFVBQUsrQyxrQkFBTCxHQUEwQixVQUFDL0MsQ0FBRDtJQUFBLGFBQU8sTUFBS2dELFdBQUwsQ0FBaUJoRCxDQUFqQixDQUFQO0lBQUEsS0FBMUI7O0lBRUE7SUFDQSxVQUFLaUQsYUFBTCxHQUFxQjtJQUFBLGFBQU1DLHNCQUN6QjtJQUFBLGVBQU0sTUFBSzlKLFFBQUwsQ0FBY29CLFFBQWQsQ0FBdUJnSCxvQkFBb0IzSCxVQUFwQixDQUErQnlELFVBQXRELENBQU47SUFBQSxPQUR5QixDQUFOO0lBQUEsS0FBckI7O0lBSUE7SUFDQSxVQUFLNkYsWUFBTCxHQUFvQjtJQUFBLGFBQU1ELHNCQUN4QjtJQUFBLGVBQU0sTUFBSzlKLFFBQUwsQ0FBY3FCLFdBQWQsQ0FBMEIrRyxvQkFBb0IzSCxVQUFwQixDQUErQnlELFVBQXpELENBQU47SUFBQSxPQUR3QixDQUFOO0lBQUEsS0FBcEI7O0lBSUE7SUFDQSxVQUFLOEYsY0FBTCxHQUFzQjtJQUFBLGFBQU0sTUFBS0MsTUFBTCxFQUFOO0lBQUEsS0FBdEI7O0lBRUE7SUFDQSxVQUFLQyxnQkFBTCxHQUF3QjtJQUN0QnpDLFlBQU0sQ0FEZ0I7SUFFdEJFLFdBQUs7SUFGaUIsS0FBeEI7O0lBS0E7SUFDQSxVQUFLd0MsUUFBTCxHQUFnQixDQUFoQjs7SUFFQTtJQUNBLFVBQUtDLGdCQUFMLEdBQXdCLENBQXhCOztJQUVBO0lBQ0EsVUFBS0MsMkJBQUwsR0FBbUMsQ0FBbkM7O0lBRUE7SUFDQSxVQUFLQyw0QkFBTCxHQUFvQyxLQUFwQzs7SUFFQTtJQUNBLFVBQUtDLHdCQUFMLEdBQWdDLFlBQU07SUFDcEMsWUFBS0QsNEJBQUwsR0FBb0MsSUFBcEM7SUFDQSxZQUFLRSw4QkFBTDtJQUNELEtBSEQ7O0lBS0E7SUFDQSxVQUFLQyx3QkFBTCxHQUFnQyxJQUFoQztJQTlEbUI7SUErRHBCOztJQUVEOzs7Ozs7Ozs7Ozs7dUNBUWU7SUFDYixhQUFPLEtBQUt6SyxRQUFMLENBQWNxSSxzQkFBZCxFQUFQO0lBQ0Q7O0lBRUQ7Ozs7OztrREFHMEI7SUFDeEIsYUFBTztJQUNMcUMscUJBQWEsS0FEUjtJQUVMQyw4QkFBc0IsS0FGakI7SUFHTEMsK0JBQXVCLEtBSGxCO0lBSUxDLDhCQUFzQixLQUpqQjtJQUtMQyx5QkFBaUIsSUFMWjtJQU1MQyx3QkFBZ0I7SUFOWCxPQUFQO0lBUUQ7OzsrQkFFTTtJQUFBOztJQUNMLFVBQUksQ0FBQyxLQUFLQyxZQUFMLEVBQUwsRUFBMEI7SUFDeEI7SUFDRDtJQUNELFdBQUtDLHFCQUFMOztJQUpLLGtDQU1xQjdDLG9CQUFvQjNILFVBTnpDO0lBQUEsVUFNRUMsSUFORix5QkFNRUEsSUFORjtJQUFBLFVBTVF1RCxTQU5SLHlCQU1RQSxTQU5SOztJQU9MNkYsNEJBQXNCLFlBQU07SUFDMUIsZUFBSzlKLFFBQUwsQ0FBY29CLFFBQWQsQ0FBdUJWLElBQXZCO0lBQ0EsWUFBSSxPQUFLVixRQUFMLENBQWNzSSxXQUFkLEVBQUosRUFBaUM7SUFDL0IsaUJBQUt0SSxRQUFMLENBQWNvQixRQUFkLENBQXVCNkMsU0FBdkI7SUFDRDtJQUNELGVBQUtpSCxlQUFMO0lBQ0QsT0FORDtJQU9EOzs7a0NBRVM7SUFBQTs7SUFDUixVQUFJLENBQUMsS0FBS0YsWUFBTCxFQUFMLEVBQTBCO0lBQ3hCO0lBQ0Q7SUFDRCxXQUFLRyx1QkFBTDtJQUNBLFdBQUtDLCtCQUFMOztJQUxRLG1DQU9rQmhELG9CQUFvQjNILFVBUHRDO0lBQUEsVUFPREMsSUFQQywwQkFPREEsSUFQQztJQUFBLFVBT0t1RCxTQVBMLDBCQU9LQSxTQVBMOztJQVFSNkYsNEJBQXNCLFlBQU07SUFDMUIsZUFBSzlKLFFBQUwsQ0FBY3FCLFdBQWQsQ0FBMEJYLElBQTFCO0lBQ0EsZUFBS1YsUUFBTCxDQUFjcUIsV0FBZCxDQUEwQjRDLFNBQTFCO0lBQ0EsZUFBS29ILGNBQUw7SUFDRCxPQUpEO0lBS0Q7O0lBRUQ7Ozs7Z0RBQ3dCO0lBQUE7O0lBQ3RCcEQsNkJBQXVCcUQsT0FBdkIsQ0FBK0IsVUFBQ25MLElBQUQsRUFBVTtJQUN2QyxlQUFLSCxRQUFMLENBQWNzQiwwQkFBZCxDQUF5Q25CLElBQXpDLEVBQStDLE9BQUtzSixnQkFBcEQ7SUFDRCxPQUZEO0lBR0EsV0FBS3pKLFFBQUwsQ0FBY3NCLDBCQUFkLENBQXlDLE9BQXpDLEVBQWtELEtBQUt1SSxhQUF2RDtJQUNBLFdBQUs3SixRQUFMLENBQWNzQiwwQkFBZCxDQUF5QyxNQUF6QyxFQUFpRCxLQUFLeUksWUFBdEQ7SUFDQSxXQUFLL0osUUFBTCxDQUFjNEkscUJBQWQsQ0FBb0MsS0FBS29CLGNBQXpDO0lBQ0Q7O0lBRUQ7Ozs7Ozs7c0RBSThCcEQsR0FBRztJQUFBOztJQUMvQixVQUFJQSxFQUFFekcsSUFBRixLQUFXLFNBQWYsRUFBMEI7SUFDeEIsYUFBS0gsUUFBTCxDQUFjc0IsMEJBQWQsQ0FBeUMsT0FBekMsRUFBa0QsS0FBS3FJLGtCQUF2RDtJQUNELE9BRkQsTUFFTztJQUNMekIseUNBQWlDb0QsT0FBakMsQ0FBeUMsVUFBQ25MLElBQUQsRUFBVTtJQUNqRCxpQkFBS0gsUUFBTCxDQUFjMEksa0NBQWQsQ0FBaUR2SSxJQUFqRCxFQUF1RCxPQUFLd0osa0JBQTVEO0lBQ0QsU0FGRDtJQUdEO0lBQ0Y7O0lBRUQ7Ozs7a0RBQzBCO0lBQUE7O0lBQ3hCMUIsNkJBQXVCcUQsT0FBdkIsQ0FBK0IsVUFBQ25MLElBQUQsRUFBVTtJQUN2QyxlQUFLSCxRQUFMLENBQWN1Qiw0QkFBZCxDQUEyQ3BCLElBQTNDLEVBQWlELE9BQUtzSixnQkFBdEQ7SUFDRCxPQUZEO0lBR0EsV0FBS3pKLFFBQUwsQ0FBY3VCLDRCQUFkLENBQTJDLE9BQTNDLEVBQW9ELEtBQUtzSSxhQUF6RDtJQUNBLFdBQUs3SixRQUFMLENBQWN1Qiw0QkFBZCxDQUEyQyxNQUEzQyxFQUFtRCxLQUFLd0ksWUFBeEQ7SUFDQSxXQUFLL0osUUFBTCxDQUFjNkksdUJBQWQsQ0FBc0MsS0FBS21CLGNBQTNDO0lBQ0Q7O0lBRUQ7Ozs7MERBQ2tDO0lBQUE7O0lBQ2hDLFdBQUtoSyxRQUFMLENBQWN1Qiw0QkFBZCxDQUEyQyxPQUEzQyxFQUFvRCxLQUFLb0ksa0JBQXpEO0lBQ0F6Qix1Q0FBaUNvRCxPQUFqQyxDQUF5QyxVQUFDbkwsSUFBRCxFQUFVO0lBQ2pELGVBQUtILFFBQUwsQ0FBYzJJLG9DQUFkLENBQW1EeEksSUFBbkQsRUFBeUQsT0FBS3dKLGtCQUE5RDtJQUNELE9BRkQ7SUFHRDs7SUFFRDs7Ozt5Q0FDaUI7SUFBQTs7SUFBQSxVQUNSL0ksT0FEUSxHQUNHd0gsbUJBREgsQ0FDUnhILE9BRFE7O0lBRWYySyxhQUFPQyxJQUFQLENBQVk1SyxPQUFaLEVBQXFCMEssT0FBckIsQ0FBNkIsVUFBQ0csQ0FBRCxFQUFPO0lBQ2xDLFlBQUlBLEVBQUVDLE9BQUYsQ0FBVSxNQUFWLE1BQXNCLENBQTFCLEVBQTZCO0lBQzNCLGlCQUFLMUwsUUFBTCxDQUFjOEksaUJBQWQsQ0FBZ0NsSSxRQUFRNkssQ0FBUixDQUFoQyxFQUE0QyxJQUE1QztJQUNEO0lBQ0YsT0FKRDtJQUtEOztJQUVEOzs7Ozs7O2tDQUlVN0UsR0FBRztJQUFBOztJQUNYLFVBQUksS0FBSzVHLFFBQUwsQ0FBY3dJLGlCQUFkLEVBQUosRUFBdUM7SUFDckM7SUFDRDs7SUFFRCxVQUFNbUQsa0JBQWtCLEtBQUt0QyxnQkFBN0I7SUFDQSxVQUFJc0MsZ0JBQWdCakIsV0FBcEIsRUFBaUM7SUFDL0I7SUFDRDs7SUFFRDtJQUNBLFVBQU1rQiwwQkFBMEIsS0FBS25CLHdCQUFyQztJQUNBLFVBQU1vQixvQkFBb0JELDJCQUEyQmhGLENBQTNCLElBQWdDZ0Ysd0JBQXdCekwsSUFBeEIsS0FBaUN5RyxFQUFFekcsSUFBN0Y7SUFDQSxVQUFJMEwsaUJBQUosRUFBdUI7SUFDckI7SUFDRDs7SUFFREYsc0JBQWdCakIsV0FBaEIsR0FBOEIsSUFBOUI7SUFDQWlCLHNCQUFnQlosY0FBaEIsR0FBaUNuRSxNQUFNLElBQXZDO0lBQ0ErRSxzQkFBZ0JiLGVBQWhCLEdBQWtDbEUsQ0FBbEM7SUFDQStFLHNCQUFnQmYscUJBQWhCLEdBQXdDZSxnQkFBZ0JaLGNBQWhCLEdBQWlDLEtBQWpDLEdBQ3RDbkUsRUFBRXpHLElBQUYsS0FBVyxXQUFYLElBQTBCeUcsRUFBRXpHLElBQUYsS0FBVyxZQUFyQyxJQUFxRHlHLEVBQUV6RyxJQUFGLEtBQVcsYUFEbEU7O0lBSUEsVUFBTTJMLG9CQUNKbEYsS0FBS3VCLGlCQUFpQjRELE1BQWpCLEdBQTBCLENBQS9CLElBQW9DNUQsaUJBQWlCNkQsSUFBakIsQ0FBc0IsVUFBQ2xJLE1BQUQ7SUFBQSxlQUFZLE9BQUs5RCxRQUFMLENBQWN5SSxtQkFBZCxDQUFrQzNFLE1BQWxDLENBQVo7SUFBQSxPQUF0QixDQUR0QztJQUVBLFVBQUlnSSxpQkFBSixFQUF1QjtJQUNyQjtJQUNBLGFBQUtHLHFCQUFMO0lBQ0E7SUFDRDs7SUFFRCxVQUFJckYsQ0FBSixFQUFPO0lBQ0x1Qix5QkFBaUIrRCxJQUFqQiw2QkFBbUR0RixFQUFFOUMsTUFBckQ7SUFDQSxhQUFLcUksNkJBQUwsQ0FBbUN2RixDQUFuQztJQUNEOztJQUVEa0QsNEJBQXNCLFlBQU07SUFDMUI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBNkIsd0JBQWdCZCxvQkFBaEIsR0FBd0NqRSxLQUFLQSxFQUFFekcsSUFBRixLQUFXLFNBQWpCLEdBQThCLE9BQUtILFFBQUwsQ0FBY3VJLGVBQWQsRUFBOUIsR0FBZ0UsSUFBdkc7SUFDQSxZQUFJb0QsZ0JBQWdCZCxvQkFBcEIsRUFBMEM7SUFDeEMsaUJBQUt1QixrQkFBTDtJQUNELFNBRkQsTUFFTztJQUNMO0lBQ0EsaUJBQUsvQyxnQkFBTCxHQUF3QixPQUFLQyx1QkFBTCxFQUF4QjtJQUNEOztJQUVEO0lBQ0FuQiwyQkFBbUIsRUFBbkI7SUFDRCxPQWhCRDtJQWlCRDs7SUFFRDs7Ozs7O21DQUd1QjtJQUFBLFVBQWRrRSxLQUFjLHVFQUFOLElBQU07O0lBQ3JCLFdBQUszQyxTQUFMLENBQWUyQyxLQUFmO0lBQ0Q7O0lBRUQ7Ozs7NkNBQ3FCO0lBQUE7O0lBQUEsbUNBQ29DakUsb0JBQW9CeEgsT0FEeEQ7SUFBQSxVQUNaNkQsc0JBRFksMEJBQ1pBLHNCQURZO0lBQUEsVUFDWUMsb0JBRFosMEJBQ1lBLG9CQURaO0lBQUEsbUNBRXNCMEQsb0JBQW9CM0gsVUFGMUM7SUFBQSxVQUVaMkQsZUFGWSwwQkFFWkEsZUFGWTtJQUFBLFVBRUtELGFBRkwsMEJBRUtBLGFBRkw7SUFBQSxVQUdaVyx1QkFIWSxHQUdlc0Qsb0JBQW9CekQsT0FIbkMsQ0FHWkcsdUJBSFk7OztJQUtuQixVQUFJd0gsaUJBQWlCLEVBQXJCO0lBQ0EsVUFBSUMsZUFBZSxFQUFuQjs7SUFFQSxVQUFJLENBQUMsS0FBS3ZNLFFBQUwsQ0FBY3NJLFdBQWQsRUFBTCxFQUFrQztJQUFBLG9DQUNELEtBQUtrRSw0QkFBTCxFQURDO0lBQUEsWUFDekJDLFVBRHlCLHlCQUN6QkEsVUFEeUI7SUFBQSxZQUNiQyxRQURhLHlCQUNiQSxRQURhOztJQUVoQ0oseUJBQW9CRyxXQUFXbkYsQ0FBL0IsWUFBdUNtRixXQUFXbEYsQ0FBbEQ7SUFDQWdGLHVCQUFrQkcsU0FBU3BGLENBQTNCLFlBQW1Db0YsU0FBU25GLENBQTVDO0lBQ0Q7O0lBRUQsV0FBS3ZILFFBQUwsQ0FBYzhJLGlCQUFkLENBQWdDckUsc0JBQWhDLEVBQXdENkgsY0FBeEQ7SUFDQSxXQUFLdE0sUUFBTCxDQUFjOEksaUJBQWQsQ0FBZ0NwRSxvQkFBaEMsRUFBc0Q2SCxZQUF0RDtJQUNBO0lBQ0FJLG1CQUFhLEtBQUt2QyxnQkFBbEI7SUFDQXVDLG1CQUFhLEtBQUt0QywyQkFBbEI7SUFDQSxXQUFLdUMsMkJBQUw7SUFDQSxXQUFLNU0sUUFBTCxDQUFjcUIsV0FBZCxDQUEwQitDLGVBQTFCOztJQUVBO0lBQ0EsV0FBS3BFLFFBQUwsQ0FBYytJLG1CQUFkO0lBQ0EsV0FBSy9JLFFBQUwsQ0FBY29CLFFBQWQsQ0FBdUIrQyxhQUF2QjtJQUNBLFdBQUtpRyxnQkFBTCxHQUF3QnlDLFdBQVc7SUFBQSxlQUFNLFFBQUt0Qyx3QkFBTCxFQUFOO0lBQUEsT0FBWCxFQUFrRHpGLHVCQUFsRCxDQUF4QjtJQUNEOztJQUVEOzs7Ozs7O3VEQUkrQjtJQUFBLDhCQUNvQixLQUFLdUUsZ0JBRHpCO0lBQUEsVUFDdEJ5QixlQURzQixxQkFDdEJBLGVBRHNCO0lBQUEsVUFDTEYscUJBREsscUJBQ0xBLHFCQURLOzs7SUFHN0IsVUFBSTZCLG1CQUFKO0lBQ0EsVUFBSTdCLHFCQUFKLEVBQTJCO0lBQ3pCNkIscUJBQWF2RjtJQUNYLDZCQUF1QjRELGVBRFosRUFFWCxLQUFLOUssUUFBTCxDQUFjZ0osbUJBQWQsRUFGVyxFQUUwQixLQUFLaEosUUFBTCxDQUFjK0ksbUJBQWQsRUFGMUIsQ0FBYjtJQUlELE9BTEQsTUFLTztJQUNMMEQscUJBQWE7SUFDWG5GLGFBQUcsS0FBSzRCLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixDQURaO0lBRVg1QixhQUFHLEtBQUsyQixNQUFMLENBQVlFLE1BQVosR0FBcUI7SUFGYixTQUFiO0lBSUQ7SUFDRDtJQUNBcUQsbUJBQWE7SUFDWG5GLFdBQUdtRixXQUFXbkYsQ0FBWCxHQUFnQixLQUFLaUMsWUFBTCxHQUFvQixDQUQ1QjtJQUVYaEMsV0FBR2tGLFdBQVdsRixDQUFYLEdBQWdCLEtBQUtnQyxZQUFMLEdBQW9CO0lBRjVCLE9BQWI7O0lBS0EsVUFBTW1ELFdBQVc7SUFDZnBGLFdBQUksS0FBSzRCLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixDQUFyQixHQUEyQixLQUFLSSxZQUFMLEdBQW9CLENBRG5DO0lBRWZoQyxXQUFJLEtBQUsyQixNQUFMLENBQVlFLE1BQVosR0FBcUIsQ0FBdEIsR0FBNEIsS0FBS0csWUFBTCxHQUFvQjtJQUZwQyxPQUFqQjs7SUFLQSxhQUFPLEVBQUNrRCxzQkFBRCxFQUFhQyxrQkFBYixFQUFQO0lBQ0Q7O0lBRUQ7Ozs7eURBQ2lDO0lBQUE7O0lBQy9CO0lBQ0E7SUFGK0IsVUFHeEJ0SSxlQUh3QixHQUdMZ0Usb0JBQW9CM0gsVUFIZixDQUd4QjJELGVBSHdCO0lBQUEsK0JBSWEsS0FBS2lGLGdCQUpsQjtJQUFBLFVBSXhCc0Isb0JBSndCLHNCQUl4QkEsb0JBSndCO0lBQUEsVUFJRkQsV0FKRSxzQkFJRkEsV0FKRTs7SUFLL0IsVUFBTW9DLHFCQUFxQm5DLHdCQUF3QixDQUFDRCxXQUFwRDs7SUFFQSxVQUFJb0Msc0JBQXNCLEtBQUt4Qyw0QkFBL0IsRUFBNkQ7SUFDM0QsYUFBS3NDLDJCQUFMO0lBQ0EsYUFBSzVNLFFBQUwsQ0FBY29CLFFBQWQsQ0FBdUJnRCxlQUF2QjtJQUNBLGFBQUtpRywyQkFBTCxHQUFtQ3dDLFdBQVcsWUFBTTtJQUNsRCxrQkFBSzdNLFFBQUwsQ0FBY3FCLFdBQWQsQ0FBMEIrQyxlQUExQjtJQUNELFNBRmtDLEVBRWhDTyxRQUFRSSxrQkFGd0IsQ0FBbkM7SUFHRDtJQUNGOztJQUVEOzs7O3NEQUM4QjtJQUFBLFVBQ3JCWixhQURxQixHQUNKaUUsb0JBQW9CM0gsVUFEaEIsQ0FDckIwRCxhQURxQjs7SUFFNUIsV0FBS25FLFFBQUwsQ0FBY3FCLFdBQWQsQ0FBMEI4QyxhQUExQjtJQUNBLFdBQUttRyw0QkFBTCxHQUFvQyxLQUFwQztJQUNBLFdBQUt0SyxRQUFMLENBQWMrSSxtQkFBZDtJQUNEOzs7Z0RBRXVCO0lBQUE7O0lBQ3RCLFdBQUswQix3QkFBTCxHQUFnQyxLQUFLcEIsZ0JBQUwsQ0FBc0J5QixlQUF0RDtJQUNBLFdBQUt6QixnQkFBTCxHQUF3QixLQUFLQyx1QkFBTCxFQUF4QjtJQUNBO0lBQ0E7SUFDQXVELGlCQUFXO0lBQUEsZUFBTSxRQUFLcEMsd0JBQUwsR0FBZ0MsSUFBdEM7SUFBQSxPQUFYLEVBQXVEckMsb0JBQW9CekQsT0FBcEIsQ0FBNEJLLFlBQW5GO0lBQ0Q7O0lBRUQ7Ozs7Ozs7b0NBSVk0QixHQUFHO0lBQUE7O0lBQ2IsVUFBTStFLGtCQUFrQixLQUFLdEMsZ0JBQTdCO0lBQ0E7SUFDQSxVQUFJLENBQUNzQyxnQkFBZ0JqQixXQUFyQixFQUFrQztJQUNoQztJQUNEOztJQUVELFVBQU1xQywyQ0FBNkNoTCxTQUFjLEVBQWQsRUFBa0I0SixlQUFsQixDQUFuRDs7SUFFQSxVQUFJQSxnQkFBZ0JaLGNBQXBCLEVBQW9DO0lBQ2xDLFlBQU1pQyxZQUFZLElBQWxCO0lBQ0FsRCw4QkFBc0I7SUFBQSxpQkFBTSxRQUFLbUQsb0JBQUwsQ0FBMEJELFNBQTFCLEVBQXFDRCxLQUFyQyxDQUFOO0lBQUEsU0FBdEI7SUFDQSxhQUFLZCxxQkFBTDtJQUNELE9BSkQsTUFJTztJQUNMLGFBQUtiLCtCQUFMO0lBQ0F0Qiw4QkFBc0IsWUFBTTtJQUMxQixrQkFBS1QsZ0JBQUwsQ0FBc0JzQixvQkFBdEIsR0FBNkMsSUFBN0M7SUFDQSxrQkFBS3NDLG9CQUFMLENBQTBCckcsQ0FBMUIsRUFBNkJtRyxLQUE3QjtJQUNBLGtCQUFLZCxxQkFBTDtJQUNELFNBSkQ7SUFLRDtJQUNGOztJQUVEOzs7Ozs7cUNBR3lCO0lBQUEsVUFBZEksS0FBYyx1RUFBTixJQUFNOztJQUN2QixXQUFLekMsV0FBTCxDQUFpQnlDLEtBQWpCO0lBQ0Q7O0lBRUQ7Ozs7Ozs7OzZDQUtxQnpGLFNBQWtEO0lBQUEsVUFBOUNnRSxxQkFBOEMsUUFBOUNBLHFCQUE4QztJQUFBLFVBQXZCQyxvQkFBdUIsUUFBdkJBLG9CQUF1Qjs7SUFDckUsVUFBSUQseUJBQXlCQyxvQkFBN0IsRUFBbUQ7SUFDakQsYUFBS0wsOEJBQUw7SUFDRDtJQUNGOzs7aUNBRVE7SUFBQTs7SUFDUCxVQUFJLEtBQUt2QixZQUFULEVBQXVCO0lBQ3JCaUUsNkJBQXFCLEtBQUtqRSxZQUExQjtJQUNEO0lBQ0QsV0FBS0EsWUFBTCxHQUFvQmEsc0JBQXNCLFlBQU07SUFDOUMsZ0JBQUtvQixlQUFMO0lBQ0EsZ0JBQUtqQyxZQUFMLEdBQW9CLENBQXBCO0lBQ0QsT0FIbUIsQ0FBcEI7SUFJRDs7SUFFRDs7OzswQ0FDa0I7SUFBQTs7SUFDaEIsV0FBS0MsTUFBTCxHQUFjLEtBQUtsSixRQUFMLENBQWMrSSxtQkFBZCxFQUFkO0lBQ0EsVUFBTW9FLFNBQVNDLEtBQUtDLEdBQUwsQ0FBUyxLQUFLbkUsTUFBTCxDQUFZRSxNQUFyQixFQUE2QixLQUFLRixNQUFMLENBQVlDLEtBQXpDLENBQWY7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsVUFBTW1FLG1CQUFtQixTQUFuQkEsZ0JBQW1CLEdBQU07SUFDN0IsWUFBTUMsYUFBYUgsS0FBS0ksSUFBTCxDQUFVSixLQUFLSyxHQUFMLENBQVMsUUFBS3ZFLE1BQUwsQ0FBWUMsS0FBckIsRUFBNEIsQ0FBNUIsSUFBaUNpRSxLQUFLSyxHQUFMLENBQVMsUUFBS3ZFLE1BQUwsQ0FBWUUsTUFBckIsRUFBNkIsQ0FBN0IsQ0FBM0MsQ0FBbkI7SUFDQSxlQUFPbUUsYUFBYW5GLG9CQUFvQnpELE9BQXBCLENBQTRCQyxPQUFoRDtJQUNELE9BSEQ7O0lBS0EsV0FBSzRFLFVBQUwsR0FBa0IsS0FBS3hKLFFBQUwsQ0FBY3NJLFdBQWQsS0FBOEI2RSxNQUE5QixHQUF1Q0csa0JBQXpEOztJQUVBO0lBQ0EsV0FBSy9ELFlBQUwsR0FBb0I0RCxTQUFTL0Usb0JBQW9CekQsT0FBcEIsQ0FBNEJFLG9CQUF6RDtJQUNBLFdBQUtzRixRQUFMLEdBQWdCLEtBQUtYLFVBQUwsR0FBa0IsS0FBS0QsWUFBdkM7O0lBRUEsV0FBS21FLG9CQUFMO0lBQ0Q7O0lBRUQ7Ozs7K0NBQ3VCO0lBQUEsbUNBR2pCdEYsb0JBQW9CeEgsT0FISDtJQUFBLFVBRW5CMkQsV0FGbUIsMEJBRW5CQSxXQUZtQjtJQUFBLFVBRU5GLFFBRk0sMEJBRU5BLFFBRk07SUFBQSxVQUVJQyxPQUZKLDBCQUVJQSxPQUZKO0lBQUEsVUFFYUUsWUFGYiwwQkFFYUEsWUFGYjs7O0lBS3JCLFdBQUt4RSxRQUFMLENBQWM4SSxpQkFBZCxDQUFnQ3ZFLFdBQWhDLEVBQWdELEtBQUtnRixZQUFyRDtJQUNBLFdBQUt2SixRQUFMLENBQWM4SSxpQkFBZCxDQUFnQ3RFLFlBQWhDLEVBQThDLEtBQUsyRixRQUFuRDs7SUFFQSxVQUFJLEtBQUtuSyxRQUFMLENBQWNzSSxXQUFkLEVBQUosRUFBaUM7SUFDL0IsYUFBSzRCLGdCQUFMLEdBQXdCO0lBQ3RCekMsZ0JBQU0yRixLQUFLTyxLQUFMLENBQVksS0FBS3pFLE1BQUwsQ0FBWUMsS0FBWixHQUFvQixDQUFyQixHQUEyQixLQUFLSSxZQUFMLEdBQW9CLENBQTFELENBRGdCO0lBRXRCNUIsZUFBS3lGLEtBQUtPLEtBQUwsQ0FBWSxLQUFLekUsTUFBTCxDQUFZRSxNQUFaLEdBQXFCLENBQXRCLEdBQTRCLEtBQUtHLFlBQUwsR0FBb0IsQ0FBM0Q7SUFGaUIsU0FBeEI7O0lBS0EsYUFBS3ZKLFFBQUwsQ0FBYzhJLGlCQUFkLENBQWdDekUsUUFBaEMsRUFBNkMsS0FBSzZGLGdCQUFMLENBQXNCekMsSUFBbkU7SUFDQSxhQUFLekgsUUFBTCxDQUFjOEksaUJBQWQsQ0FBZ0N4RSxPQUFoQyxFQUE0QyxLQUFLNEYsZ0JBQUwsQ0FBc0J2QyxHQUFsRTtJQUNEO0lBQ0Y7O0lBRUQ7Ozs7cUNBQ2FpRyxXQUFXO0lBQUEsVUFDZjNKLFNBRGUsR0FDRm1FLG9CQUFvQjNILFVBRGxCLENBQ2Z3RCxTQURlOztJQUV0QixVQUFJMkosU0FBSixFQUFlO0lBQ2IsYUFBSzVOLFFBQUwsQ0FBY29CLFFBQWQsQ0FBdUI2QyxTQUF2QjtJQUNELE9BRkQsTUFFTztJQUNMLGFBQUtqRSxRQUFMLENBQWNxQixXQUFkLENBQTBCNEMsU0FBMUI7SUFDRDtJQUNGOzs7TUE5ZCtCbkU7O1FDeEVyQitOLFVBQWI7SUFBQTtJQUFBO0lBQUE7SUFBQSxvQ0FRMEJDLEdBUjFCLEVBUStCO0lBQzNCLGFBQU9BLElBQUlELFdBQVdFLE9BQWYsRUFBd0IsU0FBeEIsQ0FBUDtJQUNEO0lBVkg7SUFBQTtJQUFBLDJCQUV3QjtJQUNwQjtJQUNBLGFBQU9GLFdBQVdHLFFBQVgsS0FDSEgsV0FBV0csUUFBWCxHQUFzQm5ILG1CQUFtQm9ILFlBQVlDLFNBQS9CLENBRG5CLENBQVA7SUFFRDtJQU5IOztJQVlFLHNCQUFheE8sRUFBYixFQUFpQnlPLE9BQWpCLEVBQTBCO0lBQUE7SUFBQSxrSEFDbEJwTSxTQUFjO0lBQ2xCc0csOEJBQXdCLGtDQUFNO0lBQzVCLGVBQU90QyxxQkFBcUI3RyxNQUFyQixDQUFQO0lBQ0QsT0FIaUI7SUFJbEJvSixtQkFBYSx1QkFBTTtJQUNqQixlQUFPLEtBQVA7SUFDRCxPQU5pQjtJQU9sQkMsdUJBQWlCLDJCQUFNO0lBQ3JCLGVBQU83SSxHQUFHME8sR0FBSCxDQUFPUCxXQUFXRSxPQUFsQixFQUEyQixTQUEzQixDQUFQO0lBQ0QsT0FUaUI7SUFVbEJ2Rix5QkFBbUIsNkJBQU07SUFDdkIsZUFBTzlJLEdBQUcyTyxRQUFWO0lBQ0QsT0FaaUI7SUFhbEJqTixjQWJrQixvQkFhUmxCLFNBYlEsRUFhRztJQUNuQlIsV0FBRzRPLElBQUgsQ0FBUTVPLEdBQUc2TyxPQUFYLEVBQW9Cck8sU0FBcEIsRUFBK0IsSUFBL0I7SUFDRCxPQWZpQjtJQWdCbEJtQixpQkFoQmtCLHVCQWdCTG5CLFNBaEJLLEVBZ0JNO0lBQ3RCUixXQUFHOE8sT0FBSCxDQUFXOU8sR0FBRzZPLE9BQWQsRUFBdUJyTyxTQUF2QjtJQUNELE9BbEJpQjs7SUFtQmxCdUksMkJBQXFCLDZCQUFDM0UsTUFBRDtJQUFBLGVBQVlwRSxHQUFHME8sR0FBSCxDQUFPSyxRQUFQLENBQWdCM0ssTUFBaEIsQ0FBWjtJQUFBLE9BbkJIO0lBb0JsQnhDLGtDQUE0QixvQ0FBQ29CLEdBQUQsRUFBTXRDLE9BQU4sRUFBa0I7SUFDNUNWLFdBQUcwTyxHQUFILENBQU8xSCxnQkFBUCxDQUF3QmhFLEdBQXhCLEVBQTZCdEMsT0FBN0I7SUFDRCxPQXRCaUI7SUF1QmxCbUIsb0NBQThCLHNDQUFDbUIsR0FBRCxFQUFNdEMsT0FBTixFQUFrQjtJQUM5Q1YsV0FBRzBPLEdBQUgsQ0FBT00sbUJBQVAsQ0FBMkJoTSxHQUEzQixFQUFnQ3RDLE9BQWhDO0lBQ0QsT0F6QmlCO0lBMEJsQnNJLDBDQUFvQyw0Q0FBQzNFLE9BQUQsRUFBVTNELE9BQVY7SUFBQSxlQUNsQ2lGLFNBQVNzSixlQUFULENBQXlCakksZ0JBQXpCLENBQTBDM0MsT0FBMUMsRUFBbUQzRCxPQUFuRCxFQUE0RGtHLGNBQTVELENBRGtDO0lBQUEsT0ExQmxCO0lBNEJsQnFDLDRDQUFzQyw4Q0FBQzVFLE9BQUQsRUFBVTNELE9BQVY7SUFBQSxlQUNwQ2lGLFNBQVNzSixlQUFULENBQXlCRCxtQkFBekIsQ0FBNkMzSyxPQUE3QyxFQUFzRDNELE9BQXRELEVBQStEa0csY0FBL0QsQ0FEb0M7SUFBQSxPQTVCcEI7SUE4QmxCc0MsNkJBQXVCLCtCQUFDeEksT0FBRCxFQUFhO0lBQ2xDLGVBQU9sQixPQUFPd0gsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0N0RyxPQUFsQyxDQUFQO0lBQ0QsT0FoQ2lCO0lBaUNsQnlJLCtCQUF5QixpQ0FBQ3pJLE9BQUQsRUFBYTtJQUNwQyxlQUFPbEIsT0FBT3dQLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDdE8sT0FBckMsQ0FBUDtJQUNELE9BbkNpQjtJQW9DbEIwSSx5QkFBbUIsMkJBQUM5RSxPQUFELEVBQVV6RCxLQUFWLEVBQW9CO0lBQ3JDYixXQUFHNE8sSUFBSCxDQUFRNU8sR0FBR2tQLE1BQVgsRUFBbUI1SyxPQUFuQixFQUE0QnpELEtBQTVCO0lBQ0QsT0F0Q2lCO0lBdUNsQndJLDJCQUFxQiwrQkFBTTtJQUN6QixlQUFPckosR0FBRzBPLEdBQUgsQ0FBT1MscUJBQVAsRUFBUDtJQUNELE9BekNpQjtJQTBDbEI3RiwyQkFBcUIsK0JBQU07SUFDekIsZUFBUSxFQUFDMUIsR0FBR3BJLE9BQU80UCxXQUFYLEVBQXdCdkgsR0FBR3JJLE9BQU82UCxXQUFsQyxFQUFSO0lBQ0Q7SUE1Q2lCLEtBQWQsRUE2Q0haLE9BN0NHLENBRGtCO0lBK0N6Qjs7SUEzREg7SUFBQSxFQUFnQy9GLG1CQUFoQzs7QUNXQSx3QkFBZSxFQUFDNEc7O09BQUQscUJBQUE7SUFDYm5QLFFBQU0saUJBRE87SUFFYm9QLFNBQU87SUFDTEMsY0FBVSxDQUFDQyxNQUFELEVBQVM1RCxNQUFULENBREw7SUFFTDZELGVBQVcsQ0FBQ0QsTUFBRCxFQUFTNUQsTUFBVCxDQUZOO0lBR0xoTCxXQUFPOE8sT0FIRjtJQUlMaEIsY0FBVWdCLE9BSkw7SUFLTEMsWUFBUUQ7SUFMSCxHQUZNO0lBU2JFLE1BVGEsa0JBU0w7SUFDTixXQUFPO0lBQ0xoQixlQUFTO0lBQ1AsbUNBQTJCLEtBQUtlO0lBRHpCLE9BREo7SUFJTFYsY0FBUSxFQUpIO0lBS0xZLG1CQUFhLEVBTFI7SUFNTGxQLGdCQUFVLENBTkw7SUFPTEQsWUFBTTtJQVBELEtBQVA7SUFTRCxHQW5CWTs7SUFvQmJvUCxTQUFPO0lBQ0xsUCxTQURLLGlCQUNFQSxNQURGLEVBQ1M7SUFDWixXQUFLbVAsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCMU0sTUFBaEIsQ0FBdUJ6QyxNQUF2QixDQUFuQjtJQUNELEtBSEk7SUFJTDhOLFlBSkssb0JBSUtBLFNBSkwsRUFJZTtJQUNsQixXQUFLcUIsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCQyxXQUFoQixDQUE0QnRCLFNBQTVCLENBQW5CO0lBQ0QsS0FOSTtJQU9MdUIsZ0JBUEssMEJBT1c7SUFDZixXQUFLRixVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0I1TSxpQkFBaEIsRUFBbkI7SUFDQSxLQVRJO0lBVUwrTSxpQkFWSywyQkFVWTtJQUNqQixXQUFLSCxVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0I1TSxpQkFBaEIsRUFBbkI7SUFDQyxLQVpJO0lBYUx3TSxVQWJLLGtCQWFHL08sS0FiSCxFQWFVO0lBQ2IsV0FBSytOLElBQUwsQ0FBVSxLQUFLQyxPQUFmLEVBQXdCLDRCQUF4QixFQUFzRGhPLEtBQXREO0lBQ0Q7SUFmSSxHQXBCTTtJQXFDYnVQLFlBQVU7SUFDUkYsZ0JBRFEsMEJBQ1E7SUFDZCxVQUFJNU0sU0FBUyxLQUFLa00sUUFBbEI7SUFDQSxhQUFPbE0sVUFBVVEsS0FBS3VNLFNBQUwsQ0FBZ0IsT0FBTy9NLE1BQVAsS0FBa0IsUUFBbkIsR0FBK0I7SUFDN0RJLGlCQUFTSixNQURvRDtJQUU3REcsa0JBQVU7SUFGbUQsT0FBL0IsR0FHNUI7SUFDRkMsaUJBQVNKLE9BQU9nTixJQUFQLElBQWVoTixPQUFPSSxPQUQ3QjtJQUVGQyxlQUFPTCxPQUFPSyxLQUZaO0lBR0ZGLGtCQUFVSCxPQUFPZ04sSUFBUCxHQUFjLGdCQUFkLEdBQWlDaE4sT0FBT0c7SUFIaEQsT0FIYSxDQUFqQjtJQVFELEtBWE87SUFZUjBNLGlCQVpRLDJCQVlTO0lBQ2YsVUFBSTdNLFNBQVMsS0FBS29NLFNBQWxCO0lBQ0EsYUFBT3BNLFVBQVVRLEtBQUt1TSxTQUFMLENBQWdCLE9BQU8vTSxNQUFQLEtBQWtCLFFBQW5CLEdBQStCO0lBQzdESSxpQkFBU0osTUFEb0Q7SUFFN0RHLGtCQUFVO0lBRm1ELE9BQS9CLEdBRzVCO0lBQ0ZDLGlCQUFTSixPQUFPZ04sSUFBUCxJQUFlaE4sT0FBT0ksT0FEN0I7SUFFRkMsZUFBT0wsT0FBT0ssS0FGWjtJQUdGRixrQkFBVUgsT0FBT2dOLElBQVAsR0FBYyxnQkFBZCxHQUFpQ2hOLE9BQU9HO0lBSGhELE9BSGEsQ0FBakI7SUFRRDtJQXRCTyxHQXJDRztJQTZEYjhNLFNBN0RhLHFCQTZERjtJQUFBOztJQUNULFNBQUtQLFVBQUwsR0FBa0IsSUFBSXZPLHVCQUFKLENBQTRCO0lBQzVDQyxnQkFBVSxrQkFBQ2xCLFNBQUQ7SUFBQSxlQUFlLE1BQUtvTyxJQUFMLENBQVUsTUFBS2tCLFdBQWYsRUFBNEJ0UCxTQUE1QixFQUF1QyxJQUF2QyxDQUFmO0lBQUEsT0FEa0M7SUFFNUNtQixtQkFBYSxxQkFBQ25CLFNBQUQ7SUFBQSxlQUFlLE1BQUtzTyxPQUFMLENBQWEsTUFBS2dCLFdBQWxCLEVBQStCdFAsU0FBL0IsQ0FBZjtJQUFBLE9BRitCO0lBRzVDb0Isa0NBQTRCLG9DQUFDb0IsR0FBRCxFQUFNdEMsT0FBTjtJQUFBLGVBQzFCLE1BQUtnTyxHQUFMLENBQVMxSCxnQkFBVCxDQUEwQmhFLEdBQTFCLEVBQStCdEMsT0FBL0IsQ0FEMEI7SUFBQSxPQUhnQjtJQUs1Q21CLG9DQUE4QixzQ0FBQ21CLEdBQUQsRUFBTXRDLE9BQU47SUFBQSxlQUM1QixNQUFLZ08sR0FBTCxDQUFTTSxtQkFBVCxDQUE2QmhNLEdBQTdCLEVBQWtDdEMsT0FBbEMsQ0FENEI7SUFBQSxPQUxjO0lBTzVDb0IsZUFBUyxpQkFBQ25CLElBQUQsRUFBVTtJQUFFLGNBQUtBLElBQUwsR0FBWUEsSUFBWjtJQUFrQixPQVBLO0lBUTVDb0IsbUJBQWE7SUFBQSxlQUFNLE1BQUtuQixRQUFYO0lBQUEsT0FSK0I7SUFTNUNvQixtQkFBYSxxQkFBQ3BCLFFBQUQsRUFBYztJQUFFLGNBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0lBQTBCLE9BVFg7SUFVNUNxQixlQUFTLGlCQUFDOUIsSUFBRCxFQUFPVSxLQUFQO0lBQUEsZUFBaUIsTUFBSzZOLEdBQUwsQ0FBUzhCLFlBQVQsQ0FBc0JyUSxJQUF0QixFQUE0QlUsS0FBNUIsQ0FBakI7SUFBQSxPQVZtQztJQVc1Q3FCLGVBQVMsaUJBQUMvQixJQUFELEVBQU9VLEtBQVAsRUFBaUI7SUFBRSxjQUFLNk4sR0FBTCxDQUFTK0IsWUFBVCxDQUFzQnRRLElBQXRCLEVBQTRCVSxLQUE1QjtJQUFvQyxPQVhwQjtJQVk1Q3NCLGNBQVEsZ0JBQUNoQyxJQUFELEVBQVU7SUFBRSxjQUFLdU8sR0FBTCxDQUFTZ0MsZUFBVCxDQUF5QnZRLElBQXpCO0lBQWdDLE9BWlI7SUFhNUNpQyxvQkFBYyxzQkFBQ3RCLE9BQUQsRUFBYTtJQUFFLGNBQUs2UCxLQUFMLENBQVcsT0FBWCxFQUFvQjdQLFFBQVF5QyxJQUE1QjtJQUFtQztJQWJwQixLQUE1QixDQUFsQjtJQWVBLFNBQUt5TSxVQUFMLENBQWdCWSxJQUFoQjtJQUNBLFNBQUtaLFVBQUwsQ0FBZ0IxTSxNQUFoQixDQUF1QixLQUFLekMsS0FBNUI7SUFDQSxTQUFLbVAsVUFBTCxDQUFnQkMsV0FBaEIsQ0FBNEIsS0FBS3RCLFFBQWpDOztJQUVBLFNBQUtrQyxNQUFMLEdBQWMsSUFBSTFDLFVBQUosQ0FBZSxJQUFmLEVBQXFCO0lBQ2pDdkYsbUJBQWE7SUFBQSxlQUFNLElBQU47SUFBQSxPQURvQjtJQUVqQ0MsdUJBQWlCO0lBQUEsZUFBTSxNQUFLbUgsVUFBTCxDQUFnQmMsbUJBQWhCLEVBQU47SUFBQTtJQUZnQixLQUFyQixDQUFkO0lBSUEsU0FBS0QsTUFBTCxDQUFZRCxJQUFaO0lBQ0QsR0F0Rlk7SUF1RmJHLGVBdkZhLDJCQXVGSTtJQUNmLFNBQUtmLFVBQUwsQ0FBZ0JnQixPQUFoQjtJQUNBLFNBQUtILE1BQUwsQ0FBWUcsT0FBWjtJQUNEO0lBMUZZLENBQWY7O0FDUEEsaUJBQWVwUixXQUFXO0lBQ3hCcVI7SUFEd0IsQ0FBWCxDQUFmOztJQ0ZBNVIsU0FBU0MsTUFBVDs7Ozs7Ozs7In0=
