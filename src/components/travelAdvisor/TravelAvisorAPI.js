import React, { useEffect } from "react";

function TravelAvisorAPI() {
  const handleLoad = async () => {
    const url =
      "https://travel-advisor.p.rapidapi.com/answers/v2/list?currency=USD&units=km&lang=en_US";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "23eeafc821msh7be001b9cf669b8p1fea80jsn801714754628",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: {
        contentType: "hotel",
        contentId: "4172546",
        questionId: "8393250",
        pagee: 0,
        updateToken: "",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return <div>TravelAvisorAPI</div>;
}

export default TravelAvisorAPI;
