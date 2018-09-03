import Util from './utility.js'

function initFBTWShareLinks() {
    var url = window.location.href,
        fb_share = $('meta[property="og:description"]').attr('content'),
        tw_share = $('meta[name="twitter:description"]').attr('content'),
        fb_share_url,
        tw_share_url;

    fb_share_url = `http://www.facebook.com/sharer/sharer.php?u=${url}${fb_share ? '&description=' + encodeURI(fb_share) : ''}`;
    tw_share_url = `http://twitter.com/share?url=${url}${tw_share ? '&text=' + encodeURI(tw_share) : ''}`;

    document.getElementById('facebook-share-link').href = fb_share_url;
    document.getElementById('twitter-share-link').href = tw_share_url;
}

function initScroll() {
    var container = $('.cover-page-overlay'),
        sidebar = $('#sticker .theiaStickySidebar'),
        sidebarTop = sidebar.offset().top,
        sidebarWidth = sidebar.width(),
        currentTop = 0,
        lastScrollTop = 0,
        currentItem = 0,
        scrollDirection,
        activeItem,
        scrollTop,
        position,
        top;

    $('#sticker .nav-item').map((i,e) => $(e).attr('data-item', i));

    $(window).on('scroll', Util.throttle(function (event) {
        scrollTop = $(this).scrollTop();

        if (scrollTop > lastScrollTop) {
            scrollDirection = "down"
        } else {
            scrollDirection = "up"
        }

        lastScrollTop = scrollTop;
    }, 100));



    $(window).on('activate.bs.scrollspy', function (e) {
        var activeItem = $('.nav-link.active').parent(),
            navScrollTop = $('#sticker nav').scrollTop(),
            nextItem = activeItem.next(),
            prevItem = activeItem.prev();

        switch (scrollDirection) {
            case "down":
                if (nextItem.length && !nextItem.visible()) {
                    if (currentItem !== +activeItem.attr('data-item')) {
                        currentItem = +activeItem.attr('data-item');
                        $('#sticker nav').scrollTop(navScrollTop + (activeItem.height() + nextItem.height()));
                    }
                }
                break;
            case "up":
                if (prevItem.length && !prevItem.visible()) {
                    if (currentItem !== +activeItem.attr('data-item')) {
                        currentItem = +activeItem.attr('data-item');
                        $('#sticker nav').scrollTop(navScrollTop - (activeItem.height() + nextItem.height()));
                    }
                }
                break;
            default:
                break;
        }
        if (+activeItem.attr('data-item') === 0) $('#sticker nav').scrollTop(0);
    });
}

ProtoGraph.initPage = function initPage() {
    let dimension = Util.getScreenSize(),
        mode = (dimension.width <= 500) ? 'mobile' : 'laptop',
        render_mode = (dimension.width <= 500) ? 'col4' : 'col7',
        cover_height = (dimension.width <= 500) ? '250px' : '430px',
        background_size = (dimension.width <= 500) ? 'cover' : '100%',
        mode_for_cover = (mode === 'mobile') ? "col4" : "col16",
        page = ProtoGraph.page,
        headerJSON = ProtoGraph.headerJSON,
        navigation_items = $("#myNavbar ul li"),
        is_lazy_loading_activated = ProtoGraph.site.is_lazy_loading_activated,
        more_in_the_series = ProtoGraph.more_in_the_series,
        more_in_the_intersection = ProtoGraph.more_in_the_intersection,
        more_in_the_sub_intersection = ProtoGraph.more_in_the_sub_intersection;

    if (!navigation_items.length) {
        $("#sticker").css('display', "none");
    }

    $(".page-list ul li").on("click", function(){
        $('#cont-button').trigger('click');
        $(this).off('click');
    })

    initFBTWShareLinks();

    if (mode === 'laptop') {
        // Note: Dont remove the updateSidebarHeight: false, fixes very weard errors. Also this is not there in documentation of library.
        $('#cont-button').on('click', (e) => {
            $('#cont-button').css('display', 'none');
            $("#article .fade-area").css('display', 'none');

            $("#article").css('height', 'auto');
            $("#related_container .fade-area").css('display', 'none');
            $("#related_container").removeClass('proto-hidden-article-content');
            $("#related_container").css("height", "auto");
            $("#related_container").css("overflow", "visible");
            $('.single-index-value').addClass('activate-click');
            // initScroll();
            // $('#sticker').theiaStickySidebar({
            //     containerSelector: ".cover-page-overlay",
            //     sidebarBehavior: "stick-to-top",
            //     customScrollCalculations: true,
            //     additionalMarginTop: 50,
            //     additionalMarginBottom: 20,
            //     updateSidebarHeight: false
            // });
        });

        //Temp code
        $("#more_articles_container").siblings(".column-title").hide();
        $("#more_intersections_container").siblings(".column-title").hide();
        $("#more_sub_intersections_container").siblings(".column-title").hide();

    }

    if (mode == 'mobile') {
        $('#cont-button').on('click', (e) => {
            $('#protograph_filter_icon').css('display', 'block');
            $("#article .fade-area").css('display', 'none');
            // $('#cont-button').css('display', 'none');
            $("#article").css('height', 'auto');
            // document.getElementById('article').className = 'article-area';
            $('.single-index-value').addClass('activate-click');

            $("#sticker .fade-area").css('display', 'none');
            $("#sticker").removeClass('proto-hidden-article-content');
            $(".related-articles-link").css('display', 'block');
            $("#related_container .fade-area").css('display', 'none');
            $("#related_container").removeClass('proto-hidden-article-content');

            $('.single-index-value').on('click', (e) => {
                setTimeout(function () {
                    $('.navigation-links').removeClass('navigation-links-slide-up');
                    setTimeout((e) => {
                        $('.navigation-links').css('display', 'none');
                    }, 500);
                    $('#protograph_filter_icon').css('display', 'block');
                    $('#protograph_filter_close_icon').css('display', 'none');
                }, 250);
            });
        })

        $('#protograph_filter_icon').on('click', ((e) => {
            $('.protograph-app-filter-icon').addClass('block-events');
            $('.navigation-links').css('display', 'block');
            setTimeout((e) => {
                $('.navigation-links').addClass('navigation-links-slide-up');
            }, 0);
            $('#protograph_filter_icon').css('display', 'none');
            $('#protograph_filter_close_icon').css('display', 'block');
            setTimeout((i) => {
                $('.protograph-app-filter-icon').removeClass('block-events');
            }, 500);
        }));

        $('#protograph_filter_close_icon').on('click', ((e) => {
            $('.protograph-app-filter-icon').addClass('block-events');
            $('.navigation-links').removeClass('navigation-links-slide-up');
            setTimeout((e) => {
                $('.navigation-links').css('display', 'none');
                $('.protograph-app-filter-icon').removeClass('block-events');
            }, 500);
            $('#protograph_filter_icon').css('display', 'block');
            $('#protograph_filter_close_icon').css('display', 'none');
        }));
    }

    if ($('#related_container').children().length > 1) {
        $('#related_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = $element.attr("iframe-url");

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
            inView('.ProtoCard-related-articles')
                .on('enter', (e) => {
                    let $e = $(e);
                    if (!$e.find('iframe').length) {
                        new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
                            headerJSON: headerJSON
                        });
                    }
                });
        }
    } else {
        $("#related_container").siblings(".column-title").hide();
        $('#related_container').css('display', 'none');
    }


    if ($('#article').children().length > 1) {
        $('#article div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = $element.attr("iframe-url");

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
            inView('.ProtoCard-articles')
                .on('enter', (e) => {
                    let $e = $(e);
                    if (!$e.find('iframe').length) {
                        new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
                            headerJSON: headerJSON
                        });
                    }
                });
        }
    } else {
        $('#cont-button').css('display', 'none');
    }

    inView('.proto-lazy-load-card')
        .on('enter', (e) => {

            e.classList.remove('proto-lazy-load-card')
            let card_s3_identifier = $(e).attr('card-id');
            let instance = $(e).attr('card-instance');
            let view_cast_id = $(e).attr('card-viewcast-id');
            let url = card_s3_identifier;    //url to fetch card from s3
            setTimeout(function(){
                if(instance && view_cast_id){
                        let x = new ProtoGraph.Card[instance]();
                        x.init({
                            "selector": document.querySelector(`#proto_${view_cast_id}`),
                            "isFromSSR": true,
                            "data_url" : url,
                            "site_configs": ProtoGraph.site
                        });
                        x.render();
                }
            },0)
        });

    if ($('#cover_container div[data-ssr="false"]').length) {
        $('#cover_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = $element.attr('iframe-url');

            url = `${url}%26page_url=${location.href}`;
            if (is_lazy_loading_activated) {
                $element.attr('mode', mode_for_cover);
            } else {
                setTimeout(function () {
                    new ProtoEmbed.initFrame($element, url, mode_for_cover, {
                        headerJSON: headerJSON
                    });
                }, 0)
            }
        });
        if (is_lazy_loading_activated) {
            inView('#cover_container div[data-ssr="false"]')
                .on('enter', (e) => {
                    let $e = $(e);
                    if (!$e.find('iframe').length) {
                        new ProtoEmbed.initFrame($e[0], `${$e.attr('iframe-url')}%26page_url=${location.href}`, $e.attr('mode'), {
                            headerJSON: headerJSON
                        });
                    }
                });
        }
    }
}