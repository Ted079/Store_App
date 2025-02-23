import React, { useEffect } from "react";

function Preloader() {
  const preloader = <section className="preloader">...Loading</section>;
//   useEffect(() => {
//     setTimeout(() => {
//       preloader;
//     }, 2000);
//   }, [setTimeout]);
  return <div>Preloader</div>;
}

export default Preloader;
