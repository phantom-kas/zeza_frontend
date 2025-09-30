import { LucideLockKeyhole, MailIcon } from "lucide-react"
import { BlueButton } from "../ButtonBlue"
import InputField from "../forms/input2"
import Base from "./base"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import AltAuth from "./altAuth"
import { useState } from "react"
import { useAuthStore } from "../../store/auth"
/* eslint-disable react-refresh/only-export-components */
export default () => {
  
  const [form, setForm] = useState({ password: '', email: '' })
  const [loading, setLoading] = useState(false)
  const user = useAuthStore()
  const handleChange = (e: { name: string, value: string | number }) => {
    setForm({ ...form, [e.name]: e.value })
    console.log(form)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await user.login({...form})
    setLoading(false)
  }
  const routerState = useRouterState();

  return <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-y-4">
    <Base title="Login"

    >

      <div className=" w-full text-center">
        Don't have an account? <Link to={routerState.location.pathname + "?modal=signup"} className="hover:underline text-blue-400 dark:text-blue">Sign up</Link>
      </div>
      <InputField onInput={(e) => { handleChange(e) }} icon={<MailIcon />} name={"email"} label="Email" type="email" />
      <InputField onInput={(e) => { handleChange(e) }} icon={<LucideLockKeyhole />} name={"password"} label="Password" type="password" />
      <div className=" w-full flex justify-end">
        <Link to={routerState.location.pathname + "?modal=forgot-password"} className=" hover:underline text-blue-400 dark:text-blue font-[500] text-lg">Forgot Password</Link>
      </div>
      <BlueButton loading={loading} label="Submit" />
      <AltAuth />
    </Base>
  </form>
}