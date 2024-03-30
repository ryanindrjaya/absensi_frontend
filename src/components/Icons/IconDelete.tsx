import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconDelete = ({
    size = 24,
}) => (
    <CustomImage alt='Delete' width={size} height={size} src={'/assets/images/icons/icon-delete.png'} />
)

export default IconDelete;
