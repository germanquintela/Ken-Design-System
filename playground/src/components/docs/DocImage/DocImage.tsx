import Image from 'next/image';
import { Box, Card } from '@ken/react';
import { BLUR_PLACEHOLDER } from '@/lib/blurPlaceholder';

/** A full-width image clipped to a Card surface — the hero and any in-section
 *  illustration share this so images look the same everywhere. */
export function DocImage({
  src,
  alt = '',
  width = 1918,
  height = 917,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Box width="full">
      <Card>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Card>
    </Box>
  );
}
