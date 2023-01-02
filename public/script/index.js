const paranosesion = document.getElementsByClassName("nosesion");
const parasesion = document.getElementsByClassName("sesion");
const paraHostelero = document.getElementsByClassName("hostelero");
const nombre = document.getElementById("nombre");
const logout = document.getElementById("logout");

// Para el carousel
const emblaNode = document.querySelector(".embla");
const options = { loop: true, draggable: false, speed: 5 };
const plugins = [EmblaCarouselAutoplay()]; // Plugins
const embla = EmblaCarousel(emblaNode, options, plugins);
// LOG OUT
logout.addEventListener("click", (_e) => {
  localStorage.removeItem("login");
  sessionStorage.removeItem("login");
  location.replace("/");
});
//COMPRUEBA SI TIENES LA SESIÓN MANTENIDA Y SI ES QUE SI, LA INICIA SOLA
if (localStorage.getItem("login") && !sessionStorage.getItem("login")) {
  sessionStorage.setItem("login", localStorage.getItem("login"));
}
//ESCONDE Y MUESTRA LOS BOTONES DEPENDIENDO SI ESTÁ LOGUEADO (lo que pone el nombre y lo quita)
if (sessionStorage.getItem("login")) {
  const Sesion = JSON.parse(sessionStorage.getItem("login"))[0];
  Array.from(paranosesion).forEach((element) => {
    element.style.display = "none";
  });
  Array.from(parasesion).forEach((element) => {
    element.style.display = "block";
  });
  if (Sesion.Rol == "hotelero") {
    Array.from(paraHostelero).forEach((element) => {
      element.style.display = "block";
    });
  }
  
  const ancor = document.createElement("a");
  ancor.href = "/cuenta";
  ancor.style.textDecoration = "none";
  ancor.style.color = "black";
  ancor.innerHTML = Sesion.Nombre + " " + Sesion.Apellidos;
  nombre.appendChild(ancor);
}
//Formulario de búsqueda
const form = document.getElementById("busqueda");

const Localizacion = document.getElementById("Localizacion");

const reps = await fetch("/api/ubicacion.ts");
const ubicaciones = await reps.json();

for (const ubicacion of ubicaciones) {
  const option = document.createElement("option");
  option.innerHTML = ubicacion.NombreCiudad;
  Localizacion.appendChild(option);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);
  if (params.get("Localizacion")) {
    location.replace(`/?${params}`);
  } else {
    alert("Seleccione una localizacion");
  }
});
//Solo deja reservar a partir de la fecha actual
const hoy = new Date().toISOString().split("T")[0];

form.children.dateEntrada.min = hoy;

form.children.dateSalida.min = form.children.dateEntrada.min;

form.children.dateEntrada.addEventListener("input", (e) => {
  form.children.dateSalida.value = "";
  form.children.dateSalida.min = e.target.value;
});
