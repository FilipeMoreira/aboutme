var grade = [];             //matrix to store the maze grid
var jogadorPos = [0,0];     //vector to store player position (indexes: 0 -> x / 1-> y)
var tamanho;                //integer to store the size of the maze
var velocidade;             //integer to store player movement's speed
var tamanhos = [];          //integer vector to store the maze different sizes
var dt = 0;                 //index that points the actual size of the maze
var per = false;            //boolean to tell if the player's route is being shown
var percurso = [];          //vector to store positions where the player have been
var follower = false;        //boolean to tell if the follower (function that marks the player steps) is on
var dc = 0;                 //auxiliar integer to optimize the follower
var luz = false;             //boolean to tell if the lights are on or off
var time = 0;
var mistakes = 0;

var corpo = $("#corpo");            //the page
var jogador = $(".jogador");        //player object
var labirinto = $("#labirinto");    //maze object
var escuro = $(".escuro");          //darkness object
var light = $(".luz");              //light object
var bttDark = $("#bttDark");
var finalPosition = false;

$(document).ready(function(){
    var tempSize = (window.innerHeight<window.innerWidth?window.innerHeight:window.innerWidth)-93;

    tamanhos = multiplos(tempSize);
    while(tamanhos.length<11){
        tempSize--;
        tamanhos = multiplos(tempSize);
    }

    labirinto.css({width: tempSize+"px", height: tempSize+"px"});

    dt++;

    //main game here
    //calculate the present and next sizes of the maze
	tamanho = tamanhos[dt];
    
    //Turns lights on or off depending on luz variable
    manage_light();
    
    //generates the maze
    geraLabirinto(0,0,tamanho,tamanho,escolheOrientacao(),0);
    
    //solves the maze
    solucionador(0,0,tamanho-1,tamanho-1);
    
    //draws the solution way blocks
    drawcaminho();
    
    //sets up all sizes
    preparaDimensoes();
    
    //push the first block in the player position storer
    percurso.push([jogadorPos[0],jogadorPos[1]]);
    
    //defines the controls
    corpo.keyup(function(event){
        switch(event.which){
            case 37:    //left
                player_move(3);
                break;
            case 38:    //up
                player_move(0);
                break;
            case 39:    //right
                player_move(1);
                break;
            case 40:    //down
                player_move(2);
                break;
        }
         if(jogadorPos[0]==tamanho-1 && jogadorPos[1]==tamanho-1 && !finalPosition){ 
            finalPosition = true;
            end_game(); 
        }    
    });
    
    bttDark.fadeOut(0);
    $(".black").fadeOut(0);
    bttDark.click(function(){
        $(".black").fadeIn(700);
        setTimeout(function(){
            follower = true;
            luz = true;
            dt=1;
            tamanho = tamanhos[dt];
            manage_light();
            refaz();
            bttDark.fadeOut(200);
            $("#welcome").fadeOut(200);
            $(".fMaze").css("color","#fff");
            $("#HUD").css("color","#fff");
        },1000);
    });

    //touch controls
    $(document).on("swipeup",function(){
        player_move(0);
    });
    $(document).on("swiperight",function(){
        player_move(1);
    });
    $(document).on("swipedown",function(){
        player_move(2);
    });
    $(document).on("swipeleft",function(){
        player_move(3);
    });
    
});

//Function that handles whether the maze is full lighet or it's darkened
function manage_light(){
    escuro.fadeOut(0);
    if(luz==false){
        light.fadeOut(0);
    }else{
        escuro.fadeIn(200);
        light.fadeIn(200);
    }
}
    
//function that handles player movement
function player_move(direction){
    switch(direction){
        case 0:
            if(jogadorPos[1]>0 && grade[jogadorPos[0]][jogadorPos[1]][0] == 0){             //test if player is on the edges and if there is
                                                                                            //a wall in the wanted direction
				jogador.animate({ top: "-="+escala },velocidade);                           //animate player to desired direction
                jogadorPos[1]--;                                                            //store new player position
                percurso.push([jogadorPos[0],jogadorPos[1]]);                               //adds player's new position to his route
                if(follower==true){ follow(); }                                             //renders last position if follower is on
                if(luz==true){ deslocaLuz(); }                                              //updates light position if maze is darkened
			}
            break;
        case 1:
            if(jogadorPos[0]<(tamanho-1) && grade[jogadorPos[0]][jogadorPos[1]][1] == 0){   //test if player is on the edges and if there is
                                                                                            //a wall in the wanted direction
				jogador.animate({ left: "+="+escala },velocidade);                          //animate player to desired direction
                jogadorPos[0]++;                                                            //store new player position
                percurso.push([jogadorPos[0],jogadorPos[1]]);                               //adds player's new position to his route
                if(follower==true){ follow(); }                                             //renders last position if follower is on
                if(luz==true){ deslocaLuz(); }                                              //updates light position if maze is darkened
			}
            break;
        case 2:
            if(jogadorPos[1]<(tamanho-1) && grade[jogadorPos[0]][jogadorPos[1]][2] == 0){   //test if player is on the edges and if there is
                                                                                            //a wall in the wanted direction
				jogador.animate({ top: "+="+escala },velocidade);                           //animate player to desired direction
                jogadorPos[1]++;                                                            //store new player position
                percurso.push([jogadorPos[0],jogadorPos[1]]);                               //adds player's new position to his route
                if(follower==true){ follow(); }                                             //renders last position if follower is on
                if(luz==true){ deslocaLuz(); }                                              //updates light position if maze is darkened
			}
            break;
        case 3:
            if(jogadorPos[0]>0 && grade[jogadorPos[0]][jogadorPos[1]][3] == 0){             //test if player is on the edges and if there is
                                                                                            //a wall in the wanted direction
				jogador.animate({ left: "-="+escala },velocidade);                          //animate player to desired direction
                jogadorPos[0]--;                                                            //store new player position
                percurso.push([jogadorPos[0],jogadorPos[1]]);                               //adds player's new position to his route
                if(follower==true){ follow(); }                                             //renders last position if follower is on
                if(luz==true){ deslocaLuz(); }                                              //updates light position if maze is darkened
			}
    }
}
    
//highlights the maze solution
function highlight_solution(){
    $(".caminho").fadeIn(500);                      //fades in all the solution way blocks
    labirinto.css("background-color", "#999");      //turns the maze darker to highlight the solution
}
        
function end_game(){
    highlight_solution();
    setTimeout(function(){
        tamanho = tamanhos[dt];
        refaz();
    },1200);
}

//updates light position
function deslocaLuz(){
    if(luz==true){
        if(jogadorPos[0]==0 && jogadorPos[1]==0){
            $(".luz").css({top: ((jogadorPos[1])*escala)+"px", left: ((jogadorPos[0])*escala)+"px", borderRadius: "2px 2px "+(escala*3)/2+"px 2px",height: (escala*2)+"px", width: (escala*2)+"px"});
        }

        if(jogadorPos[0]>0 && jogadorPos[1]>0 && jogadorPos[0]<tamanho-1 && jogadorPos[1]<tamanho-1){
            $(".luz").css({top: ((jogadorPos[1]-1)*escala)+"px", left: ((jogadorPos[0]-1)*escala)+"px", borderRadius: (escala*3)/2+"px",height: (escala*3)+"px", width: (escala*3)+"px"});
        }

        if(jogadorPos[0]==0 && jogadorPos[1]>0 && jogadorPos[1]<tamanho-1){
            $(".luz").css({top: ((jogadorPos[1]-1)*escala)+"px", left: ((jogadorPos[0])*escala)+"px", borderRadius: "2px "+(escala*3)/2+"px "+(escala*3)/2+"px 2px",height: (escala*3)+"px", width: (escala*2)+"px"});
        }

        if(jogadorPos[0]>0 && jogadorPos[1]==0 && jogadorPos[0]<tamanho-1){
            $(".luz").css({top: ((jogadorPos[1])*escala)+"px", left: ((jogadorPos[0]-1)*escala)+"px", borderRadius: "2px 2px "+(escala*3)/2+"px "+(escala*3)/2+"px",height: (escala*2)+"px", width: (escala*3)+"px"});
        }

        if(jogadorPos[0]==tamanho-1 && jogadorPos[1]==0){
            $(".luz").css({top: ((jogadorPos[1])*escala)+"px", left: ((jogadorPos[0]-1)*escala)+"px", borderRadius: "2px 2px 2px "+(escala*3)/2+"px",height: (escala*2)+"px", width: (escala*2)+"px"});
        }

        if(jogadorPos[0]==0 && jogadorPos[1]==tamanho-1){
            $(".luz").css({top: ((jogadorPos[1]-1)*escala)+"px", left: ((jogadorPos[0])*escala)+"px", borderRadius: "2px "+(escala*3)/2+"px 2px 2px",height: (escala*2)+"px", width: (escala*2)+"px"});
        }

        if(jogadorPos[0]==tamanho-1 && jogadorPos[1]>0 && jogadorPos[1]<tamanho-1){
            $(".luz").css({top: ((jogadorPos[1]-1)*escala)+"px", left: ((jogadorPos[0]-1)*escala)+"px", borderRadius: (escala*3)/2+"px 2px 2px "+(escala*3)/2+"px",height: (escala*3)+"px", width: (escala*2)+"px"});
        }

        if(jogadorPos[0]>0 && jogadorPos[1]==tamanho-1 && jogadorPos[0]<tamanho-1){
            $(".luz").css({top: ((jogadorPos[1]-1)*escala)+"px", left: ((jogadorPos[0]-1)*escala)+"px", borderRadius: (escala*3)/2+"px "+(escala*3)/2+"px 2px 2px",height: (escala*2)+"px", width: (escala*3)+"px"});
        }

        if(jogadorPos[0]==tamanho-1 && jogadorPos[1]==tamanho-1){
            $(".luz").css({top: ((jogadorPos[1]-1)*escala)+"px", left: ((jogadorPos[0]-1)*escala)+"px", borderRadius: (escala*3)/2+"px 2px 2px 2px",height: (escala*2)+"px", width: (escala*2)+"px"});
        }

    }
}

function preparaDimensoes(){
    var dx = ( Math.floor(escala/11)==0?1:Math.floor(escala/11) );
    var borda = dx + escala;
    $(".parede-horizontal").css({width: escala+"px", height: Math.floor(escala/11)==0?1:Math.floor(escala/11)+"px"});
    $(".parede-vertical").css({height: escala+"px", width: Math.floor(escala/11)==0?1:Math.floor(escala/11)+"px"});
    jogador.css({height: escala+"px", width: escala+"px", borderRadius: escala/2+"px"});
    $(".fim").css({height: escala+"px", width: escala+"px", top: (parseInt(labirinto.css("width"))-escala)+"px", left: (parseInt(labirinto.css("height"))-escala)+"px"});
    $(".caminho").css({height: escala+"px", width: escala+"px"});
    $(".caminho").fadeOut(0);
    jogador.css({top: 0, left: 0});
    light.css({height: (escala*2)+"px", width: (escala*2)+"px", top: (parseInt(jogador.css("top")))+"px", left: (parseInt(jogador.css("left")))+"px", borderRadius: "2px 2px "+(escala*3)/2+"px 2px", boxShadow: "inset 0 0 "+escala/2+"px "+escala/2+"px rgba(0,0,0,0.7)"});
    labirinto.css("border", Math.floor(escala/11)<=0?"1px solid #000":Math.floor(escala/11)+"px solid #000");
    labirinto.css("background-color","#fff");
}

function follow(){
    var drawed = [];
    for(var i=dc; i<percurso.length-1; i++){
        if(!arraycontains(percurso[i],drawed)){
            $("#labirinto").append("<div class='percurso' style='left: "+ percurso[i][0]*escala +"px; top: "+ percurso[i][1]*escala +"px; opacity: "+ (0.1*arraycontainsmany(percurso[i],percurso)) +"'></div>");
            drawed.push(percurso[i]);
        }
    }
    $(".percurso").css({height: escala+"px", width: escala+"px"});
    per = true;
    dc++;
}

function refaz(){
    dt++;
    $(".parede").remove();
    $(".caminho").remove();
    $("#level").text(dt);
    grade = [];
    caminho = [];
    visitados = [];
    percurso = [];
    dc = 0;
    resposta = false;
    finalPosition = false;
    jogadorPos = [0,0];
    geraLabirinto(0,0,tamanho,tamanho,escolheOrientacao(),0);
    solucionador(0,0,tamanho-1,tamanho-1);
    drawcaminho();
    preparaDimensoes();
    jogador.fadeIn(500);
    percurso.push([jogadorPos[0],jogadorPos[1]]);
    removepercurso();
    if(dt>=7 && luz==false){
        bttDark.fadeIn(1000);
    }
}

function removepercurso(){
    if(per==true){
        $(".percurso").fadeOut(200);
        per = false;
        $(".percurso").remove();
    }
}