import { useState } from "react";
import Logo from "../../../../asset/image/Logo.png";
import { resetPassword } from "../../../../services/user.api.js";
import Button from "../../../../ui/shared/Button.jsx";
import Input from "../../../../ui/shared/Input.jsx";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword({ setAuthOption }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatePasswordStatus = await resetPassword(email);
    if (updatePasswordStatus) {
      navigate("/signIn");
    }
  }
  return (
    <>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-xl md:text-3xl font-semibold">
          Forgot password
        </h1>
        <p className="uppercase mt-5 text-black">
          Please provide us your email
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            style="p-2 mt-8 rounded-xl border text-gray-600"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <span onClick={() => setAuthOption("Sign In")} className="text-end cursor-pointer">Cancel</span>
          <Button customClass="bg-[#283d50] text-white" type="submit">
            Reset
          </Button>
        </form>
        <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-600" />
          <p className="text-center text-md">Or</p>
          <hr className="border-gray-600" />
        </div>
      </div>
      <div className="w-1/2 p-5 sm:flex hidden justify-center items-center">
        <img src={Logo} alt="Reading a Book" />
      </div>
    </>
  );
}
