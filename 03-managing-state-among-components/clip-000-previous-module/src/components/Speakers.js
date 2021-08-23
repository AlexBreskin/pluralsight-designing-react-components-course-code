import { data } from "../../SpeakerData";
import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";
import Header from "./Header";

function Speakers() {
  return (
    <div className="container-fluid">
      <Header />
      <SpeakersToolbar />
      <SpeakersList data={data} />
    </div>
  );
}

export default Speakers;
