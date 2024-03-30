import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconMore = ({
    size = 16,
}) => (
    <CustomImage alt='Icon More' width={size} height={size} src={'/assets/images/icons/icon-more.png'} />
);

export default IconMore;