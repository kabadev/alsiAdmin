import { useContext, useEffect, useState } from "react";
import "./settings.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UploadModal from "../../components/modal/UploadModal";

import { IoCloseCircle } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { eventContext } from "../../context/events/context";
import { addEvent } from "../../context/events/actions";
import { toastSuccess, toastError } from "../../helper/Toast";
const Settings = () => {
  const { loading, dispatch } = useContext(eventContext);

  const [filelist, setFilelist] = useState([]);
  const [featureImage, setFeatureImage] = useState(null);
  const [imageInputError, ImageInputError] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("desc", text);
    formData.append("featureImage", featureImage.file);

    if (filelist.length !== 0) {
      filelist.map((img) => {
        formData.append("files", img.file);
        return {
          file: img.file,
        };
      });
    }
    await addEvent(dispatch, formData);
    setTitle("");
    setDate("");
    setText("");
    setFeatureImage(null);
    setFilelist([]);
    toastSuccess("Event Added Successfully");
  };

  return (
    <div className="add__event">
      {loading && <UploadModal />}

      <ToastContainer />
      <Navbar />
      <div className="main">
        <Sidebar />

        <div className="content">
          <div className="page__header">
            <h3>Settings</h3>
          </div>

          <div className="content__Card">
            <div className="updateImages">
              <div className="part1">
                <div className="image__section__title banner">
                  <h3>Banner Image</h3>
                  <div className="image">
                    <FiEdit className="image__edit__icon" />
                    <img
                      src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                      alt=""
                    />
                    <input type="file" className="image__input" />
                  </div>
                </div>

                <div className="image__section__title">
                  <h3>About Image</h3>
                  <div className="images">
                    <div className="image">
                      <div className="edit__tab">
                        <h4>Landscape Image *</h4>
                        <FiEdit className="image__edit__icon" />
                      </div>

                      <img
                        src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                        alt=""
                      />
                      <input type="file" className="image__input" />
                    </div>
                    <div className="image">
                      <div className="edit__tab">
                        <h4>Porttrait Image *</h4>
                        <FiEdit className="image__edit__icon" />
                      </div>
                      <img
                        src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                        alt=""
                      />
                      <input type="file" className="image__input" />
                    </div>
                  </div>
                </div>
                <div className="image__section__title">
                  <h3>Services Images</h3>
                  <div className="images">
                    <div className="image">
                      <div className="edit__tab">
                        <h4>Square* or Landscape or Porttrait Image *</h4>

                        <FiEdit className="image__edit__icon" />
                      </div>

                      <img
                        src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                        alt=""
                      />
                      <input type="file" className="image__input" />
                    </div>
                    <div className="image">
                      <div className="edit__tab">
                        <h4>Square* or Landscape or Porttrait Image *</h4>

                        <FiEdit className="image__edit__icon" />
                      </div>
                      <img
                        src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                        alt=""
                      />
                      <input type="file" className="image__input" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="part2">
                <div className="image__section__title">
                  <h3>Memebership Image</h3>
                  <div className="images">
                    <div className="image">
                      <div className="edit__tab">
                        <h4>Square* or Landscape or Porttrait Image *</h4>

                        <FiEdit className="image__edit__icon" />
                      </div>
                      <img
                        src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                        alt=""
                      />
                      <input type="file" className="image__input" />
                    </div>
                  </div>
                </div>
                <div className="image__section__title">
                  <h3>FAQs Image</h3>
                  <div className="images">
                    <div className="image">
                      <div className="edit__tab">
                        <h4>Porttrait Image *</h4>

                        <FiEdit className="image__edit__icon" />
                      </div>
                      <img
                        src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                        alt=""
                      />
                      <input type="file" className="image__input" />
                    </div>
                    <div className="image">
                      <div className="edit__tab">
                        <h4>Square* or Landscape or Porttrait Image *</h4>

                        <FiEdit className="image__edit__icon" />
                      </div>
                      <img
                        src="https://amnaapp.netlify.app/static/media/login.67828ed38aba38bd5f15.png"
                        alt=""
                      />
                      <input type="file" className="image__input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
