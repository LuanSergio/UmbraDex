/* eslint-disable react/jsx-props-no-spreading */
import NextImage, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import substitutePlaceholder from 'src/constants/substitutePlaceholder';

interface PokemonPictureProps extends Omit<ImageProps, 'src'> {
  src: string;
}

const PokemonPicture = ({
  src,
  ...props
}: PokemonPictureProps): JSX.Element => {
  const [url, setUrl] = useState(substitutePlaceholder);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setUrl(img.src);
  }, [src]);

  return <NextImage unoptimized src={url} {...props} />;
};

export default PokemonPicture;
