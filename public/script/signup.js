const form = document.getElementById("signup");

const reDNI = new RegExp("[1-9]{8}[A-Z]{1}");

const reTel = new RegExp("[1-9]{9}");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("Telefono"));
  console.log(reTel.test(formData.get("Telefono")));
  if (formData.get("DNI").length != 9 || !reDNI.test(formData.get("DNI"))) {
    alert("DNI mal formato");
  } else if (formData.get("Pasword") != formData.get("Pasword2")) {
    alert("Las contraseñas no coinciden");
  } else if (
    formData.get("Telefono").length != 9 ||
    !reTel.test(formData.get("Telefono"))
  ) {
    alert("El telfono con 9 digitos");
  } else {
    const resp = await fetch(`/api/persona.ts`, {
      method: "POST",
      body: formData,
    });
    const user = await resp.json();
    if (Object.keys(user).length === 0) {
      alert("fallo en el formulario");
    } else {
      alert("Usuario registrado");
      location.replace("/");
    }
  }
});
