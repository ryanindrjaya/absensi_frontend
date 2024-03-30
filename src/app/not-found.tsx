"use client";
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter()
    return (
        <Box className='w-full min-h-screen flex justify-center text-center items-center align-middle content-center'>
            <Box className="text-center w-full">
                <Box>
                    <Link href="/">
                        <Image
                            priority={true}
                            src='/assets/images/404.svg'
                            alt="Error Page"
                            width={500}
                            height={450}
                            className='cursor-pointer'
                        />
                    </Link>
                </Box>
                <Button className='mt-5 w-[200px] md:w-[302px]' onClick={() => router.back()} >
                    Go Back
                </Button>
            </Box>
        </Box>

    )
}