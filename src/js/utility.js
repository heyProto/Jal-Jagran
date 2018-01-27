import { scaleOrdinal as d3ScaleOrdinal } from 'd3-scale';
import { timeFormat } from 'd3-time-format';

window.ProtoGraph = window.ProtoGraph || {};

ProtoGraph.renderNavbar = function () {
    fetchNavbarObjects().then((data) => {
        processAndRenderVerticalNavbar(data[0]);
        processAndRenderHomepageNavbar(data[1]);
    }).catch((reject) => {
        console.error("Error fetching data : ", reject);
    })
}

function fetchNavbarObjects () {
    return Promise.all([
        getJSON(ProtoGraph.vertical_header_json_url),
        getJSON(ProtoGraph.homepage_header_json_url)
    ]);
}

function processAndRenderVerticalNavbar(data) {
    if (data.length > 0) {
        let HTML = "";
        data.forEach((e, i) => {
            HTML += `<div class="page-nav-single-option">
                <a href="${e.url}" target=${e.new_window ? "_blank" : "_self" }>${e.name}</a>
            </div>`
        });
        $('#vertical_nav').append(HTML);
    }
}

function processAndRenderHomepageNavbar(data) {
    if (data.length > 0) {
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
        data.forEach((e, i) => {
            HTML += `<div class="homepage-nav-item">
                <a href="${e.url}" target=${e.new_window ? "_blank" : "_self"}>${e.name}</a>
            </div>`
        });
        $('#homepage_nav_list').append(HTML);
    }
}

function setColorScale(value, colorDomain, colorRange) {
    let colorScale = d3ScaleOrdinal()
        .domain(colorDomain)
        .range(colorRange);

    return colorScale(value);
}

function highlightCircle(name, data) {
    let getCircles = document.getElementsByClassName(`circle-${name}`),
        allCircles = document.getElementsByClassName('map-circles');
    // remove highlight of previous circle
    for (let j = 0; j < allCircles.length; j++) {
        allCircles[j].r.baseVal.value = 3
    }
    for (let i = 0; i < getCircles.length; i++) {
        getCircles[i].r.baseVal.value = 5
    }
}

function formatDate(date) {
    let parseTime = timeFormat("%B '%Y");
    return parseTime(new Date(date));
}

function groupBy(data, column) {
    let grouped_data = {},
        key;
    switch (typeof column) {
        case "string":
            data.forEach(datum => {
                key = datum[column] ? datum[column] : "उपलब्ध नहीं";
                if (grouped_data[key]) {
                    grouped_data[key].push(datum);
                } else {
                    grouped_data[key] = [datum];
                }
            });
            break;
        case "function":
            data.forEach(datum => {
                let key = column(datum);
                if (grouped_data[key]) {
                    grouped_data[key].push(datum);
                } else {
                    grouped_data[key] = [datum];
                }
            });
            break;
    }
    return grouped_data;
}

function empty() { return null; }

function getJSON(url, callback) {
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

function getScreenSize() {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight || e.clientHeight || g.clientHeight;

    return {
        width: width,
        height: height
    };
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

function appendFavicon() {
    let favicon = ProtoGraph.pageObject.site_attributes.favicon_url,
        meta_tags = ProtoGraph.pageObject.site_attributes.meta_tags,
        meta_description = ProtoGraph.pageObject.site_attributes.meta_description;

    if (favicon)
        $('head').append(`<link rel="icon" type="image/png" href="${favicon}">`);

    if (meta_tags)
        $('head').append(`<link rel="icon" type="image/png" href="${meta_tags}">`);

    if (meta_description)
        $('head').append(`<meta name="Description" content="${meta_description}">`);
}

module.exports = {
    getJSON: getJSON,
    empty: empty,
    getScreenSize: getScreenSize,
    groupBy: groupBy,
    setColorScale: setColorScale,
    highlightCircle: highlightCircle,
    formatDate: formatDate,
    throttle: throttle,
    appendFavicon: appendFavicon
}