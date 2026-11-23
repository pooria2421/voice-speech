# 🔊 Text to Speech – Voice Speech

A lightweight, browser-based Text-to-Speech application that converts written text into spoken audio using the **Web Speech API**.

The application provides a simple and modern interface where users can enter text, select an available voice, adjust speech speed and pitch, and control audio playback.

## ✨ Features

- **Text to Speech:** Convert written text into spoken audio.
- **Multiple Voices:** Select from voices available in your browser and operating system.
- **Multilingual Support:** Support for multiple languages, including English and Persian (depending on available system voices).
- **Speech Speed:** Adjust speaking speed from 0.5x to 2x.
- **Voice Pitch:** Customize pitch from 0 to 2.
- **Playback Controls:**
  - ▶ Play – Start speech.
  - ⏸ Pause – Pause speech.
  - ■ Stop – Stop speech.
- **Character Counter:** Display the number of characters entered.
- **Responsive Design:** Works on desktop, tablet, and mobile devices.
- **Dark UI:** Modern dark interface with Indigo accents.

## 🛠️ Technologies

- HTML5
- CSS / Tailwind CSS
- Vanilla JavaScript
- Web Speech API (`SpeechSynthesis`)

## 📁 Project Structure

```text
voice-speech/
│
├── index.html
│
└── asset/
    └── js/
        └── file.js
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/USERNAME/voice-speech.git
```

### 2. Navigate to the Project

```bash
cd voice-speech
```

### 3. Run the Application

You can open `index.html` directly in your browser or use a local development server.

For example, with VS Code Live Server:

1. Open the project folder in VS Code.
2. Install the Live Server extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

## 🌍 Language Support

The application uses voices provided by the browser and operating system.

Available languages depend on installed speech synthesis voices.

For Persian speech, select a voice with the `fa-IR` language code if your system provides one.

## 🔌 Browser Compatibility

The application relies on the browser's built-in Web Speech API.

Modern browsers such as Google Chrome, Microsoft Edge, and Safari support speech synthesis, although available voices and behavior may differ.

## 🌐 Internet Requirements

The application does not require a backend server or an external Text-to-Speech API.

- HTML, CSS, and JavaScript run locally.
- Speech synthesis uses the browser's Web Speech API.
- Tailwind CSS CDN requires an internet connection to load styling.
- Some browser or operating-system voices may require additional downloads or online services.

## 📸 Interface

The interface includes:

1. Text input area.
2. Voice selection dropdown.
3. Speech speed and pitch controls.
4. Playback buttons.
5. Speech status indicator.

## 📄 License

This project is open-source and available for personal and educational use.

---

**Built with ❤️ using HTML, CSS, and JavaScript.**
