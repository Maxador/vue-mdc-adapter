/**
* @module vue-mdc-adapterchips 0.13.2
* @exports VueMDCChips
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCChips = factory());
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

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
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
   * Adapter for MDC Chip.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Chip into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCChipAdapter = function () {
    function MDCChipAdapter() {
      classCallCheck(this, MDCChipAdapter);
    }

    createClass(MDCChipAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the root element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the root element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns true if the root element contains the given class.
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "hasClass",
      value: function hasClass(className) {}

      /**
       * Adds a class to the leading icon element.
       * @param {string} className
       */

    }, {
      key: "addClassToLeadingIcon",
      value: function addClassToLeadingIcon(className) {}

      /**
       * Removes a class from the leading icon element.
       * @param {string} className
       */

    }, {
      key: "removeClassFromLeadingIcon",
      value: function removeClassFromLeadingIcon(className) {}

      /**
       * Returns true if target has className, false otherwise.
       * @param {!EventTarget} target
       * @param {string} className
       * @return {boolean}
       */

    }, {
      key: "eventTargetHasClass",
      value: function eventTargetHasClass(target, className) {}

      /**
       * Registers an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerEventHandler",
      value: function registerEventHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterEventHandler",
      value: function deregisterEventHandler(evtType, handler) {}

      /**
       * Registers an event listener on the trailing icon element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerTrailingIconInteractionHandler",
      value: function registerTrailingIconInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event listener on the trailing icon element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterTrailingIconInteractionHandler",
      value: function deregisterTrailingIconInteractionHandler(evtType, handler) {}

      /**
       * Emits a custom "MDCChip:interaction" event denoting the chip has been
       * interacted with (typically on click or keydown).
       */

    }, {
      key: "notifyInteraction",
      value: function notifyInteraction() {}

      /**
       * Emits a custom "MDCChip:trailingIconInteraction" event denoting the trailing icon has been
       * interacted with (typically on click or keydown).
       */

    }, {
      key: "notifyTrailingIconInteraction",
      value: function notifyTrailingIconInteraction() {}
    }]);
    return MDCChipAdapter;
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
  var strings = {
    INTERACTION_EVENT: 'MDCChip:interaction',
    LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
    TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
    TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing'
  };

  /** @enum {string} */
  var cssClasses = {
    CHECKMARK: 'mdc-chip__checkmark',
    HIDDEN_LEADING_ICON: 'mdc-chip__icon--hidden-leading',
    LEADING_ICON: 'mdc-chip__icon--leading',
    SELECTED: 'mdc-chip--selected'
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
   * @extends {MDCFoundation<!MDCChipAdapter>}
   * @final
   */

  var MDCChipFoundation = function (_MDCFoundation) {
    inherits(MDCChipFoundation, _MDCFoundation);
    createClass(MDCChipFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses;
      }

      /**
       * {@see MDCChipAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCChipAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCChipAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {},
            addClassToLeadingIcon: function addClassToLeadingIcon() {},
            removeClassFromLeadingIcon: function removeClassFromLeadingIcon() {},
            eventTargetHasClass: function eventTargetHasClass() {},
            registerEventHandler: function registerEventHandler() {},
            deregisterEventHandler: function deregisterEventHandler() {},
            registerTrailingIconInteractionHandler: function registerTrailingIconInteractionHandler() {},
            deregisterTrailingIconInteractionHandler: function deregisterTrailingIconInteractionHandler() {},
            notifyInteraction: function notifyInteraction() {},
            notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {}
          }
        );
      }

      /**
       * @param {!MDCChipAdapter} adapter
       */

    }]);

    function MDCChipFoundation(adapter) {
      classCallCheck(this, MDCChipFoundation);

      /** @private {function(!Event): undefined} */
      var _this = possibleConstructorReturn(this, (MDCChipFoundation.__proto__ || Object.getPrototypeOf(MDCChipFoundation)).call(this, _extends(MDCChipFoundation.defaultAdapter, adapter)));

      _this.interactionHandler_ = function (evt) {
        return _this.handleInteraction_(evt);
      };
      /** @private {function(!Event): undefined} */
      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd_(evt);
      };
      /** @private {function(!Event): undefined} */
      _this.trailingIconInteractionHandler_ = function (evt) {
        return _this.handleTrailingIconInteraction_(evt);
      };
      return _this;
    }

    createClass(MDCChipFoundation, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        ['click', 'keydown'].forEach(function (evtType) {
          _this2.adapter_.registerEventHandler(evtType, _this2.interactionHandler_);
        });
        this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
        ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(function (evtType) {
          _this2.adapter_.registerTrailingIconInteractionHandler(evtType, _this2.trailingIconInteractionHandler_);
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        ['click', 'keydown'].forEach(function (evtType) {
          _this3.adapter_.deregisterEventHandler(evtType, _this3.interactionHandler_);
        });
        this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
        ['click', 'keydown', 'touchstart', 'pointerdown', 'mousedown'].forEach(function (evtType) {
          _this3.adapter_.deregisterTrailingIconInteractionHandler(evtType, _this3.trailingIconInteractionHandler_);
        });
      }

      /**
       * Toggles the selected class on the chip element.
       */

    }, {
      key: 'toggleSelected',
      value: function toggleSelected() {
        if (this.adapter_.hasClass(cssClasses.SELECTED)) {
          this.adapter_.removeClass(cssClasses.SELECTED);
        } else {
          this.adapter_.addClass(cssClasses.SELECTED);
        }
      }

      /**
       * Handles an interaction event on the root element.
       * @param {!Event} evt
       */

    }, {
      key: 'handleInteraction_',
      value: function handleInteraction_(evt) {
        if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
          this.adapter_.notifyInteraction();
        }
      }

      /**
       * Handles a transition end event on the root element.
       * This is a proxy for handling a transition end event on the leading icon or checkmark,
       * since the transition end event bubbles.
       * @param {!Event} evt
       */

    }, {
      key: 'handleTransitionEnd_',
      value: function handleTransitionEnd_(evt) {
        if (evt.propertyName !== 'opacity') {
          return;
        }
        if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.LEADING_ICON) && this.adapter_.hasClass(cssClasses.SELECTED)) {
          this.adapter_.addClassToLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
        } else if (this.adapter_.eventTargetHasClass( /** @type {!EventTarget} */evt.target, cssClasses.CHECKMARK) && !this.adapter_.hasClass(cssClasses.SELECTED)) {
          this.adapter_.removeClassFromLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
        }
      }

      /**
       * Handles an interaction event on the trailing icon element. This is used to
       * prevent the ripple from activating on interaction with the trailing icon.
       * @param {!Event} evt
       */

    }, {
      key: 'handleTrailingIconInteraction_',
      value: function handleTrailingIconInteraction_(evt) {
        evt.stopPropagation();
        if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
          this.adapter_.notifyTrailingIconInteraction();
        }
      }
    }]);
    return MDCChipFoundation;
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

  var mdcChip = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, style: _vm.styles, attrs: { "tabindex": "0" } }, [_vm.haveleadingIcon ? _c('i', { ref: "leadingIcon", staticClass: "mdc-chip__icon mdc-chip__icon--leading", class: _vm.leadingClasses }, [_vm._v(_vm._s(_vm.leadingIcon))]) : _vm._e(), _vm._v(" "), _vm.isFilter ? _c('div', { staticClass: "mdc-chip__checkmark" }, [_c('svg', { staticClass: "mdc-chip__checkmark-svg", attrs: { "viewBox": "-2 -3 30 30" } }, [_c('path', { staticClass: "mdc-chip__checkmark-path", attrs: { "fill": "none", "stroke": "black", "d": "M1.73,12.91 8.1,19.28 22.79,4.59" } })])]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "mdc-chip__text" }, [_vm._t("default")], 2), _vm._v(" "), _vm.havetrailingIcon ? _c('i', { ref: "trailingIcon", staticClass: "mdc-chip__icon mdc-chip__icon--trailing", class: _vm.trailingClasses, attrs: { "tabindex": "0", "role": "button" } }, [_vm._v(_vm._s(_vm.trailingIcon))]) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-chip',
    mixins: [CustomLinkMixin, DispatchEventMixin],
    props: {
      leadingIcon: [String],
      trailingIcon: [String],
      leadingIconClasses: [Object],
      trailingIconClasses: [Object]
    },
    inject: ['mdcChipSet'],
    data: function data() {
      return {
        classes: {
          'mdc-chip': true
        },
        styles: {}
      };
    },

    methods: {
      toggleSelected: function toggleSelected() {
        this.foundation.toggleSelected();
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCChipFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        addClassToLeadingIcon: function addClassToLeadingIcon(className) {
          if (_this.haveleadingIcon) {
            _this.$refs.leadingIcon.classList.add(className);
          }
        },
        removeClassFromLeadingIcon: function removeClassFromLeadingIcon(className) {
          if (_this.haveleadingIcon) {
            _this.$refs.leadingIcon.classList.remove(className);
          }
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        registerEventHandler: function registerEventHandler(evtType, handler) {
          return _this.$el.addEventListener(evtType, handler);
        },
        deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
          return _this.$el.removeEventListener(evtType, handler);
        },
        notifyInteraction: function notifyInteraction() {
          _this.dispatchEvent({ type: 'click' });
          emitCustomEvent(_this.$el, MDCChipFoundation.strings.INTERACTION_EVENT, {
            chip: _this
          }, true);
        },
        notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
          _this.dispatchEvent({ type: 'trailingIconClick' });
          emitCustomEvent(_this.$el, MDCChipFoundation.strings.TRAILING_ICON_INTERACTION_EVENT, {
            chip: _this
          }, true);
        },

        registerTrailingIconInteractionHandler: function registerTrailingIconInteractionHandler(evtType, handler) {
          if (_this.$refs.trailingIcon) {
            _this.$refs.trailingIcon.addEventListener(evtType, handler);
          }
        },
        deregisterTrailingIconInteractionHandler: function deregisterTrailingIconInteractionHandler(evtType, handler) {
          if (_this.$refs.trailingIcon) {
            _this.$refs.trailingIcon.removeEventListener(evtType, handler);
          }
        }
      });

      this.foundation.init();

      this.ripple = new RippleBase(this);
      this.ripple.init();
    },

    computed: {
      isFilter: function isFilter() {
        return this.mdcChipSet && this.mdcChipSet.filter;
      },
      haveleadingIcon: function haveleadingIcon() {
        return !!this.leadingIcon || this.leadingIconClasses;
      },
      havetrailingIcon: function havetrailingIcon() {
        return !!this.trailingIcon || this.trailingIconClasses;
      },
      leadingClasses: function leadingClasses() {
        return _extends({}, {
          'material-icons': !!this.leadingIcon
        }, this.leadingIconClasses);
      },
      trailingClasses: function trailingClasses() {
        return _extends({}, {
          'material-icons': !!this.trailingIcon
        }, this.trailingIconClasses);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple.destroy();
      this.foundation.destroy();
    }
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

  /* eslint no-unused-vars: [2, {"args": "none"}] */

  /**
   * Adapter for MDC Chip Set.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Chip Set into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCChipSetAdapter = function () {
    function MDCChipSetAdapter() {
      classCallCheck(this, MDCChipSetAdapter);
    }

    createClass(MDCChipSetAdapter, [{
      key: "hasClass",

      /**
       * Returns true if the root element contains the given class name.
       * @param {string} className
       * @return {boolean}
       */
      value: function hasClass(className) {}

      /**
       * Registers an event handler on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}

      /**
       * Deregisters an event handler on the root element for a given event.
       * @param {string} evtType
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}
    }]);
    return MDCChipSetAdapter;
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
   * @extends {MDCComponent<!MDCChipFoundation>}
   * @final
   */

  var MDCChip = function (_MDCComponent) {
    inherits(MDCChip, _MDCComponent);

    /**
     * @param {...?} args
     */
    function MDCChip() {
      var _ref;

      classCallCheck(this, MDCChip);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /** @private {?Element} */
      var _this = possibleConstructorReturn(this, (_ref = MDCChip.__proto__ || Object.getPrototypeOf(MDCChip)).call.apply(_ref, [this].concat(args)));

      _this.leadingIcon_ = _this.root_.querySelector(strings.LEADING_ICON_SELECTOR);
      /** @private {!MDCRipple} */
      _this.ripple_ = new MDCRipple(_this.root_);
      return _this;
    }

    /**
     * @param {!Element} root
     * @return {!MDCChip}
     */


    createClass(MDCChip, [{
      key: 'destroy',
      value: function destroy() {
        this.ripple_.destroy();
        get(MDCChip.prototype.__proto__ || Object.getPrototypeOf(MDCChip.prototype), 'destroy', this).call(this);
      }

      /**
       * Toggles selected state of the chip.
       */

    }, {
      key: 'toggleSelected',
      value: function toggleSelected() {
        this.foundation_.toggleSelected();
      }

      /**
       * @return {!MDCChipFoundation}
       */

    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        var _this2 = this;

        return new MDCChipFoundation( /** @type {!MDCChipAdapter} */_extends({
          addClass: function addClass(className) {
            return _this2.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return _this2.root_.classList.remove(className);
          },
          hasClass: function hasClass(className) {
            return _this2.root_.classList.contains(className);
          },
          addClassToLeadingIcon: function addClassToLeadingIcon(className) {
            if (_this2.leadingIcon_) {
              _this2.leadingIcon_.classList.add(className);
            }
          },
          removeClassFromLeadingIcon: function removeClassFromLeadingIcon(className) {
            if (_this2.leadingIcon_) {
              _this2.leadingIcon_.classList.remove(className);
            }
          },
          eventTargetHasClass: function eventTargetHasClass(target, className) {
            return target.classList.contains(className);
          },
          registerEventHandler: function registerEventHandler(evtType, handler) {
            return _this2.root_.addEventListener(evtType, handler);
          },
          deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
            return _this2.root_.removeEventListener(evtType, handler);
          },
          registerTrailingIconInteractionHandler: function registerTrailingIconInteractionHandler(evtType, handler) {
            var trailingIconEl = _this2.root_.querySelector(strings.TRAILING_ICON_SELECTOR);
            if (trailingIconEl) {
              trailingIconEl.addEventListener(evtType, handler);
            }
          },
          deregisterTrailingIconInteractionHandler: function deregisterTrailingIconInteractionHandler(evtType, handler) {
            var trailingIconEl = _this2.root_.querySelector(strings.TRAILING_ICON_SELECTOR);
            if (trailingIconEl) {
              trailingIconEl.removeEventListener(evtType, handler);
            }
          },
          notifyInteraction: function notifyInteraction() {
            return _this2.emit(strings.INTERACTION_EVENT, { chip: _this2 }, true /* shouldBubble */);
          },
          notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
            return _this2.emit(strings.TRAILING_ICON_INTERACTION_EVENT, { chip: _this2 }, true /* shouldBubble */);
          }
        }));
      }

      /** @return {!MDCRipple} */

    }, {
      key: 'ripple',
      get: function get$$1() {
        return this.ripple_;
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        return new MDCChip(root);
      }
    }]);
    return MDCChip;
  }(MDCComponent);

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
  var strings$2 = {
    CHIP_SELECTOR: '.mdc-chip'
  };

  /** @enum {string} */
  var cssClasses$2 = {
    CHOICE: 'mdc-chip-set--choice',
    FILTER: 'mdc-chip-set--filter'
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
   * @extends {MDCFoundation<!MDCChipSetAdapter>}
   * @final
   */

  var MDCChipSetFoundation = function (_MDCFoundation) {
    inherits(MDCChipSetFoundation, _MDCFoundation);
    createClass(MDCChipSetFoundation, null, [{
      key: 'strings',

      /** @return enum {string} */
      get: function get$$1() {
        return strings$2;
      }

      /** @return enum {string} */

    }, {
      key: 'cssClasses',
      get: function get$$1() {
        return cssClasses$2;
      }

      /**
       * {@see MDCChipSetAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCChipSetAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCChipSetAdapter} */{
            hasClass: function hasClass() {},
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {}
          }
        );
      }

      /**
       * @param {!MDCChipSetAdapter} adapter
       */

    }]);

    function MDCChipSetFoundation(adapter) {
      classCallCheck(this, MDCChipSetFoundation);

      /**
       * The selected chips in the set. Only used for choice chip set or filter chip set.
       * @private {!Array<!MDCChip>}
       */
      var _this = possibleConstructorReturn(this, (MDCChipSetFoundation.__proto__ || Object.getPrototypeOf(MDCChipSetFoundation)).call(this, _extends(MDCChipSetFoundation.defaultAdapter, adapter)));

      _this.selectedChips_ = [];

      /** @private {function(!Event): undefined} */
      _this.chipInteractionHandler_ = function (evt) {
        return _this.handleChipInteraction_(evt);
      };
      return _this;
    }

    createClass(MDCChipSetFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler(MDCChipFoundation.strings.INTERACTION_EVENT, this.chipInteractionHandler_);
      }

      /**
       * Handles a chip interaction event
       * @param {!Object} evt
       * @private
       */

    }, {
      key: 'handleChipInteraction_',
      value: function handleChipInteraction_(evt) {
        var chip = evt.detail.chip;

        if (this.adapter_.hasClass(cssClasses$2.CHOICE)) {
          if (this.selectedChips_.length === 0) {
            this.selectedChips_[0] = chip;
          } else if (this.selectedChips_[0] !== chip) {
            this.selectedChips_[0].toggleSelected();
            this.selectedChips_[0] = chip;
          } else {
            this.selectedChips_ = [];
          }
          chip.toggleSelected();
        } else if (this.adapter_.hasClass(cssClasses$2.FILTER)) {
          var index = this.selectedChips_.indexOf(chip);
          if (index >= 0) {
            this.selectedChips_.splice(index, 1);
          } else {
            this.selectedChips_.push(chip);
          }
          chip.toggleSelected();
        }
      }
    }]);
    return MDCChipSetFoundation;
  }(MDCFoundation);

  var mdcChipSet = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-chip-set',
    props: {
      choice: [Boolean],
      filter: [Boolean]
    },
    provide: function provide() {
      return { mdcChipSet: this };
    },
    data: function data() {
      return {
        classes: {
          'mdc-chip-set': true,
          'mdc-chip-set--choice': this.choice,
          'mdc-chip-set--filter': this.filter
        }
      };
    },

    methods: {},
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCChipSetFoundation({
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          _this.$el.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          _this.$el.removeEventListener(evtType, handler);
        }
      });

      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var plugin = BasePlugin({
    mdcChip: mdcChip,
    mdcChipSet: mdcChipSet
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9hdXRvLWluaXQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYmFzZS1wbHVnaW4uanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWxpbmsuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvY3VzdG9tLWV2ZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Rpc3BhdGNoLWV2ZW50LW1peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvY2hpcHMvY2hpcC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS91dGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvcmlwcGxlL21kYy1yaXBwbGUtYmFzZS5qcyIsIi4uLy4uL2NvbXBvbmVudHMvY2hpcHMvbWRjLWNoaXAudnVlIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9jaGlwcy9jaGlwLXNldC9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9jaGlwcy9jaGlwL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9jaGlwcy9jaGlwLXNldC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL2NoaXBzL21kYy1jaGlwLXNldC52dWUiLCIuLi8uLi9jb21wb25lbnRzL2NoaXBzL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9jaGlwcy9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCJleHBvcnQgY29uc3QgQ3VzdG9tTGluayA9IHtcbiAgbmFtZTogJ2N1c3RvbS1saW5rJyxcbiAgZnVuY3Rpb25hbDogdHJ1ZSxcbiAgcHJvcHM6IHtcbiAgICB0YWc6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnYScgfSxcbiAgICBsaW5rIDogT2JqZWN0LFxuICB9LFxuICByZW5kZXIgKGgsIGNvbnRleHQpIHtcbiAgICBsZXQgZWxlbWVudCBcbiAgICBsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQuZGF0YSlcblxuICAgIGlmIChjb250ZXh0LnByb3BzLmxpbmsgJiYgY29udGV4dC5wYXJlbnQuJHJvdXRlcikge1xuICAgICAgLy8gcm91dGVyLWxpbmsgY2FzZVxuICAgICAgZWxlbWVudCA9IGNvbnRleHQucGFyZW50LiRyb290LiRvcHRpb25zLmNvbXBvbmVudHNbJ3JvdXRlci1saW5rJ10gXG4gICAgICBkYXRhLnByb3BzID0gT2JqZWN0LmFzc2lnbih7dGFnOiBjb250ZXh0LnByb3BzLnRhZ30sIGNvbnRleHQucHJvcHMubGluaylcbiAgICAgIGlmIChkYXRhLm9uLmNsaWNrKSB7XG4gICAgICAgIGRhdGEubmF0aXZlT24gPSB7Y2xpY2s6IGRhdGEub24uY2xpY2sgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbGVtZW50IGZhbGxiYWNrXG4gICAgICBlbGVtZW50ID0gY29udGV4dC5wcm9wcy50YWcgXG4gICAgfSBcblxuICAgIHJldHVybiBoKGVsZW1lbnQsIGRhdGEsIGNvbnRleHQuY2hpbGRyZW4pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEN1c3RvbUxpbmtNaXhpbiA9IHtcbiAgcHJvcHM6IHtcbiAgICB0bzogW1N0cmluZywgT2JqZWN0XSxcbiAgICBleGFjdDogQm9vbGVhbixcbiAgICBhcHBlbmQ6IEJvb2xlYW4sXG4gICAgcmVwbGFjZTogQm9vbGVhbixcbiAgICBhY3RpdmVDbGFzczogU3RyaW5nLFxuICAgIGV4YWN0QWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBsaW5rICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvICYmIHtcbiAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgIGV4YWN0OiB0aGlzLmV4YWN0LFxuICAgICAgICBhcHBlbmQ6IHRoaXMuYXBwZW5kLFxuICAgICAgICByZXBsYWNlOiB0aGlzLnJlcGxhY2UsXG4gICAgICAgIGFjdGl2ZUNsYXNzOiB0aGlzLmFjdGl2ZUNsYXNzLFxuICAgICAgICBleGFjdEFjdGl2ZUNsYXNzOiB0aGlzLmV4YWN0QWN0aXZlQ2xhc3MsXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb21wb25lbnRzIDogeyBcbiAgICBDdXN0b21MaW5rIFxuICB9XG59IiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQgKGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEV2ZW50TWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgJ2V2ZW50JzogU3RyaW5nLFxuICAgICdldmVudC10YXJnZXQnOiBPYmplY3QsXG4gICAgJ2V2ZW50LWFyZ3MnOiBBcnJheSxcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGRpc3BhdGNoRXZlbnQgKGV2dCkge1xuICAgICAgdGhpcy4kZW1pdChldnQudHlwZSlcbiAgICAgIGlmICh0aGlzLmV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmV2ZW50VGFyZ2V0IHx8IHRoaXMuJHJvb3RcbiAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLmV2ZW50QXJncyB8fCBbXVxuICAgICAgICB0YXJnZXQuJGVtaXQodGhpcy5ldmVudCwgLi4uYXJncylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIENoaXAuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgQ2hpcCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDQ2hpcEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBjb250YWlucyB0aGUgZ2l2ZW4gY2xhc3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsZWFkaW5nIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGxlYWRpbmcgaWNvbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbihjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0YXJnZXQgaGFzIGNsYXNzTmFtZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGV2ZW50VGFyZ2V0SGFzQ2xhc3ModGFyZ2V0LCBjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSB0cmFpbGluZyBpY29uIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgdHJhaWxpbmcgaWNvbiBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBcIk1EQ0NoaXA6aW50ZXJhY3Rpb25cIiBldmVudCBkZW5vdGluZyB0aGUgY2hpcCBoYXMgYmVlblxuICAgKiBpbnRlcmFjdGVkIHdpdGggKHR5cGljYWxseSBvbiBjbGljayBvciBrZXlkb3duKS5cbiAgICovXG4gIG5vdGlmeUludGVyYWN0aW9uKCkge31cblxuICAvKipcbiAgICogRW1pdHMgYSBjdXN0b20gXCJNRENDaGlwOnRyYWlsaW5nSWNvbkludGVyYWN0aW9uXCIgZXZlbnQgZGVub3RpbmcgdGhlIHRyYWlsaW5nIGljb24gaGFzIGJlZW5cbiAgICogaW50ZXJhY3RlZCB3aXRoICh0eXBpY2FsbHkgb24gY2xpY2sgb3Iga2V5ZG93bikuXG4gICAqL1xuICBub3RpZnlUcmFpbGluZ0ljb25JbnRlcmFjdGlvbigpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NoaXBBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgSU5URVJBQ1RJT05fRVZFTlQ6ICdNRENDaGlwOmludGVyYWN0aW9uJyxcbiAgTEVBRElOR19JQ09OX1NFTEVDVE9SOiAnLm1kYy1jaGlwX19pY29uLS1sZWFkaW5nJyxcbiAgVFJBSUxJTkdfSUNPTl9JTlRFUkFDVElPTl9FVkVOVDogJ01EQ0NoaXA6dHJhaWxpbmdJY29uSW50ZXJhY3Rpb24nLFxuICBUUkFJTElOR19JQ09OX1NFTEVDVE9SOiAnLm1kYy1jaGlwX19pY29uLS10cmFpbGluZycsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIENIRUNLTUFSSzogJ21kYy1jaGlwX19jaGVja21hcmsnLFxuICBISURERU5fTEVBRElOR19JQ09OOiAnbWRjLWNoaXBfX2ljb24tLWhpZGRlbi1sZWFkaW5nJyxcbiAgTEVBRElOR19JQ09OOiAnbWRjLWNoaXBfX2ljb24tLWxlYWRpbmcnLFxuICBTRUxFQ1RFRDogJ21kYy1jaGlwLS1zZWxlY3RlZCcsXG59O1xuXG5leHBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NoaXBBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENDaGlwQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDQ2hpcEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENDaGlwQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENDaGlwQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ0NoaXBBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uOiAoKSA9PiB7fSxcbiAgICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUludGVyYWN0aW9uOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENDaGlwQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDQ2hpcEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlSW50ZXJhY3Rpb25fKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50cmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVUcmFpbGluZ0ljb25JbnRlcmFjdGlvbl8oZXZ0KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckV2ZW50SGFuZGxlcihldnRUeXBlLCB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgWydjbGljaycsICdrZXlkb3duJywgJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCB0aGlzLnRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJFdmVudEhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJFdmVudEhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgWydjbGljaycsICdrZXlkb3duJywgJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMudHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgc2VsZWN0ZWQgY2xhc3Mgb24gdGhlIGNoaXAgZWxlbWVudC5cbiAgICovXG4gIHRvZ2dsZVNlbGVjdGVkKCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuU0VMRUNURUQpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuU0VMRUNURUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuU0VMRUNURUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGludGVyYWN0aW9uIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZUludGVyYWN0aW9uXyhldnQpIHtcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycgfHwgZXZ0LmtleSA9PT0gJ0VudGVyJyB8fCBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5SW50ZXJhY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIHRyYW5zaXRpb24gZW5kIGV2ZW50IG9uIHRoZSByb290IGVsZW1lbnQuXG4gICAqIFRoaXMgaXMgYSBwcm94eSBmb3IgaGFuZGxpbmcgYSB0cmFuc2l0aW9uIGVuZCBldmVudCBvbiB0aGUgbGVhZGluZyBpY29uIG9yIGNoZWNrbWFyayxcbiAgICogc2luY2UgdGhlIHRyYW5zaXRpb24gZW5kIGV2ZW50IGJ1YmJsZXMuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCkge1xuICAgIGlmIChldnQucHJvcGVydHlOYW1lICE9PSAnb3BhY2l0eScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcygvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGV2dC50YXJnZXQpLCBjc3NDbGFzc2VzLkxFQURJTkdfSUNPTikgJiZcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLlNFTEVDVEVEKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzc1RvTGVhZGluZ0ljb24oY3NzQ2xhc3Nlcy5ISURERU5fTEVBRElOR19JQ09OKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRhcHRlcl8uZXZlbnRUYXJnZXRIYXNDbGFzcygvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGV2dC50YXJnZXQpLCBjc3NDbGFzc2VzLkNIRUNLTUFSSykgJiZcbiAgICAgICAgICAgICAgICF0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuU0VMRUNURUQpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uKGNzc0NsYXNzZXMuSElEREVOX0xFQURJTkdfSUNPTik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYW4gaW50ZXJhY3Rpb24gZXZlbnQgb24gdGhlIHRyYWlsaW5nIGljb24gZWxlbWVudC4gVGhpcyBpcyB1c2VkIHRvXG4gICAqIHByZXZlbnQgdGhlIHJpcHBsZSBmcm9tIGFjdGl2YXRpbmcgb24gaW50ZXJhY3Rpb24gd2l0aCB0aGUgdHJhaWxpbmcgaWNvbi5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgaGFuZGxlVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25fKGV2dCkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycgfHwgZXZ0LmtleSA9PT0gJ0VudGVyJyB8fCBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb24oKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ2hpcEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IGZhbHNlO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx7cGFzc2l2ZTogYm9vbGVhbn19XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlXyA/IHtwYXNzaXZlOiB0cnVlfSA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgcmV0dXJuIFtcbiAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJywgJ21hdGNoZXMnLFxuICBdLmZpbHRlcigocCkgPT4gcCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkucG9wKCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0geyF7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHshe3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6IEV2ZW50LFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYgeyF7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmRlYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbig/RXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXG4gICAgICAoKSA9PiB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKVxuICAgICk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgKCkgPT4gdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRClcbiAgICApO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyF7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuXG4gICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZF8oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSB3cmFwcGVkIGluIGFuIHJBRiBjYWxsIGIvYyB3ZWIgYnJvd3NlcnNcbiAgICAgIC8vIHJlcG9ydCBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluXG4gICAgICAvLyBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gKGUgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50ID0gbnVsbCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSBudWxsLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oZSkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIGNvbnN0IGV2dE9iamVjdCA9IG51bGw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhldnRPYmplY3QsIHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oZSwgc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRlYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyhlLCB7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEU7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzJ1xuaW1wb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBhcHBseVBhc3NpdmV9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCdcblxuZXhwb3J0IGNsYXNzIFJpcHBsZUJhc2UgZXh0ZW5kcyBNRENSaXBwbGVGb3VuZGF0aW9uIHtcblxuICBzdGF0aWMgZ2V0IE1BVENIRVMgKCkge1xuICAgIC8qIGdsb2JhbCBIVE1MRWxlbWVudCAqL1xuICAgIHJldHVybiBSaXBwbGVCYXNlLl9tYXRjaGVzIHx8XG4gICAgICAoIFJpcHBsZUJhc2UuX21hdGNoZXMgPSBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKSlcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cmZhY2VBY3RpdmUgKHJlZikge1xuICAgIHJldHVybiByZWZbUmlwcGxlQmFzZS5NQVRDSEVTXSgnOmFjdGl2ZScpXG4gIH1cblxuICBjb25zdHJ1Y3RvciAodm0sIG9wdGlvbnMpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdylcbiAgICAgIH0sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHZtLiRlbFtSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgICAgIH0sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdm0uZGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBhZGRDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHZtLiRzZXQodm0uY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUNsYXNzIChjbGFzc05hbWUpIHtcbiAgICAgICAgdm0uJGRlbGV0ZSh2bS5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICB9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKHRhcmdldCkgPT4gdm0uJGVsLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB2bS4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB2bS4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICByZXR1cm4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICB2bS4kc2V0KHZtLnN0eWxlcywgdmFyTmFtZSwgdmFsdWUpXG4gICAgICB9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdm0uJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICB9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gKHt4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldH0pXG4gICAgICB9LFxuICAgIH0sIG9wdGlvbnMpKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSaXBwbGVNaXhpbiA9IHtcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5yaXBwbGUgPSBuZXcgUmlwcGxlQmFzZSh0aGlzKVxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KClcbiAgfVxufSAgIiwiPHRlbXBsYXRlPlxuPGRpdiA6Y2xhc3M9XCJjbGFzc2VzXCIgOnN0eWxlPVwic3R5bGVzXCIgdGFiaW5kZXg9XCIwXCIgPlxuICA8aSByZWY9XCJsZWFkaW5nSWNvblwiIGNsYXNzPVwibWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLWxlYWRpbmdcIiBcbiAgICA6Y2xhc3M9XCJsZWFkaW5nQ2xhc3Nlc1wiIHYtaWY9XCJoYXZlbGVhZGluZ0ljb25cIlxuICA+e3tsZWFkaW5nSWNvbn19PC9pPlxuICA8ZGl2IGNsYXNzPVwibWRjLWNoaXBfX2NoZWNrbWFya1wiIHYtaWY9XCJpc0ZpbHRlclwiPlxuICAgIDxzdmcgY2xhc3M9XCJtZGMtY2hpcF9fY2hlY2ttYXJrLXN2Z1wiIHZpZXdCb3g9XCItMiAtMyAzMCAzMFwiPlxuICAgICAgPHBhdGggY2xhc3M9XCJtZGMtY2hpcF9fY2hlY2ttYXJrLXBhdGhcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImJsYWNrXCJcbiAgICAgICAgICAgIGQ9XCJNMS43MywxMi45MSA4LjEsMTkuMjggMjIuNzksNC41OVwiLz5cbiAgICA8L3N2Zz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtZGMtY2hpcF9fdGV4dFwiPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9kaXY+XG4gIDxpIHJlZj1cInRyYWlsaW5nSWNvblwiIGNsYXNzPVwibWRjLWNoaXBfX2ljb24gbWRjLWNoaXBfX2ljb24tLXRyYWlsaW5nXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiIFxuICAgIDpjbGFzcz1cInRyYWlsaW5nQ2xhc3Nlc1wiIHYtaWY9XCJoYXZldHJhaWxpbmdJY29uXCJcbiAgPnt7dHJhaWxpbmdJY29ufX08L2k+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDQ2hpcEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2NoaXBzL2NoaXAvZm91bmRhdGlvbic7XG5pbXBvcnQgeyBDdXN0b21MaW5rTWl4aW4sIERpc3BhdGNoRXZlbnRNaXhpbiwgZW1pdEN1c3RvbUV2ZW50IH0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgeyBSaXBwbGVCYXNlIH0gZnJvbSAnLi4vcmlwcGxlJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWNoaXAnLFxuICBtaXhpbnM6IFtDdXN0b21MaW5rTWl4aW4sIERpc3BhdGNoRXZlbnRNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgbGVhZGluZ0ljb246IFtTdHJpbmddLFxuICAgIHRyYWlsaW5nSWNvbjogW1N0cmluZ10sXG4gICAgbGVhZGluZ0ljb25DbGFzc2VzOiBbT2JqZWN0XSxcbiAgICB0cmFpbGluZ0ljb25DbGFzc2VzOiBbT2JqZWN0XSxcbiAgfSxcbiAgaW5qZWN0OiBbJ21kY0NoaXBTZXQnXSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWNoaXAnOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge30sXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHRvZ2dsZVNlbGVjdGVkKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnRvZ2dsZVNlbGVjdGVkKCk7XG4gICAgfSxcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcEZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUpLFxuICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIGFkZENsYXNzVG9MZWFkaW5nSWNvbjogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaGF2ZWxlYWRpbmdJY29uKSB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5sZWFkaW5nSWNvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzc0Zyb21MZWFkaW5nSWNvbjogY2xhc3NOYW1lID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaGF2ZWxlYWRpbmdJY29uKSB7XG4gICAgICAgICAgdGhpcy4kcmVmcy5sZWFkaW5nSWNvbi5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmVudFRhcmdldEhhc0NsYXNzOiAodGFyZ2V0LCBjbGFzc05hbWUpID0+XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgICAgbm90aWZ5SW50ZXJhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ2NsaWNrJyB9KTtcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KFxuICAgICAgICAgIHRoaXMuJGVsLFxuICAgICAgICAgIE1EQ0NoaXBGb3VuZGF0aW9uLnN0cmluZ3MuSU5URVJBQ1RJT05fRVZFTlQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2hpcDogdGhpcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgbm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ3RyYWlsaW5nSWNvbkNsaWNrJyB9KTtcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KFxuICAgICAgICAgIHRoaXMuJGVsLFxuICAgICAgICAgIE1EQ0NoaXBGb3VuZGF0aW9uLnN0cmluZ3MuVFJBSUxJTkdfSUNPTl9JTlRFUkFDVElPTl9FVkVOVCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjaGlwOiB0aGlzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICBpZiAodGhpcy4kcmVmcy50cmFpbGluZ0ljb24pIHtcbiAgICAgICAgICB0aGlzLiRyZWZzLnRyYWlsaW5nSWNvbi5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuJHJlZnMudHJhaWxpbmdJY29uKSB7XG4gICAgICAgICAgdGhpcy4kcmVmcy50cmFpbGluZ0ljb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KCk7XG5cbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpO1xuICAgIHRoaXMucmlwcGxlLmluaXQoKTtcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBpc0ZpbHRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLm1kY0NoaXBTZXQgJiYgdGhpcy5tZGNDaGlwU2V0LmZpbHRlcjtcbiAgICB9LFxuICAgIGhhdmVsZWFkaW5nSWNvbigpIHtcbiAgICAgIHJldHVybiAhIXRoaXMubGVhZGluZ0ljb24gfHwgdGhpcy5sZWFkaW5nSWNvbkNsYXNzZXM7XG4gICAgfSxcbiAgICBoYXZldHJhaWxpbmdJY29uKCkge1xuICAgICAgcmV0dXJuICEhdGhpcy50cmFpbGluZ0ljb24gfHwgdGhpcy50cmFpbGluZ0ljb25DbGFzc2VzO1xuICAgIH0sXG4gICAgbGVhZGluZ0NsYXNzZXMoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIHtcbiAgICAgICAgICAnbWF0ZXJpYWwtaWNvbnMnOiAhIXRoaXMubGVhZGluZ0ljb24sXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMubGVhZGluZ0ljb25DbGFzc2VzLFxuICAgICAgKTtcbiAgICB9LFxuICAgIHRyYWlsaW5nQ2xhc3NlcygpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAge1xuICAgICAgICAgICdtYXRlcmlhbC1pY29ucyc6ICEhdGhpcy50cmFpbGluZ0ljb24sXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMudHJhaWxpbmdJY29uQ2xhc3NlcyxcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgQ2hpcCBTZXQuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgQ2hpcCBTZXQgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ0NoaXBTZXRBZGFwdGVyIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcm9vdCBlbGVtZW50IGNvbnRhaW5zIHRoZSBnaXZlbiBjbGFzcyBuYW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NoaXBTZXRBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENSaXBwbGVGb3VuZGF0aW9uPlxuICovXG5jbGFzcyBNRENSaXBwbGUgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKiogQHBhcmFtIHsuLi4/fSBhcmdzICovXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy51bmJvdW5kZWRfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHt7aXNVbmJvdW5kZWQ6IChib29sZWFufHVuZGVmaW5lZCl9PX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlfVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QsIHtpc1VuYm91bmRlZCA9IHVuZGVmaW5lZH0gPSB7fSkge1xuICAgIGNvbnN0IHJpcHBsZSA9IG5ldyBNRENSaXBwbGUocm9vdCk7XG4gICAgLy8gT25seSBvdmVycmlkZSB1bmJvdW5kZWQgYmVoYXZpb3IgaWYgb3B0aW9uIGlzIGV4cGxpY2l0bHkgc3BlY2lmaWVkXG4gICAgaWYgKGlzVW5ib3VuZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJpcHBsZS51bmJvdW5kZWQgPSAvKiogQHR5cGUge2Jvb2xlYW59ICovIChpc1VuYm91bmRlZCk7XG4gICAgfVxuICAgIHJldHVybiByaXBwbGU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshUmlwcGxlQ2FwYWJsZVN1cmZhY2V9IGluc3RhbmNlXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFkYXB0ZXIoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBNQVRDSEVTID0gdXRpbC5nZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB1dGlsLnN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdyksXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gaW5zdGFuY2UudW5ib3VuZGVkLFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiBpbnN0YW5jZS5yb290X1tNQVRDSEVTXSgnOmFjdGl2ZScpLFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IGluc3RhbmNlLmRpc2FibGVkLFxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiBpbnN0YW5jZS5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiBpbnN0YW5jZS5yb290Xy5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBpbnN0YW5jZS5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4gaW5zdGFuY2Uucm9vdF8uc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFsdWUpLFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gaW5zdGFuY2Uucm9vdF8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAoe3g6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0fSksXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgdW5ib3VuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0IHVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICB0aGlzLnVuYm91bmRlZF8gPSBCb29sZWFuKHVuYm91bmRlZCk7XG4gICAgdGhpcy5zZXRVbmJvdW5kZWRfKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc3VyZSBDb21waWxlciB0aHJvd3MgYW4gYWNjZXNzIGNvbnRyb2wgZXJyb3Igd2hlbiBkaXJlY3RseSBhY2Nlc3NpbmcgYVxuICAgKiBwcm90ZWN0ZWQgb3IgcHJpdmF0ZSBwcm9wZXJ0eSBpbnNpZGUgYSBnZXR0ZXIvc2V0dGVyLCBsaWtlIHVuYm91bmRlZCBhYm92ZS5cbiAgICogQnkgYWNjZXNzaW5nIHRoZSBwcm90ZWN0ZWQgcHJvcGVydHkgaW5zaWRlIGEgbWV0aG9kLCB3ZSBzb2x2ZSB0aGF0IHByb2JsZW0uXG4gICAqIFRoYXQncyB3aHkgdGhpcyBmdW5jdGlvbiBleGlzdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRVbmJvdW5kZWRfKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0VW5ib3VuZGVkKHRoaXMudW5ib3VuZGVkXyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmFjdGl2YXRlKCk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8ubGF5b3V0KCk7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ1JpcHBsZUZvdW5kYXRpb259ICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTURDUmlwcGxlRm91bmRhdGlvbihNRENSaXBwbGUuY3JlYXRlQWRhcHRlcih0aGlzKSk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgdGhpcy51bmJvdW5kZWQgPSAnbWRjUmlwcGxlSXNVbmJvdW5kZWQnIGluIHRoaXMucm9vdF8uZGF0YXNldDtcbiAgfVxufVxuXG4vKipcbiAqIFNlZSBNYXRlcmlhbCBEZXNpZ24gc3BlYyBmb3IgbW9yZSBkZXRhaWxzIG9uIHdoZW4gdG8gdXNlIHJpcHBsZXMuXG4gKiBodHRwczovL21hdGVyaWFsLmlvL2d1aWRlbGluZXMvbW90aW9uL2Nob3Jlb2dyYXBoeS5odG1sI2Nob3Jlb2dyYXBoeS1jcmVhdGlvblxuICogQHJlY29yZFxuICovXG5jbGFzcyBSaXBwbGVDYXBhYmxlU3VyZmFjZSB7fVxuXG4vKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUucm9vdF87XG5cbi8qKlxuICogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBibGVlZHMgb3V0IG9mIHRoZSBib3VuZHMgb2YgdGhlIGVsZW1lbnQuXG4gKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS51bmJvdW5kZWQ7XG5cbi8qKlxuICogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBpcyBhdHRhY2hlZCB0byBhIGRpc2FibGVkIGNvbXBvbmVudC5cbiAqIEB0eXBlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLmRpc2FibGVkO1xuXG5leHBvcnQge01EQ1JpcHBsZSwgTURDUmlwcGxlRm91bmRhdGlvbiwgUmlwcGxlQ2FwYWJsZVN1cmZhY2UsIHV0aWx9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50JztcbmltcG9ydCB7TURDUmlwcGxlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2luZGV4JztcblxuaW1wb3J0IE1EQ0NoaXBBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgTURDQ2hpcEZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCB7c3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENDb21wb25lbnQ8IU1EQ0NoaXBGb3VuZGF0aW9uPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENDaGlwIGV4dGVuZHMgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLyoqIEBwcml2YXRlIHs/RWxlbWVudH0gKi9cbiAgICB0aGlzLmxlYWRpbmdJY29uXyA9IHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihzdHJpbmdzLkxFQURJTkdfSUNPTl9TRUxFQ1RPUik7XG4gICAgLyoqIEBwcml2YXRlIHshTURDUmlwcGxlfSAqL1xuICAgIHRoaXMucmlwcGxlXyA9IG5ldyBNRENSaXBwbGUodGhpcy5yb290Xyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ2hpcH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgcmV0dXJuIG5ldyBNRENDaGlwKHJvb3QpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJpcHBsZV8uZGVzdHJveSgpO1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHNlbGVjdGVkIHN0YXRlIG9mIHRoZSBjaGlwLlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0ZWQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy50b2dnbGVTZWxlY3RlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFNRENDaGlwRm91bmRhdGlvbn1cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTURDQ2hpcEZvdW5kYXRpb24oLyoqIEB0eXBlIHshTURDQ2hpcEFkYXB0ZXJ9ICovIChPYmplY3QuYXNzaWduKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgYWRkQ2xhc3NUb0xlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxlYWRpbmdJY29uXykge1xuICAgICAgICAgIHRoaXMubGVhZGluZ0ljb25fLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmxlYWRpbmdJY29uXykge1xuICAgICAgICAgIHRoaXMubGVhZGluZ0ljb25fLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2ZW50VGFyZ2V0SGFzQ2xhc3M6ICh0YXJnZXQsIGNsYXNzTmFtZSkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4gdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpLFxuICAgICAgcmVnaXN0ZXJUcmFpbGluZ0ljb25JbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYWlsaW5nSWNvbkVsID0gdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKHN0cmluZ3MuVFJBSUxJTkdfSUNPTl9TRUxFQ1RPUik7XG4gICAgICAgIGlmICh0cmFpbGluZ0ljb25FbCkge1xuICAgICAgICAgIHRyYWlsaW5nSWNvbkVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICBjb25zdCB0cmFpbGluZ0ljb25FbCA9IHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihzdHJpbmdzLlRSQUlMSU5HX0lDT05fU0VMRUNUT1IpO1xuICAgICAgICBpZiAodHJhaWxpbmdJY29uRWwpIHtcbiAgICAgICAgICB0cmFpbGluZ0ljb25FbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbm90aWZ5SW50ZXJhY3Rpb246ICgpID0+IHRoaXMuZW1pdChzdHJpbmdzLklOVEVSQUNUSU9OX0VWRU5ULCB7Y2hpcDogdGhpc30sIHRydWUgLyogc2hvdWxkQnViYmxlICovKSxcbiAgICAgIG5vdGlmeVRyYWlsaW5nSWNvbkludGVyYWN0aW9uOiAoKSA9PiB0aGlzLmVtaXQoXG4gICAgICAgIHN0cmluZ3MuVFJBSUxJTkdfSUNPTl9JTlRFUkFDVElPTl9FVkVOVCwge2NoaXA6IHRoaXN9LCB0cnVlIC8qIHNob3VsZEJ1YmJsZSAqLyksXG4gICAgfSkpKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDUmlwcGxlfSAqL1xuICBnZXQgcmlwcGxlKCkge1xuICAgIHJldHVybiB0aGlzLnJpcHBsZV87XG4gIH1cbn1cblxuZXhwb3J0IHtNRENDaGlwLCBNRENDaGlwRm91bmRhdGlvbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBDSElQX1NFTEVDVE9SOiAnLm1kYy1jaGlwJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgQ0hPSUNFOiAnbWRjLWNoaXAtc2V0LS1jaG9pY2UnLFxuICBGSUxURVI6ICdtZGMtY2hpcC1zZXQtLWZpbHRlcicsXG59O1xuXG5leHBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0NoaXBTZXRBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCB7TURDQ2hpcCwgTURDQ2hpcEZvdW5kYXRpb259IGZyb20gJy4uL2NoaXAvaW5kZXgnO1xuaW1wb3J0IHtzdHJpbmdzLCBjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0NoaXBTZXRBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENDaGlwU2V0Rm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0NoaXBTZXRBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0NoaXBTZXRBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDQ2hpcFNldEFkYXB0ZXJ9ICovICh7XG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENDaGlwU2V0QWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDQ2hpcFNldEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3RlZCBjaGlwcyBpbiB0aGUgc2V0LiBPbmx5IHVzZWQgZm9yIGNob2ljZSBjaGlwIHNldCBvciBmaWx0ZXIgY2hpcCBzZXQuXG4gICAgICogQHByaXZhdGUgeyFBcnJheTwhTURDQ2hpcD59XG4gICAgICovXG4gICAgdGhpcy5zZWxlY3RlZENoaXBzXyA9IFtdO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5jaGlwSW50ZXJhY3Rpb25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlQ2hpcEludGVyYWN0aW9uXyhldnQpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKFxuICAgICAgTURDQ2hpcEZvdW5kYXRpb24uc3RyaW5ncy5JTlRFUkFDVElPTl9FVkVOVCwgdGhpcy5jaGlwSW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihcbiAgICAgIE1EQ0NoaXBGb3VuZGF0aW9uLnN0cmluZ3MuSU5URVJBQ1RJT05fRVZFTlQsIHRoaXMuY2hpcEludGVyYWN0aW9uSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBjaGlwIGludGVyYWN0aW9uIGV2ZW50XG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVDaGlwSW50ZXJhY3Rpb25fKGV2dCkge1xuICAgIGNvbnN0IHtjaGlwfSA9IGV2dC5kZXRhaWw7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5DSE9JQ0UpKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZENoaXBzXy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoaXBzX1swXSA9IGNoaXA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRDaGlwc19bMF0gIT09IGNoaXApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoaXBzX1swXS50b2dnbGVTZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hpcHNfWzBdID0gY2hpcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwc18gPSBbXTtcbiAgICAgIH1cbiAgICAgIGNoaXAudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5GSUxURVIpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRDaGlwc18uaW5kZXhPZihjaGlwKTtcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwc18uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwc18ucHVzaChjaGlwKTtcbiAgICAgIH1cbiAgICAgIGNoaXAudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ2hpcFNldEZvdW5kYXRpb247XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiY2xhc3Nlc1wiPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9kaXY+ICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDQ2hpcFNldEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2NoaXBzL2NoaXAtc2V0L2ZvdW5kYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtY2hpcC1zZXQnLFxuICBwcm9wczoge1xuICAgIGNob2ljZTogW0Jvb2xlYW5dLFxuICAgIGZpbHRlcjogW0Jvb2xlYW5dLFxuICB9LFxuICBwcm92aWRlKCkge1xuICAgIHJldHVybiB7IG1kY0NoaXBTZXQ6IHRoaXMgfTtcbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWNoaXAtc2V0JzogdHJ1ZSxcbiAgICAgICAgJ21kYy1jaGlwLXNldC0tY2hvaWNlJzogdGhpcy5jaG9pY2UsXG4gICAgICAgICdtZGMtY2hpcC1zZXQtLWZpbHRlcic6IHRoaXMuZmlsdGVyLFxuICAgICAgfSxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDQ2hpcFNldEZvdW5kYXRpb24oe1xuICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKTtcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY0NoaXAgZnJvbSAnLi9tZGMtY2hpcC52dWUnXG5pbXBvcnQgbWRjQ2hpcFNldCBmcm9tICcuL21kYy1jaGlwLXNldC52dWUnXG5cbmV4cG9ydCB7IFxuICBtZGNDaGlwLCBcbiAgbWRjQ2hpcFNldCBcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY0NoaXAsIFxuICBtZGNDaGlwU2V0IFxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJDdXN0b21MaW5rIiwiZnVuY3Rpb25hbCIsInByb3BzIiwidGFnIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJsaW5rIiwiT2JqZWN0IiwicmVuZGVyIiwiaCIsImNvbnRleHQiLCJlbGVtZW50IiwiZGF0YSIsImJhYmVsSGVscGVycy5leHRlbmRzIiwicGFyZW50IiwiJHJvdXRlciIsIiRyb290IiwiJG9wdGlvbnMiLCJvbiIsImNsaWNrIiwibmF0aXZlT24iLCJjaGlsZHJlbiIsIkN1c3RvbUxpbmtNaXhpbiIsInRvIiwiZXhhY3QiLCJCb29sZWFuIiwiYXBwZW5kIiwicmVwbGFjZSIsImFjdGl2ZUNsYXNzIiwiZXhhY3RBY3RpdmVDbGFzcyIsImNvbXB1dGVkIiwiZW1pdEN1c3RvbUV2ZW50IiwiZWwiLCJldnRUeXBlIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiRGlzcGF0Y2hFdmVudE1peGluIiwiQXJyYXkiLCJtZXRob2RzIiwiJGVtaXQiLCJldmVudCIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiYXJncyIsImV2ZW50QXJncyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDaGlwQWRhcHRlciIsImNsYXNzTmFtZSIsImhhbmRsZXIiLCJzdHJpbmdzIiwiSU5URVJBQ1RJT05fRVZFTlQiLCJMRUFESU5HX0lDT05fU0VMRUNUT1IiLCJUUkFJTElOR19JQ09OX0lOVEVSQUNUSU9OX0VWRU5UIiwiVFJBSUxJTkdfSUNPTl9TRUxFQ1RPUiIsImNzc0NsYXNzZXMiLCJDSEVDS01BUksiLCJISURERU5fTEVBRElOR19JQ09OIiwiTEVBRElOR19JQ09OIiwiU0VMRUNURUQiLCJNRENDaGlwRm91bmRhdGlvbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsImFkZENsYXNzVG9MZWFkaW5nSWNvbiIsInJlbW92ZUNsYXNzRnJvbUxlYWRpbmdJY29uIiwiZXZlbnRUYXJnZXRIYXNDbGFzcyIsInJlZ2lzdGVyRXZlbnRIYW5kbGVyIiwiZGVyZWdpc3RlckV2ZW50SGFuZGxlciIsInJlZ2lzdGVyVHJhaWxpbmdJY29uSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlciIsIm5vdGlmeUludGVyYWN0aW9uIiwibm90aWZ5VHJhaWxpbmdJY29uSW50ZXJhY3Rpb24iLCJkZWZhdWx0QWRhcHRlciIsImludGVyYWN0aW9uSGFuZGxlcl8iLCJoYW5kbGVJbnRlcmFjdGlvbl8iLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kXyIsInRyYWlsaW5nSWNvbkludGVyYWN0aW9uSGFuZGxlcl8iLCJoYW5kbGVUcmFpbGluZ0ljb25JbnRlcmFjdGlvbl8iLCJmb3JFYWNoIiwia2V5Q29kZSIsInByb3BlcnR5TmFtZSIsInN0b3BQcm9wYWdhdGlvbiIsIk1EQ1JpcHBsZUFkYXB0ZXIiLCJ2YXJOYW1lIiwidmFsdWUiLCJST09UIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsInN1cHBvcnRzUGFzc2l2ZV8iLCJkZXRlY3RFZGdlUHNldWRvVmFyQnVnIiwid2luZG93T2JqIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJlIiwiZ2V0TWF0Y2hlc1Byb3BlcnR5IiwiSFRNTEVsZW1lbnRQcm90b3R5cGUiLCJmaWx0ZXIiLCJwIiwicG9wIiwiZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzIiwiZXYiLCJwYWdlT2Zmc2V0IiwiY2xpZW50UmVjdCIsIngiLCJ5IiwiZG9jdW1lbnRYIiwibGVmdCIsImRvY3VtZW50WSIsInRvcCIsIm5vcm1hbGl6ZWRYIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmx1ckhhbmRsZXJfIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwibGF5b3V0SW50ZXJuYWxfIiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJrZXlzIiwiayIsImluZGV4T2YiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJsZW5ndGgiLCJzb21lIiwicmVzZXRBY3RpdmF0aW9uU3RhdGVfIiwicHVzaCIsInJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwiYW5pbWF0ZUFjdGl2YXRpb25fIiwidHJhbnNsYXRlU3RhcnQiLCJ0cmFuc2xhdGVFbmQiLCJnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfIiwic3RhcnRQb2ludCIsImVuZFBvaW50IiwiY2xlYXJUaW1lb3V0Iiwicm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfIiwic2V0VGltZW91dCIsImFjdGl2YXRpb25IYXNFbmRlZCIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm1heERpbSIsIk1hdGgiLCJtYXgiLCJnZXRCb3VuZGVkUmFkaXVzIiwiaHlwb3RlbnVzZSIsInNxcnQiLCJwb3ciLCJ1cGRhdGVMYXlvdXRDc3NWYXJzXyIsInJvdW5kIiwidW5ib3VuZGVkIiwiUmlwcGxlQmFzZSIsInJlZiIsIk1BVENIRVMiLCJfbWF0Y2hlcyIsIkhUTUxFbGVtZW50IiwicHJvdG90eXBlIiwib3B0aW9ucyIsIiRlbCIsImRpc2FibGVkIiwiJHNldCIsImNsYXNzZXMiLCIkZGVsZXRlIiwiY29udGFpbnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFnZVhPZmZzZXQiLCJwYWdlWU9mZnNldCIsIm1peGlucyIsImxlYWRpbmdJY29uIiwidHJhaWxpbmdJY29uIiwibGVhZGluZ0ljb25DbGFzc2VzIiwidHJhaWxpbmdJY29uQ2xhc3NlcyIsImluamVjdCIsInRvZ2dsZVNlbGVjdGVkIiwiZm91bmRhdGlvbiIsIm1vdW50ZWQiLCJjbGFzc0xpc3QiLCJoYXZlbGVhZGluZ0ljb24iLCIkcmVmcyIsImFkZCIsImNoaXAiLCJpbml0IiwicmlwcGxlIiwiaXNGaWx0ZXIiLCJtZGNDaGlwU2V0IiwiaGF2ZXRyYWlsaW5nSWNvbiIsImxlYWRpbmdDbGFzc2VzIiwidHJhaWxpbmdDbGFzc2VzIiwiYmVmb3JlRGVzdHJveSIsImRlc3Ryb3kiLCJNRENDaGlwU2V0QWRhcHRlciIsIk1EQ0NvbXBvbmVudCIsInJvb3QiLCJyb290XyIsImluaXRpYWxpemUiLCJmb3VuZGF0aW9uXyIsImdldERlZmF1bHRGb3VuZGF0aW9uIiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJNRENSaXBwbGUiLCJ1bmJvdW5kZWRfIiwic2V0VW5ib3VuZGVkIiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwiY3JlYXRlQWRhcHRlciIsImRhdGFzZXQiLCJzZXRVbmJvdW5kZWRfIiwiaW5zdGFuY2UiLCJ1dGlsIiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsIk1EQ0NoaXAiLCJsZWFkaW5nSWNvbl8iLCJxdWVyeVNlbGVjdG9yIiwicmlwcGxlXyIsInRyYWlsaW5nSWNvbkVsIiwiZW1pdCIsIkNISVBfU0VMRUNUT1IiLCJDSE9JQ0UiLCJGSUxURVIiLCJNRENDaGlwU2V0Rm91bmRhdGlvbiIsInNlbGVjdGVkQ2hpcHNfIiwiY2hpcEludGVyYWN0aW9uSGFuZGxlcl8iLCJoYW5kbGVDaGlwSW50ZXJhY3Rpb25fIiwiaW5kZXgiLCJzcGxpY2UiLCJjaG9pY2UiLCJwcm92aWRlIiwibWRjQ2hpcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztFQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0VBQ2hDO0VBQ0EsTUFBSUMsT0FBTyxJQUFYO0VBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0VBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUN4QztFQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0VBQ0Q7RUFDRCxNQUFJRixJQUFKLEVBQVU7RUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0VBQ0Q7RUFDRjs7RUNaTSxTQUFT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
