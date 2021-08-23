import { data } from "../../SpeakerData";
import { useState, useEffect } from "react";

function useRequestSpeakers(delayTime = 1000) {
  const [speakersData, setSpeakersData] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delayTime);
        setIsLoading(false);
        setSpeakersData(data);
      } catch (error) {
        setIsLoading(false);
        setHasErrored(true);
        setError(error);
      }
    }
    delayFunc();
  }, []);

  function onFavoriteToggle(id) {
    const speakersRecPrevious = speakersData.find(function (rec) {
      return rec.id === id;
    });
    const speakerRecUpdated = {
      ...speakersRecPrevious,
      favorite: !speakersRecPrevious.favorite,
    };
    const speakersDataNew = speakersData.map(function (rec) {
      return rec.id === id ? speakerRecUpdated : rec;
    });

    setSpeakersData(speakersDataNew);
  }

  return { speakersData, isLoading, hasErrored, error, onFavoriteToggle };
}

export default useRequestSpeakers;
