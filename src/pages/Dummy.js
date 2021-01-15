import { useState } from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Dummy() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <BarLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
}

export default Dummy;