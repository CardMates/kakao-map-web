import React, { useEffect, useRef } from 'react';
import useKakaoLoader from './useKakaoLoader';

const KAKAO_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;

// Pin 이미지 URL
const CURRENT_POS_IMG = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
const STORE_POS_IMG = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_blue.png";

export default function KakaoMap({
    initialCenter = { lat: 37.5665, lng: 126.9780 },
    level = 3
}) {
    const containerRef = useRef(null);
    const loaded = useKakaoLoader(KAKAO_KEY);

    const mapRef = useRef(null);
    const currentMarkerRef = useRef(null);
    const storeMarkersRef = useRef([]);

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

            // 현재 위치 마커 
            const currentMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
                map: map,
                image: new window.kakao.maps.MarkerImage(CURRENT_POS_IMG, new window.kakao.maps.Size(35, 35))
            });
            currentMarkerRef.current = currentMarker;

            // React Native에서 pins 데이터를 내려주는 경우
            window.setPins = (pins) => {
                // pins: [{ id: 1, lat: 37.56, lng: 126.97 }, ...]


                storeMarkersRef.current.forEach(m => m.setMap(null));
                storeMarkersRef.current = [];

                if (pins.length > 0) {
                    const bounds = new window.kakao.maps.LatLngBounds();
                    // 현재 위치도 bounds에 포함
                    bounds.extend(currentMarker.getPosition());

                    pins.forEach(pin => {
                        const marker = new window.kakao.maps.Marker({
                            position: new window.kakao.maps.LatLng(pin.lat, pin.lng),
                            map: map,
                            image: new window.kakao.maps.MarkerImage(STORE_POS_IMG, new window.kakao.maps.Size(24, 35))
                        });

                        window.kakao.maps.event.addListener(marker, 'click', () => {
                            if (window.ReactNativeWebView?.postMessage) {
                                window.ReactNativeWebView.postMessage(
                                    JSON.stringify({ type: 'PIN_CLICK', payload: pin })
                                );
                            } else {
                                console.log('[KakaoMap] PIN_CLICK', pin);
                            }
                        });

                        bounds.extend(marker.getPosition());
                        storeMarkersRef.current.push(marker);
                    });

                    map.setBounds(bounds); // 모든 마커가 화면에 보이도록
                } else {
                    // 매장 없으면 현재 위치 중심
                    map.setCenter(currentMarker.getPosition());
                    map.setLevel(level);
                }
            };

            window.moveToCurrentLocation = (lat, lng) => {
                if (!mapRef.current || !currentMarkerRef.current) return;
                const position = new window.kakao.maps.LatLng(lat, lng);
                map.setCenter(position);
                currentMarker.setPosition(position);
            };

            if (window.ReactNativeWebView?.postMessage) {
                window.ReactNativeWebView.postMessage('READY');
            } else {
                console.log('[KakaoMap] READY');
            }
        });
    }, [loaded, initialCenter.lat, initialCenter.lng, level]);


    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}