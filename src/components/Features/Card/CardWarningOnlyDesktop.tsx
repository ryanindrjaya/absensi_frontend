import { Box } from '@mui/material';
import { IconInfo } from '@absensi/components/Icons';
import { Text } from '@absensi/components/UI';

const CardWarningOnlyDesktop = ({ children }: any) => {
    return (
        <Box className='flex flex-row gap-[4px] items-center bg-[#FFF1DE] p-[12px] rounded-[8px]'>
            <IconInfo color='#E86124' />
            <Text className='font-inter text-[12px] leading-[16px]'>
                {children}
            </Text>
        </Box>
    )
};

export default CardWarningOnlyDesktop;