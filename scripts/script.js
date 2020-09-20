function start() {

    document.querySelector('button').innerHTML = "again";
    for(var i = 0;i<16;i++) document.querySelectorAll('.card')[i].style= "visibility: visible";
    
    
    var images = ['html', 'ae', 'javascript', 'xd', 'bootstrap', 'ai', 'figma', 'github','html', 'ae', 'javascript', 'xd', 'bootstrap', 'ai', 'figma', 'github'];

    // starting shuffling
    images = shuffle(images);

    function shuffle(array) {
        var i = array.length,
            j = 0,
            temp;

        while (i--) {

            j = Math.floor(Math.random() * (i+1));

            // swap randomly chosen element with current element
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;

        }

        return array;
    }
    // ending shuffling


    
    //start append the shuffled images
    var elements = document.getElementsByClassName('card');
    for(var x=0;x<16;x++) {
        elements[x].innerHTML += "<img src='images/" + images[x] + ".png'>";
        elements[x].setAttribute('data-value', images[x]);
    }
    //end append the shuffled images
    
    
    // to again restart everything
    losses = 0;
    values = [];
    document.querySelector('.losses').innerHTML = "Mistakes : " + losses;
    for(var i = 0;i<16;i++) document.querySelectorAll('.card')[i].className= "card";
    document.querySelector(".winStats").style = "display:none";
    document.querySelector(".loseStats").style = "display:none";
    
}

/*Function the game
        start the game
        -- start
            -- hide the start
            -- show the again

        -- function of game
            -- appear the clicked card -> Active Card
            -- the second click campare the two value
                -- equal -> true card
                -- else  -> remove active card

            -- calc the loses
*/

var values = [],
    losses = 0;
function game(clickedItem) {


    function activate() {
        clickedItem.className = 'activeCard card';

        values.push(clickedItem.getAttribute('data-value')); 
    }

    function winRound(winValue) {
        var winCards = document.querySelectorAll('div[data-value=' + winValue + ']');
        for(var i=0;i < winCards.length; i++) winCards[i].className="card trueCard";
        document.querySelector('.win').play()
        values = [];

    }

    function loseRound() {
        var activeCards = document.querySelectorAll('.activeCard');
        setTimeout(function() {


            for(var i=0;i < activeCards.length; i++) activeCards[i].className="card";
            document.querySelector('.lose').play()
            values = [];

        }, 600);


        //show mistakes
        losses++;
        document.querySelector('.losses').innerHTML = "Mistakes : " + losses;
    }
    
    function won() {
        losses = 0;
        values = [];
        document.querySelector('.losses').innerHTML = "Mistakes : " + losses;

        for(var i = 0;i<16;i++) document.querySelectorAll('.card')[i].className= "card";
        
        document.querySelector(".winStats").style = "display:block";
        document.querySelector(".bigWin").play();
        
    }
    
    function lose() {
        losses = 0;
        values = [];
        document.querySelector('.losses').innerHTML = "Mistakes : " + losses;

        for(var i = 0;i<16;i++) document.querySelectorAll('.card')[i].className= "card";
        
        document.querySelector(".loseStats").style = "display:block";
        document.querySelector(".bigLose").play();
        
    }

    //first click
    if (values.length === 0) activate();

    //second click
    else if (values.length === 1 && clickedItem.className !== "activeCard card") {

        activate();

        //win the round
        if(values[0] === values[1])  winRound(values[0]);

        //lose the rounds
        else if (values[0] !== values[1]) loseRound();

    }
    
    
    //won
    if(document.querySelectorAll('.trueCard').length === 16) won();

    //lose
    if(losses > 19) lose();


}