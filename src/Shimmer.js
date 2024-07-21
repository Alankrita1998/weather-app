import React from 'react';
import { TailSpin } from 'react-loader-spinner'


const Shimmer = () => {
  return (
    <div className="shimmer-container">
    <TailSpin
  visible={true}
  height="60"
  width="60"
  color="#f0f0f0"
  backgroundColor="transparent"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  );
}

export default Shimmer