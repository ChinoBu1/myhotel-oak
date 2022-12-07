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
};
