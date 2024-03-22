import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign } from "hono/jwt";
import { env } from "hono/adapter";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate()); // mandatory to be added for talking via pooling to the db
  try {
    const body = await c.req.json();

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      return c.text("Error");
    }
    //after signing in we have to always create a jwt
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
    return c.text(jwt);
  } catch (e) {
    console.log("The error is " + e);
    return c.status(403);
  }
});

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate()); // mandatory to be added for talking via pooling to the db
  try {
    const body = await c.req.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.text("Invalid user");
    }
    //after signing in we have to always create a jwt
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
    return c.text(jwt);
  } catch (e) {
    console.log("The error is " + e);
    return c.status(403);
  }
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

//
//

//
