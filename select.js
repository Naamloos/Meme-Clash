var selected1 = '';
var selected2 = '';

function select(player, character)
{
    if(player == 1 && selected1 == '')
    {
        selected1 = character;
        $("#player1").fadeTo(500, 0.3);
    }
    if(player == 2 && selected2 == '')
    {
        selected2 = character;
        $("#player2").fadeTo(500, 0.3);
    }

    if(selected1 != '' && selected2 != ''){
        play();
    }
}

function play()
{
    window.location.href = "/game.html?player1=" + selected1 + "&player2=" + selected2;
}