import * as React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment, TextField } from '@mui/material';

import Text from '../Text';
import Col from '../Col';

const InputPassword = ({ label, required = false, placeholder = '', ...props }: any) => {
    const [show, setShow] = React.useState(false);

    return (
        <Col>
            <Text
                required={required}
                className='font-semibold text-[14px] md:text-[14px] mb-2'
            >
                {label}
            </Text>
            <Col className='relative mt-2 rounded-md shadow-sm'>
                <TextField
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    onKeyUp={props.onKeyUp}
                    variant='outlined'
                    fullWidth
                    size='small'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position={'end'}>
                                {show ? (
                                    <VisibilityIcon onClick={() => setShow(!show)} />
                                ) : (
                                    <VisibilityOffIcon onClick={() => setShow(!show)} />
                                )}
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            height: '44px',
                            fontSize: '14px',
                            fontFamily: 'Inter',
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
    )
}

export default InputPassword;