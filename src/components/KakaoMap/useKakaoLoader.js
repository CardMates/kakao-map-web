import { useEffect, useState } from 'react';

export default function useKakaoLoader(apiKey) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!apiKey) return;
        if (window.kakao) { setLoaded(true); return; }

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.async = true;
        script.onload = () => setLoaded(true);
        script.onerror = () => console.error('Kakao Maps SDK load failed');

        document.head.appendChild(script);
    }, [apiKey]);

    return loaded;
}
