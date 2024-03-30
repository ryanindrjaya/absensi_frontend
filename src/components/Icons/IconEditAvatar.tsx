import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconEditAvatar = ({
    size = 28,
}) => (
    <CustomImage alt='Edit' width={size} height={size} src={'/assets/images/icons/icon-edit-avatar.png'} />
)

export default IconEditAvatar;
