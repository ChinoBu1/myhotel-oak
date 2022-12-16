import client from "../db.ts";
import { FormDataReader } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export default {
  async getAll() {
    return await client.query(`select * from fecha_reserva`);
  },
  async getByHabitacion(urlSearch: URLSearchParams) {
    const idhabitacion = urlSearch.get("idhabitacion");
    const FechaEntrada = urlSearch.get("dateEntrada");
    const FechaSalida = urlSearch.get("dateSalida");

    return await client.query(
      `select idhabitacion,NumeroHabitacion from fecha_reserva where idhabitacion = ${idhabitacion} and 
      ((FechaEntrada <= '${FechaEntrada}' and FechaSalida >= '${FechaSalida}') or
       (FechaEntrada >= '${FechaEntrada}' and FechaSalida <= '${FechaSalida}') or
       (FechaEntrada >= '${FechaEntrada}' and FechaSalida >= '${FechaSalida}' and FechaEntrada <= '${FechaSalida}') or
       (FechaEntrada <= '${FechaEntrada}' and FechaSalida <= '${FechaSalida}' and FechaSalida >= '${FechaEntrada}'))`,
    );
  },
  async getByCliente(urlSearch: URLSearchParams) {
    const DNICliente = urlSearch.get("DNICliente");
    return await client.query(
      `select * from fecha_reserva where DNIcliente = '${DNICliente}'`,
    );
  },
  // deno-lint-ignore no-explicit-any
  async postReserva(form: FormDataReader | any) {
    const data = await form.read();
    const hab = data.fields.idhabitacion.split(",");
    const num = data.fields.NumeroHabitacion.split(",");

    for (let i = 0; i < hab.length; i++) {
      const id = Math.random().toString(36).slice(2).toUpperCase().substring(
        0,
        10,
      );
      const _query = await client.query(
        `insert into fecha_reserva values ('${id}', '${data.fields.FechaEntrada}', '${data.fields.FechaSalida}', '${data.fields.DNICliente}', ${
          hab[i]
        }, ${num[i]})`,
      );
    }

    return await client.query(
      `select CodigoReserva from fecha_reserva where FechaEntrada='${data.fields.FechaEntrada}' and FechaSalida='${data.fields.FechaSalida}' and DNICliente='${data.fields.DNICliente}'`,
    );
    /*`insert into fecha_reserva values (${id}, ${data.fields.FechaEntrada}, ${data.fields.FechaSalida}, ${data.fields.DNICliente}, ${data.fields.idhabitacion}, ${data.fields.NumeroHabitacion})`,
    );*/
  },
  // deno-lint-ignore no-explicit-any
  async deletereserva(form: FormDataReader | any) {
    const data = await form.read();
    return await client.query(
      `delete from fecha_reserva where and CodigoReserva=${data.fields.CodigoReserva}`,
    );
  },
};
