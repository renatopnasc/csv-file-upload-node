import { Database } from "./database.js";
import { buildRouteRegex } from "./utils/buildRouteRegex.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRouteRegex("/task"),
    handler: (req, res) => {
      const tasks = database.show("task");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRouteRegex("/task"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const id = randomUUID();

      const data = {
        id,
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("task", data);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRouteRegex("/task/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      database.update("task", id, { id, title, description });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRouteRegex("/task/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("task", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRouteRegex("/task/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      database.patch("task", id);

      return res.writeHead(204).end();
    },
  },
];
