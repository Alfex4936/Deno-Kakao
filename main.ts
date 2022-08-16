import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./routes/notice.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener(
  "listen",
  (_) => console.log("Listening on http://localhost:8080"),
);

await app.listen({ port: 8080 });
