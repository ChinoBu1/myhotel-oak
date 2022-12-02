import app from "./server.ts";

const port = 8000;

app.addEventListener("listen", () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.listen({ port: port });
