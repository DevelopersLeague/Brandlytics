import React from "react";
import { useAuthStore } from "../stores";
import { Button } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { useHistory, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Home() {
  const query = useQuery();
  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);
  const history = useHistory();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <div>
      hello {user.firstname} {query.get("search")}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Home;
