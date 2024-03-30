"use client";
import { AdminPageTitle } from '@absensi/components/Features'
import MainAdminLayout from '@absensi/components/Layout/MainAdminLayout'
import { Flex, Row, Text } from '@absensi/components/UI'
import { Box, Card } from '@mui/material'
import React from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs'
import teacherService from '@absensi/service/teacher';
import { formatter } from '@absensi/utils';

const Schedule = () => {
    const localizer = dayjsLocalizer(dayjs)
    const [data, setData] = React.useState([])
    const myEvents = [
        /* {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(2015, 3, 0),
          end: new Date(2015, 3, 1),
        }, */
        // {
        //     id: 1,
        //     title: 'Long Event',
        //     start: new Date("2024-03-03T08:00:00.000Z"),
        //     end: new Date("2024-03-03T09:00:00.000Z"),
        //     allDay: true,
        // },
        {
            id: 1,
            title: 'Matematika',
            start: dayjs('2024-03-03 08:00').toDate(),
            end: dayjs('2024-03-03 10:00').toDate(),
            allDay: true,
        },

    ]

    React.useEffect(() => {
        getListLessonSchedule()
    }, [])

    const getListLessonSchedule = () => {
        teacherService.getLesson().then(res => {
            setData(res.data.results)
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <MainAdminLayout>
            <Row className='mb-6'>
                <AdminPageTitle>
                    Lihat Jadwal
                </AdminPageTitle>
                <Text as="p">Lihad Jadwal</Text>
            </Row>
            <Flex className='gap-5'>
                <Box className="w-[70%]">
                    <Calendar
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        step={60}
                    />
                </Box>
                <Box className="w-[30%]">
                    <Card variant='outlined' className='p-5'>
                        <Text as="h1" className='font-bold'>List Mata Pelajaran</Text>
                        {
                            data?.map((el: any, i: number) => (
                                <Text key={i} as="p" className='mt-4'>1. {el.lessonName} pada jam {formatter.date(el.lessonTime, 'DD/MM/YYYY HH:mm:ss')}</Text>
                            ))
                        }
                    </Card>

                </Box>
            </Flex>
        </MainAdminLayout>
    )
}

export default Schedule