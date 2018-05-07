ProtoGraph.initDataApp = function () {
    var x = new ProtoGraph.Card.toMaps(),
        streams = ProtoGraph.streams,
        page = ProtoGraph.page;

    x.init({
        selector: document.querySelector('#card-list-div'),
        dataURL: streams["Grid"].url,
        topoURL: 'https://cdn.protograph.pykih.com/jaljagran-3/uttar_pradesh-topo.json',
        chartOptions: {
            chartTitle: 'Mob Justice in India',
            height: 500,
            defaultCircleColor: '#e03832'
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
}