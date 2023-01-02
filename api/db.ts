import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";
const client = await new Client().connect({
  hostname: "51.68.47.70",
  username: "denoapp",
  db: "myhotel",
  password: "deno_Pass1",
  port: 3306,
});

export default client;
