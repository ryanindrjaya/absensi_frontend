import Image from "next/image";
import CustomImage from "../UI/Media/CustomImage";

const IconQuestionType = ({
    size = 48,
}) => (
    <CustomImage alt='Question Type' width={size} height={size} src={'/assets/images/icons/icon-question-type.png'} />
)

export default IconQuestionType;
