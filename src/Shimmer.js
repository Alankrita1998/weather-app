import React from 'react';
import { TailSpin } from 'react-loader-spinner'


const Shimmer = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '76vh' }}>
    (<TailSpin
  visible={true}
  height="80"
  width="80"
  color="#f0f0f0"
  backgroundColor="transparent"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />)
    </div>
  );
}

export default Shimmer