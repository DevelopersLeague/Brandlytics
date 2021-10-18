import { Redirect } from "react-router-dom";
import { useAuthStore } from "../stores";

function UnAuthGuard({ children, to }) {
  const user = useAuthStore((state) => state.user);
  if (user == null) {
    return <>{children}</>;
  } else {
    return <Redirect to={to} />;
  }
}

export default UnAuthGuard;
