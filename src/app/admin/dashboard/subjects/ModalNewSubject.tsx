import React from 'react';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';

import { InputLabelControl, Row, Text } from '@absensi/components/UI';
import PopUp from '@absensi/components/UI/PopUp';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import adminService from '@absensi/service/admin';
import Swal from 'sweetalert2'
import useLoadingBackdrop from '@absensi/hooks/useLoadingBackdrop';
import { alert, formatter } from '@absensi/utils';

const schema = yup.object({
    name: yup.string().required('Mata Pelajaran wajib di isi!'),
});

const ModalNewSubject = ({
    openModal,
    setOpenModal,
    refresh,
    mode,
    payload
    // onSubmit,
}: any) => {
    const { startBackdrop, stopBackdrop } = useLoadingBackdrop()


    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    console.log(payload)

    React.useEffect(() => {
        methods.setValue('name', payload?.subject_name)
    }, [openModal])

    const onSubmit = (data: any) => {
        startBackdrop()
        if (mode === 'edit') {
            adminService.updateSubject(payload.pk_subject, data).then((response) => {
                methods.reset();
                refresh()
                setOpenModal(false)
                Swal.fire({
                    title: "Good job!",
                    text: "Success update your subject!",
                    icon: "success"
                });
            }).catch((msg) => {
                console.error(msg)
                alert.failed(formatter.getErrorMessage(msg))
            }).finally(() => {
                stopBackdrop()
            })
        } else
            adminService.postSubjects(data).then((response) => {
                methods.reset();
                refresh()
                setOpenModal(false)
                Swal.fire({
                    title: "Good job!",
                    text: "Success create your subjects!",
                    icon: "success"
                });
            }).catch((msg) => {
                console.error(msg)
                alert.failed(formatter.getErrorMessage(msg))
            }).finally(() => {
                stopBackdrop()
            })

    }

    return (
        <PopUp
            title="Tambah Mata Pelajaran"
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
                        <Box className="mb-5 w-full">
                            <InputLabelControl
                                name='name'
                                required={true}
                                label='Nama Mata Pelajaran'
                                fullWidth={true}
                            // sx={{
                            //     width: {
                            //         md: '370px'
                            //     }
                            // }}
                            />
                        </Box>
                        <Box className='flex flex-row gap-[16px] w-full justify-end'>
                            <Button
                                type="submit"
                                variant='contained'
                                size='medium'
                                className='w-full'
                            >
                                {mode === 'edit' ? 'Edit Mata Pelajaran' : "Tambah Mata Pelajaran"}
                            </Button>
                        </Box>
                    </form>

                </FormProvider>
            </Row>
        </PopUp>
    );
};

export default ModalNewSubject;