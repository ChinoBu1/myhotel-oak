import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import hotel from "./api/hotel.ts";
import persona from "./api/persona.ts";
import habitacion from "./api/habitacion.ts";

const router = new Router();
router
  .get("/", async (ctx) => {
    if (ctx.request.url.searchParams.has("Localizacion")) {
      const index = await Deno.readFile(`${Deno.cwd()}/public/busqueda.html`);
      ctx.response.body = index;
      ctx.response.headers.set("Content-Type", "text/html");
    } else {
      const index = await Deno.readFile(`${Deno.cwd()}/public/index.html`);
      ctx.response.body = index;
      ctx.response.headers.set("Content-Type", "text/html");
    }
  })
  .get("/inicioSesion", async (ctx) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/inicioSesion.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/registro", async (ctx) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/registro.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/cuenta", async (ctx) => {
    const page = await Deno.readFile(`${Deno.cwd()}/public/cuenta.html`);
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/registro_alojamiento", async (ctx) => {
    const page = await Deno.readFile(
      `${Deno.cwd()}/public/registro_alojamiento.html`,
    );
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/registrohabitacion", async (ctx) => {
    const page = await Deno.readFile(
      `${Deno.cwd()}/public/registrohabitacion.html`,
    );
    ctx.response.body = page;
    ctx.response.headers.set("Content-Type", "text/html");
  })
  .get("/habitacionHotel", async (ctx) => {
    const page = await Deno.readFile(
      `${Deno.cwd()}/public/hotel_ejemplo.html`,
    );
    ctx.response.body = page;
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
    const css = await Deno.readFile(
      `${Deno.cwd()}/public/css/${ctx.params.css}`,
    );
    ctx.response.body = css;
    ctx.response.headers.set("Content-Type", "text/css");
  })
  .get("/script/:script", async (ctx) => {
    const script = await Deno.readFile(
      `${Deno.cwd()}/public/script/${ctx.params.script}`,
    );
    ctx.response.body = script;
    ctx.response.headers.set("Content-Type", "application/javascript");
  })
  .get("/api/persona.ts", async (ctx) => {
    if (!ctx.request.url.searchParams.has("Email")) {
      ctx.response.body = await persona.getAll();
    } else if (
      ctx.request.url.searchParams.has("Email") &&
      ctx.request.url.searchParams.has("Pasword")
    ) {
      ctx.response.body = await persona.getBiEmailandPass(
        ctx.request.url.searchParams,
      );
    }
  })
  .get("/api/hotel.ts", async (ctx) => {
    if (ctx.request.url.searchParams.has("Administrador")) {
      ctx.response.body = await hotel.getByAdministrador(
        ctx.request.url.searchParams,
      );
    } else if (ctx.request.url.searchParams.has("Localizacion")) {
      ctx.response.body = await hotel.getByUbicacion(
        ctx.request.url.searchParams,
      );
    } else {
      ctx.response.body = await hotel.getAll();
    }
  })
  .get("/api/hotel/habitacion.ts", async (ctx) => {
    if (ctx.request.url.searchParams.has("idHotel")) {
      ctx.response.body = await habitacion.getByHotel(
        ctx.request.url.searchParams,
      );
    }
  })
  .post("/api/persona.ts", async (ctx) => {
    ctx.response.body = await persona.registerUser(ctx.request.body().value);
  })
  .post("/api/hotel.ts", async (ctx) => {
    ctx.response.body = await hotel.postHotel(ctx.request.body().value);
  })
  .post("/api/habitacion.ts", async (ctx) => {
    ctx.response.body = await habitacion.postHabitacion(
      ctx.request.body().value,
    );
  });
export default router;
