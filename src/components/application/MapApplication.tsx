import React, { MutableRefObject, useRef, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import KommuneLayer from "../kommuner/KommuneLayer";

useGeographic();

const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({ center: [10, 59], zoom: 8 }),
});

const handleFocusUser = (e: React.MouseEvent) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition((pos) => {
    const { longitude, latitude } = pos.coords;
    map.getView().animate({
      center: [longitude, latitude],
      zoom: 10,
    });
  });
};

const MapApplication = () => {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  return (
    <>
      <header>
        <h1>Kart</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Focus on me
        </a>
        <KommuneLayer />
      </nav>
      <div ref={mapRef}>Map Should be here</div>
    </>
  );
};
export default MapApplication;
