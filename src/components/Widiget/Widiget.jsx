import React, { useEffect, useState } from "react";
import "./widiget.css";

import { MdOutlineHowToVote } from "react-icons/md";
import { SlUser } from "react-icons/sl";
import {
  IoPeopleOutline,
  IoCalendarClearOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
import { TfiGallery } from "react-icons/tfi";
import { SiMicrosoftteams } from "react-icons/si";
import axios from "axios";

const Widiget = () => {
  const [totalParliament, setTotalParliament] = useState(0);
  const [totalExecutive, setTotalExecutive] = useState(0);
  const [totalevent, setTotalevent] = useState(0);
  const [totalnews, setTotalnews] = useState(0);
  const [totalMember, setTotalMember] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  const getTotal = async () => {
    const res = await axios.get(`total`);
    setTotalParliament(res.data.Parliament);
    setTotalExecutive(res.data.Executive);
    setTotalevent(res.data.event);
    setTotalnews(res.data.news);
    setTotalMember(res.data.member);
    setTotalImages(res.data.Images);
  };
  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div className="widigets">
      <div className="grid_card">
        <div className="widiget">
          <div className="card_icon">
            <SiMicrosoftteams />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalParliament}</h3>
            <p className="card_title">Participants</p>
          </div>
        </div>
        <div className="widiget">
          <div className="card_icon">
            <IoPeopleOutline />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalExecutive}</h3>
            <p className="card_title">Total Executive</p>
          </div>
        </div>
        <div className="widiget">
          <div className="card_icon">
            <IoPeopleOutline />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalMember}</h3>
            <p className="card_title">Register Member</p>
          </div>
        </div>
        <div className="widiget">
          <div className="card_icon">
            <IoCalendarClearOutline />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalevent}</h3>
            <p className="card_title">event</p>
          </div>
        </div>
        <div className="widiget">
          <div className="card_icon">
            <IoNewspaperOutline />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalnews}</h3>
            <p className="card_title">News</p>
          </div>
        </div>
        <div className="widiget">
          <div className="card_icon">
            <TfiGallery />
          </div>
          <div className="card_content">
            <h3 className="card_number">{totalImages}</h3>
            <p className="card_title">Image in Gallery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widiget;
