import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  connectionString: "postgres://store_users_user:EttP7JfgIaXa9eXWzjwvZepagmcNzIVb@dpg-clqnkr0gqk6s738uro5g-a.oregon-postgres.render.com/store_users",
  ssl: {
    rejectUnauthorized: false,
  },
  host: "dpg-clqnkr0gqk6s738uro5g-a",
  password: "EttP7JfgIaXa9eXWzjwvZepagmcNzIVb",
  user: "store_users_user",
  database: "store_users",
});

export default async function connectionToPostgresDB() {
  pool.on("error", (err, _client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });
  console.log("Connected to postgres");
}
