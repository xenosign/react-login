import React from "react";
import { useCallback, useEffect, useRef } from "react";

export default function GoogleMap() {
  const mapElement = useRef(null);

  // 컴포넌트가 마운트될 때, 수동으로 스크립트를 넣어줍니다.
  // 이는 script가 실행되기 이전에 window.initMap이 먼저 선언되어야 하기 때문입니다.
  const loadScript = useCallback((url) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  // script에서 google map api를 가져온 후에 실행될 callback 함수
  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;

    const location = { lat: 37.5924523515, lng: 127.0406812854 };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 12,
      center: location,
    });

    const malls = [
      { label: "C", name: "코엑스몰", lat: 37.5115557, lng: 127.0595261 },
      { label: "G", name: "고투몰", lat: 37.5062379, lng: 127.0050378 },
      { label: "D", name: "동대문시장", lat: 37.566596, lng: 127.007702 },
      { label: "I", name: "IFC몰", lat: 37.5251644, lng: 126.9255491 },
      { label: "L", name: "롯데월드타워몰", lat: 37.5125585, lng: 127.1025353 },
      { label: "M", name: "명동지하상가", lat: 37.563692, lng: 126.9822107 },
      { label: "T", name: "타임스퀘어", lat: 37.5173108, lng: 126.9033793 },
    ];

    const infowindow = new google.maps.InfoWindow();

    // const markerTest = new google.maps.Marker({
    //   position: { lat: 37.5251, lng: 127.102 },
    //   map: map,
    //   label: "테스트",
    // });

    malls.forEach(({ label, name, lat, lng }) => {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        label,
        map: map,
      });

      marker.addListener("click", () => {
        infowindow.setContent(name);
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    });
  }, []);

  useEffect(() => {
    const script = window.document.getElementsByTagName("script")[0];
    const includeCheck = script.src.startsWith(
      "https://maps.googleapis.com/maps/api"
    );

    // script 중복 호출 방지
    if (includeCheck) return initMap();

    window.initMap = initMap;
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAIvlfuvzNFjqrpcC8xxseOLVjxnG1cvKQ&callback=initMap&language=en"
    );
  }, [initMap, loadScript]);

  return (
    <div>
      <div ref={mapElement} style={{ width: "700px", minHeight: "400px" }} />
    </div>
  );
}
