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
  // deno-lint-ignore no-explicit-any
  async postHabitacion(formData: FormDataReader | any) {
    const data = await formData.read();
    return await client.query(
      `insert into habitacion (idhotel,NumeroHabitacion, Capacidad, Categoria, Regimen,Precio) values (${data.fields.idHotel}, ${data.fields.NumeroHabitacion},${data.fields.Capacidad},${data.fields.Categoria}, ${data.fields.Regimen},${data.fields.Precio})`,
    );
  },
};
