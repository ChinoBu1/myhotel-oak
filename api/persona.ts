import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from persona`);
  },
  async updatePass(urlSearch: URLSearchParams) {
    const Pass = urlSearch.get("Pass");
    const DNI = urlSearch.get("DNI");
    return await client.query(
      `UPDATE persona SET Pasword = '${Pass}' WHERE DNI = ${DNI}`,
    );
  },
};
