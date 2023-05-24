import Product from "./Product";

const ProductList = ({ products, rate, selectedItems, addToSelectedItems }) => {
  const filteredProducts = products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-3">
      {filteredProducts?.map((product, j) => {
        const selectedProduct = selectedItems.find(
          (item) => item.product === product
        );
        const selectedQuantity = selectedProduct ? selectedProduct.quantity : 0;

        return (
          <div
            key={j}
            className={`bg-white p-4 rounded shadow-md shadow-mogeColor`}
          >
            <Product
              product={product}
              rate={rate}
              selectedQuantity={selectedQuantity}
              addToSelectedItems={addToSelectedItems}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
