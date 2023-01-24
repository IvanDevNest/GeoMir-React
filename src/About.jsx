import { useContext } from "react";
import { UserContext } from "./userContext";


export default function About() {
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
      <div>
about us
      </div>
    </>
  );
}