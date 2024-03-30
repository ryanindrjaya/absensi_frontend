import { FormControlLabel, Switch } from "@mui/material";
import React, { ChangeEvent } from 'react';

interface SwitchControlInterface {
    name?: string,
    defaultValue: boolean,
    onStatusChange?: any,
    label?: string,
    disabled?: boolean,
    onClick?: any,
    changeOnClick?: boolean
}

const SwitchLabel = ({
    defaultValue = false,
    onStatusChange = undefined,
    onClick = undefined,
    label = '',
    disabled = false,
    changeOnClick = true,
}: SwitchControlInterface) => {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <FormControlLabel
            control={
                <Switch
                    disabled={disabled}
                    checked={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (changeOnClick) {
                            setValue(e.target.checked);
                        }

                        if (onStatusChange) {
                            onStatusChange(e);
                        }
                    }}
                    onClick={(e) => {
                        if (onClick) {
                            onClick(e);
                        }
                    }}
                />
            }
            label={label}
            sx={{
                '&.MuiFormControlLabel': {
                    fontSize: '14px',
                    marginRight: '0px',
                },
                '&.MuiFormControlLabel-root': {
                    marginRight: '0px',
                },
                '& .MuiSwitch-switchBase': {
                    '&.Mui-checked': {
                        '& + .MuiSwitch-track': {
                            backgroundColor: '#DEDEDE',
                            width: '38px'
                        }
                    },
                    '&.MuiSwitch-track': {
                        borderRadius: '10px'
                    }
                },
                '& .MuiSwitch-root': {
                    padding: '10px'
                },
                '& .MuiSwitch-track': {
                    borderRadius: '10px',
                    width: '38px'
                }
            }}
        />
    );
};

export default SwitchLabel;