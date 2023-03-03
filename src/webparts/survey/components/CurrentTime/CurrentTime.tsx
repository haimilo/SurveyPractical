import * as React from "react";
import { useEffect, useState } from "react";
import { ICurrentTime } from "./ICurrentTime";

const CurrentTime = (_props: ICurrentTime) => {
  const [time, _setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const [date, _setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  useEffect(() => {
    const currentTime = setInterval(() => {
      console.log("loading");
      _setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      _setDate(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }, 1000);
    return () => {
      clearInterval(currentTime);
    };
  }, [time]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          marginBottom: "12px",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginRight: "10px",
          }}
        >
          Current Date:{" "}
        </h1>
        <p
          style={{
            lineHeight: "28px",
            margin: 0,
          }}
        >
          {date}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: "12px",
          alignItems: "end",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginRight: "10px",
          }}
        >
          Current Time:{" "}
        </h1>
        <p
          style={{
            margin: 0,
            lineHeight: "28px",
          }}
        >
          {time}
        </p>
      </div>
      <hr />
    </div>
  );
};

export default CurrentTime;
