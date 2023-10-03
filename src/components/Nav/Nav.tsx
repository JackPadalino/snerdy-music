import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { resetSongs } from "../../store/songsSlice";
import "./Nav.css";

const Nav = () => {
  const token = window.localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    dispatch(resetSongs());
    navigate("/");
  };

  return (
    <>
      {token && (
        <div className="navMainContainer">
          <div className="navLinksContainer">
            <Link to="/upload">Upload</Link>
            <Link to="/music">Music</Link>
          </div>
          <div className="navLogoutContainer">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
