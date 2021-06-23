$( document ).ready(function() {
    /*$('#toc').toc({
        minimumHeaders: 0,
        listType: 'ul',
        showEffect: 'none', // values: [show|slideDown|fadeIn|none]
        headers: '.post-content h2, .post-content h3, .post-content h4'
    });*/

    /* this offset helps account for the space taken up by the floating toolbar. */
    /*$('#toc').on('click', 'a', function() {
        let target = $(this.getAttribute('href')),
            scroll_target = target.offset().top;

        $(window).scrollTop(scroll_target - 10);
        return false;
    });*/

    initCopyText();

    initTableWrapper();

    /**
     * AnchorJS
     */
    anchors.add('.post-content h2:not([data-toc-skip]),.post-content h3:not([data-toc-skip]),.post-content h4:not([data-toc-skip]),.post-content h5:not([data-toc-skip])');

    initSidebarToggle();

    initSidebarAccordion();

    initFeedbackForm();
});

function initTableWrapper() {
    jQuery('.post-content table').each(function(){
        jQuery(this).wrap('<div class="table-wrapper"></div>');
    });
}

function initCopyText() {
    jQuery('.post-content > pre, .post-content details > pre, div.highlight').each(function(){
        let block = jQuery(this),
            codeContainer = block.find('code').get(0),
            copyButton = jQuery('<div class="code-button"><i class="icon-copy"></i></div>'),
            blockHeader = jQuery('<div class="code-header"></div>');

        copyButton.bind("click", {
            container: codeContainer,
            btn: copyButton,
        }, copyText);

        blockHeader.append(copyButton);
        blockHeader.insertBefore(block);
    });

    function copyText(e){
        e.preventDefault();
        e.data.btn.removeClass('active');

        let textArea = document.createElement("textarea");

        textArea.value = e.data.container.textContent.trim();
        textArea.classList.add("hidden-item");
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();

        e.data.btn.addClass('active');
    }
}

function initSidebarAccordion() {
    $(".sidebar-nav li.active").parents('li').toggleClass("active");

    $('.sidebar-nav').navgoco({
        openClass: 'active',
        save: false,
        slide: {
            duration: 300,
            easing: 'linear'
        }
    });
}

function initFeedbackForm() {
  $('.form-collapse').each(function(){
      let container = $(this),
          opener = container.find('.js-form-collapse__opener'),
          close = container.find('.js-form-collapse__close'),
          slide = container.find('.js-form-collapse__slide');

      opener.on('click', function(e){
          e.preventDefault();

          slide.stop().slideDown(300);
      });

      close.on('click', function(e){
          e.preventDefault();

          slide.stop().slideUp(300);
      });
  });
}

function initSidebarToggle() {
    let sidebar = $('.main-sidebar'),
        opener = sidebar.find('.main-sidebar__opener');

    opener.on('click', function(e){
        e.preventDefault();

        sidebar.toggleClass('main-sidebar--collapsed');
    });
}



/*!
  * Bootstrap scrollspy.js v4.6.0 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScrollSpy = factory(global.jQuery, global.Util));
}(this, (function ($, Util) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
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

    return _extends.apply(this, arguments);
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.6.0';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY;
  var EVENT_SCROLL = "scroll" + EVENT_KEY;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default['default'](this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util__default['default'].getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default['default'](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY);
      $__default['default'](this._scrollElement).off(EVENT_KEY);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util__default['default'].isElement(config.target)) {
        var id = $__default['default'](config.target).attr('id');

        if (!id) {
          id = Util__default['default'].getUID(NAME);
          $__default['default'](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util__default['default'].typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default['default']([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE);
        $link.addClass(CLASS_NAME_ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE);
      }

      $__default['default'](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default['default'](this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default['default'](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME] = ScrollSpy._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = ScrollSpy;

  $__default['default'].fn[NAME].noConflict = function () {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;

})));


/*!
 * Bootstrap Table of Contents v<%= version %> (http://afeld.github.io/bootstrap-toc/)
 * Copyright 2015 Aidan Feldman
 * Licensed under MIT (https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md) */
(function($) {
  "use strict";

  window.Toc = {
    helpers: {
      // return all matching elements in the set, or their descendants
      findOrFilter: function($el, selector) {
        // http://danielnouri.org/notes/2011/03/14/a-jquery-find-that-also-finds-the-root-element/
        // http://stackoverflow.com/a/12731439/358804
        var $descendants = $el.find(selector);
        return $el
          .filter(selector)
          .add($descendants)
          .filter(":not([data-toc-skip])");
      },

      generateUniqueIdBase: function(el) {
        var text = $(el).text();

        // adapted from
        // https://github.com/bryanbraun/anchorjs/blob/65fede08d0e4a705f72f1e7e6284f643d5ad3cf3/anchor.js#L237-L257

        // Regex for finding the non-safe URL characters (many need escaping): & +$,:;=?@"#{}|^~[`%!'<>]./()*\ (newlines, tabs, backspace, & vertical tabs)
        var nonsafeChars = /[& +$,:;=?@"#{}|^~[`%!'<>\]\.\/\(\)\*\\\n\t\b\v]/g,
          urlText;

        // Note: we trim hyphens after truncating because truncating can cause dangling hyphens.
        // Example string:                      // " ⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
        urlText = text
          .trim() // "⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
          .replace(/\'/gi, "") // "⚡⚡ Dont forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
          .replace(nonsafeChars, "-") // "⚡⚡-Dont-forget--URL-fragments-should-be-i18n-friendly--hyphenated--short--and-clean-"
          .replace(/-{2,}/g, "-") // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-short-and-clean-"
          .substring(0, 64) // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-"
          .replace(/^-+|-+$/gm, "") // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated"
          .toLowerCase(); // "⚡⚡-dont-forget-url-fragments-should-be-i18n-friendly-hyphenated"

        return urlText || el.tagName.toLowerCase();
      },

      generateUniqueId: function(el) {
        var anchorBase = this.generateUniqueIdBase(el);
        for (var i = 0; ; i++) {
          var anchor = anchorBase;
          if (i > 0) {
            // add suffix
            anchor += "-" + i;
          }
          // check if ID already exists
          if (!document.getElementById(anchor)) {
            return anchor;
          }
        }
      },

      generateAnchor: function(el) {
        if (el.id) {
          return el.id;
        } else {
          var anchor = this.generateUniqueId(el);
          el.id = anchor;
          return anchor;
        }
      },

      createNavList: function() {
        return $('<ul class="nav"></ul>');
      },

      createChildNavList: function($parent) {
        var $childList = this.createNavList();
        $parent.append($childList);
        return $childList;
      },

      generateNavEl: function(anchor, text) {
        var $a = $('<a class="nav-link"></a>');
        $a.attr("href", "#" + anchor);
        $a.text(text);
        var $li = $("<li></li>");
        $li.append($a);
        return $li;
      },

      generateNavItem: function(headingEl) {
        var anchor = this.generateAnchor(headingEl);
        var $heading = $(headingEl);
        var text = $heading.data("toc-text") || $heading.text();
        return this.generateNavEl(anchor, text);
      },

      // Find the first heading level (`<h1>`, then `<h2>`, etc.) that has more than one element. Defaults to 1 (for `<h1>`).
      getTopLevel: function($scope) {
        for (var i = 1; i <= 6; i++) {
          var $headings = this.findOrFilter($scope, "h" + i);
          if ($headings.length > 0) {
            return i;
          }
        }

        return 1;
      },

      // returns the elements for the top level, and the next below it
      getHeadings: function($scope, topLevel) {
        var topSelector = "h" + topLevel;

        var secondaryLevel = topLevel + 1;
        var secondarySelector = "h" + secondaryLevel;

        return this.findOrFilter($scope, topSelector + "," + secondarySelector);
      },

      getNavLevel: function(el) {
        return parseInt(el.tagName.charAt(1), 10);
      },

      populateNav: function($topContext, topLevel, $headings) {
        var $context = $topContext;
        var $prevNav;

        var helpers = this;

        $headings.each(function(i, el) {
          var $newNav = helpers.generateNavItem(el);
          var navLevel = helpers.getNavLevel(el);

          
          // determine the proper $context
          if (navLevel === topLevel) {
            // use top level
            $context = $topContext;
          } else if ($prevNav && $context === $topContext) {
            // create a new level of the tree and switch to it
            $context = helpers.createChildNavList($prevNav);
          } // else use the current $context
          
          $context.append($newNav);

          $prevNav = $newNav;
        });
      },

      parseOps: function(arg) {
        var opts;
        if (arg.jquery) {
          opts = {
            $nav: arg
          };
        } else {
          opts = arg;
        }
        opts.$scope = opts.$scope || $(document.body);
        return opts;
      }
    },

    // accepts a jQuery object, or an options object
    init: function(opts) {
      opts = this.helpers.parseOps(opts);

      // ensure that the data attribute is in place for styling
      opts.$nav.attr("data-toggle", "toc");

      var $topContext = this.helpers.createChildNavList(opts.$nav);
      var topLevel = this.helpers.getTopLevel(opts.$scope);
      var $headings = this.helpers.getHeadings(opts.$scope, topLevel);
      this.helpers.populateNav($topContext, topLevel, $headings);
    }
  };

  $(function() {
    $('nav[data-toggle="toc"]').each(function(i, el) {
      Toc.init({
        $nav: $(el),
        $scope: $(".post-content h2, .post-content h3"),
      });
    });
  });
})(jQuery);
