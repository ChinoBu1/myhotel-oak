const form = document.getElementById('signup');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (formData.get('Pasword') != formData.get('Pasword2')){
        alert('Las contraseñas no coinciden')
    } else {
        const _resp = await fetch(`/api/persona.ts`, {
        method: 'POST',
        body: formData
        });
        alert("Usuario registrado")
        history.back();
    }
});

