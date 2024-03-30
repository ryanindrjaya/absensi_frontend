import { AbsensiIcon } from '@absensi/components/Icons'
import { Flex, Text } from '@absensi/components/UI'
import Link from 'next/link'
import React from 'react'

const CardMasterData = ({ title, icon = 'home', href }: { title: string, icon: string, href: string }) => {
    return (
        <Link href={href}>
            <Flex className="bg-[#373645] rounded-md cursor-pointer p-10 min-w-[350px] my-5 min-h-[110px] text-white justify-between items-center align-middle">
                <Text as="h2" className='text-white text-[20px]'>{title}</Text>
                <AbsensiIcon name={icon as any} color="white" size={50} />
            </Flex>
        </Link>
    )
}

export default CardMasterData