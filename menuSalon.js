    
// Llama a la función y pasa el ID del contenedor
// generarMenuNavegacion('ContenedorMenuSup');
function generarMenuNavegacion(contenedorId) {
    // Obtén el contenedor por su ID
    const contenedor = document.getElementById(contenedorId);

    // Verifica si el contenedor existe
    if (!contenedor) {
        console.error(`Contenedor con id "${contenedorId}" no encontrado.`);
        return;
    }

    // Crea el div principal del menú de navegación
    const containerFluid = document.createElement("div");
    containerFluid.className = "container-fluid row";

    // === MESA ===
    const mesaDiv = document.createElement("div");
    mesaDiv.className = "col-1 d-flex align-items-center justify-content-center";
    
        const mesaImg = document.createElement("img");
        mesaImg.id = "imgMesaMenu";
        mesaImg.height = 40;
        mesaImg.style.cursor = "pointer";
        mesaImg.alt = "Mesa";
        mesaImg.draggable = true;
        mesaImg.ondragstart = (event) => dragStart(event);
        mesaImg.src = "./imagenes/mesa.png";
        mesaDiv.appendChild(mesaImg);

        const mesaLabelDiv = document.createElement("div");
        mesaLabelDiv.className = "col-1 d-flex align-items-center";
        mesaLabelDiv.innerHTML = '<div class="fw-bold" id="LBLnumMesas">(0)</div>';

    // === PUERTA DE SALIDA ===
    const puertaDiv = document.createElement("div");
    puertaDiv.className = "col-1 d-flex align-items-center justify-content-center";
    
        const puertaImg = document.createElement("img");
        puertaImg.src = "./imagenes/puerta.png";
        puertaImg.id = "puertaDrop";
        puertaImg.height = 40;
        puertaImg.style.cursor = "pointer";
        puertaImg.alt = "Puerta de Salida";
        puertaImg.ondrop = (event) => DropPuerta(event);
        puertaImg.ondragover = (event) => AllowDrop(event);
        puertaDiv.appendChild(puertaImg);

    // === SILLA ===
    const sillaDiv = document.createElement("div");
    sillaDiv.className = "col-1 d-flex align-items-center justify-content-center";
    
        const sillaImg = document.createElement("img");
        sillaImg.src = "./imagenes/silla.png";
        sillaImg.id = "imgSillaMenu";
        sillaImg.height = 40;
        sillaImg.style.cursor = "pointer";
        sillaImg.draggable = true;
        sillaImg.alt = "Silla";
        sillaImg.ondragstart = (event) => dragStart(event);
        sillaDiv.appendChild(sillaImg);

        const sillaLabelDiv = document.createElement("div");
        sillaLabelDiv.className = "col-1 d-flex align-items-center";
        sillaLabelDiv.innerHTML = '<div class="fw-bold" id="LBLnumSillas">(0)</div>';

    // === FORMULARIO ===
    const formularioDiv = document.createElement("div");
    formularioDiv.className = "col-5";

    const form = document.createElement("form");
    form.id = "FormMenuUP";

    const formRow = document.createElement("div");
    formRow.className = "row align-items-center";

    // Botón Add
    const addButtonDiv = document.createElement("div");
    addButtonDiv.className = "col-2 offset-1";
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "btn btn-secondary btn-sm";
    addButton.style.fontSize = "10px";
    addButton.textContent = "Add";
    addButton.onclick = () => AddSillas();
    addButtonDiv.appendChild(addButton);

    // Input Txt_NSillas
    const txtSillasDiv = document.createElement("div");
    txtSillasDiv.className = "col-2";
    const txtSillas = document.createElement("input");
    txtSillas.type = "text";
    txtSillas.className = "form-control form-control-sm";
    txtSillas.id = "Txt_NSillas";
    txtSillas.style.fontSize = "10px";
    txtSillas.value = "1";
    txtSillas.onclick = () => resetSillasForm();
    txtSillasDiv.appendChild(txtSillas);

    // Botón COLS
    const colButtonDiv = document.createElement("div");
    colButtonDiv.className = "col-2";
        const colButton = document.createElement("button");
        colButton.id = "Btn_NCOL";
        colButton.type = "button";
        colButton.className = "btn btn-secondary btn-sm";
        colButton.style.fontSize = "10px";
        colButton.textContent = "COLS";
        colButton.onclick = () => AddCOLs();
        colButtonDiv.appendChild(colButton);

    // Input Txt_NCOL
    const txtColDiv = document.createElement("div");
    txtColDiv.className = "col-2";
        const txtCol = document.createElement("input");
        txtCol.type = "text";
        txtCol.className = "form-control form-control-sm";
        txtCol.id = "Txt_NCOL";
        txtCol.style.fontSize = "10px";
        txtCol.value = "0";
        txtColDiv.appendChild(txtCol);

    // Total Baldosas Label
    const totalBaldosasDiv = document.createElement("div");
    totalBaldosasDiv.className = "col-1";
        const totalBaldosasLabel = document.createElement("div");
        totalBaldosasLabel.className = "fw-bold";
        totalBaldosasLabel.id = "TotalBaldosas";
        totalBaldosasLabel.textContent = "*";
        totalBaldosasDiv.appendChild(totalBaldosasLabel);

    // Agrega todos los elementos del formulario a la fila
    formRow.appendChild(addButtonDiv);
    formRow.appendChild(txtSillasDiv);
    formRow.appendChild(colButtonDiv);
    formRow.appendChild(txtColDiv);
    formRow.appendChild(totalBaldosasDiv);

    // Agrega la fila al formulario y el formulario al div del formulario
    form.appendChild(formRow);
    formularioDiv.appendChild(form);

    // Añadir todos los elementos creados al contenedor principal
    containerFluid.appendChild(mesaDiv);
    containerFluid.appendChild(mesaLabelDiv);
    containerFluid.appendChild(document.createElement("div")).className = "col-1"; // Espaciador
    containerFluid.appendChild(puertaDiv);
    containerFluid.appendChild(document.createElement("div")).className = "col-1"; // Espaciador
    containerFluid.appendChild(sillaDiv);
    containerFluid.appendChild(sillaLabelDiv);
    containerFluid.appendChild(formularioDiv);

    // Inserta el contenedor completo en el DOM
    contenedor.appendChild(containerFluid);
}

function crearFormulario() {
    // Crear el contenedor del formulario
    const formularioDiv = document.createElement("div");
    formularioDiv.className = "col-5";

    // Crear el formulario
    const form = document.createElement("form");
    form.id = "FormMenuUP";

    // Crear la fila del formulario
    const rowDiv = document.createElement("div");
    rowDiv.className = "row align-items-center";

    // Crear botón "Add"
    const btnAddDiv = document.createElement("div");
    btnAddDiv.className = "col-2 offset-1";
    const btnAdd = document.createElement("button");
    btnAdd.type = "button";
    btnAdd.className = "btn btn-secondary btn-sm";
    btnAdd.style.fontSize = "10px";
    btnAdd.textContent = "Add";
    btnAdd.onclick = function() { AddSillas(); }; // Llama a la función AddSillas
    btnAddDiv.appendChild(btnAdd);

    // Crear input para el número de sillas
    const inputSillasDiv = document.createElement("div");
    inputSillasDiv.className = "col-2";
    const inputSillas = document.createElement("input");
    inputSillas.type = "text";
    inputSillas.className = "form-control form-control-sm";
    inputSillas.id = "Txt_NSillas";
    inputSillas.style.fontSize = "10px";
    inputSillas.value = "1";
    inputSillas.onclick = function() { resetSillasForm(); }; // Llama a la función resetSillasForm
    inputSillasDiv.appendChild(inputSillas);

    // Crear botón "COLS"
    const btnColsDiv = document.createElement("div");
    btnColsDiv.className = "col-2";
    const btnCols = document.createElement("button");
    btnCols.id = "Btn_NCOL";
    btnCols.type = "button";
    btnCols.className = "btn btn-secondary btn-sm";
    btnCols.style.fontSize = "10px";
    btnCols.textContent = "COLS";
    btnCols.onclick = function() { AddCOLs(); }; // Llama a la función AddCOLs
    btnColsDiv.appendChild(btnCols);

    // Crear input para el número de columnas
    const inputColsDiv = document.createElement("div");
    inputColsDiv.className = "col-2";
    const inputCols = document.createElement("input");
    inputCols.type = "text";
    inputCols.className = "form-control form-control-sm";
    inputCols.id = "Txt_NCOL";
    inputCols.style.fontSize = "10px";
    inputCols.value = "0";
    inputColsDiv.appendChild(inputCols);

    // Crear el total de baldosas
    const totalBaldosasDiv = document.createElement("div");
    totalBaldosasDiv.className = "col-1";
    const totalBaldosas = document.createElement("div");
    totalBaldosas.className = "fw-bold";
    totalBaldosas.id = "TotalBaldosas";
    totalBaldosas.textContent = "*";
    totalBaldosasDiv.appendChild(totalBaldosas);

    // Agregar todos los elementos a la fila
    rowDiv.appendChild(btnAddDiv);
    rowDiv.appendChild(inputSillasDiv);
    rowDiv.appendChild(btnColsDiv);
    rowDiv.appendChild(inputColsDiv);
    rowDiv.appendChild(totalBaldosasDiv);

    // Agregar la fila al formulario
    form.appendChild(rowDiv);
    // Agregar el formulario al contenedor
    formularioDiv.appendChild(form);

    // Insertar el formulario en el contenedor principal
    document.getElementById("ContenedorFormulario").appendChild(formularioDiv);
}
