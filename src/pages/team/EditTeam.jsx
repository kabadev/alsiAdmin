import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UploadModal from "../../components/modal/UploadModal";
import { teamContext } from "../../context/team/context";
import { useParams } from "react-router-dom";
import { fetchTeam, updateTeam } from "../../context/team/actions";

const EditTeam = () => {
  const id = useParams().id;
  const { loading, team, dispatch } = useContext(teamContext);
  const [imageInputError, setImageInputError] = useState("");
  const [fullName, setFullName] = useState(team?.fullName || "");
  const [position, setPosition] = useState("");
  const [type, setType] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    setFullName(team?.fullName);
    setPosition(team?.position);
    setType(team?.teamType);
    setFacebook(team?.facebook);
    setInstagram(team?.instagram);
    setLinkedin(team?.linkedin);
    setTwitter(team?.twitter);
    setImg(null);
  }, [team]);
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
      setImg({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("position", position);
    formData.append("type", type);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedin);
    formData.append("twitter", twitter);

    if (img) {
      formData.append("file", img.file);
    }
    updateTeam(dispatch, formData, id);
  };

  useEffect(() => {
    fetchTeam(dispatch, id);
  }, []);
  return (
    <div className="add__event">
      {loading && <UploadModal />}
      <Navbar />
      <div className="main">
        <Sidebar />

        <div className="content">
          <div className="page__header">
            <h3>Edit Team Memeber</h3>
          </div>

          <div className="content__Card">
            <form className="form__card" onSubmit={handleSubmit}>
              <div className="form__header">
                <p className="form__title">Edit Team Memeber Form</p>
              </div>
              <div className="inputs__container">
                <div className="inputs">
                  <div className="input">
                    <label htmlFor=""> Full Name:</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="">Position:</label>
                    <input
                      type="text"
                      placeholder="Position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="">Type:</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Executive">Executive</option>
                      <option value="Parliament">Parliament</option>
                    </select>
                  </div>
                  <div className="input">
                    <label htmlFor="">Facebook:</label>
                    <input
                      type="text"
                      placeholder="Facebook"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="">Instagram:</label>
                    <input
                      type="text"
                      placeholder="Instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </div>
                </div>
                <div className="inputs">
                  <div className="input">
                    <label htmlFor="">LinkedIn:</label>
                    <input
                      type="text"
                      placeholder="LinkedIn"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>

                  <label>Upload Picture</label>
                  <div className="feature__image">
                    {img ? (
                      <img src={img?.url} alt="" />
                    ) : (
                      <img src={team?.img?.url} alt="" />
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
              <div className="action__btn__center">
                {loading ? "Loading..." : ""}
                <button className="btn btn__primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;
