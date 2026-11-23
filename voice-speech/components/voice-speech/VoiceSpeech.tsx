
"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

type SpeechStatus =
  | "Ready"
  | "Speaking..."
  | "Paused"
  | "Finished"
  | "Stopped"
  | "Please enter some text."
  | "Speech synthesis is not supported"
  | "Speech error";

// Browser support detection
const subscribe = () => {
  return () => {};
};

const getSnapshot = () => {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  );
};

const getServerSnapshot = () => false;

export default function VoiceSpeech() {
  const [text, setText] = useState(
    "hi"
  );

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [status, setStatus] = useState<SpeechStatus>("Ready");

  const isSupported = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const selectedVoice =
    voices.find((voice) => voice.voiceURI === selectedVoiceURI) ||
    null;

  // Load browser voices
  useEffect(() => {
    if (!isSupported) return;

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();

      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        setSelectedVoiceURI((current) => {
          if (
            current &&
            availableVoices.some(
              (voice) => voice.voiceURI === current
            )
          ) {
            return current;
          }

          const preferredVoice =
            availableVoices.find((voice) =>
              voice.lang.toLowerCase().startsWith("fa")
            ) ||
            availableVoices.find((voice) =>
              voice.lang.toLowerCase().startsWith("en")
            ) ||
            availableVoices[0];

          return preferredVoice.voiceURI;
        });
      }
    };

    loadVoices();

    synth.addEventListener("voiceschanged", loadVoices);

    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
      synth.cancel();
    };
  }, [isSupported]);

  // Play speech
  const handlePlay = useCallback(() => {
    if (!isSupported) {
      setStatus("Speech synthesis is not supported");
      return;
    }

    if (!text.trim()) {
      setStatus("Please enter some text.");
      return;
    }

    const synth = window.speechSynthesis;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setStatus("Speaking...");
    };

    utterance.onend = () => {
      setStatus("Finished");
    };

    utterance.onerror = (event) => {
      if (
        event.error === "canceled" ||
        event.error === "interrupted"
      ) {
        return;
      }

      setStatus("Speech error");
    };

    synth.speak(utterance);
  }, [isSupported, text, selectedVoice, rate, pitch]);

  // Pause speech
  const handlePause = () => {
    if (!isSupported) return;

    window.speechSynthesis.pause();
    setStatus("Paused");
  };

  // Resume speech
  const handleResume = () => {
    if (!isSupported) return;

    window.speechSynthesis.resume();
    setStatus("Speaking...");
  };

  // Stop speech
  const handleStop = () => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    setStatus("Stopped");
  };

  // Clear text
  const handleClear = () => {
    handleStop();
    setText("");
    setStatus("Ready");
  };

  // Reset settings
  const handleReset = () => {
    setRate(1);
    setPitch(1);
  };

  const isSpeaking = status === "Speaking...";
  const isPaused = status === "Paused";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-3xl">
            🎙️
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Text to Speech
          </h1>

       
        </div>

        {!isSupported && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            Speech synthesis is not supported in this browser.
            Please try Chrome, Edge, or Safari.
          </div>
        )}

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-2xl sm:p-8">

          <div className="mb-7">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="speech-text"
                className="text-sm font-semibold text-slate-200"
              >
                Your text
              </label>

              <span className="text-xs text-slate-500">
                {text.length} characters
              </span>
            </div>

            <textarea
              id="speech-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type something to speak..."
              rows={7}
              className="w-full resize-y rounded-2xl border border-white/10 bg-slate-950 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 transition hover:text-red-400"
              >
                Clear text
              </button>
            </div>
          </div>

          <div className="mb-7">
            <label
              htmlFor="voice-select"
              className="mb-3 block text-sm font-semibold text-slate-200"
            >
              Select voice
            </label>

            <select
              id="voice-select"
              value={selectedVoiceURI}
              onChange={(event) =>
                setSelectedVoiceURI(event.target.value)
              }
              disabled={voices.length === 0 || !isSupported}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {voices.length === 0 && (
                <option value="">Loading voices...</option>
              )}

              {voices.map((voice) => (
                <option
                  key={voice.voiceURI}
                  value={voice.voiceURI}
                >
                  {voice.name} ({voice.lang})
                  {voice.default ? " — Default" : ""}
                </option>
              ))}
            </select>

            {selectedVoice && (
              <p className="mt-2 text-xs text-slate-500">
                Language: {selectedVoice.lang}
                {selectedVoice.localService
                  ? " · Local voice"
                  : " · Network voice"}
              </p>
            )}
          </div>

          <div className="mb-8 grid gap-6 sm:grid-cols-2">

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label
                  htmlFor="speech-rate"
                  className="text-sm font-semibold text-slate-200"
                >
                  Speed
                </label>

                <span className="rounded-lg bg-indigo-500/15 px-3 py-1 text-sm font-semibold text-indigo-400">
                  {rate.toFixed(1)}x
                </span>
              </div>

              <input
                id="speech-rate"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(event) =>
                  setRate(Number(event.target.value))
                }
                className="w-full cursor-pointer accent-indigo-500"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>Slow</span>
                <span>Normal</span>
                <span>Fast</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label
                  htmlFor="speech-pitch"
                  className="text-sm font-semibold text-slate-200"
                >
                  Pitch
                </label>

                <span className="rounded-lg bg-indigo-500/15 px-3 py-1 text-sm font-semibold text-indigo-400">
                  {pitch.toFixed(1)}
                </span>
              </div>

              <input
                id="speech-pitch"
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(event) =>
                  setPitch(Number(event.target.value))
                }
                className="w-full cursor-pointer accent-indigo-500"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>Low</span>
                <span>Normal</span>
                <span>High</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

            <button
              type="button"
              onClick={handlePlay}
              disabled={!isSupported || !text.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ▶ Play
            </button>

            <button
              type="button"
              onClick={handlePause}
              disabled={!isSupported || !isSpeaking}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm font-semibold transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Ⅱ Pause
            </button>

            <button
              type="button"
              onClick={handleResume}
              disabled={!isSupported || !isPaused}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm font-semibold transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ▶ Resume
            </button>

            <button
              type="button"
              onClick={handleStop}
              disabled={
                !isSupported ||
                status === "Ready" ||
                status === "Stopped"
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ■ Stop
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isSpeaking
                    ? "animate-pulse bg-green-400"
                    : isPaused
                      ? "bg-yellow-400"
                      : status === "Speech error"
                        ? "bg-red-400"
                        : "bg-slate-500"
                }`}
              />

              <span className="text-sm text-slate-400">
                {status}
              </span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 transition hover:text-white"
            >
              Reset settings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
