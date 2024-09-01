import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function UsersListComponent({ colb }) {
  const allUsers = useSelector((state) => {
    return state.allUsers;
  });
  const user = useSelector((state) => {
    return state.user;
  });
  const navigate = useNavigate();

  return (
    <div className="">
      {/* <h1>This is users lis component</h1> */}
      <div className="flex flex-col gap-2">
        {allUsers.allUsers.length &&
          allUsers.allUsers.map((cur) => {
            if (cur._id !== user.user.id) {
              // console.log(cur);
              return (
                <div
                  className="flex flex-row items-center gap-2 bg-slate-100 hover:scale-105 hover:cursor-pointer "
                  onClick={() => colb(cur._id)}
                  key={cur._id}
                >
                  <div
                    className={
                      cur.isOnline ? "avatar online" : "avatar  offline"
                    }
                  >
                    <div className="w-12 rounded-full">
                      <img src={cur.photo} />
                    </div>
                  </div>
                  <span>{cur.name}</span>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default UsersListComponent;
