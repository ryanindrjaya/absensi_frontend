import { toast } from 'react-hot-toast'

const alert = {
    success(message: string) {
        toast.success(message);
    },
    failed(message: string) {
        toast.error(message);
    }
}

export default alert;