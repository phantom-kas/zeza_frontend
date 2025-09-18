import { Link, useNavigate } from "@tanstack/react-router"
import { Eye, ImageIcon, ImagesIcon, Pencil, RefreshCcwIcon, ShoppingCart, StarIcon, Trash2 } from "lucide-react"
import SwiperList from "./swiperList"
import ToolTip from "./toolTip"
import type { MouseEvent } from "react"

interface props {
  created_at?: string, status?: string, url?: string,
  onRemoveFromFeatured: (e: string | number) => void,
  onAddToFeatured: (e: string | number) => void,
  onDelete: (e: string | number) => void, featuredId?: string | null, onRestore: (e: string | number) => void, className?: string, price: string, title: string, describtion: string, id: string | number, to: string, media: string
}
export const ProduCardAdmin = ({ onRestore = () => { }, featuredId = undefined, status, id, created_at, price, media, className, to, onDelete = () => { }, onAddToFeatured = () => { },
  onRemoveFromFeatured = () => { },
  url = "/src/assets/images/lap.png", title, describtion }: props) => {
  let mediaparsed = []
  if (media) {
    mediaparsed = JSON.parse(media)
  }
  const handleOverlayClick = (e: MouseEvent<HTMLButtonElement, MouseEvent>, fn: { (): void; (): void }) => {
    e?.stopPropagation();
    e?.preventDefault();
    fn()
  };
  const navigate = useNavigate()

  return <Link to={to} className={" relative overflow-hidden flex gap-2 flex-col items-center justify-start not-dark:bg-lightblue theme1cont py-4 px-4 " + className}>
    {/* <img className="w-full" alt="image" src={url} /> */}
    {mediaparsed.length > 0 ? <SwiperList className={" w-full h-70"} media={mediaparsed} /> : <ImageIcon className={"w-full h-70"} />}
    <h3 className=" text-sm font-[600]">{title}</h3>
    <span className=" text-sm">{describtion}</span>
    {/* {media} */}
    <div className=" not-dark:text-[#010203] dark:text-[#348aee] font-[600]">
      {price}
    </div>
    <div className=" text-xs  items-center justify-start flex w-full">{created_at}</div>

    <div className="flex justify-end gap-3 w-full">

      {featuredId ? <ToolTip onClick={(e) => handleOverlayClick(e, () => onRemoveFromFeatured(id))} className={"flex justify-center items-center p-2 theme1cont not-dark:bg-white  "} TooltipContent={'Add to featured'}>
        <StarIcon className="fill-yellow-500 stroke-yellow-500" size={17} />
      </ToolTip> :
        <ToolTip onClick={(e) => handleOverlayClick(e, () => onAddToFeatured(id))} className={"flex justify-center items-center p-2 theme1cont not-dark:bg-white"} TooltipContent={'Add to featured'}>
          <StarIcon size={17} />
        </ToolTip>

      }
      {/* {id}-{featuredId} */}
      <ToolTip onClick={e => handleOverlayClick(e, () => navigate({ to: '/product/edit/' + id }))} className="flex justify-center items-center p-2 theme1cont not-dark:bg-white" TooltipContent={'Edit Product'}>
        <Pencil size={17} />
      </ToolTip>
      {status != 'deleted' ? <ToolTip onClick={(e) => handleOverlayClick(e, () => onDelete(id))} className="flex justify-center items-center p-2 theme1cont not-dark:bg-white" TooltipContent={'Delete Product'}>
        <Trash2 size={17} />
      </ToolTip> :
        <ToolTip onClick={(e) => handleOverlayClick(e, () => onRestore(id))} className="flex justify-center items-center p-2 theme1cont not-dark:bg-white" TooltipContent={'Restore Product'}>
          <RefreshCcwIcon size={17} />
        </ToolTip>
      }
      {/* {id} */}
      <ToolTip onClick={e => handleOverlayClick(e, () => navigate({ to: `/product/edit-media/${id}` }))} className="flex justify-center items-center p-2 theme1cont not-dark:bg-white" TooltipContent={'Edit Media'}>
        <ImagesIcon size={17} />
      </ToolTip>
    </div>

    {status == 'deleted' && <div className=" w-[200%] flex items-center justify-center -rotate-45 absolute -left-[50%] top-[50%] z-[1] font-[900] text-3xl text-red-600 border-red-600 border-5">Deleted</div>}
  </Link >


}