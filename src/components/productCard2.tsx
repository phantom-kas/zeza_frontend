import { useState } from "react";
import { useCartStore } from "../store/cart";
import { Adder } from "./adder";
import { anyCurrency, apiBase, safeSlugify } from "../composabels/utils";
import { BlueButton } from "./ButtonBlue";
import DOMPurify from "dompurify"
import SwiperList2 from "./swiperList2";
import axios from "../lib/axios";
import { ImageIcon, Share2 } from "lucide-react";
import Rating from "./rating";
import { useSettingsStore } from "../store/system";
import ToolTip from "./toolTip";
import NativeShare from "./share";

type Product = {
  name: string;
  description: string;
  price: number;
  new?: boolean;
  media: any,
  review: string | number
  id: string | number
  num_review: number
  // image: string; // adjust to your actual shape
};


export default function ProductDetails({ onSetIsopen, product, className }: { onSetIsopen: (i:any) => void, className?: string, product: Product }) {
  const { settings } = useSettingsStore()

  const [isLoading, setIsloading] = useState(false)
  const handleAddToCart = async (e) => {
    e.preventDefault()
    if (settings.allow_checkout != 1) {
      // window.alert(0)
      onSetIsopen(quantity)
      return
    }
    e.preventDefault()
    setIsloading(true)
    await axios.post('/cart/add-item', [{ product_id: product.id, quantity }], { _showAllMessages: true }).then(res => {
      if (res.data.status != 'success') return

      setItemsCount(res.data.data.total.totalUnits)

      // window.alert(res.data.data.totaldata.totalUnits)
    }).catch(() => {
      setIsloading(false)
    })
    setIsloading(false)
  }
  const { setItemsCount } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  return (
    <div key={settings.allow_checkout} className={"w-max600 flex flex-col-reverse sm:flex-row-reverse items-center gap-x-10  justify-center sm:justify-between  relative sm:gap-y-4 gap-y-10" + className}>
      <div className="sm:w-[46%] w-full flex flex-col sm:justify-center sm:items-start h-full sm:gap-y-10 gap-y-5 sm:text-start">
        {product.new && (
          <h2 className="text-[14px] w-full leading-none mb-5 sm:w-[max(379px)] text-orange font-stretch-100%">
            NEW PRODUCT
          </h2>
        )}

        <h3 className="text-[40px] uppercase sm:w-[70%] leading-none w-full">
          {product.name}  <NativeShare url={apiBase + '/product/' + safeSlugify(product.name) + '-' + product.id} title={""} text={""} />
        </h3>

        <span className="opacity-[50%] w-full sm:w-[70%]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}>


        </span>

        <span
          className="text-[18px] font-[600]"
          dangerouslySetInnerHTML={{
            __html: `${anyCurrency(product.price)}`,
          }}
        />

        <form onSubmit={handleAddToCart} className="flex  gap-4 px gap-y-5 flex-col w-full">
          <Adder value={1} onChange={(e: number) => setQuantity(Number(e))} />


          {/* {settings.allow_checkout} */}
          <BlueButton loading={isLoading} className=" w-full" label={settings.allow_checkout == 1 ? "ADD TO CART" : 'Purchase'} >

          </BlueButton>
        </form>

        <div className=" flex items-end"><Rating rating={product.review} /><span className=" opacity-35 text-sm font-[600]">({product.num_review ?? 0})</span></div>
      </div>

      {/* <img alt="image"
        className=" rounded-[8px]"
        src={product.image}
      {/* <SwiperList className={" w-full sm:w-[50%] h-70"} media={product.media} /> */}
      {product.media.length > 0 ? <SwiperList2 className={" w-full sm:w-[50%] h-100"} media={product.media} /> : <ImageIcon className={" w-full sm:w-[50%] h-100"} />}


    </div>
  );
}
