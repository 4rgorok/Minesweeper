
var plansza
var timer
var timerLicz=1
var bcount
var pcount
var koniec=false
var bt
var ip1,ip2,ip3
var div
var main
var next=false
var pierwszaBomba=true


document.addEventListener("DOMContentLoaded", function(){
    generujInputy()
    ip1=document.getElementById("height")
    ip2=document.getElementById("width")
    ip3=document.getElementById("mines")

    ip1.oninput=function()
    {
        setTimeout(function(){ var a=Number(ip1.value)
        if(isNaN(a))ip1.value=""}, 500);
    }
    ip2.oninput=function()
    {
        setTimeout(function(){ var a=Number(ip2.value)
        if(isNaN(a))ip2.value=""}, 500);
    }
    ip3.oninput=function()
    {
        setTimeout(function(){ var a=Number(ip3.value)
        if(isNaN(a))ip3.value=""}, 500);
    }

    bt=document.createElement("button");
    bt.innerHTML="GENERUJ";
    bt.className="b1";
    document.body.appendChild(bt);

    bt.onclick=function()
    {
        var idp1=Number(ip1.value)
        var idp2=Number(ip2.value)
        var idp3=Number(ip3.value)
        if(ip1.value==""||ip2.value==""||ip3.value=="")window.alert("Wprowadz wszystkie wartosci!!!")
        else if(isNaN(idp1)||isNaN(idp2)||isNaN(idp3))window.alert("Wprowadzone wartości muszą być liczbami")
        else if(ip1.value>60||ip2.value>60)window.alert("Maksymalne wymiary pola to 60x60!!!")
        else if(ip3.value==0||ip3.value>ip1.value*ip2.value/3)window.alert("Ilosc bomb musi byc wiekszosc od zera i nie moze byc wieksza niz x*y/3!!!")
        else
        {
            pierwszaBomba=true
            clearInterval(timer)
            timerLicz=1
            koniec=false
            if(next)div.remove()
            if(next)main.remove()
            next=true
            bcount=ip3.value
            pcount=ip1.value*ip2.value
            generujPole()
            div=document.createElement("div")
            div.className="licz"
            div.style.width="300px"
            div.style.height="100px"
            div.style.position="absolute"
            div.style.top="300px"
            
            div.style.left=(window.screen.width/2-110)+"px"
            div.style.backgroundColor=""
            var di1,di2
            di1=document.createElement("div")
            di1.className="zeg"
            di1.style.height="50px"
            di1.style.width="300px"
            di1.style.fontSize="25px"
            di1.style.top="0px"
            di1.innerHTML="Grasz juz: 0s"
            di1.style.position="absolute"
            di2=document.createElement("div")
            di2.className="bomb"
            di2.style.height="50px"
            di2.style.width="300px"
            di2.style.top="50px"
            di2.style.fontSize="25px"
            di2.innerHTML="Pozostalo bomb: "+ip3.value
            di2.style.position="absolute"
            div.appendChild(di1)
            div.appendChild(di2)
            document.body.appendChild(div)
            timer=window.setInterval(function(){di1.innerHTML="Grasz juz: "+timerLicz+"[s]";timerLicz++},1000)
        }
    }
    
})


function generujPoleLicz(xm,ym)
{
    var x,y
    var ilosc=0
    plansza=new Array(ip1.value)
    for(var i=0;i<ip1.value;i++)
    {
       plansza[i]=new Array(ip2.value)
       for(var i2=0;i2<ip2.value;i2++)
       {
           plansza[i][i2]=0
       }
    }
    for(var i=0;i<ip3.value;i++)
    {
        x=Math.floor(Math.random() * ip1.value); 
        y=Math.floor(Math.random() * ip2.value); 
        console.log(x,y)
        if(plansza[x][y]==-1)i--
		else if(x==xm&&y==ym)i--
        else plansza[x][y]=-1
    }
    for(var i=0;i<ip1.value;i++)
    {
        for(var i2=0;i2<ip2.value;i2++)
        {   
            if(plansza[i][i2]==0)plansza[i][i2]=sprawdzBomby(i,i2)
        }
    }
    console.log(plansza)
}


function sprawdzBomby(x,y)
{
    var ilosc=0
    x++
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    y++
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    x--
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    x--
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    y--
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    y--
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    x++
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    x++
    if(czyWychodzi(x,y))if(plansza[x][y]==-1)ilosc++
    return ilosc
}


function czyWychodzi(x,y)
{
    var b=true
    if(x<0||y<0||x>=ip1.value||y>=ip2.value)b=false
    return b
}


function generujPole()
{
    main=document.createElement("div");
    main.className="main"
    main.style.width=ip2.value*32+"px"
    main.style.height=ip1.value*32+"px"
    main.style.position="absolute"
    main.style.marginLeft="auto"
    main.style.marginRight="auto"
    console.log(window.screen.width)
    main.style.top=430+"px"
	if(window.screen.width/2-16*ip2.value<0)main.style.left="0px"
    else main.style.left=window.screen.width/2-16*ip2.value+"px"
    for(var x=0;x<ip1.value;x++)
    {
        for(var y=0;y<ip2.value;y++)
        {
            var pole=document.createElement("div");
            pole.className="i"+(x*ip2.value+y)
            pole.style.width=32+"px"
            pole.style.height=32+"px"
            pole.style.position="absolute"
            pole.style.fontFamily="Arial"
            pole.style.fontWeight = "700"
            pole.style.backgroundImage="url('img/klepa.png')"
            pole.style.backgroundSize="cover"
            pole.style.textAlign="center"
            pole.style.top=(x*32)+"px"
            pole.style.left=(y*32)+"px"
            pole.onclick=function()
            {
				if(pierwszaBomba)
				{
					generujPoleLicz(parseInt(this.style.top)/32,parseInt(this.style.left)/32)
					pierwszaBomba=false
				}
                if(koniec==false)
                {
                if(this.style.backgroundImage!='url("img/flaga.png")')
                {
                    this.style.backgroundImage="url('img/nico.png')"
                    
                    if(plansza[parseInt(this.style.top)/32][parseInt(this.style.left)/32]==-1)
                    {
                        this.style.backgroundImage="url('img/bomb.png')"
                        przeg()
                        pcount--
                    }
                    else if(plansza[parseInt(this.style.top)/32][parseInt(this.style.left)/32]==0)szukajZer(parseInt(this.style.top)/32,parseInt(this.style.left)/32)
                    else if(plansza[parseInt(this.style.top)/32][parseInt(this.style.left)/32]>0)
                    {
                        this.style.backgroundImage="url('img/"+(plansza[parseInt(this.style.top)/32][parseInt(this.style.left)/32])+".png')"
                        pcount--
                        if(bcount==0&&pcount==ip3.value)wyg()
                    }
                }
                }
            }
            pole.onmousedown=function(e)
            {
                if(koniec==false)
                {
                if(e.button==2)
                {
                    if(this.style.backgroundImage=='url("img/klepa.png")'&&bcount>0)
                    {
                        bcount--
                        this.style.backgroundImage="url('img/flaga.png')"
                        var bom=document.getElementsByClassName("bomb")
                        bom[0].innerHTML="Pozostalo bomb: "+bcount
                        if(bcount==0&&pcount==ip3.value)wyg()
                        console.log(pcount)
                    }
                    else if (this.style.backgroundImage=='url("img/flaga.png")')
                    {
                        this.style.backgroundImage="url('img/pyt.png')"
                        bcount++
                        var bom=document.getElementsByClassName("bomb")
                        bom[0].innerHTML="Pozostalo bomb: "+bcount
                    }
                    else if (this.style.backgroundImage=='url("img/pyt.png")')this.style.backgroundImage="url('img/klepa.png')"
                }
                }
            }
            main.appendChild(pole)
        }
    }
    document.body.appendChild(main)
}

function szukajZer(x,y)
{  
    if(czyWychodzi(x,y)==false)return
    var d=document.getElementsByClassName("i"+(x*ip2.value+y))
    
    if(plansza[x][y]!=0)
    {
        if(plansza[x][y]>0)
        {
            if(d[0].style.backgroundImage=='url("img/klepa.png")')
            {
                d[0].style.backgroundImage="url('img/"+plansza[x][y]+".png')"
                pcount--
            }
            
        }
        return
    }
    plansza[x][y]=-2
    pcount--
    d[0].style.backgroundImage="url('img/nico.png')"
    szukajZer(x+1,y)
    szukajZer(x-1,y)
    szukajZer(x,y+1)
    szukajZer(x,y-1)
    szukajZer(x+1,y+1)
    szukajZer(x-1,y-1)
    szukajZer(x-1,y+1)
    szukajZer(x+1,y-1)
}


function wyg()
{
    clearInterval(timer)
    setTimeout(function(){ window.alert("WYGRALES!"); }, 500);
    koniec=true
    next=true
}


function przeg()
{
    var bomba
    clearInterval(timer)
    for(var i=0;i<ip1.value;i++)
    {
        for(var i2=0;i2<ip2.value;i2++)
        {
            if(plansza[i][i2]==-1)
            {
                console.log(i,i2)
                bomba=document.getElementsByClassName("i"+(i*ip2.value+i2))
                if(bomba[0].style.backgroundImage=='url("img/klepa.png")'||bomba[0].style.backgroundImage=='url("img/pyt.png")')
                {
                    bomba[0].style.backgroundImage='url("img/pbomb.png")'  
                }
            }
            else
            {
                bomba=document.getElementsByClassName("i"+(i*ip2.value+i2))
                if(bomba[0].style.backgroundImage=='url("img/flaga.png")')
                {
                    bomba[0].style.backgroundImage='url("img/wbomb.png")'  
                }
            }
        }
    }
    setTimeout(function(){ window.alert("PRZEGRALES!"); }, 500);
    koniec=true
    next=true
}


function generujInputy()
{
	var chntz=["height","width","mines"]
	var inputy=document.createElement("div");
	inputy.style.position="absolute"
	inputy.style.width="300px"
	inputy.style.height="250px"
	inputy.style.top="50px"
	inputy.style.left=(window.screen.width/2-100)+"px"
	inputy.innerHTML="Height: </br>"
	inputy.innerHTML+="Width: </br>"
	inputy.innerHTML+="Mines: </br>"
	for(var i=0;i<3;i++)
	{
		var inp=document.createElement("input")
		inp.style.position="absolute"
		inp.style.width="56px"
		inp.style.height="30px"
		inp.style.top=((i*55)+8)+"px"
		inp.setAttribute("maxlength", 3)
		inp.setAttribute("size", 5)
		inp.style.left="110px"
		inp.id=chntz[i]
		inputy.appendChild(inp)
	}
	document.body.appendChild(inputy)
}