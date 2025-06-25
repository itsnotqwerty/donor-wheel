import { Router, Application } from "oak";
const app = new Application();
const router = new Router();
router.get("/", (context) => {
  context.response.body = Deno.readTextFileSync("./static/index.html");
});
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context, next) => {
  const root = "./static";
  try { await context.send({ root }) } catch { next(); }
});
app.listen({ port: 8000 });