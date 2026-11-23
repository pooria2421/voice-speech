(() => {
    const textInput = document.getElementById("textInput");
    const voiceSelect = document.getElementById("voiceSelect");

    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const stopBtn = document.getElementById("stopBtn");

    const status = document.getElementById("status");
    const statusDot = document.getElementById("statusDot");

    let voices = [];

    function setStatus(message, color = "bg-slate-500") {
        status.textContent = message;
        statusDot.className = `h-2.5 w-2.5 rounded-full ${color}`;
    }

    function loadVoices() {
        voices = speechSynthesis.getVoices();

        const selected = voiceSelect.value;

        voiceSelect.innerHTML = "";

        voices.forEach((voice, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });

        if (selected && voices[selected]) {
            voiceSelect.value = selected;
        }
    }

    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    textInput.addEventListener("input", () => {
        document.getElementById("charCount").textContent =
            `${textInput.value.length} characters`;
    });

    document.getElementById("rate").addEventListener("input", e => {
        document.getElementById("rateValue").textContent = `${e.target.value}x`;
    });

    document.getElementById("pitch").addEventListener("input", e => {
        document.getElementById("pitchValue").textContent = e.target.value;
    });

    playBtn.addEventListener("click", () => {
        const text = textInput.value.trim();

        if (!text) {
            setStatus("Please enter some text.", "bg-rose-500");
            return;
        }

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        const voice = voices[voiceSelect.value];

        if (voice) utterance.voice = voice;

        utterance.rate = Number(document.getElementById("rate").value);
        utterance.pitch = Number(document.getElementById("pitch").value);

        utterance.onstart = () => {
            setStatus("Speaking...", "bg-green-500");
        };

        utterance.onend = () => {
            setStatus("Speech completed.", "bg-indigo-500");
        };

        utterance.onerror = () => {
            setStatus("Speech error occurred.", "bg-rose-500");
        };

        speechSynthesis.speak(utterance);
    });

    pauseBtn.addEventListener("click", () => {
        if (speechSynthesis.speaking && !speechSynthesis.paused) {
            speechSynthesis.pause();
            setStatus("Speech paused.", "bg-amber-500");
        } else if (speechSynthesis.paused) {
            speechSynthesis.resume();
            setStatus("Speaking...", "bg-green-500");
        }
    });

    stopBtn.addEventListener("click", () => {
        speechSynthesis.cancel();
        setStatus("Speech stopped.", "bg-rose-500");
    });

})();