//
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { newsContext } from "../../context/news/context";
import { deleteNews, fetchNewsList } from "../../context/news/actions";
import { Loader } from "../../hooks/Loader";
import Widiget from "../../components/Widiget/Widiget";
const Home = () => {
  const { loading, newslist, news, dispatch } = useContext(newsContext);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState("");
  const theme = useMantineTheme();

  useEffect(() => {
    fetchNewsList(dispatch);
  }, [news]);

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
    <div className="home">
      {loading ? <Loader /> : ""}
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
              onClick={() => deleteNews(dispatch, id)}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <div className="home__page">
        <Navbar />
        <div className="main">
          <Sidebar />
          <div className="content">
            <div className="page__header">
              <h3>Welcome TO ALSI</h3>
            </div>
            <div className="content__Card">
              <Widiget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
