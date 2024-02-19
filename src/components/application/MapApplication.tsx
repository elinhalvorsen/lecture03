import React, { MutableRefObject, useRef, useEffect, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import KommuneLayer from "../kommuner/KommuneLayer";
import Layer from "ol/layer/Layer";

useGeographic();

const map = new Map({
  view: new View({ center: [10, 59], zoom: 8 }),
});

const MapApplication = () => {
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

  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => map.setTarget(mapRef.current), []);
  useEffect(() => map.setLayers(layers), [layers]);
  return (
    <>
      <header>
        <h1>Kart</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Focus on me
        </a>
        <KommuneLayer map={map} setLayers={setLayers} />
      </nav>
      <div ref={mapRef}>Map Should be here</div>
    </>
  );
};
export default MapApplication;
