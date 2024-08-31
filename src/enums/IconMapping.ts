import greenCircleIcon from "../assets/icons/green-circle.png";
import userIcon from "../assets/icons/user-icon.png";
import userImage from "../assets/icons/user-image.png";
import { IconTypes } from "./IconTypes"; // IconTypes enum'ını içe aktarın

export const IconMapping = {
  [IconTypes.GreenCircle]: { src: greenCircleIcon, width: 8, height: 8 },
  [IconTypes.UserIcon]: { src: userIcon, width: 13, height: 15 },
  [IconTypes.UserImage]: { src: userImage, width: 24, height: 24 },
};
