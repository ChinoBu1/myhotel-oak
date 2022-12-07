import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from fecha_reserva`);
  },
  async getByHabitacion(urlSearch: URLSearchParams) {
    const idhabitacion = urlSearch.get("idhabitacion");
    return await client.query(
      `select * from fecha_reserva where idhabitacion = idhabitacion`,
    );
  },
  async postReserva(form: FormDataReader) {
    const data = await form.read();
    return await client.query(
      `insert into fecha_reserva values (, ${data.fields.FechaEntrada}, ${data.fields.FechaSalida}, ${data.fields.DNICliente}, ${data.fields.idhabitacion})`,
    );
  },
};
