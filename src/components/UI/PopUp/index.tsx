'use client';

import React, { ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';

import { Text, UIDefaultInterface } from '..';

type textAlignType = 'left' | 'center' | 'right';

interface PopUpInterface extends UIDefaultInterface {
    title: string
    titleAlign: textAlignType
    titleClassName?: string
    showCloseIcon: boolean
    open: boolean
    size: any
    children: ReactNode
    close?: any
    footer?: ReactNode
    dialogClassName?: string
    dialogTitleClassName?: string
    isMobileFullWidth?: boolean
    dialogActionClassName?: string
    dialogAction?: ReactNode
    dialogContainerClassName?: string
    sx?: any
    closeOnClickOutside?: boolean,
    id?: string,
    dataTour?: string,
}

const PopUp = ({
    title = '',
    titleAlign = 'left',
    titleClassName = '',
    dialogTitleClassName = '',
    showCloseIcon = true,
    open = false,
    size = 'lg',
    children,
    close,
    footer = '',
    dialogActionClassName = '',
    dialogAction = '',
    dialogClassName = '',
    isMobileFullWidth = false,
    dialogContainerClassName = '',
    closeOnClickOutside = false,
    id,
    dataTour,
    ...props
}: PopUpInterface) => {
    const [isOpen, setIsOpen] = React.useState(open);

    const handleClose = () => {
        setIsOpen(false);
        close(isOpen);
    };

    React.useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const textAlign = () => {
        switch (titleAlign) {
            case 'center':
                return 'justify-center'
            case 'right':
                return 'justify-end'
            default:
                return 'justify-left'
        }
    }

    React.useEffect(() => {
        setIsOpen(open);
    }, [open])

    const renderIconClose = (
        <IconButton onClick={() => handleClose()}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                className='h-5 w-5'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                />
            </svg>
        </IconButton>
    )

    const header = (
        <DialogTitle className={`flex flex-row justify-between pr-[10px] ${dialogTitleClassName}`}>
            <Text className={`font-semibold md:font-semibold flex flex-1 flex-row items-center text-[16px] md:text-[22px] ${textAlign()} ${titleClassName}`}>
                {title}
            </Text>
            {showCloseIcon ? renderIconClose : ''}
        </DialogTitle>
    )

    return (
        <Dialog
            open={isOpen}
            className={`rounded-xs ${dialogContainerClassName}`}
            maxWidth={"lg"}
            fullWidth={true}
            hideBackdrop={false}
            onClose={closeOnClickOutside && close ? close : undefined}
            // sx={{
            //     '& .MuiDialog-container': {
            //         '& .MuiPaper-root': {
            //             width: {
            //                 xs: isMobileFullWidth ? '95%' : '328px',
            //                 // sm: 'calc(100% - 64px)',
            //                 md: '1030px'
            //             },
            //             margin: {
            //                 xs: '0px'
            //             }
            //         },
            //     },
            // }}
            {...props}
        >
            <Box id={id}
                aria-labelledby={id}
                data-tour={dataTour}>
                {title.length === 0 ? '' : header}
                <DialogContent className={`flex flex-col p-6 ${title.length > 0 ? 'pt-0 pb-4' : ''} ${dialogClassName} overflow-x-hidden overflow-y-auto`}>
                    {children}
                    {footer !== '' ? <div className='p-0 mt-4 mb-3'>{footer}</div> : ''}
                </DialogContent>
                {dialogAction === '' ? '' : (
                    <DialogActions className={`${dialogActionClassName === '' ? 'border-t border-solid border-[#DEDEDE]' : dialogActionClassName}`}>
                        {dialogAction}
                    </DialogActions>
                )}
            </Box>
        </Dialog>
    );
};

export default PopUp;