import { Pool } from "./deps.js";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: Deno.env.get("PGHOST"),
  database: Deno.env.get("PGDATABASE"),
  user: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
  port: Deno.env.get("PGPORT"),
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
