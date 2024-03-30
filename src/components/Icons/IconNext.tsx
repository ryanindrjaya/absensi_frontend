import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconNext = ({
    size = 20,
}) => (
    <CustomImage alt='Icon Right' width={size} height={size} src={'/assets/images/icons/icon-right.png'} />
)

export default IconNext;
