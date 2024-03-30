import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconLevel = ({
    size = 48,
}) => (
    <CustomImage alt='Level' width={size} height={size} src={'/assets/images/icons/icon-level.png'} />
)

export default IconLevel;
