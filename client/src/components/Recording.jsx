/* eslint-disable react/prop-types */
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Recording = ({ handleRecording ,updatePrompt}) => {
  const { transcript } = useSpeechRecognition({ transcribing: true });

  const handleRecordingComplete = () => { 
    updatePrompt(transcript);
  };


  const startListning = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  return (
    <div className="w-[30vw] h-[60vh] z-20 fixed top-[20vh] left-[35vw] flex flex-col justify-center items-center gap-6 bg-[#F9FAFE] rounded-lg">
      <button onClick={startListning}>START</button>
      <div className="w-[90%] h-[70%] bg-[#ecf8f6df] rounded-lg text-purple-900 ">
        {transcript}
      </div>
      <button
        onClick={() => {
          handleRecording();
          SpeechRecognition.stopListening();
          handleRecordingComplete();
        }}
      >
        STOP
      </button>
    </div>
  );
};

export default Recording;
