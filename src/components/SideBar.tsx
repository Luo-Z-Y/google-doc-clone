import { Link } from "react-router-dom";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  async function signUserOut() {
    await signOut(auth);
    navigate("/");
  }

  return (
    <div className="sidebar">
      <div className="user">
        {user && (
          <>
            <p>Hello! {auth.currentUser?.displayName}</p>
            <img src={user?.photoURL || ""} alt=""/>
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
}
