import { XIcon } from "lucide-react"

export default ({ onclick }: { onclick: () => void }) => {
    return <div className=" w-full flex justify-end">
        <button type="button" onClick={() => onclick()} className=" rounded-full w-10 h-10 p-1 ha flex justify-center items-center theme2cont text-white3 cursor-pointer">
            {/* <X /> */}
            <XIcon size={90} />
        </button>
    </div>
}