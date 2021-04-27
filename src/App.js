import React, {useEffect, useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [eventList, setEventList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  function getEvents() {
    setLoadingEvents(true)
    axios.get('https://api.neerme.io/events')
    .then(function (response) {
      // handle success
      setEventList(response.data)
      setLoadingEvents(false)
      console.log(eventList);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setLoadingEvents(false)
    })
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className="App">
      <div>
        <ul>
        {eventList.map((event) => {
          return <li key={event.event_id}>{event.event_name}</li>;
        })}
        </ul>
      </div>
    </div>
  );
}

export default App;
