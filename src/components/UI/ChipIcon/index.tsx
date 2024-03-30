import { Chip } from '@mui/material'
import React from 'react'

export const ChipIcon = ({ Icon, label, color, background }: any) => {
    return (
        <>
            <Chip
                variant='outlined'
                label={label}
                size='small'
                className={`p-[4px] text-[12px] no-uppercase rounded-md border-${color} text-[${color}] bg-[${background}] font-semibold`}
                icon={Icon}
                sx={{
                    width: 100
                }}
            />
        </>
    )
}
