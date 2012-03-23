
function switchContext(ctx){
    $("#wrapper > .box").hide();
    $("#" + ctx).show();
}



function loadSong(songData){
    $.each(["author", "title", "record"], function(i,tag){
        $("#data-" + tag).text(songData[tag]);
    });
    $("#cover").attr("src", songData.cover);
    $("#video").html('<iframe width="100" height="100" src="http://www.youtube.com/embed/' + songData.video + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');

    switchContext("song");

    return false;
}

function querySong(songData){
    switchContext("load");

    /*
     *
     $.getJSON("http://bengoarocandio.com:5000/?mood=" + encodeURIComponent($("#input").val()), function(data){
        console.log(data);
        loadSong({
            title: "Just Dance",
            author: "Lady Gaga",
            record: "The fame",
            cover: "testcover.png",
            video: "WBYkB_Rz7XM"
        });
    });
    */
    setTimeout(function(){
        loadSong({
            title: "Just Dance",
            author: "Lady Gaga",
            record: "The fame",
            cover: "testcover.png",
            video: "WBYkB_Rz7XM"
        });
    },200);

    return false;
}

$("#search-btn").click(querySong);
$("#main").submit(querySong);

