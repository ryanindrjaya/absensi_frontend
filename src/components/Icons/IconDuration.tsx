import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconDuration = ({
    size = 48,
}) => (
    <CustomImage alt='Duration' width={size} height={size} src={'/assets/images/icons/icon-duration.png'} />
)

export default IconDuration;
