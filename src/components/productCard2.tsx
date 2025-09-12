import { useState } from "react";
import { useCartStore } from "../store/cart";
import { Adder } from "./adder";
import { anyCurrency } from "../composabels/utils";
import { BlueButton } from "./ButtonBlue";
import SwiperList from "./swiperList";
import DOMPurify from "dompurify"
import SwiperList2 from "./swiperList2";
type Product = {
  name: string;
  description: string;
  price: number;
  new?: boolean;
  media: any,
  // image: string; // adjust to your actual shape
};

export default function ProductDetails({ product, className }: { className?: string, product: Product }) {
  const cart = useCartStore();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={"w-max600 flex flex-col-reverse sm:flex-row-reverse items-center gap-x-10  justify-center sm:justify-between  relative sm:gap-y-4 gap-y-10" + className}>
      <div className="sm:w-[46%] w-full flex flex-col sm:justify-center sm:items-start h-full sm:gap-y-10 gap-y-5 sm:text-start">
        {product.new && (
          <h2 className="text-[14px] w-full leading-none mb-5 sm:w-[max(379px)] text-orange font-stretch-100%">
            NEW PRODUCT
          </h2>
        )}

        <h3 className="text-[40px] uppercase sm:w-[70%] leading-none w-full">
          {product.name}
        </h3>

        <span className="opacity-[50%] w-full sm:w-[70%]"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}>
       
          
        </span>

        <span
          className="text-[18px] font-[600]"
          dangerouslySetInnerHTML={{
            __html: `${anyCurrency(product.price)}`,
          }}
        />

        <div className="flex  gap-4 px gap-y-5 flex-col w-full">
          <Adder value={1} onChange={(e: number) => setQuantity(Number(e))} />

          <BlueButton className=" w-full" label=" ADD TO CART" onClick={() => cart.increment(product, quantity)}>
          </BlueButton>
        </div>
      </div>

      {/* <img alt="image"
        className=" rounded-[8px]"
        src={product.image}
      /> */}
      {/* <SwiperList className={" w-full sm:w-[50%] h-70"} media={product.media} /> */}
      <SwiperList2 className={" w-full sm:w-[50%] h-100"} media={product.media} />


    </div>
  );
}
