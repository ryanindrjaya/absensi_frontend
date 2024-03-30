'use client';

import React from 'react';
import { Autocomplete, Box, CircularProgress, Popper, TextField, createFilterOptions } from '@mui/material';
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
    creatable?: boolean,
    noOptionsComponent?: any,
    multiSelect?: boolean,
    selectedValue?: any,
    disabled?: boolean
}

export interface PayloadSelectOptions extends UIDefaultInterface {
    value: string
    label: string
}

const filter = createFilterOptions<any>();

const SelectLabelControl = ({
    name,
    label = '',
    required = false,
    placeholder = '',
    options = [],
    rules = undefined,
    defaultValue = undefined,
    isLoading = false,
    renderOption = undefined,
    noOptionsText = undefined,
    noOptionsComponent = undefined,
    creatable = false,
    multiSelect = false,
    selectedValue = [],
    disabled = false,
    ...props
}: SelectInterface) => {
    const [val, setVal] = React.useState<any>(selectedValue);
    const [list, setList] = React.useState<any[]>([]);
    const [isAutocompleteOpen, setIsAutocompleteOpen] = React.useState(false);
    const [_, setPopperStyle] = React.useState<number>();
    const autocompleteRef = React.useRef(null);
    const popperRef = React.useRef<HTMLDivElement | null>(null);
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const isInMuiModal = () => {
        const modalContainer = document.querySelector('.MuiDialog-container');
        const autocompleteElement = autocompleteRef.current;

        if (isAutocompleteOpen && modalContainer && autocompleteElement) {
            return modalContainer.contains(autocompleteElement);
        }

        return false;
    };

    React.useEffect(() => {
        setList(options);
    }, [options]);

    React.useEffect(() => {
        if (defaultValue && creatable) {
            setVal(defaultValue);
        } else if (defaultValue && multiSelect) {
            setVal(defaultValue);
        }
    }, [defaultValue]);


    React.useEffect(() => {
        const handleResize = () => {
            if (popperRef.current) {
                const popperWidth = popperRef.current.offsetWidth;
                setPopperStyle(popperWidth);
            }
        };

        window.addEventListener('resize', handleResize);

    }, []);

    const renderAutocomplete = (onChange: any, value: any) => {
        return (
            <>
                {
                    multiSelect ? renderMultiAutoComplete(onChange) : renderSingleAutoComplete(onChange, value)
                }
            </>
        )
    };

    const renderSingleAutoComplete = (onChange: any, value: any) => {

        return (
            <Autocomplete
                onOpen={() => setIsAutocompleteOpen(true)}
                onClose={() => setIsAutocompleteOpen(false)}
                ref={autocompleteRef}
                id={name}
                options={list}
                value={list.find((option) => option.value == value) || null}
                renderOption={(props, option) => (
                    <Box {...props} key={option?.value + Math.random()} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                        {list.length === 0 || option.newOption ? renderNotFoundLabel() : option.label}
                    </Box>
                )}
                noOptionsText={noOptionsText ?? undefined}
                disabled={disabled}
                onChange={(_, newValue) => {
                    onChange(newValue?.value ?? null);

                    if (props.onChange) {
                        props.onChange(newValue);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors[name]}
                        autoComplete='off'
                        name={name}
                        id={name}
                        helperText={(errors[name]?.message ?? '').toString()}
                        InputProps={{
                            ...params.InputProps,
                            disabled: disabled,
                            autoComplete: 'off',
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
                PopperComponent={(props) => (
                    <div ref={(node) => {
                        popperRef.current = node;
                    }}>
                        <Popper  {...props} style={{ zIndex: isAutocompleteOpen && !isInMuiModal() ? 0 : '1400 !important', width: props.style?.width }} />
                    </div>
                )}
            />
        );
    };

    const renderMultiAutoComplete = (onChange: any) => {
        return (
            <Autocomplete
                onOpen={() => setIsAutocompleteOpen(true)}
                onClose={() => setIsAutocompleteOpen(false)}
                ref={autocompleteRef}
                id={name}
                options={list}
                value={val}
                renderOption={(props, option) => (
                    <Box {...props} key={option?.value + Math.random()} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                        {list.length === 0 || option.newOption ? renderNotFoundLabel() : option.label}
                    </Box>
                )}
                noOptionsText={noOptionsText ?? undefined}
                disabled={disabled}
                multiple
                renderTags={() => []}
                isOptionEqualToValue={(option, value) =>
                    !option?.newOption && option?.value == value?.value
                }
                onChange={(_, newValue) => {
                    onChange(newValue);

                    if (props.onChange) {
                        props.onChange(newValue as any);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors[name]}
                        autoComplete='off'
                        name={name}
                        id={name}
                        helperText={(errors[name]?.message ?? '').toString()}
                        InputProps={{
                            ...params.InputProps,
                            disabled: disabled,
                            autoComplete: 'off',
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
                PopperComponent={(props) => (
                    <div ref={(node) => {
                        popperRef.current = node;
                    }}>
                        <Popper {...props} style={{ zIndex: isAutocompleteOpen && !isInMuiModal() ? 0 : '1400 !important', width: props.style?.width }} />
                    </div>
                )}
            />
        );
    };

    const renderNotFoundLabel = () => {
        return (
            <>
                {noOptionsComponent ? noOptionsComponent() : 'Add'}
            </>
        )
    };

    const renderCreatable = (onChange: any) => {
        return multiSelect ? multiCreatable(onChange) : singleCreatable(onChange);
    };

    const singleCreatable = (onChange: any) => {
        return (
            <Autocomplete
                onOpen={() => setIsAutocompleteOpen(true)}
                onClose={() => setIsAutocompleteOpen(false)}
                ref={autocompleteRef}
                id={name}
                multiple={false}
                options={list}
                disabled={disabled}
                value={val}
                freeSolo
                autoHighlight
                selectOnFocus
                clearOnBlur
                forcePopupIcon
                onChange={(_, newValue) => {
                    onChange(newValue);
                    setVal(newValue);

                    if (props.onChange) {
                        props.onChange(newValue as any);
                    }
                }}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }

                    // Regular option
                    return option?.label ?? '';
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue.toLowerCase() === (option.value ?? '').toLowerCase());
                    if (inputValue !== '' && filtered.length === 0 && !isExisting) {
                        filtered.push({
                            value: '',
                            label: inputValue,
                            newOption: true,
                        });
                    }

                    return filtered;
                }}
                renderOption={(props, option) => (
                    <Box {...props} key={option?.value + Math.random()} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                        {list.length === 0 || option.newOption ? renderNotFoundLabel() : option.label}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors[name]}
                        autoComplete='off'
                        helperText={(errors[name]?.message ?? '').toString()}
                        name={name}
                        InputProps={{
                            ...params.InputProps,
                            disabled: disabled,
                            autoComplete: 'off',
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                            onKeyDown: (e) => {
                                const value = e.currentTarget?.value ?? ''
                                if (e.key === 'Escape') {
                                    e.stopPropagation();
                                }

                                if (value === '' && e.key === 'Backspace') {
                                    e.stopPropagation();
                                }
                            },
                        }}
                    />
                )}
                PopperComponent={(props) => (
                    <div>
                        <Popper {...props} style={{ zIndex: isAutocompleteOpen && !isInMuiModal() ? 0 : '1400 !important', width: props.style?.width }} />
                    </div>
                )}
            />
        )
    };

    const multiCreatable = (onChange: any) => {
        return (
            <Autocomplete
                onOpen={() => setIsAutocompleteOpen(true)}
                onClose={() => setIsAutocompleteOpen(false)}
                ref={autocompleteRef}
                id={name}
                multiple
                options={list}
                disabled={disabled}
                value={selectedValue}
                freeSolo
                autoHighlight
                filterSelectedOptions
                disableClearable
                renderTags={() => []}
                onChange={(_, newValue) => {
                    onChange(newValue);
                    setVal(newValue);

                    if (props.onChange) {
                        props.onChange(selectedValue);
                    }
                }}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }

                    // Regular option
                    return option?.label ?? '-';
                }}
                isOptionEqualToValue={(option, value) =>
                    !option?.newOption && option?.value == value?.value
                }
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;

                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue.toLowerCase() === (option.value ?? '').toLowerCase());
                    if (inputValue !== '' && filtered.length === 0 && !isExisting) {
                        filtered.push({
                            value: 0,
                            label: inputValue,
                            newOption: true,
                        });
                    }

                    return filtered;
                }}
                renderOption={(props, option) => (
                    <Box {...props} key={option?.value + Math.random()} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                        {list.length === 0 || option.newOption ? renderNotFoundLabel() : option.label}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors[name]}
                        autoComplete='off'
                        helperText={(errors[name]?.message ?? '').toString()}
                        name={name}
                        InputProps={{
                            ...params.InputProps,
                            disabled: disabled,
                            autoComplete: 'off',
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                            onKeyDown: (e) => {
                                const value = e.currentTarget?.value ?? ''
                                if (e.key === 'Escape') {
                                    e.stopPropagation();
                                }

                                if (value === '' && e.key === 'Backspace') {
                                    e.stopPropagation();
                                }
                            },
                        }}
                    />
                )}
                PopperComponent={(props) => (
                    <div ref={(node) => {
                        popperRef.current = node;
                    }}>
                        <Popper {...props} style={{ zIndex: isAutocompleteOpen && !isInMuiModal() ? 0 : '1400 !important', width: props.style?.width }} />
                    </div>
                )}
            />
        )
    };

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue ?? ''}
            render={({ field: { onChange, value } }) => (
                <Box>
                    <Text required={required} className='font-semibold !text-[14px] !md:text-[14px] mb-2'>{label}</Text>
                    {creatable ? renderCreatable(onChange) : renderAutocomplete(onChange, value)}
                </Box>
            )}
        />
    );
}

export default SelectLabelControl;