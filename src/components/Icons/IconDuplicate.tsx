import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconDuplicate = ({
    size = 24,
}) => (
    <CustomImage alt='Duplicate' width={size} height={size} src={'/assets/images/icons/icon-duplicate.png'} />
)

export default IconDuplicate;
