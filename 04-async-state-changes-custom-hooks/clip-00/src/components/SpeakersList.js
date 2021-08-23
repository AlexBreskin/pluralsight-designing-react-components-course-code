import Speaker from "./Speaker";
import { data } from "../../SpeakerData";
import { useState, useEffect } from "react";
import ReactPlaceholder from "react-placeholder/lib";

function SpeakersList({ showSessions }) {
  const [speakersData, setSpeakersData] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
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

  if (hasErrored === true) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={isLoading === false}
      >
        <div className="row">
          {speakersData.map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={() => {
                  onFavoriteToggle(speaker.id);
                }}
              />
            );
          })}
        </div>
      </ReactPlaceholder>
    </div>
  );
}

export default SpeakersList;
