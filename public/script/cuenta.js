const Sesion = JSON.parse(sessionStorage.getItem("login"))[0];
const sec = document.getElementById("info");

if (!sessionStorage.getItem("login")) {
  location.replace("/");
}

for (const prop in Sesion) {
  const label = document.createElement("label");
  label.innerHTML = prop;
  sec.appendChild(label);
  const div = document.createElement("div");
  div.innerHTML = Sesion[prop];
  sec.appendChild(div);
}

if (Sesion.Rol == "hotelero") {
  const resp = await fetch(`/api/hotel.ts?NIFhostelero=${Sesion.DNI}`);
  const data = await resp.json();
  for (const hotel of data) {
    const separador = document.createElement("div");
    separador.style.backgroundColor = "black";
    separador.style.width = "100%";
    separador.style.height = "2px";
    sec.appendChild(separador);
    const div = document.createElement("div");
    div.id = hotel.idHotel;
    for (const prop in hotel) {
      if (prop != "idHotel") {
        const label = document.createElement("label");
        label.innerHTML = prop;
        div.appendChild(label);
        const div2 = document.createElement("div");
        div2.innerHTML = hotel[prop];
        div.appendChild(div2);
      }
    }
    const boton = document.createElement("button");
    boton.innerHTML = "Registrar habitacion";
    div.appendChild(boton);
    boton.addEventListener("click", (e) => {
      location.replace(
        `/registrohabitacion?idhotel=${e.target.parentElement.id}`
      );
    });
    sec.appendChild(div);
  }
}

if (Sesion.Rol == "cliente") {
  const resp = await fetch(`/api/cliente/reserva.ts?DNICliente=${Sesion.DNI}`);
  const data = await resp.json();
  for (const reserva of data) {
    const separador = document.createElement("div");
    separador.style.backgroundColor = "black";
    separador.style.width = "100%";
    separador.style.height = "2px";
    sec.appendChild(separador);
    const div = document.createElement("div");
    div.id = reserva.CodigoReserva;
    for (const prop in reserva) {
      const label = document.createElement("label");
      label.innerHTML = prop;
      div.appendChild(label);
      const div2 = document.createElement("div");
      div2.innerHTML = reserva[prop];
      div.appendChild(div2);
    }
    sec.appendChild(div);
    const borrar = document.createElement("button");
    borrar.innerHTML = "Borrar Reserva";
    borrar.addEventListener("click", () => {
      if (confirm("Seguro quiere eliminar la reserva") == true) {
        const _resp = fetch("/api/cliente/reserva.ts", {
          method: "DELETE",
          body: div.id,
        });
        location.reload();
      }
    });
    sec.appendChild(borrar);
  }
}
