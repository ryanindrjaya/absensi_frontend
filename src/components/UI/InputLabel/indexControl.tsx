'use client';

import { FC } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { Text } from '..';

type IFormInputProps = {
    name: string;
    rules?: any;
    maxLength?: number;
} & TextFieldProps;

const InputLabelControl: FC<IFormInputProps> = ({
    label,
    required = false,
    placeholder = '',
    type = 'text',
    className = '',
    defaultValue = '',
    name = '',
    rules = undefined,
    maxLength,
    ...props
}) => {

    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue ?? ''}
            render={({ field: { onChange, value } }) => (
                <Box className={className}>
                    <Text
                        className='font-semibold text-[14px] md:text-[14px] mb-2'
                    >
                        {label}
                    </Text>
                    <TextField
                        required={required}
                        type={type}
                        placeholder={placeholder}
                        variant='outlined'
                        fullWidth
                        size='small'
                        value={value}
                        autoComplete='none'
                        onChange={(e) => onChange(e.target.value)}
                        name={name}
                        id={name}
                        error={!!errors[name]}
                        helperText={(errors[name]?.message ?? '').toString()}
                        inputProps={{ maxLength: maxLength }}
                        {...props}
                    />
                </Box>
            )}
        />
    );
};

export default InputLabelControl;