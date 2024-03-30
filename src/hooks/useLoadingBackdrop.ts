import loadingState from '@absensi/states/loading';
import { useRecoilState } from 'recoil';

const useLoadingBackdrop = () => {
    const [loading, setLoading] = useRecoilState(loadingState);

    const startBackdrop = () => setLoading({ ...loading, loadingBackdrop: true });
    const stopBackdrop = () => setLoading({ ...loading, loadingBackdrop: false });

    return { startBackdrop, stopBackdrop };
};

export default useLoadingBackdrop;
