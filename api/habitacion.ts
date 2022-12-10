import { FormDataReader } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from habitacion`);
  },
  async getByHotel(urlSearch: URLSearchParams) {
    const idHotel = urlSearch.get("idHotel");
    return await client.query(
      `select * from habitacion where idhotel = ${idHotel}`,
    );
  },
  async postHabitacion(formData: FormDataReader) {
    const data = await formData.read();
    return await client.query(
      `insert into habitacion (idhotel,NumeroHabitacion, Capacidad, Categoria, Precio) values (${data.fields.idHotel}, ${data.fields.NumeroHabitacion},${data.fields.Capacidad},${data.fields.Categoria}, ${data.fields.Precio})`,
    );
  },
};
