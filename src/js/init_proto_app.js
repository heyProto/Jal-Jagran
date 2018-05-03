window.ProtoGraph = window.ProtoGraph || {};

ProtoGraph.renderNavbar = function () {
    let mode = window.innerWidth <= 500 ? 'mobile' : 'laptop';
    fetchNavbarObjects().then((data) => {
        processAndRenderVerticalNavbar(data[0], mode);
        processAndRenderHomepageNavbar(data[1], mode);
        processAndRenderSiteHeader(data[2]);
        ProtoGraph.headerJSON = data[2];
        ProtoGraph.initPage();
        if (ProtoGraph.initDataApp && ProtoGraph.initDataApp.constructor === Function) {
            ProtoGraph.initDataApp();
        }
    }).catch((reject) => {
        console.error("Error fetching data : ", reject);
    })
}

function fetchNavbarObjects() {
    return Promise.all([
        getJSONPromise(ProtoGraph.vertical_header_json_url),
        getJSONPromise(ProtoGraph.homepage_header_json_url),
        getJSONPromise(ProtoGraph.site_header_json_url)
    ]);
}

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

ProtoGraph.initBackToTop = function() {
    $(window).scroll((e) => {
        if ($(e.target).scrollTop() > 100) {
            // downscroll code
            $('.proto-app-scroll-to-top').addClass('proto-app-show');
        } else {
            // upscroll code
            $('.proto-app-scroll-to-top').removeClass('proto-app-show');
        }
    })
    // $(window).scroll(throttle(function (event) {
    //     // var st = $('.protograph-app-main-container').scrollTop(),
    //     //     isActive = $('.protograph-app-swipe-left').hasClass('protograph-app-slide-down');
    // }, 100));

    $('.proto-app-scroll-to-top').on('click', (e) => {
        $('.proto-app-scroll-to-top').removeClass('proto-app-show');
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });
}

function processAndRenderVerticalNavbar(data, mode) {
    if (data.length > 0) {
        let HTML = "",
            first_navigation,
            d = data[0],
            next_arrow = $('#proto-navbar-next');

        data.forEach((e, i) => {
            HTML += `<div class="proto-app-navbar-page-links">
                        <a href="${e.url}" target=${e.new_window ? "_blank" : "_self"}>${e.name}</a>
                    </div>`
        });
        $('#vertical_nav').append(HTML);
        initNavbarInteraction(mode);

        if (mode === "mobile") {
            first_navigation = $('.proto-app-navbar-first-navigation span');
            // first_navigation.attr('href', d.url);
            // first_navigation.attr('target', d.new_window ? "_blank" : "_self");
            first_navigation.html(d.name);

            $('.proto-app-navbar-navigation-bar').css('opacity', 1);
            $('.proto-app-navbar-navigation-bar').css('display', 'none');
            $('.proto-app-navbar-first-navigation').on('click', function () {
                $('.proto-app-navbar-navigation-bar').css('display', 'inline-block');
                $('.proto-app-navbar-logo-holder').css('display', 'none');

                // if (next_arrow.css('display') !== 'none') {
                //     $('#proto-navbar-next').click();
                // }
            });
        }
    } else {
        if (mode === "mobile") {
            $('.proto-app-navbar-first-navigation').css('display', 'none');
            $('.proto-app-navbar-navigation-bar').css('opacity', 1);
            $('.proto-app-navbar-navigation-bar').css('display', 'none');
        }
    }
}

function initNavbarInteraction(mode) {
    let width = 0,
        items = $('.proto-app-navbar-navigation-scroll .proto-app-navbar-page-links'),
        arrows = [],
        items_count = items.length,
        navBar = $('.proto-app-navbar-page-navigation'),
        navBarBBox = navBar[0].getBoundingClientRect();

    items.each((i, e) => {
        var $e = $(e);
        $e.attr('data-item', i);
        width += e.getBoundingClientRect().width;
    });
    $('.proto-app-navbar-navigation-scroll').css('width', width);
    if (width > navBarBBox.width) {
        var firstElement = $('.proto-app-navbar-navigation-scroll .proto-app-navbar-page-links[data-item="0"]'),
            lastElement = $(`.proto-app-navbar-navigation-scroll .proto-app-navbar-page-links[data-item="${items_count - 1}"]`);

        console.log(navBar.offset(), "NAVBAR");
        console.log(firstElement.offset(), "FIRST ELEMENT");
        console.log(lastElement.offset(), "Last ELEMENT");

        if (firstElement.offset().left !== navBar.offset().left) {
            arrows.push('.proto-app-navbar-left-click-arrow');
        }
        console.log(lastElement.offset().left > (navBar.offset().left + navBar.width()),navBar.width(), "condition")
        if (lastElement.offset().left > (navBar.offset().left + navBar.width())) {
            arrows.push('.proto-app-navbar-right-click-arrow');
        }
        $(arrows.join(',')).css('display', 'inline-block');
    }

    initArrowEvents();
}

function initArrowEvents(events) {
    var window_items = [],
        items = $('.proto-app-navbar-navigation-scroll .proto-app-navbar-page-links'),
        min = 0,
        max = items.length - 1,
        navBar = document.querySelector('.proto-app-navbar-page-navigation'),
        navBarBBox = navBar.getBoundingClientRect(),
        stateOfNavbar = [];

    items.each((i, e) => {
        $(e).attr('data-item', i);
        let left = $(e).position().left,
            width = e.getBoundingClientRect().width;

        if ((left + width) <= navBarBBox.width) {
            window_items.push(i);
        }
    });

    stateOfNavbar.push({
        window_items: window_items,
        scrollLeft: 0
    });

    $('#proto-navbar-prev').on('click', (e) => {
        let popedElement = stateOfNavbar.pop(),
            currentElement = stateOfNavbar[stateOfNavbar.length - 1],
            next = $('#proto-navbar-next');

        window_items = currentElement.window_items;

        if (next.css('display') !== 'inline-block') {
            next.css('display', 'inline-block');
        }

        $('.proto-app-navbar-overlay').css('overflow', 'scroll');
        $('.proto-app-navbar-overlay').animate({
            scrollLeft: currentElement.scrollLeft
        }, 'fast');
        $('.proto-app-navbar-overlay').css('overflow', 'hidden');

        if (stateOfNavbar.length === 1) {
            $('#proto-navbar-prev').css('display', 'none');
        }
    });

    $('#proto-navbar-next').on('click', (e) => {
        let firstElement = window_items[0],
            lastElement = window_items[window_items.length - 1],
            new_width = 0,
            new_window_items = [],
            prev = $('#proto-navbar-prev');

        if (lastElement !== max) {
            if (prev.css('display') !== 'inline-block') {
                prev.css('display', 'inline-block');
            }

            for (let i = firstElement + 1; i <= max; i++) {
                let element = document.querySelector(`.proto-app-navbar-page-links[data-item="${i}"]`),
                    width = element.getBoundingClientRect().width;


                if ((new_width + width) <= navBarBBox.width) {
                    new_width += width;
                    new_window_items.push(i);
                } else {
                    break;
                }
            }
            window_items = new_window_items.sort();


            let nextElem = $(`.proto-app-navbar-page-links[data-item="${window_items[0]}"]`),
            scrollLeft = $('.proto-app-navbar-overlay').scrollLeft(),
            newScrollLeft = scrollLeft + nextElem.position().left;

            stateOfNavbar.push({
                window_items: window_items,
                scrollLeft: newScrollLeft
            });

            $('.proto-app-navbar-overlay').css('overflow', 'scroll');
            $('.proto-app-navbar-overlay').animate({
                scrollLeft: newScrollLeft
            }, 'fast');
            $('.proto-app-navbar-overlay').css('overflow', 'hidden');

            if (window_items[window_items.length - 1] === max) {
                $('#proto-navbar-next').css('display', 'none');
            }
        }
    });
}
function processAndRenderHomepageNavbar(data, mode) {
    let homepage_object = data.filter((e, i) => {
        return e.name === ProtoGraph.ref_category_object.name
    })[0],
    home_navbar = '#homepage_nav';

    let nav_title = $(home_navbar).html();
    $(home_navbar).html(`<a href="${homepage_object.url}" >${nav_title}</a>`);
}

// Old Homepage Navbar
// function processAndRenderHomepageNavbar(data, mode) {
//     let filtered_data = data.filter((e, i) => {
//         return e.name !== ProtoGraph.ref_category_object.name
//     }),
//     homepage_object = data.filter((e, i) => {
//         return e.name === ProtoGraph.ref_category_object.name
//     })[0],
//     home_navbar,
//     home_navbar_list,
//     width,
//     top,
//     border_radius,
//     left;

//     switch (mode) {
//         case 'laptop':
//             home_navbar = '#homepage_nav';
//             home_navbar_list = '#homepage_nav_list';
//             // width = $('#homepage_nav').width() + 50;
//             width = "250px"
//             border_radius = "4px";
//             // left = $('.proto-verticals-navbar').offset().left;
//             break;
//         case 'mobile':
//             home_navbar = '.branding';
//             home_navbar_list = '#mobile_homepage_nav_list';
//             // width = $('.branding').width() + 50;
//             width = "100%";
//             top = "140px";
//             border_radius = "0px";
//             // left = 0;
//             break;
//     }

//     if (filtered_data.length > 0) {
//         $('.proto-hide').removeClass('proto-hide');
//         $(home_navbar_list).css({
//             "width": width,
//             "top": top,
//             "border-radius": border_radius,
//             "left": 0
//         });
//         $(home_navbar).css('cursor', 'pointer');
//         $(home_navbar).on('click', (e) => {
//             let list = $(home_navbar_list);
//             if (list.hasClass('open-navbar')) {
//                 $(home_navbar_list).removeClass('open-navbar');
//             } else {
//                 $(home_navbar_list).addClass('open-navbar');
//             }
//         });

//         let HTML = "";
//         filtered_data.forEach((e, i) => {
//             HTML += `<div class="proto-vertical-name home-header-nav">
//                 <a href="${e.url}" >${e.name_html}</a>
//             </div>`
//         });
//         $(home_navbar_list).append(HTML);
//     } else if (homepage_object) {
//         let nav_title = $(home_navbar).html();
//         $(home_navbar).html(`<a href="${homepage_object.url}" >${nav_title}</a>`);
//     }
// }

function processAndRenderSiteHeader(data) {
    if (data) {
        $('#site_header').css('background', data.header_background_color);
        let logo_div = $('#site_header .proto-app-navbar-proto-container .proto-app-navbar-site-logo');
        logo_div.addClass(`proto-app-navbar-position-${data.header_logo_position}`);
        logo_div.append(`<a href="${data.header_jump_to_link}" target="_blank"><img src="${data.header_logo_url}" height="50px" /></a>`);
        if (data.show_proto_logo) {
            $('.proto-app-navbar-logo').css('display', 'inline-block');
        }
    }
}

function getJSONPromise(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText)
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}
document.addEventListener("DOMContentLoaded", function (event) {
    ProtoGraph.renderNavbar();
    ProtoGraph.initBackToTop();
});