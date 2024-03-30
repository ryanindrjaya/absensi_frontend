"use client";
import { AbsensiTable, AdminPageTitle } from '@absensi/components/Features';
import { IconCheck, IconTrashBlack } from '@absensi/components/Icons';
import MainAdminLayout from '@absensi/components/Layout/MainAdminLayout';
import { DateRangePickerLabel, Row, Text } from '@absensi/components/UI';
import { formatter } from '@absensi/utils';
import { Box, Button, IconButton, Input } from '@mui/material';
import { MRT_PaginationState } from 'material-react-table';
import React from 'react';
import { DateObject } from 'react-multi-date-picker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import adminService from '@absensi/service/admin';


const columns: any[] = [
    { accessorKey: 'name', header: 'Nama Siswa', size: 120 },
    { accessorKey: 'status', header: 'Keterangan', size: 202 },
    { accessorKey: 'date', header: 'Waktu', size: 202 },
];


const schema = yup.object({
    start_date: yup.string().required('Start Date is required'),
    end_date: yup.string().required('End Date is required'),
    file_type: yup.string().required('File Type is required'),
    date_picker: yup.string()
});

const Absensi = () => {
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
        adminService.getAttendance().then(res => {
            setData(res.data.results)
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <MainAdminLayout>
            <Row className='mb-6'>
                <AdminPageTitle>
                    Absensi
                </AdminPageTitle>
                <Text as="p">Absensi</Text>
            </Row>
            <FormProvider {...methods}>
                <form className='flex flex-col gap-[16px] mb-8'>
                    <Box className="w-[200px]">
                        <DateRangePickerLabel
                            name='date_picker'
                            placeholder='Start Date - End Date'
                            maxDate={new DateObject().add(0, "days")}
                            onChange={async (val: any) => {
                                // methods.setValue('start_date', val.startDate);
                                // methods.setValue('end_date', val.endDate);

                                // methods.trigger('start_date', { shouldFocus: true });
                                // methods.trigger('end_date', { shouldFocus: true });
                            }}
                        />
                    </Box>
                    <Box className="flex justify-between w-full flex-end mb-10">
                        <Input className="w-[70%]" placeholder='Ketikan Nama Pengajar / Nama Mata Pelajaran' />
                        <Button onClick={() => { }} className="w-[157px]">Download Excel</Button>
                    </Box>
                </form>
            </FormProvider>
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
            // renderRowActions={(row: any) => [
            //     <Box key={row?.original?.id} className='flex flex-row items-center justify-center gap-[8px] w-[100px]'>
            //         {

            //             <>
            //                 <IconButton
            //                     onClick={() => {
            //                         // handleDelete(row.original)
            //                     }}
            //                 >
            //                     <IconTrashBlack />
            //                 </IconButton>
            //                 <IconButton
            //                     onClick={() => {
            //                         // handleReactivate(row.original)
            //                     }}
            //                 >
            //                     <IconCheck />
            //                 </IconButton>
            //             </>

            //         }
            //     </Box>
            // ]}
            />
        </MainAdminLayout>
    )
}

export default Absensi