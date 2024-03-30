import { useMediaQuery } from "@mui/material";

const useScreenDetector = () => {
    const isMobileScreen = useMediaQuery('(max-width: 600px)');
    const isTabletScreen = useMediaQuery('(max-width: 900px)');
    const isDesktopScreen = useMediaQuery('(min-width: 901px)');

    const isMobile = () => {
        return isMobileScreen;
    };

    const isTablet = () => {
        return isTabletScreen;
    };


    const isDesktop = () => {
        return isDesktopScreen;
    };

    return { isMobile, isTablet, isDesktop };
};

export default useScreenDetector;
