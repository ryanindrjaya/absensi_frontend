import loadingState from '@absensi/states/loading'
import { Backdrop, CircularProgress } from '@mui/material'
import { useRecoilState } from 'recoil'

const LoadingBackdrop = () => {
    const [loader] = useRecoilState(loadingState)

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 999999 }}
            open={loader.loadingBackdrop}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}

export default LoadingBackdrop;