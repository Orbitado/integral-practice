import Express from "express";
import handlebars from "express-handlebars";
import path from "path";
import tasksRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import fs from "fs";

const app = Express();
const PORT = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

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
  
  app.use("/", tasksRoutes);
  // Fin de la configuración de handlebars

