import { useUserStore } from "../store/userStore";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();

    const logout = () => {
        useUserStore.getState().logout();
        navigate("/");
    };
    return (
        <div>
            <h1>Profile</h1>

            {/* user info */}
            <div>
                {" "}
                <img
                    src="/profile-default.webp"
                    alt="profile"
                    className="rounded-full h-14 w-14 object-cover aspect-square"
                />
                <div>
                    <h2>{user?.company}</h2>
                    <p>{user?.email}</p>
                </div>
            </div>

            {/* logout */}
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
