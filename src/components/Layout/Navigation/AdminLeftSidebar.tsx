import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { adminSidebarNavigation, teacherSidebarNavigation } from '@absensi/config/navigation';
// import { useLoggedUser } from '@absensi/hooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { AbsensiIcon } from '@absensi/components/Icons';
import useLoggedUser from '@absensi/hooks/useLoggedUser';

const AdminLeftSidebar = () => {
    const router = useRouter();
    const location = usePathname();
    const { getAuthorize, isLogged } = useLoggedUser();

    const [open, setOpen] = React.useState<any>();
    const [roleId, setRoleId] = React.useState<any>(null);
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        // const role = parseInt(getRoleId());
        setRoleId('1');
        setIsAdmin(getAuthorize() === 'admin');

    }, []);

    const toogleSubMenu = (menuId: any) => {
        setOpen({
            ...open,
            [menuId]: !open?.[menuId]
        });
    };

    const renderSingleItem = (val: any) => {
        // const allowedRoleId = val?.allowed_role_id ?? [];
        // if (!allowedRoleId.includes(roleId)) {
        //     return false;
        // }

        const isOpen = location.match((val?.id ?? '-').toLowerCase())?.[0] ? true : false;
        return (
            <Link href={val.href} key={val.id}>
                <ListItemButton className={`rounded-xl max-w-[183px] mb-2 ${isOpen ? 'bg-white' : ''} `} key={val.id}>
                    <ListItemIcon sx={{ minWidth: '36px !important' }}>
                        {/* <AbsensiIcon name={val.icon as any} size={20} color={isOpen ? 'black' : 'white'} /> */}
                    </ListItemIcon>
                    <TextMenu isActive={isOpen} className={`${isOpen ? 'text-black' : 'text-white'}`}>
                        {val.text}
                    </TextMenu>
                </ListItemButton>
            </Link>
        );
    };


    const renderNav = isAdmin ? adminSidebarNavigation : teacherSidebarNavigation
    return (
        <Box className="grid grid-rows-2 min-h-[100%]">
            <List className='mt-[90px] mx-auto'>
                {renderNav.map((val) => renderSingleItem(val))}
            </List>
            <Box className="text-center md:text-center self-end text-[#FC8383] w-full ">
                <Button onClick={() => {
                    localStorage.clear()
                    router.push('/')
                }} variant="text" className="text-[#FC8383] text-[18px]" startIcon={<LogoutIcon sx={{ fontSize: 20 }} />}>
                    Keluar
                </Button>
            </Box>
        </Box >
    );
};

const TextMenu = ({ children, className = '', isActive = false }: any) => {
    return (
        <ListItemText>
            <span className={`font-bold text-[16px] leading-[24px] ${className} ${isActive ? 'text-[#E86124]' : 'text-[#121212]'}`}>{children}</span>
        </ListItemText>
    );
};

export default AdminLeftSidebar;