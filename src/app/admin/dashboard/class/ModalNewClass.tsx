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
    class_name: yup.string().required('Nama Kelas wajib di isi!'),
});

const ModalNewClass = ({
    openModal,
    setOpenModal,
    refresh,
    payload,
    mode
    // onSubmit,
}: any) => {
    const { startBackdrop, stopBackdrop } = useLoadingBackdrop()

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    React.useEffect(() => {
        methods.setValue('class_name', payload.class_name)
    }, [openModal])

    const onSubmit = (data: any) => {
        startBackdrop()
        if (mode === 'edit') {
            adminService.updateClass(payload.pk_class, data).then((response) => {
                methods.reset();
                refresh()
                setOpenModal(false)
                Swal.fire({
                    title: "Good job!",
                    text: "Success edit your class!",
                    icon: "success"
                });
            }).catch((msg) => {
                console.error(msg)
                alert.failed(formatter.getErrorMessage(msg))
            }).finally(() => {
                stopBackdrop()
            })
        } else {
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
                console.error(msg)
                alert.failed(formatter.getErrorMessage(msg))
            }).finally(() => {
                stopBackdrop()
            })
        }

    }


    return (
        <PopUp
            title="Tambah Kelas"
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
                                name='class_name'
                                required={true}
                                label='Nama Kelas'
                                fullWidth={true}
                                defaultValue={payload.class_name}
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
                                {mode === 'edit' ? 'Edit Kelas' : "Tambah Kelas"}
                            </Button>
                        </Box>
                    </form>

                </FormProvider>
            </Row>
        </PopUp>
    );
};

export default ModalNewClass;