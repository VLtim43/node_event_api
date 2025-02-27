import { FastifyInstance } from "fastify";
import path from "path";
import fs from "fs";
import YAML from "yaml";
import fastifyStatic from "@fastify/static";

export const getSwaggerDocsRoute = async (app: FastifyInstance) => {
  const docsPath = path.join(__dirname, "../docs");

  // Register fastify-static to serve files from the docs directory
  app.register(fastifyStatic, {
    root: docsPath,
    prefix: "/docs/",
  });

  try {
    // Load and parse Swagger YAML once at startup
    const yamlPath = path.join(docsPath, "swagger.yaml");
    const yamlData = fs.readFileSync(yamlPath, "utf8");
    const definitionJSON = JSON.stringify(YAML.parse(yamlData));

    const htmlPath = path.join(docsPath, "index.html");
    let htmlData = fs.readFileSync(htmlPath, "utf-8");

    // Inject Swagger JSON into HTML
    const injectedHtml = htmlData.replace(
      '"...dumped definitionJSON..."',
      JSON.stringify(definitionJSON)
    );

    app.get("/docs", (_, reply) => {
      reply.type("text/html").send(injectedHtml);
    });
  } catch (error) {
    console.error("Error loading Swagger docs:", error);
  }
};
