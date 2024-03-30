"use client"
import { Box, Button, Chip, IconButton } from '@mui/material'
import { AbsensiTable, FormHeader } from '@absensi/components/Features'
import MainAdminLayout from '@absensi/components/Layout/MainAdminLayout'
import { Row } from '@absensi/components/UI'
import React from 'react'
import { MRT_PaginationState } from 'material-react-table'
import adminService from '@absensi/service/admin'
import ModalNewstaff from './ModalNewStaff'
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import { alert, formatter } from '@absensi/utils'

// import Link from 'next/link'
const columns: any[] = [
    { accessorKey: 'name', header: 'Nama Pengajar', size: 120 },
    { accessorKey: 'nik', header: 'NIK', size: 202 },
    { accessorKey: 'class', header: 'Kelas', size: 202 },
    {
        accessorKey: 'subjects', header: 'Mata Pelajaran', size: 202, Cell: ({ cell }: any) => {
            return (
                <center>
                    {cell.getValue().map((el: any, i: number) => <Chip className='mr-1' color="primary" label={el} key={i} />)}
                </center>
            )
        }
    },
];

const Class = () => {
    const [data, setData] = React.useState([])
    const [masterClass, setMasterClass] = React.useState([]);
    const [masterSubject, setMasterSubject] = React.useState([]);
    const [masterUser, setMasterUser] = React.useState([]);

    const [payload, setPayload] = React.useState([])
    const [modalMode, setModalMode] = React.useState('');
    const [openModalNewStudent, setOpenModalNewStudent] = React.useState(false)
    const [pagination, setPagination] = React.useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    React.useEffect(() => {
        getListStaff();
        getClass();
        getSubject();
        getUser();
    }, [])

    const getListStaff = () => {
        adminService.getTeacher().then(res => {
            setData(res.data.results)
        }).catch(err => {
            console.error(err)
        })
    }

    const getClass = () => {
        adminService.getClass().then(res => {
            const data = res.data.results.map((el: any) => (
                {
                    label: el.class_name,
                    value: el.pk_class
                }
            ))
            setMasterClass(data)
        }).catch(err => {
            console.error(err)
        })
    }

    const getUser = () => {
        adminService.getUser().then(res => {
            const data = res.data.results.map((el: any) => (
                {
                    label: `${el.name} - ${el.email}`,
                    value: el.id,
                    name: el.name
                }
            ))
            setMasterUser(data)
        }).catch(err => {
            console.error(err)
        })
    }

    const getSubject = () => {
        adminService.getSubject().then(res => {
            const data = res.data.results.map((el: any) => (
                {
                    label: el.subject_name,
                    value: el.pk_subject
                }
            ))
            setMasterSubject(data)
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
                adminService.deleteTeacher(id).then(() => {
                    alert.success('Success remove staff!')
                    getListStaff();
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
                titlePage='Tenaga Pengajar'
                link="/admin/dashboard"
                linkName='Master'
                page='Tenaga Pengajar'
            />
            <Row >
                <Box className="flex justify-end w-full flex-end mb-10">
                    <Button onClick={() => {
                        setOpenModalNewStudent(true)
                        setModalMode('create')
                    }} className="w-[157px]">Tambah Pengajar</Button>
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
                        <Box key={row?.original?.pk_teacher} className='flex flex-row items-center justify-center gap-[8px]'>
                            <IconButton
                                onClick={() => {
                                    handleDelete(row.original.pk_teacher)
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
                        </Box>
                    ]}
                />
            </Row>
            <ModalNewstaff
                payload={payload}
                mode={modalMode}
                masterClass={masterClass}
                masterSubject={masterSubject}
                masterUser={masterUser}
                openModal={openModalNewStudent}
                setOpenModal={setOpenModalNewStudent}
                refresh={getListStaff}
            />
        </MainAdminLayout >
    )
}

export default Class