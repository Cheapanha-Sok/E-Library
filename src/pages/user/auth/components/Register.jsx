import { useState } from "react";
import Logo from "../../../../asset/image/Logo.png";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../../services/user.api.js";
import Button from "../../../../ui/shared/Button.jsx";
import Input from "../../../../ui/shared/Input.jsx";
import LoginWithGoogle from "./LoginWithGoogle.jsx";

export default function Register({ setAuthOption }) {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    currentPassword: "",
    username: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, currentPassword, confirmPassword } = inputData;
    const signUpStatus = await signUp(
      username,
      email,
      currentPassword,
      confirmPassword
    );
    if (signUpStatus) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="w-1/2 p-5 md:flex hidden justify-center items-center">
        <img src={Logo} alt="Reading a Book" className="rounded-xl" />
      </div>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="mt-5 uppercase">Please provide us</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 py-5">
          {/* Form Inputs */}
          <Input
            onChange={onChange}
            type="text"
            placeholder="Username"
            id="username"
            style="p-2 border rounded-2xl"
            autoComplete="off"
            required
          />

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
            id="currentPassword"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Input
            onChange={onChange}
            type="password"
            placeholder="Confrim Password"
            id="confirmPassword"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Button type="submit" customClass="bg-[#283d50]">
            Sign Up
          </Button>
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
          <p>Already have an account ?</p>
          <Button customClass="bg-[#283d50]" onClick={() => setAuthOption("Sign In") }>Log in</Button>
        </div>
      </div>
    </>
  );
}
