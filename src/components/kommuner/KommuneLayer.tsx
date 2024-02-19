import React, { useState } from "react";
const KommuneLayer = () => {
  const [checked, setChecked] = useState(false);
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
