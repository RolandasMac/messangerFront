import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const WithLoginComponent = ({ children, ...props }) => {
  const location = useLocation();
  const user = useSelector((state) => {
    return state.user.user;
  });

  if (!user.isOnline) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return children;
};
export default WithLoginComponent;
