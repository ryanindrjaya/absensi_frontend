import { useMediaQuery } from '@mui/material';
import { UIDefaultInterface } from '..';

const MobileView = ({ children, className = '', ...props }: UIDefaultInterface) => {
    const isMobile = useMediaQuery('(max-width: 900px)');

    return (
        isMobile ? (
            <section className={className} {...props}>
                {children}
            </section>
        ) : ''
    );
};

export default MobileView;