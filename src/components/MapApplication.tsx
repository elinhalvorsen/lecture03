import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

useGeographic();

const map = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({ center: [10, 59], zoom: 10 }),
});
const MapApplication = () => {
    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
    useEffect(() => {
        map.setTarget(mapRef.current);
    }, []);

    return (
        <>
            <div ref={mapRef}>Map Should be here</div>
        </>
    );
};
export default MapApplication;
