import Util from './utility.js'

$(document).ready(function(){
    var mode = window.innerWidth <= 500 ? 'mobile' : 'laptop';

    if (mode === 'laptop') {
        $("#sticker").sticky({ topSpacing: 0, bottomSpacing: 400});
        $('.related-articles-link').sticky({ topSpacing: 20, bottomSpacing: 400});
        $('#cont-button').on('click', (e) => {
            $('#cont-button').css('display', 'none');
            document.getElementById('article').className = 'article-area';
            $('.single-index-value').addClass('activate-click');
            $('body').scrollspy({
                target: '#myNavbar',
                offset: 70
            });
        })

        Util.getJSON('https://cdn.protograph.pykih.com/12683b42d4b866989ea7601f/index.json', function (err, data) {
            if (err != null) {
                alert('Something went wrong: ' + err);
            } else {
                let originals_container = document.getElementById("more_articles_container");
                data.map((d, i) => {
                    let createDiv = document.createElement('div');
                    createDiv.id = 'ProtoCard-more-articles' + i;
                    createDiv.className = 'ProtoCard-more-articles';
                    originals_container.appendChild(createDiv);
                    let createMarginDiv = document.createElement('div');
                    // createMarginDiv.style.marginBottom = "20px";
                    // originals_container.appendChild(createMarginDiv);
                    setTimeout(function () {
                        new ProtoEmbed.initFrame(document.getElementById("ProtoCard-more-articles" + i), data[i].iframe_url, "col4");
                    }, 0)
                })
            }
        });
    }

    if (mode == 'mobile' ) {
        $('#cont-button').on('click', (e) => {
            $('#cont-button').css('display', 'none');
            document.getElementById('article').className = 'article-area';
            $('.single-index-value').addClass('activate-click');
            $('body').scrollspy({
                target: '#myNavbar',
                offset: 70
            });
            $('.single-index-value').on('click', (e) => {
                setTimeout(function() {
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
            $('.navigation-links').css('display', 'block');
            setTimeout((e) => {
                $('.navigation-links').addClass('navigation-links-slide-up');
            }, 0);
            $('#protograph_filter_icon').css('display', 'none');
            $('#protograph_filter_close_icon').css('display', 'block');
        }));

        $('#protograph_filter_close_icon').on('click', ((e) => {
            $('.navigation-links').removeClass('navigation-links-slide-up');
            setTimeout((e) => {
                $('.navigation-links').css('display', 'none');
            }, 500);
            $('#protograph_filter_icon').css('display', 'block');
            $('#protograph_filter_close_icon').css('display', 'none');
        }));
    }

    Util.getJSON('https://cdn.protograph.pykih.com/bfa1e8a3a73ae6485af3e87a/index.json', function (err, data){
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
            let originals_container = document.getElementById("related_container");
            data.map((d,i) => {
                let createDiv = document.createElement('div');
                createDiv.id = 'ProtoCard-originals'+i;
                // createDiv.className= 'ProtoCard-originals';
                originals_container.appendChild(createDiv);
                let createMarginDiv = document.createElement('div');
                createMarginDiv.style.marginBottom = "20px";
                originals_container.appendChild(createMarginDiv);
                setTimeout(function(){
                    new ProtoEmbed.initFrame(document.getElementById("ProtoCard-originals"+i), data[i].iframe_url, "col4");
                },0)
            })
        }
    });

});
// if(document.getElementById('cont-button')){
//     document.getElementById('cont-button').onclick = function(e){
//         document.getElementById('cont-button').style.display = 'none';
//         document.getElementById('article').className='article-area';
//     }
// }