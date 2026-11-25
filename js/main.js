
var FOTOS = { emilia:"img/img01.jpg", luckra:"img/img02.jpg", luis:"img/img03.jpg", sombrero:"img/img04.jpg", shakira:"img/img44.png", olivia:"img/img45.png" };
var $ = function(id){ return document.getElementById(id); };
var clamp = function(x,a,b){ return Math.min(b||1, Math.max(a||0, x)); };
var lerp = function(a,b,t){ return a + (b-a)*t; };
var suave = function(t){ return t*t*(3-2*t); };
var salida = function(t){ var c=1.70158; t=t-1; return 1+t*t*((c+1)*t+c); };

/* rayos del sol */
(function(){
  var g=$("rayos"), NS="http://www.w3.org/2000/svg", N=32;
  for (var i=0;i<N;i++){
    var a=i*2*Math.PI/N-Math.PI/2, od=i%2===1, r0=188, r1=od?330:420;
    var c=Math.cos(a), s=Math.sin(a), d="";
    for (var k=0;k<=24;k++){
      var t=k/24, r=r0+(r1-r0)*t, o=od?Math.sin(t*Math.PI*3)*9:Math.sin(t*Math.PI*2)*4;
      d+=(k?"L":"M")+(c*r-s*o).toFixed(1)+" "+(s*r+c*o).toFixed(1)+" ";
    }
    var p=document.createElementNS(NS,"path"); p.setAttribute("d",d);
    p.setAttribute("stroke-width",od?20:26); g.appendChild(p);
  }
})();

/* puntos amarillos: [x0,y0,tam0, x1,y1,tam1, desaparece] */
var PUNTOS=[[128,171,54,368,221,54],[1555,114,54,1361,250,54],[1297,285,54,974,859,54],
  [1324,639,54,1641,926,54],[1479,792,28,1544,772,28],[1653,1057,54,1700,1100,54,1],[256,931,124,228,921,64]];
PUNTOS.forEach(function(p){ var d=document.createElement("div"); d.className="punto"; $("puntos").appendChild(d); p.el=d; });

/* ARGENTINOS */
var LET=[]; "ARGENTINOS".split("").forEach(function(ch){ var s=document.createElement("span"); s.textContent=ch; $("argentinos").appendChild(s); LET.push(s); });

/* ventanitas: [clase, nombre, foto, año, cx, cy, escala, aparece] */
var WINS=[
 ["azul","LUIS MIGUEL . JPG","luis","2018",1471.5,764,.975,.38],
 ["","EMILIA","emilia","2018",363,298.5,1,.50],
 ["azul","SHAKIRA . JPG","shakira","2018",1598,520.5,.525,.62],
 ["","LUCK RA","luckra","2018",610,761.5,1,.74],
 ["","OLIVIA RODRIGO","olivia","2018",1248.5,320.5,.5,.86]
];
WINS.forEach(function(w){
  var d=document.createElement("div"); d.className="win "+w[0];
  var bar = w[0]==="azul" ? '<div class="bar"><span class="nom">'+w[1]+'</span><span class="ast">*</span></div>'
                          : '<div class="bar"><span>'+w[1]+'</span><span class="ico"><i></i><i></i></span></div>';
  d.innerHTML=bar+'<div class="raya"></div><div class="foto"><img alt="" src="'+FOTOS[w[2]]+'"></div><div class="cap">En el top desde : <u>'+w[3]+'</u></div>';
  $("ventanas").appendChild(d); w.el=d;
});

/* medidas */
var W=[$("w0"),$("w1"),$("w2")], M={};
function medir(){
  var A=$("argentinos"); A.style.fontSize="200px";
  var ancho=A.getBoundingClientRect().width / escala();
  A.style.fontSize=(200*1534/ancho)+"px";
  var h=A.offsetHeight; A.style.top=(545-h/2)+"px";
  M.w=W.map(function(e){ return e.offsetWidth; }); M.h=W[0].offsetHeight;
}
function escala(){ return Math.min(document.documentElement.clientWidth/1728, innerHeight/1117); }
function ajustar(){
  var k=escala(), t="translate(-50%,-50%) scale("+k+")";
  $("pantalla").style.transform=t; $("st2").style.transform=t;
  var ex=Math.max(0,(document.documentElement.clientWidth/k-1728)/2);
  $("st2").style.setProperty("--ex",ex+"px");
  Array.prototype.forEach.call(document.querySelectorAll(".stg"),function(e){ e.style.transform=t; e.style.setProperty("--ex",ex+"px"); });
}

/* grupo que se desvanece cuando el sol hace zoom */
(function(){
  var F=document.createElement("div"); F.id="fade"; F.style.cssText="position:absolute;inset:0";
  ["puntos","w0","w1","w2","argentinos","sub","ventanas"].forEach(function(id){ F.appendChild($(id)); });
  $("pantalla").appendChild(F);
})();

/* ===== portada armada con las piezas del diseño (img/portada) ===== */
var PD={"sol1": [425.0, 134.0, 878.0, 880.0], "sol2": [646.0, 325.0, 427.5, 427.0], "creditos": [324.0, 89.0, 1077.5, 35.5], "que1": [68.0, 474.0, 314.0, 144.5], "esc1": [473.5, 519.0, 791.0, 92.0], "los1": [1422.5, 511.0, 221.0, 91.0], "que2": [85.5, 71.5, 107.5, 52.5], "esc2": [740.0, 90.0, 265.5, 35.0], "los2": [1559.0, 81.0, 76.0, 34.5], "sub": [108.0, 999.0, 1497.0, 36.5], "letras": [[86.5, 457.5, 144.5, 171.0], [241.0, 457.5, 144.0, 171.0], [394.0, 457.5, 145.0, 171.0], [548.5, 457.5, 144.0, 171.0], [702.5, 457.5, 144.0, 171.0], [856.5, 457.5, 144.5, 171.0], [1036.5, 457.5, 92.5, 171.0], [1163.5, 457.5, 144.5, 171.0], [1318.0, 457.5, 144.0, 171.0], [1472.0, 457.5, 143.5, 171.0]], "puntos1": [["punto1_0", 1596.5, 118.5, 63.0, 63.0], ["punto1_1", 131.5, 177.5, 63.0, 63.0], ["punto1_2", 1331.5, 296.5, 63.0, 63.0], ["punto1_3", 1360.5, 658.5, 63.0, 63.0], ["punto1_4", 1518.0, 814.5, 34.0, 33.0], ["punto1_5", 261.0, 957.0, 130.0, 130.0], ["punto1_6", 1697.5, 1086.5, 61.0, 61.0]], "puntos2": [["punto2_0", 369.5, 224.5, 63.0, 63.0], ["punto2_1", 1361.5, 253.5, 63.0, 63.0], ["punto2_2", 1538.0, 772.5, 34.0, 33.0], ["punto2_3", 973.5, 859.5, 63.0, 63.0], ["punto2_4", 229.0, 921.0, 70.0, 70.0], ["punto2_5", 1640.5, 924.5, 63.0, 63.0]]};
var PR="img/portada/";
function capa(src,b,cls){
  var im=document.createElement("img"); im.src=PR+src+".webp"; im.alt=""; im.className="cp"+(cls?" "+cls:"");
  im.style.left=b[0]+"px"; im.style.top=b[1]+"px"; im.style.width=b[2]+"px"; im.style.height=b[3]+"px"; return im;
}
function centro(b){ return [b[0]+b[2]/2, b[1]+b[3]/2]; }
var PORT={};
(function(){
  var pan=$("pantalla"), F=$("fade");
  /* fondo con la textura, repetida en espejo hacia los costados para que no se corte */
  var fo=document.createElement("div"); fo.id="fondo";
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var t=capa("fondo",[i*1728,j*1117,1728,1117]);
    if (i||j) t.style.transform="scale("+(i?-1:1)+","+(j?-1:1)+")";
    fo.appendChild(t);
  }
  pan.insertBefore(fo,pan.firstChild);
  /* créditos */
  PORT.cred=capa("creditos",PD.creditos); pan.insertBefore(PORT.cred,$("sol"));
  /* sol: el grande (pantalla 1) y el chico (pantalla 2), dentro del mismo contenedor */
  var c1=centro(PD.sol1), c2=centro(PD.sol2), K=PD.sol2[2]/PD.sol1[2];
  var so=document.createElement("div"); so.id="solimg"; so.style.transformOrigin=c1[0]+"px "+c1[1]+"px";
  so.appendChild(capa("sol1",PD.sol1));
  var b2=PD.sol2, l2=[c1[0]+(b2[0]-c2[0])/K, c1[1]+(b2[1]-c2[1])/K, b2[2]/K, b2[3]/K];
  PORT.sol2=capa("sol2",l2); PORT.sol2.style.opacity=0; so.appendChild(PORT.sol2);
  PORT.sol1=so.firstChild;
  pan.insertBefore(so,$("sol").nextSibling);
  PORT.so=so; PORT.c1=c1; PORT.c2=c2; PORT.K=K;
  /* capas dentro del grupo que se desvanece con el zoom */
  var ven=$("ventanas");
  /* puntos: [punto en pantalla 1, punto en pantalla 2 (null = desaparece)] */
  PORT.pts=[[1,0],[0,1],[2,3],[3,5],[4,2],[6,null],[5,4]].map(function(p){
    var a=PD.puntos1[p[0]], b=p[1]===null?null:PD.puntos2[p[1]];
    var d=document.createElement("div"); d.className="cpt";
    var ia=document.createElement("img"); ia.src=PR+a[0]+".webp"; ia.alt=""; d.appendChild(ia);
    var ib=null; if (b){ ib=document.createElement("img"); ib.src=PR+b[0]+".webp"; ib.alt=""; ib.style.opacity=0; d.appendChild(ib); }
    F.insertBefore(d,ven); return {el:d,a:a,b:b,ia:ia,ib:ib};
  });
  /* títulos: versión grande y versión chica de cada palabra */
  PORT.pal=["que","esc","los"].map(function(n){
    var g=capa(n+"1",PD[n+"1"],"mul tr"), c=capa(n+"2",PD[n+"2"],"mul tr"); c.style.opacity=0;
    F.insertBefore(g,ven); F.insertBefore(c,ven);
    return {g:g,c:c,c1:centro(PD[n+"1"]),c2:centro(PD[n+"2"]),k:PD[n+"2"][2]/PD[n+"1"][2]};
  });
  /* ARGENTINOS letra por letra */
  PORT.let=PD.letras.map(function(b,i){ var im=capa("letra"+i,b,"mul tr"); im.style.opacity=0; F.insertBefore(im,ven); return im; });
  PORT.sub=capa("sub",PD.sub); PORT.sub.style.opacity=0; F.insertBefore(PORT.sub,ven);
})();
function dibujarPortada(t1,tf,pp){
  var f=1-clamp(tf/.25); PORT.cred.style.opacity=f;
  /* sol */
  var s=lerp(1,PORT.K,t1), dx=lerp(0,PORT.c2[0]-PORT.c1[0],t1), dy=lerp(0,PORT.c2[1]-PORT.c1[1],t1);
  PORT.so.style.transform="translate("+dx+"px,"+dy+"px) scale("+s+")";
  var x2=clamp((t1-.6)/.4); PORT.sol2.style.opacity=x2; PORT.sol1.style.opacity=x2>=1?0:1;
  /* puntos: se van cuando aparece la primera ventana (pantalla 3 de Figma) */
  var sinPuntos=suave(clamp((pp-.355)/.03));
  PORT.pts.forEach(function(p){
    var b=p.b||p.a, x=lerp(p.a[1],b[1],t1), y=lerp(p.a[2],b[2],t1), w=lerp(p.a[3],b[3],t1), h=lerp(p.a[4],b[4],t1);
    p.el.style.width=w+"px"; p.el.style.height=h+"px"; p.el.style.transform="translate("+(x-w/2)+"px,"+(y-h/2)+"px)";
    if (p.ib){ p.ib.style.opacity=clamp(t1/.5); p.ia.style.opacity=1-clamp((t1-.5)/.5); }
    else p.el.style.opacity=1-t1;
    p.el.style.visibility=sinPuntos>=1?"hidden":"";
    if (p.ib) p.el.style.opacity=1-sinPuntos;
  });
  /* títulos */
  var x=clamp((t1-.6)/.4);
  PORT.pal.forEach(function(w){
    var cx=lerp(w.c1[0],w.c2[0],t1), cy=lerp(w.c1[1],w.c2[1],t1);
    w.g.style.transform="translate("+(cx-w.c1[0])+"px,"+(cy-w.c1[1])+"px) scale("+lerp(1,w.k,t1)+")";
    w.c.style.transform="translate("+(cx-w.c2[0])+"px,"+(cy-w.c2[1])+"px) scale("+lerp(1/w.k,1,t1)+")";
    w.g.style.opacity=1-x; w.c.style.opacity=x;
  });
  /* ARGENTINOS */
  var u=clamp((t1-.3)/.7);
  PORT.let.forEach(function(im,i){
    var a=clamp((u*13-i)/3), e=suave(a);
    im.style.opacity=e; im.style.transform="translateY("+((1-e)*90)+"px) scale("+lerp(.7,1,e)+")";
  });
  PORT.sub.style.opacity=clamp((t1-.75)/.25);
}

function dibujarB(q){
  $("fade").style.opacity=1-clamp(q/.3);
  if (q>0){
    var e=Math.pow(clamp(q/.65),2.2), sc=lerp(.455,14,e);
    $("sol").style.transform="translate(366px,45px) scale("+sc+")";
    PORT.so.style.transform="translate("+(PORT.c2[0]-PORT.c1[0])+"px,"+(PORT.c2[1]-PORT.c1[1])+"px) scale("+(PORT.K*sc/.455)+")";
  }
  PORT.so.classList.toggle("zoom",q>0);
  /* cuando el sol ya llenó la pantalla, la cámara se aleja desde el escritorio y aparece la computadora */
  dibujarPC(clamp((q-.5)/.35));
}

/* página de Mari (2001): mensajes que suben al scrollear */
var AV="img/img05.png";
var MSG=[
 ["???","Hola! Soy <b>Mari</b> ₍₍≽(-˘ ˘-)≼₎₎",330,.22],
 ["Mari","Me encanta escuchar música desde que soy chica!!! Mi artista favorita es <b>Shakira</b>.",580,.45],
 ["Mari","Desde que mis papás me regalaron el <b>MP3</b> escucho música en todos lados",830,.68]
];
MSG.forEach(function(m){
  var d=document.createElement("div"); d.className="bub"; d.style.top=m[2]+"px";
  d.innerHTML='<div class="cuerpo"><div class="cab"><b>'+m[0]+'</b><span>*</span></div><p>'+m[1]+'</p></div><div class="av"><img alt="" src="'+AV+'"></div>';
  $("sc3").appendChild(d); m.el=d;
});
function dibujarC(c){
  $("p2").style.opacity=suave(clamp((c-.02)/.06));
  $("cap1").style.opacity=0; $("tit2").style.opacity=0; $("ilus").style.opacity=0;
  $("sc3").style.opacity=clamp((c-.04)/.08);
  var a=suave(clamp((c-.08)/.14)), im=$("mimg");
  im.style.opacity=a; im.style.transform="scale("+lerp(.94,1,a)+")";
  var an=clamp((c-.12)/.1);
  $("anio").style.opacity=an;
  $("t3").style.opacity=an*(1-clamp((c-.45)/.08));
  for (var i=0;i<5;i++){
    var g=$("g"+i); g.style.opacity=.65*clamp((c-.1)/.15);
    g.style.transform="translateY("+(-c*(180+i*90))+"px) rotate("+(c*90*(i%2?1:-1))+"deg)";
  }
  MSG.forEach(function(m){
    var t=clamp((c-m[3])/.12), e=1-Math.pow(1-t,3);
    m.el.style.opacity=clamp(t*3); m.el.style.transform="translateY("+((1-e)*170)+"px)";
  });
}

var S=.28, ini=[68,461,1384], objetivo=null;
function dibujar(p){
  var t1=suave(clamp(p/.3)), tf=clamp(p/.3);
  dibujarPortada(t1,tf,p);
  // créditos y recuadro
  var f=1-clamp(tf/.25); $("ph").style.opacity=f; $("cr").style.opacity=f;
  // sol
  var sc=lerp(1,.455,t1), cx=lerp(836,866,t1), cy=lerp(564,545,t1);
  $("sol").style.transform="translate("+(cx-500)+"px,"+(cy-500)+"px) scale("+sc+")";
  // puntos
  PUNTOS.forEach(function(q){
    var x=lerp(q[0],q[3],t1), y=lerp(q[1],q[4],t1), z=lerp(q[2],q[5],t1);
    q.el.style.width=z+"px"; q.el.style.height=z+"px";
    q.el.style.transform="translate("+(x-z/2)+"px,"+(y-z/2)+"px)";
    q.el.style.opacity=q[6]?1-t1:1;
  });
  // palabras del título
  var fin=[function(w){return 85+w*S/2;}, function(){return 873;}, function(w){return 1636-w*S/2;}];
  W.forEach(function(e,i){
    var w=M.w[i], x0=ini[i]+w/2, x1=fin[i](w), s=lerp(1,S,t1);
    var x=lerp(x0,x1,t1), y=lerp(548,99,t1);
    e.style.transform="translate("+(x-w/2)+"px,"+(y-M.h/2)+"px) scale("+s+")";
  });
  // ARGENTINOS letra por letra
  var u=clamp((t1-.3)/.7);
  LET.forEach(function(s,i){
    var a=clamp((u*13-i)/3), e=suave(a);
    s.style.opacity=e; s.style.transform="translateY("+((1-e)*90)+"px) scale("+lerp(.7,1,e)+")";
  });
  $("sub").style.opacity=clamp((t1-.75)/.25);
  // ventanitas
  WINS.forEach(function(w){
    var a=clamp((p-w[7])/.08), k=lerp(.75,1,salida(a));
    w.el.style.opacity=clamp(a*2.5);
    w.el.style.transform="translate("+(w[4]-166)+"px,"+(w[5]-200.5)+"px) scale("+(w[6]*k)+")";
  });
}

/* ===== página de Meli (2026) + transición en mosaico ===== */
var MELI_IMG="img/img06.png";
var FIL=[["????","HOLIIIII!!! ❤️❤️❤️ soy Meli",354,.22],["MELI","A mi también me encanta escuchar música",491,.38],
  ["MELI","Yo amo escuchar a Emilia y a Taylor Swift",639,.54],["MELI","Una pregunta...",776,.70],["MELI","¿Qué es un MP3?",923,.84]];
var COLS=30, ROWS=18, CEL=[], COLORES=["#FF2B7B","#FF4B72","#FF8FB0","#FF7BFF"];
(function(){
  var filas="";
  FIL.forEach(function(f,i){
    filas+='<div class="fila" style="top:'+f[2]+'px"><div class="av3"></div><div class="vent"><div class="tb"><b class="nm">'+f[0]+'</b><span><i></i><i></i></span></div><p>'+f[1]+'</p></div></div>';
  });
  var P=document.createElement("div"); P.id="p3";
  P.innerHTML='<div id="meli"><div class="stg" id="st3a">'+
    '<div id="grid3"></div><div class="sq3" style="left:10px;top:649px"></div><div class="sq3" style="left:295px;top:934px"></div>'+
    '<div class="trama" style="left:100px;top:0;width:300px;height:520px"></div><div class="trama" style="left:300px;top:660px;width:150px;height:440px"></div>'+
    '<div class="trama" style="left:560px;top:20px;width:320px;height:60px"></div>'+
    '<p class="t3m" id="anio3">2001</p><p class="t3m" id="tc3">Titulo corto</p>'+
    '<img id="mimg3" alt="" src="'+MELI_IMG+'">'+filas+'</div></div>'+
    '<div class="stg" id="stm"></div>';
  $("visor").appendChild(P);
  var M=$("stm");
  for (var i=0;i<COLS;i++) for (var j=0;j<ROWS;j++){
    var h=((i*73+j*151)%97)/97, c=document.createElement("div");
    c.style.cssText="position:absolute;width:97px;height:97px;left:"+(-576+i*96)+"px;top:"+(-340+j*96)+"px;transform:scale(0);background:"+COLORES[(i*7+j*3)%4];
    M.appendChild(c); CEL.push({el:c,d:(i/(COLS-1))*.55+h*.2});
  }
})();
var ultT=-1;
function dibujarT(t){
  $("meli").style.opacity=t>=.5?1:0;
  if (t===ultT) return; ultT=t;
  CEL.forEach(function(c){
    var u=t<=.5 ? clamp((t/.5-c.d)/.25) : 1-clamp(((t-.5)/.5-c.d)/.25);
    c.el.style.transform="scale("+u+")";
  });
}
var FILAS=null;
function dibujarD(d){
  if(!FILAS) FILAS=document.querySelectorAll("#p3 .fila");
  var yr=suave(clamp(d/.12)); $("anio3").textContent=Math.round(lerp(2001,2026,yr));
  var a=suave(clamp((d-.03)/.14)), im=$("mimg3"); im.style.opacity=a; im.style.transform="scale("+lerp(.94,1,a)+")";
  $("tc3").style.opacity=clamp((d-.1)/.1);
  FIL.forEach(function(f,i){
    var t=clamp((d-f[3])/.1), e=1-Math.pow(1-t,3);
    FILAS[i].style.opacity=clamp(t*3); FILAS[i].style.transform="translateY("+((1-e)*140)+"px)";
  });
  FILAS[0].querySelector(".nm").textContent = d>=.38 ? "MELI" : "????";
}

/* ===== capítulo 2: ¿Cambió la forma de escuchar música? (mosaico + página rosa) ===== */
var EXTRA4=82; /* pantallas (vh) de scroll agregadas al final para este capítulo */
var TRAMA4="img/img07.png";
var CEL4=[];
(function(){
  var P=document.createElement("div"); P.id="p4";
  P.innerHTML='<div class="stg" id="st4">'+
    '<div id="bg4"></div><div class="grid4" id="grid4a"></div><div class="grid4" id="grid4b"></div>'+
    '<svg id="sol4" viewBox="-500 -500 1000 1000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
      '<defs><pattern id="pt4" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#F6FF2B"/><circle cx="3.5" cy="3.5" r="1.7" fill="#D7E400"/></pattern></defs>'+
      '<g id="rayos4" fill="none" stroke="url(#pt4)" stroke-linecap="round"></g><g id="cdg4"></g></svg>'+
    '<img id="trama4" alt="" src="'+TRAMA4+'">'+
    '<p id="cap4"><span>CAP 2.</span></p>'+
    '<h2 id="tit4"><span>¿CAMBIÓ LA FORMA DE</span><span>ESCUCHAR MÚSICA?</span></h2>'+
    '<p id="sub4">Working title</p></div>';
  $("visor").appendChild(P);
  /* rayos del sol (mismo trazado que el de la portada) */
  var g=$("rayos4"), NS="http://www.w3.org/2000/svg", N=32;
  for (var i=0;i<N;i++){
    var a=i*2*Math.PI/N-Math.PI/2, od=i%2===1, r0=188, r1=od?330:420;
    var c=Math.cos(a), s=Math.sin(a), d="";
    for (var k=0;k<=24;k++){
      var t=k/24, r=r0+(r1-r0)*t, o=od?Math.sin(t*Math.PI*3)*9:Math.sin(t*Math.PI*2)*4;
      d+=(k?"L":"M")+(c*r-s*o).toFixed(1)+" "+(s*r+c*o).toFixed(1)+" ";
    }
    var p=document.createElementNS(NS,"path"); p.setAttribute("d",d);
    p.setAttribute("stroke-width",od?20:26); g.appendChild(p);
  }
  /* mosaico de transición */
  var M4=document.createElement("div"); M4.id="stm4"; M4.className="stg"; $("visor").appendChild(M4);
  for (var i2=0;i2<COLS;i2++) for (var j2=0;j2<ROWS;j2++){
    var h=((i2*73+j2*151)%97)/97, cel=document.createElement("div");
    cel.style.cssText="position:absolute;width:97px;height:97px;left:"+(-576+i2*96)+"px;top:"+(-340+j2*96)+"px;transform:scale(0);background:"+COLORES[(i2*7+j2*3)%4];
    M4.appendChild(cel); CEL4.push({el:cel,d:(i2/(COLS-1))*.55+h*.2});
  }
})();
/* el título se apoya en la línea de base medida en la fuente real */
function calibrar4(){
  try{
    var c=document.createElement("canvas").getContext("2d");
    c.font='600 116px "Bitcount Single"';
    var m=c.measureText("E"), fa=m.fontBoundingBoxAscent, fd=m.fontBoundingBoxDescent;
    if(!(fa>0)) return;
    $("tit4").style.top=(565-((114-(fa+fd))/2+fa))+"px";
  }catch(e){}
}
document.fonts.load('600 116px "Bitcount Single"').catch(function(){}).then(calibrar4);
var ultT4=-1;
function dibujarT4(t){
  $("p4").style.opacity=t>=.5?1:0;
  if (t===ultT4) return; ultT4=t;
  CEL4.forEach(function(c){
    var u=t<=.5 ? clamp((t/.5-c.d)/.25) : 1-clamp(((t-.5)/.5-c.d)/.25);
    c.el.style.transform="scale("+u+")";
  });
}
/* ===== CAP 2 (continuación): sol -> CD -> lluvia de CDs + gráfico -> ventanas ===== */
function pol(r,deg){ var a=deg*Math.PI/180; return (r*Math.cos(a)).toFixed(1)+" "+(r*Math.sin(a)).toFixed(1); }
function ring(R,r){ return "M"+(-R)+" 0A"+R+" "+R+" 0 1 0 "+R+" 0A"+R+" "+R+" 0 1 0 "+(-R)+" 0Z M"+(-r)+" 0A"+r+" "+r+" 0 1 1 "+r+" 0A"+r+" "+r+" 0 1 1 "+(-r)+" 0Z"; }
function sector(r0,r1,a0,a1){ return "M"+pol(r1,a0)+"A"+r1+" "+r1+" 0 0 1 "+pol(r1,a1)+"L"+pol(r0,a1)+"A"+r0+" "+r0+" 0 0 0 "+pol(r0,a0)+"Z"; }
/* dibujo del CD: m=0 es el disco liso del sol, m=1 es el CD completo (agujero, aro, surcos y brillo) */
function cdInner(R,r,m,fill){
  var o='<path fill-rule="evenodd" d="'+ring(R,r)+'" fill="'+fill+'" stroke="#14140a" stroke-width="3.4" stroke-opacity="'+m+'"/>';
  if (m>0.01){
    o+='<path fill-rule="evenodd" d="'+ring(66*m,r)+'" fill="#fff" fill-opacity="'+(.4*m)+'" stroke="#14140a" stroke-width="2.4" stroke-opacity="'+m+'"/>';
    [.5,.66,.82,.94].forEach(function(f){ o+='<circle r="'+(R*f).toFixed(1)+'" fill="none" stroke="#14140a" stroke-width="1.6" stroke-dasharray="1.5 7" stroke-opacity="'+(.6*m)+'"/>'; });
    o+='<path d="'+sector(R*.34,R*.95,-72,-38)+'" fill="#fff" fill-opacity="'+(.5*m)+'"/><path d="'+sector(R*.34,R*.95,108,142)+'" fill="#fff" fill-opacity="'+(.5*m)+'"/>';
  }
  return o;
}
/* CD en bitmap: pixeles duros con el mismo punteado amarillo del sol */
function makeSprite(n,fine){
  var c=document.createElement("canvas"); c.width=c.height=n; var g=c.getContext("2d"), u=430/n, id=g.createImageData(n,n), P=id.data;
  for (var y=0;y<n;y++) for (var x=0;x<n;x++){
    var dx=(x+.5-n/2)*u, dy=(y+.5-n/2)*u, r=Math.sqrt(dx*dx+dy*dy), ang=Math.atan2(dy,dx)*180/Math.PI, dk=((x+y)%2===0), col;
    if (r>215 || r<36) continue;
    if (r>215-u || r<36+u) col="#14140a";
    else if (fine && Math.abs(r-66)<u/2) col="#14140a";
    else if (r<66) col=dk?"#FFFFFF":"#F4F4C8";
    else if (r>73 && r<204 && ((ang>-72&&ang<-38)||(ang>108&&ang<142))) col=dk?"#FDFFA6":"#F6FF2B";
    else if (fine && dk && [.5,.66,.82,.94].some(function(f){ return Math.abs(r-215*f)<u/2; })) col="#14140a";
    else col=(x%2===1&&y%2===1)?"#D7E400":"#F6FF2B";
    var i=(y*n+x)*4; P[i]=parseInt(col.substr(1,2),16); P[i+1]=parseInt(col.substr(3,2),16); P[i+2]=parseInt(col.substr(5,2),16); P[i+3]=255;
  }
  g.putImageData(id,0,0); return c.toDataURL();
}
/* ilustración vectorial -> bitmap de baja resolución (sin suavizado) */
function bitmapize(svg,w,h,el){
  var im=new Image();
  im.onload=function(){ var c=document.createElement("canvas"); c.width=w; c.height=h; var g=c.getContext("2d"); g.drawImage(im,0,0,w,h);
    var d=g.getImageData(0,0,w,h), p=d.data; for (var i=3;i<p.length;i+=4) p[i]=p[i]>110?255:0; g.putImageData(d,0,0);
    el.style.backgroundImage="url("+c.toDataURL()+")"; };
  im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}
var SVG_TT='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"><g stroke="#14140a" stroke-width="4" stroke-linejoin="round"><polygon points="8,40 56,52 56,68 8,56" fill="#D7E400"/><polygon points="56,52 114,34 114,50 56,68" fill="#BFC800"/><polygon points="8,40 66,22 114,34 56,52" fill="#F6FF2B"/></g><ellipse cx="62" cy="38" rx="24" ry="8" fill="#14140a"/><ellipse cx="62" cy="38" rx="6" ry="2" fill="#F6FF2B"/><path d="M104 28L84 38" stroke="#14140a" stroke-width="4" stroke-linecap="round"/></svg>';
var SVG_MP='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 80"><rect x="6" y="6" width="38" height="68" rx="6" fill="#F6FF2B" stroke="#14140a" stroke-width="4"/><rect x="12" y="12" width="26" height="22" fill="#14140a"/><circle cx="25" cy="54" r="10" fill="#F6FF2B" stroke="#14140a" stroke-width="4"/><circle cx="25" cy="54" r="2.5" fill="#14140a"/><path d="M44 62C60 72 72 52 62 44C54 38 60 24 76 28" fill="none" stroke="#14140a" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="82" cy="26" rx="6" ry="8" fill="#fff" stroke="#14140a" stroke-width="3.5"/><ellipse cx="98" cy="42" rx="6" ry="8" fill="#fff" stroke="#14140a" stroke-width="3.5"/></svg>';
var SVG_AR='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 50"><path d="M12 0V38" stroke="#FF3B66" stroke-width="5"/><path d="M3 30L12 44L21 30" fill="none" stroke="#FF3B66" stroke-width="5" stroke-linejoin="miter"/></svg>';
var CDIMG="img/img08.png", IMG_TT="img/img09.png", IMG_MP="img/img10.png", IMG_AR="img/img11.png";
var T_CAP="img/img12.png", T_TIT="img/img13.png", T_Y13="img/img14.png", T_Y22="img/img15.png", T_P75="img/img16.png", T_P33="img/img17.png";
var CEL5=[], RAIN=[], ultK5=-1, ultM4=-1;
(function(){
  var NS="http://www.w3.org/2000/svg";
  /* textura de píxeles crema (la de las pantallas claras) */
  var cv=document.createElement("canvas"); cv.width=73; cv.height=47; var cx=cv.getContext("2d"), sd=7;
  var PAL=["#FDFCF8","#FBFAF6","#F8F6F0","#F4F2EB"];
  for (var x=0;x<73;x++) for (var y=0;y<47;y++){ sd=(sd*16807)%2147483647; var v=sd/2147483647; cx.fillStyle=v<.55?PAL[0]:v<.8?PAL[1]:v<.93?PAL[2]:PAL[3]; cx.fillRect(x,y,1,1); }
  var TEX5=cv.toDataURL();
  var P5=document.createElement("div"); P5.id="p5";
  P5.innerHTML='<div class="stg" id="st5"><div id="cel5"></div>'+
    '<div id="cap5"><img alt="CAP 2." width="96" height="28.5" src="'+T_CAP+'"></div>'+
    '<div id="tit5"><img alt="¿Quién todavía usa reproductor de música?" width="1466" height="65.5" src="'+T_TIT+'"></div>'+
    '<div id="ey5"></div><div id="ex5"></div>'+
    '<div class="yr5" id="yr13"><img alt="2013" width="88" height="27" src="'+T_Y13+'"></div><div class="yr5" id="yr22"><img alt="2022" width="88" height="27" src="'+T_Y22+'"></div>'+
    '<div class="gr5" id="gr75" style="top:450px"></div><div class="gr5" id="gr33" style="top:708px"></div>'+
    '<svg id="ln5" viewBox="0 0 1728 1117" aria-hidden="true"><defs><clipPath id="clp5"><rect id="clr5" x="0" y="0" width="0" height="1117"/></clipPath></defs>'+
      '<path d="M120 451L1203 709" fill="none" stroke="#FF3B66" stroke-width="4.5" stroke-dasharray="24 5 5 5" clip-path="url(#clp5)"/>'+
      '<circle id="dot5" cx="1203" cy="709" r="8" fill="#FF3B66" opacity="0"/></svg>'+
    '<div class="pill5" id="pl75" style="top:428px"><img alt="75%" width="79.5" height="27" src="'+T_P75+'"></div><div class="pill5" id="pl33" style="top:686px"><img alt="33%" width="79.5" height="27" src="'+T_P33+'"></div>'+
    '<div id="cdb5"></div>'+
    '<div id="rain5" style="position:absolute;left:0;top:0;width:1728px;height:1117px"></div>'+
    '<div id="ev5"><div class="evh"><b>Evolución</b><span>✳</span></div><div class="evb"></div>'+
      '<div class="bm" id="evtt" style="left:85.5px;top:69px;width:105px;height:83px"></div>'+
      '<div class="ar" id="evar1" style="left:128.5px;top:172px"></div>'+
      '<div class="bm" id="evcd" style="left:71px;top:242px;width:134px;height:134px"></div>'+
      '<div class="ar" id="evar2" style="left:128.5px;top:394px"></div>'+
      '<div class="bm" id="evmp" style="left:102px;top:473px;width:120px;height:95px"></div></div>'+
    '<div class="fila" id="fm5" style="left:1209px;top:340px"><div class="av3"></div><div class="vent"><div class="tb"><b class="nm">MELI</b><span><i></i><i></i></span></div><p>En mi casa le regalamos el reproductor a mi abuelo.</p></div></div>'+
    '<div class="bub" id="bm5" style="right:40px;top:470px;transform-origin:right top"><div class="cuerpo"><div class="cab"><b>Mari</b><span>*</span></div><p>Y, ¿Cómo escuchás tus álbums favoritos?</p></div><div class="av"><img alt="" src="'+AV+'"></div></div>'+
  '</div>';
  $("visor").appendChild(P5);
  var SPR_BIG=CDIMG, SPR_SM=CDIMG;
  $("cdb5").style.backgroundImage="url("+CDIMG+")";
  $("evcd").style.backgroundImage="url("+CDIMG+")";
  $("evtt").style.backgroundImage="url("+IMG_TT+")"; $("evmp").style.backgroundImage="url("+IMG_MP+")";
  $("evar1").style.backgroundImage="url("+IMG_AR+")"; $("evar2").style.backgroundImage="url("+IMG_AR+")";
  /* el disco del sol: círculo punteado que se transforma en el CD del frame */
  $("cdg4").innerHTML='<circle id="cdc4" r="155" fill="url(#pt4)"/><image id="cdi4" x="-155" y="-155" width="310" height="310" opacity="0"/>';
  $("cdi4").setAttribute("href",CDIMG);
  /* mosaico crema (disuelve la página rosa) */
  var cel=$("cel5");
  for (var i=0;i<COLS;i++) for (var j=0;j<ROWS;j++){
    var h=((i*73+j*151)%97)/97, L=-576+i*96, T=-340+j*96, d=document.createElement("div");
    d.style.cssText="position:absolute;width:97px;height:97px;left:"+L+"px;top:"+T+"px;transform:scale(0);background:url("+TEX5+") "+(-L)+"px "+(-T)+"px/1752px 1128px;image-rendering:pixelated";
    cel.appendChild(d); CEL5.push({el:d,d:(i/(COLS-1))*.55+h*.2});
  }
  /* lluvia de CDs */
  var N=28, rs=11, rn=function(){ rs=(rs*16807)%2147483647; return rs/2147483647; };
  for (var n=0;n<N;n++){
    var slot=(n*11)%N, du=.4+.15*rn(), dm=44+30*rn();
    var u=document.createElement("div"); u.className="rcd"; u.style.backgroundImage="url("+SPR_SM+")"; $("rain5").appendChild(u);
    RAIN.push({el:u, x:Math.round((slot+.5)/N*1728+(rn()-.5)*50), k:(dm*2)/430, du:du, dl:rn()*(1-du), r0:rn()*360, rv:(rn()<.5?-1:1)*(90+rn()*150)});
  }
})();
var TILES6=["img/img18.webp","img/img19.webp","img/img20.webp","img/img21.webp"];
var CEL6=[], ultK6=-1;
(function(){
  var P6=document.createElement("div"); P6.id="p6";
  P6.innerHTML='<div class="stg" id="st6"><div id="cel6"></div>'+
    '<div id="strip6">'+TILES6.map(function(u){ return '<img alt="" src="'+u+'">'; }).join("")+'</div>'+
    '<div class="fila" id="fm6" style="left:70px;top:130px"><div class="av3"></div><div class="vent"><div class="tb"><b class="nm">MELI</b><span><i></i><i></i></span></div><p>Nunca escuché ninguno de estos álbums...</p></div></div>'+
    '<div class="bub" id="bm6" style="right:50px;top:56px"><div class="cuerpo"><div class="cab"><b>Mari</b><span>*</span></div><p>Mi mamá es fan de Luis Miguel..</p></div><div class="av"><img alt="" src="'+AV+'"></div></div>'+
  '</div>';
  $("visor").appendChild(P6);
  var cel=$("cel6");
  for (var i=0;i<COLS;i++) for (var j=0;j<ROWS;j++){
    var h=((i*53+j*131)%89)/89, d=document.createElement("div");
    d.style.cssText="position:absolute;width:97px;height:97px;left:"+(-576+i*96)+"px;top:"+(-340+j*96)+"px;transform:scale(0);background:#FFFF24";
    cel.appendChild(d); CEL6.push({el:d,d:(i/(COLS-1))*.55+h*.2});
  }
})();
var IMG_CAP3="img/img22.png";
var IMG_PODIO="img/img23.png";
var IMG_TOTAL="img/img24.png";
var IMG_LABL="img/img25.png";
var IMG_LABC="img/img26.png";
var IMG_LABR="img/img27.png";
var IMG_PLAYL="img/img28.png";
var IMG_PLAYC="img/img29.png";
var IMG_PLAYR="img/img30.png";
var IMG_CARDL="img/img31.webp";
var IMG_CARDC="img/img32.webp";
var IMG_CARDR="img/img33.webp";

var IMG_Y2025="img/img34.png";
var IMG_VS="img/img35.png";
var IMG_NLABL="img/img36.png";
var IMG_NCARDL="img/img37.webp";
var IMG_NLABC="img/img38.png";
var IMG_NCARDC="img/img39.webp";
var IMG_NLABR="img/img40.png";
var IMG_NCARDR="img/img41.webp";
/* ===== CAP 3: el podio ===== */
/* Audios del podio: poné acá la URL (mp3/ogg) de cada tema. El botón de play de cada puesto la reproduce; si queda vacía solo cambia el ícono. */
var PODIO_AUDIO={ fito:"audio/Fito Paez.mp3",
                  luis:"audio/Luis Miguel.mp3",
                  calamaro:"audio/Andres Calamaro.mp3",
                  taylor:"audio/Taylor Swift.mp3",
                  lali:"audio/Lali.mp3", 
                  pescado:"audio/Pescado Rabioso.mp3",
                  d80:"audio/Soda Stereo.mp3",
                  d90:"audio/Enanitos Verdes.mp3",
                  d00:"audio/Miranda.mp3",
                  d10:"audio/Paulo Londra.mp3",
                  d20:"audio/Bizarrap Quevedo.mp3" };
var podioAudio={}, podioActual=null;
function podioParar(){ if(podioActual){ if(podioActual.audio.pause) podioActual.audio.pause(); podioActual.btn.classList.remove("on"); podioActual.btn.setAttribute("aria-pressed","false"); podioActual=null; } }
function podioToggle(btn){
  var id=btn.getAttribute("data-id"), src=PODIO_AUDIO[id], mismo=podioActual&&podioActual.btn===btn;
  podioParar(); if(mismo) return;
  btn.classList.add("on"); btn.setAttribute("aria-pressed","true");
  if(!src){ podioActual={btn:btn,audio:{}}; return; }
  var au=podioAudio[id]||(podioAudio[id]=new Audio(src)); au.currentTime=0; au.onended=podioParar;
  var pr=au.play(); if(pr&&pr.catch) pr.catch(function(){ podioParar(); });
  podioActual={btn:btn,audio:au};
}
var CEL7=[], ultT7=-1;
var TEX7=(function(){ var cv=document.createElement("canvas"); cv.width=73; cv.height=47; var cx=cv.getContext("2d"), sd=7, PAL=["#FDFCF8","#FBFAF6","#F8F6F0","#F4F2EB"];
  for (var x=0;x<73;x++) for (var y=0;y<47;y++){ sd=(sd*16807)%2147483647; var v=sd/2147483647; cx.fillStyle=v<.55?PAL[0]:v<.8?PAL[1]:v<.93?PAL[2]:PAL[3]; cx.fillRect(x,y,1,1); }
  return cv.toDataURL(); })();
(function(){
  var P7=document.createElement("div"); P7.id="p7";
  P7.innerHTML='<div class="stg" id="st7"><div style="position:absolute;left:-576px;top:-340px;width:2880px;height:1728px;background:url('+TEX7+') 0 0/1752px 1128px;image-rendering:pixelated"></div><img class="pi" alt="" style="left:69.0px;top:88.5px;width:98.75px;height:29.0px" src="'+IMG_CAP3+'"><img class="pi" alt="" style="left:69.0px;top:135.0px;width:238.0px;height:70.0px" src="'+IMG_PODIO+'"><img class="pi" id="htotal" alt="" style="left:1426.5px;top:120.25px;width:187.5px;height:46.5px" src="'+IMG_TOTAL+'"><img class="pi" id="h2025" alt="" style="left:1477.75px;top:121.25px;width:151.25px;height:46.75px;opacity:0" src="'+IMG_Y2025+'"><div id="pold" style="position:absolute;left:0;top:0;width:1728px;height:1117px;transform-origin:0 0"><div class="pu" id="pl0" style="left:78.0px;top:917.0px;width:424.0px;height:111.0px"><img alt="" src="'+IMG_LABL+'"></div><div class="pu" id="pl1" style="left:559.0px;top:917.0px;width:621.0px;height:111.0px"><img alt="" src="'+IMG_LABC+'"></div><div class="pu" id="pl2" style="left:1232.0px;top:917.0px;width:415.0px;height:111.0px"><img alt="" src="'+IMG_LABR+'"></div><div class="pblk" id="pb0" style="left:85px;top:650px;width:415px;height:233px"><button type="button" class="play" id="pp0" data-id="fito" aria-label="Escuchar Fito Páez – El amor después del amor" aria-pressed="false" style="left:165.0px;top:129.0px;width:81.25px;height:77.75px;background-image:url('+IMG_PLAYL+')"></button></div><div class="pblk" id="pb1" style="left:561px;top:484px;width:615px;height:399px"><button type="button" class="play" id="pp1" data-id="luis" aria-label="Escuchar Luis Miguel – Romance" aria-pressed="false" style="left:238.0px;top:239.0px;width:142.0px;height:142.0px;background-image:url('+IMG_PLAYC+')"></button></div><div class="pblk" id="pb2" style="left:1236px;top:759px;width:407px;height:124px"><button type="button" class="play" id="pp2" data-id="calamaro" aria-label="Escuchar Andrés Calamaro – Alta suciedad" aria-pressed="false" style="left:162.0px;top:20.0px;width:81.25px;height:77.75px;background-image:url('+IMG_PLAYR+')"></button></div><div class="pu" id="pc0" style="left:109.0px;top:327.0px;width:367.0px;height:437.75px"><img alt="Fito Páez – El amor después del amor" src="'+IMG_CARDL+'"></div><div class="pu" id="pc1" style="left:637.0px;top:156.25px;width:464.75px;height:551.0px"><img alt="Luis Miguel – Romance" src="'+IMG_CARDC+'"></div><div class="pu" id="pc2" style="left:1256.0px;top:327.0px;width:367.0px;height:437.75px"><img alt="Andrés Calamaro – Alta suciedad" src="'+IMG_CARDR+'"></div></div>'+'<div id="pnew" style="position:absolute;left:0;top:0;width:1728px;height:1117px;transform-origin:0 0;visibility:hidden">'+'<div style="position:absolute;left:78.0px;top:917.0px;width:424.0px;height:111.0px"><img alt="" style="display:block;width:100%;height:100%" src="'+IMG_NLABL+'"></div>'+'<div style="position:absolute;left:559.0px;top:917.0px;width:621.0px;height:111.0px"><img alt="" style="display:block;width:100%;height:100%" src="'+IMG_NLABC+'"></div>'+'<div style="position:absolute;left:1232.0px;top:917.0px;width:415.0px;height:111.0px"><img alt="" style="display:block;width:100%;height:100%" src="'+IMG_NLABR+'"></div>'+'<div class="pblk" style="opacity:1;left:85px;top:650px;width:415px;height:233px"><button type="button" class="play" id="np0" data-id="taylor" aria-label="Escuchar Taylor Swift – The life of a showgirl" aria-pressed="false" style="left:165.0px;top:129.0px;width:81.25px;height:77.75px;background-image:url('+IMG_PLAYL+')"></button></div>'+'<div class="pblk" style="opacity:1;left:561px;top:484px;width:615px;height:399px"><button type="button" class="play" id="np1" data-id="lali" aria-label="Escuchar Lali – No vayas a atender cuando el demonio te llama" aria-pressed="false" style="left:238.0px;top:239.0px;width:142.0px;height:142.0px;background-image:url('+IMG_PLAYC+')"></button></div>'+'<div class="pblk" style="opacity:1;left:1236px;top:759px;width:407px;height:124px"><button type="button" class="play" id="np2" data-id="pescado" aria-label="Escuchar Pescado Rabioso – Artaud" aria-pressed="false" style="left:162.0px;top:20.0px;width:81.25px;height:77.75px;background-image:url('+IMG_PLAYR+')"></button></div>'+'<div class="ncd" style="position:absolute;left:98.0px;top:327.0px;width:388.0px;height:431.25px"><img alt="Taylor Swift – The life of a showgirl" src="'+IMG_NCARDL+'"></div>'+'<div class="ncd" style="position:absolute;left:629.0px;top:171.0px;width:478.0px;height:531.25px"><img alt="Lali – No vayas a atender cuando el demonio te llama" src="'+IMG_NCARDC+'"></div>'+'<div class="ncd" style="position:absolute;left:1251.0px;top:325.0px;width:391.25px;height:435.25px"><img alt="Pescado Rabioso – Artaud" src="'+IMG_NCARDR+'"></div>'+'</div><img id="vs7" alt="VS" style="position:absolute;left:764.75px;top:490.5px;width:189px;height:189px;opacity:0" src="'+IMG_VS+'">'+'</div>';
  $("visor").appendChild(P7);
  var M7=document.createElement("div"); M7.id="m7"; M7.innerHTML='<div class="stg" id="stm7"></div>'; $("visor").appendChild(M7);
  var YEL=["#FFFF24","#E4FF1B","#F2FF45","#D2F716"], host=$("stm7");
  for (var i=0;i<COLS;i++) for (var j=0;j<ROWS;j++){
    var h=((i*37+j*91)%83)/83, c=document.createElement("div");
    c.style.cssText="position:absolute;width:97px;height:97px;left:"+(-576+i*96)+"px;top:"+(-340+j*96)+"px;transform:scale(0);background:"+YEL[(i*5+j*3)%4];
    host.appendChild(c); CEL7.push({el:c,d:(i/(COLS-1))*.55+h*.2});
  }
  /* bloques del podio con el efecto bitmap del diseño */
  Array.prototype.forEach.call(document.querySelectorAll("#st7 .pblk"),function(b){ b.style.backgroundImage="url(img/podio_b"+parseInt(b.style.width)+".png)"; });
  [0,1,2].forEach(function(j){ $("pp"+j).addEventListener("click",function(){ podioToggle(this); }); $("np"+j).addEventListener("click",function(){ podioToggle(this); }); });
})();
function dibujarE(e){
  var s=e*EXTRA4;
  dibujar15((s-P15A)/P15D);
  if (s>P15A) s=P15A+Math.max(0,s-P15A-P15D);
  var ph=function(a,b){ return clamp((s-a)/(b-a)); };
  dibujar8(s,ph); dibujar9(s,ph); dibujarCap4(s,ph); dibujarSc(s,ph); dibujarTop(s,ph); dibujarTop2(s,ph); dibujarCap4b(s,ph); dibujarDona(s,ph); dibujarFin(s,ph);
  var t4=clamp(s/2), a=suave(ph(2,3));
  dibujarT4(t4);
  var m=suave(ph(3.8,4.8)), fo=1-suave(ph(4.6,5.2)), k5=ph(5.2,6.4), on5=s>=5.2, tx=a*fo, k6=ph(12.3,13.1), t7=ph(21,22.4);
  $("p4").style.opacity=(t4>=.5&&k5<1)?1:0;
  dibujar26(s,t4,k5,ph);
  $("cap4").style.opacity=tx;
  $("tit4").style.opacity=tx; $("tit4").style.transform="scale("+lerp(1.25,1,a)+")";
  $("sub4").style.opacity=tx;
  /* el sol se vuelve CD: los rayos se recogen y el disco crece, se agujerea y se pone amarillo */
  var so=$("sol4");
  so.style.opacity=on5?0:a*lerp(.4,1,m);
  so.style.transform="translate(366px,43px) scale("+lerp(lerp(.455,.52,a),.9,m)+")";
  if (m!==ultM4){
    ultM4=m;
    var Rm=lerp(155,215,m), ci=$("cdi4"), cc=$("cdc4");
    cc.setAttribute("r",Rm); cc.setAttribute("opacity",1-m);
    ci.setAttribute("x",-Rm); ci.setAttribute("y",-Rm); ci.setAttribute("width",2*Rm); ci.setAttribute("height",2*Rm); ci.setAttribute("opacity",m);
    var rg=$("rayos4"); rg.setAttribute("transform","scale("+Math.max(.001,1-m)+") rotate("+(m*50)+")"); rg.style.opacity=1-m;
  }
  $("p5").style.opacity=(on5&&k6<1)?1:0;
  $("p6").style.opacity=(s>=12.3&&t7<.5)?1:0;
  $("p7").style.visibility=t7>=.5?"visible":"hidden";
  if (t7<.5) podioParar();
  if (!on5) return;
  /* página crema que disuelve a la rosa */
  if (k5!==ultK5){ ultK5=k5; CEL5.forEach(function(c){ c.el.style.transform="scale("+clamp((k5-c.d)/.25)+")"; }); }
  /* el CD se achica y cae junto con la lluvia */
  var fy=Math.pow(ph(5.4,7.4),1.7);
  $("cdb5").style.transform="translate(366px,"+(lerp(543,1290,fy)-500)+"px) scale("+lerp(.9,.2,suave(ph(5.2,6.2)))+") rotate("+(fy*260)+"deg)";
  var R5=ph(5.4,7.8);
  RAIN.forEach(function(c){
    var p=clamp((R5-c.dl)/c.du), y=lerp(-120,1257,p);
    c.el.style.transform="translate("+c.x+"px,"+y.toFixed(1)+"px) rotate("+(c.r0+p*c.rv).toFixed(1)+"deg) scale("+c.k.toFixed(4)+")";
  });
  /* gráfico */
  var at=suave(ph(5.9,6.5));
  ["cap5","tit5"].forEach(function(id){ $(id).style.opacity=at; $(id).style.transform="translateY("+((1-at)*24)+"px)"; });
  $("ey5").style.clipPath="inset("+((1-ph(6.0,6.6))*100)+"% 0 0 0)";
  $("ex5").style.clipPath="inset(0 "+((1-ph(6.1,6.8))*100)+"% 0 0)";
  var yo=ph(6.3,6.8); $("yr13").style.opacity=yo; $("yr22").style.opacity=yo;
  var go=ph(6.5,7.1);
  ["gr75","gr33"].forEach(function(id){ $(id).style.clipPath="inset(0 "+((1-go)*100)+"% 0 0)"; });
  var p1=ph(6.6,6.9); $("pl75").style.opacity=clamp(p1*3); $("pl75").style.transform="scale("+lerp(.6,1,salida(p1))+")";
  var L=suave(ph(6.9,7.9)); $("clr5").setAttribute("width",lerp(100,1215,L)); $("dot5").setAttribute("opacity",clamp((L-.96)/.04));
  var p2=ph(7.6,7.9); $("pl33").style.opacity=clamp(p2*3); $("pl33").style.transform="scale("+lerp(.6,1,salida(p2))+")";
  /* línea de tiempo "Evolución": entra como las ventanas, sus ilustraciones aparecen una a una y sale antes de los mensajes */
  var pe=ph(7.9,8.4), pe1=1-Math.pow(1-pe,3), px=1-suave(ph(9.9,10.3)), ev=$("ev5");
  ev.style.opacity=clamp(pe*3)*px; ev.style.transform="translateY("+((1-pe1)*140-(1-px)*30)+"px)";
  [["evtt",8.4,8.7],["evcd",8.85,9.15],["evmp",9.3,9.6]].forEach(function(q){ var t=ph(q[1],q[2]), e=1-Math.pow(1-t,3), el=$(q[0]); el.style.opacity=clamp(t*3); el.style.transform="translateY("+((1-e)*30)+"px)"; });
  $("evar1").style.clipPath="inset(0 0 "+((1-ph(8.7,8.85))*100)+"% 0)"; $("evar2").style.clipPath="inset(0 0 "+((1-ph(9.15,9.3))*100)+"% 0)";
  /* ventanas: misma entrada que el resto (suben con ease-out y aparecen) */
  var w1=ph(10.3,10.9), e1=1-Math.pow(1-w1,3);
  $("fm5").style.opacity=clamp(w1*3); $("fm5").style.transform="translateY("+((1-e1)*140)+"px)";
  var w2=ph(11.1,11.7), e2=1-Math.pow(1-w2,3);
  $("bm5").style.opacity=clamp(w2*3); $("bm5").style.transform="translateY("+((1-e2)*170)+"px) scale(.82)";
  /* álbumes: el scroll vertical mueve la tira en horizontal; frena con los de Luis Miguel (Mari) y al final (MELI) */
  if (k6!==ultK6){ ultK6=k6; CEL6.forEach(function(c){ c.el.style.transform="scale("+clamp((k6-c.d)/.25)+")"; }); }
  var r6=s-13.1, KF=[[0,1728],[2.4,-953],[3.5,-1100],[5.8,-3600],[7,-3938]], x0=1728;
  for (var q=0;q<KF.length-1;q++){ if (r6>=KF[q][0]) x0=lerp(KF[q][1],KF[q+1][1],clamp((r6-KF[q][0])/(KF[q+1][0]-KF[q][0]))); }
  $("strip6").style.transform="translateX("+x0.toFixed(1)+"px)";
  var v1=ph(15.7,16.3), f1=1-Math.pow(1-v1,3);
  $("bm6").style.opacity=clamp(v1*3); $("bm6").style.transform="translateY("+((1-f1)*170)+"px)";
  var v2=ph(19.7,20.3), f2=1-Math.pow(1-v2,3);
  $("fm6").style.opacity=clamp(v2*3); $("fm6").style.transform="translateY("+((1-f2)*140)+"px)";
  /* transición amarilla (los mismos cuadrados que la rosa) y podio: todo baja a medida que se scrollea */
  if (t7!==ultT7){ ultT7=t7; CEL7.forEach(function(c){ var u=t7<=.5?clamp((t7/.5-c.d)/.25):1-clamp(((t7-.5)/.5-c.d)/.25); c.el.style.transform="scale("+u+")"; }); }
  var bajar=function(el,t,dy){ var q=1-Math.pow(1-t,3); el.style.opacity=clamp(t*3); el.style.transform="translateY("+(-(1-q)*dy)+"px)"; };
  for (var j7=0;j7<3;j7++){
    bajar($("pl"+j7),ph(22.6+.1*j7,23.2+.1*j7),280);
    var tb=ph(23.4+.1*j7,24.0+.1*j7); bajar($("pb"+j7),tb,380); $("pp"+j7).style.pointerEvents=tb>.95?"auto":"none";
    bajar($("pc"+j7),ph(24.3+.12*j7,24.95+.12*j7),420);
  }
  /* VS: el podio de siempre se achica hacia arriba, el de 2025 entra por la derecha y después aparece el VS */
  var sh=suave(ph(26.0,27.2)), up=suave(ph(29.4,30.4)), po=$("pold"); po.style.transform="translate("+(sh*424)+"px,"+(sh*79.4-up*650)+"px) scale("+lerp(1,.488,sh)+")";
  po.style.opacity=1-clamp((up-.55)/.45); po.style.visibility=up>=1?"hidden":"visible";
  var th=clamp(ph(26.0,26.7)), ht=$("htotal"); ht.style.opacity=1-th; ht.style.transform="translateY("+(-th*30)+"px)";
  var tn=ph(26.8,28.0), qn=1-Math.pow(1-tn,3), pn=$("pnew");
  pn.style.visibility=tn>0?"visible":"hidden";
  var gr=suave(ph(29.6,30.9)); pn.style.transform="translate("+(420.5*(1-gr)+(1-qn)*1500)+"px,"+(495.7*(1-gr))+"px) scale("+lerp(.503,1,gr)+")";
  var h25=$("h2025"); h25.style.opacity=clamp(tn*3); h25.style.transform="translateX("+((1-qn)*500)+"px)";
  for (var j8=0;j8<3;j8++) $("np"+j8).style.pointerEvents=tn>.95?"auto":"none";
  var tv=ph(28.2,28.8), vs=$("vs7"); var vo=clamp(ph(29.4,29.9)); vs.style.opacity=clamp(tv*3)*(1-vo); vs.style.transform="scale("+lerp(.3,1,salida(tv))*lerp(1,.4,vo)+")";
}

/* ===== CAP 3: ¿Qué cambió? (gráfico de barras, sale del diseño de Figma) ===== */
var P8={"header": [69, 88, 429, 116], "total": [581, 989, 128, 29], "actual": [1305, 989, 164, 29], "n6": [299, 262, 20, 28], "n2": [501, 698, 20, 27], "n1a": [705, 813, 18, 27], "n1b": [912, 813, 18, 27], "n5a": [1273, 378, 18, 28], "n5b": [1475, 378, 18, 28], "barras": [["arg_t", 221, 317, 176, 643], ["mex", 423, 748, 176, 213], ["esp", 625, 854, 176, 108], ["eeuu_t", 839, 854, 176, 108], ["arg_a", 1193, 425, 176, 536], ["eeuu_a", 1395, 425, 176, 539]], "lab": {"arg_t": ["lab_arg", 355, 857], "mex": ["lab_mex", 545, 854], "esp": ["lab_esp", 759, 865], "eeuu_t": ["lab_eeuu", 974, 838], "arg_a": ["lab_arg", 1334, 857], "eeuu_a": ["lab_eeuu", 1535, 838]}, "num": {"arg_t": "n6", "mex": "n2", "esp": "n1a", "eeuu_t": "n1b", "arg_a": "n5a", "eeuu_a": "n5b"}, "axis": [123, 322, 1445, 640], "con1": [397, 316, 797, 110], "con2": [1014, 431, 382, 426], "dots": [[390, 312], [1186, 418], [1388, 424], [1008, 849], [117, 312]]};
/* tooltips de barras (álbumes de a uno, con flechita para pasar al siguiente) — se usa en los dos gráficos de "¿Qué cambió?" */
function tipsBarras(st,ALB){
  /* tooltips de cada barra: los álbumes de ese país, de a uno; la flechita pasa al siguiente */
  var tip=document.createElement("div"); tip.className="tipx8"; tip.setAttribute("role","tooltip");
  tip.innerHTML='<div class="h"><b></b><button type="button" class="sig" aria-label="Siguiente álbum"><svg viewBox="0 0 14 24" width="14" height="24"><path d="M2 2l10 10L2 22" fill="none" stroke="#FDFCF7" stroke-width="3.2"/></svg></button></div><div class="c"></div><i class="pu"></i>';
  st.appendChild(tip);
  var actual8=null, idx8=0, cierre8=null;
  function pintar8(){
    var lista=ALB[actual8.id.slice(3)], a=lista[idx8], varios=lista.length>1;
    tip.querySelector("b").textContent=(varios?(idx8+1)+". ":"")+a[0];
    tip.querySelector(".c").textContent=a[1];
    tip.classList.toggle("varios",varios);
    var w=actual8, cx=parseFloat(w.style.left)+parseFloat(w.style.width)/2, top=parseFloat(w.style.top)-parseFloat(w.style.height)*.05; /* la barra crece 5% al pasar el mouse */
    tip.style.left=(cx-207)+"px"; tip.style.top=(top-80-41-tip.offsetHeight)+"px";
  }
  function abrir8(w){ clearTimeout(cierre8); if(actual8&&actual8!==w) actual8.classList.remove("act"); if(actual8!==w){ actual8=w; idx8=0; var c=tip.querySelector(".c"), mx=0; c.style.minHeight="0"; ALB[w.id.slice(3)].forEach(function(a){ c.textContent=a[1]; mx=Math.max(mx,c.offsetHeight); }); c.style.minHeight=mx+"px"; } w.classList.add("act"); pintar8(); tip.classList.add("on"); }
  function cerrar8(){ cierre8=setTimeout(function(){ tip.classList.remove("on"); if(actual8) actual8.classList.remove("act"); actual8=null; },180); }
  st.querySelectorAll(".bar8").forEach(function(w){ w.addEventListener("mouseenter",function(){ abrir8(w); }); w.addEventListener("mouseleave",cerrar8); w.addEventListener("click",function(){ abrir8(w); }); });
  tip.addEventListener("mouseenter",function(){ clearTimeout(cierre8); });
  tip.addEventListener("mouseleave",cerrar8);
  tip.querySelector(".sig").addEventListener("click",function(ev){ ev.stopPropagation(); if(!actual8) return; idx8=(idx8+1)%ALB[actual8.id.slice(3)].length; pintar8(); });
}
var C8="img/cambio/";
/* álbumes de cada barra: total = los 10 más vendidos de la historia; actual = ranking de ventas 2025 (semana del 27/1 al 3/2) */
var ALB8={
  arg_t:[["Fito Páez","El amor después del amor"],["Andrés Calamaro","Alta suciedad"],["Miguel Mateos / ZAS","Rockas vivas"],["Chiquititas","Chiquititas vol. 2 y 3"],["Soledad Pastorutti","Poncho al viento"],["Soda Stereo","Canción animal"]],
  mex:[["Luis Miguel","Romance"],["Luis Miguel","Aries"]],
  esp:[["Julio Iglesias","De niña a mujer"]],
  eeuu_t:[["Michael Jackson","Thriller"]],
  arg_a:[["Pescado Rabioso","Artaud"],["Emilia",".mp3"],["Soda Stereo","Canción animal"],["Gustavo Cerati","Bocanada"],["Gustavo Cerati","Amor amarillo"]],
  eeuu_a:[["Taylor Swift","The Tortured Poets Department: The Anthology"],["Twenty One Pilots","Clancy"],["Twenty One Pilots","Blurryface"],["Olivia Rodrigo","Sour (deluxe)"],["Ariana Grande","Eternal Sunshine"]]
};
(function(){
  function im(src,x,y,cls){ var i=document.createElement("img"); i.src=C8+src+".png"; i.alt=""; i.className="i8"+(cls?" "+cls:""); i.style.left=x+"px"; i.style.top=y+"px"; return i; }
  var P=document.createElement("div"); P.id="p8";
  var st=document.createElement("div"); st.className="stg"; st.id="st8"; P.appendChild(st);
  /* fondo de píxeles, repetido en espejo a los costados */
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var f=im("fondo",i*1728,j*1117,"fondo8"); if (i||j) f.style.transform="scale("+(i?-1:1)+","+(j?-1:1)+")"; st.appendChild(f);
  }
  st.appendChild(im("header",P8.header[0],P8.header[1],"head8"));
  /* barras: cada una con su versión con borde, su etiqueta y su número (hover) */
  P8.barras.forEach(function(b){
    var n=b[0], w=document.createElement("div"); w.className="bar8"; w.id="b8_"+n;
    w.style.left=b[1]+"px"; w.style.top=b[2]+"px"; w.style.width=b[3]+"px"; w.style.height=b[4]+"px";
    var inn=document.createElement("div"); inn.className="in8";
    inn.appendChild(im("b_"+n,0,0)); inn.appendChild(im("b_"+n+"_borde",0,0,"borde"));
    var l=P8.lab[n]; inn.appendChild(im(l[0],l[1]-b[1],l[2]-b[2],"lab8"));
    w.appendChild(inn);
    var nb=P8[P8.num[n]]; w.appendChild(im(P8.num[n],nb[0]-b[1],nb[1]-b[2],"num8"));
    st.appendChild(w);
  });
  /* líneas de la grilla (por encima de las barras, en multiplicar, como en Figma) */
  [316,424,747,854].forEach(function(y){ var g=document.createElement("div"); g.className="grid8"; g.style.top=y+"px"; st.appendChild(g); });
  st.appendChild(im("axis",P8.axis[0],P8.axis[1],"axis8"));
  var c1=im("con1",P8.con1[0],P8.con1[1],"con8"); c1.id="con8a"; st.appendChild(c1);
  var c2=im("con2",P8.con2[0],P8.con2[1],"con8"); c2.id="con8b"; st.appendChild(c2);
  tipsBarras(st,ALB8);
  P8.dots.forEach(function(d,k){ var e=im("dot",d[0],d[1],"dot8"); e.id="dot8_"+k; st.appendChild(e); });
  var t=im("total",P8.total[0],P8.total[1],"eje8"); t.id="tot8"; st.appendChild(t);
  var a=im("actual",P8.actual[0],P8.actual[1],"eje8"); a.id="act8"; st.appendChild(a);
  $("visor").appendChild(P);
})();
function dibujar8(s,ph){
  var p=$("p8"), o=suave(ph(31.0,31.8));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0) return;
  var g=suave(ph(31.6,32.2));
  Array.prototype.forEach.call(document.querySelectorAll(".grid8,.axis8"),function(e){ e.style.opacity=g; });
  P8.barras.forEach(function(b,i){
    var t=ph(32.0+.15*i,32.7+.15*i), e=1-Math.pow(1-t,3), w=$("b8_"+b[0]);
    w.firstChild.style.clipPath="inset("+((1-e)*100).toFixed(2)+"% 0 0 0)";
    w.querySelector(".lab8").style.opacity=clamp((t-.6)/.4);
  });
  var te=suave(ph(32.4,32.9));
  ["tot8","act8"].forEach(function(id){ var e=$(id); e.style.opacity=te; e.style.transform="translateY("+((1-te)*16)+"px)"; });
  var ca=ph(33.0,33.6), cb=ph(33.3,33.9);
  $("con8a").style.clipPath="inset(0 "+((1-ca)*100).toFixed(2)+"% 0 0)";
  $("con8b").style.clipPath="inset(0 "+((1-cb)*100).toFixed(2)+"% 0 0)";
  var pop=function(id,t){ var d=$(id), q=salida(clamp(t)); d.style.opacity=clamp(t*4); d.style.transform="scale("+q+")"; };
  pop("dot8_0",ph(32.95,33.15)); pop("dot8_1",ph(33.5,33.7)); pop("dot8_3",ph(33.25,33.45)); pop("dot8_2",ph(33.8,34.0)); pop("dot8_4",ph(31.9,32.1));
  p.classList.toggle("listo",s>=33.2);
}


/* ===== CAP 3: ¿Qué cambió? por géneros (segundo gráfico, misma animación que el primero) ===== */
var P9={"con23": [312, 442, 921, 14], "con24": [431, 326, 677, 247], "total": [459, 952, 128, 29], "actual": [1222, 952, 164, 29], "l_rock": [286, 738, 24, 166], "l_popint": [408, 780, 24, 125], "l_latam": [520, 733, 24, 177], "l_folk": [642, 734, 24, 172], "l_popnac": [763, 772, 24, 140], "l_popint_a": [1165, 780, 24, 125], "l_rock_a": [1287, 642, 24, 269], "l_popnac_a": [1419, 772, 24, 140], "n_rock": [253, 393, 20, 27], "n_popint": [379, 516, 20, 29], "n_latam": [510, 675, 18, 27], "n_folk": [626, 675, 18, 27], "n_popnac": [749, 675, 18, 27], "n_rock_a": [1268, 400, 21, 27], "n_popnac_a": [1393, 731, 18, 27], "barras": [["rock", 214, 449, 105, 476], ["popint", 336, 564, 105, 361], ["latam", 458, 805, 105, 120], ["folk", 580, 805, 105, 120], ["popnac", 702, 805, 105, 120], ["popint_a", 1094, 333, 105, 592], ["rock_a", 1226, 449, 105, 476], ["popnac_a", 1348, 805, 105, 120]], "n_popint_a": [1137, 277, 18, 28]};
var C9="img/cambio2/";
/* álbumes por género: total = los 10 más vendidos de la historia; actual = ranking de ventas 2025 (semana del 27/1 al 3/2) */
var ALB9={
  rock:[["Fito Páez","El amor después del amor"],["Andrés Calamaro","Alta suciedad"],["Miguel Mateos / ZAS","Rockas vivas"],["Soda Stereo","Canción animal"]],
  popint:[["Luis Miguel","Romance"],["Luis Miguel","Aries"],["Michael Jackson","Thriller"]],
  latam:[["Julio Iglesias","De niña a mujer"]],
  folk:[["Soledad Pastorutti","Poncho al viento"]],
  popnac:[["Chiquititas","Chiquititas vol. 2 y 3"]],
  popint_a:[["Taylor Swift","The Tortured Poets Department: The Anthology"],["Twenty One Pilots","Clancy"],["Twenty One Pilots","Blurryface"],["Olivia Rodrigo","Sour (deluxe)"],["Ariana Grande","Eternal Sunshine"]],
  rock_a:[["Pescado Rabioso","Artaud"],["Soda Stereo","Canción animal"],["Gustavo Cerati","Bocanada"],["Gustavo Cerati","Amor amarillo"]],
  popnac_a:[["Emilia",".mp3"]]
};
(function(){
  function im(src,x,y,cls,dir){ var i=document.createElement("img"); i.src=(dir||C9)+src+".png"; i.alt=""; i.className="i8"+(cls?" "+cls:""); i.style.left=x+"px"; i.style.top=y+"px"; return i; }
  var P=document.createElement("div"); P.id="p9";
  var st=document.createElement("div"); st.className="stg"; st.id="st9"; P.appendChild(st);
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var f=(i||j)?im("fondo",i*1728,j*1117,"fondo8","img/cambio/"):im("fondo9",0,0,"fondo8");
    if (i||j) f.style.transform="scale("+(i?-1:1)+","+(j?-1:1)+")"; st.appendChild(f);
  }
  st.insertAdjacentHTML("beforeend",'<h2 class="sr">¿Qué cambió? Géneros más escuchados</h2>');
  var lab={rock:"l_rock",popint:"l_popint",latam:"l_latam",folk:"l_folk",popnac:"l_popnac",popint_a:"l_popint_a",rock_a:"l_rock_a",popnac_a:"l_popnac_a"};
  P9.barras.forEach(function(b){
    var n=b[0], w=document.createElement("div"); w.className="bar8 bar9"; w.id="b9_"+n;
    w.style.left=b[1]+"px"; w.style.top=b[2]+"px"; w.style.width=b[3]+"px"; w.style.height=b[4]+"px";
    var inn=document.createElement("div"); inn.className="in8";
    inn.appendChild(im("b_"+n,0,0)); inn.appendChild(im("b_"+n+"_borde",0,0,"borde"));
    w.appendChild(inn);
    var l=P9[lab[n]]; w.appendChild(im(lab[n],l[0]-b[1],l[1]-b[2],"lab8 lab9"));
    var nk="n_"+n, nb=P9[nk]; w.appendChild(im(nk,nb[0]-b[1],nb[1]-b[2],"num8"));
    st.appendChild(w);
  });
  var c1=im("con23",P9.con23[0],P9.con23[1],"con8"); c1.id="con9a"; st.appendChild(c1);
  var c2=im("con24",P9.con24[0],P9.con24[1],"con8"); c2.id="con9b"; st.appendChild(c2);
  tipsBarras(st,ALB9);
  var t=im("total",P9.total[0],P9.total[1],"eje8"); t.id="tot9"; st.appendChild(t);
  var a=im("actual",P9.actual[0],P9.actual[1],"eje8"); a.id="act9"; st.appendChild(a);
  $("visor").appendChild(P);
})();
function dibujar9(s,ph){
  var p=$("p9"), o=suave(ph(34.4,35.0));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0){ $("p8").style.pointerEvents=""; return; }
  P9.barras.forEach(function(b,i){
    var t=ph(35.0+.15*i,35.7+.15*i), e=1-Math.pow(1-t,3), w=$("b9_"+b[0]);
    w.firstChild.style.clipPath="inset("+((1-e)*100).toFixed(2)+"% 0 0 0)";
    w.querySelector(".lab8").style.opacity=clamp((t-.6)/.4);
  });
  var te=suave(ph(35.6,36.1));
  ["tot9","act9"].forEach(function(id){ var e=$(id); e.style.opacity=te; e.style.transform="translateY("+((1-te)*16)+"px)"; });
  var ca=ph(36.4,37.0), cb=ph(36.7,37.3);
  $("con9a").style.clipPath="inset(0 "+((1-ca)*100).toFixed(2)+"% 0 0)";
  $("con9b").style.clipPath="inset(0 "+((1-cb)*100).toFixed(2)+"% 0 0)";
  p.classList.toggle("listo",s>=36.6);
}

/* ===== Transición al CAP 4: el mp3 se convierte en celular, caen los auriculares, el celular se achica, pierde el color y aparece el título ===== */
var C4={mp3:[421,133,832,878],phone:[556,237,556,741],logo:[722,470,248,247],hp1:[988,180,325,272],hp2:[329,642,242,375],cap3:[813,135,102,33],cap4:[813,135,102,33],title:[369,481,911,201],ghost:[672,286,387,559]};
(function(){
  var D="img/cap4/";
  var P=document.createElement("div"); P.id="pc4";
  var st=document.createElement("div"); st.className="stg"; P.appendChild(st);
  ["bgA","bgB"].forEach(function(b){
    var g=document.createElement("div"); g.id="c4"+b; g.className="c4bg";
    for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
      var f=document.createElement("img"); f.alt=""; f.src=D+b+".webp";
      f.style.cssText="position:absolute;left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
      g.appendChild(f);
    }
    st.appendChild(g);
  });
  ["ghost","mp3","hp1","hp2","phone","logo","cap3","cap4","title"].forEach(function(n){
    var q=C4[n], e=document.createElement("img"); e.src=D+n+".png"; e.id="c4"+n; e.className="c4i";
    e.alt=n==="title"?"Cap. 4 — El presente: el streaming":"";
    e.style.cssText="left:"+q[0]+"px;top:"+q[1]+"px;width:"+q[2]+"px;height:"+q[3]+"px";
    st.appendChild(e);
  });
  $("visor").appendChild(P);
})();
function dibujarCap4(s,ph){
  var p=$("pc4"), o=suave(ph(37.8,38.4));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0) return;
  var T=function(id,v){ $(id).style.transform=v; }, O=function(id,v){ $(id).style.opacity=v; };
  /* 1. el mp3 gira y se transforma en el celular */
  var m=suave(ph(38.6,39.5)), mp=lerp(lerp(1,1.08,ph(38.4,38.6)),.82,m);
  O("c4bgB",m);
  O("c4mp3",1-suave(ph(38.75,39.25)));
  T("c4mp3","translate("+(-3*m)+"px,"+(35*m)+"px) rotate("+(31*m)+"deg) scale("+mp+")");
  /* 3. después el celular se achica, pierde el color y queda como dibujo de fondo */
  var k=suave(ph(40.8,41.8)), gk=suave(ph(40.8,41.3));
  var ph1=lerp(-31,0,m), sc=lerp(.7,1,m), pv=salida(clamp((m-.35)/.65));
  var tf="translate("+lerp(0,31,k)+"px,"+lerp(0,-42,k)+"px) rotate("+(ph1-24*k)+"deg) scale("+(lerp(sc,.74,k)*lerp(.85,1,pv))+")";
  ["c4phone","c4logo"].forEach(function(id){ T(id,tf); O(id,m>0?clamp((m-.3)/.4)*(1-suave(ph(41.55,41.95))):0); $(id).style.filter="grayscale("+gk+")"; });
  $("c4logo").style.transformOrigin=(834-722)+"px "+(607-470)+"px";
  O("c4ghost",suave(ph(41.6,42.0)));
  /* 2. los auriculares caen desde arriba a los costados del celular */
  [["c4hp1",39.3,1,-650,40],["c4hp2",39.55,-1,-1150,-35]].forEach(function(h){
    var t=ph(h[1],h[1]+.9), e=rebote(t), sal=suave(ph(40.8,41.5));
    T(h[0],"translate("+(h[2]*60*sal)+"px,"+(lerp(h[3],0,e)+sal*260)+"px) rotate("+(lerp(h[4],0,e)+h[2]*40*sal)+"deg)");
    O(h[0],(t>0?1:0)*(1-sal));
  });
  O("c4cap3",clamp((m-.5)/.5)*(1-suave(ph(41.2,41.6))));
  O("c4cap4",suave(ph(41.6,42.0)));
  /* 4. aparece el título del capítulo */
  var a=suave(ph(41.7,42.4));
  O("c4title",a); T("c4title","scale("+lerp(1.25,1,a)+")");
}
function rebote(t){ t=clamp(t); var n=7.5625,d=2.75; if(t<1/d) return n*t*t; if(t<2/d) return n*(t-=1.5/d)*t+.75; if(t<2.5/d) return n*(t-=2.25/d)*t+.9375; return n*(t-=2.625/d)*t+.984375; }

/* ===== CAP 3: Top canciones argentinas en streaming (puntos con hover; tooltip sólo en Airbag) ===== */
var PS_NOMBRES=[["Pasos Al Costado", "Turf"], ["Flaca", "Andrés Calamaro"], ["Seguir Viviendo Sin Tu Amor", "Luis Alberto Spinetta"], ["Creo", "Callejeros"], ["Trátame Suavemente", "Soda Stereo"], ["Me Gusta", "Ciro y los Persas"], ["Nunca quise", "Intoxicados"], ["A las Nueve", "No Te Va Gustar"], ["Por mil noches", "Airbag"], ["Ese Maldito Momento", "No Te Va Gustar"], ["Me Rehúso", "Danny Ocean"], ["Miénteme", "TINI"], ["Como Si No Importara", "Emilia"], ["La_Original.mp3", "Emilia"], ["La Morocha", "Luck Ra"], ["Ya No Vuelvas (Versión Cuarteto)", "Luck Ra"], ["QUE ME FALTE TODO", "Luck Ra"], ["Amor de Vago", "La T y La M"], ["HOLA PERDIDA", "Luck Ra"], ["Perdonarte ¿Para Qué?", "Los Ángeles Azules"], ["Pobre Corazón (En Vivo)", "Ke Personajes"], ["Universo Paralelo", "La K'onga"], ["Quiero Creer", "Luck Ra"], ["Otra Noche", "Los Ángeles Azules"], ["El Mismo Aire", "La K'onga"], ["La Bachata", "Manuel Turizo"], ["Un Finde | CROSSOVER #2", "Big One"], ["Piel", "Tiago PZK"], ["Rara Vez", "Taiu"], ["Quevedo: Bzrp Music Sessions Vol. 52", "Bizarrap"], ["En la Intimidad", "Big One"], ["LUNA", "Feid"], ["CORAZÓN VACÍO", "Maria Becerra"], ["Tu Turrito", "Rei"], ["Los del Espacio", "LIT killah"], ["Si Antes Te Hubiera Conocido", "KAROL G"], ["ADIÓS", "Maria Becerra"], ["FLECHAZO EN EL CENTRO", "YSY A"], ["BAILE INoLVIDABLE", "Bad Bunny"], ["La Plena", "W Sound"], ["Ni Una Ni Dos", "BM"], ["Columbia", "Quevedo"], ["SINVERGÜENZA", "Emanero"], ["M.A (Mejores Amigos)", "BM"], ["Es un Secreto", "Plan B"], ["Amanece", "Anuel AA"], ["Tan Lejos", "No Te Va Gustar"], ["Como Eran Las Cosas", "Babasonicos"], ["Crimen", "Gustavo Cerati"]];
var PS=[[1225, 797, "ama"], [1266, 758, "ama"], [1284, 738, "ama"], [1361, 919, "ama"], [1484, 776, "ama"], [1437, 684, "ama"], [1473, 563, "ama"], [1491, 412, "ama"], [1066, 448, "ama"], [753, 822, "azu"], [735, 840, "ama"], [605, 563, "azu"], [547, 876, "azu"], [305, 901, "azu"], [482, 448, "ver"], [563, 277, "ver"], [428, 644, "ver"], [395, 726, "ver"], [413, 744, "ver"], [349, 883, "ver"], [477, 877, "ver"], [446, 909, "ver"], [413, 955, "ver"], [457, 963, "ver"], [547, 955, "ver"], [565, 295, "cel"], [446, 359, "cel"], [464, 588, "cel"], [583, 608, "cel"], [341, 590, "cel"], [377, 690, "cel"], [500, 702, "cel"], [377, 779, "cel"], [341, 815, "cel"], [323, 804, "cel"], [428, 840, "cel"], [392, 883, "cel"], [374, 912, "cel"], [349, 901, "cel"], [304, 927, "cel"], [312, 883, "cel"], [348, 955, "cel"], [392, 955, "cel"], [276, 963, "cel"], [641, 927, "cel"], [699, 948, "cel"], [717, 919, "ros"], [605, 858, "ros"], [1631, 774, "ama"]];
(function(){
  var D="img/streaming/";
  var P=document.createElement("div"); P.id="psc";
  var st=document.createElement("div"); st.className="stg"; st.id="stsc"; P.appendChild(st);
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var f=document.createElement("img"); f.alt=""; f.className="i8 fondo8"; f.src=(i||j)?"img/cambio/fondo.png":D+"fondo.png";
    f.style.left=(i*1728)+"px"; f.style.top=(j*1117)+"px"; if(i||j) f.style.transform="scale("+(i?-1:1)+","+(j?-1:1)+")"; st.appendChild(f);
  }
  st.insertAdjacentHTML("beforeend",'<h2 class="sr">Top canciones argentinas en streaming</h2>');
  PS.forEach(function(p,k){
    var d=document.createElement("div"); d.className="pt"; d.id="pt"+k;
    d.style.left=p[0]+"px"; d.style.top=p[1]+"px";
    d.innerHTML='<img alt="" src="'+D+'p_'+p[2]+'.png"><img class="borde" alt="" src="'+D+'p_'+p[2]+'_b.png">';
    st.appendChild(d); p.el=d;
  });
  /* tooltips de todos los puntos (mismo estilo que el de Airbag): artista arriba, canción abajo */
  var tip=document.createElement("div"); tip.className="tipsc"; tip.setAttribute("role","tooltip");
  tip.innerHTML='<i class="tl"></i><i class="tm"></i><i class="tr"></i><i class="tp"></i><b></b><span></span>';
  st.appendChild(tip);
  PS.forEach(function(q,k){
    var n=PS_NOMBRES[k]; q.el.setAttribute("aria-label",n[1]+" – "+n[0]); q.el.tabIndex=-1;
    function ver(){
      tip.querySelector("b").textContent=n[1]; tip.querySelector("span").textContent=n[0];
      tip.style.width="auto"; var w=Math.max(150,Math.ceil(tip.scrollWidth));
      var cx=q[0]+18, l=Math.min(Math.max(cx-w/2,40),1700-w);
      tip.style.width=w+"px"; tip.style.left=l+"px"; tip.style.top=(q[1]+8-135)+"px";
      tip.querySelector(".tp").style.left=(cx-l-23.5)+"px";
      tip.classList.add("on");
    }
    q.el.addEventListener("mouseenter",ver); q.el.addEventListener("focus",ver);
    q.el.addEventListener("mouseleave",function(){ tip.classList.remove("on"); });
    q.el.addEventListener("blur",function(){ tip.classList.remove("on"); });
  });
  /* conversación sobre el gráfico: Meli – Mari – Meli */
  [["chat1","calc(31px - var(--ex,0px))",153,789,253,"Meli: Ahí se ve cómo hay temas que llevan años sumando y no se bajan nunca.","0% 50%"],
   ["chat2","calc(897px + var(--ex,0px))",412,746,263,"Mari: Sí, pero ¿qué pasa cuando mirás el día a día? ¿Qué es lo que está pegando ahora?","100% 100%"],
   ["chat3","calc(31px - var(--ex,0px))",787,789,253,"Meli: Eso cambia semana a semana. Mirá lo que suena en el top actual.","0% 50%"]].forEach(function(m){
    var e=document.createElement("img"); e.id="sc"+m[0]; e.src=D+m[0]+".png"; e.alt=m[5]; e.className="chatsc";
    e.style.cssText="position:absolute;left:"+m[1]+";top:"+m[2]+"px;width:"+m[3]+"px;height:"+m[4]+"px;opacity:0;transform-origin:"+m[6];
    st.appendChild(e);
  });

  $("visor").appendChild(P);
})();
function dibujarSc(s,ph){
  var p=$("psc"), o=suave(ph(43.2,43.8));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0) return;
  PS.forEach(function(q,k){
    var t=ph(43.8+(q[0]-270)/1400*1.0+(k%5)*.04,44.15+(q[0]-270)/1400*1.0+(k%5)*.04), e=salida(clamp(t));
    q.el.style.opacity=clamp(t*4); q.el.style.transform="scale("+e+")";
  });
  p.classList.toggle("listo",s>=45.2);
  /* cuando el gráfico ya se puede recorrer, entra la charla */
  [[45.4,153],[46.2,412],[47.0,787]].forEach(function(q,i){
    var k=ph(q[0],q[0]+.8), e=1-Math.pow(1-k,2), m=$("scchat"+(i+1));
    m.style.opacity=k>0?1:0; m.style.transform="translateY("+((1-e)*(1157-q[1])).toFixed(1)+"px)";
  });
}

/* ===== CAP 3: Top 10 canciones de la semana en streaming (la cámara baja por el ranking de izquierda a derecha) ===== */
(function(){
  var P=document.createElement("div"); P.id="ptop";
  P.innerHTML='<div class="stg" id="sttop"><div id="camtop" style="position:absolute;left:0;top:0;width:4006px;height:1683px;will-change:transform">'+
    '<img alt="Top 10 canciones más escuchadas esta semana en streaming: 1 Karol G – BbY WOW, 2 Anuel AA – Las más bonitas son p#tas, 3 Jay Wheeler – De lejitos (Remix), 4 El Bogueto – Cuando no era cantante, 5 Ozuna – ZIZI, 6 Brytiago – Estoy Pa\' Ti, 7 Omar Courtz – Por si mañana no estoy, 8 Aitana – Superestrella, 9 Ya Ice Dilan – Dichavate, 10 Omar Courtz – KOKO" src="img/top10/top10.webp" style="position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated"></div></div>';
  $("visor").appendChild(P);
})();
function dibujarTop(s,ph){
  var p=$("ptop"), o=suave(ph(49.0,49.6));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0) return;
  var t=ph(49.8,53.8), e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  /* recorre en diagonal: de arriba a la izquierda (título y n.º 1) hasta abajo a la derecha (n.º 10) */
  $("camtop").style.transform="translate("+(-2278*e).toFixed(1)+"px,"+(-440*e).toFixed(1)+"px)";
}

/* ===== CAP 3: Top 10 álbumes de la semana (misma animación, al revés: de arriba a la derecha hacia abajo a la izquierda) ===== */
(function(){
  var P=document.createElement("div"); P.id="ptop2"; P.className="ptopx";
  P.innerHTML='<div class="stg"><div id="camtop2" style="position:absolute;left:0;top:0;width:4006px;height:1683px;will-change:transform">'+
    '<img alt="Top 10 álbumes más escuchados esta semana en streaming, del puesto 1 (Bad Bunny) al 10 (Luck Ra)" src="img/top10/top10alb.webp" style="position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated">'+
    '<img id="txtalb" alt="Una cosa es acumular reproducciones durante miles de días y sostenerse en el tiempo, y otra muy distinta es liderar el pulso inmediato. Al pasar del recorrido histórico al ranking semanal, aparece lo que está marcando el momento." src="img/top10/textoalb.png" style="position:absolute;left:1972px;top:560px;width:742px;height:312px;opacity:0;will-change:transform,opacity"></div></div>';
  $("visor").appendChild(P);
})();
function dibujarTop2(s,ph){
  var p=$("ptop2"), o=suave(ph(54.0,54.6));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0) return;
  var t=ph(54.8,58.8), e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  $("camtop2").style.transform="translate("+(-2278*(1-e)).toFixed(1)+"px,"+(-440*e).toFixed(1)+"px)";
  /* a mitad del recorrido sube el texto */
  /* el texto entra por abajo de la pantalla y sigue subiendo hasta salir por arriba de todo */
  var k=ph(55.3,57.7), tx=$("txtalb"), cy=440*e;
  tx.style.opacity=k>0&&k<1?1:0; tx.style.transform="translateY("+lerp(cy+1157-560,cy-560-352,k).toFixed(1)+"px)";
}

/* ===== CAP 4: 2001-2026 ¿cómo cambió? (título con zoom y el texto sube con el scroll) ===== */
(function(){
  var D="img/cap4b/";
  var P=document.createElement("div"); P.id="pc4b";
  var st=document.createElement("div"); st.className="stg"; P.appendChild(st);
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var f=document.createElement("img"); f.alt=""; f.src=D+"fondo.webp";
    f.style.cssText="position:absolute;left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
    st.appendChild(f);
  }
  st.insertAdjacentHTML("beforeend",'<h2 class="sr">Capítulo 4 — 2001-2026: ¿cómo cambió?</h2>'+
    '<img id="tit4b" alt="" src="'+D+'titulo.png" style="position:absolute;left:333px;top:392px;width:983px;height:343px;mix-blend-mode:multiply;transform-origin:531px 188px;opacity:0">'+
    '<img id="txt4b" alt="Qué género llevó la delantera en cada década entre las canciones más escuchadas hoy en Spotify, y cómo se va transformando el mapa musical con el tiempo." src="'+D+'texto.png" style="position:absolute;left:488px;top:715px;width:742px;height:312px;opacity:0;will-change:transform">');
  $("visor").appendChild(P);
})();
function dibujarCap4b(s,ph){
  var p=$("pc4b"), o=suave(ph(59.2,59.8));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0) return;
  var a=suave(ph(59.5,60.3)), t=$("tit4b");
  t.style.opacity=a; t.style.transform="scale("+lerp(1.25,1,a)+")";
  /* el texto entra por abajo y sigue subiendo hasta salir por arriba de todo */
  var k=ph(60.4,63.2), x=$("txt4b");
  x.style.opacity=k>0&&k<1?1:0; x.style.transform="translateY("+lerp(1157-715,-715-360,k).toFixed(1)+"px)";
}

/* ===== CAP 4: ¿Qué suena de cada década en Spotify? (dona: al tocar una porción aparece el tooltip y el play en el medio) ===== */
var DONA=[ /* década, ángulo final (grados, desde arriba en sentido horario), canción */
  ["80",47,"Soda Stereo – De música ligera"],["90",79,"Los Enanitos Verdes – Lamento boliviano"],["00",118,"Miranda! – Perfecta"],
  ["10",215,"Paulo Londra – Adán y Eva"],["20",360,"Bizarrap y Quevedo – BZRP Music Sessions #52"]];
var DONA_POS={sl80:[855,275,264,288],hi80:[855,275,263,287],sl90:[934,391,275,224],hi90:[933,391,275,225],sl00:[949,567,267,238],hi00:[949,567,267,239],sl10:[648,685,525,311],hi10:[648,685,525,311],sl20:[496,275,362,654],hi20:[496,275,362,647]};
var donaSel=null, donaFija=null;
(function(){
  var D="img/cap4c/";
  var P=document.createElement("div"); P.id="pdona";
  var st=document.createElement("div"); st.className="stg"; P.appendChild(st);
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var f=document.createElement("img"); f.alt=""; f.src=D+"fondo.webp";
    f.style.cssText="position:absolute;left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
    st.appendChild(f);
  }
  var h='<h2 class="sr">¿Qué suena de cada década en Spotify?</h2>';
  DONA.forEach(function(d){
    ["sl","hi"].forEach(function(p){ var q=DONA_POS[p+d[0]];
      h+='<img class="dz '+p+'" id="d'+p+d[0]+'" alt="" src="'+D+p+d[0]+'.png" style="left:'+q[0]+'px;top:'+q[1]+'px;width:'+q[2]+'px;height:'+q[3]+'px;transform-origin:'+(855.5-q[0])+'px '+(635-q[1])+'px">'; });
  });
  h+='<img id="detq" alt="" src="'+D+'etiquetas.png" style="left:580px;top:401px;width:574px;height:474px">';
  DONA.forEach(function(d){ h+='<img class="dtt" id="dtt'+d[0]+'" alt="'+d[2]+'" src="'+D+'tt'+d[0]+'.png" style="left:1115px;top:243px;width:481px;height:471px">'; });
  h+='<div id="dhit" role="group" aria-label="Gráfico de dona: canciones más escuchadas por década"></div>';
  h+='<button type="button" class="play" id="dplay" data-id="d80" aria-pressed="false" aria-label="Escuchar" style="left:826px;top:589px;width:75px;height:75px;background-image:url('+D+'play.png)"></button>';
  st.insertAdjacentHTML("beforeend",h);
  $("visor").appendChild(P);
  var hit=$("dhit");
  function cual(ev){
    var r=hit.getBoundingClientRect(), k=r.width/720, x=(ev.clientX-r.left)/k-359.5, y=(ev.clientY-r.top)/k-360, rr=Math.hypot(x,y);
    if (rr<106) return "hueco";
    if (rr>360) return null;
    var a=(Math.atan2(x,-y)*180/Math.PI+360)%360;
    for (var i=0;i<DONA.length;i++) if (a<DONA[i][1]) return DONA[i][0];
    return null;
  }
  hit.addEventListener("mousemove",function(ev){ var c=cual(ev); if(c==="hueco") return; if(!donaFija) donaMarcar(c); hit.style.cursor=c?"pointer":"default"; });
  hit.addEventListener("mouseleave",function(ev){ if(!donaFija&&ev.relatedTarget!==$("dplay")) donaMarcar(null); });
  $("dplay").addEventListener("mouseleave",function(ev){ if(!donaFija&&ev.relatedTarget!==hit) donaMarcar(null); });
  hit.addEventListener("click",function(ev){ var c=cual(ev); if(c==="hueco") return; donaFija=c&&c!==donaFija?c:null; donaMarcar(c); });
  $("dplay").addEventListener("click",function(){ donaFija=donaSel; podioToggle(this); });
})();
function donaMarcar(d){
  if (d===donaSel) return;
  if (donaSel&&podioActual&&podioActual.btn===$("dplay")) podioParar();
  donaSel=d; $("pdona").classList.toggle("sel",!!d);
  DONA.forEach(function(q){ var on=q[0]===d;
    $("dsl"+q[0]).style.opacity=on?0:1; $("dhi"+q[0]).style.opacity=on?.9:0; $("dtt"+q[0]).classList.toggle("on",on); });
  if (d){ var b=$("dplay"); b.setAttribute("data-id","d"+d); b.setAttribute("aria-label","Escuchar "+DONA.filter(function(q){return q[0]===d;})[0][2]); }
}
function dibujarDona(s,ph){
  var p=$("pdona"), o=suave(ph(63.4,64.0));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0){ if(podioActual&&podioActual.btn===$("dplay")) podioParar(); return; }
  /* las porciones aparecen de a una, girando desde el centro */
  if (!donaSel) DONA.forEach(function(q,i){
    var t=ph(64.0+i*.18,64.5+i*.18), e=salida(t), el=$("dsl"+q[0]);
    el.style.opacity=t>0?1:0; el.style.transform="scale("+lerp(.6,1,e).toFixed(3)+") rotate("+((1-e)*-25).toFixed(1)+"deg)";
  });
  $("detq").style.opacity=suave(ph(64.9,65.3));
  var listo=s>=65.2; p.classList.toggle("listo",listo);
  if (!listo&&donaSel){ donaFija=null; donaMarcar(null); }
}

/* ===== Cierre: "El sonido no se borra, cambia de formato" — vuelve el sol del inicio y aparecen las ventanitas (momento circular) ===== */
var FIN_CARDS=[[0,0,333],[241,253,486],[326,0,379],[1349,8,379],[815,669,379],[1140,500,241],[824,275,241],[15,805,241],[1033,-39,241]];
var FIN_T=[72.0,72.7,73.4,73.65,73.9,74.15,74.4,74.65,74.9];
(function(){
  var D="img/fin/";
  var P=document.createElement("div"); P.id="pfin";
  var st=document.createElement("div"); st.className="stg"; P.appendChild(st);
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var f=document.createElement("img"); f.alt=""; f.src=D+"fondo.webp";
    f.style.cssText="left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
    st.appendChild(f);
  }
  var h='<h2 class="sr">El sonido no se borra, cambia de formato</h2>'+
    '<img id="fsol" alt="" src="'+D+'sol.png" style="left:426px;top:135px;width:876px;height:870px;transform-origin:438px 435px">'+
    '<img id="frosa" class="mult" alt="" src="'+D+'rosa.png" style="left:200px;top:589px;width:1311px;height:118px">'+
    '<img id="ftit" class="mult" alt="El sonido no se borra, cambia de formato" src="'+D+'titulo.png" style="left:214px;top:495px;width:1317px;height:185px;transform-origin:650px 90px">'+
    '<img id="fmari" alt="Mari: ¡Si un disco te gustaba, te sabías hasta el orden de las canciones!" src="'+D+'mari.png" style="left:calc(889px + var(--ex,0px));top:117px;width:746px;height:263px">'+
    '<img id="fmari2" alt="Mari: Al final, lo que me gustaba antes sigue ahí, aunque hoy se escuche distinto." src="'+D+'mari2.png" style="left:calc(889px + var(--ex,0px));top:117px;width:746px;height:263px">'+
    '<img id="fmeli" alt="Meli: Sí, es que las voces y los temas quedan. Mirá quiénes siguen apareciendo..." src="'+D+'meli.png" style="left:calc(100px - var(--ex,0px));top:807px;width:789px;height:253px">';
  FIN_CARDS.forEach(function(c,i){ var k=c[2]/486;
    h+='<img class="fcard" id="fc'+i+'" alt="'+(i?'':'Emilia – en el top desde 2018')+'" src="'+D+'card.png" style="left:'+(c[0]-17*k).toFixed(1)+'px;top:'+(c[1]-9*k).toFixed(1)+'px;width:'+(521*k).toFixed(1)+'px;height:'+(623*k).toFixed(1)+'px">'; });
  st.insertAdjacentHTML("beforeend",h);
  $("visor").appendChild(P);
})();
function dibujarFin(s,ph){
  var p=$("pfin"), o=suave(ph(66.6,67.2));
  p.style.opacity=o; p.style.visibility=o>0?"visible":"hidden";
  if (o<=0) return;
  /* 1. como en la portada: el sol entra grande y el título aparece encima */
  var a=suave(ph(66.8,67.8)), t=suave(ph(67.4,68.2));
  /* 2. el sol se achica detrás del título (como el zoom del inicio) */
  var m=suave(ph(68.6,69.6));
  var sc=lerp(lerp(1.35,1,a),.492,m), dy=lerp(0,-28,m);
  $("fsol").style.opacity=a; $("fsol").style.transform="translateY("+dy.toFixed(1)+"px) scale("+sc.toFixed(4)+") rotate("+((1-a)*-20+m*15).toFixed(1)+"deg)";
  $("ftit").style.opacity=t; $("ftit").style.transform="scale("+lerp(1.25,1,t).toFixed(4)+")";
  var r=ph(69.2,69.8); $("frosa").style.opacity=r>0?1:0; $("frosa").style.clipPath="inset(0 "+((1-salida(r))*100).toFixed(2)+"% 0 0)";
  /* 3. la charla sube con el scroll */
  [["fmari",69.8,117],["fmeli",70.4,807],["fmari2",71.1,117]].forEach(function(q){
    var k=ph(q[1],q[1]+.8), e=1-Math.pow(1-k,2), el=$(q[0]);
    el.style.opacity=k>0?1:0; el.style.transform="translateY("+((1-e)*(1157-q[2])).toFixed(1)+"px)";
  });
  /* el primer mensaje de Mari sube y se va cuando llega su respuesta */
  var sa=ph(71.1,71.9), m1=$("fmari");
  if (sa>0){ m1.style.transform="translateY("+(-500*sa*sa).toFixed(1)+"px)"; m1.style.opacity=1-sa; }
  /* 4. las ventanitas de Emilia aparecen como las del inicio */
  FIN_T.forEach(function(t0,i){
    var k=ph(t0,t0+.45), el=$("fc"+i);
    el.style.opacity=clamp(k*2.5); el.style.transform="scale("+lerp(.75,1,salida(k)).toFixed(4)+")";
  });
}

/* ===== transición a la pantalla 8: glitch bitmap + la página se va hacia atrás y aparece la computadora ===== */
var PCX=614, PCY=205.9, PCB=449/1728; /* dónde queda la página dentro del monitor (Figma, pantalla 8) */
(function(){
  /* escena de la computadora detrás de la página; el fondo se repite en espejo hacia los costados */
  var P=document.createElement("div"); P.id="pc"; P.className="stg";
  var cam=document.createElement("div"); cam.id="pccam";
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var im=document.createElement("img"); im.alt=""; im.src=(i||j)?"img/compu/fondo.png":"img/compu/escena.png";
    im.style.cssText="position:absolute;left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
    cam.appendChild(im);
  }
  var mon=document.createElement("img"); mon.alt=""; mon.src="img/compu/monitor.webp"; mon.id="pcmon";
  mon.style.cssText="position:absolute;left:"+PCX+"px;top:"+PCY+"px;width:449px;height:290.2px";
  cam.appendChild(mon);
  /* pantalla 9: menú con los capítulos (botones todavía sin destino) */
  var men=document.createElement("div"); men.id="pcmenu";
  men.style.cssText="position:absolute;left:"+PCX+"px;top:"+PCY+"px;width:449px;height:290.2px;opacity:0";
  men.innerHTML='<img alt="" src="img/compu/menu.png" style="position:absolute;inset:0;width:100%;height:100%">'+
    [9.1,106.1,203.1].map(function(y,i){ return '<button type="button" class="capbtn" data-cap="'+(i+1)+'" aria-label="Capítulo '+(i+1)+'" style="top:'+y+'px"><img alt="" src="img/compu/cap'+(i+1)+'.png"></button>'; }).join("");
  cam.appendChild(men);
  /* pantalla 10: en el monitor se ve la pantalla 11 */
  /* toda la pantalla del monitor en azul, con la pantalla 11 encima */
  var m11=document.createElement("div"); m11.id="pc11";
  m11.style.cssText="position:absolute;left:613px;top:185px;width:451px;height:332px;opacity:0;background:url(img/compu/p11fondo.webp) center/cover #1B2BA9";
  m11.innerHTML='<img alt="" src="img/compu/p11.webp" style="position:absolute;left:'+(PCX-613)+'px;top:'+(PCY-185)+'px;width:449px;height:290.2px">';
  cam.appendChild(m11);
  P.appendChild(cam);
  /* pantalla 11 a pantalla completa (nítida), con el fondo extendido a los costados */
  var Q=document.createElement("div"); Q.id="p11"; Q.className="stg";
  for (var i2=-1;i2<=1;i2++) for (var j2=-1;j2<=1;j2++){
    var q=document.createElement("img"); q.alt=""; q.src=(i2||j2)?"img/compu/p11fondo.webp":"img/compu/p11.webp";
    q.style.cssText="position:absolute;left:"+(i2*1728)+"px;top:"+(j2*1117)+"px;width:1728px;height:1117px;transform:scale("+(i2?-1:1)+","+(j2?-1:1)+")";
    Q.appendChild(q);
  }

  $("visor").insertBefore(P,$("p2"));
  /* pantallas 12 y 13: cuadros de texto que suben */
  Q.insertAdjacentHTML("beforeend",'<img class="caja" id="caja1" alt="Dos chicas que nunca se cruzaron en persona, pero comparten la misma necesidad de tener una canción sonando para entender su propio tiempo." src="img/compu/caja1.png" style="left:493px;width:742px;height:287px">'+
    '<img class="caja" id="caja2" alt="Entre un MP3 en 2001 y un celular en 2026, sus voces se encuentran en esta charla para recorrer cómo cambió lo que escuchamos en Argentina." src="img/compu/caja2.png" style="left:488px;width:742px;height:267px">');
  $("visor").insertBefore(Q,$("p2"));
  /* filtro SVG del glitch: pixelado + franjas desplazadas + separación RGB */
  var s='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="glitch" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">'+
   '<feFlood id="gfl" x="0" y="0" width="1" height="1" flood-color="#000"/><feComposite id="gcp" width="2" height="2"/><feTile result="gt"/>'+
   '<feComposite in="SourceGraphic" in2="gt" operator="in"/><feMorphology id="gmo" operator="dilate" radius="0" result="px"/>'+
   '<feTurbulence id="gtu" type="fractalNoise" baseFrequency="0 0.03" numOctaves="1" seed="1" result="ns"/>'+
   '<feComponentTransfer in="ns" result="nb"><feFuncR type="discrete" tableValues="0.5 0.5 0.1 0.5 0.9 0.5 0.5 0.2 0.5"/><feFuncG type="discrete" tableValues="0.5"/></feComponentTransfer>'+
   '<feDisplacementMap id="gdm" in="px" in2="nb" scale="0" xChannelSelector="R" yChannelSelector="G" result="d"/>'+
   '<feColorMatrix in="d" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/><feOffset id="gor" in="r" dx="0" result="r2"/>'+
   '<feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>'+
   '<feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/><feOffset id="gob" in="b" dx="0" result="b2"/>'+
   '<feBlend in="r2" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b2" mode="screen"/></filter></svg>';
  document.body.insertAdjacentHTML("beforeend",s);
})();
var GL={};
function glitch(g,seed){
  if(!GL.fl){ ["fl","cp","mo","tu","dm","or","ob"].forEach(function(k){ GL[k]=document.getElementById("g"+k); }); }
  var pa=$("pantalla");
  if (g<=.01){ if(pa.style.filter) pa.style.filter=""; return; }
  var px=Math.max(2,Math.round(2+g*16));                 /* tamaño del "píxel" */
  GL.fl.setAttribute("x",Math.floor(px/2)); GL.fl.setAttribute("y",Math.floor(px/2));
  GL.cp.setAttribute("width",px); GL.cp.setAttribute("height",px); GL.mo.setAttribute("radius",Math.floor(px/2));
  GL.tu.setAttribute("seed",seed); GL.tu.setAttribute("baseFrequency","0 "+(.004+(seed%5)*.006));
  GL.dm.setAttribute("scale",Math.round(g*140*((seed%3)?1:-1)));
  GL.or.setAttribute("dx",Math.round(g*22)); GL.ob.setAttribute("dx",-Math.round(g*22));
  pa.style.filter="url(#glitch)";
}
function dibujarPC(r){
  /* r: 0 -> la cámara está pegada al escritorio amarillo; 1 -> se ve la computadora entera (pantalla 8) */
  var pc=$("pc");
  pc.style.visibility=r>0?"visible":"hidden";
  if (r<=0) return;
  pc.style.opacity=clamp(r/.12);
  var z=suave(clamp(r/.85)), s0=5, s=Math.pow(s0,1-z), Fx=864, Fy=1030;
  $("pccam").style.transform="translate("+(Fx*(1-s))+"px,"+(Fy*(1-s))+"px) scale("+s+")";
}

var INS=8; /* pantallas de scroll para 9 -> 10 -> zoom -> 11 */
var INS2=5; /* pantallas de scroll para los cuadros de texto (12 y 13) */
function dibujarCajas(b){
  var sube=function(t){ return 1-Math.pow(1-clamp(t),3); };
  var juntas=suave(clamp((b-.78)/.22))*-1400;
  /* 12: el primer cuadro entra desde abajo */
  var y1=lerp(1180,764,sube(b/.28));
  /* 13: el primero sigue subiendo y entra el segundo */
  y1=lerp(y1,253,suave(clamp((b-.38)/.3)));
  var y2=lerp(1180,647,sube((b-.42)/.3));
  $("caja1").style.transform="translateY("+(y1+juntas)+"px)";
  $("caja2").style.transform="translateY("+(y2+juntas)+"px)";
}
function dibujarM(u){
  var men=$("pcmenu"), m11=$("pc11"), q=$("p11");
  /* 9: el menú aparece en el monitor */
  var a=suave(clamp(u/.08));
  men.style.opacity=u<.38?a:0; men.style.pointerEvents=(u>.08&&u<.38)?"auto":"none";
  /* 10: corte (aparece de golpe la pantalla 11 dentro del monitor) */
  m11.style.opacity=u>=.38?1:0;
  /* zoom hacia la pantalla del monitor hasta que la 11 ocupa todo */
  var z=suave(clamp((u-.5)/.4)), s0=1728/449, s=Math.pow(s0,z), Fx=PCX*s0/(s0-1), Fy=PCY*s0/(s0-1);
  if (u>0) $("pccam").style.transform="translate("+(Fx*(1-s))+"px,"+(Fy*(1-s))+"px) scale("+s+")";
  var e=clamp((u-.88)/.04); q.style.visibility=e>0?"visible":"hidden"; q.style.opacity=e;
}
/* ===== CAP 1: pantallas 14 a 18 (la compu de Mari, 2001) ===== */
var HP14=[[1570, 57, 92.1, 119.7, -10.99, 73, 108], [89, 0, 201.7, 228.4, 14.31, 151, 224], [368.7, 196.4, 212.4, 259.5, -17.84, 151, 224], [1139.7, 95.4, 161, 230.6, -2.61, 151, 224], [1423, 482, 243, 269.5, 30.11, 151, 224], [1319.2, 824.8, 182.5, 243.9, -8.53, 151, 224], [23, 847, 182.5, 243.9, -8.53, 151, 224], [206.3, 695, 92.1, 119.7, -10.99, 73, 108], [27.1, 433.8, 121.9, 130.1, 35.5, 73, 108]];
var C14={};
(function(){
  var cam=$("pccam"), S=function(html){ cam.insertAdjacentHTML("beforeend",html); };
  S('<img id="s14" alt="" src="img/cap1/s14.png" style="position:absolute;left:613px;top:185px;width:451px;height:332px;opacity:0">');
  S('<img id="card15" alt="2001" src="img/cap1/s15card.png" style="position:absolute;left:652px;top:274px;width:391px;height:154px;opacity:0;transform-origin:center">');
  S('<div id="chicaw" style="position:absolute;left:602px;top:186px;width:492px;height:341px;opacity:0"><img id="chica" alt="Ilustración de Mari escuchando música" src="img/cap1/chica.png" style="position:absolute;inset:0;width:100%;height:100%"></div>');
  /* auriculares: [x,y,w,h de Figma (con rotación), rotación, tamaño] */
  C14.hp=HP14.map(function(h,i){
    var d=document.createElement("img"); d.alt=""; d.src="img/cap1/auri.png"; d.className="auri";
    d.style.cssText="position:absolute;left:0;top:0;width:"+h[5]+"px;height:"+h[6]+"px;opacity:0";
    cam.appendChild(d);
    return {el:d, cx:h[0]+h[2]/2, cy:h[1]+h[3]/2, w:h[5], h:h[6], r:-h[4], d0:((i*37)%9)/9*.06, sp:(i%2?1:-1)*(160+(i*53)%120)};
  });
  C14.msg=[1,2,3].map(function(i){
    var m=document.createElement("img"); m.alt=["Hola! Soy Mari","Me encanta escuchar música desde que soy chica!!! Mi artista favorita es Shakira.","Desde que mis papás me regalaron el MP3 escucho música en todos lados"][i-1];
    m.src="img/cap1/msg"+i+".png"; m.className="msg14"; m.style.cssText="position:absolute;left:calc(924px + var(--ex,0px));top:0;width:745px;height:262px;opacity:0";
    cam.appendChild(m); return m;
  });
})();
function dibujarN(n){
  var on=n>0, cam=$("pccam");
  ["s14","card15","chicaw"].forEach(function(id){ if(!on) $(id).style.opacity=0; });
  C14.hp.forEach(function(h){ if(!on) h.el.style.opacity=0; });
  C14.msg.forEach(function(m){ if(!on) m.style.opacity=0; });
  if (!on) return;
  /* corte a la compu: se va la pantalla 13 y la cámara vuelve a ver todo */
  $("p11").style.visibility="hidden"; cam.style.transform="none";
  $("pc").style.visibility="visible"; $("pc").style.opacity=1;
  $("pcmenu").style.opacity=0; $("pcmenu").style.pointerEvents="none"; $("pc11").style.opacity=0; $("pcmon").style.opacity=0;
  var chica=n>=.40;
  $("s14").style.opacity=chica?0:1;
  /* 14: lluvia de auriculares que caen girando hasta su lugar y después siguen cayendo */
  C14.hp.forEach(function(h){
    var t=clamp((n-.01-h.d0)/.14), e=1-Math.pow(1-t,3), o=clamp((n-.24-h.d0)/.14), oo=o*o;
    var y=lerp(-260,h.cy,e)+oo*1500, r=h.r+(1-e)*h.sp+oo*h.sp*1.5;
    h.el.style.opacity=t>0&&o<1?1:0;
    h.el.style.transform="translate("+(h.cx-h.w/2)+"px,"+(y-h.h/2)+"px) rotate("+r.toFixed(1)+"deg)";
  });
  /* 15: aparece el cartel 2001 en la pantalla */
  var c=clamp((n-.26)/.05), cs=salida(c);
  $("card15").style.opacity=chica?0:clamp(c*3); $("card15").style.transform="scale("+lerp(.4,1,cs)+")";
  /* 16: aparece Mari en la pantalla (bailando) */
  $("chicaw").style.opacity=chica?1:0;
  /* mensajes que suben como en una charla: 16 (1), 17 (2), 18 (3) */
  var sube=function(t){ return 1-Math.pow(1-clamp(t),3); };
  var a1=sube((n-.43)/.08), a2=suave(clamp((n-.58)/.08)), a3=suave(clamp((n-.72)/.08));
  var y1=lerp(lerp(lerp(1180,791,a1),414,a2),103,a3);
  var y2=lerp(lerp(1180,738,sube((n-.58)/.08)),427,a3);
  var y3=lerp(1180,766,sube((n-.72)/.08));
  [[y1,n>.43],[y2,n>.58],[y3,n>.72]].forEach(function(v,i){ var m=C14.msg[i]; m.style.opacity=v[1]?1:0; m.style.transform="translateY("+v[0]+"px)"; });
}

/* ===== pantallas 19 a 24 (Meli, 2026): se llega con el mosaico ===== */
var INS3=12;
/* mensajes: [img, x, ancho, alto, [[momento, y], ...]] (y en coordenadas de Figma, con sombra) */
var M19=[
  ["msg1",72,823,282,[[.24,830.7],[.38,613.7],[.52,388.7],[.66,-330]]],
  ["msg2",72,823,282,[[.38,830.7],[.52,605.7],[.66,400.7],[.80,-330]]],
  ["msg3",72,814,278,[[.52,828.9],[.66,604.9],[.80,-330]]],
  ["msg4",77,800,274,[[.66,832],[.80,-330]]],
  ["msg5",77,800,274,[[.80,832]]]
];
(function(){
  var P=document.createElement("div"); P.id="p19"; P.className="stg";
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var q=document.createElement("img"); q.alt=""; q.src="img/meli/fondo.webp";
    q.style.cssText="position:absolute;left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
    P.appendChild(q);
  }
  P.insertAdjacentHTML("beforeend",'<img id="card19" alt="2001" src="img/meli/card.png" style="position:absolute;left:609px;top:482.5px;width:510px;height:108px;opacity:0">'+
    '<div id="chica19w" style="position:absolute;left:540px;top:288px;width:600px;height:443px;opacity:0"><img id="chica19" class="baila" alt="Ilustración de Meli bailando" src="img/meli/chica.png" style="position:absolute;inset:0;width:100%;height:100%"></div>');
  M19.forEach(function(m){
    var e=document.createElement("img"); e.src="img/meli/"+m[0]+".png"; e.alt=""; e.className="msg19";
    e.style.cssText="position:absolute;left:calc("+m[1]+"px - var(--ex,0px));top:0;width:"+m[2]+"px;height:"+m[3]+"px;opacity:0";
    P.appendChild(e); m.el=e;
  });
  $("visor").insertBefore(P,$("p3"));
})();
function dibujar19(w){
  var P=$("p19");
  dibujarT(clamp(w/.12));                        /* el mismo mosaico de antes, ahora lleva a la pantalla 19 */
  var on=w>=.06; P.style.visibility=on?"visible":"hidden";
  if (!on) return;
  /* 19: aparece 2001 en la pantalla de la notebook */
  var c=clamp((w-.08)/.05), chica=w>=.22;
  $("card19").style.opacity=chica?0:clamp(c*3); $("card19").style.transform="scale("+lerp(.5,1,salida(c))+")";
  /* 20 a 24: Meli bailando y los mensajes que suben */
  $("chica19w").style.opacity=chica?1:0;
  M19.forEach(function(m){
    var k=m[4], y=1180, vis=w>=k[0][0];
    for (var i=0;i<k.length;i++){
      var t=clamp((w-k[i][0])/.07);
      if (i===0) y=lerp(1180,k[0][1],1-Math.pow(1-t,3)); else y=lerp(y,k[i][1],suave(t));
    }
    m.el.style.opacity=vis?1:0; m.el.style.transform="translateY("+y.toFixed(1)+"px)";
  });
}

/* ===== pantallas 26 y 27 (CAP 2): portada del capítulo con el cuadro de texto que sube ===== */
(function(){
  var P=document.createElement("div"); P.id="p26"; P.className="stg";
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var q=document.createElement("img"); q.alt=""; q.src=(i||j)?"img/cap2/fondo26.webp":"img/cap2/p26.webp";
    q.style.cssText="position:absolute;left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
    P.appendChild(q);
  }
  P.insertAdjacentHTML("beforeend",'<h2 class="sr">¿Cambió la forma de escuchar música?</h2><img id="caja27" alt="Con el correr de los años, la costumbre de depender de un dispositivo propio para escuchar música empezó a cambiar y a perder terreno, como muestran los datos." src="img/cap2/caja27.png" style="position:absolute;left:479px;top:0;width:742px;height:311.3px">');
  $("p4").parentNode.insertBefore(P,$("p4").nextSibling);
})();
function dibujar26(s,t4,k5,ph){
  var P=$("p26"), on=t4>=.5&&k5<1;
  P.style.visibility=on?"visible":"hidden";
  if (!on) return;
  var sube=function(t){ return 1-Math.pow(1-clamp(t),3); };
  var y=lerp(1180,726,sube(ph(2.6,3.5)))-suave(ph(4.4,5.2))*1300;
  $("caja27").style.transform="translateY("+y.toFixed(1)+"px)";
}

/* ===== pantalla 15 (CAP 3: EL PASADO: LOS ÁLBUMS), entre el gráfico y la línea de álbumes ===== */
var P15A=13.1, P15D=5.5;
(function(){
  var P=document.createElement("div"); P.id="p15"; P.className="stg";
  for (var i=-1;i<=1;i++) for (var j=-1;j<=1;j++){
    var q=document.createElement("img"); q.alt=""; q.src="img/cap3/fondo15.webp";
    q.style.cssText="position:absolute;left:"+(i*1728)+"px;top:"+(j*1117)+"px;width:1728px;height:1117px;transform:scale("+(i?-1:1)+","+(j?-1:1)+")";
    P.appendChild(q);
  }
  P.insertAdjacentHTML("beforeend",'<h2 class="sr">El pasado: los álbumes</h2><div id="t15" style="position:absolute;left:0;top:0;width:1728px;height:1117px;transform-origin:864px 580px"><img alt="" src="img/cap3/p15.webp" style="position:absolute;inset:0;width:100%;height:100%"></div>');
  /* conversación: Mari (derecha) – Meli (izquierda) – Mari (derecha) */
  [["chat1","calc(921px + var(--ex,0px))",99,746,263,"Mari: ¡Si un disco te gustaba, te sabías hasta el orden de las canciones!","100% 100%"],
   ["chat2","calc(96px - var(--ex,0px))",547,789,252,"Meli: Yo a veces ni sé de qué álbum salió la canción que estoy escuchando.","0% 50%"],
   ["chat3","calc(921px + var(--ex,0px))",791,746,263,"Mari: ¡Un crimen! Mirá lo que eran los álbumes que dominaban antes.","100% 100%"]].forEach(function(m){
    var e=document.createElement("img"); e.id=m[0]; e.src="img/cap3/"+m[0]+".png"; e.alt=m[5]; e.className="chat15";
    e.style.cssText="position:absolute;left:"+m[1]+";top:"+m[2]+"px;width:"+m[3]+"px;height:"+m[4]+"px;opacity:0;transform-origin:"+m[6];
    P.appendChild(e);
  });
  $("p6").parentNode.insertBefore(P,$("p6").nextSibling);
})();
function dibujar15(u){
  var P=$("p15"), on=u>0&&u<1;
  P.style.visibility=on?"visible":"hidden"; if(!on) return;
  var a=suave(clamp(u/.1)), b=1-suave(clamp((u-.9)/.1));
  P.style.opacity=b;
  var t=$("t15"); t.style.opacity=a; t.style.transform="scale("+lerp(1.25,1,a)+")";
  /* los mensajes entran de a uno a medida que se scrollea */
  [[.14,99],[.34,547],[.54,791]].forEach(function(q,i){
    var k=clamp((u-q[0])/.16), e=1-Math.pow(1-k,2), m=$("chat"+(i+1));
    m.style.opacity=k>0?1:0; m.style.transform="translateY("+((1-e)*(1157-q[1])).toFixed(1)+"px)";
  });
}

var actual=0, actualE=0;
function progreso(){ var m=$("recorrido").offsetHeight-innerHeight-EXTRA4*innerHeight; return m>0?clamp(scrollY/m):0; }
function progresoE(){ var x=EXTRA4*innerHeight, m=$("recorrido").offsetHeight-innerHeight-x; return x>0?clamp((scrollY-m)/x):0; }
var LBASE=null;
function bucle(){
  var o=progreso(); actual+=(o-actual)*.1; if(Math.abs(o-actual)<.0002) actual=o;
  var oe=progresoE(); actualE+=(oe-actualE)*.1; if(Math.abs(oe-actualE)<.0002) actualE=oe;
  var L=$("recorrido").offsetHeight/innerHeight-1-EXTRA4, L0=L-INS-INS2-INS3, v=actual*L, corte=.42*L0, mu=0, bx=0, w=0, a;
  if (v<corte) a=v/L0;
  else if (v<corte+INS){ a=.42; mu=(v-corte)/INS; }
  else if (v<corte+INS+INS2){ a=.42; mu=1; bx=(v-corte-INS)/INS2; }
  else if (v<L0+INS+INS2){ a=(v-INS-INS2)/L0; mu=1; bx=1; }
  else { a=1; mu=1; bx=1; w=(v-L0-INS-INS2)/INS3; }
  var actual0=actual; actual=a;
  dibujar(clamp(actual/.3)); dibujarB(clamp((actual-.3)/.12));
  dibujarM(mu); dibujarCajas(bx); dibujarN(clamp((actual-.42)/.58)); dibujar19(clamp(w)); dibujarE(actualE); actual=actual0; requestAnimationFrame(bucle);
}
addEventListener("resize",function(){ ajustar(); });
ajustar();
Promise.all([document.fonts.load('600 136px "Bitcount Single"'),document.fonts.load('400 34px "Space Mono"'),document.fonts.load('700 34px "Space Mono"')])
  .catch(function(){}).then(function(){ return document.fonts.ready; }).then(function(){ medir(); bucle(); });
