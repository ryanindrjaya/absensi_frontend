'use client';

import React from 'react';
import Image from 'next/image';
import {
    Drawer, Toolbar, IconButton, Box, Avatar
} from '@mui/material';
import {
    styled,
    useTheme
} from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AdminLeftSidebar from '../Navigation/AdminLeftSidebar';
// import CustomImage from '@absensi/components/UI/Media/CustomImage';
import { Flex, Text } from '@absensi/components/UI';
import useLoggedUser from '@absensi/hooks/useLoggedUser';
import useScreenDetector from '@absensi/hooks/useScreenDetector';
import Close from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const HeaderAdmin = ({ isOpenDrawer, setIsOpenDrawer }: any) => {
    const { getName } = useLoggedUser();
    const { isMobile, isDesktop } = useScreenDetector()

    React.useEffect(() => {
        if (isDesktop()) setIsOpenDrawer(true)
    }, [isDesktop])

    const handleDrawerToggle = () => {
        setIsOpenDrawer(!isOpenDrawer);
    };

    return (
        <>
            {isMobile() && (
                <AppBar position="fixed" className="p-[15px]">
                    <Toolbar>
                        <Flex className='text-center w-full justify-start md:justify-center gap-4'>
                            <Avatar className="capitalize" sx={{ bgcolor: '#FC8383' }}>{getName()[0]}</Avatar>
                            <Text as="h1" className='text-center text-bold text-white text-[24px] capitalize'>{getName()}</Text>
                        </Flex>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}
            <Drawer
                sx={{
                    background: '#373645',
                    width: isMobile() ? '100%' : drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile() ? '100%' : drawerWidth,
                        boxSizing: 'border-box',
                        boxShadow: 'none',
                        borderRight: 'none',
                        padding: '16px',
                        paddingTop: '0px',
                        backgroundColor: '#373645'
                    },
                }}
                variant={"persistent"}
                anchor="left"
                className='shadow-none'
                open={isOpenDrawer}
            >
                <DrawerHeader className='flex items-center !justify-between border-none h-[80px]'>
                    <Flex className='text-center w-full justify-start md:justify-center gap-4'>
                        <Avatar className="capitalize" sx={{ bgcolor: '#FC8383' }}>{getName()[0]}</Avatar>
                        <Text as="h1" className='text-center text-bold text-white text-[24px] capitalize'>{getName()}</Text>
                    </Flex>
                    {isMobile() && (
                        <Box
                            sx={{
                                // position: 'absolute',
                                // top: '10%',
                                // right: '16px',
                                // transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }}
                            onClick={() => setIsOpenDrawer(false)}
                        >
                            <Close sx={{ color: 'white' }} />
                        </Box>
                    )}
                </DrawerHeader>
                <Box className='h-[calc(100vh-180px)] justify-between flex flex-col'>
                    <AdminLeftSidebar />
                </Box>
            </Drawer>
        </>
    )
};

export default HeaderAdmin;