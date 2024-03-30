'use client'

import React from 'react';
import { Box } from '@mui/material';
import Select from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';

import { UIDefaultInterface, Text } from '..';

interface SelectInterface extends UIDefaultInterface {
    name: string
    label: string,
    required?: boolean,
    placeholder: string,
    options: any[],
    isLoading?: boolean,
    rules?: any,
    defaultValue?: any,
    renderOption?: any,
    noOptionsText?: any,
    creatable?: any,
    noOptionsComponent?: any,
    multiSelect?: any
    selectedValue?: any
}

export interface PayloadSelectOptions extends UIDefaultInterface {
    value: string
    label: string
}


const MultiSelectLabelControl = ({
    name,
    label = '',
    required = false,
    placeholder = '',
    options = [],
    rules = undefined,
    defaultValue = undefined,
    isLoading = false,
    ...props
}: SelectInterface) => {
    const [selected, setVal] = React.useState<any>([]);
    const [list, setList] = React.useState<any[]>([]);
    const {
        control,
        formState: { errors },
    } = useFormContext();

    React.useEffect(() => {
        setList(options);
    }, [options]);

    React.useEffect(() => {
        if (defaultValue) {
            setVal(defaultValue);
        }

    }, [defaultValue]);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue ?? []}
            render={({ field: { onChange } }) => (
                <Box>
                    <Text required={required} className='font-semibold !text-[14px] !md:text-[14px] mb-2'>{label}</Text>
                    <Select
                        defaultValue={defaultValue}
                        isMulti
                        name={name}
                        placeholder={<Text className='text-[14px] text-gray-300'>{placeholder}</Text>}
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selectedOptions) => onChange(selectedOptions.map((option) => option.value))}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? 'grey' : 'red',
                                fontSize: 16,
                                fontFamily: 'Space Grotesk',
                            }),
                            menuPortal: provided => ({ ...provided, zIndex: 9999 }),
                            menu: provided => ({ ...provided, zIndex: 9999 })
                        }}
                        menuPortalTarget={document.body}
                        menuPosition='fixed'
                    />
                </Box>
            )}
        />
    );
}

export default MultiSelectLabelControl;