'use client';

import { UIDefaultInterface } from "..";

const Col = ({ children, className = "", ...props }: UIDefaultInterface) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

export default Col;