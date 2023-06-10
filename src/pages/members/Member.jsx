import "./member.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { Loader } from "../../hooks/Loader";
const Member = () => {
  const memberId = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState("");
  const theme = useMantineTheme();
  const [member, setMember] = useState("");
  const getMember = async () => {
    setLoading(true);
    try {
      const res = await axios.get("member/" + memberId);
      setMember(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMember();
  }, []);
  const deleteItem = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const deleteMember = async () => {
    try {
      setLoading(true);
      await axios.delete("member/" + id);
      setLoading(false);
      navigate("/members");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = (url, name) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name + ".png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };
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
              onClick={deleteMember}
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
              <h3>Member Detail</h3>
            </div>

            <div className="content__Card">
              {loading ? (
                <Loader />
              ) : (
                <div className="member__detail">
                  <div className="info__container">
                    <div className="member__info__details">
                      <div className="member__image">
                        <img src={member?.img?.url} alt="" />
                        <button
                          onClick={() =>
                            handleDownload(
                              member?.img?.url,
                              member?.fullName + " Photo"
                            )
                          }
                          className="btn btn__primary"
                        >
                          Download
                        </button>
                      </div>
                      <div className="info">
                        <h2>{member?.fullName}</h2>
                        <p>
                          <b>Sex:</b> {member?.sex}
                        </p>
                        <p>
                          <b>Email:</b> {member?.email}
                        </p>
                        <p>
                          <b>Mobile:</b> {member?.contact}
                        </p>
                        <h4>{member?.institute}</h4>
                        <h4>
                          <b>state:</b> {member?.state}
                        </h4>
                        <h4>
                          <b>City:</b> {member?.city}
                        </h4>
                      </div>
                    </div>
                    <div className="other__details">
                      <div className="entries">
                        <div className="key">Address:</div>
                        <div className="value">{member?.address}</div>
                      </div>
                      <div className="entries">
                        <div className="key">Degree Type:</div>
                        <div className="value">{member?.degreeType}</div>
                      </div>
                      <div className="entries">
                        <div className="key">course:</div>
                        <div className="value">{member?.course}t</div>
                      </div>
                      <div className="entries">
                        <div className="key">Duration:</div>
                        <div className="value">{member?.duration} years</div>
                      </div>
                      <div className="entries">
                        <div className="key">Start Date:</div>
                        <div className="value">{member?.startDate}</div>
                      </div>
                      <div className="entries">
                        <div className="key">End Date:</div>
                        <div className="value">{member?.endDate}</div>
                      </div>
                      <div className="entries">
                        <div className="key">Current Year:</div>
                        <div className="value">{member?.currentYear} years</div>
                      </div>
                      <div className="entries remark">
                        <div className="key">Remarks Enquiry:</div>
                        <div className="value">{member?.remarksEnquiry}</div>
                      </div>
                    </div>
                  </div>
                  <div className="images__container">
                    <div className="image_detail">
                      <div className="image">
                        <img src={member?.passport?.url} alt="" />
                      </div>
                      <h3>Passport</h3>
                      <button
                        onClick={() =>
                          handleDownload(
                            member?.passport?.url,
                            member?.fullName + "'s Passport"
                          )
                        }
                        className="btn btn__primary"
                      >
                        Download
                      </button>
                    </div>
                    <div className="image_detail">
                      <div className="image">
                        <img src={member?.efro?.url} alt="" />
                      </div>
                      <h3>Efro</h3>
                      <button className="btn btn__primary">Download</button>
                    </div>
                    <div className="image_detail">
                      <div className="image">
                        <img src={member?.admissionLetter?.url} alt="" />
                      </div>
                      <h3>Addmission Letter</h3>
                      <button
                        onClick={() =>
                          handleDownload(
                            member?.img?.url,
                            member?.fullName + "'s Admission Letter"
                          )
                        }
                        className="btn btn__primary"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="action__btn__center">
                <button
                  className="btn btn__danger"
                  onClick={() => deleteItem(member?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
