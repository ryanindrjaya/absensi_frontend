import { Button } from "@mui/material"

const ButtonRounded = ({ ...props }: any) => {
    return (
        <Button {...props} style={{ borderRadius: '24px' }}>
            {props.children}
        </Button>
    );
};

export default ButtonRounded;