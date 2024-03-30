"use client";
import { AbsensiTable, AdminPageTitle, FormHeader } from '@absensi/components/Features';
import { IconCheck, IconTrashBlack } from '@absensi/components/Icons';
import MainAdminLayout from '@absensi/components/Layout/MainAdminLayout';
import { DateRangePickerLabel, Row, Text } from '@absensi/components/UI';
import { formatter } from '@absensi/utils';
import { Box, Button, ButtonGroup, Chip, IconButton, Input } from '@mui/material';
import { MRT_PaginationState } from 'material-react-table';
import React from 'react';
import { DateObject } from 'react-multi-date-picker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import adminService from '@absensi/service/admin';
import { useRouter } from 'next/router';
import { useParams, useSearchParams } from 'next/navigation';
import useLoadingBackdrop from '@absensi/hooks/useLoadingBackdrop';
import Swal from 'sweetalert2';


const columns: any[] = [
    { accessorKey: 'name', header: 'Nama Siswa', size: 120 },
    { accessorKey: 'kelas', header: 'Kelas', size: 202 },
];


const schema = yup.object({
    start_date: yup.string().required('Start Date is required'),
    end_date: yup.string().required('End Date is required'),
    file_type: yup.string().required('File Type is required'),
    date_picker: yup.string()
});

const Absensi = () => {
    const params = useParams()
    const searchParams = useSearchParams()
    const fk_lesson = searchParams.get('fk_lesson')
    const { startBackdrop, stopBackdrop } = useLoadingBackdrop()
    const [data, setData] = React.useState([])
    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });


    const [pagination, setPagination] = React.useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    React.useEffect(() => {
        getListAttendance()
    }, [])

    const getListAttendance = () => {
        adminService.getStudentByClassName(params.slug as string, fk_lesson as string).then(res => {
            const dataAttendance = res.data.results
            dataAttendance.map((attendance: any) => ({
                ...attendance,
                status: attendance.status === 'present' ? `Hadir` : attendance.status === 'permit' ? 'Izin' : 'Alfa'
            }))
            setData(res.data.results)
        }).catch(err => {
            console.error(err)
        })
    }

    const attendagePost = (status: string) => {

    }

    const onSubmit = (id: number, status: string) => {
        startBackdrop()
        const payload = {
            "user_role": "student",
            "fk_student": id,
            "fk_lesson": fk_lesson,
            "status": status
        }
        adminService.postAttendance(payload).then(() => {
            getListAttendance()
            Swal.fire({
                title: "Absensi Berhasil!",
                text: "Terima kasih sudah melakukan absensi",
                icon: "success"
            });
        }).catch((msg) => {
            Swal.fire({
                title: "Absensi Gagal",
                text: formatter.getErrorMessage(msg) === 'Belum waktunya absensi' ? 'Silahkan tunggu sampai jam mata pelajaran dimulai' : 'Jam mata pelajaran sudah lewat. Silahkan hubungi admin untuk melakukan input absensi secara manual',
                icon: "error"
            });
        }).finally(() => {
            stopBackdrop()
        })
    }
    return (
        <MainAdminLayout>
            <FormHeader
                titlePage='Absensi'
                link="/teacher/dashboard"
                linkName='absensi'
                page='Absensi Siswa'
            />
            <AbsensiTable
                columns={columns}
                data={data ?? []}
                // metaPagination={data?.meta}
                // loading={loadingSkillList}
                setPagination={setPagination}
                pagination={pagination}
                muiTableBodyRowProps={(data: any) => (
                    {
                        onClick: (event: any) => {
                        },
                        sx: {
                            cursor: 'pointer',
                        },
                    }
                )}
                renderRowActions={(row: any) => [
                    <Box key={row?.original?.id} className='flex flex-row items-center justify-center gap-[8px] w-full'>
                        {

                            <center>
                                {
                                    row?.original?.hasAttended ? (
                                        <Chip label="Berhasil Absensi" color="success" />
                                    ) : (
                                        <ButtonGroup>

                                            <Button onClick={() => onSubmit(row.original.idStudent, 'present')}>Hadir</Button>
                                            <Button onClick={() => onSubmit(row.original.idStudent, 'permit')}>Izin</Button>
                                            <Button onClick={() => onSubmit(row.original.idStudent, 'absent')}>Alfa</Button>
                                        </ButtonGroup>
                                    )
                                }


                            </center>

                        }
                    </Box>
                ]}
            />
        </MainAdminLayout>
    )
}

export default Absensi