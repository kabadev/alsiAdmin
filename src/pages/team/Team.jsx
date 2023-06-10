import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { teamContext } from "../../context/team/context";
import { deleteTeam, fetchTeamList } from "../../context/team/actions";
import { Loader } from "../../hooks/Loader";
const Team = () => {
  const { loading, teamlist, team, dispatch } = useContext(teamContext);
  const [deleteModal, setdeleteModal] = useState(false);
  const [id, setId] = useState("");
  const theme = useMantineTheme();

  useEffect(() => {
    fetchTeamList(dispatch);
  }, [team]);

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
              onClick={() => deleteTeam(dispatch, id)}
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
              <h3>Our Team List</h3>

              <Link to="/team/addTeam" className="btn btn__primary">
                +Add New
              </Link>
            </div>

            <div className="content__Card">
              <h3>Parliament</h3>
              <div className="item__card__list">
                {loading
                  ? "LOADING"
                  : teamlist.map((team, i) => {
                      if (team?.teamType === "Parliament") {
                        return (
                          <div className="item__card" key={i}>
                            <div className="item__card__image">
                              <img src={team.img.url} alt="" />
                            </div>
                            <div className="item__card__content">
                              <h4>{team.fullName}</h4>
                              <p>{team.position}</p>
                              <div className="item__card__action__btns">
                                <Link
                                  to={`/team/editTeam/${team._id}`}
                                  className="action__btn"
                                >
                                  <FiEdit className="icon" />
                                  <span>Edit</span>
                                </Link>
                                <div
                                  className="action__btn"
                                  onClick={() => deleteItem(team._id)}
                                >
                                  <RiDeleteBin7Line className="icon" />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
              </div>
              <br />
              <br />
              <h3>Executive</h3>
              <div className="item__card__list">
                {loading
                  ? "LOADING"
                  : teamlist.map((team, i) => {
                      if (team?.teamType === "Executive") {
                        return (
                          <div className="item__card" key={i}>
                            <div className="item__card__image">
                              <img src={team.img.url} alt="" />
                            </div>
                            <div className="item__card__content">
                              <h4>{team.fullName}</h4>
                              <p>{team.position}</p>
                              <div className="item__card__action__btns">
                                <Link
                                  to={`/team/editTeam/${team._id}`}
                                  className="action__btn"
                                >
                                  <FiEdit className="icon" />
                                  <span>Edit</span>
                                </Link>
                                <div
                                  className="action__btn"
                                  onClick={() => deleteItem(team._id)}
                                >
                                  <RiDeleteBin7Line className="icon" />
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
