import { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";
import YAML from "yaml";

export const swaggerDocsRoute = async (app: FastifyInstance) => {
  app.get("/docs", async (_, reply) => {
    try {
      const yamlPath = path.join(__dirname, "../docs/swagger.yaml");
      const yamlData = fs.readFileSync(yamlPath, "utf8");

      const htmlPath = path.join(__dirname, "../docs/index.html");
      let htmlData = fs.readFileSync(htmlPath, "utf-8");

      const definitionJSON = JSON.stringify(YAML.parse(yamlData));

      htmlData = htmlData.replace(
        '"...dumped definitionJSON..."',
        JSON.stringify(definitionJSON)
      );

      reply.type("text/html").send(htmlData);
    } catch (error) {
      reply.status(500).send({ error: "File not found or cannot be read" });
    }
  });
};
