import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconEdit = ({
    size = 24,
}) => (
    <CustomImage alt='Edit' width={size} height={size} src={'/assets/images/icons/icon-edit.png'} />
)

export default IconEdit;
