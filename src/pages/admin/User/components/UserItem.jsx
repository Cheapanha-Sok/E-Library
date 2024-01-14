import defaultUserImage from "../../../../asset/image/defaultUser.png"
import Button from '../../../../ui/shared/Button'

export default function UserItem({ data, roles }) {
    console.log(roles)
    const { username, role, phoneNumber, userImage, email } = data
    const image = userImage ? userImage : defaultUserImage
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
                    {roles === "admin" ? <Button customClass='bg-[#283d50] text-white'>
                        Edit User
                    </Button> : null}
                </div>
            </div>
        </li>
    )
}
