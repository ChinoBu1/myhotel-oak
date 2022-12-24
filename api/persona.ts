import { FormDataReader } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from persona`);
  },
  async updatePass(
    body:
      | Promise<Uint8Array>
      | FormDataReader
      // deno-lint-ignore no-explicit-any
      | Promise<any>
      | Promise<URLSearchParams>
      | Promise<string>
      | undefined,
  ) {
    const Body = await JSON.parse(await body);
    return await client.query(
      `UPDATE persona SET Pasword = ? WHERE DNI = ?`,
      [Body.password, Body.DNI],
    );
  },
  async getBiEmailandPass(urlSearch: URLSearchParams) {
    const Pass = urlSearch.get("Pasword");
    const Email = urlSearch.get("Email");
    return await client.query(
      `SELECT * FROM persona WHERE Pasword = ? AND Email = ?`,
      [Pass, Email],
    );
  },
  // deno-lint-ignore no-explicit-any
  async registerUser(form: FormDataReader | any) {
    const data = await form.read();
    try {
      return await client.query(
        `INSERT INTO persona VALUES (?, ?, ?, ?, ?, ?, 2)`,
        [
          data.fields.DNI,
          data.fields.Nombre,
          data.fields.Apellidos,
          data.fields.Email,
          data.fields.Pasword,
          data.fields.Telefono,
        ],
      );
    } catch (_error) {
      return [];
    }
  },
};
