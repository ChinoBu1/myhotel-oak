import client from "./db.ts";

export default {
  async getAll() {
    return await client.query(`select distinct NombreCiudad from ubicacion`);
  },
};
