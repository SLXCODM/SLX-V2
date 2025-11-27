import { useEffect } from 'react';

interface AdSenseUnitProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle' | 'fluid';
  style?: React.CSSProperties;
  className?: string;
}

export function AdSenseUnit({ 
  slot, 
  format = 'auto',
  style = {},
  className = ''
}: AdSenseUnitProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.debug('AdSense error:', error);
    }
  }, [slot]);

  return (
    <div className={`my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style,
        }}
        data-ad-client="ca-pub-2053964731459379"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
