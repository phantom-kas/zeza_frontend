import { ImageIcon } from "lucide-react"

export default ({ media ,className = " w-full h-70" }: { media: string,className?:string }) => {
    let mediaparsed = []
    if (media) {
        mediaparsed = JSON.parse(media)
    };

   return (mediaparsed.length >0)? <img className={ className } src={mediaparsed[0]['url']} /> : <ImageIcon className={className} />
}