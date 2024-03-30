import React from 'react';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';

import { InputLabelControl, MultiSelect, Row, SelectLabelControl, Text } from '@absensi/components/UI';
import PopUp from '@absensi/components/UI/PopUp';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import adminService from '@absensi/service/admin';
import Swal from 'sweetalert2'
import useLoadingBackdrop from '@absensi/hooks/useLoadingBackdrop';
import MultiSelectLabelControl from '@absensi/components/UI/SelectLabel/multiSelect';
import { alert, formatter } from '@absensi/utils';
import dayjs from 'dayjs';

const schema = yup.object({
    fk_class: yup.number().required('Kelas wajib di isi!'),
    name: yup.string().required('Nama wajib di isi!'),
    nis: yup.number().required('NIS wajib di isi!'),
    place_of_birth: yup.string().required('Tempat lahir wajib di isi!'),
    date_of_birth: yup.string().required('Tanggal lahir wajib di isi!'),
});

const ModalNewStudent = ({
    openModal,
    setOpenModal,
    refresh,
    masterClass,
    payload,
    mode
    // onSubmit,
}: any) => {
    const [name, setName] = React.useState('')
    const { startBackdrop, stopBackdrop } = useLoadingBackdrop()
    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    React.useEffect(() => {
        methods.setValue('name', payload.name)
        methods.setValue('nis', payload.nis)
        methods.setValue('fk_class', payload.idKelas)
        methods.setValue('date_of_birth', dayjs(payload.date_of_birth).format('YYYY-MM-DD'))
        methods.setValue('place_of_birth', payload.place_of_birth)

    }, [payload])

    const onSubmit = (data: any) => {
        startBackdrop()
        const payloadData = {
            ...data,
            date_of_birth: new Date(data.date_of_birth).getTime()
        }
        if (mode === 'edit') {
            adminService.updateStudent(payload.pk_student, payloadData).then(() => {
                methods.reset();
                refresh()
                setOpenModal(false)
                Swal.fire({
                    title: "Good job!",
                    text: "Success edit student!",
                    icon: "success"
                });
            }).catch((msg) => {
                alert.failed(formatter.getErrorMessage(msg))
            }).finally(() => {
                stopBackdrop()
            })
        } else {
            adminService.postStudent(payloadData).then(() => {
                methods.reset();
                refresh()
                setOpenModal(false)
                Swal.fire({
                    title: "Good job!",
                    text: "Success create new student!",
                    icon: "success"
                });
            }).catch((msg) => {
                alert.failed(formatter.getErrorMessage(msg))
            }).finally(() => {
                stopBackdrop()
            })
        }

    }


    return (
        <PopUp
            title={mode === 'edit' ? 'Edit Siswa' : "Tambah Siswa Baru"}
            titleAlign={'left'}
            dialogClassName='p-[16px] !pt-[16px] md:pt-[0px] md:p-[16px]'
            dialogTitleClassName='p-[16px] pb-[0px] md:p-[16px] md:pr-[16px] md:pb-[0px]'
            titleClassName='text-[16px] md:text-[16px]'
            showCloseIcon={true}
            size={'lg'}
            open={openModal}
            closeOnClickOutside={true}
            close={() => setOpenModal(false)}
            // dialogAction={modalFooter}
            dialogActionClassName='border-0 p-[16px]'
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: {
                            xs: '328px',
                            md: '400px'
                        },
                        maxWidth: '400px',
                        margin: {
                            xs: '0px'
                        },
                        maxHeight: {
                            md: '644px'
                        }
                    },
                },
            }}
        >
            <Row className='flex flex-col gap-[16px]'>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='md:flex md:justify-between md:flex-wrap gap-[16px] w-full'>
                        <Box className="mb-2 md:w-full">
                            <InputLabelControl
                                name='name'
                                required={true}
                                label='Nama Siswa'
                                fullWidth={true}
                            />
                        </Box>
                        <Box className="mb-2 md:w-full">
                            <InputLabelControl
                                name='nis'
                                type="number"
                                required={true}
                                label='NIS (Nomor Induk Siswa)'
                                fullWidth={true}
                            />
                        </Box>
                        <Box className="mb-2 md:w-full">
                            <SelectLabelControl
                                className='md:w-full'
                                name='fk_class'
                                options={masterClass}
                                // defaultValue={masterClass[0]}
                                label='Kelas'
                                placeholder='Select class'
                            />
                        </Box>

                        <Box className="mb-2 md:w-full">
                            <InputLabelControl
                                name='place_of_birth'
                                required={true}
                                label='Tempat Lahir'
                                fullWidth={true}
                            />
                        </Box>
                        <Box className="mb-2 md:w-full">
                            <InputLabelControl
                                name='date_of_birth'
                                required={true}
                                label='Tanggal Lahir'
                                fullWidth={true}
                                type="date"
                            />
                        </Box>
                        <Box className='flex flex-row gap-[16px] w-full justify-end'>
                            <Button
                                variant='contained'
                                size='medium'
                                className='w-full'
                                type="submit"
                            >
                                {mode === 'edit' ? "Edit Siswa" : "Tambah Siswa"}
                            </Button>
                        </Box>
                    </form>

                </FormProvider>
            </Row>
        </PopUp>
    );
};

export default ModalNewStudent;