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
const separador = document.createElement("hr");
separador.style.backgroundColor = "black";
separador.style.width = "100%";
separador.style.height = "2px";

if (Sesion.Rol == "hotelero") {
  const resp = await fetch(`/api/hotel.ts?Administrador=${Sesion.DNI}`);
  const data = await resp.json();
  for (const hotel of data) {
    sec.appendChild(separador);
    for (const prop in hotel) {
      if (prop != "idHotel") {
        const label = document.createElement("label");
        label.innerHTML = prop;
        sec.appendChild(label);
        const div = document.createElement("div");
        div.innerHTML = hotel[prop];
        sec.appendChild(div);
      }
    }
  }
}
