$( document ).ready(function() {
    $('#toc').toc({
        minimumHeaders: 0,
        listType: 'ul',
        showEffect: 'none', // values: [show|slideDown|fadeIn|none]
        headers: '.post-content h2, .post-content h3, .post-content h4'
    });

    /* this offset helps account for the space taken up by the floating toolbar. */
    $('#toc').on('click', 'a', function() {
        var target = $(this.getAttribute('href')),
            scroll_target = target.offset().top;

        $(window).scrollTop(scroll_target - 10);
        return false;
    });

    /**
     * AnchorJS
     */
    anchors.add('.post-content h2,.post-content h3,.post-content h4,.post-content h5');

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });
});
