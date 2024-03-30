import { UIDefaultInterface } from "..";

const Row = ({ children, className = "", ...props }: UIDefaultInterface) => {
    return (
        <section className={className} {...props}>
            {children}
        </section>
    )
}

export default Row;