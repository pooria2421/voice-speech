# Voice Speech

A modern, responsive Text-to-Speech application built with **Next.js, React, TypeScript, and Tailwind CSS**.

Convert written text into natural-sounding speech directly in your browser using the Web Speech API. Choose an available voice, customize speech settings, and listen to your text without requiring an external TTS service.

## Features

- **Text-to-Speech:** Convert written text into spoken audio.
- **Multiple Languages:** Use available voices for different languages, including English and Persian.
- **Voice Selection:** Choose from voices provided by your browser and operating system.
- **Speech Controls:** Play, pause, resume, and stop speech.
- **Adjustable Speed:** Customize the speech rate.
- **Pitch Control:** Adjust the voice pitch.
- **Responsive Interface:** Designed for desktop, tablet, and mobile devices.
- **Browser-Based:** Speech synthesis runs locally through the browser's Web Speech API.
- **No API Key Required:** No third-party TTS API or backend service is needed.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework |
| React 19 | User interface |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Web Speech API | Speech synthesis |

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (compatible with your Next.js version)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/pooria2421/voice-speech.git
```

Navigate to the project directory:

```bash
cd voice-speech
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## How It Works

Voice Speech uses the browser's built-in **SpeechSynthesis API**, part of the Web Speech API.

The application creates a `SpeechSynthesisUtterance` from the entered text and uses the browser's available speech voices to read it aloud.

No audio-generation server is required.

### Browser Compatibility

Speech synthesis availability and voice quality depend on the browser and operating system.

- Chrome
- Microsoft Edge
- Safari
- Firefox (support and voice availability may vary)

**Note:** Persian voice availability depends on the installed speech voices on your device. Not every browser or operating system provides a Persian voice by default.

## Project Structure

```text
voice-speech/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── voice-speech/
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

## Limitations

- Available languages and voices depend on the user's device.
- Speech quality varies between browsers and operating systems.
- The application uses browser-based speech synthesis rather than generating downloadable audio files.
- Some browsers may require user interaction before speech playback starts.

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

## License

This project is open source. Add a license file to the repository if you want to specify the terms under which others can use, modify, and distribute the project.

---

**Developed by [Pooria Gohari](https://github.com/pooria2421)**

[GitHub Repository](https://github.com/pooria2421/voice-speech)