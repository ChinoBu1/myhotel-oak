import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from valoracion`);
  },
  async getByHotel(urlSearch: URLSearchParams) {
    const idHotel = urlSearch.get("idHotel");
    return await client.query(
      `select * from valoracion where idhotel = ${idHotel}`,
    );
  },
};
