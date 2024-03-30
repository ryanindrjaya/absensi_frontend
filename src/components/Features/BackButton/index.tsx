import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Text } from '@absensi/components/UI';

const BackButton = ({ href }: any) => {
    const router = useRouter()

    return (
        <Box>
            <Button className='flex flex-row gap-[8px]'
                variant='text'
                onClick={() => {
                    router.back()
                }}
            >
                <ArrowBackIcon style={{ color: '#E86124' }} />
                <Text className='font-bold text-[16px] leading-[24px] text-[#E86124]'>
                    Back
                </Text>
            </Button>
        </Box>
    )
};

export default BackButton;