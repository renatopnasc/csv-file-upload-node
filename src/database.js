import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  show(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    const task = this.#database[table][rowIndex];

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...task,
        ...data,
        updated_at: new Date(),
      };
    }
  }

  delete(table, id) {
    const task = this.#database[table].filter((task) => task.id !== id);

    this.#database[table] = task;
    this.#persist();
  }

  patch(table, id) {
    const taskCompleted = this.#database[table].map((row) => {
      if (row.id === id) {
        return { ...row, completed_at: new Date() };
      }

      return row;
    });

    this.#database[table] = taskCompleted;
  }
}
