
function switchContext(ctx){
    $("#wrapper > .box").hide();
    $("#" + ctx).show();
}

function loadSong(){
    switchContext("load");

    setTimeout(function(){
        switchContext("song");
    },2000);


    return false;
}

$("#search-btn").click(loadSong);
$("#main").submit(loadSong);

