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

    initFBTWShareLinks();

    if (mode === 'laptop') {
        // Note: Dont remove the updateSidebarHeight: false, fixes very weard errors. Also this is not there in documentation of library.
        $('#cont-button').on('click', (e) => {
            $('#cont-button').css('display', 'none');
            $("#related_container .fade-area").css('display', 'none');

            $("#sticker .fade-area").css('display', 'none');
            $("#sticker").removeClass('proto-hidden-article-content');

            $("#related_container .fade-area").css('display', 'none');
            $("#related_container").removeClass('proto-hidden-article-content');

            document.getElementById('article').className = 'article-area';
            $('.single-index-value').addClass('activate-click');
            $('body').scrollspy({
                target: '#myNavbar',
                offset: 70
            });
            initScroll();
            $('#sticker').theiaStickySidebar({
                containerSelector: ".cover-page-overlay",
                sidebarBehavior: "stick-to-top",
                customScrollCalculations: true,
                additionalMarginTop: 50,
                additionalMarginBottom: 20,
                updateSidebarHeight: false
            });
            $('.related-articles-link').theiaStickySidebar({
                containerSelector: ".cover-page-overlay",
                sidebarBehavior: "stick-to-top",
                additionalMarginTop: 50,
                additionalMarginBottom: 20,
                updateSidebarHeight: false
            });
        });

        //Temp code
        $("#more_articles_container").siblings(".column-title").hide();
        $("#more_intersections_container").siblings(".column-title").hide();
        $("#more_sub_intersections_container").siblings(".column-title").hide();

        // if (more_in_the_series && Object.keys(more_in_the_series).length) {
        //     // Util.getJSON(more_in_the_series.url, function (err, data) {
        //     //     if (err != null) {
        //     //         console.error("Error fetching more in series stream", err);
        //     //     } else {
        //     //         let originals_container = document.getElementById("more_articles_container");
        //     //         if (data.length > 0) {
        //     //             let len;
        //     //             data.length <= 4 ? len = data.length : len = 4;
        //     //             for (let i = 0; i < len; i++) {
        //     //                 let createDiv = document.createElement('div');
        //     //                 createDiv.id = 'ProtoCard_more_articles' + i;
        //     //                 createDiv.setAttribute('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
        //     //                 createDiv.setAttribute('mode', "col4");
        //     //                 createDiv.className = 'ProtoCard-more-articles ProtoCard-more-in-series-articles';
        //     //                 originals_container.appendChild(createDiv);
        //     //                 let createMarginDiv = document.createElement('div');

        //     //                 if (is_lazy_loading_activated) {
        //     //                     inView('.ProtoCard-more-in-series-articles')
        //     //                         .on('enter', (e) => {
        //     //                             let $e = $(e);
        //     //                             if (!$e.find('iframe').length) {
        //     //                                 new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
        //     //                                     headerJSON: headerJSON
        //     //                                 });
        //     //                             }
        //     //                         });
        //     //                 } else {
        //     //                     setTimeout(function () {
        //     //                         new ProtoEmbed.initFrame(document.getElementById("ProtoCard_more_articles" + i), `${data[i].iframe_url}%26domain=${location.hostname}`, "col4", {
        //     //                             headerJSON: headerJSON
        //     //                         });
        //     //                     }, 0)
        //     //                 }
        //     //             }
        //     //         } else {
        //     //             $(originals_container).siblings(".column-title").hide();
        //     //         }
        //     //     }
        //     // });
        // } else {
        //     $("#more_articles_container").siblings(".column-title").hide();
        // }
        // if (more_in_the_intersection && Object.keys(more_in_the_intersection).length) {
        //     // Util.getJSON(more_in_the_intersection.url, function (err, data) {
        //     //     if (err != null) {
        //     //         console.error("Error fetching more in interaction stream", err);
        //     //     } else {
        //     //         let originals_container = document.getElementById("more_intersections_container");
        //     //         if (data.length > 0) {
        //     //             let len;
        //     //             data.length <= 4 ? len = data.length : len = 4;
        //     //             for (let i = 0; i < len; i++) {
        //     //                 let createDiv = document.createElement('div');
        //     //                 createDiv.id = 'ProtoCard_more_intersections' + i;
        //     //                 createDiv.setAttribute('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
        //     //                 createDiv.setAttribute('mode', "col4");
        //     //                 createDiv.className = 'ProtoCard-more-articles ProtoCard-more-in-interaction-articles';
        //     //                 originals_container.appendChild(createDiv);
        //     //                 let createMarginDiv = document.createElement('div');

        //     //                 if (is_lazy_loading_activated) {
        //     //                     inView('.ProtoCard-more-in-interaction-articles')
        //     //                         .on('enter', (e) => {
        //     //                             let $e = $(e);
        //     //                             if (!$e.find('iframe').length) {
        //     //                                 new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
        //     //                                     headerJSON: headerJSON
        //     //                                 });
        //     //                             }
        //     //                         });
        //     //                 } else {
        //     //                     setTimeout(function () {
        //     //                         new ProtoEmbed.initFrame(document.getElementById("ProtoCard_more_intersections" + i), `${data[i].iframe_url}%26domain=${location.hostname}`, "col4", {
        //     //                             headerJSON: headerJSON
        //     //                         });
        //     //                     }, 0)
        //     //                 }

        //     //             }
        //     //         } else {
        //     //             $(originals_container).siblings(".column-title").hide();
        //     //         }
        //     //     }
        //     // });
        // } else {
        //     $("#more_intersections_container").siblings(".column-title").hide();
        // }
        // if (more_in_the_sub_intersection && Object.keys(more_in_the_sub_intersection).length) {
        //     // Util.getJSON(more_in_the_sub_intersection.url, function (err, data) {
        //     //     if (err != null) {
        //     //         console.error("Error fetching more in sub interaction stream", err);
        //     //     } else {
        //     //         let originals_container = document.getElementById("more_sub_intersections_container");
        //     //         if (data.length > 0) {
        //     //             let len;
        //     //             data.length <= 4 ? len = data.length : len = 4;
        //     //             for (let i = 0; i < len; i++) {
        //     //                 let createDiv = document.createElement('div');
        //     //                 createDiv.id = 'ProtoCard_more_sub_intersections' + i;
        //     //                 createDiv.setAttribute('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
        //     //                 createDiv.setAttribute('mode', "col4");
        //     //                 createDiv.className = 'ProtoCard-more-articles ProtoCard-more-in-sub-interaction-articles';
        //     //                 originals_container.appendChild(createDiv);
        //     //                 let createMarginDiv = document.createElement('div');

        //     //                 if (is_lazy_loading_activated) {
        //     //                     inView('.ProtoCard-more-in-sub-interaction-articles')
        //     //                         .on('enter', (e) => {
        //     //                             let $e = $(e);
        //     //                             if (!$e.find('iframe').length) {
        //     //                                 new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
        //     //                                     headerJSON: headerJSON
        //     //                                 });
        //     //                             }
        //     //                         });
        //     //                 } else {
        //     //                     setTimeout(function () {
        //     //                         new ProtoEmbed.initFrame(document.getElementById("ProtoCard_more_sub_intersections" + i), `${data[i].iframe_url}%26domain=${location.hostname}`, "col4", {
        //     //                             headerJSON: headerJSON
        //     //                         });
        //     //                     }, 0)
        //     //                 }
        //     //             }
        //     //         } else {
        //     //             $(originals_container).siblings(".column-title").hide();
        //     //         }
        //     //     }
        //     // });
        // } else {
        //     $("#more_sub_intersections_container").siblings(".column-title").hide();
        // }
    }

    if (mode == 'mobile') {
        $('#cont-button').on('click', (e) => {
            $('#protograph_filter_icon').css('display', 'block');
            $('#cont-button').css('display', 'none');
            document.getElementById('article').className = 'article-area';
            $('.single-index-value').addClass('activate-click');

            $("#sticker .fade-area").css('display', 'none');
            $("#sticker").removeClass('proto-hidden-article-content');

            $("#related_container .fade-area").css('display', 'none');
            $("#related_container").removeClass('proto-hidden-article-content');

            $('body').scrollspy({
                target: '#myNavbar',
                offset: 70
            });
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

        $('.hamburger-icon').on('click', (e) => {
            $('.mobile-navigations-screen').addClass('mobile-navigations-screen-slide-in')
        });

        $('.close-icon').on('click', (e) => {
            $('.mobile-navigations-screen').removeClass('mobile-navigations-screen-slide-in')
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
                url = `https://cdn.protograph.pykih.com/${template_card_id}/index.html?view_cast_id=${view_cast_id}%26base_url=${window.location.origin}%26domain=${location.hostname}`;

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

    // let ssr_cards = Object.keys(ProtoGraph.ssr_cards);
    // ssr_cards.forEach((s) => {
    //     ProtoGraph.ssr_cards[s].forEach((card) => {
    //         setTimeout((e)=>{
    //             let x = new ProtoGraph.Card[card.instance]();
    //             x.init({
    //                 "selector": document.querySelector(`#proto_${card.view_cast_id}`),
    //                 "isFromSSR": true,
    //                 "initialState": card.dataJSON,
    //                 "site_configs": ProtoGraph.site
    //             });
    //             x.render();
    //         },0)
    //     });
    // });


    inView('.proto-lazy-load-card')
        .on('enter', (e) => {

            e.classList.remove('proto-lazy-load-card')
            let card_s3_identifier = $(e).attr('card-id');
            let instance = $(e).attr('card-instance');
            let view_cast_id = $(e).attr('card-viewcast-id');
            let url = card_s3_identifier;    //url to fetch card from s3
            console.log(view_cast_id,url,instance)
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


    // Util.getJSON(streams['Related'].url, function (err, data) {
    //     if (err != null) {
    //         console.error("Error fetching relative stream", err);
    //     } else {
    //         if (data.length > 0) {
    //             data.map((d, i) => {
    //                 if (is_lazy_loading_activated) {
    //                     $("#related_container #ProtoCard_related_articles_" + d.view_cast_id).attr('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
    //                     $("#related_container #ProtoCard_related_articles_" + d.view_cast_id).attr('mode', "col4");
    //                 } else {
    //                     setTimeout(function () {
    //                         new ProtoEmbed.initFrame($("#related_container #ProtoCard_related_articles_" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, "col4", {
    //                             headerJSON: headerJSON
    //                         });
    //                     }, 0)
    //                 }
    //             });
    //             if (is_lazy_loading_activated) {
    //                 inView('.ProtoCard-related-articles')
    //                     .on('enter', (e) => {
    //                         let $e = $(e);
    //                         if (!$e.find('iframe').length) {
    //                             new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
    //                                 headerJSON: headerJSON
    //                             });
    //                         }
    //                     });
    //             }
    //         } else {
    //             $("#related_container").siblings(".column-title").hide();
    //             $('#related_container').css('display', 'none');
    //         }
    //     }
    // });

    // Util.getJSON(streams['Narrative'].url, function (err, data) {
    //     if (err != null) {
    //         console.error("Error fetching narrative stream", err);
    //     } else {
    //         if (data.length > 0) {
    //             data.map((d, i) => {
    //                 if (is_lazy_loading_activated) {
    //                     $("#article #article_" + d.view_cast_id).attr('iframe-url', `${data[i].iframe_url}%26domain=${location.hostname}`);
    //                     $("#article #article_" + d.view_cast_id).attr('mode', render_mode);
    //                 } else {
    //                     setTimeout(function () {
    //                         new ProtoEmbed.initFrame($("#article #article_" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}`, render_mode, {
    //                             headerJSON: headerJSON
    //                         });
    //                     }, 0)
    //                 }
    //             });
    //             if (is_lazy_loading_activated) {
    //                 inView('.ProtoCard-articles')
    //                     .on('enter', (e) => {
    //                         let $e = $(e);
    //                         if (!$e.find('iframe').length) {
    //                             new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
    //                                 headerJSON: headerJSON
    //                             });
    //                         }
    //                     });
    //             }
    //         } else {
    //             $('#cont-button').css('display', 'none');
    //         }
    //     }
    // });

    if ($('#col_16_cover_container div[data-ssr="false]').length) {
        $('#col_16_cover_container div[data-ssr="false"]').each((index, element) => {
            let $element = $(element),
                template_card_id = $element.attr("data-template_card_id"),
                view_cast_id = $element.attr("data-view_cast_id"),
                url = `https://cdn.protograph.pykih.com/${template_card_id}/index.html?view_cast_id=${view_cast_id}%26base_url=${window.location.origin}%26domain=${location.hostname}`;

            if (is_lazy_loading_activated) {
                $element.attr('iframe-url', url);
                $element.attr('mode', mode_for_cover);
            } else {
                setTimeout(function () {
                    new ProtoEmbed.initFrame(element, url, mode_for_cover, {
                        headerJSON: headerJSON
                    });
                }, 0)
            }
        });
        if (is_lazy_loading_activated) {
            inView('#col_16_cover_container')
                .on('enter', (e) => {
                    let $e = $(e);
                    if (!$e.find('iframe').length) {
                        new ProtoEmbed.initFrame($e[0], $e.attr('iframe-url'), $e.attr('mode'), {
                            headerJSON: headerJSON
                        });
                    }
                });
        }
        // Util.getJSON(streams['16c_Hero'].url, function (err, data) {
        //     if (err != null) {
        //         console.error("Error fetching 16c stream", err);
        //     } else {
        //         let cover_container = document.getElementById("col_16_cover_container"),
        //             mode_for_cover = (mode === 'mobile') ? "col4" : "col16";

        //         if (data.length > 0) {
        //             data = [data[0]];
        //             data.map((d, i) => {
        //                 setTimeout(function () {
        //                     var sandbox_iframe = new ProtoEmbed.initFrame($("#col_16_cover_container #" + d.view_cast_id)[0], `${data[i].iframe_url}%26domain=${location.hostname}%26page_url=${location.href}`, mode_for_cover, {
        //                         headerJSON: headerJSON
        //                     });
        //                 }, 0)
        //             })
        //         } else {
        //             $('#col_16_cover_container').append(`
        //                 <div class="fixed-cover-block fixed-cover-block-small" id="proto_col_16_cover_blank">
        //                     ${page.cover_image_url || page.cover_image_url_7_column ? '<div class="proto-black-background"></div>' : ''}
        //                     <h1 class="page-title bottom-pull-div">
        //                         ${page.headline}
        //                     </h1>
        //                 </div>
        //             `);
        //             if (page.cover_image_url || page.cover_image_url_7_column) {
        //                 setTimeout((e) => {
        //                     $('#proto_col_16_cover_blank').css({
        //                         'background-image': `url(${page.cover_image_url || page.cover_image_url_7_column})`,
        //                         'height': cover_height,
        //                         'background-size': background_size,
        //                         'background-repeat': "no-repeat"
        //                     });
        //                 });
        //             }
        //         }
        //     }
        // });
    } else {
        $('#col_16_cover_container').append(`
            <div class="fixed-cover-block fixed-cover-block-small" id="proto_col_16_cover_blank">
                ${page.cover_image_url || page.cover_image_url_7_column ? '<div class="proto-black-background"></div>' : ''}
                <h1 class="page-title bottom-pull-div">
                    ${page.headline}
                </h1>
            </div>
        `);
        if (page.cover_image_url || page.cover_image_url_7_column) {
            setTimeout((e) => {
                $('#proto_col_16_cover_blank').css({
                    'background-image': `url(${page.cover_image_url || page.cover_image_url_7_column})`,
                    'height': cover_height,
                    'background-size': background_size,
                    'background-repeat': "no-repeat"
                })
            });
        }
    }
}