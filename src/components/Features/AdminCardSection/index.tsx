import { Card, CardContent } from "@mui/material"

export interface AdminCardSectionInterface {
    maxWidth?: number | string
    radius?: number,
    children: any,
    className?: string
}

const AdminCardSection = ({
    maxWidth = '',
    radius = 16,
    className = '',
    children
}: AdminCardSectionInterface) => {
    return (
        <Card className={`${maxWidth !== '' ? `max-w-[${maxWidth}px]` : ''} w-full rounded-[${radius}px] shadow-none ${className}`}>
            <CardContent className={`m-auto rounded-[${radius}px] shadow-none ${className}`}>
                {children}
            </CardContent>
        </Card>
    )
};

export default AdminCardSection;