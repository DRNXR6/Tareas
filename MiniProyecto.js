const contPrincipal = document.getElementById("contPrincipal");
const aside = document.getElementById("aside");
const main = document.getElementById("main");
const contTareas = document.getElementById("contTareas");
const tareaInput = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("btnAgregar");
const reset = document.getElementById("reset");

let Listacompletadas = JSON.parse(localStorage.getItem('completadas')) || [];
let Listapendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
let tareasDesactivadas = JSON.parse(localStorage.getItem('desactivadas')) || [];

// Función para agregar tareas
btnAgregar.addEventListener("click", function () {
  const nuevaTarea = tareaInput.value.trim();

  if (nuevaTarea === "") {
    alert("¡Ingrese una tarea!");
  } 
  
  else {
    const estado = document.getElementById("estado");

    if (estado.value === "pendiente") {
      Listapendientes.push(nuevaTarea);
      localStorage.setItem("pendientes", JSON.stringify(Listapendientes));
      crearTareaP(nuevaTarea, Listapendientes.length - 1);
    }

    if (estado.value === "completada") {
      Listacompletadas.push(nuevaTarea);
      localStorage.setItem("completadas", JSON.stringify(Listacompletadas));
      crearTareaC(nuevaTarea, Listacompletadas.length - 1);
    }

    tareaInput.value = "";
  }
});

// Crear tarea pendiente
const crearTareaP = (inputValue = '', index) => {
  const tareaDiv = document.createElement("div");
  tareaDiv.classList.add("tarea");
  
  const estadoP = document.createElement("div");
  estadoP.id = "estadoP";

  let h1 = document.createElement("h1");
  h1.innerText = inputValue;
  
  let img = document.createElement("img");
  img.src = "img/basurero.png";
  img.id = "imgBasurero";
  
  let botonEliminar = document.createElement("button");
  botonEliminar.id = "borrar";
  botonEliminar.appendChild(img);
  
  let imgEdit = document.createElement("img");
  imgEdit.src = "img/edit.png";
  imgEdit.id = "imgEdit";
  
  let btnEdit = document.createElement("button");
  btnEdit.id = "editar";
  btnEdit.appendChild(imgEdit);
  
  let btnDesactivar = document.createElement("button");
  btnDesactivar.id = "power"


  let imgDesactivar = document.createElement("img");
  imgDesactivar.src ="img/power.svg";
  imgDesactivar.id = "imgPower"
  
  btnDesactivar.appendChild(imgDesactivar);


  tareaDiv.appendChild(estadoP);
  tareaDiv.appendChild(h1);
  tareaDiv.appendChild(botonEliminar);
  tareaDiv.appendChild(btnEdit);
  tareaDiv.appendChild(btnDesactivar);
  
  contTareas.appendChild(tareaDiv);

  // Eliminar tarea
  botonEliminar.addEventListener("click", function () {

    let EliminarT1 = confirm("¿Deseas eliminar la tarea?")

    if(EliminarT1 == true) {
      contTareas.removeChild(tareaDiv);
      Listapendientes.splice(index, 1);
      localStorage.setItem("pendientes", JSON.stringify(Listapendientes));
    }

  });


  btnEdit.addEventListener("click", function () {
    editarTarea(index, Listapendientes, "pendiente"); // Para tareas pendientes
  });


// Función para editar tarea
const editarTarea = (index, lista, tipo) => {

  // Mostrar prompt para editar el valor y el estado
  const nuevoValor = prompt("Edita la tarea:", lista[index]);
  const nuevoEstado = prompt("Nuevo estado: (pendiente/completada)");

  // Validar que el valor y estado sean correctos
  if (nuevoValor !== null && nuevoValor.trim() !== "" && (nuevoEstado === "pendiente" || nuevoEstado === "completada")) {
    lista[index] = nuevoValor.trim();

    // Actualizar el estado
    if (nuevoEstado === "pendiente") {
      // Si la tarea estaba en "completadas", moverla a "pendientes"
      if (tipo === "completadas") {
        Listacompletadas.splice(index, 1);
        Listapendientes.push(nuevoValor.trim());
      }
    } 
    
    if (nuevoEstado === "completada") {

      // Si la tarea estaba en "pendientes", moverla a "completadas"
      if (tipo === "pendientes") {
        Listapendientes.splice(index, 1);
        Listacompletadas.push(nuevoValor.trim());
      }
    }

    // Actualizar el localStorage con las listas modificadas
    localStorage.setItem("pendientes", JSON.stringify(Listapendientes));
    localStorage.setItem("completadas", JSON.stringify(Listacompletadas));

    // Recargar las tareas para reflejar los cambios
    location.reload();
  } 
  
  else {
    alert("Valor o estado no válidos.");
  }
};

  // Desactivar tarea
  btnDesactivar.addEventListener("click", function () {
    desactivarTarea(index, Listapendientes);
  });
}

// Crear tarea completada
const crearTareaC = (inputValue = '', index) => {
  const tareaDiv = document.createElement("div");
  tareaDiv.classList.add("tarea");

  const estadoC = document.createElement("div");
  estadoC.id = "estadoC";

  let h1 = document.createElement("h1");
  h1.innerText = inputValue;
  
  let img = document.createElement("img");
  img.src = "img/basurero.png";
  img.id = "imgBasurero";
  
  let botonEliminar = document.createElement("button");
  botonEliminar.id = "borrar";
  botonEliminar.appendChild(img);

  let imgEdit = document.createElement("img");
  imgEdit.src = "img/edit.png";
  imgEdit.id = "imgEdit";
  
  let btnEdit = document.createElement("button");
  btnEdit.id = "editar";
  btnEdit.appendChild(imgEdit);
  
  let btnDesactivar = document.createElement("button");
  btnDesactivar.id = "power"

  let imgDesactivar = document.createElement("img");
  imgDesactivar.src ="img/power.svg";
  imgDesactivar.id = "imgPower"

  
  btnDesactivar.appendChild(imgDesactivar);


  tareaDiv.appendChild(estadoC);
  tareaDiv.appendChild(h1);
  tareaDiv.appendChild(botonEliminar);
  tareaDiv.appendChild(btnEdit);
  tareaDiv.appendChild(btnDesactivar);

  contTareas.appendChild(tareaDiv);

  // Eliminar tarea
  botonEliminar.addEventListener("click", function () {
    let EliminarT = confirm("¿Deseas eliminar la tarea?")

    if(EliminarT == true) {
      contTareas.removeChild(tareaDiv);
      Listacompletadas.splice(index, 1);
      localStorage.setItem("completadas", JSON.stringify(Listacompletadas));
    }
  });

  // Editar tarea
  btnEdit.addEventListener("click", function () {
    editarTarea(index, Listacompletadas, "completada");

  });

  // Desactivar tarea
  btnDesactivar.addEventListener("click", function () {
    desactivarTarea(index, Listacompletadas);
  });
}

// Desactivar tarea
const desactivarTarea = (index, lista) => {
  const tarea = lista.splice(index, 1)[0];
  tareasDesactivadas.push(tarea);

  localStorage.setItem("pendientes", JSON.stringify(Listapendientes));
  localStorage.setItem("completadas", JSON.stringify(Listacompletadas));
  localStorage.setItem("desactivadas", JSON.stringify(tareasDesactivadas));
  location.reload();
}

// Mostrar tareas desactivadas
const mostrarDesactivadas = () => {

  tareasDesactivadas.forEach((tarea, index) => {

    const tareaDiv = document.createElement("div");
    tareaDiv.classList.add("tarea");
    
    const estadoD = document.createElement("div");
    estadoD.id = "estadoD";

    let h1 = document.createElement("h1");
    h1.innerText = tarea;
    
    let imgReactivar = document.createElement("img");
    imgReactivar.src ="img/power.svg";
    imgReactivar.id = "imgPower2"

    let btnReactivar = document.createElement("button");
    btnReactivar.id = "powerR"
    btnReactivar.addEventListener("click", () => reactivarTarea(index));

    btnReactivar.appendChild(imgReactivar);



  
  
    

    tareaDiv.appendChild(estadoD);
    tareaDiv.appendChild(h1);
    tareaDiv.appendChild(btnReactivar);

    contTareas.appendChild(tareaDiv);
  });
}

// Reactivar tarea
const reactivarTarea = (index) => {
  const tarea = tareasDesactivadas.splice(index, 1)[0];

  Listapendientes.push(tarea);
  localStorage.setItem("pendientes", JSON.stringify(Listapendientes));
  localStorage.setItem("completadas", JSON.stringify(Listacompletadas));
  localStorage.setItem("desactivadas", JSON.stringify(tareasDesactivadas));
  location.reload();
}

// Filtrar tareas cuando se cambia la opción en el select
Filtro.addEventListener("change", function () {
  contTareas.innerHTML = '';
  
  if (Filtro.value === "completada") {
    Listacompletadas.forEach((tarea, index) => crearTareaC(tarea, index));
  }
  
  if (Filtro.value === "pendiente") {
    Listapendientes.forEach((tarea, index) => crearTareaP(tarea, index));
  } 
  
  if (Filtro.value === "todas") {
    Listapendientes.forEach((tarea, index) => crearTareaP(tarea, index));
    Listacompletadas.forEach((tarea, index) => crearTareaC(tarea, index));
  }

  if (Filtro.value === "desactivadas") {
    mostrarDesactivadas();
  }
});

// Resetear todo
reset.addEventListener("click", function () {

  let Resetear = confirm("¿Deseas borrar TODO?")

  if(Resetear == true) {
    localStorage.clear();
    location.reload();
  }

});

// Cargar tareas al inicio
if (Filtro.value === "todas") {

  Listapendientes.forEach((tarea, index) => crearTareaP(tarea, index));
  Listacompletadas.forEach((tarea, index) => crearTareaC(tarea, index));

}

if (Filtro.value === "desactivadas") {
  mostrarDesactivadas();
}
