import Image from "next/image";
import { useState } from "react";

import OrderBar from "./OrderBar";
import ProductList from "./ProductList";
import TopBar from "./TopBar";

import { categories, options, products } from "@/public/js/options";

const categoriesWithProducts = categories.map((category) => {
  const categoryProducts = products
    .filter((product) => product.categoryID === category._id.$oid)
    .filter((product) => product.appear)
    .sort((a, b) => a.usdprice - b.usdprice); // Sort from lowest to highest price
  return { ...category, products: categoryProducts };
});

export default function Menu() {
  const [state, setState] = useState("Fruits Tea");
  const rate = options[0].rate;
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderBarHeight, setOrderBarHeight] = useState(0);

  const phoneNumber = "+96170097533";

  const addToSelectedItems = (product, quantity) => {
    const updatedItems = selectedItems.filter(
      (item) => item.product !== product
    );
    if (quantity > 0) {
      updatedItems.push({ product, quantity });
    }
    setSelectedItems(updatedItems);
  };

  const clearSelectedItems = () => {
    if (confirm("Are you sure you want to clear the order?")) {
      setSelectedItems([]);
    }
  };

  const sendOrder = () => {
    let message = ``;
    let totalUSD = 0;
    let totalLBP = 0;
    selectedItems.forEach((item) => {
      const { product, quantity } = item;
      const totalPriceUSD = quantity * product.usdprice;
      const totalPriceLBP = Math.round((totalPriceUSD * rate) / 1000) * 1000;
      message += `${quantity} ${product.name}\n`;
      totalUSD += totalPriceUSD;
      totalLBP += totalPriceLBP;
    });

    message += `\n___________________________\nTotal: $${totalUSD.toFixed(
      2
    )} / LBP ${totalLBP.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <TopBar
        categories={categories}
        state={state}
        setState={setState}
        main={true}
      />
      <div
        className={
          selectedItems.length > 0 &&
          (orderBarHeight < 150 ? `mb-[24vh]` : `mb-[32vh]`)
        }
      >
        {categoriesWithProducts?.map((category, i) => (
          <div key={i} id={category.name}>
            <div
              className={`text-4xl font-bold py-2 px-2 pt-14 ${
                i === 0 && `pt-16`
              }`}
              style={{
                textShadow: `0px 0px 4px ${category.titleColor}`,
                background: category.titleBackground,
              }}
            >
              {category.name}
            </div>
            <div className="text-gray-700 py-2 px-2">
              {category.description}
            </div>
            <div className="bg-gray-100 text-center">
              {category.image && (
                <Image
                  src={`/img/products/${category.image}.png`}
                  alt={category.name}
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 py-2 w-full">
              <ProductList
                products={category.products}
                rate={rate}
                selectedItems={selectedItems}
                addToSelectedItems={addToSelectedItems}
              />
            </div>
          </div>
        ))}
        {selectedItems.length > 0 && (
          <OrderBar
            rate={rate}
            selectedItems={selectedItems}
            clearSelectedItems={clearSelectedItems}
            sendOrder={sendOrder}
            setOrderBarHeight={setOrderBarHeight}
          />
        )}
      </div>

      {/* <Link href="https://www.za-apps.com">
        <div className="watermark">Made with ❤ by za-apps.com</div>
      </Link> */}
    </>
  );
}
