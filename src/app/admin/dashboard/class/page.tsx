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
import ModalNewClass from './ModalNewClass'
// import Link from 'next/link'
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'

const columns: any[] = [
    { accessorKey: 'class_name', header: 'Nama Kelas' },
];


const Class = () => {
    const [data, setData] = React.useState([])
    const [payload, setPayload] = React.useState([])
    const [modalMode, setModalMode] = React.useState('');
    const [openModalNewClass, setOpenModalNewClass] = React.useState(false)
    const [pagination, setPagination] = React.useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    React.useEffect(() => {
        getListClass()
    }, [])

    const getListClass = () => {
        adminService.getClass().then(res => {
            setData(res.data.results)
        }).catch(err => {
            console.error(err)
        })
    }

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Do you want to delete this class?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                adminService.deleteClass(id).then(() => {
                    alert.success('Success remove class!')
                    getListClass();
                }).catch(err => {
                    console.error(err);
                    alert.failed(formatter.getErrorMessage(err))
                });
            }
        });

    };

    const handleEdit = (data: any) => {
        setPayload(data)
        setOpenModalNewClass(true)
        setModalMode('edit');
    }

    return (
        <MainAdminLayout>
            <FormHeader
                titlePage='Kelas Siswa'
                link="/admin/dashboard"
                linkName='Master'
                page='Kelas Siswa'
            />
            <Row >
                <Box className="flex justify-end w-full flex-end mb-10">
                    <Button onClick={() => {
                        setOpenModalNewClass(true)
                        setModalMode('create')
                    }} className="w-[157px]">Tambah Kelas</Button>
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
                        <Box key={row?.original?.pk_class} className='flex items-center justify-center gap-[8px] '>
                            {

                                <center >
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(row.original.pk_class)
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
                                </center>

                            }
                        </Box>
                    ]}
                />
            </Row>
            <ModalNewClass
                payload={payload}
                refresh={() => getListClass()}
                openModal={openModalNewClass}
                setOpenModal={setOpenModalNewClass}
                mode={modalMode}
            />
        </MainAdminLayout >
    )
}

export default Class