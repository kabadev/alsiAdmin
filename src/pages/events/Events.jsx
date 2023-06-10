import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Modal, useMantineTheme } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { eventContext } from "../../context/events/context";
import { fetchEvents, deleteEvent } from "../../context/events/actions";
import { Loader } from "../../hooks/Loader";
import { toastSuccess } from "../../helper/Toast";
const Events = () => {
  const { loading, events, event, dispatch } = useContext(eventContext);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState("");
  const theme = useMantineTheme();
  useEffect(() => {
    fetchEvents(dispatch);
  }, [event]);

  const deleteItem = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const deleteItemHandle = async () => {
    await deleteEvent(dispatch, id);
    toastSuccess("Event Deleted Successfully");
  };

  useEffect(() => {
    if (!loading) {
      setdeleteModal(false);
    }
  }, [loading]);
  return (
    <div className="events">
      {loading && <Loader />}
      <Modal
        className="delteModal"
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
              onClick={deleteItemHandle}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
      <div className="add__event">
        <Navbar />
        <div className="main">
          <Sidebar />

          <div className="content">
            <div className="page__header">
              <h3>Event List</h3>

              <Link to="/events/addEvent" className="btn btn__primary">
                +Add New
              </Link>
            </div>

            <div className="content__Card">
              <div className="item__card__list">
                {events.map((event, i) => (
                  <div className="item__card" key={i}>
                    <div className="item__card__image">
                      <img src={event.img.url} alt="" />
                    </div>
                    <div className="item__card__content">
                      <h4>{event.title}</h4>
                      <div className="item__card__action__btns">
                        <Link
                          to={`/events/editEvent/${event._id}`}
                          className="action__btn"
                        >
                          <FiEdit className="icon" />
                          <span>Edit</span>
                        </Link>
                        <div
                          className="action__btn"
                          onClick={() => deleteItem(event._id)}
                        >
                          <RiDeleteBin7Line className="icon" />
                          <span>Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
