import React from 'react'
import { AdminPageTitle } from '..'
import { Row } from '@absensi/components/UI'
import { Breadcrumbs, Typography } from '@mui/material'
import Link from 'next/link'

const FormHeader = ({ titlePage, linkName, link, page }: { titlePage: string, linkName: string, link: string, page: string }) => {
    return (
        <Row className='mb-6'>
            <AdminPageTitle>
                {titlePage}
            </AdminPageTitle>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href={link}>
                    {linkName}
                </Link>
                <Typography color="text.primary">{page}</Typography>
            </Breadcrumbs>
        </Row>
    )
}

export default FormHeader