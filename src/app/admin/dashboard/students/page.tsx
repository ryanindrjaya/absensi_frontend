"use client"
import { Box, Button, IconButton } from '@mui/material'
import { AbsensiTable, FormHeader } from '@absensi/components/Features'
import { IconCheck, IconTrashBlack } from '@absensi/components/Icons'
import MainAdminLayout from '@absensi/components/Layout/MainAdminLayout'
import { Row } from '@absensi/components/UI'
import { alert, formatter } from '@absensi/utils'
import React from 'react'
import { MRT_PaginationState } from 'material-react-table'
import adminService from '@absensi/service/admin'
import ModalNewStudent from './modalNewStudent'
import Swal from 'sweetalert2'
import IconDelete from '@mui/icons-material/Delete';
import IconEdit from '@mui/icons-material/Edit';
import ModalNewStudentUpload from './modalNewStudentUpload'
// import Link from 'next/link'
const columns: any[] = [
    { accessorKey: 'nis', header: 'NIS', size: 202 },
    { accessorKey: 'place_of_birth', header: 'Tempat Lahir', size: 202 },
    { accessorKey: 'date_of_birth', header: 'Tanggal Lahir', size: 160, Cell: ({ cell }: any) => formatter.date(cell.getValue(), 'DD MMMM YYYY') },
    { accessorKey: 'name', header: 'Nama', size: 202 },
    { accessorKey: 'kelas', header: 'Kelas', size: 202 },
];

const Class = () => {
    const [data, setData] = React.useState([])
    const [masterClass, setMasterClass] = React.useState([]);

    const [payload, setPayload] = React.useState([])
    const [modalMode, setModalMode] = React.useState('');
    const [openModalNewStudent, setOpenModalNewStudent] = React.useState(false)
    const [openModalNewStudentUpload, setOpenModalNewStudentUpload] = React.useState(false)

    const [pagination, setPagination] = React.useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });


    React.useEffect(() => {
        getListStudents()
        getClass()
    }, [])

    const getListStudents = () => {
        adminService.getStudents().then(res => {
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
                adminService.deleteStudent(id).then(() => {
                    alert.success('Success remove student!')
                    getListStudents();
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
                titlePage='Siswa'
                link="/admin/dashboard"
                linkName='Master'
                page='Siswa'
            />
            <Row >
                <Box className="flex gap-2 justify-end w-full flex-end mb-10">
                    <Button onClick={() => setOpenModalNewStudentUpload(true)} className="w-[157px]">
                        Upload
                    </Button>
                    <Button onClick={() => {
                        setOpenModalNewStudent(true)
                        setModalMode('create')
                    }} className="w-[157px]">Tambah Siswa</Button>
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
                        <Box key={row?.original?.pk_student} className='flex flex-row items-center justify-center gap-[8px]'>
                            <IconButton
                                onClick={() => {
                                    handleDelete(row.original.pk_student)
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
            <ModalNewStudent
                payload={payload}
                mode={modalMode}
                refresh={() => getListStudents()}
                masterClass={masterClass}
                openModal={openModalNewStudent}
                setOpenModal={setOpenModalNewStudent}
            />
            <ModalNewStudentUpload
                refresh={() => getListStudents()}
                masterClass={masterClass}
                openModal={openModalNewStudentUpload}
                setOpenModal={setOpenModalNewStudentUpload}
            />
        </MainAdminLayout >
    )
}

export default Class