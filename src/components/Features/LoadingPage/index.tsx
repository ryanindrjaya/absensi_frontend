import { Dialog, DialogContent, CircularProgress } from '@mui/material'
import { Col, Row, Text } from '@absensi/components/UI';

interface LoadingPageInterface {
    loading: boolean
}

const LoadingPage = ({ loading }: LoadingPageInterface) => {
    return (
        <Dialog
            open={loading}
            fullScreen
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '0px'
                }
            }}
        >
            <DialogContent className='flex items-center justify-center h-[100vh]'>
                <Row className='flex flex-col items-center justify-center'>
                    <Col className='relative mb-[20px]'>
                        <CircularProgress color='primary' size={130} sx={{ color: '#373645' }} />
                    </Col>
                    <Col>
                        <Text className='mt-4 font-semibold text-[18px] md:text-[18px] text-[#373645]'>Please Wait</Text>
                    </Col>
                </Row>
            </DialogContent>
        </Dialog>
    )
}

export default LoadingPage;