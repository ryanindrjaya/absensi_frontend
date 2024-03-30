import { Text } from '@absensi/components/UI';
import { Box } from '@mui/material';

const AlertDanger = ({ children }: any) => {
    return (
        <Box className='rounded-[8px] border border-solid border-[#FF0000] bg-[#FFE5E5] px-[12px] py-[8px]'>
            <Text className='font-inter font-normal text-[#FF0000] text-[12px] leading-[16px]'>
                {children}
            </Text>
        </Box>
    );
};

export default AlertDanger;