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

    if ($('#cover_container').length) {
        $('#cover_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                iframe_url = $element.attr("iframe-url"),

                url = `${iframe_url}%26domain=${location.hostname}`

                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, mode_for_cover, {
                        headerJSON: headerJSON
                    });
                }, 0)

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
            $('#cover_container').theiaStickySidebar(sticky_sidebar_options);
        }
    }

    if ($('#cta_container').length) {
        $('#cta_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                iframe_url = $element.attr("iframe-url"),

                url = `${iframe_url}%26domain=${location.hostname}`
                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, mode_for_cover, {
                        headerJSON: headerJSON
                    });
                }, 0)

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
            $('#cta_container').theiaStickySidebar(sticky_sidebar_options);
        }
    }

    if ($('#credits_container').length) {
        $('#credits_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                iframe_url = $element.attr("iframe-url"),

                url = `${iframe_url}%26domain=${location.hostname}`
                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, mode_for_cover, {
                        headerJSON: headerJSON
                    });
                }, 0)

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
            $('#credits_container').theiaStickySidebar(sticky_sidebar_options);
        }
    }

    if ($('#originals_container .theiaStickySidebar').length) {
        $('#originals_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = `https://cdn.protograph.pykih.com/${template_card_id}/index.html?view_cast_id=${view_cast_id}%26base_url=${window.location.origin}%26domain=${location.hostname}`

            if (is_lazy_loading_activated) {
                $element.attr('iframe-url', url);
                $element.attr('mode', render_mode);
            } else {
                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, render_mode, {
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

    if ($('#digests_container .theiaStickySidebar').length) {
        $('#digests_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = `https://cdn.protograph.pykih.com/${template_card_id}/index.html?view_cast_id=${view_cast_id}%26base_url=${window.location.origin}%26domain=${location.hostname}`

            if (is_lazy_loading_activated) {
                $element.attr('iframe-url', url);
                $element.attr('mode', "col4");
            } else {
                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, "col4", {
                        headerJSON: headerJSON
                    });
                }, 0)
            }
        });
        if (is_lazy_loading_activated) {
            inView('.ProtoCard-digests')
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
            $('#digests_container').theiaStickySidebar(sticky_sidebar_options);
        }
    } else {
        $(digests_container).siblings(".column-title").hide();
    }

    if ($('#opinions_container .theiaStickySidebar').length) {
        $('#opinions_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = `https://cdn.protograph.pykih.com/${template_card_id}/index.html?view_cast_id=${view_cast_id}%26base_url=${window.location.origin}%26domain=${location.hostname}`

            if (is_lazy_loading_activated) {
                $element.attr('iframe-url', url);
                $element.attr('mode', "col2");
            } else {
                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, "col2", {
                        headerJSON: headerJSON
                    });
                }, 0)
            }
        });
        if (is_lazy_loading_activated) {
            inView('.ProtoCard-opinions')
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
            $('#opinions_container').theiaStickySidebar(sticky_sidebar_options);
        }
    } else {
        $(opinions_container).siblings(".column-title").hide();
    }

    if ($('#feeds_container .theiaStickySidebar').length) {
        $('#feeds_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = `https://cdn.protograph.pykih.com/${template_card_id}/index.html?view_cast_id=${view_cast_id}%26base_url=${window.location.origin}%26domain=${location.hostname}`

            if (is_lazy_loading_activated) {
                $element.attr('iframe-url', url);
                $element.attr('mode', render_mode_for_feed);
            } else {
                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, render_mode_for_feed, {
                        headerJSON: headerJSON
                    });
                }, 0)
            }
        });
        if (is_lazy_loading_activated) {
            inView('.ProtoCard-feeds')
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
            $('#feeds_container').theiaStickySidebar(sticky_sidebar_options);
        }
    } else {
        $(feeds_container).siblings(".column-title").hide();
    }

    inView('.proto-lazy-load-card')
        .on('enter', (e) => {

            e.classList.remove('proto-lazy-load-card')
            let card_s3_identifier = $(e).attr('card-id');
            let instance = $(e).attr('card-instance');
            let view_cast_id = $(e).attr('card-viewcast-id');
            let url = card_s3_identifier;    //url to fetch card from s3
            if(instance && view_cast_id){
                    let x = new ProtoGraph.Card[instance]();
                    x.init({
                        "selector": document.querySelector(`#proto_${view_cast_id}`),
                        "isFromSSR": true,
                        "data_url" : url,
                        "site_configs": ProtoGraph.site,
                        "mode": mode_for_cover
                    });
                    x.render();
            }
        });

}
