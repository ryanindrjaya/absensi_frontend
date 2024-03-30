'use client';

import * as React from 'react';
import DatePicker, { DateObject } from "react-multi-date-picker"
import { Controller, useFormContext } from 'react-hook-form';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';

type IFormInputProps = {
    name: string;
    onChange?: any;
    maxDate?: any;
    defaultValue?: any;
} & TextFieldProps;

const DateRangePickerControl = ({
    label,
    required = false,
    placeholder = 'Start Date - End Date',
    className = '',
    defaultValue = '',
    name = '',
    maxDate = undefined,
    onChange = undefined
}: IFormInputProps) => {
    const datePickerRef = React.useRef();
    const [isVisible, setIsVisible] = React.useState(false);
    const [dates, setDates] = React.useState<any>([
        new DateObject().setDay(0),
        new DateObject().setDay(0)
    ]);

    React.useEffect(() => {
        if (defaultValue?.startDate && defaultValue?.endDate) {
            setDates([
                new DateObject(defaultValue?.startDate),
                new DateObject(defaultValue?.endDate)
            ]);
        }
    }, [defaultValue]);

    const {
        control,
        setValue,
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: true }}
            defaultValue={defaultValue}
            render={({
                field: { name },
                formState: { errors },
            }) => (
                <>
                    <DatePicker
                        ref={datePickerRef}
                        value={defaultValue}
                        onOpen={() => setIsVisible(true)}
                        onClose={() => setIsVisible(false)}
                        onChange={(objDates: any) => {
                            if (objDates?.[0] && objDates?.[1]) {
                                const date = {
                                    startDate: objDates?.[0].format('YYYY-MM-DD'),
                                    endDate: objDates?.[1].format('YYYY-MM-DD')
                                };

                                setDates(date);
                                // setValue(name, date);

                                if (onChange) {
                                    onChange(date);
                                }

                                (datePickerRef.current as any).closeCalendar();
                            }
                        }}
                        weekDays={["S", "M", "T", "W", "T", "F", "S"]}
                        range
                        dateSeparator=' - '
                        format={'DD/MM/YYYY'}
                        numberOfMonths={2}
                        showOtherDays
                        maxDate={maxDate}
                        render={<CustomInput placeholder={placeholder} className={className} defaultValue={defaultValue} onClick={() => {
                            if (datePickerRef?.current) {
                                if (isVisible) {
                                    (datePickerRef.current as any).closeCalendar();
                                } else {
                                    (datePickerRef.current as any).openCalendar();
                                }
                            }
                        }} />}
                    />
                    {errors && errors?.[name] && errors?.[name]?.type === "required" && (
                        <span>{name} is required</span>
                    )}
                </>
            )}
        />
    );
};

function CustomInput({ onFocus, value, onChange, placeholder, className, defaultValue, onClick }: any) {
    return (
        <TextField
            onFocus={onFocus}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full ${className}`}
            defaultValue={defaultValue}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="start"
                            onClick={onClick}
                        >
                            <DateRangeRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default DateRangePickerControl;