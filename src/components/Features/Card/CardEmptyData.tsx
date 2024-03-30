import { Box } from "@mui/system";
import { Text } from "@absensi/components/UI";
import CustomImage from "@absensi/components/UI/Media/CustomImage";
import Image from "next/image";

interface CardEmptyDataInterface {
    title: string,
    text: string
}

const CardEmptyData = ({
    title,
    text
}: CardEmptyDataInterface) => {
    return (
        <Box className='flex flex-col gap-[24px] items-center'>
            <CustomImage src={'/assets/images/not-found.png'} width={400} height={372} alt="not data available" />
            <Box className='flex flex-col gap-[12px] items-center'>
                <Text className='font-inter font-bold text-[22px] leading-[28px]'>
                    {title}
                </Text>
                <Text className='font-inter text-[14px] leading-[20px]'>
                    {text}
                </Text>
            </Box>
        </Box>
    )
};

export default CardEmptyData;