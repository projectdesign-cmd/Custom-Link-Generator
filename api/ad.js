const ads = {
  "g76wq0uk8": {
    adUrl: "https://11nq.vercel.app/ad/g76wq0uk8?key=7692e6337b3c7e4a5882748459c3129a",
    destination: "https://t.me/+0mLw59MALjU1ZGI9",
    timer: 15
  }
};

export default function handler(req, res) {
  const id = req.query.id;
  const ad = ads[id];

  if (!ad) {
    return res.status(404).send("Ad link not found");
  }

  const safeAdUrl = JSON.stringify(ad.adUrl);
  const safeDestination = JSON.stringify(ad.destination);
  const timer = Number(ad.timer) || 15;

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Please Wait</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      text-align: center;
      background: #f5f5f5;
    }

    .box {
      padding: 25px 15px;
    }

    h2 {
      margin-top: 20px;
    }

    #timer {
      font-size: 30px;
      font-weight: bold;
      margin: 20px;
    }

    #continue {
      display: none;
      padding: 13px 25px;
      background: #0088cc;
      color: white;
      text-decoration: none;
      border-radius: 8px;
    }

    iframe {
      width: 100%;
      height: 500px;
      border: 0;
      background: white;
    }
  </style>
</head>

<body>

<div class="box">
  <h2>Please Wait</h2>
  <div id="timer">${timer}</div>

  <iframe
    src=${safeAdUrl}
    loading="eager"
    referrerpolicy="no-referrer">
  </iframe>

  <a id="continue" href=${safeDestination}>
    Continue
  </a>
</div>

<script>
  let seconds = ${timer};
  const timerElement = document.getElementById("timer");
  const continueButton = document.getElementById("continue");

  const countdown = setInterval(() => {
    seconds--;

    if (seconds > 0) {
      timerElement.textContent = seconds;
    } else {
      clearInterval(countdown);
      timerElement.textContent = "✓";
      continueButton.style.display = "inline-block";

      // Automatically open destination
      window.location.href = ${safeDestination};
    }
  }, 1000);
</script>

</body>
</html>
  `);
}
