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
    const currentMarkerRef = useRef(null);

    useEffect(() => {
        if (!loaded || !window.kakao || !containerRef.current) return;

        window.kakao.maps.load(() => {
            const params = new URLSearchParams(window.location.search);
            const lat = parseFloat(params.get('lat')) || initialCenter.lat;
            const lng = parseFloat(params.get('lng')) || initialCenter.lng;

            const map = new window.kakao.maps.Map(containerRef.current, {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: level
            });
            mapRef.current = map;

            // 현재 위치 마커 (빨간색)
            const currentMarkerImage = new window.kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                new window.kakao.maps.Size(35, 35)
            );
            const currentMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
                map: map,
                image: currentMarkerImage
            });
            currentMarkerRef.current = currentMarker;

            // React Native에서 pins 데이터를 내려주는 경우
            window.setPins = (pins) => {
                // pins: [{ id: 1, lat: 37.56, lng: 126.97 }, ...]

                // 매장 pin (파란색)
                const markerImage = new window.kakao.maps.MarkerImage(
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_blue.png",
                    new window.kakao.maps.Size(24, 35)
                );

                pins.forEach((pin) => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(pin.lat, pin.lng),
                        map: map,
                        image: markerImage
                    });

                    // marker 클릭 시 React Native로 이벤트 전달
                    window.kakao.maps.event.addListener(marker, 'click', () => {
                        if (window.ReactNativeWebView?.postMessage) {
                            window.ReactNativeWebView.postMessage(
                                JSON.stringify({ type: 'PIN_CLICK', payload: pin })
                            );
                        } else {
                            console.log('[KakaoMap] PIN_CLICK', pin);
                        }
                    });
                });
            };

            window.moveToCurrentLocation = (lat, lng) => {
                if (!mapRef.current || !currentMarkerRef.current) return;
                const position = new window.kakao.maps.LatLng(lat, lng);
                mapRef.current.setCenter(position);
                currentMarkerRef.current.setPosition(position);
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