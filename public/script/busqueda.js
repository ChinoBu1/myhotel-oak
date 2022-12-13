const paranosesion = document.getElementsByClassName("nosesion");
const parasesion = document.getElementsByClassName("sesion");
const paraHostelero = document.getElementsByClassName("hostelero");
const nombre = document.getElementById("nombre");
const logout = document.getElementById("logout");

const Localizacion = document.getElementById("Localizacion");

const reps = await fetch("/api/ubicacion.ts");
const ubicaciones = await reps.json();

for (const ubicacion of ubicaciones) {
  const option = document.createElement("option");
  option.innerHTML = ubicacion.NombreCiudad;
  Localizacion.appendChild(option);
}

logout.addEventListener("click", (_e) => {
  localStorage.removeItem("login");
  sessionStorage.removeItem("login");
  location.replace("/");
});

if (localStorage.getItem("login") && !sessionStorage.getItem("login")) {
  sessionStorage.setItem("login", localStorage.getItem("login"));
}

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

const form_busqueda = document.getElementById("form_busqueda");
const URLsearch = new URLSearchParams(window.location.search);
const params = Object.fromEntries(URLsearch);

for (const key in params) {
  if (Object.hasOwnProperty.call(params, key)) {
    for (const element of form_busqueda.children) {
      if (element.id === key) {
        element.value = params[key];
      }
    }
  }
}

const hoy = new Date().toISOString().split("T")[0];

form_busqueda.children.dateEntrada.min = hoy;

form_busqueda.children.dateSalida.min = form_busqueda.children.dateEntrada.min;

form_busqueda.children.dateEntrada.addEventListener("input", (e) => {
  form_busqueda.children.dateSalida.value = "";
  form_busqueda.children.dateSalida.min = e.target.value;
});

const resp = await fetch(`/api/hotel.ts?${URLsearch}`);
const hoteles = await resp.json();

const parrafo = document.getElementById("parrafo");
const resultados = document.getElementById("resultados");
parrafo.innerHTML = `Has encontrado ${hoteles.length} hoteles`;

for (const hotel of hoteles) {
  const habHotel = await fetch(
    `/api/hotel/habitacion.ts?idHotel=${hotel.idHotel}`
  );
  const habitaciones = await habHotel.json();

  const section = document.createElement("section");
  section.className = "ejemplo";

  const div = document.createElement("div");
  div.className = "ejemplo_no_img";

  const div2 = document.createElement("div");
  div2.className = "ejemplo_tit_descrp";
  div2.innerHTML =
    "<p>" +
    `${hotel.NombreHotel}` +
    "</p>" +
    "<p>" +
    `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, tempore.` +
    "</p>";

  const div3 = document.createElement("div");
  let numHab = 0;
  for await (const habitacion of habitaciones) {
    const reservasHotel = await fetch(
      `/api/hotel/habitacion/reserva.ts?idhabitacion=${habitacion.idhabitacion}&dateEntrada=${params.dateEntrada}&dateSalida=${params.dateSalida}`
    );
    const reservas = await reservasHotel.json();
    for (const reserva of reservas) {
      console.log(reserva);
      numHab = numHab - reserva.NumeroHabitacion;
    }
    numHab = numHab + habitacion.NumeroHabitacion;
  }
  div3.className = "ejemplo_nota_precio_disp";
  div3.innerHTML =
    "<div>" +
    `Habitaciones disponibles ${numHab}` +
    "</div>" +
    "<div>" +
    `<button class="boton_naranja" onclick="location.href='/habitacionHotel?idHotel=${hotel.idHotel}&dateEntrada=${params.dateEntrada}&dateSalida=${params.dateSalida}'">Ver<br>disponibilidad</button>`;
  ("</div>");

  div.appendChild(div2);
  div.appendChild(div3);
  section.appendChild(div);
  resultados.appendChild(section);
}
