/**
* @module vue-mdc-adapterslider 0.13.2
* @exports VueMDCSlider
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCSlider = factory());
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
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses = {
    ACTIVE: 'mdc-slider--active',
    DISABLED: 'mdc-slider--disabled',
    DISCRETE: 'mdc-slider--discrete',
    FOCUS: 'mdc-slider--focus',
    IN_TRANSIT: 'mdc-slider--in-transit',
    IS_DISCRETE: 'mdc-slider--discrete',
    HAS_TRACK_MARKER: 'mdc-slider--display-markers'
  };

  /** @enum {string} */
  var strings = {
    TRACK_SELECTOR: '.mdc-slider__track',
    TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
    LAST_TRACK_MARKER_SELECTOR: '.mdc-slider__track-marker:last-child',
    THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
    PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
    ARIA_VALUEMIN: 'aria-valuemin',
    ARIA_VALUEMAX: 'aria-valuemax',
    ARIA_VALUENOW: 'aria-valuenow',
    ARIA_DISABLED: 'aria-disabled',
    STEP_DATA_ATTR: 'data-step',
    CHANGE_EVENT: 'MDCSlider:change',
    INPUT_EVENT: 'MDCSlider:input'
  };

  /** @enum {number} */
  var numbers = {
    PAGE_FACTOR: 4
  };

  /**
   * @license
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /* eslint-disable no-unused-vars */

  /**
   * Adapter for MDC Slider.
   *
   * Defines the shape of the adapter expected by the foundation. Implement this
   * adapter to integrate the Slider into your framework. See
   * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
   * for more information.
   *
   * @record
   */
  var MDCSliderAdapter = function () {
    function MDCSliderAdapter() {
      classCallCheck(this, MDCSliderAdapter);
    }

    createClass(MDCSliderAdapter, [{
      key: "hasClass",

      /**
       * Returns true if className exists for the slider Element
       * @param {string} className
       * @return {boolean}
       */
      value: function hasClass(className) {}

      /**
       * Adds a class to the slider Element
       * @param {string} className
       */

    }, {
      key: "addClass",
      value: function addClass(className) {}

      /**
       * Removes a class from the slider Element
       * @param {string} className
       */

    }, {
      key: "removeClass",
      value: function removeClass(className) {}

      /**
       * Returns a string if attribute name exists on the slider Element,
       * otherwise returns null
       * @param {string} name
       * @return {?string}
       */

    }, {
      key: "getAttribute",
      value: function getAttribute(name) {}

      /**
       * Sets attribute name on slider Element to value
       * @param {string} name
       * @param {string} value
       */

    }, {
      key: "setAttribute",
      value: function setAttribute(name, value) {}

      /**
       * Removes attribute name from slider Element
       * @param {string} name
       */

    }, {
      key: "removeAttribute",
      value: function removeAttribute(name) {}

      /**
       * Returns the bounding client rect for the slider Element
       * @return {?ClientRect}
       */

    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}

      /**
       * Returns the tab index of the slider Element
       * @return {number}
       */

    }, {
      key: "getTabIndex",
      value: function getTabIndex() {}

      /**
       * Registers an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the root element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}

      /**
       * Registers an event handler on the thumb container element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerThumbContainerInteractionHandler",
      value: function registerThumbContainerInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the thumb container element for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterThumbContainerInteractionHandler",
      value: function deregisterThumbContainerInteractionHandler(type, handler) {}

      /**
       * Registers an event handler on the body for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerBodyInteractionHandler",
      value: function registerBodyInteractionHandler(type, handler) {}

      /**
       * Deregisters an event handler on the body for a given event.
       * @param {string} type
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterBodyInteractionHandler",
      value: function deregisterBodyInteractionHandler(type, handler) {}

      /**
       * Registers an event handler for the window resize event
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}

      /**
       * Deregisters an event handler for the window resize event
       * @param {function(!Event): undefined} handler
       */

    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}

      /**
       * Emits a custom event MDCSlider:input from the root
       */

    }, {
      key: "notifyInput",
      value: function notifyInput() {}

      /**
       * Emits a custom event MDCSlider:change from the root
       */

    }, {
      key: "notifyChange",
      value: function notifyChange() {}

      /**
       * Sets a style property of the thumb container element to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setThumbContainerStyleProperty",
      value: function setThumbContainerStyleProperty(propertyName, value) {}

      /**
       * Sets a style property of the track element to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setTrackStyleProperty",
      value: function setTrackStyleProperty(propertyName, value) {}

      /**
       * Sets the inner text of the pin marker to the passed value
       * @param {number} value
       */

    }, {
      key: "setMarkerValue",
      value: function setMarkerValue(value) {}

      /**
       * Appends the passed number of track markers to the track mark container element
       * @param {number} numMarkers
       */

    }, {
      key: "appendTrackMarkers",
      value: function appendTrackMarkers(numMarkers) {}

      /**
       * Removes all track markers fromt he track mark container element
       */

    }, {
      key: "removeTrackMarkers",
      value: function removeTrackMarkers() {}

      /**
       * Sets a style property of the last track marker to the passed value
       * @param {string} propertyName
       * @param {string} value
       */

    }, {
      key: "setLastTrackMarkersStyleProperty",
      value: function setLastTrackMarkersStyleProperty(propertyName, value) {}

      /**
       * Returns true if the root element is RTL, otherwise false
       * @return {boolean}
       */

    }, {
      key: "isRTL",
      value: function isRTL() {}
    }]);
    return MDCSliderAdapter;
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

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectPropertyName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
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
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   *you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var KEY_IDS = {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown'
  };

  /** @enum {string} */
  var MOVE_EVENT_MAP = {
    'mousedown': 'mousemove',
    'touchstart': 'touchmove',
    'pointerdown': 'pointermove'
  };

  var DOWN_EVENTS = ['mousedown', 'pointerdown', 'touchstart'];
  var UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];

  /**
   * @extends {MDCFoundation<!MDCSliderAdapter>}
   */

  var MDCSliderFoundation = function (_MDCFoundation) {
    inherits(MDCSliderFoundation, _MDCFoundation);
    createClass(MDCSliderFoundation, null, [{
      key: 'cssClasses',

      /** @return enum {cssClasses} */
      get: function get$$1() {
        return cssClasses;
      }

      /** @return enum {strings} */

    }, {
      key: 'strings',
      get: function get$$1() {
        return strings;
      }

      /** @return enum {numbers} */

    }, {
      key: 'numbers',
      get: function get$$1() {
        return numbers;
      }

      /** @return {!MDCSliderAdapter} */

    }, {
      key: 'defaultAdapter',
      get: function get$$1() {
        return (/** @type {!MDCSliderAdapter} */{
            hasClass: function hasClass() {
              return (/* className: string */ /* boolean */false
              );
            },
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            getAttribute: function getAttribute() {
              return (/* name: string */ /* string|null */null
              );
            },
            setAttribute: function setAttribute() /* name: string, value: string */{},
            removeAttribute: function removeAttribute() /* name: string */{},
            computeBoundingRect: function computeBoundingRect() {
              return (/* ClientRect */{
                  top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0
                }
              );
            },
            getTabIndex: function getTabIndex() {
              return (/* number */0
              );
            },
            registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
            registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler() /* type: string, handler: EventListener */{},
            registerBodyInteractionHandler: function registerBodyInteractionHandler() /* type: string, handler: EventListener */{},
            deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler() /* type: string, handler: EventListener */{},
            registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
            deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
            notifyInput: function notifyInput() {},
            notifyChange: function notifyChange() {},
            setThumbContainerStyleProperty: function setThumbContainerStyleProperty() /* propertyName: string, value: string */{},
            setTrackStyleProperty: function setTrackStyleProperty() /* propertyName: string, value: string */{},
            setMarkerValue: function setMarkerValue() /* value: number */{},
            appendTrackMarkers: function appendTrackMarkers() /* numMarkers: number */{},
            removeTrackMarkers: function removeTrackMarkers() {},
            setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty() /* propertyName: string, value: string */{},
            isRTL: function isRTL() {
              return (/* boolean */false
              );
            }
          }
        );
      }

      /**
       * Creates a new instance of MDCSliderFoundation
       * @param {?MDCSliderAdapter} adapter
       */

    }]);

    function MDCSliderFoundation(adapter) {
      classCallCheck(this, MDCSliderFoundation);

      /** @private {?ClientRect} */
      var _this = possibleConstructorReturn(this, (MDCSliderFoundation.__proto__ || Object.getPrototypeOf(MDCSliderFoundation)).call(this, _extends(MDCSliderFoundation.defaultAdapter, adapter)));

      _this.rect_ = null;
      // We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
      // because those could be valid tabindices set by the client code.
      _this.savedTabIndex_ = NaN;
      _this.active_ = false;
      _this.inTransit_ = false;
      _this.isDiscrete_ = false;
      _this.hasTrackMarker_ = false;
      _this.handlingThumbTargetEvt_ = false;
      _this.min_ = 0;
      _this.max_ = 100;
      _this.step_ = 0;
      _this.value_ = 0;
      _this.disabled_ = false;
      _this.preventFocusState_ = false;
      _this.updateUIFrame_ = 0;
      _this.thumbContainerPointerHandler_ = function () {
        _this.handlingThumbTargetEvt_ = true;
      };
      _this.interactionStartHandler_ = function (evt) {
        return _this.handleDown_(evt);
      };
      _this.keydownHandler_ = function (evt) {
        return _this.handleKeydown_(evt);
      };
      _this.focusHandler_ = function () {
        return _this.handleFocus_();
      };
      _this.blurHandler_ = function () {
        return _this.handleBlur_();
      };
      _this.resizeHandler_ = function () {
        return _this.layout();
      };
      return _this;
    }

    createClass(MDCSliderFoundation, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this.isDiscrete_ = this.adapter_.hasClass(cssClasses.IS_DISCRETE);
        this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses.HAS_TRACK_MARKER);
        DOWN_EVENTS.forEach(function (evtName) {
          return _this2.adapter_.registerInteractionHandler(evtName, _this2.interactionStartHandler_);
        });
        this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
        DOWN_EVENTS.forEach(function (evtName) {
          _this2.adapter_.registerThumbContainerInteractionHandler(evtName, _this2.thumbContainerPointerHandler_);
        });
        this.adapter_.registerResizeHandler(this.resizeHandler_);
        this.layout();
        // At last step, provide a reasonable default value to discrete slider
        if (this.isDiscrete_ && this.getStep() == 0) {
          this.step_ = 1;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        DOWN_EVENTS.forEach(function (evtName) {
          _this3.adapter_.deregisterInteractionHandler(evtName, _this3.interactionStartHandler_);
        });
        this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        DOWN_EVENTS.forEach(function (evtName) {
          _this3.adapter_.deregisterThumbContainerInteractionHandler(evtName, _this3.thumbContainerPointerHandler_);
        });
        this.adapter_.deregisterResizeHandler(this.resizeHandler_);
      }
    }, {
      key: 'setupTrackMarker',
      value: function setupTrackMarker() {
        if (this.isDiscrete_ && this.hasTrackMarker_ && this.getStep() != 0) {
          var min = this.getMin();
          var max = this.getMax();
          var step = this.getStep();
          var numMarkers = (max - min) / step;

          // In case distance between max & min is indivisible to step,
          // we place the secondary to last marker proportionally at where thumb
          // could reach and place the last marker at max value
          var indivisible = Math.ceil(numMarkers) !== numMarkers;
          if (indivisible) {
            numMarkers = Math.ceil(numMarkers);
          }

          this.adapter_.removeTrackMarkers();
          this.adapter_.appendTrackMarkers(numMarkers);

          if (indivisible) {
            var lastStepRatio = (max - numMarkers * step) / step + 1;
            var flex = getCorrectPropertyName(window, 'flex');
            this.adapter_.setLastTrackMarkersStyleProperty(flex, String(lastStepRatio));
          }
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.rect_ = this.adapter_.computeBoundingRect();
        this.updateUIForCurrentValue_();
      }

      /** @return {number} */

    }, {
      key: 'getValue',
      value: function getValue() {
        return this.value_;
      }

      /** @param {number} value */

    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.setValue_(value, false);
      }

      /** @return {number} */

    }, {
      key: 'getMax',
      value: function getMax() {
        return this.max_;
      }

      /** @param {number} max */

    }, {
      key: 'setMax',
      value: function setMax(max) {
        if (max < this.min_) {
          throw new Error('Cannot set max to be less than the slider\'s minimum value');
        }
        this.max_ = max;
        this.setValue_(this.value_, false, true);
        this.adapter_.setAttribute(strings.ARIA_VALUEMAX, String(this.max_));
        this.setupTrackMarker();
      }

      /** @return {number} */

    }, {
      key: 'getMin',
      value: function getMin() {
        return this.min_;
      }

      /** @param {number} min */

    }, {
      key: 'setMin',
      value: function setMin(min) {
        if (min > this.max_) {
          throw new Error('Cannot set min to be greater than the slider\'s maximum value');
        }
        this.min_ = min;
        this.setValue_(this.value_, false, true);
        this.adapter_.setAttribute(strings.ARIA_VALUEMIN, String(this.min_));
        this.setupTrackMarker();
      }

      /** @return {number} */

    }, {
      key: 'getStep',
      value: function getStep() {
        return this.step_;
      }

      /** @param {number} step */

    }, {
      key: 'setStep',
      value: function setStep(step) {
        if (step < 0) {
          throw new Error('Step cannot be set to a negative number');
        }
        if (this.isDiscrete_ && (typeof step !== 'number' || step < 1)) {
          step = 1;
        }
        this.step_ = step;
        this.setValue_(this.value_, false, true);
        this.setupTrackMarker();
      }

      /** @return {boolean} */

    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.disabled_;
      }

      /** @param {boolean} disabled */

    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.disabled_ = disabled;
        this.toggleClass_(cssClasses.DISABLED, this.disabled_);
        if (this.disabled_) {
          this.savedTabIndex_ = this.adapter_.getTabIndex();
          this.adapter_.setAttribute(strings.ARIA_DISABLED, 'true');
          this.adapter_.removeAttribute('tabindex');
        } else {
          this.adapter_.removeAttribute(strings.ARIA_DISABLED);
          if (!isNaN(this.savedTabIndex_)) {
            this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
          }
        }
      }

      /**
       * Called when the user starts interacting with the slider
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleDown_',
      value: function handleDown_(evt) {
        var _this4 = this;

        if (this.disabled_) {
          return;
        }

        this.preventFocusState_ = true;
        this.setInTransit_(!this.handlingThumbTargetEvt_);
        this.handlingThumbTargetEvt_ = false;
        this.setActive_(true);

        var moveHandler = function moveHandler(evt) {
          _this4.handleMove_(evt);
        };

        // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
        // do not always fire these consistently in pairs.
        // (See https://github.com/material-components/material-components-web/issues/1192)
        var upHandler = function upHandler() {
          _this4.handleUp_();
          _this4.adapter_.deregisterBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
          UP_EVENTS.forEach(function (evtName) {
            return _this4.adapter_.deregisterBodyInteractionHandler(evtName, upHandler);
          });
        };

        this.adapter_.registerBodyInteractionHandler(MOVE_EVENT_MAP[evt.type], moveHandler);
        UP_EVENTS.forEach(function (evtName) {
          return _this4.adapter_.registerBodyInteractionHandler(evtName, upHandler);
        });
        this.setValueFromEvt_(evt);
      }

      /**
       * Called when the user moves the slider
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'handleMove_',
      value: function handleMove_(evt) {
        evt.preventDefault();
        this.setValueFromEvt_(evt);
      }

      /**
       * Called when the user's interaction with the slider ends
       * @private
       */

    }, {
      key: 'handleUp_',
      value: function handleUp_() {
        this.setActive_(false);
        this.adapter_.notifyChange();
      }

      /**
       * Returns the pageX of the event
       * @param {!Event} evt
       * @return {number}
       * @private
       */

    }, {
      key: 'getPageX_',
      value: function getPageX_(evt) {
        if (evt.targetTouches && evt.targetTouches.length > 0) {
          return evt.targetTouches[0].pageX;
        }
        return evt.pageX;
      }

      /**
       * Sets the slider value from an event
       * @param {!Event} evt
       * @private
       */

    }, {
      key: 'setValueFromEvt_',
      value: function setValueFromEvt_(evt) {
        var pageX = this.getPageX_(evt);
        var value = this.computeValueFromPageX_(pageX);
        this.setValue_(value, true);
      }

      /**
       * Computes the new value from the pageX position
       * @param {number} pageX
       * @return {number}
       */

    }, {
      key: 'computeValueFromPageX_',
      value: function computeValueFromPageX_(pageX) {
        var max = this.max_,
            min = this.min_;

        var xPos = pageX - this.rect_.left;
        var pctComplete = xPos / this.rect_.width;
        if (this.adapter_.isRTL()) {
          pctComplete = 1 - pctComplete;
        }
        // Fit the percentage complete between the range [min,max]
        // by remapping from [0, 1] to [min, min+(max-min)].
        return min + pctComplete * (max - min);
      }

      /**
       * Handles keydown events
       * @param {!Event} evt
       */

    }, {
      key: 'handleKeydown_',
      value: function handleKeydown_(evt) {
        var keyId = this.getKeyId_(evt);
        var value = this.getValueForKeyId_(keyId);
        if (isNaN(value)) {
          return;
        }

        // Prevent page from scrolling due to key presses that would normally scroll the page
        evt.preventDefault();
        this.adapter_.addClass(cssClasses.FOCUS);
        this.setValue_(value, true);
        this.adapter_.notifyChange();
      }

      /**
       * Returns the computed name of the event
       * @param {!Event} kbdEvt
       * @return {string}
       */

    }, {
      key: 'getKeyId_',
      value: function getKeyId_(kbdEvt) {
        if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
          return KEY_IDS.ARROW_LEFT;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
          return KEY_IDS.ARROW_RIGHT;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
          return KEY_IDS.ARROW_UP;
        }
        if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
          return KEY_IDS.ARROW_DOWN;
        }
        if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
          return KEY_IDS.HOME;
        }
        if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
          return KEY_IDS.END;
        }
        if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
          return KEY_IDS.PAGE_UP;
        }
        if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
          return KEY_IDS.PAGE_DOWN;
        }

        return '';
      }

      /**
       * Computes the value given a keyboard key ID
       * @param {string} keyId
       * @return {number}
       */

    }, {
      key: 'getValueForKeyId_',
      value: function getValueForKeyId_(keyId) {
        var max = this.max_,
            min = this.min_,
            step = this.step_;

        var delta = step || (max - min) / 100;
        var valueNeedsToBeFlipped = this.adapter_.isRTL() && (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);
        if (valueNeedsToBeFlipped) {
          delta = -delta;
        }

        switch (keyId) {
          case KEY_IDS.ARROW_LEFT:
          case KEY_IDS.ARROW_DOWN:
            return this.value_ - delta;
          case KEY_IDS.ARROW_RIGHT:
          case KEY_IDS.ARROW_UP:
            return this.value_ + delta;
          case KEY_IDS.HOME:
            return this.min_;
          case KEY_IDS.END:
            return this.max_;
          case KEY_IDS.PAGE_UP:
            return this.value_ + delta * numbers.PAGE_FACTOR;
          case KEY_IDS.PAGE_DOWN:
            return this.value_ - delta * numbers.PAGE_FACTOR;
          default:
            return NaN;
        }
      }
    }, {
      key: 'handleFocus_',
      value: function handleFocus_() {
        if (this.preventFocusState_) {
          return;
        }
        this.adapter_.addClass(cssClasses.FOCUS);
      }
    }, {
      key: 'handleBlur_',
      value: function handleBlur_() {
        this.preventFocusState_ = false;
        this.adapter_.removeClass(cssClasses.FOCUS);
      }

      /**
       * Sets the value of the slider
       * @param {number} value
       * @param {boolean} shouldFireInput
       * @param {boolean=} force
       */

    }, {
      key: 'setValue_',
      value: function setValue_(value, shouldFireInput) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (value === this.value_ && !force) {
          return;
        }

        var min = this.min_,
            max = this.max_;

        var valueSetToBoundary = value === min || value === max;
        if (this.step_ && !valueSetToBoundary) {
          value = this.quantize_(value);
        }
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        }
        this.value_ = value;
        this.adapter_.setAttribute(strings.ARIA_VALUENOW, String(this.value_));
        this.updateUIForCurrentValue_();

        if (shouldFireInput) {
          this.adapter_.notifyInput();
          if (this.isDiscrete_) {
            this.adapter_.setMarkerValue(value);
          }
        }
      }

      /**
       * Calculates the quantized value
       * @param {number} value
       * @return {number}
       */

    }, {
      key: 'quantize_',
      value: function quantize_(value) {
        var numSteps = Math.round(value / this.step_);
        var quantizedVal = numSteps * this.step_;
        return quantizedVal;
      }
    }, {
      key: 'updateUIForCurrentValue_',
      value: function updateUIForCurrentValue_() {
        var _this5 = this;

        var max = this.max_,
            min = this.min_,
            value = this.value_;

        var pctComplete = (value - min) / (max - min);
        var translatePx = pctComplete * this.rect_.width;
        if (this.adapter_.isRTL()) {
          translatePx = this.rect_.width - translatePx;
        }

        var transformProp = getCorrectPropertyName(window, 'transform');
        var transitionendEvtName = getCorrectEventName(window, 'transitionend');

        if (this.inTransit_) {
          var onTransitionEnd = function onTransitionEnd() {
            _this5.setInTransit_(false);
            _this5.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
          };
          this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd);
        }

        this.updateUIFrame_ = requestAnimationFrame(function () {
          // NOTE(traviskaufman): It would be nice to use calc() here,
          // but IE cannot handle calcs in transforms correctly.
          // See: https://goo.gl/NC2itk
          // Also note that the -50% offset is used to center the slider thumb.
          _this5.adapter_.setThumbContainerStyleProperty(transformProp, 'translateX(' + translatePx + 'px) translateX(-50%)');
          _this5.adapter_.setTrackStyleProperty(transformProp, 'scaleX(' + pctComplete + ')');
        });
      }

      /**
       * Toggles the active state of the slider
       * @param {boolean} active
       */

    }, {
      key: 'setActive_',
      value: function setActive_(active) {
        this.active_ = active;
        this.toggleClass_(cssClasses.ACTIVE, this.active_);
      }

      /**
       * Toggles the inTransit state of the slider
       * @param {boolean} inTransit
       */

    }, {
      key: 'setInTransit_',
      value: function setInTransit_(inTransit) {
        this.inTransit_ = inTransit;
        this.toggleClass_(cssClasses.IN_TRANSIT, this.inTransit_);
      }

      /**
       * Conditionally adds or removes a class based on shouldBePresent
       * @param {string} className
       * @param {boolean} shouldBePresent
       */

    }, {
      key: 'toggleClass_',
      value: function toggleClass_(className, shouldBePresent) {
        if (shouldBePresent) {
          this.adapter_.addClass(className);
        } else {
          this.adapter_.removeClass(className);
        }
      }
    }]);
    return MDCSliderFoundation;
  }(MDCFoundation);

  var mdcSlider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-slider", class: _vm.classes, attrs: { "tabindex": "0", "role": "slider" } }, [_c('div', { staticClass: "mdc-slider__track-container" }, [_c('div', { staticClass: "mdc-slider__track", style: _vm.trackStyles }), _vm._v(" "), _vm.hasMarkers ? _c('div', { staticClass: "mdc-slider__track-marker-container" }, _vm._l(_vm.numMarkers, function (markerNum) {
        return _c('div', { key: markerNum, staticClass: "mdc-slider__track-marker", style: markerNum == _vm.numMarkers ? _vm.lastTrackMarkersStyles : {} });
      })) : _vm._e()]), _vm._v(" "), _c('div', { ref: "thumbContainer", staticClass: "mdc-slider__thumb-container", style: _vm.thumbStyles }, [_vm.isDiscrete ? _c('div', { staticClass: "mdc-slider__pin" }, [_c('span', { staticClass: "mdc-slider__pin-value-marker" }, [_vm._v(_vm._s(_vm.markerValue))])]) : _vm._e(), _vm._v(" "), _c('svg', { staticClass: "mdc-slider__thumb", attrs: { "width": "21", "height": "21" } }, [_c('circle', { attrs: { "cx": "10.5", "cy": "10.5", "r": "7.875" } })]), _vm._v(" "), _c('div', { staticClass: "mdc-slider__focus-ring" })])]);
    }, staticRenderFns: [],
    name: 'mdc-slider',
    mixins: [DispatchFocusMixin],
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: [Number, String],
      min: { type: [Number, String], default: 0 },
      max: { type: [Number, String], default: 100 },
      step: { type: [Number, String], default: 0 },
      displayMarkers: Boolean,
      disabled: Boolean,
      layoutOn: String,
      layoutOnSource: { type: Object, required: false }
    },
    data: function data() {
      return {
        classes: {
          'mdc-slider--discrete': !!this.step,
          'mdc-slider--display-markers': this.displayMarkers
        },
        trackStyles: {},
        lastTrackMarkersStyles: {},
        thumbStyles: {},
        markerValue: '',
        numMarkers: 0
      };
    },

    computed: {
      isDiscrete: function isDiscrete() {
        return !!this.step;
      },
      hasMarkers: function hasMarkers() {
        return !!this.step && this.displayMarkers && this.numMarkers;
      }
    },
    watch: {
      value: function value() {
        if (this.foundation.getValue() !== Number(this.value)) {
          this.foundation.setValue(this.value);
        }
      },
      min: function min() {
        this.foundation.setMin(Number(this.min));
      },
      max: function max() {
        this.foundation.setMax(Number(this.max));
      },
      step: function step() {
        this.foundation.setStep(Number(this.step));
      },
      disabled: function disabled() {
        this.foundation.setDisabled(this.disabled);
      }
    },
    methods: {
      layout: function layout() {
        var _this = this;

        this.$nextTick(function () {
          _this.foundation && _this.foundation.layout();
        });
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      this.foundation = new MDCSliderFoundation({
        hasClass: function hasClass(className) {
          return _this2.$el.classList.contains(className);
        },
        addClass: function addClass(className) {
          _this2.$set(_this2.classes, className, true);
        },
        removeClass: function removeClass(className) {
          _this2.$delete(_this2.classes, className, true);
        },
        getAttribute: function getAttribute(name) {
          return _this2.$el.getAttribute(name);
        },
        setAttribute: function setAttribute(name, value) {
          return _this2.$el.setAttribute(name, value);
        },
        removeAttribute: function removeAttribute(name) {
          return _this2.$el.removeAttribute(name);
        },
        computeBoundingRect: function computeBoundingRect() {
          return _this2.$el.getBoundingClientRect();
        },
        getTabIndex: function getTabIndex() {
          return _this2.$el.tabIndex;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          _this2.$el.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          _this2.$el.removeEventListener(type, handler);
        },
        registerThumbContainerInteractionHandler: function registerThumbContainerInteractionHandler(type, handler) {
          _this2.$refs.thumbContainer.addEventListener(type, handler);
        },
        deregisterThumbContainerInteractionHandler: function deregisterThumbContainerInteractionHandler(type, handler) {
          _this2.$refs.thumbContainer.removeEventListener(type, handler);
        },
        registerBodyInteractionHandler: function registerBodyInteractionHandler(type, handler) {
          document.body.addEventListener(type, handler);
        },
        deregisterBodyInteractionHandler: function deregisterBodyInteractionHandler(type, handler) {
          document.body.removeEventListener(type, handler);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          window.removeEventListener('resize', handler);
        },
        notifyInput: function notifyInput() {
          _this2.$emit('input', _this2.foundation.getValue());
        },
        notifyChange: function notifyChange() {
          _this2.$emit('change', _this2.foundation.getValue());
        },
        setThumbContainerStyleProperty: function setThumbContainerStyleProperty(propertyName, value) {
          _this2.$set(_this2.thumbStyles, propertyName, value);
        },
        setTrackStyleProperty: function setTrackStyleProperty(propertyName, value) {
          _this2.$set(_this2.trackStyles, propertyName, value);
        },
        setMarkerValue: function setMarkerValue(value) {
          _this2.markerValue = value;
        },
        appendTrackMarkers: function appendTrackMarkers(numMarkers) {
          _this2.numMarkers = numMarkers;
        },
        removeTrackMarkers: function removeTrackMarkers() {
          _this2.numMarkers = 0;
        },
        setLastTrackMarkersStyleProperty: function setLastTrackMarkersStyleProperty(propertyName, value) {
          _this2.$set(_this2.lastTrackMarkersStyles, propertyName, value);
        },
        isRTL: function isRTL() {
          return false;
        }
      });

      this.foundation.init();
      this.foundation.setDisabled(this.disabled);
      if (Number(this.min) <= this.foundation.getMax()) {
        this.foundation.setMin(Number(this.min));
        this.foundation.setMax(Number(this.max));
      } else {
        this.foundation.setMax(Number(this.max));
        this.foundation.setMin(Number(this.min));
      }
      this.foundation.setStep(Number(this.step));
      this.foundation.setValue(Number(this.value));
      if (this.hasMarkers) {
        this.foundation.setupTrackMarker();
      }

      this.$root.$on('mdc:layout', this.layout);

      if (this.layoutOn) {
        var source = this.layoutOnSource || this.$root;
        source.$on(this.layoutOn, this.layout);
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation.destroy();
    }
  };

  var plugin = BasePlugin({
    mdcSlider: mdcSlider
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1mb2N1cy1taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2xpZGVyL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvc2xpZGVyL2FkYXB0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2FuaW1hdGlvbi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9zbGlkZXIvZm91bmRhdGlvbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL21kYy1zbGlkZXIudnVlIiwiLi4vLi4vY29tcG9uZW50cy9zbGlkZXIvaW5kZXguanMiLCIuLi8uLi9jb21wb25lbnRzL3NsaWRlci9lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYXV0b0luaXQgKHBsdWdpbikge1xuICAvLyBBdXRvLWluc3RhbGxcbiAgbGV0IF9WdWUgPSBudWxsXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIF9WdWUgPSB3aW5kb3cuVnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvKmdsb2JhbCBnbG9iYWwqL1xuICAgIF9WdWUgPSBnbG9iYWwuVnVlXG4gIH1cbiAgaWYgKF9WdWUpIHtcbiAgICBfVnVlLnVzZShwbHVnaW4pXG4gIH1cbn1cbiAgIiwiZXhwb3J0IGZ1bmN0aW9uIEJhc2VQbHVnaW4gKGNvbXBvbmVudHMpIHsgXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogJ19fVkVSU0lPTl9fJyxcbiAgICBpbnN0YWxsOiAodm0pID0+IHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2tleV1cbiAgICAgICAgICB2bS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsY29tcG9uZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29tcG9uZW50c1xuICB9IFxufVxuXG4iLCIvKiBnbG9iYWwgQ3VzdG9tRXZlbnQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRDdXN0b21FdmVudCAoZWwsIGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gIGxldCBldnRcbiAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICBidWJibGVzOiBzaG91bGRCdWJibGVcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKVxuICB9XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc3BhdGNoRm9jdXNNaXhpbiA9IHtcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuICB7aGFzRm9jdXM6IGZhbHNlfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgb25Nb3VzZURvd24oKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlXG4gICAgfSxcbiAgICBvbk1vdXNlVXAgKCkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2VcbiAgICB9LFxuICAgIG9uRm9jdXNFdmVudCAoKSB7XG4gICAgICAvLyBkaXNwYXRjaCBhc3luYyB0byBsZXQgdGltZSB0byBvdGhlciBmb2N1cyBldmVudCB0byBwcm9wYWdhdGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgb25CbHVyRXZlbnQgKCkge1xuICAgICAgLy8gZGlzcGF0Y2ggYXN5bmMgdG8gbGV0IHRpbWUgdG8gb3RoZXIgZm9jdXMgZXZlbnQgdG8gcHJvcGFnYXRlXG4gICAgICAvLyBhbHNvIGZpbHR1ciBibHVyIGlmIG1vdXNlZG93blxuICAgICAgdGhpcy5fYWN0aXZlIHx8IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNwYXRjaEZvY3VzRXZlbnQoKSwwKVxuICAgIH0sXG4gICAgZGlzcGF0Y2hGb2N1c0V2ZW50KCkge1xuICAgICAgbGV0IGhhc0ZvY3VzID0gdGhpcy4kZWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy4kZWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgICBpZiAoaGFzRm9jdXMgIT0gdGhpcy5oYXNGb2N1cykge1xuICAgICAgICB0aGlzLiRlbWl0KGhhc0ZvY3VzID8gJ2ZvY3VzJyA6ICdibHVyJylcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGhhc0ZvY3VzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9LFxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzRXZlbnQpXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLm9uQmx1ckV2ZW50KVxuICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pXG4gICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKVxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgQUNUSVZFOiAnbWRjLXNsaWRlci0tYWN0aXZlJyxcbiAgRElTQUJMRUQ6ICdtZGMtc2xpZGVyLS1kaXNhYmxlZCcsXG4gIERJU0NSRVRFOiAnbWRjLXNsaWRlci0tZGlzY3JldGUnLFxuICBGT0NVUzogJ21kYy1zbGlkZXItLWZvY3VzJyxcbiAgSU5fVFJBTlNJVDogJ21kYy1zbGlkZXItLWluLXRyYW5zaXQnLFxuICBJU19ESVNDUkVURTogJ21kYy1zbGlkZXItLWRpc2NyZXRlJyxcbiAgSEFTX1RSQUNLX01BUktFUjogJ21kYy1zbGlkZXItLWRpc3BsYXktbWFya2VycycsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFRSQUNLX1NFTEVDVE9SOiAnLm1kYy1zbGlkZXJfX3RyYWNrJyxcbiAgVFJBQ0tfTUFSS0VSX0NPTlRBSU5FUl9TRUxFQ1RPUjogJy5tZGMtc2xpZGVyX190cmFjay1tYXJrZXItY29udGFpbmVyJyxcbiAgTEFTVF9UUkFDS19NQVJLRVJfU0VMRUNUT1I6ICcubWRjLXNsaWRlcl9fdHJhY2stbWFya2VyOmxhc3QtY2hpbGQnLFxuICBUSFVNQl9DT05UQUlORVJfU0VMRUNUT1I6ICcubWRjLXNsaWRlcl9fdGh1bWItY29udGFpbmVyJyxcbiAgUElOX1ZBTFVFX01BUktFUl9TRUxFQ1RPUjogJy5tZGMtc2xpZGVyX19waW4tdmFsdWUtbWFya2VyJyxcbiAgQVJJQV9WQUxVRU1JTjogJ2FyaWEtdmFsdWVtaW4nLFxuICBBUklBX1ZBTFVFTUFYOiAnYXJpYS12YWx1ZW1heCcsXG4gIEFSSUFfVkFMVUVOT1c6ICdhcmlhLXZhbHVlbm93JyxcbiAgQVJJQV9ESVNBQkxFRDogJ2FyaWEtZGlzYWJsZWQnLFxuICBTVEVQX0RBVEFfQVRUUjogJ2RhdGEtc3RlcCcsXG4gIENIQU5HRV9FVkVOVDogJ01EQ1NsaWRlcjpjaGFuZ2UnLFxuICBJTlBVVF9FVkVOVDogJ01EQ1NsaWRlcjppbnB1dCcsXG59O1xuXG4vKiogQGVudW0ge251bWJlcn0gKi9cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBR0VfRkFDVE9SOiA0LFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgU2xpZGVyLlxuICpcbiAqIERlZmluZXMgdGhlIHNoYXBlIG9mIHRoZSBhZGFwdGVyIGV4cGVjdGVkIGJ5IHRoZSBmb3VuZGF0aW9uLiBJbXBsZW1lbnQgdGhpc1xuICogYWRhcHRlciB0byBpbnRlZ3JhdGUgdGhlIFNsaWRlciBpbnRvIHlvdXIgZnJhbWV3b3JrLiBTZWVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvYXV0aG9yaW5nLWNvbXBvbmVudHMubWRcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDU2xpZGVyQWRhcHRlciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgY2xhc3NOYW1lIGV4aXN0cyBmb3IgdGhlIHNsaWRlciBFbGVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIHRvIHRoZSBzbGlkZXIgRWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjbGFzcyBmcm9tIHRoZSBzbGlkZXIgRWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgaWYgYXR0cmlidXRlIG5hbWUgZXhpc3RzIG9uIHRoZSBzbGlkZXIgRWxlbWVudCxcbiAgICogb3RoZXJ3aXNlIHJldHVybnMgbnVsbFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcmV0dXJuIHs/c3RyaW5nfVxuICAgKi9cbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYXR0cmlidXRlIG5hbWUgb24gc2xpZGVyIEVsZW1lbnQgdG8gdmFsdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYXR0cmlidXRlIG5hbWUgZnJvbSBzbGlkZXIgRWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKi9cbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJvdW5kaW5nIGNsaWVudCByZWN0IGZvciB0aGUgc2xpZGVyIEVsZW1lbnRcbiAgICogQHJldHVybiB7P0NsaWVudFJlY3R9XG4gICAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGFiIGluZGV4IG9mIHRoZSBzbGlkZXIgRWxlbWVudFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBnZXRUYWJJbmRleCgpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSByb290IGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSB0aHVtYiBjb250YWluZXIgZWxlbWVudCBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgdGh1bWIgY29udGFpbmVyIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIGJvZHkgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgYm9keSBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOiB1bmRlZmluZWR9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgd2luZG93IHJlc2l6ZSBldmVudFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCFFdmVudCk6IHVuZGVmaW5lZH0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGFuIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSB3aW5kb3cgcmVzaXplIGV2ZW50XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTogdW5kZWZpbmVkfSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBldmVudCBNRENTbGlkZXI6aW5wdXQgZnJvbSB0aGUgcm9vdFxuICAgKi9cbiAgbm90aWZ5SW5wdXQoKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhIGN1c3RvbSBldmVudCBNRENTbGlkZXI6Y2hhbmdlIGZyb20gdGhlIHJvb3RcbiAgICovXG4gIG5vdGlmeUNoYW5nZSgpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdHlsZSBwcm9wZXJ0eSBvZiB0aGUgdGh1bWIgY29udGFpbmVyIGVsZW1lbnQgdG8gdGhlIHBhc3NlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0VGh1bWJDb250YWluZXJTdHlsZVByb3BlcnR5KHByb3BlcnR5TmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdHlsZSBwcm9wZXJ0eSBvZiB0aGUgdHJhY2sgZWxlbWVudCB0byB0aGUgcGFzc2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRUcmFja1N0eWxlUHJvcGVydHkocHJvcGVydHlOYW1lLCB2YWx1ZSkge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW5uZXIgdGV4dCBvZiB0aGUgcGluIG1hcmtlciB0byB0aGUgcGFzc2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgKi9cbiAgc2V0TWFya2VyVmFsdWUodmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgdGhlIHBhc3NlZCBudW1iZXIgb2YgdHJhY2sgbWFya2VycyB0byB0aGUgdHJhY2sgbWFyayBjb250YWluZXIgZWxlbWVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtTWFya2Vyc1xuICAgKi9cbiAgYXBwZW5kVHJhY2tNYXJrZXJzKG51bU1hcmtlcnMpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRyYWNrIG1hcmtlcnMgZnJvbXQgaGUgdHJhY2sgbWFyayBjb250YWluZXIgZWxlbWVudFxuICAgKi9cbiAgcmVtb3ZlVHJhY2tNYXJrZXJzKCkge31cblxuICAvKipcbiAgICogU2V0cyBhIHN0eWxlIHByb3BlcnR5IG9mIHRoZSBsYXN0IHRyYWNrIG1hcmtlciB0byB0aGUgcGFzc2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAqL1xuICBzZXRMYXN0VHJhY2tNYXJrZXJzU3R5bGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJvb3QgZWxlbWVudCBpcyBSVEwsIG90aGVyd2lzZSBmYWxzZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNSVEwoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTbGlkZXJBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgbm9QcmVmaXg6IHN0cmluZyxcbiAqICAgd2Via2l0UHJlZml4OiBzdHJpbmcsXG4gKiAgIHN0eWxlUHJvcGVydHk6IHN0cmluZ1xuICogfX1cbiAqL1xubGV0IFZlbmRvclByb3BlcnR5TWFwVHlwZTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBldmVudFR5cGVNYXAgPSB7XG4gICdhbmltYXRpb25zdGFydCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbnN0YXJ0JyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRBbmltYXRpb25TdGFydCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25lbmQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICdhbmltYXRpb25pdGVyYXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICdhbmltYXRpb25pdGVyYXRpb24nLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvbkl0ZXJhdGlvbicsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ2FuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2l0aW9uZW5kJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgc3R5bGVQcm9wZXJ0eTogJ3RyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqIEBjb25zdCB7T2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovXG5jb25zdCBjc3NQcm9wZXJ0eU1hcCA9IHtcbiAgJ2FuaW1hdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC1hbmltYXRpb24nLFxuICB9LFxuICAndHJhbnNmb3JtJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNmb3JtJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zZm9ybScsXG4gIH0sXG4gICd0cmFuc2l0aW9uJzoge1xuICAgIG5vUHJlZml4OiAndHJhbnNpdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnLXdlYmtpdC10cmFuc2l0aW9uJyxcbiAgfSxcbn07XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikge1xuICByZXR1cm4gKHdpbmRvd09ialsnZG9jdW1lbnQnXSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZXZlbnRGb3VuZEluTWFwcyhldmVudFR5cGUpIHtcbiAgcmV0dXJuIChldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwIHx8IGV2ZW50VHlwZSBpbiBjc3NQcm9wZXJ0eU1hcCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59IG1hcFxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0SmF2YVNjcmlwdEV2ZW50TmFtZShldmVudFR5cGUsIG1hcCwgZWwpIHtcbiAgcmV0dXJuIG1hcFtldmVudFR5cGVdLnN0eWxlUHJvcGVydHkgaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGJyb3dzZXIgcHJlZml4IGZvciBDU1MzIGFuaW1hdGlvbiBldmVudHNcbiAqIGFuZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBwYXJhbSB7IU9iamVjdH0gd2luZG93T2JqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEFuaW1hdGlvbk5hbWUod2luZG93T2JqLCBldmVudFR5cGUpIHtcbiAgaWYgKCFoYXNQcm9wZXJTaGFwZSh3aW5kb3dPYmopIHx8ICFldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkpIHtcbiAgICByZXR1cm4gZXZlbnRUeXBlO1xuICB9XG5cbiAgY29uc3QgbWFwID0gLyoqIEB0eXBlIHshT2JqZWN0PHN0cmluZywgIVZlbmRvclByb3BlcnR5TWFwVHlwZT59ICovIChcbiAgICBldmVudFR5cGUgaW4gZXZlbnRUeXBlTWFwID8gZXZlbnRUeXBlTWFwIDogY3NzUHJvcGVydHlNYXBcbiAgKTtcbiAgY29uc3QgZWwgPSB3aW5kb3dPYmpbJ2RvY3VtZW50J11bJ2NyZWF0ZUVsZW1lbnQnXSgnZGl2Jyk7XG4gIGxldCBldmVudE5hbWUgPSAnJztcblxuICBpZiAobWFwID09PSBldmVudFR5cGVNYXApIHtcbiAgICBldmVudE5hbWUgPSBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCk7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnROYW1lID0gbWFwW2V2ZW50VHlwZV0ubm9QcmVmaXggaW4gZWwuc3R5bGUgPyBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCA6IG1hcFtldmVudFR5cGVdLndlYmtpdFByZWZpeDtcbiAgfVxuXG4gIHJldHVybiBldmVudE5hbWU7XG59XG5cbi8vIFB1YmxpYyBmdW5jdGlvbnMgdG8gYWNjZXNzIGdldEFuaW1hdGlvbk5hbWUoKSBmb3IgSmF2YVNjcmlwdCBldmVudHMgb3IgQ1NTXG4vLyBwcm9wZXJ0eSBuYW1lcy5cblxuY29uc3QgdHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzID0gWyd0cmFuc2Zvcm0nLCAnV2Via2l0VHJhbnNmb3JtJywgJ01velRyYW5zZm9ybScsICdPVHJhbnNmb3JtJywgJ01TVHJhbnNmb3JtJ107XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICByZXR1cm4gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSk7XG59XG5cbmV4cG9ydCB7dHJhbnNmb3JtU3R5bGVQcm9wZXJ0aWVzLCBnZXRDb3JyZWN0RXZlbnROYW1lLCBnZXRDb3JyZWN0UHJvcGVydHlOYW1lfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgTURDU2xpZGVyQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuXG5pbXBvcnQge2dldENvcnJlY3RFdmVudE5hbWUsIGdldENvcnJlY3RQcm9wZXJ0eU5hbWV9IGZyb20gJ0BtYXRlcmlhbC9hbmltYXRpb24vaW5kZXgnO1xuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgS0VZX0lEUyA9IHtcbiAgQVJST1dfTEVGVDogJ0Fycm93TGVmdCcsXG4gIEFSUk9XX1JJR0hUOiAnQXJyb3dSaWdodCcsXG4gIEFSUk9XX1VQOiAnQXJyb3dVcCcsXG4gIEFSUk9XX0RPV046ICdBcnJvd0Rvd24nLFxuICBIT01FOiAnSG9tZScsXG4gIEVORDogJ0VuZCcsXG4gIFBBR0VfVVA6ICdQYWdlVXAnLFxuICBQQUdFX0RPV046ICdQYWdlRG93bicsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IE1PVkVfRVZFTlRfTUFQID0ge1xuICAnbW91c2Vkb3duJzogJ21vdXNlbW92ZScsXG4gICd0b3VjaHN0YXJ0JzogJ3RvdWNobW92ZScsXG4gICdwb2ludGVyZG93bic6ICdwb2ludGVybW92ZScsXG59O1xuXG5jb25zdCBET1dOX0VWRU5UUyA9IFsnbW91c2Vkb3duJywgJ3BvaW50ZXJkb3duJywgJ3RvdWNoc3RhcnQnXTtcbmNvbnN0IFVQX0VWRU5UUyA9IFsnbW91c2V1cCcsICdwb2ludGVydXAnLCAndG91Y2hlbmQnXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDU2xpZGVyQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1NsaWRlckZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFNRENTbGlkZXJBZGFwdGVyfSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENTbGlkZXJBZGFwdGVyfSAqLyAoe1xuICAgICAgaGFzQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBnZXRBdHRyaWJ1dGU6ICgvKiBuYW1lOiBzdHJpbmcgKi8pID0+IC8qIHN0cmluZ3xudWxsICovIG51bGwsXG4gICAgICBzZXRBdHRyaWJ1dGU6ICgvKiBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQXR0cmlidXRlOiAoLyogbmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8gKHtcbiAgICAgICAgdG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwLFxuICAgICAgfSksXG4gICAgICBnZXRUYWJJbmRleDogKCkgPT4gLyogbnVtYmVyICovIDAsXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyVGh1bWJDb250YWluZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcjogKC8qIHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBub3RpZnlJbnB1dDogKCkgPT4ge30sXG4gICAgICBub3RpZnlDaGFuZ2U6ICgpID0+IHt9LFxuICAgICAgc2V0VGh1bWJDb250YWluZXJTdHlsZVByb3BlcnR5OiAoLyogcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0VHJhY2tTdHlsZVByb3BlcnR5OiAoLyogcHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0TWFya2VyVmFsdWU6ICgvKiB2YWx1ZTogbnVtYmVyICovKSA9PiB7fSxcbiAgICAgIGFwcGVuZFRyYWNrTWFya2VyczogKC8qIG51bU1hcmtlcnM6IG51bWJlciAqLykgPT4ge30sXG4gICAgICByZW1vdmVUcmFja01hcmtlcnM6ICgpID0+IHt9LFxuICAgICAgc2V0TGFzdFRyYWNrTWFya2Vyc1N0eWxlUHJvcGVydHk6ICgvKiBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBpc1JUTDogKCkgPT4gLyogYm9vbGVhbiAqLyBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIE1EQ1NsaWRlckZvdW5kYXRpb25cbiAgICogQHBhcmFtIHs/TURDU2xpZGVyQWRhcHRlcn0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU2xpZGVyRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICAgIC8qKiBAcHJpdmF0ZSB7P0NsaWVudFJlY3R9ICovXG4gICAgdGhpcy5yZWN0XyA9IG51bGw7XG4gICAgLy8gV2Ugc2V0IHRoaXMgdG8gTmFOIHNpbmNlIHdlIHdhbnQgaXQgdG8gYmUgYSBudW1iZXIsIGJ1dCB3ZSBjYW4ndCB1c2UgJzAnIG9yICctMSdcbiAgICAvLyBiZWNhdXNlIHRob3NlIGNvdWxkIGJlIHZhbGlkIHRhYmluZGljZXMgc2V0IGJ5IHRoZSBjbGllbnQgY29kZS5cbiAgICB0aGlzLnNhdmVkVGFiSW5kZXhfID0gTmFOO1xuICAgIHRoaXMuYWN0aXZlXyA9IGZhbHNlO1xuICAgIHRoaXMuaW5UcmFuc2l0XyA9IGZhbHNlO1xuICAgIHRoaXMuaXNEaXNjcmV0ZV8gPSBmYWxzZTtcbiAgICB0aGlzLmhhc1RyYWNrTWFya2VyXyA9IGZhbHNlO1xuICAgIHRoaXMuaGFuZGxpbmdUaHVtYlRhcmdldEV2dF8gPSBmYWxzZTtcbiAgICB0aGlzLm1pbl8gPSAwO1xuICAgIHRoaXMubWF4XyA9IDEwMDtcbiAgICB0aGlzLnN0ZXBfID0gMDtcbiAgICB0aGlzLnZhbHVlXyA9IDA7XG4gICAgdGhpcy5kaXNhYmxlZF8gPSBmYWxzZTtcbiAgICB0aGlzLnByZXZlbnRGb2N1c1N0YXRlXyA9IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlVUlGcmFtZV8gPSAwO1xuICAgIHRoaXMudGh1bWJDb250YWluZXJQb2ludGVySGFuZGxlcl8gPSAoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsaW5nVGh1bWJUYXJnZXRFdnRfID0gdHJ1ZTtcbiAgICB9O1xuICAgIHRoaXMuaW50ZXJhY3Rpb25TdGFydEhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVEb3duXyhldnQpO1xuICAgIHRoaXMua2V5ZG93bkhhbmRsZXJfID0gKGV2dCkgPT4gdGhpcy5oYW5kbGVLZXlkb3duXyhldnQpO1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXNfKCk7XG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXJfKCk7XG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuaXNEaXNjcmV0ZV8gPSB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuSVNfRElTQ1JFVEUpO1xuICAgIHRoaXMuaGFzVHJhY2tNYXJrZXJfID0gdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkhBU19UUkFDS19NQVJLRVIpO1xuICAgIERPV05fRVZFTlRTLmZvckVhY2goKGV2dE5hbWUpID0+IHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0TmFtZSwgdGhpcy5pbnRlcmFjdGlvblN0YXJ0SGFuZGxlcl8pKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICAgIERPV05fRVZFTlRTLmZvckVhY2goKGV2dE5hbWUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcihldnROYW1lLCB0aGlzLnRodW1iQ29udGFpbmVyUG9pbnRlckhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmxheW91dCgpO1xuICAgIC8vIEF0IGxhc3Qgc3RlcCwgcHJvdmlkZSBhIHJlYXNvbmFibGUgZGVmYXVsdCB2YWx1ZSB0byBkaXNjcmV0ZSBzbGlkZXJcbiAgICBpZiAodGhpcy5pc0Rpc2NyZXRlXyAmJiB0aGlzLmdldFN0ZXAoKSA9PSAwKSB7XG4gICAgICB0aGlzLnN0ZXBfID0gMTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIERPV05fRVZFTlRTLmZvckVhY2goKGV2dE5hbWUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnROYW1lLCB0aGlzLmludGVyYWN0aW9uU3RhcnRIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICBET1dOX0VWRU5UUy5mb3JFYWNoKChldnROYW1lKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcihldnROYW1lLCB0aGlzLnRodW1iQ29udGFpbmVyUG9pbnRlckhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgc2V0dXBUcmFja01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5pc0Rpc2NyZXRlXyAmJiB0aGlzLmhhc1RyYWNrTWFya2VyXyYmIHRoaXMuZ2V0U3RlcCgpICE9IDApIHtcbiAgICAgIGNvbnN0IG1pbiA9IHRoaXMuZ2V0TWluKCk7XG4gICAgICBjb25zdCBtYXggPSB0aGlzLmdldE1heCgpO1xuICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuZ2V0U3RlcCgpO1xuICAgICAgbGV0IG51bU1hcmtlcnMgPSAobWF4IC0gbWluKSAvIHN0ZXA7XG5cbiAgICAgIC8vIEluIGNhc2UgZGlzdGFuY2UgYmV0d2VlbiBtYXggJiBtaW4gaXMgaW5kaXZpc2libGUgdG8gc3RlcCxcbiAgICAgIC8vIHdlIHBsYWNlIHRoZSBzZWNvbmRhcnkgdG8gbGFzdCBtYXJrZXIgcHJvcG9ydGlvbmFsbHkgYXQgd2hlcmUgdGh1bWJcbiAgICAgIC8vIGNvdWxkIHJlYWNoIGFuZCBwbGFjZSB0aGUgbGFzdCBtYXJrZXIgYXQgbWF4IHZhbHVlXG4gICAgICBjb25zdCBpbmRpdmlzaWJsZSA9IE1hdGguY2VpbChudW1NYXJrZXJzKSAhPT0gbnVtTWFya2VycztcbiAgICAgIGlmIChpbmRpdmlzaWJsZSkge1xuICAgICAgICBudW1NYXJrZXJzID0gTWF0aC5jZWlsKG51bU1hcmtlcnMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZVRyYWNrTWFya2VycygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hcHBlbmRUcmFja01hcmtlcnMobnVtTWFya2Vycyk7XG5cbiAgICAgIGlmIChpbmRpdmlzaWJsZSkge1xuICAgICAgICBjb25zdCBsYXN0U3RlcFJhdGlvID0gKG1heCAtIG51bU1hcmtlcnMgKiBzdGVwKSAvIHN0ZXAgKyAxO1xuICAgICAgICBjb25zdCBmbGV4ID0gZ2V0Q29ycmVjdFByb3BlcnR5TmFtZSh3aW5kb3csICdmbGV4Jyk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0TGFzdFRyYWNrTWFya2Vyc1N0eWxlUHJvcGVydHkoZmxleCwgU3RyaW5nKGxhc3RTdGVwUmF0aW8pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgdGhpcy5yZWN0XyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMudXBkYXRlVUlGb3JDdXJyZW50VmFsdWVfKCk7XG4gIH1cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXJ9IHZhbHVlICovXG4gIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5zZXRWYWx1ZV8odmFsdWUsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtudW1iZXJ9ICovXG4gIGdldE1heCgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXhfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7bnVtYmVyfSBtYXggKi9cbiAgc2V0TWF4KG1heCkge1xuICAgIGlmIChtYXggPCB0aGlzLm1pbl8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNldCBtYXggdG8gYmUgbGVzcyB0aGFuIHRoZSBzbGlkZXJcXCdzIG1pbmltdW0gdmFsdWUnKTtcbiAgICB9XG4gICAgdGhpcy5tYXhfID0gbWF4O1xuICAgIHRoaXMuc2V0VmFsdWVfKHRoaXMudmFsdWVfLCBmYWxzZSwgdHJ1ZSk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX1ZBTFVFTUFYLCBTdHJpbmcodGhpcy5tYXhfKSk7XG4gICAgdGhpcy5zZXR1cFRyYWNrTWFya2VyKCk7XG4gIH1cblxuICAvKiogQHJldHVybiB7bnVtYmVyfSAqL1xuICBnZXRNaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubWluXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge251bWJlcn0gbWluICovXG4gIHNldE1pbihtaW4pIHtcbiAgICBpZiAobWluID4gdGhpcy5tYXhfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgbWluIHRvIGJlIGdyZWF0ZXIgdGhhbiB0aGUgc2xpZGVyXFwncyBtYXhpbXVtIHZhbHVlJyk7XG4gICAgfVxuICAgIHRoaXMubWluXyA9IG1pbjtcbiAgICB0aGlzLnNldFZhbHVlXyh0aGlzLnZhbHVlXywgZmFsc2UsIHRydWUpO1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9WQUxVRU1JTiwgU3RyaW5nKHRoaXMubWluXykpO1xuICAgIHRoaXMuc2V0dXBUcmFja01hcmtlcigpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge251bWJlcn0gKi9cbiAgZ2V0U3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge251bWJlcn0gc3RlcCAqL1xuICBzZXRTdGVwKHN0ZXApIHtcbiAgICBpZiAoc3RlcCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3RlcCBjYW5ub3QgYmUgc2V0IHRvIGEgbmVnYXRpdmUgbnVtYmVyJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRGlzY3JldGVfICYmICh0eXBlb2Yoc3RlcCkgIT09ICdudW1iZXInIHx8IHN0ZXAgPCAxKSkge1xuICAgICAgc3RlcCA9IDE7XG4gICAgfVxuICAgIHRoaXMuc3RlcF8gPSBzdGVwO1xuICAgIHRoaXMuc2V0VmFsdWVfKHRoaXMudmFsdWVfLCBmYWxzZSwgdHJ1ZSk7XG4gICAgdGhpcy5zZXR1cFRyYWNrTWFya2VyKCk7XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNEaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAqL1xuICBzZXREaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuZGlzYWJsZWRfID0gZGlzYWJsZWQ7XG4gICAgdGhpcy50b2dnbGVDbGFzc18oY3NzQ2xhc3Nlcy5ESVNBQkxFRCwgdGhpcy5kaXNhYmxlZF8pO1xuICAgIGlmICh0aGlzLmRpc2FibGVkXykge1xuICAgICAgdGhpcy5zYXZlZFRhYkluZGV4XyA9IHRoaXMuYWRhcHRlcl8uZ2V0VGFiSW5kZXgoKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlKHN0cmluZ3MuQVJJQV9ESVNBQkxFRCwgJ3RydWUnKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUF0dHJpYnV0ZShzdHJpbmdzLkFSSUFfRElTQUJMRUQpO1xuICAgICAgaWYgKCFpc05hTih0aGlzLnNhdmVkVGFiSW5kZXhfKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCBTdHJpbmcodGhpcy5zYXZlZFRhYkluZGV4XykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgc2xpZGVyXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZURvd25fKGV2dCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJldmVudEZvY3VzU3RhdGVfID0gdHJ1ZTtcbiAgICB0aGlzLnNldEluVHJhbnNpdF8oIXRoaXMuaGFuZGxpbmdUaHVtYlRhcmdldEV2dF8pO1xuICAgIHRoaXMuaGFuZGxpbmdUaHVtYlRhcmdldEV2dF8gPSBmYWxzZTtcbiAgICB0aGlzLnNldEFjdGl2ZV8odHJ1ZSk7XG5cbiAgICBjb25zdCBtb3ZlSGFuZGxlciA9IChldnQpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlTW92ZV8oZXZ0KTtcbiAgICB9O1xuXG4gICAgLy8gTm90ZTogdXBIYW5kbGVyIGlzIFtkZV1yZWdpc3RlcmVkIG9uIEFMTCBwb3RlbnRpYWwgcG9pbnRlci1yZWxhdGVkIHJlbGVhc2UgZXZlbnQgdHlwZXMsIHNpbmNlIHNvbWUgYnJvd3NlcnNcbiAgICAvLyBkbyBub3QgYWx3YXlzIGZpcmUgdGhlc2UgY29uc2lzdGVudGx5IGluIHBhaXJzLlxuICAgIC8vIChTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvaXNzdWVzLzExOTIpXG4gICAgY29uc3QgdXBIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVVcF8oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIoTU9WRV9FVkVOVF9NQVBbZXZ0LnR5cGVdLCBtb3ZlSGFuZGxlcik7XG4gICAgICBVUF9FVkVOVFMuZm9yRWFjaCgoZXZ0TmFtZSkgPT4gdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyQm9keUludGVyYWN0aW9uSGFuZGxlcihldnROYW1lLCB1cEhhbmRsZXIpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIoTU9WRV9FVkVOVF9NQVBbZXZ0LnR5cGVdLCBtb3ZlSGFuZGxlcik7XG4gICAgVVBfRVZFTlRTLmZvckVhY2goKGV2dE5hbWUpID0+IHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyKGV2dE5hbWUsIHVwSGFuZGxlcikpO1xuICAgIHRoaXMuc2V0VmFsdWVGcm9tRXZ0XyhldnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB1c2VyIG1vdmVzIHRoZSBzbGlkZXJcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlTW92ZV8oZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRWYWx1ZUZyb21FdnRfKGV2dCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHVzZXIncyBpbnRlcmFjdGlvbiB3aXRoIHRoZSBzbGlkZXIgZW5kc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlVXBfKCkge1xuICAgIHRoaXMuc2V0QWN0aXZlXyhmYWxzZSk7XG4gICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYWdlWCBvZiB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRQYWdlWF8oZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzICYmIGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICB9XG4gICAgcmV0dXJuIGV2dC5wYWdlWDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzbGlkZXIgdmFsdWUgZnJvbSBhbiBldmVudFxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRWYWx1ZUZyb21FdnRfKGV2dCkge1xuICAgIGNvbnN0IHBhZ2VYID0gdGhpcy5nZXRQYWdlWF8oZXZ0KTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29tcHV0ZVZhbHVlRnJvbVBhZ2VYXyhwYWdlWCk7XG4gICAgdGhpcy5zZXRWYWx1ZV8odmFsdWUsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBuZXcgdmFsdWUgZnJvbSB0aGUgcGFnZVggcG9zaXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IHBhZ2VYXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGNvbXB1dGVWYWx1ZUZyb21QYWdlWF8ocGFnZVgpIHtcbiAgICBjb25zdCB7bWF4XzogbWF4LCBtaW5fOiBtaW59ID0gdGhpcztcbiAgICBjb25zdCB4UG9zID0gcGFnZVggLSB0aGlzLnJlY3RfLmxlZnQ7XG4gICAgbGV0IHBjdENvbXBsZXRlID0geFBvcyAvIHRoaXMucmVjdF8ud2lkdGg7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNSVEwoKSkge1xuICAgICAgcGN0Q29tcGxldGUgPSAxIC0gcGN0Q29tcGxldGU7XG4gICAgfVxuICAgIC8vIEZpdCB0aGUgcGVyY2VudGFnZSBjb21wbGV0ZSBiZXR3ZWVuIHRoZSByYW5nZSBbbWluLG1heF1cbiAgICAvLyBieSByZW1hcHBpbmcgZnJvbSBbMCwgMV0gdG8gW21pbiwgbWluKyhtYXgtbWluKV0uXG4gICAgcmV0dXJuIG1pbiArIHBjdENvbXBsZXRlICogKG1heCAtIG1pbik7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBrZXlkb3duIGV2ZW50c1xuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVLZXlkb3duXyhldnQpIHtcbiAgICBjb25zdCBrZXlJZCA9IHRoaXMuZ2V0S2V5SWRfKGV2dCk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlRm9yS2V5SWRfKGtleUlkKTtcbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJldmVudCBwYWdlIGZyb20gc2Nyb2xsaW5nIGR1ZSB0byBrZXkgcHJlc3NlcyB0aGF0IHdvdWxkIG5vcm1hbGx5IHNjcm9sbCB0aGUgcGFnZVxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5GT0NVUyk7XG4gICAgdGhpcy5zZXRWYWx1ZV8odmFsdWUsIHRydWUpO1xuICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcHV0ZWQgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHshRXZlbnR9IGtiZEV2dFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRLZXlJZF8oa2JkRXZ0KSB7XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuQVJST1dfTEVGVCB8fCBrYmRFdnQua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgIHJldHVybiBLRVlfSURTLkFSUk9XX0xFRlQ7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkFSUk9XX1JJR0hUIHx8IGtiZEV2dC5rZXlDb2RlID09PSAzOSkge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuQVJST1dfUklHSFQ7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkFSUk9XX1VQIHx8IGtiZEV2dC5rZXlDb2RlID09PSAzOCkge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuQVJST1dfVVA7XG4gICAgfVxuICAgIGlmIChrYmRFdnQua2V5ID09PSBLRVlfSURTLkFSUk9XX0RPV04gfHwga2JkRXZ0LmtleUNvZGUgPT09IDQwKSB7XG4gICAgICByZXR1cm4gS0VZX0lEUy5BUlJPV19ET1dOO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5IT01FIHx8IGtiZEV2dC5rZXlDb2RlID09PSAzNikge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuSE9NRTtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuRU5EIHx8IGtiZEV2dC5rZXlDb2RlID09PSAzNSkge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuRU5EO1xuICAgIH1cbiAgICBpZiAoa2JkRXZ0LmtleSA9PT0gS0VZX0lEUy5QQUdFX1VQIHx8IGtiZEV2dC5rZXlDb2RlID09PSAzMykge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuUEFHRV9VUDtcbiAgICB9XG4gICAgaWYgKGtiZEV2dC5rZXkgPT09IEtFWV9JRFMuUEFHRV9ET1dOIHx8IGtiZEV2dC5rZXlDb2RlID09PSAzNCkge1xuICAgICAgcmV0dXJuIEtFWV9JRFMuUEFHRV9ET1dOO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgdmFsdWUgZ2l2ZW4gYSBrZXlib2FyZCBrZXkgSURcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleUlkXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGdldFZhbHVlRm9yS2V5SWRfKGtleUlkKSB7XG4gICAgY29uc3Qge21heF86IG1heCwgbWluXzogbWluLCBzdGVwXzogc3RlcH0gPSB0aGlzO1xuICAgIGxldCBkZWx0YSA9IHN0ZXAgfHwgKG1heCAtIG1pbikgLyAxMDA7XG4gICAgY29uc3QgdmFsdWVOZWVkc1RvQmVGbGlwcGVkID0gdGhpcy5hZGFwdGVyXy5pc1JUTCgpICYmIChcbiAgICAgIGtleUlkID09PSBLRVlfSURTLkFSUk9XX0xFRlQgfHwga2V5SWQgPT09IEtFWV9JRFMuQVJST1dfUklHSFRcbiAgICApO1xuICAgIGlmICh2YWx1ZU5lZWRzVG9CZUZsaXBwZWQpIHtcbiAgICAgIGRlbHRhID0gLWRlbHRhO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5SWQpIHtcbiAgICBjYXNlIEtFWV9JRFMuQVJST1dfTEVGVDpcbiAgICBjYXNlIEtFWV9JRFMuQVJST1dfRE9XTjpcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXyAtIGRlbHRhO1xuICAgIGNhc2UgS0VZX0lEUy5BUlJPV19SSUdIVDpcbiAgICBjYXNlIEtFWV9JRFMuQVJST1dfVVA6XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gKyBkZWx0YTtcbiAgICBjYXNlIEtFWV9JRFMuSE9NRTpcbiAgICAgIHJldHVybiB0aGlzLm1pbl87XG4gICAgY2FzZSBLRVlfSURTLkVORDpcbiAgICAgIHJldHVybiB0aGlzLm1heF87XG4gICAgY2FzZSBLRVlfSURTLlBBR0VfVVA6XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZV8gKyBkZWx0YSAqIG51bWJlcnMuUEFHRV9GQUNUT1I7XG4gICAgY2FzZSBLRVlfSURTLlBBR0VfRE9XTjpcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlXyAtIGRlbHRhICogbnVtYmVycy5QQUdFX0ZBQ1RPUjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1c18oKSB7XG4gICAgaWYgKHRoaXMucHJldmVudEZvY3VzU3RhdGVfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5GT0NVUyk7XG4gIH1cblxuICBoYW5kbGVCbHVyXygpIHtcbiAgICB0aGlzLnByZXZlbnRGb2N1c1N0YXRlXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5GT0NVUyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHNsaWRlclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRGaXJlSW5wdXRcbiAgICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VcbiAgICovXG4gIHNldFZhbHVlXyh2YWx1ZSwgc2hvdWxkRmlyZUlucHV0LCBmb3JjZSA9IGZhbHNlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLnZhbHVlXyAmJiAhZm9yY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7bWluXzogbWluLCBtYXhfOiBtYXh9ID0gdGhpcztcbiAgICBjb25zdCB2YWx1ZVNldFRvQm91bmRhcnkgPSB2YWx1ZSA9PT0gbWluIHx8IHZhbHVlID09PSBtYXg7XG4gICAgaWYgKHRoaXMuc3RlcF8gJiYgIXZhbHVlU2V0VG9Cb3VuZGFyeSkge1xuICAgICAgdmFsdWUgPSB0aGlzLnF1YW50aXplXyh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA8IG1pbikge1xuICAgICAgdmFsdWUgPSBtaW47XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA+IG1heCkge1xuICAgICAgdmFsdWUgPSBtYXg7XG4gICAgfVxuICAgIHRoaXMudmFsdWVfID0gdmFsdWU7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX1ZBTFVFTk9XLCBTdHJpbmcodGhpcy52YWx1ZV8pKTtcbiAgICB0aGlzLnVwZGF0ZVVJRm9yQ3VycmVudFZhbHVlXygpO1xuXG4gICAgaWYgKHNob3VsZEZpcmVJbnB1dCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlJbnB1dCgpO1xuICAgICAgaWYgKHRoaXMuaXNEaXNjcmV0ZV8pIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRNYXJrZXJWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHF1YW50aXplZCB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgcXVhbnRpemVfKHZhbHVlKSB7XG4gICAgY29uc3QgbnVtU3RlcHMgPSBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5zdGVwXyk7XG4gICAgY29uc3QgcXVhbnRpemVkVmFsID0gbnVtU3RlcHMgKiB0aGlzLnN0ZXBfO1xuICAgIHJldHVybiBxdWFudGl6ZWRWYWw7XG4gIH1cblxuICB1cGRhdGVVSUZvckN1cnJlbnRWYWx1ZV8oKSB7XG4gICAgY29uc3Qge21heF86IG1heCwgbWluXzogbWluLCB2YWx1ZV86IHZhbHVlfSA9IHRoaXM7XG4gICAgY29uc3QgcGN0Q29tcGxldGUgPSAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG4gICAgbGV0IHRyYW5zbGF0ZVB4ID0gcGN0Q29tcGxldGUgKiB0aGlzLnJlY3RfLndpZHRoO1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzUlRMKCkpIHtcbiAgICAgIHRyYW5zbGF0ZVB4ID0gdGhpcy5yZWN0Xy53aWR0aCAtIHRyYW5zbGF0ZVB4O1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zZm9ybVByb3AgPSBnZXRDb3JyZWN0UHJvcGVydHlOYW1lKHdpbmRvdywgJ3RyYW5zZm9ybScpO1xuICAgIGNvbnN0IHRyYW5zaXRpb25lbmRFdnROYW1lID0gZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3csICd0cmFuc2l0aW9uZW5kJyk7XG5cbiAgICBpZiAodGhpcy5pblRyYW5zaXRfKSB7XG4gICAgICBjb25zdCBvblRyYW5zaXRpb25FbmQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5UcmFuc2l0XyhmYWxzZSk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyKHRyYW5zaXRpb25lbmRFdnROYW1lLCBvblRyYW5zaXRpb25FbmQpO1xuICAgICAgfTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUaHVtYkNvbnRhaW5lckludGVyYWN0aW9uSGFuZGxlcih0cmFuc2l0aW9uZW5kRXZ0TmFtZSwgb25UcmFuc2l0aW9uRW5kKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVVJRnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIE5PVEUodHJhdmlza2F1Zm1hbik6IEl0IHdvdWxkIGJlIG5pY2UgdG8gdXNlIGNhbGMoKSBoZXJlLFxuICAgICAgLy8gYnV0IElFIGNhbm5vdCBoYW5kbGUgY2FsY3MgaW4gdHJhbnNmb3JtcyBjb3JyZWN0bHkuXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZ29vLmdsL05DMml0a1xuICAgICAgLy8gQWxzbyBub3RlIHRoYXQgdGhlIC01MCUgb2Zmc2V0IGlzIHVzZWQgdG8gY2VudGVyIHRoZSBzbGlkZXIgdGh1bWIuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFRodW1iQ29udGFpbmVyU3R5bGVQcm9wZXJ0eSh0cmFuc2Zvcm1Qcm9wLCBgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZVB4fXB4KSB0cmFuc2xhdGVYKC01MCUpYCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldFRyYWNrU3R5bGVQcm9wZXJ0eSh0cmFuc2Zvcm1Qcm9wLCBgc2NhbGVYKCR7cGN0Q29tcGxldGV9KWApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGFjdGl2ZSBzdGF0ZSBvZiB0aGUgc2xpZGVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aXZlXG4gICAqL1xuICBzZXRBY3RpdmVfKGFjdGl2ZSkge1xuICAgIHRoaXMuYWN0aXZlXyA9IGFjdGl2ZTtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzXyhjc3NDbGFzc2VzLkFDVElWRSwgdGhpcy5hY3RpdmVfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBpblRyYW5zaXQgc3RhdGUgb2YgdGhlIHNsaWRlclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluVHJhbnNpdFxuICAgKi9cbiAgc2V0SW5UcmFuc2l0XyhpblRyYW5zaXQpIHtcbiAgICB0aGlzLmluVHJhbnNpdF8gPSBpblRyYW5zaXQ7XG4gICAgdGhpcy50b2dnbGVDbGFzc18oY3NzQ2xhc3Nlcy5JTl9UUkFOU0lULCB0aGlzLmluVHJhbnNpdF8pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmRpdGlvbmFsbHkgYWRkcyBvciByZW1vdmVzIGEgY2xhc3MgYmFzZWQgb24gc2hvdWxkQmVQcmVzZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHBhcmFtIHtib29sZWFufSBzaG91bGRCZVByZXNlbnRcbiAgICovXG4gIHRvZ2dsZUNsYXNzXyhjbGFzc05hbWUsIHNob3VsZEJlUHJlc2VudCkge1xuICAgIGlmIChzaG91bGRCZVByZXNlbnQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTbGlkZXJGb3VuZGF0aW9uO1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibWRjLXNsaWRlclwiIDpjbGFzcz1cImNsYXNzZXNcIiB0YWJpbmRleD1cIjBcIiByb2xlPVwic2xpZGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrXCIgOnN0eWxlPVwidHJhY2tTdHlsZXNcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZGMtc2xpZGVyX190cmFjay1tYXJrZXItY29udGFpbmVyXCIgdi1pZj1cImhhc01hcmtlcnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX3RyYWNrLW1hcmtlclwiIFxuICAgICAgICAgIHYtZm9yPVwibWFya2VyTnVtIGluIG51bU1hcmtlcnNcIlxuICAgICAgICAgIDprZXk9XCJtYXJrZXJOdW1cIlxuICAgICAgICAgIDpzdHlsZT1cIihtYXJrZXJOdW0gPT0gbnVtTWFya2VycykgPyBsYXN0VHJhY2tNYXJrZXJzU3R5bGVzIDoge31cIlxuICAgICAgICAgID48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgcmVmPVwidGh1bWJDb250YWluZXJcIiA6c3R5bGU9XCJ0aHVtYlN0eWxlc1wiIGNsYXNzPVwibWRjLXNsaWRlcl9fdGh1bWItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWRjLXNsaWRlcl9fcGluXCIgdi1pZj1cImlzRGlzY3JldGVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtZGMtc2xpZGVyX19waW4tdmFsdWUtbWFya2VyXCI+e3ttYXJrZXJWYWx1ZX19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3ZnIGNsYXNzPVwibWRjLXNsaWRlcl9fdGh1bWJcIiB3aWR0aD1cIjIxXCIgaGVpZ2h0PVwiMjFcIj5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjEwLjVcIiBjeT1cIjEwLjVcIiByPVwiNy44NzVcIj48L2NpcmNsZT5cbiAgICAgIDwvc3ZnPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1zbGlkZXJfX2ZvY3VzLXJpbmdcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1EQ1NsaWRlckZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL3NsaWRlci9mb3VuZGF0aW9uJztcbmltcG9ydCB7IERpc3BhdGNoRm9jdXNNaXhpbiB9IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtc2xpZGVyJyxcbiAgbWl4aW5zOiBbRGlzcGF0Y2hGb2N1c01peGluXSxcbiAgbW9kZWw6IHtcbiAgICBwcm9wOiAndmFsdWUnLFxuICAgIGV2ZW50OiAnY2hhbmdlJyxcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogW051bWJlciwgU3RyaW5nXSxcbiAgICBtaW46IHsgdHlwZTogW051bWJlciwgU3RyaW5nXSwgZGVmYXVsdDogMCB9LFxuICAgIG1heDogeyB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLCBkZWZhdWx0OiAxMDAgfSxcbiAgICBzdGVwOiB7IHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sIGRlZmF1bHQ6IDAgfSxcbiAgICBkaXNwbGF5TWFya2VyczogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBsYXlvdXRPbjogU3RyaW5nLFxuICAgIGxheW91dE9uU291cmNlOiB7IHR5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlIH0sXG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgJ21kYy1zbGlkZXItLWRpc2NyZXRlJzogISF0aGlzLnN0ZXAsXG4gICAgICAgICdtZGMtc2xpZGVyLS1kaXNwbGF5LW1hcmtlcnMnOiB0aGlzLmRpc3BsYXlNYXJrZXJzLFxuICAgICAgfSxcbiAgICAgIHRyYWNrU3R5bGVzOiB7fSxcbiAgICAgIGxhc3RUcmFja01hcmtlcnNTdHlsZXM6IHt9LFxuICAgICAgdGh1bWJTdHlsZXM6IHt9LFxuICAgICAgbWFya2VyVmFsdWU6ICcnLFxuICAgICAgbnVtTWFya2VyczogMCxcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGlzRGlzY3JldGUoKSB7XG4gICAgICByZXR1cm4gISF0aGlzLnN0ZXA7XG4gICAgfSxcbiAgICBoYXNNYXJrZXJzKCkge1xuICAgICAgcmV0dXJuICEhdGhpcy5zdGVwICYmIHRoaXMuZGlzcGxheU1hcmtlcnMgJiYgdGhpcy5udW1NYXJrZXJzO1xuICAgIH0sXG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWUoKSB7XG4gICAgICBpZiAodGhpcy5mb3VuZGF0aW9uLmdldFZhbHVlKCkgIT09IE51bWJlcih0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtaW4oKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0TWluKE51bWJlcih0aGlzLm1pbikpO1xuICAgIH0sXG4gICAgbWF4KCkge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldE1heChOdW1iZXIodGhpcy5tYXgpKTtcbiAgICB9LFxuICAgIHN0ZXAoKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0U3RlcChOdW1iZXIodGhpcy5zdGVwKSk7XG4gICAgfSxcbiAgICBkaXNhYmxlZCgpIHtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXREaXNhYmxlZCh0aGlzLmRpc2FibGVkKTtcbiAgICB9LFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgbGF5b3V0KCkge1xuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmxheW91dCgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBuZXcgTURDU2xpZGVyRm91bmRhdGlvbih7XG4gICAgICBoYXNDbGFzczogY2xhc3NOYW1lID0+IHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpLFxuICAgICAgYWRkQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3M6IGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIHRoaXMuJGRlbGV0ZSh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgZ2V0QXR0cmlidXRlOiBuYW1lID0+IHRoaXMuJGVsLmdldEF0dHJpYnV0ZShuYW1lKSxcbiAgICAgIHNldEF0dHJpYnV0ZTogKG5hbWUsIHZhbHVlKSA9PiB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpLFxuICAgICAgcmVtb3ZlQXR0cmlidXRlOiBuYW1lID0+IHRoaXMuJGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHRoaXMuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgZ2V0VGFiSW5kZXg6ICgpID0+IHRoaXMuJGVsLnRhYkluZGV4LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbiAgICAgIH0sXG4gICAgICByZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLnRodW1iQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLnRodW1iQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKTtcbiAgICAgIH0sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcik7XG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGhhbmRsZXIgPT4ge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcik7XG4gICAgICB9LFxuICAgICAgbm90aWZ5SW5wdXQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLmZvdW5kYXRpb24uZ2V0VmFsdWUoKSk7XG4gICAgICB9LFxuICAgICAgbm90aWZ5Q2hhbmdlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuZm91bmRhdGlvbi5nZXRWYWx1ZSgpKTtcbiAgICAgIH0sXG4gICAgICBzZXRUaHVtYkNvbnRhaW5lclN0eWxlUHJvcGVydHk6IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnRodW1iU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBzZXRUcmFja1N0eWxlUHJvcGVydHk6IChwcm9wZXJ0eU5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnRyYWNrU3R5bGVzLCBwcm9wZXJ0eU5hbWUsIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBzZXRNYXJrZXJWYWx1ZTogdmFsdWUgPT4ge1xuICAgICAgICB0aGlzLm1hcmtlclZhbHVlID0gdmFsdWU7XG4gICAgICB9LFxuICAgICAgYXBwZW5kVHJhY2tNYXJrZXJzOiBudW1NYXJrZXJzID0+IHtcbiAgICAgICAgdGhpcy5udW1NYXJrZXJzID0gbnVtTWFya2VycztcbiAgICAgIH0sXG4gICAgICByZW1vdmVUcmFja01hcmtlcnM6ICgpID0+IHtcbiAgICAgICAgdGhpcy5udW1NYXJrZXJzID0gMDtcbiAgICAgIH0sXG4gICAgICBzZXRMYXN0VHJhY2tNYXJrZXJzU3R5bGVQcm9wZXJ0eTogKHByb3BlcnR5TmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy4kc2V0KHRoaXMubGFzdFRyYWNrTWFya2Vyc1N0eWxlcywgcHJvcGVydHlOYW1lLCB2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgaXNSVEw6ICgpID0+IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5mb3VuZGF0aW9uLmluaXQoKTtcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0RGlzYWJsZWQodGhpcy5kaXNhYmxlZCk7XG4gICAgaWYgKE51bWJlcih0aGlzLm1pbikgPD0gdGhpcy5mb3VuZGF0aW9uLmdldE1heCgpKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0TWluKE51bWJlcih0aGlzLm1pbikpO1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldE1heChOdW1iZXIodGhpcy5tYXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3VuZGF0aW9uLnNldE1heChOdW1iZXIodGhpcy5tYXgpKTtcbiAgICAgIHRoaXMuZm91bmRhdGlvbi5zZXRNaW4oTnVtYmVyKHRoaXMubWluKSk7XG4gICAgfVxuICAgIHRoaXMuZm91bmRhdGlvbi5zZXRTdGVwKE51bWJlcih0aGlzLnN0ZXApKTtcbiAgICB0aGlzLmZvdW5kYXRpb24uc2V0VmFsdWUoTnVtYmVyKHRoaXMudmFsdWUpKTtcbiAgICBpZiAodGhpcy5oYXNNYXJrZXJzKSB7XG4gICAgICB0aGlzLmZvdW5kYXRpb24uc2V0dXBUcmFja01hcmtlcigpO1xuICAgIH1cblxuICAgIHRoaXMuJHJvb3QuJG9uKCdtZGM6bGF5b3V0JywgdGhpcy5sYXlvdXQpO1xuXG4gICAgaWYgKHRoaXMubGF5b3V0T24pIHtcbiAgICAgIGxldCBzb3VyY2UgPSB0aGlzLmxheW91dE9uU291cmNlIHx8IHRoaXMuJHJvb3Q7XG4gICAgICBzb3VyY2UuJG9uKHRoaXMubGF5b3V0T24sIHRoaXMubGF5b3V0KTtcbiAgICB9XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uLmRlc3Ryb3koKTtcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsImltcG9ydCB7QmFzZVBsdWdpbn0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBtZGNTbGlkZXIgZnJvbSAnLi9tZGMtc2xpZGVyLnZ1ZSdcblxuZXhwb3J0IHtcbiAgbWRjU2xpZGVyXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VQbHVnaW4oe1xuICBtZGNTbGlkZXJcbn0pXG4iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQge2F1dG9Jbml0fSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXG5cbmF1dG9Jbml0KHBsdWdpbilcbiJdLCJuYW1lcyI6WyJhdXRvSW5pdCIsInBsdWdpbiIsIl9WdWUiLCJ3aW5kb3ciLCJWdWUiLCJnbG9iYWwiLCJ1c2UiLCJCYXNlUGx1Z2luIiwiY29tcG9uZW50cyIsInZlcnNpb24iLCJpbnN0YWxsIiwidm0iLCJrZXkiLCJjb21wb25lbnQiLCJuYW1lIiwiRGlzcGF0Y2hGb2N1c01peGluIiwiZGF0YSIsImhhc0ZvY3VzIiwibWV0aG9kcyIsIm9uTW91c2VEb3duIiwiX2FjdGl2ZSIsIm9uTW91c2VVcCIsIm9uRm9jdXNFdmVudCIsInNldFRpbWVvdXQiLCJkaXNwYXRjaEZvY3VzRXZlbnQiLCJvbkJsdXJFdmVudCIsIiRlbCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImNvbnRhaW5zIiwiJGVtaXQiLCJtb3VudGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJlZm9yZURlc3Ryb3kiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3NzQ2xhc3NlcyIsIkFDVElWRSIsIkRJU0FCTEVEIiwiRElTQ1JFVEUiLCJGT0NVUyIsIklOX1RSQU5TSVQiLCJJU19ESVNDUkVURSIsIkhBU19UUkFDS19NQVJLRVIiLCJzdHJpbmdzIiwiVFJBQ0tfU0VMRUNUT1IiLCJUUkFDS19NQVJLRVJfQ09OVEFJTkVSX1NFTEVDVE9SIiwiTEFTVF9UUkFDS19NQVJLRVJfU0VMRUNUT1IiLCJUSFVNQl9DT05UQUlORVJfU0VMRUNUT1IiLCJQSU5fVkFMVUVfTUFSS0VSX1NFTEVDVE9SIiwiQVJJQV9WQUxVRU1JTiIsIkFSSUFfVkFMVUVNQVgiLCJBUklBX1ZBTFVFTk9XIiwiQVJJQV9ESVNBQkxFRCIsIlNURVBfREFUQV9BVFRSIiwiQ0hBTkdFX0VWRU5UIiwiSU5QVVRfRVZFTlQiLCJudW1iZXJzIiwiUEFHRV9GQUNUT1IiLCJNRENTbGlkZXJBZGFwdGVyIiwiY2xhc3NOYW1lIiwidmFsdWUiLCJ0eXBlIiwiaGFuZGxlciIsInByb3BlcnR5TmFtZSIsIm51bU1hcmtlcnMiLCJldmVudFR5cGVNYXAiLCJub1ByZWZpeCIsIndlYmtpdFByZWZpeCIsInN0eWxlUHJvcGVydHkiLCJjc3NQcm9wZXJ0eU1hcCIsImhhc1Byb3BlclNoYXBlIiwid2luZG93T2JqIiwidW5kZWZpbmVkIiwiZXZlbnRGb3VuZEluTWFwcyIsImV2ZW50VHlwZSIsImdldEphdmFTY3JpcHRFdmVudE5hbWUiLCJtYXAiLCJlbCIsInN0eWxlIiwiZ2V0QW5pbWF0aW9uTmFtZSIsImV2ZW50TmFtZSIsImdldENvcnJlY3RFdmVudE5hbWUiLCJnZXRDb3JyZWN0UHJvcGVydHlOYW1lIiwiTURDRm91bmRhdGlvbiIsImFkYXB0ZXIiLCJhZGFwdGVyXyIsIktFWV9JRFMiLCJBUlJPV19MRUZUIiwiQVJST1dfUklHSFQiLCJBUlJPV19VUCIsIkFSUk9XX0RPV04iLCJIT01FIiwiRU5EIiwiUEFHRV9VUCIsIlBBR0VfRE9XTiIsIk1PVkVfRVZFTlRfTUFQIiwiRE9XTl9FVkVOVFMiLCJVUF9FVkVOVFMiLCJNRENTbGlkZXJGb3VuZGF0aW9uIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0VGFiSW5kZXgiLCJyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlclRodW1iQ29udGFpbmVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJCb2R5SW50ZXJhY3Rpb25IYW5kbGVyIiwiZGVyZWdpc3RlckJvZHlJbnRlcmFjdGlvbkhhbmRsZXIiLCJyZWdpc3RlclJlc2l6ZUhhbmRsZXIiLCJkZXJlZ2lzdGVyUmVzaXplSGFuZGxlciIsIm5vdGlmeUlucHV0Iiwibm90aWZ5Q2hhbmdlIiwic2V0VGh1bWJDb250YWluZXJTdHlsZVByb3BlcnR5Iiwic2V0VHJhY2tTdHlsZVByb3BlcnR5Iiwic2V0TWFya2VyVmFsdWUiLCJhcHBlbmRUcmFja01hcmtlcnMiLCJyZW1vdmVUcmFja01hcmtlcnMiLCJzZXRMYXN0VHJhY2tNYXJrZXJzU3R5bGVQcm9wZXJ0eSIsImlzUlRMIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJkZWZhdWx0QWRhcHRlciIsInJlY3RfIiwic2F2ZWRUYWJJbmRleF8iLCJOYU4iLCJhY3RpdmVfIiwiaW5UcmFuc2l0XyIsImlzRGlzY3JldGVfIiwiaGFzVHJhY2tNYXJrZXJfIiwiaGFuZGxpbmdUaHVtYlRhcmdldEV2dF8iLCJtaW5fIiwibWF4XyIsInN0ZXBfIiwidmFsdWVfIiwiZGlzYWJsZWRfIiwicHJldmVudEZvY3VzU3RhdGVfIiwidXBkYXRlVUlGcmFtZV8iLCJ0aHVtYkNvbnRhaW5lclBvaW50ZXJIYW5kbGVyXyIsImludGVyYWN0aW9uU3RhcnRIYW5kbGVyXyIsImV2dCIsImhhbmRsZURvd25fIiwia2V5ZG93bkhhbmRsZXJfIiwiaGFuZGxlS2V5ZG93bl8iLCJmb2N1c0hhbmRsZXJfIiwiaGFuZGxlRm9jdXNfIiwiYmx1ckhhbmRsZXJfIiwiaGFuZGxlQmx1cl8iLCJyZXNpemVIYW5kbGVyXyIsImxheW91dCIsImZvckVhY2giLCJldnROYW1lIiwiZ2V0U3RlcCIsIm1pbiIsImdldE1pbiIsIm1heCIsImdldE1heCIsInN0ZXAiLCJpbmRpdmlzaWJsZSIsIk1hdGgiLCJjZWlsIiwibGFzdFN0ZXBSYXRpbyIsImZsZXgiLCJTdHJpbmciLCJ1cGRhdGVVSUZvckN1cnJlbnRWYWx1ZV8iLCJzZXRWYWx1ZV8iLCJFcnJvciIsInNldHVwVHJhY2tNYXJrZXIiLCJkaXNhYmxlZCIsInRvZ2dsZUNsYXNzXyIsImlzTmFOIiwic2V0SW5UcmFuc2l0XyIsInNldEFjdGl2ZV8iLCJtb3ZlSGFuZGxlciIsImhhbmRsZU1vdmVfIiwidXBIYW5kbGVyIiwiaGFuZGxlVXBfIiwic2V0VmFsdWVGcm9tRXZ0XyIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0VG91Y2hlcyIsImxlbmd0aCIsInBhZ2VYIiwiZ2V0UGFnZVhfIiwiY29tcHV0ZVZhbHVlRnJvbVBhZ2VYXyIsInhQb3MiLCJwY3RDb21wbGV0ZSIsImtleUlkIiwiZ2V0S2V5SWRfIiwiZ2V0VmFsdWVGb3JLZXlJZF8iLCJrYmRFdnQiLCJrZXlDb2RlIiwiZGVsdGEiLCJ2YWx1ZU5lZWRzVG9CZUZsaXBwZWQiLCJzaG91bGRGaXJlSW5wdXQiLCJmb3JjZSIsInZhbHVlU2V0VG9Cb3VuZGFyeSIsInF1YW50aXplXyIsIm51bVN0ZXBzIiwicm91bmQiLCJxdWFudGl6ZWRWYWwiLCJ0cmFuc2xhdGVQeCIsInRyYW5zZm9ybVByb3AiLCJ0cmFuc2l0aW9uZW5kRXZ0TmFtZSIsIm9uVHJhbnNpdGlvbkVuZCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFjdGl2ZSIsImluVHJhbnNpdCIsInNob3VsZEJlUHJlc2VudCIsInJlbmRlciIsIm1peGlucyIsIm1vZGVsIiwicHJvcCIsImV2ZW50IiwicHJvcHMiLCJOdW1iZXIiLCJkZWZhdWx0IiwiZGlzcGxheU1hcmtlcnMiLCJCb29sZWFuIiwibGF5b3V0T24iLCJsYXlvdXRPblNvdXJjZSIsIk9iamVjdCIsInJlcXVpcmVkIiwiY2xhc3NlcyIsInRyYWNrU3R5bGVzIiwibGFzdFRyYWNrTWFya2Vyc1N0eWxlcyIsInRodW1iU3R5bGVzIiwibWFya2VyVmFsdWUiLCJjb21wdXRlZCIsImlzRGlzY3JldGUiLCJoYXNNYXJrZXJzIiwid2F0Y2giLCJmb3VuZGF0aW9uIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsInNldE1pbiIsInNldE1heCIsInNldFN0ZXAiLCJzZXREaXNhYmxlZCIsIiRuZXh0VGljayIsImNsYXNzTGlzdCIsIiRzZXQiLCIkZGVsZXRlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidGFiSW5kZXgiLCIkcmVmcyIsInRodW1iQ29udGFpbmVyIiwiYm9keSIsImluaXQiLCIkcm9vdCIsIiRvbiIsInNvdXJjZSIsImRlc3Ryb3kiLCJtZGNTbGlkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBTyxTQUFTQSxRQUFULENBQW1CQyxNQUFuQixFQUEyQjtFQUNoQztFQUNBLE1BQUlDLE9BQU8sSUFBWDtFQUNBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztFQUNqQ0QsV0FBT0MsT0FBT0MsR0FBZDtFQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDeEM7RUFDQUgsV0FBT0csT0FBT0QsR0FBZDtFQUNEO0VBQ0QsTUFBSUYsSUFBSixFQUFVO0VBQ1JBLFNBQUtJLEdBQUwsQ0FBU0wsTUFBVDtFQUNEO0VBQ0Y7O0VDWk0sU0FBU00sVUFBVCxDQUFxQkMsVUFBckIsRUFBaUM7RUFDdEMsU0FBTztFQUNMQyxhQUFTLFFBREo7RUFFTEMsYUFBUyxpQkFBQ0MsRUFBRCxFQUFRO0VBQ2YsV0FBSyxJQUFJQyxHQUFULElBQWdCSixVQUFoQixFQUE0QjtFQUMxQixZQUFJSyxZQUFZTCxXQUFXSSxHQUFYLENBQWhCO0VBQ0VELFdBQUdFLFNBQUgsQ0FBYUEsVUFBVUMsSUFBdkIsRUFBNEJELFNBQTVCO0VBQ0g7RUFDRixLQVBJO0VBUUxMO0VBUkssR0FBUDtFQVVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VDWEQ7O0VDQU8sSUFBTU8scUJBQXFCO0VBQ2hDQyxNQURnQyxrQkFDeEI7RUFDTixXQUFRLEVBQUNDLFVBQVUsS0FBWCxFQUFSO0VBQ0QsR0FIK0I7O0VBSWhD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
