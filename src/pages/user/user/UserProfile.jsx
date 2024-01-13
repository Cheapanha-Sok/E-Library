import OrderDetail from "./components/OrderDetail";
import UserDetail from "./components/UserDetail";

export default function UserProfile() {

    return (
      <div className="flex flex-col gap-5 py-5  text-xs md:text-base">
            {/* user Profile */}
            <div className="flex flex-col md:flex-row gap-10 px-5">
                <UserDetail />
                <OrderDetail/>
            </div>
        </div>
    );
}