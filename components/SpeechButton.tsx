import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";

type SpeechButtonProps = {
  onSpeechResults: (text: string) => void;
};

const SpeechButton: React.FC<SpeechButtonProps> = ({ onSpeechResults }) => {
  const [isListening, setIsListening] = useState(false);

  const handleListening = async () => {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        await Voice.start("pt-BR");
        setIsListening(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = (event: SpeechResultsEvent) => {
      const text = event.value?.join(" ") ?? "";
      console.log(text);
      onSpeechResults(text);
    };

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onSpeechResults]);

  return (
    <Pressable style={styles.button} onPress={handleListening}>
      <Feather name={isListening ? "pause" : "mic"} color="#FFF" size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    width: 54,
    borderRadius: 12,
    backgroundColor: "#7D3106",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SpeechButton;
