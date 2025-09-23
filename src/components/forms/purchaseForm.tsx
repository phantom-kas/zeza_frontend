import { Loader2, MailIcon, PhoneIcon } from "lucide-react"
import { BlueButton } from "../ButtonBlue"
import InputField from "./input2"
import TextField3 from "./text_area3"
import { useState } from "react"
import axios from "../../lib/axios"
import { apiBase } from "../../composabels/utils"
import { useQuery } from "@tanstack/react-query"

export default ({ msg, product, quantity, onClose }: { onClose: () => void, msg: string, product: string, quantity: number }) => {


    const { isPending, error, data, isLoading } = useQuery({
        queryKey: ['melink'],
        queryFn: async () => {
            let m = await axios.get(`/me-link`)
            return m.data.data
        }
    })
    const [message, setMsg] = useState(msg)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [isLoading2 , setLoading] = useState(false)

    const handelSub = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post("/purchases", { product, name, msg, email, phone, quantity }, { _showAllMessages: true }).then(res => {
            if (res.data.status != 'success') return
            let beLink = apiBase + '/product/product-' + product
            const encodedMessage = encodeURIComponent(beLink + ' \n \n' + message);
            const url = `${data}?text=${encodedMessage}`;
            window.open(url, "_blank");
        }).catch(() => { })
        onClose()
        setLoading(false)
    }

    if (isLoading || !data)
        return <Loader2 className=" mx-auto animate-spin"  size={100}/>

    return <form onSubmit={handelSub} className=" w-full flex flex-col gap-6">
        <InputField onInput={e => setEmail(e.value)} name={"email"} label="Email" className=" theme2cont" icon={<MailIcon />} />
        <InputField onInput={e => setPhone(e.value)} name={"phone"} label="Phone" icon={<PhoneIcon />} />
        <InputField onInput={e => setName(e.value)} name={"name"} label="Name" icon={<PhoneIcon />} />

        {/* {data}- */}
        <TextField3 onInput={e => setMsg(e.value)} val={message} name={""} label="Message" icon={<MailIcon />} />
        <BlueButton loading={isLoading2} label="submit" />
    </form>
}