import { Share2 } from "lucide-react";
import ToolTip from "./toolTip";

export default function NativeShare({ url, title, text }: { url: string; title: string; text: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  return (
  

     <ToolTip onClick={handleShare} className=" justify-center items-center p-2  ha rounded-full flex cursor-pointer" children={<Share2 className=" " size={30}/>} TooltipContent={'Share'} />
  );
}
