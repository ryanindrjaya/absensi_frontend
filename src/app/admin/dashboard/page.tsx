'use client';

import { AdminPageTitle } from '@absensi/components/Features';
import { Flex, Row, Text } from '@absensi/components/UI';
import MainAdminLayout from '@absensi/components/Layout/MainAdminLayout';
import CardMasterData from './_parts/CardMasterData';

const AdminDashboardPage = () => {
    const MASTERDATA = [
        {
            title: 'Kelas Siswa',
            icon: 'school',
            href: '/admin/dashboard/class'
        },
        {
            title: 'Tenaga Pengajar',
            icon: 'user',
            href: '/admin/dashboard/staff'
        },
        {
            title: 'Data Siswa',
            icon: 'circle-user',
            href: '/admin/dashboard/students'
        },
        {
            title: 'Mata Pelajaran',
            icon: 'book',
            href: '/admin/dashboard/subjects'
        },
        {
            title: 'Jadwal Mata Pelajaran',
            icon: 'calendar-check',
            href: '/admin/dashboard/scheduler'
        },
    ]
    return (
        <MainAdminLayout>
            <Row className='mb-6'>
                <AdminPageTitle>
                    Master Data
                </AdminPageTitle>
                <Text as="p">Manajemen data berkaitan dengan pembelajaran</Text>
            </Row>
            <Flex className="flex-wrap gap-5">
                {
                    MASTERDATA.map((el, i) => (
                        <CardMasterData
                            key={i}
                            title={el.title}
                            icon={el.icon}
                            href={el.href}
                        />
                    ))
                }

            </Flex>
        </MainAdminLayout>
    );
};

export default AdminDashboardPage;