import Express from "express";
import handlebars from "express-handlebars";
import path from "path";
import tasksRoutes from "./routes/task.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import mongoose from "mongoose";
import fs from "fs";

const app = Express();
const PORT = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Configuracion de handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(Express.static(path.resolve(__dirname, "../public")));

app.use("/tasks", tasksRoutes);
app.use("/", viewsRoutes);
// Fin de la configuración de handlebars

// MongoDB connection
const user = "vleonardojuanpablo";
const password = "%40EuR3K4!3710";
const mongoDb = "tasks"

mongoose
  .connect(`mongodb+srv://${user}:${password}@db-test.pg3rvlv.mongodb.net/${mongoDb}`)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// End mongo connection
