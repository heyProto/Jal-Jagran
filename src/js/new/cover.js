import Util from './utility.js'

document.addEventListener("DOMContentLoaded", function (event) {

    let dimension = Util.getScreenSize(),
        mode = (dimension.width <= 500) ? 'mobile' : 'laptop',
        more_article_container,
        article_container;

    if (mode === 'laptop') {
    }

    if (mode === 'mobile')  {
        //Set Tab counts and container counts.
        $('.proto-mobile-grid-navigation .proto-mobile-grid-navigatio-tab').each((i, e) => {
            $(e).attr('data-tab', i);
            var active_tab = $(e).hasClass('proto-active-tab');
            if (active_tab) {
                var tab_content = $('.proto-tab-content')[i];
                $(tab_content).addClass('proto-tab-active-content');
            }
        });
        $('.proto-mobile-grid-navigation').sticky({ zIndex: 10});
        $('.proto-mobile-grid-navigation .proto-mobile-grid-navigatio-tab').on('click', (e) => {
            let tabIndex = +e.currentTarget.getAttribute('data-tab'),
                $tab = $($('.proto-mobile-grid-navigatio-tab')[tabIndex]),
                $tabContent = $($('.proto-tab-content')[tabIndex]);

            $('.proto-mobile-grid-navigatio-tab.proto-active-tab').removeClass('proto-active-tab');
            $tab.addClass('proto-active-tab');

            $('.proto-tab-content.proto-tab-active-content').removeClass('proto-tab-active-content');
            $tabContent.addClass('proto-tab-active-content');
        });

        // $('#dropdownMenuButton').on('click', (e) => {
        //     $('.protograph-app-navbar').addClass('protograph-app-navbar-slide-in');
        //     $('body').css('overflow', 'hidden');
        //     $('.container.proto-container').css('overflow', 'hidden');
        // });
        // $('#protograph_app_close_menu').on('click', (e) => {
        //     $('.protograph-app-navbar').removeClass('protograph-app-navbar-slide-in');
        //     $('body').css('overflow', 'initial');
        //     $('.container.proto-container').css('overflow', 'initial');
        // });

    }
    // $(".banner-div a:empty").parent("p").css("display", "none");


});
