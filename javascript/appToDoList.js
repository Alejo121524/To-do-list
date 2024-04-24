let categorías = [
    {
      título: "Personal",
      img: "chico.png",
    },
    {
      título: "Trabajo",
      img: "maletín.png",
    },
    {
      título: "Compras",
      img: "compras.png",
    },
    {
      título: "Programación",
      img: "diseño-web.png",
    },
    {
      título: "Salud",
      img: "cuidado-de-la-salud.png",
    },
    {
      título: "Fitness",
      img: "mancuerna.png",
    },
    {
      título: "Educación",
      img: "educación.png",
    },
    {
      título: "Finanzas",
      img: "ahorro.png",
    },
  ];
  
  let tareas = [
    {
      id: 1,
      tarea: "Ir al mercado",
      categoría: "Compras",
      completada: false,
    },
    {
      id: 2,
      tarea: "Leer un capítulo de un libro",
      categoría: "Personal",
      completada: false,
    },
    {
      id: 3,
      tarea: "Preparar presentación para reunión",
      categoría: "Trabajo",
      completada: false,
    },
    {
      id: 4,
      tarea: "Completar desafío de programación",
      categoría: "Programación",
      completada: false,
    },
    {
      id: 5,
      tarea: "Dar un paseo de 30 minutos",
      categoría: "Salud",
      completada: false,
    },
    {
      id: 6,
      tarea: "Hacer un entrenamiento HIIT de 20 minutos",
      categoría: "Fitness",
      completada: false,
    },
    {
      id: 7,
      tarea: "Ver un video educativo en línea",
      categoría: "Educación",
      completada: false,
    },
    {
      id: 8,
      tarea: "Revisar presupuesto mensual",
      categoría: "Finanzas",
      completada: false,
    },
    {
      id: 9,
      tarea: "Comprar comestibles para la semana",
      categoría: "Compras",
      completada: false,
    },
    {
      id: 10,
      tarea: "Escribir en un diario",
      categoría: "Personal",
      completada: false,
    },
    {
      id: 11,
      tarea: "Enviar correos electrónicos de seguimiento",
      categoría: "Trabajo",
      completada: false,
    },
    {
      id: 12,
      tarea: "Trabajar en un proyecto secundario de programación",
      categoría: "Programación",
      completada: false,
    },
    {
      id: 13,
      tarea: "Probar una nueva receta saludable",
      categoría: "Salud",
      completada: false,
    },
    {
      id: 14,
      tarea: "Asistir a una clase de yoga",
      categoría: "Fitness",
      completada: false,
    },
    {
      id: 15,
      tarea: "Leer un artículo sobre un nuevo tema",
      categoría: "Educación",
      completada: false,
    },
    {
      id: 16,
      tarea: "Configurar pagos de facturas automáticos",
      categoría: "Finanzas",
      completada: false,
    },
    // Tareas adicionales para cada categoría
    {
      id: 17,
      tarea: "Comprar ropa nueva",
      categoría: "Compras",
      completada: false,
    },
    {
      id: 18,
      tarea: "Meditar durante 10 minutos",
      categoría: "Personal",
      completada: false,
    },
    {
      id: 19,
      tarea: "Preparar agenda para reunión de equipo",
      categoría: "Trabajo",
      completada: false,
    },
    {
      id: 20,
      tarea: "Depurar un problema de software",
      categoría: "Programación",
      completada: false,
    },
    {
      id: 21,
      tarea: "Probar una nueva receta para el almuerzo",
      categoría: "Salud",
      completada: false,
    },
    {
      id: 22,
      tarea: "Salir a correr",
      categoría: "Fitness",
      completada: false,
    },
    {
      id: 23,
      tarea: "Aprender un nuevo idioma en línea",
      categoría: "Educación",
      completada: false,
    },
    {
      id: 24,
      tarea: "Leer sobre historia",
      categoría: "Educación",
      completada: false,
    },
    {
      id: 25,
      tarea: "Revisar cartera de inversiones",
      categoría: "Finanzas",
      completada: false,
    },
    // Agregar más tareas para cada categoría según sea necesario
  ];
  
  // Definir funciones
  const guardarLocal = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  };
  
  const obtenerLocal = () => {
    const tareasLocal = JSON.parse(localStorage.getItem("tareas"));
    if (tareasLocal) {
      tareas = tareasLocal;
    }
  };
  
  const alternarPantalla = () => {
    pantallaEnvoltura.classList.toggle("mostrar-categoría");
  };
  
  const actualizarTotales = () => {
    const tareasCategoría = tareas.filter(
      (tarea) =>
        tarea.categoría.toLowerCase() === categoríaSeleccionada.título.toLowerCase()
    );
    numTareas.textContent = `${tareasCategoría.length} Tareas`;
    totalTareas.textContent = tareas.length;
  };
  
  const renderizarCategorías = () => {
    contenedorCategorías.innerHTML = "";
    categorías.forEach((categoría) => {
      const tareasCategoría = tareas.filter(
        (tarea) => tarea.categoría.toLowerCase() === categoría.título.toLowerCase()
      );
      const div = document.createElement("div");
      div.classList.add("categoría");
      div.addEventListener("click", () => {
        pantallaEnvoltura.classList.toggle("mostrar-categoría");
        categoríaSeleccionada = categoría;
        actualizarTotales();
        títuloCategoría.textContent = categoría.título;
        imagenCategoría.src = `images/${categoría.img}`;
        renderizarTareas();
      });
  
      div.innerHTML = `
                    <div class="izquierda">
                  <img src="images/${categoría.img}"
                   alt="${categoría.título}"
                    />
                  <div class="contenido">
                    <h1>${categoría.título}</h1>
                    <p>${tareasCategoría.length} Tareas</p>
                  </div>
                </div>
                <div class="opciones">
                  <div class="botón-de-activación">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </div>
                </div>
      `;
  
      contenedorCategorías.appendChild(div);
    });
  };
  
  const renderizarTareas = () => {
    contenedorTareas.innerHTML = "";
    const tareasCategoría = tareas.filter(
      (tarea) =>
        tarea.categoría.toLowerCase() === categoríaSeleccionada.título.toLowerCase()
    );
    if (tareasCategoría.length === 0) {
      contenedorTareas.innerHTML = `<p class="sin-tareas">No se han agregado tareas para esta categoría</p>`;
    } else {
      tareasCategoría.forEach((tarea) => {
        const div = document.createElement("div");
        div.classList.add("envoltura-de-tarea");
        const label = document.createElement("label");
        label.classList.add("tarea");
        label.setAttribute("for", tarea.id);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = tarea.id;
        checkbox.checked = tarea.completada;
        checkbox.addEventListener("change", () => {
          const índice = tareas.findIndex((t) => t.id === tarea.id);
          tareas[índice].completada = !tareas[índice].completada;
          guardarLocal();
        });
        div.innerHTML = `
        <div class="borrar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                `;
        label.innerHTML = `
                <span class="marca-de-verificación"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <p>${tarea.tarea}</p>
          `;
        label.prepend(checkbox);
        div.prepend(label);
        contenedorTareas.appendChild(div);
  
        const borrarBtn = div.querySelector(".borrar");
        borrarBtn.addEventListener("click", () => {
          const índice = tareas.findIndex((t) => t.id === tarea.id);
          tareas.splice(índice, 1);
          guardarLocal();
          renderizarTareas();
        });
      });
  
      renderizarCategorías();
      actualizarTotales();
    }
  };
  
  const alternarFormularioAgregarTarea = () => {
    envolturaAgregarTarea.classList.toggle("activa");
    fondoNegro.classList.toggle("activa");
    btnAgregarTarea.classList.toggle("activa");
  };
  
  const agregarTarea = (e) => {
    e.preventDefault();
    const tarea = entradaTarea.value;
    const categoría = selectCategoría.value;
  
    if (tarea === "") {
      alert("Por favor ingresa una tarea");
    } else {
      const nuevaTarea = {
        id: tareas.length + 1,
        tarea,
        categoría,
        completada: false,
      };
      entradaTarea.value = "";
      tareas.push(nuevaTarea);
      guardarLocal();
      alternarFormularioAgregarTarea();
      renderizarTareas();
    }
  };
  
  // Inicializar variables y elementos DOM
  let categoríaSeleccionada = categorías[0];
  const contenedorCategorías = document.querySelector(".categorías");
  const pantallaEnvoltura = document.querySelector(".envoltura");
  const btnMenú = document.querySelector(".btn-de-menú");
  const btnRegreso = document.querySelector(".btn-de-regreso");
  const contenedorTareas = document.querySelector(".tareas");
  const numTareas = document.getElementById("num-tareas");
  const títuloCategoría = document.getElementById("category-title");
  const imagenCategoría = document.getElementById("category-img");
  const selectCategoría = document.getElementById("select-de-categoría");
  const envolturaAgregarTarea = document.querySelector(".agregar-tarea");
  const btnAgregarTarea = document.querySelector(".botón-de-agregar-tarea");
  const entradaTarea = document.getElementById("entrada-de-tarea");
  const fondoNegro = document.querySelector(".fondo-negro");
  const btnAgregar = document.querySelector(".botón-agregar");
  const btnCancelar = document.querySelector(".botón-cancelar");
  const totalTareas = document.getElementById("total-tareas");
  
  // Adjuntar event listeners
  btnMenú.addEventListener("click", alternarPantalla);
  btnRegreso.addEventListener("click", alternarPantalla);
  btnAgregarTarea.addEventListener("click", alternarFormularioAgregarTarea);
  fondoNegro.addEventListener("click", alternarFormularioAgregarTarea);
  btnAgregar.addEventListener("click", agregarTarea);
  btnCancelar.addEventListener("click", alternarFormularioAgregarTarea);
  
  // Renderizar estado inicial
  obtenerLocal();
  renderizarTareas();
  categorías.forEach((categoría) => {
    const opción = document.createElement("option");
    opción.value = categoría.título.toLowerCase();
    opción.textContent = categoría.título;
    selectCategoría.appendChild(opción);
  });
    