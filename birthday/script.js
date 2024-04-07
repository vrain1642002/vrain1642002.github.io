document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;
  let soundCount = 0; 
  let allCandlesLit = false; 

  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    candleCountDisplay.textContent = activeCandles;
  }

  function addCandle(left, top) {
    if (candles.length >= 19) {
      console.log("Bạn chỉ được phép cắm tối đa 19 cây nến!");
      return; 
    }

    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
    updateCandleCount();

    if (candles.length === 19) {
      allCandlesLit = true; 
    }
  }

  cake.addEventListener("click", function (event) {
    const rect = cake.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  function isBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    return allCandlesLit && average > 40; 
  }

  function blowOutCandles() {
    let blownOut = 0;

    if (isBlowing()) {
      soundCount++; 

      if (soundCount >= 2) {
        candles.forEach((candle) => {
          if (!candle.classList.contains("out")) {
            candle.classList.add("out");
            blownOut++;
          }
        });

        soundCount = 0; 
        updateCandleCount(); 
      }
    } else {
      soundCount = 0; 
    }
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200); 
      })
      .catch(function (err) {
        console.log("Unable to access microphone: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }

  const audio = new Audio('backgroundMusic.mp3');
  audio.addEventListener("ended", function() {
    setTimeout(function() {
      if (audio.currentTime >= 44) {
        blowOutCandles(); 
      }
    }, 0); 
  });
  
  function playAudio() {
    audio.play();
    allCandlesLit = true;
  }

  cake.addEventListener("click", function () {
    if (!allCandlesLit) {
      playAudio();
    }
  });
});
