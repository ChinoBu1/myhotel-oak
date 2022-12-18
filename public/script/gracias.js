const URLsearch = new URLSearchParams(window.location.search);
const params = Object.fromEntries(URLsearch);

document.getElementById("CodigoReserva").value = params.codigoReserva;
document.getElementById("FechaEntrada").value = params.fechaEntrada;
document.getElementById("FechaSalida").value = params.fechaSalida;

