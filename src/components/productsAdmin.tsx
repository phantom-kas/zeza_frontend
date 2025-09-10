import { Link } from "@tanstack/react-router"
import { Eye, ImagesIcon, Pencil, ShoppingCart, Trash2 } from "lucide-react"
import SwiperList from "./swiperList"
import ToolTip from "./toolTip"

export const ProduCardAdmin = ({ created_at, price, media, className, to, url = "/src/assets/images/lap.png", title, describtion }: { created_at?: string, url?: string, className?: string, price: string, title: string, describtion: string, id: string | number, to: string, media: string }) => {
  let mediaparsed = [{ type: 'image', url: 'dasdsa', path: 'dsas' }]
  if (media) {
    mediaparsed = JSON.parse(media)
  }
  return <Link to={to} className={"flex gap-2 flex-col items-center justify-start not-dark:bg-lightblue theme1cont py-4 px-4 " + className}>
    {/* <img className="w-full" alt="image" src={url} /> */}
    <SwiperList className={" w-full h-70"} media={mediaparsed} />
    <h3 className=" text-sm font-[600]">{title}</h3>
    <span className=" text-sm">{describtion}</span>
    {/* {media} */}
    <div className=" not-dark:text-[#010203] dark:text-[#348aee] foeent-[600]">
      {price}
    </div>
    <div className=" text-xs  items-center justify-start flex w-full">{created_at}</div>

    <div className="flex justify-end gap-3 w-full">
      <ToolTip className="flex justify-center items-center p-2 theme1cont not-dark:bg-white" TooltipContent={'Edit Product'}>
        <Pencil size={17} />
      </ToolTip>
      <ToolTip className="flex justify-center items-center p-2 theme1cont not-dark:bg-white" TooltipContent={'Delete'}>
        <Trash2 size={17} />
      </ToolTip>
      <ToolTip className="flex justify-center items-center p-2 theme1cont not-dark:bg-white" TooltipContent={'Edit Media'}>
        <ImagesIcon size={17} />
      </ToolTip>
    </div>

  </Link>
}