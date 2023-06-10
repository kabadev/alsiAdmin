import "./member.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { Loader } from "../../hooks/Loader";
const Members = () => {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState("");
  const theme = useMantineTheme();
  const [membersList, setMembersList] = useState([]);
  const getAllmembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("member");
      setMembersList(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllmembers();
  }, []);
  const deleteItem = (id) => {
    setId(id);
    setdeleteModal(true);
  };

  useEffect(() => {
    if (!loading) {
      setdeleteModal(false);
    }
  }, [loading]);
  return (
    <div className="events">
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={deleteModal}
        onClose={() => setdeleteModal(false)}
      >
        <div className="delete_modal">
          <p>Do you want to Delete this Item?</p>
          <div className="delete_buttons">
            <button
              className="btn btn-outline"
              onClick={() => setdeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn__primary"
              //   onClick={() => deleteNews(dispatch, id)}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <div className="add__event">
        <Navbar />
        <div className="main">
          <Sidebar />

          <div className="content">
            <div className="page__header">
              <h3>Event List</h3>
            </div>

            <div className="content__Card">
              <div className="member__cards">
                {loading ? (
                  <Loader />
                ) : (
                  membersList.map((member, i) => (
                    <Link
                      to={`/members/${member?._id}`}
                      className="member__card"
                      key={i}
                    >
                      <div className="member__image">
                        <img src={member.img.url} alt="" />
                      </div>
                      <div className="member__body">
                        <h3>{member.fullName}</h3>
                        <p className="college">{member.institute}</p>
                        <p className="state">{member.state}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
