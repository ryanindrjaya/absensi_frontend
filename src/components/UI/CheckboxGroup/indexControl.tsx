'use client';

import { Box, Checkbox, FormControlLabel, RadioGroup as RdGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { Text } from '..';

interface OptionsInterface {
    value: string | number,
    label: string
}

interface RadioGroupInterface {
    name: string,
    defaultValue: number[],
    options?: OptionsInterface[],
    onChange?: any,
    label: string,
    required?: boolean,
    disabled?: boolean
}

const CheckBoxGroupControl = ({
    name,
    defaultValue = [],
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
            <Text required={required} className='mb-2 font-inter font-semibold !text-[14px] !md:text-[14px]'>{label}</Text>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <RdGroup
                        row
                        // onChange={(e) => {
                        //     field.onChange(e.target.value);

                        //     field.onChange(selectedArray);
                        //     if (onChange) {
                        //         onChange()
                        //     }
                        // }}
                        className='flex flex-row gap-[4px]'
                    >
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                {...field}
                                control={
                                    <Checkbox
                                        onChange={(e) => {
                                            const selectedValue = option.value;
                                            const currentValues = field.value || [];

                                            if (currentValues.includes(selectedValue)) {
                                                // Hapus nilai dari array jika checkbox dicentang
                                                const updatedValues = currentValues.filter((value: any) => value !== selectedValue);
                                                onChange(updatedValues);
                                            } else {
                                                // Tambahkan nilai ke dalam array jika checkbox tidak dicentang
                                                const updatedValues = [...currentValues, selectedValue];

                                                onChange(updatedValues);
                                            }
                                        }}
                                        checked={field.value && field.value.includes(parseInt(option.value as string))}
                                        disabled={disabled}
                                    />
                                }
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

export default CheckBoxGroupControl;