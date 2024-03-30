import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import './styles.css';
import CustomImage from '../UI/Media/CustomImage';

const BlankLayoutAdmin = ({ children }: any) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
};

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' className='bg-white shadow-md h-[80px]'>
                <Toolbar className='h-[80px]'>
                    <Link href={'/dashboard'}>
                        <IconButton
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                        >
                            <CustomImage src='/assets/images/logo-orange.png' alt='absensi Admin' height={40} width={99} />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
};

export default BlankLayoutAdmin;