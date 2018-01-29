window.ProtoGraph = window.ProtoGraph || {};

ProtoGraph.renderNavbar = function () {
    fetchNavbarObjects().then((data) => {
        processAndRenderVerticalNavbar(data[0]);
        processAndRenderHomepageNavbar(data[1]);
        processAndRenderSiteHeader(data[2])
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

function processAndRenderVerticalNavbar(data) {
    if (data.length > 0) {
        let HTML = "";
        data.forEach((e, i) => {
            HTML += `<div class="page-nav-single-option">
                <a href="${e.url}" target=${e.new_window ? "_blank" : "_self"}>${e.name}</a>
            </div>`
        });
        $('#vertical_nav').append(HTML);
    }
}

function processAndRenderHomepageNavbar(data) {
    let filtered_data = data.filter((e, i) => {
        return e.name !== ProtoGraph.ref_category_object.name
    });

    if (filtered_data.length > 0) {
        $('.proto-hide').removeClass('proto-hide');
        $('#homepage_nav_list').css({
            "width": $('#homepage_nav').width() + 50,
            "left": $('.proto-verticals-navbar').offset().left,
        });
        $('#homepage_nav').css('cursor', 'pointer');

        $('#homepage_nav').on('click', (e) => {
            let list = $('#homepage_nav_list');
            if (list.hasClass('open-navbar')) {
                $('#homepage_nav_list').removeClass('open-navbar');
            } else {
                $('#homepage_nav_list').addClass('open-navbar');
            }
        });

        let HTML = "";
        filtered_data.forEach((e, i) => {
            HTML += `<div class="proto-vertical-name home-header-nav">
                <a href="${e.url}" target=${e.new_window ? "_blank" : "_self"}>${e.name_html}</a>
            </div>`
        });
        $('#homepage_nav_list').append(HTML);
    }
}

function processAndRenderSiteHeader(data) {
    if (data) {
        $('#site_header').css('background', data.header_background_color);
        let logo_div = $('#site_header .client-logo');
        logo_div.addClass(`position-${data.header_logo_position}`);
        logo_div.append(`<a href="${data.header_jump_to_link}"><img src="${data.header_logo_url}" /></a>`);
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
