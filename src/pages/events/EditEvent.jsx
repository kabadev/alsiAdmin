import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UploadModal from "../../components/modal/UploadModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoCloseCircle } from "react-icons/io5";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { eventContext } from "../../context/events/context";
import {
  deleteEventImage,
  fetchEvent,
  updateEvent,
} from "../../context/events/actions";
import { useParams } from "react-router-dom";
import { Loader } from "../../hooks/Loader";
import { toastSuccess } from "../../helper/Toast";

const EditEvent = () => {
  const id = useParams().id;
  const { loading, event, dispatch } = useContext(eventContext);
  const [sumit, setSumit] = useState(false);
  const [filelist, setFilelist] = useState([]);
  const [featureImage, setFeatureImage] = useState(null);
  const [imageInputError, ImageInputError] = useState("");

  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date?.slice(0, 10) || null);
  const [text, setText] = useState(event?.desc);

  useEffect(() => {
    setTitle(event?.title || "");
    setDate(event?.date?.slice(0, 10) || null);
    setText(event?.desc);
  }, [event]);
  // get images values
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 1 * 1024 * 1024;
  const onChangeFeatureImage = (event) => {
    let file = event.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      ImageInputError("Invalid file type. Please upload an image file.");
    } else if (file.size > maxSize) {
      ImageInputError("File size exceeds the limit of 10 MB.");
    } else {
      setFeatureImage({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };
  const onChangeImageInput = (event) => {
    let file = event.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      ImageInputError("Invalid file type. Please upload an image file.");
    } else if (file.size > maxSize) {
      ImageInputError("File size exceeds the limit of 10 MB.");
    } else {
      const newFile = {
        name: file.name,
        file: file,
        id: filelist.length + 1,
        url: URL.createObjectURL(file),
      };
      setFilelist([...filelist, newFile]);
    }
  };
  // delete image items
  const deleteImage = (id) => {
    const newfilelist = filelist.filter((item) => item.id !== id);
    setFilelist(newfilelist);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSumit(true);
    const formData = new FormData();
    formData.append("title", title);
    if (date) {
      formData.append("date", date);
    }

    formData.append("desc", text);
    if (featureImage) {
      formData.append("featureImage", featureImage.file);
    }

    if (filelist.length !== 0) {
      filelist.map((img) => {
        formData.append("files", img.file);
        return {
          file: img.file,
        };
      });
    }
    await updateEvent(dispatch, formData, id);
    setFilelist([]);
    setSumit(false);
    toastSuccess("Event Updated  Successfully");
  };

  useEffect(() => {
    fetchEvent(dispatch, id);
  }, []);
  return (
    <div className="add__event">
      {loading && sumit && <UploadModal />}
      <ToastContainer />
      <Navbar />
      <div className="main">
        <Sidebar />

        <div className="content">
          <div className="page__header">
            <h3>Edit Event</h3>
          </div>

          <div className="content__Card">
            {loading ? (
              <Loader />
            ) : (
              <form className="form__card" onSubmit={handleSubmit}>
                <div className="form__header">
                  <p className="form__title">Edit Event Form</p>
                </div>
                <div className="inputs__container">
                  <div className="inputs">
                    <div className="input">
                      <label htmlFor="">Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="input">
                      <label htmlFor="">Event Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="inputs">
                    <label>Upload Feature Image</label>

                    <div className="feature__image">
                      {featureImage ? (
                        <img src={featureImage?.url} alt="" />
                      ) : (
                        <img src={event.img?.url} alt="" />
                      )}
                      Drag & Drop or Click to Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onChangeFeatureImage}
                      />
                    </div>

                    <div className="other_images">
                      <label>Add Images</label>
                      <span className="input_error error">
                        {imageInputError}
                      </span>
                      <div className="items__images">
                        {event?.images?.map((img, i) => (
                          <div className="image" key={i}>
                            <div
                              className="image__delete__btn"
                              onClick={() =>
                                deleteEventImage(dispatch, id, img.id.slice(5))
                              }
                            >
                              <IoCloseCircle />
                            </div>
                            <img src={img.url} alt="" />
                          </div>
                        ))}
                        {filelist.map((img, i) => (
                          <div className="image" key={i}>
                            <div
                              className="image__delete__btn"
                              onClick={() => deleteImage(img._id)}
                            >
                              <IoCloseCircle />
                            </div>
                            <img src={img.url} alt="" />
                          </div>
                        ))}

                        <div className="add__image__btn">
                          <button className="btn btn__primary">
                            +Add
                            <input
                              type="file"
                              accept="image/*"
                              onChange={onChangeImageInput}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ckeditor__container">
                  <CKEditor
                    className="editor"
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setText(data);
                    }}
                  />
                </div>
                <div className="action__btn__center">
                  {loading ? "Loading..." : ""}
                  <button className="btn btn__primary">Submit</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
