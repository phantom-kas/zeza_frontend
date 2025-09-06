import { LucideLockKeyhole, MailIcon } from "lucide-react"
import { BlueButton } from "../ButtonBlue"
import InputField from "../forms/input2"
import Base from "./base"
import { Link, useRouterState } from "@tanstack/react-router"
import AltAuth from "./altAuth"

/* eslint-disable react-refresh/only-export-components */
export default () => {
  const routerState = useRouterState();

  return <Base title="Register"
  >
    <div className=" w-full text-center">
      Alreay have an account? <Link to={routerState.location.pathname + "?modal=login"} className="hover:underline text-blue">login in</Link>
    </div>
    <InputField icon={<MailIcon />} name={"eamil"} label="Email" type="email" />
    <InputField icon={<MailIcon />} name={"full_name"} label="Full Name" />
    <InputField icon={<LucideLockKeyhole />} name={"password"} label="Password" type="password" />
    <InputField icon={<LucideLockKeyhole />} name={"confirm_password"} label="Confirm Password" type="password" />
    <BlueButton label="Submit" />
    <AltAuth />

  </Base>
}