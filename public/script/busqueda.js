const paranosesion = document.getElementsByClassName("nosesion");
const parasesion = document.getElementsByClassName("sesion");
const paraHostelero = document.getElementsByClassName("hostelero");
const nombre = document.getElementById("nombre");
const logout = document.getElementById("logout");

console.log(" ");
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

const resp = await fetch(`/api/hotel.ts?${URLsearch}`);
const hoteles = await resp.json();

const parrafo = document.getElementById("parrafo");
const resultados = document.getElementById("resultados");
parrafo.innerHTML = `Has encontrado ${hoteles.length} hoteles`;

hoteles.forEach((element) => {
  const section = document.createElement("section");
  section.className = "ejemplo";

  const div = document.createElement("div");
  div.className = "ejemplo_no_img";

  const div2 = document.createElement("div");
  div.className = "ejemplo_tit_descrp";
  div.innerHTML = "<p>" + `${element.NombreHotel}` + "</p>" + "<p>" + "</p>";

  div.appendChild(div2);
  section.appendChild(div);
  resultados.appendChild(section);
});
