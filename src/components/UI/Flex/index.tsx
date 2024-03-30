import { Box } from '@mui/material'
import React from 'react'

const Flex = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    return (
        <Box className={`flex ${className}`}>
            {children}
        </Box>
    )
}

export default Flex