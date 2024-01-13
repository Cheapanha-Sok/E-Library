import { useState } from "react";
import Logo from "../../../../asset/image/Logo.png";
import { useNavigate } from "react-router-dom";
import Button from "../../../../ui/shared/Button.jsx";
import Input from "../../../../ui/shared/Input.jsx";
import LoginWithGoogle from "./LoginWithGoogle.jsx";
import { signIn } from "../../../../services/user.api.js";

export default function Login({ setAuthOption }) {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputData;
    const singInStatus = await signIn(email, password);
    if (singInStatus) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-xl md:text-3xl font-semibold">Sign In</h1>
        <p className="mt-5 uppercase">Please provide us</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 py-5">
          {/* Form Inputs */}
          <Input
            onChange={onChange}
            type="text"
            placeholder="Example@gmail.com"
            id="email"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Input
            onChange={onChange}
            type="password"
            placeholder="Password"
            id="password"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Button type="submit" customClass="bg-[#283d50]">
            Sign In
          </Button>
          <span onClick={() => setAuthOption("Forget Password")} className=" text-end cursor-pointer">
            Forget your password?
          </span>
        </form>
        <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-600" />
          <p className="text-center text-">Or</p>
          <hr className="border-gray-600" />
        </div>
        <div className="pt-5 flex flex-col">
          <LoginWithGoogle />
        </div>

        <div className="mt-6 text-black flex justify-between gap-2 items-center">
          <p>Create an account</p>
          <Button customClass="bg-[#283d50]" type="button" onClick={() => setAuthOption("Sign Up")}>
            Sign up
          </Button>
        </div>
      </div>

      <div className="w-1/2 p-5 md:flex hidden justify-center items-center">
        <img src={Logo} alt="Reading a Book" className="rounded-xl" />
      </div>
    </>)
}
