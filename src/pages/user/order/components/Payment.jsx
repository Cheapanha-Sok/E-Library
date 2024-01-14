import Input from "../../../../ui/shared/Input";
import creditCard from "../../../../asset/svg/creditCard.svg";
import visaCart from "../../../../asset/svg/visa.svg";
import Button from "../../../../ui/shared/Button";
import { checkOut } from "../../../../services/order.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Payment({
  order,
  totalPriceOrder,
}) {
  const [inputData, setInputData] = useState({
    email: "",
    phoneNumber: "",
  });

  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const handleCheckOut = async (e) => {
    e.preventDefault();
    const { email, phoneNumber } = inputData;
    const paymentStatus = await checkOut(
      order,
      totalPriceOrder,
      email,
      phoneNumber
    );
    if (paymentStatus) {
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleCheckOut} className="w-full md:w-1/2 border-2">
      <div className="flex flex-col px-5 py-5 gap-5">
        <p className="text-2xl font-bold tracking-tight text-gray-900">
          Payment Method:
        </p>
        {/* Credit or Debt Card */}
        <div className="flex items-center justify-between border-2 p-3 rounded-lg">
          <div className="flex gap-3">
            <img src={creditCard} alt="creditCartSvg" />
            <label
              htmlFor="credit-card-checkbox"
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Credit or debt card
            </label>
          </div>
          <Input
            id="credit-card-checkbox"
            type="radio"
            value="creditCard"
            style="w-5 h-5 text-blue-600 border-2"
          />
        </div>
        {/* Visa Card */}
        <div className="flex items-center justify-between border-2 p-3 rounded-lg">
          <div className="flex gap-3">
            <img src={visaCart} alt="visaSvg" />
            <label
              htmlFor="visa-card-checkbox"
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Visa Card
            </label>
          </div>
          <Input
            id="visa-card-checkbox"
            type="radio"
            value="visaCard"
            style="w-5 h-5 text-blue-600 border-2"
          />
        </div>

        {/* Email, Expiry date, and CVC/CVV */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="space-y-3">
              {/* Add your expiry date input here */}
              <label
                htmlFor="expiry-input"
                className="text-xl font-medium text-gray-900"
              >
                Expiry date
              </label>
              <Input
                style="p-2 rounded-lg border-2 text-gray-600 w-full"
                type="text"
                autoComplete="off"
              />
            </div>

            <div className="space-y-3">
              {/* Add your CVC/CVV input here */}
              <label
                htmlFor="cvc-input"
                className="text-xl font-medium text-gray-900"
              >
                CVC/CVV
              </label>
              <Input
                style="p-2 rounded-lg border-2 text-gray-600 w-full"
                type="text"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {/* Add your email input here */}
            <label
              htmlFor="email-input"
              className="text-xl font-medium text-gray-900"
            >
              Email address
            </label>
            <Input
              style="p-2 rounded-lg border-2 text-gray-600 w-full"
              type="email"
              id="email"
              placeholder="example@gmail.com"
              autoComplete="off"
              required
              onChange={onChange}
            />
            <label
              htmlFor="email-input"
              className="text-xl font-medium text-gray-900"
            >
              PhoneNumber
            </label>
            <Input
              style="p-2 rounded-lg border-2 text-gray-600 w-full"
              type="text"
              id="phoneNumber"
              placeholder="XXX XX XX XX"
              autoComplete="off"
              required
              onChange={onChange}
            />
          </div>
        </div>
        {order.length ? <div className="flex flex-col gap-5">
          <Button customClass="bg-[#283d50] text-white" type="submit">
            Pay now
          </Button>
        </div> : null}
      </div>
    </form>
  );
}
