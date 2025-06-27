/**
 * @Autor: 	David Quesada Heredia
 * @Definicion: Librería de utilidades 
 * @parametros:  
 * @example:		
	■■■■■■■■■■■■■■■■■■■■■■■■■■■
	var objU = new utilDvd();													► CREA EL OBJETO utilDvd();
	■■■■■■■■■■■■■■■■■■■■■■■■■■■
  
  	alert('navegador(IExplore): '+objU.navegador.isNS);							► VERIFICA SI ES NAVEGADOR IExplore.  	
	alert('xAbsoluto: '+objU.posicion.Xabs('b4'));								► VERIFICA LA POSICION X ABSOLUTA DEL DIV b4.
	alert('yAbsoluto: '+objU.posicion.Yabs('b4'));								► VERIFICA LA POSICION Y ABSOLUTA DEL DIV b4.
	alert('isDivOverDiv: '+objU.posicion.isDivOverDiv('b3', 'idPapelera'));		► VERIFICA SI EL DIV b3 ESTA SOBRE EL DIV idPapelera.
	alert('posicion_X_Raton: '+objU.posicion.getXraton());						► VERIFICA LA POSICION X DEL RATON.
	alert('posicion_Y_Raton: '+objU.posicion.getYraton());						► VERIFICA LA POSICION Y DEL RATON.	
	objU.posicion.divEnMitadDocumento('idInfo2'); 								► COLOCA EL DIV idInfo2 EN EL CENTRO DEL DOCUMENTO.	
	alert('isset: '+objU.validacion.isset(ua));									► VERIFICA SI LA VARIABLE ua ESTA DEFINIDA.	
	alert('getArray: '+objU.divs.getArray('idPapelera'));						► OBTIENE UN ARRAY CON LOS DIVS HIJOS DEL DIV idPapelera.
	objU.divs.crearDiv('b77', 'idInfo', 40, 70);			 					► CREA UN DIV b77 DENTRO DEL DIV idInfo EN LA POSICION X=40, Y=70.
	objU.miscelanea.transparencia('b3',6);	     								► PONE EL DIV b3 CON UNA TRANSPARENCIA DEL 60%.
	alert(objU.dvdCadena.eliminarPrefijo('onmouseover', 'on'));					► ELIMINA EL PREFIJO on DE LA CADENA onmouseover.
	alert(objU.dvdCadena.bIsStrOn('onmouseover', 'over'));						► VERIFICA SI LA CADENA onmouseover CONTIENE EL TEXTO over.
	alert('simularClick: '+objU.eventos.simularEvento(null, 'click'));			► SIMULA UN CLICK EN EL DOCUMENTO.
	objU.toolTip.setDelay(4);													► ESTABLECE UN RETARDO DE 4 SEGUNDOS EN DESAPARECER EL •TOOLTIP.	
	objU.toolTip.setColor('cyan');												► ESTABLECE EL COLOR DE FONDO DEL •TOOLTIP A cyan.
	objU.toolTip.mostrar('Mensaje'+'<br>Mostrado por Dvd');						► MUESTRA EL •TOOLTIP con un Mensaje.
	
 * .......................................................................*/

function utilDvd(){
	// * NAVEGADOR	 
	this.navegador=new navegador_dvd();
	// * VALIDACIONES	 
	this.validacion=new validacion_Dvd(this.navegador);
	// * EVENTOS	 
	this.eventos=new eventos_Dvd(this.navegador);
	// * MISCELANEA
	 this.miscelanea=new miscelanea_Dvd(this.navegador);
	//* DIVS	 
	this.divs=new divs_Dvd(this.navegador);
	// * POSICIONES	 
	this.posicion=new posiciones_Dvd();
	//Para trabajar con la posicion del raton.
	var objX=this.divs.crearDiv('xratonDVD',null, 0, 0);
	var objY=this.divs.crearDiv('yratonDVD',null, 50, 0);
		
	//this.posicion.getXraton();
	//this.posicion.getYraton();
	
	//objX.style.display='none';
	//objY.style.display='none';

	// * FADE
	this.fade=new fade_Dvd();
	// * TOOLTIP
	this.toolTip=new toolTip_DVD(' ');
	this.msgToDiv=new msgToWindow();
	// * IMAGENES	
	this.imagenes=new imagenes_Dvd();
	// * MENSAJES
	this.msg=new mensajes_Dvd();
//	* MATRICES
//	this.matrices=new matrices_Dvd();

// * EJE COORDENADAS CANVAS
	this.ejes=new ejeCoordenadas_Dvd();
// * TRANSICION-MOVIMIENTO DE DIVS
	this.transicion=new transiciones_Dvd();
// * CADENAS DE TEXTO
	this.cadena=new cadenas_Dvd();	
}
/**========================================================================================================
				  CLASE     E J E     DE   C O O R D E N A D A S  (QUE SIGUE AL RATON)
==========================================================================================================*/
/**
 * 
 */
function ejeCoordenadas_Dvd(){
var ejeX=null;
var ejeY=null;

var topMax=0;
var topMin=0;

var leftMax=0;
var leftMin=0;
//
var elNavegador=new navegador_dvd();
var elDiv=new divs_Dvd();

var canvas=null;
var ctx=null;
/**/
var constructor=function(){
	/*Crear el div contenedor de canvas.*/
	divCanvas = elDiv.crearDiv('idDivContenedorCanvas_Dvd', null, 0, 0);
	divCanvas.innerHTML='<canvas id="idCanvas_Dvd" width='+screen.availWidth+' height='+screen.availHeight+' ></canvas>';	
	
	canvas = document.getElementById('idCanvas_Dvd');
	if (canvas.getContext){
		ctx = canvas.getContext('2d');
	  // drawing code here
		iniX();
		mostrarEjeX();
		mostrarEjeY();
	} else {
	  // canvas-unsupported code here
	}
	document.onmousemove = getXYCursor;
};
/**
 * 
 */
var iniX=function(){
	ctx.strokeStyle = 'green';	//color de la linea.
	ctx.lineWidth   = 1;		//ancho de la linea.

	ctx.beginPath(); 			//inicia un camino, en este caso el ejeX
	
};
/**
 * 
 * @param {*} x 
 * @param {*} y 
 */
var mostrarEjeX=function(x, y){
	ctx.strokeStyle = 'green';	//color de la linea.
	ctx.lineWidth   = 1;		//ancho de la linea.

	ctx.beginPath(); 			//inicia un camino, en este caso el ejeX
		ctx.moveTo(100, 510);	//situa el punto de inicio.
		ctx.lineTo(400, 510);	//hace la linea desde el punto de inicio hasta este punto.
	ctx.stroke();				//hace la pintada del camino.
	//ctx.closePath();			//cierra el camino. no tiene porque ponerse. 

};
/**
 * 
 * @param {*} x 
 * @param {*} y 
 */
function mostrarEjeY(x, y) {
		ctx.strokeStyle = 'red'; //color de la linea.
		ctx.lineWidth = 1; //ancho de la linea.

		ctx.beginPath(); //inicia un camino. en este caso el ejeY
		ctx.moveTo(400, 310); //situa el punto de inicio.
		ctx.lineTo(400, 510); //hace la linea desde el punto de inicio hasta este punto.
		ctx.stroke(); //hace el dibujo de las coordenadas realizadas.
		ctx.closePath(); //

		ctx.lineTo(0, 0);


	}
/**
 * 
 * @param {*} event 
 */
var getXYCursor=function(event){
	if (elNavegador.isIE) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}else if (elNavegador.isNS){
		event.preventDefault();
	}
	if (elNavegador.isIE) {
		mouseX = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		mouseY = window.event.clientY + document.documentElement.scrollTop  + document.body.scrollTop;
	}else if (elNavegador.isNS) {
		mouseX = event.clientX + window.scrollX;
		mouseY = event.clientY + window.scrollY;
	}
	//ctx.clearRect(0,0,1000,1000);
	//micanvas.height= micanvas.height;	
	
	ctx.moveTo(0, mouseY);
	ctx.lineTo(mouseX, mouseY);
	ctx.stroke();
//	ctx.closePath();
//	ctx.restore();
	
//	objToolTip.style.left = parseInt(mouseX+15) + 'px';
//	objToolTip.style.top = parseInt(mouseY+10) + 'px';
};
}
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *							MENSAJES A UNA VENTANA(DIV) DE LA PAGINA
 *pejplo:
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function msgToWindow(){
	var idContenedorMsg=null;	//idDiv del contenedor de los mensajes.
	var objMsg=null;			//obj creado del div contenedor de los mensajes.
	//Cacha el contenedor de mensajes.
	this.setContenedorMsg=function(idContenedor){
		if(!document.getElementById(idContenedor)) return;
		idContenedorMsg=idContenedor;
		objMsg=document.getElementById(idContenedorMsg);
	};
	/*__________________________________________________________
	 * La funcion a instanciar para mostrar el mensaje deseado
	 * --------------------------------------------------------*/
	this.mostrar=function(idMsg, info, color, colorFondo){
		if(idMsg==null || idMsg=='undefined' || idMsg==''){
			if(!objMsg) return;
			idMsg=idContenedorMsg;	//si viene a null o indefinido saca el mensaje por el contenedor establecido.
		}else{	//si viene con datos.
			if(idContenedorMsg!=idMsg){				//si son distintos.
				if(!document.getElementById(idMsg))	//si no existe y no son iguales los igualo. 
					idMsg=idContenedorMsg;
			}//si son iguales, saca el mensaje.
		}
		if(!document.getElementById(idMsg)) return false;
		//document.getElementById(idMsg).innerHTML+=info;
		crearMsg_DDvD(idMsg, info, color, colorFondo);
		aux=document.getElementById(idMsg).scrollHeight+20;
		document.getElementById(idMsg).scrollTop = aux;
	};
	/**/
	numMsg=0;
	var crearMsg_DDvD=function(divContenedor, info, color, colorFondo) {
		numMsg++;  
		idDivMsg = document.createElement('div'); // crea un div.
		
		idDivMsg.id = 'divMsg'+numMsg; //Al div creado le asigno un id
		idDivMsg.innerHTML=info;  	 //le introduzco contenido.
		//idDivMsg.style.position='relative';    
		idDivMsg.style.top='10px'; idDivMsg.style.left='10px'; 	//se coloca.
		idDivMsg.style.color=color;  
		idDivMsg.style.backgroundColor=colorFondo;	//se colorea.
		document.getElementById(divContenedor).appendChild(idDivMsg); //   		
	};	
}
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *									T O O L T I P
 *pejplo:
 	objU.toolTip.setDelay(4);			//Tarda 4 segundos en desaparecer.
	objU.toolTip.setColor('cyan');		//Color de fondo cyan.
 	objU.toolTip.mostrar('Mensaje'+'<br>Mostrado');	//Muestra el mensaje Mensaje Mostrados
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function toolTip_DVD(){
try{
var elNavegador = new navegador_dvd();
var elEvento = new eventos_Dvd();
var elFade = new fade_Dvd();
var laMisc=new miscelanea_Dvd();
// - - - - - - - - - - - - - - - - - - - - - - - - - 
var idToolTip = '';
var objToolTip=null;
var mouseX=0;
var mouseY=0;
var temStatus;
var segundosDelay=3000;
var colorFondo='orange';	//color del fondo del div.
var colorFrente='black';	//color de la letra.
var colorBorde='black';
/*________________________________________
 * Constructor del tooltip:
 * ---------------------------------------
 * 1-cacha el id del tooltip:
 * 2-crea/cacha el objeto div del tooltip.
 * --------------------------------------*/
var constructor = function(){
	idToolTip = 'divToolTipDVD';
	if(!document.getElementById(idToolTip))
		objToolTip=crearToolTip();
	else
		objToolTip=document.getElementById(idToolTip);
	
	objToolTip.style.display='none';	//la primera vez lo esconde
	
	document.onmousemove = getXYCursor;
};
/*_____________________________________________________________
 * Establece el retardo que tarda el toolTip en desaparecer:
 * -----------------------------------------------------------*/
this.setDelay=function(segDelay){	
	if(isNaN(segDelay)==true) 
		segDelay=3;	
	segundosDelay=parseInt(segDelay*1000);
};
/*_______________________________________
 * Establece el color de fondo del div:
 * -------------------------------------*/
this.setColor=function(colorFondo, colorFrente, colorBorde){
	if(typeof(colorFondo)!='string' || colorFondo==null || colorFondo=='') colorFondo= 'orange';
	objToolTip.style.backgroundColor=colorFondo;
	if(typeof(colorFrente)!='string' || colorFrente==null || colorFrente=='') colorFrente='black';
	objToolTip.style.color=colorFrente;
	if(typeof(colorBorde)!='string' || colorBorde==null || colorBorde=='') colorBorde='black';
	objToolTip.style.borderColor=colorBorde;
	//colorFondo=color;
};
// - - - - - - - - - - - - - - - - - - - - - - - - - 
var crearToolTip = function(){
try{
	c = document.createElement('DIV');
	c.className = 'ToolTip';
	c.id = idToolTip;
	//c.style.display = 'none';
	c.style.textAlign='center';
	c.style.padding='5px';
	c.style.margin='2px';
	c.style.border='2px black solid';
	c.style.fontSize = '0.8em';
	c.style.fontFamily='Courier';
	c.style.color='white';
	c.style.backgroundColor=colorFondo;
	
	c.style.position = 'absolute';	
	//c.style.width='75px';
	//c.style.height='100%';
	//document.getElementById(this.idCtrlParent).appendChild( c );
	document.body.appendChild( c );
	return c;
}catch(e){
	alert('Mensaje:: crearToolTip: '+e.message);
}
};
//================================================================ 
this.mostrar = function(elTxt){
try{
	if(!objToolTip) return;
	var strMax = strPalabraMayor(elTxt);
	var elWidth = strWidth(strMax);
	//alert(elWidth+'-'+strMax+''+objToolTip.style.width);
	//
	objToolTip.innerHTML = elTxt;
	//objToolTip.style.width=elWidth+'px';	
	laMisc.redondearEsquina(objToolTip.id, '15', null);
	elFade.fadeIN(objToolTip.id);
	//objToolTip.style.display = '';
	setTimeout(NoMostrar, segundosDelay);
}catch(e){
	alert('Mensaje:: mostrar: '+e.message);
}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - 
this.ocultar = function(){	
	NoMostrar();	
};
var NoMostrar=function(){
	//objToolTip.style.display = 'none';
	elFade.fadeOUT(objToolTip.id);
};
/*_______________________________________________________________
 * Entra una cadena de texto y devuelve la palabra mayor:
 * (Para saber si la palabra mayor cabe dentro del div mensaje)
 * -------------------------------------------------------------*/
var strPalabraMayor=function(strCadena){
	if(typeof(strCadena)==undefined || strCadena == null || strCadena=='')
		return false;
	var arrPalabras = strCadena.split(' ');
	if(arrPalabras.length<=0) return '';
	var palabraMayor='';
	for(i=0;i<arrPalabras.length;i++){
		if(arrPalabras[i].length > palabraMayor.length)
			palabraMayor=arrPalabras[i];
	}
	return palabraMayor;
};
//================================================================
/*____________________________________________________________
 * Entra una cadena y devuelve el tamano del largo en pixeles
 * -Para ello crea un div, mete el texto en el div y mide el div*/
var strWidth=function(strAMedir){
	var elDiv = new divs_Dvd();
	var longitudCadena=strAMedir.length;
	var enPix = 0;
	crearDiv('iddivcreado', null, 0, 0);
	document.getElementById('iddivcreado').innerHTML=strAMedir;
	//document.getElementById('iddivcreado').style.fontFamily='Courier';
	enPix=document.getElementById('iddivcreado').offsetWidth;
	var objDiv = document.getElementById('iddivcreado');
	document.body.removeChild(objDiv);
	
	return parseInt(enPix);
	
};
/*::::::::::::::::::::::::::::::::::::::::::::::::::
 * CREAR  DIV
 * ______________
 * pejemplo: miObj.divs.crearDiv('miIdDiv', 'idContenedor1', 100, 50);
 * Crea un div en idContenedor1 en la posicion x,y (100, 50).
 *::::::::::::::::::::::::::::::::::::::::::::::::: */
var crearDiv=function(idDivACrear, idDivContenedor, x, y){
try{
	//Validacion:
	var objDivContenedor=null;		
	if(typeof(idDivACrear)!='string') return false;
	
	if(idDivContenedor==null||idDivContenedor=='')
		objDivContenedor=document.body;
	if(!document.getElementById(idDivContenedor)) 
		objDivContenedor=document.body;
	else
		objDivContenedor=document.getElementById(idDivContenedor);
	if(document.getElementById(idDivACrear)) return false;
	if(isNaN(x)==true) x=0;
	if(isNaN(y)==true) y=0;
	//Proceso:
	var objDiv= document.createElement('div'); // crea un div.			  
	objDiv.id = idDivACrear; //Al div creado le asigno un id
	//objDiv.innerHTML=idDiv.id;  	 //le introduzco contenido.
	//objDiv.style.display = 'none';
	//objDiv.className = 'ToolTip';
	objDiv.style.position='absolute';    
	objDiv.style.top=y+'px'; 
	objDiv.style.left=x+'px'; 	
	//objDiv.style.backgroundColor=color;
	objDivContenedor.appendChild(objDiv);
	return objDiv;
}catch(e){
	alert('Mensaje: crearDiv: '+e.message);
	return false;
}
};
/*____________________________________________________________________
 * La posicion del cursor para que el div creado siga al raton.*/
var getXYCursor=function(event){
	if (elNavegador.isIE) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}else if (elNavegador.isNS){
		event.preventDefault();
	}
	if (elNavegador.isIE) {
		mouseX = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		mouseY = window.event.clientY + document.documentElement.scrollTop  + document.body.scrollTop;
	}else if (elNavegador.isNS) {
		mouseX = event.clientX + window.scrollX;
		mouseY = event.clientY + window.scrollY;
	}
	
	objToolTip.style.left = parseInt(mouseX+15) + 'px';
	objToolTip.style.top = parseInt(mouseY+10) + 'px';
};

/*______________________
 *  * Llama al constructor
 * ---------------------*/
constructor();
}catch(e){
	alert('Mensaje: toolTip: '+e.message);
}
}
/**=======================================================================================
 * =======================================================================================
 * 								M E N S A J E S  
 * =======================================================================================
 * =======================================================================================*/
function mensajes_Dvd(){
try{
	var elNavegador = new navegador_dvd();
	var laPosicion=new posiciones_Dvd();
	var laMisc=new miscelanea_Dvd();	
	var elEvento=new eventos_Dvd();	
	var dvdCadena=new cadenas_Dvd();
	// - - - - - - - - - - - - - - - - - - - - - - - - - 	
	var idDivMsg = '';				//id del div del mensaje.
	var objMsg=null;				//el div del mensaje
	var objDivTransparente=null;	//el div transparente. 
	var arrMsg=null; 				//array de mensajes.
	
	var temStatus;					//para la funcion setTimeOut.
	var segundosDelay=3000;			//tiempo que tarda en eliminarse el mensaje.
	var colorFondo='orange';		//color de fondo del div del mensaje.
	var colorFrente='black';
	var colorTransparente='cyan';	//color de la capa transparente.
	
	var bEsquinasRedondeadas=true;	//si quiere esquinas redondas.
	var anguloRedondeo='14';		//el angulo de redondeo en caso de que bEsquinasRedondeadas==true
	
	var widthMIN=70;	//ancho minimo del div del mensaje.
	var heightMIN=50;	//alto minimo del div del mensaje.
	/*________________________________________
	 * Constructor del tooltip:
	 * ---------------------------------------
	 * 1-cacha el id del tooltip:
	 * 2-crea/cacha el objeto div del tooltip.
	 * --------------------------------------*/
	var constructor = function(){
		idDivMsg = 'divMensajesDVD';
		//Crea el objeto div de mensajes.
		if(!document.getElementById(idDivMsg)){
			objMsg=crearDivMensaje();
			objDivTransparente=crearDivTransparente();
		}else{
			objMsg=document.getElementById(idDivMsg);
			objDivTransparente=crearDivTransparente();
		}
		//Validacion:
		if(objMsg==null || objMsg==false) return false;
		//Posiciona el div:
		//laPosicion.divEnMitadDocumento(objMsg.id);
		arrMsg=new Array();
	};
	/*_____________________________________________________________
	 * Establece el retardo que tarda el toolTip en desaparecer:
	 * @param segDelay=segundos de retardo en desaparecer. pej 6
	 * -----------------------------------------------------------*/
	this.setDelay=function(segDelay){	
		if(isNaN(segDelay)==true) 
			segDelay=3;					//3 segundos por defecto.
		segundosDelay=parseInt(segDelay*1000);
	};
	/*_______________________________________
	 * Establece el color de fondo del div:
	 * -------------------------------------*/
	this.setColor=function(color){
		if(typeof(color)!='string') color = 'white';
		objMsg.style.backgroundColor=color;
		colorFondo=color;
	};
	this.setColorFrente=function(color){
		if(typeof(color)!='string') color = 'black';
		objMsg.style.fontColor=color;
		colorFrente=color;
	};
	this.setColorTransparente=function(color){
		if(typeof(color)!='string') color = 'cyan';
		objDivTransparente.style.backgroundColor=color;
		colorTransparente=color;
	};
	/*____________________________________________________________________
	 * Establece si quiero esquinas redondeadas y el angulo de redondeo.
	 * peje: obj.mensaje.setEsquinasRedondas(true, 16);
	 * -------------------------------------------------------------------*/
	this.setEsquinasRedondas=function(bRound, angulo){
		if(typeof(bRound)!='boolean') bRound=false;
		bEsquinasRedondeadas=bRound;
		//alert(bRound+'\n'+angulo);
		if(typeof(angulo)==undefined || angulo == null || angulo=='')			
			anguloRedondeo = '14px';
		if(isNaN(angulo)==false){
			anguloRedondeo=angulo+'px';
		}else if(typeof(angulo)=='string'){
			if(dvdCadena.bIsStrOn(angulo, 'px')==false)
				anguloRedondeo=angulo+'px';
		}else{
			anguloRedondeo = '14px';
		}
	};
	/*______________________________
	 * Creacion del div de mensaje
	 * -----------------------------*/
	var crearDivMensaje = function(){
	try{
		
		objDivCreado = document.createElement('DIV');
		objDivCreado.className = 'msg';
		objDivCreado.id = idDivMsg;						//id del div mensaje
		objDivCreado.style.display = 'none';
		objDivCreado.style.padding='5px';				//margen interior.
		objDivCreado.style.margin='12px';				//margenes respetados.
		objDivCreado.style.border='2px black solid';	//borde del mensaje.
		/*_____________
		 * Miscelanea*/
		objDivCreado.style.textAlign='center';			//centra horizontal
		objDivCreado.style.fontFamily='Courier';
		//objDivCreado.style.fontSize = '0.8em';			//Tama�o de la fuente.
		objDivCreado.style.fontSize = '12px';			//Tama�o de la fuente.
		objDivCreado.style.backgroundColor=colorFondo;	//color de fondo del mensaje.
		objDivCreado.style.fontColor=colorFrente; 	//Color de la fuente
		/*___________
		 * Medidas:*/
		objDivCreado.style.position = 'absolute';		//medidas.
		objDivCreado.style.width='250px';				//width minimo
		//objDivCreado.style.height='150px';
		objDivCreado.style.zIndex=1001;
		/*
		 * Se lo a�ade al body del documento.*/
		document.body.appendChild( objDivCreado );
		/*_____________________________________
		 * Retorna el objeto div del mensaje
		 * -----------------------------------*/
		return objDivCreado;
	}catch(e){
		alert('Mensaje:: crearMensaje: '+e.message);
	}
	};
	/*______________________________________________________________________
	 * Crea una    c a p a  t r a n s p a r e n t e   que tapa todo el body
	 * --------------------------------------------------------------------*/
	var crearDivTransparente=function(){
		try{
			var objDivCreado=null;
			objDivCreado = document.createElement('DIV');
			objDivCreado.className = 'msg';
			objDivCreado.id = idDivMsg+'_transparente';		//id del div transparente
			objDivCreado.style.display = 'none';
			objDivCreado.style.backgroundColor=colorTransparente;		//color de fondo del mensaje.
			/*___________
			 * Medidas:*/
			objDivCreado.style.position = 'absolute';		//medidas.
			switch(true){
			case elNavegador.isIE:
				objDivCreado.style.width = screen.availWidth +'px';		//ocupa toda la pantalla
				objDivCreado.style.height= screen.availHeight +'px';
				break;
			case elNavegador.isNS:			
				objDivCreado.style.width = screen.availWidth +'px';		//ocupa toda la pantalla
				objDivCreado.style.height= screen.availHeight +'px';
				break;
			case elNavegador.isOpera:
				break;
			default:
				break;
			}
			objDivCreado.style.top='0px';
			objDivCreado.style.left='0px';
			/*__________________________________________________________
			 * Para que quede por encima de todos y por debajo del msg.*/
			objDivCreado.style.zIndex=1000;		
			/*_____________________
			 * La transparencia:*/
			switch(true){
			case elNavegador.isIE:
				objDivCreado.style.opacity = 5/10;
				objDivCreado.style.filter = 'alpha(opacity=50)'; 
				break;
			case elNavegador.isNS:
				objDivCreado.style.opacity = 5/10;
				objDivCreado.style.filter = 'alpha(opacity=' + 5*10 + ')';
				break;
			case elNavegador.isOpera:
				objDivCreado.style.opacity = 5/10;
				objDivCreado.style.filter = 'alpha(opacity=' + 5*10 + ')';
				break;
			default:
				break;
			}
			/**/
			elEvento.lanzar(objDivCreado, 'click', NoMostrar, false);
			/*___________________
			 * Lo a�ade al body*/
			document.body.appendChild( objDivCreado );		
			/*_____________________________________
			 * Retorna el objeto div del mensaje
			 * -----------------------------------*/
			return objDivCreado;
		}catch(e){
			alert('Mensaje:: crearDivTransparente: '+e.message);
		}
		
	};
	/*_______________________________________________________________
	 * Esta es la funcion a instanciar 
	 * para    m o s t r a r    el   mensaje.
	 * --------------------------------------------------------------*/
	var tempStatus;	//para setInterval para controlar el tiempo que se muestra el mensaje.
	//
	this.mostrar = function(elTxt, bTimeFix){
		try{		
			if(objMsg==null) return false;
			var dvdCadena=new cadenas_Dvd();
			/*_________________________
			 * Para tratar n mensajes*/
			arrMsg.push(elTxt);
			/*__________________________
			 * Mete el texto en el div*/			
			objMsg.innerHTML = elTxt;
			/*_________________________________
			 * Ver si cabe el texto en el div: widthStrDiv*/
			var ar=parseInt(4*dvdCadena.eliminarSufijo(anguloRedondeo, 'px'));	
			objMsg.style.width=widthStrDiv( objMsg.id, elTxt, ar )+'px';
			/*____________________
			 * Esquina redondeada*/
			if(bEsquinasRedondeadas==true){
				laMisc.redondearEsquina(objMsg.id, anguloRedondeo, null);
			}
			/*_______________________________________
			 * Muestra los divs msg y transparencia*/
			objMsg.style.display = '';
			if(objDivTransparente!=null)
				objDivTransparente.style.display='';
			/*___________________________________________________________________
			 * Posiciona el Div en la mitad vertical y horizontal del documento*/
			laPosicion.centrarEnPag(objMsg.id);	//reposiciona el div	
			/*_____________________________________________________
			 * Establece el tiempo para que se quite el mensaje.*/
			if(bTimeFix==false||bTimeFix==null||bTimeFix=='undefined'||bTimeFix==''){	//si se pasa true en bTimeFix deja fijo el mensaje.
				tempStatus = setTimeout(function(){
	 							NoMostrar();
								}, segundosDelay);
			}			
		}catch(e){
			alert('Mensaje:: mensaje, mostrar: '+e.message);
		}
	};
	/*_____________________________________________________________
	 * Para   o c u l t a r   el mensaje:
	 * -----------------------------------------------------------*/ 
	this.ocultar = function(){	
		NoMostrar();		
	};
	/*
	 * Funcion interna para ocultar el div.*/
	var NoMostrar=function(){
	try{
		//clearTimeout(tempStatus);		
		if(objMsg!=null) objMsg.style.display = 'none';
		if(objDivTransparente!=null) objDivTransparente.style.display='none';		
	}catch(e){
		alert('No mostrar: '+e.message);
	}
	};
	/*
	 * */
	var bStrCabeEnDiv=function(idDiv, strCadena){
		objDiv=document.getElementById(idDiv);
		if(!objDiv) return false;
		/*___________________________________________________________
		 * Quita de cadena todo lo que est� delimitado por < y > */
		strCadena=strCadena.replace(/<[^>]+>/g,'');
		/*______________________________________
		 * Calcula en pixeles la palabra mayor*/
		var validacion=new validacion_Dvd(); 
		var dvdCadena=new cadenas_Dvd();
		var laMayor=validacion.strPalabraMayor(strCadena);
		var enPix=validacion.strWidthEnPixel(laMayor);
		/*
		 * Calcula el margin el padding y el borde*/
		var laMisc=new miscelanea_Dvd();
		var m = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.margin, 'px'));
		var p = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.padding, 'px'));
		var b = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.border, 'px'));
		var a = parseInt(2*dvdCadena.eliminarSufijo(anguloRedondeo, 'px'));		
	
		if(parseInt(objDiv.offsetWidth - m - p - b - a) < enPix) 
			return false;
		else
			return true;
	};
	/*__________________________________
	 * Calcula el width de un texto */
	var widthStrDiv=function(idDiv, strCadena, numOtros){
		objDiv=document.getElementById(idDiv);
		if(!objDiv) return false;
		/*___________________________________________________________
		 * Quita de cadena todo lo que est� delimitado por < y > */
		strCadena=strCadena.replace(/<[^>]+>/g,'');
		/*______________________________________
		 * Calcula en pixeles la palabra mayor*/
		var laMayor=strPalabraMayor(strCadena);
		var enPix=strWidthEnPixel(laMayor);
		/*___________________________________________
		 * Calcula el margin el padding y el borde*/
		var dvdCadena=new cadenas_Dvd();
		var m = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.margin, 'px'));
		var p = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.padding, 'px'));
		var b = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.border, 'px'));
		
		if(isNaN(numOtros)==true || numOtros=='undefined' || numOtros==null) 
			numOtros = 0;
		
		return parseInt(enPix+m+p+b+numOtros);
		if(parseInt(objDiv.offsetWidth - m - p - b - numOtros) < enPix) 
			return parseInt(enPix+m+p+b+numOtros);
		else
			return objDiv.offsetWidth;
	};
	/*____________________________________________________________
	 * Entra una cadena y devuelve el tama�o del largo en pixeles
	 * -Para ello crea un div, mete el texto en el div y mide el div*/
	var strWidthEnPixel=function(strAMedir){
		var elDiv = new divs_Dvd();
		var longitudCadena=strAMedir.length;
		var enPix = 0;
		crearDiv('iddivcreado', null, 0, 0);
		document.getElementById('iddivcreado').innerHTML=strAMedir;
		//document.getElementById('iddivcreado').style.fontFamily='Courier';
		enPix=document.getElementById('iddivcreado').offsetWidth;
		var objDiv = document.getElementById('iddivcreado');
		document.body.removeChild(objDiv);
		
		return parseInt(enPix);
		
	};
	/*_______________________________________________________________
	 * Entra una cadena de texto y devuelve la palabra mayor:
	 * (Para saber si la palabra mayor cabe dentro del div mensaje)
	 * -------------------------------------------------------------*/
	var strPalabraMayor=function(strCadena){
		if(typeof(strCadena)==undefined || strCadena == null || strCadena=='')
			return false;
		var arrPalabras = strCadena.split(' ');
		if(arrPalabras.length<=0) return '';
		var palabraMayor='';
		for(i=0;i<arrPalabras.length;i++){
			if(arrPalabras[i].length > palabraMayor.length)
				palabraMayor=arrPalabras[i];
		}
		return palabraMayor;
	};
	/*::::::::::::::::::::::::::::::::::::::::::::::::::
	 * CREAR  DIV
	 * ______________
	 * pejemplo: miObj.divs.crearDiv('miIdDiv', 'idContenedor1', 100, 50);
	 * Crea un div en idContenedor1 en la posicion x,y (100, 50).
	 *::::::::::::::::::::::::::::::::::::::::::::::::: */
	var crearDiv=function(idDivACrear, idDivContenedor, x, y){
	try{
		//Validacion:
		var objDivContenedor=null;		
		if(typeof(idDivACrear)!='string') return false;
		
		if(idDivContenedor==null||idDivContenedor=='')
			objDivContenedor=document.body;
		if(!document.getElementById(idDivContenedor)) 
			objDivContenedor=document.body;
		else
			objDivContenedor=document.getElementById(idDivContenedor);
		if(document.getElementById(idDivACrear)) return false;
		if(isNaN(x)==true) x=0;
		if(isNaN(y)==true) y=0;
		//Proceso:
		var objDiv= document.createElement('div'); // crea un div.			  
		objDiv.id = idDivACrear; //Al div creado le asigno un id
		//objDiv.innerHTML=idDiv.id;  	 //le introduzco contenido.
		//objDiv.style.display = 'none';
		//objDiv.className = 'ToolTip';
		objDiv.style.position='absolute';    
		objDiv.style.top=y+'px'; 
		objDiv.style.left=x+'px'; 	
		//objDiv.style.backgroundColor=color;
		objDivContenedor.appendChild(objDiv);
		console.log(objDivContenedor.classList.value);
		return objDiv;
	}catch(e){
		alert('Mensaje: crearDiv: '+e.message);
		return false;
	}
	};
	/*______________________
	 *  * Llama al constructor
	 * ---------------------*/
	constructor();
}catch(e){
	alert('Mensaje: msg: '+e.message);
}	
}
/**========================================================================= 
 * 							T r a n s i c i o n e s  
 *=========================================================================*/
function transiciones_Dvd(){
	var funcExecFin=null;	//funcion pasada que se ejecuta despues del movimiento.
	/**/
	var transicion=function(curva,duracionTotalTransicion,callback){ 
	    this.ant=0.01; 		//el valor recogido de la funcion desacelerado(entre 0 y 1)
	    this.done_=false; 	//
	    var _this=this; 	//para pasar los valores de la clase.
	    this.horaInicioTransicion=new Date().getTime(); 
	    /**/
	    this.init=function(){ 
	        setTimeout(function(){ 
	                if(!_this.next()){ 				//pregunta de control para que se ejecute el movimiento o termine.
	                    callback(1); 
	                    _this.done_=true; 			
	                    window.globalIntervalo=0;
	                    funcExecFin();				//ejecuci�n de la funcion pasada como argumento.
	                    return;
	                }	 
	                callback(_this.next());	//llama a la funcion que modifica el valor left y top 
	                _this.init(); 			//se llama de nuevo recursivamente.
	            },20); 						//retardo de 13ms para empezar el movimiento
	    };
	    /*
	     * -llamada desde transicion
	     * -curva es la funcion que calcula el siguiente desplazamiento(desacelerado). * */
	    this.next=function(){ 
	        var horaActual=new Date().getTime(); 
	        if((horaActual-this.horaInicioTransicion)>duracionTotalTransicion) 
	            return false; 
	        return this.ant=curva((horaActual-this.horaInicioTransicion+.001)/duracionTotalTransicion,this.ant); 
	    };
	};
	/** -Es la funcion de la clase a instanciar.
	 * -el inicio es la posicion left y top del div pasado.
	 * -fExe es la funcion externa que se ejecutar� cuando acabe el movimiento(opcional)*/
	this.mover=function(idDivTransicion, finX, finY, fExe){
	//Validacion:
		if(!document.getElementById(idDivTransicion)) return;
	//Recogida de datos.
		funcExecFin=fExe;						//asigna la funcion pasada a la variable local
		//Cacho los datos de inicio de posicion.
		inicioX = document.getElementById(idDivTransicion).offsetLeft;
		inicioY = document.getElementById(idDivTransicion).offsetTop;
	//Proceso:
		moverHorizontal(idDivTransicion,inicioX, finX);
		moverVertical(idDivTransicion, inicioY, finY);		
	};
	/**/
	var moverHorizontal=function(idDivTransicion, inicio, fin){
		divTransicion=document.getElementById(idDivTransicion);
	    /*
	     * desacelerado: el valor de la posicion, duracion del movimiento, */ 
	    var t=new transicion(desacelerado,1000,function(p){ 
	        		divTransicion.style.left=inicio+((fin-inicio)*p)+'px'; 
	    		  }); 
	    t.init(); 
	    t=null;	    
	};
	/**/
	var moverVertical=function(idDivTransicion, inicio, fin){
		
		divTransicion=document.getElementById(idDivTransicion);
	     
	    var t=new transicion(desacelerado,1000,function(p){ 
	        divTransicion.style.top=inicio+((fin-inicio)*p)+'px'; 	//el movimiento del top.
	    }); 
	    t.init(); 
	    t=null; 
	};
	/*_________________________________________________________________
	 * -retorna el valor del avance
	 * -llamada <curva> para que coja cualquier valor.
	 * -El redise�o de esta funcion da diferentes efectos al movimiento
	 * devuelve valores entre 0 y 1*/
	var desacelerado=function(p,ant){ 
	    var maxValue=1, minValue=.001, totalP=1, k=.25; 
	    var delta = maxValue - minValue;  
	    var stepp = minValue+(Math.pow(((1 / totalP) * p), k) * delta);  //formula del movimimiento desacelerado.
	    return stepp;  
	};	
}
/**=======================================================================================
 * =======================================================================================
 * 					S O B R E   LAS   I M A G E N E S 
 * =======================================================================================
 * =======================================================================================*/
function imagenes_Dvd(){
	this.swapOver=function(idBoton, urlBotonOver){
		document.getElementById(idBoton).style.background = 'url(\"'+urlBotonOver+'\") center no-repeat';
	};
	this.swapOut=function(idBoton, urlBoton){
		document.getElementById(idBoton).style.background = 'url(\"'+urlBoton+'\") center no-repeat';
	};
}
/**=======================================================================================
 * =======================================================================================
 * 					F A D E   I N   -   F A D E    O U T 
 * =======================================================================================
 * =======================================================================================*/
function fade_Dvd(){
try{
	var b_imagenFija=false;
	/*________________________________________________________________________
	 * Esta es la funcion que se llama desde fadeIN y fadeOUT.
	 * Es la que realiza los calculos y asigna los valores para hacer el fade
	 * inicio=0, fin=1 ==> aparece(fadeIn)
	 * inicio=1, fin=0 ==> desaparece(fadeOut)
	 * ------------------------------------------------------------------------*/
	var transicion=function(inicio,fin,segundos){
		//alert(inicio+'\n'+fin+'\n'+segundos);
	    var _this=this; //esta asignacion es para pasarle this a setInterval
	    this.test=0; 	//contador para hacer progresiva la transparencia.
	    if(this.intervalo)clearInterval(this.intervalo); 	
	    if(this.val && Math.abs(fin-this.val)<0.01)
	    	return;
	    /*______________________________
	     * Asigna el valor a this.val(valor de la opacidad)*/
	    if(!this.val){
	    	if(inicio<1){
	    		this.val = inicio + 0.0001;
	    	}else{
	    		this.val = inicio;
	    	}	    		
	    }
	    set_opacity(this, this.val); 
	    this.pasos=(fin-inicio)/100; //en fadeIn(inicio=0, fin=1) pasos es positivo, pero en fadeOut es negativo.
	    this.pausa=segundos*2; 		 
	    this.intervalo=setInterval( 
	    function(){ 
	        if(_this.test>99 || Math.abs(fin-_this.val)<0.01){ 
	          clearInterval(_this.intervalo); 
	        } 
	        _this.test++;						//suma uno al contador. Cuando llegue a 99 tiene que parar. 
	        _this.val=_this.val+_this.pasos; 	//suma 0.01 a this.val.
	        if(_this.val<=0.01){  
	            _this.style.display='none'; 
	        }else{ 
	            _this.style.display='block';
	        }
	        set_opacity(_this, _this.val); 
	    },this.pausa); 
	};
	/*____________________________________
	 * Establece la opacidad de un div:
	 * -----------------------------------*/
	var set_opacity=function(div, value) {		
		div.style.opacity = value; 
		div.style.MozOpacity = value; 
		div.style.KhtmlOpacity = value; 
		div.style.filter = 'alpha(opacity=' + value*100 + ')'; 
		div.style.zoom=1;//necesario para Explorer		
	};
	/*:::::::::::::::::::::::::::::::::::::::::::::::::::::
	 * funcion que se tiene que llamar para mostrar una 
	 * imagen con fade(muestra gradual)
	 * ::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	this.fadeIN=function(idDiv, urlImg){	
		var obj=document.getElementById(idDiv);    			//obtener el objeto.
	    obj.style.backgroundImage="url('"+urlImg+"')";		//
	    transicion.call(obj,0,1,1); 						//la funcion que hace la transicion.
	    obj.style.zIndex=2000;								//para que quede por encima de todo.
	}; 
	/*::::::::::::::::::::::::::::::::::::::::::::::
	 * Oculta la imagen gradualmente en opacidad:
	 *:::::::::::::::::::::::::::::::::::::::::::::: */
	this.fadeOUT=function(idDiv){
		if(b_imagenFija==true) return;
	    var obj=document.getElementById(idDiv);
	    if(!obj) return;
	    transicion.call(obj,1,0,1); 
	    
	}; 
	/*________________________________________________
	 * deja fijo un fade cambiando el valor de la 
	 * variable global b_imagenFija(hace de switch): se usa
	 * en mostrarImagen(), fadeIN() y fadeOUT() * */
	this.swapCongelar=function(bconGelado){
		if(b_imagenFija==true) 
			b_imagenFija = false;
		else	
			b_imagenFija = true;
	};
	/*:::::::::::::::::::::::::::::::::::::::::::::::::::
	 * Quiero mostrar una imagen aunque est� oculta. * 
	 * ::::::::::::::::::::::::::::::::::::::::::::::::*/
	this.mostrarDiv=function(idDiv, urlImg){
		b_imagenFija = true;	
		fadeIN(idDiv, "");
	};

}catch(e){
	alert('Mensaje: toolTip: '+e.message);
}
	
}

/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *						    E V E N T O S
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function eventos_Dvd(){
	var elNavegador=new navegador_dvd();
	var laMisc=new miscelanea_Dvd();
	var dvdCadena=new cadenas_Dvd();
	/*__________________________________________________________________________
	pej: Coloco el evento click donde 'hablar' es la funcion a ejecutar:
    lanzar(document.getElementById('myDiv'), 'click', hablar, false);
	---------------------------------------------------------------------------*/
	this.lanzar=function(obj, evType, funcion, useCapture){ 
	try{
		if(obj==null || obj=='') obj=document;
		if (obj.addEventListener){ 
			obj.addEventListener(evType, funcion, useCapture); 			 
		} else if (obj.attachEvent){ 
			obj.attachEvent('on'+evType, funcion); 			
		} else { 
			obj['on'+evType]=funcion; 
		}
	}catch(e){
		alert('Mensaje: lanzar: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
	/*_______________________________________________
	 * C a n c e l a   los  otros    e v e n t o s :
	 * */
	this.cancelarOtrosEventos=function(event){		
		if (elNavegador.isIE) {
			event.stopPropagation = true;
			event.returnValue = false;
		}else  if (elNavegador.isNS){
			event.preventDefault();
		}

	};
	/*____________________________
	 * Cancelacion de un evento
	 * --------------------------*/
	this.cancelar=function(obj, nombreEvento, funcion){
	try{
		//Validacion:
		if(obj==null || obj=='' || obj==undefined) obj=document;
		if(typeof(funcion)!= 'function') alert('no pasa una funcion');
		//Proceso:
		if (elNavegador.isIE) {
			if(dvdCadena.bIsStrOn(nombreEvento, 'on')==true)
				obj.detachEvent(nombreEvento, funcion);
			else
				obj.detachEvent('on'+nombreEvento, funcion);
		}else if(elNavegador.isNS) {
			if(dvdCadena.bIsStrOn(nombreEvento, 'on')==true)
				obj.removeEventListener(dvdCadena.eliminarPrefijo(nombreEvento, 'on'), funcion, false);
			else
				obj.removeEventListener(nombreEvento, funcion, false);				
			
		}
	}catch(e){
		alert('Mensaje: cancelar: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
	/*_______________________________________
	 * Simula un click sobre un div pasado
	 * ------------------------------------*/
	this.simularEvento=function(idObjeto, strEvento){
	try{
		//Validacion:
		//Para que valga tanto 'mousemove' como 'onmousemove'
		if(dvdCadena.bIsStrOn(strEvento, 'on')==true)
			strEvento=dvdCadena.eliminarPrefijo(strEvento, 'on');
		//
		//Para obligar a que sea un evento de raton:
		if(strEvento!='click' && strEvento!='mousemove' && strEvento!='mouseup' && 
			strEvento!='mousedown' && strEvento!='dblclick')
			strEvento='click';
		//
		if(!idObjeto) return false;
		objEvento=document.getElementById(idObjeto);	
		//
		//Proceso:
		if( document.fireEvent ) {				// IE 
			objEvento.fireEvent('on'+strEvento);
		}else if( document.dispatchEvent ) { 	// FF y otros
			const evt = new Event('MouseEvents');
			//var evt = document.createEvent('MouseEvents');
			if(dvdCadena.bIsStrOn(strEvento, 'on')==true)
				strEvento = dvdCadena.eliminarPrefijo(strEvento, 'on');
			evt.initMouseEvent(strEvento, true, true, window,	0, 0, 0, 0, 0, false, false, false, false, 0, null);
			objEvento.dispatchEvent(evt);
		}else{ 
			console.log("UtilDvd:::Eventos_Dvd:::SimularEvento::: >>> No puedo lanzar el evento");
		}	
		
		//alert('evento: '+strEvento+' simulado');
	}catch(e){
		alert('Mensaje: simularEvento: '+e.message);
		return false;
	}
	};
	/*___________________________________________________________________
	 * similar a lanzaEvento:
	 * objDiv es un div, pero puede ser cualquier elemento(button pej).
	 * -No probado????????????
	 * -------------------------------------------------------------------*/
	this.encender=function (objDiv, strEvento) {
    try {
        if ((objDiv != null)&&(strEvento != '')){
            if (objDiv.fireEvent) {//para Explorer
                //Impide burbujeo
                objDiv.event.stopPropagation = true;
                objDiv.fireEvent(strEvento);
            } else if (document.createEvent) {//para Firefox
                //var evt = document.createEvent('HTMLEvents');
				const evt = new Event(strEvento, {bubbles: false, cancelable: true});
                //strEvento = strEvento.substring(2, strEvento.length);
				
                //Se cancela el burbujeo
                evt.stopPropagation();
                objDiv.dispatchEvent(evt);
            } else {
                alert('Error, no se pudo encender el evento ');
            } 
        }
    
    }catch(e){
		alert('Mensaje: encender: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;	
    }
	};	
}
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *							A S P E C T O S
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function miscelanea_Dvd(){
	var elNavegador=new navegador_dvd();
	var constructor = function(){};
	/*___________________________________________________________
	 * 				O P A C I D A D  sobre los divs DESTINO
	 * -Si se pasa sin valorOpacidad, quita la transparencia.
	 * -----------------------------------------------------------*/
	this.transparencia=function(idDivOpacidad, valorOpacidad){
	try{
		var divOpacidad;
		//Validacion:
		if(idDivOpacidad==''||idDivOpacidad==null){
			divOpacidad=document.body;
		}else{
			divOpacidad = document.getElementById(idDivOpacidad);
		}
		if(!divOpacidad) return false;
		
		if(valorOpacidad=='undefined' || valorOpacidad==null) valorOpacidad=10;
		if(isNaN(valorOpacidad)==true) valorOpacidad=10;
		if(valorOpacidad>10 || valorOpacidad<0) valorOpacidad=10;
		//Proceso:
		switch(true){
		case elNavegador.isIE:
			divOpacidad.style.opacity = valorOpacidad/10;			
			divOpacidad.style.filter = 'alpha(opacity=' + valorOpacidad*10 + ')';
			break;
		case elNavegador.isNS:
			divOpacidad.style.opacity = valorOpacidad/10;			
			divOpacidad.style.filter = 'alpha(opacity=' + valorOpacidad*10 + ')';
			break;
		case elNavegador.isOpera:
			break;
		default:
			break;
		}
	}catch(e){
		alert('Mensaje: transparencia: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};	
	/*_____________________________________________________________
	 * Redondea las esquinas de un div pasado.
	 * pejemp: miObj.miscelanea.redondearEsquina('miDiv', 12, null);	 
	 * -----------------------------------------------------------*/
	this.redondearEsquina=function(idDiv, angulo, urlBorderRadius){
		var dvdCadena=new cadenas_Dvd();
		//Validacion:		
		//Con el Div:		
		objDiv = document.getElementById(idDiv);
		if(!objDiv)	return;
		//Con el Angulo:
		if(typeof(angulo)=='undefined' || angulo == null || angulo=='')			
			angulo = '14px';
		if(isNaN(angulo)==false){
			angulo=angulo+'px';
		}else if(typeof(angulo)=='string'){
			if(dvdCadena.bIsStrOn(angulo, 'px')==false)
				angulo=angulo+'px';
		}else{
			angulo = '14px';
		}
		//con la url del archivo border-radius.htc
		if(typeof(urlBorderRadius)=='undefined' || urlBorderRadius == null || urlBorderRadius=='') 
			urlBorderRadius = './utilDvd/border-radius.htc';
		//Proceso:
		objDiv.style.borderRadius=angulo;	//w3c
		objDiv.style.MozBorderRadius=angulo;
		objDiv.style.WebkitBorderRadius=angulo;
		objDiv.style.MsBorderRadius=angulo;
		objDiv.style.KhtmlBorderRadius=angulo;
		//
		objDiv.style.behavior=urlBorderRadius;	
	};
	/*________________________________________
	 * Retorna el zIndex Mayor de la pagina
	 * pejemplo:: 
	 * 1-miObj.miscelanea.getZIndexMax(null, true) ==>cacha los div de primer nivel del body.
	 * 2-miObj.miscelanea.getZIndexMax(null, false) ==>cacha todos los divs del body.
	 * 3-miObj.miscelanea.getZIndexMax('miIdDiv', true) ==>cacha los div de primer nivel de 'miIdDiv'.
	 * 4-miObj.miscelanea.getZIndexMax('miIdDiv', false) ==>cacha todos los div del div con id 'miIdDiv'.
	 * ---------------------------------------*/
	this.getZIndexMax=function(objFramePPal, bPrimerNivel){
		if(objFramePPal==null || objFramePPal=='')
			objFramePPal=document.body;
		//
		if(typeof(bPrimerNivel)!='boolean') bPrimerNivel=false;
		//
		var elSubDiv=objFramePPal.getElementsByTagName('div');
		//
		var zIndexMax = 0;	 	
		for(var j=0;j<elSubDiv.length;j++){
			var idEncontrado = elSubDiv.item(j).id;			//cacho id de un div.
			var objEncontrado = elSubDiv.item(j); 			//cacho obj div.			
			var auxZ=0;
			if(objEncontrado.style.zIndex=='undefined')
				auxZ=0;
			else
				auxZ=objEncontrado.style.zIndex;
			if(bPrimerNivel==true){
				if(objEncontrado.parentNode.id == objFramePPal.id){	//solo primer nivel
					if(auxZ > zIndexMax) 
						zIndexMax=objEncontrado.style.zIndex;
				}
			}else{
				if(auxZ > zIndexMax) 
					zIndexMax=objEncontrado.style.zIndex;
			}
			
		}
		return zIndexMax;
	};
	/*
	 * */
	this.getBorde=function(idDiv, tipoBorde){
		if(!document.getElementById(idDiv)) return false;
		if(isNaN(tipoBorde)) 
			tipoBorde=10;	//si tipo de borde no es num�rico devuelve el borde.
		//
		var bordeArriba=document.getElementById(idDiv).style.borderTop;
		var bordeAbajo=document.getElementById(idDiv).style.borderBottom;
		var bordeDerecha=document.getElementById(idDiv).style.borderRight;
		var bordeIzquierda=document.getElementById(idDiv).style.borderLeft;
		var borde=document.getElementById(idDiv).style.border;
		//
		var px='';
		var num='';
		//
		switch(tipoBorde){
		case 1:
			px=String(bordeArriba).toLowerCase().indexOf('px');
			num=String(bordeArriba).substring(0, px);
			break;
		case 2:
			px=String(bordeAbajo).toLowerCase().indexOf('px');
			num=String(bordeAbajo).substring(0, px);
			break;
		case 3:
			px=String(bordeDerecha).toLowerCase().indexOf('px');
			num=String(bordeDerecha).substring(0, px);
			break;
		case 4:
			px=String(bordeIzquierda).toLowerCase().indexOf('px');
			num=String(bordeIzquierda).substring(0, px);
			break;
		default:
			px=String(borde).toLowerCase().indexOf('px');
			num=String(borde).substring(0, px);
			break;
		}
		if(num==''||num==undefined)
			return false;
		return (num);				
	};
}
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 * 						C A D E N A S   DE   T E X T O
 * 				
 * 
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function cadenas_Dvd(){
	/*_________________________________________________________________
	 * Se le pasa un string y un string a quitar por detras.
	 * se devuelve el desde el inicio hasta la primera ocurrencia del string a quitar.
	 * pejem: miObjeto.miscelanea.eliminarSufijo('hola capullo' , 'cap') ==> retorna 'hola'
	 * ----------------------------------------------------------------*/
/**
 * @param {*} 
 * @returns 
 */	
	this.eliminarSufijo=function(strOriginal, strAquitar){
	try{
		var indice=strOriginal.indexOf(strAquitar);
		var strRetorno='';
		if(indice<0){
			strRetorno=strOriginal;
		}else{
			strRetorno=strOriginal.substring(0,strOriginal.indexOf(strAquitar));
		}
		return strRetorno;		
	}catch(e){
		alert('Mensaje: nombreOriginal: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
	/*_________________________________________________________________
	 * Se le pasa un string y un string a quitar por delante.
	 * se devuelve el desde el inicio hasta la primera ocurrencia del string a quitar.
	 *=================================================================
	 * pejem: miObjeto.miscelanea.eliminarSufijo('hola capullo' , 'cap') 
	 * ==> retorna 'hola '
	 * ----------------------------------------------------------------*/
/**
 * @param {*} 
 * @returns 
 */
	this.eliminarPrefijo=function(strOriginal, strPrefijo){
		try{
			var indice=strOriginal.indexOf(strPrefijo);
			//alert(indice+'-'+strPrefijo.length);
			var strRetorno='';
			if(indice<0){
				strRetorno=strOriginal;
			}else{				
				strRetorno=strOriginal.substring(parseInt(indice)+parseInt(strPrefijo.length),strOriginal.length);
			}
			return strRetorno;		
		}catch(e){
			alert('Mensaje: nombreOriginal: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
			return false;
		}
		
	};
	/*___________________________________________________________________
	 * Comprueba la existencia de un texto en otro:
	 * =================================================================
	 * pejplo: objUtil.miscelanea.bIsStrOn('caperucita roja','peru'); 
	 * ==> retorna true
	 * -----------------------------------------------------------------*/
	/**
 * @param {*} 
 * @returns 
 */
	this.bIsStrOn=function(strOriginal, strBuscar){
		if(typeof(strOriginal)!='string') return false;
		if(typeof(strBuscar)!='string') return false;
		var indice=strOriginal.indexOf(strBuscar);
		if(indice<0) 
			return false;
		else    	
			return true;		
	};
	
}
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *						
 *							S O B R E    L O S    D I V S
 *
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
function divs_Dvd(){
	var elNavegador=new navegador_dvd();
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * Devuelve un   a r r a y   de divs de primer nivel o cualquiera
 * _______________________________________________________________
 * pej: miObj.divs.getArray('idContenedor1', true); == 
 * devuelve un array con todos los id de los divs de primer nivel 
 * del div idContenedor1.
 *:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/**
 * @param {*} 
 * @returns 
 */
	this.getArray=function(idFrame, bPrimerNivel){
	try{
		//Validacion:
		if(!document.getElementById(idFrame)) return null;
		if(bPrimerNivel==null) bPrimerNivel=true;
		if(typeof(bPrimerNivel)!='boolean') bPrimerNivel=true;
		objFramePPal=document.getElementById(idFrame);
		//Proceso:
		var newArray = new Array();
		var elSubDiv=objFramePPal.getElementsByTagName('div');
		for(var j=0;j<elSubDiv.length;j++){
			var idEncontrado = elSubDiv.item(j).id;			//cacho id de un div.
			var objEncontrado = elSubDiv.item(j); 			//cacho obj div.
			if(bPrimerNivel==true){
				if(objEncontrado.parentNode.id == objFramePPal.id){	//solo primer nivel
					newArray.push(idEncontrado);
				}
			}else{
				newArray.push(idEncontrado);
			}
		}
		return newArray;
	}catch(e){
		alert('Mensaje: getArray: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return null;
	}
	};
/*::::::::::::::::::::::::::::::::::::::::::::::::::
 * CREAR  DIV
 * ______________
 * pejemplo: miObj.divs.crearDiv('miIdDiv', 'idContenedor1', 100, 50);
 * Crea un div en idContenedor1 en la posicion x,y (100, 50).
 *::::::::::::::::::::::::::::::::::::::::::::::::: */
/**
 * @param {*} 
 * @returns 
 */
	this.crearDiv=function(idDivACrear, idDivContenedor, x, y){
	try{
		//Validacion:
		var objDivContenedor=null;		
		if(typeof(idDivACrear)!='string') return false;
		
		if(idDivContenedor==null||idDivContenedor=='')
			objDivContenedor=document.body;
		if(!document.getElementById(idDivContenedor)) 
			objDivContenedor=document.body;
		else
			objDivContenedor=document.getElementById(idDivContenedor);
		if(document.getElementById(idDivACrear)) return false;
		if(isNaN(x)==true) x=0;
		if(isNaN(y)==true) y=0;
		//Proceso:
		var objDiv= document.createElement('div'); // crea un div.			  
		objDiv.id = idDivACrear; //Al div creado le asigno un id
		//objDiv.innerHTML=idDiv.id;  	 //le introduzco contenido.
		//objDiv.style.display = 'none';
		//objDiv.className = 'ToolTip';
		objDiv.style.position='absolute';    
		objDiv.style.top=y+'px'; 
		objDiv.style.left=x+'px'; 	
		//objDiv.style.backgroundColor=color;
		objDivContenedor.appendChild(objDiv);
		return objDiv;
	}catch(e){
		alert('Mensaje: crearDiv: '+e.message);
		return false;
	}
	};
/*__________________________________________________________
 * Encuentra un nombre unico para uno que entra sujerido.
 * a�ade _num al final del nombre para encontrarlo
 * --------------------------------------------------------*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.nombreUnico=function(idDiv){
		var contador=0;
		if(document.getElementById(idDiv))
			return idDiv;
		else
			for(i=0;;i++){
				if(!document.getElementById(idDiv+'_'+i))
					return idDiv+'_'+i;
			}
	};
/*________________________________________________
 * Funcion que crea un boton al final de un div
 * 
 * No realiza la funcion
 * -----------------------------------------------*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.crearBoton=function(idDivContenedor, idBoton, strValueBoton, funcionClick){
		var elEvento=new eventos_Dvd();
		var botonCreado = document.createElement("input");
		// Atributos o Propiedades:
		if(document.getElementById(idBoton)) return null;
		botonCreado.id    = idBoton;
		botonCreado.type  = "button";
		botonCreado.value = strValueBoton;
		//botonCreado.onclick = funcionClick;
		// Insertar el bot�n al final de 'div1':
		var objDivContenedor=null;
		
		if(!document.getElementById(idDivContenedor))
			objDivContenedor=document.body;
		else
			objDivContenedor=document.getElementById(idDivContenedor);
		
		objDivContenedor.appendChild( botonCreado );
		// Evento:		
		if(typeof(funcionClick)=='function')
			elEvento.lanzar(botonCreado, 'click', funcionClick, false);
		return botonCreado;
		
	};	
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * 					C O R T A R    D I V     
 * 					(de origen a destino)
 * ______________________________________________________________________
 * 1-Creo el clon en el contenedor destino pero no le cambio el id
 * 2-Borrar los datos del array de contenedor destino actual
 * 3-cachar el contenedor destino para registrar el cambio.
 * 4-dotar de movimiento al contenedor destino.
 * 5-borrar datos array contenedor Origen.
 * 6-cachar el contenedor origen para registrar el cambio.
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.mover=function(idDiv, idDivOrigen, idDivDestino, x , y){
	try{	
		/*______________________________	
		 * sobre el CONTENEDOR DESTINO
		 * -----------------------------*/
		//1-Creacion del clon.
		var elClon = this.clonar(idDivDestino, idDiv);	//se clona.
		if(elClon==false){
			alert('No se pudo completar la operacion de Cortado de '+idDiv+' hacia '+idDivDestino);
			return false;
		}else{
			elClon.style.left=parseInt(x)+'px';
			elClon.style.top =parseInt(y)+'px';
		}
		/*_______________________________
		 * sobre el CONTENEDOR ORIGEN
		 * -----------------------------*/
		if(!this.borrar(idDiv, idDivOrigen)){ 
			return false;
		}else{
			return true;
		}
	}catch(e){
		alert('Mensaje: mover: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * 								C O P I A R   UN   D I V 
 * 								(desde origen a destino)	 
 * ________________________________________________________________________________
 * 1-Hay que clonar el div cambiando el id para que no se bloquee javascript. 
 * 2-borrar todos los datos del contenedor Origen Actual
 * 3-Cachar los divs del contenedor Destino para registrar el nuevo
 * 4-Dotarles de movimiento(registrar).
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.copiar=function(idDiv, idDivDestino, x , y){
	try {	
		if(!document.getElementById(idDivDestino)) 
			return false;
		//1-Hay que clonar el div
		var elClon = this.clonar(idDivDestino, idDiv);	//se clona.
		if(elClon==false){
			alert('No se pudo completar la operacion de Copiado de '+idDiv+' hacia '+idDivDestino);
			return false;
		}else{
			elClon.style.left=parseInt(x)+'px';
			elClon.style.top =parseInt(y)+'px';
			return true;
		}
	}catch(e){
		alert('Mensaje: copiar : '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * 						B O R R A D O    DE UN   D I V  
 * 								(a la Papelera)
 * ______________________________________________________________________________
 * 1-borrar el div de su contenedor Origen
 * 2-cachar los divs del contenedor ORigen para registrar que queda eliminado.
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.borrar=function(idDiv, idDivContenedor){
	try{
		//Validacion:
		if(!document.getElementById(idDiv)) return false;
		//if(!document.getElementById(idDivContenedor)) return false;
		var objDivContenedor=null;
		if(idDivContenedor==null||idDivContenedor=='')
			objDivContenedor=document.body;
		if(!document.getElementById(idDivContenedor)) 
			objDivContenedor=document.body;
		else
			objDivContenedor=document.getElementById(idDivContenedor);
		
		//Proceso:
		var objDiv = document.getElementById(idDiv);
		//var contAux = document.getElementById(idDivContenedor);
		objDivContenedor.removeChild(objDiv);
		return true;
	}catch(e){
		alert('Mensaje:borrar : '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}	
	};
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 * 						C R E A R   C L O N  de un  D I V
 * ______________________________________________________________________________ 
 * del divEnMovimiento en el idContenedor pasado. 
 * Devuelve el clon creado para posicionarlo.
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.clonar=function(idContenedor, IdDivACopiar, sufijoIdDiv){
		//Validacion:
		if(!document.getElementById(idContenedor)) return false;
		if(!document.getElementById(IdDivACopiar)) return false;
		//Proceso:
		var posIdClon=IdDivACopiar.indexOf(sufijoIdDiv);
		var entreIniYidClon=IdDivACopiar.substring(0 , posIdClon);
		var numeroClon=IdDivACopiar.substring(posIdClon + sufijoIdDiv.length , IdDivACopiar.length);
		var sinElnumero=IdDivACopiar.substring(0 , posIdClon + sufijoIdDiv.length);
	try{
		//Creacion del clon.
		var elClon = document.getElementById(IdDivACopiar).cloneNode(true);
		/*_______________________
		 * Creacion del nombre.*/
		if(posIdClon<0){	//si no existe la palabra clonadora		
			for(i<0;;i++){
				if(!document.getElementById(IdDivACopiar + sufijoIdDiv + i)){
					elClon.id=IdDivACopiar + sufijoIdDiv + i;	//si no hay clon crea el primero.
					break;			
				}
			}
		}else{	//si existe ya la palabra clonadora en el nombre de la entrada:
			for(i<0;;i++){
				if(!document.getElementById( sinElnumero + i )){
					elClon.id=sinElnumero+i;
					break;			
				}
			}		
		}
	/*________________________________
	 * Anadir el clon al contenedor.*/
		elContenedor=document.getElementById(idContenedor);
		elContenedor.appendChild(elClon);
	//Retorno.	
		return elClon;
	}catch(e){
		alert('Mensaje: clonar : '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};	
}
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 * 								P O S I C I O N E S
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
/**
 * @param {*} 
 * @returns 
 */
function posiciones_Dvd(){
	var elNavegador = new navegador_dvd();
	var elEvento = new eventos_Dvd();
	var elNombre = new miscelanea_Dvd();
	/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	*P O S I C I O N E S   A B S O L U T A S     DE UN DIV
	* (independiente del interior en que se encuentren). 
	* -Usa recursividad.
	* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	
	var el_X_ABS=0, el_Y_ABS=0;	//variables para el x absoluto de un div y el y absoluto.
	var x_1=true, y_1=true;

	/**
	 * de la X
	 * @param {*} 
	 * @returns 
	 */
	this.Xabs=function(divId){
	try{
		if(!document.getElementById(divId)) return false;
		if(x_1==true){
			x_1=false;
			el_X_ABS=0;
		}
		eldiv=document.getElementById(divId);
		el_X_ABS=parseInt(el_X_ABS)+parseInt(eldiv.offsetLeft);
		if(eldiv.parentNode.id != ''){	//si no es el padre total
			this.Xabs(eldiv.parentNode.id);
		}
		x_1=true;
		return parseInt(el_X_ABS);
	}catch(e){
		alert('Mensaje: Xabs: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
	/**
	 * de la Y
	 * @param {*} 
	 * @returns 
	 */
	this.Yabs=function(divId){
	try{
	//Validacion:
		if(!document.getElementById(divId)) return false;
	//Proceso:	
		if(y_1==true){
			y_1=false;
			el_Y_ABS=0;
		}
		eldiv=document.getElementById(divId);
		if(eldiv.parentNode.id == ''){
			el_Y_ABS=parseInt(el_Y_ABS)+parseInt(eldiv.offsetTop);
		}else{
			el_Y_ABS=parseInt(el_Y_ABS)+parseInt(eldiv.offsetTop);
			this.Yabs(eldiv.parentNode.id);
		}
		y_1=true;
		return el_Y_ABS;
	}catch(e){
		alert('Mensaje: Yabs: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
	/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	* 	Funcion que M I R A  si el divQueSeMueve  H A    L L E G A D O  al divContenedor destino: 
	* -Para que llegue tiene que dar todos los datos IN.
	:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.isDivOverDiv=function(idDiv, idContenedorDestino){
	try{
	//Validacion:
		if(!document.getElementById(idDiv)) return false;
		if(!document.getElementById(idContenedorDestino)) return false;
	//Proceso:
		/*____________________
		 * Cacha las Posiciones del div que se Mueve */
		var posicionAbsolutaDivMovHorizontal =	this.Xabs(idDiv);/*Posicion Absoluta del div para el movimiento Horizontal*/
		var posicionAbsolutaDivMovVertical= this.Yabs(idDiv); 	/*	Posicion Absoluta del div para el movimiento Vertical*/
		/*___________________
		 * Cacha las Posiciones del Contenedor */
		var margenDerechoContenedor=document.getElementById(idContenedorDestino).offsetWidth + 	/*	Margen derecho del contenedor*/ 
		this.Xabs(idContenedorDestino);
		var margenIzquierdoContenedor = this.Xabs(idContenedorDestino);	/*	Margen Izquierdo del ContenedorHasta*/
		var margenSuperiorContenedor = this.Yabs(idContenedorDestino);		/*	Margen Superior del ContenedorHasta*/
		var margenInferiorContenedor =  this.Yabs(idContenedorDestino) +	/*	Margen Inferior del ContenedorHasta*/
		document.getElementById(idContenedorDestino).offsetHeight;
		/*_____________________
		 * Variables y Condiciones para averiguar si el div que se mueve llega o no hasta el contenedorHasta */	 	
		var bLlegaDestino_Izq=false;
		var bLlegaDestino_Der=false;
		var bLlegaDestino_Arr=false;
		var bLlegaDestino_Abj=false;
		/*	Por la Izquierda:*/
		var textoInfo='<br>';
		if(posicionAbsolutaDivMovHorizontal > margenIzquierdoContenedor){		
			bLlegaDestino_Izq=true;
		}else{
			bLlegaDestino_Izq=false;
		}	
		/*	Si se pasa Por la Derecha*/
		if(posicionAbsolutaDivMovHorizontal > margenDerechoContenedor){
			bLlegaDestino_Der=false;
		}else{
			bLlegaDestino_Der=true;	
		}
		/*	Por Arriba*/	
		if(posicionAbsolutaDivMovVertical < margenSuperiorContenedor){
			bLlegaDestino_Arr=false;
		}else{
			bLlegaDestino_Arr=true;	
		}
		/*	Por Abajo*/	
		if(posicionAbsolutaDivMovVertical > margenInferiorContenedor){
			bLlegaDestino_Abj=false;
		}else{
			bLlegaDestino_Abj=true;	
		}
		/*__________
	Retorno*/
		if( (bLlegaDestino_Izq==true) && (bLlegaDestino_Der==true) && 
			(bLlegaDestino_Arr==true) && (bLlegaDestino_Abj==true)){ 
			return true;
		}else{		
			return false;
		}
	}catch(e){
		alert('Mensaje: isdivoverdiv: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}	
	};
/*_____________________________________
 * Cacha la POSICION x DEL RATON
 *-----------------------------------*/
	this.xmouse=0;
	this.ymouse=0;
	/*
	 * */
	/**
	 * @param {*} 
	 * @returns 
	 */
	var getPosicionX=function(event){
	try{
		//elEvento.cancelarOtrosEventos(event);
		if (elNavegador.isIE) {
			this.xmouse = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		}else if(elNavegador.isNS){
			this.xmouse = event.clientX + window.scrollX ;
			//alert('event.clientX: '+event.clientX+'\n , window.scrollX: '+window.scrollX+'\n'+this.xmouse);
		}else if(elNavegador.isOpera){
			this.xmouse = window.event.clientX + document.documentElement.scrollLeft;
		}else{			
			this.xmouse=0;
		}
		//this.xmouse=parseInt(x);
		document.getElementById('xratonDVD').innerHTML=this.xmouse;
	}catch(e){
		alert('Mensaje: getPosicionX: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}	
	};
	/*
	 * */	
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.getXraton=function(){
	try{
		elEvento.cancelar(null, 'mousemove', getPosicionX);
		elEvento.lanzar(null, 'mousemove', getPosicionX, false);
		elEvento.simularEvento(null, 'mousemove');
		//elEvento.cancelar(null, 'mousemove', getPosicionX);
		//alert('tras simular');
		return this.xmouse;		
		//return parseInt(document.getElementById('xratonDVD').innerHTML);
	}catch(e){
		alert('Mensaje: getXraton: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};	
	/*__________________________________
	 * Cacha la POSICION y DEL RATON
	 * --------------------------------*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.getYraton=function(event){
	try{
		elEvento.cancelar(null, 'mousemove', getPosicionY);
		elEvento.lanzar(null, 'mousemove', getPosicionY, false);
		elEvento.simularEvento(null, 'mousemove');
	}catch(e){
		alert('Mensaje: yRaton: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
	/**
	 * @param {*} 
	 * @returns 
	 */
	var getPosicionY= function(event){
		try{
			//elEvento.cancelarOtrosEventos(event);
			if (elNavegador.isIE) {
				this.ymouse = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
			}else if(elNavegador.isNS){
				this.ymouse = event.clientY + window.scrollY ;
				//alert('event.clientY: '+event.clientY+'\n , window.scrollY: '+window.scrollY+'\n'+this.ymouse);
			}else if(elNavegador.isOpera){
				this.ymouse = window.event.clientY + document.documentElement.scrollTop;
			}else{			
				this.ymouse=0;
			}
			//this.ymouse=parseInt(Y);
			document.getElementById('yratonDVD').innerHTML=this.ymouse;
		}catch(e){
			alert('Mensaje: getPosicionY: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
			return false;
		}	
	};
	/*____________________________________________________________________
	 * Se trata de calcular la posicion left y top de un div para que se 
	 * Muestre en el centro del documento o de la pantalla.
	 * @param: idDiv = id del div a centrar
	 * */
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.centrarEnPag=function(idDiv){		
		var objDiv=document.getElementById(idDiv);
		//alert(parseInt(false));
		//
		switch(true){
		case elNavegador.isIE:
			var widthBody = document.documentElement.scrollWidth;
			var heightBody = document.documentElement.scrollHeight;
			break;
		case elNavegador.isNS:
			var widthBody  = window.innerWidth;
			var heightBody = window.innerHeight;
			break;
		case elNavegador.isOpera:
			break;
		default:
			break;
		}		
		var widthDiv=objDiv.offsetWidth;
		var heightDiv=objDiv.offsetHeight;
		//
		var mw=parseInt((widthBody-widthDiv)/2);
		var mh=parseInt((heightBody-heightDiv)/2);

		
//		alert(widthBody+'-'+widthDiv+'-'+mw+'-'+heightBody+'-'+heightDiv+'-'+mh);
		//
		//objDiv.style.zIndex=1000;
		objDiv.style.left=mw+'px';
		objDiv.style.top=mh+'px';
//		alert(objDiv.style.left);
	};
	/*_____________________________________________
	 * Centra verticalmente un div dentro de otro
	* */
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.centrarVertical=function(idDiv, idDivContenedor){
		var objDiv=null;	//div a centrar
		var objCont=null;	//div contenedor.
		var bBody=false;
		//Validacion:
		//Si no existe el div a centrar nos vamos.
		if(!document.getElementById(idDiv)) return;
		objDiv=document.getElementById(idDiv);
		if(objDiv == null ) return;
		//Si no existe el contenedor pasado, el contenedor es el body del documento.
		if(!document.getElementById(idDivContenedor)){ 
			objCont=document.body;
			bBody=true;
		}else{
			objCont=document.getElementById(idDivContenedor);
			bBody=false;
		}
		var mitadHeight=0;	//variable a calcular.
		var heightDiv=objDiv.offsetHeight;
		//Proceso:
		if(bBody==true){
			switch(true){
			case elNavegador.isIE:
				var heightBody = document.documentElement.scrollHeight;
				break;
			case elNavegador.isNS:
				var heightBody = window.innerHeight;
				break;
			case elNavegador.isOpera:
				break;
			default:
				break;
			}		
			//
			mitadHeight=parseInt((heightBody-heightDiv)/2);
		}else{
			var heightCont=objCont.offsetHeight;
			mitadHeight=parseInt((heightCont-heightDiv)/2);
		}
		if(mitadHeight < 0 || parseInt(mitadHeight) == 0) 
			return;
		objDiv.style.top=mitadHeight+'px';
	};
	/*______________________________________________
	* Centra horizontalmente un div dentro de otro*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.centrarHorizontal=function(idDiv, idDivContenedor){
		var objDiv=null;	//div a centrar
		var objCont=null;	//div contenedor.
		var bBody=false;
		//Validacion:
		//Si no existe el div a centrar nos vamos.
		if(!document.getElementById(idDiv)) return;
		objDiv=document.getElementById(idDiv);
		if(objDiv == null ) return;
		//Si no existe el contenedor pasado, el contenedor es el body del documento.
		if(!document.getElementById(idDivContenedor)){ 
			objCont=document.body;
			bBody=true;
		}else{
			objCont=document.getElementById(idDivContenedor);
			bBody=false;
		}
		var mitadWidth=0;	//variable a calcular.
		var WidthBody =0;
		var WidthDiv=objDiv.offsetWidth;
		//Proceso:
		if(bBody==true){
			switch(true){
			case elNavegador.isIE:
				WidthBody = document.documentElement.scrollWidth;
				break;
			case elNavegador.isNS:
				WidthBody = window.innerWidth;
				break;
			case elNavegador.isOpera:
				break;
			default:
				break;
			}		
			//
			mitadWidth=parseInt((WidthBody-WidthDiv)/2);
		}else{
			var WidthCont=objCont.offsetWidth;
			mitadWidth=parseInt((WidthCont-WidthDiv)/2);
		}
		if(mitadWidth < 0 || parseInt(mitadWidth) == 0) 
			return;
		objDiv.style.left=mitadWidth+'px';
	};
	/*__________________________________________________________
	 * @param idDiv== el div que tiene un contenido a centrar.
	 * ??????
	 * falta validar */
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.centrarTxtEnDiv=function(idDiv, strText){
	try{
		//crear un div
		var dvdDiv = new divs_Dvd();
		var objDiv=document.getElementById(idDiv);
		//guardar el contenido.
		var contenidoDiv=objDiv.innerHTML;
		//crear un div temporal para guardar el contenido en el:
		var objDivTemporal = dvdDiv.crearDiv(dvdDiv.nombreUnico('divTemporalDvd'), idDiv, 1, 1);
		//borrar el contenido del div original.
		//asignar el contenido del div original en el temporal creado.
		objDivTemporal.innerHTML=strText;
		objDivTemporal.style.textAlign='center';	
		//alert(objDivTemporal.id+'---'+String(contenidoDiv)+'--'+objDivTemporal.innerHTML);
		//centrar verticalmente el div temporal creado
		var dvdPosicion=new posiciones_Dvd();
		
		dvdPosicion.centrarVertical(objDivTemporal.id, idDiv);
		dvdPosicion.centrarHorizontal(objDivTemporal.id, idDiv);
		
	}catch(e){
		alert('centrarEnDiv: '+e.message);
	}
	};
}
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
 * 						V A L I D A C I O N 
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
/**
 * @param {*} 
 * @returns 
 */
function validacion_Dvd(elNavegador){
	/*_______________________________________________
	 *  Comprueba la existencia de una variable:
	 *  ---------------------------------------------*/
	this.isset=function(variable_name){		
	try{
		if (typeof(variable_name) != 'undefined'){			
			return true;
		}else{
			return false;			
		}
	}catch(e){
		//alert('Mensaje: isset: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};
	/*______________________________________________
	 * Funcion que elimina los espacios en blanco.
	 * ---------------------------------------------*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.trim=function(cadena){
	try{	
		for(i=0; i<cadena.length; )	{
			if(cadena.charAt(i)==' ')
				cadena=cadena.substring(i+1, cadena.length);
			else
				break;
		}
		for(i=cadena.length-1; i>=0; i=cadena.length-1)	{
			if(cadena.charAt(i)==' ')
				cadena=cadena.substring(0,i);
			else
				break;
		}
		return cadena;
	}catch(e){
		alert('Mensaje: trim: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
};
	/*__________________________________________
	* Comprueba si la funcion esta definida
	* ----------------------------------------*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.isDefined=function(variable){
	try{
	    return (typeof(variable) == 'undefined')?  false: true;
	}catch(e){
		alert('Mensaje: isDefined: '+e.message+'\n'+'Nombre: '+e.name+'\n'+'Valor: '+e.Value);
		return false;
	}
	};

	/**
	 * Entra una cadena y devuelve el tama�o del largo en pixeles
	 * @param {*} 
	 * @returns 
	 */
	this.strWidthEnPixel=function(strAMedir){
		var elDiv = new divs_Dvd();
		var longitudCadena=strAMedir.length;
		var enPix = 0;
		elDiv.crearDiv('iddivcreado', null, 60, 60);
		document.getElementById('iddivcreado').innerHTML=strAMedir;
		//document.getElementById('iddivcreado').style.fontFamily='Courier';
		enPix=document.getElementById('iddivcreado').offsetWidth;
		//alert('en pix: '+enPix);
		elDiv.borrar('iddivcreado', null);
		return parseInt(enPix);
		
	};
	/**
	 * Entra una cadena de texto y devuelve la palabra mayor:
	 * (Para saber si la palabra mayor cabe dentro del div mensaje)
	 * @param {*} 
	 * @returns 
	 */
	this.strPalabraMayor=function(strCadena){
		if(typeof(strCadena)==undefined || strCadena == null || strCadena=='')
			return false;
		var arrPalabras = strCadena.split(' ');
		if(arrPalabras.length<=0) return '';
		var palabraMayor='';
		for(i=0;i<arrPalabras.length;i++){
			if(arrPalabras[i].length > palabraMayor.length)
				palabraMayor=arrPalabras[i];
		}
		return palabraMayor;
	};
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.widthStrDiv=function(idDiv, strCadena, numOtros){
		objDiv=document.getElementById(idDiv);
		if(!objDiv) return false;
		/*___________________________________________________________
		 * Quita de cadena todo lo que est� delimitado por < y > */
		strCadena=strCadena.replace(/<[^>]+>/g,'');
		/*______________________________________
		 * Calcula en pixeles la palabra mayor*/
		var laMayor=this.strPalabraMayor(strCadena);
		var enPix=this.strWidthEnPixel(laMayor);
		/*
		 * Calcula el margin el padding y el borde*/
		var dvdCadena=new cadenas_Dvd();
		var m = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.margin, 'px'));
		var p = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.padding, 'px'));
		var b = parseInt(2*dvdCadena.eliminarSufijo(objDiv.style.border, 'px'));
		
//		alert('div: '+objDiv.offsetWidth+', sin margenes='+parseInt(objDiv.offsetWidth - m - p - b)+' m='+m+', p='+p+' b='+b+
//				'\npix: '+enPix+', asig='+parseInt(enPix+m+p+b)+'\n otros: '+numOtros);
				
		if(isNaN(numOtros)==true || this.trim(numOtros)=='' || numOtros==null) 
			numOtros = 0;
		
		return parseInt(enPix+m+p+b+numOtros);
		if(parseInt(objDiv.offsetWidth - m - p - b - numOtros) < enPix) 
			return parseInt(enPix+m+p+b+numOtros);
		else
			return objDiv.offsetWidth;
	};
	/*______________________________________________________
	 * Valida que la matriz existe y que contiene elementos:*/
	/**
	 * @param {*} 
	 * @returns 
	 */
	this.validaMatriz=function(laMatriz){
		if(laMatriz != null)
			if(typeof(laMatriz)=='object' && laMatriz instanceof Array)
				if(laMatriz.length>0)
					return true;
		return false;
	};

}


/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
 * 							 B R O W S E R   Y    V E R S I O N 
______________________________________________________________________________________
Para preguntar por el navegador dentro de esta clase:
======================================================
switch(true){
	case elNavegador.isIE:
		break;
	case elNavegador.isNS:		
		break;
	case elNavegador.isOpera:
		break;
	default:
		break;
}

fuera, habiendo instanciado un objeto objUtil_Dvd = new utilDvd(); se pregunta por el navegador de esta forma:
================================================================================================================	
	switch(true){
	case objUtil_Dvd.navegador.isIE:
		break;
	case objUtil_Dvd.navegador.isNS:
		break;
	case objUtil_Dvd.navegador.isOpera:
		break;
	default:
		break;
	}
	
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/ 
/**
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * 							N A V E G A D O R     D V D	
 * (PROBADO EN TODOS LOS NAVEGADORES...OPERA, SAFARI, FIREFOX, CHROME, IE)
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * 
var navegador=new navegador_dvd();	//Instancia la clase navegador.
alert(navegador.getNavegador());	//Obtiene string con el nombre del navegador.
alert(navegador.getVersion());		//Obtiene la version con 1 punto pej 12.0
navegador.setPuntos(2);				//Establece los puntos de la version a 2
alert('Version con 2 puntos: '+navegador.getVersion()); //Muestra el resultado despues de establecer la version a 2 puntos.

switch(true){					//Prueba para programar switch del navegador.
case navegador.isChrome:
	alert('chrome');
	break;
case navegador.isFirefox:
	alert('firefox');
	break;
case navegador.isOpera:
	alert('opera');
	break;
case navegador.isSafari:
	alert('safari');
	break;
case navegador.isIE:
	alert('ie');
	break;	
}

switch(true){					//Prueba para saber si es Internet Explorer u otro.
case navegador.isIE:
	alert('prueba simple, es ie');
	break;
case navegador.isNS:
	alert('prueba simple, no es ie');
	break;
default:
	alert('prueba simple, no es ni IE ni NS');
	break;
}
}
 * */

/**
 * CLASE NAVEGADOR PARA IDENTIFICAR EL NAVEGADOR DEL CLIENTE.
 */

/**
 * @param {*} 
 * @returns 
 */
function navegador_dvd(){
	//Pone todos a false cuando se instancia la Clase.
	this.isIE     = false;
	this.isOpera  = false;
	this.isSafari =false;
	this.isFirefox=false;
	this.isChrome =false;
	this.isNS     = false;	//NO IE.	
	/**
	Carga los booleanos.
	Se puede dar el caso que desde un mismo pc accedas con 2 navegadores distintos, pero 
	no en la misma instancia. 
	Por cada Instancia a la clase es un navegador. */
	var is_chrome  	=navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var is_firefox 	=navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	var is_ie		=navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	var is_opera	=navigator.userAgent.toLowerCase().indexOf('opera') > -1;
	var is_safari	=navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	
	if(is_chrome==true){
		this.isChrome=true;
		this.isNS=true;
	}else if (is_firefox==true){
		this.isFirefox=true;
		this.isNS=true;
	}else if(is_ie==true){		
		this.isIE=true;
		this.isNS=false;
	}else if(is_opera==true){
		this.isOpera=true;
		this.isNS=true;	
	}else if(is_safari==true){
		this.isSafari=true;
		this.isNS=true;
	}
	//Atributos del Navegador.
	var version='';
	var palabraClaveVersion='';
	var puntosVersion=1;
	var enMin=navigator.userAgent.toLowerCase();	
/*
 * Obtiene la version del navegador:*/
/**
 * @param {*} 
 * @returns 
 */
this.getVersion=function(){
	var claveVersion='';
	
	if(is_chrome==true){
		claveVersion='chrome/';
	}else if (is_firefox==true){ 
		claveVersion='firefox/';
	}else if(is_ie==true){
		claveVersion='msie ';
	}else if(is_opera==true){
		claveVersion='version/';
	}else if(is_safari==true){ 
		claveVersion='version/';
	}else{		
		return false;
	}
	var enMin=navigator.userAgent.toLowerCase();
	var sumaPuntos=0;
	var indice=enMin.indexOf(claveVersion);
	if(indice<0) return;						
	var laVersionTot=enMin.substring(indice+claveVersion.length, indice+claveVersion.length+10);
	var version=String('');
	
	for(i=0;i<laVersionTot.length;i++){
		var caracter = laVersionTot.charAt(i);
		if(caracter=='.'){
			sumaPuntos++;
			if(sumaPuntos>puntosVersion){				
				break;
			}else{
				version=version+caracter;
			}
		}else if (isNaN(caracter) && sumaPuntos!=0){
			break;
		}else{
			version=version+caracter;
		}
//		alert(version);
}
	return version;
};
/*
* Obtiene el navegador*/
/**
 * @param {*} 
 * @returns 
*/
this.getNavegador=function(){	
	var retorno='';
	//
	if(is_chrome==true){
		claveVersion='chrome/';		//por si...
		retorno="Chrome";
	}else if (is_firefox==true){
		claveVersion='firefox/';	//por si...
		retorno="Firefox";
	}else if(is_ie==true){		
		claveVersion='msie ';	//por si...
		retorno="Internet Explorer"
	}else if(is_opera==true){
		claveVersion='version/';	//por si...
		retorno="Opera";
	}else if(is_safari==true){
		claveVersion='version/';	//por si...
		retorno="Safari";
	}else{		
		return false;
	}
	return retorno;
	
};
/**
 * @param {*} 
 * @returns 
 */
this.setPuntos=function(bValor){
	if(bValor<=0||bValor>=4) bValor=1;
	puntosVersion=bValor;
};
}