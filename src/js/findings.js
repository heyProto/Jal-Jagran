
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
}
$(document).ready(function(){
    $("#sticker").sticky({topSpacing:20});
    $(window).bind('scroll', function() {
        $('.section').each(function() {
            var post = $(this);
            var position = post.position().top - $(window).scrollTop() + 450;
            var text = post.html();
            var left = $( ".single-index-value:contains('"+text+"')" );
            var next = post.next();
            var height = -(next.height()/2);
            // console.log(position, height, post.attr('id'));
            if (position <= 350 && position >=height) {
                left.addClass('active-value');
            } else {
                left.removeClass('active-value');
            }
        });        
    });
});
getJSON('https://cdn.protograph.pykih.com/35277f605995aa5fac54a21c/index.json', function (err, data){
    if (err != null) {
        alert('Something went wrong: ' + err);
    } else {
        originals_container = document.getElementById("related_container");
        data.map((d,i) => {
            let createDiv = document.createElement('div');
            createDiv.id = 'ProtoCard-originals'+i;
            createDiv.className= 'ProtoCard-originals';
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
if(document.getElementById('cont-button')){
    document.getElementById('cont-button').onclick = function(e){
        document.getElementById('cont-button').style.display = 'none';
        document.getElementById('article').className='article-area';
    }
}