import Util from './utility.js'

ProtoGraph.initPage = function initPage() {
    let dimension = Util.getScreenSize(),
        mode = (dimension.width <= 500) ? 'mobile' : 'laptop',
        render_mode = (dimension.width <= 500) ? 'col4' : 'col7',
        cover_height = (dimension.width <= 500) ? '250px' : '430px',
        background_size = (dimension.width <= 500) ? 'cover' : '100%',
        streams = ProtoGraph.streams,
        page = ProtoGraph.page,
        headerJSON = ProtoGraph.headerJSON,
        navigation_items = $("#myNavbar ul li");

    if (!navigation_items.length) {
        $("#sticker").css('display', "none");
    }

    document.getElementById('facebook-share-link').href = 'http://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
    document.getElementById('twitter-share-link').href = 'http://twitter.com/share?url=' + window.location.href;

    if (mode === 'laptop') {
        $("#sticker").sticky({ topSpacing: 0, bottomSpacing: 400 });
        $('.related-articles-link').sticky({ topSpacing: 20, bottomSpacing: 400 });
        $('#cont-button').on('click', (e) => {
            $('#cont-button').css('display', 'none');
            document.getElementById('article').className = 'article-area';
            $('.single-index-value').addClass('activate-click');
            $('body').scrollspy({
                target: '#myNavbar',
                offset: 70
            });
        })
        if (streams["7c"]) {
            Util.getJSON(streams["7c"].url, function (err, data) {
                if (err != null) {
                    console.error("Error fetching more in series stream", err);
                } else {
                    let originals_container = document.getElementById("more_articles_container");
                    if (data.length > 0) {
                        let len;
                        data.length <= 4 ? len = data.length : len = 4;
                        for (let i = 0; i < len; i++) {
                            let createDiv = document.createElement('div');
                            createDiv.id = 'ProtoCard-more-articles' + i;
                            createDiv.className = 'ProtoCard-more-articles';
                            originals_container.appendChild(createDiv);
                            let createMarginDiv = document.createElement('div');
                            setTimeout(function () {
                                new ProtoEmbed.initFrame(document.getElementById("ProtoCard-more-articles" + i), data[i].iframe_url, "col4", {
                                    headerJSON: headerJSON
                                });
                            }, 0)
                        }
                    } else {
                        $(originals_container).siblings(".column-title").hide();
                    }
                }
            });
        }
    }

    if (mode == 'mobile') {
        $('#cont-button').on('click', (e) => {
            $('#cont-button').css('display', 'none');
            document.getElementById('article').className = 'article-area';
            $('.single-index-value').addClass('activate-click');
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

    Util.getJSON(streams['Related'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching Relative stream", err);
        } else {
            let originals_container = document.getElementById("related_container");
            if (data.length > 0) {
                data.map((d, i) => {
                    let createDiv = document.createElement('div');
                    createDiv.id = 'ProtoCard-originals' + i;
                    // createDiv.className= 'ProtoCard-originals';
                    originals_container.appendChild(createDiv);
                    let createMarginDiv = document.createElement('div');
                    createMarginDiv.style.marginBottom = "20px";
                    originals_container.appendChild(createMarginDiv);
                    setTimeout(function () {
                        new ProtoEmbed.initFrame(document.getElementById("ProtoCard-originals" + i), data[i].iframe_url, "col4", {
                            headerJSON: headerJSON
                        });
                    }, 0)
                })
            } else {
                $(originals_container).siblings(".column-title").hide();
            }
        }
    });

    Util.getJSON(streams['Narrative'].url, function (err, data) {
        if (err != null) {
            console.error("Error fetching Narrative stream", err);
        } else {
            let article_container = document.getElementById("article");
            ProtoGraph.total_narrative_iframes = data.length;
            ProtoGraph.total_narrative_iframes_loaded = 0;
            if (data.length > 0) {
                data.map((d, i) => {
                    setTimeout(function () {
                        var sandbox_iframe = new ProtoEmbed.initFrame($("#article #" + d.view_cast_id)[0], data[i].iframe_url, render_mode, {
                            headerJSON: headerJSON
                        });
                    }, 0)
                })
            } else {
                $('#cont-button').css('display', 'none');
            }
        }
    });

    if (streams['16c_Hero']) {
        Util.getJSON(streams['16c_Hero'].url, function (err, data) {
            if (err != null) {
                console.error("Error fetching 16c stream", err);
            } else {
                let cover_container = document.getElementById("col_16_cover_container"),
                    mode_for_cover = (mode === 'mobile') ? "col4" : "col16";

                if (data.length > 0) {
                    data = [data[0]];
                    data.map((d, i) => {
                        setTimeout(function () {
                            var sandbox_iframe = new ProtoEmbed.initFrame($("#col_16_cover_container #" + d.view_cast_id)[0], data[i].iframe_url, mode_for_cover);
                        }, 0)
                    })
                } else {
                    $('#col_16_cover_container').append(`
                        <div class="fixed-cover-block fixed-cover-block-small" id="proto_col_16_cover_blank">
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
                            });
                        });
                    }
                }
            }
        });
    } else {
        $('#col_16_cover_container').append(`
            <div class="fixed-cover-block fixed-cover-block-small" id="proto_col_16_cover_blank">
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
