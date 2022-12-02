import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
