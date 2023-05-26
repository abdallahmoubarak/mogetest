import mongoose from "mongoose";
import Product from "@/models/product";
import Category from "@/models/category";

const productsPreFiller = async () => {
  const categories = await Category.find({});
  const products = await Product.find({});

  const categoriesWithProducts = categories.map((category) => {
    const productsInCategory = products.filter(
      (product) => product.categoryID === category._id.toString()
    );

    return { ...category, products: productsInCategory };
  });

  if (categoriesWithProducts.length > 0) {
    for (let i = 0; i < categoriesWithProducts.length; i++) {
      let order = 1;
      for (let j = 0; j < categoriesWithProducts[i].products.length; j++) {
        categoriesWithProducts[i].products[j].order = order;
        const product = await Product.findById({
          _id: categoriesWithProducts[i].products[j]._id,
        });
        product.order = order;
        await product.save();
        order++;
      }
    }
  }
};

async function dbConnection() {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    async () => {
      console.log("connected");

      // Uncomment this if you want to prefill the products with the order field
      // await productsPreFiller();
    }
  );
}

export default dbConnection;
