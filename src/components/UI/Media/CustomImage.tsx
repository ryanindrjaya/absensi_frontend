import NextImage, { ImageProps } from 'next/image';

// TODO: load from config not from .env to centralize
// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();

interface CustomImageProps extends ImageProps {
  // Add any additional props specific to your CustomImage component
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...rest }) => {
  // Add your basePath logic here
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''; // Replace with your actual basePath

  // Combine basePath with the original src
  const fullPath = `${basePath}${src}`;

  return <NextImage src={fullPath} alt={alt} {...rest} />;
};

export default CustomImage;