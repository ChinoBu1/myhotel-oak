const form = document.getElementById('registroHotel');
const Sesion = JSON.parse(sessionStorage.getItem('login'))[0];

if (!sessionStorage.getItem('login')){
    location.replace('/')
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    formData.append('Administrador', Sesion.DNI)
    formData.set('Wifi',form.Wifi.checked)
    formData.set('Parking',form.Parking.checked)
    formData.set('Piscina',form.Piscina.checked)
    const _resp = await fetch(`/api/hotel.ts`, {
        method: 'POST',
        body: formData
        });
        alert("Hotel registrado")
        location.replace("/");
});