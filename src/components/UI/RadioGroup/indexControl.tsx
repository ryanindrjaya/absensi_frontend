'use client';

import { Box, FormControlLabel, Radio, RadioGroup as RdGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { Text } from '..';

interface OptionsInterface {
    value: string | number,
    label: string
}

interface RadioGroupInterface {
    name: string,
    defaultValue: string | number,
    options?: OptionsInterface[],
    onChange?: any,
    label: string,
    required?: boolean,
    disabled?: boolean
}

const RadioGroupControl = ({
    name,
    defaultValue = '',
    options = [],
    onChange,
    label,
    required = false,
    disabled = false
}: RadioGroupInterface) => {
    const {
        control,
    } = useFormContext();

    return (
        <Box>
            <Text required={required} className='mb-0 font-inter font-semibold !text-[14px] !md:text-[14px]'>{label}</Text>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <RdGroup
                        {...field}
                        row
                        onChange={(e) => {
                            field.onChange(e.target.value);

                            if (onChange) {
                                onChange(e.target.value);
                            }
                        }}
                        className='flex flex-row gap-[4px]'
                    >
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Radio disabled={disabled} />}
                                label={option.label}
                                value={option.value}
                                className='mr-2'
                            />
                        ))}
                    </RdGroup>
                )}
            />
        </Box>
    );
};

export default RadioGroupControl;