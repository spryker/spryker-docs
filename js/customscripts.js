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

    initDropdown();

    initSearchPopup();

    initHomeSearchPosition();

    $('[data-spy="scroll"]').each(function () {
        $(this).scrollspy('refresh');
    });

    initPopup();
});

function initPopup() {
    $('.main-header').popup({
        animSpeed: 300,
        box: '.nav-popup',
        opener: '.nav-opener',
        preventScroll: true,
    });

    $('.toc').popup({
        animSpeed: 300,
        box: '.toc__popup',
        opener: '.toc__popup__opener',
        close: '.toc__popup__close, .toc__popup__overlay',
        overlay: '.toc__popup__overlay',
    });
}

$.fn.popup = function (options) {
    options = $.extend(
        {
            animSpeed: 500,
            effect: 'fade',
            box: '.popup__box',
            opener: '.popup__opener',
            close: '.popup__close',
            overlay: null,
            anchorLinks: '.popup__anchor',
        },
        options
    );

    let popupFunc = function () {
        let page = jQuery(window),
            holder = $(this),
            body = $('body'),
            popup = holder.find(options.box),
            opener = holder.find(options.opener),
            close = holder.find(options.close),
            overlay = holder.find(options.overlay),
            links = holder.find(options.anchorLinks),
            menuIsOpened = false,
            menuIsAnimated = false,
            preventScroll = false;

        function toggleMenu() {
            menuIsAnimated = !menuIsAnimated;

            if (!menuIsAnimated) {
                return;
            }

            if (menuIsOpened) {
                opener.removeClass('expanded');

                if (options.preventScroll) {
                    body.removeClass('mobile-overflow');
                }

                popup.fadeOut(300, function () {
                    switchMenuState();
                });

                if (options.overlay) {
                    overlay.fadeOut(300);
                }
            } else {
                opener.addClass('expanded');

                if (options.preventScroll) {
                    body.addClass('mobile-overflow');
                }

                popup.fadeIn(300, function () {
                    switchMenuState();
                });

                if (options.overlay) {
                    overlay.fadeIn(300);
                }
            }
        }

        function switchMenuState() {
            menuIsOpened = !menuIsOpened;
            menuIsAnimated = !menuIsAnimated;
        }

        links.on('click', function () {
            // TODO add scroll to section
            toggleMenu();
        });

        opener.on('click', function (e) {
            e.preventDefault();
            toggleMenu();
        });

        close.on('click', function (e) {
            e.preventDefault();
            menuIsOpened = true;
            toggleMenu();
        });
    };

    return this.each(popupFunc);
};

function initHomeSearchPosition() {
    let homePage = $('.home-layout');

    if (!homePage.length) return;

    let page = jQuery(window),
        pageOffsetTop,
        isScrolled = false,
        searchContainer = $('.js-home-search'),
        opener = $('.js-search-popup-opener'),
        searchOffsetTop;

    function handleScroll() {
        pageOffsetTop = page.scrollTop();
        searchOffsetTop = searchContainer.offset().top;

        if (isScrolled && pageOffsetTop < searchOffsetTop) {
            opener.removeClass('under-search');
            isScrolled = !isScrolled;
        } else if (!isScrolled && pageOffsetTop > searchOffsetTop ) {
            opener.addClass('under-search');
            isScrolled = !isScrolled;
        }
    }

    handleScroll();

    page.on('scroll', handleScroll);
}

function initSearchPopup() {
    let popup = $('.search-popup'),
        opener = $('.js-search-popup-opener'),
        close = $('.js-search-popup-close'),
        body = jQuery('body'),
        input = $('.search-input.aa-input');

    // mobile-overflow

    opener.on('click', function(e){
        e.preventDefault();
        body.addClass('mobile-overflow');
        popup.fadeIn(300, function(){
            input.focus();
        });
    });

    close.on('click', function(e){
        e.preventDefault();
        body.removeClass('mobile-overflow');

        popup.fadeOut(300);
    });
}

function initMobileNav() {
    let page = jQuery(window),
        header = jQuery('.main-header'),
        nav = header.find('.nav-popup'),
        links = header.find('.main-nav-anchor'),
        opener = jQuery('.nav-opener'),
        body = jQuery('body'),
        menuIsOpened = false,
        menuIsAnimated = false;

    function toggleMenu() {
        if (window.innerWidth >= 1025) {
            return;
        }

        menuIsAnimated = !menuIsAnimated;

        if (!menuIsAnimated) {
            return;
        }

        if (menuIsOpened) {
            opener.removeClass('expanded');
            body.removeClass('overflow');
            nav.fadeOut(300, function () {
                menuIsOpened = !menuIsOpened;
                menuIsAnimated = !menuIsAnimated;
            });
        } else {
            opener.addClass('expanded');
            body.addClass('overflow');
            nav.fadeIn(300, function () {
                menuIsOpened = !menuIsOpened;
                menuIsAnimated = !menuIsAnimated;
            });
        }
    }

    links.on('click', function (e) {
        e.preventDefault();
        toggleMenu();
    });

    opener.on('click', function (e) {
        e.preventDefault();
        toggleMenu();
    });
}

function initDropdown() {
    let mainNav = $('.main-nav'),
        dropdown = mainNav.find('.dropdown'),
        subMenu = mainNav.find('.dropdown-menu');

    $('.dropdown-menu .dropdown-toggle').on('click', function (e) {
        let $el = $(this);
        let $parent = $el.offsetParent('.dropdown-menu');

        if ( !$el.next().hasClass('show') ) {
          $el.parents('.dropdown-menu').first().find('.show').removeClass('show');
        }

        let $subMenu = $el.next('.dropdown-menu');
        $subMenu.toggleClass('show');

        $el.parent('li').toggleClass('show');

        return false;
    });

    mainNav.on('hide.bs.dropdown', function ( e ) {
        dropdown.removeClass('show');
        subMenu.removeClass('show');
    });
}

function initTableWrapper() {
    jQuery('.post-content table').each(function(){
        jQuery(this).wrap('<div class="table-wrapper"></div>');
    });
}

function initCopyText() {
    jQuery('.post-content > pre, .post-content details > pre, div.highlight').each(function () {
        let block = jQuery(this),
            codeContainer = block.find('code').get(0),
            copyButton = jQuery('<div class="code-button"><i class="icon-copy"></i></div>'),
            blockHeader = jQuery('<div class="code-header"></div>');

        copyButton.bind('click', {
                container: codeContainer,
                btn: copyButton,
            }, copyText);

        blockHeader.append(copyButton);
        blockHeader.insertBefore(block);
    });

    function copyText(e) {
        e.preventDefault();
        e.data.btn.removeClass('active');

        let textArea = document.createElement('textarea');

        textArea.value = e.data.container.textContent.trim();
        textArea.classList.add('hidden-item');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();

        e.data.btn.addClass('active');
    }
}

function initSidebarAccordion() {
    $('.sidebar-nav li.active').parents('li').toggleClass('active');

    $('.sidebar-nav').navgoco({
        openClass: 'active',
        save: false,
        slide: {
            duration: 300,
            easing: 'linear',
        },
    });
}

function initFeedbackForm() {
    $('.form-collapse').each(function () {
        let container = $(this),
            opener = container.find('.js-form-collapse__opener'),
            close = container.find('.js-form-collapse__close'),
            slide = container.find('.js-form-collapse__slide');

        opener.on('click', function (e) {
            e.preventDefault();

            slide.stop().slideDown(300);
        });

        close.on('click', function (e) {
            e.preventDefault();

            slide.stop().slideUp(300);
        });
    });
}

function initSidebarToggle() {
    let sidebar = $('.main-sidebar'),
        opener = sidebar.find('.main-sidebar__opener');

    opener.on('click', function (e) {
        e.preventDefault();

        sidebar.toggleClass('main-sidebar--collapsed');
    });
}


/*!
 * Bootstrap Table of Contents v<%= version %> (http://afeld.github.io/bootstrap-toc/)
 * Copyright 2015 Aidan Feldman
 * Licensed under MIT (https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md) */
(function ($) {
    'use strict';

    window.Toc = {
        helpers: {
            // return all matching elements in the set, or their descendants
            findOrFilter: function ($el, selector) {
                // http://danielnouri.org/notes/2011/03/14/a-jquery-find-that-also-finds-the-root-element/
                // http://stackoverflow.com/a/12731439/358804
                var $descendants = $el.find(selector);
                return $el
                    .filter(selector)
                    .add($descendants)
                    .filter(':not([data-toc-skip])');
            },

            generateUniqueIdBase: function (el) {
                var text = $(el).text();

                // adapted from
                // https://github.com/bryanbraun/anchorjs/blob/65fede08d0e4a705f72f1e7e6284f643d5ad3cf3/anchor.js#L237-L257

                // Regex for finding the non-safe URL characters (many need escaping): & +$,:;=?@"#{}|^~[`%!'<>]./()*\ (newlines, tabs, backspace, & vertical tabs)
                var nonsafeChars =
                        /[& +$,:;=?@"#{}|^~[`%!'<>\]\.\/\(\)\*\\\n\t\b\v]/g,
                    urlText;

                // Note: we trim hyphens after truncating because truncating can cause dangling hyphens.
                // Example string:                      // " ⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
                urlText = text
                    .trim() // "⚡⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
                    .replace(/\'/gi, '') // "⚡⚡ Dont forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
                    .replace(nonsafeChars, '-') // "⚡⚡-Dont-forget--URL-fragments-should-be-i18n-friendly--hyphenated--short--and-clean-"
                    .replace(/-{2,}/g, '-') // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-short-and-clean-"
                    .substring(0, 64) // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-"
                    .replace(/^-+|-+$/gm, '') // "⚡⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated"
                    .toLowerCase(); // "⚡⚡-dont-forget-url-fragments-should-be-i18n-friendly-hyphenated"

                return urlText || el.tagName.toLowerCase();
            },

            generateUniqueId: function (el) {
                var anchorBase = this.generateUniqueIdBase(el);
                for (var i = 0; ; i++) {
                    var anchor = anchorBase;
                    if (i > 0) {
                        // add suffix
                        anchor += '-' + i;
                    }
                    // check if ID already exists
                    if (!document.getElementById(anchor)) {
                        return anchor;
                    }
                }
            },

            generateAnchor: function (el) {
                if (el.id) {
                    return el.id;
                } else {
                    var anchor = this.generateUniqueId(el);
                    el.id = anchor;
                    return anchor;
                }
            },

            createNavList: function () {
                return $('<ul class="nav"></ul>');
            },

            createChildNavList: function ($parent) {
                var $childList = this.createNavList();
                $parent.append($childList);
                return $childList;
            },

            generateNavEl: function (anchor, text) {
                var $a = $('<a class="nav-link"></a>');
                $a.attr('href', '#' + anchor);
                $a.text(text);
                var $li = $('<li></li>');
                $li.append($a);
                return $li;
            },

            generateNavItem: function (headingEl) {
                var anchor = this.generateAnchor(headingEl);
                var $heading = $(headingEl);
                var text = $heading.data('toc-text') || $heading.text();
                return this.generateNavEl(anchor, text);
            },

            // Find the first heading level (`<h1>`, then `<h2>`, etc.) that has more than one element. Defaults to 1 (for `<h1>`).
            getTopLevel: function ($scope) {
                for (var i = 1; i <= 6; i++) {
                    var $headings = this.findOrFilter($scope, 'h' + i);
                    if ($headings.length > 0) {
                        return i;
                    }
                }

                return 1;
            },

            // returns the elements for the top level, and the next below it
            getHeadings: function ($scope, topLevel) {
                var topSelector = 'h' + topLevel;

                var secondaryLevel = topLevel + 1;
                var secondarySelector = 'h' + secondaryLevel;

                return this.findOrFilter(
                    $scope,
                    topSelector + ',' + secondarySelector
                );
            },

            getNavLevel: function (el) {
                return parseInt(el.tagName.charAt(1), 10);
            },

            populateNav: function ($topContext, topLevel, $headings) {
                var $context = $topContext;
                var $prevNav;

                var helpers = this;

                $headings.each(function (i, el) {
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

            parseOps: function (arg) {
                var opts;
                if (arg.jquery) {
                    opts = {
                        $nav: arg,
                    };
                } else {
                    opts = arg;
                }
                opts.$scope = opts.$scope || $(document.body);
                return opts;
            },
        },

        // accepts a jQuery object, or an options object
        init: function (opts) {
            opts = this.helpers.parseOps(opts);

            // ensure that the data attribute is in place for styling
            opts.$nav.attr('data-toggle', 'toc');

            var $topContext = this.helpers.createChildNavList(opts.$nav);
            var topLevel = this.helpers.getTopLevel(opts.$scope);
            var $headings = this.helpers.getHeadings(opts.$scope, topLevel);

            if ($headings.length < 2) {
                opts.$nav.hide();
                return;
            } else {
                opts.$nav.show();
            }

            this.helpers.populateNav($topContext, topLevel, $headings);
        },
    };

    $(function () {
        $('nav[data-toggle="toc"]').each(function (i, el) {
            Toc.init({
                $nav: $(el),
                $scope: $('.post-content h2, .post-content h3'),
            });
        });
    });
})(jQuery);
