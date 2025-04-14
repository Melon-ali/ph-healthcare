import { Server } from "http";
import app from "./app";

const port = 5005;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Server On Port ${port}`);
  });
}

main();
