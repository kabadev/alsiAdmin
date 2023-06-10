import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";
const UploadModal = () => {
  const [opened, setOpened] = useState(true);
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      size="55%"
      //   onClose={() => setOpened(false)}
      title="Please wait saving...."
    >
      <div className="progress_modal">
        <br />
        <br />
        <BarLoader color="#36d7b7" height={2} width="100%" />
        <br />
        <br />
      </div>
    </Modal>
  );
};

export default UploadModal;
