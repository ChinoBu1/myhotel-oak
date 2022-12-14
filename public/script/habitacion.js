const paranosesion = document.getElementsByClassName("nosesion");
const parasesion = document.getElementsByClassName("sesion");
const paraHostelero = document.getElementsByClassName("hostelero");
const nombre = document.getElementById("nombre");
const logout = document.getElementById("logout");

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

const URLsearch = new URLSearchParams(window.location.search);
const params = Object.fromEntries(URLsearch);

const resp = await fetch(`/api/hotel/habitacion.ts?${URLsearch}`);
const habitaciones = await resp.json();

const tabla = document.getElementById("tabla");

for await (const habitacion of habitaciones) {
  let numhab = 0;
  const tr = document.createElement("tr");
  const tipo = document.createElement("td");
  tr.appendChild(tipo);
  tr.id = habitacion.idhabitacion;
  tipo.innerHTML = habitacion.Categoria;
  tipo.className = "Categoria";
  const capacidad = document.createElement("td");
  tr.appendChild(capacidad);
  capacidad.innerHTML = habitacion.Capacidad;
  capacidad.className = "Capacidad";
  const regimen = document.createElement("td");
  tr.appendChild(regimen);
  regimen.innerHTML = habitacion.Regimen;
  regimen.className = "Regimen";
  const precio = document.createElement("td");
  tr.appendChild(precio);
  precio.innerHTML = habitacion.Precio + "€";
  precio.className = "Precio";
  const cantidad = document.createElement("td");
  tr.appendChild(cantidad);
  const cantidaddeseada = document.createElement("td");
  tr.appendChild(cantidaddeseada);
  const select = document.createElement("select");
  select.className = "select";

  const reservasHotel = await fetch(
    `/api/hotel/habitacion/reserva.ts?idhabitacion=${habitacion.idhabitacion}&dateEntrada=${params.dateEntrada}&dateSalida=${params.dateSalida}`
  );
  const reservas = await reservasHotel.json();
  for (const reserva of reservas) {
    numhab = numhab - reserva.NumeroHabitacion;
  }
  numhab = numhab + habitacion.NumeroHabitacion;
  for (let i = 0; i <= numhab; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  }
  cantidad.innerHTML = numhab;
  cantidaddeseada.appendChild(select);
  cantidad.className = "Cantidad";
  cantidaddeseada.className = "Deseada";
  tabla.appendChild(tr);
}

const info = document.getElementById("infoReserva");
const selects = document.getElementsByClassName("select");
let hab = 0;
let cap = 0;
for (const select of selects) {
  select.addEventListener("change", (_e) => {
    cap = 0;
    hab = 0;
    for (const num of selects) {
      hab = hab + parseInt(num.value);
      cap =
        cap +
        parseInt(num.parentElement.parentElement.childNodes[1].innerHTML) *
          parseInt(num.value);
    }
    info.innerHTML =
      "Has selecionado " +
      hab +
      " habitaciones con capacidad para " +
      cap +
      " personas";
  });
}
info.innerHTML =
  "Has selecionado " +
  hab +
  " habitaciones con capacidad para " +
  cap +
  " personas";

const botonReserva = document.getElementById("botonReserva");

botonReserva.addEventListener("click", () => {
  let id = "";
  let num = "";
  for (const select of selects) {
    if (select.value != 0 && id == "") {
      id = id + select.parentElement.parentElement.id;
      num = num + select.value;
    } else if (select.value != 0) {
      id = id + "," + select.parentElement.parentElement.id;
      num = num + "," + select.value;
    }
  }
  if (id == "") {
    alert("No ha selecionado habitaciones");
  } else {
    location.replace(`/reserva?${URLsearch}&hab=${id}&num=${num}`);
  }
});
