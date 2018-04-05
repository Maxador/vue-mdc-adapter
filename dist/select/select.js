/**
* @module vue-mdc-adapterselect 0.13.2
* @exports VueMDCSelect
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSelect = factory());
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

  var MDCNativeSelect = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('select', { directives: [{ name: "model", rawName: "v-model", value: _vm.selected, expression: "selected" }], ref: "root", staticClass: "mdc-select mdc-native-select", attrs: { "disabled": _vm.disabled }, on: { "change": [function ($event) {
            var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
              return o.selected;
            }).map(function (o) {
              var val = "_value" in o ? o._value : o.value;return val;
            });_vm.selected = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
          }, _vm.onChange] } }, [_vm.label ? _c('option', { attrs: { "disabled": "disabled", "value": "" } }, [_vm._v(_vm._s(_vm.label))]) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-native-select',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: [String, Array],
      disabled: Boolean,
      label: String
    },
    data: function data() {
      return {
        selected: this.value
      };
    },

    methods: {
      onChange: function onChange() {
        this.$emit('change', this.selected);
      }
    },
    watch: {
      value: function value(newValue) {
        this.selected = newValue;
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
   * Adapter for MDC Menu. Provides an interface for managing
   * - classes
   * - dom
   * - focus
   * - position
   * - dimensions
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
  var MDCMenuAdapter = function () {
    function MDCMenuAdapter() {
      classCallCheck(this, MDCMenuAdapter);
    }

    createClass(MDCMenuAdapter, [{
      key: "addClass",

      /** @param {string} className */
      value: function addClass(className) {}

      /** @param {string} className */

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

      /** @return {boolean} */

    }, {
      key: "hasNecessaryDom",
      value: function hasNecessaryDom() {}

      /**
       * @param {EventTarget} target
       * @param {string} attributeName
       * @return {string}
       */

    }, {
      key: "getAttributeForEventTarget",
      value: function getAttributeForEventTarget(target, attributeName) {}

      /** @return {{ width: number, height: number }} */

    }, {
      key: "getInnerDimensions",
      value: function getInnerDimensions() {}

      /** @return {boolean} */

    }, {
      key: "hasAnchor",
      value: function hasAnchor() {}

      /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

    }, {
      key: "getAnchorDimensions",
      value: function getAnchorDimensions() {}

      /** @return {{ width: number, height: number }} */

    }, {
      key: "getWindowDimensions",
      value: function getWindowDimensions() {}

      /** @return {number} */

    }, {
      key: "getNumberOfItems",
      value: function getNumberOfItems() {}

      /**
       * @param {string} type
       * @param {function(!Event)} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(type, handler) {}

      /**
       * @param {string} type
       * @param {function(!Event)} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}

      /** @param {function(!Event)} handler */

    }, {
      key: "registerBodyClickHandler",
      value: function registerBodyClickHandler(handler) {}

      /** @param {function(!Event)} handler */

    }, {
      key: "deregisterBodyClickHandler",
      value: function deregisterBodyClickHandler(handler) {}

      /**
       * @param {EventTarget} target
       * @return {number}
       */

    }, {
      key: "getIndexForEventTarget",
      value: function getIndexForEventTarget(target) {}

      /** @param {{index: number}} evtData */

    }, {
      key: "notifySelected",
      value: function notifySelected(evtData) {}
    }, {
      key: "notifyCancel",
      value: function notifyCancel() {}
    }, {
      key: "saveFocus",
      value: function saveFocus() {}
    }, {
      key: "restoreFocus",
      value: function restoreFocus() {}

      /** @return {boolean} */

    }, {
      key: "isFocused",
      value: function isFocused() {}
    }, {
      key: "focus",
      value: function focus() {}

      /** @return {number} */

    }, {
      key: "getFocusedItemIndex",
      value: function getFocusedItemIndex() /* number */{}

      /** @param {number} index */

    }, {
      key: "focusItemAtIndex",
      value: function focusItemAtIndex(index) {}

      /** @return {boolean} */

    }, {
      key: "isRtl",
      value: function isRtl() {}

      /** @param {string} origin */

    }, {
      key: "setTransformOrigin",
      value: function setTransformOrigin(origin) {}

      /** @param {{
      *   top: (string|undefined),
      *   right: (string|undefined),
      *   bottom: (string|undefined),
      *   left: (string|undefined)
      * }} position */

    }, {
      key: "setPosition",
      value: function setPosition(position) {}

      /** @param {string} height */

    }, {
      key: "setMaxHeight",
      value: function setMaxHeight(height) {}

      /**
       * @param {number} index
       * @param {string} attr
       * @param {string} value
       */

    }, {
      key: "setAttrForOptionAtIndex",
      value: function setAttrForOptionAtIndex(index, attr, value) {}

      /**
       * @param {number} index
       * @param {string} attr
       */

    }, {
      key: "rmAttrForOptionAtIndex",
      value: function rmAttrForOptionAtIndex(index, attr) {}

      /**
       * @param {number} index
       * @param {string} className
       */

    }, {
      key: "addClassForOptionAtIndex",
      value: function addClassForOptionAtIndex(index, className) {}

      /**
       * @param {number} index
       * @param {string} className
       */

    }, {
      key: "rmClassForOptionAtIndex",
      value: function rmClassForOptionAtIndex(index, className) {}
    }]);
    return MDCMenuAdapter;
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
    ROOT: 'mdc-menu',
    OPEN: 'mdc-menu--open',
    ANIMATING_OPEN: 'mdc-menu--animating-open',
    ANIMATING_CLOSED: 'mdc-menu--animating-closed',
    SELECTED_LIST_ITEM: 'mdc-list-item--selected'
  };

  /** @enum {string} */
  var strings = {
    ITEMS_SELECTOR: '.mdc-menu__items',
    SELECTED_EVENT: 'MDCMenu:selected',
    CANCEL_EVENT: 'MDCMenu:cancel',
    ARIA_DISABLED_ATTR: 'aria-disabled'
  };

  /** @enum {number} */
  var numbers = {
    // Amount of time to wait before triggering a selected event on the menu. Note that this time
    // will most likely be bumped up once interactive lists are supported to allow for the ripple to
    // animate before closing the menu
    SELECTED_TRIGGER_DELAY: 50,
    // Total duration of menu open animation.
    TRANSITION_OPEN_DURATION: 120,
    // Total duration of menu close animation.
    TRANSITION_CLOSE_DURATION: 75,
    // Margin left to the edge of the viewport when menu is at maximum possible height.
    MARGIN_TO_EDGE: 32,
    // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
    ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
    // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
    OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
  };

  /**
   * Enum for bits in the {@see Corner) bitmap.
   * @enum {number}
   */
  var CornerBit = {
    BOTTOM: 1,
    CENTER: 2,
    RIGHT: 4,
    FLIP_RTL: 8
  };

  /**
   * Enum for representing an element corner for positioning the menu.
   *
   * The START constants map to LEFT if element directionality is left
   * to right and RIGHT if the directionality is right to left.
   * Likewise END maps to RIGHT or LEFT depending on the directionality.
   *
   * @enum {number}
   */
  var Corner = {
    TOP_LEFT: 0,
    TOP_RIGHT: CornerBit.RIGHT,
    BOTTOM_LEFT: CornerBit.BOTTOM,
    BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
    TOP_START: CornerBit.FLIP_RTL,
    TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
    BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
    BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
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
   * @extends {MDCFoundation<!MDCMenuAdapter>}
   */

  var MDCMenuFoundation = function (_MDCFoundation) {
    inherits(MDCMenuFoundation, _MDCFoundation);
    createClass(MDCMenuFoundation, null, [{
      key: 'cssClasses',

      /** @return enum{cssClasses} */
      get: function get$$1() {
        return cssClasses;
      }

      /** @return enum{strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }

      /** @return enum{numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
      }

      /** @return enum{number} */

    }, {
      key: 'Corner',
      get: function get$$1() {
        return Corner;
      }

      /**
       * {@see MDCMenuAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCMenuAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCMenuAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            hasClass: function hasClass() {
              return false;
            },
            hasNecessaryDom: function hasNecessaryDom() {
              return false;
            },
            getAttributeForEventTarget: function getAttributeForEventTarget() {},
            getInnerDimensions: function getInnerDimensions() {
              return {};
            },
            hasAnchor: function hasAnchor() {
              return false;
            },
            getAnchorDimensions: function getAnchorDimensions() {
              return {};
            },
            getWindowDimensions: function getWindowDimensions() {
              return {};
            },
            getNumberOfItems: function getNumberOfItems() {
              return 0;
            },
            registerInteractionHandler: function registerInteractionHandler() {},
            deregisterInteractionHandler: function deregisterInteractionHandler() {},
            registerBodyClickHandler: function registerBodyClickHandler() {},
            deregisterBodyClickHandler: function deregisterBodyClickHandler() {},
            getIndexForEventTarget: function getIndexForEventTarget() {
              return 0;
            },
            notifySelected: function notifySelected() {},
            notifyCancel: function notifyCancel() {},
            saveFocus: function saveFocus() {},
            restoreFocus: function restoreFocus() {},
            isFocused: function isFocused() {
              return false;
            },
            focus: function focus() {},
            getFocusedItemIndex: function getFocusedItemIndex() {
              return -1;
            },
            focusItemAtIndex: function focusItemAtIndex() {},
            isRtl: function isRtl() {
              return false;
            },
            setTransformOrigin: function setTransformOrigin() {},
            setPosition: function setPosition() {},
            setMaxHeight: function setMaxHeight() {},
            setAttrForOptionAtIndex: function setAttrForOptionAtIndex() {},
            rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() {},
            addClassForOptionAtIndex: function addClassForOptionAtIndex() {},
            rmClassForOptionAtIndex: function rmClassForOptionAtIndex() {}
          }
        );
      }

      /** @param {!MDCMenuAdapter} adapter */

    }]);

    function MDCMenuFoundation(adapter) {
      classCallCheck(this, MDCMenuFoundation);

      /** @private {function(!Event)} */
      var _this = possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

      _this.clickHandler_ = function (evt) {
        return _this.handlePossibleSelected_(evt);
      };
      /** @private {function(!Event)} */
      _this.keydownHandler_ = function (evt) {
        return _this.handleKeyboardDown_(evt);
      };
      /** @private {function(!Event)} */
      _this.keyupHandler_ = function (evt) {
        return _this.handleKeyboardUp_(evt);
      };
      /** @private {function(!Event)} */
      _this.documentClickHandler_ = function (evt) {
        return _this.handleDocumentClick_(evt);
      };
      /** @private {boolean} */
      _this.isOpen_ = false;
      /** @private {number} */
      _this.openAnimationEndTimerId_ = 0;
      /** @private {number} */
      _this.closeAnimationEndTimerId_ = 0;
      /** @private {number} */
      _this.selectedTriggerTimerId_ = 0;
      /** @private {number} */
      _this.animationRequestId_ = 0;
      /** @private {!{ width: number, height: number }} */
      _this.dimensions_;
      /** @private {number} */
      _this.itemHeight_;
      /** @private {Corner} */
      _this.anchorCorner_ = Corner.TOP_START;
      /** @private {AnchorMargin} */
      _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
      /** @private {?AutoLayoutMeasurements} */
      _this.measures_ = null;
      /** @private {number} */
      _this.selectedIndex_ = -1;
      /** @private {boolean} */
      _this.rememberSelection_ = false;
      /** @private {boolean} */
      _this.quickOpen_ = false;

      // A keyup event on the menu needs to have a corresponding keydown
      // event on the menu. If the user opens the menu with a keydown event on a
      // button, the menu will only get the key up event causing buggy behavior with selected elements.
      /** @private {boolean} */
      _this.keyDownWithinMenu_ = false;
      return _this;
    }

    createClass(MDCMenuFoundation, [{
      key: 'init',
      value: function init() {
        var _MDCMenuFoundation$cs = MDCMenuFoundation.cssClasses,
            ROOT = _MDCMenuFoundation$cs.ROOT,
            OPEN = _MDCMenuFoundation$cs.OPEN;


        if (!this.adapter_.hasClass(ROOT)) {
          throw new Error(ROOT + ' class required in root element.');
        }

        if (!this.adapter_.hasNecessaryDom()) {
          throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
        }

        if (this.adapter_.hasClass(OPEN)) {
          this.isOpen_ = true;
        }

        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
        this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        clearTimeout(this.selectedTriggerTimerId_);
        clearTimeout(this.openAnimationEndTimerId_);
        clearTimeout(this.closeAnimationEndTimerId_);
        // Cancel any currently running animations.
        cancelAnimationFrame(this.animationRequestId_);
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
        this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
      }

      /**
       * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
       */

    }, {
      key: 'setAnchorCorner',
      value: function setAnchorCorner(corner) {
        this.anchorCorner_ = corner;
      }

      /**
       * @param {!AnchorMargin} margin 4-plet of margins from anchor.
       */

    }, {
      key: 'setAnchorMargin',
      value: function setAnchorMargin(margin) {
        this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
        this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
        this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
        this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
      }

      /** @param {boolean} rememberSelection */

    }, {
      key: 'setRememberSelection',
      value: function setRememberSelection(rememberSelection) {
        this.rememberSelection_ = rememberSelection;
        this.setSelectedIndex(-1);
      }

      /** @param {boolean} quickOpen */

    }, {
      key: 'setQuickOpen',
      value: function setQuickOpen(quickOpen) {
        this.quickOpen_ = quickOpen;
      }

      /**
       * @param {?number} focusIndex
       * @private
       */

    }, {
      key: 'focusOnOpen_',
      value: function focusOnOpen_(focusIndex) {
        if (focusIndex === null) {
          // If this instance of MDCMenu remembers selections, and the user has
          // made a selection, then focus the last selected item
          if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
            this.adapter_.focusItemAtIndex(this.selectedIndex_);
            return;
          }

          this.adapter_.focus();
          // If that doesn't work, focus first item instead.
          if (!this.adapter_.isFocused()) {
            this.adapter_.focusItemAtIndex(0);
          }
        } else {
          this.adapter_.focusItemAtIndex(focusIndex);
        }
      }

      /**
       * Handle clicks and cancel the menu if not a child list-item
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleDocumentClick_',
      value: function handleDocumentClick_(evt) {
        var el = evt.target;

        while (el && el !== document.documentElement) {
          if (this.adapter_.getIndexForEventTarget(el) !== -1) {
            return;
          }
          el = el.parentNode;
        }

        this.adapter_.notifyCancel();
        this.close(evt);
      }
    }, {
      key: 'handleKeyboardDown_',


      /**
       * Handle keys that we want to repeat on hold (tab and arrows).
       * @param {!Event} evt
       * @return {boolean}
       * @private
       */
      value: function handleKeyboardDown_(evt) {
        // Do nothing if Alt, Ctrl or Meta are pressed.
        if (evt.altKey || evt.ctrlKey || evt.metaKey) {
          return true;
        }

        var keyCode = evt.keyCode,
            key = evt.key,
            shiftKey = evt.shiftKey;

        var isTab = key === 'Tab' || keyCode === 9;
        var isArrowUp = key === 'ArrowUp' || keyCode === 38;
        var isArrowDown = key === 'ArrowDown' || keyCode === 40;
        var isSpace = key === 'Space' || keyCode === 32;
        var isEnter = key === 'Enter' || keyCode === 13;
        // The menu needs to know if the keydown event was triggered on the menu
        this.keyDownWithinMenu_ = isEnter || isSpace;

        var focusedItemIndex = this.adapter_.getFocusedItemIndex();
        var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

        if (shiftKey && isTab && focusedItemIndex === 0) {
          this.adapter_.focusItemAtIndex(lastItemIndex);
          evt.preventDefault();
          return false;
        }

        if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
          this.adapter_.focusItemAtIndex(0);
          evt.preventDefault();
          return false;
        }

        // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
        if (isArrowUp || isArrowDown || isSpace) {
          evt.preventDefault();
        }

        if (isArrowUp) {
          if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
            this.adapter_.focusItemAtIndex(lastItemIndex);
          } else {
            this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
          }
        } else if (isArrowDown) {
          if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
            this.adapter_.focusItemAtIndex(0);
          } else {
            this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
          }
        }

        return true;
      }

      /**
       * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
       * @param {!Event} evt
       * @return {boolean}
       * @private
       */

    }, {
      key: 'handleKeyboardUp_',
      value: function handleKeyboardUp_(evt) {
        // Do nothing if Alt, Ctrl or Meta are pressed.
        if (evt.altKey || evt.ctrlKey || evt.metaKey) {
          return true;
        }

        var keyCode = evt.keyCode,
            key = evt.key;

        var isEnter = key === 'Enter' || keyCode === 13;
        var isSpace = key === 'Space' || keyCode === 32;
        var isEscape = key === 'Escape' || keyCode === 27;

        if (isEnter || isSpace) {
          // If the keydown event didn't occur on the menu, then it should
          // disregard the possible selected event.
          if (this.keyDownWithinMenu_) {
            this.handlePossibleSelected_(evt);
          }
          this.keyDownWithinMenu_ = false;
        }

        if (isEscape) {
          this.adapter_.notifyCancel();
          this.close();
        }

        return true;
      }

      /**
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handlePossibleSelected_',
      value: function handlePossibleSelected_(evt) {
        var _this2 = this;

        if (this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true') {
          return;
        }
        var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
        if (targetIndex < 0) {
          return;
        }
        // Debounce multiple selections
        if (this.selectedTriggerTimerId_) {
          return;
        }
        this.selectedTriggerTimerId_ = setTimeout(function () {
          _this2.selectedTriggerTimerId_ = 0;
          _this2.close();
          if (_this2.rememberSelection_) {
            _this2.setSelectedIndex(targetIndex);
          }
          _this2.adapter_.notifySelected({ index: targetIndex });
        }, numbers.SELECTED_TRIGGER_DELAY);
      }

      /**
       * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
       */

    }, {
      key: 'getAutoLayoutMeasurements_',
      value: function getAutoLayoutMeasurements_() {
        var anchorRect = this.adapter_.getAnchorDimensions();
        var viewport = this.adapter_.getWindowDimensions();

        return {
          viewport: viewport,
          viewportDistance: {
            top: anchorRect.top,
            right: viewport.width - anchorRect.right,
            left: anchorRect.left,
            bottom: viewport.height - anchorRect.bottom
          },
          anchorHeight: anchorRect.height,
          anchorWidth: anchorRect.width,
          menuHeight: this.dimensions_.height,
          menuWidth: this.dimensions_.width
        };
      }

      /**
       * Computes the corner of the anchor from which to animate and position the menu.
       * @return {Corner}
       * @private
       */

    }, {
      key: 'getOriginCorner_',
      value: function getOriginCorner_() {
        // Defaults: open from the top left.
        var corner = Corner.TOP_LEFT;

        var _measures_ = this.measures_,
            viewportDistance = _measures_.viewportDistance,
            anchorHeight = _measures_.anchorHeight,
            anchorWidth = _measures_.anchorWidth,
            menuHeight = _measures_.menuHeight,
            menuWidth = _measures_.menuWidth;

        var isBottomAligned = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
        var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
        var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

        var topOverflow = menuHeight - availableTop;
        var bottomOverflow = menuHeight - availableBottom;
        if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
          corner |= CornerBit.BOTTOM;
        }

        var isRtl = this.adapter_.isRtl();
        var isFlipRtl = Boolean(this.anchorCorner_ & CornerBit.FLIP_RTL);
        var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
        var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
        var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
        var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;

        var leftOverflow = menuWidth - availableLeft;
        var rightOverflow = menuWidth - availableRight;

        if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
          corner |= CornerBit.RIGHT;
        }

        return corner;
      }

      /**
       * @param {Corner} corner Origin corner of the menu.
       * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
       * @private
       */

    }, {
      key: 'getHorizontalOriginOffset_',
      value: function getHorizontalOriginOffset_(corner) {
        var anchorWidth = this.measures_.anchorWidth;

        var isRightAligned = Boolean(corner & CornerBit.RIGHT);
        var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & CornerBit.RIGHT);
        var x = 0;
        if (isRightAligned) {
          var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
          x = rightOffset;
        } else {
          var leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
          x = leftOffset;
        }
        return x;
      }

      /**
       * @param {Corner} corner Origin corner of the menu.
       * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
       * @private
       */

    }, {
      key: 'getVerticalOriginOffset_',
      value: function getVerticalOriginOffset_(corner) {
        var _measures_2 = this.measures_,
            viewport = _measures_2.viewport,
            viewportDistance = _measures_2.viewportDistance,
            anchorHeight = _measures_2.anchorHeight,
            menuHeight = _measures_2.menuHeight;

        var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);
        var MARGIN_TO_EDGE = MDCMenuFoundation.numbers.MARGIN_TO_EDGE;

        var avoidVerticalOverlap = Boolean(this.anchorCorner_ & CornerBit.BOTTOM);
        var canOverlapVertically = !avoidVerticalOverlap;
        var y = 0;

        if (isBottomAligned) {
          y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
          // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
          // anchor corner. Bottom margin is ignored in such cases.
          if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
            y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
          }
        } else {
          y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
          // adjust for when menu can overlap anchor, but too tall to be aligned to top
          // anchor corners. Top margin is ignored in that case.
          if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
            y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
          }
        }
        return y;
      }

      /**
       * @param {Corner} corner Origin corner of the menu.
       * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
       * @private
       */

    }, {
      key: 'getMenuMaxHeight_',
      value: function getMenuMaxHeight_(corner) {
        var maxHeight = 0;
        var viewportDistance = this.measures_.viewportDistance;

        var isBottomAligned = Boolean(corner & CornerBit.BOTTOM);

        // When maximum height is not specified, it is handled from css.
        if (this.anchorCorner_ & CornerBit.BOTTOM) {
          if (isBottomAligned) {
            maxHeight = viewportDistance.top + this.anchorMargin_.top;
          } else {
            maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
          }
        }

        return maxHeight;
      }

      /** @private */

    }, {
      key: 'autoPosition_',
      value: function autoPosition_() {
        var _position;

        if (!this.adapter_.hasAnchor()) {
          return;
        }

        // Compute measurements for autoposition methods reuse.
        this.measures_ = this.getAutoLayoutMeasurements_();

        var corner = this.getOriginCorner_();
        var maxMenuHeight = this.getMenuMaxHeight_(corner);
        var verticalAlignment = corner & CornerBit.BOTTOM ? 'bottom' : 'top';
        var horizontalAlignment = corner & CornerBit.RIGHT ? 'right' : 'left';
        var horizontalOffset = this.getHorizontalOriginOffset_(corner);
        var verticalOffset = this.getVerticalOriginOffset_(corner);
        var position = (_position = {}, defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset + 'px' : '0'), defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset + 'px' : '0'), _position);
        var _measures_3 = this.measures_,
            anchorWidth = _measures_3.anchorWidth,
            menuHeight = _measures_3.menuHeight,
            menuWidth = _measures_3.menuWidth;
        // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

        if (anchorWidth / menuWidth > numbers.ANCHOR_TO_MENU_WIDTH_RATIO) {
          horizontalAlignment = 'center';
        }

        // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
        // scale animation is "anchored" on the anchor.
        if (!(this.anchorCorner_ & CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > numbers.OFFSET_TO_MENU_HEIGHT_RATIO) {
          var verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
          var originPercent = corner & CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
          verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
        }

        this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
        this.adapter_.setPosition(position);
        this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

        // Clear measures after positioning is complete.
        this.measures_ = null;
      }

      /**
       * Open the menu.
       * @param {{focusIndex: ?number}=} options
       */

    }, {
      key: 'open',
      value: function open() {
        var _this3 = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$focusIndex = _ref.focusIndex,
            focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

        this.adapter_.saveFocus();

        if (!this.quickOpen_) {
          this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
        }

        this.animationRequestId_ = requestAnimationFrame(function () {
          _this3.dimensions_ = _this3.adapter_.getInnerDimensions();
          _this3.autoPosition_();
          _this3.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
          _this3.focusOnOpen_(focusIndex);
          _this3.adapter_.registerBodyClickHandler(_this3.documentClickHandler_);
          if (!_this3.quickOpen_) {
            _this3.openAnimationEndTimerId_ = setTimeout(function () {
              _this3.openAnimationEndTimerId_ = 0;
              _this3.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
            }, numbers.TRANSITION_OPEN_DURATION);
          }
        });
        this.isOpen_ = true;
      }

      /**
       * Closes the menu.
       * @param {Event=} evt
       */

    }, {
      key: 'close',
      value: function close() {
        var _this4 = this;

        var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, strings.ARIA_DISABLED_ATTR) === 'true' : false;

        if (targetIsDisabled) {
          return;
        }

        this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

        if (!this.quickOpen_) {
          this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
        }

        requestAnimationFrame(function () {
          _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
          if (!_this4.quickOpen_) {
            _this4.closeAnimationEndTimerId_ = setTimeout(function () {
              _this4.closeAnimationEndTimerId_ = 0;
              _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
            }, numbers.TRANSITION_CLOSE_DURATION);
          }
        });
        this.isOpen_ = false;
        this.adapter_.restoreFocus();
      }

      /** @return {boolean} */

    }, {
      key: 'isOpen',
      value: function isOpen() {
        return this.isOpen_;
      }

      /** @return {number} */

    }, {
      key: 'getSelectedIndex',
      value: function getSelectedIndex() {
        return this.selectedIndex_;
      }

      /**
       * @param {number} index Index of the item to set as selected.
       */

    }, {
      key: 'setSelectedIndex',
      value: function setSelectedIndex(index) {
        if (index === this.selectedIndex_) {
          return;
        }

        var prevSelectedIndex = this.selectedIndex_;
        if (prevSelectedIndex >= 0) {
          this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
          this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, cssClasses.SELECTED_LIST_ITEM);
        }

        this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
        if (this.selectedIndex_ >= 0) {
          this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
          this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, cssClasses.SELECTED_LIST_ITEM);
        }
      }
    }]);
    return MDCMenuFoundation;
  }(MDCFoundation);

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

  /** @type {string|undefined} */
  var storedTransformPropertyName_ = void 0;

  /**
   * Returns the name of the correct transform property to use on the current browser.
   * @param {!Window} globalObj
   * @param {boolean=} forceRefresh
   * @return {string}
   */
  function getTransformPropertyName(globalObj) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (storedTransformPropertyName_ === undefined || forceRefresh) {
      var el = globalObj.document.createElement('div');
      var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
      storedTransformPropertyName_ = transformPropertyName;
    }

    return storedTransformPropertyName_;
  }

  var mdcMenu = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "root", staticClass: "mdc-menu mdc-simple-menu", class: _vm.classes, style: _vm.styles, attrs: { "tabindex": "-1" } }, [_c('ul', { ref: "items", staticClass: "mdc-simple-menu__items mdc-list", attrs: { "role": "menu", "aria-hidden": "true" } }, [_vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-menu',
    props: {
      'open-from-top-left': Boolean,
      'open-from-top-right': Boolean,
      'open-from-bottom-left': Boolean,
      'open-from-bottom-right': Boolean,
      'quick-open': Boolean,
      'anchor-corner': [String, Number],
      'anchor-margin': Object
    },
    data: function data() {
      return {
        classes: {
          'mdc-simple-menu--open-from-top-left': this.openFromTopLeft,
          'mdc-simple-menu--open-from-top-right': this.openFromTopRight,
          'mdc-simple-menu--open-from-bottom-left': this.openFromBottomLeft,
          'mdc-simple-menu--open-from-bottom-right': this.openFromBottomRight
        },
        styles: {},
        items: []
      };
    },

    methods: {
      show: function show(options) {
        this.foundation.open(options);
      },
      hide: function hide() {
        this.foundation.close();
      },
      isOpen: function isOpen() {
        return this.foundation ? this.foundation.isOpen() : false;
      }
    },
    mounted: function mounted() {
      var _this = this;

      var refreshItems = function refreshItems() {
        _this.items = [].slice.call(_this.$refs.items.querySelectorAll('.mdc-list-item[role]'));
        _this.$emit('update');
      };
      this.slotObserver = new MutationObserver(function () {
        return refreshItems();
      });
      this.slotObserver.observe(this.$el, { childList: true, subtree: true });

      this._previousFocus = undefined;

      this.foundation = new MDCMenuFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$refs.root.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return Boolean(_this.$refs.items);
        },
        getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
          return target.getAttribute(attributeName);
        },
        getInnerDimensions: function getInnerDimensions() {
          return {
            width: _this.$refs.items.offsetWidth,
            height: _this.$refs.items.offsetHeight
          };
        },
        hasAnchor: function hasAnchor() {
          return _this.$refs.root.parentElement && _this.$refs.root.parentElement.classList.contains('mdc-menu-anchor');
        },
        getAnchorDimensions: function getAnchorDimensions() {
          return _this.$refs.root.parentElement.getBoundingClientRect();
        },
        getWindowDimensions: function getWindowDimensions() {
          return {
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        getNumberOfItems: function getNumberOfItems() {
          return _this.items.length;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this.$refs.root.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this.$refs.root.removeEventListener(type, handler);
        },
        registerBodyClickHandler: function registerBodyClickHandler(handler) {
          return document.body.addEventListener('click', handler);
        },
        deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
          return document.body.removeEventListener('click', handler);
        },
        getIndexForEventTarget: function getIndexForEventTarget(target) {
          return _this.items.indexOf(target);
        },
        notifySelected: function notifySelected(evtData) {
          var evt = {
            index: evtData.index,
            item: _this.items[evtData.index]
          };
          _this.$emit('select', evt);
          emitCustomEvent(_this.$el, MDCMenuFoundation.strings.SELECTED_EVENT, evt);
        },
        notifyCancel: function notifyCancel() {
          _this.$emit('cancel');
          emitCustomEvent(_this.$el, MDCMenuFoundation.strings.CANCEL_EVENT, {});
        },
        saveFocus: function saveFocus() {
          _this._previousFocus = document.activeElement;
        },
        restoreFocus: function restoreFocus() {
          if (_this._previousFocus) {
            _this._previousFocus.focus();
          }
        },
        isFocused: function isFocused() {
          return document.activeElement === _this.$refs.root;
        },
        focus: function focus() {
          return _this.$refs.root.focus();
        },
        getFocusedItemIndex: function getFocusedItemIndex() {
          return _this.items.indexOf(document.activeElement);
        },
        focusItemAtIndex: function focusItemAtIndex(index) {
          return _this.items[index].focus();
        },
        isRtl: function isRtl() {
          return getComputedStyle(_this.$refs.root).getPropertyValue('direction') === 'rtl';
        },
        setTransformOrigin: function setTransformOrigin(origin) {
          _this.$set(_this.styles, getTransformPropertyName(window) + '-origin', origin);
        },
        setPosition: function setPosition(position) {
          _this.$set(_this.styles, 'left', position.left);
          _this.$set(_this.styles, 'right', position.right);
          _this.$set(_this.styles, 'top', position.top);
          _this.$set(_this.styles, 'bottom', position.bottom);
        },
        setMaxHeight: function setMaxHeight(height) {
          _this.$set(_this.styles, 'max-height', height);
        },
        setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
          _this.items[index].setAttribute(attr, value);
        },
        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
          _this.items[index].removeAttribute(attr);
        },
        addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
          _this.items[index].classList.add(className);
        },
        rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
          _this.items[index].classList.remove(className);
        }
      });

      refreshItems();
      this.foundation.init();
      if (this.anchorCorner !== void 0) {
        this.foundation.setAnchorCorner(Number(this.anchorCorner));
      }
      if (this.anchorMargin !== void 0) {
        this.foundation.setAnchorMargin(this.anchorMargin);
      }
    },

    watch: {
      quickOpen: function quickOpen(nv) {
        this.foundation.setQuickOpen(nv);
      },
      anchorCorner: function anchorCorner(nv) {
        this.foundation.setAnchorCorner(Number(nv));
      },
      anchorMargin: function anchorMargin(nv) {
        this.foundation.setAnchorMargin(nv);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this._previousFocus = null;
      this.slotObserver.disconnect();
      this.foundation.destroy();
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
  var cssClasses$1 = {
    BOX: 'mdc-select--box',
    DISABLED: 'mdc-select--disabled',
    OPEN: 'mdc-select--open',
    ROOT: 'mdc-select',
    SCROLL_LOCK: 'mdc-select-scroll-lock'
  };

  var strings$1 = {
    CHANGE_EVENT: 'MDCSelect:change',
    BOTTOM_LINE_SELECTOR: '.mdc-select__bottom-line',
    LABEL_SELECTOR: '.mdc-select__label',
    MENU_SELECTOR: '.mdc-select__menu',
    SURFACE_SELECTOR: '.mdc-select__surface',
    SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text'
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
   * @extends MDCComponent<!MDCMenuFoundation>
   */

  var MDCMenu = function (_MDCComponent) {
    inherits(MDCMenu, _MDCComponent);

    /** @param {...?} args */
    function MDCMenu() {
      var _ref;

      classCallCheck(this, MDCMenu);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /** @private {!Element} */
      var _this = possibleConstructorReturn(this, (_ref = MDCMenu.__proto__ || Object.getPrototypeOf(MDCMenu)).call.apply(_ref, [this].concat(args)));

      _this.previousFocus_;
      return _this;
    }

    /**
     * @param {!Element} root
     * @return {!MDCMenu}
     */


    createClass(MDCMenu, [{
      key: 'show',


      /** @param {{focusIndex: ?number}=} options */
      value: function show() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$focusIndex = _ref2.focusIndex,
            focusIndex = _ref2$focusIndex === undefined ? null : _ref2$focusIndex;

        this.foundation_.open({ focusIndex: focusIndex });
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.foundation_.close();
      }

      /**
       * @param {Corner} corner Default anchor corner alignment of top-left
       *     menu corner.
       */

    }, {
      key: 'setAnchorCorner',
      value: function setAnchorCorner(corner) {
        this.foundation_.setAnchorCorner(corner);
      }

      /**
       * @param {AnchorMargin} margin
       */

    }, {
      key: 'setAnchorMargin',
      value: function setAnchorMargin(margin) {
        this.foundation_.setAnchorMargin(margin);
      }

      /**
       * Return the item container element inside the component.
       * @return {?Element}
       */

    }, {
      key: 'getOptionByIndex',


      /**
       * Return the item within the menu that is selected.
       * @param {number} index
       * @return {?Element}
       */
      value: function getOptionByIndex(index) {
        var items = this.items;

        if (index < items.length) {
          return this.items[index];
        } else {
          return null;
        }
      }

      /** @param {number} index */

    }, {
      key: 'getDefaultFoundation',


      /** @return {!MDCMenuFoundation} */
      value: function getDefaultFoundation() {
        var _this2 = this;

        return new MDCMenuFoundation({
          addClass: function addClass(className) {
            return _this2.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return _this2.root_.classList.remove(className);
          },
          hasClass: function hasClass(className) {
            return _this2.root_.classList.contains(className);
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return Boolean(_this2.itemsContainer_);
          },
          getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
            return target.getAttribute(attributeName);
          },
          getInnerDimensions: function getInnerDimensions() {
            var itemsContainer = _this2.itemsContainer_;

            return { width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight };
          },
          hasAnchor: function hasAnchor() {
            return _this2.root_.parentElement && _this2.root_.parentElement.classList.contains('mdc-menu-anchor');
          },
          getAnchorDimensions: function getAnchorDimensions() {
            return _this2.root_.parentElement.getBoundingClientRect();
          },
          getWindowDimensions: function getWindowDimensions() {
            return { width: window.innerWidth, height: window.innerHeight };
          },
          getNumberOfItems: function getNumberOfItems() {
            return _this2.items.length;
          },
          registerInteractionHandler: function registerInteractionHandler(type, handler) {
            return _this2.root_.addEventListener(type, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
            return _this2.root_.removeEventListener(type, handler);
          },
          registerBodyClickHandler: function registerBodyClickHandler(handler) {
            return document.body.addEventListener('click', handler);
          },
          deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
            return document.body.removeEventListener('click', handler);
          },
          getIndexForEventTarget: function getIndexForEventTarget(target) {
            return _this2.items.indexOf(target);
          },
          notifySelected: function notifySelected(evtData) {
            return _this2.emit(MDCMenuFoundation.strings.SELECTED_EVENT, {
              index: evtData.index,
              item: _this2.items[evtData.index]
            });
          },
          notifyCancel: function notifyCancel() {
            return _this2.emit(MDCMenuFoundation.strings.CANCEL_EVENT, {});
          },
          saveFocus: function saveFocus() {
            _this2.previousFocus_ = document.activeElement;
          },
          restoreFocus: function restoreFocus() {
            if (_this2.previousFocus_) {
              _this2.previousFocus_.focus();
            }
          },
          isFocused: function isFocused() {
            return document.activeElement === _this2.root_;
          },
          focus: function focus() {
            return _this2.root_.focus();
          },
          getFocusedItemIndex: function getFocusedItemIndex() {
            return _this2.items.indexOf(document.activeElement);
          },
          focusItemAtIndex: function focusItemAtIndex(index) {
            return _this2.items[index].focus();
          },
          isRtl: function isRtl() {
            return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
          },
          setTransformOrigin: function setTransformOrigin(origin) {
            _this2.root_.style[getTransformPropertyName(window) + '-origin'] = origin;
          },
          setPosition: function setPosition(position) {
            _this2.root_.style.left = 'left' in position ? position.left : null;
            _this2.root_.style.right = 'right' in position ? position.right : null;
            _this2.root_.style.top = 'top' in position ? position.top : null;
            _this2.root_.style.bottom = 'bottom' in position ? position.bottom : null;
          },
          setMaxHeight: function setMaxHeight(height) {
            _this2.root_.style.maxHeight = height;
          },
          setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
            return _this2.items[index].setAttribute(attr, value);
          },
          rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
            return _this2.items[index].removeAttribute(attr);
          },
          addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
            return _this2.items[index].classList.add(className);
          },
          rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
            return _this2.items[index].classList.remove(className);
          }
        });
      }
    }, {
      key: 'open',


      /** @return {boolean} */
      get: function get$$1() {
        return this.foundation_.isOpen();
      }

      /** @param {boolean} value */
      ,
      set: function set$$1(value) {
        if (value) {
          this.foundation_.open();
        } else {
          this.foundation_.close();
        }
      }
    }, {
      key: 'itemsContainer_',
      get: function get$$1() {
        return this.root_.querySelector(MDCMenuFoundation.strings.ITEMS_SELECTOR);
      }

      /**
       * Return the items within the menu. Note that this only contains the set of elements within
       * the items container that are proper list items, and not supplemental / presentational DOM
       * elements.
       * @return {!Array<!Element>}
       */

    }, {
      key: 'items',
      get: function get$$1() {
        var itemsContainer = this.itemsContainer_;

        return [].slice.call(itemsContainer.querySelectorAll('.mdc-list-item[role]'));
      }
    }, {
      key: 'selectedItemIndex',
      set: function set$$1(index) {
        this.foundation_.setSelectedIndex(index);
      }

      /** @return {number} */
      ,
      get: function get$$1() {
        return this.foundation_.getSelectedIndex();
      }

      /** @param {!boolean} rememberSelection */

    }, {
      key: 'rememberSelection',
      set: function set$$1(rememberSelection) {
        this.foundation_.setRememberSelection(rememberSelection);
      }

      /** @param {boolean} quickOpen */

    }, {
      key: 'quickOpen',
      set: function set$$1(quickOpen) {
        this.foundation_.setQuickOpen(quickOpen);
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        return new MDCMenu(root);
      }
    }]);
    return MDCMenu;
  }(MDCComponent);

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

  var OPENER_KEYS = [{ key: 'ArrowUp', keyCode: 38, forType: 'keydown' }, { key: 'ArrowDown', keyCode: 40, forType: 'keydown' }, { key: 'Space', keyCode: 32, forType: 'keyup' }];

  var MDCSelectFoundation = function (_MDCFoundation) {
    inherits(MDCSelectFoundation, _MDCFoundation);
    createClass(MDCSelectFoundation, null, [{
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
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          floatLabel: function floatLabel() /* value: boolean */{},
          activateBottomLine: function activateBottomLine() {},
          deactivateBottomLine: function deactivateBottomLine() {},
          addBodyClass: function addBodyClass() /* className: string */{},
          removeBodyClass: function removeBodyClass() /* className: string */{},
          setAttr: function setAttr() /* attr: string, value: string */{},
          rmAttr: function rmAttr() /* attr: string */{},
          computeBoundingRect: function computeBoundingRect() {
            return (/* {left: number, top: number} */{ left: 0, top: 0 }
            );
          },
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          focus: function focus() {},
          makeTabbable: function makeTabbable() {},
          makeUntabbable: function makeUntabbable() {},
          getComputedStyleValue: function getComputedStyleValue() {
            return (/* propertyName: string */ /* string */''
            );
          },
          setStyle: function setStyle() /* propertyName: string, value: string */{},
          create2dRenderingContext: function create2dRenderingContext() {
            return (/* {font: string, measureText: (string) => {width: number}} */{
                font: '',
                measureText: function measureText() {
                  return { width: 0 };
                }
              }
            );
          },
          setMenuElStyle: function setMenuElStyle() /* propertyName: string, value: string */{},
          setMenuElAttr: function setMenuElAttr() /* attr: string, value: string */{},
          rmMenuElAttr: function rmMenuElAttr() /* attr: string */{},
          getMenuElOffsetHeight: function getMenuElOffsetHeight() {
            return (/* number */0
            );
          },
          openMenu: function openMenu() /* focusIndex: number */{},
          isMenuOpen: function isMenuOpen() {
            return (/* boolean */false
            );
          },
          setSelectedTextContent: function setSelectedTextContent() /* textContent: string */{},
          getNumberOfOptions: function getNumberOfOptions() {
            return (/* number */0
            );
          },
          getTextForOptionAtIndex: function getTextForOptionAtIndex() {
            return (/* index: number */ /* string */''
            );
          },
          getValueForOptionAtIndex: function getValueForOptionAtIndex() {
            return (/* index: number */ /* string */''
            );
          },
          setAttrForOptionAtIndex: function setAttrForOptionAtIndex() /* index: number, attr: string, value: string */{},
          rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() /* index: number, attr: string */{},
          getOffsetTopForOptionAtIndex: function getOffsetTopForOptionAtIndex() {
            return (/* index: number */ /* number */0
            );
          },
          registerMenuInteractionHandler: function registerMenuInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterMenuInteractionHandler: function deregisterMenuInteractionHandler() /* type: string, handler: EventListener */{},
          notifyChange: function notifyChange() {},
          getWindowInnerHeight: function getWindowInnerHeight() {
            return (/* number */0
            );
          }
        };
      }
    }]);

    function MDCSelectFoundation(adapter) {
      classCallCheck(this, MDCSelectFoundation);

      var _this = possibleConstructorReturn(this, (MDCSelectFoundation.__proto__ || Object.getPrototypeOf(MDCSelectFoundation)).call(this, _extends(MDCSelectFoundation.defaultAdapter, adapter)));

      _this.ctx_ = null;
      _this.selectedIndex_ = -1;
      _this.disabled_ = false;
      _this.isFocused_ = false;

      /** @private {number} */
      _this.animationRequestId_ = 0;

      _this.displayHandler_ = function (evt) {
        evt.preventDefault();
        if (!_this.adapter_.isMenuOpen()) {
          _this.open_();
        }
      };
      _this.displayViaKeyboardHandler_ = function (evt) {
        return _this.handleDisplayViaKeyboard_(evt);
      };
      _this.selectionHandler_ = function (_ref) {
        var detail = _ref.detail;
        var index = detail.index;


        if (index !== _this.selectedIndex_) {
          _this.setSelectedIndex(index);
          _this.adapter_.notifyChange();
        }
        _this.close_();
      };
      _this.cancelHandler_ = function () {
        _this.close_();
        if (_this.selectedIndex_ === -1) {
          _this.adapter_.floatLabel(false);
        }
      };
      return _this;
    }

    createClass(MDCSelectFoundation, [{
      key: 'init',
      value: function init() {
        this.ctx_ = this.adapter_.create2dRenderingContext();
        this.adapter_.registerInteractionHandler('click', this.displayHandler_);
        this.adapter_.registerInteractionHandler('keydown', this.displayViaKeyboardHandler_);
        this.adapter_.registerInteractionHandler('keyup', this.displayViaKeyboardHandler_);
        this.adapter_.registerMenuInteractionHandler(MDCMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
        this.adapter_.registerMenuInteractionHandler(MDCMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
        this.resize();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        // Drop reference to context object to prevent potential leaks
        this.ctx_ = null;
        cancelAnimationFrame(this.animationRequestId_);
        this.adapter_.deregisterInteractionHandler('click', this.displayHandler_);
        this.adapter_.deregisterInteractionHandler('keydown', this.displayViaKeyboardHandler_);
        this.adapter_.deregisterInteractionHandler('keyup', this.displayViaKeyboardHandler_);
        this.adapter_.deregisterMenuInteractionHandler(MDCMenuFoundation.strings.SELECTED_EVENT, this.selectionHandler_);
        this.adapter_.deregisterMenuInteractionHandler(MDCMenuFoundation.strings.CANCEL_EVENT, this.cancelHandler_);
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        return this.selectedIndex_ >= 0 ? this.adapter_.getValueForOptionAtIndex(this.selectedIndex_) : '';
      }
    }, {
      key: 'getSelectedIndex',
      value: function getSelectedIndex() {
        return this.selectedIndex_;
      }
    }, {
      key: 'setSelectedIndex',
      value: function setSelectedIndex(index) {
        var prevSelectedIndex = this.selectedIndex_;
        if (prevSelectedIndex >= 0) {
          this.adapter_.rmAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected');
        }

        this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfOptions() ? index : -1;
        var selectedTextContent = '';
        if (this.selectedIndex_ >= 0) {
          selectedTextContent = this.adapter_.getTextForOptionAtIndex(this.selectedIndex_).trim();
          this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
          this.adapter_.floatLabel(true);
        } else {
          if (!this.adapter_.isMenuOpen()) {
            this.adapter_.floatLabel(false);
          }
        }
        this.adapter_.setSelectedTextContent(selectedTextContent);
      }
    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.disabled_;
      }
    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        var DISABLED = MDCSelectFoundation.cssClasses.DISABLED;

        this.disabled_ = disabled;
        if (this.disabled_) {
          this.adapter_.addClass(DISABLED);
          this.adapter_.setAttr('aria-disabled', 'true');
          this.adapter_.makeUntabbable();
        } else {
          this.adapter_.removeClass(DISABLED);
          this.adapter_.rmAttr('aria-disabled');
          this.adapter_.makeTabbable();
        }
      }
    }, {
      key: 'resize',
      value: function resize() {
        var font = this.adapter_.getComputedStyleValue('font');
        var letterSpacing = parseFloat(this.adapter_.getComputedStyleValue('letter-spacing'));

        if (font) {
          this.ctx_.font = font;
        } else {
          var primaryFontFamily = this.adapter_.getComputedStyleValue('font-family').split(',')[0];
          var fontSize = this.adapter_.getComputedStyleValue('font-size');
          this.ctx_.font = fontSize + ' ' + primaryFontFamily;
        }

        var maxTextLength = 0;

        for (var i = 0, l = this.adapter_.getNumberOfOptions(); i < l; i++) {
          var surfacePaddingRight = parseInt(this.adapter_.getComputedStyleValue('padding-right'), 10);
          var surfacePaddingLeft = parseInt(this.adapter_.getComputedStyleValue('padding-left'), 10);
          var selectBoxAddedPadding = surfacePaddingRight + surfacePaddingLeft;
          var txt = this.adapter_.getTextForOptionAtIndex(i).trim();

          var _ctx_$measureText = this.ctx_.measureText(txt),
              width = _ctx_$measureText.width;

          var addedSpace = letterSpacing * txt.length;

          maxTextLength = Math.max(maxTextLength, Math.ceil(width + addedSpace + selectBoxAddedPadding));
        }

        this.adapter_.setStyle('width', maxTextLength + 'px');
      }
    }, {
      key: 'open_',
      value: function open_() {
        var _this2 = this;

        this.disableScroll_();
        var OPEN = MDCSelectFoundation.cssClasses.OPEN;

        var focusIndex = this.selectedIndex_ < 0 ? 0 : this.selectedIndex_;

        this.setMenuStylesForOpenAtIndex_(focusIndex);
        this.adapter_.floatLabel(true);
        this.adapter_.activateBottomLine();
        this.adapter_.addClass(OPEN);
        this.animationRequestId_ = requestAnimationFrame(function () {
          _this2.adapter_.openMenu(focusIndex);
          _this2.isFocused_ = true;
        });
      }
    }, {
      key: 'setMenuStylesForOpenAtIndex_',
      value: function setMenuStylesForOpenAtIndex_(index) {
        var innerHeight = this.adapter_.getWindowInnerHeight();

        var _adapter_$computeBoun = this.adapter_.computeBoundingRect(),
            left = _adapter_$computeBoun.left,
            top = _adapter_$computeBoun.top;

        this.adapter_.setMenuElAttr('aria-hidden', 'true');
        this.adapter_.setMenuElStyle('display', 'block');
        var menuHeight = this.adapter_.getMenuElOffsetHeight();
        var itemOffsetTop = this.adapter_.getOffsetTopForOptionAtIndex(index);
        this.adapter_.setMenuElStyle('display', '');
        this.adapter_.rmMenuElAttr('aria-hidden');

        var adjustedTop = top - itemOffsetTop;
        var overflowsTop = adjustedTop < 0;
        var overflowsBottom = adjustedTop + menuHeight > innerHeight;
        if (overflowsTop) {
          adjustedTop = 0;
        } else if (overflowsBottom) {
          adjustedTop = Math.max(0, innerHeight - menuHeight);
        }
        this.adapter_.setMenuElStyle('left', left + 'px');
        this.adapter_.setMenuElStyle('top', adjustedTop + 'px');
        this.adapter_.setMenuElStyle('transform-origin', 'center ' + itemOffsetTop + 'px');
      }
    }, {
      key: 'close_',
      value: function close_() {
        var OPEN = MDCSelectFoundation.cssClasses.OPEN;

        this.adapter_.removeClass(OPEN);
        this.adapter_.deactivateBottomLine();
        this.adapter_.focus();
        this.enableScroll_();
      }
    }, {
      key: 'handleDisplayViaKeyboard_',
      value: function handleDisplayViaKeyboard_(evt) {
        // We use a hard-coded 2 instead of Event.AT_TARGET to avoid having to reference a browser
        // global.
        var EVENT_PHASE_AT_TARGET = 2;
        if (evt.eventPhase !== EVENT_PHASE_AT_TARGET) {
          return;
        }

        // Prevent pressing space down from scrolling the page
        var isSpaceDown = evt.type === 'keydown' && (evt.key === 'Space' || evt.keyCode === 32);
        if (isSpaceDown) {
          evt.preventDefault();
        }

        var isOpenerKey = OPENER_KEYS.some(function (_ref2) {
          var key = _ref2.key,
              keyCode = _ref2.keyCode,
              forType = _ref2.forType;

          return evt.type === forType && (evt.key === key || evt.keyCode === keyCode);
        });

        if (isOpenerKey) {
          this.displayHandler_(evt);
        }
      }
    }, {
      key: 'disableScroll_',
      value: function disableScroll_() {
        this.adapter_.addBodyClass(cssClasses$1.SCROLL_LOCK);
      }
    }, {
      key: 'enableScroll_',
      value: function enableScroll_() {
        this.adapter_.removeBodyClass(cssClasses$1.SCROLL_LOCK);
      }
    }]);
    return MDCSelectFoundation;
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
   * Adapter for MDC Select Bottom Line.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Select label into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCSelectBottomLineAdapter = function () {
    function MDCSelectBottomLineAdapter() {
      classCallCheck(this, MDCSelectBottomLineAdapter);
    }

    createClass(MDCSelectBottomLineAdapter, [{
      key: "addClass",

      /**
       * Adds a class to the bottom line element.
       * @param {string} className
       */
      value: function addClass(className) {}

      /**
       * Removes a class from the bottom line element.
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}
    }]);
    return MDCSelectBottomLineAdapter;
  }();

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

  var cssClasses$2 = {
    BOTTOM_LINE_ACTIVE: 'mdc-select__bottom-line--active'
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
   * @extends {MDCFoundation<!MDCSelectBottomLineAdapter>}
   * @final
   */

  var MDCSelectBottomLineFoundation = function (_MDCFoundation) {
    inherits(MDCSelectBottomLineFoundation, _MDCFoundation);
    createClass(MDCSelectBottomLineFoundation, [{
      key: 'activate',


      /**
       * Adds the active class to bottom line
       */
      value: function activate() {
        this.adapter_.addClass(cssClasses$2.BOTTOM_LINE_ACTIVE);
      }

      /**
       * Removes the active class from the bottom line
       */

    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.adapter_.removeClass(cssClasses$2.BOTTOM_LINE_ACTIVE);
      }

      /**
       * @param {!MDCSelectBottomLineAdapter} adapter
       */

    }], [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$2;
      }

      /**
       * {@see MDCSelectBottomLineAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCSelectBottomLineAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCSelectBottomLineAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {}
          }
        );
      }
    }]);

    function MDCSelectBottomLineFoundation(adapter) {
      classCallCheck(this, MDCSelectBottomLineFoundation);
      return possibleConstructorReturn(this, (MDCSelectBottomLineFoundation.__proto__ || Object.getPrototypeOf(MDCSelectBottomLineFoundation)).call(this, _extends(MDCSelectBottomLineFoundation.defaultAdapter, adapter)));
    }

    return MDCSelectBottomLineFoundation;
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
   * Adapter for MDC Select Label.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Select label into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCSelectLabelAdapter = function () {
    function MDCSelectLabelAdapter() {
      classCallCheck(this, MDCSelectLabelAdapter);
    }

    createClass(MDCSelectLabelAdapter, [{
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
    }]);
    return MDCSelectLabelAdapter;
  }();

  var cssClasses$3 = {
    LABEL_FLOAT_ABOVE: 'mdc-select__label--float-above'
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
   * @extends {MDCFoundation<!MDCSelectLabelAdapter>}
   * @final
   */

  var MDCSelectLabelFoundation = function (_MDCFoundation) {
    inherits(MDCSelectLabelFoundation, _MDCFoundation);
    createClass(MDCSelectLabelFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {string} */
      get: function get$$1() {
        return cssClasses$3;
      }

      /**
       * {@see MDCSelectLabelAdapter} for typing information on parameters and return
       * types.
       * @return {!MDCSelectLabelAdapter}
       */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCSelectLabelAdapter} */{
            addClass: function addClass() {},
            removeClass: function removeClass() {},
            getWidth: function getWidth() {}
          }
        );
      }

      /**
       * @param {!MDCSelectLabelAdapter} adapter
       */

    }]);

    function MDCSelectLabelFoundation(adapter) {
      classCallCheck(this, MDCSelectLabelFoundation);
      return possibleConstructorReturn(this, (MDCSelectLabelFoundation.__proto__ || Object.getPrototypeOf(MDCSelectLabelFoundation)).call(this, _extends(MDCSelectLabelFoundation.defaultAdapter, adapter)));
    }

    /**
     * Styles the label to float or defloat as necessary.
     * @param {string} value The value of the input.
     */


    createClass(MDCSelectLabelFoundation, [{
      key: 'styleFloat',
      value: function styleFloat(value) {
        var LABEL_FLOAT_ABOVE = MDCSelectLabelFoundation.cssClasses.LABEL_FLOAT_ABOVE;

        if (!!value) {
          this.adapter_.addClass(LABEL_FLOAT_ABOVE);
        } else {
          this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
        }
      }
    }]);
    return MDCSelectLabelFoundation;
  }(MDCFoundation);

  var MDCMenuSelect = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-select mdc-menu-select", class: _vm.classes, attrs: { "role": "listbox" } }, [_c('div', { ref: "surface", staticClass: "mdc-select__surface", style: _vm.surfaceStyles, attrs: { "tabindex": _vm.tabIndex } }, [_c('div', { ref: "label", staticClass: "mdc-select__label", class: _vm.labelClasses }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('div', { ref: "selectedContent", staticClass: "mdc-select__selected-text" }, [_vm._v(_vm._s(_vm.selectedTextContent))]), _vm._v(" "), _c('div', { ref: "bottomLine", staticClass: "mdc-select__bottom-line", class: _vm.bottomLineClasses })]), _vm._v(" "), _c('mdc-menu', { ref: "menu", staticClass: "mdc-select__menu", on: { "update": _vm.refreshIndex } }, [_vm._t("default")], 2)], 1);
    }, staticRenderFns: [],
    name: 'mdc-menu-select',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      multiple: Boolean,
      value: [String, Array],
      disabled: Boolean,
      label: String,
      box: Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-select--box': this.box
        },
        labelClasses: {},
        bottomLineClasses: {},
        surfaceStyles: {},
        tabIndex: 0,
        selectedTextContent: ''
      };
    },

    components: {
      'mdc-menu': mdcMenu
    },
    watch: {
      disabled: function disabled(value) {
        this.foundation && this.foundation.setDisabled(value);
      },
      value: function value() {
        this.refreshIndex();
      },
      box: function box() {
        this.$set(this.classes, 'mdc-select--box', this.box);
      }
    },
    methods: {
      refreshIndex: function refreshIndex() {
        if (this.foundation) {
          var options = this.$refs.menu.items;
          for (var i = 0; i < options.length; i++) {
            var optionValue = options[i].getAttribute('data-value') || options[i].textContent.trim();
            if (this.value == optionValue) {
              this.foundation.setSelectedIndex(i);
              //TODO: MDCFIX force float above if value is valid
              this.$set(this.labelClasses, 'mdc-select__label--float-above', true);
              return;
            }
          }
          //TODO: MDCFIX force float above if value is valid
          this.foundation.setSelectedIndex(-1);
          this.$set(this.labelClasses, 'mdc-select__label--float-above', false);
          this.$emit('change', this.foundation.getValue()); // TODO: MDCFIX
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.labelFoundation = new MDCSelectLabelFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.labelClasses, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.labelClasses, className);
        }
      });

      this.bottomLineFoundation = new MDCSelectBottomLineFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.bottomLineClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.bottomLineClasses, className);
        }
      });
      this.bottomLineFoundation.init();

      this.foundation = new MDCSelectFoundation({
        addClass: function addClass(className) {
          return _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          return _this.$delete(_this.classes, className);
        },
        floatLabel: function floatLabel(value) {
          _this.labelFoundation.styleFloat(value);
        },
        activateBottomLine: function activateBottomLine() {
          _this.bottomLineFoundation.activate();
        },
        deactivateBottomLine: function deactivateBottomLine() {
          _this.bottomLineFoundation.deactivate();
        },
        setAttr: function setAttr(attr, value) {
          return _this.$el.setAttribute(attr, value);
        },
        rmAttr: function rmAttr(attr, value) {
          return _this.$el.removeAttribute(attr, value);
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this.$refs.surface.getBoundingClientRect();
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this.$refs.surface.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this.$refs.surface.removeEventListener(type, handler);
        },
        focus: function focus() {
          return _this.$refs.surface.focus();
        },
        makeTabbable: function makeTabbable() {
          _this.tabIndex = 0;
        },
        makeUntabbable: function makeUntabbable() {
          _this.tabIndex = -1;
        },
        getComputedStyleValue: function getComputedStyleValue(prop) {
          return window.getComputedStyle(_this.$refs.surface).getPropertyValue(prop);
        },
        setStyle: function setStyle(propertyName, value) {
          return _this.$set(_this.surfaceStyles, propertyName, value);
        },
        create2dRenderingContext: function create2dRenderingContext() {
          return document.createElement('canvas').getContext('2d');
        },
        setMenuElStyle: function setMenuElStyle(propertyName, value) {
          return _this.$refs.menu.$el.style[propertyName] = value;
        },
        setMenuElAttr: function setMenuElAttr(attr, value) {
          return _this.$refs.menu.$el.setAttribute(attr, value);
        },
        rmMenuElAttr: function rmMenuElAttr(attr) {
          return _this.$refs.menu.$el.removeAttribute(attr);
        },
        getMenuElOffsetHeight: function getMenuElOffsetHeight() {
          return _this.$refs.menu.$el.offsetHeight;
        },
        openMenu: function openMenu(focusIndex) {
          return _this.$refs.menu.show({ focusIndex: focusIndex });
        },
        isMenuOpen: function isMenuOpen() {
          return _this.$refs.menu.isOpen();
        },
        setSelectedTextContent: function setSelectedTextContent(selectedTextContent) {
          _this.selectedTextContent = selectedTextContent;
        },
        getNumberOfOptions: function getNumberOfOptions() {
          return _this.$refs.menu.items.length;
        },
        getTextForOptionAtIndex: function getTextForOptionAtIndex(index$$1) {
          return _this.$refs.menu.items[index$$1].textContent.trim();
        },
        getValueForOptionAtIndex: function getValueForOptionAtIndex(index$$1) {
          return _this.$refs.menu.items[index$$1].getAttribute('data-value') || _this.$refs.menu.items[index$$1].textContent.trim();
        },
        setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index$$1, attr, value) {
          return _this.$refs.menu.items[index$$1].setAttribute(attr, value);
        },
        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index$$1, attr) {
          return _this.$refs.menu.items[index$$1].removeAttribute(attr);
        },
        getOffsetTopForOptionAtIndex: function getOffsetTopForOptionAtIndex(index$$1) {
          return _this.$refs.menu.items[index$$1].offsetTop;
        },
        registerMenuInteractionHandler: function registerMenuInteractionHandler(type, handler) {
          return _this.$refs.menu.$el.addEventListener(type, handler);
        },
        deregisterMenuInteractionHandler: function deregisterMenuInteractionHandler(type, handler) {
          return _this.$refs.menu.$el.removeEventListener(type, handler);
        },
        notifyChange: function notifyChange() {
          _this.$emit('change', _this.foundation.getValue());
        },
        getWindowInnerHeight: function getWindowInnerHeight() {
          return window.innerHeight;
        },
        addBodyClass: function addBodyClass(className) {
          return document.body.classList.add(className);
        },
        removeBodyClass: function removeBodyClass(className) {
          return document.body.classList.remove(className);
        }
      });

      //TODO: MDCFIX
      var foundation = this.foundation;
      if (foundation) {
        foundation.resize = function () {
          if (!foundation.ctx_) {
            return;
          }
          var font = foundation.adapter_.getComputedStyleValue('font');
          var letterSpacing = parseFloat(foundation.adapter_.getComputedStyleValue('letter-spacing'));
          if (font) {
            foundation.ctx_.font = font;
          } else {
            var primaryFontFamily = foundation.adapter_.getComputedStyleValue('font-family').split(',')[0];
            var fontSize = foundation.adapter_.getComputedStyleValue('font-size');
            foundation.ctx_.font = fontSize + ' ' + primaryFontFamily;
          }

          var maxTextLength = 0;

          var surfacePaddingRight = parseInt(foundation.adapter_.getComputedStyleValue('padding-right'), 10);
          var surfacePaddingLeft = parseInt(foundation.adapter_.getComputedStyleValue('padding-left'), 10);
          var selectBoxAddedPadding = surfacePaddingRight + surfacePaddingLeft;

          for (var i = 0, l = foundation.adapter_.getNumberOfOptions(); i < l; i++) {
            var txt = foundation.adapter_.getTextForOptionAtIndex(i).trim();

            var _foundation$ctx_$meas = foundation.ctx_.measureText(txt),
                _width = _foundation$ctx_$meas.width;

            var _addedSpace = letterSpacing * txt.length;

            maxTextLength = Math.max(maxTextLength, Math.ceil(_width + _addedSpace + selectBoxAddedPadding));
          }

          var labelTxt = _this.label;

          var _foundation$ctx_$meas2 = foundation.ctx_.measureText(labelTxt),
              width = _foundation$ctx_$meas2.width;

          var addedSpace = letterSpacing * labelTxt.length;

          maxTextLength = Math.max(maxTextLength, Math.ceil(width + addedSpace + selectBoxAddedPadding));

          foundation.adapter_.setStyle('width', maxTextLength + 'px');
        };
      }
      ///
      this.labelFoundation.init();
      this.foundation.init();
      this.foundation.setDisabled(this.disabled);
      this.refreshIndex();
      if (this.value !== this.foundation.getValue()) {
        this.$emit('change', this.foundation.getValue());
      }
    },
    beforeDestroy: function beforeDestroy() {
      var foundation = this.foundation;
      this.foundation = null;
      foundation.destroy();

      var labelFoundation = this.labelFoundation;
      this.labelFoundation = null;
      labelFoundation.destroy();

      var bottomLineFoundation = this.bottomLineFoundation;
      this.bottomLineFoundation = null;
      bottomLineFoundation.destroy();
    }
  };

  var MDCMultiSelect = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('select', { directives: [{ name: "model", rawName: "v-model", value: _vm.selected, expression: "selected" }], ref: "root", staticClass: "mdc-select mdc-multi-select mdc-list", style: _vm.styles, attrs: { "multiple": _vm.multiple, "disabled": _vm.disabled }, on: { "change": [function ($event) {
            var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
              return o.selected;
            }).map(function (o) {
              var val = "_value" in o ? o._value : o.value;return val;
            });_vm.selected = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
          }, _vm.onChange] } }, [_vm.label ? _c('optgroup', { ref: "optgroup", staticClass: "mdc-list-group", attrs: { "label": _vm.label } }, [_vm._t("default")], 2) : _vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-multi-select',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      multiple: Boolean,
      value: [String, Array],
      disabled: Boolean,
      label: String,
      maxSize: {
        type: [String, Number],
        default: 4
      }
    },
    data: function data() {
      return {
        selected: this.value,
        size: undefined,
        count: undefined
      };
    },

    computed: {
      styles: function styles() {
        var scroll = this.count > this.size;
        var size = 48 * this.size + (scroll ? 0 : 16);

        var styles = {
          'height': size + 'px',
          'overflow-y': scroll ? 'scroll' : 'hidden'
        };
        if (!scroll) {
          styles['background-image'] = 'unset';
        }
        return styles;
      }
    },
    methods: {
      onChange: function onChange() {
        this.$emit('change', this.selected);
      }
    },
    mounted: function mounted() {
      var _this = this;

      var refreshSize = function refreshSize() {
        var count = _this.$refs.root.querySelectorAll('option, optgroup').length;
        _this.count = count;
        var max = Number(_this.maxSize);
        if (_this.label) {
          max += 1;
        }
        _this.size = Math.min(count, max);
      };

      this.slotObserver = new MutationObserver(function () {
        return refreshSize();
      });
      this.slotObserver.observe(this.$el, { childList: true, subtree: true });

      refreshSize();
    },
    beforeDestroy: function beforeDestroy() {
      this.slotObserver.disconnect();
    }
  };

  var media = new (function () {
    function _class() {
      classCallCheck(this, _class);
    }

    createClass(_class, [{
      key: 'mobile',
      get: function get$$1() {
        return this._mobile || (this._mobile = window.matchMedia('(max-width: 600px) and (pointer: coarse)'));
      }
    }]);
    return _class;
  }())();

  var mdcSelect = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.type, _vm._b({ tag: "component", attrs: { "multiple": _vm.multiple, "label": _vm.label, "value": _vm.value }, on: { "change": _vm.onChange } }, 'component', _vm.$attrs, false), [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-select',
    mixins: [DispatchFocusMixin],
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      multiple: Boolean,
      value: [String, Array],
      label: String,
      native: Boolean,
      menu: Boolean
    },
    provide: function provide() {
      return { mdcSelect: this };
    },

    components: {
      'mdc-native-select': MDCNativeSelect,
      'mdc-menu-select': MDCMenuSelect,
      'mdc-multi-select': MDCMultiSelect
    },
    data: function data() {
      return {
        mobile: window ? media.mobile.matches : true
      };
    },

    computed: {
      type: function type() {
        return this.multiple ? 'mdc-multi-select' : this.menu ? 'mdc-menu-select' : this.isNative ? 'mdc-native-select' : 'mdc-menu-select';
      },
      isNative: function isNative() {
        return this.native || this.multiple || this.mobile;
      }
    },
    methods: {
      onChange: function onChange(value) {
        this.$emit('change', value);
      },
      refreshMedia: function refreshMedia() {
        this.mobile = media.mobile.matches;
      }
    },
    beforeMount: function beforeMount() {
      media.mobile.addListener(this.refreshMedia);
      this.refreshMedia();
    },
    beforeDestroy: function beforeDestroy() {
      media.mobile.removeListener(this.refreshMedia);
    }
  };

  var MDCNativeOption = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.hasValue ? _c('option', { staticClass: "mdc-option mdc-native-option", attrs: { "disabled": _vm.disabled }, domProps: { "value": _vm.value } }, [_vm._t("default")], 2) : _c('option', { staticClass: "mdc-option mdc-native-option", attrs: { "disabled": _vm.disabled } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-native-option',
    props: {
      value: String,
      disabled: Boolean
    },
    computed: {
      hasValue: function hasValue() {
        return !(typeof this.value === 'undefined');
      }
    }
  };

  var MDCMenuOption = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-option mdc-menu-option mdc-list-item", attrs: { "role": "option", "tabindex": _vm.disabled ? -1 : 0, "aria-disabled": _vm.disabled, "data-value": _vm.value } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-menu-option',
    props: {
      value: String,
      disabled: Boolean
    }
  };

  var MDCMultiOption = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.hasValue ? _c('option', { staticClass: "mdc-option mdc-multi-option mdc-list-item", attrs: { "disabled": _vm.disabled }, domProps: { "value": _vm.value } }, [_vm._t("default")], 2) : _c('option', { staticClass: "mdc-option mdc-multi-option mdc-list-item", attrs: { "disabled": _vm.disabled } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-multi-option',
    props: {
      value: String,
      disabled: Boolean
    },
    computed: {
      hasValue: function hasValue() {
        return !(typeof this.value === 'undefined');
      }
    }
  };

  var mdcOption = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.type, { tag: "component", attrs: { "disabled": _vm.disabled, "value": _vm.value } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-option',
    props: {
      value: String,
      disabled: Boolean
    },
    inject: ['mdcSelect'],
    components: {
      'mdc-native-option': MDCNativeOption,
      'mdc-multi-option': MDCMultiOption,
      'mdc-menu-option': MDCMenuOption
    },
    computed: {
      isNative: function isNative() {
        return this.mdcSelect.isNative;
      },
      multiple: function multiple() {
        return this.mdcSelect.multiple;
      },
      menu: function menu() {
        return this.mdcSelect.menu;
      },
      type: function type() {
        return this.multiple ? 'mdc-multi-option' : this.menu ? 'mdc-menu-option' : this.isNative ? 'mdc-native-option' : 'mdc-menu-option';
      }
    }
  };

  var plugin = BasePlugin({
    mdcSelect: mdcSelect,
    mdcOption: mdcOption
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1uYXRpdmUtc2VsZWN0LnZ1ZSIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL21lbnUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL21lbnUvdXRpbC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvbWVudS9tZGMtbWVudS52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zZWxlY3QvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zZWxlY3QvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0L2JvdHRvbS1saW5lL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NlbGVjdC9ib3R0b20tbGluZS9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3NlbGVjdC9ib3R0b20tbGluZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zZWxlY3QvbGFiZWwvYWRhcHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0L2xhYmVsL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2VsZWN0L2xhYmVsL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtbWVudS1zZWxlY3QudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvbWRjLW11bHRpLXNlbGVjdC52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtc2VsZWN0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1uYXRpdmUtb3B0aW9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1tZW51LW9wdGlvbi52dWUiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9tZGMtbXVsdGktb3B0aW9uLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L21kYy1vcHRpb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3NlbGVjdC9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuICB7aGFzRm9jdXM6IGZhbHNlfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIG9uRm9jdXNFdmVudCAoKSB7XG4gICAgICAvLyBkaXNwYXRjaCBhc3luYyB0byBsZXQgdGltZSB0byBvdGhlciBmb2N1cyBldmVudCB0byBwcm9wYWdhdGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgb25CbHVyRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICAvLyBhbHNvIGZpbHR1ciBibHVyIGlmIG1vdXNlZG93blxuICAgICAgdGhpcy5fYWN0aXZlIHx8IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgZGlzcGF0Y2hGb2N1c0V2ZW50KCkge1xuICAgICAgbGV0IGhhc0ZvY3VzID0gdGhpcy4kZWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy4kZWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgICBpZiAoaGFzRm9jdXMgIT0gdGhpcy5oYXNGb2N1cykge1xuICAgICAgICB0aGlzLiRlbWl0KGhhc0ZvY3VzID8gJ2ZvY3VzJyA6ICdibHVyJylcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGhhc0ZvY3VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxzZWxlY3QgcmVmPVwicm9vdFwiIGNsYXNzPVwibWRjLXNlbGVjdCBtZGMtbmF0aXZlLXNlbGVjdFwiIFxuICAgIHYtbW9kZWw9XCJzZWxlY3RlZFwiIDpkaXNhYmxlZD1cImRpc2FibGVkXCJcbiAgICBAY2hhbmdlPVwib25DaGFuZ2VcIlxuICA+XG4gICAgPG9wdGlvbiBkaXNhYmxlZCB2YWx1ZT1cIlwiIHYtaWY9XCJsYWJlbFwiPnt7IGxhYmVsIH19PC9vcHRpb24+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L3NlbGVjdD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtbmF0aXZlLXNlbGVjdCcsXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ3ZhbHVlJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogW1N0cmluZywgQXJyYXldLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGxhYmVsOiBTdHJpbmdcbiAgfSxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnZhbHVlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25DaGFuZ2UgKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5zZWxlY3RlZClcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWUgKG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gbmV3VmFsdWU7XG4gICAgfSxcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBNZW51LiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIGZvY3VzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ01lbnVBZGFwdGVyIHtcbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBoYXNOZWNlc3NhcnlEb20oKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH19ICovXG4gIGdldElubmVyRGltZW5zaW9ucygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGhhc0FuY2hvcigpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fSAqL1xuICBnZXRBbmNob3JEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7eyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9fSAqL1xuICBnZXRXaW5kb3dEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXROdW1iZXJPZkl0ZW1zKCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKiogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpfSBoYW5kbGVyICovXG4gIHJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXIgKi9cbiAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKiBAcGFyYW0ge3tpbmRleDogbnVtYmVyfX0gZXZ0RGF0YSAqL1xuICBub3RpZnlTZWxlY3RlZChldnREYXRhKSB7fVxuXG4gIG5vdGlmeUNhbmNlbCgpIHt9XG5cbiAgc2F2ZUZvY3VzKCkge31cblxuICByZXN0b3JlRm9jdXMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0ZvY3VzZWQoKSB7fVxuXG4gIGZvY3VzKCkge31cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRGb2N1c2VkSXRlbUluZGV4KCkgLyogbnVtYmVyICovIHt9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuICBmb2N1c0l0ZW1BdEluZGV4KGluZGV4KSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1J0bCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBvcmlnaW4gKi9cbiAgc2V0VHJhbnNmb3JtT3JpZ2luKG9yaWdpbikge31cblxuICAvKiogQHBhcmFtIHt7XG4gICogICB0b3A6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIHJpZ2h0OiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gICogICBib3R0b206IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIGxlZnQ6IChzdHJpbmd8dW5kZWZpbmVkKVxuICAqIH19IHBvc2l0aW9uICovXG4gIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gaGVpZ2h0ICovXG4gIHNldE1heEhlaWdodChoZWlnaHQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHNldEF0dHJGb3JPcHRpb25BdEluZGV4KGluZGV4LCBhdHRyLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqL1xuICBybUF0dHJGb3JPcHRpb25BdEluZGV4KGluZGV4LCBhdHRyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4KGluZGV4LCBjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBybUNsYXNzRm9yT3B0aW9uQXRJbmRleChpbmRleCwgY2xhc3NOYW1lKSB7fVxufVxuXG5leHBvcnQge01EQ01lbnVBZGFwdGVyfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtbWVudScsXG4gIE9QRU46ICdtZGMtbWVudS0tb3BlbicsXG4gIEFOSU1BVElOR19PUEVOOiAnbWRjLW1lbnUtLWFuaW1hdGluZy1vcGVuJyxcbiAgQU5JTUFUSU5HX0NMT1NFRDogJ21kYy1tZW51LS1hbmltYXRpbmctY2xvc2VkJyxcbiAgU0VMRUNURURfTElTVF9JVEVNOiAnbWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBJVEVNU19TRUxFQ1RPUjogJy5tZGMtbWVudV9faXRlbXMnLFxuICBTRUxFQ1RFRF9FVkVOVDogJ01EQ01lbnU6c2VsZWN0ZWQnLFxuICBDQU5DRUxfRVZFTlQ6ICdNRENNZW51OmNhbmNlbCcsXG4gIEFSSUFfRElTQUJMRURfQVRUUjogJ2FyaWEtZGlzYWJsZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICAvLyBBbW91bnQgb2YgdGltZSB0byB3YWl0IGJlZm9yZSB0cmlnZ2VyaW5nIGEgc2VsZWN0ZWQgZXZlbnQgb24gdGhlIG1lbnUuIE5vdGUgdGhhdCB0aGlzIHRpbWVcbiAgLy8gd2lsbCBtb3N0IGxpa2VseSBiZSBidW1wZWQgdXAgb25jZSBpbnRlcmFjdGl2ZSBsaXN0cyBhcmUgc3VwcG9ydGVkIHRvIGFsbG93IGZvciB0aGUgcmlwcGxlIHRvXG4gIC8vIGFuaW1hdGUgYmVmb3JlIGNsb3NpbmcgdGhlIG1lbnVcbiAgU0VMRUNURURfVFJJR0dFUl9ERUxBWTogNTAsXG4gIC8vIFRvdGFsIGR1cmF0aW9uIG9mIG1lbnUgb3BlbiBhbmltYXRpb24uXG4gIFRSQU5TSVRJT05fT1BFTl9EVVJBVElPTjogMTIwLFxuICAvLyBUb3RhbCBkdXJhdGlvbiBvZiBtZW51IGNsb3NlIGFuaW1hdGlvbi5cbiAgVFJBTlNJVElPTl9DTE9TRV9EVVJBVElPTjogNzUsXG4gIC8vIE1hcmdpbiBsZWZ0IHRvIHRoZSBlZGdlIG9mIHRoZSB2aWV3cG9ydCB3aGVuIG1lbnUgaXMgYXQgbWF4aW11bSBwb3NzaWJsZSBoZWlnaHQuXG4gIE1BUkdJTl9UT19FREdFOiAzMixcbiAgLy8gUmF0aW8gb2YgYW5jaG9yIHdpZHRoIHRvIG1lbnUgd2lkdGggZm9yIHN3aXRjaGluZyBmcm9tIGNvcm5lciBwb3NpdGlvbmluZyB0byBjZW50ZXIgcG9zaXRpb25pbmcuXG4gIEFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPOiAwLjY3LFxuICAvLyBSYXRpbyBvZiB2ZXJ0aWNhbCBvZmZzZXQgdG8gbWVudSBoZWlnaHQgZm9yIHN3aXRjaGluZyBmcm9tIGNvcm5lciB0byBtaWQtd2F5IG9yaWdpbiBwb3NpdGlvbmluZy5cbiAgT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPOiAwLjEsXG59O1xuXG4vKipcbiAqIEVudW0gZm9yIGJpdHMgaW4gdGhlIHtAc2VlIENvcm5lcikgYml0bWFwLlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuY29uc3QgQ29ybmVyQml0ID0ge1xuICBCT1RUT006IDEsXG4gIENFTlRFUjogMixcbiAgUklHSFQ6IDQsXG4gIEZMSVBfUlRMOiA4LFxufTtcblxuLyoqXG4gKiBFbnVtIGZvciByZXByZXNlbnRpbmcgYW4gZWxlbWVudCBjb3JuZXIgZm9yIHBvc2l0aW9uaW5nIHRoZSBtZW51LlxuICpcbiAqIFRoZSBTVEFSVCBjb25zdGFudHMgbWFwIHRvIExFRlQgaWYgZWxlbWVudCBkaXJlY3Rpb25hbGl0eSBpcyBsZWZ0XG4gKiB0byByaWdodCBhbmQgUklHSFQgaWYgdGhlIGRpcmVjdGlvbmFsaXR5IGlzIHJpZ2h0IHRvIGxlZnQuXG4gKiBMaWtld2lzZSBFTkQgbWFwcyB0byBSSUdIVCBvciBMRUZUIGRlcGVuZGluZyBvbiB0aGUgZGlyZWN0aW9uYWxpdHkuXG4gKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xuY29uc3QgQ29ybmVyID0ge1xuICBUT1BfTEVGVDogMCxcbiAgVE9QX1JJR0hUOiBDb3JuZXJCaXQuUklHSFQsXG4gIEJPVFRPTV9MRUZUOiBDb3JuZXJCaXQuQk9UVE9NLFxuICBCT1RUT01fUklHSFQ6IENvcm5lckJpdC5CT1RUT00gfCBDb3JuZXJCaXQuUklHSFQsXG4gIFRPUF9TVEFSVDogQ29ybmVyQml0LkZMSVBfUlRMLFxuICBUT1BfRU5EOiBDb3JuZXJCaXQuRkxJUF9SVEwgfCBDb3JuZXJCaXQuUklHSFQsXG4gIEJPVFRPTV9TVEFSVDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5GTElQX1JUTCxcbiAgQk9UVE9NX0VORDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5SSUdIVCB8IENvcm5lckJpdC5GTElQX1JUTCxcbn07XG5cblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBDb3JuZXJCaXQsIENvcm5lcn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB0b3A6IG51bWJlcixcbiAqICAgcmlnaHQ6IG51bWJlcixcbiAqICAgYm90dG9tOiBudW1iZXIsXG4gKiAgIGxlZnQ6IG51bWJlclxuICogfX1cbiAqL1xubGV0IEFuY2hvck1hcmdpbjtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgdmlld3BvcnQ6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSxcbiAqICAgdmlld3BvcnREaXN0YW5jZToge3RvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyfSxcbiAqICAgYW5jaG9ySGVpZ2h0OiBudW1iZXIsXG4gKiAgIGFuY2hvcldpZHRoOiBudW1iZXIsXG4gKiAgIG1lbnVIZWlnaHQ6IG51bWJlcixcbiAqICAgbWVudVdpZHRoOiBudW1iZXIsXG4gKiB9fVxuICovXG5sZXQgQXV0b0xheW91dE1lYXN1cmVtZW50cztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQge01EQ01lbnVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzLCBDb3JuZXIsIENvcm5lckJpdH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENNZW51QWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ01lbnVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyfSAqL1xuICBzdGF0aWMgZ2V0IENvcm5lcigpIHtcbiAgICByZXR1cm4gQ29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAc2VlIE1EQ01lbnVBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVyblxuICAgKiB0eXBlcy5cbiAgICogQHJldHVybiB7IU1EQ01lbnVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDTWVudUFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKCkgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKCkgPT4ge30sXG4gICAgICBoYXNDbGFzczogKCkgPT4gZmFsc2UsXG4gICAgICBoYXNOZWNlc3NhcnlEb206ICgpID0+IGZhbHNlLFxuICAgICAgZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQ6ICgpID0+IHt9LFxuICAgICAgZ2V0SW5uZXJEaW1lbnNpb25zOiAoKSA9PiAoe30pLFxuICAgICAgaGFzQW5jaG9yOiAoKSA9PiBmYWxzZSxcbiAgICAgIGdldEFuY2hvckRpbWVuc2lvbnM6ICgpID0+ICh7fSksXG4gICAgICBnZXRXaW5kb3dEaW1lbnNpb25zOiAoKSA9PiAoe30pLFxuICAgICAgZ2V0TnVtYmVyT2ZJdGVtczogKCkgPT4gMCxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyOiAoKSA9PiB7fSxcbiAgICAgIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQ6ICgpID0+IDAsXG4gICAgICBub3RpZnlTZWxlY3RlZDogKCkgPT4ge30sXG4gICAgICBub3RpZnlDYW5jZWw6ICgpID0+IHt9LFxuICAgICAgc2F2ZUZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIHJlc3RvcmVGb2N1czogKCkgPT4ge30sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IGZhbHNlLFxuICAgICAgZm9jdXM6ICgpID0+IHt9LFxuICAgICAgZ2V0Rm9jdXNlZEl0ZW1JbmRleDogKCkgPT4gLTEsXG4gICAgICBmb2N1c0l0ZW1BdEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIGlzUnRsOiAoKSA9PiBmYWxzZSxcbiAgICAgIHNldFRyYW5zZm9ybU9yaWdpbjogKCkgPT4ge30sXG4gICAgICBzZXRQb3NpdGlvbjogKCkgPT4ge30sXG4gICAgICBzZXRNYXhIZWlnaHQ6ICgpID0+IHt9LFxuICAgICAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgcm1BdHRyRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgICBhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgcm1DbGFzc0Zvck9wdGlvbkF0SW5kZXg6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7IU1EQ01lbnVBZGFwdGVyfSBhZGFwdGVyICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ01lbnVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5jbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVQb3NzaWJsZVNlbGVjdGVkXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5Ym9hcmREb3duXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmtleXVwSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZUtleWJvYXJkVXBfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZG9jdW1lbnRDbGlja0hhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVEb2N1bWVudENsaWNrXyhldnQpO1xuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyA9IDA7XG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNlbGVjdGVkVHJpZ2dlclRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFuaW1hdGlvblJlcXVlc3RJZF8gPSAwO1xuICAgIC8qKiBAcHJpdmF0ZSB7IXsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfX0gKi9cbiAgICB0aGlzLmRpbWVuc2lvbnNfO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaXRlbUhlaWdodF87XG4gICAgLyoqIEBwcml2YXRlIHtDb3JuZXJ9ICovXG4gICAgdGhpcy5hbmNob3JDb3JuZXJfID0gQ29ybmVyLlRPUF9TVEFSVDtcbiAgICAvKiogQHByaXZhdGUge0FuY2hvck1hcmdpbn0gKi9cbiAgICB0aGlzLmFuY2hvck1hcmdpbl8gPSB7dG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwfTtcbiAgICAvKiogQHByaXZhdGUgez9BdXRvTGF5b3V0TWVhc3VyZW1lbnRzfSAqL1xuICAgIHRoaXMubWVhc3VyZXNfID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhfID0gLTE7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMucXVpY2tPcGVuXyA9IGZhbHNlO1xuXG4gICAgLy8gQSBrZXl1cCBldmVudCBvbiB0aGUgbWVudSBuZWVkcyB0byBoYXZlIGEgY29ycmVzcG9uZGluZyBrZXlkb3duXG4gICAgLy8gZXZlbnQgb24gdGhlIG1lbnUuIElmIHRoZSB1c2VyIG9wZW5zIHRoZSBtZW51IHdpdGggYSBrZXlkb3duIGV2ZW50IG9uIGFcbiAgICAvLyBidXR0b24sIHRoZSBtZW51IHdpbGwgb25seSBnZXQgdGhlIGtleSB1cCBldmVudCBjYXVzaW5nIGJ1Z2d5IGJlaGF2aW9yIHdpdGggc2VsZWN0ZWQgZWxlbWVudHMuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gZmFsc2U7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IHtST09ULCBPUEVOfSA9IE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoUk9PVCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtST09UfSBjbGFzcyByZXF1aXJlZCBpbiByb290IGVsZW1lbnQuYCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc05lY2Vzc2FyeURvbSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlcXVpcmVkIERPTSBub2RlcyBtaXNzaW5nIGluICR7Uk9PVH0gY29tcG9uZW50LmApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE9QRU4pKSB7XG4gICAgICB0aGlzLmlzT3Blbl8gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMua2V5dXBIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkhhbmRsZXJfKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VBbmltYXRpb25FbmRUaW1lcklkXyk7XG4gICAgLy8gQ2FuY2VsIGFueSBjdXJyZW50bHkgcnVubmluZyBhbmltYXRpb25zLlxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMua2V5dXBIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIodGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUNvcm5lcn0gY29ybmVyIERlZmF1bHQgYW5jaG9yIGNvcm5lciBhbGlnbm1lbnQgb2YgdG9wLWxlZnQgbWVudSBjb3JuZXIuXG4gICAqL1xuICBzZXRBbmNob3JDb3JuZXIoY29ybmVyKSB7XG4gICAgdGhpcy5hbmNob3JDb3JuZXJfID0gY29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUFuY2hvck1hcmdpbn0gbWFyZ2luIDQtcGxldCBvZiBtYXJnaW5zIGZyb20gYW5jaG9yLlxuICAgKi9cbiAgc2V0QW5jaG9yTWFyZ2luKG1hcmdpbikge1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy50b3AgPSB0eXBlb2YgbWFyZ2luLnRvcCA9PT0gJ251bWJlcicgPyBtYXJnaW4udG9wIDogMDtcbiAgICB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgPSB0eXBlb2YgbWFyZ2luLnJpZ2h0ID09PSAnbnVtYmVyJyA/IG1hcmdpbi5yaWdodCA6IDA7XG4gICAgdGhpcy5hbmNob3JNYXJnaW5fLmJvdHRvbSA9IHR5cGVvZiBtYXJnaW4uYm90dG9tID09PSAnbnVtYmVyJyA/IG1hcmdpbi5ib3R0b20gOiAwO1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy5sZWZ0ID0gdHlwZW9mIG1hcmdpbi5sZWZ0ID09PSAnbnVtYmVyJyA/IG1hcmdpbi5sZWZ0IDogMDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHJlbWVtYmVyU2VsZWN0aW9uICovXG4gIHNldFJlbWVtYmVyU2VsZWN0aW9uKHJlbWVtYmVyU2VsZWN0aW9uKSB7XG4gICAgdGhpcy5yZW1lbWJlclNlbGVjdGlvbl8gPSByZW1lbWJlclNlbGVjdGlvbjtcbiAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoLTEpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gcXVpY2tPcGVuICovXG4gIHNldFF1aWNrT3BlbihxdWlja09wZW4pIHtcbiAgICB0aGlzLnF1aWNrT3Blbl8gPSBxdWlja09wZW47XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/bnVtYmVyfSBmb2N1c0luZGV4XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmb2N1c09uT3Blbl8oZm9jdXNJbmRleCkge1xuICAgIGlmIChmb2N1c0luZGV4ID09PSBudWxsKSB7XG4gICAgICAvLyBJZiB0aGlzIGluc3RhbmNlIG9mIE1EQ01lbnUgcmVtZW1iZXJzIHNlbGVjdGlvbnMsIGFuZCB0aGUgdXNlciBoYXNcbiAgICAgIC8vIG1hZGUgYSBzZWxlY3Rpb24sIHRoZW4gZm9jdXMgdGhlIGxhc3Qgc2VsZWN0ZWQgaXRlbVxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fICYmIHRoaXMuc2VsZWN0ZWRJbmRleF8gPj0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4Xyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1cygpO1xuICAgICAgLy8gSWYgdGhhdCBkb2Vzbid0IHdvcmssIGZvY3VzIGZpcnN0IGl0ZW0gaW5zdGVhZC5cbiAgICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChmb2N1c0luZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGNsaWNrcyBhbmQgY2FuY2VsIHRoZSBtZW51IGlmIG5vdCBhIGNoaWxkIGxpc3QtaXRlbVxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVEb2N1bWVudENsaWNrXyhldnQpIHtcbiAgICBsZXQgZWwgPSBldnQudGFyZ2V0O1xuXG4gICAgd2hpbGUgKGVsICYmIGVsICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldEluZGV4Rm9yRXZlbnRUYXJnZXQoZWwpICE9PSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlDYW5jZWwoKTtcbiAgICB0aGlzLmNsb3NlKGV2dCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBrZXlzIHRoYXQgd2Ugd2FudCB0byByZXBlYXQgb24gaG9sZCAodGFiIGFuZCBhcnJvd3MpLlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVLZXlib2FyZERvd25fKGV2dCkge1xuICAgIC8vIERvIG5vdGhpbmcgaWYgQWx0LCBDdHJsIG9yIE1ldGEgYXJlIHByZXNzZWQuXG4gICAgaWYgKGV2dC5hbHRLZXkgfHwgZXZ0LmN0cmxLZXkgfHwgZXZ0Lm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHtrZXlDb2RlLCBrZXksIHNoaWZ0S2V5fSA9IGV2dDtcbiAgICBjb25zdCBpc1RhYiA9IGtleSA9PT0gJ1RhYicgfHwga2V5Q29kZSA9PT0gOTtcbiAgICBjb25zdCBpc0Fycm93VXAgPSBrZXkgPT09ICdBcnJvd1VwJyB8fCBrZXlDb2RlID09PSAzODtcbiAgICBjb25zdCBpc0Fycm93RG93biA9IGtleSA9PT0gJ0Fycm93RG93bicgfHwga2V5Q29kZSA9PT0gNDA7XG4gICAgY29uc3QgaXNTcGFjZSA9IGtleSA9PT0gJ1NwYWNlJyB8fCBrZXlDb2RlID09PSAzMjtcbiAgICBjb25zdCBpc0VudGVyID0ga2V5ID09PSAnRW50ZXInIHx8IGtleUNvZGUgPT09IDEzO1xuICAgIC8vIFRoZSBtZW51IG5lZWRzIHRvIGtub3cgaWYgdGhlIGtleWRvd24gZXZlbnQgd2FzIHRyaWdnZXJlZCBvbiB0aGUgbWVudVxuICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gaXNFbnRlciB8fCBpc1NwYWNlO1xuXG4gICAgY29uc3QgZm9jdXNlZEl0ZW1JbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldE51bWJlck9mSXRlbXMoKSAtIDE7XG5cbiAgICBpZiAoc2hpZnRLZXkgJiYgaXNUYWIgJiYgZm9jdXNlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGxhc3RJdGVtSW5kZXgpO1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFzaGlmdEtleSAmJiBpc1RhYiAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSBsYXN0SXRlbUluZGV4KSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoMCk7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgQXJyb3d7VXAsRG93bn0gYW5kIHNwYWNlIGRvIG5vdCBjYXVzZSBpbmFkdmVydGVudCBzY3JvbGxpbmdcbiAgICBpZiAoaXNBcnJvd1VwIHx8IGlzQXJyb3dEb3duIHx8IGlzU3BhY2UpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmIChpc0Fycm93VXApIHtcbiAgICAgIGlmIChmb2N1c2VkSXRlbUluZGV4ID09PSAwIHx8IHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGxhc3RJdGVtSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGZvY3VzZWRJdGVtSW5kZXggLSAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQXJyb3dEb3duKSB7XG4gICAgICBpZiAoZm9jdXNlZEl0ZW1JbmRleCA9PT0gbGFzdEl0ZW1JbmRleCB8fCB0aGlzLmFkYXB0ZXJfLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChmb2N1c2VkSXRlbUluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGtleXMgdGhhdCB3ZSBkb24ndCB3YW50IHRvIHJlcGVhdCBvbiBob2xkIChFbnRlciwgU3BhY2UsIEVzY2FwZSkuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUtleWJvYXJkVXBfKGV2dCkge1xuICAgIC8vIERvIG5vdGhpbmcgaWYgQWx0LCBDdHJsIG9yIE1ldGEgYXJlIHByZXNzZWQuXG4gICAgaWYgKGV2dC5hbHRLZXkgfHwgZXZ0LmN0cmxLZXkgfHwgZXZ0Lm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHtrZXlDb2RlLCBrZXl9ID0gZXZ0O1xuICAgIGNvbnN0IGlzRW50ZXIgPSBrZXkgPT09ICdFbnRlcicgfHwga2V5Q29kZSA9PT0gMTM7XG4gICAgY29uc3QgaXNTcGFjZSA9IGtleSA9PT0gJ1NwYWNlJyB8fCBrZXlDb2RlID09PSAzMjtcbiAgICBjb25zdCBpc0VzY2FwZSA9IGtleSA9PT0gJ0VzY2FwZScgfHwga2V5Q29kZSA9PT0gMjc7XG5cbiAgICBpZiAoaXNFbnRlciB8fCBpc1NwYWNlKSB7XG4gICAgICAvLyBJZiB0aGUga2V5ZG93biBldmVudCBkaWRuJ3Qgb2NjdXIgb24gdGhlIG1lbnUsIHRoZW4gaXQgc2hvdWxkXG4gICAgICAvLyBkaXNyZWdhcmQgdGhlIHBvc3NpYmxlIHNlbGVjdGVkIGV2ZW50LlxuICAgICAgaWYgKHRoaXMua2V5RG93bldpdGhpbk1lbnVfKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUG9zc2libGVTZWxlY3RlZF8oZXZ0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMua2V5RG93bldpdGhpbk1lbnVfID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzRXNjYXBlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNhbmNlbCgpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfKGV2dCkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0KGV2dC50YXJnZXQsIHN0cmluZ3MuQVJJQV9ESVNBQkxFRF9BVFRSKSA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gdGhpcy5hZGFwdGVyXy5nZXRJbmRleEZvckV2ZW50VGFyZ2V0KGV2dC50YXJnZXQpO1xuICAgIGlmICh0YXJnZXRJbmRleCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVib3VuY2UgbXVsdGlwbGUgc2VsZWN0aW9uc1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVHJpZ2dlclRpbWVySWRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSAwO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgaWYgKHRoaXMucmVtZW1iZXJTZWxlY3Rpb25fKSB7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleCh0YXJnZXRJbmRleCk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeVNlbGVjdGVkKHtpbmRleDogdGFyZ2V0SW5kZXh9KTtcbiAgICB9LCBudW1iZXJzLlNFTEVDVEVEX1RSSUdHRVJfREVMQVkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0F1dG9MYXlvdXRNZWFzdXJlbWVudHN9IE1lYXN1cmVtZW50cyB1c2VkIHRvIHBvc2l0aW9uIG1lbnUgcG9wdXAuXG4gICAqL1xuICBnZXRBdXRvTGF5b3V0TWVhc3VyZW1lbnRzXygpIHtcbiAgICBjb25zdCBhbmNob3JSZWN0ID0gdGhpcy5hZGFwdGVyXy5nZXRBbmNob3JEaW1lbnNpb25zKCk7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd0RpbWVuc2lvbnMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICB2aWV3cG9ydDogdmlld3BvcnQsXG4gICAgICB2aWV3cG9ydERpc3RhbmNlOiB7XG4gICAgICAgIHRvcDogYW5jaG9yUmVjdC50b3AsXG4gICAgICAgIHJpZ2h0OiB2aWV3cG9ydC53aWR0aCAtIGFuY2hvclJlY3QucmlnaHQsXG4gICAgICAgIGxlZnQ6IGFuY2hvclJlY3QubGVmdCxcbiAgICAgICAgYm90dG9tOiB2aWV3cG9ydC5oZWlnaHQgLSBhbmNob3JSZWN0LmJvdHRvbSxcbiAgICAgIH0sXG4gICAgICBhbmNob3JIZWlnaHQ6IGFuY2hvclJlY3QuaGVpZ2h0LFxuICAgICAgYW5jaG9yV2lkdGg6IGFuY2hvclJlY3Qud2lkdGgsXG4gICAgICBtZW51SGVpZ2h0OiB0aGlzLmRpbWVuc2lvbnNfLmhlaWdodCxcbiAgICAgIG1lbnVXaWR0aDogdGhpcy5kaW1lbnNpb25zXy53aWR0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBjb3JuZXIgb2YgdGhlIGFuY2hvciBmcm9tIHdoaWNoIHRvIGFuaW1hdGUgYW5kIHBvc2l0aW9uIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtDb3JuZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRPcmlnaW5Db3JuZXJfKCkge1xuICAgIC8vIERlZmF1bHRzOiBvcGVuIGZyb20gdGhlIHRvcCBsZWZ0LlxuICAgIGxldCBjb3JuZXIgPSBDb3JuZXIuVE9QX0xFRlQ7XG5cbiAgICBjb25zdCB7dmlld3BvcnREaXN0YW5jZSwgYW5jaG9ySGVpZ2h0LCBhbmNob3JXaWR0aCwgbWVudUhlaWdodCwgbWVudVdpZHRofSA9IHRoaXMubWVhc3VyZXNfO1xuICAgIGNvbnN0IGlzQm90dG9tQWxpZ25lZCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSk7XG4gICAgY29uc3QgYXZhaWxhYmxlVG9wID0gaXNCb3R0b21BbGlnbmVkID8gdmlld3BvcnREaXN0YW5jZS50b3AgKyBhbmNob3JIZWlnaHQgKyB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tXG4gICAgICA6IHZpZXdwb3J0RGlzdGFuY2UudG9wICsgdGhpcy5hbmNob3JNYXJnaW5fLnRvcDtcbiAgICBjb25zdCBhdmFpbGFibGVCb3R0b20gPSBpc0JvdHRvbUFsaWduZWQgPyB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSAtIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b21cbiAgICAgIDogdmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuXG4gICAgY29uc3QgdG9wT3ZlcmZsb3cgPSBtZW51SGVpZ2h0IC0gYXZhaWxhYmxlVG9wO1xuICAgIGNvbnN0IGJvdHRvbU92ZXJmbG93ID0gbWVudUhlaWdodCAtIGF2YWlsYWJsZUJvdHRvbTtcbiAgICBpZiAoYm90dG9tT3ZlcmZsb3cgPiAwICYmIHRvcE92ZXJmbG93IDwgYm90dG9tT3ZlcmZsb3cpIHtcbiAgICAgIGNvcm5lciB8PSBDb3JuZXJCaXQuQk9UVE9NO1xuICAgIH1cblxuICAgIGNvbnN0IGlzUnRsID0gdGhpcy5hZGFwdGVyXy5pc1J0bCgpO1xuICAgIGNvbnN0IGlzRmxpcFJ0bCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkZMSVBfUlRMKTtcbiAgICBjb25zdCBhdm9pZEhvcml6b250YWxPdmVybGFwID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuUklHSFQpO1xuICAgIGNvbnN0IGlzQWxpZ25lZFJpZ2h0ID0gKGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgIWlzUnRsKSB8fFxuICAgICAgKCFhdm9pZEhvcml6b250YWxPdmVybGFwICYmIGlzRmxpcFJ0bCAmJiBpc1J0bCk7XG4gICAgY29uc3QgYXZhaWxhYmxlTGVmdCA9IGlzQWxpZ25lZFJpZ2h0ID8gdmlld3BvcnREaXN0YW5jZS5sZWZ0ICsgYW5jaG9yV2lkdGggKyB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOlxuICAgICAgdmlld3BvcnREaXN0YW5jZS5sZWZ0ICsgdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG4gICAgY29uc3QgYXZhaWxhYmxlUmlnaHQgPSBpc0FsaWduZWRSaWdodCA/IHZpZXdwb3J0RGlzdGFuY2UucmlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOlxuICAgICAgdmlld3BvcnREaXN0YW5jZS5yaWdodCArIGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG5cbiAgICBjb25zdCBsZWZ0T3ZlcmZsb3cgPSBtZW51V2lkdGggLSBhdmFpbGFibGVMZWZ0O1xuICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBtZW51V2lkdGggLSBhdmFpbGFibGVSaWdodDtcblxuICAgIGlmICgobGVmdE92ZXJmbG93IDwgMCAmJiBpc0FsaWduZWRSaWdodCAmJiBpc1J0bCkgfHxcbiAgICAgICAgKGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgIWlzQWxpZ25lZFJpZ2h0ICYmIGxlZnRPdmVyZmxvdyA8IDApIHx8XG4gICAgICAgIChyaWdodE92ZXJmbG93ID4gMCAmJiBsZWZ0T3ZlcmZsb3cgPCByaWdodE92ZXJmbG93KSkge1xuICAgICAgY29ybmVyIHw9IENvcm5lckJpdC5SSUdIVDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29ybmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29ybmVyfSBjb3JuZXIgT3JpZ2luIGNvcm5lciBvZiB0aGUgbWVudS5cbiAgICogQHJldHVybiB7bnVtYmVyfSBIb3Jpem9udGFsIG9mZnNldCBvZiBtZW51IG9yaWdpbiBjb3JuZXIgZnJvbSBjb3JyZXNwb25kaW5nIGFuY2hvciBjb3JuZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRIb3Jpem9udGFsT3JpZ2luT2Zmc2V0Xyhjb3JuZXIpIHtcbiAgICBjb25zdCB7YW5jaG9yV2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNSaWdodEFsaWduZWQgPSBCb29sZWFuKGNvcm5lciAmIENvcm5lckJpdC5SSUdIVCk7XG4gICAgY29uc3QgYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LlJJR0hUKTtcbiAgICBsZXQgeCA9IDA7XG4gICAgaWYgKGlzUmlnaHRBbGlnbmVkKSB7XG4gICAgICBjb25zdCByaWdodE9mZnNldCA9IGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgPyBhbmNob3JXaWR0aCAtIHRoaXMuYW5jaG9yTWFyZ2luXy5sZWZ0IDogdGhpcy5hbmNob3JNYXJnaW5fLnJpZ2h0O1xuICAgICAgeCA9IHJpZ2h0T2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA/IGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLnJpZ2h0IDogdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQ7XG4gICAgICB4ID0gbGVmdE9mZnNldDtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBPcmlnaW4gY29ybmVyIG9mIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFZlcnRpY2FsIG9mZnNldCBvZiBtZW51IG9yaWdpbiBjb3JuZXIgZnJvbSBjb3JyZXNwb25kaW5nIGFuY2hvciBjb3JuZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8oY29ybmVyKSB7XG4gICAgY29uc3Qge3ZpZXdwb3J0LCB2aWV3cG9ydERpc3RhbmNlLCBhbmNob3JIZWlnaHQsIG1lbnVIZWlnaHR9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNCb3R0b21BbGlnbmVkID0gQm9vbGVhbihjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKTtcbiAgICBjb25zdCB7TUFSR0lOX1RPX0VER0V9ID0gTURDTWVudUZvdW5kYXRpb24ubnVtYmVycztcbiAgICBjb25zdCBhdm9pZFZlcnRpY2FsT3ZlcmxhcCA9IEJvb2xlYW4odGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSk7XG4gICAgY29uc3QgY2FuT3ZlcmxhcFZlcnRpY2FsbHkgPSAhYXZvaWRWZXJ0aWNhbE92ZXJsYXA7XG4gICAgbGV0IHkgPSAwO1xuXG4gICAgaWYgKGlzQm90dG9tQWxpZ25lZCkge1xuICAgICAgeSA9IGF2b2lkVmVydGljYWxPdmVybGFwID8gYW5jaG9ySGVpZ2h0IC0gdGhpcy5hbmNob3JNYXJnaW5fLnRvcCA6IC10aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tO1xuICAgICAgLy8gYWRqdXN0IGZvciB3aGVuIG1lbnUgY2FuIG92ZXJsYXAgYW5jaG9yLCBidXQgdG9vIHRhbGwgdG8gYmUgYWxpZ25lZCB0byBib3R0b21cbiAgICAgIC8vIGFuY2hvciBjb3JuZXIuIEJvdHRvbSBtYXJnaW4gaXMgaWdub3JlZCBpbiBzdWNoIGNhc2VzLlxuICAgICAgaWYgKGNhbk92ZXJsYXBWZXJ0aWNhbGx5ICYmIG1lbnVIZWlnaHQgPiB2aWV3cG9ydERpc3RhbmNlLnRvcCArIGFuY2hvckhlaWdodCkge1xuICAgICAgICB5ID0gLShNYXRoLm1pbihtZW51SGVpZ2h0LCB2aWV3cG9ydC5oZWlnaHQgLSBNQVJHSU5fVE9fRURHRSkgLSAodmlld3BvcnREaXN0YW5jZS50b3AgKyBhbmNob3JIZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgeSA9IGF2b2lkVmVydGljYWxPdmVybGFwID8gKGFuY2hvckhlaWdodCArIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b20pIDogdGhpcy5hbmNob3JNYXJnaW5fLnRvcDtcbiAgICAgIC8vIGFkanVzdCBmb3Igd2hlbiBtZW51IGNhbiBvdmVybGFwIGFuY2hvciwgYnV0IHRvbyB0YWxsIHRvIGJlIGFsaWduZWQgdG8gdG9wXG4gICAgICAvLyBhbmNob3IgY29ybmVycy4gVG9wIG1hcmdpbiBpcyBpZ25vcmVkIGluIHRoYXQgY2FzZS5cbiAgICAgIGlmIChjYW5PdmVybGFwVmVydGljYWxseSAmJiBtZW51SGVpZ2h0ID4gdmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQpIHtcbiAgICAgICAgeSA9IC0oTWF0aC5taW4obWVudUhlaWdodCwgdmlld3BvcnQuaGVpZ2h0IC0gTUFSR0lOX1RPX0VER0UpIC0gKHZpZXdwb3J0RGlzdGFuY2UuYm90dG9tICsgYW5jaG9ySGVpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29ybmVyfSBjb3JuZXIgT3JpZ2luIGNvcm5lciBvZiB0aGUgbWVudS5cbiAgICogQHJldHVybiB7bnVtYmVyfSBNYXhpbXVtIGhlaWdodCBvZiB0aGUgbWVudSwgYmFzZWQgb24gYXZhaWxhYmxlIHNwYWNlLiAwIGluZGljYXRlcyBzaG91bGQgbm90IGJlIHNldC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE1lbnVNYXhIZWlnaHRfKGNvcm5lcikge1xuICAgIGxldCBtYXhIZWlnaHQgPSAwO1xuICAgIGNvbnN0IHt2aWV3cG9ydERpc3RhbmNlfSA9IHRoaXMubWVhc3VyZXNfO1xuICAgIGNvbnN0IGlzQm90dG9tQWxpZ25lZCA9IEJvb2xlYW4oY29ybmVyICYgQ29ybmVyQml0LkJPVFRPTSk7XG5cbiAgICAvLyBXaGVuIG1heGltdW0gaGVpZ2h0IGlzIG5vdCBzcGVjaWZpZWQsIGl0IGlzIGhhbmRsZWQgZnJvbSBjc3MuXG4gICAgaWYgKHRoaXMuYW5jaG9yQ29ybmVyXyAmIENvcm5lckJpdC5CT1RUT00pIHtcbiAgICAgIGlmIChpc0JvdHRvbUFsaWduZWQpIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gdmlld3BvcnREaXN0YW5jZS50b3AgKyB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF4SGVpZ2h0ID0gdmlld3BvcnREaXN0YW5jZS5ib3R0b20gLSB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXhIZWlnaHQ7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYXV0b1Bvc2l0aW9uXygpIHtcbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzQW5jaG9yKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIG1lYXN1cmVtZW50cyBmb3IgYXV0b3Bvc2l0aW9uIG1ldGhvZHMgcmV1c2UuXG4gICAgdGhpcy5tZWFzdXJlc18gPSB0aGlzLmdldEF1dG9MYXlvdXRNZWFzdXJlbWVudHNfKCk7XG5cbiAgICBjb25zdCBjb3JuZXIgPSB0aGlzLmdldE9yaWdpbkNvcm5lcl8oKTtcbiAgICBjb25zdCBtYXhNZW51SGVpZ2h0ID0gdGhpcy5nZXRNZW51TWF4SGVpZ2h0Xyhjb3JuZXIpO1xuICAgIGxldCB2ZXJ0aWNhbEFsaWdubWVudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKSA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgbGV0IGhvcml6b250YWxBbGlnbm1lbnQgPSAoY29ybmVyICYgQ29ybmVyQml0LlJJR0hUKSA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldCA9IHRoaXMuZ2V0SG9yaXpvbnRhbE9yaWdpbk9mZnNldF8oY29ybmVyKTtcbiAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldCA9IHRoaXMuZ2V0VmVydGljYWxPcmlnaW5PZmZzZXRfKGNvcm5lcik7XG4gICAgY29uc3QgcG9zaXRpb24gPSB7XG4gICAgICBbaG9yaXpvbnRhbEFsaWdubWVudF06IGhvcml6b250YWxPZmZzZXQgPyBob3Jpem9udGFsT2Zmc2V0ICsgJ3B4JyA6ICcwJyxcbiAgICAgIFt2ZXJ0aWNhbEFsaWdubWVudF06IHZlcnRpY2FsT2Zmc2V0ID8gdmVydGljYWxPZmZzZXQgKyAncHgnIDogJzAnLFxuICAgIH07XG4gICAgY29uc3Qge2FuY2hvcldpZHRoLCBtZW51SGVpZ2h0LCBtZW51V2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgLy8gQ2VudGVyIGFsaWduIHdoZW4gYW5jaG9yIHdpZHRoIGlzIGNvbXBhcmFibGUgb3IgZ3JlYXRlciB0aGFuIG1lbnUsIG90aGVyd2lzZSBrZWVwIGNvcm5lci5cbiAgICBpZiAoYW5jaG9yV2lkdGggLyBtZW51V2lkdGggPiBudW1iZXJzLkFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPKSB7XG4gICAgICBob3Jpem9udGFsQWxpZ25tZW50ID0gJ2NlbnRlcic7XG4gICAgfVxuXG4gICAgLy8gQWRqdXN0IHZlcnRpY2FsIG9yaWdpbiB3aGVuIG1lbnUgaXMgcG9zaXRpb25lZCB3aXRoIHNpZ25pZmljYW50IG9mZnNldCBmcm9tIGFuY2hvci4gVGhpcyBpcyBkb25lIHNvIHRoYXRcbiAgICAvLyBzY2FsZSBhbmltYXRpb24gaXMgXCJhbmNob3JlZFwiIG9uIHRoZSBhbmNob3IuXG4gICAgaWYgKCEodGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSkgJiZcbiAgICAgICAgTWF0aC5hYnModmVydGljYWxPZmZzZXQgLyBtZW51SGVpZ2h0KSA+IG51bWJlcnMuT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldFBlcmNlbnQgPSBNYXRoLmFicyh2ZXJ0aWNhbE9mZnNldCAvIG1lbnVIZWlnaHQpICogMTAwO1xuICAgICAgY29uc3Qgb3JpZ2luUGVyY2VudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKSA/IDEwMCAtIHZlcnRpY2FsT2Zmc2V0UGVyY2VudCA6IHZlcnRpY2FsT2Zmc2V0UGVyY2VudDtcbiAgICAgIHZlcnRpY2FsQWxpZ25tZW50ID0gTWF0aC5yb3VuZChvcmlnaW5QZXJjZW50ICogMTAwKSAvIDEwMCArICclJztcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnNldFRyYW5zZm9ybU9yaWdpbihgJHtob3Jpem9udGFsQWxpZ25tZW50fSAke3ZlcnRpY2FsQWxpZ25tZW50fWApO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TWF4SGVpZ2h0KG1heE1lbnVIZWlnaHQgPyBtYXhNZW51SGVpZ2h0ICsgJ3B4JyA6ICcnKTtcblxuICAgIC8vIENsZWFyIG1lYXN1cmVzIGFmdGVyIHBvc2l0aW9uaW5nIGlzIGNvbXBsZXRlLlxuICAgIHRoaXMubWVhc3VyZXNfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoZSBtZW51LlxuICAgKiBAcGFyYW0ge3tmb2N1c0luZGV4OiA/bnVtYmVyfT19IG9wdGlvbnNcbiAgICovXG4gIG9wZW4oe2ZvY3VzSW5kZXggPSBudWxsfSA9IHt9KSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zYXZlRm9jdXMoKTtcblxuICAgIGlmICghdGhpcy5xdWlja09wZW5fKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX09QRU4pO1xuICAgIH1cblxuICAgIHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmRpbWVuc2lvbnNfID0gdGhpcy5hZGFwdGVyXy5nZXRJbm5lckRpbWVuc2lvbnMoKTtcbiAgICAgIHRoaXMuYXV0b1Bvc2l0aW9uXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgdGhpcy5mb2N1c09uT3Blbl8oZm9jdXNJbmRleCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcih0aGlzLmRvY3VtZW50Q2xpY2tIYW5kbGVyXyk7XG4gICAgICBpZiAoIXRoaXMucXVpY2tPcGVuXykge1xuICAgICAgICB0aGlzLm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX09QRU4pO1xuICAgICAgICB9LCBudW1iZXJzLlRSQU5TSVRJT05fT1BFTl9EVVJBVElPTik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1lbnUuXG4gICAqIEBwYXJhbSB7RXZlbnQ9fSBldnRcbiAgICovXG4gIGNsb3NlKGV2dCA9IG51bGwpIHtcbiAgICBjb25zdCB0YXJnZXRJc0Rpc2FibGVkID0gZXZ0ID9cbiAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQoZXZ0LnRhcmdldCwgc3RyaW5ncy5BUklBX0RJU0FCTEVEX0FUVFIpID09PSAndHJ1ZScgOlxuICAgICAgZmFsc2U7XG5cbiAgICBpZiAodGFyZ2V0SXNEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIodGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8pO1xuXG4gICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfQ0xPU0VEKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICAgICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQU5JTUFUSU5HX0NMT1NFRCk7XG4gICAgICAgIH0sIG51bWJlcnMuVFJBTlNJVElPTl9DTE9TRV9EVVJBVElPTik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5yZXN0b3JlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuXztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldFNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleF87XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IG9mIHRoZSBpdGVtIHRvIHNldCBhcyBzZWxlY3RlZC5cbiAgICovXG4gIHNldFNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2U2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleF87XG4gICAgaWYgKHByZXZTZWxlY3RlZEluZGV4ID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucm1BdHRyRm9yT3B0aW9uQXRJbmRleChwcmV2U2VsZWN0ZWRJbmRleCwgJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucm1DbGFzc0Zvck9wdGlvbkF0SW5kZXgocHJldlNlbGVjdGVkSW5kZXgsIGNzc0NsYXNzZXMuU0VMRUNURURfTElTVF9JVEVNKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhfID0gaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZJdGVtcygpID8gaW5kZXggOiAtMTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4XyA+PSAwKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sICdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIGNzc0NsYXNzZXMuU0VMRUNURURfTElTVF9JVEVNKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtNRENNZW51Rm91bmRhdGlvbiwgQW5jaG9yTWFyZ2lufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH0gKi9cbmxldCBzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGNvcnJlY3QgdHJhbnNmb3JtIHByb3BlcnR5IHRvIHVzZSBvbiB0aGUgY3VycmVudCBicm93c2VyLlxuICogQHBhcmFtIHshV2luZG93fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUoZ2xvYmFsT2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGNvbnN0IGVsID0gZ2xvYmFsT2JqLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRyYW5zZm9ybVByb3BlcnR5TmFtZSA9ICgndHJhbnNmb3JtJyBpbiBlbC5zdHlsZSA/ICd0cmFuc2Zvcm0nIDogJ3dlYmtpdFRyYW5zZm9ybScpO1xuICAgIHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPSB0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWU7XG4gIH1cblxuICByZXR1cm4gc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXztcbn1cblxuLyoqXG4gKiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIHRoZSBtaW5pbXVtIGFuZCB0aGUgbWF4aW11bSwgcmV0dXJuaW5nIHRoZSBjbGFtcGVkIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4gPSAwLCBtYXggPSAxKSB7XG4gIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGVhc2luZyB2YWx1ZSB0byBhcHBseSBhdCB0aW1lIHQsIGZvciBhIGdpdmVuIGN1YmljIGJlemllciBjdXJ2ZS5cbiAqIENvbnRyb2wgcG9pbnRzIFAwIGFuZCBQMyBhcmUgYXNzdW1lZCB0byBiZSAoMCwwKSBhbmQgKDEsMSksIHJlc3BlY3RpdmVseS5cbiAqIFBhcmFtZXRlcnMgYXJlIGFzIGZvbGxvd3M6XG4gKiAtIHRpbWU6IFRoZSBjdXJyZW50IHRpbWUgaW4gdGhlIGFuaW1hdGlvbiwgc2NhbGVkIGJldHdlZW4gMCBhbmQgMS5cbiAqIC0geDE6IFRoZSB4IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDEuXG4gKiAtIHkxOiBUaGUgeSB2YWx1ZSBvZiBjb250cm9sIHBvaW50IFAxLlxuICogLSB4MjogVGhlIHggdmFsdWUgb2YgY29udHJvbCBwb2ludCBQMi5cbiAqIC0geTI6IFRoZSB5IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDIuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICogQHBhcmFtIHtudW1iZXJ9IHgxXG4gKiBAcGFyYW0ge251bWJlcn0geTFcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MlxuICogQHBhcmFtIHtudW1iZXJ9IHkyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGJlemllclByb2dyZXNzKHRpbWUsIHgxLCB5MSwgeDIsIHkyKSB7XG4gIHJldHVybiBnZXRCZXppZXJDb29yZGluYXRlXyhzb2x2ZVBvc2l0aW9uRnJvbVhWYWx1ZV8odGltZSwgeDEsIHgyKSwgeTEsIHkyKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlIGEgc2luZ2xlIGNvb3JkaW5hdGUgYXQgYSBwb3NpdGlvbiBwb2ludCBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBjMSBhbmQgYzIgYXJlIHRoZSBtYXRjaGluZyBjb29yZGluYXRlIG9uIGNvbnRyb2wgcG9pbnRzIFAxIGFuZCBQMiwgcmVzcGVjdGl2ZWx5LlxuICogQ29udHJvbCBwb2ludHMgUDAgYW5kIFAzIGFyZSBhc3N1bWVkIHRvIGJlICgwLDApIGFuZCAoMSwxKSwgcmVzcGVjdGl2ZWx5LlxuICogQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvbWFzdGVyL2Nsb3N1cmUvZ29vZy9tYXRoL2Jlemllci5qcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0XG4gKiBAcGFyYW0ge251bWJlcn0gYzFcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXRCZXppZXJDb29yZGluYXRlXyh0LCBjMSwgYzIpIHtcbiAgLy8gU3BlY2lhbCBjYXNlIHN0YXJ0IGFuZCBlbmQuXG4gIGlmICh0ID09PSAwIHx8IHQgPT09IDEpIHtcbiAgICByZXR1cm4gdDtcbiAgfVxuXG4gIC8vIFN0ZXAgb25lIC0gZnJvbSA0IHBvaW50cyB0byAzXG4gIGxldCBpYzAgPSB0ICogYzE7XG4gIGxldCBpYzEgPSBjMSArIHQgKiAoYzIgLSBjMSk7XG4gIGNvbnN0IGljMiA9IGMyICsgdCAqICgxIC0gYzIpO1xuXG4gIC8vIFN0ZXAgdHdvIC0gZnJvbSAzIHBvaW50cyB0byAyXG4gIGljMCArPSB0ICogKGljMSAtIGljMCk7XG4gIGljMSArPSB0ICogKGljMiAtIGljMSk7XG5cbiAgLy8gRmluYWwgc3RlcCAtIGxhc3QgcG9pbnRcbiAgcmV0dXJuIGljMCArIHQgKiAoaWMxIC0gaWMwKTtcbn1cblxuLyoqXG4gKiBQcm9qZWN0IGEgcG9pbnQgb250byB0aGUgQmV6aWVyIGN1cnZlLCBmcm9tIGEgZ2l2ZW4gWC4gQ2FsY3VsYXRlcyB0aGUgcG9zaXRpb24gdCBhbG9uZyB0aGUgY3VydmUuXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWxpYnJhcnkvYmxvYi9tYXN0ZXIvY2xvc3VyZS9nb29nL21hdGgvYmV6aWVyLmpzLlxuICogQHBhcmFtIHtudW1iZXJ9IHhWYWxcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MVxuICogQHBhcmFtIHtudW1iZXJ9IHgyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHNvbHZlUG9zaXRpb25Gcm9tWFZhbHVlXyh4VmFsLCB4MSwgeDIpIHtcbiAgY29uc3QgRVBTSUxPTiA9IDFlLTY7XG4gIGNvbnN0IE1BWF9JVEVSQVRJT05TID0gODtcblxuICBpZiAoeFZhbCA8PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSBpZiAoeFZhbCA+PSAxKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBJbml0aWFsIGVzdGltYXRlIG9mIHQgdXNpbmcgbGluZWFyIGludGVycG9sYXRpb24uXG4gIGxldCB0ID0geFZhbDtcblxuICAvLyBUcnkgZ3JhZGllbnQgZGVzY2VudCB0byBzb2x2ZSBmb3IgdC4gSWYgaXQgd29ya3MsIGl0IGlzIHZlcnkgZmFzdC5cbiAgbGV0IHRNaW4gPSAwO1xuICBsZXQgdE1heCA9IDE7XG4gIGxldCB2YWx1ZSA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTUFYX0lURVJBVElPTlM7IGkrKykge1xuICAgIHZhbHVlID0gZ2V0QmV6aWVyQ29vcmRpbmF0ZV8odCwgeDEsIHgyKTtcbiAgICBjb25zdCBkZXJpdmF0aXZlID0gKGdldEJlemllckNvb3JkaW5hdGVfKHQgKyBFUFNJTE9OLCB4MSwgeDIpIC0gdmFsdWUpIC8gRVBTSUxPTjtcbiAgICBpZiAoTWF0aC5hYnModmFsdWUgLSB4VmFsKSA8IEVQU0lMT04pIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZGVyaXZhdGl2ZSkgPCBFUFNJTE9OKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlIDwgeFZhbCkge1xuICAgICAgICB0TWluID0gdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRNYXggPSB0O1xuICAgICAgfVxuICAgICAgdCAtPSAodmFsdWUgLSB4VmFsKSAvIGRlcml2YXRpdmU7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgdGhlIGdyYWRpZW50IGRlc2NlbnQgZ290IHN0dWNrIGluIGEgbG9jYWwgbWluaW11bSwgZS5nLiBiZWNhdXNlXG4gIC8vIHRoZSBkZXJpdmF0aXZlIHdhcyBjbG9zZSB0byAwLCB1c2UgYSBEaWNob3RvbXkgcmVmaW5lbWVudCBpbnN0ZWFkLlxuICAvLyBXZSBsaW1pdCB0aGUgbnVtYmVyIG9mIGludGVyYXRpb25zIHRvIDguXG4gIGZvciAobGV0IGkgPSAwOyBNYXRoLmFicyh2YWx1ZSAtIHhWYWwpID4gRVBTSUxPTiAmJiBpIDwgTUFYX0lURVJBVElPTlM7IGkrKykge1xuICAgIGlmICh2YWx1ZSA8IHhWYWwpIHtcbiAgICAgIHRNaW4gPSB0O1xuICAgICAgdCA9ICh0ICsgdE1heCkgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0TWF4ID0gdDtcbiAgICAgIHQgPSAodCArIHRNaW4pIC8gMjtcbiAgICB9XG4gICAgdmFsdWUgPSBnZXRCZXppZXJDb29yZGluYXRlXyh0LCB4MSwgeDIpO1xuICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQge2dldFRyYW5zZm9ybVByb3BlcnR5TmFtZSwgY2xhbXAsIGJlemllclByb2dyZXNzfTtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiByZWY9XCJyb290XCIgY2xhc3M9XCJtZGMtbWVudSBtZGMtc2ltcGxlLW1lbnVcIlxuICAgIDpjbGFzcz1cImNsYXNzZXNcIiA6c3R5bGU9XCJzdHlsZXNcIiBcbiAgICB0YWJpbmRleD1cIi0xXCI+XG4gICAgPHVsIHJlZj1cIml0ZW1zXCIgY2xhc3M9XCJtZGMtc2ltcGxlLW1lbnVfX2l0ZW1zIG1kYy1saXN0XCIgXG4gICAgICByb2xlPVwibWVudVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPHNsb3Q+PC9zbG90PlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IE1EQ01lbnVGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL21lbnUvZm91bmRhdGlvbic7XG5pbXBvcnQgeyBnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUgfSBmcm9tICdAbWF0ZXJpYWwvbWVudS91dGlsJztcbmltcG9ydCB7IGVtaXRDdXN0b21FdmVudCB9IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtbWVudScsXG4gIHByb3BzOiB7XG4gICAgJ29wZW4tZnJvbS10b3AtbGVmdCc6IEJvb2xlYW4sXG4gICAgJ29wZW4tZnJvbS10b3AtcmlnaHQnOiBCb29sZWFuLFxuICAgICdvcGVuLWZyb20tYm90dG9tLWxlZnQnOiBCb29sZWFuLFxuICAgICdvcGVuLWZyb20tYm90dG9tLXJpZ2h0JzogQm9vbGVhbixcbiAgICAncXVpY2stb3Blbic6IEJvb2xlYW4sXG4gICAgJ2FuY2hvci1jb3JuZXInOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICdhbmNob3ItbWFyZ2luJzogT2JqZWN0LFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgICdtZGMtc2ltcGxlLW1lbnUtLW9wZW4tZnJvbS10b3AtbGVmdCc6IHRoaXMub3BlbkZyb21Ub3BMZWZ0LFxuICAgICAgICAnbWRjLXNpbXBsZS1tZW51LS1vcGVuLWZyb20tdG9wLXJpZ2h0JzogdGhpcy5vcGVuRnJvbVRvcFJpZ2h0LFxuICAgICAgICAnbWRjLXNpbXBsZS1tZW51LS1vcGVuLWZyb20tYm90dG9tLWxlZnQnOiB0aGlzLm9wZW5Gcm9tQm90dG9tTGVmdCxcbiAgICAgICAgJ21kYy1zaW1wbGUtbWVudS0tb3Blbi1mcm9tLWJvdHRvbS1yaWdodCc6IHRoaXMub3BlbkZyb21Cb3R0b21SaWdodCxcbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHt9LFxuICAgICAgaXRlbXM6IFtdLFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBzaG93KG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5vcGVuKG9wdGlvbnMpO1xuICAgIH0sXG4gICAgaGlkZSgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpO1xuICAgIH0sXG4gICAgaXNPcGVuKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbiA/IHRoaXMuZm91bmRhdGlvbi5pc09wZW4oKSA6IGZhbHNlO1xuICAgIH0sXG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgY29uc3QgcmVmcmVzaEl0ZW1zID0gKCkgPT4ge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdLnNsaWNlLmNhbGwoXG4gICAgICAgIHRoaXMuJHJlZnMuaXRlbXMucXVlcnlTZWxlY3RvckFsbCgnLm1kYy1saXN0LWl0ZW1bcm9sZV0nKSxcbiAgICAgICk7XG4gICAgICB0aGlzLiRlbWl0KCd1cGRhdGUnKTtcbiAgICB9O1xuICAgIHRoaXMuc2xvdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gcmVmcmVzaEl0ZW1zKCkpO1xuICAgIHRoaXMuc2xvdE9ic2VydmVyLm9ic2VydmUodGhpcy4kZWwsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuXG4gICAgdGhpcy5fcHJldmlvdXNGb2N1cyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENNZW51Rm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSksXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJHJlZnMucm9vdC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4gQm9vbGVhbih0aGlzLiRyZWZzLml0ZW1zKSxcbiAgICAgIGdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0OiAodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSA9PlxuICAgICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgZ2V0SW5uZXJEaW1lbnNpb25zOiAoKSA9PiAoe1xuICAgICAgICB3aWR0aDogdGhpcy4kcmVmcy5pdGVtcy5vZmZzZXRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLiRyZWZzLml0ZW1zLm9mZnNldEhlaWdodCxcbiAgICAgIH0pLFxuICAgICAgaGFzQW5jaG9yOiAoKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucGFyZW50RWxlbWVudCAmJlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21kYy1tZW51LWFuY2hvcicpLFxuICAgICAgZ2V0QW5jaG9yRGltZW5zaW9uczogKCkgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5yb290LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBnZXRXaW5kb3dEaW1lbnNpb25zOiAoKSA9PiAoe1xuICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgfSksXG4gICAgICBnZXROdW1iZXJPZkl0ZW1zOiAoKSA9PiB0aGlzLml0ZW1zLmxlbmd0aCxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5yb290LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgdGhpcy4kcmVmcy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICByZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6IGhhbmRsZXIgPT5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpLFxuICAgICAgZ2V0SW5kZXhGb3JFdmVudFRhcmdldDogdGFyZ2V0ID0+IHRoaXMuaXRlbXMuaW5kZXhPZih0YXJnZXQpLFxuICAgICAgbm90aWZ5U2VsZWN0ZWQ6IGV2dERhdGEgPT4ge1xuICAgICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgICAgaW5kZXg6IGV2dERhdGEuaW5kZXgsXG4gICAgICAgICAgaXRlbTogdGhpcy5pdGVtc1tldnREYXRhLmluZGV4XSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0JywgZXZ0KTtcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KFxuICAgICAgICAgIHRoaXMuJGVsLFxuICAgICAgICAgIE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsXG4gICAgICAgICAgZXZ0LFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4ge1xuICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKTtcbiAgICAgICAgZW1pdEN1c3RvbUV2ZW50KHRoaXMuJGVsLCBNRENNZW51Rm91bmRhdGlvbi5zdHJpbmdzLkNBTkNFTF9FVkVOVCwge30pO1xuICAgICAgfSxcbiAgICAgIHNhdmVGb2N1czogKCkgPT4ge1xuICAgICAgICB0aGlzLl9wcmV2aW91c0ZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzRm9jdXMpIHtcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c0ZvY3VzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuJHJlZnMucm9vdCxcbiAgICAgIGZvY3VzOiAoKSA9PiB0aGlzLiRyZWZzLnJvb3QuZm9jdXMoKSxcbiAgICAgIGdldEZvY3VzZWRJdGVtSW5kZXg6ICgpID0+IHRoaXMuaXRlbXMuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSxcbiAgICAgIGZvY3VzSXRlbUF0SW5kZXg6IGluZGV4ID0+IHRoaXMuaXRlbXNbaW5kZXhdLmZvY3VzKCksXG4gICAgICBpc1J0bDogKCkgPT5cbiAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRyZWZzLnJvb3QpLmdldFByb3BlcnR5VmFsdWUoJ2RpcmVjdGlvbicpID09PVxuICAgICAgICAncnRsJyxcbiAgICAgIHNldFRyYW5zZm9ybU9yaWdpbjogb3JpZ2luID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KFxuICAgICAgICAgIHRoaXMuc3R5bGVzLFxuICAgICAgICAgIGAke2dldFRyYW5zZm9ybVByb3BlcnR5TmFtZSh3aW5kb3cpfS1vcmlnaW5gLFxuICAgICAgICAgIG9yaWdpbixcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBzZXRQb3NpdGlvbjogcG9zaXRpb24gPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdsZWZ0JywgcG9zaXRpb24ubGVmdCk7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywgJ3JpZ2h0JywgcG9zaXRpb24ucmlnaHQpO1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICd0b3AnLCBwb3NpdGlvbi50b3ApO1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdib3R0b20nLCBwb3NpdGlvbi5ib3R0b20pO1xuICAgICAgfSxcbiAgICAgIHNldE1heEhlaWdodDogaGVpZ2h0ID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3R5bGVzLCAnbWF4LWhlaWdodCcsIGhlaWdodCk7XG4gICAgICB9LFxuICAgICAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgYXR0ciwgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBybUF0dHJGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGF0dHIpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgfSxcbiAgICAgIGFkZENsYXNzRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICAgICAgdGhpcy5pdGVtc1tpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfSxcbiAgICAgIHJtQ2xhc3NGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmVmcmVzaEl0ZW1zKCk7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKTtcbiAgICBpZiAodGhpcy5hbmNob3JDb3JuZXIgIT09IHZvaWQgMCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldEFuY2hvckNvcm5lcihOdW1iZXIodGhpcy5hbmNob3JDb3JuZXIpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYW5jaG9yTWFyZ2luICE9PSB2b2lkIDApIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRBbmNob3JNYXJnaW4odGhpcy5hbmNob3JNYXJnaW4pO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBxdWlja09wZW4obnYpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRRdWlja09wZW4obnYpO1xuICAgIH0sXG4gICAgYW5jaG9yQ29ybmVyKG52KSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0QW5jaG9yQ29ybmVyKE51bWJlcihudikpO1xuICAgIH0sXG4gICAgYW5jaG9yTWFyZ2luKG52KSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0QW5jaG9yTWFyZ2luKG52KTtcbiAgICB9LFxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuX3ByZXZpb3VzRm9jdXMgPSBudWxsO1xuICAgIHRoaXMuc2xvdE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpO1xuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQge01EQ0ZvdW5kYXRpb24sIE1EQ0NvbXBvbmVudH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEJPWDogJ21kYy1zZWxlY3QtLWJveCcsXG4gIERJU0FCTEVEOiAnbWRjLXNlbGVjdC0tZGlzYWJsZWQnLFxuICBPUEVOOiAnbWRjLXNlbGVjdC0tb3BlbicsXG4gIFJPT1Q6ICdtZGMtc2VsZWN0JyxcbiAgU0NST0xMX0xPQ0s6ICdtZGMtc2VsZWN0LXNjcm9sbC1sb2NrJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBDSEFOR0VfRVZFTlQ6ICdNRENTZWxlY3Q6Y2hhbmdlJyxcbiAgQk9UVE9NX0xJTkVfU0VMRUNUT1I6ICcubWRjLXNlbGVjdF9fYm90dG9tLWxpbmUnLFxuICBMQUJFTF9TRUxFQ1RPUjogJy5tZGMtc2VsZWN0X19sYWJlbCcsXG4gIE1FTlVfU0VMRUNUT1I6ICcubWRjLXNlbGVjdF9fbWVudScsXG4gIFNVUkZBQ0VfU0VMRUNUT1I6ICcubWRjLXNlbGVjdF9fc3VyZmFjZScsXG4gIFNFTEVDVEVEX1RFWFRfU0VMRUNUT1I6ICcubWRjLXNlbGVjdF9fc2VsZWN0ZWQtdGV4dCcsXG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50JztcbmltcG9ydCB7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtNRENNZW51Rm91bmRhdGlvbiwgQW5jaG9yTWFyZ2lufSBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtDb3JuZXIsIENvcm5lckJpdH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIE1EQ0NvbXBvbmVudDwhTURDTWVudUZvdW5kYXRpb24+XG4gKi9cbmNsYXNzIE1EQ01lbnUgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKiogQHBhcmFtIHsuLi4/fSBhcmdzICovXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICAvKiogQHByaXZhdGUgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNGb2N1c187XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDTWVudX1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgcmV0dXJuIG5ldyBNRENNZW51KHJvb3QpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb25fLmlzT3BlbigpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgKi9cbiAgc2V0IG9wZW4odmFsdWUpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbl8ub3BlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb25fLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7e2ZvY3VzSW5kZXg6ID9udW1iZXJ9PX0gb3B0aW9ucyAqL1xuICBzaG93KHtmb2N1c0luZGV4ID0gbnVsbH0gPSB7fSkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8ub3Blbih7Zm9jdXNJbmRleDogZm9jdXNJbmRleH0pO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBEZWZhdWx0IGFuY2hvciBjb3JuZXIgYWxpZ25tZW50IG9mIHRvcC1sZWZ0XG4gICAqICAgICBtZW51IGNvcm5lci5cbiAgICovXG4gIHNldEFuY2hvckNvcm5lcihjb3JuZXIpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldEFuY2hvckNvcm5lcihjb3JuZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QW5jaG9yTWFyZ2lufSBtYXJnaW5cbiAgICovXG4gIHNldEFuY2hvck1hcmdpbihtYXJnaW4pIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldEFuY2hvck1hcmdpbihtYXJnaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgaXRlbSBjb250YWluZXIgZWxlbWVudCBpbnNpZGUgdGhlIGNvbXBvbmVudC5cbiAgICogQHJldHVybiB7P0VsZW1lbnR9XG4gICAqL1xuICBnZXQgaXRlbXNDb250YWluZXJfKCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5JVEVNU19TRUxFQ1RPUik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBpdGVtcyB3aXRoaW4gdGhlIG1lbnUuIE5vdGUgdGhhdCB0aGlzIG9ubHkgY29udGFpbnMgdGhlIHNldCBvZiBlbGVtZW50cyB3aXRoaW5cbiAgICogdGhlIGl0ZW1zIGNvbnRhaW5lciB0aGF0IGFyZSBwcm9wZXIgbGlzdCBpdGVtcywgYW5kIG5vdCBzdXBwbGVtZW50YWwgLyBwcmVzZW50YXRpb25hbCBET01cbiAgICogZWxlbWVudHMuXG4gICAqIEByZXR1cm4geyFBcnJheTwhRWxlbWVudD59XG4gICAqL1xuICBnZXQgaXRlbXMoKSB7XG4gICAgY29uc3Qge2l0ZW1zQ29udGFpbmVyXzogaXRlbXNDb250YWluZXJ9ID0gdGhpcztcbiAgICByZXR1cm4gW10uc2xpY2UuY2FsbChpdGVtc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcubWRjLWxpc3QtaXRlbVtyb2xlXScpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGl0ZW0gd2l0aGluIHRoZSBtZW51IHRoYXQgaXMgc2VsZWN0ZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcmV0dXJuIHs/RWxlbWVudH1cbiAgICovXG4gIGdldE9wdGlvbkJ5SW5kZXgoaW5kZXgpIHtcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXM7XG5cbiAgICBpZiAoaW5kZXggPCBpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAqL1xuICBzZXQgc2VsZWN0ZWRJdGVtSW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0IHNlbGVjdGVkSXRlbUluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb25fLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0geyFib29sZWFufSByZW1lbWJlclNlbGVjdGlvbiAqL1xuICBzZXQgcmVtZW1iZXJTZWxlY3Rpb24ocmVtZW1iZXJTZWxlY3Rpb24pIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFJlbWVtYmVyU2VsZWN0aW9uKHJlbWVtYmVyU2VsZWN0aW9uKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHF1aWNrT3BlbiAqL1xuICBzZXQgcXVpY2tPcGVuKHF1aWNrT3Blbikge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0UXVpY2tPcGVuKHF1aWNrT3Blbik7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ01lbnVGb3VuZGF0aW9ufSAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE1EQ01lbnVGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgaGFzTmVjZXNzYXJ5RG9tOiAoKSA9PiBCb29sZWFuKHRoaXMuaXRlbXNDb250YWluZXJfKSxcbiAgICAgIGdldEF0dHJpYnV0ZUZvckV2ZW50VGFyZ2V0OiAodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSA9PiB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpLFxuICAgICAgZ2V0SW5uZXJEaW1lbnNpb25zOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtpdGVtc0NvbnRhaW5lcl86IGl0ZW1zQ29udGFpbmVyfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7d2lkdGg6IGl0ZW1zQ29udGFpbmVyLm9mZnNldFdpZHRoLCBoZWlnaHQ6IGl0ZW1zQ29udGFpbmVyLm9mZnNldEhlaWdodH07XG4gICAgICB9LFxuICAgICAgaGFzQW5jaG9yOiAoKSA9PiB0aGlzLnJvb3RfLnBhcmVudEVsZW1lbnQgJiYgdGhpcy5yb290Xy5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbWRjLW1lbnUtYW5jaG9yJyksXG4gICAgICBnZXRBbmNob3JEaW1lbnNpb25zOiAoKSA9PiB0aGlzLnJvb3RfLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBnZXRXaW5kb3dEaW1lbnNpb25zOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH07XG4gICAgICB9LFxuICAgICAgZ2V0TnVtYmVyT2ZJdGVtczogKCkgPT4gdGhpcy5pdGVtcy5sZW5ndGgsXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICByZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6IChoYW5kbGVyKSA9PiBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcjogKGhhbmRsZXIpID0+IGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKSxcbiAgICAgIGdldEluZGV4Rm9yRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IHRoaXMuaXRlbXMuaW5kZXhPZih0YXJnZXQpLFxuICAgICAgbm90aWZ5U2VsZWN0ZWQ6IChldnREYXRhKSA9PiB0aGlzLmVtaXQoTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5TRUxFQ1RFRF9FVkVOVCwge1xuICAgICAgICBpbmRleDogZXZ0RGF0YS5pbmRleCxcbiAgICAgICAgaXRlbTogdGhpcy5pdGVtc1tldnREYXRhLmluZGV4XSxcbiAgICAgIH0pLFxuICAgICAgbm90aWZ5Q2FuY2VsOiAoKSA9PiB0aGlzLmVtaXQoTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5DQU5DRUxfRVZFTlQsIHt9KSxcbiAgICAgIHNhdmVGb2N1czogKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXZpb3VzRm9jdXNfID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNGb2N1c18pIHtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzRm9jdXNfLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpc0ZvY3VzZWQ6ICgpID0+IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMucm9vdF8sXG4gICAgICBmb2N1czogKCkgPT4gdGhpcy5yb290Xy5mb2N1cygpLFxuICAgICAgZ2V0Rm9jdXNlZEl0ZW1JbmRleDogKCkgPT4gdGhpcy5pdGVtcy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLFxuICAgICAgZm9jdXNJdGVtQXRJbmRleDogKGluZGV4KSA9PiB0aGlzLml0ZW1zW2luZGV4XS5mb2N1cygpLFxuICAgICAgaXNSdGw6ICgpID0+IGdldENvbXB1dGVkU3R5bGUodGhpcy5yb290XykuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09ICdydGwnLFxuICAgICAgc2V0VHJhbnNmb3JtT3JpZ2luOiAob3JpZ2luKSA9PiB7XG4gICAgICAgIHRoaXMucm9vdF8uc3R5bGVbYCR7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKHdpbmRvdyl9LW9yaWdpbmBdID0gb3JpZ2luO1xuICAgICAgfSxcbiAgICAgIHNldFBvc2l0aW9uOiAocG9zaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5yb290Xy5zdHlsZS5sZWZ0ID0gJ2xlZnQnIGluIHBvc2l0aW9uID8gcG9zaXRpb24ubGVmdCA6IG51bGw7XG4gICAgICAgIHRoaXMucm9vdF8uc3R5bGUucmlnaHQgPSAncmlnaHQnIGluIHBvc2l0aW9uID8gcG9zaXRpb24ucmlnaHQgOiBudWxsO1xuICAgICAgICB0aGlzLnJvb3RfLnN0eWxlLnRvcCA9ICd0b3AnIGluIHBvc2l0aW9uID8gcG9zaXRpb24udG9wIDogbnVsbDtcbiAgICAgICAgdGhpcy5yb290Xy5zdHlsZS5ib3R0b20gPSAnYm90dG9tJyBpbiBwb3NpdGlvbiA/IHBvc2l0aW9uLmJvdHRvbSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgc2V0TWF4SGVpZ2h0OiAoaGVpZ2h0KSA9PiB7XG4gICAgICAgIHRoaXMucm9vdF8uc3R5bGUubWF4SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgfSxcbiAgICAgIHNldEF0dHJGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGF0dHIsIHZhbHVlKSA9PiB0aGlzLml0ZW1zW2luZGV4XS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxuICAgICAgcm1BdHRyRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBhdHRyKSA9PiB0aGlzLml0ZW1zW2luZGV4XS5yZW1vdmVBdHRyaWJ1dGUoYXR0ciksXG4gICAgICBhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgY2xhc3NOYW1lKSA9PiB0aGlzLml0ZW1zW2luZGV4XS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICBybUNsYXNzRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBjbGFzc05hbWUpID0+IHRoaXMuaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQge01EQ01lbnVGb3VuZGF0aW9uLCBNRENNZW51LCBBbmNob3JNYXJnaW4sIENvcm5lciwgQ29ybmVyQml0fTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7TURDRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvaW5kZXgnO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge01EQ01lbnVGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvbWVudS9pbmRleCc7XG5cbmNvbnN0IE9QRU5FUl9LRVlTID0gW1xuICB7a2V5OiAnQXJyb3dVcCcsIGtleUNvZGU6IDM4LCBmb3JUeXBlOiAna2V5ZG93bid9LFxuICB7a2V5OiAnQXJyb3dEb3duJywga2V5Q29kZTogNDAsIGZvclR5cGU6ICdrZXlkb3duJ30sXG4gIHtrZXk6ICdTcGFjZScsIGtleUNvZGU6IDMyLCBmb3JUeXBlOiAna2V5dXAnfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ1NlbGVjdEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGZsb2F0TGFiZWw6ICgvKiB2YWx1ZTogYm9vbGVhbiAqLykgPT4ge30sXG4gICAgICBhY3RpdmF0ZUJvdHRvbUxpbmU6ICgpID0+IHt9LFxuICAgICAgZGVhY3RpdmF0ZUJvdHRvbUxpbmU6ICgpID0+IHt9LFxuICAgICAgYWRkQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQm9keUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0QXR0cjogKC8qIGF0dHI6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBybUF0dHI6ICgvKiBhdHRyOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyoge2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9ICovICh7bGVmdDogMCwgdG9wOiAwfSksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIG1ha2VUYWJiYWJsZTogKCkgPT4ge30sXG4gICAgICBtYWtlVW50YWJiYWJsZTogKCkgPT4ge30sXG4gICAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6ICgvKiBwcm9wZXJ0eU5hbWU6IHN0cmluZyAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgc2V0U3R5bGU6ICgvKiBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjcmVhdGUyZFJlbmRlcmluZ0NvbnRleHQ6ICgpID0+IC8qIHtmb250OiBzdHJpbmcsIG1lYXN1cmVUZXh0OiAoc3RyaW5nKSA9PiB7d2lkdGg6IG51bWJlcn19ICovICh7XG4gICAgICAgIGZvbnQ6ICcnLFxuICAgICAgICBtZWFzdXJlVGV4dDogKCkgPT4gKHt3aWR0aDogMH0pLFxuICAgICAgfSksXG4gICAgICBzZXRNZW51RWxTdHlsZTogKC8qIHByb3BlcnR5TmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE1lbnVFbEF0dHI6ICgvKiBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcm1NZW51RWxBdHRyOiAoLyogYXR0cjogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGdldE1lbnVFbE9mZnNldEhlaWdodDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBvcGVuTWVudTogKC8qIGZvY3VzSW5kZXg6IG51bWJlciAqLykgPT4ge30sXG4gICAgICBpc01lbnVPcGVuOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgc2V0U2VsZWN0ZWRUZXh0Q29udGVudDogKC8qIHRleHRDb250ZW50OiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZ2V0TnVtYmVyT2ZPcHRpb25zOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIGdldFRleHRGb3JPcHRpb25BdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgZ2V0VmFsdWVGb3JPcHRpb25BdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogc3RyaW5nICovICcnLFxuICAgICAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXg6ICgvKiBpbmRleDogbnVtYmVyLCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcm1BdHRyRm9yT3B0aW9uQXRJbmRleDogKC8qIGluZGV4OiBudW1iZXIsIGF0dHI6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBnZXRPZmZzZXRUb3BGb3JPcHRpb25BdEluZGV4OiAoLyogaW5kZXg6IG51bWJlciAqLykgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICByZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoKSA9PiB7fSxcbiAgICAgIGdldFdpbmRvd0lubmVySGVpZ2h0OiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2VsZWN0Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICAgIHRoaXMuY3R4XyA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IC0xO1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5pc0ZvY3VzZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFuaW1hdGlvblJlcXVlc3RJZF8gPSAwO1xuXG4gICAgdGhpcy5kaXNwbGF5SGFuZGxlcl8gPSAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc01lbnVPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5vcGVuXygpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5kaXNwbGF5VmlhS2V5Ym9hcmRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlRGlzcGxheVZpYUtleWJvYXJkXyhldnQpO1xuICAgIHRoaXMuc2VsZWN0aW9uSGFuZGxlcl8gPSAoe2RldGFpbH0pID0+IHtcbiAgICAgIGNvbnN0IHtpbmRleH0gPSBkZXRhaWw7XG5cbiAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5zZWxlY3RlZEluZGV4Xykge1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNoYW5nZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZV8oKTtcbiAgICB9O1xuICAgIHRoaXMuY2FuY2VsSGFuZGxlcl8gPSAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlXygpO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleF8gPT09IC0xKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbChmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jdHhfID0gdGhpcy5hZGFwdGVyXy5jcmVhdGUyZFJlbmRlcmluZ0NvbnRleHQoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuZGlzcGxheUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5kaXNwbGF5VmlhS2V5Ym9hcmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRpc3BsYXlWaWFLZXlib2FyZEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyTWVudUludGVyYWN0aW9uSGFuZGxlcihcbiAgICAgIE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuU0VMRUNURURfRVZFTlQsIHRoaXMuc2VsZWN0aW9uSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJNZW51SW50ZXJhY3Rpb25IYW5kbGVyKFxuICAgICAgTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5DQU5DRUxfRVZFTlQsIHRoaXMuY2FuY2VsSGFuZGxlcl8pO1xuICAgIHRoaXMucmVzaXplKCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIERyb3AgcmVmZXJlbmNlIHRvIGNvbnRleHQgb2JqZWN0IHRvIHByZXZlbnQgcG90ZW50aWFsIGxlYWtzXG4gICAgdGhpcy5jdHhfID0gbnVsbDtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcXVlc3RJZF8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmRpc3BsYXlIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5kaXNwbGF5VmlhS2V5Ym9hcmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGlzcGxheVZpYUtleWJvYXJkSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3Rlck1lbnVJbnRlcmFjdGlvbkhhbmRsZXIoXG4gICAgICBNRENNZW51Rm91bmRhdGlvbi5zdHJpbmdzLlNFTEVDVEVEX0VWRU5ULCB0aGlzLnNlbGVjdGlvbkhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJNZW51SW50ZXJhY3Rpb25IYW5kbGVyKFxuICAgICAgTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5DQU5DRUxfRVZFTlQsIHRoaXMuY2FuY2VsSGFuZGxlcl8pO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleF8gPj0gMCA/IHRoaXMuYWRhcHRlcl8uZ2V0VmFsdWVGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8pIDogJyc7XG4gIH1cblxuICBnZXRTZWxlY3RlZEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXhfO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGNvbnN0IHByZXZTZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4XztcbiAgICBpZiAocHJldlNlbGVjdGVkSW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ybUF0dHJGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sICdhcmlhLXNlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4XyA9IGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLmFkYXB0ZXJfLmdldE51bWJlck9mT3B0aW9ucygpID8gaW5kZXggOiAtMTtcbiAgICBsZXQgc2VsZWN0ZWRUZXh0Q29udGVudCA9ICcnO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfID49IDApIHtcbiAgICAgIHNlbGVjdGVkVGV4dENvbnRlbnQgPSB0aGlzLmFkYXB0ZXJfLmdldFRleHRGb3JPcHRpb25BdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8pLnRyaW0oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0ckZvck9wdGlvbkF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5mbG9hdExhYmVsKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNNZW51T3BlbigpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZmxvYXRMYWJlbChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWRhcHRlcl8uc2V0U2VsZWN0ZWRUZXh0Q29udGVudChzZWxlY3RlZFRleHRDb250ZW50KTtcbiAgfVxuXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRfO1xuICB9XG5cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICBjb25zdCB7RElTQUJMRUR9ID0gTURDU2VsZWN0Rm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZGlzYWJsZWQ7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWRfKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKERJU0FCTEVEKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm1ha2VVbnRhYmJhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRElTQUJMRUQpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ybUF0dHIoJ2FyaWEtZGlzYWJsZWQnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubWFrZVRhYmJhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIGNvbnN0IGZvbnQgPSB0aGlzLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgnZm9udCcpO1xuICAgIGNvbnN0IGxldHRlclNwYWNpbmcgPSBwYXJzZUZsb2F0KHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdsZXR0ZXItc3BhY2luZycpKTtcblxuICAgIGlmIChmb250KSB7XG4gICAgICB0aGlzLmN0eF8uZm9udCA9IGZvbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByaW1hcnlGb250RmFtaWx5ID0gdGhpcy5hZGFwdGVyXy5nZXRDb21wdXRlZFN0eWxlVmFsdWUoJ2ZvbnQtZmFtaWx5Jykuc3BsaXQoJywnKVswXTtcbiAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5hZGFwdGVyXy5nZXRDb21wdXRlZFN0eWxlVmFsdWUoJ2ZvbnQtc2l6ZScpO1xuICAgICAgdGhpcy5jdHhfLmZvbnQgPSBgJHtmb250U2l6ZX0gJHtwcmltYXJ5Rm9udEZhbWlseX1gO1xuICAgIH1cblxuICAgIGxldCBtYXhUZXh0TGVuZ3RoID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5hZGFwdGVyXy5nZXROdW1iZXJPZk9wdGlvbnMoKTsgaSA8IGw7IGkrKykge1xuICAgICAgY29uc3Qgc3VyZmFjZVBhZGRpbmdSaWdodCA9IHBhcnNlSW50KHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdwYWRkaW5nLXJpZ2h0JyksIDEwKTtcbiAgICAgIGNvbnN0IHN1cmZhY2VQYWRkaW5nTGVmdCA9IHBhcnNlSW50KHRoaXMuYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdwYWRkaW5nLWxlZnQnKSwgMTApO1xuICAgICAgY29uc3Qgc2VsZWN0Qm94QWRkZWRQYWRkaW5nID0gc3VyZmFjZVBhZGRpbmdSaWdodCArIHN1cmZhY2VQYWRkaW5nTGVmdDtcbiAgICAgIGNvbnN0IHR4dCA9IHRoaXMuYWRhcHRlcl8uZ2V0VGV4dEZvck9wdGlvbkF0SW5kZXgoaSkudHJpbSgpO1xuICAgICAgY29uc3Qge3dpZHRofSA9IHRoaXMuY3R4Xy5tZWFzdXJlVGV4dCh0eHQpO1xuICAgICAgY29uc3QgYWRkZWRTcGFjZSA9IGxldHRlclNwYWNpbmcgKiB0eHQubGVuZ3RoO1xuXG4gICAgICBtYXhUZXh0TGVuZ3RoID1cbiAgICAgICAgTWF0aC5tYXgobWF4VGV4dExlbmd0aCwgTWF0aC5jZWlsKHdpZHRoICsgYWRkZWRTcGFjZSArIHNlbGVjdEJveEFkZGVkUGFkZGluZykpO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8uc2V0U3R5bGUoJ3dpZHRoJywgYCR7bWF4VGV4dExlbmd0aH1weGApO1xuICB9XG5cbiAgb3Blbl8oKSB7XG4gICAgdGhpcy5kaXNhYmxlU2Nyb2xsXygpO1xuICAgIGNvbnN0IHtPUEVOfSA9IE1EQ1NlbGVjdEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCBmb2N1c0luZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4XyA8IDAgPyAwIDogdGhpcy5zZWxlY3RlZEluZGV4XztcblxuICAgIHRoaXMuc2V0TWVudVN0eWxlc0Zvck9wZW5BdEluZGV4Xyhmb2N1c0luZGV4KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmZsb2F0TGFiZWwodHJ1ZSk7XG4gICAgdGhpcy5hZGFwdGVyXy5hY3RpdmF0ZUJvdHRvbUxpbmUoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE9QRU4pO1xuICAgIHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLm9wZW5NZW51KGZvY3VzSW5kZXgpO1xuICAgICAgdGhpcy5pc0ZvY3VzZWRfID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldE1lbnVTdHlsZXNGb3JPcGVuQXRJbmRleF8oaW5kZXgpIHtcbiAgICBjb25zdCBpbm5lckhlaWdodCA9IHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93SW5uZXJIZWlnaHQoKTtcbiAgICBjb25zdCB7bGVmdCwgdG9wfSA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRNZW51RWxBdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRNZW51RWxTdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuICAgIGNvbnN0IG1lbnVIZWlnaHQgPSB0aGlzLmFkYXB0ZXJfLmdldE1lbnVFbE9mZnNldEhlaWdodCgpO1xuICAgIGNvbnN0IGl0ZW1PZmZzZXRUb3AgPSB0aGlzLmFkYXB0ZXJfLmdldE9mZnNldFRvcEZvck9wdGlvbkF0SW5kZXgoaW5kZXgpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TWVudUVsU3R5bGUoJ2Rpc3BsYXknLCAnJyk7XG4gICAgdGhpcy5hZGFwdGVyXy5ybU1lbnVFbEF0dHIoJ2FyaWEtaGlkZGVuJyk7XG5cbiAgICBsZXQgYWRqdXN0ZWRUb3AgPSB0b3AgLSBpdGVtT2Zmc2V0VG9wO1xuICAgIGNvbnN0IG92ZXJmbG93c1RvcCA9IGFkanVzdGVkVG9wIDwgMDtcbiAgICBjb25zdCBvdmVyZmxvd3NCb3R0b20gPSBhZGp1c3RlZFRvcCArIG1lbnVIZWlnaHQgPiBpbm5lckhlaWdodDtcbiAgICBpZiAob3ZlcmZsb3dzVG9wKSB7XG4gICAgICBhZGp1c3RlZFRvcCA9IDA7XG4gICAgfSBlbHNlIGlmIChvdmVyZmxvd3NCb3R0b20pIHtcbiAgICAgIGFkanVzdGVkVG9wID0gTWF0aC5tYXgoMCwgaW5uZXJIZWlnaHQgLSBtZW51SGVpZ2h0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRNZW51RWxTdHlsZSgnbGVmdCcsIGAke2xlZnR9cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldE1lbnVFbFN0eWxlKCd0b3AnLCBgJHthZGp1c3RlZFRvcH1weGApO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TWVudUVsU3R5bGUoJ3RyYW5zZm9ybS1vcmlnaW4nLCBgY2VudGVyICR7aXRlbU9mZnNldFRvcH1weGApO1xuICB9XG5cbiAgY2xvc2VfKCkge1xuICAgIGNvbnN0IHtPUEVOfSA9IE1EQ1NlbGVjdEZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9QRU4pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVhY3RpdmF0ZUJvdHRvbUxpbmUoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzKCk7XG4gICAgdGhpcy5lbmFibGVTY3JvbGxfKCk7XG4gIH1cblxuICBoYW5kbGVEaXNwbGF5VmlhS2V5Ym9hcmRfKGV2dCkge1xuICAgIC8vIFdlIHVzZSBhIGhhcmQtY29kZWQgMiBpbnN0ZWFkIG9mIEV2ZW50LkFUX1RBUkdFVCB0byBhdm9pZCBoYXZpbmcgdG8gcmVmZXJlbmNlIGEgYnJvd3NlclxuICAgIC8vIGdsb2JhbC5cbiAgICBjb25zdCBFVkVOVF9QSEFTRV9BVF9UQVJHRVQgPSAyO1xuICAgIGlmIChldnQuZXZlbnRQaGFzZSAhPT0gRVZFTlRfUEhBU0VfQVRfVEFSR0VUKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJldmVudCBwcmVzc2luZyBzcGFjZSBkb3duIGZyb20gc2Nyb2xsaW5nIHRoZSBwYWdlXG4gICAgY29uc3QgaXNTcGFjZURvd24gPSBldnQudHlwZSA9PT0gJ2tleWRvd24nICYmIChldnQua2V5ID09PSAnU3BhY2UnIHx8IGV2dC5rZXlDb2RlID09PSAzMik7XG4gICAgaWYgKGlzU3BhY2VEb3duKSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc09wZW5lcktleSA9IE9QRU5FUl9LRVlTLnNvbWUoKHtrZXksIGtleUNvZGUsIGZvclR5cGV9KSA9PiB7XG4gICAgICByZXR1cm4gZXZ0LnR5cGUgPT09IGZvclR5cGUgJiYgKGV2dC5rZXkgPT09IGtleSB8fCBldnQua2V5Q29kZSA9PT0ga2V5Q29kZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoaXNPcGVuZXJLZXkpIHtcbiAgICAgIHRoaXMuZGlzcGxheUhhbmRsZXJfKGV2dCk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZVNjcm9sbF8oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRCb2R5Q2xhc3MoY3NzQ2xhc3Nlcy5TQ1JPTExfTE9DSyk7XG4gIH1cblxuICBlbmFibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFNlbGVjdCBCb3R0b20gTGluZS5cbiAqXG4gKiBEZWZpbmVzIHRoZSBzaGFwZSBvZiB0aGUgYWRhcHRlciBleHBlY3RlZCBieSB0aGUgZm91bmRhdGlvbi4gSW1wbGVtZW50IHRoaXNcbiAqIGFkYXB0ZXIgdG8gaW50ZWdyYXRlIHRoZSBTZWxlY3QgbGFiZWwgaW50byB5b3VyIGZyYW1ld29yay4gU2VlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2F1dGhvcmluZy1jb21wb25lbnRzLm1kXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1NlbGVjdEJvdHRvbUxpbmVBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgYm90dG9tIGxpbmUgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgYm90dG9tIGxpbmUgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTZWxlY3RCb3R0b21MaW5lQWRhcHRlcjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBCT1RUT01fTElORV9BQ1RJVkU6ICdtZGMtc2VsZWN0X19ib3R0b20tbGluZS0tYWN0aXZlJyxcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDU2VsZWN0Qm90dG9tTGluZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENTZWxlY3RCb3R0b21MaW5lQWRhcHRlcj59XG4gKiBAZmluYWxcbiAqL1xuY2xhc3MgTURDU2VsZWN0Qm90dG9tTGluZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDU2VsZWN0Qm90dG9tTGluZUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDU2VsZWN0Qm90dG9tTGluZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENTZWxlY3RCb3R0b21MaW5lQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBhY3RpdmUgY2xhc3MgdG8gYm90dG9tIGxpbmVcbiAgICovXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5CT1RUT01fTElORV9BQ1RJVkUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGFjdGl2ZSBjbGFzcyBmcm9tIHRoZSBib3R0b20gbGluZVxuICAgKi9cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuQk9UVE9NX0xJTkVfQUNUSVZFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFNRENTZWxlY3RCb3R0b21MaW5lQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2VsZWN0Qm90dG9tTGluZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTZWxlY3RCb3R0b21MaW5lRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgU2VsZWN0IExhYmVsLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFNlbGVjdCBsYWJlbCBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDU2VsZWN0TGFiZWxBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0byB0aGUgbGFiZWwgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSB0aGUgbGFiZWwgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTZWxlY3RMYWJlbEFkYXB0ZXI7XG4iLCJleHBvcnQgY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgTEFCRUxfRkxPQVRfQUJPVkU6ICdtZGMtc2VsZWN0X19sYWJlbC0tZmxvYXQtYWJvdmUnLFxufTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENTZWxlY3RMYWJlbEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENTZWxlY3RMYWJlbEFkYXB0ZXI+fVxuICogQGZpbmFsXG4gKi9cbmNsYXNzIE1EQ1NlbGVjdExhYmVsRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QHNlZSBNRENTZWxlY3RMYWJlbEFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDU2VsZWN0TGFiZWxBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDU2VsZWN0TGFiZWxBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgpID0+IHt9LFxuICAgICAgZ2V0V2lkdGg6ICgpID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU1EQ1NlbGVjdExhYmVsQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2VsZWN0TGFiZWxGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICAvKipcbiAgICogU3R5bGVzIHRoZSBsYWJlbCB0byBmbG9hdCBvciBkZWZsb2F0IGFzIG5lY2Vzc2FyeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuXG4gICAqL1xuICBzdHlsZUZsb2F0KHZhbHVlKSB7XG4gICAgY29uc3Qge0xBQkVMX0ZMT0FUX0FCT1ZFfSA9IE1EQ1NlbGVjdExhYmVsRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICghIXZhbHVlKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKExBQkVMX0ZMT0FUX0FCT1ZFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhMQUJFTF9GTE9BVF9BQk9WRSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1NlbGVjdExhYmVsRm91bmRhdGlvbjtcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWRjLXNlbGVjdCBtZGMtbWVudS1zZWxlY3RcIiBcclxuICAgIHJvbGU9XCJsaXN0Ym94XCIgXHJcbiAgICA6Y2xhc3M9XCJjbGFzc2VzXCI+XHJcbiAgICA8ZGl2IHJlZj1cInN1cmZhY2VcIiBjbGFzcz1cIm1kYy1zZWxlY3RfX3N1cmZhY2VcIlxyXG4gICAgICA6c3R5bGU9XCJzdXJmYWNlU3R5bGVzXCIgOnRhYmluZGV4PVwidGFiSW5kZXhcIj5cclxuICAgICAgICA8ZGl2IHJlZj1cImxhYmVsXCIgY2xhc3M9XCJtZGMtc2VsZWN0X19sYWJlbFwiXHJcbiAgICAgICAgICA6Y2xhc3M9XCJsYWJlbENsYXNzZXNcIlxyXG4gICAgICAgID57e2xhYmVsfX08L2Rpdj5cclxuICAgICAgICA8ZGl2IHJlZj1cInNlbGVjdGVkQ29udGVudFwiIGNsYXNzPVwibWRjLXNlbGVjdF9fc2VsZWN0ZWQtdGV4dFwiIFxyXG4gICAgICAgID57e3NlbGVjdGVkVGV4dENvbnRlbnR9fTwvZGl2PlxyXG4gICAgICAgIDxkaXYgcmVmPVwiYm90dG9tTGluZVwiIGNsYXNzPVwibWRjLXNlbGVjdF9fYm90dG9tLWxpbmVcIlxyXG4gICAgICAgICAgOmNsYXNzPVwiYm90dG9tTGluZUNsYXNzZXNcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPG1kYy1tZW51IHJlZj1cIm1lbnVcIiBcclxuICAgICAgY2xhc3M9XCJtZGMtc2VsZWN0X19tZW51XCJcclxuICAgICAgQHVwZGF0ZT1cInJlZnJlc2hJbmRleFwiPlxyXG4gICAgICA8c2xvdD48L3Nsb3Q+XHJcbiAgICA8L21kYy1tZW51PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHsgbWRjTWVudSB9IGZyb20gJy4uL21lbnUnO1xyXG5pbXBvcnQgTURDU2VsZWN0Rm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0L2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgTURDU2VsZWN0Qm90dG9tTGluZUZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdC9ib3R0b20tbGluZS9mb3VuZGF0aW9uJztcclxuaW1wb3J0IE1EQ1NlbGVjdExhYmVsRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0L2xhYmVsL2ZvdW5kYXRpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtbWVudS1zZWxlY3QnLFxyXG4gIG1vZGVsOiB7XHJcbiAgICBwcm9wOiAndmFsdWUnLFxyXG4gICAgZXZlbnQ6ICdjaGFuZ2UnLFxyXG4gIH0sXHJcbiAgcHJvcHM6IHtcclxuICAgIG11bHRpcGxlOiBCb29sZWFuLFxyXG4gICAgdmFsdWU6IFtTdHJpbmcsIEFycmF5XSxcclxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxyXG4gICAgbGFiZWw6IFN0cmluZyxcclxuICAgIGJveDogQm9vbGVhbixcclxuICB9LFxyXG4gIGRhdGEoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjbGFzc2VzOiB7XHJcbiAgICAgICAgJ21kYy1zZWxlY3QtLWJveCc6IHRoaXMuYm94LFxyXG4gICAgICB9LFxyXG4gICAgICBsYWJlbENsYXNzZXM6IHt9LFxyXG4gICAgICBib3R0b21MaW5lQ2xhc3Nlczoge30sXHJcbiAgICAgIHN1cmZhY2VTdHlsZXM6IHt9LFxyXG4gICAgICB0YWJJbmRleDogMCxcclxuICAgICAgc2VsZWN0ZWRUZXh0Q29udGVudDogJycsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgJ21kYy1tZW51JzogbWRjTWVudSxcclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICBkaXNhYmxlZCh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLnNldERpc2FibGVkKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICB2YWx1ZSgpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoSW5kZXgoKTtcclxuICAgIH0sXHJcbiAgICBib3goKSB7XHJcbiAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsICdtZGMtc2VsZWN0LS1ib3gnLCB0aGlzLmJveCk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgcmVmcmVzaEluZGV4KCkge1xyXG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLiRyZWZzLm1lbnUuaXRlbXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgb3B0aW9uVmFsdWUgPVxyXG4gICAgICAgICAgICBvcHRpb25zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpIHx8XHJcbiAgICAgICAgICAgIG9wdGlvbnNbaV0udGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT0gb3B0aW9uVmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFNlbGVjdGVkSW5kZXgoaSk7XHJcbiAgICAgICAgICAgIC8vVE9ETzogTURDRklYIGZvcmNlIGZsb2F0IGFib3ZlIGlmIHZhbHVlIGlzIHZhbGlkXHJcbiAgICAgICAgICAgIHRoaXMuJHNldChcclxuICAgICAgICAgICAgICB0aGlzLmxhYmVsQ2xhc3NlcyxcclxuICAgICAgICAgICAgICAnbWRjLXNlbGVjdF9fbGFiZWwtLWZsb2F0LWFib3ZlJyxcclxuICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVE9ETzogTURDRklYIGZvcmNlIGZsb2F0IGFib3ZlIGlmIHZhbHVlIGlzIHZhbGlkXHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFNlbGVjdGVkSW5kZXgoLTEpO1xyXG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmxhYmVsQ2xhc3NlcywgJ21kYy1zZWxlY3RfX2xhYmVsLS1mbG9hdC1hYm92ZScsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSk7IC8vIFRPRE86IE1EQ0ZJWFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbW91bnRlZCgpIHtcclxuICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uID0gbmV3IE1EQ1NlbGVjdExhYmVsRm91bmRhdGlvbih7XHJcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMubGFiZWxDbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxyXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmxhYmVsQ2xhc3NlcywgY2xhc3NOYW1lKSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb24gPSBuZXcgTURDU2VsZWN0Qm90dG9tTGluZUZvdW5kYXRpb24oe1xyXG4gICAgICBhZGRDbGFzczogY2xhc3NOYW1lID0+IHtcclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5ib3R0b21MaW5lQ2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XHJcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuYm90dG9tTGluZUNsYXNzZXMsIGNsYXNzTmFtZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb24uaW5pdCgpO1xyXG5cclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENTZWxlY3RGb3VuZGF0aW9uKHtcclxuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpLFxyXG4gICAgICByZW1vdmVDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSksXHJcbiAgICAgIGZsb2F0TGFiZWw6IHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLmxhYmVsRm91bmRhdGlvbi5zdHlsZUZsb2F0KHZhbHVlKTtcclxuICAgICAgfSxcclxuICAgICAgYWN0aXZhdGVCb3R0b21MaW5lOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ib3R0b21MaW5lRm91bmRhdGlvbi5hY3RpdmF0ZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBkZWFjdGl2YXRlQm90dG9tTGluZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb24uZGVhY3RpdmF0ZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBzZXRBdHRyOiAoYXR0ciwgdmFsdWUpID0+IHRoaXMuJGVsLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSksXHJcbiAgICAgIHJtQXR0cjogKGF0dHIsIHZhbHVlKSA9PiB0aGlzLiRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxyXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB0aGlzLiRyZWZzLnN1cmZhY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLnN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcclxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5zdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGZvY3VzOiAoKSA9PiB0aGlzLiRyZWZzLnN1cmZhY2UuZm9jdXMoKSxcclxuICAgICAgbWFrZVRhYmJhYmxlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IDA7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ha2VVbnRhYmJhYmxlOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IC0xO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRDb21wdXRlZFN0eWxlVmFsdWU6IHByb3AgPT5cclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLiRyZWZzLnN1cmZhY2UpLmdldFByb3BlcnR5VmFsdWUocHJvcCksXHJcbiAgICAgIHNldFN0eWxlOiAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT5cclxuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdXJmYWNlU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKSxcclxuICAgICAgY3JlYXRlMmRSZW5kZXJpbmdDb250ZXh0OiAoKSA9PlxyXG4gICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyksXHJcbiAgICAgIHNldE1lbnVFbFN0eWxlOiAocHJvcGVydHlOYW1lLCB2YWx1ZSkgPT5cclxuICAgICAgICAodGhpcy4kcmVmcy5tZW51LiRlbC5zdHlsZVtwcm9wZXJ0eU5hbWVdID0gdmFsdWUpLFxyXG4gICAgICBzZXRNZW51RWxBdHRyOiAoYXR0ciwgdmFsdWUpID0+XHJcbiAgICAgICAgdGhpcy4kcmVmcy5tZW51LiRlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpLFxyXG4gICAgICBybU1lbnVFbEF0dHI6IGF0dHIgPT4gdGhpcy4kcmVmcy5tZW51LiRlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ciksXHJcbiAgICAgIGdldE1lbnVFbE9mZnNldEhlaWdodDogKCkgPT4gdGhpcy4kcmVmcy5tZW51LiRlbC5vZmZzZXRIZWlnaHQsXHJcbiAgICAgIG9wZW5NZW51OiBmb2N1c0luZGV4ID0+IHRoaXMuJHJlZnMubWVudS5zaG93KHsgZm9jdXNJbmRleCB9KSxcclxuICAgICAgaXNNZW51T3BlbjogKCkgPT4gdGhpcy4kcmVmcy5tZW51LmlzT3BlbigpLFxyXG4gICAgICBzZXRTZWxlY3RlZFRleHRDb250ZW50OiBzZWxlY3RlZFRleHRDb250ZW50ID0+IHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGV4dENvbnRlbnQgPSBzZWxlY3RlZFRleHRDb250ZW50O1xyXG4gICAgICB9LFxyXG4gICAgICBnZXROdW1iZXJPZk9wdGlvbnM6ICgpID0+IHRoaXMuJHJlZnMubWVudS5pdGVtcy5sZW5ndGgsXHJcbiAgICAgIGdldFRleHRGb3JPcHRpb25BdEluZGV4OiBpbmRleCA9PlxyXG4gICAgICAgIHRoaXMuJHJlZnMubWVudS5pdGVtc1tpbmRleF0udGV4dENvbnRlbnQudHJpbSgpLFxyXG4gICAgICBnZXRWYWx1ZUZvck9wdGlvbkF0SW5kZXg6IGluZGV4ID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgdGhpcy4kcmVmcy5tZW51Lml0ZW1zW2luZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSB8fFxyXG4gICAgICAgICAgdGhpcy4kcmVmcy5tZW51Lml0ZW1zW2luZGV4XS50ZXh0Q29udGVudC50cmltKClcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICBzZXRBdHRyRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBhdHRyLCB2YWx1ZSkgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuaXRlbXNbaW5kZXhdLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSksXHJcbiAgICAgIHJtQXR0ckZvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgYXR0cikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuaXRlbXNbaW5kZXhdLnJlbW92ZUF0dHJpYnV0ZShhdHRyKSxcclxuICAgICAgZ2V0T2Zmc2V0VG9wRm9yT3B0aW9uQXRJbmRleDogaW5kZXggPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuaXRlbXNbaW5kZXhdLm9mZnNldFRvcCxcclxuICAgICAgcmVnaXN0ZXJNZW51SW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIGRlcmVnaXN0ZXJNZW51SW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT5cclxuICAgICAgICB0aGlzLiRyZWZzLm1lbnUuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXHJcbiAgICAgIG5vdGlmeUNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuZm91bmRhdGlvbi5nZXRWYWx1ZSgpKTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0V2luZG93SW5uZXJIZWlnaHQ6ICgpID0+IHdpbmRvdy5pbm5lckhlaWdodCxcclxuICAgICAgYWRkQm9keUNsYXNzOiBjbGFzc05hbWUgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXHJcbiAgICAgIHJlbW92ZUJvZHlDbGFzczogY2xhc3NOYW1lID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9UT0RPOiBNRENGSVhcclxuICAgIGxldCBmb3VuZGF0aW9uID0gdGhpcy5mb3VuZGF0aW9uO1xyXG4gICAgaWYgKGZvdW5kYXRpb24pIHtcclxuICAgICAgZm91bmRhdGlvbi5yZXNpemUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFmb3VuZGF0aW9uLmN0eF8pIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZm9udCA9IGZvdW5kYXRpb24uYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdmb250Jyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyU3BhY2luZyA9IHBhcnNlRmxvYXQoXHJcbiAgICAgICAgICBmb3VuZGF0aW9uLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgnbGV0dGVyLXNwYWNpbmcnKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChmb250KSB7XHJcbiAgICAgICAgICBmb3VuZGF0aW9uLmN0eF8uZm9udCA9IGZvbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHByaW1hcnlGb250RmFtaWx5ID0gZm91bmRhdGlvbi5hZGFwdGVyX1xyXG4gICAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdmb250LWZhbWlseScpXHJcbiAgICAgICAgICAgIC5zcGxpdCgnLCcpWzBdO1xyXG4gICAgICAgICAgY29uc3QgZm9udFNpemUgPSBmb3VuZGF0aW9uLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZShcclxuICAgICAgICAgICAgJ2ZvbnQtc2l6ZScsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgZm91bmRhdGlvbi5jdHhfLmZvbnQgPSBgJHtmb250U2l6ZX0gJHtwcmltYXJ5Rm9udEZhbWlseX1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1heFRleHRMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBjb25zdCBzdXJmYWNlUGFkZGluZ1JpZ2h0ID0gcGFyc2VJbnQoXHJcbiAgICAgICAgICBmb3VuZGF0aW9uLmFkYXB0ZXJfLmdldENvbXB1dGVkU3R5bGVWYWx1ZSgncGFkZGluZy1yaWdodCcpLFxyXG4gICAgICAgICAgMTAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBzdXJmYWNlUGFkZGluZ0xlZnQgPSBwYXJzZUludChcclxuICAgICAgICAgIGZvdW5kYXRpb24uYWRhcHRlcl8uZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKCdwYWRkaW5nLWxlZnQnKSxcclxuICAgICAgICAgIDEwLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0Qm94QWRkZWRQYWRkaW5nID0gc3VyZmFjZVBhZGRpbmdSaWdodCArIHN1cmZhY2VQYWRkaW5nTGVmdDtcclxuXHJcbiAgICAgICAgZm9yIChcclxuICAgICAgICAgIGxldCBpID0gMCwgbCA9IGZvdW5kYXRpb24uYWRhcHRlcl8uZ2V0TnVtYmVyT2ZPcHRpb25zKCk7XHJcbiAgICAgICAgICBpIDwgbDtcclxuICAgICAgICAgIGkrK1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc3QgdHh0ID0gZm91bmRhdGlvbi5hZGFwdGVyXy5nZXRUZXh0Rm9yT3B0aW9uQXRJbmRleChpKS50cmltKCk7XHJcbiAgICAgICAgICBjb25zdCB7IHdpZHRoIH0gPSBmb3VuZGF0aW9uLmN0eF8ubWVhc3VyZVRleHQodHh0KTtcclxuICAgICAgICAgIGNvbnN0IGFkZGVkU3BhY2UgPSBsZXR0ZXJTcGFjaW5nICogdHh0Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgICBtYXhUZXh0TGVuZ3RoID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgIG1heFRleHRMZW5ndGgsXHJcbiAgICAgICAgICAgIE1hdGguY2VpbCh3aWR0aCArIGFkZGVkU3BhY2UgKyBzZWxlY3RCb3hBZGRlZFBhZGRpbmcpLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxhYmVsVHh0ID0gdGhpcy5sYWJlbDtcclxuICAgICAgICBjb25zdCB7IHdpZHRoIH0gPSBmb3VuZGF0aW9uLmN0eF8ubWVhc3VyZVRleHQobGFiZWxUeHQpO1xyXG4gICAgICAgIGNvbnN0IGFkZGVkU3BhY2UgPSBsZXR0ZXJTcGFjaW5nICogbGFiZWxUeHQubGVuZ3RoO1xyXG5cclxuICAgICAgICBtYXhUZXh0TGVuZ3RoID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICBtYXhUZXh0TGVuZ3RoLFxyXG4gICAgICAgICAgTWF0aC5jZWlsKHdpZHRoICsgYWRkZWRTcGFjZSArIHNlbGVjdEJveEFkZGVkUGFkZGluZyksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm91bmRhdGlvbi5hZGFwdGVyXy5zZXRTdHlsZSgnd2lkdGgnLCBgJHttYXhUZXh0TGVuZ3RofXB4YCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLy9cclxuICAgIHRoaXMubGFiZWxGb3VuZGF0aW9uLmluaXQoKTtcclxuICAgIHRoaXMuZm91bmRhdGlvbi5pbml0KCk7XHJcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XHJcbiAgICB0aGlzLnJlZnJlc2hJbmRleCgpO1xyXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHRoaXMuZm91bmRhdGlvbi5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuZm91bmRhdGlvbi5nZXRWYWx1ZSgpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICBsZXQgZm91bmRhdGlvbiA9IHRoaXMuZm91bmRhdGlvbjtcclxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG51bGw7XHJcbiAgICBmb3VuZGF0aW9uLmRlc3Ryb3koKTtcclxuXHJcbiAgICBsZXQgbGFiZWxGb3VuZGF0aW9uID0gdGhpcy5sYWJlbEZvdW5kYXRpb247XHJcbiAgICB0aGlzLmxhYmVsRm91bmRhdGlvbiA9IG51bGw7XHJcbiAgICBsYWJlbEZvdW5kYXRpb24uZGVzdHJveSgpO1xyXG5cclxuICAgIGxldCBib3R0b21MaW5lRm91bmRhdGlvbiA9IHRoaXMuYm90dG9tTGluZUZvdW5kYXRpb247XHJcbiAgICB0aGlzLmJvdHRvbUxpbmVGb3VuZGF0aW9uID0gbnVsbDtcclxuICAgIGJvdHRvbUxpbmVGb3VuZGF0aW9uLmRlc3Ryb3koKTtcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxzZWxlY3QgOm11bHRpcGxlPVwibXVsdGlwbGVcIiAgcmVmPVwicm9vdFwiIHYtbW9kZWw9XCJzZWxlY3RlZFwiIFxyXG4gICAgOmRpc2FibGVkPVwiZGlzYWJsZWRcIiAgOnN0eWxlPVwic3R5bGVzXCIgIFxyXG4gICAgY2xhc3M9XCJtZGMtc2VsZWN0IG1kYy1tdWx0aS1zZWxlY3QgbWRjLWxpc3RcIlxyXG4gICAgQGNoYW5nZT1cIm9uQ2hhbmdlXCJcclxuICA+XHJcbiAgICA8b3B0Z3JvdXAgcmVmPVwib3B0Z3JvdXBcIiBjbGFzcz1cIm1kYy1saXN0LWdyb3VwXCIgOmxhYmVsPVwibGFiZWxcIiB2LWlmPVwibGFiZWxcIj5cclxuICAgICAgICA8c2xvdD48L3Nsb3Q+XHJcbiAgICA8L29wdGdyb3VwPlxyXG4gICAgPHNsb3Qgdi1lbHNlPjwvc2xvdD5cclxuICA8L3NlbGVjdD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLW11bHRpLXNlbGVjdCcsXHJcbiAgbW9kZWw6IHtcclxuICAgIHByb3A6ICd2YWx1ZScsXHJcbiAgICBldmVudDogJ2NoYW5nZSdcclxuICB9LFxyXG4gIHByb3BzOiB7XHJcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcclxuICAgIHZhbHVlOiBbU3RyaW5nLCBBcnJheV0sXHJcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgIGxhYmVsOiBTdHJpbmcsXHJcbiAgICBtYXhTaXplOiB7XHJcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXHJcbiAgICAgIGRlZmF1bHQ6IDRcclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGEgKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2VsZWN0ZWQ6IHRoaXMudmFsdWUsXHJcbiAgICAgIHNpemU6IHVuZGVmaW5lZCxcclxuICAgICAgY291bnQ6IHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHN0eWxlcyAoKSB7XHJcbiAgICAgIGxldCBzY3JvbGwgPSAodGhpcy5jb3VudCA+IHRoaXMuc2l6ZSlcclxuICAgICAgbGV0IHNpemUgPSA0OCogdGhpcy5zaXplICsgKHNjcm9sbD8gMCA6IDE2KVxyXG5cclxuICAgICAgbGV0IHN0eWxlcyA9ICB7XHJcbiAgICAgICAgJ2hlaWdodCc6IHNpemUgKyAncHgnLFxyXG4gICAgICAgICdvdmVyZmxvdy15JzogIHNjcm9sbCA/ICdzY3JvbGwnIDogJ2hpZGRlbidcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXNjcm9sbCkge1xyXG4gICAgICAgIHN0eWxlc1snYmFja2dyb3VuZC1pbWFnZSddID0gJ3Vuc2V0J1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHlsZXNcclxuICAgIH1cclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIG9uQ2hhbmdlICgpIHtcclxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5zZWxlY3RlZClcclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQgKCkge1xyXG4gICAgY29uc3QgcmVmcmVzaFNpemUgPSAoKSA9PiB7XHJcbiAgICAgIGxldCBjb3VudCA9IHRoaXMuJHJlZnMucm9vdC5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24sIG9wdGdyb3VwJykubGVuZ3RoXHJcbiAgICAgIHRoaXMuY291bnQgPSBjb3VudFxyXG4gICAgICBsZXQgbWF4ID0gTnVtYmVyKHRoaXMubWF4U2l6ZSlcclxuICAgICAgaWYgKHRoaXMubGFiZWwpIHtcclxuICAgICAgICBtYXggKz0gMVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2l6ZSA9IE1hdGgubWluKGNvdW50LCBtYXgpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiByZWZyZXNoU2l6ZSgpKVxyXG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRlbCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcclxuXHJcbiAgICByZWZyZXNoU2l6ZSgpXHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95ICgpIHtcclxuICAgIHRoaXMuc2xvdE9ic2VydmVyLmRpc2Nvbm5lY3QoKVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxjb21wb25lbnQgOmlzPVwidHlwZVwiIDptdWx0aXBsZT1cIm11bHRpcGxlXCJcclxuICAgIDpsYWJlbD1cImxhYmVsXCIgXHJcbiAgICA6dmFsdWU9XCJ2YWx1ZVwiIEBjaGFuZ2U9XCJvbkNoYW5nZVwiXHJcbiAgICB2LWJpbmQ9XCIkYXR0cnNcIlxyXG4gID5cclxuICAgIDxzbG90Pjwvc2xvdD5cclxuICA8L2NvbXBvbmVudD5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBNRENOYXRpdmVTZWxlY3QgZnJvbSAnLi9tZGMtbmF0aXZlLXNlbGVjdC52dWUnO1xyXG5pbXBvcnQgTURDTWVudVNlbGVjdCBmcm9tICcuL21kYy1tZW51LXNlbGVjdC52dWUnO1xyXG5pbXBvcnQgTURDTXVsdGlTZWxlY3QgZnJvbSAnLi9tZGMtbXVsdGktc2VsZWN0LnZ1ZSc7XHJcbmltcG9ydCB7IERpc3BhdGNoRm9jdXNNaXhpbiB9IGZyb20gJy4uL2Jhc2UnO1xyXG5cclxuY29uc3QgbWVkaWEgPSBuZXcgY2xhc3Mge1xyXG4gIGdldCBtb2JpbGUoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLl9tb2JpbGUgfHxcclxuICAgICAgKHRoaXMuX21vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFxyXG4gICAgICAgICcobWF4LXdpZHRoOiA2MDBweCkgYW5kIChwb2ludGVyOiBjb2Fyc2UpJyxcclxuICAgICAgKSlcclxuICAgICk7XHJcbiAgfVxyXG59KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmFtZTogJ21kYy1zZWxlY3QnLFxyXG4gIG1peGluczogW0Rpc3BhdGNoRm9jdXNNaXhpbl0sXHJcbiAgbW9kZWw6IHtcclxuICAgIHByb3A6ICd2YWx1ZScsXHJcbiAgICBldmVudDogJ2NoYW5nZScsXHJcbiAgfSxcclxuICBwcm9wczoge1xyXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXHJcbiAgICB2YWx1ZTogW1N0cmluZywgQXJyYXldLFxyXG4gICAgbGFiZWw6IFN0cmluZyxcclxuICAgIG5hdGl2ZTogQm9vbGVhbixcclxuICAgIG1lbnU6IEJvb2xlYW4sXHJcbiAgfSxcclxuICBwcm92aWRlKCkge1xyXG4gICAgcmV0dXJuIHsgbWRjU2VsZWN0OiB0aGlzIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICAnbWRjLW5hdGl2ZS1zZWxlY3QnOiBNRENOYXRpdmVTZWxlY3QsXHJcbiAgICAnbWRjLW1lbnUtc2VsZWN0JzogTURDTWVudVNlbGVjdCxcclxuICAgICdtZGMtbXVsdGktc2VsZWN0JzogTURDTXVsdGlTZWxlY3QsXHJcbiAgfSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbW9iaWxlOiB3aW5kb3cgPyBtZWRpYS5tb2JpbGUubWF0Y2hlcyA6IHRydWUsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHR5cGUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlXHJcbiAgICAgICAgPyAnbWRjLW11bHRpLXNlbGVjdCdcclxuICAgICAgICA6IHRoaXMubWVudVxyXG4gICAgICAgICAgPyAnbWRjLW1lbnUtc2VsZWN0J1xyXG4gICAgICAgICAgOiB0aGlzLmlzTmF0aXZlID8gJ21kYy1uYXRpdmUtc2VsZWN0JyA6ICdtZGMtbWVudS1zZWxlY3QnO1xyXG4gICAgfSxcclxuICAgIGlzTmF0aXZlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5uYXRpdmUgfHwgdGhpcy5tdWx0aXBsZSB8fCB0aGlzLm1vYmlsZTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvbkNoYW5nZSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgcmVmcmVzaE1lZGlhKCkge1xyXG4gICAgICB0aGlzLm1vYmlsZSA9IG1lZGlhLm1vYmlsZS5tYXRjaGVzO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGJlZm9yZU1vdW50KCkge1xyXG4gICAgbWVkaWEubW9iaWxlLmFkZExpc3RlbmVyKHRoaXMucmVmcmVzaE1lZGlhKTtcclxuICAgIHRoaXMucmVmcmVzaE1lZGlhKCk7XHJcbiAgfSxcclxuICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgbWVkaWEubW9iaWxlLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVmcmVzaE1lZGlhKTtcclxuICB9LFxyXG59O1xyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxuICAgPG9wdGlvbiA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIDp2YWx1ZT1cInZhbHVlXCIgdi1pZj1cImhhc1ZhbHVlXCJcbiAgICBjbGFzcz1cIm1kYy1vcHRpb24gbWRjLW5hdGl2ZS1vcHRpb25cIj5cbiAgICAgPHNsb3Q+PC9zbG90PlxuICAgPC9vcHRpb24+XG4gICA8b3B0aW9uIDpkaXNhYmxlZD1cImRpc2FibGVkXCIgdi1lbHNlXG4gICAgY2xhc3M9XCJtZGMtb3B0aW9uIG1kYy1uYXRpdmUtb3B0aW9uXCI+XG4gICAgIDxzbG90Pjwvc2xvdD5cbiAgIDwvb3B0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1uYXRpdmUtb3B0aW9uJyxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaGFzVmFsdWUgKCkge1xuICAgICAgcmV0dXJuICEodHlwZW9mIHRoaXMudmFsdWUgPT09ICd1bmRlZmluZWQnKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICA8bGkgY2xhc3M9XCJtZGMtb3B0aW9uIG1kYy1tZW51LW9wdGlvbiBtZGMtbGlzdC1pdGVtXCIgXG4gICAgcm9sZT1cIm9wdGlvblwiIFxuICAgIDp0YWJpbmRleD1cImRpc2FibGVkPy0xOjBcIlxuICAgIDphcmlhLWRpc2FibGVkPVwiZGlzYWJsZWRcIlxuICAgIDpkYXRhLXZhbHVlPVwidmFsdWVcIj5cbiAgICAgPHNsb3Q+PC9zbG90PlxuICAgPC9saT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtbWVudS1vcHRpb24nLFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW5cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICA8b3B0aW9uIGNsYXNzPVwibWRjLW9wdGlvbiBtZGMtbXVsdGktb3B0aW9uIG1kYy1saXN0LWl0ZW1cIiBcbiAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIDp2YWx1ZT1cInZhbHVlXCIgdi1pZj1cImhhc1ZhbHVlXCI+XG4gICAgIDxzbG90Pjwvc2xvdD5cbiAgIDwvb3B0aW9uPlxuICAgPG9wdGlvbiBjbGFzcz1cIm1kYy1vcHRpb24gbWRjLW11bHRpLW9wdGlvbiBtZGMtbGlzdC1pdGVtXCIgXG4gICAgOmRpc2FibGVkPVwiZGlzYWJsZWRcIiB2LWVsc2U+XG4gICAgIDxzbG90Pjwvc2xvdD5cbiAgIDwvb3B0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1tdWx0aS1vcHRpb24nLFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW5cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBoYXNWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gISh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGNvbXBvbmVudCA6aXM9XCJ0eXBlXCIgOmRpc2FibGVkPVwiZGlzYWJsZWRcIiA6dmFsdWU9dmFsdWU+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L2NvbXBvbmVudD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgTURDTmF0aXZlT3B0aW9uIGZyb20gJy4vbWRjLW5hdGl2ZS1vcHRpb24udnVlJztcbmltcG9ydCBNRENNZW51T3B0aW9uIGZyb20gJy4vbWRjLW1lbnUtb3B0aW9uLnZ1ZSc7XG5pbXBvcnQgTURDTXVsdGlPcHRpb24gZnJvbSAnLi9tZGMtbXVsdGktb3B0aW9uLnZ1ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1vcHRpb24nLFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gIH0sXG4gIGluamVjdDogWydtZGNTZWxlY3QnXSxcbiAgY29tcG9uZW50czoge1xuICAgICdtZGMtbmF0aXZlLW9wdGlvbic6IE1EQ05hdGl2ZU9wdGlvbixcbiAgICAnbWRjLW11bHRpLW9wdGlvbic6IE1EQ011bHRpT3B0aW9uLFxuICAgICdtZGMtbWVudS1vcHRpb24nOiBNRENNZW51T3B0aW9uLFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlzTmF0aXZlKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWRjU2VsZWN0LmlzTmF0aXZlO1xuICAgIH0sXG4gICAgbXVsdGlwbGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tZGNTZWxlY3QubXVsdGlwbGU7XG4gICAgfSxcbiAgICBtZW51KCkge1xuICAgICAgcmV0dXJuIHRoaXMubWRjU2VsZWN0Lm1lbnU7XG4gICAgfSxcbiAgICB0eXBlKCkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGVcbiAgICAgICAgPyAnbWRjLW11bHRpLW9wdGlvbidcbiAgICAgICAgOiB0aGlzLm1lbnVcbiAgICAgICAgICA/ICdtZGMtbWVudS1vcHRpb24nXG4gICAgICAgICAgOiB0aGlzLmlzTmF0aXZlID8gJ21kYy1uYXRpdmUtb3B0aW9uJyA6ICdtZGMtbWVudS1vcHRpb24nO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCJpbXBvcnQge0Jhc2VQbHVnaW59IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgbWRjU2VsZWN0IGZyb20gJy4vbWRjLXNlbGVjdC52dWUnXG5pbXBvcnQgbWRjT3B0aW9uIGZyb20gJy4vbWRjLW9wdGlvbi52dWUnXG5cblxuZXhwb3J0IHtcbiAgbWRjU2VsZWN0LFxuICBtZGNPcHRpb24sXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNTZWxlY3QsXG4gIG1kY09wdGlvbixcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiZW1pdEN1c3RvbUV2ZW50IiwiZWwiLCJldnRUeXBlIiwiZXZ0RGF0YSIsInNob3VsZEJ1YmJsZSIsImV2dCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiYnViYmxlcyIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiRGlzcGF0Y2hGb2N1c01peGluIiwiZGF0YSIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImFjdGl2ZUVsZW1lbnQiLCJjb250YWlucyIsIiRlbWl0IiwibW91bnRlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJiZWZvcmVEZXN0cm95IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIm1vZGVsIiwicHJvcCIsImV2ZW50IiwicHJvcHMiLCJ2YWx1ZSIsIlN0cmluZyIsIkFycmF5IiwiZGlzYWJsZWQiLCJCb29sZWFuIiwibGFiZWwiLCJzZWxlY3RlZCIsIm9uQ2hhbmdlIiwid2F0Y2giLCJuZXdWYWx1ZSIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENNZW51QWRhcHRlciIsImNsYXNzTmFtZSIsInRhcmdldCIsImF0dHJpYnV0ZU5hbWUiLCJ0eXBlIiwiaGFuZGxlciIsImluZGV4Iiwib3JpZ2luIiwicG9zaXRpb24iLCJoZWlnaHQiLCJhdHRyIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJPUEVOIiwiQU5JTUFUSU5HX09QRU4iLCJBTklNQVRJTkdfQ0xPU0VEIiwiU0VMRUNURURfTElTVF9JVEVNIiwic3RyaW5ncyIsIklURU1TX1NFTEVDVE9SIiwiU0VMRUNURURfRVZFTlQiLCJDQU5DRUxfRVZFTlQiLCJBUklBX0RJU0FCTEVEX0FUVFIiLCJudW1iZXJzIiwiU0VMRUNURURfVFJJR0dFUl9ERUxBWSIsIlRSQU5TSVRJT05fT1BFTl9EVVJBVElPTiIsIlRSQU5TSVRJT05fQ0xPU0VfRFVSQVRJT04iLCJNQVJHSU5fVE9fRURHRSIsIkFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPIiwiT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPIiwiQ29ybmVyQml0IiwiQk9UVE9NIiwiQ0VOVEVSIiwiUklHSFQiLCJGTElQX1JUTCIsIkNvcm5lciIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfU1RBUlQiLCJUT1BfRU5EIiwiQk9UVE9NX1NUQVJUIiwiQk9UVE9NX0VORCIsIk1EQ01lbnVGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiaGFzTmVjZXNzYXJ5RG9tIiwiZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQiLCJnZXRJbm5lckRpbWVuc2lvbnMiLCJoYXNBbmNob3IiLCJnZXRBbmNob3JEaW1lbnNpb25zIiwiZ2V0V2luZG93RGltZW5zaW9ucyIsImdldE51bWJlck9mSXRlbXMiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIiLCJkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlciIsImdldEluZGV4Rm9yRXZlbnRUYXJnZXQiLCJub3RpZnlTZWxlY3RlZCIsIm5vdGlmeUNhbmNlbCIsInNhdmVGb2N1cyIsInJlc3RvcmVGb2N1cyIsImlzRm9jdXNlZCIsImZvY3VzIiwiZ2V0Rm9jdXNlZEl0ZW1JbmRleCIsImZvY3VzSXRlbUF0SW5kZXgiLCJpc1J0bCIsInNldFRyYW5zZm9ybU9yaWdpbiIsInNldFBvc2l0aW9uIiwic2V0TWF4SGVpZ2h0Iiwic2V0QXR0ckZvck9wdGlvbkF0SW5kZXgiLCJybUF0dHJGb3JPcHRpb25BdEluZGV4IiwiYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4Iiwicm1DbGFzc0Zvck9wdGlvbkF0SW5kZXgiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiY2xpY2tIYW5kbGVyXyIsImhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfIiwia2V5ZG93bkhhbmRsZXJfIiwiaGFuZGxlS2V5Ym9hcmREb3duXyIsImtleXVwSGFuZGxlcl8iLCJoYW5kbGVLZXlib2FyZFVwXyIsImRvY3VtZW50Q2xpY2tIYW5kbGVyXyIsImhhbmRsZURvY3VtZW50Q2xpY2tfIiwiaXNPcGVuXyIsIm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyIsImNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8iLCJzZWxlY3RlZFRyaWdnZXJUaW1lcklkXyIsImFuaW1hdGlvblJlcXVlc3RJZF8iLCJkaW1lbnNpb25zXyIsIml0ZW1IZWlnaHRfIiwiYW5jaG9yQ29ybmVyXyIsImFuY2hvck1hcmdpbl8iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJtZWFzdXJlc18iLCJzZWxlY3RlZEluZGV4XyIsInJlbWVtYmVyU2VsZWN0aW9uXyIsInF1aWNrT3Blbl8iLCJrZXlEb3duV2l0aGluTWVudV8iLCJFcnJvciIsImNsZWFyVGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiY29ybmVyIiwibWFyZ2luIiwicmVtZW1iZXJTZWxlY3Rpb24iLCJzZXRTZWxlY3RlZEluZGV4IiwicXVpY2tPcGVuIiwiZm9jdXNJbmRleCIsImRvY3VtZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJjbG9zZSIsImFsdEtleSIsImN0cmxLZXkiLCJtZXRhS2V5Iiwia2V5Q29kZSIsInNoaWZ0S2V5IiwiaXNUYWIiLCJpc0Fycm93VXAiLCJpc0Fycm93RG93biIsImlzU3BhY2UiLCJpc0VudGVyIiwiZm9jdXNlZEl0ZW1JbmRleCIsImxhc3RJdGVtSW5kZXgiLCJwcmV2ZW50RGVmYXVsdCIsImlzRXNjYXBlIiwidGFyZ2V0SW5kZXgiLCJhbmNob3JSZWN0Iiwidmlld3BvcnQiLCJ2aWV3cG9ydERpc3RhbmNlIiwid2lkdGgiLCJhbmNob3JIZWlnaHQiLCJhbmNob3JXaWR0aCIsIm1lbnVIZWlnaHQiLCJtZW51V2lkdGgiLCJpc0JvdHRvbUFsaWduZWQiLCJhdmFpbGFibGVUb3AiLCJhdmFpbGFibGVCb3R0b20iLCJ0b3BPdmVyZmxvdyIsImJvdHRvbU92ZXJmbG93IiwiaXNGbGlwUnRsIiwiYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCIsImlzQWxpZ25lZFJpZ2h0IiwiYXZhaWxhYmxlTGVmdCIsImF2YWlsYWJsZVJpZ2h0IiwibGVmdE92ZXJmbG93IiwicmlnaHRPdmVyZmxvdyIsImlzUmlnaHRBbGlnbmVkIiwieCIsInJpZ2h0T2Zmc2V0IiwibGVmdE9mZnNldCIsImF2b2lkVmVydGljYWxPdmVybGFwIiwiY2FuT3ZlcmxhcFZlcnRpY2FsbHkiLCJ5IiwiTWF0aCIsIm1pbiIsIm1heEhlaWdodCIsImdldEF1dG9MYXlvdXRNZWFzdXJlbWVudHNfIiwiZ2V0T3JpZ2luQ29ybmVyXyIsIm1heE1lbnVIZWlnaHQiLCJnZXRNZW51TWF4SGVpZ2h0XyIsInZlcnRpY2FsQWxpZ25tZW50IiwiaG9yaXpvbnRhbEFsaWdubWVudCIsImhvcml6b250YWxPZmZzZXQiLCJnZXRIb3Jpem9udGFsT3JpZ2luT2Zmc2V0XyIsInZlcnRpY2FsT2Zmc2V0IiwiZ2V0VmVydGljYWxPcmlnaW5PZmZzZXRfIiwiYWJzIiwidmVydGljYWxPZmZzZXRQZXJjZW50Iiwib3JpZ2luUGVyY2VudCIsInJvdW5kIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYXV0b1Bvc2l0aW9uXyIsImZvY3VzT25PcGVuXyIsInRhcmdldElzRGlzYWJsZWQiLCJwcmV2U2VsZWN0ZWRJbmRleCIsInN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8iLCJnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUiLCJnbG9iYWxPYmoiLCJmb3JjZVJlZnJlc2giLCJ1bmRlZmluZWQiLCJjcmVhdGVFbGVtZW50IiwidHJhbnNmb3JtUHJvcGVydHlOYW1lIiwic3R5bGUiLCJOdW1iZXIiLCJPYmplY3QiLCJjbGFzc2VzIiwib3BlbkZyb21Ub3BMZWZ0Iiwib3BlbkZyb21Ub3BSaWdodCIsIm9wZW5Gcm9tQm90dG9tTGVmdCIsIm9wZW5Gcm9tQm90dG9tUmlnaHQiLCJzdHlsZXMiLCJpdGVtcyIsInNob3ciLCJvcHRpb25zIiwiZm91bmRhdGlvbiIsIm9wZW4iLCJoaWRlIiwiaXNPcGVuIiwicmVmcmVzaEl0ZW1zIiwic2xpY2UiLCJjYWxsIiwiJHJlZnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2xvdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiX3ByZXZpb3VzRm9jdXMiLCIkc2V0IiwiJGRlbGV0ZSIsInJvb3QiLCJjbGFzc0xpc3QiLCJnZXRBdHRyaWJ1dGUiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInBhcmVudEVsZW1lbnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJsZW5ndGgiLCJib2R5IiwiaW5kZXhPZiIsIml0ZW0iLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImFkZCIsInJlbW92ZSIsImluaXQiLCJhbmNob3JDb3JuZXIiLCJzZXRBbmNob3JDb3JuZXIiLCJhbmNob3JNYXJnaW4iLCJzZXRBbmNob3JNYXJnaW4iLCJudiIsInNldFF1aWNrT3BlbiIsImRpc2Nvbm5lY3QiLCJkZXN0cm95IiwiTURDQ29tcG9uZW50Iiwicm9vdF8iLCJhcmdzIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0aWFsU3luY1dpdGhET00iLCJCT1giLCJESVNBQkxFRCIsIlNDUk9MTF9MT0NLIiwiQ0hBTkdFX0VWRU5UIiwiQk9UVE9NX0xJTkVfU0VMRUNUT1IiLCJMQUJFTF9TRUxFQ1RPUiIsIk1FTlVfU0VMRUNUT1IiLCJTVVJGQUNFX1NFTEVDVE9SIiwiU0VMRUNURURfVEVYVF9TRUxFQ1RPUiIsIk1EQ01lbnUiLCJwcmV2aW91c0ZvY3VzXyIsIml0ZW1zQ29udGFpbmVyXyIsIml0ZW1zQ29udGFpbmVyIiwiZW1pdCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRTZWxlY3RlZEluZGV4Iiwic2V0UmVtZW1iZXJTZWxlY3Rpb24iLCJPUEVORVJfS0VZUyIsImZvclR5cGUiLCJNRENTZWxlY3RGb3VuZGF0aW9uIiwiZmxvYXRMYWJlbCIsImFjdGl2YXRlQm90dG9tTGluZSIsImRlYWN0aXZhdGVCb3R0b21MaW5lIiwiYWRkQm9keUNsYXNzIiwicmVtb3ZlQm9keUNsYXNzIiwic2V0QXR0ciIsInJtQXR0ciIsImNvbXB1dGVCb3VuZGluZ1JlY3QiLCJtYWtlVGFiYmFibGUiLCJtYWtlVW50YWJiYWJsZSIsImdldENvbXB1dGVkU3R5bGVWYWx1ZSIsInNldFN0eWxlIiwiY3JlYXRlMmRSZW5kZXJpbmdDb250ZXh0IiwiZm9udCIsIm1lYXN1cmVUZXh0Iiwic2V0TWVudUVsU3R5bGUiLCJzZXRNZW51RWxBdHRyIiwicm1NZW51RWxBdHRyIiwiZ2V0TWVudUVsT2Zmc2V0SGVpZ2h0Iiwib3Blbk1lbnUiLCJpc01lbnVPcGVuIiwic2V0U2VsZWN0ZWRUZXh0Q29udGVudCIsImdldE51bWJlck9mT3B0aW9ucyIsImdldFRleHRGb3JPcHRpb25BdEluZGV4IiwiZ2V0VmFsdWVGb3JPcHRpb25BdEluZGV4IiwiZ2V0T2Zmc2V0VG9wRm9yT3B0aW9uQXRJbmRleCIsInJlZ2lzdGVyTWVudUludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJNZW51SW50ZXJhY3Rpb25IYW5kbGVyIiwibm90aWZ5Q2hhbmdlIiwiZ2V0V2luZG93SW5uZXJIZWlnaHQiLCJjdHhfIiwiZGlzYWJsZWRfIiwiaXNGb2N1c2VkXyIsImRpc3BsYXlIYW5kbGVyXyIsIm9wZW5fIiwiZGlzcGxheVZpYUtleWJvYXJkSGFuZGxlcl8iLCJoYW5kbGVEaXNwbGF5VmlhS2V5Ym9hcmRfIiwic2VsZWN0aW9uSGFuZGxlcl8iLCJjbG9zZV8iLCJjYW5jZWxIYW5kbGVyXyIsInJlc2l6ZSIsInNlbGVjdGVkVGV4dENvbnRlbnQiLCJ0cmltIiwibGV0dGVyU3BhY2luZyIsInBhcnNlRmxvYXQiLCJwcmltYXJ5Rm9udEZhbWlseSIsInNwbGl0IiwiZm9udFNpemUiLCJtYXhUZXh0TGVuZ3RoIiwiaSIsImwiLCJzdXJmYWNlUGFkZGluZ1JpZ2h0IiwicGFyc2VJbnQiLCJzdXJmYWNlUGFkZGluZ0xlZnQiLCJzZWxlY3RCb3hBZGRlZFBhZGRpbmciLCJ0eHQiLCJhZGRlZFNwYWNlIiwibWF4IiwiY2VpbCIsImRpc2FibGVTY3JvbGxfIiwic2V0TWVudVN0eWxlc0Zvck9wZW5BdEluZGV4XyIsIml0ZW1PZmZzZXRUb3AiLCJhZGp1c3RlZFRvcCIsIm92ZXJmbG93c1RvcCIsIm92ZXJmbG93c0JvdHRvbSIsImVuYWJsZVNjcm9sbF8iLCJFVkVOVF9QSEFTRV9BVF9UQVJHRVQiLCJldmVudFBoYXNlIiwiaXNTcGFjZURvd24iLCJpc09wZW5lcktleSIsInNvbWUiLCJNRENTZWxlY3RCb3R0b21MaW5lQWRhcHRlciIsIkJPVFRPTV9MSU5FX0FDVElWRSIsIk1EQ1NlbGVjdEJvdHRvbUxpbmVGb3VuZGF0aW9uIiwiTURDU2VsZWN0TGFiZWxBZGFwdGVyIiwiTEFCRUxfRkxPQVRfQUJPVkUiLCJNRENTZWxlY3RMYWJlbEZvdW5kYXRpb24iLCJnZXRXaWR0aCIsIm11bHRpcGxlIiwiYm94IiwibGFiZWxDbGFzc2VzIiwiYm90dG9tTGluZUNsYXNzZXMiLCJzdXJmYWNlU3R5bGVzIiwidGFiSW5kZXgiLCJtZGNNZW51Iiwic2V0RGlzYWJsZWQiLCJyZWZyZXNoSW5kZXgiLCJtZW51Iiwib3B0aW9uVmFsdWUiLCJ0ZXh0Q29udGVudCIsImdldFZhbHVlIiwibGFiZWxGb3VuZGF0aW9uIiwiYm90dG9tTGluZUZvdW5kYXRpb24iLCJzdHlsZUZsb2F0IiwiYWN0aXZhdGUiLCJkZWFjdGl2YXRlIiwic3VyZmFjZSIsInByb3BlcnR5TmFtZSIsImdldENvbnRleHQiLCJvZmZzZXRUb3AiLCJsYWJlbFR4dCIsIm1heFNpemUiLCJkZWZhdWx0Iiwic2l6ZSIsImNvdW50IiwiY29tcHV0ZWQiLCJzY3JvbGwiLCJyZWZyZXNoU2l6ZSIsIm1lZGlhIiwiX21vYmlsZSIsIm1hdGNoTWVkaWEiLCJtaXhpbnMiLCJuYXRpdmUiLCJwcm92aWRlIiwibWRjU2VsZWN0IiwiTURDTmF0aXZlU2VsZWN0IiwiTURDTWVudVNlbGVjdCIsIk1EQ011bHRpU2VsZWN0IiwibW9iaWxlIiwibWF0Y2hlcyIsImlzTmF0aXZlIiwicmVmcmVzaE1lZGlhIiwiYmVmb3JlTW91bnQiLCJhZGRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwiaGFzVmFsdWUiLCJpbmplY3QiLCJNRENOYXRpdmVPcHRpb24iLCJNRENNdWx0aU9wdGlvbiIsIk1EQ01lbnVPcHRpb24iLCJtZGNPcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjtFQUNoQztFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtFQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDeEM7RUFDQUgsV0FBT0csT0FBT0QsR0FBZDtFQUNEO0VBQ0QsTUFBSUYsSUFBSixFQUFVO0VBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtFQUNEO0VBQ0Y7O0VDWk0sU0FBU00sVUFBVCxDQUFxQkMsVUFBckIsRUFBaUM7RUFDdEMsU0FBTztFQUNMQyxhQUFTLFFBREo7RUFFTEMsYUFB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
