/**
* @module vue-mdc-adapterdrawer 0.13.2
* @exports VueMDCDrawer
* @copyright (c) 2017-present, Sebastien Tasson
* @license https://opensource.org/licenses/MIT
* @implements {"material-components-web":"^0.33.0"}
* @requires {"vue":"^2.5.6"}
* @see https://github.com/stasson/vue-mdc-adapter
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueMDCDrawer = factory());
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

  var mdcPermanentDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "mdc-permanent-drawer mdc-drawer--permanent mdc-typography" }, [_c('nav', { staticClass: "mdc-drawer__content" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-permanent-drawer',
    props: {
      'toolbar-spacer': Boolean
    }
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

  var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

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

  var MDCSlidableDrawerFoundation = function (_MDCFoundation) {
    inherits(MDCSlidableDrawerFoundation, _MDCFoundation);
    createClass(MDCSlidableDrawerFoundation, null, [{
      key: 'defaultAdapter',
      get: function get$$1() {
        return {
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          hasClass: function hasClass() /* className: string */{},
          hasNecessaryDom: function hasNecessaryDom() {
            return (/* boolean */false
            );
          },
          registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
          registerDrawerInteractionHandler: function registerDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
          deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler() /* evt: string, handler: EventListener */{},
          registerTransitionEndHandler: function registerTransitionEndHandler() /* handler: EventListener */{},
          deregisterTransitionEndHandler: function deregisterTransitionEndHandler() /* handler: EventListener */{},
          registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
          deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
          setTranslateX: function setTranslateX() /* value: number | null */{},
          getFocusableElements: function getFocusableElements() /* NodeList */{},
          saveElementTabState: function saveElementTabState() /* el: Element */{},
          restoreElementTabState: function restoreElementTabState() /* el: Element */{},
          makeElementUntabbable: function makeElementUntabbable() /* el: Element */{},
          notifyOpen: function notifyOpen() {},
          notifyClose: function notifyClose() {},
          isRtl: function isRtl() {
            return (/* boolean */false
            );
          },
          getDrawerWidth: function getDrawerWidth() {
            return (/* number */0
            );
          }
        };
      }
    }]);

    function MDCSlidableDrawerFoundation(adapter, rootCssClass, animatingCssClass, openCssClass) {
      classCallCheck(this, MDCSlidableDrawerFoundation);

      var _this = possibleConstructorReturn(this, (MDCSlidableDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCSlidableDrawerFoundation)).call(this, _extends(MDCSlidableDrawerFoundation.defaultAdapter, adapter)));

      _this.rootCssClass_ = rootCssClass;
      _this.animatingCssClass_ = animatingCssClass;
      _this.openCssClass_ = openCssClass;

      _this.transitionEndHandler_ = function (evt) {
        return _this.handleTransitionEnd_(evt);
      };

      _this.inert_ = false;

      _this.componentTouchStartHandler_ = function (evt) {
        return _this.handleTouchStart_(evt);
      };
      _this.componentTouchMoveHandler_ = function (evt) {
        return _this.handleTouchMove_(evt);
      };
      _this.componentTouchEndHandler_ = function (evt) {
        return _this.handleTouchEnd_(evt);
      };
      _this.documentKeydownHandler_ = function (evt) {
        if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
          _this.close();
        }
      };
      return _this;
    }

    createClass(MDCSlidableDrawerFoundation, [{
      key: 'init',
      value: function init() {
        var ROOT = this.rootCssClass_;
        var OPEN = this.openCssClass_;

        if (!this.adapter_.hasClass(ROOT)) {
          throw new Error(ROOT + ' class required in root element.');
        }

        if (!this.adapter_.hasNecessaryDom()) {
          throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
        }

        if (this.adapter_.hasClass(OPEN)) {
          this.isOpen_ = true;
        } else {
          this.detabinate_();
          this.isOpen_ = false;
        }

        this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
        this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
        this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
        this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
        this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
        // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
        this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
      }
    }, {
      key: 'open',
      value: function open() {
        this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
        this.adapter_.addClass(this.animatingCssClass_);
        this.adapter_.addClass(this.openCssClass_);
        this.retabinate_();
        // Debounce multiple calls
        if (!this.isOpen_) {
          this.adapter_.notifyOpen();
        }
        this.isOpen_ = true;
      }
    }, {
      key: 'close',
      value: function close() {
        this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
        this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
        this.adapter_.addClass(this.animatingCssClass_);
        this.adapter_.removeClass(this.openCssClass_);
        this.detabinate_();
        // Debounce multiple calls
        if (this.isOpen_) {
          this.adapter_.notifyClose();
        }
        this.isOpen_ = false;
      }
    }, {
      key: 'isOpen',
      value: function isOpen() {
        return this.isOpen_;
      }

      /**
       *  Render all children of the drawer inert when it's closed.
       */

    }, {
      key: 'detabinate_',
      value: function detabinate_() {
        if (this.inert_) {
          return;
        }

        var elements = this.adapter_.getFocusableElements();
        if (elements) {
          for (var i = 0; i < elements.length; i++) {
            this.adapter_.saveElementTabState(elements[i]);
            this.adapter_.makeElementUntabbable(elements[i]);
          }
        }

        this.inert_ = true;
      }

      /**
       *  Make all children of the drawer tabbable again when it's open.
       */

    }, {
      key: 'retabinate_',
      value: function retabinate_() {
        if (!this.inert_) {
          return;
        }

        var elements = this.adapter_.getFocusableElements();
        if (elements) {
          for (var i = 0; i < elements.length; i++) {
            this.adapter_.restoreElementTabState(elements[i]);
          }
        }

        this.inert_ = false;
      }
    }, {
      key: 'handleTouchStart_',
      value: function handleTouchStart_(evt) {
        if (!this.adapter_.hasClass(this.openCssClass_)) {
          return;
        }
        if (evt.pointerType && evt.pointerType !== 'touch') {
          return;
        }

        this.direction_ = this.adapter_.isRtl() ? -1 : 1;
        this.drawerWidth_ = this.adapter_.getDrawerWidth();
        this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
        this.currentX_ = this.startX_;

        this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
      }
    }, {
      key: 'handleTouchMove_',
      value: function handleTouchMove_(evt) {
        if (evt.pointerType && evt.pointerType !== 'touch') {
          return;
        }

        this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
      }
    }, {
      key: 'handleTouchEnd_',
      value: function handleTouchEnd_(evt) {
        if (evt.pointerType && evt.pointerType !== 'touch') {
          return;
        }

        this.prepareForTouchEnd_();

        // Did the user close the drawer by more than 50%?
        if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
          this.close();
        } else {
          // Triggering an open here means we'll get a nice animation back to the fully open state.
          this.open();
        }
      }
    }, {
      key: 'prepareForTouchEnd_',
      value: function prepareForTouchEnd_() {
        cancelAnimationFrame(this.updateRaf_);
        this.adapter_.setTranslateX(null);
      }
    }, {
      key: 'updateDrawer_',
      value: function updateDrawer_() {
        this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
        this.adapter_.setTranslateX(this.newPosition_);
      }
    }, {
      key: 'isRootTransitioningEventTarget_',
      value: function isRootTransitioningEventTarget_() {
        // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
        // if the event target is the root event target currently transitioning.
        return false;
      }
    }, {
      key: 'handleTransitionEnd_',
      value: function handleTransitionEnd_(evt) {
        if (this.isRootTransitioningEventTarget_(evt.target)) {
          this.adapter_.removeClass(this.animatingCssClass_);
          this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
        }
      }
    }, {
      key: 'newPosition_',
      get: function get$$1() {
        var newPos = null;

        if (this.direction_ === 1) {
          newPos = Math.min(0, this.currentX_ - this.startX_);
        } else {
          newPos = Math.max(0, this.currentX_ - this.startX_);
        }

        return newPos;
      }
    }]);
    return MDCSlidableDrawerFoundation;
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
    ROOT: 'mdc-drawer--persistent',
    OPEN: 'mdc-drawer--open',
    ANIMATING: 'mdc-drawer--animating'
  };

  var strings = {
    DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
    FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
    OPEN_EVENT: 'MDCPersistentDrawer:open',
    CLOSE_EVENT: 'MDCPersistentDrawer:close'
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

  var MDCPersistentDrawerFoundation = function (_MDCSlidableDrawerFou) {
    inherits(MDCPersistentDrawerFoundation, _MDCSlidableDrawerFou);
    createClass(MDCPersistentDrawerFoundation, null, [{
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
        return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
          isDrawer: function isDrawer() {
            return false;
          }
        });
      }
    }]);

    function MDCPersistentDrawerFoundation(adapter) {
      classCallCheck(this, MDCPersistentDrawerFoundation);
      return possibleConstructorReturn(this, (MDCPersistentDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCPersistentDrawerFoundation)).call(this, _extends(MDCPersistentDrawerFoundation.defaultAdapter, adapter), MDCPersistentDrawerFoundation.cssClasses.ROOT, MDCPersistentDrawerFoundation.cssClasses.ANIMATING, MDCPersistentDrawerFoundation.cssClasses.OPEN));
    }

    createClass(MDCPersistentDrawerFoundation, [{
      key: 'isRootTransitioningEventTarget_',
      value: function isRootTransitioningEventTarget_(el) {
        return this.adapter_.isDrawer(el);
      }
    }]);
    return MDCPersistentDrawerFoundation;
  }(MDCSlidableDrawerFoundation);

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

  var TAB_DATA = 'data-mdc-tabindex';
  var TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

  var storedTransformPropertyName_ = void 0;
  var supportsPassive_ = void 0;

  // Remap touch events to pointer events, if the browser doesn't support touch events.
  function remapEvent(eventName) {
    var globalObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

    if (!('ontouchstart' in globalObj.document)) {
      switch (eventName) {
        case 'touchstart':
          return 'pointerdown';
        case 'touchmove':
          return 'pointermove';
        case 'touchend':
          return 'pointerup';
        default:
          return eventName;
      }
    }

    return eventName;
  }

  // Choose the correct transform property to use on the current browser.
  function getTransformPropertyName() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (storedTransformPropertyName_ === undefined || forceRefresh) {
      var el = globalObj.document.createElement('div');
      var transformPropertyName = 'transform' in el.style ? 'transform' : '-webkit-transform';
      storedTransformPropertyName_ = transformPropertyName;
    }

    return storedTransformPropertyName_;
  }

  // Determine whether the current browser supports CSS properties.
  function supportsCssCustomProperties() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

    if ('CSS' in globalObj) {
      return globalObj.CSS.supports('(--color: red)');
    }
    return false;
  }

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

  // Save the tab state for an element.
  function saveElementTabState(el) {
    if (el.hasAttribute('tabindex')) {
      el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
    }
    el.setAttribute(TAB_DATA_HANDLED, true);
  }

  // Restore the tab state for an element, if it was saved.
  function restoreElementTabState(el) {
    // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
    if (el.hasAttribute(TAB_DATA_HANDLED)) {
      if (el.hasAttribute(TAB_DATA)) {
        el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
        el.removeAttribute(TAB_DATA);
      } else {
        el.removeAttribute('tabindex');
      }
      el.removeAttribute(TAB_DATA_HANDLED);
    }
  }

  var mdcPersistentDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { staticClass: "mdc-persistent-drawer mdc-drawer--persistent mdc-typography", class: _vm.classes }, [_c('nav', { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-persistent-drawer',
    model: {
      prop: 'open',
      event: 'change'
    },
    props: {
      'toolbar-spacer': Boolean,
      'open': Boolean
    },
    data: function data() {
      return {
        classes: {}
      };
    },

    watch: {
      open: function open() {
        this._refresh();
      }
    },
    methods: {
      _refresh: function _refresh() {
        if (this.open) {
          this.foundation && this.foundation.open();
        } else {
          this.foundation && this.foundation.close();
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      var FOCUSABLE_ELEMENTS = MDCPersistentDrawerFoundation.strings.FOCUSABLE_ELEMENTS;


      this.foundation = new MDCPersistentDrawerFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return !!_this.$refs.drawer;
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$el.addEventListener(remapEvent(evt), handler, applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive());
        },
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.addEventListener(remapEvent(evt), handler);
        },
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.removeEventListener(remapEvent(evt), handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          _this.$refs.drawer.addEventListener('transitionend', handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          _this.$refs.drawer.removeEventListener('transitionend', handler);
        },
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
          document.addEventListener('keydown', handler);
        },
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
          document.removeEventListener('keydown', handler);
        },
        getDrawerWidth: function getDrawerWidth() {
          return _this.$refs.drawer.offsetWidth;
        },
        setTranslateX: function setTranslateX(value) {
          _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
        },
        getFocusableElements: function getFocusableElements() {
          return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
        },
        saveElementTabState: function saveElementTabState$$1(el) {
          saveElementTabState(el);
        },
        restoreElementTabState: function restoreElementTabState$$1(el) {
          restoreElementTabState(el);
        },
        makeElementUntabbable: function makeElementUntabbable(el) {
          el.setAttribute('tabindex', -1);
        },
        notifyOpen: function notifyOpen() {
          _this.$emit('change', true);
          _this.$emit('open');
        },
        notifyClose: function notifyClose() {
          _this.$emit('change', false);
          _this.$emit('close');
        },
        isRtl: function isRtl() {
          /* global getComputedStyle */
          return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
        },
        isDrawer: function isDrawer(el) {
          return el === _this.$refs.drawer;
        }
      });
      this.foundation && this.foundation.init();
      this._refresh();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation && this.foundation.destroy();
      this.foundation = null;
    }
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

  var cssClasses$1 = {
    ROOT: 'mdc-drawer--temporary',
    OPEN: 'mdc-drawer--open',
    ANIMATING: 'mdc-drawer--animating',
    SCROLL_LOCK: 'mdc-drawer-scroll-lock'
  };

  var strings$1 = {
    DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
    OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
    FOCUSABLE_ELEMENTS: FOCUSABLE_ELEMENTS,
    OPEN_EVENT: 'MDCTemporaryDrawer:open',
    CLOSE_EVENT: 'MDCTemporaryDrawer:close'
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

  var MDCTemporaryDrawerFoundation = function (_MDCSlidableDrawerFou) {
    inherits(MDCTemporaryDrawerFoundation, _MDCSlidableDrawerFou);
    createClass(MDCTemporaryDrawerFoundation, null, [{
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
        return _extends(MDCSlidableDrawerFoundation.defaultAdapter, {
          addBodyClass: function addBodyClass() /* className: string */{},
          removeBodyClass: function removeBodyClass() /* className: string */{},
          isDrawer: function isDrawer() {
            return false;
          },
          updateCssVariable: function updateCssVariable() /* value: string */{},
          eventTargetHasClass: function eventTargetHasClass() {
            return (/* target: EventTarget, className: string */ /* boolean */false
            );
          }
        });
      }
    }]);

    function MDCTemporaryDrawerFoundation(adapter) {
      classCallCheck(this, MDCTemporaryDrawerFoundation);

      var _this = possibleConstructorReturn(this, (MDCTemporaryDrawerFoundation.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation)).call(this, _extends(MDCTemporaryDrawerFoundation.defaultAdapter, adapter), MDCTemporaryDrawerFoundation.cssClasses.ROOT, MDCTemporaryDrawerFoundation.cssClasses.ANIMATING, MDCTemporaryDrawerFoundation.cssClasses.OPEN));

      _this.componentClickHandler_ = function (evt) {
        if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses$1.ROOT)) {
          _this.close(true);
        }
      };
      return _this;
    }

    createClass(MDCTemporaryDrawerFoundation, [{
      key: 'init',
      value: function init() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'init', this).call(this);

        // Make browser aware of custom property being used in this element.
        // Workaround for certain types of hard-to-reproduce heisenbugs.
        this.adapter_.updateCssVariable(0);
        this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'destroy', this).call(this);

        this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
        this.enableScroll_();
      }
    }, {
      key: 'open',
      value: function open() {
        this.disableScroll_();
        // Make sure custom property values are cleared before starting.
        this.adapter_.updateCssVariable('');

        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'open', this).call(this);
      }
    }, {
      key: 'close',
      value: function close() {
        // Make sure custom property values are cleared before making any changes.
        this.adapter_.updateCssVariable('');

        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'close', this).call(this);
      }
    }, {
      key: 'prepareForTouchEnd_',
      value: function prepareForTouchEnd_() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'prepareForTouchEnd_', this).call(this);

        this.adapter_.updateCssVariable('');
      }
    }, {
      key: 'updateDrawer_',
      value: function updateDrawer_() {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'updateDrawer_', this).call(this);

        var newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
        this.adapter_.updateCssVariable(newOpacity);
      }
    }, {
      key: 'isRootTransitioningEventTarget_',
      value: function isRootTransitioningEventTarget_(el) {
        return this.adapter_.isDrawer(el);
      }
    }, {
      key: 'handleTransitionEnd_',
      value: function handleTransitionEnd_(evt) {
        get(MDCTemporaryDrawerFoundation.prototype.__proto__ || Object.getPrototypeOf(MDCTemporaryDrawerFoundation.prototype), 'handleTransitionEnd_', this).call(this, evt);
        if (!this.isOpen_) {
          this.enableScroll_();
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
    return MDCTemporaryDrawerFoundation;
  }(MDCSlidableDrawerFoundation);

  var mdcTemporaryDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('aside', { staticClass: "mdc-temporary-drawer mdc-drawer--temporary mdc-typography", class: _vm.classes }, [_c('nav', { ref: "drawer", staticClass: "mdc-drawer__drawer" }, [_vm.toolbarSpacer ? _c('div', { staticClass: "mdc-drawer__toolbar-spacer" }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]);
    }, staticRenderFns: [],
    name: 'mdc-temporary-drawer',
    model: {
      prop: 'open',
      event: 'change'
    },
    props: {
      'open': Boolean,
      'toolbar-spacer': Boolean
    },
    data: function data() {
      return {
        classes: {}
      };
    },

    watch: {
      open: function open() {
        this._refresh();
      }
    },
    methods: {
      _refresh: function _refresh() {
        if (this.open) {
          this.foundation && this.foundation.open();
        } else {
          this.foundation && this.foundation.close();
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      var _MDCTemporaryDrawerFo = MDCTemporaryDrawerFoundation.strings,
          FOCUSABLE_ELEMENTS = _MDCTemporaryDrawerFo.FOCUSABLE_ELEMENTS,
          OPACITY_VAR_NAME = _MDCTemporaryDrawerFo.OPACITY_VAR_NAME;


      this.foundation = new MDCTemporaryDrawerFoundation({
        addClass: function addClass(className) {
          _this.$set(_this.classes, className, true);
        },
        removeClass: function removeClass(className) {
          _this.$delete(_this.classes, className);
        },
        hasClass: function hasClass(className) {
          return _this.$el.classList.contains(className);
        },
        addBodyClass: function addBodyClass(className) {
          return document.body.classList.add(className);
        },
        removeBodyClass: function removeBodyClass(className) {
          return document.body.classList.remove(className);
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return !!_this.$refs.drawer;
        },
        registerInteractionHandler: function registerInteractionHandler(evt, handler) {
          _this.$el.addEventListener(remapEvent(evt), handler, applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
          _this.$el.removeEventListener(remapEvent(evt), handler, applyPassive());
        },
        registerDrawerInteractionHandler: function registerDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.addEventListener(remapEvent(evt), handler);
        },
        deregisterDrawerInteractionHandler: function deregisterDrawerInteractionHandler(evt, handler) {
          _this.$refs.drawer.removeEventListener(remapEvent(evt), handler);
        },
        registerTransitionEndHandler: function registerTransitionEndHandler(handler) {
          _this.$refs.drawer.addEventListener('transitionend', handler);
        },
        deregisterTransitionEndHandler: function deregisterTransitionEndHandler(handler) {
          _this.$refs.drawer.removeEventListener('transitionend', handler);
        },
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
          document.addEventListener('keydown', handler);
        },
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
          document.removeEventListener('keydown', handler);
        },
        getDrawerWidth: function getDrawerWidth() {
          return _this.$refs.drawer.offsetWidth;
        },
        setTranslateX: function setTranslateX(value) {
          _this.$refs.drawer.style.setProperty(getTransformPropertyName(), value === null ? null : 'translateX(' + value + 'px)');
        },
        updateCssVariable: function updateCssVariable(value) {
          if (supportsCssCustomProperties()) {
            _this.$el.style.setProperty(OPACITY_VAR_NAME, value);
          }
        },
        getFocusableElements: function getFocusableElements() {
          return _this.$refs.drawer.querySelectorAll(FOCUSABLE_ELEMENTS);
        },
        saveElementTabState: function saveElementTabState$$1(el) {
          saveElementTabState(el);
        },
        restoreElementTabState: function restoreElementTabState$$1(el) {
          restoreElementTabState(el);
        },
        makeElementUntabbable: function makeElementUntabbable(el) {
          el.setAttribute('tabindex', -1);
        },
        notifyOpen: function notifyOpen() {
          _this.$emit('change', true);
          _this.$emit('open');
        },
        notifyClose: function notifyClose() {
          _this.$emit('change', false);
          _this.$emit('close');
        },
        isRtl: function isRtl() {
          /* global getComputedStyle */
          return getComputedStyle(_this.$el).getPropertyValue('direction') === 'rtl';
        },
        isDrawer: function isDrawer(el) {
          return el === _this.$refs.drawer;
        }
      });
      this.foundation && this.foundation.init();
      this._refresh();
    },
    beforeDestroy: function beforeDestroy() {
      this.foundation && this.foundation.destroy();
      this.foundation = null;
    }
  };

  var media = new (function () {
    function _class() {
      classCallCheck(this, _class);
    }

    createClass(_class, [{
      key: 'small',
      get: function get$$1() {
        return this._small || (this._small = window.matchMedia('(max-width: 839px)'));
      }
    }, {
      key: 'large',
      get: function get$$1() {
        return this._large || (this._large = window.matchMedia('(min-width: 1200px)'));
      }
    }]);
    return _class;
  }())();

  var mdcDrawer = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.type, { ref: "drawer", tag: "component", staticClass: "mdc-drawer", attrs: { "toolbar-spacer": _vm.toolbarSpacer }, on: { "change": function change($event) {
            _vm.$root.$emit('mdc:layout');
          }, "open": function open($event) {
            _vm.$emit('open');
          }, "close": function close($event) {
            _vm.$emit('close');
          } }, model: { value: _vm.open_, callback: function callback($$v) {
            _vm.open_ = $$v;
          }, expression: "open_" } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer',
    props: {
      permanent: Boolean,
      persistent: Boolean,
      temporary: Boolean,
      drawerType: {
        type: String,
        validator: function validator(val) {
          return val in ['temporary', 'persistent', 'permanent'];
        }
      },
      toolbarSpacer: Boolean,
      toggleOn: String,
      toggleOnSource: { type: Object, required: false },
      openOn: String,
      openOnSource: { type: Object, required: false },
      closeOn: String,
      closeOnSource: { type: Object, required: false }
    },
    provide: function provide() {
      return { mdcDrawer: this };
    },
    data: function data() {
      return {
        small: false,
        large: false,
        open_: false
      };
    },

    components: {
      'mdc-permanent-drawer': mdcPermanentDrawer,
      'mdc-persistent-drawer': mdcPersistentDrawer,
      'mdc-temporary-drawer': mdcTemporaryDrawer
    },
    computed: {
      type: function type() {
        if (this.permanent) {
          return 'mdc-permanent-drawer';
        } else if (this.persistent) {
          return 'mdc-persistent-drawer';
        } else if (this.temporary) {
          return 'mdc-temporary-drawer';
        } else {
          switch (this.drawerType) {
            case 'permanent':
              return 'mdc-permanent-drawer';
            case 'persistent':
              return 'mdc-persistent-drawer';
            case 'temporary':
              return 'mdc-temporary-drawer';
            default:
              return this.small ? 'mdc-temporary-drawer' : 'mdc-persistent-drawer';
          }
        }
      },
      isPermanent: function isPermanent() {
        return this.permanent || this.type === 'mdc-permanent-drawer';
      },
      isPersistent: function isPersistent() {
        return this.persistent || this.type === 'mdc-persistent-drawer';
      },
      isTemporary: function isTemporary() {
        return this.temporary || this.type === 'mdc-temporary-drawer';
      },
      isResponsive: function isResponsive() {
        return !(this.permanent || this.persistent || this.temporary || this.drawerType);
      }
    },
    methods: {
      open: function open() {
        this.open_ = true;
      },
      close: function close() {
        this.isPermanent || (this.open_ = false);
      },
      toggle: function toggle() {
        this.isPermanent || (this.isOpen() ? this.close() : this.open());
      },
      isOpen: function isOpen() {
        return this.isPermanent || this.open_;
      },
      refreshMedia: function refreshMedia() {
        this.small = media.small.matches;
        this.large = media.large.matches;
        if (this.isResponsive) {
          if (this.large) {
            this.open();
          } else {
            this.close();
          }
        }
      }
    },
    created: function created() {
      if (window && window.matchMedia) {
        this.small = media.small.matches;
        this.large = media.large.matches;
      }
    },
    mounted: function mounted() {
      var _this = this;

      if (this.toggleOn) {
        var source = this.toggleOnSource || this.$root;
        source.$on(this.toggleOn, function () {
          return _this.toggle();
        });
      }
      if (this.openOn) {
        var _source = this.openOnSource || this.$root;
        _source.$on(this.openOn, function () {
          return _this.open();
        });
      }
      if (this.closeOn) {
        var _source2 = this.closeOnSource || this.$root;
        _source2.$on(this.closeOn, function () {
          return _this.close();
        });
      }
      media.small.addListener(this.refreshMedia);
      media.large.addListener(this.refreshMedia);
      this.$nextTick(function () {
        return _this.refreshMedia();
      });
    },
    beforeDestroy: function beforeDestroy() {
      media.small.removeListener(this.refreshMedia);
      media.large.removeListener(this.refreshMedia);
    }
  };

  var mdcDrawerLayout = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "mdc-drawer-layout" }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer-layout'
  };

  var mdcDrawerHeader = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.show ? _c('header', { staticClass: "mdc-drawer-header mdc-drawer__header" }, [_c('div', { staticClass: "mdc-drawer__header-content" }, [_vm._t("default")], 2)]) : _vm._e();
    }, staticRenderFns: [],
    name: 'mdc-drawer-header',
    props: {
      'permanent': Boolean,
      'persistent': Boolean,
      'temporary': Boolean
    },
    inject: ['mdcDrawer'],
    computed: {
      show: function show() {
        if (this.temporary || this.persistent || this.permanent) {
          return this.temporary && this.mdcDrawer.isTemporary || this.persistent && this.mdcDrawer.isPersistent || this.permanent && this.mdcDrawer.isPermanent;
        } else {
          return true;
        }
      }
    }
  };

  var mdcDrawerList = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('nav', { staticClass: "mdc-drawer-list mdc-list", class: _vm.classes }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer-list',
    props: {
      'dense': Boolean
    },
    data: function data() {
      return {
        classes: {
          'mdc-list--dense': this.dense
        }
      };
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

  var cssClasses$2 = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings$2 = {
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
  var supportsPassive_$1 = void 0;

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
  function applyPassive$1() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_$1 === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}

      supportsPassive_$1 = isSupported;
    }

    return supportsPassive_$1 ? { passive: true } : false;
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
        return cssClasses$2;
      }
    }, {
      key: 'strings',
      get: function get$$1() {
        return strings$2;
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
          return document.documentElement.addEventListener(evtType, handler, applyPassive$1());
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.removeEventListener(evtType, handler, applyPassive$1());
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

  var mdcDrawerItem = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('custom-link', { staticClass: "mdc-drawer-item mdc-list-item", class: [_vm.classes, _vm.itemClasses], style: _vm.styles, attrs: { "link": _vm.link }, on: { "click": _vm.onClick } }, [_vm.hasStartDetail ? _c('span', { staticClass: "mdc-list-item__graphic" }, [_vm._t("start-detail", [_c('i', { staticClass: "material-icons", attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.startIcon))])])], 2) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'mdc-drawer-item',
    inject: ['mdcDrawer'],
    mixins: [DispatchEventMixin, CustomLinkMixin],
    props: {
      startIcon: String,
      temporaryClose: {
        type: Boolean,
        default: true
      },
      activated: Boolean,
      exactActiveClass: {
        type: String,
        default: 'mdc-list-item--activated'
      }
    },
    data: function data() {
      return {
        classes: {},
        styles: {}
      };
    },

    computed: {
      itemClasses: function itemClasses() {
        return {
          'mdc-list-item--activated': this.activated
        };
      },
      hasStartDetail: function hasStartDetail() {
        return this.startIcon || this.$slots['start-detail'];
      }
    },
    methods: {
      onClick: function onClick(evt) {
        this.mdcDrawer.isTemporary && this.temporaryClose && this.mdcDrawer.close();
        this.dispatchEvent(evt);
      }
    },
    mounted: function mounted() {
      this.ripple = new RippleBase(this);
      this.ripple.init();
    },
    beforeDestroy: function beforeDestroy() {
      this.ripple && this.ripple.destroy();
      this.ripple = null;
    }
  };

  var mdcDrawerDivider = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('hr', { staticClass: "mdc-list-divider" });
    }, staticRenderFns: [],
    name: 'mdc-drawer-divider'
  };

  var plugin = BasePlugin({
    mdcDrawer: mdcDrawer,
    mdcDrawerLayout: mdcDrawerLayout,
    mdcDrawerHeader: mdcDrawerHeader,
    mdcDrawerList: mdcDrawerList,
    mdcDrawerItem: mdcDrawerItem,
    mdcDrawerDivider: mdcDrawerDivider
  });

  autoInit(plugin);

  return plugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmpzIiwic291cmNlcyI6WyIuLi8uLi9jb21wb25lbnRzL2Jhc2UvYXV0by1pbml0LmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2Jhc2UtcGx1Z2luLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1saW5rLmpzIiwiLi4vLi4vY29tcG9uZW50cy9iYXNlL2N1c3RvbS1ldmVudC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvYmFzZS9kaXNwYXRjaC1ldmVudC1taXhpbi5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1wZXJtYW5lbnQtZHJhd2VyLnZ1ZSIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3NsaWRhYmxlL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvYmFzZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3NsaWRhYmxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9zbGlkYWJsZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL3BlcnNpc3RlbnQvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvcGVyc2lzdGVudC9mb3VuZGF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdXRpbC5qcyIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1wZXJzaXN0ZW50LWRyYXdlci52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci90ZW1wb3JhcnkvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdGVtcG9yYXJ5L2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtdGVtcG9yYXJ5LWRyYXdlci52dWUiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtZHJhd2VyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItbGF5b3V0LnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItaGVhZGVyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL21kYy1kcmF3ZXItbGlzdC52dWUiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9hZGFwdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvdXRpbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMiLCIuLi8uLi9jb21wb25lbnRzL3JpcHBsZS9tZGMtcmlwcGxlLWJhc2UuanMiLCIuLi8uLi9jb21wb25lbnRzL2RyYXdlci9tZGMtZHJhd2VyLWl0ZW0udnVlIiwiLi4vLi4vY29tcG9uZW50cy9kcmF3ZXIvbWRjLWRyYXdlci1kaXZpZGVyLnZ1ZSIsIi4uLy4uL2NvbXBvbmVudHMvZHJhd2VyL2luZGV4LmpzIiwiLi4vLi4vY29tcG9uZW50cy9kcmF3ZXIvZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Jbml0IChwbHVnaW4pIHtcbiAgLy8gQXV0by1pbnN0YWxsXG4gIGxldCBfVnVlID0gbnVsbFxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBfVnVlID0gd2luZG93LlZ1ZVxuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLypnbG9iYWwgZ2xvYmFsKi9cbiAgICBfVnVlID0gZ2xvYmFsLlZ1ZVxuICB9XG4gIGlmIChfVnVlKSB7XG4gICAgX1Z1ZS51c2UocGx1Z2luKVxuICB9XG59XG4gICIsImV4cG9ydCBmdW5jdGlvbiBCYXNlUGx1Z2luIChjb21wb25lbnRzKSB7IFxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICdfX1ZFUlNJT05fXycsXG4gICAgaW5zdGFsbDogKHZtKSA9PiB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1trZXldXG4gICAgICAgICAgdm0uY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLGNvbXBvbmVudClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudHNcbiAgfSBcbn1cblxuIiwiZXhwb3J0IGNvbnN0IEN1c3RvbUxpbmsgPSB7XG4gIG5hbWU6ICdjdXN0b20tbGluaycsXG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ2EnIH0sXG4gICAgbGluayA6IE9iamVjdCxcbiAgfSxcbiAgcmVuZGVyIChoLCBjb250ZXh0KSB7XG4gICAgbGV0IGVsZW1lbnQgXG4gICAgbGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LmRhdGEpXG5cbiAgICBpZiAoY29udGV4dC5wcm9wcy5saW5rICYmIGNvbnRleHQucGFyZW50LiRyb3V0ZXIpIHtcbiAgICAgIC8vIHJvdXRlci1saW5rIGNhc2VcbiAgICAgIGVsZW1lbnQgPSBjb250ZXh0LnBhcmVudC4kcm9vdC4kb3B0aW9ucy5jb21wb25lbnRzWydyb3V0ZXItbGluayddIFxuICAgICAgZGF0YS5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe3RhZzogY29udGV4dC5wcm9wcy50YWd9LCBjb250ZXh0LnByb3BzLmxpbmspXG4gICAgICBpZiAoZGF0YS5vbi5jbGljaykge1xuICAgICAgICBkYXRhLm5hdGl2ZU9uID0ge2NsaWNrOiBkYXRhLm9uLmNsaWNrIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZWxlbWVudCBmYWxsYmFja1xuICAgICAgZWxlbWVudCA9IGNvbnRleHQucHJvcHMudGFnIFxuICAgIH0gXG5cbiAgICByZXR1cm4gaChlbGVtZW50LCBkYXRhLCBjb250ZXh0LmNoaWxkcmVuKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21MaW5rTWl4aW4gPSB7XG4gIHByb3BzOiB7XG4gICAgdG86IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgZXhhY3Q6IEJvb2xlYW4sXG4gICAgYXBwZW5kOiBCb29sZWFuLFxuICAgIHJlcGxhY2U6IEJvb2xlYW4sXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBleGFjdEFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbGluayAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50byAmJiB7XG4gICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICBleGFjdDogdGhpcy5leGFjdCxcbiAgICAgICAgYXBwZW5kOiB0aGlzLmFwcGVuZCxcbiAgICAgICAgcmVwbGFjZTogdGhpcy5yZXBsYWNlLFxuICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcbiAgICAgICAgZXhhY3RBY3RpdmVDbGFzczogdGhpcy5leGFjdEFjdGl2ZUNsYXNzLFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50cyA6IHsgXG4gICAgQ3VzdG9tTGluayBcbiAgfVxufSIsIi8qIGdsb2JhbCBDdXN0b21FdmVudCAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEN1c3RvbUV2ZW50IChlbCwgZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgbGV0IGV2dFxuICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpXG4gIH1cbiAgZWwuZGlzcGF0Y2hFdmVudChldnQpXG59XG4iLCJleHBvcnQgY29uc3QgRGlzcGF0Y2hFdmVudE1peGluID0ge1xuICBwcm9wczoge1xuICAgICdldmVudCc6IFN0cmluZyxcbiAgICAnZXZlbnQtdGFyZ2V0JzogT2JqZWN0LFxuICAgICdldmVudC1hcmdzJzogQXJyYXksXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBkaXNwYXRjaEV2ZW50IChldnQpIHtcbiAgICAgIHRoaXMuJGVtaXQoZXZ0LnR5cGUpXG4gICAgICBpZiAodGhpcy5ldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldCB8fCB0aGlzLiRyb290XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5ldmVudEFyZ3MgfHwgW11cbiAgICAgICAgdGFyZ2V0LiRlbWl0KHRoaXMuZXZlbnQsIC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI8dGVtcGxhdGU+XG4gIDxuYXYgY2xhc3M9XCJtZGMtcGVybWFuZW50LWRyYXdlciBtZGMtZHJhd2VyLS1wZXJtYW5lbnQgbWRjLXR5cG9ncmFwaHlcIj5cbiAgICA8bmF2IGNsYXNzPVwibWRjLWRyYXdlcl9fY29udGVudFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1kcmF3ZXJfX3Rvb2xiYXItc3BhY2VyXCIgXG4gICAgICAgIHYtaWY9XCJ0b29sYmFyU3BhY2VyXCI+PC9kaXY+XG4gICAgICA8c2xvdCAvPlxuICAgIDwvbmF2PlxuICA8L25hdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcGVybWFuZW50LWRyYXdlcicsXG4gIHByb3BzOiB7XG4gICAgJ3Rvb2xiYXItc3BhY2VyJzogQm9vbGVhbixcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTID1cbiAgJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCAnICtcbiAgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4XSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IHtNRENGb3VuZGF0aW9uLCBNRENDb21wb25lbnR9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtNRENGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGhhc0NsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgaGFzTmVjZXNzYXJ5RG9tOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnQ6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0OiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclRyYW5zaXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50S2V5ZG93bkhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBzZXRUcmFuc2xhdGVYOiAoLyogdmFsdWU6IG51bWJlciB8IG51bGwgKi8pID0+IHt9LFxuICAgICAgZ2V0Rm9jdXNhYmxlRWxlbWVudHM6ICgpID0+IC8qIE5vZGVMaXN0ICovIHt9LFxuICAgICAgc2F2ZUVsZW1lbnRUYWJTdGF0ZTogKC8qIGVsOiBFbGVtZW50ICovKSA9PiB7fSxcbiAgICAgIHJlc3RvcmVFbGVtZW50VGFiU3RhdGU6ICgvKiBlbDogRWxlbWVudCAqLykgPT4ge30sXG4gICAgICBtYWtlRWxlbWVudFVudGFiYmFibGU6ICgvKiBlbDogRWxlbWVudCAqLykgPT4ge30sXG4gICAgICBub3RpZnlPcGVuOiAoKSA9PiB7fSxcbiAgICAgIG5vdGlmeUNsb3NlOiAoKSA9PiB7fSxcbiAgICAgIGlzUnRsOiAoKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgICAgZ2V0RHJhd2VyV2lkdGg6ICgpID0+IC8qIG51bWJlciAqLyAwLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyLCByb290Q3NzQ2xhc3MsIGFuaW1hdGluZ0Nzc0NsYXNzLCBvcGVuQ3NzQ2xhc3MpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgdGhpcy5yb290Q3NzQ2xhc3NfID0gcm9vdENzc0NsYXNzO1xuICAgIHRoaXMuYW5pbWF0aW5nQ3NzQ2xhc3NfID0gYW5pbWF0aW5nQ3NzQ2xhc3M7XG4gICAgdGhpcy5vcGVuQ3NzQ2xhc3NfID0gb3BlbkNzc0NsYXNzO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCk7XG5cbiAgICB0aGlzLmluZXJ0XyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb21wb25lbnRUb3VjaFN0YXJ0SGFuZGxlcl8gPSAoZXZ0KSA9PiB0aGlzLmhhbmRsZVRvdWNoU3RhcnRfKGV2dCk7XG4gICAgdGhpcy5jb21wb25lbnRUb3VjaE1vdmVIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlVG91Y2hNb3ZlXyhldnQpO1xuICAgIHRoaXMuY29tcG9uZW50VG91Y2hFbmRIYW5kbGVyXyA9IChldnQpID0+IHRoaXMuaGFuZGxlVG91Y2hFbmRfKGV2dCk7XG4gICAgdGhpcy5kb2N1bWVudEtleWRvd25IYW5kbGVyXyA9IChldnQpID0+IHtcbiAgICAgIGlmIChldnQua2V5ICYmIGV2dC5rZXkgPT09ICdFc2NhcGUnIHx8IGV2dC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgUk9PVCA9IHRoaXMucm9vdENzc0NsYXNzXztcbiAgICBjb25zdCBPUEVOID0gdGhpcy5vcGVuQ3NzQ2xhc3NfO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKFJPT1QpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Uk9PVH0gY2xhc3MgcmVxdWlyZWQgaW4gcm9vdCBlbGVtZW50LmApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5oYXNOZWNlc3NhcnlEb20oKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZXF1aXJlZCBET00gbm9kZXMgbWlzc2luZyBpbiAke1JPT1R9IGNvbXBvbmVudC5gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhPUEVOKSkge1xuICAgICAgdGhpcy5pc09wZW5fID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXRhYmluYXRlXygpO1xuICAgICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hzdGFydCcsIHRoaXMuY29tcG9uZW50VG91Y2hTdGFydEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCd0b3VjaG1vdmUnLCB0aGlzLmNvbXBvbmVudFRvdWNoTW92ZUhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCd0b3VjaGVuZCcsIHRoaXMuY29tcG9uZW50VG91Y2hFbmRIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hzdGFydCcsIHRoaXMuY29tcG9uZW50VG91Y2hTdGFydEhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ3RvdWNobW92ZScsIHRoaXMuY29tcG9uZW50VG91Y2hNb3ZlSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigndG91Y2hlbmQnLCB0aGlzLmNvbXBvbmVudFRvdWNoRW5kSGFuZGxlcl8pO1xuICAgIC8vIERlcmVnaXN0ZXIgdGhlIGRvY3VtZW50IGtleWRvd24gaGFuZGxlciBqdXN0IGluIGNhc2UgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgd2hpbGUgdGhlIG1lbnUgaXMgb3Blbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyKHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8pO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIodGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyKHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3ModGhpcy5hbmltYXRpbmdDc3NDbGFzc18pO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3ModGhpcy5vcGVuQ3NzQ2xhc3NfKTtcbiAgICB0aGlzLnJldGFiaW5hdGVfKCk7XG4gICAgLy8gRGVib3VuY2UgbXVsdGlwbGUgY2FsbHNcbiAgICBpZiAoIXRoaXMuaXNPcGVuXykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlPcGVuKCk7XG4gICAgfVxuICAgIHRoaXMuaXNPcGVuXyA9IHRydWU7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyKHRoaXMuZG9jdW1lbnRLZXlkb3duSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcih0aGlzLnRyYW5zaXRpb25FbmRIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyh0aGlzLmFuaW1hdGluZ0Nzc0NsYXNzXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyh0aGlzLm9wZW5Dc3NDbGFzc18pO1xuICAgIHRoaXMuZGV0YWJpbmF0ZV8oKTtcbiAgICAvLyBEZWJvdW5jZSBtdWx0aXBsZSBjYWxsc1xuICAgIGlmICh0aGlzLmlzT3Blbl8pIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ubm90aWZ5Q2xvc2UoKTtcbiAgICB9XG4gICAgdGhpcy5pc09wZW5fID0gZmFsc2U7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuXztcbiAgfVxuXG4gIC8qKlxuICAgKiAgUmVuZGVyIGFsbCBjaGlsZHJlbiBvZiB0aGUgZHJhd2VyIGluZXJ0IHdoZW4gaXQncyBjbG9zZWQuXG4gICAqL1xuICBkZXRhYmluYXRlXygpIHtcbiAgICBpZiAodGhpcy5pbmVydF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNhYmxlRWxlbWVudHMoKTtcbiAgICBpZiAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zYXZlRWxlbWVudFRhYlN0YXRlKGVsZW1lbnRzW2ldKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5tYWtlRWxlbWVudFVudGFiYmFibGUoZWxlbWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaW5lcnRfID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgTWFrZSBhbGwgY2hpbGRyZW4gb2YgdGhlIGRyYXdlciB0YWJiYWJsZSBhZ2FpbiB3aGVuIGl0J3Mgb3Blbi5cbiAgICovXG4gIHJldGFiaW5hdGVfKCkge1xuICAgIGlmICghdGhpcy5pbmVydF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuYWRhcHRlcl8uZ2V0Rm9jdXNhYmxlRWxlbWVudHMoKTtcbiAgICBpZiAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZXN0b3JlRWxlbWVudFRhYlN0YXRlKGVsZW1lbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmluZXJ0XyA9IGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hTdGFydF8oZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKHRoaXMub3BlbkNzc0NsYXNzXykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2dC5wb2ludGVyVHlwZSAmJiBldnQucG9pbnRlclR5cGUgIT09ICd0b3VjaCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRpcmVjdGlvbl8gPSB0aGlzLmFkYXB0ZXJfLmlzUnRsKCkgPyAtMSA6IDE7XG4gICAgdGhpcy5kcmF3ZXJXaWR0aF8gPSB0aGlzLmFkYXB0ZXJfLmdldERyYXdlcldpZHRoKCk7XG4gICAgdGhpcy5zdGFydFhfID0gZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgICB0aGlzLmN1cnJlbnRYXyA9IHRoaXMuc3RhcnRYXztcblxuICAgIHRoaXMudXBkYXRlUmFmXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZURyYXdlcl8uYmluZCh0aGlzKSk7XG4gIH1cblxuICBoYW5kbGVUb3VjaE1vdmVfKGV2dCkge1xuICAgIGlmIChldnQucG9pbnRlclR5cGUgJiYgZXZ0LnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50WF8gPSBldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdLnBhZ2VYIDogZXZ0LnBhZ2VYO1xuICB9XG5cbiAgaGFuZGxlVG91Y2hFbmRfKGV2dCkge1xuICAgIGlmIChldnQucG9pbnRlclR5cGUgJiYgZXZ0LnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcmVwYXJlRm9yVG91Y2hFbmRfKCk7XG5cbiAgICAvLyBEaWQgdGhlIHVzZXIgY2xvc2UgdGhlIGRyYXdlciBieSBtb3JlIHRoYW4gNTAlP1xuICAgIGlmIChNYXRoLmFicyh0aGlzLm5ld1Bvc2l0aW9uXyAvIHRoaXMuZHJhd2VyV2lkdGhfKSA+PSAwLjUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJpZ2dlcmluZyBhbiBvcGVuIGhlcmUgbWVhbnMgd2UnbGwgZ2V0IGEgbmljZSBhbmltYXRpb24gYmFjayB0byB0aGUgZnVsbHkgb3BlbiBzdGF0ZS5cbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByZXBhcmVGb3JUb3VjaEVuZF8oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVSYWZfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldFRyYW5zbGF0ZVgobnVsbCk7XG4gIH1cblxuICB1cGRhdGVEcmF3ZXJfKCkge1xuICAgIHRoaXMudXBkYXRlUmFmXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZURyYXdlcl8uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXRUcmFuc2xhdGVYKHRoaXMubmV3UG9zaXRpb25fKTtcbiAgfVxuXG4gIGdldCBuZXdQb3NpdGlvbl8oKSB7XG4gICAgbGV0IG5ld1BvcyA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5kaXJlY3Rpb25fID09PSAxKSB7XG4gICAgICBuZXdQb3MgPSBNYXRoLm1pbigwLCB0aGlzLmN1cnJlbnRYXyAtIHRoaXMuc3RhcnRYXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1BvcyA9IE1hdGgubWF4KDAsIHRoaXMuY3VycmVudFhfIC0gdGhpcy5zdGFydFhfKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3UG9zO1xuICB9XG5cbiAgaXNSb290VHJhbnNpdGlvbmluZ0V2ZW50VGFyZ2V0XygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gdHJ1ZSBvciBmYWxzZVxuICAgIC8vIGlmIHRoZSBldmVudCB0YXJnZXQgaXMgdGhlIHJvb3QgZXZlbnQgdGFyZ2V0IGN1cnJlbnRseSB0cmFuc2l0aW9uaW5nLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhbmRsZVRyYW5zaXRpb25FbmRfKGV2dCkge1xuICAgIGlmICh0aGlzLmlzUm9vdFRyYW5zaXRpb25pbmdFdmVudFRhcmdldF8oZXZ0LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3ModGhpcy5hbmltYXRpbmdDc3NDbGFzc18pO1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXIodGhpcy50cmFuc2l0aW9uRW5kSGFuZGxlcl8pO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCB7Rk9DVVNBQkxFX0VMRU1FTlRTfSBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQge01EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbn0gZnJvbSAnLi9mb3VuZGF0aW9uJztcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Rk9DVVNBQkxFX0VMRU1FTlRTfSBmcm9tICcuLi9zbGlkYWJsZS9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBjc3NDbGFzc2VzID0ge1xuICBST09UOiAnbWRjLWRyYXdlci0tcGVyc2lzdGVudCcsXG4gIE9QRU46ICdtZGMtZHJhd2VyLS1vcGVuJyxcbiAgQU5JTUFUSU5HOiAnbWRjLWRyYXdlci0tYW5pbWF0aW5nJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdzID0ge1xuICBEUkFXRVJfU0VMRUNUT1I6ICcubWRjLWRyYXdlci0tcGVyc2lzdGVudCAubWRjLWRyYXdlcl9fZHJhd2VyJyxcbiAgRk9DVVNBQkxFX0VMRU1FTlRTLFxuICBPUEVOX0VWRU5UOiAnTURDUGVyc2lzdGVudERyYXdlcjpvcGVuJyxcbiAgQ0xPU0VfRVZFTlQ6ICdNRENQZXJzaXN0ZW50RHJhd2VyOmNsb3NlJyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge01EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbn0gZnJvbSAnLi4vc2xpZGFibGUvaW5kZXgnO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uIGV4dGVuZHMgTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihNRENTbGlkYWJsZURyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIHtcbiAgICAgIGlzRHJhd2VyOiAoKSA9PiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihcbiAgICAgIE9iamVjdC5hc3NpZ24oTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpLFxuICAgICAgTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5ST09ULFxuICAgICAgTURDUGVyc2lzdGVudERyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5BTklNQVRJTkcsXG4gICAgICBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbi5jc3NDbGFzc2VzLk9QRU4pO1xuICB9XG5cbiAgaXNSb290VHJhbnNpdGlvbmluZ0V2ZW50VGFyZ2V0XyhlbCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmlzRHJhd2VyKGVsKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgVEFCX0RBVEEgPSAnZGF0YS1tZGMtdGFiaW5kZXgnO1xuY29uc3QgVEFCX0RBVEFfSEFORExFRCA9ICdkYXRhLW1kYy10YWJpbmRleC1oYW5kbGVkJztcblxubGV0IHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV87XG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLy8gUmVtYXAgdG91Y2ggZXZlbnRzIHRvIHBvaW50ZXIgZXZlbnRzLCBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgdG91Y2ggZXZlbnRzLlxuZXhwb3J0IGZ1bmN0aW9uIHJlbWFwRXZlbnQoZXZlbnROYW1lLCBnbG9iYWxPYmogPSB3aW5kb3cpIHtcbiAgaWYgKCEoJ29udG91Y2hzdGFydCcgaW4gZ2xvYmFsT2JqLmRvY3VtZW50KSkge1xuICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XG4gICAgY2FzZSAndG91Y2hzdGFydCc6XG4gICAgICByZXR1cm4gJ3BvaW50ZXJkb3duJztcbiAgICBjYXNlICd0b3VjaG1vdmUnOlxuICAgICAgcmV0dXJuICdwb2ludGVybW92ZSc7XG4gICAgY2FzZSAndG91Y2hlbmQnOlxuICAgICAgcmV0dXJuICdwb2ludGVydXAnO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZXZlbnROYW1lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBldmVudE5hbWU7XG59XG5cbi8vIENob29zZSB0aGUgY29ycmVjdCB0cmFuc2Zvcm0gcHJvcGVydHkgdG8gdXNlIG9uIHRoZSBjdXJyZW50IGJyb3dzZXIuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBjb25zdCBlbCA9IGdsb2JhbE9iai5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWUgPSAoJ3RyYW5zZm9ybScgaW4gZWwuc3R5bGUgPyAndHJhbnNmb3JtJyA6ICctd2Via2l0LXRyYW5zZm9ybScpO1xuICAgIHN0b3JlZFRyYW5zZm9ybVByb3BlcnR5TmFtZV8gPSB0cmFuc2Zvcm1Qcm9wZXJ0eU5hbWU7XG4gIH1cblxuICByZXR1cm4gc3RvcmVkVHJhbnNmb3JtUHJvcGVydHlOYW1lXztcbn1cblxuLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBDU1MgcHJvcGVydGllcy5cbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0c0Nzc0N1c3RvbVByb3BlcnRpZXMoZ2xvYmFsT2JqID0gd2luZG93KSB7XG4gIGlmICgnQ1NTJyBpbiBnbG9iYWxPYmopIHtcbiAgICByZXR1cm4gZ2xvYmFsT2JqLkNTUy5zdXBwb3J0cygnKC0tY29sb3I6IHJlZCknKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8vIFNhdmUgdGhlIHRhYiBzdGF0ZSBmb3IgYW4gZWxlbWVudC5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlRWxlbWVudFRhYlN0YXRlKGVsKSB7XG4gIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoVEFCX0RBVEEsIGVsLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSk7XG4gIH1cbiAgZWwuc2V0QXR0cmlidXRlKFRBQl9EQVRBX0hBTkRMRUQsIHRydWUpO1xufVxuXG4vLyBSZXN0b3JlIHRoZSB0YWIgc3RhdGUgZm9yIGFuIGVsZW1lbnQsIGlmIGl0IHdhcyBzYXZlZC5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlRWxlbWVudFRhYlN0YXRlKGVsKSB7XG4gIC8vIE9ubHkgbW9kaWZ5IGVsZW1lbnRzIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCwgaW4gY2FzZSBhbnl0aGluZyB3YXMgZHluYW1pY2FsbHkgYWRkZWQgc2luY2Ugd2Ugc2F2ZWQgc3RhdGUuXG4gIGlmIChlbC5oYXNBdHRyaWJ1dGUoVEFCX0RBVEFfSEFORExFRCkpIHtcbiAgICBpZiAoZWwuaGFzQXR0cmlidXRlKFRBQl9EQVRBKSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIGVsLmdldEF0dHJpYnV0ZShUQUJfREFUQSkpO1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFRBQl9EQVRBKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgIH1cbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoVEFCX0RBVEFfSEFORExFRCk7XG4gIH1cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGFzaWRlIGNsYXNzPVwibWRjLXBlcnNpc3RlbnQtZHJhd2VyIG1kYy1kcmF3ZXItLXBlcnNpc3RlbnQgbWRjLXR5cG9ncmFwaHlcIiA6Y2xhc3M9XCJjbGFzc2VzXCI+XG4gICAgPG5hdiByZWY9XCJkcmF3ZXJcIiBjbGFzcz1cIm1kYy1kcmF3ZXJfX2RyYXdlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1kcmF3ZXJfX3Rvb2xiYXItc3BhY2VyXCIgXG4gICAgICAgIHYtaWY9XCJ0b29sYmFyU3BhY2VyXCI+PC9kaXY+XG4gICAgICA8c2xvdCAvPlxuICAgIDwvbmF2PlxuICA8L2FzaWRlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvZHJhd2VyL3BlcnNpc3RlbnQvZm91bmRhdGlvbidcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnQG1hdGVyaWFsL2RyYXdlci91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtcGVyc2lzdGVudC1kcmF3ZXInLFxuICBtb2RlbDoge1xuICAgIHByb3A6ICdvcGVuJyxcbiAgICBldmVudDogJ2NoYW5nZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICAndG9vbGJhci1zcGFjZXInOiBCb29sZWFuLFxuICAgICdvcGVuJzpCb29sZWFuXG4gIH0sXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGFzc2VzOiB7fSxcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3BlbigpIHtcbiAgICAgIHRoaXMuX3JlZnJlc2goKVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIF9yZWZyZXNoKCkge1xuICAgICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLm9wZW4oKSAgICAgICAgICBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmNsb3NlKCkgICAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICBjb25zdCB7Rk9DVVNBQkxFX0VMRU1FTlRTfSA9IE1EQ1BlcnNpc3RlbnREcmF3ZXJGb3VuZGF0aW9uLnN0cmluZ3NcblxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLiRzZXQodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgdGhpcy4kZGVsZXRlKHRoaXMuY2xhc3NlcywgY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKVxuICAgICAgfSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLiRyZWZzLmRyYXdlclxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodXRpbC5yZW1hcEV2ZW50KGV2dCksIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKHV0aWwucmVtYXBFdmVudChldnQpLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIodXRpbC5yZW1hcEV2ZW50KGV2dCksIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5yZW1vdmVFdmVudExpc3RlbmVyKHV0aWwucmVtYXBFdmVudChldnQpLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZ2V0RHJhd2VyV2lkdGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuZHJhd2VyLm9mZnNldFdpZHRoXG4gICAgICB9LFxuICAgICAgc2V0VHJhbnNsYXRlWDogKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgIHV0aWwuZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKCksXG4gICAgICAgICAgdmFsdWUgPT09IG51bGwgPyBudWxsIDogYHRyYW5zbGF0ZVgoJHt2YWx1ZX1weClgXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICBnZXRGb2N1c2FibGVFbGVtZW50czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5kcmF3ZXIucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFMpXG4gICAgICB9LFxuICAgICAgc2F2ZUVsZW1lbnRUYWJTdGF0ZTogKGVsKSA9PiB7XG4gICAgICAgIHV0aWwuc2F2ZUVsZW1lbnRUYWJTdGF0ZShlbClcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRWxlbWVudFRhYlN0YXRlOiAoZWwpID0+IHtcbiAgICAgICAgdXRpbC5yZXN0b3JlRWxlbWVudFRhYlN0YXRlKGVsKVxuICAgICAgfSxcbiAgICAgIG1ha2VFbGVtZW50VW50YWJiYWJsZTogKGVsKSA9PiB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSlcbiAgICAgIH0sXG4gICAgICBub3RpZnlPcGVuOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsdHJ1ZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnb3BlbicpXG4gICAgICB9LFxuICAgICAgbm90aWZ5Q2xvc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJyxmYWxzZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKVxuICAgICAgfSxcbiAgICAgIGlzUnRsOiAoKSA9PiB7XG4gICAgICAgIC8qIGdsb2JhbCBnZXRDb21wdXRlZFN0eWxlICovXG4gICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCdcbiAgICAgIH0sXG4gICAgICBpc0RyYXdlcjogKGVsKSA9PiB7XG4gICAgICAgIHJldHVybiBlbCA9PT0gdGhpcy4kcmVmcy5kcmF3ZXJcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uaW5pdCgpICBcbiAgICB0aGlzLl9yZWZyZXNoKClcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5kZXN0cm95KClcbiAgICB0aGlzLmZvdW5kYXRpb24gPSBudWxsXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtGT0NVU0FCTEVfRUxFTUVOVFN9IGZyb20gJy4uL3NsaWRhYmxlL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFJPT1Q6ICdtZGMtZHJhd2VyLS10ZW1wb3JhcnknLFxuICBPUEVOOiAnbWRjLWRyYXdlci0tb3BlbicsXG4gIEFOSU1BVElORzogJ21kYy1kcmF3ZXItLWFuaW1hdGluZycsXG4gIFNDUk9MTF9MT0NLOiAnbWRjLWRyYXdlci1zY3JvbGwtbG9jaycsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RyaW5ncyA9IHtcbiAgRFJBV0VSX1NFTEVDVE9SOiAnLm1kYy1kcmF3ZXItLXRlbXBvcmFyeSAubWRjLWRyYXdlcl9fZHJhd2VyJyxcbiAgT1BBQ0lUWV9WQVJfTkFNRTogJy0tbWRjLXRlbXBvcmFyeS1kcmF3ZXItb3BhY2l0eScsXG4gIEZPQ1VTQUJMRV9FTEVNRU5UUyxcbiAgT1BFTl9FVkVOVDogJ01EQ1RlbXBvcmFyeURyYXdlcjpvcGVuJyxcbiAgQ0xPU0VfRVZFTlQ6ICdNRENUZW1wb3JhcnlEcmF3ZXI6Y2xvc2UnLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7TURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9ufSBmcm9tICcuLi9zbGlkYWJsZS9pbmRleCc7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbiBleHRlbmRzIE1EQ1NsaWRhYmxlRHJhd2VyRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCB7XG4gICAgICBhZGRCb2R5Q2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVCb2R5Q2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBpc0RyYXdlcjogKCkgPT4gZmFsc2UsXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgZXZlbnRUYXJnZXRIYXNDbGFzczogKC8qIHRhcmdldDogRXZlbnRUYXJnZXQsIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiAvKiBib29sZWFuICovIGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKFxuICAgICAgT2JqZWN0LmFzc2lnbihNRENUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSxcbiAgICAgIE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5ST09ULFxuICAgICAgTURDVGVtcG9yYXJ5RHJhd2VyRm91bmRhdGlvbi5jc3NDbGFzc2VzLkFOSU1BVElORyxcbiAgICAgIE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5PUEVOKTtcblxuICAgIHRoaXMuY29tcG9uZW50Q2xpY2tIYW5kbGVyXyA9IChldnQpID0+IHtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmV2ZW50VGFyZ2V0SGFzQ2xhc3MoZXZ0LnRhcmdldCwgY3NzQ2xhc3Nlcy5ST09UKSkge1xuICAgICAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpbml0KCkge1xuICAgIHN1cGVyLmluaXQoKTtcblxuICAgIC8vIE1ha2UgYnJvd3NlciBhd2FyZSBvZiBjdXN0b20gcHJvcGVydHkgYmVpbmcgdXNlZCBpbiB0aGlzIGVsZW1lbnQuXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgY2VydGFpbiB0eXBlcyBvZiBoYXJkLXRvLXJlcHJvZHVjZSBoZWlzZW5idWdzLlxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoMCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNvbXBvbmVudENsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2NsaWNrJywgdGhpcy5jb21wb25lbnRDbGlja0hhbmRsZXJfKTtcbiAgICB0aGlzLmVuYWJsZVNjcm9sbF8oKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5kaXNhYmxlU2Nyb2xsXygpO1xuICAgIC8vIE1ha2Ugc3VyZSBjdXN0b20gcHJvcGVydHkgdmFsdWVzIGFyZSBjbGVhcmVkIGJlZm9yZSBzdGFydGluZy5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKCcnKTtcblxuICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIC8vIE1ha2Ugc3VyZSBjdXN0b20gcHJvcGVydHkgdmFsdWVzIGFyZSBjbGVhcmVkIGJlZm9yZSBtYWtpbmcgYW55IGNoYW5nZXMuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZSgnJyk7XG5cbiAgICBzdXBlci5jbG9zZSgpO1xuICB9XG5cbiAgcHJlcGFyZUZvclRvdWNoRW5kXygpIHtcbiAgICBzdXBlci5wcmVwYXJlRm9yVG91Y2hFbmRfKCk7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKCcnKTtcbiAgfVxuXG4gIHVwZGF0ZURyYXdlcl8oKSB7XG4gICAgc3VwZXIudXBkYXRlRHJhd2VyXygpO1xuXG4gICAgY29uc3QgbmV3T3BhY2l0eSA9IE1hdGgubWF4KDAsIDEgKyB0aGlzLmRpcmVjdGlvbl8gKiAodGhpcy5uZXdQb3NpdGlvbl8gLyB0aGlzLmRyYXdlcldpZHRoXykpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUobmV3T3BhY2l0eSk7XG4gIH1cblxuICBpc1Jvb3RUcmFuc2l0aW9uaW5nRXZlbnRUYXJnZXRfKGVsKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uaXNEcmF3ZXIoZWwpO1xuICB9XG5cbiAgaGFuZGxlVHJhbnNpdGlvbkVuZF8oZXZ0KSB7XG4gICAgc3VwZXIuaGFuZGxlVHJhbnNpdGlvbkVuZF8oZXZ0KTtcbiAgICBpZiAoIXRoaXMuaXNPcGVuXykge1xuICAgICAgdGhpcy5lbmFibGVTY3JvbGxfKCk7XG4gICAgfVxuICB9O1xuXG4gIGRpc2FibGVTY3JvbGxfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQm9keUNsYXNzKGNzc0NsYXNzZXMuU0NST0xMX0xPQ0spO1xuICB9XG5cbiAgZW5hYmxlU2Nyb2xsXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUJvZHlDbGFzcyhjc3NDbGFzc2VzLlNDUk9MTF9MT0NLKTtcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxuICA8YXNpZGUgY2xhc3M9XCJtZGMtdGVtcG9yYXJ5LWRyYXdlciBtZGMtZHJhd2VyLS10ZW1wb3JhcnkgbWRjLXR5cG9ncmFwaHlcIiA6Y2xhc3M9XCJjbGFzc2VzXCI+XG4gICAgPG5hdiByZWY9XCJkcmF3ZXJcIiBjbGFzcz1cIm1kYy1kcmF3ZXJfX2RyYXdlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kYy1kcmF3ZXJfX3Rvb2xiYXItc3BhY2VyXCIgdi1pZj1cInRvb2xiYXJTcGFjZXJcIj48L2Rpdj5cbiAgICAgIDxzbG90IC8+XG4gICAgPC9uYXY+XG4gIDwvYXNpZGU+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2RyYXdlci90ZW1wb3JhcnkvZm91bmRhdGlvbidcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnQG1hdGVyaWFsL2RyYXdlci91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtZGMtdGVtcG9yYXJ5LWRyYXdlcicsXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ29wZW4nLFxuICAgIGV2ZW50OiAnY2hhbmdlJ1xuICB9LFxuICBwcm9wczoge1xuICAgICdvcGVuJzogQm9vbGVhbixcbiAgICAndG9vbGJhci1zcGFjZXInOiBCb29sZWFuLFxuICB9LFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIG9wZW4oKSB7XG4gICAgICB0aGlzLl9yZWZyZXNoKClcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBfcmVmcmVzaCgpIHtcbiAgICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5vcGVuKCkgICAgICAgICAgXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uICYmIHRoaXMuZm91bmRhdGlvbi5jbG9zZSgpICAgICAgICAgIFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgY29uc3Qge0ZPQ1VTQUJMRV9FTEVNRU5UUywgT1BBQ0lUWV9WQVJfTkFNRX0gPSBcbiAgICAgIE1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24uc3RyaW5nc1xuICAgIFxuICAgIHRoaXMuZm91bmRhdGlvbiA9IG5ldyBNRENUZW1wb3JhcnlEcmF3ZXJGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLmNsYXNzZXMsIGNsYXNzTmFtZSwgdHJ1ZSlcbiAgICAgIH0sXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICB0aGlzLiRkZWxldGUodGhpcy5jbGFzc2VzLCBjbGFzc05hbWUpXG4gICAgICB9LFxuICAgICAgaGFzQ2xhc3M6IChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpXG4gICAgICB9LFxuICAgICAgYWRkQm9keUNsYXNzOiAoY2xhc3NOYW1lKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUJvZHlDbGFzczogKGNsYXNzTmFtZSkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBldmVudFRhcmdldEhhc0NsYXNzOiAodGFyZ2V0LCBjbGFzc05hbWUpID0+IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSxcbiAgICAgIGhhc05lY2Vzc2FyeURvbTogKCkgPT4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLiRyZWZzLmRyYXdlclxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodXRpbC5yZW1hcEV2ZW50KGV2dCksIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKHV0aWwucmVtYXBFdmVudChldnQpLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIodXRpbC5yZW1hcEV2ZW50KGV2dCksIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlckRyYXdlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dCwgaGFuZGxlcikgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmRyYXdlci5yZW1vdmVFdmVudExpc3RlbmVyKHV0aWwucmVtYXBFdmVudChldnQpLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkVuZEhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBoYW5kbGVyKVxuICAgICAgfSxcbiAgICAgIGRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5kcmF3ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlcjogKGhhbmRsZXIpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZ2V0RHJhd2VyV2lkdGg6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuZHJhd2VyLm9mZnNldFdpZHRoXG4gICAgICB9LFxuICAgICAgc2V0VHJhbnNsYXRlWDogKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuZHJhd2VyLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgIHV0aWwuZ2V0VHJhbnNmb3JtUHJvcGVydHlOYW1lKCksXG4gICAgICAgICAgdmFsdWUgPT09IG51bGwgPyBudWxsIDogYHRyYW5zbGF0ZVgoJHt2YWx1ZX1weClgXG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh1dGlsLnN1cHBvcnRzQ3NzQ3VzdG9tUHJvcGVydGllcygpKSB7XG4gICAgICAgICAgdGhpcy4kZWwuc3R5bGUuc2V0UHJvcGVydHkoT1BBQ0lUWV9WQVJfTkFNRSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXRGb2N1c2FibGVFbGVtZW50czogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5kcmF3ZXIucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFMpXG4gICAgICB9LFxuICAgICAgc2F2ZUVsZW1lbnRUYWJTdGF0ZTogKGVsKSA9PiB7XG4gICAgICAgIHV0aWwuc2F2ZUVsZW1lbnRUYWJTdGF0ZShlbClcbiAgICAgIH0sXG4gICAgICByZXN0b3JlRWxlbWVudFRhYlN0YXRlOiAoZWwpID0+IHtcbiAgICAgICAgdXRpbC5yZXN0b3JlRWxlbWVudFRhYlN0YXRlKGVsKVxuICAgICAgfSxcbiAgICAgIG1ha2VFbGVtZW50VW50YWJiYWJsZTogKGVsKSA9PiB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSlcbiAgICAgIH0sXG4gICAgICBub3RpZnlPcGVuOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsdHJ1ZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnb3BlbicpXG4gICAgICB9LFxuICAgICAgbm90aWZ5Q2xvc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJyxmYWxzZSlcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKVxuICAgICAgfSxcbiAgICAgIGlzUnRsOiAoKSA9PiB7XG4gICAgICAgIC8qIGdsb2JhbCBnZXRDb21wdXRlZFN0eWxlICovXG4gICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKHRoaXMuJGVsKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCdcbiAgICAgIH0sXG4gICAgICBpc0RyYXdlcjogKGVsKSA9PiBlbCA9PT0gdGhpcy4kcmVmcy5kcmF3ZXIsXG4gICAgfSlcbiAgICB0aGlzLmZvdW5kYXRpb24gJiYgdGhpcy5mb3VuZGF0aW9uLmluaXQoKSAgXG4gICAgdGhpcy5fcmVmcmVzaCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbiAmJiB0aGlzLmZvdW5kYXRpb24uZGVzdHJveSgpXG4gICAgdGhpcy5mb3VuZGF0aW9uID0gbnVsbFxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cclxuICA8Y29tcG9uZW50ICByZWY9XCJkcmF3ZXJcIiBjbGFzcz1cIm1kYy1kcmF3ZXJcIlxyXG4gICAgICA6aXM9XCJ0eXBlXCIgdi1tb2RlbD1cIm9wZW5fXCJcclxuICAgICAgOnRvb2xiYXItc3BhY2VyPVwidG9vbGJhclNwYWNlclwiXHJcbiAgICAgIEBjaGFuZ2U9XCIkcm9vdC4kZW1pdCgnbWRjOmxheW91dCcpXCIgXHJcbiAgICAgIEBvcGVuPVwiJGVtaXQoJ29wZW4nKVwiIFxyXG4gICAgICBAY2xvc2U9XCIkZW1pdCgnY2xvc2UnKVwiID5cclxuICAgIDxzbG90IC8+XHJcbiAgPC9jb21wb25lbnQ+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgbWRjUGVybWFuZW50RHJhd2VyIGZyb20gJy4vbWRjLXBlcm1hbmVudC1kcmF3ZXIudnVlJ1xyXG5pbXBvcnQgbWRjUGVyc2lzdGVudERyYXdlciBmcm9tICcuL21kYy1wZXJzaXN0ZW50LWRyYXdlci52dWUnXHJcbmltcG9ydCBtZGNUZW1wb3JhcnlEcmF3ZXIgZnJvbSAnLi9tZGMtdGVtcG9yYXJ5LWRyYXdlci52dWUnXHJcblxyXG5jb25zdCBtZWRpYSA9IG5ldyBjbGFzcyB7XHJcbiAgZ2V0IHNtYWxsICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zbWFsbCB8fCAodGhpcy5fc21hbGwgPVxyXG4gICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKG1heC13aWR0aDogODM5cHgpJykpXHJcbiAgfVxyXG5cclxuICBnZXQgbGFyZ2UgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xhcmdlIHx8ICh0aGlzLl9sYXJnZSA9XHJcbiAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXdpZHRoOiAxMjAwcHgpJykpXHJcbiAgfVxyXG59KClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBuYW1lOiAnbWRjLWRyYXdlcicsXHJcbiAgcHJvcHM6IHtcclxuICAgIHBlcm1hbmVudDogQm9vbGVhbixcclxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXHJcbiAgICB0ZW1wb3Jhcnk6IEJvb2xlYW4sXHJcbiAgICBkcmF3ZXJUeXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsaWRhdG9yOiAodmFsKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCBpbiBbJ3RlbXBvcmFyeScsICdwZXJzaXN0ZW50JywgJ3Blcm1hbmVudCddXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0b29sYmFyU3BhY2VyOiBCb29sZWFuLFxyXG4gICAgdG9nZ2xlT246IFN0cmluZyxcclxuICAgIHRvZ2dsZU9uU291cmNlOiB7dHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2V9LFxyXG4gICAgb3Blbk9uOiBTdHJpbmcsXHJcbiAgICBvcGVuT25Tb3VyY2U6IHt0eXBlOiBPYmplY3QsIHJlcXVpcmVkOiBmYWxzZX0sXHJcbiAgICBjbG9zZU9uOiBTdHJpbmcsXHJcbiAgICBjbG9zZU9uU291cmNlOiB7dHlwZTogT2JqZWN0LCByZXF1aXJlZDogZmFsc2V9LFxyXG4gIH0sXHJcbiAgcHJvdmlkZSAoKSB7XHJcbiAgICByZXR1cm4geyBtZGNEcmF3ZXI6IHRoaXMgfVxyXG4gIH0sXHJcbiAgZGF0YSAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzbWFsbDogZmFsc2UsXHJcbiAgICAgIGxhcmdlOiBmYWxzZSxcclxuICAgICAgb3Blbl86IGZhbHNlLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgJ21kYy1wZXJtYW5lbnQtZHJhd2VyJzogbWRjUGVybWFuZW50RHJhd2VyLFxyXG4gICAgJ21kYy1wZXJzaXN0ZW50LWRyYXdlcic6IG1kY1BlcnNpc3RlbnREcmF3ZXIsXHJcbiAgICAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInOiBtZGNUZW1wb3JhcnlEcmF3ZXJcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICB0eXBlICgpIHtcclxuICAgICAgaWYgKHRoaXMucGVybWFuZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICdtZGMtcGVybWFuZW50LWRyYXdlcidcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnBlcnNpc3RlbnQpIHtcclxuICAgICAgICByZXR1cm4gJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRlbXBvcmFyeSkge1xyXG4gICAgICAgIHJldHVybiAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmRyYXdlclR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ3Blcm1hbmVudCc6XHJcbiAgICAgICAgICAgIHJldHVybiAnbWRjLXBlcm1hbmVudC1kcmF3ZXInO1xyXG4gICAgICAgICAgY2FzZSAncGVyc2lzdGVudCc6XHJcbiAgICAgICAgICAgIHJldHVybiAnbWRjLXBlcnNpc3RlbnQtZHJhd2VyJztcclxuICAgICAgICAgIGNhc2UgJ3RlbXBvcmFyeSc6XHJcbiAgICAgICAgICAgIHJldHVybiAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc21hbGwgPyAnbWRjLXRlbXBvcmFyeS1kcmF3ZXInIDogJ21kYy1wZXJzaXN0ZW50LWRyYXdlcidcclxuICAgICAgICB9XHJcbiAgICAgIH0gIFxyXG4gICAgfSxcclxuICAgIGlzUGVybWFuZW50ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGVybWFuZW50IHx8IHRoaXMudHlwZSA9PT0gJ21kYy1wZXJtYW5lbnQtZHJhd2VyJ1xyXG4gICAgfSxcclxuICAgIGlzUGVyc2lzdGVudCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBlcnNpc3RlbnQgfHwgdGhpcy50eXBlID09PSAnbWRjLXBlcnNpc3RlbnQtZHJhd2VyJ1xyXG4gICAgfSxcclxuICAgIGlzVGVtcG9yYXJ5ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGVtcG9yYXJ5IHx8IHRoaXMudHlwZSA9PT0gJ21kYy10ZW1wb3JhcnktZHJhd2VyJ1xyXG4gICAgfSxcclxuICAgIGlzUmVzcG9uc2l2ZSAoKSB7XHJcbiAgICAgIHJldHVybiAhKHRoaXMucGVybWFuZW50IHx8IHRoaXMucGVyc2lzdGVudCB8fCB0aGlzLnRlbXBvcmFyeSB8fCB0aGlzLmRyYXdlclR5cGUpXHJcbiAgICB9XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvcGVuICgpIHtcclxuICAgICAgdGhpcy5vcGVuXyA9IHRydWVcclxuICAgIH0sXHJcbiAgICBjbG9zZSAoKSB7XHJcbiAgICAgIHRoaXMuaXNQZXJtYW5lbnQgfHwgKHRoaXMub3Blbl8gPSBmYWxzZSlcclxuICAgIH0sXHJcbiAgICB0b2dnbGUgKCkge1xyXG4gICAgICB0aGlzLmlzUGVybWFuZW50IHx8ICh0aGlzLmlzT3BlbigpID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCkpXHJcbiAgICB9LFxyXG4gICAgaXNPcGVuICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaXNQZXJtYW5lbnR8fCAoIHRoaXMub3Blbl8gKVxyXG4gICAgfSxcclxuICAgIHJlZnJlc2hNZWRpYSAoKSB7XHJcbiAgICAgIHRoaXMuc21hbGwgPSBtZWRpYS5zbWFsbC5tYXRjaGVzXHJcbiAgICAgIHRoaXMubGFyZ2UgPSBtZWRpYS5sYXJnZS5tYXRjaGVzXHJcbiAgICAgIGlmICh0aGlzLmlzUmVzcG9uc2l2ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhcmdlKSB7XHJcbiAgICAgICAgICB0aGlzLm9wZW4oKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2xvc2UoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlZCAoKSB7XHJcbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5tYXRjaE1lZGlhKSB7XHJcbiAgICAgIHRoaXMuc21hbGwgPSBtZWRpYS5zbWFsbC5tYXRjaGVzXHJcbiAgICAgIHRoaXMubGFyZ2UgPSBtZWRpYS5sYXJnZS5tYXRjaGVzXHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkICgpIHtcclxuICAgIGlmICh0aGlzLnRvZ2dsZU9uKSB7XHJcbiAgICAgIGxldCBzb3VyY2UgPSB0aGlzLnRvZ2dsZU9uU291cmNlIHx8IHRoaXMuJHJvb3RcclxuICAgICAgc291cmNlLiRvbih0aGlzLnRvZ2dsZU9uLCAoKSA9PiB0aGlzLnRvZ2dsZSgpKVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3Blbk9uKSB7XHJcbiAgICAgIGxldCBzb3VyY2UgPSB0aGlzLm9wZW5PblNvdXJjZSB8fCB0aGlzLiRyb290XHJcbiAgICAgIHNvdXJjZS4kb24odGhpcy5vcGVuT24sICgpID0+IHRoaXMub3BlbigpKVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY2xvc2VPbikge1xyXG4gICAgICBsZXQgc291cmNlID0gdGhpcy5jbG9zZU9uU291cmNlIHx8IHRoaXMuJHJvb3RcclxuICAgICAgc291cmNlLiRvbih0aGlzLmNsb3NlT24sICgpID0+IHRoaXMuY2xvc2UoKSlcclxuICAgIH1cclxuICAgIG1lZGlhLnNtYWxsLmFkZExpc3RlbmVyKHRoaXMucmVmcmVzaE1lZGlhKVxyXG4gICAgbWVkaWEubGFyZ2UuYWRkTGlzdGVuZXIodGhpcy5yZWZyZXNoTWVkaWEpXHJcbiAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB0aGlzLnJlZnJlc2hNZWRpYSgpKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSAoKSB7XHJcbiAgICBtZWRpYS5zbWFsbC5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlZnJlc2hNZWRpYSlcclxuICAgIG1lZGlhLmxhcmdlLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVmcmVzaE1lZGlhKVxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwibWRjLWRyYXdlci1sYXlvdXRcIj5cbiAgICAgIDxzbG90IC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1kcmF3ZXItbGF5b3V0Jyxcbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8aGVhZGVyIGNsYXNzPVwibWRjLWRyYXdlci1oZWFkZXIgbWRjLWRyYXdlcl9faGVhZGVyXCIgdi1pZj1cInNob3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWRjLWRyYXdlcl9faGVhZGVyLWNvbnRlbnRcIj5cbiAgICAgIDxzbG90IC8+XG4gICAgPC9kaXY+XG4gIDwvaGVhZGVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21kYy1kcmF3ZXItaGVhZGVyJyxcbiAgcHJvcHM6IHtcbiAgICAncGVybWFuZW50JzogQm9vbGVhbixcbiAgICAncGVyc2lzdGVudCc6IEJvb2xlYW4sXG4gICAgJ3RlbXBvcmFyeSc6IEJvb2xlYW5cbiAgfSxcbiAgaW5qZWN0OiBbJ21kY0RyYXdlciddLFxuICBjb21wdXRlZDoge1xuICAgIHNob3cgKCkge1xuICAgICAgaWYgKHRoaXMudGVtcG9yYXJ5IHx8IHRoaXMucGVyc2lzdGVudCB8fCB0aGlzLnBlcm1hbmVudCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudGVtcG9yYXJ5ICYmIHRoaXMubWRjRHJhd2VyLmlzVGVtcG9yYXJ5KSB8fFxuICAgICAgICAgICh0aGlzLnBlcnNpc3RlbnQgJiYgdGhpcy5tZGNEcmF3ZXIuaXNQZXJzaXN0ZW50KSB8fFxuICAgICAgICAgICAgKHRoaXMucGVybWFuZW50ICYmIHRoaXMubWRjRHJhd2VyLmlzUGVybWFuZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8bmF2IGNsYXNzPVwibWRjLWRyYXdlci1saXN0IG1kYy1saXN0XCIgOmNsYXNzPVwiY2xhc3Nlc1wiPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9uYXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWRyYXdlci1saXN0JyxcbiAgcHJvcHM6IHtcbiAgICAnZGVuc2UnOiBCb29sZWFuLFxuICB9LFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge1xuICAgICAgICAnbWRjLWxpc3QtLWRlbnNlJzogdGhpcy5kZW5zZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbn1cbjwvc2NyaXB0PiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7IXt4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4geyF7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7IXtcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHshe1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZShcbiAgICAgICgpID0+IHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpXG4gICAgKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXG4gICAgICAoKSA9PiB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKVxuICAgICk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IXtsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P0V2ZW50fSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc1N1cHBvcnRlZF8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IG51bGwsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcblxuICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gbnVsbDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9XG4gICAgICBlICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIHdyYXBwZWQgaW4gYW4gckFGIGNhbGwgYi9jIHdlYiBicm93c2Vyc1xuICAgICAgLy8gcmVwb3J0IGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW5cbiAgICAgIC8vIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQgPSBudWxsKSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCJpbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2ZvdW5kYXRpb24uanMnXG5pbXBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBnZXRNYXRjaGVzUHJvcGVydHksIGFwcGx5UGFzc2l2ZX0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJ1xuXG5leHBvcnQgY2xhc3MgUmlwcGxlQmFzZSBleHRlbmRzIE1EQ1JpcHBsZUZvdW5kYXRpb24ge1xuXG4gIHN0YXRpYyBnZXQgTUFUQ0hFUyAoKSB7XG4gICAgLyogZ2xvYmFsIEhUTUxFbGVtZW50ICovXG4gICAgcmV0dXJuIFJpcHBsZUJhc2UuX21hdGNoZXMgfHxcbiAgICAgICggUmlwcGxlQmFzZS5fbWF0Y2hlcyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpKVxuICB9XG5cbiAgc3RhdGljIGlzU3VyZmFjZUFjdGl2ZSAocmVmKSB7XG4gICAgcmV0dXJuIHJlZltSaXBwbGVCYXNlLk1BVENIRVNdKCc6YWN0aXZlJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICh2bSwgb3B0aW9ucykge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oe1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KVxuICAgICAgfSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdm0uJGVsW1JpcHBsZUJhc2UuTUFUQ0hFU10oJzphY3RpdmUnKVxuICAgICAgfSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIGFkZENsYXNzIChjbGFzc05hbWUpIHtcbiAgICAgICAgdm0uJHNldCh2bS5jbGFzc2VzLCBjbGFzc05hbWUsIHRydWUpXG4gICAgICB9LFxuICAgICAgcmVtb3ZlQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgICAgICB2bS4kZGVsZXRlKHZtLmNsYXNzZXMsIGNsYXNzTmFtZSlcbiAgICAgIH0sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiB2bS4kZWwuY29udGFpbnModGFyZ2V0KSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHZtLiRlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgIHZtLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4ge1xuICAgICAgICByZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpXG4gICAgICB9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcilcbiAgICAgIH0sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIHZtLiRzZXQodm0uc3R5bGVzLCB2YXJOYW1lLCB2YWx1ZSlcbiAgICAgIH0sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB2bS4kZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIH0sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoe3g6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0fSlcbiAgICAgIH0sXG4gICAgfSwgb3B0aW9ucykpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJpcHBsZU1peGluID0ge1xuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3Nlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfVxuICB9LFxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLnJpcHBsZSA9IG5ldyBSaXBwbGVCYXNlKHRoaXMpXG4gICAgdGhpcy5yaXBwbGUuaW5pdCgpXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMucmlwcGxlLmRlc3Ryb3koKVxuICB9XG59ICAiLCI8dGVtcGxhdGU+XHJcbiAgPGN1c3RvbS1saW5rIDpsaW5rPVwibGlua1wiIFxyXG4gICAgY2xhc3M9XCJtZGMtZHJhd2VyLWl0ZW0gbWRjLWxpc3QtaXRlbVwiIFxyXG4gICAgOmNsYXNzPVwiW2NsYXNzZXMsIGl0ZW1DbGFzc2VzXVwiIDpzdHlsZT1cInN0eWxlc1wiXHJcbiAgICBAY2xpY2s9XCJvbkNsaWNrXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cIm1kYy1saXN0LWl0ZW1fX2dyYXBoaWNcIiB2LWlmPVwiaGFzU3RhcnREZXRhaWxcIj5cclxuICAgICAgPHNsb3QgbmFtZT1cInN0YXJ0LWRldGFpbFwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57e3N0YXJ0SWNvbn19PC9pPlxyXG4gICAgICA8L3Nsb3Q+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c2xvdD48L3Nsb3Q+XHJcbiAgPC9jdXN0b20tbGluaz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCB7RGlzcGF0Y2hFdmVudE1peGluLCBDdXN0b21MaW5rTWl4aW59IGZyb20gJy4uL2Jhc2UnXHJcbmltcG9ydCB7UmlwcGxlQmFzZX0gZnJvbSAnLi4vcmlwcGxlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG5hbWU6ICdtZGMtZHJhd2VyLWl0ZW0nLFxyXG4gIGluamVjdDogWydtZGNEcmF3ZXInXSxcclxuICBtaXhpbnM6IFtEaXNwYXRjaEV2ZW50TWl4aW4sIEN1c3RvbUxpbmtNaXhpbl0sXHJcbiAgcHJvcHM6IHtcclxuICAgIHN0YXJ0SWNvbjogU3RyaW5nLFxyXG4gICAgdGVtcG9yYXJ5Q2xvc2U6IHsgXHJcbiAgICAgIHR5cGU6IEJvb2xlYW4sIFxyXG4gICAgICBkZWZhdWx0OiB0cnVlXHJcbiAgICB9LFxyXG4gICAgYWN0aXZhdGVkOiBCb29sZWFuLFxyXG4gICAgZXhhY3RBY3RpdmVDbGFzczogeyBcclxuICAgICAgdHlwZTogU3RyaW5nLCBcclxuICAgICAgZGVmYXVsdDogJ21kYy1saXN0LWl0ZW0tLWFjdGl2YXRlZCcgXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsYXNzZXM6IHt9LFxyXG4gICAgICBzdHlsZXM6IHt9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgaXRlbUNsYXNzZXMgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICdtZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQnOiB0aGlzLmFjdGl2YXRlZFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaGFzU3RhcnREZXRhaWwgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zdGFydEljb24gfHwgdGhpcy4kc2xvdHNbJ3N0YXJ0LWRldGFpbCddXHJcbiAgICB9XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBvbkNsaWNrIChldnQpIHtcclxuICAgICAgdGhpcy5tZGNEcmF3ZXIuaXNUZW1wb3JhcnkgJiYgdGhpcy50ZW1wb3JhcnlDbG9zZSBcclxuICAgICAgICAmJiB0aGlzLm1kY0RyYXdlci5jbG9zZSgpXHJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldnQpXHJcbiAgICB9XHJcbiAgfSxcclxuICBtb3VudGVkICgpIHtcclxuICAgIHRoaXMucmlwcGxlID0gbmV3IFJpcHBsZUJhc2UodGhpcylcclxuICAgIHRoaXMucmlwcGxlLmluaXQoKVxyXG4gIH0sXHJcbiAgYmVmb3JlRGVzdHJveSAoKSB7XHJcbiAgICB0aGlzLnJpcHBsZSAmJiB0aGlzLnJpcHBsZS5kZXN0cm95KClcclxuICAgIHRoaXMucmlwcGxlID0gbnVsbFxyXG4gIH1cclxufVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxuICA8aHIgY2xhc3M9XCJtZGMtbGlzdC1kaXZpZGVyXCI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWRjLWRyYXdlci1kaXZpZGVyJyxcbn1cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHtCYXNlUGx1Z2lufSBmcm9tICcuLi9iYXNlJ1xuaW1wb3J0IG1kY0RyYXdlciBmcm9tICcuL21kYy1kcmF3ZXIudnVlJ1xuaW1wb3J0IG1kY0RyYXdlckxheW91dCBmcm9tICcuL21kYy1kcmF3ZXItbGF5b3V0LnZ1ZSdcbmltcG9ydCBtZGNEcmF3ZXJIZWFkZXIgZnJvbSAnLi9tZGMtZHJhd2VyLWhlYWRlci52dWUnXG5pbXBvcnQgbWRjRHJhd2VyTGlzdCBmcm9tICcuL21kYy1kcmF3ZXItbGlzdC52dWUnXG5pbXBvcnQgbWRjRHJhd2VySXRlbSBmcm9tICcuL21kYy1kcmF3ZXItaXRlbS52dWUnXG5pbXBvcnQgbWRjRHJhd2VyRGl2aWRlciBmcm9tICcuL21kYy1kcmF3ZXItZGl2aWRlci52dWUnXG5cbmV4cG9ydCB7XG4gIG1kY0RyYXdlcixcbiAgbWRjRHJhd2VyTGF5b3V0LFxuICBtZGNEcmF3ZXJIZWFkZXIsXG4gIG1kY0RyYXdlckxpc3QsXG4gIG1kY0RyYXdlckl0ZW0sXG4gIG1kY0RyYXdlckRpdmlkZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVBsdWdpbih7XG4gIG1kY0RyYXdlcixcbiAgbWRjRHJhd2VyTGF5b3V0LFxuICBtZGNEcmF3ZXJIZWFkZXIsXG4gIG1kY0RyYXdlckxpc3QsXG4gIG1kY0RyYXdlckl0ZW0sXG4gIG1kY0RyYXdlckRpdmlkZXJcbn0pIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHthdXRvSW5pdH0gZnJvbSAnLi4vYmFzZSdcbmltcG9ydCBwbHVnaW4gZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCBkZWZhdWx0IHBsdWdpblxuXG5hdXRvSW5pdChwbHVnaW4pXG4iXSwibmFtZXMiOlsiYXV0b0luaXQiLCJwbHVnaW4iLCJfVnVlIiwid2luZG93IiwiVnVlIiwiZ2xvYmFsIiwidXNlIiwiQmFzZVBsdWdpbiIsImNvbXBvbmVudHMiLCJ2ZXJzaW9uIiwiaW5zdGFsbCIsInZtIiwia2V5IiwiY29tcG9uZW50IiwibmFtZSIsIkN1c3RvbUxpbmsiLCJmdW5jdGlvbmFsIiwicHJvcHMiLCJ0YWciLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsImxpbmsiLCJPYmplY3QiLCJyZW5kZXIiLCJoIiwiY29udGV4dCIsImVsZW1lbnQiLCJkYXRhIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJwYXJlbnQiLCIkcm91dGVyIiwiJHJvb3QiLCIkb3B0aW9ucyIsIm9uIiwiY2xpY2siLCJuYXRpdmVPbiIsImNoaWxkcmVuIiwiQ3VzdG9tTGlua01peGluIiwidG8iLCJleGFjdCIsIkJvb2xlYW4iLCJhcHBlbmQiLCJyZXBsYWNlIiwiYWN0aXZlQ2xhc3MiLCJleGFjdEFjdGl2ZUNsYXNzIiwiY29tcHV0ZWQiLCJEaXNwYXRjaEV2ZW50TWl4aW4iLCJBcnJheSIsIm1ldGhvZHMiLCJkaXNwYXRjaEV2ZW50IiwiZXZ0IiwiJGVtaXQiLCJldmVudCIsInRhcmdldCIsImV2ZW50VGFyZ2V0IiwiYXJncyIsImV2ZW50QXJncyIsIkZPQ1VTQUJMRV9FTEVNRU5UUyIsIk1EQ0ZvdW5kYXRpb24iLCJhZGFwdGVyIiwiYWRhcHRlcl8iLCJNRENDb21wb25lbnQiLCJyb290IiwiZm91bmRhdGlvbiIsInVuZGVmaW5lZCIsInJvb3RfIiwiaW5pdGlhbGl6ZSIsImZvdW5kYXRpb25fIiwiZ2V0RGVmYXVsdEZvdW5kYXRpb24iLCJpbml0IiwiaW5pdGlhbFN5bmNXaXRoRE9NIiwiRXJyb3IiLCJkZXN0cm95IiwiZXZ0VHlwZSIsImhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dERhdGEiLCJzaG91bGRCdWJibGUiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImJ1YmJsZXMiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiTURDU2xpZGFibGVEcmF3ZXJGb3VuZGF0aW9uIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiaGFzTmVjZXNzYXJ5RG9tIiwicmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJEcmF3ZXJJbnRlcmFjdGlvbkhhbmRsZXIiLCJkZXJlZ2lzdGVyRHJhd2VySW50ZXJhY3Rpb25IYW5kbGVyIiwicmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsImRlcmVnaXN0ZXJUcmFuc2l0aW9uRW5kSGFuZGxlciIsInJlZ2lzdGVyRG9jdW1lbnRLZXlkb3duSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEtleWRvd25IYW5kbGVyIiwic2V0VHJhbnNsYXRlWCIsImdldEZvY3VzYWJsZUVsZW1lbnRzIiwic2F2ZUVsZW1lbnRUYWJTdGF0ZSIsInJlc3RvcmVFbGVtZW50VGFiU3RhdGUiLCJtYWtlRWxlbWVudFVudGFiYmFibGUiLCJub3RpZnlPcGVuIiwibm90aWZ5Q2xvc2UiLCJpc1J0bCIsImdldERyYXdlcldpZHRoIiwicm9vdENzc0NsYXNzIiwiYW5pbWF0aW5nQ3NzQ2xhc3MiLCJvcGVuQ3NzQ2xhc3MiLCJkZWZhdWx0QWRhcHRlciIsInJvb3RDc3NDbGFzc18iLCJhbmltYXRpbmdDc3NDbGFzc18iLCJvcGVuQ3NzQ2xhc3NfIiwidHJhbnNpdGlvbkVuZEhhbmRsZXJfIiwiaGFuZGxlVHJhbnNpdGlvbkVuZF8iLCJpbmVydF8iLCJjb21wb25lbnRUb3VjaFN0YXJ0SGFuZGxlcl8iLCJoYW5kbGVUb3VjaFN0YXJ0XyIsImNvbXBvbmVudFRvdWNoTW92ZUhhbmRsZXJfIiwiaGFuZGxlVG91Y2hNb3ZlXyIsImNvbXBvbmVudFRvdWNoRW5kSGFuZGxlcl8iLCJoYW5kbGVUb3VjaEVuZF8iLCJkb2N1bWVudEtleWRvd25IYW5kbGVyXyIsImtleUNvZGUiLCJjbG9zZSIsIlJPT1QiLCJPUEVOIiwiaXNPcGVuXyIsImRldGFiaW5hdGVfIiwicmV0YWJpbmF0ZV8iLCJlbGVtZW50cyIsImkiLCJsZW5ndGgiLCJwb2ludGVyVHlwZSIsImRpcmVjdGlvbl8iLCJkcmF3ZXJXaWR0aF8iLCJzdGFydFhfIiwidG91Y2hlcyIsInBhZ2VYIiwiY3VycmVudFhfIiwidXBkYXRlUmFmXyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInVwZGF0ZURyYXdlcl8iLCJiaW5kIiwicHJlcGFyZUZvclRvdWNoRW5kXyIsIk1hdGgiLCJhYnMiLCJuZXdQb3NpdGlvbl8iLCJvcGVuIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpc1Jvb3RUcmFuc2l0aW9uaW5nRXZlbnRUYXJnZXRfIiwibmV3UG9zIiwibWluIiwibWF4IiwiY3NzQ2xhc3NlcyIsIkFOSU1BVElORyIsInN0cmluZ3MiLCJEUkFXRVJfU0VMRUNUT1IiLCJPUEVOX0VWRU5UIiwiQ0xPU0VfRVZFTlQiLCJNRENQZXJzaXN0ZW50RHJhd2VyRm91bmRhdGlvbiIsImlzRHJhd2VyIiwiZWwiLCJUQUJfREFUQSIsIlRBQl9EQVRBX0hBTkRMRUQiLCJzdG9yZWRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWVfIiwic3VwcG9ydHNQYXNzaXZlXyIsInJlbWFwRXZlbnQiLCJldmVudE5hbWUiLCJnbG9iYWxPYmoiLCJnZXRUcmFuc2Zvcm1Qcm9wZXJ0eU5hbWUiLCJmb3JjZVJlZnJlc2giLCJjcmVhdGVFbGVtZW50IiwidHJhbnNmb3JtUHJvcGVydHlOYW1lIiwic3R5bGUiLCJzdXBwb3J0c0Nzc0N1c3RvbVByb3BlcnRpZXMiLCJDU1MiLCJzdXBwb3J0cyIsImFwcGx5UGFzc2l2ZSIsImlzU3VwcG9ydGVkIiwicGFzc2l2ZSIsImUiLCJoYXNBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJtb2RlbCIsInByb3AiLCJjbGFzc2VzIiwid2F0Y2giLCJfcmVmcmVzaCIsIm1vdW50ZWQiLCJjbGFzc05hbWUiLCIkc2V0IiwiJGRlbGV0ZSIsIiRlbCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiJHJlZnMiLCJkcmF3ZXIiLCJ1dGlsIiwib2Zmc2V0V2lkdGgiLCJ2YWx1ZSIsInNldFByb3BlcnR5IiwicXVlcnlTZWxlY3RvckFsbCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiYmVmb3JlRGVzdHJveSIsIlNDUk9MTF9MT0NLIiwiT1BBQ0lUWV9WQVJfTkFNRSIsIk1EQ1RlbXBvcmFyeURyYXdlckZvdW5kYXRpb24iLCJhZGRCb2R5Q2xhc3MiLCJyZW1vdmVCb2R5Q2xhc3MiLCJ1cGRhdGVDc3NWYXJpYWJsZSIsImV2ZW50VGFyZ2V0SGFzQ2xhc3MiLCJjb21wb25lbnRDbGlja0hhbmRsZXJfIiwiZW5hYmxlU2Nyb2xsXyIsImRpc2FibGVTY3JvbGxfIiwibmV3T3BhY2l0eSIsImJvZHkiLCJhZGQiLCJyZW1vdmUiLCJtZWRpYSIsIl9zbWFsbCIsIm1hdGNoTWVkaWEiLCJfbGFyZ2UiLCJwZXJtYW5lbnQiLCJwZXJzaXN0ZW50IiwidGVtcG9yYXJ5IiwiZHJhd2VyVHlwZSIsInZhbGlkYXRvciIsInZhbCIsInRvb2xiYXJTcGFjZXIiLCJ0b2dnbGVPbiIsInRvZ2dsZU9uU291cmNlIiwicmVxdWlyZWQiLCJvcGVuT24iLCJvcGVuT25Tb3VyY2UiLCJjbG9zZU9uIiwiY2xvc2VPblNvdXJjZSIsInByb3ZpZGUiLCJtZGNEcmF3ZXIiLCJzbWFsbCIsImxhcmdlIiwib3Blbl8iLCJtZGNQZXJtYW5lbnREcmF3ZXIiLCJtZGNQZXJzaXN0ZW50RHJhd2VyIiwibWRjVGVtcG9yYXJ5RHJhd2VyIiwiaXNQZXJtYW5lbnQiLCJpc1BlcnNpc3RlbnQiLCJpc1RlbXBvcmFyeSIsImlzUmVzcG9uc2l2ZSIsInRvZ2dsZSIsImlzT3BlbiIsInJlZnJlc2hNZWRpYSIsIm1hdGNoZXMiLCJjcmVhdGVkIiwic291cmNlIiwiJG9uIiwiYWRkTGlzdGVuZXIiLCIkbmV4dFRpY2siLCJyZW1vdmVMaXN0ZW5lciIsImluamVjdCIsInNob3ciLCJkZW5zZSIsIk1EQ1JpcHBsZUFkYXB0ZXIiLCJ2YXJOYW1lIiwiVU5CT1VOREVEIiwiQkdfRk9DVVNFRCIsIkZHX0FDVElWQVRJT04iLCJGR19ERUFDVElWQVRJT04iLCJWQVJfTEVGVCIsIlZBUl9UT1AiLCJWQVJfRkdfU0laRSIsIlZBUl9GR19TQ0FMRSIsIlZBUl9GR19UUkFOU0xBVEVfU1RBUlQiLCJWQVJfRkdfVFJBTlNMQVRFX0VORCIsIm51bWJlcnMiLCJQQURESU5HIiwiSU5JVElBTF9PUklHSU5fU0NBTEUiLCJERUFDVElWQVRJT05fVElNRU9VVF9NUyIsIkZHX0RFQUNUSVZBVElPTl9NUyIsIlRBUF9ERUxBWV9NUyIsInN1cHBvcnRzQ3NzVmFyaWFibGVzXyIsImRldGVjdEVkZ2VQc2V1ZG9WYXJCdWciLCJ3aW5kb3dPYmoiLCJub2RlIiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlZFN0eWxlIiwiaGFzUHNldWRvVmFyQnVnIiwiYm9yZGVyVG9wU3R5bGUiLCJzdXBwb3J0c0Nzc1ZhcmlhYmxlcyIsInN1cHBvcnRzRnVuY3Rpb25QcmVzZW50IiwiZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyIsIndlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyIsImdldE1hdGNoZXNQcm9wZXJ0eSIsIkhUTUxFbGVtZW50UHJvdG90eXBlIiwiZmlsdGVyIiwicCIsInBvcCIsImdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyIsImV2IiwicGFnZU9mZnNldCIsImNsaWVudFJlY3QiLCJ4IiwieSIsImRvY3VtZW50WCIsImxlZnQiLCJkb2N1bWVudFkiLCJ0b3AiLCJub3JtYWxpemVkWCIsIm5vcm1hbGl6ZWRZIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWSIsIkFDVElWQVRJT05fRVZFTlRfVFlQRVMiLCJQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyIsImFjdGl2YXRlZFRhcmdldHMiLCJNRENSaXBwbGVGb3VuZGF0aW9uIiwiYnJvd3NlclN1cHBvcnRzQ3NzVmFycyIsImlzVW5ib3VuZGVkIiwiaXNTdXJmYWNlQWN0aXZlIiwiaXNTdXJmYWNlRGlzYWJsZWQiLCJjb250YWluc0V2ZW50VGFyZ2V0IiwicmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsImRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlciIsInJlZ2lzdGVyUmVzaXplSGFuZGxlciIsImRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyIiwiY29tcHV0ZUJvdW5kaW5nUmVjdCIsImdldFdpbmRvd1BhZ2VPZmZzZXQiLCJsYXlvdXRGcmFtZV8iLCJmcmFtZV8iLCJ3aWR0aCIsImhlaWdodCIsImFjdGl2YXRpb25TdGF0ZV8iLCJkZWZhdWx0QWN0aXZhdGlvblN0YXRlXyIsImluaXRpYWxTaXplXyIsIm1heFJhZGl1c18iLCJhY3RpdmF0ZUhhbmRsZXJfIiwiYWN0aXZhdGVfIiwiZGVhY3RpdmF0ZUhhbmRsZXJfIiwiZGVhY3RpdmF0ZV8iLCJmb2N1c0hhbmRsZXJfIiwiYmx1ckhhbmRsZXJfIiwicmVzaXplSGFuZGxlcl8iLCJsYXlvdXQiLCJ1bmJvdW5kZWRDb29yZHNfIiwiZmdTY2FsZV8iLCJhY3RpdmF0aW9uVGltZXJfIiwiZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfIiwiYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyIsImFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyIsInJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyIsInByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyIsImlzQWN0aXZhdGVkIiwiaGFzRGVhY3RpdmF0aW9uVVhSdW4iLCJ3YXNBY3RpdmF0ZWRCeVBvaW50ZXIiLCJ3YXNFbGVtZW50TWFkZUFjdGl2ZSIsImFjdGl2YXRpb25FdmVudCIsImlzUHJvZ3JhbW1hdGljIiwiaXNTdXBwb3J0ZWRfIiwicmVnaXN0ZXJSb290SGFuZGxlcnNfIiwibGF5b3V0SW50ZXJuYWxfIiwiZGVyZWdpc3RlclJvb3RIYW5kbGVyc18iLCJkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfIiwicmVtb3ZlQ3NzVmFyc18iLCJmb3JFYWNoIiwia2V5cyIsImsiLCJpbmRleE9mIiwiYWN0aXZhdGlvblN0YXRlIiwicHJldmlvdXNBY3RpdmF0aW9uRXZlbnQiLCJpc1NhbWVJbnRlcmFjdGlvbiIsImhhc0FjdGl2YXRlZENoaWxkIiwic29tZSIsInJlc2V0QWN0aXZhdGlvblN0YXRlXyIsInB1c2giLCJyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyIsImFuaW1hdGVBY3RpdmF0aW9uXyIsInRyYW5zbGF0ZVN0YXJ0IiwidHJhbnNsYXRlRW5kIiwiZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsImNsZWFyVGltZW91dCIsInJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXyIsInNldFRpbWVvdXQiLCJhY3RpdmF0aW9uSGFzRW5kZWQiLCJzdGF0ZSIsImV2dE9iamVjdCIsImFuaW1hdGVEZWFjdGl2YXRpb25fIiwibWF4RGltIiwiZ2V0Qm91bmRlZFJhZGl1cyIsImh5cG90ZW51c2UiLCJzcXJ0IiwicG93IiwidXBkYXRlTGF5b3V0Q3NzVmFyc18iLCJyb3VuZCIsInVuYm91bmRlZCIsIlJpcHBsZUJhc2UiLCJyZWYiLCJNQVRDSEVTIiwiX21hdGNoZXMiLCJIVE1MRWxlbWVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCJkaXNhYmxlZCIsImRvY3VtZW50RWxlbWVudCIsInN0eWxlcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJtaXhpbnMiLCJzdGFydEljb24iLCJ0ZW1wb3JhcnlDbG9zZSIsImFjdGl2YXRlZCIsIml0ZW1DbGFzc2VzIiwiaGFzU3RhcnREZXRhaWwiLCIkc2xvdHMiLCJvbkNsaWNrIiwicmlwcGxlIiwibWRjRHJhd2VyTGF5b3V0IiwibWRjRHJhd2VySGVhZGVyIiwibWRjRHJhd2VyTGlzdCIsIm1kY0RyYXdlckl0ZW0iLCJtZGNEcmF3ZXJEaXZpZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0VBQU8sU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7RUFDaEM7RUFDQSxNQUFJQyxPQUFPLElBQVg7RUFDQSxNQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7RUFDakNELFdBQU9DLE9BQU9DLEdBQWQ7RUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0VBQ3hDO0VBQ0FILFdBQU9HLE9BQU9ELEdBQWQ7RUFDRDtFQUNELE1BQUlGLElBQUosRUFBVTtFQUNSQSxTQUFLSSxHQUFMLENBQVNMLE1BQVQ7RUFDRDtFQUNGOztFQ1pNLFNBQVNNLFVBQVQsQ0FBcUJDLFVBQXJCLEVBQWlDO0VBQ3RDLFNBQU87RUFDTEMsYUFBUyxRQURKO0VBRUxDLGFBQVMsaUJBQUNDLEVBQUQsRUFBUTtFQUNmLFdBQUssSUFBSUMsR0FBVCxJQUFnQkosVUFBaEIsRUFBNEI7RUFDMUIsWUFBSUssWUFBWUwsV0FBV0ksR0FBWCxDQUFoQjtFQUNFRCxXQUFHRSxTQUFILENBQWFBLFVBQVVDLElBQXZCLEVBQTRCRCxTQUE1QjtFQUNIO0VBQ0YsS0FQSTtFQVFMTDtFQVJLLEdBQVA7RUFVRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
