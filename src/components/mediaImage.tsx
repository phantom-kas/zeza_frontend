import { ImageIcon } from "lucide-react"
import { getImageUrl } from "../composabels/utils"

export default ({ media, className='' }:{media:string,className?:string}) => {
    let mediaparsed = [{ type: 'image', url: 'dasdsa', path: 'dsas', }]
    if (media) {
        mediaparsed = JSON.parse(media)
    }
    return mediaparsed.length > 0 ? <img className={className} src={getImageUrl(mediaparsed[0]['url'])} alt="" /> : <ImageIcon size={48}/>
}