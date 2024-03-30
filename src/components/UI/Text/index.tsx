import Typography from "@mui/material/Typography";
import { UIDefaultInterface } from "..";

interface TextInterface extends UIDefaultInterface {
    required?: boolean,
    as?: any,
    variant?: string
}

const Text = ({
    as = "p",
    children,
    className = "",
    required = false,
    color = "",
}: TextInterface) => {
    return (
        <Typography
            component={as}
            color={color.length > 0 ? color : undefined}
            className={`text-[#121212] ${required ? "required" : ""} ${className}`}
        >
            {children}
        </Typography>
    )
}

export default Text;