import { parse } from "csv";

import fs from "node:fs";

(async () => {
  const parser = fs.createReadStream("src/csv/sample_data.csv").pipe(parse());

  for await (const [title, description] of parser) {
    fetch("http://localhost:3333/task", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
})();
