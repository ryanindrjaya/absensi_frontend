import { Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Col, Row } from '@absensi/components/UI';
import { useFormContext } from 'react-hook-form';

interface SelectedValueInterface {
    selected: any[]
    className: string
    keyValue?: string
    onRemove: any,
    disabled?: boolean
}

const SelectedValue = ({
    selected,
    onRemove,
    keyValue = 'label',
    className = '',
    disabled
}: SelectedValueInterface) => {
    const customClass = `flex flex-wrap gap-2 mt-4 max-w-full md:mx-auto ${className}`;
    const { trigger } = useFormContext()
    return (
        <Row className={customClass}>
            {selected?.map((item, index) => (
                <Col key={`selected-${index}`} className='relative'>
                    <Chip
                        disabled={disabled}
                        variant='outlined'
                        label={item[keyValue] ?? '-'}
                        size='small'
                        className='rounded-full p-[4px] text-[12px] no-uppercase border-gray-900 font-semibold'
                        deleteIcon={<CloseIcon sx={{ color: 'black' }} />}
                        onDelete={() => {
                            onRemove(index)
                            trigger()
                        }}
                        sx={{
                            '& .MuiChip-outlined': {
                                '& .MuiChip-deleteIcon': {
                                    color: 'black'
                                }
                            },
                            '& .MuiChip-deleteIcon': {
                                color: 'black'
                            },
                        }}
                    />
                </Col>
            ))}
        </Row>
    )
}

export default SelectedValue;