$( document ).ready(function() {
    let pageOffset = 0;

    initCopyText();

    initResponsiveTable();

    anchors.add('.post-content h2:not([data-toc-skip]),.post-content h3:not([data-toc-skip]),.post-content h4:not([data-toc-skip]),.post-content h5:not([data-toc-skip])');

    initSidebarToggle();

    initSidebarAccordion();

    initFeedbackForm();

    initDropdown();

    initSearchPopup();

    initHomeSearchPosition();

    initPopup();

    initSetPageOffset();

    initToc();

    initVertionDropdown();

    initLightbox();

    initPageScrolling();
});

function initPageScrolling() {
    let page = $(window),
        body = $('body'),
        lastScrollPosition = 0;

    function changeBodyClass() {
        let currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition < 2) {
            body.removeClass('scroll-up page-scrolled');
        } else {
            body.addClass('page-scrolled');
        }

        if (currentScrollPosition > lastScrollPosition && !body.hasClass('scroll-down')) {
            // down
            body.removeClass('scroll-up').addClass('scroll-down');
        } else if (currentScrollPosition < lastScrollPosition && body.hasClass('scroll-down')) {
            // up
            body.removeClass('scroll-down').addClass('scroll-up');
        }

        lastScrollPosition = currentScrollPosition;
    }

    changeBodyClass();

    page.on('scroll', changeBodyClass);
}

function initLightbox() {
    $('.post-content img').each(function(i, item){
        let image = $(this);

        image.wrap('<a href="' + image.attr('src') + '" data-lightbox="content-lightbox"></a>');
    });

    lightbox.option({
      'resizeDuration': 300,
      'wrapAround': false
    });
}

function initVertionDropdown() {
    let body = $('body'),
        dropdown = $('.alt-nav.dropdown'),
        overlay = $('.alt-nav__overlay');

    dropdown.on('show.bs.dropdown', function () {
        overlay.show();
        body.addClass('tablet-overflow');
    });

    dropdown.on('hide.bs.dropdown', function () {
        overlay.hide();
        body.removeClass('tablet-overflow');
    });
}

function initSetPageOffset() {
    let header = $('.main-header'),
        headerElement = header.get(0),
        menu = $('.main-sidebar'),
        menuElement = menu.get(0),
        headerPosition,
        menuPosition,
        headerOffset = 0,
        menuOffset = 0;

    if (!menuElement) {
        pageOffset = 0;
        return;
    }

    function calcOffset() {
        headerPosition = window.getComputedStyle(headerElement, null).getPropertyValue('position');
        menuPosition = window.getComputedStyle(menuElement, null).getPropertyValue('position');

        if (headerPosition === 'fixed' || headerPosition === 'sticky') {
            headerOffset = header.outerHeight();
        } else {
            headerOffset = 0;
        }

        if (menuPosition === 'fixed' || menuPosition === 'sticky') {
            menuOffset = menu.outerHeight();
        } else {
            menuOffset = 0;
        }

        pageOffset = headerOffset + menuOffset;
    }

    calcOffset();

    $(window).on('resize orientationchange', calcOffset);
}

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
        opener: '.toc__popup-opener',
        close: '.toc__popup-close, .toc__popup-overlay',
        overlay: '.toc__popup-overlay',
        anchorLinks: 'nav-link',
    });

    $('.main-sidebar').popup({
        animSpeed: 300,
        box: '.main-sidebar__popup',
        opener: '.js-main-sidebar-opener',
        close: '.main-sidebar__close',
        preventScroll: true,
        bodyClass: 'main-sidebar-opened',
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
            bodyClass: 'mobile-overflow',
            overlay: null,
            anchorLinks: null,
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
            links = options.anchorLinks,
            bodyClass = options.bodyClass,
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
                    body.removeClass(bodyClass);
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
                    body.addClass(bodyClass);
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

        if (links) {
            popup.on('click', function (e) {
                if ( e.target.classList.contains(links) && window.innerWidth < 1280 && !menuIsAnimated) {
                    menuIsAnimated = !menuIsAnimated;
                    setTimeout(function(){
                        menuIsAnimated = !menuIsAnimated;
                        toggleMenu();
                    }, 500);
                }
            });
        }

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
        body = $('body'),
        input = $('.search-input.aa-input');

    // mobile-overflow

    opener.on('click', function(e){
        e.preventDefault();
        body.addClass('tablet-overflow');
        popup.fadeIn(300, function(){
            input.focus();
        });
    });

    close.on('click', function(e){
        e.preventDefault();
        body.removeClass('tablet-overflow');

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

function initResponsiveTable() {
    $('.post-content table').each(function () {
        let table = jQuery(this),
            th = table.find('th'),
            tr = table.find('tr');

        table.wrap('<div class="table-wrapper"></div>');

        if (th.length < 3) {
            table.closest('.table-wrapper').addClass('width-50');
        }

        tr.each(function () {
            $(this).find('td').each(function (i, item) {
                item.setAttribute('data-th-text', th.eq(i).text());
            });
        });
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
    $('.sidebar-nav li.active-page-item').parents('li').toggleClass('active');

    $('.sidebar-nav').navgoco({
        caretHtml: null,
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
        opener = sidebar.find('.js-main-sidebar-switcher');

    opener.on('click', function (e) {
        e.preventDefault();

        sidebar.toggleClass('main-sidebar--collapsed');
    });
}

function initToc() {
    /*!
     * Bootstrap Table of Contents v<%= version %> (http://afeld.github.io/bootstrap-toc/)
     * Copyright 2015 Aidan Feldman
     * Licensed under MIT (https://github.com/afeld/bootstrap-toc/blob/gh-pages/LICENSE.md) */

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

            generateNavEl: function (anchor, text, navLevel) {
                var $a = (navLevel == 2) ? $('<a class="nav-link"></a>') : $('<a class="nav-link nav-link--shifted"></a>');
                $a.attr('href', '#' + anchor);
                $a.text(text);
                var $li = $('<li></li>');
                $li.append($a);

                $a.on('click', function (event) {
                    event.preventDefault();

                    $('html, body').animate({
                        scrollTop: $($.attr(this, 'href')).offset().top - pageOffset + 1
                    }, 500);
                });

                return $li;
            },

            generateNavItem: function (headingEl, navLevel) {
                var anchor = this.generateAnchor(headingEl);
                var $heading = $(headingEl);
                var text = $heading.data('toc-text') || $heading.text();
                return this.generateNavEl(anchor, text, navLevel);
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

                var helpers = this;

                $headings.each(function (i, el) {
                    var navLevel = helpers.getNavLevel(el);
                    var $newNav = helpers.generateNavItem(el, navLevel);

                    $context.append($newNav);
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
                opts.$nav.closest('.toc').hide();
                return;
            } else {
                opts.$nav.closest('.toc').show();
            }

            this.helpers.populateNav($topContext, topLevel, $headings);
        },
    };

    $('nav[data-toggle="toc"]').each(function (i, el) {
        Toc.init({
            $nav: $(el),
            $scope: $('.post-content h2, .post-content h3'),
        });
    });

    let $body = $('body'),
        $window = $(window);

    $body.scrollspy({
        target: '#toc',
        offset: pageOffset,
    });

    $window.on('load', function () {
        $body.trigger('scroll');
    });

    function updateOffset() {
        let cfg = $body.data('bs.scrollspy')._config;

        if (cfg.offset != pageOffset) {
            cfg.offset = pageOffset;
            $body.scrollspy('refresh');
        }
    }

    $window.on('resize orientationchange', updateOffset);
}

/*!
 * Lightbox v2.11.2
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):a.lightbox=b(a.jQuery)}(this,function(a){function b(b){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=a.extend({},this.constructor.defaults),this.option(b)}return b.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},b.prototype.option=function(b){a.extend(this.options,b)},b.prototype.imageCountLabel=function(a,b){return this.options.albumLabel.replace(/%1/g,a).replace(/%2/g,b)},b.prototype.init=function(){var b=this;a(document).ready(function(){b.enable(),b.build()})},b.prototype.enable=function(){var b=this;a("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(c){return b.start(a(c.currentTarget)),!1})},b.prototype.build=function(){if(!(a("#lightbox").length>0)){var b=this;a('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")),this.$lightbox=a("#lightbox"),this.$overlay=a("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.$image=this.$lightbox.find(".lb-image"),this.$nav=this.$lightbox.find(".lb-nav"),this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)},this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)},this.$overlay.hide().on("click",function(){return b.end(),!1}),this.$lightbox.hide().on("click",function(c){"lightbox"===a(c.target).attr("id")&&b.end()}),this.$outerContainer.on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===b.currentImageIndex?b.changeImage(b.album.length-1):b.changeImage(b.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return b.currentImageIndex===b.album.length-1?b.changeImage(0):b.changeImage(b.currentImageIndex+1),!1}),this.$nav.on("mousedown",function(a){3===a.which&&(b.$nav.css("pointer-events","none"),b.$lightbox.one("contextmenu",function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(b),0)}))}),this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){return b.end(),!1})}},b.prototype.start=function(b){function c(a){d.album.push({alt:a.attr("data-alt"),link:a.attr("href"),title:a.attr("data-title")||a.attr("title")})}var d=this,e=a(window);e.on("resize",a.proxy(this.sizeOverlay,this)),this.sizeOverlay(),this.album=[];var f,g=0,h=b.attr("data-lightbox");if(h){f=a(b.prop("tagName")+'[data-lightbox="'+h+'"]');for(var i=0;i<f.length;i=++i)c(a(f[i])),f[i]===b[0]&&(g=i)}else if("lightbox"===b.attr("rel"))c(b);else{f=a(b.prop("tagName")+'[rel="'+b.attr("rel")+'"]');for(var j=0;j<f.length;j=++j)c(a(f[j])),f[j]===b[0]&&(g=j)}var k=e.scrollTop()+this.options.positionFromTop,l=e.scrollLeft();this.$lightbox.css({top:k+"px",left:l+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&a("body").addClass("lb-disable-scrolling"),this.changeImage(g)},b.prototype.changeImage=function(b){var c=this,d=this.album[b].link,e=d.split(".").slice(-1)[0],f=this.$lightbox.find(".lb-image");this.disableKeyboardNav(),this.$overlay.fadeIn(this.options.fadeDuration),a(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var g=new Image;g.onload=function(){var h,i,j,k,l,m;f.attr({alt:c.album[b].alt,src:d}),a(g),f.width(g.width),f.height(g.height),m=a(window).width(),l=a(window).height(),k=m-c.containerPadding.left-c.containerPadding.right-c.imageBorderWidth.left-c.imageBorderWidth.right-20,j=l-c.containerPadding.top-c.containerPadding.bottom-c.imageBorderWidth.top-c.imageBorderWidth.bottom-c.options.positionFromTop-70,"svg"===e&&(f.width(k),f.height(j)),c.options.fitImagesInViewport?(c.options.maxWidth&&c.options.maxWidth<k&&(k=c.options.maxWidth),c.options.maxHeight&&c.options.maxHeight<j&&(j=c.options.maxHeight)):(k=c.options.maxWidth||g.width||k,j=c.options.maxHeight||g.height||j),(g.width>k||g.height>j)&&(g.width/k>g.height/j?(i=k,h=parseInt(g.height/(g.width/i),10),f.width(i),f.height(h)):(h=j,i=parseInt(g.width/(g.height/h),10),f.width(i),f.height(h))),c.sizeContainer(f.width(),f.height())},g.src=this.album[b].link,this.currentImageIndex=b},b.prototype.sizeOverlay=function(){var b=this;setTimeout(function(){b.$overlay.width(a(document).width()).height(a(document).height())},0)},b.prototype.sizeContainer=function(a,b){function c(){d.$lightbox.find(".lb-dataContainer").width(g),d.$lightbox.find(".lb-prevLink").height(h),d.$lightbox.find(".lb-nextLink").height(h),d.$overlay.focus(),d.showImage()}var d=this,e=this.$outerContainer.outerWidth(),f=this.$outerContainer.outerHeight(),g=a+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,h=b+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;e!==g||f!==h?this.$outerContainer.animate({width:g,height:h},this.options.resizeDuration,"swing",function(){c()}):c()},b.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},b.prototype.updateNav=function(){var a=!1;try{document.createEvent("TouchEvent"),a=!!this.options.alwaysShowNavOnTouchDevices}catch(a){}this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?(a&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(this.currentImageIndex>0&&(this.$lightbox.find(".lb-prev").show(),a&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),a&&this.$lightbox.find(".lb-next").css("opacity","1"))))},b.prototype.updateDetails=function(){var a=this;if(void 0!==this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title){var b=this.$lightbox.find(".lb-caption");this.options.sanitizeTitle?b.text(this.album[this.currentImageIndex].title):b.html(this.album[this.currentImageIndex].title),b.fadeIn("fast")}if(this.album.length>1&&this.options.showImageNumberLabel){var c=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(c).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return a.sizeOverlay()})},b.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){(new Image).src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){(new Image).src=this.album[this.currentImageIndex-1].link}},b.prototype.enableKeyboardNav=function(){this.$lightbox.on("keyup.keyboard",a.proxy(this.keyboardAction,this)),this.$overlay.on("keyup.keyboard",a.proxy(this.keyboardAction,this))},b.prototype.disableKeyboardNav=function(){this.$lightbox.off(".keyboard"),this.$overlay.off(".keyboard")},b.prototype.keyboardAction=function(a){var b=a.keyCode;27===b?(a.stopPropagation(),this.end()):37===b?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):39===b&&(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},b.prototype.end=function(){this.disableKeyboardNav(),a(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),this.options.disableScrolling&&a("body").removeClass("lb-disable-scrolling")},new b});
