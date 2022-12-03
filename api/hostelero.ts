import client from "../db.ts";

export default {
  async getAll() {
    return await client.query(`select * from hostelero`);
  },
};
