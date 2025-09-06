import { LucideLockKeyhole, MailIcon } from "lucide-react"
import { BlueButton } from "../ButtonBlue"
import InputField from "../forms/input2"
import Base from "./base"
import { Link, useRouterState } from "@tanstack/react-router"

/* eslint-disable react-refresh/only-export-components */
export default () => {
    const routerState = useRouterState();
  
  return <Base title="Forgot Password"
  > <InputField icon={<MailIcon />} name={""} label="Please enter your email" type="email" />
    <div className=" w-full flex justify-end">
      <Link to={ routerState.location.pathname+"?modal=login"} className=" hover:underline text-blue font-[500] text-lg">Login</Link>
    </div>
    <BlueButton label="Submit" />
  </Base>
}