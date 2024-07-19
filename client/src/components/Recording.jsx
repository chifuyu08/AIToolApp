/* eslint-disable react/prop-types */
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "@mui/material/Button";
const Recording = ({ handleRecording, updatePrompt }) => {
  const { transcript } = useSpeechRecognition({ transcribing: true });

  const handleRecordingComplete = () => {
    updatePrompt(transcript);
  };

  const startListning = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  return (
    <div className="w-[25vw] h-[45vh] z-20 fixed top-[20vh] left-[38vw] flex flex-col justify-center  gap-4 bg-[#F9FAFE] rounded-lg">
      <div className="flex justify-around">
        <Button variant="contained" onClick={startListning}>
          Start
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleRecording();
            SpeechRecognition.stopListening();
            handleRecordingComplete();
          }}
        >
          Submit
        </Button>
      </div>
      <div className="w-[90%] h-[70%] bg-[#d5e0ef88] rounded-lg text-purple-900 ml-6">
        {transcript}
      </div>
    </div>
  );
};

export default Recording;
