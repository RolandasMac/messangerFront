import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../reducers/authSlice.js";
import defaultProfilePic from "../images/profile.png";
import { useNavigate } from "react-router";

function Header({ socket }) {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    socket.emit("userdisconected", user);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(deleteUser());
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user"
                  src={user.photo ? user.photo : defaultProfilePic}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
