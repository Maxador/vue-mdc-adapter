/**
* @module vue-mdc-adaptertoolbar 0.13.2
* @exports VueMDCToolbar
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCToolbar = factory());
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /* global CustomEvent */

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
    FIXED: 'mdc-toolbar--fixed',
    FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
    FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
    TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
    FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
    FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
    FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized'
  };

  var strings = {
    TITLE_SELECTOR: '.mdc-toolbar__title',
    ICON_SELECTOR: '.mdc-toolbar__icon',
    FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
    CHANGE_EVENT: 'MDCToolbar:change'
  };

  var numbers = {
    MAX_TITLE_SIZE: 2.125,
    MIN_TITLE_SIZE: 1.25,
    TOOLBAR_ROW_HEIGHT: 64,
    TOOLBAR_ROW_MOBILE_HEIGHT: 56,
    TOOLBAR_MOBILE_BREAKPOINT: 600
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

  var MDCToolbarFoundation = function (_MDCFoundation) {
    inherits(MDCToolbarFoundation, _MDCFoundation);
    createClass(MDCToolbarFoundation, null, [{
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
          hasClass: function hasClass() {
            return (/* className: string */ /* boolean */false
            );
          },
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          registerScrollHandler: function registerScrollHandler() /* handler: EventListener */{},
          deregisterScrollHandler: function deregisterScrollHandler() /* handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          getViewportWidth: function getViewportWidth() {
            return (/* number */0
            );
          },
          getViewportScrollY: function getViewportScrollY() {
            return (/* number */0
            );
          },
          getOffsetHeight: function getOffsetHeight() {
            return (/* number */0
            );
          },
          getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
            return (/* number */0
            );
          },
          notifyChange: function notifyChange() /* evtData: {flexibleExpansionRatio: number} */{},
          setStyle: function setStyle() /* property: string, value: string */{},
          setStyleForTitleElement: function setStyleForTitleElement() /* property: string, value: string */{},
          setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement() /* property: string, value: string */{},
          setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement() /* property: string, value: string */{}
        };
      }
    }]);

    function MDCToolbarFoundation(adapter) {
      classCallCheck(this, MDCToolbarFoundation);

      var _this = possibleConstructorReturn(this, (MDCToolbarFoundation.__proto__ || Object.getPrototypeOf(MDCToolbarFoundation)).call(this, _extends(MDCToolbarFoundation.defaultAdapter, adapter)));

      _this.resizeHandler_ = function () {
        return _this.checkRowHeight_();
      };
      _this.scrollHandler_ = function () {
        return _this.updateToolbarStyles_();
      };
      _this.checkRowHeightFrame_ = 0;
      _this.scrollFrame_ = 0;
      _this.executedLastChange_ = false;

      _this.calculations_ = {
        toolbarRowHeight: 0,
        // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
        toolbarRatio: 0, // The ratio of toolbar height to row height
        flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
        maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
        scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
        // Derived Heights based on the above key ratios.
        toolbarHeight: 0,
        flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
        maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
        scrollThreshold: 0
      };
      // Toolbar fixed behavior
      // If toolbar is fixed
      _this.fixed_ = false;
      // If fixed is targeted only at the last row
      _this.fixedLastrow_ = false;
      // Toolbar flexible behavior
      // If the first row is flexible
      _this.hasFlexibleRow_ = false;
      // If use the default behavior
      _this.useFlexDefaultBehavior_ = false;
      return _this;
    }

    createClass(MDCToolbarFoundation, [{
      key: 'init',
      value: function init() {
        this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
        this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
        this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
        if (this.hasFlexibleRow_) {
          this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
        }
        this.initKeyRatio_();
        this.setKeyHeights_();
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        this.adapter_.registerScrollHandler(this.scrollHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        this.adapter_.deregisterScrollHandler(this.scrollHandler_);
      }
    }, {
      key: 'updateAdjustElementStyles',
      value: function updateAdjustElementStyles() {
        if (this.fixed_) {
          this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + 'px');
        }
      }
    }, {
      key: 'getFlexibleExpansionRatio_',
      value: function getFlexibleExpansionRatio_(scrollTop) {
        // To prevent division by zero when there is no flexibleExpansionHeight
        var delta = 0.0001;
        return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
      }
    }, {
      key: 'checkRowHeight_',
      value: function checkRowHeight_() {
        var _this2 = this;

        cancelAnimationFrame(this.checkRowHeightFrame_);
        this.checkRowHeightFrame_ = requestAnimationFrame(function () {
          return _this2.setKeyHeights_();
        });
      }
    }, {
      key: 'setKeyHeights_',
      value: function setKeyHeights_() {
        var newToolbarRowHeight = this.getRowHeight_();
        if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
          this.calculations_.toolbarRowHeight = newToolbarRowHeight;
          this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
          this.calculations_.flexibleExpansionHeight = this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
          this.calculations_.maxTranslateYDistance = this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
          this.calculations_.scrollThreshold = this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
          this.updateAdjustElementStyles();
          this.updateToolbarStyles_();
        }
      }
    }, {
      key: 'updateToolbarStyles_',
      value: function updateToolbarStyles_() {
        var _this3 = this;

        cancelAnimationFrame(this.scrollFrame_);
        this.scrollFrame_ = requestAnimationFrame(function () {
          var scrollTop = _this3.adapter_.getViewportScrollY();
          var hasScrolledOutOfThreshold = _this3.scrolledOutOfThreshold_(scrollTop);

          if (hasScrolledOutOfThreshold && _this3.executedLastChange_) {
            return;
          }

          var flexibleExpansionRatio = _this3.getFlexibleExpansionRatio_(scrollTop);

          _this3.updateToolbarFlexibleState_(flexibleExpansionRatio);
          if (_this3.fixedLastrow_) {
            _this3.updateToolbarFixedState_(scrollTop);
          }
          if (_this3.hasFlexibleRow_) {
            _this3.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
          }
          _this3.executedLastChange_ = hasScrolledOutOfThreshold;
          _this3.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
        });
      }
    }, {
      key: 'scrolledOutOfThreshold_',
      value: function scrolledOutOfThreshold_(scrollTop) {
        return scrollTop > this.calculations_.scrollThreshold;
      }
    }, {
      key: 'initKeyRatio_',
      value: function initKeyRatio_() {
        var toolbarRowHeight = this.getRowHeight_();
        var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
        this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
        this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
        this.calculations_.maxTranslateYRatio = this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
        this.calculations_.scrollThresholdRatio = (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
      }
    }, {
      key: 'getRowHeight_',
      value: function getRowHeight_() {
        var breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
        return this.adapter_.getViewportWidth() < breakpoint ? MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
      }
    }, {
      key: 'updateToolbarFlexibleState_',
      value: function updateToolbarFlexibleState_(flexibleExpansionRatio) {
        this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
        this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
        if (flexibleExpansionRatio === 1) {
          this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
        } else if (flexibleExpansionRatio === 0) {
          this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
        }
      }
    }, {
      key: 'updateToolbarFixedState_',
      value: function updateToolbarFixedState_(scrollTop) {
        var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
        this.adapter_.setStyle('transform', 'translateY(' + -translateDistance + 'px)');

        if (translateDistance === this.calculations_.maxTranslateYDistance) {
          this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
        } else {
          this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
        }
      }
    }, {
      key: 'updateFlexibleRowElementStyles_',
      value: function updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
        if (this.fixed_) {
          var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
          this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + 'px');
        }
        if (this.useFlexDefaultBehavior_) {
          this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
        }
      }
    }, {
      key: 'updateElementStylesDefaultBehavior_',
      value: function updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
        var maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
        var minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
        var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

        this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + 'rem');
      }
    }]);
    return MDCToolbarFoundation;
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

  var supportsPassive_ = void 0;

  // Determine whether the current browser supports passive event listeners, and if so, use them.
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

  var mdcToolbar = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('header', { staticClass: "mdc-toolbar-wrapper" }, [_c('div', { ref: "root", class: _vm.rootClasses, style: _vm.rootStyles }, [_vm._t("default")], 2), _vm._v(" "), _vm.fixed || _vm.waterfall || _vm.fixedLastrow ? _c('div', { ref: "fixed-adjust", staticClass: "mdc-toolbar-fixed-adjust", style: _vm.adjustStyles }) : _vm._e()]);
    }, staticRenderFns: [],
    name: 'mdc-toolbar',
    props: {
      'fixed': Boolean,
      'waterfall': Boolean,
      'fixed-lastrow': Boolean,
      'flexible': Boolean,
      'flexible-default': { type: Boolean, default: true }
    },
    data: function data() {
      return {
        rootClasses: {
          'mdc-toolbar': true,
          'mdc-toolbar--fixed': this.fixed || this.waterfall || this.fixedLastrow,
          'mdc-toolbar--waterfall': this.waterfall,
          'mdc-toolbar--fixed-lastrow-only': this.fixedLastrow,
          'mdc-toolbar--flexible': this.flexible,
          'mdc-toolbar--flexible-default-behavior': this.flexible && this.flexibleDefault
        },
        rootStyles: {},
        adjustStyles: {
          // to avoid top margin collapse with :after el
          // 0.1 px should be rounded to 0px
          // TODO: find a better trick
          // height: '0.1px'
        },
        foundation: null
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.foundation = new MDCToolbarFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.rootClasses, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.rootClasses, className);
        },
        hasClass: function hasClass(className) {
          return _this.$refs.root.classList.contains(className);
        },
        registerScrollHandler: function registerScrollHandler(handler) {
          window.addEventListener('scroll', handler, applyPassive());
        },
        deregisterScrollHandler: function deregisterScrollHandler(handler) {
          window.removeEventListener('scroll', handler, applyPassive());
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          window.removeEventListener('resize', handler);
        },
        getViewportWidth: function getViewportWidth() {
          return window.innerWidth;
        },
        getViewportScrollY: function getViewportScrollY() {
          return window.pageYOffset;
        },
        getOffsetHeight: function getOffsetHeight() {
          return _this.$refs.root.offsetHeight;
        },
        getFirstRowElementOffsetHeight: function getFirstRowElementOffsetHeight() {
          var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
          return el ? el.offsetHeight : undefined;
        },
        notifyChange: function notifyChange(evtData) {
          _this.$emit('change', evtData);
        },
        setStyle: function setStyle(property, value) {
          _this.$set(_this.rootStyles, property, value);
        },
        setStyleForTitleElement: function setStyleForTitleElement(property, value) {
          var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR);
          if (el) el.style.setProperty(property, value);
        },
        setStyleForFlexibleRowElement: function setStyleForFlexibleRowElement(property, value) {
          var el = _this.$refs.root.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
          if (el) el.style.setProperty(property, value);
        },
        setStyleForFixedAdjustElement: function setStyleForFixedAdjustElement(property, value) {
          _this.$set(_this.adjustStyles, property, value);
        }
      });
      this.foundation.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var mdcToolbarRow = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-toolbar-row mdc-toolbar__row" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-row'
  };

  var mdcToolbarSection = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { staticClass: "mdc-toolbar-section mdc-toolbar__section", class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-section',
    props: {
      'align-start': Boolean,
      'align-end': Boolean,
      'shrink-to-fit': Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-toolbar__section--align-start': this.alignStart,
          'mdc-toolbar__section--align-end': this.alignEnd,
          'mdc-toolbar__section--shrink-to-fit': this.shrinkToFit
        }
      };
    }
  };

  var mdcToolbarMenuIcon = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', { staticClass: "mdc-toolbar-menu-icon mdc-toolbar__menu-icon", class: { 'material-icons': !!_vm.icon }, on: { "click": _vm.dispatchEvent } }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-menu-icon',
    mixins: [DispatchEventMixin],
    props: {
      icon: { type: String, 'default': "menu" }
    }
  };

  var mdcToolbarTitle = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', { staticClass: "mdc-toolbar-title mdc-toolbar__title", on: { "click": _vm.dispatchEvent } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-title',
    mixins: [DispatchEventMixin]
  };

  var mdcToolbarIcon = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('a', { staticClass: "mdc-toolbar-icon mdc-toolbar__icon", class: { 'material-icons': !!_vm.icon }, on: { "click": _vm.dispatchEvent } }, [_vm._t("default", [_vm._v(_vm._s(_vm.icon))])], 2);
    }, staticRenderFns: [],
    name: 'mdc-toolbar-icon',
    mixins: [DispatchEventMixin],
    props: {
      icon: String
    }
  };

  var plugin = BasePlugin({
    mdcToolbar: mdcToolbar,
    mdcToolbarRow: mdcToolbarRow,
    mdcToolbarSection: mdcToolbarSection,
    mdcToolbarMenuIcon: mdcToolbarMenuIcon,
    mdcToolbarTitle: mdcToolbarTitle,
    mdcToolbarIcon: mdcToolbarIcon
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vY29tcG9uZW50cy9iYXNlL2F1dG8taW5pdC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9iYXNlLXBsdWdpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9jdXN0b20tZXZlbnQuanMiLCIuLi8uLi9jb21wb25lbnRzL2Jhc2UvZGlzcGF0Y2gtZXZlbnQtbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9vbGJhci9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3Rvb2xiYXIvZm91bmRhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9vbGJhci91dGlsLmpzIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci9tZGMtdG9vbGJhci1yb3cudnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLXNlY3Rpb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLW1lbnUtaWNvbi52dWUiLCIuLi8uLi9jb21wb25lbnRzL3Rvb2xiYXIvbWRjLXRvb2xiYXItdGl0bGUudnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL21kYy10b29sYmFyLWljb24udnVlIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy90b29sYmFyL2VudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhdXRvSW5pdCAocGx1Z2luKSB7XG4gIC8vIEF1dG8taW5zdGFsbFxuICBsZXQgX1Z1ZSA9IG51bGxcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgX1Z1ZSA9IHdpbmRvdy5WdWVcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8qZ2xvYmFsIGdsb2JhbCovXG4gICAgX1Z1ZSA9IGdsb2JhbC5WdWVcbiAgfVxuICBpZiAoX1Z1ZSkge1xuICAgIF9WdWUudXNlKHBsdWdpbilcbiAgfVxufVxuICAiLCJleHBvcnQgZnVuY3Rpb24gQmFzZVBsdWdpbiAoY29tcG9uZW50cykgeyBcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnX19WRVJTSU9OX18nLFxuICAgIGluc3RhbGw6ICh2bSkgPT4ge1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNba2V5XVxuICAgICAgICAgIHZtLmNvbXBvbmVudChjb21wb25lbnQubmFtZSxjb21wb25lbnQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzXG4gIH0gXG59XG5cbiIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50IChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xuICBwcm9wczoge1xuICAgICdldmVudCc6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXksXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkaXNwYXRjaEV2ZW50IChldnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZ0LnR5cGUpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIEZJWEVEOiAnbWRjLXRvb2xiYXItLWZpeGVkJyxcbiAgRklYRURfTEFTVFJPVzogJ21kYy10b29sYmFyLS1maXhlZC1sYXN0cm93LW9ubHknLFxuICBGSVhFRF9BVF9MQVNUX1JPVzogJ21kYy10b29sYmFyLS1maXhlZC1hdC1sYXN0LXJvdycsXG4gIFRPT0xCQVJfUk9XX0ZMRVhJQkxFOiAnbWRjLXRvb2xiYXItLWZsZXhpYmxlJyxcbiAgRkxFWElCTEVfREVGQVVMVF9CRUhBVklPUjogJ21kYy10b29sYmFyLS1mbGV4aWJsZS1kZWZhdWx0LWJlaGF2aW9yJyxcbiAgRkxFWElCTEVfTUFYOiAnbWRjLXRvb2xiYXItLWZsZXhpYmxlLXNwYWNlLW1heGltaXplZCcsXG4gIEZMRVhJQkxFX01JTjogJ21kYy10b29sYmFyLS1mbGV4aWJsZS1zcGFjZS1taW5pbWl6ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0cmluZ3MgPSB7XG4gIFRJVExFX1NFTEVDVE9SOiAnLm1kYy10b29sYmFyX190aXRsZScsXG4gIElDT05fU0VMRUNUT1I6ICcubWRjLXRvb2xiYXJfX2ljb24nLFxuICBGSVJTVF9ST1dfU0VMRUNUT1I6ICcubWRjLXRvb2xiYXJfX3JvdzpmaXJzdC1jaGlsZCcsXG4gIENIQU5HRV9FVkVOVDogJ01EQ1Rvb2xiYXI6Y2hhbmdlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBudW1iZXJzID0ge1xuICBNQVhfVElUTEVfU0laRTogMi4xMjUsXG4gIE1JTl9USVRMRV9TSVpFOiAxLjI1LFxuICBUT09MQkFSX1JPV19IRUlHSFQ6IDY0LFxuICBUT09MQkFSX1JPV19NT0JJTEVfSEVJR0hUOiA1NixcbiAgVE9PTEJBUl9NT0JJTEVfQlJFQUtQT0lOVDogNjAwLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNRENUb29sYmFyRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoYXNDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyU2Nyb2xsSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclNjcm9sbEhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGdldFZpZXdwb3J0V2lkdGg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgZ2V0Vmlld3BvcnRTY3JvbGxZOiAoKSA9PiAvKiBudW1iZXIgKi8gMCxcbiAgICAgIGdldE9mZnNldEhlaWdodDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICBnZXRGaXJzdFJvd0VsZW1lbnRPZmZzZXRIZWlnaHQ6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoLyogZXZ0RGF0YToge2ZsZXhpYmxlRXhwYW5zaW9uUmF0aW86IG51bWJlcn0gKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGU6ICgvKiBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldFN0eWxlRm9yVGl0bGVFbGVtZW50OiAoLyogcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXRTdHlsZUZvckZsZXhpYmxlUm93RWxlbWVudDogKC8qIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0U3R5bGVGb3JGaXhlZEFkanVzdEVsZW1lbnQ6ICgvKiBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDVG9vbGJhckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5jaGVja1Jvd0hlaWdodF8oKTtcbiAgICB0aGlzLnNjcm9sbEhhbmRsZXJfID0gKCkgPT4gdGhpcy51cGRhdGVUb29sYmFyU3R5bGVzXygpO1xuICAgIHRoaXMuY2hlY2tSb3dIZWlnaHRGcmFtZV8gPSAwO1xuICAgIHRoaXMuc2Nyb2xsRnJhbWVfID0gMDtcbiAgICB0aGlzLmV4ZWN1dGVkTGFzdENoYW5nZV8gPSBmYWxzZTtcblxuICAgIHRoaXMuY2FsY3VsYXRpb25zXyA9IHtcbiAgICAgIHRvb2xiYXJSb3dIZWlnaHQ6IDAsXG4gICAgICAvLyBDYWxjdWxhdGVkIEhlaWdodCByYXRpby4gV2UgdXNlIHJhdGlvIHRvIGNhbGN1bGF0ZSBjb3JyZXNwb25kaW5nIGhlaWdodHMgaW4gcmVzaXplIGV2ZW50LlxuICAgICAgdG9vbGJhclJhdGlvOiAwLCAvLyBUaGUgcmF0aW8gb2YgdG9vbGJhciBoZWlnaHQgdG8gcm93IGhlaWdodFxuICAgICAgZmxleGlibGVFeHBhbnNpb25SYXRpbzogMCwgLy8gVGhlIHJhdGlvIG9mIGZsZXhpYmxlIHNwYWNlIGhlaWdodCB0byByb3cgaGVpZ2h0XG4gICAgICBtYXhUcmFuc2xhdGVZUmF0aW86IDAsIC8vIFRoZSByYXRpbyBvZiBtYXggdG9vbGJhciBtb3ZlIHVwIGRpc3RhbmNlIHRvIHJvdyBoZWlnaHRcbiAgICAgIHNjcm9sbFRocmVzaG9sZFJhdGlvOiAwLCAvLyBUaGUgcmF0aW8gb2YgbWF4IHNjcm9sbFRvcCB0aGF0IHdlIHNob3VsZCBsaXN0ZW4gdG8gdG8gcm93IGhlaWdodFxuICAgICAgLy8gRGVyaXZlZCBIZWlnaHRzIGJhc2VkIG9uIHRoZSBhYm92ZSBrZXkgcmF0aW9zLlxuICAgICAgdG9vbGJhckhlaWdodDogMCxcbiAgICAgIGZsZXhpYmxlRXhwYW5zaW9uSGVpZ2h0OiAwLCAvLyBGbGV4aWJsZSByb3cgbWludXMgdG9vbGJhciBoZWlnaHQgKGRlcml2ZWQpXG4gICAgICBtYXhUcmFuc2xhdGVZRGlzdGFuY2U6IDAsIC8vIFdoZW4gdG9vbGJhciBvbmx5IGZpeCBsYXN0IHJvdyAoZGVyaXZlZClcbiAgICAgIHNjcm9sbFRocmVzaG9sZDogMCxcbiAgICB9O1xuICAgIC8vIFRvb2xiYXIgZml4ZWQgYmVoYXZpb3JcbiAgICAvLyBJZiB0b29sYmFyIGlzIGZpeGVkXG4gICAgdGhpcy5maXhlZF8gPSBmYWxzZTtcbiAgICAvLyBJZiBmaXhlZCBpcyB0YXJnZXRlZCBvbmx5IGF0IHRoZSBsYXN0IHJvd1xuICAgIHRoaXMuZml4ZWRMYXN0cm93XyA9IGZhbHNlO1xuICAgIC8vIFRvb2xiYXIgZmxleGlibGUgYmVoYXZpb3JcbiAgICAvLyBJZiB0aGUgZmlyc3Qgcm93IGlzIGZsZXhpYmxlXG4gICAgdGhpcy5oYXNGbGV4aWJsZVJvd18gPSBmYWxzZTtcbiAgICAvLyBJZiB1c2UgdGhlIGRlZmF1bHQgYmVoYXZpb3JcbiAgICB0aGlzLnVzZUZsZXhEZWZhdWx0QmVoYXZpb3JfID0gZmFsc2U7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZml4ZWRfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZJWEVEKTtcbiAgICB0aGlzLmZpeGVkTGFzdHJvd18gPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRklYRURfTEFTVFJPVykgJiB0aGlzLmZpeGVkXztcbiAgICB0aGlzLmhhc0ZsZXhpYmxlUm93XyA9IHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5UT09MQkFSX1JPV19GTEVYSUJMRSk7XG4gICAgaWYgKHRoaXMuaGFzRmxleGlibGVSb3dfKSB7XG4gICAgICB0aGlzLnVzZUZsZXhEZWZhdWx0QmVoYXZpb3JfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX0RFRkFVTFRfQkVIQVZJT1IpO1xuICAgIH1cbiAgICB0aGlzLmluaXRLZXlSYXRpb18oKTtcbiAgICB0aGlzLnNldEtleUhlaWdodHNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclNjcm9sbEhhbmRsZXIodGhpcy5zY3JvbGxIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcih0aGlzLnNjcm9sbEhhbmRsZXJfKTtcbiAgfVxuXG4gIHVwZGF0ZUFkanVzdEVsZW1lbnRTdHlsZXMoKSB7XG4gICAgaWYgKHRoaXMuZml4ZWRfKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlRm9yRml4ZWRBZGp1c3RFbGVtZW50KCdtYXJnaW4tdG9wJywgYCR7dGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJIZWlnaHR9cHhgKTtcbiAgICB9XG4gIH1cblxuICBnZXRGbGV4aWJsZUV4cGFuc2lvblJhdGlvXyhzY3JvbGxUb3ApIHtcbiAgICAvLyBUbyBwcmV2ZW50IGRpdmlzaW9uIGJ5IHplcm8gd2hlbiB0aGVyZSBpcyBubyBmbGV4aWJsZUV4cGFuc2lvbkhlaWdodFxuICAgIGNvbnN0IGRlbHRhID0gMC4wMDAxO1xuICAgIHJldHVybiBNYXRoLm1heCgwLCAxIC0gc2Nyb2xsVG9wIC8gKHRoaXMuY2FsY3VsYXRpb25zXy5mbGV4aWJsZUV4cGFuc2lvbkhlaWdodCArIGRlbHRhKSk7XG4gIH1cblxuICBjaGVja1Jvd0hlaWdodF8oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5jaGVja1Jvd0hlaWdodEZyYW1lXyk7XG4gICAgdGhpcy5jaGVja1Jvd0hlaWdodEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnNldEtleUhlaWdodHNfKCkpO1xuICB9XG5cbiAgc2V0S2V5SGVpZ2h0c18oKSB7XG4gICAgY29uc3QgbmV3VG9vbGJhclJvd0hlaWdodCA9IHRoaXMuZ2V0Um93SGVpZ2h0XygpO1xuICAgIGlmIChuZXdUb29sYmFyUm93SGVpZ2h0ICE9PSB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQgPSBuZXdUb29sYmFyUm93SGVpZ2h0O1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJIZWlnaHQgPSB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJhdGlvICogdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25IZWlnaHQgPVxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25SYXRpbyAqIHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUm93SGVpZ2h0O1xuICAgICAgdGhpcy5jYWxjdWxhdGlvbnNfLm1heFRyYW5zbGF0ZVlEaXN0YW5jZSA9XG4gICAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5tYXhUcmFuc2xhdGVZUmF0aW8gKiB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodDtcbiAgICAgIHRoaXMuY2FsY3VsYXRpb25zXy5zY3JvbGxUaHJlc2hvbGQgPVxuICAgICAgICB0aGlzLmNhbGN1bGF0aW9uc18uc2Nyb2xsVGhyZXNob2xkUmF0aW8gKiB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJvd0hlaWdodDtcbiAgICAgIHRoaXMudXBkYXRlQWRqdXN0RWxlbWVudFN0eWxlcygpO1xuICAgICAgdGhpcy51cGRhdGVUb29sYmFyU3R5bGVzXygpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVRvb2xiYXJTdHlsZXNfKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuc2Nyb2xsRnJhbWVfKTtcbiAgICB0aGlzLnNjcm9sbEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xuICAgICAgY29uc3QgaGFzU2Nyb2xsZWRPdXRPZlRocmVzaG9sZCA9IHRoaXMuc2Nyb2xsZWRPdXRPZlRocmVzaG9sZF8oc2Nyb2xsVG9wKTtcblxuICAgICAgaWYgKGhhc1Njcm9sbGVkT3V0T2ZUaHJlc2hvbGQgJiYgdGhpcy5leGVjdXRlZExhc3RDaGFuZ2VfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmxleGlibGVFeHBhbnNpb25SYXRpbyA9IHRoaXMuZ2V0RmxleGlibGVFeHBhbnNpb25SYXRpb18oc2Nyb2xsVG9wKTtcblxuICAgICAgdGhpcy51cGRhdGVUb29sYmFyRmxleGlibGVTdGF0ZV8oZmxleGlibGVFeHBhbnNpb25SYXRpbyk7XG4gICAgICBpZiAodGhpcy5maXhlZExhc3Ryb3dfKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVG9vbGJhckZpeGVkU3RhdGVfKHNjcm9sbFRvcCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oYXNGbGV4aWJsZVJvd18pIHtcbiAgICAgICAgdGhpcy51cGRhdGVGbGV4aWJsZVJvd0VsZW1lbnRTdHlsZXNfKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8pO1xuICAgICAgfVxuICAgICAgdGhpcy5leGVjdXRlZExhc3RDaGFuZ2VfID0gaGFzU2Nyb2xsZWRPdXRPZlRocmVzaG9sZDtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2hhbmdlKHtmbGV4aWJsZUV4cGFuc2lvblJhdGlvOiBmbGV4aWJsZUV4cGFuc2lvblJhdGlvfSk7XG4gICAgfSk7XG4gIH1cblxuICBzY3JvbGxlZE91dE9mVGhyZXNob2xkXyhzY3JvbGxUb3ApIHtcbiAgICByZXR1cm4gc2Nyb2xsVG9wID4gdGhpcy5jYWxjdWxhdGlvbnNfLnNjcm9sbFRocmVzaG9sZDtcbiAgfVxuXG4gIGluaXRLZXlSYXRpb18oKSB7XG4gICAgY29uc3QgdG9vbGJhclJvd0hlaWdodCA9IHRoaXMuZ2V0Um93SGVpZ2h0XygpO1xuICAgIGNvbnN0IGZpcnN0Um93TWF4UmF0aW8gPSB0aGlzLmFkYXB0ZXJfLmdldEZpcnN0Um93RWxlbWVudE9mZnNldEhlaWdodCgpIC8gdG9vbGJhclJvd0hlaWdodDtcbiAgICB0aGlzLmNhbGN1bGF0aW9uc18udG9vbGJhclJhdGlvID0gdGhpcy5hZGFwdGVyXy5nZXRPZmZzZXRIZWlnaHQoKSAvIHRvb2xiYXJSb3dIZWlnaHQ7XG4gICAgdGhpcy5jYWxjdWxhdGlvbnNfLmZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gPSBmaXJzdFJvd01heFJhdGlvIC0gMTtcbiAgICB0aGlzLmNhbGN1bGF0aW9uc18ubWF4VHJhbnNsYXRlWVJhdGlvID1cbiAgICAgIHRoaXMuZml4ZWRMYXN0cm93XyA/IHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUmF0aW8gLSBmaXJzdFJvd01heFJhdGlvIDogMDtcbiAgICB0aGlzLmNhbGN1bGF0aW9uc18uc2Nyb2xsVGhyZXNob2xkUmF0aW8gPVxuICAgICAgKHRoaXMuZml4ZWRMYXN0cm93XyA/IHRoaXMuY2FsY3VsYXRpb25zXy50b29sYmFyUmF0aW8gOiBmaXJzdFJvd01heFJhdGlvKSAtIDE7XG4gIH1cblxuICBnZXRSb3dIZWlnaHRfKCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLlRPT0xCQVJfTU9CSUxFX0JSRUFLUE9JTlQ7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uZ2V0Vmlld3BvcnRXaWR0aCgpIDwgYnJlYWtwb2ludCA/XG4gICAgICBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLlRPT0xCQVJfUk9XX01PQklMRV9IRUlHSFQgOiBNRENUb29sYmFyRm91bmRhdGlvbi5udW1iZXJzLlRPT0xCQVJfUk9XX0hFSUdIVDtcbiAgfVxuXG4gIHVwZGF0ZVRvb2xiYXJGbGV4aWJsZVN0YXRlXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX01BWCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX01JTik7XG4gICAgaWYgKGZsZXhpYmxlRXhwYW5zaW9uUmF0aW8gPT09IDEpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GTEVYSUJMRV9NQVgpO1xuICAgIH0gZWxzZSBpZiAoZmxleGlibGVFeHBhbnNpb25SYXRpbyA9PT0gMCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENUb29sYmFyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZMRVhJQkxFX01JTik7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVG9vbGJhckZpeGVkU3RhdGVfKHNjcm9sbFRvcCkge1xuICAgIGNvbnN0IHRyYW5zbGF0ZURpc3RhbmNlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oXG4gICAgICBzY3JvbGxUb3AgLSB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25IZWlnaHQsXG4gICAgICB0aGlzLmNhbGN1bGF0aW9uc18ubWF4VHJhbnNsYXRlWURpc3RhbmNlKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZSgndHJhbnNmb3JtJywgYHRyYW5zbGF0ZVkoJHstdHJhbnNsYXRlRGlzdGFuY2V9cHgpYCk7XG5cbiAgICBpZiAodHJhbnNsYXRlRGlzdGFuY2UgPT09IHRoaXMuY2FsY3VsYXRpb25zXy5tYXhUcmFuc2xhdGVZRGlzdGFuY2UpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GSVhFRF9BVF9MQVNUX1JPVyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDVG9vbGJhckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GSVhFRF9BVF9MQVNUX1JPVyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRmxleGlibGVSb3dFbGVtZW50U3R5bGVzXyhmbGV4aWJsZUV4cGFuc2lvblJhdGlvKSB7XG4gICAgaWYgKHRoaXMuZml4ZWRfKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbGN1bGF0aW9uc18uZmxleGlibGVFeHBhbnNpb25IZWlnaHQgKiBmbGV4aWJsZUV4cGFuc2lvblJhdGlvO1xuICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvckZsZXhpYmxlUm93RWxlbWVudCgnaGVpZ2h0JyxcbiAgICAgICAgYCR7aGVpZ2h0ICsgdGhpcy5jYWxjdWxhdGlvbnNfLnRvb2xiYXJSb3dIZWlnaHR9cHhgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMudXNlRmxleERlZmF1bHRCZWhhdmlvcl8pIHtcbiAgICAgIHRoaXMudXBkYXRlRWxlbWVudFN0eWxlc0RlZmF1bHRCZWhhdmlvcl8oZmxleGlibGVFeHBhbnNpb25SYXRpbyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRWxlbWVudFN0eWxlc0RlZmF1bHRCZWhhdmlvcl8oZmxleGlibGVFeHBhbnNpb25SYXRpbykge1xuICAgIGNvbnN0IG1heFRpdGxlU2l6ZSA9IE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLm51bWJlcnMuTUFYX1RJVExFX1NJWkU7XG4gICAgY29uc3QgbWluVGl0bGVTaXplID0gTURDVG9vbGJhckZvdW5kYXRpb24ubnVtYmVycy5NSU5fVElUTEVfU0laRTtcbiAgICBjb25zdCBjdXJyZW50VGl0bGVTaXplID0gKG1heFRpdGxlU2l6ZSAtIG1pblRpdGxlU2l6ZSkgKiBmbGV4aWJsZUV4cGFuc2lvblJhdGlvICsgbWluVGl0bGVTaXplO1xuXG4gICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZUZvclRpdGxlRWxlbWVudCgnZm9udC1zaXplJywgYCR7Y3VycmVudFRpdGxlU2l6ZX1yZW1gKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8vIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxoZWFkZXIgY2xhc3M9XCJtZGMtdG9vbGJhci13cmFwcGVyXCI+XG4gICAgPCEtLVRvb2xiYXItLT5cbiAgICA8ZGl2IHJlZj1cInJvb3RcIiA6Y2xhc3M9XCJyb290Q2xhc3Nlc1wiIDpzdHlsZT1cInJvb3RTdHlsZXNcIj5cbiAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gRml4ZWQgQWRqdXN0IEVsZW1lbnQtLT5cbiAgICA8ZGl2IHJlZj1cImZpeGVkLWFkanVzdFwiIGNsYXNzPVwibWRjLXRvb2xiYXItZml4ZWQtYWRqdXN0XCIgXG4gICAgICA6c3R5bGU9XCJhZGp1c3RTdHlsZXNcIlxuICAgICAgdi1pZj1cImZpeGVkIHx8IHdhdGVyZmFsbCB8fCBmaXhlZExhc3Ryb3dcIj48L2Rpdj5cbiAgPC9oZWFkZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICBpbXBvcnQgTURDVG9vbGJhckZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3Rvb2xiYXIvZm91bmRhdGlvbidcbiAgaW1wb3J0ICogYXMgdXRpbCBmcm9tICdAbWF0ZXJpYWwvdG9vbGJhci91dGlsJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBuYW1lOiAnbWRjLXRvb2xiYXInLFxuICAgIHByb3BzOiB7XG4gICAgICAnZml4ZWQnOiBCb29sZWFuLFxuICAgICAgJ3dhdGVyZmFsbCc6IEJvb2xlYW4sXG4gICAgICAnZml4ZWQtbGFzdHJvdyc6IEJvb2xlYW4sXG4gICAgICAnZmxleGlibGUnOiBCb29sZWFuLFxuICAgICAgJ2ZsZXhpYmxlLWRlZmF1bHQnOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfVxuICAgIH0sXG4gICAgZGF0YSAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb290Q2xhc3Nlczoge1xuICAgICAgICAgICdtZGMtdG9vbGJhcic6IHRydWUsXG4gICAgICAgICAgJ21kYy10b29sYmFyLS1maXhlZCc6IHRoaXMuZml4ZWQgfHwgdGhpcy53YXRlcmZhbGwgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpeGVkTGFzdHJvdyxcbiAgICAgICAgICAnbWRjLXRvb2xiYXItLXdhdGVyZmFsbCc6IHRoaXMud2F0ZXJmYWxsLFxuICAgICAgICAgICdtZGMtdG9vbGJhci0tZml4ZWQtbGFzdHJvdy1vbmx5JzogdGhpcy5maXhlZExhc3Ryb3csXG4gICAgICAgICAgJ21kYy10b29sYmFyLS1mbGV4aWJsZSc6IHRoaXMuZmxleGlibGUsXG4gICAgICAgICAgJ21kYy10b29sYmFyLS1mbGV4aWJsZS1kZWZhdWx0LWJlaGF2aW9yJzogdGhpcy5mbGV4aWJsZSAmJlxuICAgICAgICAgICAgdGhpcy5mbGV4aWJsZURlZmF1bHRcbiAgICAgICAgfSxcbiAgICAgICAgcm9vdFN0eWxlczoge30sXG4gICAgICAgIGFkanVzdFN0eWxlczoge1xuICAgICAgICAgIC8vIHRvIGF2b2lkIHRvcCBtYXJnaW4gY29sbGFwc2Ugd2l0aCA6YWZ0ZXIgZWxcbiAgICAgICAgICAvLyAwLjEgcHggc2hvdWxkIGJlIHJvdW5kZWQgdG8gMHB4XG4gICAgICAgICAgLy8gVE9ETzogZmluZCBhIGJldHRlciB0cmlja1xuICAgICAgICAgIC8vIGhlaWdodDogJzAuMXB4J1xuICAgICAgICB9LFxuICAgICAgICBmb3VuZGF0aW9uOiBudWxsXG4gICAgICB9XG4gICAgfSxcbiAgICBtb3VudGVkICgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENUb29sYmFyRm91bmRhdGlvbih7XG4gICAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMucm9vdENsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5yb290Q2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgICB9LFxuICAgICAgICBoYXNDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLnJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXJTY3JvbGxIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKVxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVyU2Nyb2xsSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSlcbiAgICAgICAgfSxcbiAgICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKVxuICAgICAgICB9LFxuICAgICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Vmlld3BvcnRXaWR0aDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICB9LFxuICAgICAgICBnZXRWaWV3cG9ydFNjcm9sbFk6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9mZnNldEhlaWdodDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLnJvb3Qub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIGdldEZpcnN0Um93RWxlbWVudE9mZnNldEhlaWdodDogKCkgPT4ge1xuICAgICAgICAgIGxldCBlbCA9IHRoaXMuJHJlZnMucm9vdC5xdWVyeVNlbGVjdG9yKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLnN0cmluZ3MuRklSU1RfUk9XX1NFTEVDVE9SKVxuICAgICAgICAgIHJldHVybiAoZWwpID8gZWwub2Zmc2V0SGVpZ2h0IDogdW5kZWZpbmVkXG4gICAgICAgIH0sXG4gICAgICAgIG5vdGlmeUNoYW5nZTogKGV2dERhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBldnREYXRhKVxuICAgICAgICB9LFxuICAgICAgICBzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLnJvb3RTdHlsZXMsIHByb3BlcnR5LCB2YWx1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0U3R5bGVGb3JUaXRsZUVsZW1lbnQ6IChwcm9wZXJ0eSwgdmFsdWUpID0+IHtcbiAgICAgICAgICBsZXQgZWwgPSB0aGlzLiRyZWZzLnJvb3QucXVlcnlTZWxlY3RvcihNRENUb29sYmFyRm91bmRhdGlvbi5zdHJpbmdzLlRJVExFX1NFTEVDVE9SKVxuICAgICAgICAgIGlmIChlbCkgZWwuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKVxuICAgICAgICB9LFxuICAgICAgICBzZXRTdHlsZUZvckZsZXhpYmxlUm93RWxlbWVudDogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIGxldCBlbCA9IHRoaXMuJHJlZnMucm9vdC5xdWVyeVNlbGVjdG9yKE1EQ1Rvb2xiYXJGb3VuZGF0aW9uLnN0cmluZ3MuRklSU1RfUk9XX1NFTEVDVE9SKVxuICAgICAgICAgIGlmIChlbCkgZWwuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKVxuICAgICAgICB9LFxuICAgICAgICBzZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudDogKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmFkanVzdFN0eWxlcywgcHJvcGVydHksIHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKVxuICAgIH0sXG4gICAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gICAgfVxuICB9XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cIm1kYy10b29sYmFyLXJvdyBtZGMtdG9vbGJhcl9fcm93XCI+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtdG9vbGJhci1yb3cnXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHNlY3Rpb24gY2xhc3M9XCJtZGMtdG9vbGJhci1zZWN0aW9uIG1kYy10b29sYmFyX19zZWN0aW9uXCIgOmNsYXNzPVwiY2xhc3Nlc1wiPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9zZWN0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy10b29sYmFyLXNlY3Rpb24nLFxuICBwcm9wczoge1xuICAgICdhbGlnbi1zdGFydCc6IEJvb2xlYW4sXG4gICAgJ2FsaWduLWVuZCc6IEJvb2xlYW4sXG4gICAgJ3Nocmluay10by1maXQnOiBCb29sZWFuXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgICdtZGMtdG9vbGJhcl9fc2VjdGlvbi0tYWxpZ24tc3RhcnQnOiB0aGlzLmFsaWduU3RhcnQsXG4gICAgICAgICdtZGMtdG9vbGJhcl9fc2VjdGlvbi0tYWxpZ24tZW5kJzogdGhpcy5hbGlnbkVuZCxcbiAgICAgICAgJ21kYy10b29sYmFyX19zZWN0aW9uLS1zaHJpbmstdG8tZml0JzogdGhpcy5zaHJpbmtUb0ZpdFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxhIGNsYXNzPVwibWRjLXRvb2xiYXItbWVudS1pY29uIG1kYy10b29sYmFyX19tZW51LWljb25cIlxuICAgIDpjbGFzcz1cInsnbWF0ZXJpYWwtaWNvbnMnOiEhaWNvbn1cIlxuICAgIEBjbGljaz1cImRpc3BhdGNoRXZlbnRcIj5cbiAgICA8c2xvdD57e2ljb259fTwvc2xvdD5cbiAgPC9hPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7RGlzcGF0Y2hFdmVudE1peGlufSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtdG9vbGJhci1tZW51LWljb24nLFxuICBtaXhpbnM6IFtEaXNwYXRjaEV2ZW50TWl4aW5dLFxuICBwcm9wczoge1xuICAgIGljb246IHt0eXBlOiBTdHJpbmcsICdkZWZhdWx0JzogXCJtZW51XCJ9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxhIGNsYXNzPVwibWRjLXRvb2xiYXItdGl0bGUgbWRjLXRvb2xiYXJfX3RpdGxlXCIgQGNsaWNrPVwiZGlzcGF0Y2hFdmVudFwiPlxuICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgPC9hPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7RGlzcGF0Y2hFdmVudE1peGlufSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtdG9vbGJhci10aXRsZScsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbl1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8YSBjbGFzcz1cIm1kYy10b29sYmFyLWljb24gbWRjLXRvb2xiYXJfX2ljb25cIiBcbiAgICA6Y2xhc3M9XCJ7J21hdGVyaWFsLWljb25zJzohIWljb259XCJcbiAgICBAY2xpY2s9XCJkaXNwYXRjaEV2ZW50XCI+XG4gICAgPHNsb3Q+e3tpY29ufX08L3Nsb3Q+XG4gIDwvYT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQge0Rpc3BhdGNoRXZlbnRNaXhpbn0gZnJvbSAnLi4vYmFzZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLXRvb2xiYXItaWNvbicsXG4gIG1peGluczogW0Rpc3BhdGNoRXZlbnRNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgaWNvbjogU3RyaW5nXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY1Rvb2xiYXIgZnJvbSAnLi9tZGMtdG9vbGJhci52dWUnXG5pbXBvcnQgbWRjVG9vbGJhclJvdyBmcm9tICcuL21kYy10b29sYmFyLXJvdy52dWUnXG5pbXBvcnQgbWRjVG9vbGJhclNlY3Rpb24gZnJvbSAnLi9tZGMtdG9vbGJhci1zZWN0aW9uLnZ1ZSdcbmltcG9ydCBtZGNUb29sYmFyTWVudUljb24gZnJvbSAnLi9tZGMtdG9vbGJhci1tZW51LWljb24udnVlJ1xuaW1wb3J0IG1kY1Rvb2xiYXJUaXRsZSBmcm9tICcuL21kYy10b29sYmFyLXRpdGxlLnZ1ZSdcbmltcG9ydCBtZGNUb29sYmFySWNvbiBmcm9tICcuL21kYy10b29sYmFyLWljb24udnVlJ1xuXG5leHBvcnQge1xuICBtZGNUb29sYmFyLFxuICBtZGNUb29sYmFyUm93LFxuICBtZGNUb29sYmFyU2VjdGlvbixcbiAgbWRjVG9vbGJhck1lbnVJY29uLFxuICBtZGNUb29sYmFyVGl0bGUsXG4gIG1kY1Rvb2xiYXJJY29uXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNUb29sYmFyLFxuICBtZGNUb29sYmFyUm93LFxuICBtZGNUb29sYmFyU2VjdGlvbixcbiAgbWRjVG9vbGJhck1lbnVJY29uLFxuICBtZGNUb29sYmFyVGl0bGUsXG4gIG1kY1Rvb2xiYXJJY29uXG59KVxuXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiRGlzcGF0Y2hFdmVudE1peGluIiwicHJvcHMiLCJTdHJpbmciLCJPYmplY3QiLCJBcnJheSIsIm1ldGhvZHMiLCJkaXNwYXRjaEV2ZW50IiwiZXZ0IiwiJGVtaXQiLCJ0eXBlIiwiZXZlbnQiLCJ0YXJnZXQiLCJldmVudFRhcmdldCIsIiRyb290IiwiYXJncyIsImV2ZW50QXJncyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJjc3NDbGFzc2VzIiwiRklYRUQiLCJGSVhFRF9MQVNUUk9XIiwiRklYRURfQVRfTEFTVF9ST1ciLCJUT09MQkFSX1JPV19GTEVYSUJMRSIsIkZMRVhJQkxFX0RFRkFVTFRfQkVIQVZJT1IiLCJGTEVYSUJMRV9NQVgiLCJGTEVYSUJMRV9NSU4iLCJzdHJpbmdzIiwiVElUTEVfU0VMRUNUT1IiLCJJQ09OX1NFTEVDVE9SIiwiRklSU1RfUk9XX1NFTEVDVE9SIiwiQ0hBTkdFX0VWRU5UIiwibnVtYmVycyIsIk1BWF9USVRMRV9TSVpFIiwiTUlOX1RJVExFX1NJWkUiLCJUT09MQkFSX1JPV19IRUlHSFQiLCJUT09MQkFSX1JPV19NT0JJTEVfSEVJR0hUIiwiVE9PTEJBUl9NT0JJTEVfQlJFQUtQT0lOVCIsIk1EQ1Rvb2xiYXJGb3VuZGF0aW9uIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVnaXN0ZXJTY3JvbGxIYW5kbGVyIiwiZGVyZWdpc3RlclNjcm9sbEhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImdldFZpZXdwb3J0V2lkdGgiLCJnZXRWaWV3cG9ydFNjcm9sbFkiLCJnZXRPZmZzZXRIZWlnaHQiLCJnZXRGaXJzdFJvd0VsZW1lbnRPZmZzZXRIZWlnaHQiLCJub3RpZnlDaGFuZ2UiLCJzZXRTdHlsZSIsInNldFN0eWxlRm9yVGl0bGVFbGVtZW50Iiwic2V0U3R5bGVGb3JGbGV4aWJsZVJvd0VsZW1lbnQiLCJzZXRTdHlsZUZvckZpeGVkQWRqdXN0RWxlbWVudCIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiZGVmYXVsdEFkYXB0ZXIiLCJyZXNpemVIYW5kbGVyXyIsImNoZWNrUm93SGVpZ2h0XyIsInNjcm9sbEhhbmRsZXJfIiwidXBkYXRlVG9vbGJhclN0eWxlc18iLCJjaGVja1Jvd0hlaWdodEZyYW1lXyIsInNjcm9sbEZyYW1lXyIsImV4ZWN1dGVkTGFzdENoYW5nZV8iLCJjYWxjdWxhdGlvbnNfIiwidG9vbGJhclJvd0hlaWdodCIsInRvb2xiYXJSYXRpbyIsImZsZXhpYmxlRXhwYW5zaW9uUmF0aW8iLCJtYXhUcmFuc2xhdGVZUmF0aW8iLCJzY3JvbGxUaHJlc2hvbGRSYXRpbyIsInRvb2xiYXJIZWlnaHQiLCJmbGV4aWJsZUV4cGFuc2lvbkhlaWdodCIsIm1heFRyYW5zbGF0ZVlEaXN0YW5jZSIsInNjcm9sbFRocmVzaG9sZCIsImZpeGVkXyIsImZpeGVkTGFzdHJvd18iLCJoYXNGbGV4aWJsZVJvd18iLCJ1c2VGbGV4RGVmYXVsdEJlaGF2aW9yXyIsImluaXRLZXlSYXRpb18iLCJzZXRLZXlIZWlnaHRzXyIsInNjcm9sbFRvcCIsImRlbHRhIiwiTWF0aCIsIm1heCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibmV3VG9vbGJhclJvd0hlaWdodCIsImdldFJvd0hlaWdodF8iLCJ1cGRhdGVBZGp1c3RFbGVtZW50U3R5bGVzIiwiaGFzU2Nyb2xsZWRPdXRPZlRocmVzaG9sZCIsInNjcm9sbGVkT3V0T2ZUaHJlc2hvbGRfIiwiZ2V0RmxleGlibGVFeHBhbnNpb25SYXRpb18iLCJ1cGRhdGVUb29sYmFyRmxleGlibGVTdGF0ZV8iLCJ1cGRhdGVUb29sYmFyRml4ZWRTdGF0ZV8iLCJ1cGRhdGVGbGV4aWJsZVJvd0VsZW1lbnRTdHlsZXNfIiwiZmlyc3RSb3dNYXhSYXRpbyIsImJyZWFrcG9pbnQiLCJ0cmFuc2xhdGVEaXN0YW5jZSIsIm1pbiIsImhlaWdodCIsInVwZGF0ZUVsZW1lbnRTdHlsZXNEZWZhdWx0QmVoYXZpb3JfIiwibWF4VGl0bGVTaXplIiwibWluVGl0bGVTaXplIiwiY3VycmVudFRpdGxlU2l6ZSIsInN1cHBvcnRzUGFzc2l2ZV8iLCJhcHBseVBhc3NpdmUiLCJnbG9iYWxPYmoiLCJmb3JjZVJlZnJlc2giLCJ1bmRlZmluZWQiLCJpc1N1cHBvcnRlZCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJlIiwicmVuZGVyIiwiQm9vbGVhbiIsImRlZmF1bHQiLCJkYXRhIiwicm9vdENsYXNzZXMiLCJmaXhlZCIsIndhdGVyZmFsbCIsImZpeGVkTGFzdHJvdyIsImZsZXhpYmxlIiwiZmxleGlibGVEZWZhdWx0Iiwicm9vdFN0eWxlcyIsImFkanVzdFN0eWxlcyIsImZvdW5kYXRpb24iLCJtb3VudGVkIiwiY2xhc3NOYW1lIiwiJHNldCIsIiRkZWxldGUiLCIkcmVmcyIsInJvb3QiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImhhbmRsZXIiLCJ1dGlsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlubmVyV2lkdGgiLCJwYWdlWU9mZnNldCIsIm9mZnNldEhlaWdodCIsImVsIiwicXVlcnlTZWxlY3RvciIsImV2dERhdGEiLCJwcm9wZXJ0eSIsInZhbHVlIiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImluaXQiLCJiZWZvcmVEZXN0cm95IiwiZGVzdHJveSIsImNsYXNzZXMiLCJhbGlnblN0YXJ0IiwiYWxpZ25FbmQiLCJzaHJpbmtUb0ZpdCIsIm1peGlucyIsImljb24iLCJtZGNUb29sYmFyIiwibWRjVG9vbGJhclJvdyIsIm1kY1Rvb2xiYXJTZWN0aW9uIiwibWRjVG9vbGJhck1lbnVJY29uIiwibWRjVG9vbGJhclRpdGxlIiwibWRjVG9vbGJhckljb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjtFQUNoQztFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtFQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDeEM7RUFDQUgsV0FBT0csT0FBT0QsR0FBZDtFQUNEO0VBQ0QsTUFBSUYsSUFBSixFQUFVO0VBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtFQUNEO0VBQ0Y7O0VDWk0sU0FBU00sVUFBVCxDQUFxQkMsVUFBckIsRUFBaUM7RUFDdEMsU0FBTztFQUNMQyxhQUFTLFFBREo7RUFFTEMsYUFBUyxpQkFBQ0MsRUFBRCxFQUFRO0VBQ2YsV0FBSyxJQUFJQyxHQUFULElBQWdCSixVQUFoQixFQUE0QjtFQUMxQixZQUFJSyxZQUFZTCxXQUFXSSxHQUFYLENBQWhCO0VBQ0VELFdBQUdFLFNBQUgsQ0FBYUEsVUFBVUMsSUFBdkIsRUFBNEJELFNBQTVCO0VBQ0g7RUFDRixLQVBJO0VBUUxMO0VBUkssR0FBUDtFQVVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQ1hEOztFQ0FPLElBQU1PLHFCQUFxQjtFQUNoQ0MsU0FBTztFQUNMLGFBQVNDLE1BREo7RUFFTCxvQkFBZ0JDLE1BRlg7RUFHTCxrQkFBY0M7RUFIVCxHQUR5QjtFQU1oQ0MsV0FBUztFQUNQQyxpQkFETyx5QkFDUUMsR0FEUixFQUNhO0VBQ2xCLFdBQUtDLEtBQUwsQ0FBV0QsSUFBSUUsSUFBZjtFQUNBLFVBQUksS0FBS0MsS0FBVCxFQUFnQjtFQUNkLFlBQUlDLFNBQVMsS0FBS0MsV0FBTCxJQUFvQixLQUFLQyxLQUF0QztFQUNBLFlBQUlDLE9BQU8sS0FBS0MsU0FBTCxJQUFrQixFQUE3QjtFQUNBSixlQUFPSCxLQUFQLGdCQUFhLEtBQUtFLEtBQWxCLDJCQUE0QkksSUFBNUI7RUFDRDtFQUNGO0VBUk07RUFOdUIsQ0FBM0I7O0VDQVA7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUJBOzs7TUFHTUU7Ozs7RUFDSjs2QkFDd0I7RUFDdEI7RUFDQTtFQUNBLGFBQU8sRUFBUDtFQUNEOztFQUVEOzs7OzZCQUNxQjtFQUNuQjtFQUNBO0VBQ0EsYUFBTyxFQUFQO0VBQ0Q7O0VBRUQ7Ozs7NkJBQ3FCO0VBQ25CO0VBQ0E7RUFDQSxhQUFPLEVBQVA7RUFDRDs7RUFFRDs7Ozs2QkFDNEI7RUFDMUI7RUFDQTtFQUNBO0VBQ0EsYUFBTyxFQUFQO0VBQ0Q7O0VBRUQ7Ozs7OztFQUdBLDJCQUEwQjtFQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTtFQUFBOztFQUN4QjtFQUNBLFNBQUtDLFFBQUwsR0FBZ0JELE9BQWhCO0VBQ0Q7Ozs7NkJBRU07RUFDTDtFQUNEOzs7Z0NBRVM7RUFDUjtFQUNEOzs7OztFQ2hFSDs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxFQUFPLElBQU1FLGFBQWE7RUFDeEJDLFNBQU8sb0JBRGlCO0VBRXhCQyxpQkFBZSxpQ0FGUztFQUd4QkMscUJBQW1CLGdDQUhLO0VBSXhCQyx3QkFBc0IsdUJBSkU7RUFLeEJDLDZCQUEyQix3Q0FMSDtFQU14QkMsZ0JBQWMsdUNBTlU7RUFPeEJDLGdCQUFjO0VBUFUsQ0FBbkI7O0FBVVAsRUFBTyxJQUFNQyxVQUFVO0VBQ3JCQyxrQkFBZ0IscUJBREs7RUFFckJDLGlCQUFlLG9CQUZNO0VBR3JCQyxzQkFBb0IsK0JBSEM7RUFJckJDLGdCQUFjO0VBSk8sQ0FBaEI7O0FBT1AsRUFBTyxJQUFNQyxVQUFVO0VBQ3JCQyxrQkFBZ0IsS0FESztFQUVyQkMsa0JBQWdCLElBRks7RUFHckJDLHNCQUFvQixFQUhDO0VBSXJCQyw2QkFBMkIsRUFKTjtFQUtyQkMsNkJBQTJCO0VBTE4sQ0FBaEI7O0VDakNQOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTtNQUdxQkM7Ozs7NkJBQ0s7RUFDdEIsYUFBT25CLFVBQVA7RUFDRDs7OzZCQUVvQjtFQUNuQixhQUFPUSxPQUFQO0VBQ0Q7Ozs2QkFFb0I7RUFDbkIsYUFBT0ssT0FBUDtFQUNEOzs7NkJBRTJCO0VBQzFCLGFBQU87RUFDTE8sa0JBQVU7RUFBQSx1REFBMkM7RUFBM0M7RUFBQSxTQURMO0VBRUxDLGtCQUFVLDJDQUE2QixFQUZsQztFQUdMQyxxQkFBYSw4Q0FBNkIsRUFIckM7RUFJTEMsK0JBQXVCLDZEQUFrQyxFQUpwRDtFQUtMQyxpQ0FBeUIsK0RBQWtDLEVBTHREO0VBTUxDLCtCQUF1Qiw2REFBa0MsRUFOcEQ7RUFPTEMsaUNBQXlCLCtEQUFrQyxFQVB0RDtFQVFMQywwQkFBa0I7RUFBQSw4QkFBbUI7RUFBbkI7RUFBQSxTQVJiO0VBU0xDLDRCQUFvQjtFQUFBLDhCQUFtQjtFQUFuQjtFQUFBLFNBVGY7RUFVTEMseUJBQWlCO0VBQUEsOEJBQW1CO0VBQW5CO0VBQUEsU0FWWjtFQVdMQyx3Q0FBZ0M7RUFBQSw4QkFBbUI7RUFBbkI7RUFBQSxTQVgzQjtFQVlMQyxzQkFBYyx1RUFBcUQsRUFaOUQ7RUFhTEMsa0JBQVUseURBQTJDLEVBYmhEO0VBY0xDLGlDQUF5Qix3RUFBMkMsRUFkL0Q7RUFlTEMsdUNBQStCLDhFQUEyQyxFQWZyRTtFQWdCTEMsdUNBQStCLDhFQUEyQztFQWhCckUsT0FBUDtFQWtCRDs7O0VBRUQsZ0NBQVlyQyxPQUFaLEVBQXFCO0VBQUE7O0VBQUEsMklBQ2JzQyxTQUFjakIscUJBQXFCa0IsY0FBbkMsRUFBbUR2QyxPQUFuRCxDQURhOztFQUVuQixVQUFLd0MsY0FBTCxHQUFzQjtFQUFBLGFBQU0sTUFBS0MsZUFBTCxFQUFOO0VBQUEsS0FBdEI7RUFDQSxVQUFLQyxjQUFMLEdBQXNCO0VBQUEsYUFBTSxNQUFLQyxvQkFBTCxFQUFOO0VBQUEsS0FBdEI7RUFDQSxVQUFLQyxvQkFBTCxHQUE0QixDQUE1QjtFQUNBLFVBQUtDLFlBQUwsR0FBb0IsQ0FBcEI7RUFDQSxVQUFLQyxtQkFBTCxHQUEyQixLQUEzQjs7RUFFQSxVQUFLQyxhQUFMLEdBQXFCO0VBQ25CQyx3QkFBa0IsQ0FEQztFQUVuQjtFQUNBQyxvQkFBYyxDQUhLO0VBSW5CQyw4QkFBd0IsQ0FKTDtFQUtuQkMsMEJBQW9CLENBTEQ7RUFNbkJDLDRCQUFzQixDQU5IO0VBT25CO0VBQ0FDLHFCQUFlLENBUkk7RUFTbkJDLCtCQUF5QixDQVROO0VBVW5CQyw2QkFBdUIsQ0FWSjtFQVduQkMsdUJBQWlCO0VBWEUsS0FBckI7RUFhQTtFQUNBO0VBQ0EsVUFBS0MsTUFBTCxHQUFjLEtBQWQ7RUFDQTtFQUNBLFVBQUtDLGFBQUwsR0FBcUIsS0FBckI7RUFDQTtFQUNBO0VBQ0EsVUFBS0MsZUFBTCxHQUF1QixLQUF2QjtFQUNBO0VBQ0EsVUFBS0MsdUJBQUwsR0FBK0IsS0FBL0I7RUE5Qm1CO0VBK0JwQjs7Ozs2QkFFTTtFQUNMLFdBQUtILE1BQUwsR0FBYyxLQUFLeEQsUUFBTCxDQUFjcUIsUUFBZCxDQUF1QkQscUJBQXFCbkIsVUFBckIsQ0FBZ0NDLEtBQXZELENBQWQ7RUFDQSxXQUFLdUQsYUFBTCxHQUFxQixLQUFLekQsUUFBTCxDQUFjcUIsUUFBZCxDQUF1QkQscUJBQXFCbkIsVUFBckIsQ0FBZ0NFLGFBQXZELElBQXdFLEtBQUtxRCxNQUFsRztFQUNBLFdBQUtFLGVBQUwsR0FBdUIsS0FBSzFELFFBQUwsQ0FBY3FCLFFBQWQsQ0FBdUJELHFCQUFxQm5CLFVBQXJCLENBQWdDSSxvQkFBdkQsQ0FBdkI7RUFDQSxVQUFJLEtBQUtxRCxlQUFULEVBQTBCO0VBQ3hCLGFBQUtDLHVCQUFMLEdBQStCLEtBQUszRCxRQUFMLENBQWNxQixRQUFkLENBQXVCRCxxQkFBcUJuQixVQUFyQixDQUFnQ0sseUJBQXZELENBQS9CO0VBQ0Q7RUFDRCxXQUFLc0QsYUFBTDtFQUNBLFdBQUtDLGNBQUw7RUFDQSxXQUFLN0QsUUFBTCxDQUFjMEIscUJBQWQsQ0FBb0MsS0FBS2EsY0FBekM7RUFDQSxXQUFLdkMsUUFBTCxDQUFjd0IscUJBQWQsQ0FBb0MsS0FBS2lCLGNBQXpDO0VBQ0Q7OztnQ0FFUztFQUNSLFdBQUt6QyxRQUFMLENBQWMyQix1QkFBZCxDQUFzQyxLQUFLWSxjQUEzQztFQUNBLFdBQUt2QyxRQUFMLENBQWN5Qix1QkFBZCxDQUFzQyxLQUFLZ0IsY0FBM0M7RUFDRDs7O2tEQUUyQjtFQUMxQixVQUFJLEtBQUtlLE1BQVQsRUFBaUI7RUFDZixhQUFLeEQsUUFBTCxDQUFjb0MsNkJBQWQsQ0FBNEMsWUFBNUMsRUFBNkQsS0FBS1UsYUFBTCxDQUFtQk0sYUFBaEY7RUFDRDtFQUNGOzs7aURBRTBCVSxXQUFXO0VBQ3BDO0VBQ0EsVUFBTUMsUUFBUSxNQUFkO0VBQ0EsYUFBT0MsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWSxJQUFJSCxhQUFhLEtBQUtoQixhQUFMLENBQW1CTyx1QkFBbkIsR0FBNkNVLEtBQTFELENBQWhCLENBQVA7RUFDRDs7O3dDQUVpQjtFQUFBOztFQUNoQkcsMkJBQXFCLEtBQUt2QixvQkFBMUI7RUFDQSxXQUFLQSxvQkFBTCxHQUE0QndCLHNCQUFzQjtFQUFBLGVBQU0sT0FBS04sY0FBTCxFQUFOO0VBQUEsT0FBdEIsQ0FBNUI7RUFDRDs7O3VDQUVnQjtFQUNmLFVBQU1PLHNCQUFzQixLQUFLQyxhQUFMLEVBQTVCO0VBQ0EsVUFBSUQsd0JBQXdCLEtBQUt0QixhQUFMLENBQW1CQyxnQkFBL0MsRUFBaUU7RUFDL0QsYUFBS0QsYUFBTCxDQUFtQkMsZ0JBQW5CLEdBQXNDcUIsbUJBQXRDO0VBQ0EsYUFBS3RCLGFBQUwsQ0FBbUJNLGFBQW5CLEdBQW1DLEtBQUtOLGFBQUwsQ0FBbUJFLFlBQW5CLEdBQWtDLEtBQUtGLGFBQUwsQ0FBbUJDLGdCQUF4RjtFQUNBLGFBQUtELGFBQUwsQ0FBbUJPLHVCQUFuQixHQUNFLEtBQUtQLGFBQUwsQ0FBbUJHLHNCQUFuQixHQUE0QyxLQUFLSCxhQUFMLENBQW1CQyxnQkFEakU7RUFFQSxhQUFLRCxhQUFMLENBQW1CUSxxQkFBbkIsR0FDRSxLQUFLUixhQUFMLENBQW1CSSxrQkFBbkIsR0FBd0MsS0FBS0osYUFBTCxDQUFtQkMsZ0JBRDdEO0VBRUEsYUFBS0QsYUFBTCxDQUFtQlMsZUFBbkIsR0FDRSxLQUFLVCxhQUFMLENBQW1CSyxvQkFBbkIsR0FBMEMsS0FBS0wsYUFBTCxDQUFtQkMsZ0JBRC9EO0VBRUEsYUFBS3VCLHlCQUFMO0VBQ0EsYUFBSzVCLG9CQUFMO0VBQ0Q7RUFDRjs7OzZDQUVzQjtFQUFBOztFQUNyQndCLDJCQUFxQixLQUFLdEIsWUFBMUI7RUFDQSxXQUFLQSxZQUFMLEdBQW9CdUIsc0JBQXNCLFlBQU07RUFDOUMsWUFBTUwsWUFBWSxPQUFLOUQsUUFBTCxDQUFjNkIsa0JBQWQsRUFBbEI7RUFDQSxZQUFNMEMsNEJBQTRCLE9BQUtDLHVCQUFMLENBQTZCVixTQUE3QixDQUFsQzs7RUFFQSxZQUFJUyw2QkFBNkIsT0FBSzFCLG1CQUF0QyxFQUEyRDtFQUN6RDtFQUNEOztFQUVELFlBQU1JLHlCQUF5QixPQUFLd0IsMEJBQUwsQ0FBZ0NYLFNBQWhDLENBQS9COztFQUVBLGVBQUtZLDJCQUFMLENBQWlDekIsc0JBQWpDO0VBQ0EsWUFBSSxPQUFLUSxhQUFULEVBQXdCO0VBQ3RCLGlCQUFLa0Isd0JBQUwsQ0FBOEJiLFNBQTlCO0VBQ0Q7RUFDRCxZQUFJLE9BQUtKLGVBQVQsRUFBMEI7RUFDeEIsaUJBQUtrQiwrQkFBTCxDQUFxQzNCLHNCQUFyQztFQUNEO0VBQ0QsZUFBS0osbUJBQUwsR0FBMkIwQix5QkFBM0I7RUFDQSxlQUFLdkUsUUFBTCxDQUFjZ0MsWUFBZCxDQUEyQixFQUFDaUIsd0JBQXdCQSxzQkFBekIsRUFBM0I7RUFDRCxPQW5CbUIsQ0FBcEI7RUFvQkQ7Ozs4Q0FFdUJhLFdBQVc7RUFDakMsYUFBT0EsWUFBWSxLQUFLaEIsYUFBTCxDQUFtQlMsZUFBdEM7RUFDRDs7O3NDQUVlO0VBQ2QsVUFBTVIsbUJBQW1CLEtBQUtzQixhQUFMLEVBQXpCO0VBQ0EsVUFBTVEsbUJBQW1CLEtBQUs3RSxRQUFMLENBQWMrQiw4QkFBZCxLQUFpRGdCLGdCQUExRTtFQUNBLFdBQUtELGFBQUwsQ0FBbUJFLFlBQW5CLEdBQWtDLEtBQUtoRCxRQUFMLENBQWM4QixlQUFkLEtBQWtDaUIsZ0JBQXBFO0VBQ0EsV0FBS0QsYUFBTCxDQUFtQkcsc0JBQW5CLEdBQTRDNEIsbUJBQW1CLENBQS9EO0VBQ0EsV0FBSy9CLGFBQUwsQ0FBbUJJLGtCQUFuQixHQUNFLEtBQUtPLGFBQUwsR0FBcUIsS0FBS1gsYUFBTCxDQUFtQkUsWUFBbkIsR0FBa0M2QixnQkFBdkQsR0FBMEUsQ0FENUU7RUFFQSxXQUFLL0IsYUFBTCxDQUFtQkssb0JBQW5CLEdBQ0UsQ0FBQyxLQUFLTSxhQUFMLEdBQXFCLEtBQUtYLGFBQUwsQ0FBbUJFLFlBQXhDLEdBQXVENkIsZ0JBQXhELElBQTRFLENBRDlFO0VBRUQ7OztzQ0FFZTtFQUNkLFVBQU1DLGFBQWExRCxxQkFBcUJOLE9BQXJCLENBQTZCSyx5QkFBaEQ7RUFDQSxhQUFPLEtBQUtuQixRQUFMLENBQWM0QixnQkFBZCxLQUFtQ2tELFVBQW5DLEdBQ0wxRCxxQkFBcUJOLE9BQXJCLENBQTZCSSx5QkFEeEIsR0FDb0RFLHFCQUFxQk4sT0FBckIsQ0FBNkJHLGtCQUR4RjtFQUVEOzs7a0RBRTJCZ0Msd0JBQXdCO0VBQ2xELFdBQUtqRCxRQUFMLENBQWN1QixXQUFkLENBQTBCSCxxQkFBcUJuQixVQUFyQixDQUFnQ00sWUFBMUQ7RUFDQSxXQUFLUCxRQUFMLENBQWN1QixXQUFkLENBQTBCSCxxQkFBcUJuQixVQUFyQixDQUFnQ08sWUFBMUQ7RUFDQSxVQUFJeUMsMkJBQTJCLENBQS9CLEVBQWtDO0VBQ2hDLGFBQUtqRCxRQUFMLENBQWNzQixRQUFkLENBQXVCRixxQkFBcUJuQixVQUFyQixDQUFnQ00sWUFBdkQ7RUFDRCxPQUZELE1BRU8sSUFBSTBDLDJCQUEyQixDQUEvQixFQUFrQztFQUN2QyxhQUFLakQsUUFBTCxDQUFjc0IsUUFBZCxDQUF1QkYscUJBQXFCbkIsVUFBckIsQ0FBZ0NPLFlBQXZEO0VBQ0Q7RUFDRjs7OytDQUV3QnNELFdBQVc7RUFDbEMsVUFBTWlCLG9CQUFvQmYsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUQsS0FBS2dCLEdBQUwsQ0FDcENsQixZQUFZLEtBQUtoQixhQUFMLENBQW1CTyx1QkFESyxFQUVwQyxLQUFLUCxhQUFMLENBQW1CUSxxQkFGaUIsQ0FBWixDQUExQjtFQUdBLFdBQUt0RCxRQUFMLENBQWNpQyxRQUFkLENBQXVCLFdBQXZCLGtCQUFrRCxDQUFDOEMsaUJBQW5EOztFQUVBLFVBQUlBLHNCQUFzQixLQUFLakMsYUFBTCxDQUFtQlEscUJBQTdDLEVBQW9FO0VBQ2xFLGFBQUt0RCxRQUFMLENBQWNzQixRQUFkLENBQXVCRixxQkFBcUJuQixVQUFyQixDQUFnQ0csaUJBQXZEO0VBQ0QsT0FGRCxNQUVPO0VBQ0wsYUFBS0osUUFBTCxDQUFjdUIsV0FBZCxDQUEwQkgscUJBQXFCbkIsVUFBckIsQ0FBZ0NHLGlCQUExRDtFQUNEO0VBQ0Y7OztzREFFK0I2Qyx3QkFBd0I7RUFDdEQsVUFBSSxLQUFLTyxNQUFULEVBQWlCO0VBQ2YsWUFBTXlCLFNBQVMsS0FBS25DLGFBQUwsQ0FBbUJPLHVCQUFuQixHQUE2Q0osc0JBQTVEO0VBQ0EsYUFBS2pELFFBQUwsQ0FBY21DLDZCQUFkLENBQTRDLFFBQTVDLEVBQ0s4QyxTQUFTLEtBQUtuQyxhQUFMLENBQW1CQyxnQkFEakM7RUFFRDtFQUNELFVBQUksS0FBS1ksdUJBQVQsRUFBa0M7RUFDaEMsYUFBS3VCLG1DQUFMLENBQXlDakMsc0JBQXpDO0VBQ0Q7RUFDRjs7OzBEQUVtQ0Esd0JBQXdCO0VBQzFELFVBQU1rQyxlQUFlL0QscUJBQXFCTixPQUFyQixDQUE2QkMsY0FBbEQ7RUFDQSxVQUFNcUUsZUFBZWhFLHFCQUFxQk4sT0FBckIsQ0FBNkJFLGNBQWxEO0VBQ0EsVUFBTXFFLG1CQUFtQixDQUFDRixlQUFlQyxZQUFoQixJQUFnQ25DLHNCQUFoQyxHQUF5RG1DLFlBQWxGOztFQUVBLFdBQUtwRixRQUFMLENBQWNrQyx1QkFBZCxDQUFzQyxXQUF0QyxFQUFzRG1ELGdCQUF0RDtFQUNEOzs7SUEzTStDdkY7O0VDbEJsRDs7Ozs7Ozs7Ozs7Ozs7OztFQWdCQSxJQUFJd0YseUJBQUo7O0VBRUE7QUFDQSxFQUFPLFNBQVNDLFlBQVQsR0FBZ0U7RUFBQSxNQUExQ0MsU0FBMEMsdUVBQTlCdEgsTUFBOEI7RUFBQSxNQUF0QnVILFlBQXNCLHVFQUFQLEtBQU87O0VBQ3JFLE1BQUlILHFCQUFxQkksU0FBckIsSUFBa0NELFlBQXRDLEVBQW9EO0VBQ2xELFFBQUlFLGNBQWMsS0FBbEI7RUFDQSxRQUFJO0VBQ0ZILGdCQUFVSSxRQUFWLENBQW1CQyxnQkFBbkIsQ0FBb0MsTUFBcEMsRUFBNEMsSUFBNUMsRUFBa0QsRUFBQyxJQUFJQyxPQUFKLEdBQWM7RUFDL0RILHdCQUFjLElBQWQ7RUFDRCxTQUZpRCxFQUFsRDtFQUdELEtBSkQsQ0FJRSxPQUFPSSxDQUFQLEVBQVU7O0VBRVpULHVCQUFtQkssV0FBbkI7RUFDRDs7RUFFRCxTQUFPTCxtQkFBbUIsRUFBQ1EsU0FBUyxJQUFWLEVBQW5CLEdBQXFDLEtBQTVDO0VBQ0Q7O0FDZkQsbUJBQWUsRUFBQ0U7O0tBQUQscUJBQUE7RUFDYm5ILFFBQU0sYUFETztFQUViRSxTQUFPO0VBQ0wsYUFBU2tILE9BREo7RUFFTCxpQkFBYUEsT0FGUjtFQUdMLHFCQUFpQkEsT0FIWjtFQUlMLGdCQUFZQSxPQUpQO0VBS0wsd0JBQW9CLEVBQUUxRyxNQUFNMEcsT0FBUixFQUFpQkMsU0FBUyxJQUExQjtFQUxmLEdBRk07RUFTYkMsTUFUYSxrQkFTTDtFQUNOLFdBQU87RUFDTEMsbUJBQWE7RUFDWCx1QkFBZSxJQURKO0VBRVgsOEJBQXNCLEtBQUtDLEtBQUwsSUFBYyxLQUFLQyxTQUFuQixJQUNFLEtBQUtDLFlBSGxCO0VBSVgsa0NBQTBCLEtBQUtELFNBSnBCO0VBS1gsMkNBQW1DLEtBQUtDLFlBTDdCO0VBTVgsaUNBQXlCLEtBQUtDLFFBTm5CO0VBT1gsa0RBQTBDLEtBQUtBLFFBQUwsSUFDeEMsS0FBS0M7RUFSSSxPQURSO0VBV0xDLGtCQUFZLEVBWFA7RUFZTEMsb0JBQWM7RUFDWjtFQUNBO0VBQ0E7RUFDQTtFQUpZLE9BWlQ7RUFrQkxDLGtCQUFZO0VBbEJQLEtBQVA7RUFvQkQsR0E5Qlk7RUErQmJDLFNBL0JhLHFCQStCRjtFQUFBOztFQUNULFNBQUtELFVBQUwsR0FBa0IsSUFBSXhGLG9CQUFKLENBQXlCO0VBQ3pDRSxnQkFBVSxrQkFBQ3dGLFNBQUQsRUFBZTtFQUN2QixjQUFLQyxJQUFMLENBQVUsTUFBS1gsV0FBZixFQUE0QlUsU0FBNUIsRUFBdUMsSUFBdkM7RUFDRCxPQUh3QztFQUl6Q3ZGLG1CQUFhLHFCQUFDdUYsU0FBRCxFQUFlO0VBQzFCLGNBQUtFLE9BQUwsQ0FBYSxNQUFLWixXQUFsQixFQUErQlUsU0FBL0I7RUFDRCxPQU53QztFQU96Q3pGLGdCQUFVLGtCQUFDeUYsU0FBRCxFQUFlO0VBQ3ZCLGVBQU8sTUFBS0csS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxTQUFoQixDQUEwQkMsUUFBMUIsQ0FBbUNOLFNBQW5DLENBQVA7RUFDRCxPQVR3QztFQVV6Q3RGLDZCQUF1QiwrQkFBQzZGLE9BQUQsRUFBYTtFQUNsQ25KLGVBQU8ySCxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ3dCLE9BQWxDLEVBQTJDQyxZQUFBLEVBQTNDO0VBQ0QsT0Fad0M7RUFhekM3RiwrQkFBeUIsaUNBQUM0RixPQUFELEVBQWE7RUFDcENuSixlQUFPcUosbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUNGLE9BQXJDLEVBQThDQyxZQUFBLEVBQTlDO0VBQ0QsT0Fmd0M7RUFnQnpDNUYsNkJBQXVCLCtCQUFDMkYsT0FBRCxFQUFhO0VBQ2xDbkosZUFBTzJILGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDd0IsT0FBbEM7RUFDRCxPQWxCd0M7RUFtQnpDMUYsK0JBQXlCLGlDQUFDMEYsT0FBRCxFQUFhO0VBQ3BDbkosZUFBT3FKLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDRixPQUFyQztFQUNELE9BckJ3QztFQXNCekN6Rix3QkFBa0IsNEJBQU07RUFDdEIsZUFBTzFELE9BQU9zSixVQUFkO0VBQ0QsT0F4QndDO0VBeUJ6QzNGLDBCQUFvQiw4QkFBTTtFQUN4QixlQUFPM0QsT0FBT3VKLFdBQWQ7RUFDRCxPQTNCd0M7RUE0QnpDM0YsdUJBQWlCLDJCQUFNO0VBQ3JCLGVBQU8sTUFBS21GLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQlEsWUFBdkI7RUFDRCxPQTlCd0M7RUErQnpDM0Ysc0NBQWdDLDBDQUFNO0VBQ3BDLFlBQUk0RixLQUFLLE1BQUtWLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQlUsYUFBaEIsQ0FBOEJ4RyxxQkFBcUJYLE9BQXJCLENBQTZCRyxrQkFBM0QsQ0FBVDtFQUNBLGVBQVErRyxFQUFELEdBQU9BLEdBQUdELFlBQVYsR0FBeUJoQyxTQUFoQztFQUNELE9BbEN3QztFQW1DekMxRCxvQkFBYyxzQkFBQzZGLE9BQUQsRUFBYTtFQUN6QixjQUFLdkksS0FBTCxDQUFXLFFBQVgsRUFBcUJ1SSxPQUFyQjtFQUNELE9BckN3QztFQXNDekM1RixnQkFBVSxrQkFBQzZGLFFBQUQsRUFBV0MsS0FBWCxFQUFxQjtFQUM3QixjQUFLaEIsSUFBTCxDQUFVLE1BQUtMLFVBQWYsRUFBMkJvQixRQUEzQixFQUFxQ0MsS0FBckM7RUFDRCxPQXhDd0M7RUF5Q3pDN0YsK0JBQXlCLGlDQUFDNEYsUUFBRCxFQUFXQyxLQUFYLEVBQXFCO0VBQzVDLFlBQUlKLEtBQUssTUFBS1YsS0FBTCxDQUFXQyxJQUFYLENBQWdCVSxhQUFoQixDQUE4QnhHLHFCQUFxQlgsT0FBckIsQ0FBNkJDLGNBQTNELENBQVQ7RUFDQSxZQUFJaUgsRUFBSixFQUFRQSxHQUFHSyxLQUFILENBQVNDLFdBQVQsQ0FBcUJILFFBQXJCLEVBQStCQyxLQUEvQjtFQUNULE9BNUN3QztFQTZDekM1RixxQ0FBK0IsdUNBQUMyRixRQUFELEVBQVdDLEtBQVgsRUFBcUI7RUFDbEQsWUFBSUosS0FBSyxNQUFLVixLQUFMLENBQVdDLElBQVgsQ0FBZ0JVLGFBQWhCLENBQThCeEcscUJBQXFCWCxPQUFyQixDQUE2Qkcsa0JBQTNELENBQVQ7RUFDQSxZQUFJK0csRUFBSixFQUFRQSxHQUFHSyxLQUFILENBQVNDLFdBQVQsQ0FBcUJILFFBQXJCLEVBQStCQyxLQUEvQjtFQUNULE9BaER3QztFQWlEekMzRixxQ0FBK0IsdUNBQUMwRixRQUFELEVBQVdDLEtBQVgsRUFBcUI7RUFDbEQsY0FBS2hCLElBQUwsQ0FBVSxNQUFLSixZQUFmLEVBQTZCbUIsUUFBN0IsRUFBdUNDLEtBQXZDO0VBQ0Q7RUFuRHdDLEtBQXpCLENBQWxCO0VBcURBLFNBQUtuQixVQUFMLENBQWdCc0IsSUFBaEI7RUFDRCxHQXRGWTtFQXVGYkMsZUF2RmEsMkJBdUZJO0VBQ2YsU0FBS3ZCLFVBQUwsQ0FBZ0J3QixPQUFoQjtFQUNEO0VBekZZLENBQWY7O0FDVkEsc0JBQWUsRUFBQ3BDOztLQUFELHFCQUFBO0VBQ2JuSCxRQUFNO0VBRE8sQ0FBZjs7QUNBQSwwQkFBZSxFQUFDbUg7O0tBQUQscUJBQUE7RUFDYm5ILFFBQU0scUJBRE87RUFFYkUsU0FBTztFQUNMLG1CQUFla0gsT0FEVjtFQUVMLGlCQUFhQSxPQUZSO0VBR0wscUJBQWlCQTtFQUhaLEdBRk07RUFPYkUsTUFQYSxrQkFPTDtFQUNOLFdBQU87RUFDTGtDLGVBQVM7RUFDUCw2Q0FBcUMsS0FBS0MsVUFEbkM7RUFFUCwyQ0FBbUMsS0FBS0MsUUFGakM7RUFHUCwrQ0FBdUMsS0FBS0M7RUFIckM7RUFESixLQUFQO0VBT0Q7RUFmWSxDQUFmOztBQ0lBLDJCQUFlLEVBQUN4Qzs7S0FBRCxxQkFBQTtFQUNibkgsUUFBTSx1QkFETztFQUViNEosVUFBUSxDQUFDM0osa0JBQUQsQ0FGSztFQUdiQyxTQUFPO0VBQ0wySixVQUFNLEVBQUNuSixNQUFNUCxNQUFQLEVBQWUsV0FBVyxNQUExQjtFQUREO0VBSE0sQ0FBZjs7QUNGQSx3QkFBZSxFQUFDZ0g7O0tBQUQscUJBQUE7RUFDYm5ILFFBQU0sbUJBRE87RUFFYjRKLFVBQVEsQ0FBQzNKLGtCQUFEO0VBRkssQ0FBZjs7QUNFQSx1QkFBZSxFQUFDa0g7O0tBQUQscUJBQUE7RUFDYm5ILFFBQU0sa0JBRE87RUFFYjRKLFVBQVEsQ0FBQzNKLGtCQUFELENBRks7RUFHYkMsU0FBTztFQUNMMkosVUFBTTFKO0VBREQ7RUFITSxDQUFmOztBQ01BLGVBQWVWLFdBQVc7RUFDeEJxSyx3QkFEd0I7RUFFeEJDLDhCQUZ3QjtFQUd4QkMsc0NBSHdCO0VBSXhCQyx3Q0FKd0I7RUFLeEJDLGtDQUx3QjtFQU14QkM7RUFOd0IsQ0FBWCxDQUFmOztFQ1pBakwsU0FBU0MsTUFBVDs7Ozs7Ozs7In0=
