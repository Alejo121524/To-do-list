// Estructura de datos para categorías y tareas
let categories = [
  {
    title: "Personal",
    img: "usuario.png",
  },
  {
    title: "Trabajo",
    img: "maletin.png",
  },
  {
    title: "Compras",
    img: "carrito-de-compra-anadir.png",
  },
  {
    title: "Código",
    img: "mostrar-codigo.png",
  },
  {
    title: "Salud",
    img: "ver-fitness.png",
  },
  {
    title: "Fitness",
    img: "musculo.png",
  },
  {
    title: "Educación",
    img: "libro-marcador.png",
  },
  {
    title: "Finanzas",
    img: "hucha.png",
  },
];

let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Compras",
    completed: false,
    date: "2024-05-12"
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
    date: "2024-05-15"
  },
  // Resto de las tareas...
];


let selectedCategory = categories[0];
const categoriesContainer = document.querySelector(".categories");
const screenWrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const tasksContainer = document.querySelector(".tasks");
const numTasks = document.getElementById("num-tasks");
const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const categorySelect = document.getElementById("category-select");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.getElementById("task-input");
const taskDateInput = document.getElementById("task-date-input"); // Nuevo elemento para la fecha de la tarea
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const totalTasks = document.getElementById("total-tasks");


// Funciones auxiliares para el manejo de datos
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  if (tasksLocal) {
    tasks = tasksLocal;
  }
};

// Funciones para actualizar la interfaz de usuario
const toggleScreen = () => {
  screenWrapper.classList.toggle("show-category");
};

const updateTotals = () => {
  let totalTasksCount = 0;

  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );
    totalTasksCount += categoryTasks.length;
  });

  numTasks.innerHTML = `${totalTasksCount} Tareas`;
  totalTasks.innerHTML = totalTasksCount;
};

const addTask = (e) => {
  e.preventDefault();
  
  // Verificar si se hizo clic en el botón de agregar tarea
  if (e.target.classList.contains("add-btn")) {
    const task = taskInput.value.trim();
    const category = categorySelect.value;
    const date = taskDateInput.value;

    if (task === "") {
      alert("Por favor, ingresa una tarea válida.");
    } else {
      const newTask = {
        id: tasks.length + 1,
        task,
        category,
        date,
        completed: false,
      };
      taskInput.value = "";
      // Establecer la fecha actual en el campo de fecha
      taskDateInput.value = new Date().toISOString().split('T')[0];
      tasks.push(newTask);
      saveLocal();
      renderTasks();
      updateTotals();
      renderCategories();
      toggleAddTaskForm();
    }
  }
};
// Asignar evento click al botón de agregar
addBtn.addEventListener("click", addTask);


// Asignar evento click al botón de agregar
addTaskBtn.addEventListener("click", addTask);



const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );
    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      screenWrapper.classList.toggle("show-category");
      selectedCategory = category;
      updateTotals();
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `images/${category.img}`;
      renderTasks();
    });

    div.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryTasks.length} Tareas</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
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

    categoriesContainer.appendChild(div);
  });
};


const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No hay tareas agregadas para esta categoría</p>`;
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
        updateTotals();
        renderTasks();
      });
      div.innerHTML = `
        <div class="delete">
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-12 0a48.108 48.108 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      `;
      label.innerHTML = `
        <span class="checkmark">
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
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
        <p>${task.task}</p>
        <input type="date" class="task-date" value="${task.date}" disabled> <!-- Fecha de tarea deshabilitada -->
      `;
      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
        updateTotals();
        renderCategories();
        
      });

      // Calcular días restantes hasta la fecha límite y mostrarlo junto a la tarea
      const dateInput = div.querySelector(".task-date");
      const today = new Date();
      const dueDate = new Date(task.date);
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const daysRemaining = daysDiff >= 0 ? `${daysDiff} días restantes` : "¡Tarea vencida!";
      const daysRemainingElement = document.createElement("span");
      daysRemainingElement.classList.add("days-remaining");
      daysRemainingElement.textContent = daysRemaining;
      div.appendChild(daysRemainingElement);
    });

    const totalTasksElement = document.createElement("div");
    totalTasksElement.classList.add("total-tasks");
    totalTasksElement.innerHTML = `<p>Total de Tareas: ${categoryTasks.length}</p>`;
    tasksContainer.appendChild(totalTasksElement);
  }

  updateTotals();
  
};

const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
  
  // Obtener la categoría actualmente seleccionada
  const selectedCategoryValue = selectedCategory.title.toLowerCase();
  
  // Establecer el valor del campo de categoría en el formulario
  categorySelect.value = selectedCategoryValue;
};


menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);
addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", toggleAddTaskForm);


// Render initial state
getLocal();
renderCategories();
renderTasks();

// Limpiar el campo de categoría
categorySelect.innerHTML = "";

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

// Establecer el valor del campo de categoría en blanco
categorySelect.value = "";
