import { Toaster } from 'react-hot-toast';

const ToasterPopUp = () => {
    return (
        <div>
            <Toaster
                position='top-center'
                reverseOrder={false}
                gutter={8}
                containerStyle={{
                    zIndex: 99999
                }}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        zIndex: 99999,
                        maxWidth: '90%'
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: '#EAFFEA',
                            color: '#121212',
                            borderRadius: '15px',
                            border: '1px solid #009700',
                            fontSize: '14px',
                            fontWeight: '400',
                            fontFamily: 'var(--font-inter)'
                        }
                    },
                    error: {
                        duration: 3000,
                        style: {
                            background: '#FFF1DE',
                            color: '#121212',
                            borderRadius: '15px',
                            border: '1px solid #FF0000',
                            fontSize: '14px',
                            fontWeight: '400',
                            fontFamily: 'var(--font-inter)'
                        }
                    },
                }}
            />
        </div>
    )
}

export default ToasterPopUp;