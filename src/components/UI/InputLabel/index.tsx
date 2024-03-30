import { Box, TextField } from '@mui/material';

import { UIDefaultInterface, Text } from '..';
import React from 'react';

type InputType = 'text' | 'number' | 'email';

interface InputInterface extends UIDefaultInterface {
    type?: InputType,
    label: string,
    required?: boolean,
    placeholder?: string,
}

const InputLabel = ({
    label,
    required = false,
    placeholder = '',
    type = 'text',
    className = '',
    defaultValue = '',
    ...props
}: InputInterface) => {
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        setValue(value);
    }, [defaultValue]);

    return (
        <Box className={className}>
            <Text
                required={required}
                className='font-inter font-semibold text-[14px] md:text-[14px] mb-2'
            >
                {label}
            </Text>
            <TextField
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                onKeyUp={props.onKeyUp}
                variant='outlined'
                fullWidth
                size='small'
            />
        </Box>
    )
}

export default InputLabel;