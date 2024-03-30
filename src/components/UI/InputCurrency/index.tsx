'use client';

import { Box, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Text } from '..';

const InputCurrencyControl = ({
    label = '',
    required = false,
    placeholder = '',
    className = '',
    defaultValue = '',
    name = '',
    rules = undefined,
    onValueChange = undefined as any,
    isAllowed = true,
    isScore = false,
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
                        required={required}
                        className='font-semibold text-[14px] md:text-[14px] mb-2'
                    >
                        {label}
                    </Text>
                    <NumericFormat
                        variant="outlined"
                        fullWidth
                        customInput={TextField}
                        allowNegative={false} // To disallow negative numbers
                        decimalSeparator={','}
                        thousandSeparator={'.'} // Use a thousand separator
                        error={!!errors[name]}
                        helperText={(errors[name]?.message ?? '').toString()}
                        onValueChange={(values) => {
                            const { value } = values;
                            onChange(value);

                            if (onValueChange) {
                                onValueChange(value);
                            }
                        }}
                        isAllowed={(values) => {
                            const { floatValue } = values
                            if (!isScore) {
                                return true
                            }
                            else if (isScore && floatValue as number <= 100 || floatValue === undefined) {
                                return true
                            } else {
                                return false
                            }
                        }}
                        defaultValue={value}
                        placeholder={placeholder}
                        name={name}
                        id={name}
                        {...props}
                    />
                </Box>
            )}
        />
    );
};

export default InputCurrencyControl;