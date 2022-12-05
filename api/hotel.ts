import { FormDataReader } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from hotel`);
  },
  async postHotel(form: FormDataReader) {
    const data = await form.read();
    const ciudad = await client.query(
      `select * from ubicacion where CodigoPostal = ${data.fields.CodigoPostal}`,
    );
    if (ciudad.length == 0) {
      const _postciudad = client.query(
        `insert into ubicacion values ('${data.fields.Ciudad}',${data.fields.CodigoPostal})`,
      );
    }
    return await client.query(
      `insert into hotel (NombreHotel, TelefonoHotel, Direccion, Estrellas, Regimen, WiFi, Parking, Piscina, CodigoPostal, Administrador) 
       values ('${data.fields.Nombre}', ${data.fields.Telefono}, '${data.fields.Direccion}', ${data.fields.Estrellas}, '${data.fields.Regimen}', ${data.fields.Wifi}, ${data.fields.Parking}, ${data.fields.Piscina}, ${data.fields.CodigoPostal}, ${data.fields.Administrador})`,
    );
  },
  async getByAdministrador(urlSearch: URLSearchParams) {
    const Administrador = urlSearch.get("Administrador");
    return await client.query(
      `select * from hotel where Administrador = ${Administrador}`,
    );
  },
};
