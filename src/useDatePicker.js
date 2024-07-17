import  { useState, useEffect } from 'react';

const useDatePicker = () => {
  const [date, setFormattedDate] = useState("");
  const [time, setFormattedTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      let optionsDate = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      let optionsTime = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

      let date = new Date();
      let formattedDate = date.toLocaleDateString("en-IN", optionsDate);
      let formattedTime = date.toLocaleTimeString("en-IN", optionsTime);

      setFormattedDate(formattedDate);
      setFormattedTime(formattedTime); 

    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return {date,time};
};

export default useDatePicker;
