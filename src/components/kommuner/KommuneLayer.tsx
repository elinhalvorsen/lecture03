import Layer from "ol/layer/Layer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Feature, Map, MapBrowserEvent } from "ol";
import { Polygon } from "ol/geom";

type KommuneProperites = {
  kommunenummer: string;
  navn: {
    sprak: string;
    navn: string;
  }[];
};
type KommuneFeactures = Feature<Polygon> & {
  getProperties(): KommuneProperites;
};
const kommuneSource = new VectorSource<KommuneFeactures>({
  url: "/lecture03/kommuner.json ",
  format: new GeoJSON(),
});
const kommuneLayer = new VectorLayer({
  source: kommuneSource,
});
const KommuneLayer = ({
  setLayers,
  map,
}: {
  map: Map;
  setLayers: Dispatch<SetStateAction<Layer[]>>;
}) => {
  const [checked, setChecked] = useState(false);

  const handleClick = (e: MapBrowserEvent<MouseEvent>) => {
    const clickedKommune = kommuneSource.getFeaturesAtCoordinate(
      e.coordinate,
    ) as KommuneFeactures[];
    if (clickedKommune.length === 1) {
      const properties = clickedKommune[0].getProperties() as KommuneProperites;
      alert(properties.navn.find((n) => n.sprak === "nor")!.navn);
    }
  };
  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, kommuneLayer]);
      map.on("click", handleClick);
    }
    return () => {
      map.un("click", handleClick);
      setLayers((old) => old.filter((l) => l !== kommuneLayer));
    };
  }, [checked]);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide " : "Show "}kommune layer
      </label>
    </>
  );
};
export default KommuneLayer;
