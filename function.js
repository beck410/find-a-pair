//SPLIT EVENTS INTO OWN FUNCTIONS AND RETURN CARD ARRAYS
function parentClickEvent(){
    var parent = document.getElementsByClassName("parent");

    //add click event to all .parent elements to show child card
    for(var i=0; i<parent.length;i++){
        parent[i].onclick = function(event){
            if(event.target.className == "parent" && event.stopPropagation){
                open(this);
                event.stopPropagation;
            }
            else{
                return;
            }
        };
    }
    
    return parent;
}

//add click event to all .child elements to close card
function childClickEvent(){
    var child = document.getElementsByClassName("child");
    for(var a = 0; a<child.length; a++){
        child[a].onclick = function(event){
            if (event.target.className == "child" && event.stopPropagation) {
                close(this);
                event.stopPropagation;
            }
        };
    }
    
    return child;    
};

//add click event to easy to create 10 cards
var easyButton = document.getElementById("easy");
easyButton.onclick=function(){ easyGame() };
    
//add click event to medium to create 20 cards
var medButton = document.getElementById("medium");
medButton.onclick=function(){ mediumGame() };

//add click event to hard to create 50 cards
var hardButton = document.getElementById("hard");
hardButton.onclick=function(){ hardGame() };

//add click event to playAgain button to restart game
var playAgain = document.getElementById("playAgain");
playAgain.onclick=function(){resetGame()};


//add click event to finish button to finish game
var finish = document.getElementById("finish");
finish.onclick=function(){finishGame()};
//-----FUNCTIONS ------

//remove start message
function startGame() {
    var startMessage = document.getElementById("start");
    startMessage.style.display="none";
}

//returns new shuffled card array
function shuffleCards(numbers){
   for (var i = numbers.length - 1; i > 0; i--) {
     var j = Math.floor(Math.random() * (i + 1));
     var temp = numbers[i];
     numbers[i] = numbers[j];
     numbers[j] = temp;
   }
   return(numbers);
}

//displays 10 cards 
function easyGame(){
    startGame();
      //create array with duplicate numbers -working
    var cardNum = [];
    for(var num = 1; num < 6; num++){
        cardNum.push(num);
    }
    
    for(var num = 1; num < 6; num++){
        cardNum.push(num);
    }
    
    //cardNum randomly shuffled
    var shuffledCards = shuffleCards(cardNum); //working
    
    
    var SClength = shuffledCards.length;
    //inserts parent, then child and adds shuffledCards array value to child card
    for(var i=0; i<SClength; i++){
        //inserts parent card
        var parentCard = document.createElement('div');
        parentCard.className = "parent";
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.parentNode.insertBefore(parentCard, cardContainer.nextSibling); 
    
        //inserts child card
        var childCard = document.createElement('div');
        childCard.className="child";
        parentCard.appendChild(childCard);
        
        childCard.innerHTML = shuffledCards[i];
        
        parentClickEvent();
        childClickEvent();
    } 
}


//displays 20 cards
function mediumGame(){
    startGame();
      //create array with duplicate numbers -working
    var cardNum = [];
    for(var num = 1; num < 11; num++){
        cardNum.push(num);
    }
    
    for(var num = 1; num < 11; num++){
        cardNum.push(num);
    }
    
    //cardNum randomly shuffled
    var shuffledCards = shuffleCards(cardNum); //working
    
    
    var SClength = shuffledCards.length;
    //inserts parent, then child and adds shuffledCards array value to child card
    for(var i=0; i<SClength; i++){
        //inserts parent card
        var parentCard = document.createElement('div');
        parentCard.className = "parent";
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.parentNode.insertBefore(parentCard, cardContainer.nextSibling); 
    
        //inserts child card
        var childCard = document.createElement('div');
        childCard.className="child";
        parentCard.appendChild(childCard);
        
        childCard.innerHTML = shuffledCards[i];
        
        parentClickEvent();
        childClickEvent();
    } 
}

//displays 50 cards
function hardGame(){
    startGame();
      //create array with duplicate numbers -working
    var cardNum = [];
    for(var num = 1; num < 26; num++){
        cardNum.push(num);
    }
    
    for(var num = 1; num < 26; num++){
        cardNum.push(num);
    }
    
    //cardNum randomly shuffled
    var shuffledCards = shuffleCards(cardNum); //working
    
    
    var SClength = shuffledCards.length;
    //inserts parent, then child and adds shuffledCards array value to child card
    for(var i=0; i<SClength; i++){
        //inserts parent card
        var parentCard = document.createElement('div');
        parentCard.className = "parent";
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.parentNode.insertBefore(parentCard, cardContainer.nextSibling); 
    
        //inserts child card
        var childCard = document.createElement('div');
        childCard.className="child";
        parentCard.appendChild(childCard);
        
        childCard.innerHTML = shuffledCards[i];
        
        parentClickEvent();
        childClickEvent();
    } 
}

//open child card when parent card is clicked
function open(card) {
    
    var childCard = card.children[0];
    childCard.style.fontSize="30px";
    childCard.style.opacity="1";
    
    //child cards that are displayed
    var openC = openCards();
    var openCLength = openC.length;
    
    //STOPS WORKING HERE


    if(openCLength == 3) {
        tooManyCards(openC);
    }

    if(openCLength === 2){
        pair(openC);
    }
}

//close child card when clicked
function close(card) {
    card.style.fontSize="40px";
    card.style.opacity="0";

}

//Child and Parent arrays not available! PROBLEM 
//returns array of open child cards (sorts cards by font size)
function openCards(){
    
        var child = childClickEvent();
        var openChildCards = [];
        var getFontSize;
        var childLength = child.length;
        var childCard;
        for(var i=0; i<childLength;i++){
            childCard = child[i];
            getFontSize = window.getComputedStyle(childCard).getPropertyValue("font-size");

            if(getFontSize === "30px"){
                openChildCards.push(childCard);
            }
        }

        return openChildCards; 
}


//if more than 3 cards are open, close all cards and display message
function tooManyCards(cards){
    var cardsLength = cards.length;
    for(var i=0; i<cardsLength;i++){
        close(cards[i]);
    }

    var message = document.getElementById("tooManyCards");
    message.style.marginLeft = "20%";
    message.style.opacity = "1";

    setTimeout(function() {removeMessage(message)}, 2000);

}


//two open child cards are matching, parent and child disappear and winner function is called
function pair(cards) {

    var cardOneNum = cards[0].innerHTML;
    var cardTwoNum = cards[1].innerHTML;
    var cardsLength = cards.length;

    if(cardOneNum === cardTwoNum){
        var pairMessage = document.getElementById("pair");
        pairMessage.style.marginLeft="20%";
        pairMessage.style.opacity="1";

        setTimeout(function() {removeMessage(pairMessage)}, 1700);

        for(var i=0; i<cardsLength; i++){
            cards[i].style.display="none";
            cards[i].parentNode.style.display="none";
            cards[i].style.fontSize="40px";
        }

    }
    //check to see if game is over
    winner();
}

//if all parents cards are gone game has finished
function winner() {
    var parentCard = parentClickEvent();
    var parentCardLength = parentCard.length;
    var displayArray = [];

    for(var i=0; i<parentCardLength; i++){
        var parentDisplay = window.getComputedStyle(parentCard[i]).getPropertyValue("display");
        if(parentDisplay === "none"){
            displayArray.push(parentCard[i]);
        }
    }

    if(displayArray.length === parentCardLength){
        var winMessage = document.getElementById("win");
        //displays win message
        setTimeout(function() {
            winMessage.style.marginLeft="20%";
            winMessage.style.opacity="1";
        }, 2000);
        //Hides win message
        setTimeout(function(){
            removeMessage(winMessage);
        }, 4000);
        //displays reset message
        setTimeout(function(){
            var resetMessage = document.getElementById("reset");
            resetMessage.style.display="block";
        }, 4500);

    }
}

//used with setTimeOut to remove message after set Time
function removeMessage(message){
    message.style.opacity = "0";
    message.style.marginLeft="-2000px";
}

//removes resetMessage and displays parent cards again when playAgain button is clicked
function resetGame(){
    var resetMessage = document.getElementById("reset");
    resetMessage.style.display="none";
    
    var startMessage = document.getElementById("start");
    startMessage.style.display="block";
    
}

//removes resetMessage and displays a thank you message when finish button is clicked
function finishGame(){
    var resetMessage = document.getElementById("reset");
    resetMessage.style.display="none";

    var thankyou = document.getElementById("thankyou");
    thankyou.style.opacity="1";
    thankyou.style.marginLeft="20%";
}








