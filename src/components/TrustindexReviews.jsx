import { useEffect, useRef } from 'react';

export default function TrustindexReviews() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || ref.current.childElementCount) return;
    const s = document.createElement('script');
    s.src = 'https://cdn.trustindex.io/loader.js?ac0819677502726ad3467697459';
    s.defer = true;
    s.async = true;
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} style={{ minHeight: 220 }} />;
}