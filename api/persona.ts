import { FormDataReader } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from persona`);
  },
  async updatePass(urlSearch: URLSearchParams) {
    const Pass = urlSearch.get("Pass");
    const DNI = urlSearch.get("DNI");
    return await client.query(
      `UPDATE persona SET Pasword = '${Pass}' WHERE DNI = '${DNI}'`,
    );
  },
  async getBiEmailandPass(urlSearch: URLSearchParams) {
    const Pass = urlSearch.get("Pasword");
    const Email = urlSearch.get("Email");
    return await client.query(
      `SELECT * FROM persona WHERE Pasword = '${Pass}' AND Email = '${Email}'`,
    );
  },
  async registerUser(form: FormDataReader) {
    const data = await form.read();
    return await client.query(
      `INSERT INTO persona VALUES ('${data.fields.DNI}', '${data.fields.Nombre}', '${data.fields.Apellidos}', '${data.fields.Email}','${data.fields.Pasword}', '${data.fields.Telefono}', 2)`,
    );
  },
};
