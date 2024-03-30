import { UIDefaultInterface } from "..";

interface LinkInterface extends UIDefaultInterface {
    to: string
}

const Link = ({
    to = "#",
    children,
    className = ""
}: LinkInterface) => {
    return (
        <a href={to} className={`font-inter ${className}`}>
            {children}
        </a>
    )
}

export default Link;