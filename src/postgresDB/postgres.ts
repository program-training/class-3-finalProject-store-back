import { Pool } from "pg";

export const pool = new Pool({
  connectionString: `${process.env.POSTGRES_CONNECTION_URI}`,
});

export default async function connectionToPostgresDB() {
  pool.on("error", (err, _client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });
  console.log("connection to postgres");
}
