import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./gallery.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete } from "react-icons/ai";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal, useMantineTheme } from "@mantine/core";
import UploadModal from "../../components/modal/UploadModal";
import { Loader } from "../../hooks/Loader";
const Gallery = () => {
  // const { loading, events, dispatch } = useContext(eventContext);
  const [sumit, setSumit] = useState(false);
  const [images, setImages] = useState([]);
  const [imageInputError, setImageInputError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState("");
  const theme = useMantineTheme();

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 10 * 1024 * 1024;

  const onChangeImage = async (event) => {
    let files = event.target.files;
    let errors = [];
    let validFiles = [];

    Object.entries(files).forEach((file) => {
      if (!allowedTypes.includes(file[1].type)) {
        errors.push(
          `${file[1].name} Invalid file type. Please upload valid image file.`
        );
      } else if (file[1].size > maxSize) {
        errors.push(`${file[1].name} File size exceeds the limit of 10 MB.`);
      } else {
        validFiles.push(file[1]);
      }
    });

    if (errors.length > 0) {
      setImageInputError(errors);
    } else {
      await addNewImage(validFiles);
    }
  };

  const addNewImage = async (files) => {
    setSumit(true);
    const formData = new FormData();
    if (files.length !== 0) {
      files.map((img) => {
        formData.append("files", img);
        return {
          file: img,
        };
      });
    }
    try {
      setLoading(true);
      await axios.post("gallery", formData);
      getAllImages();
      setSumit(false);
    } catch (error) {
      console.log("something went wrong please try again");
      setSumit(false);
    }
  };

  const getAllImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("gallery");
      setImages(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setImageInputError([
        ...imageInputError,
        "Something went wrong please try again",
      ]);
    }
  };
  useEffect(() => {
    getAllImages();
  }, []);

  const getImageIdTodelete = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const deleteImage = async () => {
    try {
      setLoading(true);
      const res = await axios.delete("gallery/" + id);
      // setImages(res.data.data);
      getAllImages();
      setLoading(false);
      setdeleteModal(false);
    } catch (error) {
      setLoading(false);
      setImageInputError([
        ...imageInputError,
        "Something went wrong please reload the browser or try again Later",
      ]);
      setdeleteModal(false);
    }
  };

  return (
    <div className="events">
      <ToastContainer />
      {sumit && <UploadModal />}
      {loading && <Loader />}
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
          <p>Do you want to Delete this Image?</p>
          <div className="delete_buttons">
            <button
              className="btn btn-outline"
              onClick={() => setdeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn__primary"
              onClick={deleteImage}
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
              <div className="btn btn__primary add__image__btn">
                + Add New Images
                <input
                  type="file"
                  name="files"
                  onChange={onChangeImage}
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
            {imageInputError?.length !== 0 &&
              imageInputError?.map((error, i) => {
                return (
                  <p key={i} className="error">
                    {error}
                  </p>
                );
              })}

            <div className="content__Card">
              {images.length !== 0 ? (
                <div className="item__card__list">
                  {loading
                    ? "LOADING...."
                    : images?.map((img, i) => (
                        <div className="image" key={i}>
                          <img src={img?.img.url} alt="" />
                          <div
                            className="delete__icon"
                            onClick={() => getImageIdTodelete(img._id)}
                          >
                            <AiOutlineDelete />
                          </div>
                        </div>
                      ))}
                </div>
              ) : (
                <div className="no__record">
                  <h3>No record found</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
