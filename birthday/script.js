document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("backgroundMusic");
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  const blowMessage = document.getElementById("blowMessage");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;
  let soundCount = 0; 
  let allCandlesLit = false; 
  let isFirstBlow = true; 
  let musicPlayed = false; // Biến để kiểm tra xem nhạc đã được phát chưa

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

    if (candles.length === 19 && !musicPlayed) {
      allCandlesLit = true;
      audio.play(); // Phát nhạc khi đã cắm đủ 19 cây nến
      musicPlayed = true; // Đánh dấu rằng nhạc đã được phát
    }
  }

  cake.addEventListener("click", function (event) {
    const rect = cake.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  function isBlowing() {
    if (!allCandlesLit) return false; 

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    return average > 50; 
  }

  function blowOutCandles() {
    if (isBlowing()) {
      if (isFirstBlow) {
        isFirstBlow = false; 
        blowMessage.textContent = "Thổi mạnh lên nào bé!";
      } else if (soundCount > 1) { 
        candles.forEach((candle) => {
          if (!candle.classList.contains("out")) {
            candle.classList.add("out");
          }
        });
        blowMessage.textContent = "Bé đã 19 tuổi kkk!";
      }
      soundCount++; 
    }
  }

  // Tạm dừng nhạc khi đến giây thứ 44
  audio.addEventListener("timeupdate", function() {
    if (audio.currentTime >= 44) {
      audio.pause(); // Tạm dừng nhạc
    }
  });

  audio.addEventListener("ended", function() {
    setTimeout(function() {
        blowOutCandles(); // Gọi hàm kiểm tra tiếng động sau 4 giây
    }, 4000); // 4 giây = 4000 mili giây
  });

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
      })
      .catch(function (err) {
        console.log("Unable to access microphone: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }

  // Phát nhạc khi nhấn nút cắm nến
  audio.onplay = function() {
    musicPlayed = true;
  };
});
