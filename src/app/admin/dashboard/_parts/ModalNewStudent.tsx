import React from 'react';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';

import { InputLabelControl, Row, Text } from '@absensi/components/UI';
import PopUp from '@absensi/components/UI/PopUp';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import adminService from '@absensi/service/admin';
import Swal from 'sweetalert2'
import { alert, formatter } from '@absensi/utils';

const schema = yup.object({
    email: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
});

const ModalNewStudent = ({
    openModal,
    setOpenModal,
    refresh
    // onSubmit,
}: any) => {


    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (data: any) => {
        adminService.postClass(data).then((response) => {
            methods.reset();
            refresh()
            setOpenModal(false)
            Swal.fire({
                title: "Good job!",
                text: "Success create your class!",
                icon: "success"
            });
        }).catch((msg) => {
            console.log(msg)
            alert.failed(formatter.getErrorMessage(msg))
        })
    }

    return (
        <PopUp
            title="Tambah Kelas Baru"
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
        // sx={{
        //     '& .MuiDialog-container': {
        //         '& .MuiPaper-root': {
        //             width: {
        //                 xs: '328px',
        //                 md: '1190px'
        //             },
        //             maxWidth: '1190px',
        //             margin: {
        //                 xs: '0px'
        //             },
        //             maxHeight: {
        //                 md: '644px'
        //             }
        //         },
        //     },
        // }}
        >
            <Row className='flex flex-col gap-[16px]'>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className='md:flex md:justify-between md:flex-wrap gap-[16px]'>
                        <Box className="mb-5">
                            <InputLabelControl
                                name='name'
                                required={true}
                                label='Nama Kelas'
                                fullWidth={true}
                                sx={{
                                    width: {
                                        md: '370px'
                                    }
                                }}
                            />
                        </Box>
                        <Box className="mb-5">
                            <InputLabelControl
                                name='email'
                                required={true}
                                label='Username'
                                sx={{
                                    width: {
                                        xs: '100%',
                                        md: '370px'
                                    }
                                }}
                            />
                        </Box>
                        <Box className="mb-5">
                            <InputLabelControl
                                name='email'
                                required={true}
                                label='Test'
                                sx={{
                                    width: {
                                        xs: '100%',
                                        md: '370px'
                                    }
                                }}
                            />
                        </Box>
                        <Box className='flex flex-row gap-[16px] w-full justify-end'>
                            <Button
                                type="submit"
                                variant='contained'
                                size='medium'
                                className='max-w-[144px] w-full'
                            >
                                Tambah Kelas
                            </Button>

                        </Box>
                    </form>
                </FormProvider>
            </Row>
        </PopUp>
    );
};

export default ModalNewStudent;