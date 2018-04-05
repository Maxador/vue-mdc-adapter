/**
* @module vue-mdc-adaptermenu 0.13.2
* @exports VueMDCMenu
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCMenu = factory());
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

  var mdcMenuItem = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-menu-item mdc-list-item", attrs: { "role": "menuitem", "tabindex": _vm.disabled ? '-1' : '0', "aria-disabled": _vm.disabled } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-menu-item',
    props: {
      disabled: Boolean
    }
  };

  var mdcMenuDivider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { staticClass: "mdc-menu-divider mdc-list-divider", attrs: { "role": "separator" } });
    }, staticRenderFns: [],
    name: 'mdc-menu-divider'
  };

  var mdcMenuAnchor = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-menu-anchor" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-menu-anchor'
  };

  var plugin = BasePlugin({
    mdcMenu: mdcMenu,
    mdcMenuItem: mdcMenuItem,
    mdcMenuDivider: mdcMenuDivider,
    mdcMenuAnchor: mdcMenuAnchor
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbWVudS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbWVudS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9tZW51L3V0aWwuanMiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvbWRjLW1lbnUudnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWl0ZW0udnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWRpdmlkZXIudnVlIiwiLi4vLi4vY29tcG9uZW50cy9tZW51L21kYy1tZW51LWFuY2hvci52dWUiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL21lbnUvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0IChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4gICIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luIChjb21wb25lbnRzKSB7IFxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogKHZtKSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfSBcbn1cblxuIiwiLyogZ2xvYmFsIEN1c3RvbUV2ZW50ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0Q3VzdG9tRXZlbnQgKGVsLCBldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICBsZXQgZXZ0XG4gIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSlcbiAgfVxuICBlbC5kaXNwYXRjaEV2ZW50KGV2dClcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIE1lbnUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gZm9jdXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBldmVudCBoYW5kbGVyc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDTWVudUFkYXB0ZXIge1xuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGhhc05lY2Vzc2FyeURvbSgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlTmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldCh0YXJnZXQsIGF0dHJpYnV0ZU5hbWUpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3sgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfX0gKi9cbiAgZ2V0SW5uZXJEaW1lbnNpb25zKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaGFzQW5jaG9yKCkge31cblxuICAvKiogQHJldHVybiB7e3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19ICovXG4gIGdldEFuY2hvckRpbWVuc2lvbnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH19ICovXG4gIGdldFdpbmRvd0RpbWVuc2lvbnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldE51bWJlck9mSXRlbXMoKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCl9IGhhbmRsZXIgKi9cbiAgcmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KX0gaGFuZGxlciAqL1xuICBkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0SW5kZXhGb3JFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqIEBwYXJhbSB7e2luZGV4OiBudW1iZXJ9fSBldnREYXRhICovXG4gIG5vdGlmeVNlbGVjdGVkKGV2dERhdGEpIHt9XG5cbiAgbm90aWZ5Q2FuY2VsKCkge31cblxuICBzYXZlRm9jdXMoKSB7fVxuXG4gIHJlc3RvcmVGb2N1cygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRm9jdXNlZCgpIHt9XG5cbiAgZm9jdXMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldEZvY3VzZWRJdGVtSW5kZXgoKSAvKiBudW1iZXIgKi8ge31cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IGluZGV4ICovXG4gIGZvY3VzSXRlbUF0SW5kZXgoaW5kZXgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzUnRsKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbiAqL1xuICBzZXRUcmFuc2Zvcm1PcmlnaW4ob3JpZ2luKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3tcbiAgKiAgIHRvcDogKHN0cmluZ3x1bmRlZmluZWQpLFxuICAqICAgcmlnaHQ6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAgKiAgIGJvdHRvbTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICAqICAgbGVmdDogKHN0cmluZ3x1bmRlZmluZWQpXG4gICogfX0gcG9zaXRpb24gKi9cbiAgc2V0UG9zaXRpb24ocG9zaXRpb24pIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBoZWlnaHQgKi9cbiAgc2V0TWF4SGVpZ2h0KGhlaWdodCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0QXR0ckZvck9wdGlvbkF0SW5kZXgoaW5kZXgsIGF0dHIsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAgICovXG4gIHJtQXR0ckZvck9wdGlvbkF0SW5kZXgoaW5kZXgsIGF0dHIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXgoaW5kZXgsIGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICovXG4gIHJtQ2xhc3NGb3JPcHRpb25BdEluZGV4KGluZGV4LCBjbGFzc05hbWUpIHt9XG59XG5cbmV4cG9ydCB7TURDTWVudUFkYXB0ZXJ9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1tZW51JyxcbiAgT1BFTjogJ21kYy1tZW51LS1vcGVuJyxcbiAgQU5JTUFUSU5HX09QRU46ICdtZGMtbWVudS0tYW5pbWF0aW5nLW9wZW4nLFxuICBBTklNQVRJTkdfQ0xPU0VEOiAnbWRjLW1lbnUtLWFuaW1hdGluZy1jbG9zZWQnLFxuICBTRUxFQ1RFRF9MSVNUX0lURU06ICdtZGMtbGlzdC1pdGVtLS1zZWxlY3RlZCcsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIElURU1TX1NFTEVDVE9SOiAnLm1kYy1tZW51X19pdGVtcycsXG4gIFNFTEVDVEVEX0VWRU5UOiAnTURDTWVudTpzZWxlY3RlZCcsXG4gIENBTkNFTF9FVkVOVDogJ01EQ01lbnU6Y2FuY2VsJyxcbiAgQVJJQV9ESVNBQkxFRF9BVFRSOiAnYXJpYS1kaXNhYmxlZCcsXG59O1xuXG4vKiogQGVudW0ge251bWJlcn0gKi9cbmNvbnN0IG51bWJlcnMgPSB7XG4gIC8vIEFtb3VudCBvZiB0aW1lIHRvIHdhaXQgYmVmb3JlIHRyaWdnZXJpbmcgYSBzZWxlY3RlZCBldmVudCBvbiB0aGUgbWVudS4gTm90ZSB0aGF0IHRoaXMgdGltZVxuICAvLyB3aWxsIG1vc3QgbGlrZWx5IGJlIGJ1bXBlZCB1cCBvbmNlIGludGVyYWN0aXZlIGxpc3RzIGFyZSBzdXBwb3J0ZWQgdG8gYWxsb3cgZm9yIHRoZSByaXBwbGUgdG9cbiAgLy8gYW5pbWF0ZSBiZWZvcmUgY2xvc2luZyB0aGUgbWVudVxuICBTRUxFQ1RFRF9UUklHR0VSX0RFTEFZOiA1MCxcbiAgLy8gVG90YWwgZHVyYXRpb24gb2YgbWVudSBvcGVuIGFuaW1hdGlvbi5cbiAgVFJBTlNJVElPTl9PUEVOX0RVUkFUSU9OOiAxMjAsXG4gIC8vIFRvdGFsIGR1cmF0aW9uIG9mIG1lbnUgY2xvc2UgYW5pbWF0aW9uLlxuICBUUkFOU0lUSU9OX0NMT1NFX0RVUkFUSU9OOiA3NSxcbiAgLy8gTWFyZ2luIGxlZnQgdG8gdGhlIGVkZ2Ugb2YgdGhlIHZpZXdwb3J0IHdoZW4gbWVudSBpcyBhdCBtYXhpbXVtIHBvc3NpYmxlIGhlaWdodC5cbiAgTUFSR0lOX1RPX0VER0U6IDMyLFxuICAvLyBSYXRpbyBvZiBhbmNob3Igd2lkdGggdG8gbWVudSB3aWR0aCBmb3Igc3dpdGNoaW5nIGZyb20gY29ybmVyIHBvc2l0aW9uaW5nIHRvIGNlbnRlciBwb3NpdGlvbmluZy5cbiAgQU5DSE9SX1RPX01FTlVfV0lEVEhfUkFUSU86IDAuNjcsXG4gIC8vIFJhdGlvIG9mIHZlcnRpY2FsIG9mZnNldCB0byBtZW51IGhlaWdodCBmb3Igc3dpdGNoaW5nIGZyb20gY29ybmVyIHRvIG1pZC13YXkgb3JpZ2luIHBvc2l0aW9uaW5nLlxuICBPRkZTRVRfVE9fTUVOVV9IRUlHSFRfUkFUSU86IDAuMSxcbn07XG5cbi8qKlxuICogRW51bSBmb3IgYml0cyBpbiB0aGUge0BzZWUgQ29ybmVyKSBiaXRtYXAuXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBDb3JuZXJCaXQgPSB7XG4gIEJPVFRPTTogMSxcbiAgQ0VOVEVSOiAyLFxuICBSSUdIVDogNCxcbiAgRkxJUF9SVEw6IDgsXG59O1xuXG4vKipcbiAqIEVudW0gZm9yIHJlcHJlc2VudGluZyBhbiBlbGVtZW50IGNvcm5lciBmb3IgcG9zaXRpb25pbmcgdGhlIG1lbnUuXG4gKlxuICogVGhlIFNUQVJUIGNvbnN0YW50cyBtYXAgdG8gTEVGVCBpZiBlbGVtZW50IGRpcmVjdGlvbmFsaXR5IGlzIGxlZnRcbiAqIHRvIHJpZ2h0IGFuZCBSSUdIVCBpZiB0aGUgZGlyZWN0aW9uYWxpdHkgaXMgcmlnaHQgdG8gbGVmdC5cbiAqIExpa2V3aXNlIEVORCBtYXBzIHRvIFJJR0hUIG9yIExFRlQgZGVwZW5kaW5nIG9uIHRoZSBkaXJlY3Rpb25hbGl0eS5cbiAqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBDb3JuZXIgPSB7XG4gIFRPUF9MRUZUOiAwLFxuICBUT1BfUklHSFQ6IENvcm5lckJpdC5SSUdIVCxcbiAgQk9UVE9NX0xFRlQ6IENvcm5lckJpdC5CT1RUT00sXG4gIEJPVFRPTV9SSUdIVDogQ29ybmVyQml0LkJPVFRPTSB8IENvcm5lckJpdC5SSUdIVCxcbiAgVE9QX1NUQVJUOiBDb3JuZXJCaXQuRkxJUF9SVEwsXG4gIFRPUF9FTkQ6IENvcm5lckJpdC5GTElQX1JUTCB8IENvcm5lckJpdC5SSUdIVCxcbiAgQk9UVE9NX1NUQVJUOiBDb3JuZXJCaXQuQk9UVE9NIHwgQ29ybmVyQml0LkZMSVBfUlRMLFxuICBCT1RUT01fRU5EOiBDb3JuZXJCaXQuQk9UVE9NIHwgQ29ybmVyQml0LlJJR0hUIHwgQ29ybmVyQml0LkZMSVBfUlRMLFxufTtcblxuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnMsIENvcm5lckJpdCwgQ29ybmVyfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHRvcDogbnVtYmVyLFxuICogICByaWdodDogbnVtYmVyLFxuICogICBib3R0b206IG51bWJlcixcbiAqICAgbGVmdDogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgQW5jaG9yTWFyZ2luO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB2aWV3cG9ydDogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9LFxuICogICB2aWV3cG9ydERpc3RhbmNlOiB7dG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9LFxuICogICBhbmNob3JIZWlnaHQ6IG51bWJlcixcbiAqICAgYW5jaG9yV2lkdGg6IG51bWJlcixcbiAqICAgbWVudUhlaWdodDogbnVtYmVyLFxuICogICBtZW51V2lkdGg6IG51bWJlcixcbiAqIH19XG4gKi9cbmxldCBBdXRvTGF5b3V0TWVhc3VyZW1lbnRzO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7TURDTWVudUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnMsIENvcm5lciwgQ29ybmVyQml0fSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ01lbnVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDTWVudUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJ9ICovXG4gIHN0YXRpYyBnZXQgQ29ybmVyKCkge1xuICAgIHJldHVybiBDb3JuZXI7XG4gIH1cblxuICAvKipcbiAgICoge0BzZWUgTURDTWVudUFkYXB0ZXJ9IGZvciB0eXBpbmcgaW5mb3JtYXRpb24gb24gcGFyYW1ldGVycyBhbmQgcmV0dXJuXG4gICAqIHR5cGVzLlxuICAgKiBAcmV0dXJuIHshTURDTWVudUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENNZW51QWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoKSA9PiBmYWxzZSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4gZmFsc2UsXG4gICAgICBnZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldDogKCkgPT4ge30sXG4gICAgICBnZXRJbm5lckRpbWVuc2lvbnM6ICgpID0+ICh7fSksXG4gICAgICBoYXNBbmNob3I6ICgpID0+IGZhbHNlLFxuICAgICAgZ2V0QW5jaG9yRGltZW5zaW9uczogKCkgPT4gKHt9KSxcbiAgICAgIGdldFdpbmRvd0RpbWVuc2lvbnM6ICgpID0+ICh7fSksXG4gICAgICBnZXROdW1iZXJPZkl0ZW1zOiAoKSA9PiAwLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKCkgPT4ge30sXG4gICAgICByZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckJvZHlDbGlja0hhbmRsZXI6ICgpID0+IHt9LFxuICAgICAgZ2V0SW5kZXhGb3JFdmVudFRhcmdldDogKCkgPT4gMCxcbiAgICAgIG5vdGlmeVNlbGVjdGVkOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUNhbmNlbDogKCkgPT4ge30sXG4gICAgICBzYXZlRm9jdXM6ICgpID0+IHt9LFxuICAgICAgcmVzdG9yZUZvY3VzOiAoKSA9PiB7fSxcbiAgICAgIGlzRm9jdXNlZDogKCkgPT4gZmFsc2UsXG4gICAgICBmb2N1czogKCkgPT4ge30sXG4gICAgICBnZXRGb2N1c2VkSXRlbUluZGV4OiAoKSA9PiAtMSxcbiAgICAgIGZvY3VzSXRlbUF0SW5kZXg6ICgpID0+IHt9LFxuICAgICAgaXNSdGw6ICgpID0+IGZhbHNlLFxuICAgICAgc2V0VHJhbnNmb3JtT3JpZ2luOiAoKSA9PiB7fSxcbiAgICAgIHNldFBvc2l0aW9uOiAoKSA9PiB7fSxcbiAgICAgIHNldE1heEhlaWdodDogKCkgPT4ge30sXG4gICAgICBzZXRBdHRyRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgICBybUF0dHJGb3JPcHRpb25BdEluZGV4OiAoKSA9PiB7fSxcbiAgICAgIGFkZENsYXNzRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgICBybUNsYXNzRm9yT3B0aW9uQXRJbmRleDogKCkgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHshTURDTWVudUFkYXB0ZXJ9IGFkYXB0ZXIgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDTWVudUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmNsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMua2V5ZG93bkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVLZXlib2FyZERvd25fKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMua2V5dXBIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlS2V5Ym9hcmRVcF8oZXZ0KTtcbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5kb2N1bWVudENsaWNrSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2tfKGV2dCk7XG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuaXNPcGVuXyA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfID0gMDtcbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8gPSAwO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8gPSAwO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYW5pbWF0aW9uUmVxdWVzdElkXyA9IDA7XG4gICAgLyoqIEBwcml2YXRlIHsheyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9fSAqL1xuICAgIHRoaXMuZGltZW5zaW9uc187XG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pdGVtSGVpZ2h0XztcbiAgICAvKiogQHByaXZhdGUge0Nvcm5lcn0gKi9cbiAgICB0aGlzLmFuY2hvckNvcm5lcl8gPSBDb3JuZXIuVE9QX1NUQVJUO1xuICAgIC8qKiBAcHJpdmF0ZSB7QW5jaG9yTWFyZ2lufSAqL1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXyA9IHt0b3A6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIGxlZnQ6IDB9O1xuICAgIC8qKiBAcHJpdmF0ZSB7P0F1dG9MYXlvdXRNZWFzdXJlbWVudHN9ICovXG4gICAgdGhpcy5tZWFzdXJlc18gPSBudWxsO1xuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleF8gPSAtMTtcbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5yZW1lbWJlclNlbGVjdGlvbl8gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5xdWlja09wZW5fID0gZmFsc2U7XG5cbiAgICAvLyBBIGtleXVwIGV2ZW50IG9uIHRoZSBtZW51IG5lZWRzIHRvIGhhdmUgYSBjb3JyZXNwb25kaW5nIGtleWRvd25cbiAgICAvLyBldmVudCBvbiB0aGUgbWVudS4gSWYgdGhlIHVzZXIgb3BlbnMgdGhlIG1lbnUgd2l0aCBhIGtleWRvd24gZXZlbnQgb24gYVxuICAgIC8vIGJ1dHRvbiwgdGhlIG1lbnUgd2lsbCBvbmx5IGdldCB0aGUga2V5IHVwIGV2ZW50IGNhdXNpbmcgYnVnZ3kgYmVoYXZpb3Igd2l0aCBzZWxlY3RlZCBlbGVtZW50cy5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5rZXlEb3duV2l0aGluTWVudV8gPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3Qge1JPT1QsIE9QRU59ID0gTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhST09UKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke1JPT1R9IGNsYXNzIHJlcXVpcmVkIGluIHJvb3QgZWxlbWVudC5gKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaGFzTmVjZXNzYXJ5RG9tKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZWQgRE9NIG5vZGVzIG1pc3NpbmcgaW4gJHtST09UfSBjb21wb25lbnQuYCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoT1BFTikpIHtcbiAgICAgIHRoaXMuaXNPcGVuXyA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5rZXl1cEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZWxlY3RlZFRyaWdnZXJUaW1lcklkXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZUFuaW1hdGlvbkVuZFRpbWVySWRfKTtcbiAgICAvLyBDYW5jZWwgYW55IGN1cnJlbnRseSBydW5uaW5nIGFuaW1hdGlvbnMuXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXF1ZXN0SWRfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5rZXl1cEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25IYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcih0aGlzLmRvY3VtZW50Q2xpY2tIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshQ29ybmVyfSBjb3JuZXIgRGVmYXVsdCBhbmNob3IgY29ybmVyIGFsaWdubWVudCBvZiB0b3AtbGVmdCBtZW51IGNvcm5lci5cbiAgICovXG4gIHNldEFuY2hvckNvcm5lcihjb3JuZXIpIHtcbiAgICB0aGlzLmFuY2hvckNvcm5lcl8gPSBjb3JuZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshQW5jaG9yTWFyZ2lufSBtYXJnaW4gNC1wbGV0IG9mIG1hcmdpbnMgZnJvbSBhbmNob3IuXG4gICAqL1xuICBzZXRBbmNob3JNYXJnaW4obWFyZ2luKSB7XG4gICAgdGhpcy5hbmNob3JNYXJnaW5fLnRvcCA9IHR5cGVvZiBtYXJnaW4udG9wID09PSAnbnVtYmVyJyA/IG1hcmdpbi50b3AgOiAwO1xuICAgIHRoaXMuYW5jaG9yTWFyZ2luXy5yaWdodCA9IHR5cGVvZiBtYXJnaW4ucmlnaHQgPT09ICdudW1iZXInID8gbWFyZ2luLnJpZ2h0IDogMDtcbiAgICB0aGlzLmFuY2hvck1hcmdpbl8uYm90dG9tID0gdHlwZW9mIG1hcmdpbi5ib3R0b20gPT09ICdudW1iZXInID8gbWFyZ2luLmJvdHRvbSA6IDA7XG4gICAgdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQgPSB0eXBlb2YgbWFyZ2luLmxlZnQgPT09ICdudW1iZXInID8gbWFyZ2luLmxlZnQgOiAwO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gcmVtZW1iZXJTZWxlY3Rpb24gKi9cbiAgc2V0UmVtZW1iZXJTZWxlY3Rpb24ocmVtZW1iZXJTZWxlY3Rpb24pIHtcbiAgICB0aGlzLnJlbWVtYmVyU2VsZWN0aW9uXyA9IHJlbWVtYmVyU2VsZWN0aW9uO1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleCgtMSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBxdWlja09wZW4gKi9cbiAgc2V0UXVpY2tPcGVuKHF1aWNrT3Blbikge1xuICAgIHRoaXMucXVpY2tPcGVuXyA9IHF1aWNrT3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9udW1iZXJ9IGZvY3VzSW5kZXhcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZvY3VzT25PcGVuXyhmb2N1c0luZGV4KSB7XG4gICAgaWYgKGZvY3VzSW5kZXggPT09IG51bGwpIHtcbiAgICAgIC8vIElmIHRoaXMgaW5zdGFuY2Ugb2YgTURDTWVudSByZW1lbWJlcnMgc2VsZWN0aW9ucywgYW5kIHRoZSB1c2VyIGhhc1xuICAgICAgLy8gbWFkZSBhIHNlbGVjdGlvbiwgdGhlbiBmb2N1cyB0aGUgbGFzdCBzZWxlY3RlZCBpdGVtXG4gICAgICBpZiAodGhpcy5yZW1lbWJlclNlbGVjdGlvbl8gJiYgdGhpcy5zZWxlY3RlZEluZGV4XyA+PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXhfKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzKCk7XG4gICAgICAvLyBJZiB0aGF0IGRvZXNuJ3Qgd29yaywgZm9jdXMgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGZvY3VzSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgY2xpY2tzIGFuZCBjYW5jZWwgdGhlIG1lbnUgaWYgbm90IGEgY2hpbGQgbGlzdC1pdGVtXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZURvY3VtZW50Q2xpY2tfKGV2dCkge1xuICAgIGxldCBlbCA9IGV2dC50YXJnZXQ7XG5cbiAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0SW5kZXhGb3JFdmVudFRhcmdldChlbCkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUNhbmNlbCgpO1xuICAgIHRoaXMuY2xvc2UoZXZ0KTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlIGtleXMgdGhhdCB3ZSB3YW50IHRvIHJlcGVhdCBvbiBob2xkICh0YWIgYW5kIGFycm93cykuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUtleWJvYXJkRG93bl8oZXZ0KSB7XG4gICAgLy8gRG8gbm90aGluZyBpZiBBbHQsIEN0cmwgb3IgTWV0YSBhcmUgcHJlc3NlZC5cbiAgICBpZiAoZXZ0LmFsdEtleSB8fCBldnQuY3RybEtleSB8fCBldnQubWV0YUtleSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3Qge2tleUNvZGUsIGtleSwgc2hpZnRLZXl9ID0gZXZ0O1xuICAgIGNvbnN0IGlzVGFiID0ga2V5ID09PSAnVGFiJyB8fCBrZXlDb2RlID09PSA5O1xuICAgIGNvbnN0IGlzQXJyb3dVcCA9IGtleSA9PT0gJ0Fycm93VXAnIHx8IGtleUNvZGUgPT09IDM4O1xuICAgIGNvbnN0IGlzQXJyb3dEb3duID0ga2V5ID09PSAnQXJyb3dEb3duJyB8fCBrZXlDb2RlID09PSA0MDtcbiAgICBjb25zdCBpc1NwYWNlID0ga2V5ID09PSAnU3BhY2UnIHx8IGtleUNvZGUgPT09IDMyO1xuICAgIGNvbnN0IGlzRW50ZXIgPSBrZXkgPT09ICdFbnRlcicgfHwga2V5Q29kZSA9PT0gMTM7XG4gICAgLy8gVGhlIG1lbnUgbmVlZHMgdG8ga25vdyBpZiB0aGUga2V5ZG93biBldmVudCB3YXMgdHJpZ2dlcmVkIG9uIHRoZSBtZW51XG4gICAgdGhpcy5rZXlEb3duV2l0aGluTWVudV8gPSBpc0VudGVyIHx8IGlzU3BhY2U7XG5cbiAgICBjb25zdCBmb2N1c2VkSXRlbUluZGV4ID0gdGhpcy5hZGFwdGVyXy5nZXRGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgY29uc3QgbGFzdEl0ZW1JbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0TnVtYmVyT2ZJdGVtcygpIC0gMTtcblxuICAgIGlmIChzaGlmdEtleSAmJiBpc1RhYiAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgobGFzdEl0ZW1JbmRleCk7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXNoaWZ0S2V5ICYmIGlzVGFiICYmIGZvY3VzZWRJdGVtSW5kZXggPT09IGxhc3RJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBBcnJvd3tVcCxEb3dufSBhbmQgc3BhY2UgZG8gbm90IGNhdXNlIGluYWR2ZXJ0ZW50IHNjcm9sbGluZ1xuICAgIGlmIChpc0Fycm93VXAgfHwgaXNBcnJvd0Rvd24gfHwgaXNTcGFjZSkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyb3dVcCkge1xuICAgICAgaWYgKGZvY3VzZWRJdGVtSW5kZXggPT09IDAgfHwgdGhpcy5hZGFwdGVyXy5pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgobGFzdEl0ZW1JbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgoZm9jdXNlZEl0ZW1JbmRleCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNBcnJvd0Rvd24pIHtcbiAgICAgIGlmIChmb2N1c2VkSXRlbUluZGV4ID09PSBsYXN0SXRlbUluZGV4IHx8IHRoaXMuYWRhcHRlcl8uaXNGb2N1c2VkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0l0ZW1BdEluZGV4KGZvY3VzZWRJdGVtSW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUga2V5cyB0aGF0IHdlIGRvbid0IHdhbnQgdG8gcmVwZWF0IG9uIGhvbGQgKEVudGVyLCBTcGFjZSwgRXNjYXBlKS5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlS2V5Ym9hcmRVcF8oZXZ0KSB7XG4gICAgLy8gRG8gbm90aGluZyBpZiBBbHQsIEN0cmwgb3IgTWV0YSBhcmUgcHJlc3NlZC5cbiAgICBpZiAoZXZ0LmFsdEtleSB8fCBldnQuY3RybEtleSB8fCBldnQubWV0YUtleSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3Qge2tleUNvZGUsIGtleX0gPSBldnQ7XG4gICAgY29uc3QgaXNFbnRlciA9IGtleSA9PT0gJ0VudGVyJyB8fCBrZXlDb2RlID09PSAxMztcbiAgICBjb25zdCBpc1NwYWNlID0ga2V5ID09PSAnU3BhY2UnIHx8IGtleUNvZGUgPT09IDMyO1xuICAgIGNvbnN0IGlzRXNjYXBlID0ga2V5ID09PSAnRXNjYXBlJyB8fCBrZXlDb2RlID09PSAyNztcblxuICAgIGlmIChpc0VudGVyIHx8IGlzU3BhY2UpIHtcbiAgICAgIC8vIElmIHRoZSBrZXlkb3duIGV2ZW50IGRpZG4ndCBvY2N1ciBvbiB0aGUgbWVudSwgdGhlbiBpdCBzaG91bGRcbiAgICAgIC8vIGRpc3JlZ2FyZCB0aGUgcG9zc2libGUgc2VsZWN0ZWQgZXZlbnQuXG4gICAgICBpZiAodGhpcy5rZXlEb3duV2l0aGluTWVudV8pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVQb3NzaWJsZVNlbGVjdGVkXyhldnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5rZXlEb3duV2l0aGluTWVudV8gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNFc2NhcGUpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2FuY2VsKCk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlUG9zc2libGVTZWxlY3RlZF8oZXZ0KSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQoZXZ0LnRhcmdldCwgc3RyaW5ncy5BUklBX0RJU0FCTEVEX0FUVFIpID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSB0aGlzLmFkYXB0ZXJfLmdldEluZGV4Rm9yRXZlbnRUYXJnZXQoZXZ0LnRhcmdldCk7XG4gICAgaWYgKHRhcmdldEluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBEZWJvdW5jZSBtdWx0aXBsZSBzZWxlY3Rpb25zXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlnZ2VyVGltZXJJZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZFRyaWdnZXJUaW1lcklkXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RlZFRyaWdnZXJUaW1lcklkXyA9IDA7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICBpZiAodGhpcy5yZW1lbWJlclNlbGVjdGlvbl8pIHtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEluZGV4KHRhcmdldEluZGV4KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5U2VsZWN0ZWQoe2luZGV4OiB0YXJnZXRJbmRleH0pO1xuICAgIH0sIG51bWJlcnMuU0VMRUNURURfVFJJR0dFUl9ERUxBWSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7QXV0b0xheW91dE1lYXN1cmVtZW50c30gTWVhc3VyZW1lbnRzIHVzZWQgdG8gcG9zaXRpb24gbWVudSBwb3B1cC5cbiAgICovXG4gIGdldEF1dG9MYXlvdXRNZWFzdXJlbWVudHNfKCkge1xuICAgIGNvbnN0IGFuY2hvclJlY3QgPSB0aGlzLmFkYXB0ZXJfLmdldEFuY2hvckRpbWVuc2lvbnMoKTtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93RGltZW5zaW9ucygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXdwb3J0OiB2aWV3cG9ydCxcbiAgICAgIHZpZXdwb3J0RGlzdGFuY2U6IHtcbiAgICAgICAgdG9wOiBhbmNob3JSZWN0LnRvcCxcbiAgICAgICAgcmlnaHQ6IHZpZXdwb3J0LndpZHRoIC0gYW5jaG9yUmVjdC5yaWdodCxcbiAgICAgICAgbGVmdDogYW5jaG9yUmVjdC5sZWZ0LFxuICAgICAgICBib3R0b206IHZpZXdwb3J0LmhlaWdodCAtIGFuY2hvclJlY3QuYm90dG9tLFxuICAgICAgfSxcbiAgICAgIGFuY2hvckhlaWdodDogYW5jaG9yUmVjdC5oZWlnaHQsXG4gICAgICBhbmNob3JXaWR0aDogYW5jaG9yUmVjdC53aWR0aCxcbiAgICAgIG1lbnVIZWlnaHQ6IHRoaXMuZGltZW5zaW9uc18uaGVpZ2h0LFxuICAgICAgbWVudVdpZHRoOiB0aGlzLmRpbWVuc2lvbnNfLndpZHRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGNvcm5lciBvZiB0aGUgYW5jaG9yIGZyb20gd2hpY2ggdG8gYW5pbWF0ZSBhbmQgcG9zaXRpb24gdGhlIG1lbnUuXG4gICAqIEByZXR1cm4ge0Nvcm5lcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE9yaWdpbkNvcm5lcl8oKSB7XG4gICAgLy8gRGVmYXVsdHM6IG9wZW4gZnJvbSB0aGUgdG9wIGxlZnQuXG4gICAgbGV0IGNvcm5lciA9IENvcm5lci5UT1BfTEVGVDtcblxuICAgIGNvbnN0IHt2aWV3cG9ydERpc3RhbmNlLCBhbmNob3JIZWlnaHQsIGFuY2hvcldpZHRoLCBtZW51SGVpZ2h0LCBtZW51V2lkdGh9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNCb3R0b21BbGlnbmVkID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuQk9UVE9NKTtcbiAgICBjb25zdCBhdmFpbGFibGVUb3AgPSBpc0JvdHRvbUFsaWduZWQgPyB2aWV3cG9ydERpc3RhbmNlLnRvcCArIGFuY2hvckhlaWdodCArIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b21cbiAgICAgIDogdmlld3BvcnREaXN0YW5jZS50b3AgKyB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuICAgIGNvbnN0IGF2YWlsYWJsZUJvdHRvbSA9IGlzQm90dG9tQWxpZ25lZCA/IHZpZXdwb3J0RGlzdGFuY2UuYm90dG9tIC0gdGhpcy5hbmNob3JNYXJnaW5fLmJvdHRvbVxuICAgICAgOiB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSArIGFuY2hvckhlaWdodCAtIHRoaXMuYW5jaG9yTWFyZ2luXy50b3A7XG5cbiAgICBjb25zdCB0b3BPdmVyZmxvdyA9IG1lbnVIZWlnaHQgLSBhdmFpbGFibGVUb3A7XG4gICAgY29uc3QgYm90dG9tT3ZlcmZsb3cgPSBtZW51SGVpZ2h0IC0gYXZhaWxhYmxlQm90dG9tO1xuICAgIGlmIChib3R0b21PdmVyZmxvdyA+IDAgJiYgdG9wT3ZlcmZsb3cgPCBib3R0b21PdmVyZmxvdykge1xuICAgICAgY29ybmVyIHw9IENvcm5lckJpdC5CT1RUT007XG4gICAgfVxuXG4gICAgY29uc3QgaXNSdGwgPSB0aGlzLmFkYXB0ZXJfLmlzUnRsKCk7XG4gICAgY29uc3QgaXNGbGlwUnRsID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuRkxJUF9SVEwpO1xuICAgIGNvbnN0IGF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgPSBCb29sZWFuKHRoaXMuYW5jaG9yQ29ybmVyXyAmIENvcm5lckJpdC5SSUdIVCk7XG4gICAgY29uc3QgaXNBbGlnbmVkUmlnaHQgPSAoYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCAmJiAhaXNSdGwpIHx8XG4gICAgICAoIWF2b2lkSG9yaXpvbnRhbE92ZXJsYXAgJiYgaXNGbGlwUnRsICYmIGlzUnRsKTtcbiAgICBjb25zdCBhdmFpbGFibGVMZWZ0ID0gaXNBbGlnbmVkUmlnaHQgPyB2aWV3cG9ydERpc3RhbmNlLmxlZnQgKyBhbmNob3JXaWR0aCArIHRoaXMuYW5jaG9yTWFyZ2luXy5yaWdodCA6XG4gICAgICB2aWV3cG9ydERpc3RhbmNlLmxlZnQgKyB0aGlzLmFuY2hvck1hcmdpbl8ubGVmdDtcbiAgICBjb25zdCBhdmFpbGFibGVSaWdodCA9IGlzQWxpZ25lZFJpZ2h0ID8gdmlld3BvcnREaXN0YW5jZS5yaWdodCAtIHRoaXMuYW5jaG9yTWFyZ2luXy5yaWdodCA6XG4gICAgICB2aWV3cG9ydERpc3RhbmNlLnJpZ2h0ICsgYW5jaG9yV2lkdGggLSB0aGlzLmFuY2hvck1hcmdpbl8ubGVmdDtcblxuICAgIGNvbnN0IGxlZnRPdmVyZmxvdyA9IG1lbnVXaWR0aCAtIGF2YWlsYWJsZUxlZnQ7XG4gICAgY29uc3QgcmlnaHRPdmVyZmxvdyA9IG1lbnVXaWR0aCAtIGF2YWlsYWJsZVJpZ2h0O1xuXG4gICAgaWYgKChsZWZ0T3ZlcmZsb3cgPCAwICYmIGlzQWxpZ25lZFJpZ2h0ICYmIGlzUnRsKSB8fFxuICAgICAgICAoYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCAmJiAhaXNBbGlnbmVkUmlnaHQgJiYgbGVmdE92ZXJmbG93IDwgMCkgfHxcbiAgICAgICAgKHJpZ2h0T3ZlcmZsb3cgPiAwICYmIGxlZnRPdmVyZmxvdyA8IHJpZ2h0T3ZlcmZsb3cpKSB7XG4gICAgICBjb3JuZXIgfD0gQ29ybmVyQml0LlJJR0hUO1xuICAgIH1cblxuICAgIHJldHVybiBjb3JuZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBPcmlnaW4gY29ybmVyIG9mIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IEhvcml6b250YWwgb2Zmc2V0IG9mIG1lbnUgb3JpZ2luIGNvcm5lciBmcm9tIGNvcnJlc3BvbmRpbmcgYW5jaG9yIGNvcm5lci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldEhvcml6b250YWxPcmlnaW5PZmZzZXRfKGNvcm5lcikge1xuICAgIGNvbnN0IHthbmNob3JXaWR0aH0gPSB0aGlzLm1lYXN1cmVzXztcbiAgICBjb25zdCBpc1JpZ2h0QWxpZ25lZCA9IEJvb2xlYW4oY29ybmVyICYgQ29ybmVyQml0LlJJR0hUKTtcbiAgICBjb25zdCBhdm9pZEhvcml6b250YWxPdmVybGFwID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuUklHSFQpO1xuICAgIGxldCB4ID0gMDtcbiAgICBpZiAoaXNSaWdodEFsaWduZWQpIHtcbiAgICAgIGNvbnN0IHJpZ2h0T2Zmc2V0ID0gYXZvaWRIb3Jpem9udGFsT3ZlcmxhcCA/IGFuY2hvcldpZHRoIC0gdGhpcy5hbmNob3JNYXJnaW5fLmxlZnQgOiB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQ7XG4gICAgICB4ID0gcmlnaHRPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlZnRPZmZzZXQgPSBhdm9pZEhvcml6b250YWxPdmVybGFwID8gYW5jaG9yV2lkdGggLSB0aGlzLmFuY2hvck1hcmdpbl8ucmlnaHQgOiB0aGlzLmFuY2hvck1hcmdpbl8ubGVmdDtcbiAgICAgIHggPSBsZWZ0T2Zmc2V0O1xuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Nvcm5lcn0gY29ybmVyIE9yaWdpbiBjb3JuZXIgb2YgdGhlIG1lbnUuXG4gICAqIEByZXR1cm4ge251bWJlcn0gVmVydGljYWwgb2Zmc2V0IG9mIG1lbnUgb3JpZ2luIGNvcm5lciBmcm9tIGNvcnJlc3BvbmRpbmcgYW5jaG9yIGNvcm5lci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldFZlcnRpY2FsT3JpZ2luT2Zmc2V0Xyhjb3JuZXIpIHtcbiAgICBjb25zdCB7dmlld3BvcnQsIHZpZXdwb3J0RGlzdGFuY2UsIGFuY2hvckhlaWdodCwgbWVudUhlaWdodH0gPSB0aGlzLm1lYXN1cmVzXztcbiAgICBjb25zdCBpc0JvdHRvbUFsaWduZWQgPSBCb29sZWFuKGNvcm5lciAmIENvcm5lckJpdC5CT1RUT00pO1xuICAgIGNvbnN0IHtNQVJHSU5fVE9fRURHRX0gPSBNRENNZW51Rm91bmRhdGlvbi5udW1iZXJzO1xuICAgIGNvbnN0IGF2b2lkVmVydGljYWxPdmVybGFwID0gQm9vbGVhbih0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuQk9UVE9NKTtcbiAgICBjb25zdCBjYW5PdmVybGFwVmVydGljYWxseSA9ICFhdm9pZFZlcnRpY2FsT3ZlcmxhcDtcbiAgICBsZXQgeSA9IDA7XG5cbiAgICBpZiAoaXNCb3R0b21BbGlnbmVkKSB7XG4gICAgICB5ID0gYXZvaWRWZXJ0aWNhbE92ZXJsYXAgPyBhbmNob3JIZWlnaHQgLSB0aGlzLmFuY2hvck1hcmdpbl8udG9wIDogLXRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b207XG4gICAgICAvLyBhZGp1c3QgZm9yIHdoZW4gbWVudSBjYW4gb3ZlcmxhcCBhbmNob3IsIGJ1dCB0b28gdGFsbCB0byBiZSBhbGlnbmVkIHRvIGJvdHRvbVxuICAgICAgLy8gYW5jaG9yIGNvcm5lci4gQm90dG9tIG1hcmdpbiBpcyBpZ25vcmVkIGluIHN1Y2ggY2FzZXMuXG4gICAgICBpZiAoY2FuT3ZlcmxhcFZlcnRpY2FsbHkgJiYgbWVudUhlaWdodCA+IHZpZXdwb3J0RGlzdGFuY2UudG9wICsgYW5jaG9ySGVpZ2h0KSB7XG4gICAgICAgIHkgPSAtKE1hdGgubWluKG1lbnVIZWlnaHQsIHZpZXdwb3J0LmhlaWdodCAtIE1BUkdJTl9UT19FREdFKSAtICh2aWV3cG9ydERpc3RhbmNlLnRvcCArIGFuY2hvckhlaWdodCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gYXZvaWRWZXJ0aWNhbE92ZXJsYXAgPyAoYW5jaG9ySGVpZ2h0ICsgdGhpcy5hbmNob3JNYXJnaW5fLmJvdHRvbSkgOiB0aGlzLmFuY2hvck1hcmdpbl8udG9wO1xuICAgICAgLy8gYWRqdXN0IGZvciB3aGVuIG1lbnUgY2FuIG92ZXJsYXAgYW5jaG9yLCBidXQgdG9vIHRhbGwgdG8gYmUgYWxpZ25lZCB0byB0b3BcbiAgICAgIC8vIGFuY2hvciBjb3JuZXJzLiBUb3AgbWFyZ2luIGlzIGlnbm9yZWQgaW4gdGhhdCBjYXNlLlxuICAgICAgaWYgKGNhbk92ZXJsYXBWZXJ0aWNhbGx5ICYmIG1lbnVIZWlnaHQgPiB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSArIGFuY2hvckhlaWdodCkge1xuICAgICAgICB5ID0gLShNYXRoLm1pbihtZW51SGVpZ2h0LCB2aWV3cG9ydC5oZWlnaHQgLSBNQVJHSU5fVE9fRURHRSkgLSAodmlld3BvcnREaXN0YW5jZS5ib3R0b20gKyBhbmNob3JIZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb3JuZXJ9IGNvcm5lciBPcmlnaW4gY29ybmVyIG9mIHRoZSBtZW51LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IE1heGltdW0gaGVpZ2h0IG9mIHRoZSBtZW51LCBiYXNlZCBvbiBhdmFpbGFibGUgc3BhY2UuIDAgaW5kaWNhdGVzIHNob3VsZCBub3QgYmUgc2V0LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TWVudU1heEhlaWdodF8oY29ybmVyKSB7XG4gICAgbGV0IG1heEhlaWdodCA9IDA7XG4gICAgY29uc3Qge3ZpZXdwb3J0RGlzdGFuY2V9ID0gdGhpcy5tZWFzdXJlc187XG4gICAgY29uc3QgaXNCb3R0b21BbGlnbmVkID0gQm9vbGVhbihjb3JuZXIgJiBDb3JuZXJCaXQuQk9UVE9NKTtcblxuICAgIC8vIFdoZW4gbWF4aW11bSBoZWlnaHQgaXMgbm90IHNwZWNpZmllZCwgaXQgaXMgaGFuZGxlZCBmcm9tIGNzcy5cbiAgICBpZiAodGhpcy5hbmNob3JDb3JuZXJfICYgQ29ybmVyQml0LkJPVFRPTSkge1xuICAgICAgaWYgKGlzQm90dG9tQWxpZ25lZCkge1xuICAgICAgICBtYXhIZWlnaHQgPSB2aWV3cG9ydERpc3RhbmNlLnRvcCArIHRoaXMuYW5jaG9yTWFyZ2luXy50b3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXhIZWlnaHQgPSB2aWV3cG9ydERpc3RhbmNlLmJvdHRvbSAtIHRoaXMuYW5jaG9yTWFyZ2luXy5ib3R0b207XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heEhlaWdodDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhdXRvUG9zaXRpb25fKCkge1xuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNBbmNob3IoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENvbXB1dGUgbWVhc3VyZW1lbnRzIGZvciBhdXRvcG9zaXRpb24gbWV0aG9kcyByZXVzZS5cbiAgICB0aGlzLm1lYXN1cmVzXyA9IHRoaXMuZ2V0QXV0b0xheW91dE1lYXN1cmVtZW50c18oKTtcblxuICAgIGNvbnN0IGNvcm5lciA9IHRoaXMuZ2V0T3JpZ2luQ29ybmVyXygpO1xuICAgIGNvbnN0IG1heE1lbnVIZWlnaHQgPSB0aGlzLmdldE1lbnVNYXhIZWlnaHRfKGNvcm5lcik7XG4gICAgbGV0IHZlcnRpY2FsQWxpZ25tZW50ID0gKGNvcm5lciAmIENvcm5lckJpdC5CT1RUT00pID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICBsZXQgaG9yaXpvbnRhbEFsaWdubWVudCA9IChjb3JuZXIgJiBDb3JuZXJCaXQuUklHSFQpID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICBjb25zdCBob3Jpem9udGFsT2Zmc2V0ID0gdGhpcy5nZXRIb3Jpem9udGFsT3JpZ2luT2Zmc2V0Xyhjb3JuZXIpO1xuICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0ID0gdGhpcy5nZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8oY29ybmVyKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHtcbiAgICAgIFtob3Jpem9udGFsQWxpZ25tZW50XTogaG9yaXpvbnRhbE9mZnNldCA/IGhvcml6b250YWxPZmZzZXQgKyAncHgnIDogJzAnLFxuICAgICAgW3ZlcnRpY2FsQWxpZ25tZW50XTogdmVydGljYWxPZmZzZXQgPyB2ZXJ0aWNhbE9mZnNldCArICdweCcgOiAnMCcsXG4gICAgfTtcbiAgICBjb25zdCB7YW5jaG9yV2lkdGgsIG1lbnVIZWlnaHQsIG1lbnVXaWR0aH0gPSB0aGlzLm1lYXN1cmVzXztcbiAgICAvLyBDZW50ZXIgYWxpZ24gd2hlbiBhbmNob3Igd2lkdGggaXMgY29tcGFyYWJsZSBvciBncmVhdGVyIHRoYW4gbWVudSwgb3RoZXJ3aXNlIGtlZXAgY29ybmVyLlxuICAgIGlmIChhbmNob3JXaWR0aCAvIG1lbnVXaWR0aCA+IG51bWJlcnMuQU5DSE9SX1RPX01FTlVfV0lEVEhfUkFUSU8pIHtcbiAgICAgIGhvcml6b250YWxBbGlnbm1lbnQgPSAnY2VudGVyJztcbiAgICB9XG5cbiAgICAvLyBBZGp1c3QgdmVydGljYWwgb3JpZ2luIHdoZW4gbWVudSBpcyBwb3NpdGlvbmVkIHdpdGggc2lnbmlmaWNhbnQgb2Zmc2V0IGZyb20gYW5jaG9yLiBUaGlzIGlzIGRvbmUgc28gdGhhdFxuICAgIC8vIHNjYWxlIGFuaW1hdGlvbiBpcyBcImFuY2hvcmVkXCIgb24gdGhlIGFuY2hvci5cbiAgICBpZiAoISh0aGlzLmFuY2hvckNvcm5lcl8gJiBDb3JuZXJCaXQuQk9UVE9NKSAmJlxuICAgICAgICBNYXRoLmFicyh2ZXJ0aWNhbE9mZnNldCAvIG1lbnVIZWlnaHQpID4gbnVtYmVycy5PRkZTRVRfVE9fTUVOVV9IRUlHSFRfUkFUSU8pIHtcbiAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0UGVyY2VudCA9IE1hdGguYWJzKHZlcnRpY2FsT2Zmc2V0IC8gbWVudUhlaWdodCkgKiAxMDA7XG4gICAgICBjb25zdCBvcmlnaW5QZXJjZW50ID0gKGNvcm5lciAmIENvcm5lckJpdC5CT1RUT00pID8gMTAwIC0gdmVydGljYWxPZmZzZXRQZXJjZW50IDogdmVydGljYWxPZmZzZXRQZXJjZW50O1xuICAgICAgdmVydGljYWxBbGlnbm1lbnQgPSBNYXRoLnJvdW5kKG9yaWdpblBlcmNlbnQgKiAxMDApIC8gMTAwICsgJyUnO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8uc2V0VHJhbnNmb3JtT3JpZ2luKGAke2hvcml6b250YWxBbGlnbm1lbnR9ICR7dmVydGljYWxBbGlnbm1lbnR9YCk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRNYXhIZWlnaHQobWF4TWVudUhlaWdodCA/IG1heE1lbnVIZWlnaHQgKyAncHgnIDogJycpO1xuXG4gICAgLy8gQ2xlYXIgbWVhc3VyZXMgYWZ0ZXIgcG9zaXRpb25pbmcgaXMgY29tcGxldGUuXG4gICAgdGhpcy5tZWFzdXJlc18gPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gdGhlIG1lbnUuXG4gICAqIEBwYXJhbSB7e2ZvY3VzSW5kZXg6ID9udW1iZXJ9PX0gb3B0aW9uc1xuICAgKi9cbiAgb3Blbih7Zm9jdXNJbmRleCA9IG51bGx9ID0ge30pIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNhdmVGb2N1cygpO1xuXG4gICAgaWYgKCF0aGlzLnF1aWNrT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfT1BFTik7XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRpb25SZXF1ZXN0SWRfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuZGltZW5zaW9uc18gPSB0aGlzLmFkYXB0ZXJfLmdldElubmVyRGltZW5zaW9ucygpO1xuICAgICAgdGhpcy5hdXRvUG9zaXRpb25fKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1BFTik7XG4gICAgICB0aGlzLmZvY3VzT25PcGVuXyhmb2N1c0luZGV4KTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJCb2R5Q2xpY2tIYW5kbGVyKHRoaXMuZG9jdW1lbnRDbGlja0hhbmRsZXJfKTtcbiAgICAgIGlmICghdGhpcy5xdWlja09wZW5fKSB7XG4gICAgICAgIHRoaXMub3BlbkFuaW1hdGlvbkVuZFRpbWVySWRfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuQW5pbWF0aW9uRW5kVGltZXJJZF8gPSAwO1xuICAgICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfT1BFTik7XG4gICAgICAgIH0sIG51bWJlcnMuVFJBTlNJVElPTl9PUEVOX0RVUkFUSU9OKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzT3Blbl8gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgbWVudS5cbiAgICogQHBhcmFtIHtFdmVudD19IGV2dFxuICAgKi9cbiAgY2xvc2UoZXZ0ID0gbnVsbCkge1xuICAgIGNvbnN0IHRhcmdldElzRGlzYWJsZWQgPSBldnQgP1xuICAgICAgdGhpcy5hZGFwdGVyXy5nZXRBdHRyaWJ1dGVGb3JFdmVudFRhcmdldChldnQudGFyZ2V0LCBzdHJpbmdzLkFSSUFfRElTQUJMRURfQVRUUikgPT09ICd0cnVlJyA6XG4gICAgICBmYWxzZTtcblxuICAgIGlmICh0YXJnZXRJc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcih0aGlzLmRvY3VtZW50Q2xpY2tIYW5kbGVyXyk7XG5cbiAgICBpZiAoIXRoaXMucXVpY2tPcGVuXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENNZW51Rm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElOR19DTE9TRUQpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ01lbnVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuT1BFTik7XG4gICAgICBpZiAoIXRoaXMucXVpY2tPcGVuXykge1xuICAgICAgICB0aGlzLmNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8gPSAwO1xuICAgICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDTWVudUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkdfQ0xPU0VEKTtcbiAgICAgICAgfSwgbnVtYmVycy5UUkFOU0lUSU9OX0NMT1NFX0RVUkFUSU9OKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzT3Blbl8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlc3RvcmVGb2N1cygpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW5fO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0U2VsZWN0ZWRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4XztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggb2YgdGhlIGl0ZW0gdG8gc2V0IGFzIHNlbGVjdGVkLlxuICAgKi9cbiAgc2V0U2VsZWN0ZWRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4Xykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZTZWxlY3RlZEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4XztcbiAgICBpZiAocHJldlNlbGVjdGVkSW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ybUF0dHJGb3JPcHRpb25BdEluZGV4KHByZXZTZWxlY3RlZEluZGV4LCAnYXJpYS1zZWxlY3RlZCcpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5ybUNsYXNzRm9yT3B0aW9uQXRJbmRleChwcmV2U2VsZWN0ZWRJbmRleCwgY3NzQ2xhc3Nlcy5TRUxFQ1RFRF9MSVNUX0lURU0pO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleF8gPSBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5hZGFwdGVyXy5nZXROdW1iZXJPZkl0ZW1zKCkgPyBpbmRleCA6IC0xO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfID49IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0ckZvck9wdGlvbkF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzc0Zvck9wdGlvbkF0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4XywgY3NzQ2xhc3Nlcy5TRUxFQ1RFRF9MSVNUX0lURU0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge01EQ01lbnVGb3VuZGF0aW9uLCBBbmNob3JNYXJnaW59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEB0eXBlIHtzdHJpbmd8dW5kZWZpbmVkfSAqL1xubGV0IHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV87XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgY29ycmVjdCB0cmFuc2Zvcm0gcHJvcGVydHkgdG8gdXNlIG9uIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gKiBAcGFyYW0geyFXaW5kb3d9IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldFRyYW5zZm9ybVByb3BlcnR5TmFtZShnbG9iYWxPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgY29uc3QgZWwgPSBnbG9iYWxPYmouZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdHJhbnNmb3JtUHJvcGVydHlOYW1lID0gKCd0cmFuc2Zvcm0nIGluIGVsLnN0eWxlID8gJ3RyYW5zZm9ybScgOiAnd2Via2l0VHJhbnNmb3JtJyk7XG4gICAgc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyA9IHRyYW5zZm9ybVByb3BlcnR5TmFtZTtcbiAgfVxuXG4gIHJldHVybiBzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfO1xufVxuXG4vKipcbiAqIENsYW1wcyBhIHZhbHVlIGJldHdlZW4gdGhlIG1pbmltdW0gYW5kIHRoZSBtYXhpbXVtLCByZXR1cm5pbmcgdGhlIGNsYW1wZWQgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiA9IDAsIG1heCA9IDEpIHtcbiAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2YWx1ZSkpO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZWFzaW5nIHZhbHVlIHRvIGFwcGx5IGF0IHRpbWUgdCwgZm9yIGEgZ2l2ZW4gY3ViaWMgYmV6aWVyIGN1cnZlLlxuICogQ29udHJvbCBwb2ludHMgUDAgYW5kIFAzIGFyZSBhc3N1bWVkIHRvIGJlICgwLDApIGFuZCAoMSwxKSwgcmVzcGVjdGl2ZWx5LlxuICogUGFyYW1ldGVycyBhcmUgYXMgZm9sbG93czpcbiAqIC0gdGltZTogVGhlIGN1cnJlbnQgdGltZSBpbiB0aGUgYW5pbWF0aW9uLCBzY2FsZWQgYmV0d2VlbiAwIGFuZCAxLlxuICogLSB4MTogVGhlIHggdmFsdWUgb2YgY29udHJvbCBwb2ludCBQMS5cbiAqIC0geTE6IFRoZSB5IHZhbHVlIG9mIGNvbnRyb2wgcG9pbnQgUDEuXG4gKiAtIHgyOiBUaGUgeCB2YWx1ZSBvZiBjb250cm9sIHBvaW50IFAyLlxuICogLSB5MjogVGhlIHkgdmFsdWUgb2YgY29udHJvbCBwb2ludCBQMi5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gKiBAcGFyYW0ge251bWJlcn0geDFcbiAqIEBwYXJhbSB7bnVtYmVyfSB5MVxuICogQHBhcmFtIHtudW1iZXJ9IHgyXG4gKiBAcGFyYW0ge251bWJlcn0geTJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gYmV6aWVyUHJvZ3Jlc3ModGltZSwgeDEsIHkxLCB4MiwgeTIpIHtcbiAgcmV0dXJuIGdldEJlemllckNvb3JkaW5hdGVfKHNvbHZlUG9zaXRpb25Gcm9tWFZhbHVlXyh0aW1lLCB4MSwgeDIpLCB5MSwgeTIpO1xufVxuXG4vKipcbiAqIENvbXB1dGUgYSBzaW5nbGUgY29vcmRpbmF0ZSBhdCBhIHBvc2l0aW9uIHBvaW50IGJldHdlZW4gMCBhbmQgMS5cbiAqIGMxIGFuZCBjMiBhcmUgdGhlIG1hdGNoaW5nIGNvb3JkaW5hdGUgb24gY29udHJvbCBwb2ludHMgUDEgYW5kIFAyLCByZXNwZWN0aXZlbHkuXG4gKiBDb250cm9sIHBvaW50cyBQMCBhbmQgUDMgYXJlIGFzc3VtZWQgdG8gYmUgKDAsMCkgYW5kICgxLDEpLCByZXNwZWN0aXZlbHkuXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWxpYnJhcnkvYmxvYi9tYXN0ZXIvY2xvc3VyZS9nb29nL21hdGgvYmV6aWVyLmpzLlxuICogQHBhcmFtIHtudW1iZXJ9IHRcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMVxuICogQHBhcmFtIHtudW1iZXJ9IGMyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldEJlemllckNvb3JkaW5hdGVfKHQsIGMxLCBjMikge1xuICAvLyBTcGVjaWFsIGNhc2Ugc3RhcnQgYW5kIGVuZC5cbiAgaWYgKHQgPT09IDAgfHwgdCA9PT0gMSkge1xuICAgIHJldHVybiB0O1xuICB9XG5cbiAgLy8gU3RlcCBvbmUgLSBmcm9tIDQgcG9pbnRzIHRvIDNcbiAgbGV0IGljMCA9IHQgKiBjMTtcbiAgbGV0IGljMSA9IGMxICsgdCAqIChjMiAtIGMxKTtcbiAgY29uc3QgaWMyID0gYzIgKyB0ICogKDEgLSBjMik7XG5cbiAgLy8gU3RlcCB0d28gLSBmcm9tIDMgcG9pbnRzIHRvIDJcbiAgaWMwICs9IHQgKiAoaWMxIC0gaWMwKTtcbiAgaWMxICs9IHQgKiAoaWMyIC0gaWMxKTtcblxuICAvLyBGaW5hbCBzdGVwIC0gbGFzdCBwb2ludFxuICByZXR1cm4gaWMwICsgdCAqIChpYzEgLSBpYzApO1xufVxuXG4vKipcbiAqIFByb2plY3QgYSBwb2ludCBvbnRvIHRoZSBCZXppZXIgY3VydmUsIGZyb20gYSBnaXZlbiBYLiBDYWxjdWxhdGVzIHRoZSBwb3NpdGlvbiB0IGFsb25nIHRoZSBjdXJ2ZS5cbiAqIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtbGlicmFyeS9ibG9iL21hc3Rlci9jbG9zdXJlL2dvb2cvbWF0aC9iZXppZXIuanMuXG4gKiBAcGFyYW0ge251bWJlcn0geFZhbFxuICogQHBhcmFtIHtudW1iZXJ9IHgxXG4gKiBAcGFyYW0ge251bWJlcn0geDJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gc29sdmVQb3NpdGlvbkZyb21YVmFsdWVfKHhWYWwsIHgxLCB4Mikge1xuICBjb25zdCBFUFNJTE9OID0gMWUtNjtcbiAgY29uc3QgTUFYX0lURVJBVElPTlMgPSA4O1xuXG4gIGlmICh4VmFsIDw9IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmICh4VmFsID49IDEpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8vIEluaXRpYWwgZXN0aW1hdGUgb2YgdCB1c2luZyBsaW5lYXIgaW50ZXJwb2xhdGlvbi5cbiAgbGV0IHQgPSB4VmFsO1xuXG4gIC8vIFRyeSBncmFkaWVudCBkZXNjZW50IHRvIHNvbHZlIGZvciB0LiBJZiBpdCB3b3JrcywgaXQgaXMgdmVyeSBmYXN0LlxuICBsZXQgdE1pbiA9IDA7XG4gIGxldCB0TWF4ID0gMTtcbiAgbGV0IHZhbHVlID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfSVRFUkFUSU9OUzsgaSsrKSB7XG4gICAgdmFsdWUgPSBnZXRCZXppZXJDb29yZGluYXRlXyh0LCB4MSwgeDIpO1xuICAgIGNvbnN0IGRlcml2YXRpdmUgPSAoZ2V0QmV6aWVyQ29vcmRpbmF0ZV8odCArIEVQU0lMT04sIHgxLCB4MikgLSB2YWx1ZSkgLyBFUFNJTE9OO1xuICAgIGlmIChNYXRoLmFicyh2YWx1ZSAtIHhWYWwpIDwgRVBTSUxPTikge1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfSBlbHNlIGlmIChNYXRoLmFicyhkZXJpdmF0aXZlKSA8IEVQU0lMT04pIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgPCB4VmFsKSB7XG4gICAgICAgIHRNaW4gPSB0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdE1heCA9IHQ7XG4gICAgICB9XG4gICAgICB0IC09ICh2YWx1ZSAtIHhWYWwpIC8gZGVyaXZhdGl2ZTtcbiAgICB9XG4gIH1cblxuICAvLyBJZiB0aGUgZ3JhZGllbnQgZGVzY2VudCBnb3Qgc3R1Y2sgaW4gYSBsb2NhbCBtaW5pbXVtLCBlLmcuIGJlY2F1c2VcbiAgLy8gdGhlIGRlcml2YXRpdmUgd2FzIGNsb3NlIHRvIDAsIHVzZSBhIERpY2hvdG9teSByZWZpbmVtZW50IGluc3RlYWQuXG4gIC8vIFdlIGxpbWl0IHRoZSBudW1iZXIgb2YgaW50ZXJhdGlvbnMgdG8gOC5cbiAgZm9yIChsZXQgaSA9IDA7IE1hdGguYWJzKHZhbHVlIC0geFZhbCkgPiBFUFNJTE9OICYmIGkgPCBNQVhfSVRFUkFUSU9OUzsgaSsrKSB7XG4gICAgaWYgKHZhbHVlIDwgeFZhbCkge1xuICAgICAgdE1pbiA9IHQ7XG4gICAgICB0ID0gKHQgKyB0TWF4KSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRNYXggPSB0O1xuICAgICAgdCA9ICh0ICsgdE1pbikgLyAyO1xuICAgIH1cbiAgICB2YWx1ZSA9IGdldEJlemllckNvb3JkaW5hdGVfKHQsIHgxLCB4Mik7XG4gIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCB7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lLCBjbGFtcCwgYmV6aWVyUHJvZ3Jlc3N9O1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IHJlZj1cInJvb3RcIiBjbGFzcz1cIm1kYy1tZW51IG1kYy1zaW1wbGUtbWVudVwiXG4gICAgOmNsYXNzPVwiY2xhc3Nlc1wiIDpzdHlsZT1cInN0eWxlc1wiIFxuICAgIHRhYmluZGV4PVwiLTFcIj5cbiAgICA8dWwgcmVmPVwiaXRlbXNcIiBjbGFzcz1cIm1kYy1zaW1wbGUtbWVudV9faXRlbXMgbWRjLWxpc3RcIiBcbiAgICAgIHJvbGU9XCJtZW51XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC91bD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgTURDTWVudUZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvbWVudS9mb3VuZGF0aW9uJztcbmltcG9ydCB7IGdldFRyYW5zZm9ybVByb3BlcnR5TmFtZSB9IGZyb20gJ0BtYXRlcmlhbC9tZW51L3V0aWwnO1xuaW1wb3J0IHsgZW1pdEN1c3RvbUV2ZW50IH0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1tZW51JyxcbiAgcHJvcHM6IHtcbiAgICAnb3Blbi1mcm9tLXRvcC1sZWZ0JzogQm9vbGVhbixcbiAgICAnb3Blbi1mcm9tLXRvcC1yaWdodCc6IEJvb2xlYW4sXG4gICAgJ29wZW4tZnJvbS1ib3R0b20tbGVmdCc6IEJvb2xlYW4sXG4gICAgJ29wZW4tZnJvbS1ib3R0b20tcmlnaHQnOiBCb29sZWFuLFxuICAgICdxdWljay1vcGVuJzogQm9vbGVhbixcbiAgICAnYW5jaG9yLWNvcm5lcic6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgJ2FuY2hvci1tYXJnaW4nOiBPYmplY3QsXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1zaW1wbGUtbWVudS0tb3Blbi1mcm9tLXRvcC1sZWZ0JzogdGhpcy5vcGVuRnJvbVRvcExlZnQsXG4gICAgICAgICdtZGMtc2ltcGxlLW1lbnUtLW9wZW4tZnJvbS10b3AtcmlnaHQnOiB0aGlzLm9wZW5Gcm9tVG9wUmlnaHQsXG4gICAgICAgICdtZGMtc2ltcGxlLW1lbnUtLW9wZW4tZnJvbS1ib3R0b20tbGVmdCc6IHRoaXMub3BlbkZyb21Cb3R0b21MZWZ0LFxuICAgICAgICAnbWRjLXNpbXBsZS1tZW51LS1vcGVuLWZyb20tYm90dG9tLXJpZ2h0JzogdGhpcy5vcGVuRnJvbUJvdHRvbVJpZ2h0LFxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge30sXG4gICAgICBpdGVtczogW10sXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNob3cob3B0aW9ucykge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLm9wZW4ob3B0aW9ucyk7XG4gICAgfSxcbiAgICBoaWRlKCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLmNsb3NlKCk7XG4gICAgfSxcbiAgICBpc09wZW4oKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uID8gdGhpcy5mb3VuZGF0aW9uLmlzT3BlbigpIDogZmFsc2U7XG4gICAgfSxcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zdCByZWZyZXNoSXRlbXMgPSAoKSA9PiB7XG4gICAgICB0aGlzLml0ZW1zID0gW10uc2xpY2UuY2FsbChcbiAgICAgICAgdGhpcy4kcmVmcy5pdGVtcy5xdWVyeVNlbGVjdG9yQWxsKCcubWRjLWxpc3QtaXRlbVtyb2xlXScpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZScpO1xuICAgIH07XG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiByZWZyZXNoSXRlbXMoKSk7XG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRlbCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG5cbiAgICB0aGlzLl9wcmV2aW91c0ZvY3VzID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbmV3IE1EQ01lbnVGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kc2V0KHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lLCB0cnVlKSxcbiAgICAgIHJlbW92ZUNsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKSxcbiAgICAgIGhhc0NsYXNzOiBjbGFzc05hbWUgPT4gdGhpcy4kcmVmcy5yb290LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgaGFzTmVjZXNzYXJ5RG9tOiAoKSA9PiBCb29sZWFuKHRoaXMuJHJlZnMuaXRlbXMpLFxuICAgICAgZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQ6ICh0YXJnZXQsIGF0dHJpYnV0ZU5hbWUpID0+XG4gICAgICAgIHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSksXG4gICAgICBnZXRJbm5lckRpbWVuc2lvbnM6ICgpID0+ICh7XG4gICAgICAgIHdpZHRoOiB0aGlzLiRyZWZzLml0ZW1zLm9mZnNldFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuJHJlZnMuaXRlbXMub2Zmc2V0SGVpZ2h0LFxuICAgICAgfSksXG4gICAgICBoYXNBbmNob3I6ICgpID0+XG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5wYXJlbnRFbGVtZW50ICYmXG4gICAgICAgIHRoaXMuJHJlZnMucm9vdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbWRjLW1lbnUtYW5jaG9yJyksXG4gICAgICBnZXRBbmNob3JEaW1lbnNpb25zOiAoKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGdldFdpbmRvd0RpbWVuc2lvbnM6ICgpID0+ICh7XG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICB9KSxcbiAgICAgIGdldE51bWJlck9mSXRlbXM6ICgpID0+IHRoaXMuaXRlbXMubGVuZ3RoLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICB0aGlzLiRyZWZzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIHJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlcjogaGFuZGxlciA9PlxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlciksXG4gICAgICBnZXRJbmRleEZvckV2ZW50VGFyZ2V0OiB0YXJnZXQgPT4gdGhpcy5pdGVtcy5pbmRleE9mKHRhcmdldCksXG4gICAgICBub3RpZnlTZWxlY3RlZDogZXZ0RGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgICBpbmRleDogZXZ0RGF0YS5pbmRleCxcbiAgICAgICAgICBpdGVtOiB0aGlzLml0ZW1zW2V2dERhdGEuaW5kZXhdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCBldnQpO1xuICAgICAgICBlbWl0Q3VzdG9tRXZlbnQoXG4gICAgICAgICAgdGhpcy4kZWwsXG4gICAgICAgICAgTURDTWVudUZvdW5kYXRpb24uc3RyaW5ncy5TRUxFQ1RFRF9FVkVOVCxcbiAgICAgICAgICBldnQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgbm90aWZ5Q2FuY2VsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpO1xuICAgICAgICBlbWl0Q3VzdG9tRXZlbnQodGhpcy4kZWwsIE1EQ01lbnVGb3VuZGF0aW9uLnN0cmluZ3MuQ0FOQ0VMX0VWRU5ULCB7fSk7XG4gICAgICB9LFxuICAgICAgc2F2ZUZvY3VzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgfSxcbiAgICAgIHJlc3RvcmVGb2N1czogKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fcHJldmlvdXNGb2N1cykge1xuICAgICAgICAgIHRoaXMuX3ByZXZpb3VzRm9jdXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzRm9jdXNlZDogKCkgPT4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy4kcmVmcy5yb290LFxuICAgICAgZm9jdXM6ICgpID0+IHRoaXMuJHJlZnMucm9vdC5mb2N1cygpLFxuICAgICAgZ2V0Rm9jdXNlZEl0ZW1JbmRleDogKCkgPT4gdGhpcy5pdGVtcy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLFxuICAgICAgZm9jdXNJdGVtQXRJbmRleDogaW5kZXggPT4gdGhpcy5pdGVtc1tpbmRleF0uZm9jdXMoKSxcbiAgICAgIGlzUnRsOiAoKSA9PlxuICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuJHJlZnMucm9vdCkuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJykgPT09XG4gICAgICAgICdydGwnLFxuICAgICAgc2V0VHJhbnNmb3JtT3JpZ2luOiBvcmlnaW4gPT4ge1xuICAgICAgICB0aGlzLiRzZXQoXG4gICAgICAgICAgdGhpcy5zdHlsZXMsXG4gICAgICAgICAgYCR7Z2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKHdpbmRvdyl9LW9yaWdpbmAsXG4gICAgICAgICAgb3JpZ2luLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHNldFBvc2l0aW9uOiBwb3NpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywgJ2xlZnQnLCBwb3NpdGlvbi5sZWZ0KTtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMuc3R5bGVzLCAncmlnaHQnLCBwb3NpdGlvbi5yaWdodCk7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywgJ3RvcCcsIHBvc2l0aW9uLnRvcCk7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnN0eWxlcywgJ2JvdHRvbScsIHBvc2l0aW9uLmJvdHRvbSk7XG4gICAgICB9LFxuICAgICAgc2V0TWF4SGVpZ2h0OiBoZWlnaHQgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5zdHlsZXMsICdtYXgtaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgIH0sXG4gICAgICBzZXRBdHRyRm9yT3B0aW9uQXRJbmRleDogKGluZGV4LCBhdHRyLCB2YWx1ZSkgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgICAgfSxcbiAgICAgIHJtQXR0ckZvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgYXR0cikgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICB9LFxuICAgICAgYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4OiAoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICB9LFxuICAgICAgcm1DbGFzc0Zvck9wdGlvbkF0SW5kZXg6IChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZWZyZXNoSXRlbXMoKTtcbiAgICB0aGlzLmZvdW5kYXRpb24uaW5pdCgpO1xuICAgIGlmICh0aGlzLmFuY2hvckNvcm5lciAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0QW5jaG9yQ29ybmVyKE51bWJlcih0aGlzLmFuY2hvckNvcm5lcikpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hbmNob3JNYXJnaW4gIT09IHZvaWQgMCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldEFuY2hvck1hcmdpbih0aGlzLmFuY2hvck1hcmdpbik7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHF1aWNrT3Blbihudikge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldFF1aWNrT3Blbihudik7XG4gICAgfSxcbiAgICBhbmNob3JDb3JuZXIobnYpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRBbmNob3JDb3JuZXIoTnVtYmVyKG52KSk7XG4gICAgfSxcbiAgICBhbmNob3JNYXJnaW4obnYpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRBbmNob3JNYXJnaW4obnYpO1xuICAgIH0sXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5fcHJldmlvdXNGb2N1cyA9IG51bGw7XG4gICAgdGhpcy5zbG90T2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KCk7XG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxsaSBjbGFzcz1cIm1kYy1tZW51LWl0ZW0gbWRjLWxpc3QtaXRlbVwiIHJvbGU9XCJtZW51aXRlbVwiIFxuICAgIDp0YWJpbmRleD1cImRpc2FibGVkPyctMSc6JzAnXCJcbiAgICA6YXJpYS1kaXNhYmxlZD1cImRpc2FibGVkXCJcbiAgICA+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L2xpPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1tZW51LWl0ZW0nLFxuICBwcm9wczoge1xuICAgIGRpc2FibGVkOiBCb29sZWFuXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzPVwibWRjLW1lbnUtZGl2aWRlciBtZGMtbGlzdC1kaXZpZGVyXCI+PC9saT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtbWVudS1kaXZpZGVyJyxcbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuPGRpdiBjbGFzcz1cIm1kYy1tZW51LWFuY2hvclwiPlxuICA8c2xvdD5cbiAgPC9zbG90PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLW1lbnUtYW5jaG9yJyxcbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY01lbnUgZnJvbSAnLi9tZGMtbWVudS52dWUnXG5pbXBvcnQgbWRjTWVudUl0ZW0gZnJvbSAnLi9tZGMtbWVudS1pdGVtLnZ1ZSdcbmltcG9ydCBtZGNNZW51RGl2aWRlciBmcm9tICcuL21kYy1tZW51LWRpdmlkZXIudnVlJ1xuaW1wb3J0IG1kY01lbnVBbmNob3IgZnJvbSAnLi9tZGMtbWVudS1hbmNob3IudnVlJ1xuXG5leHBvcnQge1xuICBtZGNNZW51LFxuICBtZGNNZW51SXRlbSxcbiAgbWRjTWVudURpdmlkZXIsXG4gIG1kY01lbnVBbmNob3Jcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY01lbnUsXG4gIG1kY01lbnVJdGVtLFxuICBtZGNNZW51RGl2aWRlcixcbiAgbWRjTWVudUFuY2hvclxufSlcbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7YXV0b0luaXR9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgcGx1Z2luIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5cblxuYXV0b0luaXQocGx1Z2luKVxuIl0sIm5hbWVzIjpbImF1dG9Jbml0IiwicGx1Z2luIiwiX1Z1ZSIsIndpbmRvdyIsIlZ1ZSIsImdsb2JhbCIsInVzZSIsIkJhc2VQbHVnaW4iLCJjb21wb25lbnRzIiwidmVyc2lvbiIsImluc3RhbGwiLCJ2bSIsImtleSIsImNvbXBvbmVudCIsIm5hbWUiLCJlbWl0Q3VzdG9tRXZlbnQiLCJlbCIsImV2dFR5cGUiLCJldnREYXRhIiwic2hvdWxkQnViYmxlIiwiZXZ0IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJidWJibGVzIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJNRENGb3VuZGF0aW9uIiwiYWRhcHRlciIsImFkYXB0ZXJfIiwiTURDTWVudUFkYXB0ZXIiLCJjbGFzc05hbWUiLCJ0YXJnZXQiLCJhdHRyaWJ1dGVOYW1lIiwidHlwZSIsImhhbmRsZXIiLCJpbmRleCIsIm9yaWdpbiIsInBvc2l0aW9uIiwiaGVpZ2h0IiwiYXR0ciIsInZhbHVlIiwiY3NzQ2xhc3NlcyIsIlJPT1QiLCJPUEVOIiwiQU5JTUFUSU5HX09QRU4iLCJBTklNQVRJTkdfQ0xPU0VEIiwiU0VMRUNURURfTElTVF9JVEVNIiwic3RyaW5ncyIsIklURU1TX1NFTEVDVE9SIiwiU0VMRUNURURfRVZFTlQiLCJDQU5DRUxfRVZFTlQiLCJBUklBX0RJU0FCTEVEX0FUVFIiLCJudW1iZXJzIiwiU0VMRUNURURfVFJJR0dFUl9ERUxBWSIsIlRSQU5TSVRJT05fT1BFTl9EVVJBVElPTiIsIlRSQU5TSVRJT05fQ0xPU0VfRFVSQVRJT04iLCJNQVJHSU5fVE9fRURHRSIsIkFOQ0hPUl9UT19NRU5VX1dJRFRIX1JBVElPIiwiT0ZGU0VUX1RPX01FTlVfSEVJR0hUX1JBVElPIiwiQ29ybmVyQml0IiwiQk9UVE9NIiwiQ0VOVEVSIiwiUklHSFQiLCJGTElQX1JUTCIsIkNvcm5lciIsIlRPUF9MRUZUIiwiVE9QX1JJR0hUIiwiQk9UVE9NX0xFRlQiLCJCT1RUT01fUklHSFQiLCJUT1BfU1RBUlQiLCJUT1BfRU5EIiwiQk9UVE9NX1NUQVJUIiwiQk9UVE9NX0VORCIsIk1EQ01lbnVGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiaGFzTmVjZXNzYXJ5RG9tIiwiZ2V0QXR0cmlidXRlRm9yRXZlbnRUYXJnZXQiLCJnZXRJbm5lckRpbWVuc2lvbnMiLCJoYXNBbmNob3IiLCJnZXRBbmNob3JEaW1lbnNpb25zIiwiZ2V0V2luZG93RGltZW5zaW9ucyIsImdldE51bWJlck9mSXRlbXMiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlckJvZHlDbGlja0hhbmRsZXIiLCJkZXJlZ2lzdGVyQm9keUNsaWNrSGFuZGxlciIsImdldEluZGV4Rm9yRXZlbnRUYXJnZXQiLCJub3RpZnlTZWxlY3RlZCIsIm5vdGlmeUNhbmNlbCIsInNhdmVGb2N1cyIsInJlc3RvcmVGb2N1cyIsImlzRm9jdXNlZCIsImZvY3VzIiwiZ2V0Rm9jdXNlZEl0ZW1JbmRleCIsImZvY3VzSXRlbUF0SW5kZXgiLCJpc1J0bCIsInNldFRyYW5zZm9ybU9yaWdpbiIsInNldFBvc2l0aW9uIiwic2V0TWF4SGVpZ2h0Iiwic2V0QXR0ckZvck9wdGlvbkF0SW5kZXgiLCJybUF0dHJGb3JPcHRpb25BdEluZGV4IiwiYWRkQ2xhc3NGb3JPcHRpb25BdEluZGV4Iiwicm1DbGFzc0Zvck9wdGlvbkF0SW5kZXgiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImRlZmF1bHRBZGFwdGVyIiwiY2xpY2tIYW5kbGVyXyIsImhhbmRsZVBvc3NpYmxlU2VsZWN0ZWRfIiwia2V5ZG93bkhhbmRsZXJfIiwiaGFuZGxlS2V5Ym9hcmREb3duXyIsImtleXVwSGFuZGxlcl8iLCJoYW5kbGVLZXlib2FyZFVwXyIsImRvY3VtZW50Q2xpY2tIYW5kbGVyXyIsImhhbmRsZURvY3VtZW50Q2xpY2tfIiwiaXNPcGVuXyIsIm9wZW5BbmltYXRpb25FbmRUaW1lcklkXyIsImNsb3NlQW5pbWF0aW9uRW5kVGltZXJJZF8iLCJzZWxlY3RlZFRyaWdnZXJUaW1lcklkXyIsImFuaW1hdGlvblJlcXVlc3RJZF8iLCJkaW1lbnNpb25zXyIsIml0ZW1IZWlnaHRfIiwiYW5jaG9yQ29ybmVyXyIsImFuY2hvck1hcmdpbl8iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJtZWFzdXJlc18iLCJzZWxlY3RlZEluZGV4XyIsInJlbWVtYmVyU2VsZWN0aW9uXyIsInF1aWNrT3Blbl8iLCJrZXlEb3duV2l0aGluTWVudV8iLCJFcnJvciIsImNsZWFyVGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiY29ybmVyIiwibWFyZ2luIiwicmVtZW1iZXJTZWxlY3Rpb24iLCJzZXRTZWxlY3RlZEluZGV4IiwicXVpY2tPcGVuIiwiZm9jdXNJbmRleCIsImRvY3VtZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJjbG9zZSIsImFsdEtleSIsImN0cmxLZXkiLCJtZXRhS2V5Iiwia2V5Q29kZSIsInNoaWZ0S2V5IiwiaXNUYWIiLCJpc0Fycm93VXAiLCJpc0Fycm93RG93biIsImlzU3BhY2UiLCJpc0VudGVyIiwiZm9jdXNlZEl0ZW1JbmRleCIsImxhc3RJdGVtSW5kZXgiLCJwcmV2ZW50RGVmYXVsdCIsImlzRXNjYXBlIiwidGFyZ2V0SW5kZXgiLCJzZXRUaW1lb3V0IiwiYW5jaG9yUmVjdCIsInZpZXdwb3J0Iiwidmlld3BvcnREaXN0YW5jZSIsIndpZHRoIiwiYW5jaG9ySGVpZ2h0IiwiYW5jaG9yV2lkdGgiLCJtZW51SGVpZ2h0IiwibWVudVdpZHRoIiwiaXNCb3R0b21BbGlnbmVkIiwiQm9vbGVhbiIsImF2YWlsYWJsZVRvcCIsImF2YWlsYWJsZUJvdHRvbSIsInRvcE92ZXJmbG93IiwiYm90dG9tT3ZlcmZsb3ciLCJpc0ZsaXBSdGwiLCJhdm9pZEhvcml6b250YWxPdmVybGFwIiwiaXNBbGlnbmVkUmlnaHQiLCJhdmFpbGFibGVMZWZ0IiwiYXZhaWxhYmxlUmlnaHQiLCJsZWZ0T3ZlcmZsb3ciLCJyaWdodE92ZXJmbG93IiwiaXNSaWdodEFsaWduZWQiLCJ4IiwicmlnaHRPZmZzZXQiLCJsZWZ0T2Zmc2V0IiwiYXZvaWRWZXJ0aWNhbE92ZXJsYXAiLCJjYW5PdmVybGFwVmVydGljYWxseSIsInkiLCJNYXRoIiwibWluIiwibWF4SGVpZ2h0IiwiZ2V0QXV0b0xheW91dE1lYXN1cmVtZW50c18iLCJnZXRPcmlnaW5Db3JuZXJfIiwibWF4TWVudUhlaWdodCIsImdldE1lbnVNYXhIZWlnaHRfIiwidmVydGljYWxBbGlnbm1lbnQiLCJob3Jpem9udGFsQWxpZ25tZW50IiwiaG9yaXpvbnRhbE9mZnNldCIsImdldEhvcml6b250YWxPcmlnaW5PZmZzZXRfIiwidmVydGljYWxPZmZzZXQiLCJnZXRWZXJ0aWNhbE9yaWdpbk9mZnNldF8iLCJhYnMiLCJ2ZXJ0aWNhbE9mZnNldFBlcmNlbnQiLCJvcmlnaW5QZXJjZW50Iiwicm91bmQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdXRvUG9zaXRpb25fIiwiZm9jdXNPbk9wZW5fIiwidGFyZ2V0SXNEaXNhYmxlZCIsInByZXZTZWxlY3RlZEluZGV4Iiwic3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXyIsImdldFRyYW5zZm9ybVByb3BlcnR5TmFtZSIsImdsb2JhbE9iaiIsImZvcmNlUmVmcmVzaCIsInVuZGVmaW5lZCIsImNyZWF0ZUVsZW1lbnQiLCJ0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWUiLCJzdHlsZSIsInJlbmRlciIsInByb3BzIiwiU3RyaW5nIiwiTnVtYmVyIiwiT2JqZWN0IiwiZGF0YSIsImNsYXNzZXMiLCJvcGVuRnJvbVRvcExlZnQiLCJvcGVuRnJvbVRvcFJpZ2h0Iiwib3BlbkZyb21Cb3R0b21MZWZ0Iiwib3BlbkZyb21Cb3R0b21SaWdodCIsInN0eWxlcyIsIml0ZW1zIiwibWV0aG9kcyIsInNob3ciLCJvcHRpb25zIiwiZm91bmRhdGlvbiIsIm9wZW4iLCJoaWRlIiwiaXNPcGVuIiwibW91bnRlZCIsInJlZnJlc2hJdGVtcyIsInNsaWNlIiwiY2FsbCIsIiRyZWZzIiwicXVlcnlTZWxlY3RvckFsbCIsIiRlbWl0Iiwic2xvdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCIkZWwiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiX3ByZXZpb3VzRm9jdXMiLCIkc2V0IiwiJGRlbGV0ZSIsInJvb3QiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImdldEF0dHJpYnV0ZSIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwicGFyZW50RWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImxlbmd0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYm9keSIsImluZGV4T2YiLCJpdGVtIiwiYWN0aXZlRWxlbWVudCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiYWRkIiwicmVtb3ZlIiwiaW5pdCIsImFuY2hvckNvcm5lciIsInNldEFuY2hvckNvcm5lciIsImFuY2hvck1hcmdpbiIsInNldEFuY2hvck1hcmdpbiIsIndhdGNoIiwibnYiLCJzZXRRdWlja09wZW4iLCJiZWZvcmVEZXN0cm95IiwiZGlzY29ubmVjdCIsImRlc3Ryb3kiLCJkaXNhYmxlZCIsIm1kY01lbnUiLCJtZGNNZW51SXRlbSIsIm1kY01lbnVEaXZpZGVyIiwibWRjTWVudUFuY2hv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
