# Text to Speech

A modern, responsive Text-to-Speech application built with **Next.js, React, TypeScript, and Tailwind CSS**.

Convert written text into spoken audio directly in your browser using the Web Speech API. Choose from available system voices, adjust speaking speed and pitch, and control playback.

## Features

- **Text to Speech:** Convert written text into spoken audio.
- **Multiple Languages:** Use available browser voices for Persian, English, and other languages.
- **Voice Selection:** Select from voices installed or provided by your browser.
- **Speech Speed:** Adjust speaking speed from 0.5x to 2.0x.
- **Pitch Control:** Adjust voice pitch from 0 to 2.
- **Playback Controls:**
  - Play
  - Pause
  - Resume
  - Stop
- **Character Counter:** Display the current text length.
- **Responsive Design:** Optimized for desktop, tablet, and mobile.
- **Modern UI:** Dark interface powered by Tailwind CSS.
- **Browser Support Detection:** Check whether the browser supports speech synthesis.
- **Dynamic Voice Loading:** Automatically load available voices using the `voiceschanged` event.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Web Speech API
- SpeechSynthesis
- SpeechSynthesisUtterance
- useSyncExternalStore

## Project Structure

```text
text-to-speech/
├── app/
│   └── page.tsx
│
├── components/
│   └── VoiceSpeech.tsx
│
├── public/
│
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/text-to-speech.git
```

### 2. Navigate to the project

```bash
cd text-to-speech
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

## Usage

1. Enter your desired text in the text area.
2. Select an available voice from the voice dropdown.
3. Adjust the speech speed.
4. Adjust the pitch.
5. Click **Play** to start speaking.
6. Use Pause, Resume, or Stop to control playback.

## Speech Settings

| Setting | Description | Range |
|---|---|---|
| Speed | Controls how quickly the text is spoken | 0.5 – 2.0 |
| Pitch | Controls the voice's pitch | 0 – 2 |
| Voice | Selects an available browser voice | System dependent |

### Speed

- 0.5: Slow speech
- 1.0: Normal speech
- 2.0: Fast speech

### Pitch

- 0: Lowest pitch
- 1: Normal pitch
- 2: Highest pitch

## Browser Compatibility

The application uses the browser's native Web Speech API.

Modern versions of the following browsers generally support speech synthesis:

- Google Chrome
- Microsoft Edge
- Safari
- Firefox

Actual voice availability depends on the browser and operating system.

## Persian Language Support

Persian speech depends on the availability of a Persian voice on the user's device or browser.

The application automatically prioritizes:
1. Persian voices (`fa`)
2. English voices (`en`)
3. The first available system voice

If no Persian voice is installed or provided by the browser, Persian speech may not work correctly.

## Internet Requirements

The application itself does not require an external translation API or cloud backend.

However:

- Locally installed voices can generally work offline.
- Some browser-provided voices may require an internet connection.
- Next.js development and production hosting have their own runtime requirements.

## React Implementation

The application uses `useSyncExternalStore` to detect browser speech synthesis support without using a state update inside `useEffect`.

The `useEffect` hook is used to synchronize with the browser's external speech synthesis API and subscribe to voice changes.

This helps avoid the React lint warning:

```text
Calling setState synchronously within an effect
can trigger cascading renders
```

## Limitations

- Available voices depend on the user's browser and operating system.
- Natural-sounding Persian voices are not guaranteed.
- Voice quality varies between devices.
- The Web Speech API does not directly provide MP3 or WAV downloads.
- Speech synthesis behavior may differ between browsers.

## Future Improvements

- Download generated speech as MP3.
- Add more voice customization options.
- Add text translation between languages.
- Add voice previews.
- Add text history and saved messages.
- Integrate cloud-based AI voices.
- Add more natural Persian voice generation.

## License

This project is available for personal and educational use. Add your preferred open-source license before distributing it.

---

**Built with Next.js, TypeScript, Tailwind CSS, and Web Speech API.**
