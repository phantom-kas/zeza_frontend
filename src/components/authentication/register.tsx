import { LucideLockKeyhole, MailIcon } from "lucide-react"
import { BlueButton } from "../ButtonBlue"
import InputField from "../forms/input2"
import Base from "./base"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import AltAuth from "./altAuth"
import { useState } from "react"
import axios from "../../lib/axios"
import { useToastStore } from "../../store/toast"

/* eslint-disable react-refresh/only-export-components */
export default () => {
  const [form, setForm] = useState({ password: '', email: '', name: '', confirm_password: '' })
  const [loading, setLoading] = useState(false)
  const routerState = useRouterState();
  const currentPathname = routerState.location.pathname;
  const navigate = useNavigate()

  const handleChange = (e: { name: string, value: string | number }) => {
    setForm({ ...form, [e.name]: e.value })
    console.log(form)
  }
  const alert = useToastStore()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password != form.confirm_password) {
      alert.addToast("Password don't match", 'error')
      return
    }
    setLoading(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks

    await axios.post('/signup', { ...form, role: 'user' }, {
      _showAllMessages: true,
      _noRefresh: true,
    }).then((res) => {
      // if(res.data)
      if (res.data.status != 'success') return


      navigate({ to: currentPathname });
    })
    setLoading(false)
  }
  return <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-y-4">
    <Base title="Register"
    >
      <div className=" w-full text-center">
        Alreay have an account? <Link to={routerState.location.pathname + "?modal=login"} className="hover:underline text-blue">login in</Link>
      </div>
      <InputField required onInput={(e) => { handleChange(e) }} icon={<MailIcon />} name={"email"} label="Email" type="email" />
      <InputField required onInput={(e) => { handleChange(e) }} icon={<MailIcon />} name={"name"} label="Full Name" />
      <InputField required onInput={(e) => { handleChange(e) }} icon={<LucideLockKeyhole />} name={"password"} label="Password" type="password" />
      <InputField required onInput={(e) => { handleChange(e) }} icon={<LucideLockKeyhole />} name={"confirm_password"} label="Confirm Password" type="password" />
      <BlueButton loading={loading} label="Submit" />
      <AltAuth />

    </Base>
  </form>
}