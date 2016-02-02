var grade = [];
var jogadorPos = [0,0];
var tamanho;
var sound = document.createElement('audio');	// Cria um novo elemento de som no documento
var escalaS;
var velocidade;
var limiteH;
var limiteW;
var tamanhos = [];
var dt = 1;
var resposta = false;
var per = false;
var percurso = [];
var follower = true;
var dc = 0;
var luz = true;


var jogador = $(".jogador");
var labirinto = $("#labirinto");
var parabens = $("#parabens");

// <<188  >>190

$(document).ready(function(){

	tamanhos = multiplos(parseInt(labirinto.css("width")));
	tamanho = tamanhos[dt];
    
    $(".escuro").fadeOut(0);
    
    if(luz==false){
        $(".luz").fadeOut(0);
    }else{
        $(".escuro").fadeIn(200);
    }

	$("#corpo").keyup(function(event){
		if(event.which == 37){
			if(parseInt(jogador.css("left"))>0 && grade[jogadorPos[0]][jogadorPos[1]][3] == 0){
				jogador.animate({ left: "-="+escala },velocidade);
                jogadorPos[0]--;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
                if(follower==true){ follow(); }
                deslocaLuz();
			}
		}
		if(event.which == 38){
			if(parseInt(jogador.css("top"))>0 && grade[jogadorPos[0]][jogadorPos[1]][0] == 0){
				jogador.animate({ top: "-="+escala },velocidade);
                jogadorPos[1]--;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
                if(follower==true){ follow(); }
                deslocaLuz();
			}
		}
		if(event.which == 39){
			if(parseInt(jogador.css("left"))<(limiteW) && grade[jogadorPos[0]][jogadorPos[1]][1] == 0){
				jogador.animate({ left: "+="+escala },velocidade);
                jogadorPos[0]++;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
                if(follower==true){ follow(); }
                deslocaLuz();
			}
		}
		if(event.which == 40){
			if(parseInt(jogador.css("top"))<(limiteH) && grade[jogadorPos[0]][jogadorPos[1]][2] == 0){
				jogador.animate({ top: "+="+escala },velocidade);
                jogadorPos[1]++;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
                if(follower==true){ follow(); }
                deslocaLuz();
			}
		}
                

		if(event.which == 190){
			dt++;
			tamanho = tamanhos[dt];
			refaz();
		}

		if(event.which == 188){
			dt--;
			tamanho = tamanhos[dt];
			refaz();
		}
        
        if(event.which == 84){
            if(resposta==false){
                $(".caminho").fadeIn(500);
                $("#labirinto").css("background-color", "#999");
                resposta=true;
            }else{
                $(".caminho").fadeOut(500);
                $("#labirinto").css("background-color", "#fff");
                resposta=false;
            }
        }
        
        if(event.which == 80){
            if(per == false){
                drawpercurso(500);
            }else{
                removepercurso();
            }
        }
        
        if(event.which == 70){
            if(follower == false){
                follower = true;
            }else{
                dc = 0;
                follower = false;
                removepercurso();
            }
        }
        
        if(jogadorPos[0]==tamanho-1 && jogadorPos[1]==tamanho-1){
            $(".caminho").fadeIn(500);
            setTimeout(function(){
                dt++;
                tamanho = tamanhos[dt];
                refaz();
            },1200);
        }
        
	});

    $("#corpo").keypress(function(event){
		if(event.which == 97){
			if(jogadorPos[0]>0 && grade[jogadorPos[0]][jogadorPos[1]][3] == 0){
				jogador.animate({ left: "-="+escala },velocidade);
				jogadorPos[0]--;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
			}
		}
		if(event.which == 119){
			if(jogadorPos[1]>0 && grade[jogadorPos[0]][jogadorPos[1]][0] == 0){
				jogador.animate({ top: "-="+escala },velocidade);
				jogadorPos[1]--;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
			}
		}
		if(event.which == 100){
			if(jogadorPos[0]<(tamanho-1) && grade[jogadorPos[0]][jogadorPos[1]][1] == 0){
				jogador.animate({ left: "+="+escala },velocidade);
				jogadorPos[0]++;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
			}
		}
		if(event.which == 115){
			if(jogadorPos[1]<(tamanho-1) && grade[jogadorPos[0]][jogadorPos[1]][2] == 0){
				jogador.animate({ top: "+="+escala },velocidade);
				jogadorPos[1]++;
                percurso.push([jogadorPos[0],jogadorPos[1]]);
			}
		}
    });
    
	geraLabirinto(0,0,tamanho,tamanho,escolheOrientacao(),0);
    solucionador(0,0,tamanho-1,tamanho-1);
    drawcaminho();
	preparaDimensoes();
    percurso.push([jogadorPos[0],jogadorPos[1]]);
    
	function animateParabens(){
		parabens.animate({top: 180},200);	// Essa
		parabens.animate({top: 280},200);	// função
		parabens.animate({top: 200},200);	// anima
		parabens.animate({top: 260},200);	// o parabéns
		parabens.animate({top: 240},200);	// com
		parabens.animate({top: 260},200);	// pulinhos
	}

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
    
	function refaz(){
		$(".parede").remove();
        $(".caminho").remove();
		grade = [];
        caminho = [];
        visitados = [];
        percurso = [];
        dc = 0;
        resposta = false;
		jogadorPos = [0,0];
		geraLabirinto(0,0,tamanho,tamanho,escolheOrientacao(),0);
        solucionador(0,0,tamanho-1,tamanho-1);
        drawcaminho();
		preparaDimensoes();
		jogador.fadeIn(500);
        percurso.push([jogadorPos[0],jogadorPos[1]]);
        removepercurso();
	}

	function preparaDimensoes(){
        var dx = ( Math.floor(escala/11)==0?1:Math.floor(escala/11) );
        var borda = dx + escala;
        var borderless = escala;
		$(".parede-horizontal").css({width: borderless+"px", height: Math.floor(escala/11)==0?1:Math.floor(escala/11)+"px"});
		$(".parede-vertical").css({height: borderless+"px", width: Math.floor(escala/11)==0?1:Math.floor(escala/11)+"px"});
		jogador.css({height: borderless+"px", width: borderless+"px", borderRadius: borderless/2+"px"});
		$(".fim").css({height: borderless+"px", width: borderless+"px", top: (parseInt(labirinto.css("width"))-escala)+"px", left: (parseInt(labirinto.css("height"))-escala)+"px"});
        $(".caminho").css({height: borderless+"px", width: borderless+"px"});
        $(".caminho").fadeOut(0);
		jogador.css({top: 0, left: 0});
        $(".luz").css({height: (borderless*2)+"px", width: (borderless*2)+"px", top: (parseInt(jogador.css("top")))+"px", left: (parseInt(jogador.css("left")))+"px", borderRadius: "2px 2px "+(borderless*3)/2+"px 2px", boxShadow: "inset 0 0 "+escala/2+"px "+escala/2+"px rgba(0,0,0,0.7)"});
        labirinto.css("border", Math.floor(escala/11)<=0?"1px solid #000":Math.floor(escala/11)+"px solid #000");
        labirinto.css("background-color","#fff");
	}

    function drawpercurso(tempo){
        var drawed = [];
        for(var i=0; i<percurso.length; i++){
            console.log(percurso[i]);
            if(!arraycontains(percurso[i],drawed)){
                $("#labirinto").append("<div class='percurso' style='left: "+ percurso[i][0]*escala +"px; top: "+ percurso[i][1]*escala +"px; opacity: "+ (0.1*arraycontainsmany(percurso[i],percurso)) +"'></div>");
                drawed.push(percurso[i]);
            }
        }
        $(".percurso").css({height: escala+"px", width: escala+"px"});
        $(".percurso").fadeOut(0);
        per = true;
        $(".percurso").fadeIn(tempo);
    }
    
    function follow(){
        var drawed = [];
        for(var i=dc; i<percurso.length-1; i++){
            console.log(percurso[i]);
            if(!arraycontains(percurso[i],drawed)){
                $("#labirinto").append("<div class='percurso' style='left: "+ percurso[i][0]*escala +"px; top: "+ percurso[i][1]*escala +"px; opacity: "+ (0.1*arraycontainsmany(percurso[i],percurso)) +"'></div>");
                drawed.push(percurso[i]);
            }
        }
        $(".percurso").css({height: escala+"px", width: escala+"px"});
        per = true;
        dc++;
    }
    
    function removepercurso(){
        if(per==true){
            $(".percurso").fadeOut(200);
            per = false;
            $(".percurso").remove();
        }
    }

    
	function geraLabirinto(x,y,width,height,orientacao,cont){
		if(width-x<=1 || height-y<=1 /* || cont>5 */){
			return;
		}

		if(cont==0){
			escala = Math.round(parseInt($("#labirinto").css("width"))/tamanho);

			velocidade = parseInt($("#labirinto").css("width"))/tamanho;

			limiteW = parseInt(labirinto.css("width"))-escala;
			limiteH = parseInt(labirinto.css("height"))-escala;

			parabens.fadeOut(0);	// Some com o parabéns

			for(var i=0; i<tamanho; i++){
				grade[i] = [];
				for(var j=0; j<tamanho; j++){
					grade[i][j] = [0,0,0,0];
				}
			}

			console.log(jogadorPos);
			console.log(grade);
			cont++;
            
            for(var i=0; i<tamanho; i++){
                grade[i][0][0] = 1;
                grade[tamanho-1][i][1] = 1;
                grade[i][tamanho-1][2] = 1;
                grade[0][i][3] = 1;
            }
            
		}

		var px = 0, py = 0;
		var ax = width, ay = height;

		if(orientacao==0){
			py = aleatorio(height,y);
			ax = Math.floor(Math.random() * ((width-1) - x + 1) + x);

			for(var i=x; i<width; i++){
				if(i!=ax){
					$("#labirinto").append("<div class='parede parede-horizontal' style='top: "+py*escala+"; left: "+i*escala+"'></div>");
					grade[i][py-1][2] = 1;
					grade[i][py][0] = 1;
				}
			}
			geraLabirinto(x,py,width,height,1,cont);
			geraLabirinto(x,y,width,py,1,cont);	
		}else{
			px = aleatorio(width,x);
			ay = Math.floor(Math.random() * ((height-1) - y + 1) + y); 

			for(var i=y; i<height; i++){
				if(i!=ay){
					$("#labirinto").append("<div class='parede parede-vertical' style='left: "+px*escala+"; top: "+i*escala+"'></div>");
					grade[px-1][i][1] = 1;
					grade[px][i][3] = 1;
				}
			}
			geraLabirinto(px,y,width,height,0,cont);
			geraLabirinto(x,y,px,height,0,cont);	
		}
	}

	function aleatorio(max,min){ return Math.floor(Math.random() * ((max-1) - (min+1) + 1) + (min+1)); }

	function escolheOrientacao(){
		return Math.round(Math.random());
	}

});

