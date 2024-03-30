import * as React from 'react';
import { TextField } from '@mui/material';
 
import { UIDefaultInterface, Text, Col } from "..";

interface TextAreaLabelInterface extends UIDefaultInterface {
    label: string,
    required?: boolean,
    maxLength?: number,
    placeholder?: string
}

const TextAreaLabel = ({
    label,
    required = false,
    placeholder = "",
    maxLength = 0,
    ...props
}: TextAreaLabelInterface) => {
    const [counter, setCounter] = React.useState(0);
    const handleChange = (e: any) => {
        let val = e.target.value;

        if (maxLength > 0 && val.length >= maxLength) {
            val = val.slice(0, maxLength);
        }

        setCounter(val.length);
        if (props.onChange) {
            props.onChange(val)
        }
    }

    return (
        <Col className="relative">
            <Text required={required} className="font-semibold text-[14px] md:text-[14px] mb-2">{label}</Text>
            <TextField
                placeholder={placeholder}
                onKeyUp={handleChange}
                variant="outlined"
                fullWidth
                size="small"
                multiline
                rows={4}
                sx={{
                    "& .MuiInputBase-root.MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        fontSize: "14px",
                        "& > fieldset": {
                            borderColor: "#000",
                            ":focus": {
                                borderColor: "blue"
                            }
                        },
                    },
                    "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                            border: "1px solid #E86124",
                        },
                    }
                }}
            />
            {(maxLength > 0) ? <Text className="absolute right-2 bottom-2 text-xs">{counter} / {maxLength}</Text> : ""}
        </Col>
    )
}

export default TextAreaLabel;