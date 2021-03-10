var tablero = [0,0,0,0,0,0,0,0,0]
var jugador = 1
var movimientos = 0
var partidas = 0
// Marcar celdas y dibujar x - o segun sea el caso donde 1=x y 2=o
function print(){
    for(let i=0; i<10; i++){
        if(tablero[i]==0){
            document.querySelector('#c'+i).innerHTML=''
        }
        if(tablero[i]==1){
            document.querySelector('#c'+i).innerHTML=`
            <img src="./img/x.png" class="x img-cel">
            `
        }
        if(tablero[i]==2){
            document.querySelector('#c'+i).innerHTML=`
            <img src="./img/o.png" class="0 img-cel">
            `
        }
    }
}
function clickCelda(cel){
    if(tablero[cel]==0){
        if(jugador==1){
            tablero[cel]=1
            document.getElementById('toka').innerHTML="Tuno de: O"
            jugador=2
        }else{
            tablero[cel]=2
            jugador=1
            document.getElementById('toka').innerHTML="Tuno de: X"
        }
        movimientos=movimientos+1
        document.getElementById('totalMov').innerHTML=`Movimientos totales: ${movimientos}`
    }else{
        document.querySelector('#ganador').innerHTML=`
            <div style='background: #f00; width: 100%; height: 100%; opacity: 20%; position: absolute; top: 0;'></div>
        `
        setTimeout(function(){document.querySelector('#ganador').innerHTML=""}, 300)
    }
    print()
    var result = ganador()
    switch(result[0]){
        case 0: break
        case 1: 
            celebracion('x', result[1])
            break
        case 2:
            celebracion('o', result[1])
            break
    }
}
function ganador(){
    // Comprobacion lineas horizontales
    if(tablero[0]==tablero[1] && tablero[1]==tablero[2] && tablero[0]!=0)return [tablero[0], [0, 1, 2]]
    if(tablero[3]==tablero[4] && tablero[4]==tablero[5] && tablero[3]!=0)return [tablero[3], [3, 4, 5]]
    if(tablero[6]==tablero[7] && tablero[7]==tablero[8] && tablero[6]!=0)return [tablero[6], [6, 7, 8]]
    // Comprobacion lineas verticales
    if(tablero[0]==tablero[3] && tablero[3]==tablero[6] && tablero[0]!=0)return [tablero[0], [0, 3, 6]]
    if(tablero[1]==tablero[4] && tablero[4]==tablero[7] && tablero[1]!=0)return [tablero[2], [1, 4, 7]]
    if(tablero[2]==tablero[5] && tablero[5]==tablero[8] && tablero[2]!=0)return [tablero[2], [2, 5, 8]]
    // Comprobacion lineas diagonales
    if(tablero[0]==tablero[4] && tablero[4]==tablero[8] && tablero[0]!=0)return [tablero[0], [0, 4, 8]]
    if(tablero[2]==tablero[4] && tablero[4]==tablero[6] && tablero[2]!=0)return [tablero[2], [2, 4, 6]]
    return 0
}
function celebracion(quien, celdas){
    let ganador = document.querySelector('#ganador')
    console.log(celdas[0])
    setTimeout(function(){
        document.getElementById('c'+celdas[0]).style=`
            background-color: #ffbf00;
        `
    },100)
    setTimeout(function(){
        document.getElementById('c'+celdas[1]).style=`
            background-color: #ffbf00;
        `
    },350)
    setTimeout(function(){
        document.getElementById('c'+celdas[2]).style=`
            background-color: #ffbf00;
        `
    },600)
    setTimeout(function(){
        ganador.innerHTML=`
            <img src="./img/celebracion.gif" id="img-ganador" onclick="reset()">
            <h1>Ganador "${quien.toLocaleUpperCase()}"!!</h1>
        `
    }, 620)
}
function reset(){
    let op=0
    partidas=partidas+1
    document.getElementById('ganador').innerHTML+='<div id="cargando"></div>'
    document.getElementById('ganador').innerHTML+='<img id="img-cargando" src="./img/cargando.gif">'
    var gan=document.getElementById('cargando')
    var a = setInterval(() => {
        if(op>=500){
            let celdaks=[0,1,2,3,4,5,6,7,8]
            document.querySelector('#ganador').innerHTML=""
            for(let a=0;a<9;a++){
                document.getElementById('c'+celdaks[a]).style="background: ;"
            }
            tablero=[0,0,0,0,0,0,0,0,0]
            print()
            clearInterval(a)
        }
        if(op==100){
            document.getElementById('img-cargando').style=`opacity: 100%;`
            document.getElementById('totalGame').innerHTML=`Juegos totales: ${partidas}`
        }
        if(op<101){
            gan.style=`opacity: ${op}%;`
        }
        console.log(op)
        op++
    }, 5);
}