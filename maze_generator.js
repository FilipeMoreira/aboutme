function geraLabirinto(x,y,width,height,orientation,cont){
    if(width-x<=1 || height-y<=1 /* || cont>5 */){
        return;
    }

    if(cont==0){
        escala = Math.round(parseInt($("#labirinto").css("width"))/tamanho);

        velocidade = parseInt($("#labirinto").css("width"))/tamanho;

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

    if(orientation==0){
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