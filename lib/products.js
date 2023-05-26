import clientPromise from "@/lib/client";

let client;
let db;
let products;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    todos = await db.collection("todos");
  } catch (error) {
    throw new Error("Failed to connect to the database.");
  }
}

(async () => {
  await init();
})();

export async function fetchProducts() {
  try {
    if (!products) await init();
    const result = await products.find({});

    return { products: result };
  } catch (error) {
    return { error: "Failed to fetch products!" };
  }
}
