import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconTrash = ({
    size = 24,
}) => (
    <CustomImage alt='Delete' width={size} height={size} src={'/assets/images/icons/icon-trash.png'} />
)

export default IconTrash;
