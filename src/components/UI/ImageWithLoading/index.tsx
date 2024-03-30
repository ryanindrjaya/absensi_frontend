import React from 'react';
import { Avatar, Skeleton } from '@mui/material';

interface ImageWithLoadingInterface {
    src: string,
    alt?: string,
    className?: string,
    skeletonClassName?: string,
    variant?: 'square' | 'circular' | 'rounded'
    sx?: any
    styleImage?: any
}

const ImageWithLoading = ({
    src,
    alt = 'Loaded',
    className = '',
    skeletonClassName = '',
    variant = 'square',
    styleImage = {},
    ...props
}: ImageWithLoadingInterface) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [source, setSource] = React.useState('');
    const masterVariant = {
        'square': 'rectangular',
        'circular': 'circular',
        'rounded': 'rounded'
    };
    const variantSkeleton = masterVariant[variant] as 'rectangular' | 'circular' | 'rounded';

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    React.useEffect(() => {
        setSource(src);
        handleImageLoad();
    }, [src]);

    return (
        <div>
            {!imageLoaded && <Skeleton variant={variantSkeleton} className={`${className} ${skeletonClassName} z-[9999]`} {...props} />}
            <Avatar
                variant={variant}
                src={source}
                alt={alt}
                onLoad={handleImageLoad}
                className={className}
                style={{
                    display: imageLoaded ? 'block' : 'none',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.5s',
                }}
                imgProps={{ style: styleImage, src: source }}
                {...props}
            />
        </div>
    );
}

export default ImageWithLoading;
