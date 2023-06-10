import { useState } from "react";
export const useProgress = () => {
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);

      if (percent < 100) {
        setUploadPercentage(percent);
      }
    },
  };
  return [uploadPercentage, options];
};
