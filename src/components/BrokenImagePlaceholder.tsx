import { useState } from 'react';
import placeholderImage from '../assets/photoPlaceholder.jpg';

interface ImgProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const Img = ({ src, alt, fallbackSrc = placeholderImage, className }: ImgProps) => {
  const [isBroken, setIsBroken] = useState<boolean>(false);

  const handleError = () => setIsBroken(true);

  return isBroken ? (
    <img src={fallbackSrc} alt={alt} className={className} />
  ) : (
    <img src={src} alt={alt} onError={handleError} className={className} />
  );
};

export default Img;