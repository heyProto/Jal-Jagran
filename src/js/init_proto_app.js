import {throttle } from './utility.js'
window.ProtoGraph = window.ProtoGraph || {};

ProtoGraph.renderNavbar = function () {
    let mode = window.innerWidth <= 500 ? 'mobile' : 'laptop';
    processAndRenderVerticalNavbar(ProtoGraph.vertical_header_json, mode);
    processAndRenderHomepageNavbar(ProtoGraph.homepage_header_json, mode);
    // processAndRenderSiteHeader(ProtoGraph.site_header_json);
    ProtoGraph.headerJSON = ProtoGraph.site_header_json;
    ProtoGraph.initPage();
    if (ProtoGraph.initDataApp && ProtoGraph.initDataApp.constructor === Function) {
        ProtoGraph.initDataApp();
    }
    // fetchNavbarObjects().then((data) => {
    // }).catch((reject) => {
    //     console.error("Error fetching data : ", reject);
    // })
}

// function fetchNavbarObjects() {
//     return Promise.all([
//         getJSONPromise(ProtoGraph.vertical_header_json_url),
//         getJSONPromise(ProtoGraph.homepage_header_json_url),
//         getJSONPromise(ProtoGraph.site_header_json_url)
//     ]);
// }

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

    $('.proto-app-scroll-to-top').on('click', (e) => {
        $('.proto-app-scroll-to-top').removeClass('proto-app-show');
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });
}

function getHost(url) {
    let a = document.createElement('a');
    a.href = url;
    return a.hostname;
}

function getImagePath(image_name) {
    return `https://cdn.protograph.pykih.com/Assets/proto-app/img/${image_name}`;
}

function identifySSURL(link) {
    let social_share_domains = [
        {
            domain: "www.facebook.com",
            image_name: "fb-colour-icon.png"
        },
        {
            domain: "twitter.com",
            image_name: "twitter-colour-icon.png"
        },
        {
            domain: "www.youtube.com",
            image_name: "youtube-colour-icon.png"
        },
        {
            domain: "www.instagram.com",
            image_name: "insta-colour-icon.png"
        }
    ],
    url_domain = getHost(link.url);

    for (let i = 0; i < social_share_domains.length; i++) {
        if (url_domain === social_share_domains[i].domain || (social_share_domains[i].domain.indexOf(url_domain) >= 0)) {
            return social_share_domains[i];
        }
    }
    return false;
}

function processAndRenderVerticalNavbar(data, mode) {
    if (data.length > 0) {
        let HTML = "",
            FooterHTML = "",
            first_navigation,
            d = data[0],
            next_arrow = $('#proto-navbar-next');
        data.forEach((e, i) => {
            let social_share = identifySSURL(e);
            if(e.menu && e.menu == "Vertical Footer"){
                FooterHTML += `<span class='proto-footer-link'><span class="footer-link"><a href="${e.url}" target=${e.new_window ? "_blank" : "_self" }>${e.name}</a></span><span class="light-link dot-seprater">&#8231;</span></span>`;
            } else {
                if (social_share) {
                    HTML += `<div class="proto-app-navbar-page-links">
                        <a href="${e.url}" target=${e.new_window ? "_blank" : "_self"}>
                            <img src="${getImagePath(social_share['image_name'])}" />
                        </a>
                    </div>`;
                } else {
                    HTML += `<div class="proto-app-navbar-page-links">
                        <a href="${e.url}" target=${e.new_window ? "_blank" : "_self"}>${e.name}</a>
                    </div>`;
                }

            }
        });
        $('#vertical_nav').html(HTML);
        if (FooterHTML !== "") {
            FooterHTML = FooterHTML.replace(/<span class="light-link dot-seprater">&#8231;<\/span><\/span>$/, "</span>");
        }
        $('#vertical_footer').html(FooterHTML);
        initNavbarInteraction(mode);
        if($('.proto-footer').length){
            initFooterInteraction(mode);
        }

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
                $('.proto-app-navbar-left-click-arrow').css('display', 'inline-block');

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
        items = $('.proto-app-navbar-page-navigation .proto-app-navbar-overlay .proto-app-navbar-navigation-scroll .proto-app-navbar-page-links'),
        arrows = [],
        items_count = items.length,
        navBar = $('.proto-app-navbar-page-navigation'),
        navBarBBox = navBar[0].getBoundingClientRect();

    items.each((i, e) => {
        var $e = $(e);
        $e.attr('data-item', i);
        width += e.getBoundingClientRect().width;
    });
    $('#vertical_nav').css('width', width);
    if (width > navBarBBox.width) {
        var firstElement = $('#vertical_nav .proto-app-navbar-page-links[data-item="0"]'),
            lastElement = $(`#vertical_nav.proto-app-navbar-navigation-scroll .proto-app-navbar-page-links[data-item="${items_count - 1}"]`),
            lastElementBBox = lastElement[0].getBoundingClientRect();

        if ((firstElement.offset().left !== navBar.offset().left) || mode === "mobile") {
            arrows.push('.proto-app-navbar-left-click-arrow');
        }
        if ((lastElement.offset().left + lastElementBBox.width) > (navBar.offset().left + navBar.width())) {
            arrows.push('.proto-app-navbar-right-click-arrow');
        }
        $(arrows.join(',')).css('display', 'inline-block');
    }

    initArrowEvents(mode);
    initNavbarScrollEvents(mode);
}
function initFooterInteraction(mode) {
    let width = 1,
        items = $('#vertical_footer .proto-footer-link'),
        arrows = [],
        items_count = items.length,
        navBar = $('.links-area'),
        navBarBBox = navBar[0].getBoundingClientRect();

    items.each((i, e) => {
        var $e = $(e);
        $e.attr('data-item', i);
        width += e.getBoundingClientRect().width;
    });

    if (width > navBarBBox.width) {
        $('#vertical_footer').css('width', width);
        var firstElement = $('#vertical_footer .proto-footer-link[data-item="0"]'),
            lastElement = $(`#vertical_footer .proto-footer-link[data-item="${items_count - 1}"]`),
            lastElementBBox = lastElement[0].getBoundingClientRect();

        if ((firstElement.offset().left !== navBar.offset().left)) {
            arrows.push('.left-arrow');
        }
        if ((lastElement.offset().left + lastElementBBox.width) > (navBar.offset().left + navBar.width())) {
            arrows.push('.right-arrow');
        }
        $(arrows.join(',')).css('display', 'inline-block');
    }
    initFooterArrowEvents(mode);
    // initNavbarScrollEvents(mode);
}


function initArrowEvents(mode) {
    var window_items = [],
        items = $('.proto-app-navbar-page-navigation .proto-app-navbar-navigation-scroll .proto-app-navbar-page-links'),
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
        if (mode === "mobile" && stateOfNavbar.length === 1) {
            $('.proto-app-navbar-navigation-bar').css('display', 'none');
            $('.proto-app-navbar-logo-holder').css('display', 'inline-block');
            return;
        }

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

        if (stateOfNavbar.length === 1 && mode !== 'mobile') {
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
            window_items = new_window_items.sort((a,b) => a - b);


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

function initNavbarScrollEvents(mode) {

    let navbar = $('#proto_app_header'),
        navbarOutOfWindow = false,
        lastScrollTop = 0,
        didScroll,
        scrollDirection,
        staticNavbarTop = navbar.offset().top,
        staticNavbarHeight = navbar.height(),
        projectBy = $('.proto-app-navbar-project-by');

    $(window).scroll(throttle(function (event) {
        let currentScrollTop = $(window).scrollTop(),
            navbarIsFixed = navbar.hasClass('proto-app-fixed-navbar');

        if (currentScrollTop > lastScrollTop) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }

        if (scrollDirection === "down") {
            if (currentScrollTop >= (staticNavbarTop + staticNavbarHeight)) {
                navbar.css('top', `-${staticNavbarTop}px`);
                navbarOutOfWindow = true;
            } else {
                navbarOutOfWindow = false;
            }
        } else {
            if (currentScrollTop >= staticNavbarTop) {
                navbarOutOfWindow = true;
            } else {
                navbarOutOfWindow = false;
            }
        }

        if (scrollDirection === 'up') {
            if (navbarOutOfWindow) {
                if (!navbarIsFixed) {
                    navbar.addClass('proto-app-fixed-navbar');
                    navbar.animate({
                        'top': '0px',
                    }, 250);
                    // projectBy.css('display','inline-block');
                }
            } else {
                navbar.removeClass('proto-app-fixed-navbar');
                // projectBy.css('display','none');
            }
        }

        if (scrollDirection === 'down' && navbarIsFixed) {
            navbar.animate({
                'top': `-${staticNavbarTop}px`
            }, 150, () => {
                navbar.removeClass('proto-app-fixed-navbar');
            });

        }

        lastScrollTop = currentScrollTop;
    },100));
}

function initFooterArrowEvents(mode) {
    var window_items = [],
        items = $('#vertical_footer .proto-footer-link'),
        min = 0,
        max = items.length - 1,
        navBar = document.querySelector('.links-area'),
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

    $('#proto-footer-prev').on('click', (e) => {
        // if (mode === "mobile" && stateOfNavbar.length === 1) {
        //     $('.proto-app-navbar-navigation-bar').css('display', 'none');
        //     $('.proto-app-navbar-logo-holder').css('display', 'inline-block');
        //     return;
        // }

        let popedElement = stateOfNavbar.pop(),
            currentElement = stateOfNavbar[stateOfNavbar.length - 1],
            next = $('#proto-footer-next');

        window_items = currentElement.window_items;

        if (next.css('display') !== 'inline-block') {
            next.css('display', 'inline-block');
        }

        $('.links-area').css('overflow', 'scroll');
        $('.links-area').animate({
            scrollLeft: currentElement.scrollLeft
        }, 'fast');
        $('.links-area').css('overflow', 'hidden');

        if (stateOfNavbar.length === 1 && mode !== 'mobile') {
            $('#proto-footer-prev').css('display', 'none');
        }
    });

    $('#proto-footer-next').on('click', (e) => {
        let firstElement = window_items[0],
            lastElement = window_items[window_items.length - 1],
            new_width = 0,
            new_window_items = [],
            prev = $('#proto-footer-prev');

        if (lastElement !== max) {
            if (prev.css('display') !== 'inline-block') {
                prev.css('display', 'inline-block');

            }

            for (let i = firstElement + 1; i <= max; i++) {
                let element = document.querySelector(`#vertical_footer .proto-footer-link[data-item="${i}"]`),
                    width = element.getBoundingClientRect().width;

                if ((new_width + width) <= navBarBBox.width) {
                    new_width += width;
                    new_window_items.push(i);
                } else {
                    break;
                }
            }
            window_items = new_window_items.sort((a,b) => a - b);


            let nextElem = $(`#vertical_footer .proto-footer-link[data-item="${window_items[0]}"]`),
            scrollLeft = $('.links-area').scrollLeft(),
            newScrollLeft = scrollLeft + nextElem.position().left;
            stateOfNavbar.push({
                window_items: window_items,
                scrollLeft: newScrollLeft
            });

            $('.links-area').css('overflow', 'scroll');
            $('.links-area').animate({
                scrollLeft: newScrollLeft
            }, 'fast');
            $('.links-area').css('overflow', 'hidden');
            if (window_items[window_items.length - 1] === max) {
                $('#proto-footer-next').css('display', 'none');
            }
        }
    });
}

function processAndRenderHomepageNavbar(data, mode) {
    let homepage_object = data.filter((e, i) => {
        return e.name === ProtoGraph.ref_category_object.name
    })[0];

    if (mode !== 'mobile' && homepage_object['show_by_publisher_in_header']) {
        $('.proto-app-navbar-project-by').css('display', 'inline-block');
    }
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

// function processAndRenderSiteHeader(data) {
//     if (data) {
//         $('#site_header').css('background', data.header_background_color);
//         let logo_div = $('#site_header .proto-app-navbar-proto-container .proto-app-navbar-site-logo');
//         logo_div.addClass(`proto-app-navbar-position-${data.header_logo_position}`);
//         logo_div.append(`<a href="${data.header_jump_to_link}" target="_blank" title="${data.header_tooltip ? data.header_tooltip : '' }" ><img src="${data.header_logo_url}" height="50px" /></a>`);
//         if (data.show_proto_logo) {
//             $('.proto-app-navbar-logo').css('display', 'inline-block');
//         }
//     }
// }

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