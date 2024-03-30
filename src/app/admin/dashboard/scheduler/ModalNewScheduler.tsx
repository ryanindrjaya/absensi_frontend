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
    fk_teacher: yup.number().required('Pengajar wajib di isi!'),
    fk_subject: yup.number().required('Mata Pelajaran wajib di isi!'),
    lesson_schedule_start_hour: yup.string().required('Waktu mulai wajib di isi!'),
    lesson_schedule_end_hour: yup.string().required('Waktu selesai wajib di isi!'),
    lesson_schedule_days: yup.array()
});

const DAYOPTIONS = [
    {
        label: "Minggu",
        value: 0
    },
    {
        label: "Senin",
        value: 1
    },
    {
        label: "Selasa",
        value: 2
    },
    {
        label: "Rabu",
        value: 3
    },
    {
        label: "Kamis",
        value: 4
    },
    {
        label: "Jumat",
        value: 5
    },
    {
        label: "Sabtu",
        value: 6
    },
]

const ModalNewScheduler = ({
    openModal,
    setOpenModal,
    refresh,
    masterClass,
    masterSubject,
    masterUser,
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
        methods.setValue('fk_class', payload.classId)
        methods.setValue('fk_subject', payload.subjectId)
        methods.setValue('fk_teacher', payload.teacherId)
        methods.setValue('lesson_schedule_days', payload.lesson_schedule_days)
        methods.setValue('lesson_schedule_start_hour', dayjs(payload.startLesson).format('HH:mm'))
        methods.setValue('lesson_schedule_end_hour', dayjs(payload.endLesson).format('HH:mm'))
    }, [payload])

    const onSubmit = (data: any) => {
        startBackdrop()
        const [startHours, startMinutes] = data.lesson_schedule_start_hour.split(':').map(Number);
        const [endHours, endMinutes] = data.lesson_schedule_end_hour.split(':').map(Number);

        const startDate = new Date();
        startDate.setHours(startHours);
        startDate.setMinutes(startMinutes);

        const endDate = new Date();
        endDate.setHours(endHours);
        endDate.setMinutes(endMinutes);

        const timeStartSchedule = startDate.getTime();
        const timeEndSchedule = endDate.getTime();

        const payloadData = {
            ...data,
            lesson_schedule_start_hour: timeStartSchedule,
            lesson_schedule_end_hour: timeEndSchedule
        }
        if (mode === 'edit') {
            adminService.updateScheduler(payload.id, payloadData).then(() => {
                methods.reset();
                refresh()
                setOpenModal(false)
                Swal.fire({
                    title: "Good job!",
                    text: "Success edit scheduler!",
                    icon: "success"
                });
            }).catch((msg) => {
                alert.failed(formatter.getErrorMessage(msg))
            }).finally(() => {
                stopBackdrop()
            })
        } else {
            adminService.postScheduler(payloadData).then(() => {
                methods.reset();
                refresh()
                setOpenModal(false)
                Swal.fire({
                    title: "Good job!",
                    text: "Success create new scheduler!",
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
            title={mode === 'edit' ? 'Edit Jadwal' : "Tambah Jadwal"}
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
                            <SelectLabelControl
                                className='md:w-full'
                                name='fk_teacher'
                                options={masterUser}
                                // defaultValue={masterUser[0]}
                                label='Pengajar'
                                placeholder='Select pengajar'
                                onChange={(val: any) => {
                                    setName(val.name)
                                }}
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
                            <SelectLabelControl
                                className='md:w-full'
                                name='fk_subject'
                                options={masterSubject}
                                // defaultValue={masterClass[0]}
                                label='Mata Pelajaran'
                                placeholder='Select Mata Pelajaran'
                            />
                        </Box>
                        <Box className="mb-2 md:w-full">
                            <MultiSelect
                                className='md:w-full'
                                name='lesson_schedule_days'
                                options={DAYOPTIONS}
                                multiSelect={true}
                                creatable={false}
                                label='Hari'
                                placeholder='Select Day'
                            />
                        </Box>
                        <Box className="flex gap-2 mb-2 md:w-full">

                            <InputLabelControl
                                name='lesson_schedule_start_hour'
                                required={true}
                                label='Waktu Mulai'
                                fullWidth={true}
                                type="time"
                                className="w-1/2"
                            />
                            <InputLabelControl
                                name='lesson_schedule_end_hour'
                                required={true}
                                label='Waktu Selesai'
                                fullWidth={true}
                                type="time"
                                className="w-1/2"
                            />
                        </Box>
                        <Box className='flex flex-row gap-[16px] w-full justify-end'>
                            <Button
                                variant='contained'
                                size='medium'
                                className='w-full'
                                type="submit"
                            >
                                {mode === 'edit' ? 'Edit Jadwal' : 'Tambah Jadwal'}
                            </Button>
                        </Box>
                    </form>

                </FormProvider>
            </Row>
        </PopUp>
    );
};

export default ModalNewScheduler;