import {
  IoGridOutline,
  IoCalendarClearOutline,
  IoNewspaperOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { SiMicrosoftteams } from "react-icons/si";
import { TfiGallery } from "react-icons/tfi";

// sidebar links
export const links = [
  {
    link: "/",
    name: "Dashboard",
    icon: <IoGridOutline />,
  },
  {
    link: "/members",
    name: "Members",
    icon: <IoPeopleOutline />,
  },
  {
    link: "/team",
    name: "Team",
    icon: <SiMicrosoftteams />,
  },
  {
    link: "/events",
    name: "Events",
    icon: <IoCalendarClearOutline />,
  },
  {
    link: "/news",
    name: "News",
    icon: <IoNewspaperOutline />,
  },
  {
    link: "/gallery",
    name: "Gallery",
    icon: <TfiGallery />,
  },
  // {
  //   link: "/users",
  //   name: "Users",
  //   icon: <IoPeopleOutline />,
  // },
  {
    link: "/setting",
    name: "Setting",
    icon: <IoSettingsOutline />,
  },
];
