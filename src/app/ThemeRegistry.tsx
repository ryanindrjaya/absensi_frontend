// app/ThemeRegistry.tsx
'use client';

import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

import material from '@absensi/config/material';
import { Inter } from 'next/font/google'
import { RecoilRoot } from 'recoil';
import { LoadingBackdrop } from '@absensi/components/Features';

// const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// This implementation from emotion-js
export default function ThemeRegistry(props: any) {
    const { children } = props;

    return (
        <RecoilRoot>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={material} >
                    <CssBaseline />
                    <main className={`${inter.variable}`}>{children}</main>
                    <LoadingBackdrop />
                </ThemeProvider>
            </StyledEngineProvider>
        </RecoilRoot>
    );
}