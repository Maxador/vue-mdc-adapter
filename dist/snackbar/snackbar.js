/**
* @module vue-mdc-adaptersnackbar 0.13.2
* @exports VueMDCSnackbar
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSnackbar = factory());
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
    ROOT: 'mdc-snackbar',
    TEXT: 'mdc-snackbar__text',
    ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
    ACTION_BUTTON: 'mdc-snackbar__action-button',
    ACTIVE: 'mdc-snackbar--active',
    MULTILINE: 'mdc-snackbar--multiline',
    ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom'
  };

  var strings = {
    TEXT_SELECTOR: '.mdc-snackbar__text',
    ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
    ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
    SHOW_EVENT: 'MDCSnackbar:show',
    HIDE_EVENT: 'MDCSnackbar:hide'
  };

  var numbers = {
    MESSAGE_TIMEOUT: 2750
  };

  /**
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

  var MDCSnackbarFoundation = function (_MDCFoundation) {
    inherits(MDCSnackbarFoundation, _MDCFoundation);
    createClass(MDCSnackbarFoundation, [{
      key: 'active',
      get: function get$$1() {
        return this.active_;
      }
    }], [{
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
          setAriaHidden: function setAriaHidden() {},
          unsetAriaHidden: function unsetAriaHidden() {},
          setActionAriaHidden: function setActionAriaHidden() {},
          unsetActionAriaHidden: function unsetActionAriaHidden() {},
          setActionText: function setActionText() /* actionText: string */{},
          setMessageText: function setMessageText() /* message: string */{},
          setFocus: function setFocus() {},
          visibilityIsHidden: function visibilityIsHidden() {
            return (/* boolean */false
            );
          },
          registerCapturedBlurHandler: function registerCapturedBlurHandler() /* handler: EventListener */{},
          deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler() /* handler: EventListener */{},
          registerVisibilityChangeHandler: function registerVisibilityChangeHandler() /* handler: EventListener */{},
          deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler() /* handler: EventListener */{},
          registerCapturedInteractionHandler: function registerCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerActionClickHandler: function registerActionClickHandler() /* handler: EventListener */{},
          deregisterActionClickHandler: function deregisterActionClickHandler() /* handler: EventListener */{},
          registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
          notifyShow: function notifyShow() {},
          notifyHide: function notifyHide() {}
        };
      }
    }]);

    function MDCSnackbarFoundation(adapter) {
      classCallCheck(this, MDCSnackbarFoundation);

      var _this = possibleConstructorReturn(this, (MDCSnackbarFoundation.__proto__ || Object.getPrototypeOf(MDCSnackbarFoundation)).call(this, _extends(MDCSnackbarFoundation.defaultAdapter, adapter)));

      _this.active_ = false;
      _this.actionWasClicked_ = false;
      _this.dismissOnAction_ = true;
      _this.firstFocus_ = true;
      _this.pointerDownRecognized_ = false;
      _this.snackbarHasFocus_ = false;
      _this.snackbarData_ = null;
      _this.queue_ = [];
      _this.actionClickHandler_ = function () {
        _this.actionWasClicked_ = true;
        _this.invokeAction_();
      };
      _this.visibilitychangeHandler_ = function () {
        clearTimeout(_this.timeoutId_);
        _this.snackbarHasFocus_ = true;

        if (!_this.adapter_.visibilityIsHidden()) {
          setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
        }
      };
      _this.interactionHandler_ = function (evt) {
        if (evt.type == 'touchstart' || evt.type == 'mousedown') {
          _this.pointerDownRecognized_ = true;
        }
        _this.handlePossibleTabKeyboardFocus_(evt);

        if (evt.type == 'focus') {
          _this.pointerDownRecognized_ = false;
        }
      };
      _this.blurHandler_ = function () {
        clearTimeout(_this.timeoutId_);
        _this.snackbarHasFocus_ = false;
        _this.timeoutId_ = setTimeout(_this.cleanup_.bind(_this), _this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
      };
      return _this;
    }

    createClass(MDCSnackbarFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerActionClickHandler(this.actionClickHandler_);
        this.adapter_.setAriaHidden();
        this.adapter_.setActionAriaHidden();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this2 = this;

        this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
        this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
        this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
        ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
          _this2.adapter_.deregisterCapturedInteractionHandler(evtType, _this2.interactionHandler_);
        });
      }
    }, {
      key: 'dismissesOnAction',
      value: function dismissesOnAction() {
        return this.dismissOnAction_;
      }
    }, {
      key: 'setDismissOnAction',
      value: function setDismissOnAction(dismissOnAction) {
        this.dismissOnAction_ = !!dismissOnAction;
      }
    }, {
      key: 'show',
      value: function show(data) {
        var _this3 = this;

        if (!data) {
          throw new Error('Please provide a data object with at least a message to display.');
        }
        if (!data.message) {
          throw new Error('Please provide a message to be displayed.');
        }
        if (data.actionHandler && !data.actionText) {
          throw new Error('Please provide action text with the handler.');
        }
        if (this.active) {
          this.queue_.push(data);
          return;
        }
        clearTimeout(this.timeoutId_);
        this.snackbarData_ = data;
        this.firstFocus_ = true;
        this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
        this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
        ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
          _this3.adapter_.registerCapturedInteractionHandler(evtType, _this3.interactionHandler_);
        });

        var ACTIVE = cssClasses.ACTIVE,
            MULTILINE = cssClasses.MULTILINE,
            ACTION_ON_BOTTOM = cssClasses.ACTION_ON_BOTTOM;


        this.adapter_.setMessageText(this.snackbarData_.message);

        if (this.snackbarData_.multiline) {
          this.adapter_.addClass(MULTILINE);
          if (this.snackbarData_.actionOnBottom) {
            this.adapter_.addClass(ACTION_ON_BOTTOM);
          }
        }

        if (this.snackbarData_.actionHandler) {
          this.adapter_.setActionText(this.snackbarData_.actionText);
          this.actionHandler_ = this.snackbarData_.actionHandler;
          this.setActionHidden_(false);
        } else {
          this.setActionHidden_(true);
          this.actionHandler_ = null;
          this.adapter_.setActionText(null);
        }

        this.active_ = true;
        this.adapter_.addClass(ACTIVE);
        this.adapter_.unsetAriaHidden();
        this.adapter_.notifyShow();

        this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT);
      }
    }, {
      key: 'handlePossibleTabKeyboardFocus_',
      value: function handlePossibleTabKeyboardFocus_() {
        var hijackFocus = this.firstFocus_ && !this.pointerDownRecognized_;

        if (hijackFocus) {
          this.setFocusOnAction_();
        }

        this.firstFocus_ = false;
      }
    }, {
      key: 'setFocusOnAction_',
      value: function setFocusOnAction_() {
        this.adapter_.setFocus();
        this.snackbarHasFocus_ = true;
        this.firstFocus_ = false;
      }
    }, {
      key: 'invokeAction_',
      value: function invokeAction_() {
        try {
          if (!this.actionHandler_) {
            return;
          }

          this.actionHandler_();
        } finally {
          if (this.dismissOnAction_) {
            this.cleanup_();
          }
        }
      }
    }, {
      key: 'cleanup_',
      value: function cleanup_() {
        var _this4 = this;

        var allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

        if (allowDismissal) {
          var ACTIVE = cssClasses.ACTIVE,
              MULTILINE = cssClasses.MULTILINE,
              ACTION_ON_BOTTOM = cssClasses.ACTION_ON_BOTTOM;


          this.adapter_.removeClass(ACTIVE);

          var handler = function handler() {
            clearTimeout(_this4.timeoutId_);
            _this4.adapter_.deregisterTransitionEndHandler(handler);
            _this4.adapter_.removeClass(MULTILINE);
            _this4.adapter_.removeClass(ACTION_ON_BOTTOM);
            _this4.setActionHidden_(true);
            _this4.adapter_.setAriaHidden();
            _this4.active_ = false;
            _this4.snackbarHasFocus_ = false;
            _this4.adapter_.notifyHide();
            _this4.showNext_();
          };

          this.adapter_.registerTransitionEndHandler(handler);
        }
      }
    }, {
      key: 'showNext_',
      value: function showNext_() {
        if (!this.queue_.length) {
          return;
        }
        this.show(this.queue_.shift());
      }
    }, {
      key: 'setActionHidden_',
      value: function setActionHidden_(isHidden) {
        if (isHidden) {
          this.adapter_.setActionAriaHidden();
        } else {
          this.adapter_.unsetActionAriaHidden();
        }
      }
    }]);
    return MDCSnackbarFoundation;
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

  var mdcSnackbar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "mdc-snackbar", class: _vm.classes, attrs: { "aria-live": "assertive", "aria-atomic": "true", "aria-hidden": _vm.hidden } }, [_c('div', { staticClass: "mdc-snackbar__text" }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _c('div', { staticClass: "mdc-snackbar__action-wrapper" }, [_c('button', { ref: "button", staticClass: "mdc-snackbar__action-button", attrs: { "type": "button", "aria-hidden": _vm.actionHidden } }, [_vm._v(_vm._s(_vm.actionText))])])]);
    }, staticRenderFns: [],
    name: 'mdc-snackbar',
    props: {
      'align-start': Boolean,
      'event': {
        type: String,
        required: false,
        default: function _default() {
          return 'show-snackbar';
        }
      },
      'event-source': {
        type: Object,
        required: false,
        default: function _default() {
          return this.$root;
        }
      },
      'dismisses-on-action': { type: Boolean, default: true }
    },
    data: function data() {
      return {
        classes: {
          'mdc-snackbar--align-start': this.alignStart
        },
        message: '',
        actionText: '',
        hidden: false,
        actionHidden: false
      };
    },

    methods: {
      show: function show(data) {
        this.foundation.show(data);
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCSnackbarFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        setAriaHidden: function setAriaHidden() {
          return _this.hidden = true;
        },
        unsetAriaHidden: function unsetAriaHidden() {
          return _this.hidden = false;
        },
        setActionAriaHidden: function setActionAriaHidden() {
          return _this.actionHidden = true;
        },
        unsetActionAriaHidden: function unsetActionAriaHidden() {
          return _this.actionHidden = false;
        },
        setActionText: function setActionText(text) {
          _this.actionText = text;
        },
        setMessageText: function setMessageText(text) {
          _this.message = text;
        },
        setFocus: function setFocus() {
          return _this.$refs.button.focus();
        },
        visibilityIsHidden: function visibilityIsHidden() {
          return document.hidden;
        },
        registerCapturedBlurHandler: function registerCapturedBlurHandler(handler) {
          return _this.$refs.button.addEventListener('blur', handler, true);
        },
        deregisterCapturedBlurHandler: function deregisterCapturedBlurHandler(handler) {
          return _this.$refs.button.removeEventListener('blur', handler, true);
        },
        registerVisibilityChangeHandler: function registerVisibilityChangeHandler(handler) {
          return document.addEventListener('visibilitychange', handler);
        },
        deregisterVisibilityChangeHandler: function deregisterVisibilityChangeHandler(handler) {
          return document.removeEventListener('visibilitychange', handler);
        },
        registerCapturedInteractionHandler: function registerCapturedInteractionHandler(evt, handler) {
          return document.body.addEventListener(evt, handler, true);
        },
        deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler(evt, handler) {
          return document.body.removeEventListener(evt, handler, true);
        },
        registerActionClickHandler: function registerActionClickHandler(handler) {
          return _this.$refs.button.addEventListener('click', handler);
        },
        deregisterActionClickHandler: function deregisterActionClickHandler(handler) {
          return _this.$refs.button.removeEventListener('click', handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          _this.$refs.root.addEventListener(getCorrectEventName(window, 'transitionend'), handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          _this.$refs.root.removeEventListener(getCorrectEventName(window, 'transitionend'), handler);
        },
        notifyShow: function notifyShow() {
          return _this.$emit('show');
        },
        notifyHide: function notifyHide() {
          return _this.$emit('hide');
        }
      });
      this.foundation.init();
      if (this.event) {
        this.eventSource.$on(this.event, function (data) {
          _this.foundation.show(data);
        });
      }
      this.foundation.setDismissOnAction(this.dismissesOnAction);
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var plugin = BasePlugin({
    mdcSnackbar: mdcSnackbar
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2tiYXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbmFja2Jhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NuYWNrYmFyL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc25hY2tiYXIvbWRjLXNuYWNrYmFyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc25hY2tiYXIvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3NuYWNrYmFyL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50IChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQge01EQ0ZvdW5kYXRpb24sIE1EQ0NvbXBvbmVudH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtc25hY2tiYXInLFxuICBURVhUOiAnbWRjLXNuYWNrYmFyX190ZXh0JyxcbiAgQUNUSU9OX1dSQVBQRVI6ICdtZGMtc25hY2tiYXJfX2FjdGlvbi13cmFwcGVyJyxcbiAgQUNUSU9OX0JVVFRPTjogJ21kYy1zbmFja2Jhcl9fYWN0aW9uLWJ1dHRvbicsXG4gIEFDVElWRTogJ21kYy1zbmFja2Jhci0tYWN0aXZlJyxcbiAgTVVMVElMSU5FOiAnbWRjLXNuYWNrYmFyLS1tdWx0aWxpbmUnLFxuICBBQ1RJT05fT05fQk9UVE9NOiAnbWRjLXNuYWNrYmFyLS1hY3Rpb24tb24tYm90dG9tJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBURVhUX1NFTEVDVE9SOiAnLm1kYy1zbmFja2Jhcl9fdGV4dCcsXG4gIEFDVElPTl9XUkFQUEVSX1NFTEVDVE9SOiAnLm1kYy1zbmFja2Jhcl9fYWN0aW9uLXdyYXBwZXInLFxuICBBQ1RJT05fQlVUVE9OX1NFTEVDVE9SOiAnLm1kYy1zbmFja2Jhcl9fYWN0aW9uLWJ1dHRvbicsXG4gIFNIT1dfRVZFTlQ6ICdNRENTbmFja2JhcjpzaG93JyxcbiAgSElERV9FVkVOVDogJ01EQ1NuYWNrYmFyOmhpZGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IG51bWJlcnMgPSB7XG4gIE1FU1NBR0VfVElNRU9VVDogMjc1MCxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge01EQ0ZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2luZGV4JztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENTbmFja2JhckZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldEFyaWFIaWRkZW46ICgpID0+IHt9LFxuICAgICAgdW5zZXRBcmlhSGlkZGVuOiAoKSA9PiB7fSxcbiAgICAgIHNldEFjdGlvbkFyaWFIaWRkZW46ICgpID0+IHt9LFxuICAgICAgdW5zZXRBY3Rpb25BcmlhSGlkZGVuOiAoKSA9PiB7fSxcbiAgICAgIHNldEFjdGlvblRleHQ6ICgvKiBhY3Rpb25UZXh0OiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0TWVzc2FnZVRleHQ6ICgvKiBtZXNzYWdlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0Rm9jdXM6ICgpID0+IHt9LFxuICAgICAgdmlzaWJpbGl0eUlzSGlkZGVuOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgcmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJDYXB0dXJlZEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBub3RpZnlTaG93OiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUhpZGU6ICgpID0+IHt9LFxuICAgIH07XG4gIH1cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZV87XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENTbmFja2JhckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIHRoaXMuYWN0aXZlXyA9IGZhbHNlO1xuICAgIHRoaXMuYWN0aW9uV2FzQ2xpY2tlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmRpc21pc3NPbkFjdGlvbl8gPSB0cnVlO1xuICAgIHRoaXMuZmlyc3RGb2N1c18gPSB0cnVlO1xuICAgIHRoaXMucG9pbnRlckRvd25SZWNvZ25pemVkXyA9IGZhbHNlO1xuICAgIHRoaXMuc25hY2tiYXJIYXNGb2N1c18gPSBmYWxzZTtcbiAgICB0aGlzLnNuYWNrYmFyRGF0YV8gPSBudWxsO1xuICAgIHRoaXMucXVldWVfID0gW107XG4gICAgdGhpcy5hY3Rpb25DbGlja0hhbmRsZXJfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3Rpb25XYXNDbGlja2VkXyA9IHRydWU7XG4gICAgICB0aGlzLmludm9rZUFjdGlvbl8oKTtcbiAgICB9O1xuICAgIHRoaXMudmlzaWJpbGl0eWNoYW5nZUhhbmRsZXJfID0gKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkXyk7XG4gICAgICB0aGlzLnNuYWNrYmFySGFzRm9jdXNfID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLmFkYXB0ZXJfLnZpc2liaWxpdHlJc0hpZGRlbigpKSB7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5jbGVhbnVwXy5iaW5kKHRoaXMpLCB0aGlzLnNuYWNrYmFyRGF0YV8udGltZW91dCB8fCBudW1iZXJzLk1FU1NBR0VfVElNRU9VVCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZXZ0LnR5cGUgPT0gJ3RvdWNoc3RhcnQnIHx8IGV2dC50eXBlID09ICdtb3VzZWRvd24nKSB7XG4gICAgICAgIHRoaXMucG9pbnRlckRvd25SZWNvZ25pemVkXyA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmhhbmRsZVBvc3NpYmxlVGFiS2V5Ym9hcmRGb2N1c18oZXZ0KTtcblxuICAgICAgaWYgKGV2dC50eXBlID09ICdmb2N1cycpIHtcbiAgICAgICAgdGhpcy5wb2ludGVyRG93blJlY29nbml6ZWRfID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZF8pO1xuICAgICAgdGhpcy5zbmFja2Jhckhhc0ZvY3VzXyA9IGZhbHNlO1xuICAgICAgdGhpcy50aW1lb3V0SWRfID0gc2V0VGltZW91dCh0aGlzLmNsZWFudXBfLmJpbmQodGhpcyksIHRoaXMuc25hY2tiYXJEYXRhXy50aW1lb3V0IHx8IG51bWJlcnMuTUVTU0FHRV9USU1FT1VUKTtcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQWN0aW9uQ2xpY2tIYW5kbGVyKHRoaXMuYWN0aW9uQ2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBcmlhSGlkZGVuKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBY3Rpb25BcmlhSGlkZGVuKCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlcih0aGlzLmFjdGlvbkNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckNhcHR1cmVkQmx1ckhhbmRsZXIodGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclZpc2liaWxpdHlDaGFuZ2VIYW5kbGVyKHRoaXMudmlzaWJpbGl0eWNoYW5nZUhhbmRsZXJfKTtcbiAgICBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJywgJ2ZvY3VzJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyQ2FwdHVyZWRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRpc21pc3Nlc09uQWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRpc21pc3NPbkFjdGlvbl87XG4gIH1cblxuICBzZXREaXNtaXNzT25BY3Rpb24oZGlzbWlzc09uQWN0aW9uKSB7XG4gICAgdGhpcy5kaXNtaXNzT25BY3Rpb25fID0gISFkaXNtaXNzT25BY3Rpb247XG4gIH1cblxuICBzaG93KGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1BsZWFzZSBwcm92aWRlIGEgZGF0YSBvYmplY3Qgd2l0aCBhdCBsZWFzdCBhIG1lc3NhZ2UgdG8gZGlzcGxheS4nKTtcbiAgICB9XG4gICAgaWYgKCFkYXRhLm1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgYSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZC4nKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuYWN0aW9uSGFuZGxlciAmJiAhZGF0YS5hY3Rpb25UZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGFjdGlvbiB0ZXh0IHdpdGggdGhlIGhhbmRsZXIuJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5xdWV1ZV8ucHVzaChkYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkXyk7XG4gICAgdGhpcy5zbmFja2JhckRhdGFfID0gZGF0YTtcbiAgICB0aGlzLmZpcnN0Rm9jdXNfID0gdHJ1ZTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXIodGhpcy52aXNpYmlsaXR5Y2hhbmdlSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJDYXB0dXJlZEJsdXJIYW5kbGVyKHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJywgJ2ZvY3VzJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB7QUNUSVZFLCBNVUxUSUxJTkUsIEFDVElPTl9PTl9CT1RUT019ID0gY3NzQ2xhc3NlcztcblxuICAgIHRoaXMuYWRhcHRlcl8uc2V0TWVzc2FnZVRleHQodGhpcy5zbmFja2JhckRhdGFfLm1lc3NhZ2UpO1xuXG4gICAgaWYgKHRoaXMuc25hY2tiYXJEYXRhXy5tdWx0aWxpbmUpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTVVMVElMSU5FKTtcbiAgICAgIGlmICh0aGlzLnNuYWNrYmFyRGF0YV8uYWN0aW9uT25Cb3R0b20pIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhBQ1RJT05fT05fQk9UVE9NKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zbmFja2JhckRhdGFfLmFjdGlvbkhhbmRsZXIpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QWN0aW9uVGV4dCh0aGlzLnNuYWNrYmFyRGF0YV8uYWN0aW9uVGV4dCk7XG4gICAgICB0aGlzLmFjdGlvbkhhbmRsZXJfID0gdGhpcy5zbmFja2JhckRhdGFfLmFjdGlvbkhhbmRsZXI7XG4gICAgICB0aGlzLnNldEFjdGlvbkhpZGRlbl8oZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEFjdGlvbkhpZGRlbl8odHJ1ZSk7XG4gICAgICB0aGlzLmFjdGlvbkhhbmRsZXJfID0gbnVsbDtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QWN0aW9uVGV4dChudWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZV8gPSB0cnVlO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoQUNUSVZFKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVuc2V0QXJpYUhpZGRlbigpO1xuICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5U2hvdygpO1xuXG4gICAgdGhpcy50aW1lb3V0SWRfID0gc2V0VGltZW91dCh0aGlzLmNsZWFudXBfLmJpbmQodGhpcyksIHRoaXMuc25hY2tiYXJEYXRhXy50aW1lb3V0IHx8IG51bWJlcnMuTUVTU0FHRV9USU1FT1VUKTtcbiAgfVxuXG4gIGhhbmRsZVBvc3NpYmxlVGFiS2V5Ym9hcmRGb2N1c18oKSB7XG4gICAgY29uc3QgaGlqYWNrRm9jdXMgPVxuICAgICAgdGhpcy5maXJzdEZvY3VzXyAmJiAhdGhpcy5wb2ludGVyRG93blJlY29nbml6ZWRfO1xuXG4gICAgaWYgKGhpamFja0ZvY3VzKSB7XG4gICAgICB0aGlzLnNldEZvY3VzT25BY3Rpb25fKCk7XG4gICAgfVxuXG4gICAgdGhpcy5maXJzdEZvY3VzXyA9IGZhbHNlO1xuICB9XG5cbiAgc2V0Rm9jdXNPbkFjdGlvbl8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRGb2N1cygpO1xuICAgIHRoaXMuc25hY2tiYXJIYXNGb2N1c18gPSB0cnVlO1xuICAgIHRoaXMuZmlyc3RGb2N1c18gPSBmYWxzZTtcbiAgfVxuXG4gIGludm9rZUFjdGlvbl8oKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5hY3Rpb25IYW5kbGVyXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWN0aW9uSGFuZGxlcl8oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHRoaXMuZGlzbWlzc09uQWN0aW9uXykge1xuICAgICAgICB0aGlzLmNsZWFudXBfKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYW51cF8oKSB7XG4gICAgY29uc3QgYWxsb3dEaXNtaXNzYWwgPSAhdGhpcy5zbmFja2Jhckhhc0ZvY3VzXyB8fCB0aGlzLmFjdGlvbldhc0NsaWNrZWRfO1xuXG4gICAgaWYgKGFsbG93RGlzbWlzc2FsKSB7XG4gICAgICBjb25zdCB7QUNUSVZFLCBNVUxUSUxJTkUsIEFDVElPTl9PTl9CT1RUT019ID0gY3NzQ2xhc3NlcztcblxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhBQ1RJVkUpO1xuXG4gICAgICBjb25zdCBoYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SWRfKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTVVMVElMSU5FKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhBQ1RJT05fT05fQk9UVE9NKTtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25IaWRkZW5fKHRydWUpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEFyaWFIaWRkZW4oKTtcbiAgICAgICAgdGhpcy5hY3RpdmVfID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc25hY2tiYXJIYXNGb2N1c18gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlIaWRlKCk7XG4gICAgICAgIHRoaXMuc2hvd05leHRfKCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgc2hvd05leHRfKCkge1xuICAgIGlmICghdGhpcy5xdWV1ZV8ubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvdyh0aGlzLnF1ZXVlXy5zaGlmdCgpKTtcbiAgfVxuXG4gIHNldEFjdGlvbkhpZGRlbl8oaXNIaWRkZW4pIHtcbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QWN0aW9uQXJpYUhpZGRlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVuc2V0QWN0aW9uQXJpYUhpZGRlbigpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgbm9QcmVmaXg6IHN0cmluZyxcbiAqICAgd2Via2l0UHJlZml4OiBzdHJpbmcsXG4gKiAgIHN0eWxlUHJvcGVydHk6IHN0cmluZ1xuICogfX1cbiAqL1xubGV0IFZlbmRvclByb3BlcnR5TWFwVHlwZTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBldmVudFR5cGVNYXAgPSB7XG4gICdhbmltYXRpb25zdGFydCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbnN0YXJ0JyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25TdGFydCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25pdGVyYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25pdGVyYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2l0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ3RyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBjc3NQcm9wZXJ0eU1hcCA9IHtcbiAgJ2FuaW1hdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC1hbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNmb3JtJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNmb3JtJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zZm9ybScsXG4gIH0sXG4gICd0cmFuc2l0aW9uJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikge1xuICByZXR1cm4gKHdpbmRvd09ialsnZG9jdW1lbnQnXSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpIHtcbiAgcmV0dXJuIChldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwIHx8IGV2ZW50VHlwZSBpbiBjc3NQcm9wZXJ0eU1hcCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59IG1hcFxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpIHtcbiAgcmV0dXJuIG1hcFtldmVudFR5cGVdLnN0eWxlUHJvcGVydHkgaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGJyb3dzZXIgcHJlZml4IGZvciBDU1MzIGFuaW1hdGlvbiBldmVudHNcbiAqIGFuZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgaWYgKCFoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHx8ICFldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gZXZlbnRUeXBlO1xuICB9XG5cbiAgY29uc3QgbWFwID0gLyoqIEB0eXBlIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovIChcbiAgICBldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwID8gZXZlbnRUeXBlTWFwIDogY3NzUHJvcGVydHlNYXBcbiAgKTtcbiAgY29uc3QgZWwgPSB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSgnZGl2Jyk7XG4gIGxldCBldmVudE5hbWUgPSAnJztcblxuICBpZiAobWFwID09PSBldmVudFR5cGVNYXApIHtcbiAgICBldmVudE5hbWUgPSBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnROYW1lID0gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbiAgfVxuXG4gIHJldHVybiBldmVudE5hbWU7XG59XG5cbi8vIFB1YmxpYyBmdW5jdGlvbnMgdG8gYWNjZXNzIGdldEFuaW1hdGlvbk5hbWUoKSBmb3IgSmF2YVNjcmlwdCBldmVudHMgb3IgQ1NTXG4vLyBwcm9wZXJ0eSBuYW1lcy5cblxuY29uc3QgdHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzID0gWyd0cmFuc2Zvcm0nLCAnV2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ01TVHJhbnNmb3JtJ107XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbmV4cG9ydCB7dHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzLCBnZXRDb3JyZWN0RXZlbnROYW1lLCBnZXRDb3JyZWN0UHJvcGVydHlOYW1lfTtcbiIsIjx0ZW1wbGF0ZT5cbjxkaXYgcmVmPVwicm9vdFwiIGNsYXNzPVwibWRjLXNuYWNrYmFyXCIgOmNsYXNzPVwiY2xhc3Nlc1wiXG4gICAgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCIgOmFyaWEtaGlkZGVuPVwiaGlkZGVuXCI+XG4gIDxkaXYgY2xhc3M9XCJtZGMtc25hY2tiYXJfX3RleHRcIj57e21lc3NhZ2V9fTwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibWRjLXNuYWNrYmFyX19hY3Rpb24td3JhcHBlclwiPlxuICAgIDxidXR0b24gcmVmPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwibWRjLXNuYWNrYmFyX19hY3Rpb24tYnV0dG9uXCJcbiAgICAgICAgOmFyaWEtaGlkZGVuPVwiYWN0aW9uSGlkZGVuXCI+e3thY3Rpb25UZXh0fX08L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDU25hY2tiYXJGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9zbmFja2Jhci9mb3VuZGF0aW9uJ1xuaW1wb3J0IHsgZ2V0Q29ycmVjdEV2ZW50TmFtZSB9IGZyb20gJ0BtYXRlcmlhbC9hbmltYXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1zbmFja2JhcicsXG4gIHByb3BzOiB7XG4gICAgJ2FsaWduLXN0YXJ0JzogQm9vbGVhbixcbiAgICAnZXZlbnQnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICBkZWZhdWx0ICgpIHsgcmV0dXJuICdzaG93LXNuYWNrYmFyJyB9XG4gICAgfSxcbiAgICAnZXZlbnQtc291cmNlJzoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgZGVmYXVsdCAoKSB7IHJldHVybiB0aGlzLiRyb290IH1cbiAgICB9LFxuICAgICdkaXNtaXNzZXMtb24tYWN0aW9uJzoge3R5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWV9XG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgICdtZGMtc25hY2tiYXItLWFsaWduLXN0YXJ0JzogdGhpcy5hbGlnblN0YXJ0XG4gICAgICB9LFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgICBhY3Rpb25UZXh0OiAnJyxcbiAgICAgIGhpZGRlbjogZmFsc2UsXG4gICAgICBhY3Rpb25IaWRkZW46IGZhbHNlLFxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNob3cgKGRhdGEpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zaG93KGRhdGEpXG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDU25hY2tiYXJGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBzZXRBcmlhSGlkZGVuOiAoKSA9PiB0aGlzLmhpZGRlbiA9IHRydWUsXG4gICAgICB1bnNldEFyaWFIaWRkZW46ICgpID0+IHRoaXMuaGlkZGVuID0gZmFsc2UsXG4gICAgICBzZXRBY3Rpb25BcmlhSGlkZGVuOiAoKSA9PiB0aGlzLmFjdGlvbkhpZGRlbiA9IHRydWUsXG4gICAgICB1bnNldEFjdGlvbkFyaWFIaWRkZW46ICgpID0+IHRoaXMuYWN0aW9uSGlkZGVuID0gZmFsc2UsXG4gICAgICBzZXRBY3Rpb25UZXh0OiAodGV4dCkgPT4geyB0aGlzLmFjdGlvblRleHQgPSB0ZXh0IH0sXG4gICAgICBzZXRNZXNzYWdlVGV4dDogKHRleHQpID0+IHsgdGhpcy5tZXNzYWdlID0gdGV4dCAgfSxcbiAgICAgIHNldEZvY3VzOiAoKSA9PiB0aGlzLiRyZWZzLmJ1dHRvbi5mb2N1cygpLFxuICAgICAgdmlzaWJpbGl0eUlzSGlkZGVuOiAoKSA9PiBkb2N1bWVudC5oaWRkZW4sXG4gICAgICByZWdpc3RlckNhcHR1cmVkQmx1ckhhbmRsZXI6IChoYW5kbGVyKSA9PiB0aGlzLiRyZWZzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgaGFuZGxlciwgdHJ1ZSksXG4gICAgICBkZXJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlcjogKGhhbmRsZXIpID0+IHRoaXMuJHJlZnMuYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoYW5kbGVyLCB0cnVlKSxcbiAgICAgIHJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXI6IChoYW5kbGVyKSA9PiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXI6IChoYW5kbGVyKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgaGFuZGxlciksXG4gICAgICByZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBoYW5kbGVyLCB0cnVlKSxcbiAgICAgIGRlcmVnaXN0ZXJDYXB0dXJlZEludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlciwgdHJ1ZSksXG4gICAgICByZWdpc3RlckFjdGlvbkNsaWNrSGFuZGxlcjogKGhhbmRsZXIpID0+IHRoaXMuJHJlZnMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyQWN0aW9uQ2xpY2tIYW5kbGVyOiAoaGFuZGxlcikgPT4gdGhpcy4kcmVmcy5idXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5hZGRFdmVudExpc3RlbmVyKGdldENvcnJlY3RFdmVudE5hbWUod2luZG93LCAndHJhbnNpdGlvbmVuZCcpLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3csICd0cmFuc2l0aW9uZW5kJyksIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgbm90aWZ5U2hvdzogKCkgPT4gdGhpcy4kZW1pdCgnc2hvdycpLFxuICAgICAgbm90aWZ5SGlkZTogKCkgPT4gdGhpcy4kZW1pdCgnaGlkZScpLFxuICAgIH0pXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIGlmICh0aGlzLmV2ZW50KSB7XG4gICAgICB0aGlzLmV2ZW50U291cmNlLiRvbih0aGlzLmV2ZW50LCAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24uc2hvdyhkYXRhKVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5mb3VuZGF0aW9uLnNldERpc21pc3NPbkFjdGlvbih0aGlzLmRpc21pc3Nlc09uQWN0aW9uKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1NuYWNrYmFyIGZyb20gJy4vbWRjLXNuYWNrYmFyLnZ1ZSdcblxuZXhwb3J0IHtcbiAgbWRjU25hY2tiYXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY1NuYWNrYmFyXG59KVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsInZtIiwia2V5IiwiY29tcG9uZW50IiwibmFtZSIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiYXJncyIsImluaXRpYWxpemUiLCJmb3VuZGF0aW9uXyIsImdldERlZmF1bHRGb3VuZGF0aW9uIiwiaW5pdCIsImluaXRpYWxTeW5jV2l0aERPTSIsIkVycm9yIiwiZGVzdHJveSIsImV2dFR5cGUiLCJoYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJjc3NDbGFzc2VzIiwiUk9PVCIsIlRFWFQiLCJBQ1RJT05fV1JBUFBFUiIsIkFDVElPTl9CVVRUT04iLCJBQ1RJVkUiLCJNVUxUSUxJTkUiLCJBQ1RJT05fT05fQk9UVE9NIiwic3RyaW5ncyIsIlRFWFRfU0VMRUNUT1IiLCJBQ1RJT05fV1JBUFBFUl9TRUxFQ1RPUiIsIkFDVElPTl9CVVRUT05fU0VMRUNUT1IiLCJTSE9XX0VWRU5UIiwiSElERV9FVkVOVCIsIm51bWJlcnMiLCJNRVNTQUdFX1RJTUVPVVQiLCJNRENTbmFja2JhckZvdW5kYXRpb24iLCJhY3RpdmVfIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNldEFyaWFIaWRkZW4iLCJ1bnNldEFyaWFIaWRkZW4iLCJzZXRBY3Rpb25BcmlhSGlkZGVuIiwidW5zZXRBY3Rpb25BcmlhSGlkZGVuIiwic2V0QWN0aW9uVGV4dCIsInNldE1lc3NhZ2VUZXh0Iiwic2V0Rm9jdXMiLCJ2aXNpYmlsaXR5SXNIaWRkZW4iLCJyZWdpc3RlckNhcHR1cmVkQmx1ckhhbmRsZXIiLCJkZXJlZ2lzdGVyQ2FwdHVyZWRCbHVySGFuZGxlciIsInJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXIiLCJkZXJlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUhhbmRsZXIiLCJyZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckNhcHR1cmVkSW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJBY3Rpb25DbGlja0hhbmRsZXIiLCJkZXJlZ2lzdGVyQWN0aW9uQ2xpY2tIYW5kbGVyIiwicmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsImRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsIm5vdGlmeVNob3ciLCJub3RpZnlIaWRlIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJkZWZhdWx0QWRhcHRlciIsImFjdGlvbldhc0NsaWNrZWRfIiwiZGlzbWlzc09uQWN0aW9uXyIsImZpcnN0Rm9jdXNfIiwicG9pbnRlckRvd25SZWNvZ25pemVkXyIsInNuYWNrYmFySGFzRm9jdXNfIiwic25hY2tiYXJEYXRhXyIsInF1ZXVlXyIsImFjdGlvbkNsaWNrSGFuZGxlcl8iLCJpbnZva2VBY3Rpb25fIiwidmlzaWJpbGl0eWNoYW5nZUhhbmRsZXJfIiwiY2xlYXJUaW1lb3V0IiwidGltZW91dElkXyIsInNldFRpbWVvdXQiLCJjbGVhbnVwXyIsImJpbmQiLCJ0aW1lb3V0IiwiaW50ZXJhY3Rpb25IYW5kbGVyXyIsInR5cGUiLCJoYW5kbGVQb3NzaWJsZVRhYktleWJvYXJkRm9jdXNfIiwiYmx1ckhhbmRsZXJfIiwiZm9yRWFjaCIsImRpc21pc3NPbkFjdGlvbiIsImRhdGEiLCJtZXNzYWdlIiwiYWN0aW9uSGFuZGxlciIsImFjdGlvblRleHQiLCJhY3RpdmUiLCJwdXNoIiwibXVsdGlsaW5lIiwiYWN0aW9uT25Cb3R0b20iLCJhY3Rpb25IYW5kbGVyXyIsInNldEFjdGlvbkhpZGRlbl8iLCJoaWphY2tGb2N1cyIsInNldEZvY3VzT25BY3Rpb25fIiwiYWxsb3dEaXNtaXNzYWwiLCJzaG93TmV4dF8iLCJsZW5ndGgiLCJzaG93Iiwic2hpZnQiLCJpc0hpZGRlbiIsImV2ZW50VHlwZU1hcCIsIm5vUHJlZml4Iiwid2Via2l0UHJlZml4Iiwic3R5bGVQcm9wZXJ0eSIsImNzc1Byb3BlcnR5TWFwIiwiaGFzUHJvcGVyU2hhcGUiLCJ3aW5kb3dPYmoiLCJldmVudEZvdW5kSW5NYXBzIiwiZXZlbnRUeXBlIiwiZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZSIsIm1hcCIsImVsIiwic3R5bGUiLCJnZXRBbmltYXRpb25OYW1lIiwiZXZlbnROYW1lIiwiZ2V0Q29ycmVjdEV2ZW50TmFtZSIsInJlbmRlciIsInByb3BzIiwiQm9vbGVhbiIsIlN0cmluZyIsInJlcXVpcmVkIiwiZGVmYXVsdCIsIk9iamVjdCIsIiRyb290IiwiY2xhc3NlcyIsImFsaWduU3RhcnQiLCJoaWRkZW4iLCJhY3Rpb25IaWRkZW4iLCJtZXRob2RzIiwibW91bnRlZCIsImNsYXNzTmFtZSIsIiRzZXQiLCIkZGVsZXRlIiwidGV4dCIsIiRyZWZzIiwiYnV0dG9uIiwiZm9jdXMiLCJib2R5IiwiJGVtaXQiLCJldmVudCIsImV2ZW50U291cmNlIiwiJG9uIiwic2V0RGlzbWlzc09uQWN0aW9uIiwiZGlzbWlzc2VzT25BY3Rpb24iLCJiZWZvcmVEZXN0cm95IiwibWRjU25hY2tiYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjtFQUNoQztFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFt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
