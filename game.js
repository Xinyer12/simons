
var buttonColours = ["red", "blue", "green", "yellow"];     //LISTA DE CORES

var gamePattern = [];                                       //LISTA CRIADA ALEATORIA

var userClickedPattern = [];                                //LISTA GERADA PELOS USERS                         

var started = false;                                

var level = 0;

$(document).keypress(function() {                           //FUNCTION FUNCIONA QUANDO CARREGADO NUMA TECLA
    
    if (!started) {

        $("level-title").text("Level " + level);            //MUDA O TITULO PARA O NIVEL ATUAL
        nextSequence()                                      // CHAMA NEXT SEQUENCE
        started = true;
    }
        
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");              //MEMORIZA O ID DO BOTÃO CARREGADO
    userClickedPattern.push(userChosenColour);              //PUCHA O VALOR PARA LISTA GERADA PELOS USERS
    
    //console.log (userClickedPattern);

    playSound(userChosenColour);                            //FAZ SOM DA COR ESCOLHIDA PELO USER

    animatePress(userChosenColour);                         //FAZ A ANIMAÇÃO

    checkAnswer (userClickedPattern.length-1);              // VERIFICA A RESPOSTA
    
});

function checkAnswer (currentLevel) {

    if (gamePattern [currentLevel] === userClickedPattern[currentLevel]) { // VERIFICA SE AS CORES ESTÃO IGUAIS
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){             // SE O COMPRIMENTO FOR IGUAL PASSA PARA A PROXIMA SEQUENCIA
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    

    } else {                                                                //SE ESTIVER ERRADO FAZ ISTO
        
        console.log("wrong");
        playSound ("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver()

    }

}


function nextSequence() {

    userClickedPattern = [];

    level++                                                 //ADICIONA 1 AO NIVEL SEMPRE QUE FOR CORRIDA A FUNÇÃO

    $("#level-title").text("Level " + level)                //MUDA O TITULO CONSOANTE O NIVEL

    var randomNumber = Math.floor(Math.random() * 4);       //GERA UM NUMERO ALEATORIO ENTRE 0 E 3
    var randomChosenColour = buttonColours[randomNumber];   //ESCOLHE O A COR EQUIVALENTE
    gamePattern.push(randomChosenColour);                   //PUCHA PARA RANDOMCHOSEN COLOR
    
    //ESCOLHE O ID + COR + ANIMAÇÃO
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // ADICIONA SOM
    playSound(randomChosenColour)                           //FAZ SOM ALEATORIO

}

function playSound (name) {                                                              
    var audio = new Audio("sounds/" + name + ".mp3" );
    audio.play();

}

function animatePress (currentColor) {
    
    $("#" + currentColor).addClass("pressed");              //QUANDO CARREGADO ACRESCENTA A CLASS "PRESSED"
    
    setTimeout(function () {                                //ADICIONA A ANIMAÇÃO
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}
    
function startOver () {                                     //PARA RESETAR TUDO
    
    level = 0;
    gamePattern = [];
    started = false;

  }

