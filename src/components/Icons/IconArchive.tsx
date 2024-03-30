import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconArchive = ({
    size = 24,
}) => (
    <CustomImage alt='Archive' width={size} height={size} src={'/assets/images/icons/icon-archive.png'} />
)

export default IconArchive;
