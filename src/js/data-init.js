import Util from './utility.js'

$(document).ready((e) => {

  let dimension = Util.getScreenSize(),
    mode;
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

});

var x = new ProtoGraph.Card.toMaps()
  x.init({
  selector: document.querySelector('#card-list-div'),
  dataURL: 'https://cdn.protograph.pykih.com/d0d8741cbfc3a95b5981dd4c/index.json',
  topoURL: 'https://cdn.protograph.pykih.com/jaljagran-3/uttar_pradesh-topo.json',
  chartOptions: {
    chartTitle: 'Mob Justice in India',
    height: 500,
    defaultCircleColor: '#F02E2E'
  },
  filterConfigurationJSON: {
    colors: {
      house_color: '#e03832',
      text_color: '#343434',
      active_text_color: '#e03832',
      filter_summary_text_color: '#ffffff',
      filter_heading_text_color: '#ffffff'
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