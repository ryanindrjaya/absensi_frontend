import React from 'react';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';

import { InputLabelControl, MultiSelect, Row, SelectLabelControl, Text } from '@absensi/components/UI';
import PopUp from '@absensi/components/UI/PopUp';
import adminService from '@absensi/service/admin';
import Swal from 'sweetalert2'
import useLoadingBackdrop from '@absensi/hooks/useLoadingBackdrop';
import { alert, formatter } from '@absensi/utils';
import { FileUploader } from "react-drag-drop-files";
import Link from 'next/link';


const fileTypes = ["xlsx"];
const ModalNewStudentUpload = ({
    openModal,
    setOpenModal,
    refresh,
    // onSubmit,
}: any) => {
    const { startBackdrop, stopBackdrop } = useLoadingBackdrop()
    const [file, setFile] = React.useState<File | null>(null);
    const handleChange = (file: any) => {
        setFile(file);
    };

    const onSubmit = () => {
        startBackdrop()
        const formData = new FormData()
        formData.append('file', file as File)
        adminService.postUploadStudent(formData).then(() => {
            refresh()
            setOpenModal(false)
            Swal.fire({
                title: "Good job!",
                text: "Success create new student!",
                icon: "success"
            });
            setFile(null)
        }).catch((msg) => {
            alert.failed(formatter.getErrorMessage(msg))
        }).finally(() => {
            stopBackdrop()
        })

    }


    return (
        <PopUp
            title={"Tambah Siswa Baru"}
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
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                <Text>Download Format upload File pada <Link href='https://docs.google.com/spreadsheets/d/1HUEzxlVGnQCr99SPQSo4QmiDKBI-G7X_/edit?usp=sharing&ouid=114392143064891295817&rtpof=true&sd=true'>link berikut</Link></Text>
                <Box className='flex flex-row gap-[16px] w-full justify-end'>
                    <Button
                        variant='contained'
                        size='medium'
                        className='w-full'
                        onClick={onSubmit}
                    >
                        Tambah Siswa
                    </Button>
                </Box>
            </Row>
        </PopUp>
    );
};

export default ModalNewStudentUpload;