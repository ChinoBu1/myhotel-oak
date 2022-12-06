const paranosesion = document.getElementsByClassName("nosesion");
const parasesion = document.getElementsByClassName("sesion");
const paraHostelero = document.getElementsByClassName("hostelero");
const nombre = document.getElementById("nombre");
const logout = document.getElementById("logout");

const form = document.getElementById("busqueda");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const resp = await fetch("/api/persona.ts");
  console.log(await resp.json());
});

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
