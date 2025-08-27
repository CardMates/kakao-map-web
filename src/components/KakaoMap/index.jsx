import React, { useEffect, useRef } from 'react';
import useKakaoLoader from './useKakaoLoader';

const KAKAO_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;

export default function KakaoMap({
    initialCenter = { lat: 37.5665, lng: 126.9780 },
    level = 3
}) {
    const containerRef = useRef(null);
    const loaded = useKakaoLoader(KAKAO_KEY);

    const mapRef = useRef(null);
    const markerRef = useRef(null);


    useEffect(() => {
        if (!loaded || !window.kakao || !containerRef.current) return;

        window.kakao.maps.load(() => {
            const params = new URLSearchParams(window.location.search);
            const lat = parseFloat(params.get('lat')) || 37.5665;
            const lng = parseFloat(params.get('lng')) || 126.9780;

            const map = new window.kakao.maps.Map(containerRef.current, {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3
            });
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng)
            });
            marker.setMap(map);

            mapRef.current = map;
            markerRef.current = marker;

            window.moveToCurrentLocation = (lat, lng) => {
                if (!mapRef.current || !markerRef.current) return;
                const position = new window.kakao.maps.LatLng(lat, lng);
                mapRef.current.setCenter(position);
                markerRef.current.setPosition(position);
            };

            if (window.ReactNativeWebView?.postMessage) {
                window.ReactNativeWebView.postMessage('READY');
            } else {
                console.log('[KakaoMap] READY');
            }
        });
    }, [loaded]);


    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}