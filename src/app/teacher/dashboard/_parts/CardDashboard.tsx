import { Text } from '@absensi/components/UI'
import { Box } from '@mui/material'

import React from 'react'

const CardDashboard = ({ title, count }: { title: string, count: number }) => {
    return (
        <Box className="bg-[#373645] rounded-md cursor-pointer p-10 w-full md:w-[380px] my-5 min-h-[110px] text-white">
            <Text as="h2" className='text-white text-[18px]'>{title}</Text>
            <Text as="h2" className='text-white text-[28px] font-bold'>{count}</Text>
        </Box>
    )
}

export default CardDashboard