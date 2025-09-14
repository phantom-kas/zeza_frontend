import { Link } from "@tanstack/react-router"
import { Eye, Heart, ImageIcon, ShoppingCart } from "lucide-react"
import SwiperList from "./swiperList"
import { anyCurrency } from "../composabels/utils"

export const ProduCard1 = ({ product, className, to }: { product: any, className?: string, to: string }) => {
  let mediaparsed = []
  if (product.media) {
    mediaparsed = JSON.parse(product.media)
  }
  return <Link to={to} className={"flex gap-2 flex-col items-center justify-start not-dark:bg-lightblue theme1cont py-4 px-4 " + className}>

    {mediaparsed.length > 0? < SwiperList className={" w-full h-70"} media={mediaparsed} /> :<ImageIcon className={"w-full h-70"} />}

    <h3 className=" text-sm font-[600]">{product.name}</h3>
    <span className=" text-sm">{product.describtion}</span>
    <div className=" not-dark:text-[#01589A] dark:text-[#348aee] font-[600]">
      {anyCurrency(product.price)}
    </div>
    <div className="flex justify-center gap-3">
      <div className=" flex justify-center items-center p-2 theme1cont not-dark:bg-white">
        <Heart size={17} />
      </div>
      <div className=" flex justify-center items-center p-2 theme1cont not-dark:bg-white">
        <Eye size={17} />
      </div>

      <div className=" flex justify-center items-center p-2 theme1cont not-dark:bg-white">
        <ShoppingCart size={17} />
      </div>
    </div>
  </Link>
}