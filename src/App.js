import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [eventList, setEventList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadgindSelectedEvent, setLoadingSelectedEvent] = useState(false);
  const [eventDetail, setEventDetail] = useState(false);

  function getEvents() {
    setLoadingEvents(true);
    axios
      .get("https://api.neerme.io/events")
      .then(function (response) {
        // handle success
        setEventList(response.data);
        setLoadingEvents(false);
        console.log(eventList);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoadingEvents(false);
      });
  }

  function getEventDetail (eventSubdomain) {
    setLoadingSelectedEvent(true)
    axios
      .get(`https://api-plus.neerme.io/event/${eventSubdomain}`)
      .then(function (response) {
        console.log(response);
        setEventDetail(response.data)
        setLoadingSelectedEvent(false)
        // handle success
      })
      .catch(function (error) {
        setLoadingSelectedEvent(false)
        // handle error
      });
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="App">
      {loadingEvents ? (
        <h3>Loading ...</h3>
      ) : (
        <div>
          <ul>
            {eventList.map((event) => {
              return (
                <li key={event.event_id}>
                  {event.event_name}{" "}
                  <button
                    onClick={(e) => {
                      console.log("---------- Event data");
                      console.log(event);
                      getEventDetail(event.event_subdomain);
                    }}
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {loadgindSelectedEvent ? (
        <h3>Loading Event Detail ...</h3>
      ): eventDetail ? (
          <div> {/* Espacio para detalle de evento */}
                <h4>{eventDetail.event_name}</h4>
                <p>{eventDetail.event_description}</p>
          </div>
      ):(<></>)}
    </div>
  );
}

export default App;
