/* eslint-disable react/jsx-props-no-spreading */
import NextImage, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import substitutePlaceholder from '@data/substitutePlaceholder';

interface IPokemonPictureProps extends Omit<ImageProps, 'src'> {
  src: string;
}

const PokemonPicture = ({
  src,
  ...props
}: IPokemonPictureProps): JSX.Element => {
  const [url, setUrl] = useState(substitutePlaceholder);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setUrl(img.src);
  }, [src]);

  return <NextImage src={url} {...props} />;
};

export default PokemonPicture;
