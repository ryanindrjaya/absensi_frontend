import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconSkillType = ({
    size = 48,
}) => (
    <CustomImage alt='Skill Type' width={size} height={size} src={'/assets/images/icons/icon-skill-type.png'} />
)

export default IconSkillType;
