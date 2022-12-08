import client from "../db.ts";
import { FormDataReader } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export default {
  async getAll() {
    return await client.query(`select * from fecha_reserva`);
  },
  async getByHabitacion(urlSearch: URLSearchParams) {
    const idhabitacion = urlSearch.get("idhabitacion");
    return await client.query(
      `select * from fecha_reserva where idhabitacion = ${idhabitacion}`,
    );
  },
  async postReserva(form: FormDataReader) {
    const data = await form.read();
    const id = Math.random().toString(36).slice(2).toUpperCase().substring(
      0,
      10,
    );
    return await client.query(
      `insert into fecha_reserva values (${id}, ${data.fields.FechaEntrada}, ${data.fields.FechaSalida}, ${data.fields.DNICliente}, ${data.fields.idhabitacion})`,
    );
  },
};
