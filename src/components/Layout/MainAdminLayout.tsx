import { useTheme } from '@mui/material/styles';

import HeaderAdmin from './Header/HeaderAdmin';
import React from 'react';
import { Box } from '@mui/material';

import './styles.css';
import { useRouter } from 'next/navigation';
// import useLoggedUser from '@oasis/hooks/useLoggedUser';

import { LoadingPage } from '../Features';
import useLoggedUser from '@absensi/hooks/useLoggedUser';

const Main = ({ open, children }: any) => {
    const theme = useTheme();
    const drawerWidth = 300;

    return (
        <Box
            sx={{
                marginTop: '20px',
                minHeight: 'calc(100vh - 80px)',
                flexGrow: 1,
                padding: theme.spacing(3),
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                ...(open && {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: `${drawerWidth}px`,
                })
            }}
        >
            {children}
        </Box>
    )
};

const MainAdminLayout = ({ children, containerClassName = '', openSideMenu = true }: any) => {
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(openSideMenu);

    const router = useRouter();

    const { isLogged } = useLoggedUser();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const runUserVerification = async () => {
            setLoading(true);
            verifyUser().then(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500)

            }).catch(() => {

            });
        };

        runUserVerification();
    }, []);

    const verifyUser = () => {
        return new Promise((resolve, reject) => {
            if (!isLogged()) {
                router.push('/');
            }

            resolve(true);
        });
    };

    return (
        <>
            {
                loading ? <LoadingPage loading={loading} /> : (
                    <>
                        <HeaderAdmin
                            isOpenDrawer={isOpenDrawer}
                            setIsOpenDrawer={setIsOpenDrawer}
                        />
                        <Main open={isOpenDrawer}>
                            <Box className={`flex flex-col mt-12 md:ml-4 md:mt-2 ${containerClassName}`}>
                                {children}
                            </Box>
                        </Main>
                    </>
                )
            }
        </>
    )
};

export default MainAdminLayout;