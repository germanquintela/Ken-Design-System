import Image from 'next/image';
import { Box, Card } from '@ken/react';
import { BLUR_PLACEHOLDER } from '@/lib/blurPlaceholder';

/** A full-width image clipped to a Card surface — the hero and any in-section
 *  illustration share this so images look the same everywhere. */
export function DocImage({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <Box width="full">
      <Card>
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
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
