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
let Sesion;
if (sessionStorage.getItem("login")) {
  Sesion = JSON.parse(sessionStorage.getItem("login"))[0];
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

const dateEntrada = document.getElementById("dateEntrada");
const dateSalida = document.getElementById("dateSalida");
const duracion = document.getElementById("duracion");
const desglose = document.getElementById("desglose");

const URLsearch = new URLSearchParams(window.location.search);
const params = Object.fromEntries(URLsearch);

const Entrada = new Date(params.dateEntrada);
const Salida = new Date(params.dateSalida);

dateEntrada.innerHTML =
  Entrada.getDate() + "/" + Entrada.getMonth() + "/" + Entrada.getFullYear();

dateSalida.innerHTML =
  Salida.getDate() + "/" + Salida.getMonth() + "/" + Salida.getFullYear();

const diasDuracion = Math.max(
  (Salida.getTime() - Entrada.getTime()) / (1000 * 3600 * 24),
  1
);

duracion.innerHTML = diasDuracion + " dias";

let total = 0;
const totaldiv = document.createElement("div");
const resps = await fetch(
  `/api/hotel/habitacion.ts?idhabitacion=${params.hab}`
);
const habitaciones = await resps.json();
const cantidadHabitaciones = params.num.split(",");
for (let i = 0; i < habitaciones.length; i++) {
  const div = document.createElement("div");
  div.innerHTML = `${habitaciones[i].Categoria} a ${
    habitaciones[i].Precio
  }€ noche \t \t ${habitaciones[i].Precio * diasDuracion}€`;
  total = total + habitaciones[i].Precio * diasDuracion;
  total = total * cantidadHabitaciones[i];
  desglose.appendChild(div);
}

totaldiv.innerHTML = "Total" + total + "€";
desglose.appendChild(totaldiv);

const resp = await fetch(`/api/hotel.ts?idHotel=${params.idHotel}`);
const hoteles = await resp.json();
const hotel = hoteles[0];

const idHotel = document.getElementById("idHotel");
const Localizacion = document.getElementById("Localizacion");

idHotel.innerHTML = hotel.NombreHotel;
Localizacion.innerHTML = "Direccion: " + hotel.Direccion;

const datosCliente = document.getElementById("datosCliente");

for (const key in Sesion) {
  if (Object.hasOwnProperty.call(Sesion, key)) {
    if (key != "Pasword" && key != "Rol") {
      const element = Sesion[key];
      const label = document.createElement("label");
      label.innerHTML = key;
      datosCliente.appendChild(label);
      const div = document.createElement("div");
      div.innerHTML = element;
      datosCliente.appendChild(div);
    }
  }
}

const botonReserva = document.getElementById("botonReserva");

botonReserva.addEventListener("click", async () => {
  if (Sesion && Sesion.Rol == "cliente") {
    if (confirm("iniciado proceso de pago") == true) {
      const formData = new FormData();
      formData.append("idHotel", params.idHotel);
      formData.append("FechaEntrada", params.dateEntrada);
      formData.append("FechaSalida", params.dateSalida);
      formData.append("DNICliente", Sesion.DNI);
      formData.append("idhabitacion", params.hab);
      formData.append("NumeroHabitacion", params.num);
      const reps = await fetch("/api/hotel/habitacion/reserva.ts", {
        method: "POST",
        body: formData,
      });
      var codigoReserva = (await reps.json())[0].CodigoReserva; //TODO: Actualmente se envía un array de todos los códigos de las reservas para el mismo cliente y las mismas fechas
      location.replace("/gracias?codigoReserva=" + codigoReserva + "&&fechaEntrada=" + params.dateEntrada + "&&fechaSalida=" + params.dateSalida);
    }
  } else {
    alert("Por favor inicie sesión y/o regístrese como cliente");
  }
});
