import { createTheme } from '@mui/material/styles';

const material = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            light: '#373645',
            main: '#373645',
            dark: '#373645',
            contrastText: '#fff',
        },
        secondary: {
            light: '#FC8383',
            main: '#FC8383',
            dark: '#FC8383',
            contrastText: '#000',
        }
    },
    typography: {
        fontFamily: 'initial',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'initial'
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#D9D9D9'
                },
                bar: {
                    borderRadius: '8px'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '4px 8px 20px -8px #00000026',
                    marginTop: '0px',
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    boxShadow: '4px 8px 20px -8px #00000026',
                    borderRadius: '12px',
                    border: '1px solid #f3f3f3',
                    padding: '16px',
                    '&.MuiCardContent-root:last-child': {
                        paddingBottom: 16
                    }
                }
            }
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'lg'
            },
            styleOverrides: {
                maxWidthLg: {
                    maxWidth: '1360px !important'
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    height: '0.5px'
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    '& .MuiPaper-root': {
                        borderRadius: '12px'
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    background: '#121212',
                    color: '#fff',
                    fontWeight: 400,
                    fontFamily: 'Space Grotesk'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                size: 'small'
            },
            styleOverrides: {
                root: {
                    textTransform: 'inherit'
                },
                sizeMedium: {
                    fontSize: '16px',
                    fontWeight: '700',
                    padding: '7px 16px',
                    lineHeight: 'unset'
                },
                outlined: {
                    borderRadius: '8px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    minWidth: 'auto',
                    fontWeight: '600',
                    '&:disabled': {
                        backgroundColor: '#fff',
                        borderColor: '#B5B5B5',
                        color: '#B5B5B5'
                    }
                },
                contained: {
                    borderRadius: '8px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    minWidth: 'auto',
                    boxShadow: 'none',
                    fontWeight: '600',
                    '&:disabled': {
                        backgroundColor: '#B5B5B5',
                        color: '#FFFFFF'
                    }
                },
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    '& .MuiTypography-root': {
                        fontSize: '14px'
                    },
                },
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                option: {
                    fontSize: '14px'
                },
                root: {
                    '& .MuiAutocomplete-root.MuiAutocomplete-hasClearIcon .MuiInputBase-input.MuiOutlinedInput-input': {
                        paddingTop: '0px !important',
                        paddingBottom: '0px !important',
                        borderRadius: '8px !important',
                        '& > fieldset': {
                            borderColor: '#000',
                            ':focus': {
                                borderColor: 'blue',
                            },
                        },
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                autoComplete: ''
            },
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        minHeight: '44px',
                        fontSize: '14px',
                        '& > fieldset': {
                            borderColor: '#000',
                            ':focus': {
                                borderColor: 'blue',
                            },
                        },
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused': {
                        '& > fieldset': {
                            border: '1px solid #E86124',
                        },
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-error': {
                        '& > fieldset': {
                            border: '1px solid #FF0000',
                        },
                    },
                    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-disabled': {
                        background: '#F9F6F6'
                    },
                    input: {
                        padding: '10px 12px',
                        fontSize: '14px'
                    }
                },
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginLeft: '0px',
                    '&.Mui-error': {
                        color: '#FF0000'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {}
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    '& .MuiTouchRipple-root': {
                        borderBottom: '1.5px solid #dddddd'
                    }
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    minWidth: '200px'
                }
            }
        },
    },
});

export default material;