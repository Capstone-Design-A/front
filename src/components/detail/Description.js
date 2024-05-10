import React from "react";

function Description({ itemDetailsImageUrl }) {
  return (
    <div>
      <img src={itemDetailsImageUrl} alt="itemDetailsImageUrl" />
    </div>
  );
}

export default Description;
