const URLsearch = new URLSearchParams(window.location.search);
const params = Object.fromEntries(URLsearch);

document.getElementById("CodigoReserva").innerHTML = params.codigoReserva;
document.getElementById("FechaEntrada").innerHTML = params.fechaEntrada;
document.getElementById("FechaSalida").innerHTML = params.fechaSalida;
