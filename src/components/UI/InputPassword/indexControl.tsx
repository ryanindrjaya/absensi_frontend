'use client';

import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import Text from '../Text';
import Col from '../Col';

const InputPasswordControl = ({
    label,
    required = false,
    placeholder = '',
    name = '',
    defaultValue = '',
    ...props
}: any) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);

    const renderVisibilityIcon = () => (
        <InputAdornment position={'end'}>
            {showPassword ? (
                <VisibilityIcon className='hover:cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
            ) : (
                <VisibilityOffIcon className='hover:cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
            )}
        </InputAdornment>
    );

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Col>
                    <Text
                        required={required}
                        className='font-semibold text-[14px] md:text-[14px] mb-2'
                    >
                        {label}
                    </Text>
                    <Col className='relative mt-2 rounded-md shadow-sm'>
                        <TextField
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={placeholder}
                            onKeyUp={props.onKeyUp}
                            variant='outlined'
                            fullWidth
                            size='small'
                            autoComplete='off'
                            error={!!errors[name]}
                            helperText={(errors[name]?.message ?? '').toString()}
                            InputProps={{
                                endAdornment: (renderVisibilityIcon()),
                            }}
                            sx={{
                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    height: '44px',
                                    fontSize: '14px',
                                    '& > fieldset': {
                                        borderColor: '#000',
                                        ':focus': {
                                            borderColor: 'blue'
                                        }
                                    },
                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused': {
                                    '& > fieldset': {
                                        border: '1px solid #E86124',
                                    },
                                }
                            }}
                        />
                    </Col>
                </Col>
            )}
        />);
};

export default InputPasswordControl;