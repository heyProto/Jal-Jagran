import { scaleOrdinal as d3ScaleOrdinal } from 'd3-scale';
import { timeFormat } from 'd3-time-format';

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
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

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

// function throttle(fn, wait) {
//     var time = Date.now();
//     return function () {
//         if ((time + wait - Date.now()) < 0) {
//             fn();
//             time = Date.now();
//         }
//     }
// }

function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};

module.exports = {
    getJSON: getJSON,
    empty: empty,
    getScreenSize: getScreenSize,
    groupBy: groupBy,
    setColorScale: setColorScale,
    highlightCircle: highlightCircle,
    formatDate: formatDate,
    throttle: throttle
}