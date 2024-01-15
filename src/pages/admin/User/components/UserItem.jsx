import { useState } from "react"
import defaultUserImage from "../../../../asset/image/defaultUser.png"
import { updateUserRole } from "../../../../contexts/user/UserAction"
import Button from '../../../../ui/shared/Button'
import Modal from "../../../../ui/shared/Modal"
import Input from "../../../../ui/shared/Input"

export default function UserItem({ data, roles , userId }) {
    const [isUpdated, setIsUpdated] = useState(false)
    const { username, role, phoneNumber, userImage, email } = data
    const [changerole, setRole] = useState("")
    const image = userImage ? userImage : defaultUserImage
    const handleClick = () => {
        setIsUpdated(!isUpdated)
    }
    const handleChangeRole = async (e) => {
        e.preventDefault()
        await updateUserRole(changerole , userId)
    }
    return (
        <li className='p-5'>
            <div className='flex flex-col md:flex-row gap-5 border-2 p-2 rounded-lg items-center justify-between'>
                <div className='flex flex-col md:flex-row gap-5 items-center'>
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                            src={image}
                            alt="Bordered avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className='flex flex-col gap-1 text-sm'>
                        <p className='text-gray-500'>Email : {email}</p>
                        <p className='text-gray-500'>Username : {username}</p>
                        <p className='text-gray-500'>PhoneNumber : {phoneNumber}</p>
                        <p className='text-gray-500'>Role : {role}</p>
                    </div>
                </div>
                <div className='flex md:flex-col gap-5 justify-end md:justify-center text-xs'>
                    {roles === "admin" ? <Button customClass='bg-[#283d50] text-white' onClick={handleClick}>
                        Change Role
                    </Button> : null}
                </div>
            </div>
            {isUpdated && <Modal title="Change Role" onClose={handleClick}>
                <form className="p-5 space-y-5" onSubmit={handleChangeRole}>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
                        <label htmlFor="author" className="text-sm font-medium text-white">Role :</label>
                        <Input
                            style="px-5 py-2 rounded-lg border-2"
                            type="text"
                            id="author"
                            defaultValue={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <Button customClass="bg-white" type="submit">
                        Change
                    </Button>
                </form>
            </Modal>}
        </li>
    )
}
