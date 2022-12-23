import React, { useEffect, useState } from "react";

export default function ImageApi() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchApi();
  }, []);

  async function fetchApi() {
    const apiResponse = await fetch(
      `https://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=498&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&contentTypeId=12&areaCode=1`
    );
    const apiData = await apiResponse.json();
    console.log(apiData.response.body.items.item);
    setList(apiData.response.body.items.item);
  }

  return (
    <>
      {list.map((el, index) => {
        if (index < 10)
          return <img sky={el} src={el.firstimage} alt={el.title} />;
      })}
    </>
  );
}
