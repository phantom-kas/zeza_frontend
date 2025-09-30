import { GemIcon, SquareCheck, Truck } from "lucide-react"
import type React from "react"

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return <section className=" w-full flex flex-col gap-4 dark:bg-neutral-950 px-6 not-dark:bg-[#01589A]">
    <div className=" w-max1200 flex flex-col gap-4  text-white  pt-10 pb-20 mx-auto">
      {/* <h1 className=" w-max1000 text-xl sm:text-4xl mb-14">
        We're tackling the biggest challenges in laptops
        and electronic products.
        </h1> */}


      <h1 className=" w-max1000 text-xl sm:text-4xl mb-14 text-center mx-auto">
        20 percent off ! <br/> Payment on delivery
      </h1>



      <div className="mx-auto flex justify-between gap-5 items-center sm:flex-row flex-col w-max1000">
        {/* <FootItem icon={<Truck  size={40}/>} text1="Fast & free shipping" text2="Every single order ships for free. No minimums, no tiers,
 no fine print whatsoever." /> */}
        <FootItem icon={<Truck size={40} />} text1="Fast shipping" text2="Payment on delivery" />

        {/* <FootItem icon={<SquareCheck size={40} />} text1="Innovative, User-Centric Design" text2="Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle." /> */}
        <FootItem icon={<SquareCheck size={40} />} text1="Innovative, User-Centric Design" text2="24 hour delivery" />
        {/* <FootItem icon={<GemIcon size={40} />} text1="Durable, High-Quality Materials" text2="We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality." /> */}
        <FootItem icon={<GemIcon size={40} />} text1="Durable, High-Quality Materials" text2="" />
      </div>
    </div>
  </section>
}


// eslint-disable-next-line react-refresh/only-export-components
const FootItem: React.FC<{ text1?: string, text2?: string, icon?: React.ReactNode }> = ({ text1, text2, icon }) => {
  return <div className="flex flex-col items-center justify-start gap-1 text-center">
    {icon}
    <span className="text-sm font-[500]">{text1}</span>
    <span className="text-xs">{text2}</span>
  </div>
}