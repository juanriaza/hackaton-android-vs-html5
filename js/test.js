$(document).ready(function() {

    var echonest = new EchoNest("KTY7T5L87IZ1OG2TM");

    // get a set of "Hybrid" audio and output as HTML5 audio tags to the page
    echonest.artist("Lady Gaga").audio( function(audioCollection) {
        $("#testDiv").append( audioCollection.to_html('<p>${artist} - ${length} long<br /><audio src="${url}" controls preload="none"></audio></p>') );
    });

});