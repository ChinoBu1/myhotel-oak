const form = document.getElementById('login');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);
    const resp = await fetch(`/api/persona.ts?${params}`)
    const user = await resp.json()
    if (Object.entries(user).length === 0) {
        alert("Usuario no encontrado");
    } else {
        sessionStorage.setItem("login", JSON.stringify(user))
        if(formData.get('Sesion')){
            localStorage.setItem("login", JSON.stringify(user))
        }
        location.replace("/")
    }
});

