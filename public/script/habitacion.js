const URLsearch = new URLSearchParams(window.location.search);

const resp = await fetch(`/api/hotel/habitacion.ts?${URLsearch}`);
const habitaciones = await resp.json();

const tabla = document.getElementById("tabla");

habitaciones.forEach((element) => {
  const tr = document.createElement("tr");
  const tipo = document.createElement("td");
  tr.appendChild(tipo);
  tipo.innerHTML = element.Categoria;
  const capacidad = document.createElement("td");
  tr.appendChild(capacidad);
  capacidad.innerHTML = element.Capacidad;
  const precio = document.createElement("td");
  tr.appendChild(precio);
  precio.innerHTML = element.Precio + "€";
  const cantidad = document.createElement("td");
  tr.appendChild(cantidad);
  cantidad.innerHTML = element.NumeroHabitacion;
  tabla.appendChild(tr);
});
