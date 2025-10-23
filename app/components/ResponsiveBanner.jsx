'use client';
import Image from 'next/image';

export default function ResponsiveBanner({
  desktopSrc,
  mobileSrc,
  altText,
  heightClass = 'max-h-[50vh]',
  bgColor = 'bg-primaryGray',
}) {
  return (
    <div className={`min-h-40 ${bgColor}`}>
      {/* Desktop Banner */}
      <Image
        height={1080}
        width={1920}
        src={desktopSrc}
        alt={altText}
        className={`object-cover w-full h-full ${heightClass} hidden sm:block`}
        priority
      />

      {/* Mobile Banner */}
      <Image
        height={1920}
        width={500}
        src={mobileSrc}
        alt={altText}
        className={`object-cover w-full h-full min-h-[50vh] sm:hidden`}
        priority
      />
    </div>
  );
}
