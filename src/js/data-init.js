import Util from './utility.js'

$(document).ready((e) => {

  ProtoGraph.renderNavbar();
  let dimension = Util.getScreenSize(),
    mode,
    streams = ProtoGraph.streams;

  if (dimension.width <= 500){
    mode = 'mobile';
  } else {
    mode = 'laptop';
  }

  if (mode === 'laptop'){
    $('.filter-column').sticky({ topSpacing: 0 });
  }

  if (mode === 'mobile'){
    $('#protograph_filter_icon').on('click', ((e) => {
      $('.protograph-app-filter-icon').addClass('block-events');
      $('.protograph-filter-area').css('display', 'block');
      setTimeout((e) => {
        $('.protograph-filter-area').addClass('protograph-filter-area-slide-up');
      },0);
      $('#protograph_filter_icon').css('display', 'none');
      $('#protograph_filter_close_icon').css('display', 'block');
      setTimeout((i) => {
        $('.protograph-app-filter-icon').removeClass('block-events');
      }, 500);
    }));

    $('#protograph_filter_close_icon').on('click', ((e) => {
      $('.protograph-app-filter-icon').addClass('block-events');
      $('.protograph-filter-area').removeClass('protograph-filter-area-slide-up');
      setTimeout((e) => {
        $('.protograph-filter-area').css('display', 'none');
        $('.protograph-app-filter-icon').removeClass('block-events');
      },500);
      $('#protograph_filter_icon').css('display', 'block');
      $('#protograph_filter_close_icon').css('display', 'none');
    }));

    $('#dropdownMenuButton').on('click', (e) => {
      $('.protograph-app-navbar').addClass('protograph-app-navbar-slide-in');
      $('body').css('overflow', 'hidden');
      $('.container.proto-container').css('overflow', 'hidden');
    });

    $('#protograph_app_close_menu').on('click', (e) => {
      $('.protograph-app-navbar').removeClass('protograph-app-navbar-slide-in');
      $('body').css('overflow', 'initial');
      $('.container.proto-container').css('overflow', 'initial');
    });
  }

  var x = new ProtoGraph.Card.toMaps()
    x.init({
    selector: document.querySelector('#card-list-div'),
    dataURL: streams["Grid"].url,
    topoURL: 'https://cdn.protograph.pykih.com/jaljagran-3/uttar_pradesh-topo.json',
    chartOptions: {
      chartTitle: 'Mob Justice in India',
      height: 500,
      defaultCircleColor: '#F02E2E'
    },
    filterConfigurationJSON: {
      colors: {
        house_color: ProtoGraph.site['house_colour'],
        text_color: '#333',
        active_text_color: ProtoGraph.site['house_colour'],
        filter_summary_text_color: ProtoGraph.site['reverse_font_colour']
      },
      selected_heading: 'फिल्टर',
      reset_filter_text: 'रीसेट'
    },
    filters: [
      {
        propName: 'concretisation_score',
        alias: 'कोंक्रेटआईज़ेशन'
      },
      {
        propName: 'rainfall_deficit_score',
        alias: 'वार्षिक वर्षा'
      },
      {
        propName: 'forest_cover_score',
        alias: 'वन आवरण'
      },
      {
        propName: 'population_score',
        alias: 'जनसंख्या'
      }
    ]
  })
  x.renderLaptop();
});
