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
      `SELECT * from persona WHERE Pasword = '${Pass}' AND Email = '${Email}'`,
    );
  },
};
