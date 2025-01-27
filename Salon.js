//1  SALON tiene n RESERVAS.
//1 RESERVA tiene 1 MESA
//1 MESA tiene n SQUAD.
//1 MESA tiene n sillas.
//1 MESA de 1 SQUAD tiene 4 sillas. 1 MESA de 2 SQUAD tiene 6 sillas. 1 MESA de 3 SQUAD tiene 8 sillas.   SILLAS=SQUAD*2+2

const NUM_INI_MESAS=0;
const NUM_INI_SILLAS=0;
const NUM_INI_SQUAD=0;
let mesasTot=0;
let sillasTot=0;
//////////////////////////////////////////////////////////////////////////////////
//
//===  ===

//
//=== ESTABLECE EL DRAG AND DROP PARA LOS DIVS ----DE MOMENTO SIN USO---- ===
function setDrag(objToDrag, func_On ) {}
//
//=== PONE EN "" EL TEXT DEL FOMULARIO DE NUMERO DE SILLAS A INSERTAR DE UNA VEZ. ===
function resetSillasForm() {
    let form = document.getElementById('FormMenuUP');
    form.reset();
    
}
function AddCOLs(){
    let num = document.getElementById('Txt_NCOL').value;
    document.getElementById('Contenedor1').style.gridTemplateColumns = "repeat("+num+", 1fr)";
}

function AddSillas(){
    let sillasToAdd = document.getElementById('Txt_NSillas').value;
    sillasToAdd=parseInt(sillasToAdd);
    if(typeof(sillasToAdd)!='number') return;
    if(sillasToAdd>1000) return;
    if(sillasToAdd>0){
        elSaloon.AddDivs(sillasToAdd);
    }else{
        elSaloon.KillDivs(elSaloon.cuantos-sillasToAdd-1 , elSaloon.cuantos)
    }
    cuentaS_To_Menu();
}
//
//=== Drop Mesa->Salon === 
//data = mesatosalon
function Mesa_To_Baldosa(laMesa=null,laBaldosa=null ) {    
    const unClon= laMesa.cloneNode();
    console.log(laMesa.id);
    unClon.id=creaSEQ('Mesa');
    //
    //=== Lo hace Movible ===
    //unClon.draggable="true";    
    //
    //===Tamaño y posicion en la celda. el centrado se hace por css.
    unClon.style.height="5vh";
    laBaldosa.style.padding = '0px';
    //
    //el padre del clon antes de hacer appendChild es null.
    //El padre del div imgMesa es el div MESA en html    
    laBaldosa.appendChild(unClon);
    console.log('Padre de la mesa Despues(molde a salon): '+unClon.parentNode.id);
    //
    mesasTot++;
    cuentaS_To_Menu();
}
//
//===  ===
function Silla_To_Baldosa(laSilla=null,laBaldosa=null) {
    const unClon= laSilla.cloneNode();
    unClon.id=creaSEQ('Silla')
    //unClon.draggable="true";
    unClon.style.height="5vh";
    laBaldosa.style.padding = '0px';
    //laBaldosa.style.margin='0px';
    laBaldosa.appendChild(unClon);
    //
    sillasTot++;
    cuentaS_To_Menu();
}

//
//===  ===
function MesaEnSalon_To_Baldosa(laMesa=null,laBaldosa=null){
    console.log('la mesa: '+laMesa.src +', la baldosa: '+laBaldosa.id);
    console.log('Padre de la mesa antes: '+laMesa.parentNode.id);
    //laMesa.style.height="30px";
    laBaldosa.style.padding = '0px';
    laBaldosa.appendChild(laMesa);
    console.log('Padre de la mesa despues: '+laMesa.parentNode.id);
}
//
//===  ===
function SillaEnSalon_To_Baldosa(laSilla=null,laBaldosa=null) {    
    console.log('Silla_En_Salon to Baldosa del salon');
    //
    //=== VALIDA SI DESTINO VACIO
    console.log('Contenido en Baldosa= '+laBaldosa.innerText);
    if(laBaldosa.innerText.trim==''){console.log('Baldosa Vacia!!!!!!!!!!!!!!!!!!!!!!!!!!!');}
    if(laBaldosa.childNodes==null){
        console.log('Baldosa Vacia!!');
    }else{
        console.log('Baldosa Llena!! '+laBaldosa.childNodes.length);
    }
    //
    //=== ACCION REAL === 
    laBaldosa.style.padding = '0px';
    laBaldosa.appendChild(laSilla);
}
//
//===  ===
function Silla_Click(laSilla=null) {
    console.log('Silla Click');
    //(Panel-Tool) Tip Info alergia.
    //Prepara Drag para Mover.
}
//
//=== toolTip Info alergia ===
function Silla_Over(laSilla=null) {
    console.log('Silla Over');
}
//
//=== ELIMINA SILLA ===
function Silla_To_Puerta(laSilla=null) {
    console.log('Silla To Puerta');    
}
//
//=== ELIMIA MESA ===
function Mesa_To_Puerta() {
    console.log('Mesa To Puerta');
    //Mensaje Confirmacion.
    // Elimina Reserva.
}
//===================COPYPASTE===CUTPASTE========================================================================
//
function CopyPaste(objDrag=null,objDrop=null){
    const unClon= objDrag.cloneNode();
    unClon.id=creaSEQ('Silla')
    unClon.draggable="true";
    unClon.style.height="30px";
    objDrop.style.padding = '10px';
    //laBaldosa.style.margin='0px';
    objDrop.appendChild(unClon);
}
//
//
function CutPaste(objDrag=null,objDrop=null){        
    if(objDrop.childNodes.length<=0){
        console.log('Baldosa Vacia!!');
    }else{
        console.log('Baldosa Llena!! '+objDrop.childNodes.length);
    }
    objDrop.appendChild(objDrag);    
}//======================================================================================================

/**
 * Encuentra un nombre unico para uno que entra sujerido.
 * add _num al final del nombre para encontrarlo............no usado.....revisar.
 * @param {*} strAux 
 * @returns 
 */
function creaSEQ(strAux = '') {
    if (typeof (strAux) != 'string') return false;
    if (strAux.length <= 2) return false;	//mínimo 2 letras.
    //
    //Working Procedure:........................>
    for (let i = 0; ; i++) {
        if (!document.getElementById(strAux + '_' + i))
            return (strAux + '_' + i);
    }
}
//
//
function cuentaS_To_Menu(){
    document.getElementById('LBLnumMesas').innerText='('+mesasTot+')';
    document.getElementById('LBLnumSillas').innerText='('+sillasTot+')';
    document.getElementById('TotalBaldosas').innerText=elSaloon.cuantos;
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// ===============================================================================>
// ============================== DRAG AND DROP ==================================>
// ===============================================================================>

    //::: Xa permitir que la posición suelte los elementos.
    function AllowDrop(ev) {
        ev.preventDefault();
    }
    //
    //::: Xa elegir el elemento a capturar o arrastrar.
    function dragStart(ev) {
        ev.dataTransfer.setData("text", ev.target.id);  //el registrador del movimiento.
        //
        const objDrag = document.getElementById(ev.dataTransfer.getData("text"));
        console.log('\nDrag Start::: ' + ev.target.id + '\t|| objDrag: ' + objDrag.id);
    }
    //______________________________
    //::: LLEGA ALGUIEN AL SALON :::
    function DropSalon(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        //
        //Cacha el objeto que se mueve(objDrag) y el objeto donde cae(objDrop)
        const objDrag = document.getElementById(ev.dataTransfer.getData("text"));
        const objDrop = ev.target;
        //const objDrop=document.getElementById(ev.target.id);
        console.log('DropSalon::: ObjetoDrop: ' + objDrop.id + ' \t || Objeto Drag: ' + objDrag.id);
        //
        //=== QUIEN LLEGA ?? ====
        switch (objDrag.id) {
            case "imgSillaMenu":
                console.log('MenuSilla->Baldosa');
                //Silla_To_Baldosa(objDrag, objDrop);
                Silla_To_Baldosa(sillaToClone, objDrop);
                break;
            case "imgMesaMenu":
                console.log('MenuMesa->Baldosa');
                //Mesa_To_Baldosa(objDrag , objDrop);
                Mesa_To_Baldosa(mesaToClone, objDrop);
                break;
            default:
                if (data.lastIndexOf('Mesa') >= 0) {
                    console.log('MesaEnSalon->Baldosa');
                    MesaEnSalon_To_Baldosa(objDrag, objDrop);
                    //MesaEnSalon_To_Baldosa(mesaToClone , objDrop);
                } else if (data.lastIndexOf('Silla') >= 0) {
                    console.log('SillaEnSalon->Baldosa');
                    SillaEnSalon_To_Baldosa(objDrag, objDrop);
                }
                break;
        }

    }
    //
    //::: QUIEN LLEGA A LA PUERTA ::: Se tienen que soltar las sillas o mesas colocadas en el SALONPPAL
    //::: ev.dataTransfer.getData("text") ,  Id del elemento drap(imgSillaMenu, imgMesaMenu, o #SillaEnSalon, #MesaEnSalon ).
    //::: ev.target , es el objeto, 
    function DropPuerta(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        //
        //Cacha el objeto que se mueve(objDrag) y el objeto donde cae(objDrop)
        const objDrag = document.getElementById(ev.dataTransfer.getData("text"));
        const objDrop = ev.target;
        console.log('DropPuerta::: ObjetoDrop(Puerta): ' + objDrop.id + ' \t || Objeto Drag(a eliminar): ' + objDrag.id);
        //
        //::: Los Que No :::
        if (objDrag.id == 'imgSillaMenu' || objDrag.id == 'imgMesaMenu')
            return;
        //    
        //Venga de quien venga, la puerta elimina todo lo que la atraviesa. 
        objDrop.appendChild(objDrag);
        objDrop.removeChild(objDrag);
        //
        //=== QUIEN LLEGA 
        if (objDrag.id.lastIndexOf('Mesa') >= 0) {
            console.log('MesaEnSalon->Puerta');
            mesasTot--;
            //
            //=== Elimina una Mesa.
        } else if (data.lastIndexOf('Silla') >= 0) {
            console.log('SillaEnSalon->Puerta');
            //
            //=== Elimina una Silla.
            sillasTot--;
        }
        cuentaS_To_Menu();
    }
    //
    //::: QUIEN LLEGA A LA MESA ::: Se tienen que soltar las sillas o mesas colocadas en el SALONPPAL
    //::: ev.dataTransfer.getData("text") ,  Id del elemento drap(imgSillaMenu, imgMesaMenu, o #SillaEnSalon, #MesaEnSalon ).
    //::: ev.target , es el objeto, 
    function DropMesa(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        //
        //Cacha el objeto que se mueve(objDrag) y el objeto donde cae(objDrop)
        const objDrag = document.getElementById(ev.dataTransfer.getData("text"));
        const objDrop = ev.target;
        console.log('DropMesa::: ObjetoDrop(Puerta): ' + objDrop.id + ' \t || Objeto Drag: ' + objDrag.id);
        //
        //::: Valida que no se tiren ni la mesa ni la silla del "nav"
        if (objDrag.id == 'imgMesaMenu') return;
        //
        switch (objDrag.id) {
            case "imgSillaMenu":
                console.log('Silla->Mesa');
                break;
            default:
                break;
        }
    }
// ===============================================================================]
// =========================== FIN DRAG AND DROP =================================]
// ===============================================================================]



/**=========================================================================
* 	                        OBJETO RESERVA.
============================================================================*/
//      UN ARRAY DE SQUARES (divs de MESA DE CLIENTES)
//      UN ARRAY DE SILLAS (DIVxDIV)
class LARESERVA {
    numSillas=0;        //lasSillas.ArrayDIVBASE.length; numero total de sillas del array.
    arrSillas 

    numSQ=0;                //Modulos mesa que representan 1 Reserva.
    arraySQs = new Array(); //Array de divs de modulos mesa necesarios.  numSillas=numSQ*2+2; numSQ=(numSillas-2)/2

    arrReservas = [];
	constructor() {
    
	}
	//.........................FIN CONSTRUCTOR..........................
	//******************************************************************
    /**
     * 
     * @param {*} divToClone Div a Clonar.
     * @param {*} elDivContainer  Div Contenedor donde voy a meter el Clon creado.
     * @returns el Clon recien creado.
     *          false, si hay algún error.
     */
    Clon(divToClone=null, elDivContainer=null) {
        //
        //Validacion:
        if(!document.getElementById(divToClone.id)) return false;
        const idNode=divToClone.id;    
        try {
            //Creacion del clon.
            var elClon = divToClone.cloneNode(true);
            elClon.id = idNode;
            //
            if (!elClon.id) throw ("Error creaClon() CLON");
            /*________________________________
            * Anadir el clon al contenedor.*/
            elDivContainer.appendChild(elClon);
            return elClon;
        } catch (e) {
            return false;
        }
    }

    
}   ////////////////// FIN CLASE ///////////////////////
////////////////////// FIN CLASE ///////////////////////

