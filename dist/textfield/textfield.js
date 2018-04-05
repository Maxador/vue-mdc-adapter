/**
* @module vue-mdc-adaptertextfield 0.13.2
* @exports VueMDCTextfield
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueMDCTextfield = factory());
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

    var CustomElementMixin = {
      components: {
        CustomElement: CustomElement
      }
    };

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

    /* global CustomEvent */

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
     * Adapter for MDC Text Field Helper Text.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the TextField helper text into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldHelperTextAdapter = function () {
      function MDCTextFieldHelperTextAdapter() {
        classCallCheck(this, MDCTextFieldHelperTextAdapter);
      }

      createClass(MDCTextFieldHelperTextAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the helper text element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the helper text element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Returns whether or not the helper text element contains the given class.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Sets an attribute with a given value on the helper text element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Removes an attribute from the helper text element.
         * @param {string} attr
         */

      }, {
        key: "removeAttr",
        value: function removeAttr(attr) {}

        /**
         * Sets the text content for the helper text element.
         * @param {string} content
         */

      }, {
        key: "setContent",
        value: function setContent(content) {}
      }]);
      return MDCTextFieldHelperTextAdapter;
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
      ARIA_HIDDEN: 'aria-hidden',
      ROLE: 'role'
    };

    /** @enum {string} */
    var cssClasses = {
      HELPER_TEXT_PERSISTENT: 'mdc-text-field-helper-text--persistent',
      HELPER_TEXT_VALIDATION_MSG: 'mdc-text-field-helper-text--validation-msg'
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
     * @extends {MDCFoundation<!MDCTextFieldHelperTextAdapter>}
     * @final
     */

    var MDCTextFieldHelperTextFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldHelperTextFoundation, _MDCFoundation);
      createClass(MDCTextFieldHelperTextFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings;
        }

        /**
         * {@see MDCTextFieldHelperTextAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldHelperTextAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldHelperTextAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              setAttr: function setAttr() {},
              removeAttr: function removeAttr() {},
              setContent: function setContent() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldHelperTextAdapter} adapter
         */

      }]);

      function MDCTextFieldHelperTextFoundation(adapter) {
        classCallCheck(this, MDCTextFieldHelperTextFoundation);
        return possibleConstructorReturn(this, (MDCTextFieldHelperTextFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldHelperTextFoundation)).call(this, _extends(MDCTextFieldHelperTextFoundation.defaultAdapter, adapter)));
      }

      /**
       * Sets the content of the helper text field.
       * @param {string} content
       */


      createClass(MDCTextFieldHelperTextFoundation, [{
        key: 'setContent',
        value: function setContent(content) {
          this.adapter_.setContent(content);
        }

        /** @param {boolean} isPersistent Sets the persistency of the helper text. */

      }, {
        key: 'setPersistent',
        value: function setPersistent(isPersistent) {
          if (isPersistent) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_PERSISTENT);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_PERSISTENT);
          }
        }

        /**
         * @param {boolean} isValidation True to make the helper text act as an
         *   error validation message.
         */

      }, {
        key: 'setValidation',
        value: function setValidation(isValidation) {
          if (isValidation) {
            this.adapter_.addClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          } else {
            this.adapter_.removeClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          }
        }

        /** Makes the helper text visible to the screen reader. */

      }, {
        key: 'showToScreenReader',
        value: function showToScreenReader() {
          this.adapter_.removeAttr(strings.ARIA_HIDDEN);
        }

        /**
         * Sets the validity of the helper text based on the input validity.
         * @param {boolean} inputIsValid
         */

      }, {
        key: 'setValidity',
        value: function setValidity(inputIsValid) {
          var helperTextIsPersistent = this.adapter_.hasClass(cssClasses.HELPER_TEXT_PERSISTENT);
          var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses.HELPER_TEXT_VALIDATION_MSG);
          var validationMsgNeedsDisplay = helperTextIsValidationMsg && !inputIsValid;

          if (validationMsgNeedsDisplay) {
            this.adapter_.setAttr(strings.ROLE, 'alert');
          } else {
            this.adapter_.removeAttr(strings.ROLE);
          }

          if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
            this.hide_();
          }
        }

        /**
         * Hides the help text from screen readers.
         * @private
         */

      }, {
        key: 'hide_',
        value: function hide_() {
          this.adapter_.setAttr(strings.ARIA_HIDDEN, 'true');
        }
      }]);
      return MDCTextFieldHelperTextFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Text Field Icon.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the text field icon into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCTextFieldIconAdapter = function () {
      function MDCTextFieldIconAdapter() {
        classCallCheck(this, MDCTextFieldIconAdapter);
      }

      createClass(MDCTextFieldIconAdapter, [{
        key: "setAttr",

        /**
         * Sets an attribute on the icon element.
         * @param {string} attr
         * @param {string} value
         */
        value: function setAttr(attr, value) {}

        /**
         * Registers an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the icon element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}

        /**
         * Emits a custom event "MDCTextField:icon" denoting a user has clicked the icon.
         */

      }, {
        key: "notifyIconAction",
        value: function notifyIconAction() {}
      }]);
      return MDCTextFieldIconAdapter;
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
    var strings$1 = {
      ICON_EVENT: 'MDCTextField:icon'
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
     * @extends {MDCFoundation<!MDCTextFieldIconAdapter>}
     * @final
     */

    var MDCTextFieldIconFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldIconFoundation, _MDCFoundation);
      createClass(MDCTextFieldIconFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$1;
        }

        /**
         * {@see MDCTextFieldIconAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldIconAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldIconAdapter} */{
              setAttr: function setAttr() {},
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {},
              notifyIconAction: function notifyIconAction() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldIconAdapter} adapter
         */

      }]);

      function MDCTextFieldIconFoundation(adapter) {
        classCallCheck(this, MDCTextFieldIconFoundation);

        /** @private {function(!Event): undefined} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldIconFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldIconFoundation)).call(this, _extends(MDCTextFieldIconFoundation.defaultAdapter, adapter)));

        _this.interactionHandler_ = function (evt) {
          return _this.handleInteraction(evt);
        };
        return _this;
      }

      createClass(MDCTextFieldIconFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerInteractionHandler(evtType, _this2.interactionHandler_);
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterInteractionHandler(evtType, _this3.interactionHandler_);
          });
        }

        /**
         * Sets the content of the helper text field.
         * @param {boolean} disabled
         */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          if (disabled) {
            this.adapter_.setAttr('tabindex', '-1');
          } else {
            this.adapter_.setAttr('tabindex', '0');
          }
        }

        /**
         * Handles an interaction event
         * @param {!Event} evt
         */

      }, {
        key: 'handleInteraction',
        value: function handleInteraction(evt) {
          if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
            this.adapter_.notifyIconAction();
          }
        }
      }]);
      return MDCTextFieldIconFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Text Field.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Text Field into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */

    var MDCTextFieldAdapter = function () {
      function MDCTextFieldAdapter() {
        classCallCheck(this, MDCTextFieldAdapter);
      }

      createClass(MDCTextFieldAdapter, [{
        key: 'addClass',

        /**
         * Adds a class to the root Element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the root Element.
         * @param {string} className
         */

      }, {
        key: 'removeClass',
        value: function removeClass(className) {}

        /**
         * Returns true if the root element contains the given class name.
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: 'hasClass',
        value: function hasClass(className) {}

        /**
         * Registers an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerTextFieldInteractionHandler',
        value: function registerTextFieldInteractionHandler(type, handler) {}

        /**
         * Deregisters an event handler on the root element for a given event.
         * @param {string} type
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterTextFieldInteractionHandler',
        value: function deregisterTextFieldInteractionHandler(type, handler) {}

        /**
         * Registers an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'registerInputInteractionHandler',
        value: function registerInputInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the native input element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: 'deregisterInputInteractionHandler',
        value: function deregisterInputInteractionHandler(evtType, handler) {}

        /**
         * Registers a validation attribute change listener on the input element.
         * @param {function(!Array): undefined} handler
         * @return {!MutationObserver}
         */

      }, {
        key: 'registerValidationAttributeChangeHandler',
        value: function registerValidationAttributeChangeHandler(handler) {}

        /**
         * Disconnects a validation attribute observer on the input element.
         * @param {!MutationObserver} observer
         */

      }, {
        key: 'deregisterValidationAttributeChangeHandler',
        value: function deregisterValidationAttributeChangeHandler(observer) {}

        /**
         * Returns an object representing the native text input element, with a
         * similar API shape. The object returned should include the value, disabled
         * and badInput properties, as well as the checkValidity() function. We never
         * alter the value within our code, however we do update the disabled
         * property, so if you choose to duck-type the return value for this method
         * in your implementation it's important to keep this in mind. Also note that
         * this method can return null, which the foundation will handle gracefully.
         * @return {?Element|?NativeInputType}
         */

      }, {
        key: 'getNativeInput',
        value: function getNativeInput() {}

        /**
         * Returns true if the textfield is focused.
         * We achieve this via `document.activeElement === this.root_`.
         * @return {boolean}
         */

      }, {
        key: 'isFocused',
        value: function isFocused() {}

        /**
         * Returns true if the direction of the root element is set to RTL.
         * @return {boolean}
         */

      }, {
        key: 'isRtl',
        value: function isRtl() {}

        /**
         * Activates the line ripple.
         */

      }, {
        key: 'activateLineRipple',
        value: function activateLineRipple() {}

        /**
         * Deactivates the line ripple.
         */

      }, {
        key: 'deactivateLineRipple',
        value: function deactivateLineRipple() {}

        /**
         * Sets the transform origin of the line ripple.
         * @param {number} normalizedX
         */

      }, {
        key: 'setLineRippleTransformOrigin',
        value: function setLineRippleTransformOrigin(normalizedX) {}

        /**
         * Only implement if label exists.
         * Shakes label if shouldShake is true.
         * @param {boolean} shouldShake
         */

      }, {
        key: 'shakeLabel',
        value: function shakeLabel(shouldShake) {}

        /**
         * Only implement if label exists.
         * Floats the label above the input element if shouldFloat is true.
         * @param {boolean} shouldFloat
         */

      }, {
        key: 'floatLabel',
        value: function floatLabel(shouldFloat) {}

        /**
         * Returns true if label element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasLabel',
        value: function hasLabel() {}

        /**
         * Only implement if label exists.
         * Returns width of label in pixels.
         * @return {number}
         */

      }, {
        key: 'getLabelWidth',
        value: function getLabelWidth() {}

        /**
         * Returns true if outline element exists, false if it doesn't.
         * @return {boolean}
         */

      }, {
        key: 'hasOutline',
        value: function hasOutline() {}

        /**
         * Only implement if outline element exists.
         * Updates SVG Path on outline element based on the
         * label element width and RTL context.
         * @param {number} labelWidth
         * @param {boolean} isRtl
         */

      }, {
        key: 'updateOutlinePath',
        value: function updateOutlinePath(labelWidth, isRtl) {}
      }]);
      return MDCTextFieldAdapter;
    }();

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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
     * Adapter for MDC TextField Line Ripple.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the line ripple into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCLineRippleAdapter = function () {
      function MDCLineRippleAdapter() {
        classCallCheck(this, MDCLineRippleAdapter);
      }

      createClass(MDCLineRippleAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the line ripple element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the line ripple element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * @param {string} className
         * @return {boolean}
         */

      }, {
        key: "hasClass",
        value: function hasClass(className) {}

        /**
         * Sets an attribute with a given value on the line ripple element.
         * @param {string} attr
         * @param {string} value
         */

      }, {
        key: "setAttr",
        value: function setAttr(attr, value) {}

        /**
         * Registers an event listener on the line ripple element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerEventHandler",
        value: function registerEventHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the line ripple element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterEventHandler",
        value: function deregisterEventHandler(evtType, handler) {}
      }]);
      return MDCLineRippleAdapter;
    }();

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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
    var cssClasses$1 = {
      LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
      LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
    };

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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
     * @extends {MDCFoundation<!MDCLineRippleAdapter>}
     * @final
     */

    var MDCLineRippleFoundation = function (_MDCFoundation) {
      inherits(MDCLineRippleFoundation, _MDCFoundation);
      createClass(MDCLineRippleFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$1;
        }

        /**
         * {@see MDCLineRippleAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCLineRippleAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCLineRippleAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              setAttr: function setAttr() {},
              registerEventHandler: function registerEventHandler() {},
              deregisterEventHandler: function deregisterEventHandler() {}
            }
          );
        }

        /**
         * @param {!MDCLineRippleAdapter=} adapter
         */

      }]);

      function MDCLineRippleFoundation() {
        var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /** @type {!MDCLineRippleAdapter} */{};
        classCallCheck(this, MDCLineRippleFoundation);

        /** @private {function(!Event): undefined} */
        var _this = possibleConstructorReturn(this, (MDCLineRippleFoundation.__proto__ || Object.getPrototypeOf(MDCLineRippleFoundation)).call(this, _extends(MDCLineRippleFoundation.defaultAdapter, adapter)));

        _this.transitionEndHandler_ = function (evt) {
          return _this.handleTransitionEnd(evt);
        };
        return _this;
      }

      createClass(MDCLineRippleFoundation, [{
        key: 'init',
        value: function init() {
          this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
        }

        /**
         * Activates the line ripple
         */

      }, {
        key: 'activate',
        value: function activate() {
          this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
          this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
        }

        /**
         * Sets the center of the ripple animation to the given X coordinate.
         * @param {!number} xCoordinate
         */

      }, {
        key: 'setRippleCenter',
        value: function setRippleCenter(xCoordinate) {
          var attributeString = 'transform-origin: ' + xCoordinate + 'px center';

          this.adapter_.setAttr('style', attributeString);
        }

        /**
         * Deactivates the line ripple
         */

      }, {
        key: 'deactivate',
        value: function deactivate() {
          this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
        }

        /**
         * Handles a transition end event
         * @param {!Event} evt
         */

      }, {
        key: 'handleTransitionEnd',
        value: function handleTransitionEnd(evt) {
          // Wait for the line ripple to be either transparent or opaque
          // before emitting the animation end event
          var isDeactivating = this.adapter_.hasClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);

          if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
              this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
              this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
            }
          }
        }
      }]);
      return MDCLineRippleFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Floating Label.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the floating label into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCFloatingLabelAdapter = function () {
      function MDCFloatingLabelAdapter() {
        classCallCheck(this, MDCFloatingLabelAdapter);
      }

      createClass(MDCFloatingLabelAdapter, [{
        key: "addClass",

        /**
         * Adds a class to the label element.
         * @param {string} className
         */
        value: function addClass(className) {}

        /**
         * Removes a class from the label element.
         * @param {string} className
         */

      }, {
        key: "removeClass",
        value: function removeClass(className) {}

        /**
         * Returns the width of the label element.
         * @return {number}
         */

      }, {
        key: "getWidth",
        value: function getWidth() {}

        /**
         * Registers an event listener on the root element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "registerInteractionHandler",
        value: function registerInteractionHandler(evtType, handler) {}

        /**
         * Deregisters an event listener on the root element for a given event.
         * @param {string} evtType
         * @param {function(!Event): undefined} handler
         */

      }, {
        key: "deregisterInteractionHandler",
        value: function deregisterInteractionHandler(evtType, handler) {}
      }]);
      return MDCFloatingLabelAdapter;
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
    var cssClasses$2 = {
      LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
      LABEL_SHAKE: 'mdc-floating-label--shake'
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
     * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
     * @final
     */

    var MDCFloatingLabelFoundation = function (_MDCFoundation) {
      inherits(MDCFloatingLabelFoundation, _MDCFoundation);
      createClass(MDCFloatingLabelFoundation, null, [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$2;
        }

        /**
         * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCFloatingLabelAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCFloatingLabelAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              getWidth: function getWidth() {},
              registerInteractionHandler: function registerInteractionHandler() {},
              deregisterInteractionHandler: function deregisterInteractionHandler() {}
            }
          );
        }

        /**
         * @param {!MDCFloatingLabelAdapter} adapter
         */

      }]);

      function MDCFloatingLabelFoundation(adapter) {
        classCallCheck(this, MDCFloatingLabelFoundation);

        /** @private {function(!Event): undefined} */
        var _this = possibleConstructorReturn(this, (MDCFloatingLabelFoundation.__proto__ || Object.getPrototypeOf(MDCFloatingLabelFoundation)).call(this, _extends(MDCFloatingLabelFoundation.defaultAdapter, adapter)));

        _this.shakeAnimationEndHandler_ = function () {
          return _this.handleShakeAnimationEnd_();
        };
        return _this;
      }

      createClass(MDCFloatingLabelFoundation, [{
        key: 'init',
        value: function init() {
          this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
        }

        /**
         * Returns the width of the label element.
         * @return {number}
         */

      }, {
        key: 'getWidth',
        value: function getWidth() {
          return this.adapter_.getWidth();
        }

        /**
         * Styles the label to produce the label shake for errors.
         * @param {boolean} shouldShake adds shake class if true,
         * otherwise removes shake class.
         */

      }, {
        key: 'shake',
        value: function shake(shouldShake) {
          var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

          if (shouldShake) {
            this.adapter_.addClass(LABEL_SHAKE);
          } else {
            this.adapter_.removeClass(LABEL_SHAKE);
          }
        }

        /**
         * Styles the label to float or dock.
         * @param {boolean} shouldFloat adds float class if true, otherwise remove
         * float and shake class to dock label.
         */

      }, {
        key: 'float',
        value: function float(shouldFloat) {
          var _MDCFloatingLabelFoun = MDCFloatingLabelFoundation.cssClasses,
              LABEL_FLOAT_ABOVE = _MDCFloatingLabelFoun.LABEL_FLOAT_ABOVE,
              LABEL_SHAKE = _MDCFloatingLabelFoun.LABEL_SHAKE;

          if (shouldFloat) {
            this.adapter_.addClass(LABEL_FLOAT_ABOVE);
          } else {
            this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
            this.adapter_.removeClass(LABEL_SHAKE);
          }
        }

        /**
         * Handles an interaction event on the root element.
         */

      }, {
        key: 'handleShakeAnimationEnd_',
        value: function handleShakeAnimationEnd_() {
          var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

          this.adapter_.removeClass(LABEL_SHAKE);
        }
      }]);
      return MDCFloatingLabelFoundation;
    }(MDCFoundation);

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
     * Adapter for MDC Notched Outline.
     *
     * Defines the shape of the adapter expected by the foundation. Implement this
     * adapter to integrate the Notched Outline into your framework. See
     * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
     * for more information.
     *
     * @record
     */
    var MDCNotchedOutlineAdapter = function () {
      function MDCNotchedOutlineAdapter() {
        classCallCheck(this, MDCNotchedOutlineAdapter);
      }

      createClass(MDCNotchedOutlineAdapter, [{
        key: "getWidth",

        /**
         * Returns the width of the root element.
         * @return {number}
         */
        value: function getWidth() {}

        /**
         * Returns the height of the root element.
         * @return {number}
         */

      }, {
        key: "getHeight",
        value: function getHeight() {}

        /**
         * Sets the "d" attribute of the outline element's SVG path.
         * @param {string} value
         */

      }, {
        key: "setOutlinePathAttr",
        value: function setOutlinePathAttr(value) {}

        /**
         * Returns the idle outline element's computed style value of the given css property `propertyName`.
         * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
         * @param {string} propertyName
         * @return {string}
         */

      }, {
        key: "getIdleOutlineStyleValue",
        value: function getIdleOutlineStyleValue(propertyName) {}
      }]);
      return MDCNotchedOutlineAdapter;
    }();

    /**
     * @license
     * Copyright 2018 Google Inc. All Rights Reserved.
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
      PATH_SELECTOR: '.mdc-notched-outline__path',
      IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle'
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
     * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
     * @final
     */

    var MDCNotchedOutlineFoundation = function (_MDCFoundation) {
      inherits(MDCNotchedOutlineFoundation, _MDCFoundation);
      createClass(MDCNotchedOutlineFoundation, null, [{
        key: 'strings',

        /** @return enum {string} */
        get: function get$$1() {
          return strings$2;
        }

        /**
         * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCNotchedOutlineAdapter}
         */

      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCNotchedOutlineAdapter} */{
              getWidth: function getWidth() {},
              getHeight: function getHeight() {},
              setOutlinePathAttr: function setOutlinePathAttr() {},
              getIdleOutlineStyleValue: function getIdleOutlineStyleValue() {}
            }
          );
        }

        /**
         * @param {!MDCNotchedOutlineAdapter} adapter
         */

      }]);

      function MDCNotchedOutlineFoundation(adapter) {
        classCallCheck(this, MDCNotchedOutlineFoundation);
        return possibleConstructorReturn(this, (MDCNotchedOutlineFoundation.__proto__ || Object.getPrototypeOf(MDCNotchedOutlineFoundation)).call(this, _extends(MDCNotchedOutlineFoundation.defaultAdapter, adapter)));
      }

      /**
       * Updates the SVG path of the focus outline element based on the notchWidth
       * and the RTL context.
       * @param {number} notchWidth
       * @param {boolean=} isRtl
       */


      createClass(MDCNotchedOutlineFoundation, [{
        key: 'updateSvgPath',
        value: function updateSvgPath(notchWidth) {
          var isRtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
          var radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') || this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
          var radius = parseFloat(radiusStyleValue);
          var width = this.adapter_.getWidth();
          var height = this.adapter_.getHeight();
          var cornerWidth = radius + 1.2;
          var leadingStrokeLength = Math.abs(11 - cornerWidth);
          var paddedNotchWidth = notchWidth + 8;

          // The right, bottom, and left sides of the outline follow the same SVG path.
          var pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + 'h' + (-width + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + 'v' + (-height + 2 * cornerWidth) + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

          var path = void 0;
          if (!isRtl) {
            path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1 + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength) + pathMiddle + 'h' + leadingStrokeLength;
          } else {
            path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1 + 'h' + leadingStrokeLength + pathMiddle + 'h' + (width - 2 * cornerWidth - paddedNotchWidth - leadingStrokeLength);
          }

          this.adapter_.setOutlinePathAttr(path);
        }
      }]);
      return MDCNotchedOutlineFoundation;
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

    /** @enum {string} */
    var strings$3 = {
      ARIA_CONTROLS: 'aria-controls',
      INPUT_SELECTOR: '.mdc-text-field__input',
      LABEL_SELECTOR: '.mdc-floating-label',
      ICON_SELECTOR: '.mdc-text-field__icon',
      OUTLINE_SELECTOR: '.mdc-notched-outline',
      BOTTOM_LINE_SELECTOR: '.mdc-line-ripple'
    };

    /** @enum {string} */
    var cssClasses$3 = {
      ROOT: 'mdc-text-field',
      UPGRADED: 'mdc-text-field--upgraded',
      DISABLED: 'mdc-text-field--disabled',
      DENSE: 'mdc-text-field--dense',
      FOCUSED: 'mdc-text-field--focused',
      INVALID: 'mdc-text-field--invalid',
      BOX: 'mdc-text-field--box',
      OUTLINED: 'mdc-text-field--outlined'
    };

    /** @enum {number} */
    var numbers = {
      LABEL_SCALE: 0.75,
      DENSE_LABEL_SCALE: 0.923
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

    // whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
    // under section: `Validation-related attributes`
    var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];

    /**
     * @extends {MDCFoundation<!MDCTextFieldAdapter>}
     * @final
     */

    var MDCTextFieldFoundation = function (_MDCFoundation) {
      inherits(MDCTextFieldFoundation, _MDCFoundation);
      createClass(MDCTextFieldFoundation, [{
        key: 'shouldShake',


        /** @return {boolean} */
        get: function get$$1() {
          return !this.isValid() && !this.isFocused_;
        }

        /** @return {boolean} */

      }, {
        key: 'shouldFloat',
        get: function get$$1() {
          return !this.isBadInput_() && (!!this.getValue() || this.isFocused_);
        }

        /**
         * {@see MDCTextFieldAdapter} for typing information on parameters and return
         * types.
         * @return {!MDCTextFieldAdapter}
         */

      }], [{
        key: 'cssClasses',

        /** @return enum {string} */
        get: function get$$1() {
          return cssClasses$3;
        }

        /** @return enum {string} */

      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$3;
        }

        /** @return enum {string} */

      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers;
        }
      }, {
        key: 'defaultAdapter',
        get: function get$$1() {
          return (/** @type {!MDCTextFieldAdapter} */{
              addClass: function addClass() {},
              removeClass: function removeClass() {},
              hasClass: function hasClass() {},
              registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler() {},
              deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler() {},
              registerInputInteractionHandler: function registerInputInteractionHandler() {},
              deregisterInputInteractionHandler: function deregisterInputInteractionHandler() {},
              registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler() {},
              deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler() {},
              getNativeInput: function getNativeInput() {},
              isFocused: function isFocused() {},
              isRtl: function isRtl() {},
              activateLineRipple: function activateLineRipple() {},
              deactivateLineRipple: function deactivateLineRipple() {},
              setLineRippleTransformOrigin: function setLineRippleTransformOrigin() {},
              shakeLabel: function shakeLabel() {},
              floatLabel: function floatLabel() {},
              hasLabel: function hasLabel() {},
              getLabelWidth: function getLabelWidth() {},
              hasOutline: function hasOutline() {},
              updateOutlinePath: function updateOutlinePath() {}
            }
          );
        }

        /**
         * @param {!MDCTextFieldAdapter} adapter
         * @param {!FoundationMapType=} foundationMap Map from subcomponent names to their subfoundations.
         */

      }]);

      function MDCTextFieldFoundation(adapter) {
        var foundationMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /** @type {!FoundationMapType} */{};
        classCallCheck(this, MDCTextFieldFoundation);

        /** @type {!MDCTextFieldHelperTextFoundation|undefined} */
        var _this = possibleConstructorReturn(this, (MDCTextFieldFoundation.__proto__ || Object.getPrototypeOf(MDCTextFieldFoundation)).call(this, _extends(MDCTextFieldFoundation.defaultAdapter, adapter)));

        _this.helperText_ = foundationMap.helperText;
        /** @type {!MDCTextFieldIconFoundation|undefined} */
        _this.icon_ = foundationMap.icon;

        /** @private {boolean} */
        _this.isFocused_ = false;
        /** @private {boolean} */
        _this.receivedUserInput_ = false;
        /** @private {boolean} */
        _this.useCustomValidityChecking_ = false;
        /** @private {boolean} */
        _this.isValid_ = true;
        /** @private {function(): undefined} */
        _this.inputFocusHandler_ = function () {
          return _this.activateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputBlurHandler_ = function () {
          return _this.deactivateFocus();
        };
        /** @private {function(): undefined} */
        _this.inputInputHandler_ = function () {
          return _this.autoCompleteFocus();
        };
        /** @private {function(!Event): undefined} */
        _this.setPointerXOffset_ = function (evt) {
          return _this.setTransformOrigin(evt);
        };
        /** @private {function(!Event): undefined} */
        _this.textFieldInteractionHandler_ = function () {
          return _this.handleTextFieldInteraction();
        };
        /** @private {function(!Array): undefined} */
        _this.validationAttributeChangeHandler_ = function (mutations) {
          return _this.handleValidationAttributeMutation_(mutations);
        };
        /** @private {!MutationObserver} */
        _this.validationObserver_;
        return _this;
      }

      createClass(MDCTextFieldFoundation, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this.adapter_.addClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          // Ensure label does not collide with any pre-filled value.
          if (this.adapter_.hasLabel() && this.getValue()) {
            this.adapter_.floatLabel(this.shouldFloat);
          }

          if (this.adapter_.isFocused()) {
            this.inputFocusHandler_();
          }

          this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this2.adapter_.registerInputInteractionHandler(evtType, _this2.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this2.adapter_.registerTextFieldInteractionHandler(evtType, _this2.textFieldInteractionHandler_);
          });
          this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this3 = this;

          this.adapter_.removeClass(MDCTextFieldFoundation.cssClasses.UPGRADED);
          this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
          this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
          this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
          ['mousedown', 'touchstart'].forEach(function (evtType) {
            _this3.adapter_.deregisterInputInteractionHandler(evtType, _this3.setPointerXOffset_);
          });
          ['click', 'keydown'].forEach(function (evtType) {
            _this3.adapter_.deregisterTextFieldInteractionHandler(evtType, _this3.textFieldInteractionHandler_);
          });
          this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
        }

        /**
         * Handles user interactions with the Text Field.
         */

      }, {
        key: 'handleTextFieldInteraction',
        value: function handleTextFieldInteraction() {
          if (this.adapter_.getNativeInput().disabled) {
            return;
          }
          this.receivedUserInput_ = true;
        }

        /**
         * Handles validation attribute changes
         * @param {Array<MutationRecord>} mutationsList
         * @private
         */

      }, {
        key: 'handleValidationAttributeMutation_',
        value: function handleValidationAttributeMutation_(mutationsList) {
          var _this4 = this;

          mutationsList.some(function (mutation) {
            if (VALIDATION_ATTR_WHITELIST.indexOf(mutation.attributeName) > -1) {
              _this4.styleValidity_(true);
              return true;
            }
          });
        }

        /**
         * Updates the focus outline for outlined text fields.
         */

      }, {
        key: 'updateOutline',
        value: function updateOutline() {
          if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
            return;
          }

          var isDense = this.adapter_.hasClass(cssClasses$3.DENSE);
          var labelScale = isDense ? numbers.DENSE_LABEL_SCALE : numbers.LABEL_SCALE;
          var labelWidth = this.adapter_.getLabelWidth() * labelScale;
          var isRtl = this.adapter_.isRtl();
          this.adapter_.updateOutlinePath(labelWidth, isRtl);
        }

        /**
         * Activates the text field focus state.
         */

      }, {
        key: 'activateFocus',
        value: function activateFocus() {
          this.isFocused_ = true;
          this.styleFocused_(this.isFocused_);
          this.adapter_.activateLineRipple();
          this.updateOutline();
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
          }
          if (this.helperText_) {
            this.helperText_.showToScreenReader();
          }
        }

        /**
         * Sets the line ripple's transform origin, so that the line ripple activate
         * animation will animate out from the user's click location.
         * @param {!Event} evt
         */

      }, {
        key: 'setTransformOrigin',
        value: function setTransformOrigin(evt) {
          var targetClientRect = evt.target.getBoundingClientRect();
          var evtCoords = { x: evt.clientX, y: evt.clientY };
          var normalizedX = evtCoords.x - targetClientRect.left;
          this.adapter_.setLineRippleTransformOrigin(normalizedX);
        }

        /**
         * Activates the Text Field's focus state in cases when the input value
         * changes without user input (e.g. programatically).
         */

      }, {
        key: 'autoCompleteFocus',
        value: function autoCompleteFocus() {
          if (!this.receivedUserInput_) {
            this.activateFocus();
          }
        }

        /**
         * Deactivates the Text Field's focus state.
         */

      }, {
        key: 'deactivateFocus',
        value: function deactivateFocus() {
          this.isFocused_ = false;
          this.adapter_.deactivateLineRipple();
          var input = this.getNativeInput_();
          var shouldRemoveLabelFloat = !input.value && !this.isBadInput_();
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          this.styleFocused_(this.isFocused_);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
          }
          if (shouldRemoveLabelFloat) {
            this.receivedUserInput_ = false;
          }
        }

        /**
         * @return {string} The value of the input Element.
         */

      }, {
        key: 'getValue',
        value: function getValue() {
          return this.getNativeInput_().value;
        }

        /**
         * @param {string} value The value to set on the input Element.
         */

      }, {
        key: 'setValue',
        value: function setValue(value) {
          this.getNativeInput_().value = value;
          var isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
            this.adapter_.floatLabel(this.shouldFloat);
          }
        }

        /**
         * @return {boolean} If a custom validity is set, returns that value.
         *     Otherwise, returns the result of native validity checks.
         */

      }, {
        key: 'isValid',
        value: function isValid() {
          return this.useCustomValidityChecking_ ? this.isValid_ : this.isNativeInputValid_();
        }

        /**
         * @param {boolean} isValid Sets the validity state of the Text Field.
         */

      }, {
        key: 'setValid',
        value: function setValid(isValid) {
          this.useCustomValidityChecking_ = true;
          this.isValid_ = isValid;
          // Retrieve from the getter to ensure correct logic is applied.
          isValid = this.isValid();
          this.styleValidity_(isValid);
          if (this.adapter_.hasLabel()) {
            this.adapter_.shakeLabel(this.shouldShake);
          }
        }

        /**
         * @return {boolean} True if the Text Field is disabled.
         */

      }, {
        key: 'isDisabled',
        value: function isDisabled() {
          return this.getNativeInput_().disabled;
        }

        /**
         * @param {boolean} disabled Sets the text-field disabled or enabled.
         */

      }, {
        key: 'setDisabled',
        value: function setDisabled(disabled) {
          this.getNativeInput_().disabled = disabled;
          this.styleDisabled_(disabled);
        }

        /**
         * @param {string} content Sets the content of the helper text.
         */

      }, {
        key: 'setHelperTextContent',
        value: function setHelperTextContent(content) {
          if (this.helperText_) {
            this.helperText_.setContent(content);
          }
        }

        /**
         * @return {boolean} True if the Text Field input fails in converting the
         *     user-supplied value.
         * @private
         */

      }, {
        key: 'isBadInput_',
        value: function isBadInput_() {
          return this.getNativeInput_().validity.badInput;
        }

        /**
         * @return {boolean} The result of native validity checking
         *     (ValidityState.valid).
         */

      }, {
        key: 'isNativeInputValid_',
        value: function isNativeInputValid_() {
          return this.getNativeInput_().validity.valid;
        }

        /**
         * Styles the component based on the validity state.
         * @param {boolean} isValid
         * @private
         */

      }, {
        key: 'styleValidity_',
        value: function styleValidity_(isValid) {
          var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

          if (isValid) {
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.addClass(INVALID);
          }
          if (this.helperText_) {
            this.helperText_.setValidity(isValid);
          }
        }

        /**
         * Styles the component based on the focused state.
         * @param {boolean} isFocused
         * @private
         */

      }, {
        key: 'styleFocused_',
        value: function styleFocused_(isFocused) {
          var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

          if (isFocused) {
            this.adapter_.addClass(FOCUSED);
          } else {
            this.adapter_.removeClass(FOCUSED);
          }
        }

        /**
         * Styles the component based on the disabled state.
         * @param {boolean} isDisabled
         * @private
         */

      }, {
        key: 'styleDisabled_',
        value: function styleDisabled_(isDisabled) {
          var _MDCTextFieldFoundati = MDCTextFieldFoundation.cssClasses,
              DISABLED = _MDCTextFieldFoundati.DISABLED,
              INVALID = _MDCTextFieldFoundati.INVALID;

          if (isDisabled) {
            this.adapter_.addClass(DISABLED);
            this.adapter_.removeClass(INVALID);
          } else {
            this.adapter_.removeClass(DISABLED);
          }
          if (this.icon_) {
            this.icon_.setDisabled(isDisabled);
          }
        }

        /**
         * @return {!Element|!NativeInputType} The native text input from the
         * host environment, or a dummy if none exists.
         * @private
         */

      }, {
        key: 'getNativeInput_',
        value: function getNativeInput_() {
          return this.adapter_.getNativeInput() ||
          /** @type {!NativeInputType} */{
            value: '',
            disabled: false,
            validity: {
              badInput: false,
              valid: true
            }
          };
        }
      }]);
      return MDCTextFieldFoundation;
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

    var cssClasses$4 = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
    };

    var strings$4 = {
      VAR_LEFT: '--mdc-ripple-left',
      VAR_TOP: '--mdc-ripple-top',
      VAR_FG_SIZE: '--mdc-ripple-fg-size',
      VAR_FG_SCALE: '--mdc-ripple-fg-scale',
      VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
      VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
    };

    var numbers$1 = {
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
          return cssClasses$4;
        }
      }, {
        key: 'strings',
        get: function get$$1() {
          return strings$4;
        }
      }, {
        key: 'numbers',
        get: function get$$1() {
          return numbers$1;
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
            }, numbers$1.FG_DEACTIVATION_MS);
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

    var mdcTextField = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-textfield-wrapper", style: { width: _vm.fullwidth ? '100%' : undefined } }, [_c('div', { ref: "root", class: _vm.rootClasses }, [!!_vm.hasLeadingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasLeadingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("leading-icon", [_vm._v(_vm._s(_vm.hasLeadingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.multiline ? _c('textarea', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls, "rows": _vm.rows, "cols": _vm.cols }, on: { "input": function input($event) {
              _vm.updateValue($event.target.value);
            } } }, 'textarea', _vm.inputAttrs, false), _vm.$listeners)) : _c('input', _vm._g(_vm._b({ ref: "input", class: _vm.inputClasses, attrs: { "type": _vm.type, "minlength": _vm.minlength, "maxlength": _vm.maxlength, "placeholder": _vm.inputPlaceHolder, "aria-label": _vm.inputPlaceHolder, "aria-controls": _vm.inputAriaControls }, on: { "input": function input($event) {
              _vm.updateValue($event.target.value);
            } } }, 'input', _vm.inputAttrs, false), _vm.$listeners)), _vm._v(" "), _vm.hasLabel ? _c('label', { ref: "label", class: _vm.labelClassesUpgraded, attrs: { "for": _vm._uid } }, [_vm._v(" " + _vm._s(_vm.label) + " ")]) : _vm._e(), _vm._v(" "), !!_vm.hasTrailingIcon ? _c('i', { ref: "icon", staticClass: "mdc-text-field__icon", class: _vm.hasTrailingIcon.classes, attrs: { "tabindex": "0" } }, [_vm._t("trailing-icon", [_vm._v(_vm._s(_vm.hasTrailingIcon.content))])], 2) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outline", staticClass: "mdc-notched-outline" }, [_c('svg', [_c('path', { staticClass: "mdc-notched-outline__path", attrs: { "d": _vm.outlinePathAttr } })])]) : _vm._e(), _vm._v(" "), _vm.hasOutline ? _c('div', { ref: "outlineIdle", staticClass: "mdc-notched-outline__idle" }) : _vm._e(), _vm._v(" "), _vm.hasBottomLine ? _c('div', { ref: "bottom", class: _vm.bottomClasses }) : _vm._e()]), _vm._v(" "), _vm.helptext ? _c('p', { ref: "help", class: _vm.helpClasses, attrs: { "id": 'help-' + _vm._uid, "aria-hidden": "true" } }, [_vm._v(" " + _vm._s(_vm.helptext) + " ")]) : _vm._e()]);
      }, staticRenderFns: [],
      name: 'mdc-textfield',
      mixins: [CustomElementMixin, DispatchFocusMixin],
      model: {
        prop: 'value',
        event: 'model'
      },
      props: {
        value: String,
        type: {
          type: String,
          default: 'text',
          validator: function validator(value) {
            return ['text', 'email', 'search', 'password', 'tel', 'url'].indexOf(value) !== -1;
          }
        },
        dense: Boolean,
        label: String,
        helptext: String,
        helptextPersistent: Boolean,
        helptextValidation: Boolean,
        box: Boolean,
        outline: Boolean,
        disabled: Boolean,
        required: Boolean,
        valid: { type: Boolean, default: undefined },
        fullwidth: Boolean,
        multiline: Boolean,
        leadingIcon: [String, Array, Object],
        trailingIcon: [String, Array, Object],
        size: { type: [Number, String], default: 20 },
        minlength: { type: [Number, String], default: undefined },
        maxlength: { type: [Number, String], default: undefined },
        rows: { type: [Number, String], default: 8 },
        cols: { type: [Number, String], default: 40 },

        // other input props
        name: String,
        readonly: Boolean,
        autocomplete: Boolean,
        autofocus: Boolean
      },
      data: function data() {
        return {
          text: this.value,
          rootClasses: {
            'mdc-textfield': true,
            'mdc-text-field': true,
            'mdc-text-field--upgraded': true,
            'mdc-text-field--disabled': this.disabled,
            'mdc-text-field--dense': this.dense,
            'mdc-text-field--fullwidth': this.fullwidth,
            'mdc-text-field--textarea': this.multiline,
            'mdc-text-field--box': !this.fullwidth && this.box,
            'mdc-text-field--outlined': !this.fullwidth && this.outline
          },
          inputClasses: {
            'mdc-text-field__input': true
          },
          labelClasses: {
            'mdc-floating-label': true
          },
          bottomClasses: {
            'mdc-line-ripple': true
          },
          helpClasses: {
            'mdc-text-field-helper-text': true,
            'mdc-text-field-helper-text--persistent': this.helptextPersistent,
            'mdc-text-field-helper-text--validation-msg': this.helptextValidation
          },
          outlinePathAttr: undefined
        };
      },
      watch: {
        disabled: function disabled() {
          this.foundation && this.foundation.setDisabled(this.disabled);
        },
        required: function required() {
          this.$refs.input && (this.$refs.input.required = this.required);
        },
        valid: function valid() {
          if (typeof this.valid !== 'undefined') {
            this.foundation && this.foundation.setValid(this.valid);
          }
        },
        dense: function dense() {
          this.$set(this.rootClasses, 'mdc-text-field--dense', this.dense);
        },
        helptextPersistent: function helptextPersistent() {
          this.helperTextFoundation && this.helperTextFoundation.setPersistent(this.helptextPersistent);
        },
        helptextValidation: function helptextValidation() {
          this.helperTextFoundation && this.helperTextFoundation.setValidation(this.helptextValidation);
        },
        value: function value(_value) {
          if (this.foundation) {
            if (_value !== this.foundation.getValue()) {
              this.foundation.setValue(_value);
            }
          }
        }
      },
      methods: {
        updateValue: function updateValue(value) {
          this.$emit('model', value);
        },
        focus: function focus() {
          this.$refs.input && this.$refs.input.focus();
        },
        blur: function blur() {
          this.$refs.input && this.$refs.input.blur();
        }
      },
      computed: {
        inputAttrs: function inputAttrs() {
          var name = this.name,
              readonly = this.readonly,
              autocomplete = this.autocomplete,
              autofocus = this.autofocus;

          return { name: name, readonly: readonly, autocomplete: autocomplete, autofocus: autofocus };
        },
        inputPlaceHolder: function inputPlaceHolder() {
          return this.fullwidth ? this.label : undefined;
        },
        inputAriaControls: function inputAriaControls() {
          return this.help ? 'help-' + this._uid : undefined;
        },
        hasLabel: function hasLabel() {
          return !this.fullwidth && this.label;
        },
        hasOutline: function hasOutline() {
          return !this.fullwidth && this.outline;
        },
        hasBottomLine: function hasBottomLine() {
          return !this.hasOutline && !this.multiline;
        },
        hasLeadingIcon: function hasLeadingIcon() {
          if ((this.leadingIcon || this.$slots['leading-icon']) && !(this.trailingIcon || this.$slots['trailing-icon'])) {
            return this.leadingIcon ? extractIconProp(this.leadingIcon) : {};
          }
          return false;
        },
        hasTrailingIcon: function hasTrailingIcon() {
          if (this.trailingIcon || this.$slots['trailing-icon']) {
            return this.trailingIcon ? extractIconProp(this.trailingIcon) : {};
          }
          return false;
        },
        labelClassesUpgraded: function labelClassesUpgraded() {
          return _extends(this.labelClasses, {
            'mdc-floating-label--float-above': this.value
          });
        }
      },
      mounted: function mounted() {
        var _this = this;

        if (this.$refs.bottom) {
          this.bottomLineFoundation = new MDCLineRippleFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.bottomClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.bottomClasses, className);
            },
            hasClass: function hasClass(className) {
              _this.$refs.bottom.classList.contains(className);
            },
            setAttr: function setAttr(name, value) {
              _this.$refs.bottom.setAttribute(name, value);
            },
            registerEventHandler: function registerEventHandler(evtType, handler) {
              _this.$refs.bottom.addEventListener(evtType, handler);
            },
            deregisterEventHandler: function deregisterEventHandler(evtType, handler) {
              _this.$refs.bottom.removeEventListener(evtType, handler);
            }
          });
          this.bottomLineFoundation.init();
        }

        if (this.$refs.help) {
          this.helperTextFoundation = new MDCTextFieldHelperTextFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.helpClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.helpClasses, className);
            },
            hasClass: function hasClass(className) {
              return _this.$refs.help.classList.contains(className);
            },
            setAttr: function setAttr(name, value) {
              _this.$refs.help.setAttribute(name, value);
            },
            removeAttr: function removeAttr(name) {
              _this.$refs.help.removeAttribute(name);
            },
            setContent: function setContent() /*content*/{
              // help text get's updated from {{helptext}}
              // this.$refs.help.textContent = content;
            }
          });
          this.helperTextFoundation.init();
        }

        if (this.$refs.icon) {
          if (this.hasLeadingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-leading-icon', true);
          } else if (this.hasTrailingIcon) {
            this.$set(this.rootClasses, 'mdc-text-field--with-trailing-icon', true);
          }

          this.iconFoundation = new MDCTextFieldIconFoundation({
            setAttr: function setAttr(attr, value) {
              return _this.$refs.icon.setAttribute(attr, value);
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.icon.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.icon.removeEventListener(evtType, handler);
            },
            notifyIconAction: function notifyIconAction() {
              return _this.$emit('icon-action');
            }
          });
          this.iconFoundation.init();
        }

        if (this.$refs.label) {
          this.labelFoundation = new MDCFloatingLabelFoundation({
            addClass: function addClass(className) {
              _this.$set(_this.labelClasses, className, true);
            },
            removeClass: function removeClass(className) {
              _this.$delete(_this.labelClasses, className);
            },
            getWidth: function getWidth() {
              return _this.$refs.label.offsetWidth;
            },
            registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
              _this.$refs.label.addEventListener(evtType, handler);
            },
            deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
              _this.$refs.label.removeEventListener(evtType, handler);
            }
          });
          this.labelFoundation.init();
        }

        if (this.$refs.outline) {
          this.outlineFoundation = new MDCNotchedOutlineFoundation({
            getWidth: function getWidth() {
              return _this.$refs.outline.offsetWidth;
            },
            getHeight: function getHeight() {
              return _this.$refs.outline.offsetHeight;
            },
            setOutlinePathAttr: function setOutlinePathAttr(value) {
              _this.outlinePathAttr = value;
            },
            getIdleOutlineStyleValue: function getIdleOutlineStyleValue(propertyName) {
              var idleOutlineElement = _this.$refs.outlineIdle;
              if (idleOutlineElement) {
                return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
              }
            }
          });
          this.outlineFoundation.init();
        }

        this.foundation = new MDCTextFieldFoundation({
          addClass: function addClass(className) {
            _this.$set(_this.rootClasses, className, true);
          },
          removeClass: function removeClass(className) {
            _this.$delete(_this.rootClasses, className);
          },
          hasClass: function hasClass(className) {
            _this.$refs.root.classList.contains(className);
          },
          registerTextFieldInteractionHandler: function registerTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.addEventListener(evtType, handler);
          },
          deregisterTextFieldInteractionHandler: function deregisterTextFieldInteractionHandler(evtType, handler) {
            _this.$refs.root.removeEventListener(evtType, handler);
          },
          isFocused: function isFocused() {
            return document.activeElement === _this.$refs.input;
          },
          isRtl: function isRtl() {
            return window.getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
          },
          deactivateLineRipple: function deactivateLineRipple() {
            if (_this.bottom) {
              _this.bottom.deactivate();
            }
          },
          activateLineRipple: function activateLineRipple() {
            if (_this.bottom) {
              _this.bottom.activate();
            }
          },
          setLineRippleTransformOrigin: function setLineRippleTransformOrigin(normalizedX) {
            if (_this.bottom) {
              _this.bottom.setRippleCenter(normalizedX);
            }
          },
          registerInputInteractionHandler: function registerInputInteractionHandler(evtType, handler) {
            _this.$refs.input.addEventListener(evtType, handler);
          },
          deregisterInputInteractionHandler: function deregisterInputInteractionHandler(evtType, handler) {
            _this.$refs.input.removeEventListener(evtType, handler);
          },
          registerValidationAttributeChangeHandler: function registerValidationAttributeChangeHandler(handler) {
            var observer = new MutationObserver(handler);
            var targetNode = _this.$refs.input;
            var config = { attributes: true };
            observer.observe(targetNode, config);
            return observer;
          },
          deregisterValidationAttributeChangeHandler: function deregisterValidationAttributeChangeHandler(observer) {
            observer.disconnect();
          },
          shakeLabel: function shakeLabel(shouldShake) {
            _this.labelFoundation.shake(shouldShake);
          },
          floatLabel: function floatLabel(shouldFloat) {
            _this.labelFoundation.float(shouldFloat);
          },
          hasLabel: function hasLabel() {
            return !!_this.$refs.label;
          },
          getLabelWidth: function getLabelWidth() {
            return _this.labelFoundation.getWidth();
          },
          getNativeInput: function getNativeInput() {
            return _this.$refs.input;
          },
          hasOutline: function hasOutline() {
            return !!_this.hasOutline;
          },
          updateOutlinePath: function updateOutlinePath(labelWidth, isRtl) {
            _this.outlineFoundation.updateSvgPath(labelWidth, isRtl);
          }
        }, {
          bottomLine: this.bottomLineFoundation,
          helperText: this.helperTextFoundation,
          icon: this.iconFoundation,
          label: this.labelFoundation,
          outline: this.outlineFoundation
        });

        this.foundation.init();
        this.foundation.setValue(this.value);
        this.foundation.setDisabled(this.disabled);
        this.$refs.input && (this.$refs.input.required = this.required);
        if (typeof this.valid !== 'undefined') {
          this.foundation.setValid(this.valid);
        }

        if (this.textbox) {
          this.ripple = new RippleBase(this);
          this.ripple.init();
        }
      },
      beforeDestroy: function beforeDestroy() {
        this.foundation && this.foundation.destroy();
        this.bottomLineFoundation && this.bottomLineFoundation.destroy();
        this.helperTextFoundation && this.helperTextFoundation.destroy();
        this.iconFoundation && this.iconFoundation.destroy();
        this.labelFoundation && this.labelFoundation.destroy();
        this.outlineFoundation && this.outlineFoundation.destroy();
        this.ripple && this.ripple.destroy();
      }
    };

    var plugin = BasePlugin({
      mdcTextField: mdcTextField
    });

    autoInit(plugin);

    return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1lbGVtZW50LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20taWNvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90ZXh0ZmllbGQvaGVscGVyLXRleHQvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2hlbHBlci10ZXh0L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9pY29uL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9pY29uL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2ljb24vZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdGV4dGZpZWxkL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZmxvYXRpbmctbGFiZWwvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9ub3RjaGVkLW91dGxpbmUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RleHRmaWVsZC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vY29tcG9uZW50cy9yaXBwbGUvbWRjLXJpcHBsZS1iYXNlLmpzIiwiLi4vLi4vY29tcG9uZW50cy90ZXh0ZmllbGQvbWRjLXRleHRmaWVsZC52dWUiLCIuLi8uLi9jb21wb25lbnRzL3RleHRmaWVsZC9pbmRleC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvdGV4dGZpZWxkL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsImV4cG9ydCBjb25zdCBDdXN0b21FbGVtZW50ID0ge1xuICBmdW5jdGlvbmFsOiB0cnVlLFxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChcbiAgICAgIGNvbnRleHQucHJvcHMuaXMgfHwgY29udGV4dC5wcm9wcy50YWcgfHwgJ2RpdicsIFxuICAgICAgY29udGV4dC5kYXRhLFxuICAgICAgY29udGV4dC5jaGlsZHJlbilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tRWxlbWVudE1peGluID0ge1xuICBjb21wb25lbnRzOiB7XG4gICAgQ3VzdG9tRWxlbWVudFxuICB9XG59XG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RJY29uUHJvcCAoaWNvblByb3ApIHtcbiAgICBpZiAodHlwZW9mIGljb25Qcm9wID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xhc3NlczogeyAnbWF0ZXJpYWwtaWNvbnMnIDogdHJ1ZX0sXG4gICAgICAgIGNvbnRlbnQ6IGljb25Qcm9wIFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpY29uUHJvcCBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgIHJldHVybiB7IFxuICAgICAgICBjbGFzc2VzOiBpY29uUHJvcC5yZWR1Y2UoXG4gICAgICAgICAgKHJlc3VsdCwgdmFsdWUpID0+IE9iamVjdC5hc3NpZ24ocmVzdWx0LHtbdmFsdWVdOnRydWV9KSxcbiAgICAgICAgICB7fSksXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGljb25Qcm9wID09PSAnb2JqZWN0Jyl7XG4gICAgICByZXR1cm4geyBcbiAgICAgICAgY2xhc3NlczogaWNvblByb3AuY2xhc3NOYW1lLnNwbGl0KCcgJykucmVkdWNlKFxuICAgICAgICAgIChyZXN1bHQsIHZhbHVlKSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCx7W3ZhbHVlXTp0cnVlfSksXG4gICAgICAgICAge30pLFxuICAgICAgICBjb250ZW50OiBpY29uUHJvcC50ZXh0Q29udGVudCBcbiAgICAgIH1cbiAgICB9XG4gIH1cbiIsImV4cG9ydCBjb25zdCBEaXNwYXRjaEZvY3VzTWl4aW4gPSB7XG4gIGRhdGEgKCkge1xuICAgIHJldHVybiAge2hhc0ZvY3VzOiBmYWxzZX1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZVxuICAgIH0sXG4gICAgb25Nb3VzZVVwICgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlXG4gICAgfSxcbiAgICBvbkZvY3VzRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIG9uQmx1ckV2ZW50ICgpIHtcbiAgICAgIC8vIGRpc3BhdGNoIGFzeW5jIHRvIGxldCB0aW1lIHRvIG90aGVyIGZvY3VzIGV2ZW50IHRvIHByb3BhZ2F0ZVxuICAgICAgLy8gYWxzbyBmaWx0dXIgYmx1ciBpZiBtb3VzZWRvd25cbiAgICAgIHRoaXMuX2FjdGl2ZSB8fCBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZGlzcGF0Y2hGb2N1c0V2ZW50KCksMClcbiAgICB9LFxuICAgIGRpc3BhdGNoRm9jdXNFdmVudCgpIHtcbiAgICAgIGxldCBoYXNGb2N1cyA9IHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHx8IHRoaXMuJGVsLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKGhhc0ZvY3VzICE9IHRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgdGhpcy4kZW1pdChoYXNGb2N1cyA/ICdmb2N1cycgOiAnYmx1cicpXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBoYXNGb2N1c1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0V2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgdGhpcy5vbkJsdXJFdmVudClcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcClcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVGV4dCBGaWVsZCBIZWxwZXIgVGV4dC5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBUZXh0RmllbGQgaGVscGVyIHRleHQgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgaGVscGVyIHRleHQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgaGVscGVyIHRleHQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBoZWxwZXIgdGV4dCBlbGVtZW50IGNvbnRhaW5zIHRoZSBnaXZlbiBjbGFzcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIGF0dHJpYnV0ZSB3aXRoIGEgZ2l2ZW4gdmFsdWUgb24gdGhlIGhlbHBlciB0ZXh0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0cihhdHRyLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBhdHRyaWJ1dGUgZnJvbSB0aGUgaGVscGVyIHRleHQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICovXG4gIHJlbW92ZUF0dHIoYXR0cikge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGV4dCBjb250ZW50IGZvciB0aGUgaGVscGVyIHRleHQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICovXG4gIHNldENvbnRlbnQoY29udGVudCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBBUklBX0hJRERFTjogJ2FyaWEtaGlkZGVuJyxcbiAgUk9MRTogJ3JvbGUnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBIRUxQRVJfVEVYVF9QRVJTSVNURU5UOiAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXBlcnNpc3RlbnQnLFxuICBIRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRzogJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0LS12YWxpZGF0aW9uLW1zZycsXG59O1xuXG5leHBvcnQge3N0cmluZ3MsIGNzc0NsYXNzZXN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENUZXh0RmllbGRIZWxwZXJUZXh0QWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgaGFzQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0cjogKCkgPT4ge30sXG4gICAgICByZW1vdmVBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHNldENvbnRlbnQ6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyfSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIGhlbHBlciB0ZXh0IGZpZWxkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICAgKi9cbiAgc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRDb250ZW50KGNvbnRlbnQpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQZXJzaXN0ZW50IFNldHMgdGhlIHBlcnNpc3RlbmN5IG9mIHRoZSBoZWxwZXIgdGV4dC4gKi9cbiAgc2V0UGVyc2lzdGVudChpc1BlcnNpc3RlbnQpIHtcbiAgICBpZiAoaXNQZXJzaXN0ZW50KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9QRVJTSVNURU5UKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkYXRpb24gVHJ1ZSB0byBtYWtlIHRoZSBoZWxwZXIgdGV4dCBhY3QgYXMgYW5cbiAgICogICBlcnJvciB2YWxpZGF0aW9uIG1lc3NhZ2UuXG4gICAqL1xuICBzZXRWYWxpZGF0aW9uKGlzVmFsaWRhdGlvbikge1xuICAgIGlmIChpc1ZhbGlkYXRpb24pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5IRUxQRVJfVEVYVF9WQUxJREFUSU9OX01TRyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1ha2VzIHRoZSBoZWxwZXIgdGV4dCB2aXNpYmxlIHRvIHRoZSBzY3JlZW4gcmVhZGVyLiAqL1xuICBzaG93VG9TY3JlZW5SZWFkZXIoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVBdHRyKHN0cmluZ3MuQVJJQV9ISURERU4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbGlkaXR5IG9mIHRoZSBoZWxwZXIgdGV4dCBiYXNlZCBvbiB0aGUgaW5wdXQgdmFsaWRpdHkuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5wdXRJc1ZhbGlkXG4gICAqL1xuICBzZXRWYWxpZGl0eShpbnB1dElzVmFsaWQpIHtcbiAgICBjb25zdCBoZWxwZXJUZXh0SXNQZXJzaXN0ZW50ID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkhFTFBFUl9URVhUX1BFUlNJU1RFTlQpO1xuICAgIGNvbnN0IGhlbHBlclRleHRJc1ZhbGlkYXRpb25Nc2cgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuSEVMUEVSX1RFWFRfVkFMSURBVElPTl9NU0cpO1xuICAgIGNvbnN0IHZhbGlkYXRpb25Nc2dOZWVkc0Rpc3BsYXkgPSBoZWxwZXJUZXh0SXNWYWxpZGF0aW9uTXNnICYmICFpbnB1dElzVmFsaWQ7XG5cbiAgICBpZiAodmFsaWRhdGlvbk1zZ05lZWRzRGlzcGxheSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKHN0cmluZ3MuUk9MRSwgJ2FsZXJ0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQXR0cihzdHJpbmdzLlJPTEUpO1xuICAgIH1cblxuICAgIGlmICghaGVscGVyVGV4dElzUGVyc2lzdGVudCAmJiAhdmFsaWRhdGlvbk1zZ05lZWRzRGlzcGxheSkge1xuICAgICAgdGhpcy5oaWRlXygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgaGVscCB0ZXh0IGZyb20gc2NyZWVuIHJlYWRlcnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoaWRlXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoc3RyaW5ncy5BUklBX0hJRERFTiwgJ3RydWUnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgVGV4dCBGaWVsZCBJY29uLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIHRleHQgZmllbGQgaWNvbiBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXIge1xuICAvKipcbiAgICogU2V0cyBhbiBhdHRyaWJ1dGUgb24gdGhlIGljb24gZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRBdHRyKGF0dHIsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIGljb24gZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBpY29uIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgY3VzdG9tIGV2ZW50IFwiTURDVGV4dEZpZWxkOmljb25cIiBkZW5vdGluZyBhIHVzZXIgaGFzIGNsaWNrZWQgdGhlIGljb24uXG4gICAqL1xuICBub3RpZnlJY29uQWN0aW9uKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBJQ09OX0VWRU5UOiAnTURDVGV4dEZpZWxkOmljb24nLFxufTtcblxuZXhwb3J0IHtzdHJpbmdzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRJY29uQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ1RleHRGaWVsZEljb25BZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ1RleHRGaWVsZEljb25BZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXJ9ICovICh7XG4gICAgICBzZXRBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgbm90aWZ5SWNvbkFjdGlvbjogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmludGVyYWN0aW9uSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZUludGVyYWN0aW9uKGV2dCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5pbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgWydjbGljaycsICdrZXlkb3duJ10uZm9yRWFjaCgoZXZ0VHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuaW50ZXJhY3Rpb25IYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgaGVscGVyIHRleHQgZmllbGQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWRcbiAgICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cigndGFiaW5kZXgnLCAnMCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGludGVyYWN0aW9uIGV2ZW50XG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZUludGVyYWN0aW9uKGV2dCkge1xuICAgIGlmIChldnQudHlwZSA9PT0gJ2NsaWNrJyB8fCBldnQua2V5ID09PSAnRW50ZXInIHx8IGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlJY29uQWN0aW9uKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnLi9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiBmcm9tICcuL2ljb24vZm91bmRhdGlvbic7XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHZhbHVlOiBzdHJpbmcsXG4gKiAgIGRpc2FibGVkOiBib29sZWFuLFxuICogICBiYWRJbnB1dDogYm9vbGVhbixcbiAqICAgdmFsaWRpdHk6IHtcbiAqICAgICBiYWRJbnB1dDogYm9vbGVhbixcbiAqICAgICB2YWxpZDogYm9vbGVhbixcbiAqICAgfSxcbiAqIH19XG4gKi9cbmxldCBOYXRpdmVJbnB1dFR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaGVscGVyVGV4dDogKCFNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbnx1bmRlZmluZWQpLFxuICogICBpY29uOiAoIU1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9ufHVuZGVmaW5lZCksXG4gKiB9fVxuICovXG5sZXQgRm91bmRhdGlvbk1hcFR5cGU7XG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHQgRmllbGQuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgVGV4dCBGaWVsZCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkQWRhcHRlciB7XG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3MgdG8gdGhlIHJvb3QgRWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgcm9vdCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcm9vdCBlbGVtZW50IGNvbnRhaW5zIHRoZSBnaXZlbiBjbGFzcyBuYW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbmF0aXZlIGlucHV0IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSB2YWxpZGF0aW9uIGF0dHJpYnV0ZSBjaGFuZ2UgbGlzdGVuZXIgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUFycmF5KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqIEByZXR1cm4geyFNdXRhdGlvbk9ic2VydmVyfVxuICAgKi9cbiAgcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBhIHZhbGlkYXRpb24gYXR0cmlidXRlIG9ic2VydmVyIG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgKiBAcGFyYW0geyFNdXRhdGlvbk9ic2VydmVyfSBvYnNlcnZlclxuICAgKi9cbiAgZGVyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyKG9ic2VydmVyKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5hdGl2ZSB0ZXh0IGlucHV0IGVsZW1lbnQsIHdpdGggYVxuICAgKiBzaW1pbGFyIEFQSSBzaGFwZS4gVGhlIG9iamVjdCByZXR1cm5lZCBzaG91bGQgaW5jbHVkZSB0aGUgdmFsdWUsIGRpc2FibGVkXG4gICAqIGFuZCBiYWRJbnB1dCBwcm9wZXJ0aWVzLCBhcyB3ZWxsIGFzIHRoZSBjaGVja1ZhbGlkaXR5KCkgZnVuY3Rpb24uIFdlIG5ldmVyXG4gICAqIGFsdGVyIHRoZSB2YWx1ZSB3aXRoaW4gb3VyIGNvZGUsIGhvd2V2ZXIgd2UgZG8gdXBkYXRlIHRoZSBkaXNhYmxlZFxuICAgKiBwcm9wZXJ0eSwgc28gaWYgeW91IGNob29zZSB0byBkdWNrLXR5cGUgdGhlIHJldHVybiB2YWx1ZSBmb3IgdGhpcyBtZXRob2RcbiAgICogaW4geW91ciBpbXBsZW1lbnRhdGlvbiBpdCdzIGltcG9ydGFudCB0byBrZWVwIHRoaXMgaW4gbWluZC4gQWxzbyBub3RlIHRoYXRcbiAgICogdGhpcyBtZXRob2QgY2FuIHJldHVybiBudWxsLCB3aGljaCB0aGUgZm91bmRhdGlvbiB3aWxsIGhhbmRsZSBncmFjZWZ1bGx5LlxuICAgKiBAcmV0dXJuIHs/RWxlbWVudHw/TmF0aXZlSW5wdXRUeXBlfVxuICAgKi9cbiAgZ2V0TmF0aXZlSW5wdXQoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRleHRmaWVsZCBpcyBmb2N1c2VkLlxuICAgKiBXZSBhY2hpZXZlIHRoaXMgdmlhIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLnJvb3RfYC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRm9jdXNlZCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZGlyZWN0aW9uIG9mIHRoZSByb290IGVsZW1lbnQgaXMgc2V0IHRvIFJUTC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzUnRsKCkge31cblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBsaW5lIHJpcHBsZS5cbiAgICovXG4gIGFjdGl2YXRlTGluZVJpcHBsZSgpIHt9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGVzIHRoZSBsaW5lIHJpcHBsZS5cbiAgICovXG4gIGRlYWN0aXZhdGVMaW5lUmlwcGxlKCkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgdHJhbnNmb3JtIG9yaWdpbiBvZiB0aGUgbGluZSByaXBwbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3JtYWxpemVkWFxuICAgKi9cbiAgc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbihub3JtYWxpemVkWCkge31cblxuICAvKipcbiAgICogT25seSBpbXBsZW1lbnQgaWYgbGFiZWwgZXhpc3RzLlxuICAgKiBTaGFrZXMgbGFiZWwgaWYgc2hvdWxkU2hha2UgaXMgdHJ1ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRTaGFrZVxuICAgKi9cbiAgc2hha2VMYWJlbChzaG91bGRTaGFrZSkge31cblxuICAvKipcbiAgICogT25seSBpbXBsZW1lbnQgaWYgbGFiZWwgZXhpc3RzLlxuICAgKiBGbG9hdHMgdGhlIGxhYmVsIGFib3ZlIHRoZSBpbnB1dCBlbGVtZW50IGlmIHNob3VsZEZsb2F0IGlzIHRydWUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkRmxvYXRcbiAgICovXG4gIGZsb2F0TGFiZWwoc2hvdWxkRmxvYXQpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBsYWJlbCBlbGVtZW50IGV4aXN0cywgZmFsc2UgaWYgaXQgZG9lc24ndC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0xhYmVsKCkge31cblxuICAvKipcbiAgICogT25seSBpbXBsZW1lbnQgaWYgbGFiZWwgZXhpc3RzLlxuICAgKiBSZXR1cm5zIHdpZHRoIG9mIGxhYmVsIGluIHBpeGVscy5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0TGFiZWxXaWR0aCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBvdXRsaW5lIGVsZW1lbnQgZXhpc3RzLCBmYWxzZSBpZiBpdCBkb2Vzbid0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzT3V0bGluZSgpIHt9XG5cbiAgLyoqXG4gICAqIE9ubHkgaW1wbGVtZW50IGlmIG91dGxpbmUgZWxlbWVudCBleGlzdHMuXG4gICAqIFVwZGF0ZXMgU1ZHIFBhdGggb24gb3V0bGluZSBlbGVtZW50IGJhc2VkIG9uIHRoZVxuICAgKiBsYWJlbCBlbGVtZW50IHdpZHRoIGFuZCBSVEwgY29udGV4dC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxhYmVsV2lkdGhcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1J0bFxuICAgKi9cbiAgdXBkYXRlT3V0bGluZVBhdGgobGFiZWxXaWR0aCwgaXNSdGwpIHt9XG59XG5cbmV4cG9ydCB7TURDVGV4dEZpZWxkQWRhcHRlciwgTmF0aXZlSW5wdXRUeXBlLCBGb3VuZGF0aW9uTWFwVHlwZX07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFRleHRGaWVsZCBMaW5lIFJpcHBsZS5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBsaW5lIHJpcHBsZSBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDTGluZVJpcHBsZUFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogU2V0cyBhbiBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIHZhbHVlIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHIoYXR0ciwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgbGluZSByaXBwbGUgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRXZlbnRIYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBsaW5lIHJpcHBsZSBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENMaW5lUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIExJTkVfUklQUExFX0FDVElWRTogJ21kYy1saW5lLXJpcHBsZS0tYWN0aXZlJyxcbiAgTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HOiAnbWRjLWxpbmUtcmlwcGxlLS1kZWFjdGl2YXRpbmcnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENMaW5lUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDTGluZVJpcHBsZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ0xpbmVSaXBwbGVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTGluZVJpcHBsZUFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4ge30sXG4gICAgICBzZXRBdHRyOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRXZlbnRIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJFdmVudEhhbmRsZXI6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IC8qKiBAdHlwZSB7IU1EQ0xpbmVSaXBwbGVBZGFwdGVyfSAqLyAoe30pKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENMaW5lUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmQoZXZ0KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckV2ZW50SGFuZGxlcigndHJhbnNpdGlvbmVuZCcsIHRoaXMudHJhbnNpdGlvbkVuZEhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRXZlbnRIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgbGluZSByaXBwbGVcbiAgICovXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9BQ1RJVkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNlbnRlciBvZiB0aGUgcmlwcGxlIGFuaW1hdGlvbiB0byB0aGUgZ2l2ZW4gWCBjb29yZGluYXRlLlxuICAgKiBAcGFyYW0geyFudW1iZXJ9IHhDb29yZGluYXRlXG4gICAqL1xuICBzZXRSaXBwbGVDZW50ZXIoeENvb3JkaW5hdGUpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVTdHJpbmcgPVxuICAgICAgICBgdHJhbnNmb3JtLW9yaWdpbjogJHt4Q29vcmRpbmF0ZX1weCBjZW50ZXJgO1xuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyKCdzdHlsZScsIGF0dHJpYnV0ZVN0cmluZyk7XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZXMgdGhlIGxpbmUgcmlwcGxlXG4gICAqL1xuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5MSU5FX1JJUFBMRV9ERUFDVElWQVRJTkcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSB0cmFuc2l0aW9uIGVuZCBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVUcmFuc2l0aW9uRW5kKGV2dCkge1xuICAgIC8vIFdhaXQgZm9yIHRoZSBsaW5lIHJpcHBsZSB0byBiZSBlaXRoZXIgdHJhbnNwYXJlbnQgb3Igb3BhcXVlXG4gICAgLy8gYmVmb3JlIGVtaXR0aW5nIHRoZSBhbmltYXRpb24gZW5kIGV2ZW50XG4gICAgY29uc3QgaXNEZWFjdGl2YXRpbmcgPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HKTtcblxuICAgIGlmIChldnQucHJvcGVydHlOYW1lID09PSAnb3BhY2l0eScpIHtcbiAgICAgIGlmIChpc0RlYWN0aXZhdGluZykge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuTElORV9SSVBQTEVfQUNUSVZFKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkxJTkVfUklQUExFX0RFQUNUSVZBVElORyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBGbG9hdGluZyBMYWJlbC5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBmbG9hdGluZyBsYWJlbCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXIge1xuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZHRoIG9mIHRoZSBsYWJlbCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRXaWR0aCgpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvbiB0aGUgcm9vdCBlbGVtZW50IGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gdGhlIHJvb3QgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBMQUJFTF9GTE9BVF9BQk9WRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tZmxvYXQtYWJvdmUnLFxuICBMQUJFTF9TSEFLRTogJ21kYy1mbG9hdGluZy1sYWJlbC0tc2hha2UnLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENGbG9hdGluZ0xhYmVsQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyPn1cbiAqIEBmaW5hbFxuICovXG5jbGFzcyBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENGbG9hdGluZ0xhYmVsQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgZ2V0V2lkdGg6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDRmxvYXRpbmdMYWJlbEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZVNoYWtlQW5pbWF0aW9uRW5kXygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdhbmltYXRpb25lbmQnLCB0aGlzLnNoYWtlQW5pbWF0aW9uRW5kSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2FuaW1hdGlvbmVuZCcsIHRoaXMuc2hha2VBbmltYXRpb25FbmRIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIGxhYmVsIGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmdldFdpZHRoKCk7XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBwcm9kdWNlIHRoZSBsYWJlbCBzaGFrZSBmb3IgZXJyb3JzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFNoYWtlIGFkZHMgc2hha2UgY2xhc3MgaWYgdHJ1ZSxcbiAgICogb3RoZXJ3aXNlIHJlbW92ZXMgc2hha2UgY2xhc3MuXG4gICAqL1xuICBzaGFrZShzaG91bGRTaGFrZSkge1xuICAgIGNvbnN0IHtMQUJFTF9TSEFLRX0gPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChzaG91bGRTaGFrZSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhMQUJFTF9TSEFLRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGxhYmVsIHRvIGZsb2F0IG9yIGRvY2suXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkRmxvYXQgYWRkcyBmbG9hdCBjbGFzcyBpZiB0cnVlLCBvdGhlcndpc2UgcmVtb3ZlXG4gICAqIGZsb2F0IGFuZCBzaGFrZSBjbGFzcyB0byBkb2NrIGxhYmVsLlxuICAgKi9cbiAgZmxvYXQoc2hvdWxkRmxvYXQpIHtcbiAgICBjb25zdCB7TEFCRUxfRkxPQVRfQUJPVkUsIExBQkVMX1NIQUtFfSA9IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHNob3VsZEZsb2F0KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9GTE9BVF9BQk9WRSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKExBQkVMX1NIQUtFKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBpbnRlcmFjdGlvbiBldmVudCBvbiB0aGUgcm9vdCBlbGVtZW50LlxuICAgKi9cbiAgaGFuZGxlU2hha2VBbmltYXRpb25FbmRfKCkge1xuICAgIGNvbnN0IHtMQUJFTF9TSEFLRX0gPSBNRENGbG9hdGluZ0xhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTEFCRUxfU0hBS0UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBOb3RjaGVkIE91dGxpbmUuXG4gKlxuICogRGVmaW5lcyB0aGUgc2hhcGUgb2YgdGhlIGFkYXB0ZXIgZXhwZWN0ZWQgYnkgdGhlIGZvdW5kYXRpb24uIEltcGxlbWVudCB0aGlzXG4gKiBhZGFwdGVyIHRvIGludGVncmF0ZSB0aGUgTm90Y2hlZCBPdXRsaW5lIGludG8geW91ciBmcmFtZXdvcmsuIFNlZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9hdXRob3JpbmctY29tcG9uZW50cy5tZFxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0V2lkdGgoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0SGVpZ2h0KCkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgXCJkXCIgYXR0cmlidXRlIG9mIHRoZSBvdXRsaW5lIGVsZW1lbnQncyBTVkcgcGF0aC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRPdXRsaW5lUGF0aEF0dHIodmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGlkbGUgb3V0bGluZSBlbGVtZW50J3MgY29tcHV0ZWQgc3R5bGUgdmFsdWUgb2YgdGhlIGdpdmVuIGNzcyBwcm9wZXJ0eSBgcHJvcGVydHlOYW1lYC5cbiAgICogV2UgYWNoaWV2ZSB0aGlzIHZpYSBgZ2V0Q29tcHV0ZWRTdHlsZSguLi4pLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlOYW1lKWAuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlKHByb3BlcnR5TmFtZSkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgUEFUSF9TRUxFQ1RPUjogJy5tZGMtbm90Y2hlZC1vdXRsaW5lX19wYXRoJyxcbiAgSURMRV9PVVRMSU5FX1NFTEVDVE9SOiAnLm1kYy1ub3RjaGVkLW91dGxpbmVfX2lkbGUnLFxufTtcblxuZXhwb3J0IHtzdHJpbmdzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7c3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENOb3RjaGVkT3V0bGluZUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyfSAqLyAoe1xuICAgICAgZ2V0V2lkdGg6ICgpID0+IHt9LFxuICAgICAgZ2V0SGVpZ2h0OiAoKSA9PiB7fSxcbiAgICAgIHNldE91dGxpbmVQYXRoQXR0cjogKCkgPT4ge30sXG4gICAgICBnZXRJZGxlT3V0bGluZVN0eWxlVmFsdWU6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ05vdGNoZWRPdXRsaW5lQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDTm90Y2hlZE91dGxpbmVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgU1ZHIHBhdGggb2YgdGhlIGZvY3VzIG91dGxpbmUgZWxlbWVudCBiYXNlZCBvbiB0aGUgbm90Y2hXaWR0aFxuICAgKiBhbmQgdGhlIFJUTCBjb250ZXh0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90Y2hXaWR0aFxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpc1J0bFxuICAgKi9cbiAgdXBkYXRlU3ZnUGF0aChub3RjaFdpZHRoLCBpc1J0bCA9IGZhbHNlKSB7XG4gICAgLy8gRmFsbCBiYWNrIHRvIHJlYWRpbmcgYSBzcGVjaWZpYyBjb3JuZXIncyBzdHlsZSBiZWNhdXNlIEZpcmVmb3ggZG9lc24ndCByZXBvcnQgdGhlIHN0eWxlIG9uIGJvcmRlci1yYWRpdXMuXG4gICAgY29uc3QgcmFkaXVzU3R5bGVWYWx1ZSA9IHRoaXMuYWRhcHRlcl8uZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlKCdib3JkZXItcmFkaXVzJykgfHxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRJZGxlT3V0bGluZVN0eWxlVmFsdWUoJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnKTtcbiAgICBjb25zdCByYWRpdXMgPSBwYXJzZUZsb2F0KHJhZGl1c1N0eWxlVmFsdWUpO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5hZGFwdGVyXy5nZXRXaWR0aCgpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuYWRhcHRlcl8uZ2V0SGVpZ2h0KCk7XG4gICAgY29uc3QgY29ybmVyV2lkdGggPSByYWRpdXMgKyAxLjI7XG4gICAgY29uc3QgbGVhZGluZ1N0cm9rZUxlbmd0aCA9IE1hdGguYWJzKDExIC0gY29ybmVyV2lkdGgpO1xuICAgIGNvbnN0IHBhZGRlZE5vdGNoV2lkdGggPSBub3RjaFdpZHRoICsgODtcblxuICAgIC8vIFRoZSByaWdodCwgYm90dG9tLCBhbmQgbGVmdCBzaWRlcyBvZiB0aGUgb3V0bGluZSBmb2xsb3cgdGhlIHNhbWUgU1ZHIHBhdGguXG4gICAgY29uc3QgcGF0aE1pZGRsZSA9ICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIHJhZGl1cyArICcsJyArIHJhZGl1c1xuICAgICAgKyAndicgKyAoaGVpZ2h0IC0gKDIgKiBjb3JuZXJXaWR0aCkpXG4gICAgICArICdhJyArIHJhZGl1cyArICcsJyArIHJhZGl1cyArICcgMCAwIDEgJyArIC1yYWRpdXMgKyAnLCcgKyByYWRpdXNcbiAgICAgICsgJ2gnICsgKC13aWR0aCArICgyICogY29ybmVyV2lkdGgpKVxuICAgICAgKyAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyAtcmFkaXVzICsgJywnICsgLXJhZGl1c1xuICAgICAgKyAndicgKyAoLWhlaWdodCArICgyICogY29ybmVyV2lkdGgpKVxuICAgICAgKyAnYScgKyByYWRpdXMgKyAnLCcgKyByYWRpdXMgKyAnIDAgMCAxICcgKyByYWRpdXMgKyAnLCcgKyAtcmFkaXVzO1xuXG4gICAgbGV0IHBhdGg7XG4gICAgaWYgKCFpc1J0bCkge1xuICAgICAgcGF0aCA9ICdNJyArIChjb3JuZXJXaWR0aCArIGxlYWRpbmdTdHJva2VMZW5ndGggKyBwYWRkZWROb3RjaFdpZHRoKSArICcsJyArIDFcbiAgICAgICAgKyAnaCcgKyAod2lkdGggLSAoMiAqIGNvcm5lcldpZHRoKSAtIHBhZGRlZE5vdGNoV2lkdGggLSBsZWFkaW5nU3Ryb2tlTGVuZ3RoKVxuICAgICAgICArIHBhdGhNaWRkbGVcbiAgICAgICAgKyAnaCcgKyBsZWFkaW5nU3Ryb2tlTGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gJ00nICsgKHdpZHRoIC0gY29ybmVyV2lkdGggLSBsZWFkaW5nU3Ryb2tlTGVuZ3RoKSArICcsJyArIDFcbiAgICAgICAgKyAnaCcgKyBsZWFkaW5nU3Ryb2tlTGVuZ3RoXG4gICAgICAgICsgcGF0aE1pZGRsZVxuICAgICAgICArICdoJyArICh3aWR0aCAtICgyICogY29ybmVyV2lkdGgpIC0gcGFkZGVkTm90Y2hXaWR0aCAtIGxlYWRpbmdTdHJva2VMZW5ndGgpO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8uc2V0T3V0bGluZVBhdGhBdHRyKHBhdGgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIEFSSUFfQ09OVFJPTFM6ICdhcmlhLWNvbnRyb2xzJyxcbiAgSU5QVVRfU0VMRUNUT1I6ICcubWRjLXRleHQtZmllbGRfX2lucHV0JyxcbiAgTEFCRUxfU0VMRUNUT1I6ICcubWRjLWZsb2F0aW5nLWxhYmVsJyxcbiAgSUNPTl9TRUxFQ1RPUjogJy5tZGMtdGV4dC1maWVsZF9faWNvbicsXG4gIE9VVExJTkVfU0VMRUNUT1I6ICcubWRjLW5vdGNoZWQtb3V0bGluZScsXG4gIEJPVFRPTV9MSU5FX1NFTEVDVE9SOiAnLm1kYy1saW5lLXJpcHBsZScsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtdGV4dC1maWVsZCcsXG4gIFVQR1JBREVEOiAnbWRjLXRleHQtZmllbGQtLXVwZ3JhZGVkJyxcbiAgRElTQUJMRUQ6ICdtZGMtdGV4dC1maWVsZC0tZGlzYWJsZWQnLFxuICBERU5TRTogJ21kYy10ZXh0LWZpZWxkLS1kZW5zZScsXG4gIEZPQ1VTRUQ6ICdtZGMtdGV4dC1maWVsZC0tZm9jdXNlZCcsXG4gIElOVkFMSUQ6ICdtZGMtdGV4dC1maWVsZC0taW52YWxpZCcsXG4gIEJPWDogJ21kYy10ZXh0LWZpZWxkLS1ib3gnLFxuICBPVVRMSU5FRDogJ21kYy10ZXh0LWZpZWxkLS1vdXRsaW5lZCcsXG59O1xuXG4vKiogQGVudW0ge251bWJlcn0gKi9cbmNvbnN0IG51bWJlcnMgPSB7XG4gIExBQkVMX1NDQUxFOiAwLjc1LFxuICBERU5TRV9MQUJFTF9TQ0FMRTogMC45MjMsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtNRENUZXh0RmllbGRBZGFwdGVyLCBOYXRpdmVJbnB1dFR5cGUsIEZvdW5kYXRpb25NYXBUeXBlfSBmcm9tICcuL2FkYXB0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCBNRENMaW5lUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbGluZS1yaXBwbGUvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnLi9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiBmcm9tICcuL2ljb24vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDRmxvYXRpbmdMYWJlbEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Zsb2F0aW5nLWxhYmVsL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24nO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cblxuLy8gd2hpdGVsaXN0IGJhc2VkIG9mZiBvZiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9IVE1ML0hUTUw1L0NvbnN0cmFpbnRfdmFsaWRhdGlvblxuLy8gdW5kZXIgc2VjdGlvbjogYFZhbGlkYXRpb24tcmVsYXRlZCBhdHRyaWJ1dGVzYFxuY29uc3QgVkFMSURBVElPTl9BVFRSX1dISVRFTElTVCA9IFtcbiAgJ3BhdHRlcm4nLCAnbWluJywgJ21heCcsICdyZXF1aXJlZCcsICdzdGVwJywgJ21pbmxlbmd0aCcsICdtYXhsZW5ndGgnLFxuXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDVGV4dEZpZWxkQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDVGV4dEZpZWxkRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgZ2V0IHNob3VsZFNoYWtlKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1ZhbGlkKCkgJiYgIXRoaXMuaXNGb2N1c2VkXztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgc2hvdWxkRmxvYXQoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzQmFkSW5wdXRfKCkgJiYgKCEhdGhpcy5nZXRWYWx1ZSgpIHx8IHRoaXMuaXNGb2N1c2VkXyk7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDVGV4dEZpZWxkQWRhcHRlcn0gZm9yIHR5cGluZyBpbmZvcm1hdGlvbiBvbiBwYXJhbWV0ZXJzIGFuZCByZXR1cm5cbiAgICogdHlwZXMuXG4gICAqIEByZXR1cm4geyFNRENUZXh0RmllbGRBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZ2V0TmF0aXZlSW5wdXQ6ICgpID0+IHt9LFxuICAgICAgaXNGb2N1c2VkOiAoKSA9PiB7fSxcbiAgICAgIGlzUnRsOiAoKSA9PiB7fSxcbiAgICAgIGFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4ge30sXG4gICAgICBkZWFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4ge30sXG4gICAgICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luOiAoKSA9PiB7fSxcbiAgICAgIHNoYWtlTGFiZWw6ICgpID0+IHt9LFxuICAgICAgZmxvYXRMYWJlbDogKCkgPT4ge30sXG4gICAgICBoYXNMYWJlbDogKCkgPT4ge30sXG4gICAgICBnZXRMYWJlbFdpZHRoOiAoKSA9PiB7fSxcbiAgICAgIGhhc091dGxpbmU6ICgpID0+IHt9LFxuICAgICAgdXBkYXRlT3V0bGluZVBhdGg6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1RleHRGaWVsZEFkYXB0ZXJ9IGFkYXB0ZXJcbiAgICogQHBhcmFtIHshRm91bmRhdGlvbk1hcFR5cGU9fSBmb3VuZGF0aW9uTWFwIE1hcCBmcm9tIHN1YmNvbXBvbmVudCBuYW1lcyB0byB0aGVpciBzdWJmb3VuZGF0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIsIGZvdW5kYXRpb25NYXAgPSAvKiogQHR5cGUgeyFGb3VuZGF0aW9uTWFwVHlwZX0gKi8gKHt9KSkge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVGV4dEZpZWxkRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb258dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaGVscGVyVGV4dF8gPSBmb3VuZGF0aW9uTWFwLmhlbHBlclRleHQ7XG4gICAgLyoqIEB0eXBlIHshTURDVGV4dEZpZWxkSWNvbkZvdW5kYXRpb258dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMuaWNvbl8gPSBmb3VuZGF0aW9uTWFwLmljb247XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ18gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5pc1ZhbGlkXyA9IHRydWU7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbigpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy5pbnB1dEZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmFjdGl2YXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5kZWFjdGl2YXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyA9ICgpID0+IHRoaXMuYXV0b0NvbXBsZXRlRm9jdXMoKTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnNldFBvaW50ZXJYT2Zmc2V0XyA9IChldnQpID0+IHRoaXMuc2V0VHJhbnNmb3JtT3JpZ2luKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9ICovXG4gICAgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVUZXh0RmllbGRJbnRlcmFjdGlvbigpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUFycmF5KTogdW5kZWZpbmVkfSAqL1xuICAgIHRoaXMudmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXJfID0gKG11dGF0aW9ucykgPT4gdGhpcy5oYW5kbGVWYWxpZGF0aW9uQXR0cmlidXRlTXV0YXRpb25fKG11dGF0aW9ucyk7XG4gICAgLyoqIEBwcml2YXRlIHshTXV0YXRpb25PYnNlcnZlcn0gKi9cbiAgICB0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl87XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzLlVQR1JBREVEKTtcbiAgICAvLyBFbnN1cmUgbGFiZWwgZG9lcyBub3QgY29sbGlkZSB3aXRoIGFueSBwcmUtZmlsbGVkIHZhbHVlLlxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkgJiYgdGhpcy5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKCk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuaW5wdXRGb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2lucHV0JywgdGhpcy5pbnB1dElucHV0SGFuZGxlcl8pO1xuICAgIFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy5zZXRQb2ludGVyWE9mZnNldF8pO1xuICAgIH0pO1xuICAgIFsnY2xpY2snLCAna2V5ZG93biddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl8gPSB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVmFsaWRhdGlvbkF0dHJpYnV0ZUNoYW5nZUhhbmRsZXIoXG4gICAgICB0aGlzLnZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzLlVQR1JBREVEKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmlucHV0Rm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmlucHV0Qmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnB1dEludGVyYWN0aW9uSGFuZGxlcignaW5wdXQnLCB0aGlzLmlucHV0SW5wdXRIYW5kbGVyXyk7XG4gICAgWydtb3VzZWRvd24nLCAndG91Y2hzdGFydCddLmZvckVhY2goKGV2dFR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlcklucHV0SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIHRoaXMuc2V0UG9pbnRlclhPZmZzZXRfKTtcbiAgICB9KTtcbiAgICBbJ2NsaWNrJywgJ2tleWRvd24nXS5mb3JFYWNoKChldnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgdGhpcy50ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJWYWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcih0aGlzLnZhbGlkYXRpb25PYnNlcnZlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdXNlciBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgVGV4dCBGaWVsZC5cbiAgICovXG4gIGhhbmRsZVRleHRGaWVsZEludGVyYWN0aW9uKCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldE5hdGl2ZUlucHV0KCkuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWNlaXZlZFVzZXJJbnB1dF8gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdmFsaWRhdGlvbiBhdHRyaWJ1dGUgY2hhbmdlc1xuICAgKiBAcGFyYW0ge0FycmF5PE11dGF0aW9uUmVjb3JkPn0gbXV0YXRpb25zTGlzdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlVmFsaWRhdGlvbkF0dHJpYnV0ZU11dGF0aW9uXyhtdXRhdGlvbnNMaXN0KSB7XG4gICAgbXV0YXRpb25zTGlzdC5zb21lKChtdXRhdGlvbikgPT4ge1xuICAgICAgaWYgKFZBTElEQVRJT05fQVRUUl9XSElURUxJU1QuaW5kZXhPZihtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lKSA+IC0xKSB7XG4gICAgICAgIHRoaXMuc3R5bGVWYWxpZGl0eV8odHJ1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGZvY3VzIG91dGxpbmUgZm9yIG91dGxpbmVkIHRleHQgZmllbGRzLlxuICAgKi9cbiAgdXBkYXRlT3V0bGluZSgpIHtcbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzT3V0bGluZSgpIHx8ICF0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc0RlbnNlID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkRFTlNFKTtcbiAgICBjb25zdCBsYWJlbFNjYWxlID0gaXNEZW5zZSA/IG51bWJlcnMuREVOU0VfTEFCRUxfU0NBTEUgOiBudW1iZXJzLkxBQkVMX1NDQUxFO1xuICAgIGNvbnN0IGxhYmVsV2lkdGggPSB0aGlzLmFkYXB0ZXJfLmdldExhYmVsV2lkdGgoKSAqIGxhYmVsU2NhbGU7XG4gICAgY29uc3QgaXNSdGwgPSB0aGlzLmFkYXB0ZXJfLmlzUnRsKCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVPdXRsaW5lUGF0aChsYWJlbFdpZHRoLCBpc1J0bCk7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSB0ZXh0IGZpZWxkIGZvY3VzIHN0YXRlLlxuICAgKi9cbiAgYWN0aXZhdGVGb2N1cygpIHtcbiAgICB0aGlzLmlzRm9jdXNlZF8gPSB0cnVlO1xuICAgIHRoaXMuc3R5bGVGb2N1c2VkXyh0aGlzLmlzRm9jdXNlZF8pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWN0aXZhdGVMaW5lUmlwcGxlKCk7XG4gICAgdGhpcy51cGRhdGVPdXRsaW5lKCk7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzTGFiZWwoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5zaGFrZUxhYmVsKHRoaXMuc2hvdWxkU2hha2UpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRoaXMuc2hvdWxkRmxvYXQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oZWxwZXJUZXh0Xykge1xuICAgICAgdGhpcy5oZWxwZXJUZXh0Xy5zaG93VG9TY3JlZW5SZWFkZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGluZSByaXBwbGUncyB0cmFuc2Zvcm0gb3JpZ2luLCBzbyB0aGF0IHRoZSBsaW5lIHJpcHBsZSBhY3RpdmF0ZVxuICAgKiBhbmltYXRpb24gd2lsbCBhbmltYXRlIG91dCBmcm9tIHRoZSB1c2VyJ3MgY2xpY2sgbG9jYXRpb24uXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIHNldFRyYW5zZm9ybU9yaWdpbihldnQpIHtcbiAgICBjb25zdCB0YXJnZXRDbGllbnRSZWN0ID0gZXZ0LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBldnRDb29yZHMgPSB7eDogZXZ0LmNsaWVudFgsIHk6IGV2dC5jbGllbnRZfTtcbiAgICBjb25zdCBub3JtYWxpemVkWCA9IGV2dENvb3Jkcy54IC0gdGFyZ2V0Q2xpZW50UmVjdC5sZWZ0O1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TGluZVJpcHBsZVRyYW5zZm9ybU9yaWdpbihub3JtYWxpemVkWCk7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBUZXh0IEZpZWxkJ3MgZm9jdXMgc3RhdGUgaW4gY2FzZXMgd2hlbiB0aGUgaW5wdXQgdmFsdWVcbiAgICogY2hhbmdlcyB3aXRob3V0IHVzZXIgaW5wdXQgKGUuZy4gcHJvZ3JhbWF0aWNhbGx5KS5cbiAgICovXG4gIGF1dG9Db21wbGV0ZUZvY3VzKCkge1xuICAgIGlmICghdGhpcy5yZWNlaXZlZFVzZXJJbnB1dF8pIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWFjdGl2YXRlcyB0aGUgVGV4dCBGaWVsZCdzIGZvY3VzIHN0YXRlLlxuICAgKi9cbiAgZGVhY3RpdmF0ZUZvY3VzKCkge1xuICAgIHRoaXMuaXNGb2N1c2VkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVhY3RpdmF0ZUxpbmVSaXBwbGUoKTtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCk7XG4gICAgY29uc3Qgc2hvdWxkUmVtb3ZlTGFiZWxGbG9hdCA9ICFpbnB1dC52YWx1ZSAmJiAhdGhpcy5pc0JhZElucHV0XygpO1xuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLmlzVmFsaWQoKTtcbiAgICB0aGlzLnN0eWxlVmFsaWRpdHlfKGlzVmFsaWQpO1xuICAgIHRoaXMuc3R5bGVGb2N1c2VkXyh0aGlzLmlzRm9jdXNlZF8pO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0xhYmVsKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2hha2VMYWJlbCh0aGlzLnNob3VsZFNoYWtlKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbCh0aGlzLnNob3VsZEZsb2F0KTtcbiAgICB9XG4gICAgaWYgKHNob3VsZFJlbW92ZUxhYmVsRmxvYXQpIHtcbiAgICAgIHRoaXMucmVjZWl2ZWRVc2VySW5wdXRfID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBFbGVtZW50LlxuICAgKi9cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkudmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgb24gdGhlIGlucHV0IEVsZW1lbnQuXG4gICAqL1xuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZ2V0TmF0aXZlSW5wdXRfKCkudmFsdWUgPSB2YWx1ZTtcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkKCk7XG4gICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodGhpcy5zaG91bGRGbG9hdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IElmIGEgY3VzdG9tIHZhbGlkaXR5IGlzIHNldCwgcmV0dXJucyB0aGF0IHZhbHVlLlxuICAgKiAgICAgT3RoZXJ3aXNlLCByZXR1cm5zIHRoZSByZXN1bHQgb2YgbmF0aXZlIHZhbGlkaXR5IGNoZWNrcy5cbiAgICovXG4gIGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlQ3VzdG9tVmFsaWRpdHlDaGVja2luZ19cbiAgICAgID8gdGhpcy5pc1ZhbGlkXyA6IHRoaXMuaXNOYXRpdmVJbnB1dFZhbGlkXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWYWxpZCBTZXRzIHRoZSB2YWxpZGl0eSBzdGF0ZSBvZiB0aGUgVGV4dCBGaWVsZC5cbiAgICovXG4gIHNldFZhbGlkKGlzVmFsaWQpIHtcbiAgICB0aGlzLnVzZUN1c3RvbVZhbGlkaXR5Q2hlY2tpbmdfID0gdHJ1ZTtcbiAgICB0aGlzLmlzVmFsaWRfID0gaXNWYWxpZDtcbiAgICAvLyBSZXRyaWV2ZSBmcm9tIHRoZSBnZXR0ZXIgdG8gZW5zdXJlIGNvcnJlY3QgbG9naWMgaXMgYXBwbGllZC5cbiAgICBpc1ZhbGlkID0gdGhpcy5pc1ZhbGlkKCk7XG4gICAgdGhpcy5zdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKTtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNMYWJlbCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNoYWtlTGFiZWwodGhpcy5zaG91bGRTaGFrZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIFRleHQgRmllbGQgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBpc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLmRpc2FibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgU2V0cyB0aGUgdGV4dC1maWVsZCBkaXNhYmxlZCBvciBlbmFibGVkLlxuICAgKi9cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUlucHV0XygpLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy5zdHlsZURpc2FibGVkXyhkaXNhYmxlZCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgU2V0cyB0aGUgY29udGVudCBvZiB0aGUgaGVscGVyIHRleHQuXG4gICAqL1xuICBzZXRIZWxwZXJUZXh0Q29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuaGVscGVyVGV4dF8pIHtcbiAgICAgIHRoaXMuaGVscGVyVGV4dF8uc2V0Q29udGVudChjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgVGV4dCBGaWVsZCBpbnB1dCBmYWlscyBpbiBjb252ZXJ0aW5nIHRoZVxuICAgKiAgICAgdXNlci1zdXBwbGllZCB2YWx1ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzQmFkSW5wdXRfKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbGlkaXR5LmJhZElucHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRoZSByZXN1bHQgb2YgbmF0aXZlIHZhbGlkaXR5IGNoZWNraW5nXG4gICAqICAgICAoVmFsaWRpdHlTdGF0ZS52YWxpZCkuXG4gICAqL1xuICBpc05hdGl2ZUlucHV0VmFsaWRfKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUlucHV0XygpLnZhbGlkaXR5LnZhbGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSB2YWxpZGl0eSBzdGF0ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBpc1ZhbGlkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHlsZVZhbGlkaXR5Xyhpc1ZhbGlkKSB7XG4gICAgY29uc3Qge0lOVkFMSUR9ID0gTURDVGV4dEZpZWxkRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKElOVkFMSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKElOVkFMSUQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5oZWxwZXJUZXh0Xykge1xuICAgICAgdGhpcy5oZWxwZXJUZXh0Xy5zZXRWYWxpZGl0eShpc1ZhbGlkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGZvY3VzZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNGb2N1c2VkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdHlsZUZvY3VzZWRfKGlzRm9jdXNlZCkge1xuICAgIGNvbnN0IHtGT0NVU0VEfSA9IE1EQ1RleHRGaWVsZEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAoaXNGb2N1c2VkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZPQ1VTRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZPQ1VTRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdHlsZXMgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZGlzYWJsZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEaXNhYmxlZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3R5bGVEaXNhYmxlZF8oaXNEaXNhYmxlZCkge1xuICAgIGNvbnN0IHtESVNBQkxFRCwgSU5WQUxJRH0gPSBNRENUZXh0RmllbGRGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRElTQUJMRUQpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhJTlZBTElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhESVNBQkxFRCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmljb25fKSB7XG4gICAgICB0aGlzLmljb25fLnNldERpc2FibGVkKGlzRGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRWxlbWVudHwhTmF0aXZlSW5wdXRUeXBlfSBUaGUgbmF0aXZlIHRleHQgaW5wdXQgZnJvbSB0aGVcbiAgICogaG9zdCBlbnZpcm9ubWVudCwgb3IgYSBkdW1teSBpZiBub25lIGV4aXN0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE5hdGl2ZUlucHV0XygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5nZXROYXRpdmVJbnB1dCgpIHx8XG4gICAgLyoqIEB0eXBlIHshTmF0aXZlSW5wdXRUeXBlfSAqLyAoe1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgdmFsaWRpdHk6IHtcbiAgICAgICAgYmFkSW5wdXQ6IGZhbHNlLFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDVGV4dEZpZWxkRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7IXt4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4geyF7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICgpID0+IHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpXG4gICAgKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXG4gICAgICAoKSA9PiB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKVxuICAgICk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IXtsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc1N1cHBvcnRlZF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IG51bGwsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIHdyYXBwZWQgaW4gYW4gckFGIGNhbGwgYi9jIHdlYiBicm93c2Vyc1xuICAgICAgLy8gcmVwb3J0IGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW5cbiAgICAgIC8vIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBnZXRNYXRjaGVzUHJvcGVydHksIGFwcGx5UGFzc2l2ZX0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuXG4gIHN0YXRpYyBnZXQgTUFUQ0hFUyAoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgICggUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZSAocmVmKSB7XG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICh2bSwgb3B0aW9ucykge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oe1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgfSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgfSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIGFkZENsYXNzIChjbGFzc05hbWUpIHtcbiAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiB2bS4kZWwuY29udGFpbnModGFyZ2V0KSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIH0sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoe3g6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0fSlcbiAgICAgIH0sXG4gICAgfSwgb3B0aW9ucykpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59ICAiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1kYy10ZXh0ZmllbGQtd3JhcHBlclwiIDpzdHlsZT1cInt3aWR0aDpmdWxsd2lkdGg/JzEwMCUnOnVuZGVmaW5lZH1cIj5cclxuXHJcbiAgICA8ZGl2IHJlZj1cInJvb3RcIiA6Y2xhc3M9XCJyb290Q2xhc3Nlc1wiPlxyXG5cclxuICAgICAgPGkgcmVmPVwiaWNvblwiIHYtaWY9XCIhIWhhc0xlYWRpbmdJY29uXCJcclxuICAgICAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgICAgIGNsYXNzPVwibWRjLXRleHQtZmllbGRfX2ljb25cIlxyXG4gICAgICAgIDpjbGFzcz1cImhhc0xlYWRpbmdJY29uLmNsYXNzZXNcIj5cclxuICAgICAgICA8c2xvdCBuYW1lPVwibGVhZGluZy1pY29uXCI+e3sgaGFzTGVhZGluZ0ljb24uY29udGVudCB9fTwvc2xvdD5cclxuICAgICAgPC9pPlxyXG5cclxuICAgICAgPHRleHRhcmVhIHJlZj1cImlucHV0XCIgdi1pZj1cIm11bHRpbGluZVwiXHJcbiAgICAgICAgdi1vbj1cIiRsaXN0ZW5lcnNcIlxyXG4gICAgICAgIHYtYmluZD1cImlucHV0QXR0cnNcIlxyXG4gICAgICAgIDpjbGFzcz1cImlucHV0Q2xhc3Nlc1wiXHJcbiAgICAgICAgQGlucHV0PVwidXBkYXRlVmFsdWUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxyXG4gICAgICAgIDptaW5sZW5ndGg9XCJtaW5sZW5ndGhcIiA6bWF4bGVuZ3RoPVwibWF4bGVuZ3RoXCJcclxuICAgICAgICA6cGxhY2Vob2xkZXI9XCJpbnB1dFBsYWNlSG9sZGVyXCJcclxuICAgICAgICA6YXJpYS1sYWJlbD1cImlucHV0UGxhY2VIb2xkZXJcIlxyXG4gICAgICAgIDphcmlhLWNvbnRyb2xzPVwiaW5wdXRBcmlhQ29udHJvbHNcIlxyXG4gICAgICAgIDpyb3dzPVwicm93c1wiIDpjb2xzPVwiY29sc1wiXHJcbiAgICAgICAgPjwvdGV4dGFyZWE+XHJcblxyXG4gICAgICA8aW5wdXQgcmVmPVwiaW5wdXRcIiB2LWVsc2VcclxuICAgICAgICB2LW9uPVwiJGxpc3RlbmVyc1wiXHJcbiAgICAgICAgdi1iaW5kPVwiaW5wdXRBdHRyc1wiXHJcbiAgICAgICAgOmNsYXNzPVwiaW5wdXRDbGFzc2VzXCJcclxuICAgICAgICBAaW5wdXQ9XCJ1cGRhdGVWYWx1ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXHJcbiAgICAgICAgOnR5cGU9XCJ0eXBlXCJcclxuICAgICAgICA6bWlubGVuZ3RoPVwibWlubGVuZ3RoXCIgOm1heGxlbmd0aD1cIm1heGxlbmd0aFwiXHJcbiAgICAgICAgOnBsYWNlaG9sZGVyPVwiaW5wdXRQbGFjZUhvbGRlclwiXHJcbiAgICAgICAgOmFyaWEtbGFiZWw9XCJpbnB1dFBsYWNlSG9sZGVyXCJcclxuICAgICAgICA6YXJpYS1jb250cm9scz1cImlucHV0QXJpYUNvbnRyb2xzXCJcclxuICAgICAgICAvPlxyXG5cclxuICAgICAgPGxhYmVsIHJlZj1cImxhYmVsXCIgOmNsYXNzPVwibGFiZWxDbGFzc2VzVXBncmFkZWRcIiA6Zm9yPVwiX3VpZFwiICB2LWlmPVwiaGFzTGFiZWxcIj5cclxuICAgICAgICB7eyBsYWJlbCB9fVxyXG4gICAgICA8L2xhYmVsPlxyXG5cclxuICAgICAgPGkgcmVmPVwiaWNvblwiIHYtaWY9XCIhIWhhc1RyYWlsaW5nSWNvblwiXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCJcclxuICAgICAgICBjbGFzcz1cIm1kYy10ZXh0LWZpZWxkX19pY29uXCJcclxuICAgICAgICA6Y2xhc3M9XCJoYXNUcmFpbGluZ0ljb24uY2xhc3Nlc1wiPlxyXG4gICAgICAgIDxzbG90IG5hbWU9XCJ0cmFpbGluZy1pY29uXCI+e3sgaGFzVHJhaWxpbmdJY29uLmNvbnRlbnQgfX08L3Nsb3Q+XHJcbiAgICAgIDwvaT5cclxuXHJcbiAgICAgIDxkaXYgcmVmPVwib3V0bGluZVwiIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZVwiIHYtaWY9XCJoYXNPdXRsaW5lXCI+XHJcbiAgICAgICAgPHN2Zz5cclxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fcGF0aFwiIDpkPVwib3V0bGluZVBhdGhBdHRyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgcmVmPVwib3V0bGluZUlkbGVcIiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX2lkbGVcIiB2LWlmPVwiaGFzT3V0bGluZVwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IHJlZj1cImJvdHRvbVwiIDpjbGFzcz1cImJvdHRvbUNsYXNzZXNcIiB2LWlmPVwiaGFzQm90dG9tTGluZVwiPjwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxwIHJlZj1cImhlbHBcIiA6aWQ9XCInaGVscC0nK191aWRcIiA6Y2xhc3M9XCJoZWxwQ2xhc3Nlc1wiXHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHYtaWY9XCJoZWxwdGV4dFwiPlxyXG4gICAgICB7eyBoZWxwdGV4dCAgfX1cclxuICAgIDwvcD5cclxuXHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgTURDVGV4dGZpZWxkRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvdGV4dGZpZWxkL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgTURDTGluZVJpcHBsZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2xpbmUtcmlwcGxlL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3RleHRmaWVsZC9oZWxwZXItdGV4dC9mb3VuZGF0aW9uJztcclxuaW1wb3J0IE1EQ1RleHRGaWVsZEljb25Gb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC90ZXh0ZmllbGQvaWNvbi9mb3VuZGF0aW9uJztcclxuaW1wb3J0IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9mbG9hdGluZy1sYWJlbC9mb3VuZGF0aW9uJztcclxuaW1wb3J0IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvbm90Y2hlZC1vdXRsaW5lL2ZvdW5kYXRpb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBleHRyYWN0SWNvblByb3AsXHJcbiAgRGlzcGF0Y2hGb2N1c01peGluLFxyXG4gIEN1c3RvbUVsZW1lbnRNaXhpbixcclxufSBmcm9tICcuLi9iYXNlJztcclxuaW1wb3J0IHsgUmlwcGxlQmFzZSB9IGZyb20gJy4uL3JpcHBsZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy10ZXh0ZmllbGQnLFxyXG4gIG1peGluczogW0N1c3RvbUVsZW1lbnRNaXhpbiwgRGlzcGF0Y2hGb2N1c01peGluXSxcclxuICBtb2RlbDoge1xyXG4gICAgcHJvcDogJ3ZhbHVlJyxcclxuICAgIGV2ZW50OiAnbW9kZWwnLFxyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHZhbHVlOiBTdHJpbmcsXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZGVmYXVsdDogJ3RleHQnLFxyXG4gICAgICB2YWxpZGF0b3I6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIFsndGV4dCcsICdlbWFpbCcsICdzZWFyY2gnLCAncGFzc3dvcmQnLCAndGVsJywgJ3VybCddLmluZGV4T2YoXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgKSAhPT0gLTFcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGRlbnNlOiBCb29sZWFuLFxyXG4gICAgbGFiZWw6IFN0cmluZyxcclxuICAgIGhlbHB0ZXh0OiBTdHJpbmcsXHJcbiAgICBoZWxwdGV4dFBlcnNpc3RlbnQ6IEJvb2xlYW4sXHJcbiAgICBoZWxwdGV4dFZhbGlkYXRpb246IEJvb2xlYW4sXHJcbiAgICBib3g6IEJvb2xlYW4sXHJcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxyXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICByZXF1aXJlZDogQm9vbGVhbixcclxuICAgIHZhbGlkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHVuZGVmaW5lZCB9LFxyXG4gICAgZnVsbHdpZHRoOiBCb29sZWFuLFxyXG4gICAgbXVsdGlsaW5lOiBCb29sZWFuLFxyXG4gICAgbGVhZGluZ0ljb246IFtTdHJpbmcsIEFycmF5LCBPYmplY3RdLFxyXG4gICAgdHJhaWxpbmdJY29uOiBbU3RyaW5nLCBBcnJheSwgT2JqZWN0XSxcclxuICAgIHNpemU6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogMjAgfSxcclxuICAgIG1pbmxlbmd0aDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiB1bmRlZmluZWQgfSxcclxuICAgIG1heGxlbmd0aDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiB1bmRlZmluZWQgfSxcclxuICAgIHJvd3M6IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogOCB9LFxyXG4gICAgY29sczogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiA0MCB9LFxyXG5cclxuICAgIC8vIG90aGVyIGlucHV0IHByb3BzXHJcbiAgICBuYW1lOiBTdHJpbmcsXHJcbiAgICByZWFkb25seTogQm9vbGVhbixcclxuICAgIGF1dG9jb21wbGV0ZTogQm9vbGVhbixcclxuICAgIGF1dG9mb2N1czogQm9vbGVhbixcclxuICB9LFxyXG4gIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dDogdGhpcy52YWx1ZSxcclxuICAgICAgcm9vdENsYXNzZXM6IHtcclxuICAgICAgICAnbWRjLXRleHRmaWVsZCc6IHRydWUsXHJcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLXVwZ3JhZGVkJzogdHJ1ZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWRlbnNlJzogdGhpcy5kZW5zZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWZ1bGx3aWR0aCc6IHRoaXMuZnVsbHdpZHRoLFxyXG4gICAgICAgICdtZGMtdGV4dC1maWVsZC0tdGV4dGFyZWEnOiB0aGlzLm11bHRpbGluZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLWJveCc6ICF0aGlzLmZ1bGx3aWR0aCAmJiB0aGlzLmJveCxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtLW91dGxpbmVkJzogIXRoaXMuZnVsbHdpZHRoICYmIHRoaXMub3V0bGluZSxcclxuICAgICAgfSxcclxuICAgICAgaW5wdXRDbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkX19pbnB1dCc6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGxhYmVsQ2xhc3Nlczoge1xyXG4gICAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwnOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBib3R0b21DbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1saW5lLXJpcHBsZSc6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGhlbHBDbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy10ZXh0LWZpZWxkLWhlbHBlci10ZXh0JzogdHJ1ZSxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXBlcnNpc3RlbnQnOiB0aGlzLmhlbHB0ZXh0UGVyc2lzdGVudCxcclxuICAgICAgICAnbWRjLXRleHQtZmllbGQtaGVscGVyLXRleHQtLXZhbGlkYXRpb24tbXNnJzogdGhpcy5oZWxwdGV4dFZhbGlkYXRpb24sXHJcbiAgICAgIH0sXHJcbiAgICAgIG91dGxpbmVQYXRoQXR0cjogdW5kZWZpbmVkLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBkaXNhYmxlZCgpIHtcclxuICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcclxuICAgIH0sXHJcbiAgICByZXF1aXJlZCgpIHtcclxuICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJiAodGhpcy4kcmVmcy5pbnB1dC5yZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQpO1xyXG4gICAgfSxcclxuICAgIHZhbGlkKCkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMudmFsaWQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5zZXRWYWxpZCh0aGlzLnZhbGlkKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlbnNlKCkge1xyXG4gICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS1kZW5zZScsIHRoaXMuZGVuc2UpO1xyXG4gICAgfSxcclxuICAgIGhlbHB0ZXh0UGVyc2lzdGVudCgpIHtcclxuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiAmJlxyXG4gICAgICAgIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24uc2V0UGVyc2lzdGVudCh0aGlzLmhlbHB0ZXh0UGVyc2lzdGVudCk7XHJcbiAgICB9LFxyXG4gICAgaGVscHRleHRWYWxpZGF0aW9uKCkge1xyXG4gICAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uICYmXHJcbiAgICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5zZXRWYWxpZGF0aW9uKHRoaXMuaGVscHRleHRWYWxpZGF0aW9uKTtcclxuICAgIH0sXHJcbiAgICB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSkge1xyXG4gICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFZhbHVlKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLiRlbWl0KCdtb2RlbCcsIHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBmb2N1cygpIHtcclxuICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJiB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKCk7XHJcbiAgICB9LFxyXG4gICAgYmx1cigpIHtcclxuICAgICAgdGhpcy4kcmVmcy5pbnB1dCAmJiB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaW5wdXRBdHRycygpIHtcclxuICAgICAgbGV0IHsgbmFtZSwgcmVhZG9ubHksIGF1dG9jb21wbGV0ZSwgYXV0b2ZvY3VzIH0gPSB0aGlzO1xyXG4gICAgICByZXR1cm4geyBuYW1lLCByZWFkb25seSwgYXV0b2NvbXBsZXRlLCBhdXRvZm9jdXMgfTtcclxuICAgIH0sXHJcbiAgICBpbnB1dFBsYWNlSG9sZGVyKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5mdWxsd2lkdGggPyB0aGlzLmxhYmVsIDogdW5kZWZpbmVkO1xyXG4gICAgfSxcclxuICAgIGlucHV0QXJpYUNvbnRyb2xzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5oZWxwID8gJ2hlbHAtJyArIHRoaXMuX3VpZCA6IHVuZGVmaW5lZDtcclxuICAgIH0sXHJcbiAgICBoYXNMYWJlbCgpIHtcclxuICAgICAgcmV0dXJuICF0aGlzLmZ1bGx3aWR0aCAmJiB0aGlzLmxhYmVsO1xyXG4gICAgfSxcclxuICAgIGhhc091dGxpbmUoKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5mdWxsd2lkdGggJiYgdGhpcy5vdXRsaW5lO1xyXG4gICAgfSxcclxuICAgIGhhc0JvdHRvbUxpbmUoKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5oYXNPdXRsaW5lICYmICF0aGlzLm11bHRpbGluZTtcclxuICAgIH0sXHJcbiAgICBoYXNMZWFkaW5nSWNvbigpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICh0aGlzLmxlYWRpbmdJY29uIHx8IHRoaXMuJHNsb3RzWydsZWFkaW5nLWljb24nXSkgJiZcclxuICAgICAgICAhKHRoaXMudHJhaWxpbmdJY29uIHx8IHRoaXMuJHNsb3RzWyd0cmFpbGluZy1pY29uJ10pXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlYWRpbmdJY29uID8gZXh0cmFjdEljb25Qcm9wKHRoaXMubGVhZGluZ0ljb24pIDoge307XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGhhc1RyYWlsaW5nSWNvbigpIHtcclxuICAgICAgaWYgKHRoaXMudHJhaWxpbmdJY29uIHx8IHRoaXMuJHNsb3RzWyd0cmFpbGluZy1pY29uJ10pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFpbGluZ0ljb24gPyBleHRyYWN0SWNvblByb3AodGhpcy50cmFpbGluZ0ljb24pIDoge307XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGxhYmVsQ2xhc3Nlc1VwZ3JhZGVkKCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLmxhYmVsQ2xhc3Nlcywge1xyXG4gICAgICAgICdtZGMtZmxvYXRpbmctbGFiZWwtLWZsb2F0LWFib3ZlJzogdGhpcy52YWx1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIGlmICh0aGlzLiRyZWZzLmJvdHRvbSkge1xyXG4gICAgICB0aGlzLmJvdHRvbUxpbmVGb3VuZGF0aW9uID0gbmV3IE1EQ0xpbmVSaXBwbGVGb3VuZGF0aW9uKHtcclxuICAgICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmJvdHRvbUNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmJvdHRvbUNsYXNzZXMsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuYm90dG9tLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0QXR0cjogKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmJvdHRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmJvdHRvbS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVyZWdpc3RlckV2ZW50SGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuYm90dG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb24uaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLiRyZWZzLmhlbHApIHtcclxuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbiA9IG5ldyBNRENUZXh0RmllbGRIZWxwZXJUZXh0Rm91bmRhdGlvbih7XHJcbiAgICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy5oZWxwQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuaGVscENsYXNzZXMsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmhlbHAuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRBdHRyOiAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaGVscC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQXR0cjogbmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmhlbHAucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Q29udGVudDogKC8qY29udGVudCovKSA9PiB7XHJcbiAgICAgICAgICAvLyBoZWxwIHRleHQgZ2V0J3MgdXBkYXRlZCBmcm9tIHt7aGVscHRleHR9fVxyXG4gICAgICAgICAgLy8gdGhpcy4kcmVmcy5oZWxwLnRleHRDb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5oZWxwZXJUZXh0Rm91bmRhdGlvbi5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuJHJlZnMuaWNvbikge1xyXG4gICAgICBpZiAodGhpcy5oYXNMZWFkaW5nSWNvbikge1xyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RDbGFzc2VzLCAnbWRjLXRleHQtZmllbGQtLXdpdGgtbGVhZGluZy1pY29uJywgdHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNUcmFpbGluZ0ljb24pIHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5yb290Q2xhc3NlcywgJ21kYy10ZXh0LWZpZWxkLS13aXRoLXRyYWlsaW5nLWljb24nLCB0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5pY29uRm91bmRhdGlvbiA9IG5ldyBNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbih7XHJcbiAgICAgICAgc2V0QXR0cjogKGF0dHIsIHZhbHVlKSA9PiB0aGlzLiRyZWZzLmljb24uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKSxcclxuICAgICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaWNvbi5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMuaWNvbi5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm90aWZ5SWNvbkFjdGlvbjogKCkgPT4gdGhpcy4kZW1pdCgnaWNvbi1hY3Rpb24nKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaWNvbkZvdW5kYXRpb24uaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLiRyZWZzLmxhYmVsKSB7XHJcbiAgICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uID0gbmV3IE1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uKHtcclxuICAgICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmxhYmVsQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMubGFiZWxDbGFzc2VzLCBjbGFzc05hbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0V2lkdGg6ICgpID0+IHRoaXMuJHJlZnMubGFiZWwub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmxhYmVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcmVmcy5sYWJlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuJHJlZnMub3V0bGluZSkge1xyXG4gICAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uID0gbmV3IE1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbih7XHJcbiAgICAgICAgZ2V0V2lkdGg6ICgpID0+IHRoaXMuJHJlZnMub3V0bGluZS5vZmZzZXRXaWR0aCxcclxuICAgICAgICBnZXRIZWlnaHQ6ICgpID0+IHRoaXMuJHJlZnMub3V0bGluZS5vZmZzZXRIZWlnaHQsXHJcbiAgICAgICAgc2V0T3V0bGluZVBhdGhBdHRyOiB2YWx1ZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm91dGxpbmVQYXRoQXR0ciA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0SWRsZU91dGxpbmVTdHlsZVZhbHVlOiBwcm9wZXJ0eU5hbWUgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaWRsZU91dGxpbmVFbGVtZW50ID0gdGhpcy4kcmVmcy5vdXRsaW5lSWRsZTtcclxuICAgICAgICAgIGlmIChpZGxlT3V0bGluZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1xyXG4gICAgICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGlkbGVPdXRsaW5lRWxlbWVudClcclxuICAgICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm91dGxpbmVGb3VuZGF0aW9uLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDVGV4dGZpZWxkRm91bmRhdGlvbihcclxuICAgICAge1xyXG4gICAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdENsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLnJvb3RDbGFzc2VzLCBjbGFzc05hbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLnJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMucm9vdC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHJlZnMucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNGb2N1c2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy4kcmVmcy5pbnB1dDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzUnRsOiAoKSA9PlxyXG4gICAgICAgICAgd2luZG93XHJcbiAgICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKHRoaXMuJHJlZnMucm9vdClcclxuICAgICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ2RpcmVjdGlvbicpID09PSAncnRsJyxcclxuICAgICAgICBkZWFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuYm90dG9tKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm90dG9tLmRlYWN0aXZhdGUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2YXRlTGluZVJpcHBsZTogKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuYm90dG9tKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm90dG9tLmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRMaW5lUmlwcGxlVHJhbnNmb3JtT3JpZ2luOiBub3JtYWxpemVkWCA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5ib3R0b20pIHtcclxuICAgICAgICAgICAgdGhpcy5ib3R0b20uc2V0UmlwcGxlQ2VudGVyKG5vcm1hbGl6ZWRYKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyZWZzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiBoYW5kbGVyID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoaGFuZGxlcik7XHJcbiAgICAgICAgICBjb25zdCB0YXJnZXROb2RlID0gdGhpcy4kcmVmcy5pbnB1dDtcclxuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSB9O1xyXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBjb25maWcpO1xyXG4gICAgICAgICAgcmV0dXJuIG9ic2VydmVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyOiBvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFrZUxhYmVsOiBzaG91bGRTaGFrZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5zaGFrZShzaG91bGRTaGFrZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmbG9hdExhYmVsOiBzaG91bGRGbG9hdCA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5mbG9hdChzaG91bGRGbG9hdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXNMYWJlbDogKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuICEhdGhpcy4kcmVmcy5sYWJlbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldExhYmVsV2lkdGg6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsRm91bmRhdGlvbi5nZXRXaWR0aCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TmF0aXZlSW5wdXQ6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmlucHV0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzT3V0bGluZTogKCkgPT4gISF0aGlzLmhhc091dGxpbmUsXHJcbiAgICAgICAgdXBkYXRlT3V0bGluZVBhdGg6IChsYWJlbFdpZHRoLCBpc1J0bCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vdXRsaW5lRm91bmRhdGlvbi51cGRhdGVTdmdQYXRoKGxhYmVsV2lkdGgsIGlzUnRsKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgYm90dG9tTGluZTogdGhpcy5ib3R0b21MaW5lRm91bmRhdGlvbixcclxuICAgICAgICBoZWxwZXJUZXh0OiB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uLFxyXG4gICAgICAgIGljb246IHRoaXMuaWNvbkZvdW5kYXRpb24sXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGFiZWxGb3VuZGF0aW9uLFxyXG4gICAgICAgIG91dGxpbmU6IHRoaXMub3V0bGluZUZvdW5kYXRpb24sXHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KCk7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XHJcbiAgICB0aGlzLiRyZWZzLmlucHV0ICYmICh0aGlzLiRyZWZzLmlucHV0LnJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMudmFsaWQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRWYWxpZCh0aGlzLnZhbGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50ZXh0Ym94KSB7XHJcbiAgICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcyk7XHJcbiAgICAgIHRoaXMucmlwcGxlLmluaXQoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb24gJiYgdGhpcy5ib3R0b21MaW5lRm91bmRhdGlvbi5kZXN0cm95KCk7XHJcbiAgICB0aGlzLmhlbHBlclRleHRGb3VuZGF0aW9uICYmIHRoaXMuaGVscGVyVGV4dEZvdW5kYXRpb24uZGVzdHJveSgpO1xyXG4gICAgdGhpcy5pY29uRm91bmRhdGlvbiAmJiB0aGlzLmljb25Gb3VuZGF0aW9uLmRlc3Ryb3koKTtcclxuICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uICYmIHRoaXMubGFiZWxGb3VuZGF0aW9uLmRlc3Ryb3koKTtcclxuICAgIHRoaXMub3V0bGluZUZvdW5kYXRpb24gJiYgdGhpcy5vdXRsaW5lRm91bmRhdGlvbi5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnJpcHBsZSAmJiB0aGlzLnJpcHBsZS5kZXN0cm95KCk7XHJcbiAgfSxcclxufTtcclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNUZXh0RmllbGQgZnJvbSAnLi9tZGMtdGV4dGZpZWxkLnZ1ZSdcblxuZXhwb3J0IHttZGNUZXh0RmllbGR9XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNUZXh0RmllbGRcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiQ3VzdG9tRWxlbWVudCIsImZ1bmN0aW9uYWwiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsInByb3BzIiwiaXMiLCJ0YWciLCJkYXRhIiwiY2hpbGRyZW4iLCJDdXN0b21FbGVtZW50TWl4aW4iLCJleHRyYWN0SWNvblByb3AiLCJpY29uUHJvcCIsImNsYXNzZXMiLCJjb250ZW50IiwiQXJyYXkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJ2YWx1ZSIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJ0ZXh0Q29udGVudCIsIkRpc3BhdGNoRm9jdXNNaXhpbiIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJtb3VudGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJlZm9yZURlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIk1EQ1RleHRGaWVsZEhlbHBlclRleHRBZGFwdGVyIiwiYXR0ciIsInN0cmluZ3MiLCJBUklBX0hJRERFTiIsIlJPTEUiLCJjc3NDbGFzc2VzIiwiSEVMUEVSX1RFWFRfUEVSU0lTVEVOVCIsIkhFTFBFUl9URVhUX1ZBTElEQVRJT05fTVNHIiwiTURDVGV4dEZpZWxkSGVscGVyVGV4dEZvdW5kYXRpb24iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJzZXRBdHRyIiwicmVtb3ZlQXR0ciIsInNldENvbnRlbnQiLCJkZWZhdWx0QWRhcHRlciIsImlzUGVyc2lzdGVudCIsImlzVmFsaWRhdGlvbiIsImlucHV0SXNWYWxpZCIsImhlbHBlclRleHRJc1BlcnNpc3RlbnQiLCJoZWxwZXJUZXh0SXNWYWxpZGF0aW9uTXNnIiwidmFsaWRhdGlvbk1zZ05lZWRzRGlzcGxheSIsImhpZGVfIiwiTURDVGV4dEZpZWxkSWNvbkFkYXB0ZXIiLCJldnRUeXBlIiwiaGFuZGxlciIsIklDT05fRVZFTlQiLCJNRENUZXh0RmllbGRJY29uRm91bmRhdGlvbiIsInJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsIm5vdGlmeUljb25BY3Rpb24iLCJpbnRlcmFjdGlvbkhhbmRsZXJfIiwiZXZ0IiwiaGFuZGxlSW50ZXJhY3Rpb24iLCJmb3JFYWNoIiwiZGlzYWJsZWQiLCJ0eXBlIiwia2V5Q29kZSIsIk1EQ1RleHRGaWVsZEFkYXB0ZXIiLCJvYnNlcnZlciIsIm5vcm1hbGl6ZWRYIiwic2hvdWxkU2hha2UiLCJzaG91bGRGbG9hdCIsImxhYmVsV2lkdGgiLCJpc1J0bCIsIk1EQ0xpbmVSaXBwbGVBZGFwdGVyIiwiTElORV9SSVBQTEVfQUNUSVZFIiwiTElORV9SSVBQTEVfREVBQ1RJVkFUSU5HIiwiTURDTGluZVJpcHBsZUZvdW5kYXRpb24iLCJyZWdpc3RlckV2ZW50SGFuZGxlciIsImRlcmVnaXN0ZXJFdmVudEhhbmRsZXIiLCJ0cmFuc2l0aW9uRW5kSGFuZGxlcl8iLCJoYW5kbGVUcmFuc2l0aW9uRW5kIiwieENvb3JkaW5hdGUiLCJhdHRyaWJ1dGVTdHJpbmciLCJpc0RlYWN0aXZhdGluZyIsInByb3BlcnR5TmFtZSIsIk1EQ0Zsb2F0aW5nTGFiZWxBZGFwdGVyIiwiTEFCRUxfRkxPQVRfQUJPVkUiLCJMQUJFTF9TSEFLRSIsIk1EQ0Zsb2F0aW5nTGFiZWxGb3VuZGF0aW9uIiwiZ2V0V2lkdGgiLCJzaGFrZUFuaW1hdGlvbkVuZEhhbmRsZXJfIiwiaGFuZGxlU2hha2VBbmltYXRpb25FbmRfIiwiTURDTm90Y2hlZE91dGxpbmVBZGFwdGVyIiwiUEFUSF9TRUxFQ1RPUiIsIklETEVfT1VUTElORV9TRUxFQ1RPUiIsIk1EQ05vdGNoZWRPdXRsaW5lRm91bmRhdGlvbiIsImdldEhlaWdodCIsInNldE91dGxpbmVQYXRoQXR0ciIsImdldElkbGVPdXRsaW5lU3R5bGVWYWx1ZSIsIm5vdGNoV2lkdGgiLCJyYWRpdXNTdHlsZVZhbHVlIiwicmFkaXVzIiwicGFyc2VGbG9hdCIsIndpZHRoIiwiaGVpZ2h0IiwiY29ybmVyV2lkdGgiLCJsZWFkaW5nU3Ryb2tlTGVuZ3RoIiwiTWF0aCIsImFicyIsInBhZGRlZE5vdGNoV2lkdGgiLCJwYXRoTWlkZGxlIiwicGF0aCIsIkFSSUFfQ09OVFJPTFMiLCJJTlBVVF9TRUxFQ1RPUiIsIkxBQkVMX1NFTEVDVE9SIiwiSUNPTl9TRUxFQ1RPUiIsIk9VVExJTkVfU0VMRUNUT1IiLCJCT1RUT01fTElORV9TRUxFQ1RPUiIsIlJPT1QiLCJVUEdSQURFRCIsIkRJU0FCTEVEIiwiREVOU0UiLCJGT0NVU0VEIiwiSU5WQUxJRCIsIkJPWCIsIk9VVExJTkVEIiwibnVtYmVycyIsIkxBQkVMX1NDQUxFIiwiREVOU0VfTEFCRUxfU0NBTEUiLCJWQUxJREFUSU9OX0FUVFJfV0hJVEVMSVNUIiwiTURDVGV4dEZpZWxkRm91bmRhdGlvbiIsImlzVmFsaWQiLCJpc0ZvY3VzZWRfIiwiaXNCYWRJbnB1dF8iLCJnZXRWYWx1ZSIsInJlZ2lzdGVyVGV4dEZpZWxkSW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRleHRGaWVsZEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW5wdXRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyIiwiZGVyZWdpc3RlclZhbGlkYXRpb25BdHRyaWJ1dGVDaGFuZ2VIYW5kbGVyIiwiZ2V0TmF0aXZlSW5wdXQiLCJpc0ZvY3VzZWQiLCJhY3RpdmF0ZUxpbmVSaXBwbGUiLCJkZWFjdGl2YXRlTGluZVJpcHBsZSIsInNldExpbmVSaXBwbGVUcmFuc2Zvcm1PcmlnaW4iLCJzaGFrZUxhYmVsIiwiZmxvYXRMYWJlbCIsImhhc0xhYmVsIiwiZ2V0TGFiZWxXaWR0aCIsImhhc091dGxpbmUiLCJ1cGRhdGVPdXRsaW5lUGF0aCIsImZvdW5kYXRpb25NYXAiLCJoZWxwZXJUZXh0XyIsImhlbHBlclRleHQiLCJpY29uXyIsImljb24iLCJyZWNlaXZlZFVzZXJJbnB1dF8iLCJ1c2VDdXN0b21WYWxpZGl0eUNoZWNraW5nXyIsImlzVmFsaWRfIiwiaW5wdXRGb2N1c0hhbmRsZXJfIiwiYWN0aXZhdGVGb2N1cyIsImlucHV0Qmx1ckhhbmRsZXJfIiwiZGVhY3RpdmF0ZUZvY3VzIiwiaW5wdXRJbnB1dEhhbmRsZXJfIiwiYXV0b0NvbXBsZXRlRm9jdXMiLCJzZXRQb2ludGVyWE9mZnNldF8iLCJzZXRUcmFuc2Zvcm1PcmlnaW4iLCJ0ZXh0RmllbGRJbnRlcmFjdGlvbkhhbmRsZXJfIiwiaGFuZGxlVGV4dEZpZWxkSW50ZXJhY3Rpb24iLCJ2YWxpZGF0aW9uQXR0cmlidXRlQ2hhbmdlSGFuZGxlcl8iLCJtdXRhdGlvbnMiLCJoYW5kbGVWYWxpZGF0aW9uQXR0cmlidXRlTXV0YXRpb25fIiwidmFsaWRhdGlvbk9ic2VydmVyXyIsIm11dGF0aW9uc0xpc3QiLCJzb21lIiwibXV0YXRpb24iLCJpbmRleE9mIiwiYXR0cmlidXRlTmFtZSIsInN0eWxlVmFsaWRpdHlfIiwiaXNEZW5zZSIsImxhYmVsU2NhbGUiLCJzdHlsZUZvY3VzZWRfIiwidXBkYXRlT3V0bGluZSIsInNob3dUb1NjcmVlblJlYWRlciIsInRhcmdldENsaWVudFJlY3QiLCJ0YXJnZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJldnRDb29yZHMiLCJ4IiwiY2xpZW50WCIsInkiLCJjbGllbnRZIiwibGVmdCIsImlucHV0IiwiZ2V0TmF0aXZlSW5wdXRfIiwic2hvdWxkUmVtb3ZlTGFiZWxGbG9hdCIsImlzTmF0aXZlSW5wdXRWYWxpZF8iLCJzdHlsZURpc2FibGVkXyIsInZhbGlkaXR5IiwiYmFkSW5wdXQiLCJ2YWxpZCIsInNldFZhbGlkaXR5IiwiaXNEaXNhYmxlZCIsInNldERpc2FibGVkIiwiTURDUmlwcGxlQWRhcHRlciIsInZhck5hbWUiLCJVTkJPVU5ERUQiLCJCR19GT0NVU0VEIiwiRkdfQUNUSVZBVElPTiIsIkZHX0RFQUNUSVZBVElPTiIsIlZBUl9MRUZUIiwiVkFSX1RPUCIsIlZBUl9GR19TSVpFIiwiVkFSX0ZHX1NDQUxFIiwiVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCIsIlZBUl9GR19UUkFOU0xBVEVfRU5EIiwiUEFERElORyIsIklOSVRJQUxfT1JJR0lOX1NDQUxFIiwiREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMiLCJGR19ERUFDVElWQVRJT05fTVMiLCJUQVBfREVMQVlfTVMiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlc18iLCJzdXBwb3J0c1Bhc3NpdmVfIiwiZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1ZyIsIndpbmRvd09iaiIsIm5vZGUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImhhc1BzZXVkb1ZhckJ1ZyIsImJvcmRlclRvcFN0eWxlIiwicmVtb3ZlIiwic3VwcG9ydHNDc3NWYXJpYWJsZXMiLCJmb3JjZVJlZnJlc2giLCJzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCIsIkNTUyIsInN1cHBvcnRzIiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImFwcGx5UGFzc2l2ZSIsImdsb2JhbE9iaiIsInVuZGVmaW5lZCIsImlzU3VwcG9ydGVkIiwicGFzc2l2ZSIsImUiLCJnZXRNYXRjaGVzUHJvcGVydHkiLCJIVE1MRWxlbWVudFByb3RvdHlwZSIsImZpbHRlciIsInAiLCJwb3AiLCJnZXROb3JtYWxpemVkRXZlbnRDb29yZHMiLCJldiIsInBhZ2VPZmZzZXQiLCJjbGllbnRSZWN0IiwiZG9jdW1lbnRYIiwiZG9jdW1lbnRZIiwidG9wIiwibm9ybWFsaXplZFkiLCJjaGFuZ2VkVG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTIiwiUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJhY3RpdmF0ZWRUYXJnZXRzIiwiTURDUmlwcGxlRm91bmRhdGlvbiIsImJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMiLCJpc1VuYm91bmRlZCIsImlzU3VyZmFjZUFjdGl2ZSIsImlzU3VyZmFjZURpc2FibGVkIiwiY29udGFpbnNFdmVudFRhcmdldCIsInJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsInVwZGF0ZUNzc1ZhcmlhYmxlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJhY3RpdmF0aW9uU3RhdGVfIiwiZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8iLCJpbml0aWFsU2l6ZV8iLCJtYXhSYWRpdXNfIiwiYWN0aXZhdGVIYW5kbGVyXyIsImFjdGl2YXRlXyIsImRlYWN0aXZhdGVIYW5kbGVyXyIsImRlYWN0aXZhdGVfIiwiZm9jdXNIYW5kbGVyXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJsdXJIYW5kbGVyXyIsInJlc2l6ZUhhbmRsZXJfIiwibGF5b3V0IiwidW5ib3VuZGVkQ29vcmRzXyIsImZnU2NhbGVfIiwiYWN0aXZhdGlvblRpbWVyXyIsImZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyIsImFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8iLCJhY3RpdmF0aW9uVGltZXJDYWxsYmFja18iLCJydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8iLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudF8iLCJpc0FjdGl2YXRlZCIsImhhc0RlYWN0aXZhdGlvblVYUnVuIiwid2FzQWN0aXZhdGVkQnlQb2ludGVyIiwid2FzRWxlbWVudE1hZGVBY3RpdmUiLCJhY3RpdmF0aW9uRXZlbnQiLCJpc1Byb2dyYW1tYXRpYyIsImlzU3VwcG9ydGVkXyIsInJlZ2lzdGVyUm9vdEhhbmRsZXJzXyIsImxheW91dEludGVybmFsXyIsImRlcmVnaXN0ZXJSb290SGFuZGxlcnNfIiwiZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsInJlbW92ZUNzc1ZhcnNfIiwiT2JqZWN0Iiwia2V5cyIsImsiLCJhY3RpdmF0aW9uU3RhdGUiLCJwcmV2aW91c0FjdGl2YXRpb25FdmVudCIsImlzU2FtZUludGVyYWN0aW9uIiwiaGFzQWN0aXZhdGVkQ2hpbGQiLCJsZW5ndGgiLCJyZXNldEFjdGl2YXRpb25TdGF0ZV8iLCJwdXNoIiwicmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18iLCJhbmltYXRlQWN0aXZhdGlvbl8iLCJldmVudCIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsImNsZWFyVGltZW91dCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsImFjdGl2YXRpb25IYXNFbmRlZCIsInN0YXRlIiwiZXZ0T2JqZWN0IiwiYW5pbWF0ZURlYWN0aXZhdGlvbl8iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIm1heERpbSIsIm1heCIsImdldEJvdW5kZWRSYWRpdXMiLCJoeXBvdGVudXNlIiwic3FydCIsInBvdyIsInVwZGF0ZUxheW91dENzc1ZhcnNfIiwicm91bmQiLCJ1bmJvdW5kZWQiLCJSaXBwbGVCYXNlIiwicmVmIiwiTUFUQ0hFUyIsIl9tYXRjaGVzIiwiSFRNTEVsZW1lbnQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiJHNldCIsIiRkZWxldGUiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZXMiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwibWl4aW5zIiwibW9kZWwiLCJwcm9wIiwiU3RyaW5nIiwiZGVmYXVsdCIsInZhbGlkYXRvciIsImRlbnNlIiwiQm9vbGVhbiIsImxhYmVsIiwiaGVscHRleHQiLCJoZWxwdGV4dFBlcnNpc3RlbnQiLCJoZWxwdGV4dFZhbGlkYXRpb24iLCJib3giLCJvdXRsaW5lIiwicmVxdWlyZWQiLCJmdWxsd2lkdGgiLCJtdWx0aWxpbmUiLCJsZWFkaW5nSWNvbiIsInRyYWlsaW5nSWNvbiIsInNpemUiLCJOdW1iZXIiLCJtaW5sZW5ndGgiLCJtYXhsZW5ndGgiLCJyb3dzIiwiY29scyIsInJlYWRvbmx5IiwiYXV0b2NvbXBsZXRlIiwiYXV0b2ZvY3VzIiwidGV4dCIsInJvb3RDbGFzc2VzIiwiaW5wdXRDbGFzc2VzIiwibGFiZWxDbGFzc2VzIiwiYm90dG9tQ2xhc3NlcyIsImhlbHBDbGFzc2VzIiwib3V0bGluZVBhdGhBdHRyIiwid2F0Y2giLCJmb3VuZGF0aW9uIiwiJHJlZnMiLCJzZXRWYWxpZCIsImhlbHBlclRleHRGb3VuZGF0aW9uIiwic2V0UGVyc2lzdGVudCIsInNldFZhbGlkYXRpb24iLCJzZXRWYWx1ZSIsInVwZGF0ZVZhbHVlIiwiZm9jdXMiLCJibHVyIiwiY29tcHV0ZWQiLCJpbnB1dEF0dHJzIiwiaW5wdXRQbGFjZUhvbGRlciIsImlucHV0QXJpYUNvbnRyb2xzIiwiaGVscCIsIl91aWQiLCJoYXNCb3R0b21MaW5lIiwiaGFzTGVhZGluZ0ljb24iLCIkc2xvdHMiLCJoYXNUcmFpbGluZ0ljb24iLCJsYWJlbENsYXNzZXNVcGdyYWRlZCIsImJvdHRvbSIsImJvdHRvbUxpbmVGb3VuZGF0aW9uIiwiY2xhc3NMaXN0Iiwic2V0QXR0cmlidXRlIiwiaW5pdCIsInJlbW92ZUF0dHJpYnV0ZSIsImljb25Gb3VuZGF0aW9uIiwibGFiZWxGb3VuZGF0aW9uIiwib2Zmc2V0V2lkdGgiLCJvdXRsaW5lRm91bmRhdGlvbiIsIm9mZnNldEhlaWdodCIsImlkbGVPdXRsaW5lRWxlbWVudCIsIm91dGxpbmVJZGxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIk1EQ1RleHRmaWVsZEZvdW5kYXRpb24iLCJyb290IiwiZGVhY3RpdmF0ZSIsImFjdGl2YXRlIiwic2V0UmlwcGxlQ2VudGVyIiwiTXV0YXRpb25PYnNlcnZlciIsInRhcmdldE5vZGUiLCJjb25maWciLCJhdHRyaWJ1dGVzIiwib2JzZXJ2ZSIsImRpc2Nvbm5lY3QiLCJzaGFrZSIsImZsb2F0IiwidXBkYXRlU3ZnUGF0aCIsImJvdHRvbUxpbmUiLCJ0ZXh0Ym94IiwicmlwcGxlIiwiZGVzdHJveSIsIm1kY1RleHRGaWVsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFPLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0lBQ2hDO0lBQ0EsTUFBSUMsT0FBTyxJQUFYO0lBQ0EsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDRCxXQUFPQyxPQUFPQyxHQUFkO0lBQ0QsR0FGRCxNQUVPLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztJQUN4QztJQUNBSCxXQUFPRyxPQUFPRCxHQUFkO0lBQ0Q7SUFDRCxNQUFJRixJQUFKLEVBQVU7SUFDUkEsU0FBS0ksR0FBTCxDQUFTTCxNQUFUO0lBQ0Q7SUFDRjs7SUNaTSxTQUFTTSxVQUFULENBQXFCQyxVQUFyQixFQUFpQztJQUN0QyxTQUFPO0lBQ0xDLGFBQVMsUUFESjtJQUVMQyxhQUFTLGlCQUFDQyxFQUFELEVBQVE7SUFDZixXQUFLLElBQUlDLEdBQVQsSUFBZ0JKLFVBQWhCLEVBQTRCO0lBQzFCLFlBQUlLLFlBQVlMLFdBQVdJLEdBQVgsQ0FBaEI7SUFDRUQsV0FBR0UsU0FBSCxDQUFhQSxVQUFVQyxJQUF2QixFQUE0QkQsU0FBNUI7SUFDSDtJQUNGLEtBUEk7SUFRTEw7SUFSSyxHQUFQO0lBVUQ7O0lDWE0sSUFBTU8sZ0JBQWdCO0lB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
