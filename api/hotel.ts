import { FormDataReader } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from hotel`);
  },
  async getById(urlSearch: URLSearchParams) {
    const idHotel = urlSearch.get("idHotel");
    return await client.query(`select * from hotel where idHotel = ${idHotel}`);
  },
  // deno-lint-ignore no-explicit-any
  async postHotel(form: FormDataReader | any) {
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
      `insert into hotel (NombreHotel, TelefonoHotel, Direccion, Estrellas, WiFi, Parking, Piscina, CodigoPostal, NIFhostelero) 
       values ('${data.fields.Nombre}', ${data.fields.Telefono}, '${data.fields.Direccion}', ${data.fields.Estrellas}, ${data.fields.Wifi}, ${data.fields.Parking}, ${data.fields.Piscina}, ${data.fields.CodigoPostal}, ${data.fields.NIFhostelero})`,
    );
  },
  async getByAdministrador(urlSearch: URLSearchParams) {
    const NIFhostelero = urlSearch.get("NIFhostelero");
    return await client.query(
      `select * from hotel where NIFhostelero = ${NIFhostelero}`,
    );
  },
  async getByUbicacion(urlSearch: URLSearchParams) {
    const Localizacion = urlSearch.get("Localizacion");
    try {
      const resp = await client.query(
        `select CodigoPostal from ubicacion where NombreCiudad = '${Localizacion}'`,
      );

      return await client.query(
        `select * from hotel where CodigoPostal = ${resp[0].CodigoPostal}`,
      );
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
