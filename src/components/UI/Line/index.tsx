import { UIDefaultInterface } from "..";

const Line = ({ className = "" }: UIDefaultInterface) => {
    return (
        <hr className={`my-4 ${className}`} />
    )
}

export default Line;