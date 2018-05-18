import Util from './utility.js'

ProtoGraph.initPage = function initPage() {
    let dimension = Util.getScreenSize(),
        mode = (dimension.width <= 500) ? 'mobile' : 'laptop',
        render_mode = (dimension.width <= 500) ? 'col4' : 'col7',
        mode_for_cover = (mode === 'mobile') ? "col4" : "col16",
        render_mode_for_feed = (mode === 'mobile') ? "col4" : "col3",
        originals_container,
        cover_container,
        feeds_container,
        digests_container,
        opinions_container,
        headerJSON = ProtoGraph.headerJSON,
        streams = ProtoGraph.streams,
        sticky_sidebar_options,
        is_lazy_loading_activated = ProtoGraph.site.is_lazy_loading_activated;

    if (mode === 'laptop') {
        sticky_sidebar_options = {
            containerSelector: "#cover",
            additionalMarginTop: 20
        };
    }

    if (mode === 'mobile') {
        //Set Tab counts and container counts.
        $('.proto-mobile-grid-navigation .proto-mobile-grid-navigatio-tab').each((i, e) => {
            $(e).attr('data-tab', i);
            var active_tab = $(e).hasClass('proto-active-tab');
            if (active_tab) {
                var tab_content = $('.proto-tab-content')[i];
                $(tab_content).addClass('proto-tab-active-content');
            }
        });
        $('.proto-col.col-16.proto-nav-sticky').theiaStickySidebar({
            containerSelector: ".proto-grid-container",
             sidebarBehavior: "stick-to-top",
            additionalMarginTop: 0,
            updateSidebarHeight: false,
            disableOnResponsiveLayouts: false
        });
        $('.proto-mobile-grid-navigation .proto-mobile-grid-navigatio-tab').on('click', (e) => {
            let tabIndex = +e.currentTarget.getAttribute('data-tab'),
                $tab = $($('.proto-mobile-grid-navigatio-tab')[tabIndex]),
                $tabContent = $($('.proto-tab-content')[tabIndex]);

            $('.proto-mobile-grid-navigatio-tab.proto-active-tab').removeClass('proto-active-tab');
            $tab.addClass('proto-active-tab');

            $('.proto-tab-content.proto-tab-active-content').removeClass('proto-tab-active-content');
            $tabContent.addClass('proto-tab-active-content');
        });

        $('.hamburger-icon').on('click', (e) => {
            $('.mobile-navigations-screen').addClass('mobile-navigations-screen-slide-in')
        });

        $('.close-icon').on('click', (e) => {
            $('.mobile-navigations-screen').removeClass('mobile-navigations-screen-slide-in')
        })
    }

    Util.getJSON(streams['16c_Hero'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching cover stream", err);
        } else {
            if (data.length > 0) {
                data = [data[0]];
                data.map((d, i) => {
                    setTimeout(function () {
                        new ProtoEmbed.initFrame($("#cover_container #" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, mode_for_cover,{
                            headerJSON: headerJSON
                        });
                    }, 0)
                })
            }
        }
    });

    Util.getJSON(streams['credits'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching cover stream", err);
        } else {
            if (data.length > 0) {
                data = [data[0]];
                data.map((d, i) => {
                    setTimeout(function () {
                        new ProtoEmbed.initFrame($("#credits_container #" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, mode_for_cover,{
                            headerJSON: headerJSON
                        });
                    }, 0)
                })
            }
        }
    });

    Util.getJSON(streams['7c'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching originals stream", err);
        } else {
            if (data.length > 0) {
                data.map((d, i) => {
                    if (is_lazy_loading_activated) {
                        $("#originals_container #" + d.view_cast_id).attr('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
                        $("#originals_container #" + d.view_cast_id).attr('mode', render_mode);
                    } else {
                        setTimeout(function () {
                            new ProtoEmbed.initFrame($("#originals_container #" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, render_mode, {
                                headerJSON: headerJSON
                            });
                        }, 0)
                    }
                });
                if (is_lazy_loading_activated) {
                    inView('.ProtoCard-originals')
                        .on('enter', (e) => {
                            let $e = $(e);
                            if (!$e.find('iframe').length) {
                                new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
                                    headerJSON: headerJSON
                                });
                            }
                        });
                }
                if (mode === 'laptop') {
                    $('#originals_container').theiaStickySidebar(sticky_sidebar_options);
                }
            } else {
                $(originals_container).siblings(".column-title").hide();
            }
        }
    });

    Util.getJSON(streams['4c'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching digests stream", err);
        } else {
            if (data.length > 0) {
                data.map((d, i) => {
                    if (is_lazy_loading_activated) {
                        $("#digests_container #" + d.view_cast_id).attr('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
                        $("#digests_container #" + d.view_cast_id).attr('mode', "col4");
                    } else {
                        setTimeout(function () {
                            new ProtoEmbed.initFrame($("#digests_container #" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, "col4", {
                                headerJSON: headerJSON
                            });
                        }, 0)
                    }
                });
                if (is_lazy_loading_activated) {
                    inView('.ProtoCard-digests')
                        .on('enter', (e) => {
                            var $e = $(e);
                            if (!$e.find('iframe').length) {
                                new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
                                    headerJSON: headerJSON
                                });
                            }
                        });
                }
                if (mode === 'laptop') {
                    $('#digests_container').theiaStickySidebar(sticky_sidebar_options);
                }
            } else {
                $(digests_container).siblings(".column-title").hide();
            }
        }
    });

    Util.getJSON(streams['2c'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching opinions stream", err);
        } else {
            if (data.length > 0) {
                data.map((d, i) => {
                    if (is_lazy_loading_activated) {
                        $("#opinions_container #" + d.view_cast_id).attr('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
                        $("#opinions_container #" + d.view_cast_id).attr('mode', "col2");
                    } else {
                        setTimeout(function () {
                            new ProtoEmbed.initFrame($("#opinions_container #" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, "col2", {
                                headerJSON: headerJSON
                            });
                        }, 0)
                    }
                });
                if (is_lazy_loading_activated) {
                    inView('.ProtoCard-opinions')
                        .on('enter', (e) => {
                            var $e = $(e);
                            if (!$e.find('iframe').length) {
                                new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
                                    headerJSON: headerJSON
                                });
                            }
                        });
                }
                if (mode === 'laptop') {
                    $('#opinions_container').theiaStickySidebar(sticky_sidebar_options);
                }
            } else {
                $(opinions_container).siblings(".column-title").hide();
            }
        }
    });

    Util.getJSON(streams['3c'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching feeds stream", err);
        } else {
            if (data.length > 0) {
                data.map((d, i) => {
                    if (is_lazy_loading_activated) {
                        $("#feeds_container #" + d.view_cast_id).attr('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
                        $("#feeds_container #" + d.view_cast_id).attr('mode', render_mode_for_feed);
                    } else {
                        setTimeout(function () {
                            new ProtoEmbed.initFrame($("#feeds_container #" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, render_mode_for_feed, {
                                headerJSON: headerJSON
                            });
                        }, 0)
                    }
                });
                if (is_lazy_loading_activated) {
                    inView('.ProtoCard-feeds')
                        .on('enter', (e) => {
                            var $e = $(e);
                            if (!$e.find('iframe').length) {
                                new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
                                    headerJSON: headerJSON
                                });
                            }
                        });
                }
                if (mode === 'laptop') {
                    $('#feeds_container').theiaStickySidebar(sticky_sidebar_options);
                }
            } else {
                $(feeds_container).siblings(".column-title").hide();
            }
        }
    });
}
