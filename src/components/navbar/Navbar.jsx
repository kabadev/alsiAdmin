import "./navbar.css";
import axios from "axios";
import { IoMenuOutline, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { ThemeContext } from "../../context/ThemeContext";
import { Modal, useMantineTheme } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Logo from "../../images/logo.jpg";
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useMantineTheme();
  const { setMode, mode } = useContext(ThemeContext);
  const { setSidebarOpen } = useContext(AppContext);
  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "true"
  );
  const themeTogggleHandler = () => {
    setChecked((prevChecked) => !prevChecked);
    localStorage.setItem("theme", !checked);
  };
  useEffect(() => {
    setMode(localStorage.getItem("theme"));
  }, [checked]);

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put("/users/updatePassword/" + user._id, {
        password,
      });
      if (response.status === 200) {
        setLoading(false);
        setOpened(false);
        setPassword("");
      } else {
        setError("something went wrong! Please try again");
        setLoading(false);
      }
    } catch (err) {
      setError("something went wrong");
      setLoading(false);
    }
  };
  return (
    <div className="navbar">
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        size="30%"
        onClose={() => setOpened(false)}
        title="Update Password"
      >
        <div className="update_user">
          <p className="error">{error && error}</p>
          <form onSubmit={updatePassword}>
            <div className="form-group">
              <div className="input">
                <input
                  type="text"
                  placeholder="Update Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="action__btn__center">
              <button className="btn btn__primary">
                {loading ? "Updating....." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="nav__right">
        <div className="toggle__btn" onClick={() => setSidebarOpen(true)}>
          <IoMenuOutline className="toggle__icon" />
        </div>
        <div className="brand">
          <img src={Logo} alt="" />
          <h2>ALSI</h2>
        </div>
      </div>
      <div className="nav__left">
        <div className="toggle_switch" onClick={themeTogggleHandler}>
          <span className="switch">
            {checked ? (
              <IoMoonOutline className="moon" />
            ) : (
              <IoSunnyOutline className="sun" />
            )}
          </span>
          <IoMoonOutline className="moon" />
          <IoSunnyOutline className="sun" />
        </div>
        <div className="user__panel" onClick={() => setOpened(true)}>
          <img src={Logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
