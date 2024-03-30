'use client';

import * as React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form'; // Import Controller and useFormContext

import { UIDefaultInterface, Text, Col } from '..';

interface TextAreaLabelInterface extends UIDefaultInterface {
    name: string,
    label: string,
    required?: boolean,
    maxLength?: number,
    placeholder?: string,
    rules?: any
    defaultValue?: string,
    disabled?: boolean
}

const TextAreaLabelControl = ({
    name,
    label,
    required = false,
    placeholder = '',
    defaultValue = '',
    maxLength = 0,
    rules = undefined,
    disabled = false
}: TextAreaLabelInterface) => {
    const [counter, setCounter] = React.useState(0);
    const {
        control,
        formState: { errors },
    } = useFormContext();

    React.useEffect(() => {
        setCounter(defaultValue?.length ?? 0);
    }, [defaultValue])

    return (
        <Controller // Use Controller component
            name={name} // Pass the name from props to Controller
            control={control} // Pass the control from useFormContext
            rules={rules}
            defaultValue={defaultValue}
            render={({ field: { onChange, onBlur, value } }) => (
                <Col className='relative'>
                    <Text className='font-semibold text-[14px] md:text-[14px] mb-2'>{label}</Text>
                    <TextField
                        required={required}
                        disabled={disabled}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChange={(e) => {
                            const val = e.target.value;

                            if (maxLength > 0 && val.length >= maxLength) {
                                onChange(val.slice(0, maxLength));
                                setCounter(maxLength);
                            } else {
                                onChange(val);
                                setCounter(val.length);
                            }

                        }}
                        value={value}
                        variant='outlined'
                        fullWidth
                        size='small'
                        multiline
                        rows={4}
                        error={!!errors[name]}
                        helperText={(errors[name]?.message ?? '').toString()}
                        sx={{
                            '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                borderRadius: '8px',
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
                    {(maxLength > 0) ? <Text className='absolute right-2 bottom-2 text-xs'>{counter} / {maxLength}</Text> : ''}
                </Col>
            )}
        />
    )
}

export default TextAreaLabelControl;