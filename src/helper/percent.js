import { useState } from "react";

const [uploadPercentage, setUploadPercentage] = useState(0);
const [progressModal, setProgressModal] = useState(false);

const options = {
  onUploadProgress: (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);

    if (percent < 100) {
      setUploadPercentage(percent);
    }
  },
};
