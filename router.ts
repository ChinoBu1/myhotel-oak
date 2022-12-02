import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import persona from "./api/persona.ts";

const router = new Router();
router
  .get("/", async (ctx) => {
    const index = await Deno.readFile(`${Deno.cwd()}/public/index.html`);
    ctx.response.body = index;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/img/:img", async (ctx) => {
    const imageBuf = await Deno.readFile(
      `${Deno.cwd()}/public/img/${ctx.params.img}`,
    );
    ctx.response.body = imageBuf;
    ctx.response.headers.set("Content-Type", "image/png");
  })
  .get("/css/:css", async (ctx) => {
    const index = await Deno.readFile(
      `${Deno.cwd()}/public/css/${ctx.params.css}`,
    );
    ctx.response.body = index;
    ctx.response.headers.set("Content-Type", "text/css");
  })
  .get("/persona.ts", async (ctx) => {
    ctx.response.body = await persona.getAll();
  });
export default router;
