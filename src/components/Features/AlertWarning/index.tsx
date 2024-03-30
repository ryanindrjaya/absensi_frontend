import { Box } from '@mui/material';
import { Text } from '@absensi/components/UI';

const AlertWarning = ({ children }: any) => {
    return (
        <Box className='rounded-[8px] border border-solid border-[#E86124] bg-[#FFF1DE] px-[12px] py-[8px]'>
            <Text className='font-inter font-normal text-[12px] leading-[16px]'>
                {children}
            </Text>
        </Box>
    );
};

export default AlertWarning;