import Speaker from "./Speaker";
import ReactPlaceholder from "react-placeholder/lib";
import useRequestSpeakers from "../hooks/useRequestSpeakers";

function SpeakersList({ showSessions }) {
  const { speakersData, isLoading, hasErrored, error, onFavoriteToggle } =
    useRequestSpeakers(2000);

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
