import { fetchProducts } from "@/lib/products";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

export default async function Home() {
  const products: any = await fetchProducts();
  console.log(products);

  return (
    <main>
      <div>Hello world</div>
      {/* {products?.map(
        (product: {
          name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | PromiseLikeOfReactNode
            | null
            | undefined;
        }) => (
          <div>{product.name}</div>
        )
      )} */}
    </main>
  );
}
