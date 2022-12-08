const form = document.getElementById("registroHabitacion");
const URLsearch = new URLSearchParams(window.location.search);
const params = Object.fromEntries(URLsearch);

if (!sessionStorage.getItem("login")) {
  location.replace("/");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  formData.append("idHotel", params.idhotel);
  const _resp = await fetch(`/api/habitacion.ts`, {
    method: "POST",
    body: formData,
  });
  alert("Habitacion registrado");
  location.replace("/cuenta");
});
