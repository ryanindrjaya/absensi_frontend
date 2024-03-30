interface AdminSidebarNavigationInterface {
    id: string,
    text: string,
    href: string,
    icon: string,
    isOpen: boolean,
    child: AdminSidebarNavigationInterface[],
    allowed_role_id?: number[],
}

export const adminSidebarNavigation: AdminSidebarNavigationInterface[] = [
    {
        'id': 'dashboard',
        'text': 'Master',
        "icon": "layout-dashboard",
        'href': '/admin/dashboard',
        'isOpen': false,
        'child': [],
        'allowed_role_id': [1, 2],
    },
    {
        'id': 'absensi',
        'text': 'Absensi',
        "icon": "arrow-right-square",
        'isOpen': false,
        'href': '/admin/absensi',
        'child': [],
        'allowed_role_id': [1],
    },
    {
        'id': 'laporan',
        'text': 'Laporan',
        "icon": "file-text",
        'isOpen': false,
        'href': '/admin/laporan',
        'child': [],
        'allowed_role_id': [1],
    },
]

export const teacherSidebarNavigation: AdminSidebarNavigationInterface[] = [
    {
        'id': 'dashboard',
        'text': 'Dashboard',
        "icon": "layout-dashboard",
        'href': '/teacher/dashboard',
        'isOpen': false,
        'child': [],
        'allowed_role_id': [1, 2],
    },
    {
        'id': 'absensi',
        'text': 'Absensi',
        "icon": "arrow-right-square",
        'href': '/teacher/absensi',
        'isOpen': false,
        'child': [],
        'allowed_role_id': [1, 2],
    },
    {
        'id': 'schedule',
        'text': 'Lihat Jadwal',
        "icon": "schedule",
        'isOpen': false,
        'href': '/teacher/schedule',
        'child': [],
        'allowed_role_id': [1],
    },
]