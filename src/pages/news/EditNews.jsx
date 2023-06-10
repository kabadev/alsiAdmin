import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UploadModal from "../../components/modal/UploadModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { newsContext } from "../../context/news/context";
import { updateNews, fetchNews } from "../../context/news/actions";
import { useParams } from "react-router-dom";
import { toastSuccess } from "../../helper/Toast";
import { Loader } from "../../hooks/Loader";

const EditNews = () => {
  const id = useParams().id;
  const { loading, news, dispatch } = useContext(newsContext);
  const [sumit, setSumit] = useState(false);
  const [featureImage, setFeatureImage] = useState(null);
  const [imageInputError, setImageInputError] = useState("");

  const [title, setTitle] = useState(news.title || "");
  const [date, setDate] = useState(news?.date?.slice(0, 10) || null);
  const [text, setText] = useState(news?.desc);

  useEffect(() => {
    setTitle(news?.title || "");
    setDate(news?.date?.slice(0, 10) || null);
    setText(news?.desc);
  }, [news]);
  // get images values
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 1 * 1024 * 1024;
  const onChangeFeatureImage = (event) => {
    let file = event.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      setImageInputError("Invalid file type. Please upload an image file.");
    } else if (file.size > maxSize) {
      setImageInputError("File size exceeds the limit of 10 MB.");
    } else {
      setFeatureImage({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSumit(true);
    const formData = new FormData();
    formData.append("title", title);
    if (date) {
      formData.append("date", date);
    }
    if (date) {
      formData.append("date", date);
    }
    formData.append("desc", text);
    if (featureImage) {
      formData.append("file", featureImage.file);
    }
    await updateNews(dispatch, formData, id);
    setSumit(false);
    toastSuccess("News Updated Successfully");
  };

  useEffect(() => {
    fetchNews(dispatch, id);
  }, []);
  return (
    <div className="add__event">
      {sumit ? <UploadModal /> : ""}
      {!sumit ? loading ? <Loader /> : "" : ""}
      <ToastContainer />
      <Navbar />
      <div className="main">
        <Sidebar />

        <div className="content">
          <div className="page__header">
            <h3>Edit Event</h3>
          </div>

          <div className="content__Card">
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
                </div>
                <div className="inputs">
                  <label>Upload Feature Image</label>
                  <br />
                  <span className="input__error error">{imageInputError}</span>
                  <br />

                  <div className="feature__image">
                    {featureImage ? (
                      <img src={featureImage?.url} alt="" />
                    ) : (
                      <img src={news.img?.url} alt="" />
                    )}
                    Drag & Drop or Click to Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onChangeFeatureImage}
                    />
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
                <button className="btn btn__primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
