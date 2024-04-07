document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;
  let soundCount = 0; 
  let allCandlesLit = false; 
  let soundDetectionEnabled = false; // Thêm biến để điều khiển phát hiện âm thanh

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

    return allCandlesLit && average > 30; // Sửa ngưỡng âm thanh thành 20
  }

  function blowOutCandles() {
    let blownOut = 0;

    if (soundDetectionEnabled && isBlowing()) { // Chỉ kiểm tra âm thanh nếu phát hiện được bật
      soundCount++; 

      if (soundCount >= 2) {
        candles.forEach((candle) => {
          if (!candle.classList.contains("out")) {
            candle.classList.add("out");
            blownOut++;
          }
        });

        soundCount = 0; 
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
        console.log("Không thể truy cập microphone: " + err); // Thông báo khi không thể truy cập microphone
      });
  } else {
    console.log("getUserMedia không được hỗ trợ trên trình duyệt của bạn!"); // Thông báo khi không hỗ trợ getUserMedia
  }

  const audio = new Audio('song.mp3');
  audio.addEventListener("ended", function() {
    setTimeout(function() {
      if (audio.currentTime >= 44) {
        enableSoundDetection(); // Kích hoạt phát hiện âm thanh khi nhạc kết thúc
        blowOutCandles(); 
      }
    }, 0); 
  });
  
  function playAudio() {
    audio.play();
    allCandlesLit = true;
  }

  function enableSoundDetection() {
    soundDetectionEnabled = true;
  }

  function disableSoundDetection() {
    soundDetectionEnabled = false;
  }

  cake.addEventListener("click", function () {
    if (!allCandlesLit) {
      playAudio();
    }
  });
});
