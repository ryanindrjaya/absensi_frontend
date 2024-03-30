import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconExport = ({
    size = 48,
}) => (
    <CustomImage alt='Export' width={size} height={size} src={'/assets/images/icons/icon-export.png'} />
)

export default IconExport;
