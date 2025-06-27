// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// • CLASS  Head_Drive							► Clase para gestionar el Head de la Web Dinamicametne. 
// • CLASS  Work_ClassName 						► Clase para gestionar el Head de la Web DInamicamente a nivel de clases para objetos div.
// • CLASS  Div_X_Div extends Work_ClassName	► Clase principal para la gestión de archivos DIVX.
// • CLASS  CLASS_navegador						► Detecta navegador y su version.
// • CLASS  Data_File_Formal					► Estructura de datos para la clase File_Formal.
// • CLASS  File_Formal							► Trabaja rutas validas.
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

// CONSTANTES GLOBALES PARA CREAR ELEMETOS EN EL HEADER.
const IDLINK_XDEF 	= 'IDLINK_NONAME';		//EL ID PARA LOS LINK CREADOS...POR DEFECTO 	• • • • [Head_Drive][Work_ClassName]
const IDSCRIPT_XDEF = 'IDSCRIPT_NONAME';	//EL ID PARA LOS SCRIPT CREADOS...POR DEFECTO   • • • • [Head_Drive]

// CONSTATES DE TAG HEAD DE LINKS Y SCRIPTS
const CSS_TYPELINK 	= 'text/css';
const CSS_RELLINK 	= 'stylesheet';
const CSS_TYPESCRIPT = "text/javascript";
const CSS_HREF_LINK  = './estilos/styleDvd.css';	//Path al archivo .css POR DEFECTO

// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
//  C L A S E  		Head_Drive
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/*	
	- ■ Clase que tiene que realizar las operaciones sobre el Head...con archivos .css y .src 
		■ ■ CREA 
		■ ■ MODIFICA 
		■ ■ ELIMINA nodos en el HEAD   	
*/
class Head_Drive {
	/**
		 ■ Cuando se instancia esta clase, se genera un Tag-Link en el constructor, esto genera:
				1• un idLink ( 'idLinkHtml_DVD_0' ) 
				2• un .css  ('./estilos/styleDvd.css' )  ... El css tiene las clases tb ctes 
		  • • • A partir de aquí se puede cambiar de fichero, cambiar de clases y cambiar de idLink
		  
		 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			<LINK     Id=IDLINK_XDEFLINK  Rel="stylesheet"    Href=CSS_HREFLINK    Type="text/css" /> 
		 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	*/
	tagHEAD = '';		// ► PARA CACHAR EL HEAD DE LA WEB...O CREAR UNO.
	bootStrap = {		// ► datos para incluir BootStrap.
		Meta: {
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		Link: {
			href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
			rel: 'stylesheet',
			integrity: 'sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65',
			crossorigin: 'anonymous'
		},
		Script: {
			src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
			integrity: "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4",
			crossorigin: "anonymous"
		}

	};
	/**________________________________________________________________________________________________
	* 	Crea una etiqueta <head> en caso de que no hubiera una 
	*	...y si ya hay un head(lo normal) LO REGISTRA (this.tagHEAD)
	 '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
	constructor() {
		//constructor() {
		//if (!strUrl_CSS || typeof (strUrl_CSS) != 'string') strUrl_CSS = CSS_HREF_LINK;
		//
		if (!document.getElementsByTagName('HEAD')[0]) {
			console.log('Crear Head a mano.');
			const headCreado = document.createElement("HEAD");
			this.tagHEAD = headCreado;
		} else {
			this.tagHEAD = document.getElementsByTagName('HEAD')[0]; // Get HTML head element
		}
	}

	/**
	 * Funcion PPal para añadir un Nodo Script o Link en el Head. Se pueden poner familias de ID.
	 * @param {*} urlTag String Url del nodo a añadir.
	 * @param {*} id String familia de Id que se pasa para que se genere un secuencial
	 * @returns el Nodo recien añadido.
	 * 			false si no se ha podido añadir.
	 */
	add_etiqueta(urlTag = '', id = '') {
		try {
			const ffURL_ToSearch = new File_Formal(urlTag);		//pruebo a ver si lo introducido es una ruta:
			if (!ffURL_ToSearch || ffURL_ToSearch.FileData.isValid == false) throw ('Error en el Argumento: [' + urlTag + ']');
			//
			const ext = ffURL_ToSearch.FileData.INTRO_extension;
			switch (ext.toUpperCase()) {
				case '.JS':
					return this._add_script(urlTag, id);
				case '.CSS':
					return this._add_link(urlTag, id);
				default:
					return false;
			}
		} catch (error) {
			console.log(error.message);
			return false;
		}
	}
	/**
	 * :::: https://html.spec.whatwg.org/multipage/links.htmlbody-ok
	 * @param {*} strUrl_CSS 
	 * @param {*} sizes 
	 * @param {*} ref 
	 * @param {*} media 
	 * @returns 
	 */
	_add_link(strUrl_CSS = CSS_HREF_LINK, id = '', sizes = '', ref = '', media = '', integrity = '', crossorigin = '') {
		try {
			//::: Si no pasa url le asigno './estilos/styleDvd.css'
			if (!strUrl_CSS || typeof (strUrl_CSS) != 'string') strUrl_CSS = CSS_HREF_LINK;
			//
			//::: Busca el link por si hay algun repetido. Devuelve el nodo encontrado o false.
			const nodeLinkAux = this.search(strUrl_CSS);
			//
			//::: Append link elemento to HTML Head y retorna el nodo.
			if (nodeLinkAux == false) {
				const nodeLink = this._crear_node_link(strUrl_CSS, id, sizes, ref, media);			// Create new link Element					
				if (!nodeLink) return false;
				//
				//::: Valida que se meta una extension .css con un nodo Link 
				if (!this._validaExtension_LINK(strUrl_CSS)) return false;
				//
				//::: Añado el nodo al Head
				this.tagHEAD.appendChild(nodeLink);
				console.log('Link [' + strUrl_CSS + '] Cargado OK!!');	//???????????
				return nodeLink;
			}
			throw ('esta Url LINK ya está cargada. No admito duplicados: [' + strUrl_CSS + ']')
		} catch (error) {
			console.log("\n\t---------->Mensaje Error:: CLASE (Head_Drive):: METODO (_add_link) ::Mensaje= " + error.message + '\n');
			return false;
		}
	}
	/**
	 * La pasas la configuracion de un link y devuelve uno recien creado.
	 * utilizo la clase File_Formal para validar y usar la ruta introducida.	 * 
	 * @param {*} strUrl_CSS URL del archivo que quieres linkear.
	 * @param {*} sizes propiedad '.sizes' de los tagElement('LINK')
	 * @param {*} ref propiedad '.ref' de los tagElement('LINK') 
	 * @param {*} media propiedad '.mediaa' de los tagElement('LINK')
	 * @returns false si no se ha podido crear el link(ruta en formato no valido). 
	 * link en caso de poder crearlo.
	 */
	_crear_node_link(strUrl_CSS = '', id = '', sizes = '', ref = '', media = '') {
		try {
			if (!strUrl_CSS || typeof (strUrl_CSS) != 'string') strUrl_CSS = CSS_HREF_LINK;
			//
			//::: Creo la clase File_Formal para trabajar con la url introducida.
			const ffURL_ToSearch = new File_Formal(strUrl_CSS);	//pruebo a ver si lo introducido es una ruta:
			if (!ffURL_ToSearch.FileData.isValid) return false;			//validacion de la ruta introducida.
			//
			let link = document.createElement('LINK');			// Create new link Element	
			//
			//::: Para introducir un id a mano o si no se introduce cogemos el Xdefecto(IDLINK_XDEF)
			if (id)
				link.id = this._get_Secuencial(id); 	//Puedes poner un id individual.
			else
				link.id = this._get_Secuencial(IDLINK_XDEF);

			link.rel = CSS_RELLINK;				// set the attributes for link element ...."apple-touch-icon-precomposed"
			link.type = CSS_TYPELINK;			// "image/png"
			//::: 
			link.href = ffURL_ToSearch.getUrlRelativa();		//Esta funcion en lugar de getUrl() asegura que se encuentra el camino hasta el archivo.
			//
			if (sizes) link.sizes = sizes; 	//link.sizes="114x114"
			if (ref) link.ref = ref; 			//link.ref="mobile.css"
			if (media) link.media = media; 	//link.media="screen and (max-width: 600px)" />
			//
			return link;
		} catch (error) {
			return false;
		}

	}
	/**
	 * La pasas la configuracion de un link y devuelve uno recien creado.
	 * utilizo la clase File_Formal para validar y usar la ruta introducida.	 * 
	 * @param {*} strUrl_CSS URL del archivo que quieres linkear.
	 * @param {*} sizes propiedad '.sizes' de los tagElement('LINK')
	 * @param {*} ref propiedad '.ref' de los tagElement('LINK') 
	 * @param {*} media propiedad '.mediaa' de los tagElement('LINK')
	 * @returns false si no se ha podido crear el link(ruta en formato no valido). 
	 * link en caso de poder crearlo.
	 */
	_load_node_BootStrap(objHead = null, objBody = null) {
		try {
			if (!strUrl_CSS || typeof (strUrl_CSS) != 'string') strUrl_CSS = CSS_HREF_LINK;
			//
			//::: Creo la clase File_Formal para trabajar con la url introducida.
			const ffURL_ToSearch = new File_Formal(strUrl_CSS);	//pruebo a ver si lo introducido es una ruta:
			if (!ffURL_ToSearch.FileData.isValid) return false;			//validacion de la ruta introducida.
			//
			let bootStrapLINK = document.createElement('LINK');
			bootStrapLINK.rel = this.bootStrap.Link.rel;
			//bootStrapLINK.integrity = this.bootStrap.Link.integrity;
			bootStrapLINK.href = this.bootStrap.Link.href;
			//bootStrapLINK.crossorigin = this.bootStrap.Link.crossorigin;
			//
			let bootStrapSCRIPT = document.createElement('SCRIPT');
			bootStrapSCRIPT.src = this.bootStrap.Script.src;
			//bootStrapSCRIPT.integrity = this.bootStrap.Script.integrity;
			//bootStrapSCRIPT.crossorigin = this.bootStrap.Script.crossorigin;
			//
			let bootStrapMETA = document.createElement('META');
			bootStrapMETA.name = this.bootStrap.Meta.name;
			bootStrapMETA.content = this.bootStrap.Meta.content;
			//
			//
			let MetaTags = document.getElementsByTagName('meta');
			let metaTagLength = MetaTags.length;
			for (let i = 0; i < metaTagLength; i++) {
				console.log(i);
			}

			//
			if (objHead) {
				objHead.appendChild(bootStrapMETA);
				objHead.appendChild(bootStrapLINK);
			}
			if (objBody) {
				objBody.appendChild(bootStrapSCRIPT);
			}
		} catch (error) {
			return false;
		}

	}
	/**
	 * @see * https://developer.mozilla.org/es/docs/Web/SVG/Element/script
	 * @param {*} str_SRC_Script  Url del script(.js)
	 * @param {*} id 
	 * @param {*} async 
	 * @param {*} integrity 
	 * @param {*} crossorigin 
	 * @called 	► this.add_etiqueta() 
	 * @example: 	► return this._add_script(str_SRC_Script = urlTag, id);
	 * @returns 1• False si hay un error estructural.
	 * 		 	2• null si no se ha podido crear.
	 * 		 	3• El script creado que se ha metido en el HEAD. ► <script type='text/javascript' src='./CLASS_navegador.js'></script>
	 */
	_add_script(str_SRC_Script = '', id = '', async = false, integrity = '', crossorigin = '') {
		//
		//::: VALIDA EXISTENCIA DEL ULR (true o false)
		const nodeScriptAux = this.search(str_SRC_Script);
		//Posicion del Node dentro de Head.
		if (nodeScriptAux == false) {
			const nodeScript = this._crear_node_script(str_SRC_Script, id, async, integrity, crossorigin);				//::: Creo un script
			if (!nodeScript) return false;
			if (!this._validaExtension_SCRIPT(str_SRC_Script)) return false;

			this.tagHEAD.appendChild(nodeScript);
			console.log('Script [' + str_SRC_Script + '] Cargado OK!!');
			return nodeScript;
		}
		console.log('Script [' + str_SRC_Script + '] No se ha Cargado, ya estaba entre los Scripts ;) ');
		return false;
	}
	
	/**
	 * 
	 * @param {*} str_SRC_Script propiedad .src del script
	 * @param {*} id
	 * @returns 
	 */
	_crear_node_script(str_SRC_Script = '', id = '', async = false, integrity = '', crossorigin = '') {
		//
		//::: Creo la clase File_Formal para trabajar con la url introducida.
		const ffURL_ToSearch = new File_Formal(str_SRC_Script);	//pruebo a ver si lo introducido es una ruta:
		if (!ffURL_ToSearch.FileData.isValid) return false;			//validacion de la ruta introducida.
		//
		const tagScriptAux = document.createElement("SCRIPT");
		tagScriptAux.type = CSS_TYPESCRIPT;	//text/javascript, text/ecmascript, application/javascript, y application/ecmascript
		//
		if (id)
			tagScriptAux.id = this._get_Secuencial(id); 	//Puedes poner un id individual.
		else
			tagScriptAux.id = this._get_Secuencial(IDSCRIPT_XDEF);
		//
		tagScriptAux.src = ffURL_ToSearch.getUrlRelativa();
		//
		if (async) tagScriptAux.async = async;
		if (integrity) tagScriptAux.integrity = integrity;
		if (crossorigin) tagScriptAux.crossorigin = crossorigin;
		return tagScriptAux;
	}

	/**
	 * Funcion PPal para añadir un Nodo Title en el Head. 	 * 
	 * @param {*} strTextoTagTitle (string. El título en sí)
	 * @param {*} idTitle id de titulo(opcional)
	 * @param {*} b_machaca = false, no machaca el  titulo si ya este existe.
	 * 								= true, machacha el titulo aunque exista.
	 */
	addTITLE(strTextoTagTitle, idTitle = '', b_machaca = false) {
		try {
			if (!strTextoTagTitle || typeof (strTextoTagTitle) != 'string') throw ('error en el tipo de  Argumento: ');
			//
			const tituloEncontrado = this.searchTITLE(strTextoTagTitle);
			if (!tituloEncontrado) {		//si no existe, lo creo.
				const tagTitleAux = this._crearNodeTITLE(strTextoTagTitle, idTitle);
				return tagTitleAux;
			} else {
				if (b_machaca == false) {
					throw ('Head_Drive::addTITLE::Titulo ya insertado! No quiero duplicados ;(');
				} else {
					//eliminar el existente.
					this.tagHEAD.removeChild(tituloEncontrado);
					//añadir el nuevo.
					const tagTitleAux = this._crearNodeTITLE(strTextoTagTitle, idTitle);
					return tagTitleAux;

				}
			}
		} catch (error) {
			return false;
		}
	}
	
	/**
	 * 
	 * @param {*} strTextoTagTitle 
	 * @param {*} idTitle 
	 * @returns 
	 */
	_crearNodeTITLE(strTextoTagTitle = '', idTitle) {
		const tagTitleAux = document.createElement("title");
		tagTitleAux.text = strTextoTagTitle;
		if (idTitle != '' || typeof (idTitle) == 'string')
			tagTitleAux.id = idTitle;
		this.tagHEAD.appendChild(tagTitleAux);
		console.log('HEADDRIVETITLE::Titulo insertado Ok :)');
		return tagTitleAux;
	}
	
	/**
	 * Actualiza una Url(Link o Script) de un Nodo del Head. Se mantiene el ID
	 * @param {*} strOld ID o String de la ruta de un archivo(.js o .css) que tiene que estar en el Head.
	 * @param {*} urlNew String que representa la Url que quiero sustituir 
	 * @returns El nuevo Nodo con la Url Actualizada y la misma ID. (Crea un nuevo nodo y le mete la ID antigua).
	 * 			false, si allgo falla
	 * 			
	 */
	updateURL(strOld, urlNew = '') {
		const elNodoViejo = this.search(strOld);
		let elNodoNuevo = this.search(urlNew);
		if (elNodoViejo == false) return false;	//Valida que el Nodo a Cambiar(el viejo), Existe. search(strOld)->elNodoViejo==true
		if (elNodoNuevo != false) return false;	//Valida que el Nuevo Nodo NO está ya en el Head. search(urlNew)->elNodoNuevo==false
		//
		//::: CACHO la extension del nodo Viejo... 
		let extensionNodoViejo = '';
		if (elNodoViejo.nodeName == 'SCRIPT') {
			extensionNodoViejo = elNodoViejo.src.substring(elNodoViejo.src.lastIndexOf('.'), elNodoViejo.src.length);
		} else if (elNodoViejo.nodeName == 'LINK') {
			extensionNodoViejo = elNodoViejo.href.substring(elNodoViejo.href.lastIndexOf('.'), elNodoViejo.href.length);
		} else {
			return false;
		}
		//::::CATCH la extension de la url Nueva...
		const ffURL_ToSearch = new File_Formal(urlNew);								//pruebo a ver si lo introducido es una ruta:
		if (!ffURL_ToSearch || ffURL_ToSearch.FileData.isValid == false) return false;		//throw ('Error en el Argumento: ['+strToSearch+']');		 
		const extensionNodoNuevo = ffURL_ToSearch.FileData.INTRO_extension;
		//
		//::: COMPARO LAS EXTENSIONES. Tienen que tener = Extension.
		if (String(extensionNodoNuevo).toUpperCase() != String(extensionNodoViejo).toUpperCase()) return false;
		//
		//::: CREO el nuevo NODO. 
		if (elNodoViejo.nodeName == 'SCRIPT') {
			elNodoNuevo = this._crear_node_script(ffURL_ToSearch.getUrlRelativa(), elNodoViejo.id, elNodoViejo.async);
		} else if (elNodoViejo.nodeName == 'LINK') {
			elNodoNuevo = this._crear_node_link(ffURL_ToSearch.getUrlRelativa(), elNodoViejo.id, elNodoViejo.sizes, elNodoViejo.ref, elNodoViejo.media);
		}
		//::: Dejo el Id del nodo encontrado, por eso es una actualizacion, cambia todo menos el id.
		elNodoNuevo.id = elNodoViejo.id;
		//
		//::: Sustituyo un Nodo por otro.
		this.tagHEAD.replaceChild(elNodoNuevo, elNodoViejo);	//Reemplazo uno por otro.
		return elNodoNuevo;
	}	

	/**
	 * 
	 * @param {*} strToSearch String que supuestamente debe contener una Url que 
	 * @returns 
	 */
	_validaExtension_LINK(strToSearch = '') {
		//:::Buscamos el nodo con search(). Busca tanto por ID como por URL
		const nodoHead = this.search(strToSearch);
		if (nodoHead == false) {	//No existe el nodo en el Head...Ergo tampoco ha pasado ID del Head. 
			//::::Cojo la extension de la url Nueva...
			const ffURL_ToSearch = new File_Formal(strToSearch);								//pruebo a ver si lo introducido es una ruta:
			if (!ffURL_ToSearch || ffURL_ToSearch.FileData.isValid == false) return false;		//throw ('Error en el Argumento: ['+strToSearch+']');		 
			const extensionNodo = ffURL_ToSearch.FileData.INTRO_extension;
			if (String(extensionNodo).toUpperCase() == '.CSS') return true;
			return false;
		}
		//::: 
		let extensionNodoHead = '';
		if (nodoHead.nodeName == 'LINK') {
			extensionNodoHead = nodoHead.href.substring(nodoHead.href.lastIndexOf('.'), nodoHead.href.length);
			if (extensionNodoHead == '.CSS')
				return true;
			else
				return false;
		} else {
			return false;
		}
	}
	/**
	 * 
	 * @param {*} strToSearch String que supuestamente debe contener una Url que 
	 * @returns 
	 */
	_validaExtension_SCRIPT(strToSearch = '') {
		//:::Buscamos el nodo con search(). Busca tanto por ID como por URL
		const nodoHead = this.search(strToSearch);
		if (nodoHead == false) {	//No existe el nodo en el Head...Ergo tampoco ha pasado ID del Head. 
			//::::Cojo la extension de la url Nueva...
			const ffURL_ToSearch = new File_Formal(strToSearch);								//pruebo a ver si lo introducido es una ruta:
			if (!ffURL_ToSearch || ffURL_ToSearch.FileData.isValid == false) return false;		//throw ('Error en el Argumento: ['+strToSearch+']');		 
			if (String(ffURL_ToSearch.FileData.INTRO_extension).toUpperCase() == '.JS') return true;
			return false;
		}
		//::: 
		let extensionNodoHead = '';
		if (nodoHead.nodeName == 'SCRIPT') {
			extensionNodoHead = nodoHead.src.substring(nodoHead.src.lastIndexOf('.'), nodoHead.src.length);
			if (extensionNodoHead == '.JS')
				return true;
			else
				return false;
		} else {
			return false;
		}
	}
	/**Actualiza el Title del HEAD.
	 * @param {*} textoTitleOld String del Titulo actual  a cambiar.
	 * @param {*} textoTitleNew String del Nuevo título que se quiere poner en la Pagina.
	 * @returns true=Cambiado con exito.
	 * 			false=No cambiado.
	 */
	updateTagTITLE(textoTitleOld, textoTitleNew = '') {
		try {
			if (!textoTitleOld || typeof (textoTitleOld) != 'string') throw ('error en el tipo de  Argumento: ');
			if (!textoTitleNew || typeof (textoTitleNew) != 'string') throw ('error en el tipo de  Argumento: ');
			//
			let childNodes = this.tagHEAD.childNodes;
			if (!childNodes) return false;					//retorna false si no hay childNodes
			for (let i = 0; i < childNodes.length; i++) {
				if (childNodes[i].text == textoTitleOld) {
					if (childNodes[i].nodeName) {
						childNodes[i].text = textoTitleNew;				//para script
						return true;
					}
				}
			}
			return false;
		} catch (error) {
			console.log('msgError==>' + error.message)
			return false;
		}
	}

	//=================METODOS DE ELIMINACION O BORRADO===========================
	//============================================================================
	/**
	 * Borra un node del Head
	 * @param {*} strToSearch Url o Id a borrar. 
	 * @returns el Nodo recien borrado.
	 * 			false si hay un error.
	 */
	delete(strToSearch) {
		try {
			const nodeToDelete = this.search(strToSearch);
			if (!nodeToDelete) return false;
			this.tagHEAD.removeChild(nodeToDelete);
			return nodeToDelete;
		} catch (error) {
			return false;
		}
	}

	/**__________________________________________________________
	 * Elimina una etiqueta TITLE según su TITULO.
	 * ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
	/**
	 * elimina un titulo
	 * @param {*} textoTitleBuscar texto del titulo que se quiere eliminar.
	 * @param {*} isQueContiene booleano que indica si tiene que ser coincidencia exacta o "que contiene"
	 * @returns 
	 */
	deleteTITLE(textoTitleBuscar, isQueContiene = false) {
		try {
			if (!textoTitleBuscar || typeof (textoTitleBuscar) != 'string') throw ('error en el tipo de  Argumento: ');
			//
			let childNodes = this.tagHEAD.childNodes;
			if (!childNodes) return false;					//retorna false si no hay childNodes
			for (let i = 0; i < childNodes.length; i++) {
				if (isQueContiene == false) {	//::: Tiene que coincidir exactamente.
					if (childNodes[i].text == textoTitleBuscar) {		//se puede reducir, pero creo que así queda mas claro para futuras modificaciones.
						if (childNodes[i].nodeName == 'TITLE') {
							this.tagHEAD.removeChild(childNodes[i]);
							return childNodes[i];
						}
					}
				} else {
					if (String(childNodes[i].text).indexOf(textoTitleBuscar) >= 0) {
						if (childNodes[i].nodeName == 'TITLE') {
							this.tagHEAD.removeChild(childNodes[i]);
							return childNodes[i];
						}
					}
				}
			}
			return false;
		} catch (error) {
			console.log('msgError==>' + error.message)
			return false;
		}
	}
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
	//:::::::::::::::::::::::::::::::::::::::::METODOS DE BUSQUEDA:::::::::::::::::::::::::::::::::::::::::
	/**
	 * Busca un título 
	 * @param {*} strToSearch String del titulo a buscar.
	 * @param {*} isTituloExacto true(o nada) si es titulo exacto ; false si es titulo*
	 * @returns El Nodo encontrado con la ID o la Url 
	 * 			false, si no lo encuentra o hay un error de parametros.
	 */
	searchTITLE(strToSearch = '', isTituloExacto = false) {
		try {
			if (!strToSearch || typeof (strToSearch) != 'string') throw ('error en el tipo de  Argumento: '); 1
			//
			//Si entra como Id, lo devuelvo como elemento y listo 
			const elementAux = document.getElementById(strToSearch);
			if (elementAux) return elementAux; 	//console.log('Existe como ID!!');			

			//
			let childNodesTitle = this.tagHEAD.getElementsByTagName('TITLE');
			for (const hijoDelHead_Title of childNodesTitle) {
				if (isTituloExacto == true) {
					if (String(hijoDelHead_Title.text).toUpperCase() == String(strToSearch).toUpperCase())
						return hijoDelHead_Title;
				} else {
					if (hijoDelHead_Title.text.indexOf(strToSearch) >= 0) {
						return hijoDelHead_Title;
					}
				}
			}
			return false;
		} catch (error) {
			console.log('msgError==>' + error.message)
			return false;
		}
	}
	/**
	 * Metodo PPal de Busqueda de Nodos en el Head.
	 * @param {*} strToSearch Id o Url a buscar en el head.
	 * @returns El Nodo encontrado con la ID o la Url 
	 * 			false, si no lo encuentra o hay un error de parametros.
	 */
	search(strToSearch = '') {
		//:::
		let childNodes = this.tagHEAD.childNodes;
		if (!childNodes) return false;					//retorna false si no hay childNodes
		//:::
		let isID_Search; if ((isID_Search = this._isID(strToSearch)) == null) return false;
		if (isID_Search == true) {	//:::Busca ID
			return this._search_ByID(strToSearch);
		} else {
			return this._search_ByURL(strToSearch);
		}
	}
	/**
	 * Busca sólo en el id del Head. 
	 * @param {*} IdToSearch Id a Buscar
	 * @returns el nodo encontrado; false si no lo encuentra o hay un error.
	 */
	_search_ByID(IdToSearch = '') {
		if (!IdToSearch) return false;
		//:::
		let childNodes = this.tagHEAD.childNodes;
		if (!childNodes) return false;
		//:::
		for (let i = 0; i < childNodes.length; i++) {
			if (childNodes[i].id == IdToSearch) return childNodes[i];
		}
		return false;
	}
	/**
	 * Busca sólo entre las URL(src y href) del Head.
	 * @param {*} strToSearch String del Url a buscar en el Head.
	 * @returns El nodo encontrado.
	 * 			false si no lo encuentra o hay error
	 */
	_search_ByURL(strToSearch = '') {
		let childNodes = this.tagHEAD.childNodes;
		if (!childNodes) return false;					//retorna false si no hay childNodes
		const ffURL_ToSearch = new File_Formal(strToSearch);	//pruebo a ver si lo introducido es una ruta:		
		if (!ffURL_ToSearch || ffURL_ToSearch.FileData.isValid == false) return false;
		for (let i = 0; i < childNodes.length; i++) {
			const nodeNameAux = String(childNodes[i].nodeName).toUpperCase();
			if (nodeNameAux == 'LINK') {
				if (ffURL_ToSearch.getUrl(true, true, true, true) == childNodes[i].href) return childNodes[i];
			} else if (nodeNameAux == 'SCRIPT') {
				if (ffURL_ToSearch.getUrl(true, true, true, true) == childNodes[i].src) return childNodes[i];
			} else if (nodeNameAux == '#TEXT' || nodeNameAux == '#COMMENT') {
				continue;
			} else {
				let textoAux = '\nNodo No registrado: \t[' + (i + 1) + '] \t||\t (de' + childNodes.length + ')';
				textoAux += ('\t NODENAME= ' + childNodes[i].nodeName + '\t || ID= ' + childNodes[i].id);
				textoAux += '\n=======';
			}
		}
		return false;
	}
	//=====================METODS DE VISOR========================================
	/**
	 *  */
	viewHead() {
		//let this.tagHEAD = document.getElementsByTagName('HEAD')[0]; // Get HTML head element
		if (!this.tagHEAD.hasChildNodes) return false;
		let cuenta = 0;
		//________________________________________
		let textoAux = '\n=== V I E W   H E A D  || Num Nodos en Head: ' + this.tagHEAD.childElementCount;
		textoAux += '\n================================================';
		//________________________________________
		let tagTitleAux = this.tagHEAD.getElementsByTagName('TITLE');
		textoAux += '\n<TITLE>\n';
		for (let i = 0; i < tagTitleAux.length; i++) {
			//textoAux += '['+i+']';			
			cuenta++;
			textoAux += '==>ID=' + tagTitleAux[i].id;
			textoAux += '  ||\t TEXT=' + tagTitleAux[i].text;
		}
		//________________________________________
		let tagScriptAux = this.tagHEAD.getElementsByTagName('SCRIPT');
		textoAux += '\n<SCRIPT>\n';
		for (let i = 0; i < tagScriptAux.length; i++) {
			cuenta++;
			if (tagScriptAux[i].src == '') continue;
			textoAux += '==>|| ID=' + tagScriptAux[i].id;
			textoAux += '  ||SRC=' + tagScriptAux[i].src;
			textoAux += '  ||type=' + tagScriptAux[i].type;
			//textoAux += '  \t||crossorigin=' + tagScriptAux[i].crossorigin;
			//textoAux += '  ||\tintegrity=' + tagScriptAux[i].integrity;
			textoAux += '\n';
		}
		//
		let tagLinkAux = this.tagHEAD.getElementsByTagName('LINK');
		textoAux += '\n-<LINK>\n';
		for (let i = 0; i < tagLinkAux.length; i++) {
			cuenta++;
			if (tagLinkAux[i].href == '') continue;
			textoAux += '==> ||ID=' + tagLinkAux[i].id;
			textoAux += '  ||HREF=' + tagLinkAux[i].href;
			textoAux += '  ||rel=' + tagLinkAux[i].rel;
			textoAux += '  ||type=' + tagLinkAux[i].type;
			textoAux += '  ||async=' + tagLinkAux[i].async;
			//textoAux += '  \t||crossorigin=' + tagLinkAux[i].crossorigin;
			//textoAux += '  ||\tintegrity=' + tagLinkAux[i].integrity;
			textoAux += '\n';
		}
		

		textoAux += '\n=== FIN VIEW TAGS-HEAD==========================';
		//________________
		//console.log(textoAux);
		return textoAux;
	}
	viewSCRIPTBODY() {
		const elBody = document.body;
		let elTag = elBody.getElementsByTagName('SCRIPT');
		let textoAux = '<SCRIPT>';
		for (let i = 0; i < elTag.length; i++) {
			textoAux += '\n ID=' + elTag[i].id;
			textoAux += '\n\t SRC=' + elTag[i].src;
			textoAux += '\n\t type=' + elTag[i].type;
			textoAux += '\n\t crossorigin=' + elTag[i].crossorigin;
			textoAux += '\n\t integrity=' + elTag[i].integrity;
			textoAux += '\n';
		}
		return textoAux;
	}
	/**
	 * @returns Devuelve el txt total del Head hecho String.
	 */
	viewHeadFuerzaBruta() {
		let txt = '\n----->VER HEAD<------\n|';
		txt += (this.tagHEAD.outerHTML.toString());
		//console.log(txt);
		return txt;
	}
	/**
	 * 
	 * @returns String con Los Nodes(tags) Ordenados(id, nodeName, nodetype, ......)
	 */
	viewAllInOne() {
		//____________________________
		let textoAux = '';
		let childNodes = this.tagHEAD.childNodes;
		if (!childNodes) return false;					//retorna false si no hay childNodes
		console.log('\nV I E W   A L L   I N   O N E \n:::::::::::::::::::::::::::::::::::::::::::::::::::\n');
		for (let i = 0; i < childNodes.length; i++) {
			textoAux += '[' + (i + 1) + '] de ' + childNodes.length;
			switch (childNodes[i].nodeName) {
				case 'TITLE':
					textoAux += ('\n nodeName= ' + childNodes[i].nodeName);		//SCRIPT / LINK / ...		
					textoAux += ('\n nodeType= ' + childNodes[i].nodeType);		//1 element, 3 texto
					textoAux += ('\n Text= ' + childNodes[i].text);
					break;
				case 'SCRIPT':
					textoAux += ('\n nodeName= ' + childNodes[i].nodeName);		//SCRIPT / LINK / ...
					textoAux += ('\n ID= ' + childNodes[i].id);
					textoAux += ('\n nodeType= ' + childNodes[i].nodeType);		//1 element, 3 texto
					textoAux += ('\n Type=' + childNodes[i].type);				//text/javascript, text/ecmascript, application/javascript, y application/ecmascript
					textoAux += ('\n SRC= ' + childNodes[i].src);				//para script
					break;
				case 'LINK':
					textoAux += ('\n nodeName= ' + childNodes[i].nodeName);		//SCRIPT / LINK / ...
					textoAux += ('\n ID= ' + childNodes[i].id);
					textoAux += ('\n nodeType= ' + childNodes[i].nodeType);		//1 element, 3 texto
					textoAux += ('\n Type=' + childNodes[i].type);				//text/javascript, text/ecmascript, application/javascript, y application/ecmascript
					textoAux += ('\n Async= ' + childNodes[i].async);
					textoAux += ('\n Rel= ' + childNodes[i].rel);
					textoAux += ('\n Rref= ' + childNodes[i].href);
					break;
				case 'META':
					textoAux += ('\n nodeName= ' + childNodes[i].nodeName);	//SCRIPT / LINK / ...		
					textoAux += ('\n nodeType= ' + childNodes[i].nodeType);	//1 element, 3 texto
					break;
				default:
					textoAux += ('\n nodeName= ' + childNodes[i].nodeName);	//SCRIPT / LINK / ...		
					textoAux += ('\n nodeType= ' + childNodes[i].nodeType);	//1 element, 3 texto
					break;
			}
			textoAux += '\n-------------\n';
		}
		textoAux += '::::::::::::::::::::::::::::fin:::::::::::::::::::::::::::::::::::::::\n';
		//console.log(textoAux);
		return textoAux;
	}
	/**
	 * @returns String de Todos los Node Link del Head.
	 */
	viewTagsLINK() {
		//console.log('\nVer Tag <LINK> del documento' + this.tagHEAD.getElementsByTagName('LINK').length);
		if (!this.tagHEAD.hasChildNodes) return false;
		let theLinks = document.getElementsByTagName('LINK');
		let textoAux = '\nV I E W   L I N K S\n::::::::::::::::::::::::';
		for (let i = 0; i < theLinks.length; i++) {
			//console.log(theLinks[i].id);console.log(theLinks[i].rel);console.log(theLinks[i].type);console.log(theLinks[i].href);
			textoAux += '\n ID=' + theLinks[i].id;
			textoAux += '\n Rel=' + theLinks[i].rel;
			textoAux += '\n Type=' + theLinks[i].type;
			textoAux += '\n Href=' + theLinks[i].href;
			if (i == theLinks.length - 1)
				textoAux += '\n:::::::::::::::::fin::::::::::::::::::::::';
			else
				textoAux += '\n_________';
		}

		//console.log(textoAux);
		return textoAux;
	}
	/**
	 * @returns String de Todos los Node Script del Head.
	 */
	viewTagsSCRIPT() {
		if (!this.tagHEAD.childNodes) return false;
		//________________________________________
		let tagScriptAux = this.tagHEAD.getElementsByTagName('SCRIPT');
		let textoAux = '\nV E R   S C R I P T S\n:::::::::::::::::::::::::::::::::';
		for (const src of tagScriptAux) {
			textoAux += '\nID=' + src.id;
			textoAux += '\ntype=' + src.type;
			textoAux += '\nsrc=' + src.src;
			textoAux += '\n_________';
		}
		textoAux += '\n::::::::::::::::::::::::::::fin:::::::::::::::::::::::::::::::::::::::';
		console.log(textoAux);
		return textoAux;
	}
	/**
	 * @returns el Node Title del Head.
	 */
	viewTagsTITLE() {
		if (!this.tagHEAD.childNodes) return false;
		//________________________________________
		let tagTitleAux = this.tagHEAD.getElementsByTagName('TITLE');
		let textoAux = 'V I E W   T I T L E\n::::::::::::::::::::::::\n';
		for (const tit of tagTitleAux) {
			textoAux += tit.id;
			textoAux += tit.text;
		}
		textoAux += '\n::::::::::::::::::::::::::::fin:::::::::::::::::::::::::::::::::::::::';
		console.log(textoAux);
		return textoAux;
	}
	/**
	 * @returns Devuelve todos los url del Head.
	 */
	viewFilePaths() {
		let childNodes = this.tagHEAD.childNodes;
		if (!childNodes) return false;					//retorna false si no hay childNodes
		let textoAux = '\nV I E W   FILE  P A T H S \n:::::::::::::::::::::::::::::::::';
		for (let i = 0; i < childNodes.length; i++) {
			switch (childNodes[i].nodeName) {
				case 'SCRIPT':
					textoAux += '\n[' + (i + 1) + '] || ' + childNodes.length;
					textoAux += ('\t NODENAME= ' + childNodes[i].nodeName + '\t || ID= ' + childNodes[i].id);		//SCRIPT / LINK / ...
					textoAux += ('\n SRC= ' + childNodes[i].src);				//para script
					textoAux += '\n=======';
					break;
				case 'LINK':
					textoAux += '\n[' + (i + 1) + '] || ' + childNodes.length;
					textoAux += ('\t NODENAME= ' + childNodes[i].nodeName + '  \t || ID= ' + childNodes[i].id);		//SCRIPT / LINK / ...
					textoAux += ('\n HREF= ' + childNodes[i].href);
					textoAux += '\n=======';
					break;
				case 'TITLE':
					textoAux += '\n[' + (i + 1) + '] || ' + childNodes.length;
					textoAux += ('\t NODENAME= ' + childNodes[i].nodeName + '\t || ID= ' + childNodes[i].id);		//SCRIPT / LINK / ...
					textoAux += ('\n TEXT= ' + childNodes[i].text);
					textoAux += '\n=======';
					break;
				case 'META':
					textoAux += ('\t NODENAME= ' + childNodes[i].nodeName + '\t || ID= ' + childNodes[i].id);		//SCRIPT / LINK / ...

					break;
				case '#text':
					break;
				default:
					textoAux += '\n[' + (i + 1) + '] \t || (de ' + childNodes.length + ')\tNodo No registrado';
					textoAux += ('\t NODENAME= ' + childNodes[i].nodeName + '\t || ID= ' + childNodes[i].id);
					textoAux += '\n=======';
					break;
			}
		}
		textoAux += '\n::::::::::::::::::::::::::::fin:::::::::::::::::::::::::::::::::::::::';
		//console.log(textoAux);
		return textoAux;
	}
	// ████████████████████████████████████████████████████ METODOS COMUNES
	/**
	 * Si entra por url valida que es una url Valida con fileFormal
	 * @param {*} strData ID o URL.
	 * @returns true si es una ID
	 * 			false si es una URL
	 * 			null si es un error( ni ID ni URL)
	 */
	_isID(strData) {
		//::: 
		if (!strData || typeof (strData) != 'string') return false;
		//::: busco por id
		const byID = document.getElementById(strData);
		//::: Pregunto
		if (!byID) {
			const byURL = new File_Formal(strData);
			if (!byURL) return null;		//ni por id ni por url....retorna nulo o error
			if (byURL.FileData.isValid == true) {
				return false;	//Entra por URL!! Luego le devuelvo false porque no es por ID, es por una URL valida!!!.
			} else {
				return null;	//Entra por Url pero esta es errornea.
			}
		} else {
			return true;		//Entra por ID!!
		}
	}
	/**
	 * Encuentra un nombre unico para uno que entra sujerido.
	 * @param {*} strAux 
	 * @returns 
	 */
	_get_Secuencial(strAux = IDLINK_XDEF) {
		//Validacion de los argumentos:.............>
		if (!strAux || typeof (strAux) != 'string') return false;
		//
		//Working Procedure:........................>
		for (let i = 0; ; i++)  if (!document.getElementById(strAux + '_' + i)) return (strAux + '_' + i);
	}
	//_______________________________________________________
	//Lo tengo sólo como muestra:?????????????????????????????????????????????????????????????
	_normalizePath = path => path.replace(/[\\/]+/g, '/');
	//_______________________________________________________
	//Lo tengo sólo como muestra:?????????????????????????????????????????????????????????????
	_rutas(strUrl = '') {
		let r = new RegExp('^(?:[a-z]+:)?//', 'i');
		let fs = require("fs");
		let a = new FileSystemDirectoryHandle();

	}
	_matchExtension(strUrl = '') {

	}

}    // █████████████████████  FIN CLASE HEADACHE 

// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
//  C L A S E  "Work_ClassName" 
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

/**  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	 * Cuando se instancia esta clase, se genera este Tag en el constructor:
	 ■■■■ <LINK     Id=IDLINK_XDEF  Rel="stylesheet"    Href=LINK_FILEPATH_XDEF    Type="text/css" />  ■■■■
	 * Esto genera:
	 * un idLink constante( 'idLinkHtml_DVD' ) y un .css tb cte('./estilos/styleDvd.css' ):
	 * El css tiene las clases tb ctes ( )
	 * A partir de aquí se puede cambiar de fichero, cambiar de clases y cambiar de idLink Dinamicamente
	 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
**/

/* ■■■■■■■■ Métodos de la clase:
	• constructor( strFilePathCSS ){										►
	• _addClaseCSS( classNameCSS ){											► (sin uso)
	• _cssSetClass( strClassCssContenedor, strClassCssDIV ){				► (sin uso)
	• switch_file_path( pathArchivo = './estilos/styleDvd.css' ) {			► (sin uso)
	• _setTagLINK( strFilePathCSS = '' ){									► crea etiqueta <link>
	• cssSetFilePath( strFilePathCSS = '' ){								► (sin uso)
	• cssImportURL( pathCssFile = Work_ClassName.LINK_FILEPATH_XDEF ){			► (sin uso)

	• _get_Secuencial(strAux = IDLINK_XDEF){								► pasada una cadena calcula su secuencial (sin uso)
	• get_className(a = ''){													► Devuelve el className.
	• set_className_unique(a = ''){											► Pone nombres únicos a las clases

	• addClassName(a = ''){													► Suma un clase en el className.
	• search_className(a = ''){												► Busca una clase en el className.
	• switch_className(a = ''){ 												► Intercambia una clase por otra del className.
	• elimina_className(a = ''){												► borra una clase del className.

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
class Work_ClassName {
	static CLASSNAME_DIV_XDEF = 'claseDivXdefecto';						//estilo por defecto para div en styleDvd.css
	static LINK_FILEPATH_XDEF = './estilos/styleDvd.css';				//Path al archivo css que intento cargar dinámicamente.
	//sin uso.......????????????????????????????????????
	LINK = {
		idLink: '',
		filePathCSS: '',
		laClase: [],		//array de string que contiene todas las clases de un fichero .css con un idLink
	};
	elHEAD = null;
	/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	 * Cuando se instancia esta clase, se genera este Tag en el constructor:
	• un idLink constante( 'idLinkHtml_DVD' ) y un .css tb cte('./estilos/styleDvd.css' ):
	• El css styleDvd.css tiene el contenido de las clases también ctes ( )
	..... A partir de aquí se puede cambiar de fichero, cambiar de clases y cambiar de idLink
	 
	■■■■■■■■■  < LINK  Id = IDLINK_XDEF  Rel = "stylesheet"  Href = LINK_FILEPATH_XDEF    Type = "text/css" /> 
	■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
	constructor(strFilePathCSS = Work_ClassName.LINK_FILEPATH_XDEF) {
		if (typeof (strFilePathCSS) != 'string')
			strFilePathCSS = Work_ClassName.LINK_FILEPATH_XDEF;

		//super(strFilePathCSS);
		this.elHEAD = new Head_Drive();
		// ■■■
		let strID_Link = this._get_Secuencial(IDLINK_XDEF);		// Obtiene un IdLink único 
		this.elHEAD.add_etiqueta(strFilePathCSS, strID_Link);	// CREA EL TAG <LINK> POR DEFECTO
		//
		console.log(this.verHead());

	}	
	/**
	 * heredado
	 *  */
	verHead() {
		return this.elHEAD.viewHead();
	}
	/**heredado */
	verLINKS() {
		return this.elHEAD.viewTagsLINK
	}
	/**heredado */
	is_link_load(strLINK_ID = '') {
		return this.elHEAD.search(strLINK_ID)
	}
	/**heredado 
	 * ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	*/
	/* getArray_IdLINK() {
		let arrRetorno = [];
		let theLinks = document.getElementsByTagName('link');
		for (let i = 0; i < theLinks.length; i++) {
			arrRetorno.push(theLinks[i].id);
		}
		return arrRetorno;
	} */
	
	/**
	 * Entra un PathArchivo que se tiene que buscar entre los files del Head.
	 * IF se encuentra, valida que tienen la misma extension
	 * IF no se encuentra 	sale y no hace nada.
	 * @param {*} pathArchivo 
	 * @returns null si no se encuentra el archivo.
	 */
	switch_file_path(pathArchivo = Work_ClassName.LINK_FILEPATH_XDEF, newPath = '') {
		//Validaciones--------------------------->
		if (typeof (pathArchivo) != 'string')
			return false;	
		//=== Is Link Load? ===
		if (this.is_link_load(pathArchivo)) {
			return this.elHEAD.switch_file_path(pathArchivo, newPath);
		}else{
			return null;
		}
	}
	/**
	 * Encuentra un nombre unico para uno que entra sujerido.
	 * add _num al final del nombre para encontrarlo............
	 * @param {*} strAux 
	 * @returns 
	 */
	_get_Secuencial(strAux = IDLINK_XDEF) {
		//Validacion de los argumentos:.............>
		if (typeof (strAux) != 'string') return false;
		if (strAux == null) return false;
		if (strAux == undefined) return false;
		if (strAux.length <= 2) return false;	//mínimo 2 letras.
		//
		//Working Procedure:........................>
		for (let i = 0; ; i++) {
			if (!document.getElementById(strAux + '_' + i))
				return (strAux + '_' + i);
		}
	}
	/**
	 * 
	 * @param {*} obj , puede ser un id (string) o un objeto(div) 
	 * @returns la cadena className del objeto.
	 * 			false, si el argumento pasado no se corresponde con un div(ni por id ni por objeto)
	 */
	get_className(obj = null) {
		if (typeof (obj) == 'string') {
			if (!document.getElementById(obj)) {
				return false;
			}
			return document.getElementById(obj).className;
		} else if (typeof (obj) == 'object') {
			return obj.className;
		} else {
			return false;
		}

	}
	/**
	 * Devuelve el className............ arg ID  oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} idObject 
	 * @returns 
	 */
	_get_className_by_Id(idObject = '') {
		if (typeof (idObject) != 'string') return false;
		if (!document.getElementById(idObject)) return null;
		let aux = document.getElementById(idObject).className;
		return aux;
	}

	/**
	 * Devuelve el className............ arg OBJETOoooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} ObjectArg OBJETO DEL QUE SE QUIERE OBTENER EL CLASSNAME.
	 * @returns FALSE , si no existe el objeto.
	 * 			CLASSNAME Del objeto.
	 */
	_get_className_by_obj(ObjectArg = null) {
		if (typeof (ObjectArg) != 'object') return false;
		if (ObjectArg == null) return false;
		return ObjectArg.className;
	}

	/**
	 * Busca una clase en el className y retorna un booleano SI LA ENCUENTRA.
	 * @param {*} objDIV Objeto sobre el que se busca la clase.
	 * @param {*} classNameSearch clase a buscar.
	 * @returns true, encuentra la clase
	 * 			false, no encuentra la clase.
	 */
	search_className(objDIV = null, classNameSearch = '') {
		if (typeof (classNameSearch) != 'string') return false;
		if (typeof (objDIV) != 'object') return false;
		if (objDIV == null) return false;
		if (classNameSearch.length <= 2) return false;
		if (objDIV.className.indexOf(classNameSearch) < 0) return false;
		return true;
	}
	
	/**
	 * Establece una clase única, sustituyendo todo lo que hubiera antes ....de Un sólo Objeto 
	 * @param {*} objDIV 
	 * @param {*} classNameAux 
	 * @returns 
	 */
	set_className_unique(objDIV, classNameAux = Work_ClassName.CLASSNAME_DIV_XDEF) {
		if (typeof (objDIV) != 'object') return false;
		if (objDIV == null) return false;

		if (typeof (classNameAux) != 'string') return false;

		objDIV.className = classNameAux;
		return true;
	}

	/**
	 * Añade una o mas clases a las clases que había anteriores * .....de Un sólo Objeto
	 * @param {*} objDIV 
	 * @param {*} classNameAux 
	 * @returns 
	 */
	add_className(objDIV = null, classNameAux = '') {
		if (typeof (classNameAux) != 'string') return false;
		if (typeof (objDIV) != 'object') return false;

		objDIV.className += ' ' + classNameAux;
	}

	/**
	 * Alternar entre dos nombres clase ....de Un sólo Objeto oooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} objDIV 
	 * @param {*} oldClassName 
	 * @param {*} newClassName 
	 * @returns 
	 */
	switch_className(objDIV = null, oldClassName = '', newClassName = '') {
		if (typeof (objDIV) != 'object') return false;
		if (typeof (oldClassName) != 'string') return false;
		if (typeof (newClassName) != 'string') return false;
		//______________________
		//Proceso:
		//console.log('Switch Antes)\nclassName de ' + objDIV.id + '->' + objDIV.className); //borrar
		if (this.search_className(objDIV, oldClassName) == true) {
			let classAux = objDIV.className;
			let aux = classAux.replace(oldClassName, newClassName);
			objDIV.className = aux;
		}
		//console.log('Switch Despues\nclassName de ' + objDIV.id + '->' + objDIV.className)	//borrar
	}

	/**
	 * Elimina una clase ...de Un sólo Objeto:
	 * @param {*} objDIV 
	 * @param {*} classNameAux 
	 * @returns 
	 */
	elimina_className(objDIV = null, classNameAux = '') {
		try {
			if (this.search_className(objDIV, classNameAux) == true) {
				let a = objDIV.className;
				a = a.replace(classNameAux, '');
				objDIV.className = a;
			}
			return true;
		} catch (error) {
			console.log('Work_ClassName:elimina_className: Error--> ' + error.message);
			return false;
		}
	}
	/**
	 * DEJA EL OBJETO PASADO COMO ARGUMENTO SIN CLASSNAME.
	 * @param {*} objDIV 
	 * @returns 
	 */
	reset_className(objDIV = null) {
		if (typeof (objDIV) != 'object') return false;
		if (objDIV == null) return;
		objDIV.className = '';
	}
	/**
	 * Asigna el className de un objeto Div a Otro.oooooooooooooooooooooooooooooooo
	 * @param {*} objectModelo 
	 * @param {*} objectDestino 
	 */
	copy_paste_className(objectModelo, objectDestino) {
		this.reset_className(objectDestino);
		let strClassNameModelo = objectModelo.claseName
		objectDestino.claseName = strClassNameModelo + '';
	}

} // ■■■■■■■ FIN CLASE Work_ClassName 

// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * C L A S E  "Base_Div"  				Clase PARA DEFINIR UNA ESTRUCTURA DE DATOS que se usa en la clase Div_X_Div
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
class Base_Div {
	objDiv;
	bVisible;			// ► cada div podrá ser visible o invisible.    
	//
	HOW = {
		Stt: 0,			// ► 0 = todo perfect()
		Tag: '',		// ► reserva. 			
		Flag: 0         // bandera reservada
	};
	//Reset.....................
	constructor(objDiv = null, bVisible = true, Status = 0, Tag = 0, Flag = 0) {
		this.objDiv = objDiv;
		this.bVisible = bVisible		//
		this.HOW.Stt = Status;		    //estado inicial del status.
		this.HOW.Tag = Tag;			    //estado inicial del Tag (String)
		this.HOW.Flag = Flag;			//estado inicial del Flag (int)

	};
} // ■■■■■■■■■■ FIN CLASE CLASS_BASE_DIV 

// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * C L A S E  "Div_X_Div"  	
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

// ::: Clase que mantiene(insertar/editar/eliminar/Buscar/) un Array de Divs en un contenedor.
//    Cada instancia creada de la clase CLASS_divDvd crea un div en un <Div Contedor> y esta es la base para posteriores inserciones.
//
// ::: TODOS LOS DIVS TIENEN LOS MISMOS ESTILOS (CLASSNAME) INICIALMENTE.
// SE PUEDEN PONER ESTILOS DIFERENTES A CADA DIV DEPENDIENDO DEL FLAG O DEL TAG POSTERIORMENTE.
//
/*
■■■■■■■■■■■■■■■■■ M é t o  d o s   de  la  c l a s e:
	• constructor(IDDIV_Family, idDivCONTENEDOR){ 		==> Crea un Div, un array con un Nombre Unico y cacha un Contenedor (o lo crea)
	• addDivs(numDivsAdd=1){	 							==> Crea x Divs
	• creaDiv(){ 											==> Crea un sólo div
	//
	• SwitchTAG(Tag,intDesde,intHasta){ 				==> Cambia tags de cada Div
	• resetTagDiv(){ 									==> Pone el tag de cada div a su valor por defecto(#_)
	• verTags(){										==> 
	• switchStatus(intStatus,intDesde,intHasta){ 		==> Cambia el status de cada div desde y hasta
	• resetStatus(){ 									==> Pone todos los status a 0(ok y listo)
	• verStatus(){ 									==> Ver el status de cada Div.
	• switchFlag(Flag,intDesde,intHasta){ 			==> Pone banderas desde y hasta 
	• resetFlag(){ 									==> pone todas las banderas a 0(estado ini)
	• _verFlags(){ 									==> Ver los Flags de cada Div 
	//
	• verFamily(){ 									==> console de todos los datos recogidos. 
	• switchObjContenedor(idDivCONTENEDOR=''){ 		==> Cambia el Contenedor 

	• addImgs(strUrlImagen='./'){ 					==> (Sin uso). La idea es pasar una carpeta y cachar sus imagenes.
	• _get_new_id(){ 								==> Genera el siguiente idDiv a crear.
	• _get_Secuencial(strAux){ 						==> Genera el siguiente Id de la cadena pasada .
	• get_array_Base_Divs(){ 							==> Devuelve el arrayPrincipal
	• get_array_divs(){ 								==>	Devuelve un array solo con los divs de la clase.
	• get CONTAINER(){ 								==>	Devuelve el Div Contenedor de la clase.
	• get IDDIV_Family(){								==>	Devuelve el ID_Unico 
	• get bVisible(){ 								==> Devuelve si es visible GENERAL
	• get intStatus(){ 								==> Devuelve el status GENERAL
	• get strTag(){ 									==>
		• set bVisible(a){ 								==> Tiene que poner todos los divs invisibles.

/*______________________________________________________________________
 * pejemplo: miObj.divs.crearDiv(' miIdDiv', 'idContenedor1', 100, 50);
 * Crea un div en idContenedor1 en la posicion x,y (100, 50).
 *:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

class Div_X_Div extends Work_ClassName {
	//_____________________	
	static DIV_NONAME = 'divNONAME';				//Para los div no nombrados explicitamente:
	static CONTENEDOR_NONAME = 'ContenedorNONAME';	//Cuando se crea una instancia sin contenedor se crea un contenedor de id=ContenedorNONAME_x
	//___________________________________________
	//Para los HOW iniciales y para hacer reset de los estados:
	static PREFIJO_TAG = '#';		//LOS TAG EMPIEZAN POR '#_' 
	static STATUS_ZERO = 0;		//Base para trabajar con this.array_Base_Divs[i].HOW.intStatus
	static FLAG_ZERO = 0;			//Una bandera para identificar objetos y darle propiedades.
	//_________
	//Para css:
	static CLASSNAME_CONT_XDEFECTO = 'claseContedorXdefecto';	   //Estilo por defecto para contenedor en styleDvd.css
	//____________________________________________
	//Stack de los datos Importantes de la clase:
	CONTAINER = null;			//Objeto contenedor de los divs creados y almacenados en arr.	
	IDDIV_Family = '';			//Nombre a partir del cual se generan todos los ID de los divs.	Id_PATRON_0 , Id_PATRON_1 .....
	// 
	FirstDiv = new Base_Div();	//Primer Div. 
	//=== ARRAY DE OBJETOS Base_Div =================================
	array_Base_Divs = new Array();		//ARRAY PRINCIPAL DE LA CLASE se llena de las INSTANCIAS de la clase 'Base_Div'. 	
	//
	//_____________
	//Valores Los estados:
	bVisible = true;				//invisibles o visibles Todos..................................Contenedor para el contenedor?
	intStatus = 0;					//estado 0=todo bien....se va construyendo.
	strTag = '';					//Tag  de los divs.....se va construyendo.
	Flag = 0;					//bandera numerica.
	//________________
	//Todos para Uno? 			//=true->todos Divs iguales(misma className/Tag/Flag) /    =false->Pueden ser cada div distinto.
	isAllInOne = true;
	 
	/**
	 * 
	 * @param {*} IDDIV_Family Nombre comun para los divs. Si Capulettos -> Capulettos_0, Capulettos_1...
	 * @param {*} idDivCONTENEDOR Contenedor donde meter los divs creados con la clase.
	 * @param {*} BoxToMe, div donde meter el contenedor de los divs. es un contenedor de un contenedor. Tendrá document.body si no se pasa argumento.
	 * 						si se pasa argumento BoxToMe.appendChild(this.CONTENEDOR) 
	 * @param {*} isAllinOne 
	 * @param {*} isVisible 
	 * @returns 
	 */
	constructor(IDDIV_Family = '', idDivCONTENEDOR = '', BoxToMe = null, isAllinOne = true, isVisible = true) {
		//
		//=== crea <LINK Href='./estilos/styleDvd.css'  Id='IDLINK_NONAME'     Rel="stylesheet" Type="text/css" /> 
		super();
		//
		//_________________
		//::: IDDIV_Family:
		if (typeof (IDDIV_Family) != 'string') return;
		if (document.getElementById(IDDIV_Family)) return;
		if (document.getElementById(IDDIV_Family + '_0')) return;
		//		
		//
		//::: Si metes Familia lo cacha, si no, familia es 'DIV_NONAME'
		if (IDDIV_Family == '' || IDDIV_Family == null)
			this.IDDIV_Family = this._get_Secuencial(Div_X_Div.DIV_NONAME);
		else
			this.IDDIV_Family = IDDIV_Family;
		//
		//
		let txt = '\n=== INIO CLASE Div_X_Div ===';
		txt +=    '\n==========================';
		//_______________________________
		//idDivCONTENEDOR 	
		if (idDivCONTENEDOR == null || idDivCONTENEDOR == '') {		//........no entra.
			this.CONTAINER = document.createElement('div');
			this.CONTAINER.id = this._get_Secuencial(Div_X_Div.CONTENEDOR_NONAME);
		} else if (!document.getElementById(idDivCONTENEDOR)) {	//.......entra Y no existe PREVIAMENTE en EL DOC Html. (LO NORMAL)
			this.CONTAINER = document.createElement('div');
			this.CONTAINER.id = idDivCONTENEDOR;					
		} else {															//.......entra y existe en Html.
			this.CONTAINER = document.getElementById(idDivCONTENEDOR);	//...lo cacho como contenedor
		}
		//
		//=== DONDE METO EL CONTENEDOR CREADO??? === La clase está pensada para que sea en el document.body en caso de boxToMe = null
		if(!BoxToMe) BoxToMe=document.body;		
		this.append_FROM_TO( this.CONTAINER,BoxToMe);
		
		//
		//=== Estilos ...(de inicio) ====================		
		//
		//::: Si el array tiene datos ya, o no tiene datos. 
		if (this.array_Base_Divs == null || this.array_Base_Divs.length <= 0) {
			txt += '\n\t===> Familia: ' + IDDIV_Family + ', .... Empieza la Configuracion:';
		}
		//===  P r o c e s o: =========================================
		//
		//:::Crea un primer div que será el patron 		
		this.FirstDiv=this.creaDiv();
		if (this.FirstDiv == false) throw ('Crear Div ... constructor....Error al crear el Div');
		//
		//:::Estilos (...de Inicio):
		super.set_className_unique(this.CONTAINER, Div_X_Div.CLASSNAME_CONT_XDEFECTO);
		super.set_className_unique(this.FirstDiv.objDiv, Div_X_Div.CLASSNAME_DIV_XDEF);
		//'''''''''''''''''
		//::: ESTADOS DEL DIV
		if (typeof (isAllinOne) != 'boolean') isAllinOne = true;
		if (typeof (isVisible) != 'boolean') isVisible = true;
		
		//
		//::: ESTADOS GENERAL DE TODOS LOS TAGS
		this.isAllInOne = false;	//TODOS EL MISMO COMPORTAMIENTO....hay que ponerlo a false para que se pueda trabajar con los divs por SEPARADO.
		this.bVisible = true;		//TODOS VISIBLES O INVISIBLES
		this.strTag = Div_X_Div.PREFIJO_TAG;		//Se pueden poner nombres identificativos.
		this.intStatus = 0;					//para definir los estados. No está especificado.
		this.Flag = 0;						//banderas identificativas numéricas.
		//
		//super.set_className_unique();
		//

		txt += '\n\tFamilia ( ' + this.IDDIV_Family + ' )............................................load OK!!';
		txt += '\n\tPrimer Elemento de la Familia ( ' + this.FirstDiv.objDiv.id + ' ) ............load OK!!';
		txt += '\n\tCONTENEDOR ( ' + this.CONTAINER.id + ' ) .........................load OK!!';
		txt += '\n--- FIN -----------------------\n';
		console.log(txt);


	}	//FIN CONSTRUCTOR..........................
	/**
	 * introduce un div dentro de otro. lo uso para contenedores.
	 * @param {*} contenedorTo EL CONTENEDOR DONDE TENGO QUE METER.
	 * @param {*} contenedorFROM el objeto contenedor DIV donde tengo que meter .
	 */
	append_FROM_TO(contenedorFROM=null, contenedorTo){
		if(contenedorFROM==null || typeof(contenedorFROM)!='object') return false;
		contenedorTo.appendChild(contenedorFROM);
	}
	/**
	 * Metodo que añade un número X de divs o 1 por defecto.
	 * @param {*} numDivsAdd 
	*/
	addDivsCreaDiv(numDivsAdd = 1) {
		if (numDivsAdd <= 0) numDivsAdd = 1;		//valida el número de divs a crear.	
		for (let i = 0; i < numDivsAdd; i++) {
			this.creaDiv();
		}
		console.log(this.IDDIV_Family + '|' + this.CONTAINER.id + '|' + numDivsAdd + ' Divs add....OK');

	}	//fin addDiv***************************************************
	/**
	 * Metodo que creaClon el ejercito de los clones.
	 * @param {*} numClones 
	 * @returns 
	 */
	AddDivs(numClones = 1) {
		try {
			if (typeof (numClones) != 'number') return false;
			if (numClones <= 0) throw ('.....Div_X_Div....AddDivs....Error entrada ' + numClones);
			//
			let theClon;
			for (let i = 0; i < numClones; i++) {
				theClon = this.creaClon();
				if (theClon == false) throw ('.....Div_X_Div....AddDivs....al Crear el clon. Item: ' + i);

				console.log('...DIV CREADO!!--> Item: (' + i + ')\t ' + theClon.objDiv.id);

			}
			console.log('\n--- FIN -----------------------\n');
		} catch (error) {
			console.log(error.message);
			return false;
		}
	}
	/**
	 * metodo que elimina un nodo(intItemMatar)
	 * @param {*} intItemDesde 
	 * @param {*} intItemHasta 
	 * @returns 
	 */
	KillDivs(intItemDesde = 0, intItemHasta) {
		try {
			if (intItemDesde == null || typeof (intItemDesde) != 'number')
				intItemDesde = 0;
			else if (intItemDesde <= 0)
				intItemDesde = 0;
			else if (intItemDesde >= this.array_Base_Divs.length) {
				if (intItemHasta == null) {
					intItemHasta = this.array_Base_Divs.length;
					intItemDesde = this.array_Base_Divs.length - 1;
				}
			}
			//
			if (intItemHasta < 0)
				intItemHasta = intItemDesde + 1;
			else if (intItemHasta > this.array_Base_Divs.length)
				intItemHasta = this.array_Base_Divs.length;
			else if (typeof (intItemHasta) != 'number')
				intItemHasta = intItemDesde + 1;
			else
				intItemHasta++;
			//
			//Elimina los divs del contenedor:
			for (let i = intItemDesde; i < intItemHasta; i++) {
				this.CONTAINER.removeChild(this.array_Base_Divs[i].objDiv);
			}
			//
			//Preparo la variable intItemHasta para eliminar los divs del Array con splice:
			intItemHasta = intItemHasta - intItemDesde;
			let arrAux2 = this.array_Base_Divs.splice(intItemDesde, intItemHasta);	//elimina uno x.			
			//
			console.log('\n.........'+arrAux2.length+' divs Muertos');
			return arrAux2;
		} catch (error) {
			console.log('CrearDivs:KillDivs:msgError: ' + error.message);
			return false;
		}
	}
	/**
	 * Esta es la funcion que se llama desde el for de addDiv
	 */
	creaDiv() {
		try {
			//___________________________________________
			//1)-Instancia de la clase que voy a guardar en el array.
			const yyy = new Base_Div();
			//2)________________________________________
			yyy.objDiv = document.createElement('div'); 		//Crea un div.
			yyy.objDiv.id = this._get_new_id();				//Le pongo un Id.
			//3)________________________________________
			//Cargo las propiedades Por defecto del objeto:	
			yyy.bVisible = true;
			//Estados:
			yyy.HOW.Tag = Div_X_Div.PREFIJO_TAG;
			yyy.HOW.Stt = 0;
			yyy.HOW.Flag = 0;
			//__________________________________________
			//4)-Lo añado al contenedor:
			this.CONTAINER.appendChild(yyy.objDiv);
			//__________________________________________
			//5)-Meto el objeto en el array:
			this.array_Base_Divs.push(yyy);
			//?????????????????????????????????????????????????????????????????????????????????????????
			//
			//Algunos estilos para que se vean los divs creados..................(revisar y eliminar)
			//yyy.objDiv.innerText = this.IDDIV_Family + '  || ' + yyy.objDiv.id;
			//
			return yyy;
		} catch (error) {
			console.log('\n<--------------->\nMensaje: crear Patron: ' + error.message);
			return false;
		}
	}
	/**
	 * 	Crea un clon de un div
		 * el id lo genero con _get_Secuencial(this.IDDIV_Family)
	 * 
	 * @returns yyy, el clon creado.
	 * 			false, si hay algún error
	 */
	creaClon() {
		//
		//Validacion:
		//if(!document.getElementById(idContenedor)) return false;
		try {
			//Creacion del clon.
			let elClon = this.FirstDiv.objDiv.cloneNode(true);
			elClon.id = this._get_Secuencial(this.IDDIV_Family);
			//
			if (!elClon.id) throw ("Error creaClon() CLON");
			/*________________________________
			* Anadir el clon al contenedor.*/
			this.CONTAINER.appendChild(elClon);
			//console.log('Clon ('+elClon.id+') Creado, Padre->'+elClon.parentNode.id);
			/**_______________________________________
			 * Creo un base div y lo meto en el array 
			 * '''''''''''''''''''''''''''''''''''''''*/
			//___________________________________________
			//-Creo una instancia de la clase que voy a guardar en el array.
			const yyy = new Base_Div();
			yyy.objDiv = elClon;
			yyy.bVisible = true;
			//
			yyy.HOW.Tag = Div_X_Div.PREFIJO_TAG;
			yyy.HOW.Stt = 0;
			yyy.HOW.Flag = 0;
			//__________________________________________
			//-Meto el objeto en el array:
			this.array_Base_Divs.push(yyy);
			//
			//Algunos estilos para que se vean los divs creados..................(revisar y eliminar)
			//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			//yyy.objDiv.innerText = '||' + this.IDDIV_Family + ' || ' + yyy.objDiv.id;

			return yyy;
		} catch (e) {
			return false;
		}
	}
	/**
	 * Cambia los TAG de los divs del array para poder luego hacer cosas con ellosooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} Tag 
	 * @param {*} intDesde 
	 * @param {*} intHasta 
	 * @returns 
	 */
	SwitchTAG(Tag = '', intDesde = 0, intHasta = parseInt(this.array_Base_Divs.length - 1)) {
		if (typeof (Tag) != 'string' || Tag == '') return false;

		if (typeof (intDesde) != 'number') intDesde = 0;
		if (intDesde >= this.array_Base_Divs.length || intDesde < 0) return false;
		if (typeof (intHasta) != 'number') intHasta = this.array_Base_Divs.length - 1;
		if (intHasta >= this.array_Base_Divs.length || intHasta < 0) intHasta = this.array_Base_Divs.length - 1;
		if (intDesde > intHasta) return false;
		//Proceso. 
		const posicionPref = Tag.indexOf(Div_X_Div.PREFIJO_TAG);
		if (posicionPref == -1) {
			//no trae el prefijo.
			Tag = Div_X_Div.PREFIJO_TAG + Tag;
		} else {
			//trae el prefijo
			if (posicionPref == 0) {
				//correcto
			} else {
				//trae el prefijo pero No al principio. Se lo pongo.
				Tag = Div_X_Div.PREFIJO_TAG + Tag;
			}

		}
		for (let i = intDesde; i <= intHasta; i++) {
			this.array_Base_Divs[i].HOW.Tag = Tag;
		}
		return true;
	}
	/**
	 * resetea la variable de clase .HOW.Tag (Los Tags de la clase) con objetivo de 
	 * buscar tags en aplicacion posterior.oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 */
	resetTagDiv() {
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			this.array_Base_Divs[i].HOW.Tag = Div_X_Div.PREFIJO_TAG;
		}

	}
	/**
	 * Mensaje por consola de los tags de la clase. Para el programador.ooooooooooooooooooooooooooooooooooooo
	 */
	verTags() {
		let txt = '\n=== VER TAGS ===\n' +
			'================\n' +
			this.CONTAINER.id + '|' + this.IDDIV_Family + '\n';
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			txt += '\t[' + i + ']-> ' + this.array_Base_Divs[i].HOW.Tag + '\n';
		}
		txt += '\n--- FIN -----------------------\n';
		return txt;
	}
	/**
	 * 
	 * @param {*} elTag , String con el nombre del tag a buscar.oooooooooooooooooooooooooooooooooooooooooooo
	 * @returns , array con las posiciones en el array que Tienen el Tag pasado
	 * 			, false si hay algun error
	 */
	getArrayTAGs(elTag = '') {
		let arrayReturn = [];
		if (typeof (elTag) != 'string' || elTag == '') return false;
		elTag = this._withOrWithOut_PrefijoTag(elTag);
		//		
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			let unTag = this.array_Base_Divs[i].HOW.Tag;
			if (unTag == elTag) {
				arrayReturn.push(this.array_Base_Divs[i].objDiv);
			}
		}
		return arrayReturn;
	}
	/**
	 * 
	 * @returns Array con los Divs de la Clase Base_Divooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 */
	getArrayDIVS(){
		let arrayReturn = [];
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			arrayReturn.push(this.array_Base_Divs[i].objDiv);
		}
		return arrayReturn;
	}
	/**
	 * ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} intStatus 
	 * @param {*} intDesde 
	 * @param {*} intHasta 
	 * @returns 
	 */
	switchStatus(intStatus = 0, intDesde = 0, intHasta = parseInt(this.array_Base_Divs.length - 1)) {
		if (typeof (intStatus) != 'number') return false;
		if (intDesde > intHasta) return false;
		if (intDesde >= this.array_Base_Divs.length) return false;
		if (typeof (intDesde) != 'number' || intDesde <= 0) intDesde = 0;
		if (typeof (intHasta) != 'number' || intHasta <= 0) intHasta = this.array_Base_Divs.length - 1;
		if (intHasta >= this.array_Base_Divs.length) intHasta = this.array_Base_Divs.length - 1;
		//Proceso. 
		for (let i = intDesde; i <= intHasta; i++) {
			this.array_Base_Divs[i].HOW.Stt = intStatus;
		}

	}
	//
	//Limpia el Status sobre cada elemento de la clase Div_X_Div.ooooooooooooooooooooooooooooooooooooooooooooooooooo
	resetStatus() {
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			this.array_Base_Divs[i].HOW.Stt = Div_X_Div.STATUS_ZERO;
		}
	}
	/**
	 * Mensaje por consola de STATUS de la clase. Para el programador.
	 */
	verStatus() {
		let txt = '=== VER STATUS ===\n' +
			'==================\n' +
			this.CONTAINER.id + '\n';
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			txt += '\t[' + i + ']-> ' + this.array_Base_Divs[i].HOW.Stt + '\n';
		}
		txt += '\n--- FIN -----------------------------------\n';
		return txt;
	}
	/**
	 * 
	 * @param {*} elStatusToSearch , String con el nombre del tag a buscar.
	 * @returns , array con las posiciones en el array que Tienen el Tag pasadooooooooooooooooooooooooooooooooooooooooooooo
	 * 			, false si hay algun error
	 */
	searchSTATUS(elStatusToSearch = 0) {
		arrayReturn = [];
		if (typeof (elStatusToSearch) != 'number') return false;
		//
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			if (this.array_Base_Divs[i].HOW.Stt == elStatusToSearch) {
				arrayReturn.push(i);
			}
		}
		return arrayReturn;
	}
	/**
	 * ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} Flag 
	 * @param {*} intDesde 
	 * @param {*} intHasta 
	 * @returns 
	 */
	switchFlag(Flag = 0, intDesde = 0, intHasta = parseInt(this.array_Base_Divs.length - 1)) {
		if (typeof (Flag) != 'number') return false;
		if (intDesde > intHasta) return false;
		if (intDesde >= this.array_Base_Divs.length) return false;
		if (typeof (intDesde) != 'number' || intDesde <= 0) intDesde = 0;
		if (typeof (intHasta) != 'number' || intHasta <= 0) intHasta = this.array_Base_Divs.length - 1;
		if (intHasta >= this.array_Base_Divs.length) intHasta = this.array_Base_Divs.length - 1;
		//Proceso. 
		for (let i = intDesde; i <= intHasta; i++) {
			this.array_Base_Divs[i].HOW.Flag = Flag;
		}
	}
	/**
	 * Limpia el Status sobre cada elemento de la clase Div_X_Div.ooooooooooooooooooooooooooooooooooooooooooooooooooo
	 */
	resetFlag() {
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			this.array_Base_Divs[i].HOW.Flag = Div_X_Div.FLAG_ZERO;
		}
	}
	/**
	 * Mensaje por consola de STATUS de la clase. Para el programador.oooooooooooooooooooooooooooooooooooooooooooooo
	 * @returns 
	 */
	verFlags() {
		let txt = '\n=== VER FLAGS===' +
			'\n================\n' +
			'( ' + this.CONTAINER.id + '\n )';
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			txt += '\t[' + i + ']->' + this.array_Base_Divs[i].HOW.Flag + '\n';
		}
		txt += '\n--- FIN -----------------------------------\n';
		return txt;
	}
	/**
	 * 
	 * @param {*} elStatusToSearch , String con el nombre del tag a buscar.
	 * @returns , array con las posiciones en el array que Tienen el Tag pasadooooooooooooooooooooooooooooooooooooooooooooooooo
	 * 			, false si hay algun error
	 */
	searchFLAG(elFlagToSearch = 0) {
		arrayReturn = [];
		if (typeof (elFlagToSearch) != 'number') return false;
		//
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			if (this.array_Base_Divs[i].HOW.Flag == elFlagToSearch) {
				arrayReturn.push(i);
			}
		}
		return arrayReturn;
	}
	/**
	 * Devuelve string con  un MAPA de la CLASE CON TODAS LAS VARIABLES.ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @returns 
	 */
	verFamily() {
		let txt = ('\n=== VER FAMILIA ===' +
			'\n===================' +
			'\n\tFAMILY: ' + this.IDDIV_Family +
			'\n\tId CONTENEDOR: ' + this.CONTAINER.id +
			'\n\tId EL PRIMERIZO: ' + this.FirstDiv.objDiv.id +
			'\n\tClassName CONTENEDOR: ' + super.get_className(this.CONTAINER) +
			'\n\tFAMILIA CON  (' + this.array_Base_Divs.length + ') elementos' +
			'\n\tAllinOne?= ' + this.isAllInOne + '\t' +
			'|Visible?= ' + this.bVisible + '\t' +
			'\n\t|Tag?= ' + this.strTag + '' +
			'\t|Flag?: ' + this.Flag + '' +
			'\n\t|Status?: ' + this.intStatus + '' +
			'\n--- FIN -----------------------------------\n');

		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			txt += '\n' + this.IDDIV_Family + ' index: [' + i + ']-->' +
				'\n\t|ID= ' + this.array_Base_Divs[i].objDiv.id +
				'\n\t|className=' + super.get_className(this.array_Base_Divs[i].objDiv) +
				'\n\t|esVisible?=' + this.array_Base_Divs[i].bVisible +
				'\n\t|Status: ' + this.array_Base_Divs[i].HOW.Stt +
				'\n\t|Tag: ' + this.array_Base_Divs[i].HOW.Tag +
				'\n\t|Flag: ' + this.array_Base_Divs[i].HOW.Flag + '\n';
		}
		return txt;
	}
	/**
	 * oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * 
	 * @param {* Cambia Todos los Divs de Contenedor} idDivCONTENEDOR id de un Contenedor que tiene que existir o document.body * 
	 * @param {* =true, Borra el anterior Contenedor} isDeleteEmpty id de un Contenedor válido o document.body * 
	 * 
	 * PROPUESTA DE MEJORA: Añadir un desde-hasta para decir cuales son los divs que cambian de 
	 * Contenedor. 
	 * PROPUESTA DE MEJORA2: Solo se pueden intercambiar(switch) las clases CLASS_divDvd entre si.
	 */

	switchObjContenedor(idDivCONTENEDOR = '', isDeleteEmpty = false) {
		//
		//0)-Validaciones:
		if (typeof (idDivCONTENEDOR) != 'string') return false;
		if (!document.getElementById(idDivCONTENEDOR)) return false;
		if (idDivCONTENEDOR == '') return false;
		//
		if (typeof (isDeleteEmpty) != 'boolean') isDeleteEmpty = false;
		//
		//1)-Quito los divs(this.array_Base_Divs[i].objDiv) del contenedor de la clase.
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			this.CONTAINER.removeChild(this.array_Base_Divs[i].objDiv);
		}
		//
		//super.copy_paste_className(this.CONTAINER, document.getElementById(idDivCONTENEDOR));
		let a = this.CONTAINER.className;
		let b = this.CONTAINER;
		//
		//2)-Cambio el contenedor de la clase.(ahora this.CONTAINER tendrá id=idDivCONTENEDOR)
		//let aux=document.getElementById(idDivCONTENEDOR);
		this.CONTAINER = document.getElementById(idDivCONTENEDOR);
		this.CONTAINER.className = a;
		//
		//3)-Añado al nuevo contenedor(this.CONTAINER) los divs del array(this.array_Base_Divs[i].objDiv)
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			this.CONTAINER.appendChild(this.array_Base_Divs[i].objDiv);
			//super.copy_paste_className()
		}
		if (isDeleteEmpty == true) {
			b.parentNode.removeChild(b);
		}
		return this.CONTAINER;
	} 	//fin addContenedor***************************************************

	/**
	 * ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} strUrlImagen 
	 * @returns 
	 */
	addImgs(strUrlImagen = './') {
		try {
			this.xxx.objDiv.style.position = 'absolute';
		} catch (e) {
			alert('Mensaje: crearDiv: ' + e.message);
			return false;
		}
	}
	/**
	 * la longitud del array es el nuevo elemento:
	 * ____________________________________________________________________
	 * INDEX,LONGITUD=		i=0,length1/i=1,length2/i=2,length3...... el nuevo elemento será: i=3 (index=3) y length=4
	 * NOMBREB_NUMERO=		MiDivBase_0/MiDivBase_1/MiDivBase_2......
	 * @returns 
	 */
	_get_new_id() {
		let strAux = '';
		strAux = this.IDDIV_Family + '_' + this.array_Base_Divs.length;
		//
		if (!document.getElementById(strAux))
			return this.IDDIV_Family + '_' + this.array_Base_Divs.length;
		else
			return false;
	}
	/**
	 * Encuentra un nombre unico para uno que entra sujerido.
	 * add _num al final del nombre para encontrarlo............no usado.....revisar.
	 * @param {*} strAux 
	 * @returns 
	 */
	_get_Secuencial(strAux = Div_X_Div.CONTENEDOR_NONAME) {
		//Validacion de los argumentos:.............>
		if (typeof (strAux) != 'string') return false;
		if (strAux.length <= 2) return false;	//mínimo 2 letras.
		//
		//Working Procedure:........................>
		for (let i = 0; ; i++) {
			if (!document.getElementById(strAux + '_' + i))
				return (strAux + '_' + i);
		}
	}
	/**
	 * GET LA MATRIZ DE OBJETOS oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @returns 
	 */
	get_array_Base_Divs() {
		if (this.array_Base_Divs == null) return null;
		if (typeof (this.array_Base_Divs) != 'object') return null;
		if (this.array_Base_Divs instanceof Array)
			return this.array_Base_Divs;
		return null;
	}

	/**
	 * Devuelve un array con sólo los divs añadidos.
	 * @returns 
	 */
	get_array_divs() {
		let divAux = [];
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			divAux[i] = this.array_Base_Divs[i].objDiv;
		}
		return divAux;
	}

	/** 
					 * _________________________________
					 * PARA TRABAJAR SOBRE LOS ESTILOS: (super)
					 * ''''''''''''''''''''''''''''''''''*/

	/**
	 * Hace switch Visible el Contenedor de la Legior oooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 */
	cssSwitchContenedorVisible() {
		if (this.bVisible == true) {
			this.CONTAINER.style.display = 'none';		//comprobar.
			this.bVisible = false;
		} else {
			this.CONTAINER.style.display = 'visible';		//comprobar valor
			this.bVisible = true;
		}
		//this.CONTAINER
	}
	/**
	 * Establece una clase única para todos los Divsoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} strClassName 
	 * @param {*} isContenedor  false, pone todos los Divs sólo con esa clase.
	 * 							true, pone clase unica sólo al Contenedor.
	 * @returns 
	 */
	set_className_unique(strClassName = '', isContenedor = false) {
		if (typeof (strClassName) != 'string') return false;
		if (strClassName == null || strClassName == '') return false;
		//
		if (typeof (isContenedor) != 'boolean') isContenedor = false;
		//
		if (isContenedor == true) {
			if (super.set_className_unique(this.CONTAINER, strClassName) == true) {
				console.log('\n');
				console.log('*)Classname <' + strClassName + '> asignada con exito al Contenedor: ' + this.CONTAINER.id);
				console.log('\n');
			} else {
				console.log('Error al asignar la clase' + strClassName + ' al Contenedor: ' + this.CONTAINER.id);
			}
			return;
		}
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			if (super.set_className_unique(this.array_Base_Divs[i].objDiv, strClassName) == true) {
				console.log(strClassName + ' asignada con exito al Div: ' + this.CONTAINER.id);
			} else {
				console.log('Error al asignar la clase' + strClassName + ' al Div: ' + this.CONTAINER.id);
			}
		}
	}
	/**
	 * Pone todas las className de cada div creado con la configuracion básica de inicio:
	 * @param {*} isContenedor 
	 * @returns 
	 */
	reset_className(isContenedor = false) {
		if (typeof (isContenedor) != 'boolean') isContenedor = false;
		if (isContenedor == true) {
			super.reset_className(this.CONTAINER);
			return;
		}
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			super.reset_className(this.array_Base_Divs[i].objDiv);
		}
	}
	/**
	 * Add una className al objeto pasado.
	Los argumentos son la clase a añadir y un booleano que si está a true, cambia la clase
	del contenedor y si esta a false cambia los divs internos creados..
	 * @param {*} strClassNameToAdd 
	 * @param {*} bIAmContainer 
	 * @returns 
	 */
	add_className(strClassNameToAdd = '', bIAmContainer = false) {
		if (typeof (strClassNameToAdd) != 'string' || strClassNameToAdd == '') return false;
		if (typeof (bIAmContainer) != 'boolean') bIAmContainer = false;
		//
		//::: Quitar espacios y dobles espacios por delante y por detras con (trim y regExp)....fileformal
		//::: Separar strClassNameToAdd por el char ' ' en un array con la funcion (split)
		//::: Recorrer el array de palabras 
		//
		if (bIAmContainer == true) {
			super.add_className(this.CONTAINER, strClassNameToAdd);
			return;
		} else {
			//super.add_className(this.array_Base_Divs[i].objDiv, strClassNameToAdd);
			for (let j = 0; j < this.array_Base_Divs.length; j++) {
				let arrClassNames = this._get_array_classNames(strClassNameToAdd);
				if (!arrClassNames) {
					//error
				} else {
					for (let i = 0; i < arrClassNames.length; i++) {
						super.add_className(this.array_Base_Divs[j].objDiv, arrClassNames[i]);
					}
				}
			}
		}
	}
	/**
	 * @param {*} cadenaToArraizar cadea que tienes que convertir en un array de retorno.
	 * @returns Array Split Slash('/'), filtrado sin espacios vacios.
	 */
	_get_array_classNames(cadenaToArraizar = '') {
		if (!cadenaToArraizar) return false;
		if (typeof (cadenaToArraizar) != 'string') return false;
		const arrSplit = cadenaToArraizar.split(' ');
		const SP = [''];  //constante para hacer el filter
		return arrSplit.filter(el => !SP.includes(el));   //:::::Elimina vacios
	}
	/**
	 * oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	 * @param {*} strClassNameToAdd 
	 * @param {*} intDesde 
	 * @param {*} intHasta 
	 * @returns 
	 */
	cssAddClassNameByItem(strClassNameToAdd = '', intDesde = 0, intHasta = parseInt(this.array_Base_Divs.length - 1)) {
		if (typeof (strClassNameToAdd) != 'string' || strClassNameToAdd == '') return false;
		//		
		if (intDesde > intHasta) {
			let aux = intHasta;
			intHasta = intDesde;
			intDesde = aux;
		}
		if (intDesde >= this.array_Base_Divs.length) return false;
		if (typeof (intDesde) != 'number' || intDesde <= 0) intDesde = 0;
		if (typeof (intHasta) != 'number' || intHasta <= 0) intHasta = this.array_Base_Divs.length - 1;
		if (intHasta >= this.array_Base_Divs.length) intHasta = this.array_Base_Divs.length - 1;
		//Proceso. 
		for (let i = intDesde; i <= intHasta; i++) {
			super.add_className(this.array_Base_Divs[i].objDiv, strClassNameToAdd);
		}
	}
	/**
	 * 
	 * @param {*} ClassNameToAdd 
	 * @param {*} TAG_To_Match 
	 * @param {*} isContenedor 
	 * @returns 
	 */
	cssAddClassNameByTag(ClassNameToAdd = '', TAG_To_Match = '') {
		if (typeof (ClassNameToAdd) != 'string' || ClassNameToAdd == '') return false;
		if (typeof (isContenedor) != 'boolean') isContenedor = false;
		//
		TAG_To_Match = this._withOrWithOut_PrefijoTag(TAG_To_Match);
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			if (TAG_To_Match == this.array_Base_Divs[i].HOW.Tag)
				super.add_className(this.array_Base_Divs[i].objDiv, ClassNameToAdd);
		}

	}

	/**
	 * Borra una clase pasada como argumento(strClassNameToAdd)
	 * @param {*} strClassNameToDelete 
	 * @param {*} isContenedor 
	 * @returns 
	 */
	cssDeleteClassName(strClassNameToDelete = '', isContenedor = false) {
		if (typeof (strClassNameToDelete) != 'string' || strClassNameToDelete == '') return false;
		if (typeof (isContenedor) != 'boolean') isContenedor = false;
		//
		if (isContenedor == true) {
			super.elimina_className(this.CONTAINER, strClassNameToDelete);
			return;
		}
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			super.elimina_className(this.array_Base_Divs[i].objDiv, strClassNameToDelete);
		}
	}

	/**
	 * Busca un match por tag (sin uso)
	 * @param {*} strTagAux 
	 * @param {*} funcionSiMatch 
	 * @returns 
	 */
	cssSetClassName_TAG(strTagAux = '', funcionSiMatch) {
		if (typeof (strTagAux) != 'string' || strTagAux == '') return false;
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			if (this.array_Base_Divs[i].HOW.strTag == strTagAux) {
				funcionSiMatch;
			}
		}
	}
	/**
	 * 
	 * @returns 
	 */
	cssVerArbol() {
		let txt = '\n=== VER ARBOL ClassNamer ====' +
			'\n=============================' +
			'\n\t| ID CONTENEDOR: ' + this.CONTAINER.id + '' +
			'\n\t| FAMILY: ' + this.IDDIV_Family + '' +
			'\n\t| PATRON: ' + this.FirstDiv.objDiv.id + '' +
			'\n\t|---------------------------';

		txt += ('\n\tCONTENEDOR: ' + this.CONTAINER.id + '\t|| .CLASSNAME: < ' + super.get_className(this.CONTAINER) + ' >');
		txt += '\n\t-----------------------------';
		txt += '\n\t**  DIV \t\t**  TAG \t** FLAG \t** CLASSNAMES....\n';
		for (let i = 0; i < this.array_Base_Divs.length; i++) {
			txt += '\t|| ' + this.array_Base_Divs[i].objDiv.id +
				'\t\t|| ' + this.array_Base_Divs[i].HOW.Tag +
				'\t\t|| ' + this.array_Base_Divs[i].HOW.Flag +
				'\t\t|| ' + super.get_className(this.array_Base_Divs[i].objDiv.id) + '\n';
		}
		txt += '--- FIN -----------------------------------\n';
		return txt;
	}
	/**
	 * Para ver el head de la pagina y poder comprobar las etiquetas <link> y <script>
	 * @returns 
	 */
	cssVerHEAD() {
		return super.verHead();
	}
	/**
	 * Cambia el Archivo.css asignado a la etiqueta <link> que se mete por código
	 * @param {*} strFilePath_LINK 
	 * @returns 
	 */
	cssCambiaFILEPATH(strFilePath_LINK = '') {
		if (typeof (strFilePath_LINK) != 'string' || strFilePath_LINK == '') return false;
		super.switch_file_path(pathArchivo = strFilePath_LINK);
	}
	/**
	 * 
	 */
	pruebaFile() {
		let files = ['archv1', 'archv2', 'archv3', 'archv4']; //Array of files to be added to the FileList
		let dataTransfer = new DataTransfer();
		for (let i = 0; i < files.length; i++) {
			dataTransfer.items.add(files[i]);
		}
		let fileList = dataTransfer.files;
		console.log(fileList[1].name);
		let z = new FileSystemDirectoryReader
	}

	headAddLink(laEtiqueta = '') {
		super.elHEAD.add_etiqueta(laEtiqueta);
	}
	headAddScript(elScript = '') {
		super.elHEAD.add_etiqueta(elScript);
	}
	headDeleteLink() {

	}
	headDeleteScript() { }
	headUpdateLink() { }
	headUpdateScript() { }
	//
	_withOrWithOut_PrefijoTag(elTag = '') {
		if (typeof (elTag) != 'string') return '#'
		//Proceso. 
		const posicionPref = elTag.indexOf(Div_X_Div.PREFIJO_TAG);
		if (posicionPref == -1) {
			//no trae el prefijo.
			elTag = Div_X_Div.PREFIJO_TAG + elTag;
		} else {
			//trae el prefijo
			if (posicionPref == 0) {
				//correcto!! 			
			} else {
				//trae el prefijo pero No al principio. Se lo pongo.
				elTag = Div_X_Div.PREFIJO_TAG + elTag;
			}

		}
		return elTag;

	}
	getItem(index = -1) {
		if (typeof (index) != "number") return false;
		if (index < 0) index = 0;
		if (index >= this.array_Base_Divs.length) index = this.array_Base_Divs.length;
		return this.array_Base_Divs[index].objDiv;
	}
	//
	//=== GETTERS =============================================
	get objContenedor() { return this.CONTAINER; }
	get Array(){return this.array_Base_Divs; }
	get cuantos() { return this.array_Base_Divs.length - 1; }
}


// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * C L A S E  "CLASS_navegador"  	
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/** 
 * Clase que obtiene el nombre del navegador, su version y si es Internet Explorer.
 * CAMBIAR ESTA CLASE POR UN FRAMEWORK DE DETECCION DE NAVEGADORES.??????????????????????????????????????????????????
 
* Ejemplo de uso:
 * 	let miNavegador = new CLASS_navegador();	//clase completa!!
	console.log('nombre Comun Navegador: ' + miNavegador.navegador +'\nVersion: ' + miNavegador.version + '\n es Internet Explorer: ' + miNavegador.isIE + '\n Todos los Navegadores: ' + miNavegador.arrNavegadores);
 * */
class CLASS_navegador {
	static CARACTER_SEPARADOR = ' ';
	isIE = false;
	isOpera = false;
	isSafari = false;
	isFirefox = false;
	isChrome = false;
	isNS;							//=true NO es Internet Explorer.... tecnología NetScape


	cadenaNavegador = '';		//Cadena de texto que contiene  informacion del Navegador. de ella se saca la version.
	claveVersion = '';				//cadena que se encuentra en cadenaNavegador y que dice el tipo de navegador.
	version = '';						//Version del navegador. Extraido de cadenaNavegador.
	navegador = '';					//Nombre comun del navegador usado: Chrome, Safari, Firefox, Opera, Internet Explorer

	arrNavegadores = ['Chrome', 'FireFox', 'Internet Explorer', 'Opera', 'Safari']
	/**
	 * 
	 */
	constructor() {
		this.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		this.isIE = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
		this.isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
		this.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
		//
		if (this.isChrome == true) {
			this.isNS = true;
			this.claveVersion = 'chrome/';
			this.navegador = 'Chrome';
		} else if (this.isFirefox == true) {
			this.isNS = true;
			this.claveVersion = 'firefox/';
			this.navegador = 'FireFox';
		} else if (this.isIE == true) {
			this.isNS = false;
			this.claveVersion = 'msie ';
			this.navegador = 'Internet Explorer';
		} else if (this.isOpera == true) {
			this.isNS = true;
			this.claveVersion = 'version/';
			this.navegador = 'Opera';
		} else if (this.isSafari == true) {
			this.isNS = true;
			this.claveVersion = 'version/';
			this.navegador = 'Safari';
		} else {		//el resto a false.	
			this.claveVersion = ''
			this.navegador = '';
		}
		/*
		* cadenaNavegador contiene toda una cadena con muchos datos útiles sobre el navegador, como la version 
		que se usa en el navegador y el nombre del navegador.*/
		this.cadenaNavegador = navigator.userAgent.toLowerCase();
		//___________________________________________________________
		/**
		 * Versión del navegador. */
		//1)Primero calculamos el indice donde encontramos la clave.
		let indice = this.cadenaNavegador.indexOf(this.claveVersion);	//cacha donde está el principio del nombre del navegador. = (indexOf)chrome/
		if (indice < 0)
			throw ('Error en la Versión del navegador. Cadena claveVersion no encontrada');
		//
		//2)Sacamos otra cadena desde la clave hasta el final.
		let strDesdeClaveHastaVersion = this.cadenaNavegador.substring(indice + this.claveVersion.length, this.cadenaNavegador.length);
		//
		//3)Situamos el caracter separador para saber cual es la version 
		let indexFinVersion = 0;
		for (let i = 0; i < strDesdeClaveHastaVersion.length; i++) {
			let car = strDesdeClaveHastaVersion.charAt(i);
			if (car == CLASS_navegador.CARACTER_SEPARADOR) {
				break;
			} else {
				indexFinVersion++;
			}
		}
		//Desde el principio hasta el caracter separador está la cadena que necesitamos.
		this.version = strDesdeClaveHastaVersion.substring(0, indexFinVersion);
	}
	//
	get claveVersion() {
		return this.claveVersion;
	}
	//
	get navegador() {
		return this.navegador;
	}
	//
	get version() {
		return this.version;
	}
	//Devuelve cadena de navegadores registrados
	get arrNavegadores() {
		return this.arrNavegadores.toString;
	}
	getInfo() {
		let text =
			("\nBrowser CodeName: " + navigator.appCodeName + "</p>" +
				"\nBrowser Name: " + navigator.appName + "</p>" +
				"\nBrowser Version: " + navigator.appVersion + "</p>" +
				"\nCookies Enabled: " + navigator.cookieEnabled + "</p>" +
				"\nBrowser Language: " + navigator.language + "</p>" +
				"\nBrowser Online: " + navigator.onLine + "</p>" +
				"\nPlatform: " + navigator.platform +
				"\nUserAgent Header: " + navigator.userAgent);

		document.getElementById('idInfo').innerHTML = text;
	}
}

// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * CLASS  "Data_File_Formal"  	
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * CLASE que sirve de objeto base para ser usado en la clase File_Formal	        

class Data_File_Formal {
	//:::GENERALES       
	isAbsolute = true;        //  Establezco la Ruta Absoluta = true , Relativa = false.::::::::
	rutaOriginal = '';            //  La ruta original introducida. file:C:/ruta/file.ext:::::::::::
	isValid = false;
	//::::DE ENTRADA
	INTRO_nombreArchivo = '';       //  ArchivoEjemplo.ext
	//:::DEL CLIENTE
	Client_Protocol = '';     //file: , http: , https: , mailto: 
	Client_Unidad = '';       //Unidad en cliente.
	Client_Vector = '';       //vector en el cliente(carpetas sin protocolo, unidad , nombreArchivo.)
	//
	Client_Origin = '';       //     file:// , http:// , https:// , mailto:// 
	//:::DE LA LÓGICA:
	LOGIC_protocol = '';
	LOGIC_unidad = '';
	LOGIC_vector = '';
	//:::COMPILADAS
	INTRO_extension = '';      //  .css, .jpg, .jpeg, .txt
	Client_ActualDIR = '';    // window.location.pathName desde 0 hasta el ultimo slash(/)
	Misc = {
		rutaOrigen: '',
		tipoRuta: '',        //totalMatch-totalIndex ==> '0-0' || '1-1' || '2-1' || '2-2' 
	}
}
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * CLASS  "File_Formal"  	
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

/** 
 * Ejemplo de uso:
	 -let ejFile = new fileFormat('file:/C:/users/Desktop/ficheroEjemplo.css');
	 -ejFile.getData_fromURL([filePath, ''], protocolo[true, false], unidad[true, false], vector[true, false], nombreArchivo[true, false]);  //=>
	 -ejFile.getObjDataFile([filePath, '']);    //=>
	 -ejFile.getStringDataFileClient([objDataFile, ''], protocolo[true, false], unidad[true, false], vector[true, false], nombreArchivo[true, false]);  //=>
	 -ejFile.viewDataFile('Msg Opcional,  datosFichero);  //=> String con todos los valores de this.FileData. falta la conexion con el 'mensajero' 	
 * */
/* *
 * Introduces una Ruta de Archivo, Absoluta o Relativa y lo descompone 
 * separando el nombre de archivo / Unidad / extension / carpetas de la ruta del:  archivo / carpeta actual del cliente / protocolo del cliente.
 * 
 *  No Comprueba la validez de la ruta, sólo intenta ponerlo en formato ruta.  
 *  Tambien se puede comparar por Nombre de Archivo o por Ruta hasta el archivo.
 *  Tambien se puede añadir otro archivo y cambiar el que ya tenemos fijado.
 *  Tambien se pueden ver todas las propiedades del archivo introducido.
 *  No Comprueba la validez de la ruta, sólo intenta ponerlo en formato ruta.
 * */

/**
 *  //https://es.stackoverflow.com/questions/3549/obtener-url-de-donde-estoy-situado-con-javascript
 *  //https://tutobasico.com/propiedade-metodos-objeto-location/
 *  //https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions
 * 
 * */
class File_Formal {
	FileData = new Data_File_Formal();
	filePath = '';       //la ruta pasada como argumento. es la que se va a someter a los filtros para descomposicion.
	isValid = true;      // No quiere decir que sea una ruta válida, sino que tiene formato de ruta.
	
	// ■■■■■■■■■ Expresiones Regulares:    
	static regEXP_SlashSlash = /\/\//g;               	// ►  ( \: ) 2 puntos; (g) Todo.        
	static regEXP_InvertSlash = /[\\]+/g;             	// ► Expresion Barra Invertida.
	static regEXP_Slash = /\//g;                      	// ► Expresion Barra.
	static regEXP_Pto = /\./g;                      	// ►  ( \: ) 2 puntos; (g) Todo.        
	static regEXP_PtoPto = /\.\./g;            			// ► Expresion '../' ; desde el inicio de la cadena(^) ; todas las ocurrencias.
	static regEXP_PtoSlash = /\.\//g;                	// ► Expresion './'  ; desde el inicio de la cadena(^) ; todas las ocurrencias.
	static regEXP_PtoPtoSlash = /\.\.\//g;            	// ► Expresion '../' ; desde el inicio de la cadena(^) ; todas las ocurrencias.
	static regEXP_Char2PtoSlash = /[a-z]\:\//gi;      	// ► [a-z](de la 'a' la 'z' Sólo 1 letra);  '\:\/'(seguido de :/ ))('i' = mayusculas y minusculas)(g=busca todas)
	static regEXP_2PtoSlash = /\:\//g;                	// ► ( \: ) dos puntos; ( \/ ) barra ; g(go global)
	static regEXP_2Puntos = /\:/g;                    	// ► ( \: ) 2 puntos; (g) Todo.        
	
	// ■■■■■■■■■ Contadores de Contadores de caracteres:    
	_cuenta_InvertSlash = 0;        // '\'
	_cuenta_Pto = 0;                // '.'
	_cuenta_Slash = 0;              // '/'
	_cuenta_PtoSlash = 0;           // './'
	_cuenta_PtoPtoSlash = 0;        // '../'
	_cuenta_Char2PtoSlash = 0;      // 'A:/'
	_cuenta_2PtoSlash = 0;            // ':/'
	_cuenta_2Ptos = 0;                // ':'    

	// ■■■■■■■■■ Patrones de Protocol
	arrayPATRON_Protocolo = ['file:', 'ftp:', 'http:', 'https:', 'mailto:'];

	// ■■■■■■■■■ Patrones típicos de un path que puede haber en una  ruta pasada(De momento solo info).
	arrayPatronesExtensiones = ['.css', '.js', '.php', '.htm', '.png', '.jpg', '.jpeg'];
	errorMap;   				// key value para los mensajes de error.
	
	/**
	 * @param {*} filePath String con una ruta relativa o absoluta.
	 * @returns Descomposion del String en sus partes protocolo / unidad / vector / nombreArchivo.ext
	 ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	 */
	constructor(filePath) {
		//:::::::::::::::::
		this.errorMap = new Map();
		//::: Para lanzaError. No Tiene objeto dataFile.
		this.errorMap.set(10, 'Error:::Lavadora:::');
		this.errorMap.set(20, 'Error:::Opcion Imposible:::');
		this.errorMap.set(30, 'Error:::Split en arrSplitSlash_FilePath:::');
		this.errorMap.set(40, 'Error:::To get 2Puntos Info:::');
		this.errorMap.set(50, 'Error:::Ambito Proocolo:::');
		//::: Para isErrorData. Tiene objeto dataFile.
		this.errorMap.set(-10, 'Error:::Nombre Archivo');
		this.errorMap.set(-100, 'Error:::Logic protocol, unidad, vector');
		//:::::::::::::::::::::::
		/**
		 * L a v a d o r a  (trim / slash Invertido / doble Slsah / Borrado Slah ini y fin)   */
		if ((filePath = this._lavadora(filePath)) == false) {
			this._lanzaError(10, filePath); return false;
		}
		/** 
		 * O p c i o n e s    I m p o s i b l e s :*/
		if (this._isOpcionImposible(filePath) == false) {
			this._lanzaError(20, filePath); return false;
		}
		//
		this.filePath = filePath;
		/** 
		 * ::: M a t c h   &   S p l i t :::   * */
		const arrSplitSlash_FilePath = this._getArraySplitSlashFilter(this.filePath);
		if (!arrSplitSlash_FilePath) {
			this._lanzaError(30, this.filePath); return false;
		}
		//
		//::: Devuelve un Objeto de Funcion
		const objMatch_2Ptos = this._getObjMatch2Ptos(arrSplitSlash_FilePath);
		if (!objMatch_2Ptos) {
			this._lanzaError(40, this.filePath); return false;
		}
		//
		//Valida El protocolo con respecto a su ambito (0-0, 1-1, 2-1, 2-2)
		if (this._validaAmbitoProtocolo(arrSplitSlash_FilePath, objMatch_2Ptos) == false) {
			this._lanzaError(50, this.filePath); return false
		}
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::
		//::: C A R G A   D E   D A T O S    G E N E R A L :::
		let datosFichero = new Data_File_Formal();
		datosFichero.isValid = true;
		//:::        
		this._loadDataFileClient(datosFichero);         //::: Carga los datos del Cliente ::::::::: 
		datosFichero.rutaOriginal = this.filePath;
		datosFichero.isAbsolute = this._getAmbitoIsAbsolute(objMatch_2Ptos);
		datosFichero.Misc.tipoRuta = this._getTipoRuta(objMatch_2Ptos);
		//:::::::::::::::::::::::::::::::::::::
		//::: Carga nombreArchivo y extensión.
		datosFichero.INTRO_nombreArchivo = this._getFileName(arrSplitSlash_FilePath);
		datosFichero.INTRO_extension = this._getExtension(datosFichero.INTRO_nombreArchivo);  //aparte de obtener la extension, se hace match con el arrayPatronExtension.
		if (!this._isErrorData(-10, datosFichero)) return false;        //error negativo es error en modo pregunta por los valores de datosFichero.
		//
		datosFichero.LOGIC_protocol = this._getProtocolo(objMatch_2Ptos, datosFichero.Client_Protocol);
		datosFichero.LOGIC_unidad = this._getUnidad(objMatch_2Ptos, datosFichero.Client_Unidad);
		datosFichero.LOGIC_vector = this._getVector(arrSplitSlash_FilePath, objMatch_2Ptos, datosFichero.Client_Vector);
		if (!this._isErrorData(-100, datosFichero)) return false;   //valida todas.
		//
		//::: Formato
		datosFichero.LOGIC_protocol = this._set_2Puntos_FIN(datosFichero.LOGIC_protocol);
		datosFichero.LOGIC_unidad = this._setFormatUnidad(datosFichero.LOGIC_unidad);
		datosFichero.LOGIC_vector = this._putSlash_IniFin(datosFichero.LOGIC_vector, true, true);
		//
		this.FileData = datosFichero;
		this.FileData.isValid = true;
		//
		//????????????????????????????
		//console.log(this.viewDataFile('Constructor!!', this.FileData));
		//console.log('URL ' + this.FileData.rutaOriginal + ' ....... cargada correctamente!!!!');
	}   //..................Fin Constructor...............
	/**:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
* Le paso un String url fichero y me da un String con la ruta que le pido entre (proocolo, unidad, vector y nombreArchivo.ext)
* 
* TB VALE PARA VALIDAR UNA RUTA: strUrl=getData_fromURL('./../laRutaIntro.xxx'); ||  if(ffUrl.FileData.isValid==false) return console.log('fichero no Valido');
* @param {*} filepath String con la ruta.
* @param {*} isProtocol Boolean si quieres el protocolo.
* @param {*} isUnidad  Boolean si quieres unidad.
* @param {*} isVector  Boolean si quieres vector.
* @param {*} isNombreFile Boolean si quieres el nombre del archivo.
* @returns String con la ruta formada según las elecciones de entrada.
*/
	getData_fromURL(filepath = this.filePath, isProtocol = false, isUnidad = false, isVector = false, isNombreFile = true) {
		if (!filepath) return '';
		const DF = this.getObjDataFile(filepath);
		if (DF.isValid == false);
		const strRetorno = this._getStringDataFile(DF, isProtocol, isUnidad, isVector, isNombreFile);
		if (strRetorno == false) {
			return '';
		} else {
			return strRetorno;
		}
	}
	/**
	 * Una vez que se ha introducido una URL y esta es valida, esta funcion te retorna las partes de la url que quieras.
	 * @param {*} isProtocol Boolean si quieres el protocolo.
	 * @param {*} isUnidad Boolean si quieres unidad.
	 * @param {*} isVector Boolean si quieres vector.
	 * @param {*} isNombreFile Boolean si quieres el nombre del archivo.
	 * @returns 
	 */
	getUrl(isProtocol = false, isUnidad = false, isVector = false, isNombreFile = true) {
		if (this.FileData.isValid == false) return '';
		const stRetorno = this._getStringDataFile(this.FileData, isProtocol, isUnidad, isVector, isNombreFile);
		if (stRetorno == false) {
			console.log('Error al Mensajero');
			return '';
		} else {
			return stRetorno;
		}
	}
	/**
	 * @returns retorna la ruta en version relativo desde el directorio actual del cliente.
	 * Da igual que introduzcas una ruta absoluta como en relativo. la única condicion es que tiene que ser una ruta válida(FileData.isValid==true).
	 */
	getUrlRelativa() {
		if (this.FileData.isValid == false) return false
		//
		let arrClientePATRON = this.FileData.Client_Vector.split('/');
		let arrLogico = this.FileData.LOGIC_vector.split('/');
		//        
		const SP = [''];  //constante para hacer el filter
		arrClientePATRON = arrClientePATRON.filter(el => !SP.includes(el));
		arrLogico = arrLogico.filter(el => !SP.includes(el));
		//
		let cuentaMatch = 0;
		let indexMayor = -1;
		//El de mayor longitud es el que manda, en caso de igualdad pongo el del cliente(pero podría ser el otro tb)
		indexMayor = this._getMayorIndex(arrClientePATRON, arrLogico, true);

		let maxIndexMatch = -1
		for (let i = 0; i < indexMayor + 1; i++) {
			//Si alguno de ellos no existe es que ha llegado al final. En cuyo caso hay qu guardar el valor de [i-1] que es la parte comun.
			if (!arrClientePATRON[i] || !arrLogico[i]) {
				maxIndexMatch = i - 1;
				break;
			}
			//Si son iguales suma uno a los directorios Cruzados(match)
			if (arrClientePATRON[i] == arrLogico[i]) {
				cuentaMatch++;
			}
		}
		//::: Creo los diferentes arrays que voy a necesitar.        
		const arrParteComun = arrClientePATRON.slice(0, cuentaMatch);
		const arrDiffCliente = arrClientePATRON.slice(cuentaMatch, arrClientePATRON.length);
		const arrDiffLogic = arrLogico.slice(cuentaMatch, arrLogico.length);
		//
		const intToDel = arrDiffCliente.length;  //con respecto al array del vector cliente cuantos items hay que echar para atras.
		//const sum=arrDiffLogic.length;    //con respecto al array del vector lógic cuantos items hay que sumar a la parte comun.
		//
		//let laParteComun=arrParteComun.join('/');  //el vector que tienen en comun las dos rutasa.
		//
		let PtoPto = '';
		for (let i = 0; i < intToDel; i++) {
			PtoPto += '../';
		}
		if (PtoPto == '') PtoPto = './';
		//        
		const laSuma = arrDiffLogic.join('/');  //La parte del vector no comun introducida.
		//
		const nombreArchivo = this.getUrl(false, false, false, true);
		//::: Esta es la fórmula que da como resultado la ruta relativa!!
		let retorno_RutaRelativa = PtoPto + laSuma + '/' + nombreArchivo;
		retorno_RutaRelativa = this._lavadora(retorno_RutaRelativa);  //Lo paso por la lavadora por si tiene dobleces de Slash.
		//
		console.log('Resultado en Relativo: ' + retorno_RutaRelativa);        //A borrar????????????????
		return retorno_RutaRelativa;
	}
	/**
	 * 
	 * @param {*} array1 array 1 es el que se pasará en caso de que ambos sean iguales de longitud.
	 * @param {*} array2 array de comparacion con array1
	 * @returns el array de longitud mayor o array1 si son iguales.
	 * En caso de que no entre algún array devuelve array vacio ([])
	 */
	_getMayorIndex(array1 = [], array2 = [], isMayor = true) {
		if (!array1 || !array2) return [];
		if (isMayor == true) {
			if (array1.length > array2.length) return array1.length - 1;
			else if (array1.length < array2.length) return array2.length - 1;
			else return array1.length - 1;
		} else {
			if (array1.length < array2.length) return array1.length - 1;
			else if (array1.length > array2.length) return array2.length - 1;
			else return array1.length - 1;
		}
	}

	/**
	 * 
	 * @param {*} DF Objeto DataFile
	 * @param {*} isProtocol true o false si quieres o no el protocolo en la cadena de retorno.
	 * @param {*} isUnidad true o false si quieres o no la unidad en la cadena de retorno.
	 * @param {*} isVector true o false si quieres o no vector(ruta sin el protocolo, unidad y nombre de archivo) en la cadena de retorno.
	 * @param {*} isNombreFile true o false si quieres o no el nombre del archivo(con la extension) en la cadena de retorno.
	 * @returns Un string con las opciones destacadas.
	 */
	getStringDataFileClient(DF = this.FileData, isProtocol = false, isUnidad = false, isVector = false, isNombreFile = true) {
		try {
			if (!DF || DF == null) return '';
			if (DF.isValid == false) return '';
			let resultadoAux = '';
			if (isProtocol == true) resultadoAux = DF.Client_Protocol + '//';
			if (isUnidad == true) resultadoAux += DF.Client_Unidad;
			if (isVector == true) resultadoAux += DF.Client_Vector;
			if (isNombreFile == true) resultadoAux += DF.INTRO_nombreArchivo;

			return resultadoAux;
		} catch (error) {
			return '';
		}
	}
	/**
	  * Retorna todo el mapa del fichero en un string
	  * @param {*} strCabecera String del mensaje de cabecera.
	  * @param {*} dataFILE Objeto FileData relleno( a ser posible )
	  */
	viewDataFile(strCabecera = '', dataFILE = this.FileData) {
		let textoAux = '';
		textoAux += '\n-V E R   F I L E  \n::::::::::::::::';
		textoAux += '\n\"' + strCabecera + '\" \n';
		textoAux += '\n -Entrada  [' + dataFILE.rutaOriginal + ']';
		if (dataFILE.isAbsolute == true) {
			textoAux += '\n\t -Tipo Ruta... Absoluta-';
		} else {
			textoAux += '\n\t -Tipo Ruta... Relativa-'
		}
		textoAux += '\n\t -(TotMatch - TotIndex) = (' + dataFILE.Misc.tipoRuta + ')';
		textoAux += '\n\t -rutaValida? = { ' + dataFILE.isValid + ' }';
		//_____________
		textoAux += '\n\n_______________________';
		textoAux += '\n -Protocolo LOGIC [' + dataFILE.LOGIC_protocol + ']';
		textoAux += '\n -Unidad Disco LOGIC [' + dataFILE.LOGIC_unidad + ']';
		textoAux += '\n -Vector INTRO LOGIC [' + dataFILE.LOGIC_vector + ']';
		//::: Lo Común:::  ya sea absoluta o relativa.      
		textoAux += '\n\n_______________________';
		textoAux += '\n -NombreArchivo INTRO [ ' + dataFILE.INTRO_nombreArchivo + ']';
		//_____________
		//::: En Cliente::: siempre va a tener datos independientemente de la entrada.
		textoAux += '\n\n_______________________';
		textoAux += '\n -Protocolo en Cliente [' + dataFILE.Client_Protocol + ']';
		textoAux += '\n -Unidad en Cliente [' + dataFILE.Client_Unidad + ']';
		textoAux += '\n -Vector en Cliente [' + dataFILE.Client_Vector + ']';
		//::: Calculados:::         
		textoAux += '\n\n -Extension INTRO [' + dataFILE.INTRO_extension + ']';
		textoAux += '\n\n -Actual DIR en Cliente [' + dataFILE.Client_ActualDIR + ']';
		textoAux += '\n\n_______________________';
		textoAux += '\n -_getStringDataFile() [' + this._getStringDataFile(dataFILE, true, true, true, true) + ']';

		//::::::::::::::::::::::::::::::            
		textoAux += '\n\n:::::::::::::::::::::::THE END:::::::::::::::::::::::::::::::::::';
		//textoAux += '    :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::';

		return textoAux;
	}
	/**
	* 
	* @param {*} filePath String de la ruta del fichero con nombre y extension.
	* @returns Objeto DataFile con todos los datos, tanto del cliente como los usados(Logic)
	*/
	getObjDataFile(filePath) {
		//console.log('\n\n===FICHERO====\n* ENTRADA: \n   '+filePath+'\n');
		/**
		 * V a l i d a c i o n   y   L a v a d o r a  (trim / slash Invertido / doble Slsah / Borrado Slah ini y fin)   */
		if ((filePath = this._lavadora(filePath)) == false) { this._lanzaError(10, filePath); return false; }
		/** 
		 * O p c i o n e s    I m p o s i b l e s (Mas validaciones):*/
		if (this._isOpcionImposible(filePath) == false) { this._lanzaError(20, filePath); return false; }
		/** 
		 * :::  S p l i t :::   * */
		const arrSplitSlash_FilePath = this._getArraySplitSlashFilter(filePath);
		if (!arrSplitSlash_FilePath) { this._lanzaError(30, filePath); return false; }
		/** 
		 * :::  Devuelve un   O b j e t o  d e  F u n c i o n :::   * */
		const objMatch_2Ptos = this._getObjMatch2Ptos(arrSplitSlash_FilePath);
		if (!objMatch_2Ptos) { this._lanzaError(40, filePath); return false; }
		//
		console.log('\n[ ' + filePath + ' ]');
		//
		//Valida El protocolo con respecto a su ambito (0-0, 1-1, 2-1, 2-2)
		if (this._validaAmbitoProtocolo(arrSplitSlash_FilePath, objMatch_2Ptos) == false) { this._lanzaError(50, filePath); return false }
		//
		//::::::::::::::::::::::::::::::::::::::
		//::: C A R G A   D E   D A T O S    :::
		let datosFichero = new Data_File_Formal();
		//:::::::::::::::::
		datosFichero.isValid = true;
		//:::
		this._loadDataFileClient(datosFichero);         //::: Carga los datos del Cliente ::::::::: 
		datosFichero.rutaOriginal = filePath;
		datosFichero.isAbsolute = this._getAmbitoIsAbsolute(objMatch_2Ptos);
		datosFichero.Misc.tipoRuta = this._getTipoRuta(objMatch_2Ptos);
		//:::::::::::::::::::::::::::::::::::::
		//::: Carga nombreArchivo y extensión.
		datosFichero.INTRO_nombreArchivo = this._getFileName(arrSplitSlash_FilePath);
		datosFichero.INTRO_extension = this._getExtension(datosFichero.INTRO_nombreArchivo);
		if (!this._isErrorData(-10, datosFichero)) return false;
		//
		//=================================
		datosFichero.LOGIC_protocol = this._getProtocolo(objMatch_2Ptos, datosFichero.Client_Protocol);
		datosFichero.LOGIC_unidad = this._getUnidad(objMatch_2Ptos, datosFichero.Client_Unidad);
		datosFichero.LOGIC_vector = this._getVector(arrSplitSlash_FilePath, objMatch_2Ptos, datosFichero.Client_Vector);
		//================================
		if (!this._isErrorData(-100, datosFichero)) {    //valida todas.
			datosFichero.isValid = false;
			return false;
		}
		else {
			datosFichero.isValid = true;
		}
		//:::Formato
		this._setFormato(datosFichero);
		//::::RETORNO::::::::::::::::::::::::::
		return datosFichero;
	}
	/**
	 * Entra un String. Lo divide en ':' con Split. y cuenta los SP que tiene.
	 * BASES:
	 * -Cuando se genera un split, si el caracter separador (':') está al Ppio o al Final de la String, se genera un Espacio en Blanco (SP)('')
	 * -No puede haber mas de 2 2Puntos(2, 1 , 0 )  file:c:ruta1/ruta2/file.ext
	 * @param {*} strElementArray Elemento del array.
	 * @param {*} indexPart  Que parte del array quieres que retorne.
	 * @returns false si no encuentra el resultado o hay algún error en los datos de entrada.
	 * this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0],0);   primer elemento con 2 puntos, primera parte
	 * this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0],1);   primer elemento con 2 puntos, segunda parte
	 * this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[1],0);   segundo elemento con 2 puntos, primera parte
	 * this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[1],1);   segundo elemento con 2 puntos, segunda parte
	 */
	_getPart_2Ptos(strElementArray = '', indexPart = 0) {
		try {
			if (!strElementArray) return false;
			if (strElementArray.indexOf(':') < 0) return false;
			if (indexPart < 0 || !indexPart) indexPart = 0;
			//Genera el array Split:
			let arrParts_2Puntos = strElementArray.split(':');
			//
			const SP = [''];  //constante para hacer el filter
			const arrSplit_2Puntos_ZeroSP = arrParts_2Puntos.filter(el => !SP.includes(el));   //:::::Elimina vacios
			//
			if (indexPart >= arrSplit_2Puntos_ZeroSP.length) { return false; }
			//
			if (arrSplit_2Puntos_ZeroSP[indexPart]) {
				return arrSplit_2Puntos_ZeroSP[indexPart];
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}
	/**
	 * Devuelve un objMatch2Ptos que contiene TotalMatch TotalIndex, arrIndexItem, arrDataItem
	 * @param {*} arrSplitSlash_FilePath array del fichero de entrada separado por el caracter Slash('/')
	 * @returns TotalMatch TotalIndex, arrIndexItem, arrDataItem en un objeto de funcion objMatch2Ptos
	 */
	_getObjMatch2Ptos(arrSplitSlash_FilePath = []) {
		const objMatch_2Ptos = this._getObjMatchCount(arrSplitSlash_FilePath, File_Formal.regEXP_2Puntos);
		//:::::::::::::::::::::::::::::::::::
		//* Validaciones SOBRE matchCount        
		if (!objMatch_2Ptos) { return false; }
		//
		//::::::::::::::::::::::::::::::::::::::::          
		//Validacion de Posicion de los 2Puntos. Esto es un punto clave de la identificación:
		//si Encuentra los 2Ptos, el valor tiene que estar en la posicion 0 ... ó en la posición 0 y 1 (mas no puede ser porque queda anulada en las opciones imposibles.)
		//El array devuelto tiene las posiciones en las que se encuentran los 2Ptos(no sus valores)
		for (let i = 0; i < objMatch_2Ptos.arrIndexItems.length; i++) {
			if (objMatch_2Ptos.arrIndexItems[i] != i) {      //la posicion igual al valor 
				return false;
			}
		}
		return objMatch_2Ptos;
	}
	/**
	 * 
	 * @param {*} arrSplitSlash_FilePath array del fichero de entrada separado por el caracter Slash('/')
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile 
	 * @returns 
	 */
	_validaAmbitoProtocolo(arrSplitSlash_FilePath, objMatch_2Ptos = null) {
		try {
			const indexProtocolo = this._getIndexProtocol(arrSplitSlash_FilePath);
			//?????
			if (indexProtocolo > 0) {
				return false;
			} else if (indexProtocolo == 0) {    //Encuentra el protocolo... 
				if ((objMatch_2Ptos.TotalMatch == 0 && objMatch_2Ptos.TotalIndex == 0) ||
					(objMatch_2Ptos.TotalMatch == 1 && objMatch_2Ptos.TotalIndex == 1)) {   //...Donde No tiene que estar.
					return false;
				}
			} else if (indexProtocolo != 0) {  //No encuentra el protocolo...
				if ((objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 1) ||   //...Donde Si tiene que estar.
					(objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 2)) {
					return false;
				}
			}
			return true;
		} catch (error) {
			return false;
		}
	}
	/**
	 * 
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile 
	 * @returns true si el ambito es absoluto y false si el ambito es relativo.
	 */
	_getAmbitoIsAbsolute(objMatch_2Ptos) {
		if (objMatch_2Ptos.TotalMatch == 0 && objMatch_2Ptos.TotalIndex == 0) {         //::: RELATIVA 0-0
			return false;
		} else if (objMatch_2Ptos.TotalMatch == 1 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 1-1  unidad:/vector/nombreArchivo.ext
			return true;
		} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 2-1  unidad:/vector/nombreArchivo.ext
			return true;
		} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 2) {   //::: ABSOLUTA 2-2 protocolo:/unidad:/vector/nombreArchivo.ext
			return true;
		} else {
			return null;
		}
	}
	/**
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @returns devuelve el tipo de ruta en funcion de TotalMatch y TotalIndex.
	 */
	_getTipoRuta(objMatch_2Ptos) {
		if (objMatch_2Ptos.TotalMatch == 0 && objMatch_2Ptos.TotalIndex == 0) {         //::: RELATIVA 0-0
			return '0-0';
		} else if (objMatch_2Ptos.TotalMatch == 1 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 1-1  unidad:/vector/nombreArchivo.ext
			return '1-1';
		} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 2-1  unidad:/vector/nombreArchivo.ext
			return '2-1';
		} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 2) {   //::: ABSOLUTA 2-2 protocolo:/unidad:/vector/nombreArchivo.ext
			return '2-2';
		} else {
			return false;
		}
	}
	/**
	 * 
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @param {*} Client_Protocol Protocolo del cliente...por si tiene que ser asignado.
	 * @returns String El protocolo según el ambito y la colocacion de los 2Ptos.
	 */
	_getProtocolo(objMatch_2Ptos, Client_Protocol) {
		try {
			if (objMatch_2Ptos.TotalMatch == 0 && objMatch_2Ptos.TotalIndex == 0) {         //::: RELATIVA 0-0
				return Client_Protocol;   //:::Protocolo: el del Cliente.        
			} else if (objMatch_2Ptos.TotalMatch == 1 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 1-1  unidad:/vector/nombreArchivo.ext
				return this._11_getProtocolo(Client_Protocol);          //:::Protocolo: el del Cliente.            
			} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 2-1  unidad:/vector/nombreArchivo.ext
				return this._21_getProtocolo(objMatch_2Ptos);  //::: Protocolo:             
			} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 2) {   //::: ABSOLUTA 2-2 protocolo:/unidad:/vector/nombreArchivo.ext
				return this._22_getProtocolo(objMatch_2Ptos);             //:::Protocolo: 
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}
	/**
	 * 
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @param {*} Client_Unidad Unidad del cliente...por si tiene que ser asignado.
	 * @returns String El unidad según el ambito y la colocacion de los 2Ptos.
	 */
	_getUnidad(objMatch_2Ptos, Client_Unidad) {
		try {
			if (objMatch_2Ptos.TotalMatch == 0 && objMatch_2Ptos.TotalIndex == 0) {         //::: RELATIVA 0-0
				return Client_Unidad;       //:::Unidad: la del Cliente.            
			} else if (objMatch_2Ptos.TotalMatch == 1 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 1-1  unidad:/vector/nombreArchivo.ext
				return this._11_getUnidad(objMatch_2Ptos);      //:::UNIDAD: INTRO
			} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 2-1  unidad:/vector/nombreArchivo.ext
				return this._21_getUnidad(objMatch_2Ptos);
			} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 2) {   //::: ABSOLUTA 2-2 protocolo:/unidad:/vector/nombreArchivo.ext
				return this._22_getUnidad(objMatch_2Ptos);                           //:::Unidad: INTRO
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}
	/**
	 * 
	 * @param {*} arrSplitSlash_FilePath Array Split con al url de entrada.
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @param {*} Client_Vector String del Vector del cliente.
	 * @returns String del vectot según el ambito y la colocacion de los 2Ptos.
	 */
	_getVector(arrSplitSlash_FilePath, objMatch_2Ptos, Client_Vector) {
		try {
			if (objMatch_2Ptos.TotalMatch == 0 && objMatch_2Ptos.TotalIndex == 0) {         //::: RELATIVA 0-0
				return this._getVector_RutaRelativa(arrSplitSlash_FilePath, Client_Vector); //::: Vector Entrada [.,ruta,File.ext] ::: Sale [ruta,File.ext]
			} else if (objMatch_2Ptos.TotalMatch == 1 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 1-1  unidad:/vector/nombreArchivo.ext
				return this._11_getVector(arrSplitSlash_FilePath, objMatch_2Ptos);      //:::Vector INTRO            
			} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 1) {   //:::ABSOLUTA 2-1  unidad:/vector/nombreArchivo.ext
				return this._21_getVector(arrSplitSlash_FilePath, objMatch_2Ptos);   //:::Vector INTRO
			} else if (objMatch_2Ptos.TotalMatch == 2 && objMatch_2Ptos.TotalIndex == 2) {   //::: ABSOLUTA 2-2 protocolo:/unidad:/vector/nombreArchivo.ext
				return this._22_getVector(arrSplitSlash_FilePath, objMatch_2Ptos);   //:::Vector INTRO
			} else {
				return false;
			}
		} catch (error) {
			return false;
		}
	}
	//====================================================================================
	/**
	 * Devuelve el protocolo de cliente. En una TotMatch=1-totIndex=1 es un patron de unidad:/ruta/file.ext 
	 * @param {*} Client_Protocol el protocolo del cliente. Calculado en loadDataClient()
	 * @returns Protocolo en el cliente.
	 * NOTA: Aqui se puede hacer un cruce entre extension y protocolo para ver si se cruzan.....
	 */
	_11_getProtocolo(Client_Protocol) {
		return Client_Protocol;
	}
	/**
	 * 
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @returns 
	 */
	_11_getUnidad(objMatch_2Ptos) {
		//1-Metodo: con objMatch_2Ptos.
		let unidad = false;
		if (objMatch_2Ptos.arrDataItems[0] != undefined)
			return this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0], 0);
	}
	/**
	 * 
	 * @param {*} arrSplitSlash_FilePath array del fichero de entrada separado por el caracter Slash('/'). Se obiene con this._getArraySplitSlashFilter
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @returns 
	 */
	_11_getVector(arrSplitSlash_FilePath, objMatch_2Ptos) {
		let parteVectorFirst = '';
		//Si existe ruta aux en unidad: ('protocolo:/unidad:ruta/ruta2/file.ext')
		parteVectorFirst = this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0], 1);
		if (!parteVectorFirst) parteVectorFirst = '';
		//
		const nombreArchivo = this._getFileName(arrSplitSlash_FilePath);
		//const parteVectorUnidad=
		let arrVector = this._cutArray_Absolute(arrSplitSlash_FilePath, nombreArchivo, true);
		const vectorIntro = this._cutArray_Absolute(arrVector, objMatch_2Ptos.arrDataItems[0], false);

		return parteVectorFirst + '/' + vectorIntro;
	}
	//====================================================================================        
	/**
	 * 
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @returns protocolo para tipo de url TotMatch = 2, y totIndex = 2
	 *          false si hay algún error.
	 */
	_21_getProtocolo(objMatch_2Ptos) {
		if (objMatch_2Ptos.arrDataItems[0])
			return this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0], 0);
		else
			return false;
	}
	/**
	 * 
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @returns unidad para tipo de url TotMatch = 2, y totIndex = 1
	 *          false si hay algún error.
	 */
	_21_getUnidad(objMatch_2Ptos) {
		if (objMatch_2Ptos.arrDataItems[0])
			return this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0], 1);
		else
			return false;

	}
	/**
	 * 
	 * @param {*} arrSplitSlash_FilePath url Split Slash de la entrada. Se obtiene con this._getArraySplitSlashFilter
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @returns vector para tipo de url TotMatch = 2, y totIndex = 1
	 */
	_21_getVector(arrSplitSlash_FilePath, objMatch_2Ptos = null) {
		let vectorFirstPart = '';
		if (objMatch_2Ptos.arrDataItems[0] != undefined)
			vectorFirstPart = this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0], 2);
		if (vectorFirstPart == false) vectorFirstPart = '';
		//------------------------------------------------------
		const INTRO_nombreArchivo = this._getFileName(arrSplitSlash_FilePath);

		let vectorEntrada = this._cutArray_Absolute(arrSplitSlash_FilePath, INTRO_nombreArchivo, true);
		vectorEntrada = this._cutArray_Absolute(vectorEntrada, objMatch_2Ptos.arrDataItems[0], false);
		//
		return vectorFirstPart + '/' + vectorEntrada;
	}
	//====================================================================================
	/**
	 * 
	 * @param {*} objMatch_2Ptos Objeto con la info de los 2Ptos (:) de la ruta. Se obtiene de this.getObjDataFile
	 * @returns protocolo para tipo de url TotMatch = 2, y totIndex = 2
	 */
	_22_getProtocolo(objMatch_2Ptos) {
		if (objMatch_2Ptos.arrDataItems[0] != undefined)
			return this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[0], 0);
		return false;
	}
	/**
	 * 
	 * @param {*} objMatch_2Ptos objeto de funcion, se obtiene de this.getObjDataFile
	 * @returns unidad para tipo de url TotMatch = 2, y totIndex = 2
	 */
	_22_getUnidad(objMatch_2Ptos) {
		if (objMatch_2Ptos.arrDataItems[1] != undefined)
			return this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[1], 0);
		return false;
	}
	/**
	 * 
	 * @param {*} arrSplitSlash_FilePath url Split Slash de la entrada. Se obtiene con this._getArraySplitSlashFilter
	 * @param {*} objMatch_2Ptos objeto de funcion, se obtiene de this.getObjDataFile
	 * @returns vector para tipo de url TotMatch = 2, y totIndex = 2
	 */
	_22_getVector(arrSplitSlash_FilePath, objMatch_2Ptos) {
		//Si existe ruta aux en unidad: ('protocolo:/unidad:ruta/ruta2/file.ext')
		let vectorAux = '';
		if (this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[1], 1) != false) {
			vectorAux = this._getPart_2Ptos(objMatch_2Ptos.arrDataItems[1], 1);
		}
		//------------------------------------------------------
		const nombreArchivo = this._getFileName(arrSplitSlash_FilePath)

		let vectorEntrada = this._cutArray_Absolute(arrSplitSlash_FilePath, nombreArchivo, true);
		vectorEntrada = this._cutArray_Absolute(vectorEntrada, objMatch_2Ptos.arrDataItems[0], true);
		vectorEntrada = this._cutArray_Absolute(vectorEntrada, objMatch_2Ptos.arrDataItems[1], false);
		if (vectorAux != '')
			return vectorAux + '/' + vectorEntrada;
		else
			return vectorEntrada;
	}
	/**
	 * @param {*} filePath filePath String de la ruta del fichero con nombre y extension.
	 * @returns La cadena lavada [trim || Slash Invertido '\' cambia por '/' || doble Slash '//' cambia por '/' || sin Slash en principio ni final.]
	 */
	_lavadora(filePath = '') {
		if (!filePath || typeof (filePath) != 'string') { return false; }
		if (filePath == null || filePath == undefined || filePath == '') { return false; }

		filePath = filePath.trim();
		filePath = filePath.replaceAll(File_Formal.regEXP_InvertSlash, '/');    //Switch '\' por '/'
		while (filePath.indexOf('//') >= 0) {     //Cambia todos los dobleSlash ('//') por '/'
			filePath = filePath.replace(File_Formal.regEXP_SlashSlash, '/');
		}
		//Quita los slash de inicio y fin.        
		return this._removeSlash_IniFin(filePath, true, true);
	}

	/**
	 * Establece el formato final para aprotocolo, unidad, vector y nombre de archivo.
	 * @param {*} datosFichero objeto DataFile.
	 */
	_setFormato(datosFichero = this.FileData) {
		datosFichero.LOGIC_protocol = this._set_2Puntos_FIN(datosFichero.LOGIC_protocol);
		datosFichero.LOGIC_unidad = this._setFormatUnidad(datosFichero.LOGIC_unidad);
		datosFichero.LOGIC_vector = this._putSlash_IniFin(datosFichero.LOGIC_vector, true, true);
		datosFichero.INTRO_nombreArchivo = this._removeSlash_IniFin(datosFichero.INTRO_nombreArchivo, false, false);
	}
	/**
	 * @param {*} filePath ruta del fichero de entrada.
	 * @returns Array Split Slash('/'), filtrado sin espacios vacios.
	 */
	_getArraySplitSlashFilter(filePath = '') {
		if (!filePath) return false;
		if (typeof (filePath) != 'string') return false;
		const arrSplitSlash_FilePath = filePath.split('/');
		const SP = [''];  //constante para hacer el filter
		return arrSplitSlash_FilePath.filter(el => !SP.includes(el));   //:::::Elimina vacios
	}
	/**
	 * Valida si en la ruta introducida hay alguna opcion imposible (C:ruta:protocolo:nombreArchivo)
	 * @param {*} filePath String con la ruta introducida.
	 * @returns true, no es opcion imposible, false, es opcion imposible.
	 */
	_isOpcionImposible(filePath = this.filePath) {
		//
		if (!this._setCuentas(filePath)) return false;
		let isValido = true;
		/**
		 * ===================================================
		 * O p c i o n e s    I m p o s i b l e s :         */
		if (this._cuenta_Pto == 0) { isValido = false; }
		if (this._cuenta_2Ptos > 2) { isValido = false; }
		if (this._cuenta_2PtoSlash > 2) { isValido = false; }
		if (this._cuenta_Char2PtoSlash > 2) { isValido = false; }
		//
		//.....Para no mezclar absoluta y relativa:
		if (this._cuenta_Char2PtoSlash > 0 && this._cuenta_PtoPtoSlash > 0) { isValido = false; }
		if (this._cuenta_Char2PtoSlash > 0 && this._cuenta_PtoSlash > 0) { isValido = false; }
		if (this._cuenta_2Ptos == 2 && this._matchRutaProtocolo(filePath) == false) { isValido = false; }
		if (this._cuenta_2Ptos > 0 && this._cuenta_2Ptos <= 2 && this._cuenta_Slash == 0) { isValido = false; }  //file:C:ruta File.ext
		//
		//::: Retorno
		return isValido;

	}
	/**
	 * @param {*} filePath url de entrada.
	 * @returns true, todo correcto. false error en las cuentas.
	 */
	_setCuentas(filePath) {
		try {
			if (!filePath) return false;
			this._cuenta_PtoPtoSlash = (filePath.match(File_Formal.regEXP_PtoPtoSlash) || []).length;
			this._cuenta_PtoSlash = (filePath.match(File_Formal.regEXP_PtoSlash) || []).length;
			this._cuenta_Char2PtoSlash = (filePath.match(File_Formal.regEXP_Char2PtoSlash) || []).length;
			this._cuenta_Pto = (filePath.match(File_Formal.regEXP_Pto) || []).length;
			this._cuenta_2PtoSlash = (filePath.match(File_Formal.regEXP_2PtoSlash) || []).length;
			this._cuenta_2Ptos = (filePath.match(File_Formal.regEXP_2Puntos) || []).length;
			this._cuenta_Slash = (filePath.match(File_Formal.regEXP_Slash) || []).length;
			return true;
		} catch (error) {
			return false;
		}
	}
	/**
	 * 
	 * @param {*} idError 
	 * @param {*} FileData 
	 * @returns 
	 */
	_isErrorData(idError, FileData) {
		if (FileData.isValid == false)
			return false;
		if (!FileData)//...y no pasas FileData...
			return true;//...devuelvo true.
		if (idError == -10) {
			if (FileData.Misc.tipoRuta == false || FileData.isAbsolute == null ||
				FileData.INTRO_extension == false || FileData.INTRO_nombreArchivo == false) {
				FileData.isValid = false;
				this._lanzaError(idError, FileData.rutaOriginal);
				return false;
			}
		}
		if (idError == -100) {
			if (FileData.Misc.tipoRuta == false || FileData.isAbsolute == null ||
				FileData.LOGIC_protocol == false || FileData.LOGIC_unidad == false || FileData.LOGIC_vector == false || FileData.INTRO_nombreArchivo == false) {
				FileData.isValid = false;
				this._lanzaError(idError, FileData.rutaOriginal);
				return false;
			}
		}
		return FileData.isValid;
	}
	/**
	 * @param {*} idError Numero de error lanzado.
	 * @param {*} strError cadena con el msg que quieres que se muestre. filePath. 
	 */
	_lanzaError(idError = 0, strError = '*Error*') {
		const Value = this.errorMap.get(idError);
		let txt = '\n\n::::::::::::::::::: ERROR ::::::::::::::::::::::::::::::::::::::::'
		txt += ('\nIdError: ' + idError + '\nEntrada: ' + strError + '\n' + Value);
		txt += '\n::::::::::::::::::::The End:::::::::::::::::::::::::::::::::::::::'
		console.log(txt);
		//return false;
	}
	/**
	 * Resetea el DataFile.
	 * @param {*} strMSG String con el contenido del reseteo.... 
	 * @param {*} FileData Objeto DataFile to reset
	 */
	_reset(strMSG = '', FileData = this.FileData) {
		FileData.Client_ActualDIR = strMSG;
		FileData.Client_Origin = strMSG;
		FileData.Client_Protocol = strMSG;
		FileData.Client_Unidad = strMSG;
		FileData.Client_Vector = strMSG;

		FileData.INTRO_extension = strMSG;
		FileData.INTRO_nombreArchivo = strMSG;

		FileData.LOGIC_protocol = strMSG;
		FileData.LOGIC_unidad = strMSG;
		FileData.LOGIC_vector = strMSG;

		FileData.isAbsolute = false;
		FileData.isValid = false;
	}
	/**
	 * Recibe una cadena de texto y Pone Slash('') al inicio y/o al final. 
	 * Uso: (Pertenece a las funciones de formato de vector y unidad)
	 * @param {*} strCadenaToSlash String de la cadena a Poner el slash.
	 * @param {*} isINI boolean, Pone el slash del Inicio de la cadena.
	 * @param {*} isFIN boolean, Pone el slash del Final de la cadena.
	 * @returns 
	 */
	_putSlash_IniFin(strCadenaToSlash, isINI = false, isFIN = false) {
		// Inicio '/'
		if (strCadenaToSlash.indexOf('/') != 0 && isINI == true) {
			strCadenaToSlash = '/' + strCadenaToSlash;
		}
		// Fin '/'
		let ultimoCharAux = strCadenaToSlash.substring(strCadenaToSlash.length - 1);
		if (ultimoCharAux != '/' && isFIN == true) {
			strCadenaToSlash = strCadenaToSlash + '/';
		}
		return strCadenaToSlash;
	}
	/**
	 * Pone 2Puntos(':') al final de la caadena si no lo tiene ya.     * Uso: (Pertenece a las funciones de formato de unidad y protocolo)
	 * @param {*} strCadenaToSlash String de la cadena a poner los 2Ptos.
	 * @returns La cadena resultantes.
	 */
	_set_2Puntos_FIN(strCadenaToSlash) {
		// Fin '/'
		let ultimoCharAux = strCadenaToSlash.substring(strCadenaToSlash.length - 1);
		if (ultimoCharAux != ':') {
			strCadenaToSlash = strCadenaToSlash + ':';
		}
		return strCadenaToSlash;
	}
	/**
	 * Elimina Slash del inicio y/o final. Uso: (Pertenece a las funciones de formato de vector y unidad)
	 * @param {*} strCadenaToSlash String de la cadena a Eliminar el slash.
	 * @param {*} isINI boolean, Elimina el slash del inicio de la cadena.
	 * @param {*} isFIN boolean, Elimina el slash del final de la cadena.
	 * @returns la Cadena introducida sin slash.
	 */
	_removeSlash_IniFin(strCadenaToSlash, isINI = false, isFIN = false) {
		// Inicio '/'
		if (strCadenaToSlash.indexOf('/') == 0 && isINI == true) {
			strCadenaToSlash = strCadenaToSlash.substring(1, strCadenaToSlash.length);
		}
		// Fin '/'
		let ultimoCharAux = strCadenaToSlash.substring(strCadenaToSlash.length - 1);
		if (ultimoCharAux == '/' && isFIN == true) {
			strCadenaToSlash = strCadenaToSlash.substring(0, strCadenaToSlash.length - 1 - 1);
		}
		return strCadenaToSlash;
	}
	/** 
	 * Cuenta la cantidad de '../' seguidos 
	 * @param {*} arraySplitSlash array del fichero de entrada separado por el caracter Slash('/')
	 * @param {*} cuentaIN es el número de caracteres './'  del que hay que partir en el arraySplitSlash.  
	 * @returns false, error estructural
	 *          Cantidad de '../' seguidos desde cuentaIN
	 * */
	_cuentaPtoPto_BackDir(arrSplitSlash_FilePath) {
		const objetoMatch_PtoPto = this._matchCountInArray(arrSplitSlash_FilePath, '..');
		let arrIndexes_PtoPto = objetoMatch_PtoPto.arrIndexItems;
		//
		//Valida que el primer PtoPto se encuentra en la primera posicion del array. No permite Xejem 'ruta/../file.ext'
		if (objetoMatch_PtoPto.arrIndexItems[0])
			if (objetoMatch_PtoPto.arrIndexItems[0] != 0)
				return null;
		//
		//Valida que los PtoPto están en posiciones consecutivas. No permite Xejem '../ruta/../file.ext'
		for (let i = 0; i < objetoMatch_PtoPto.arrIndexItems; i++) {
			if (objetoMatch_PtoPto.arrIndexItems[i] != i) return null;
		}
		//
		return objetoMatch_PtoPto.arrIndexItems.length;

	}
	/**
	 * @param {*} arrSplitSlash_FilePath array del fichero de entrada separado por el caracter Slash('/')
	 * @returns el array sin el elemento '.'   Pej. de './ruta/./ruta/file.ext' a ruta/ruta/file.ext
	 */
	_Remove_ActualDir(arrSplitSlash_FilePath) {
		const Punto = ['.'];  //constante para hacer el filter
		const arrSinPto = arrSplitSlash_FilePath.filter(el => !Punto.includes(el));
		return arrSinPto;
	}
	/**
	 * Entra un array y Devuelve Un array o un String, que no incluye los elementos coincidentes con un argumento pasado.
	 * @param {*} arraySplitSlash  array del fichero de entrada separado por el caracter Slash('/')
	 * @param {*} strToCut El elemento del array que quieres cortar.
	 * @param {*} retornoArray ==true, retorna un array || ==false, retorna un string.
	 * @returns 
	 *      */
	_cutArray_Absolute(arrSplitSlash_FilePath = this.FileData, strToCut = '', retornoArray = true) {
		if (typeof (arrSplitSlash_FilePath) != 'array' && typeof (arrSplitSlash_FilePath) == 'string') {
			arrSplitSlash_FilePath = arrSplitSlash_FilePath.split('/');
		}
		//::: Quito el nombre de archivo(pasado como arg).
		const arrVector = arrSplitSlash_FilePath.filter(el => !strToCut.includes(el));
		if (retornoArray == true) {
			return arrVector;
		} else {
			return arrVector.join('/');
		}
	}
	/**
	 * Busca profunda(usando regExp en la funcion MATCH) cuantas coincidencias hay en cada item en un array de split slash
	 * Funcion fundamental para la lógica de la clase.
	 * @param {*} arrFilePath array con un split ('/' o ':')
	 * @param {*} strMatch la cadena a buscar en cada uno de los item del array
	 * @returns Retorna un objeto de funcion con los valores 
	 *   TotalIndex, número total de items en el array(pej totalIndex==1 indica que todos los ':' encontrados están en un solo elemento del array).
	 *   TotalMatch, número total de coincidencias encontradas. (pej. totalMatch==2 significa que hay 2 coincidencias encontradas en el array).
		 ::: Ambas opciones combinadas dan todas las posibilidades de ruta válida(por esta clase).
			TotalMatch==0 , TotalIndex==0 )-Puede ser una ruta relativa o error. Significa que no ha encontrado ':' en ningún item del array  pasado.
			TotalMatch==1 , TotalIndex==1 )-Puede ser una ruta absoluta tipo C:/ruta/file.ext . Significa que ha encontrado ':' en un item del array pasado.
			TotalMatch==2 , TotalIndex==1 )-file:C:/ruta/file.ext   ,Significa que ha encontrado 2 coincidencias ':' en un solo item.  
			TotalMatch==2 , TotalIndex==2 )-file:/C:/ruta/file.ext   ,Significa que ha encontrado 2 coincidencias ':' en un 2 items.  
			El resto tiene que ser un error.
	 *   arrIndexItems   array con los indices donde se han encontrado las coincidencias. vale para validacion de protocolo y unidad.
	 *   arrDataItems    array con los datos de los items encontrados ( Pej. [file:, c:] ,Pej. [c:] ,Pej. [],Pej. [file:C:ruta] )
	 */
	_getObjMatchCount(arrFilePath = [], strMatch = '') {
		try {
			let cuentaStrMatch = 0;
			let cuentaItems = 0;  //en el número de items distintos.
			let arrIndexItems = [];   //Contiene las posiciones de los items separados....los valores i.
			let arrDataItems = [];    //Contiene los datos del array encontrado.
			for (let i = 0; i < arrFilePath.length; i++) {
				if ((arrFilePath[i].match(strMatch) || []).length > 0) {
					cuentaStrMatch += parseInt((arrFilePath[i].match(strMatch) || []).length);
					cuentaItems++;
					arrIndexItems.push(i);
					arrDataItems.push(arrFilePath[i]);
				}
			}

			const SP = [''];  //constante para hacer el filter
			arrIndexItems = arrIndexItems.filter(el => !SP.includes(el));   //:::::Elimina vacios
			arrDataItems = arrDataItems.filter(el => !SP.includes(el));   //:::::Elimina vacios

			return {
				TotalIndex: cuentaItems,
				TotalMatch: cuentaStrMatch,
				arrIndexItems,
				arrDataItems,
			}
		} catch (error) {
			return false;
		}
	}
	/**
 * Compartativa directa 1 a 1 (sin patrones regExp).
 * @param {*} arrFilePath 
 * @param {*} strMatch Cadena a contar (':' , '..' , '.' )
 * @returns Objeto de funcion con : 
 *              items = Numero total de items del array match....o 0
 *              total = Numero total de match del elemento.......o 0
 *              arrIndexItems=array con las posiciones match..........o [] (array vacio)
 */
	_matchCountInArray(arrSplitSlash_FilePath = [], strMatch = '') {
		try {
			let cuentaStrMatch = 0;
			let arrIndexItems = [];
			for (let i = 0; i < arrSplitSlash_FilePath.length; i++) {
				if (arrSplitSlash_FilePath[i] == strMatch) {
					cuentaStrMatch++;
					arrIndexItems.push(i);
				}
			}

			return {
				TotalMatch: cuentaStrMatch,
				arrIndexItems,
			}
		} catch (error) {
			return false;
		}
	}
	/**
	 * Cruza Mi array de protocolos con el la ruta pasada como argumento.
	 * @param {*} filePath cadena de texto con una ruta de archivo.
	 * @returns false...no encontrado.
	 *          el protocolo encontrado.
	 */
	_matchRutaProtocolo(filePath = '') {
		for (let i = 0; i < this.arrayPATRON_Protocolo.length; i++) {
			if (filePath.indexOf(this.arrayPATRON_Protocolo[i]) >= 0) {
				return this.arrayPATRON_Protocolo[i];
			}
		}
		return false;
	}
	/**
	 * Obtiene el index del array donde se encuentra el protocolo. Fundamental para la validacion del protocolo.
	 * @param {*} arrSplitSlash_FilePath array de la ruta en split('/')
	 * @returns el número de posicion del protocolo en el array o -1 si no encuentra el protocolo.
	 */
	_getIndexProtocol(arrSplitSlash_FilePath) {
		try {
			let isEncontrado = false;
			let indiceEncontrado = -1;

			const primero = this._getPrimeroNoVacio(arrSplitSlash_FilePath);
			let arrFirstSplit2Ptos = primero.split(':');
			// 
			for (let i = 0; i < this.arrayPATRON_Protocolo.length; i++) {
				for (let j = 0; j < arrFirstSplit2Ptos.length; j++) {
					if (this.arrayPATRON_Protocolo[i] == arrFirstSplit2Ptos[j] + ':') {
						isEncontrado = true;
						indiceEncontrado = j;
						break;
					}
				}
				if (isEncontrado == true) break;
			}
			//
			return indiceEncontrado;
		} catch (error) {
			return -1;
		}

	}
	/**
	 * Cruza el dato pasado con el patron de extensiones
	 * @param {*} extensionToMatch  extensión con formato .ext (con punto) a buscar.
	 * @returns     true=encontrado || false=no encontrado.
	 */
	_isMatchExtension(extensionToMatch = '') {
		if (!extensionToMatch || extensionToMatch == '' || extensionToMatch == null || extensionToMatch == undefined) return false;
		//__________________
		//Info de Extension:(busca si la tengo registrada en el array)
		for (let i = 0; i < this.arrayPatronesExtensiones.length; i++) {
			if (extensionToMatch == this.arrayPatronesExtensiones[i]) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Descompone un archivo que entra
	 * @param {*} arrSplitSlash_FilePath Array Split '/' de filePath 
	 * @returns String con el primer elemento del array no vacio.
	 */
	_getFileName(arrSplitSlash_FilePath = []) {
		if (!arrSplitSlash_FilePath) { return false; }
		if (arrSplitSlash_FilePath == null || arrSplitSlash_FilePath == undefined) { return false; }
		//const regExp_Extension=/\.[0-9a-z]{1,5}$/i;   // de 1 a 5 la extension resultante
		const regExp_Extension = /\.[0-9a-z]+$/i;         // Expresion de extension.
		//:::::::::::::::::::::::::::::
		//Cacha el último no vacío ('')
		const last = this._getPrimeroNoVacio(arrSplitSlash_FilePath, true);
		let lastAux = last.match(regExp_Extension);
		if (!lastAux) {   //console.log('Nombre no encontrado');                
			return false;
		} else {          //console.log('Nombre encontrado!!... '+arrSplitSlash_FilePath[i]);
			return last;
		}
	}
	/**
	 * //Hay que sumar el vector introducido(.[/ruta/]File.ext) al vector en cliente (/users/pc/Desktop/) 
	 * @param {*} arrSplitSlash_FilePath Array Split '/' de filePath 
	 * @param {*} INTRO_nombreArchivo    el nombre del archivo   
	 * @param {*} Client_Vector         el vector en cliente.
	 * @param {*} cuentaBACK            El número de cuenta atras que hay que hacer. es el numero de '../'
	 * @returns El vector de retorno de la Ruta Relativa
	 */
	_getVector_RutaRelativa(arrSplitSlash_FilePath, Client_Vector) {
		//
		//Borra los elementos del array '..'
		const arrSplit_Sin_Pto = this._Remove_ActualDir(arrSplitSlash_FilePath);
		const cuentaBACK = this._cuentaPtoPto_BackDir(arrSplit_Sin_Pto);
		if (cuentaBACK == null) { return false; }
		//
		let vectorEntrada = '';
		vectorEntrada = this._getVectorINTRO_Relativa(arrSplit_Sin_Pto);

		if (vectorEntrada == null) return false;
		vectorEntrada = this._putSlash_IniFin(vectorEntrada, false, true);
		//:::::::::::::::::::::::::::
		//:::Vector: sobre la ruta del Directorio del Cliente. //::: Entra ('/ruta1/ruta2/ruta3/ruta4/' ,  1) ::: Sale '/ruta1/ruta2/ruta3'
		let vectorBackCliente = '';
		vectorBackCliente = this._getVectorBACK_Relativa(Client_Vector, cuentaBACK);
		vectorBackCliente = this._putSlash_IniFin(vectorBackCliente, true, true);
		//
		let vectorRetorno = vectorBackCliente + '/' + vectorEntrada;
		// 
		//Formato: Por si se ha doblado algun Slash('/')....sobre todo en el caso: 'file.ext'
		while (vectorRetorno.indexOf('//') >= 0) {
			vectorRetorno = vectorRetorno.replace(File_Formal.regEXP_SlashSlash, '/');
		}
		//vectorRetorno=this._putSlash_IniFin(vectorRetorno, true, true);
		//_________________
		return vectorRetorno;
	}
	/**
	 * (sin uso)
	 * @param {*} arrSplitSlash_FilePath 
	 * @returns el vector de entrada de una ruta relativa.
	 */
	_getVectorINTRO_R(arrSplitSlash_FilePath) {
		//Borra los elementos del array '..'
		const arrSplit_Sin_Pto = this._Remove_ActualDir(arrSplitSlash_FilePath);
		//
		let vectorEntrada = '';
		vectorEntrada = this._getVectorINTRO_Relativa(arrSplit_Sin_Pto);
		if (!vectorEntrada) return false;
		vectorEntrada = this._putSlash_IniFin(vectorEntrada, false, true);
		return vectorEntrada;
	}
	/**
	 * Devuelve el primer elemento no vacio ('') del array.
	 * Al hacer split, se crean arrays y si terminan en Slash('/') genera un espacio vacio [C:,ruta, file.ext,''] 
	 * @param {*} arrSplitSlash_FilePath Array Split '/' de filePath.
	 * @param {*} isBack =true, empieza por el final || =false, empieza por el principio
	 * @returns String con el primer elemento no vacío del array.
	 */
	_getPrimeroNoVacio(arrSplitSlash_FilePath = [], isBack = false) {
		if (!arrSplitSlash_FilePath) { return false; }
		if (arrSplitSlash_FilePath == null || arrSplitSlash_FilePath == undefined) { return false; }
		//const regExp_Extension=/\.[0-9a-z]{1,5}$/i;   // de 1 a 5 la extension resultante
		const regExp_Extension = /\.[0-9a-z]+$/i;         // Expresion de extension.
		//:::::::::::::::::::::::::::::
		//Cacha el último (o el primero )no vacío ('') en el array
		if (isBack == true) {   //Por el final
			for (let i = arrSplitSlash_FilePath.length - 1; i >= 0; i--) {
				if (arrSplitSlash_FilePath[i] == '')
					continue;
				return arrSplitSlash_FilePath[i];
			}
			return false;   //retorna array lleno de vacio([,,,])
		} else {      //Por el principio(isBack==false)
			for (let i = 0; i < arrSplitSlash_FilePath.length; i++) {
				if (arrSplitSlash_FilePath[i] == '')
					continue;
				return arrSplitSlash_FilePath[i];
			}
			return false;   //retorna array lleno de vacio([,,,])
		}
	}
	/**
	 * Obtiene el 1, 2, 3 elemento no vacío del array de entrada
	 * @param {*} arrSplitSlash_FilePath Array Split '/' de filePath.
	 * @param {*} intN Numero de posiciones que quieres no vacío. pej ['','','a', 'b', 'c', 'd'] ==> intN=2 ==> 'b'
	 * @returns 
	 */
	_get_N_NO_Vacio(arrSplitSlash_FilePath = [], intN = 1) {
		if (intN == 0) return arrSplitSlash_FilePath;
		let cuenta = 1;
		for (let i = 0; i < arrSplitSlash_FilePath.length; i++) {
			if (arrSplitSlash_FilePath[i] == '')
				continue;
			if (intN == cuenta) {
				return arrSplitSlash_FilePath[i];
			} else {
				cuenta++;
			}
		}
		return false;   //retorna array lleno de vacio([,,,])
	}
	/**
	 * Para obtener un dato de un fichero Cachado
	 * @param {*} DF Objeto FileData, se consigue llamando a this.getObjDataFile(filepath)
	 * @param {*} isProtocol boolean , true si quieres el protocolo
	 * @param {*} isUnidad boolean, true si quieres la unidad
	 * @param {*} isVector boolean , true si quieres el vector
	 * @param {*} isNombreFile boolean, true si quieres el nombre de archivo
	 * @returns String con las opciones de la ruta elegida.
	 */
	_getStringDataFile(DF = this.FileData, isProtocol = false, isUnidad = false, isVector = false, isNombreFile = true) {
		try {
			if (!DF || DF == null) return false;
			let resultadoAux = '';
			if (isProtocol == true) resultadoAux = DF.LOGIC_protocol + '//';
			if (isUnidad == true) resultadoAux += DF.LOGIC_unidad;
			if (isVector == true) resultadoAux += DF.LOGIC_vector;
			if (isNombreFile == true) resultadoAux += DF.INTRO_nombreArchivo;

			return resultadoAux;
		} catch (error) {
			return '';
		}
	}

	/**
	 * Devuelve la extension. Llamar despues de getFileName()
	 * @param {*} strFileName cadena de texto del nombre del archivo completo.
	 * @returns String con la extension en forma '.ext'
	 */
	_getExtension(strFileName) {
		try {
			if (typeof (strFileName) != 'string' || !strFileName || strFileName == false || strFileName == null) return false;
			if (strFileName.lastIndexOf('.') < 0) return false;

			const strExtension = strFileName.substring(strFileName.lastIndexOf('.'), strFileName.length);

			const bExtensionEncontrada = this._isMatchExtension(strExtension);
			if (bExtensionEncontrada == true) {

			} else {

			}
			return strExtension;
		} catch (error) {
			return false;
		}

	}
	/**
	 * @param {*} strFILEPATH cadena de texto de una ruta a un archivo(separado con '/')
	 * @param {*} intCountBack num de cuenta atras en los directorios.
	 * @returns Devuelve una cadena de texto con la ruta alternativa.
	 */
	_getVectorBACK_Relativa(strFILEPATH, intCountBack = 1) {
		//______________________________________________________________
		//Separa el directorioActual calculado del cliente por el caracter '/' en un array.
		let arraySplit_ActualDIR = strFILEPATH.split('/');
		//______________________
		arraySplit_ActualDIR.filter(el => Boolean);        //elimina vacios
		let arrAux = arraySplit_ActualDIR.slice(0, arraySplit_ActualDIR.length - intCountBack - 1);    //devuelve un trozo del array
		let strAux = arrAux.join('/');    //recompone en str
		return strAux;
	}

	/**
	 * @param {*} arrSplitSlash_FilePath = Array Split '/' de filePath. 
	 * @param {*} INTRO_nombreArchivo = El nombre del archivo a extraer de la ruta relativa.
	 * @returns Devuelve el vector de una ruta relativa.
	 * 0=no encuentra pero no hay error estructural.
	 * false=error en la entrada     *    */
	_getVectorINTRO_Relativa(arrSplitSlash_FilePath = []) {
		const objetoMatch_Pto = this._matchCountInArray(arrSplitSlash_FilePath, '.');
		//
		//Valida que vienen los datos en las posiciones iniciales.
		if (objetoMatch_Pto.arrIndexItems != null || objetoMatch_Pto.arrIndexItems != undefined) {
			if (objetoMatch_Pto.arrIndexItems.length != 0) {
				for (let i = 0; i < objetoMatch_Pto.arrIndexItems.length; i++) {
					if (objetoMatch_Pto.arrIndexItems[i] != i) {      //la posicion igual al valor 
						return null;
					}
				}
			}
		}
		/**
		 *     */
		const objetoMatch_PtoPto = this._matchCountInArray(arrSplitSlash_FilePath, '..');
		if (!objetoMatch_PtoPto) return null;
		//
		//Valida que vienen los datos en las posiciones iniciales.
		if (objetoMatch_PtoPto.arrIndexItems != null || objetoMatch_PtoPto.arrIndexItems != undefined) {
			if (objetoMatch_PtoPto.arrIndexItems.length != 0) {
				for (let i = 0; i < objetoMatch_PtoPto.arrIndexItems.length; i++) {
					if (objetoMatch_PtoPto.arrIndexItems[i] != i) {      //la posicion igual al valor 
						return null;
					}
				}
			}
		}
		//
		const nombreArchivo = this._getFileName(arrSplitSlash_FilePath);
		//        
		//::: Ahora Trabajo con el array de entrada 1º quito '.' 
		const Punto = ['.'];  //constante para hacer el filter
		const arrSinPto = arrSplitSlash_FilePath.filter(el => !Punto.includes(el));
		//::: 2º quito '..' 
		const PuntoPunto = ['..'];  //constante para hacer el filter
		const arrSinPtoPto = arrSinPto.filter(el => !PuntoPunto.includes(el));
		//::: Ahora quito el nombre de archivo(pasado como arg).
		const vectorEntrada = String(arrSinPtoPto.filter(el => !nombreArchivo.includes(el)).join('/'));
		//
		return vectorEntrada;
	}

	/**
	 * PONE FORMATO /:C a la unidad.
	 * @param {*} strUnidad String de la unidad cachada.
	 * @returns '/C:'
	 */
	_setFormatUnidad(strUnidad = '') {
		strUnidad = this._removeSlash_IniFin(strUnidad, true, true);
		strUnidad = this._putSlash_IniFin(strUnidad, true, false);
		strUnidad = this._set_2Puntos_FIN(strUnidad);
		return strUnidad;
	}
	/**
	 *  Carga los Datos del Cliente en el Objeto pasado fileData.
	 * @param {*} fileData estructura vacía del objeto DataFile.
	 */
	_loadDataFileClient(fileData = this.FileData) {
		/**_______________________________________________________________________________________________
		* C A R G A    D E   D A T O S    G E N E R A L (Datos del cliente, nombreArchivo y extension)
		''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
		let loc = window.location;
		let pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
		fileData.Client_ActualDIR = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
		//_____________________________
		fileData.Client_ActualDIR = fileData.Client_ActualDIR.replace(fileData.Client_Origin, '');
		//
		//Unidad en el cliente 
		let unidadClienteAux = fileData.Client_ActualDIR.replace(loc.origin, '');
		let indexAux = unidadClienteAux.indexOf(':/') + 1;
		unidadClienteAux = unidadClienteAux.substring(0, indexAux);
		//_____________________________
		fileData.Client_Unidad = unidadClienteAux;
		//
		//Vector en el cliente (Carpetas sin protocolo/unidad/...Vector.../Nombre de archivo)
		let vectorClienteAux = fileData.Client_ActualDIR.replace(loc.origin, '');
		vectorClienteAux = vectorClienteAux.replace(File_Formal.regEXP_Char2PtoSlash, '');
		//_____________________________
		fileData.Client_Vector = vectorClienteAux;
		//_____________________________
		fileData.Client_Protocol = loc.protocol;     //
		fileData.Client_Origin = loc.origin;         //

	}


}
/*FFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIINNNNNNNNNNNNNNNNNNNNNN
					f i n    CLASE 	File_Formal
FFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIINNNNNNNNNNNNNNNNNNNNNN*/
