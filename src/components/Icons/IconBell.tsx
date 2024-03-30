import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconBell = ({
    size = 30,
}) => (
    <CustomImage alt='Notification' width={size} height={size} src={'/assets/images/icons/icon-bells.png'} />
)

export default IconBell;
