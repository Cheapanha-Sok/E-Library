import Button from "../../../../ui/shared/Button";
import { getUserData, logOut, updateUserData } from "../../../../services/user.api";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getUser, setLoading, setUser } from "../userSlice";
import Spinner from "../../../../ui/Spinner.jsx";
import { useEffect, useState } from "react";
import Input from "../../../../ui/shared/Input";
import EditUser from "../../../../asset/svg/editUser.svg"
import defaultUser from "../../../../asset/image/defaultUser.png";

export default function UserDetail() {
  const userData = useSelector(getUser);
  const loading = useSelector(getLoading);
  const { username, email, userImage, phoneNumber } = userData;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [inputData, setInputData] = useState({
    username: username,
    phoneNumber: phoneNumber,
    userImage: "",
  });
  const onTextChange = (e) => {
    const { id, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setInputData((prevState) => ({
      ...prevState,
      userImage: file,
    }));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = getUserData((data) => {
      dispatch(setUser(data));
    });
    return () => unsubscribe;
  }, [dispatch]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    await logOut();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const { userName, phoneNumber, userImage } = inputData;
      await updateUserData(userName, phoneNumber, userImage);
    }
    setIsEdit(!isEdit);
  };
  const image = userImage ? userImage : defaultUser
  return (
    <div className="border-2 rounded-xl w-full md:w-1/2">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col justify-between p-5">
          <div className="flex justify-between items-center">
            <span className="text-sm md:text-xl font-bold tracking-tight text-gray-900">
              My Profile
            </span>
            <Button
              customClass="bg-red-500 text-white"
              type="button"
              onClick={handleLogOut}
            >
              Log out
            </Button>
          </div>
          <hr className="h-px my-5 bg-gray-500" />
          <form
            onSubmit={handleEdit}
            className="flex gap-5 flex-col justify-evenly items-center md:flex-row"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
                <img
                  src={image}
                  alt="Bordered avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              {isEdit && (
                <Input
                  type="file"
                  id="userImage"
                  style="rounded-md bg-slate-200"
                  onChange={onFileChange}
                  accept="image/*"
                />
              )}
              <Button onClick={() => setIsEdit(!isEdit)} type="button">
                <img src={EditUser} alt="editBtn" className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-2 md:gap-5">
              <div className="flex flex-col">
                <p className="font-bold tracking-tight text-gray-900">
                  Email
                </p>
                <span>{email}</span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold tracking-tight text-gray-900">
                  User name
                </p>
                {isEdit ? (
                  <Input
                    type="text"
                    id="username"
                    style="px-3 py-1 border-1 rounded-md bg-slate-200"
                    onChange={onTextChange}
                  />
                ) : (
                  <span>{username}</span>
                )}
              </div>

              <div className="flex flex-col">
                <p className="font-bold tracking-tight text-gray-900">
                  Phone Number
                </p>
                {isEdit ? (
                  <Input
                    type="text"
                    id="phoneNumber"
                    style="px-3 py-1 border-1 rounded-md bg-slate-200"
                    onChange={onTextChange}
                  />
                ) : (
                  <span>{phoneNumber}</span>
                )}
              </div>
              {isEdit && (
                <Button customClass="bg-[#283d50] text-white" type="submit">
                  Save
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
