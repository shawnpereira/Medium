import { Hono } from "hono";

// Create the main Hono app
const app = new Hono();

app.post("/api/v1/user/signup", (c) => {
  return c.text("signup route");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("signin route");
});

app.post(" /api/v1/blog", (c) => {
  return c.text("get blog route");
});
//
//
app.put("/api/v1/blog", (c) => {
  return c.text("signin route");
});
//
//
app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("signin route");
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("signin route");
});
//
//

export default app;
