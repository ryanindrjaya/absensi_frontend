"use client"
import { Box, Button, IconButton } from '@mui/material'
import { AbsensiTable, FormHeader } from '@absensi/components/Features'
import { IconCheck, IconTrashBlack } from '@absensi/components/Icons'
import MainAdminLayout from '@absensi/components/Layout/MainAdminLayout'
import { Row } from '@absensi/components/UI'
import { alert, formatter } from '@absensi/utils'
import React from 'react'
import { MRT_PaginationState } from 'material-react-table'
import ModalNewStudent from '../_parts/ModalNewStudent'
import adminService from '@absensi/service/admin'
import ModalNewSubject from './ModalNewSubject'
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
// import Link from 'next/link'
const columns: any[] = [
    { accessorKey: 'pk_subject', header: 'ID', size: 120 },
    { accessorKey: 'subject_name', header: 'Nama Mata Pelajaran', size: 202 },
];

const data = [
    {
        create_on: '02/03/2024',
        id: 1,
        skill_name: "coding",
        category: 'MTK',
        type: 'test'
    },
    {
        create_on: '02/03/2024',
        id: 1,
        skill_name: "coding",
        category: 'MTK',
        type: 'test'
    }
]

const Class = () => {
    const [data, setData] = React.useState([])
    const [openModalNewStudent, setOpenModalNewStudent] = React.useState(false)
    const [payload, setPayload] = React.useState([])
    const [modalMode, setModalMode] = React.useState('');

    const [pagination, setPagination] = React.useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    React.useEffect(() => {
        getListSubjects()
    }, [])

    const getListSubjects = () => {
        adminService.getSubject().then(res => {
            setData(res.data.results)
        }).catch(err => {
            console.error(err)
        })
    }

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Do you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                adminService.deleteSubject(id).then(() => {
                    alert.success('Success remove subject!')
                    getListSubjects();
                }).catch(err => {
                    console.error(err);
                    alert.failed(formatter.getErrorMessage(err))
                });
            }
        });

    };

    const handleEdit = (data: any) => {
        setPayload(data)
        setOpenModalNewStudent(true)
        setModalMode('edit');
    }

    return (
        <MainAdminLayout>
            <FormHeader
                titlePage='Mata Pelajaran'
                link="/admin/dashboard"
                linkName='Master'
                page='Mata Pelajaran'
            />
            <Row >
                <Box className="flex justify-end w-full flex-end mb-10">
                    <Button onClick={() => {
                        setOpenModalNewStudent(true)
                        setModalMode('create')
                    }} className="w-[157px]">Tambah Mata Pelajaran</Button>
                </Box>
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
                        <Box key={row?.original?.pk_subject} className='flex flex-row items-center justify-center gap-[8px]'>
                            {

                                <>
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(row.original.pk_subject)
                                        }}
                                    >
                                        <IconDelete />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            handleEdit(row.original)
                                        }}
                                    >
                                        <IconEdit />
                                    </IconButton>
                                </>

                            }
                        </Box>
                    ]}
                />
            </Row>
            <ModalNewSubject
                mode={modalMode}
                payload={payload}
                openModal={openModalNewStudent}
                setOpenModal={setOpenModalNewStudent}
                refresh={() => getListSubjects()}
            />
        </MainAdminLayout >
    )
}

export default Class