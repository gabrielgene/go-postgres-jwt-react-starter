import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const OpenMap = ({ position }) => {
  return (
    <Map center={position} zoom={12} width={300} height={200}>
      <Marker anchor={position} payload={1} />
    </Map>
  );
};

export default OpenMap;
