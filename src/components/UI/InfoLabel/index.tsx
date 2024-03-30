import { UIDefaultInterface, Col, Text } from "..";

interface InfoLabelInterface extends UIDefaultInterface {
    classTitleName?: string
    classBodyName?: string
}

const InfoLabel = ({
    title,
    children,
    classTitleName = "",
    classBodyName = "text-[14px] md:text-[16px]"
}: InfoLabelInterface) => {
    return (
        <Col>
            <Text className={`font-semibold text-[12px] md:text-[14px] mb-2 ${classTitleName}`}>{title}</Text>
            <Text className={`${classBodyName} break-all`}>
                {children}
            </Text>
        </Col>
    )
}

export default InfoLabel;