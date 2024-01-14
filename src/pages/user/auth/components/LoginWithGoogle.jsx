import Button from "../../../../ui/shared/Button";
import Google from "../../../../asset/svg/google.svg";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../../../../services/user.api.js";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const googleSignInStatus = await googleSignIn();
    if (googleSignInStatus) {
      navigate("/");
    }
  };
  return (
    <Button
      onClick={handleGoogleSignIn}
      customClass="bg-[#283d50] text-white"
      type="button"
    >
      <img src={Google} alt="" className="w-5 h-5 mr-5" />
      Sign in with google
    </Button>
  );
}
