import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/authSlice.js";
import defaultProfilePic from "../images/profile.png";
import { useNavigate } from "react-router";

function Header({ socket }) {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    fetch("/logout", {
      method: "POST",
      credentials: "include", // Make sure to include credentials for cookie-based sessions
    }).then((response) => {
      // Handle response
    });
    socket.emit("userdisconected", user);
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    dispatch(logoutUser());
  }
  return (
    <div className="mb-5">
      <div className="navbar bg-gray-200 rounded">
        <h1 className="flex-1">Rolando susirašinėjimų erdvė</h1>
        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}
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
                {user.isOnline && (
                  <a
                    className="justify-between"
                    onClick={() => navigate("/profile")}
                  >
                    Profilis
                  </a>
                )}
                {/* <span className="badge">New</span> */}
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate("/sendemail");
                  }}
                >
                  Registruotis
                </a>
              </li>
              <li>
                {user.isOnline ? (
                  <a onClick={logout}>Atsijungti</a>
                ) : (
                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Prisijungti
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
