import { Pool } from "./deps.js";

const PGPASS = Deno.env.get("PGPASS").trim();
const PGPASS_PARTS = PGPASS.split(":");

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: PGPASS_PARTS[0],
  database: PGPASS_PARTS[2],
  user: PGPASS_PARTS[3],
  password: PGPASS_PARTS[4],
  port: PGPASS_PARTS[1],
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
