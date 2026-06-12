export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send("No URL provided");
  }
  try {
    const range = req.headers["range"] || "bytes=0-";
    const response = await fetch(videoUrl, {
      headers: {
        "Range": range,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": videoUrl,
      },
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    res.setHeader("Content-Type", response.headers.get("content-type") || "video/mp4");
    res.setHeader("Content-Length", response.headers.get("content-length") || "");
    res.setHeader("Accept-Ranges", "bytes");
    if (response.headers.get("content-range")) {
      res.setHeader("Content-Range", response.headers.get("content-range"));
    }
    res.status(response.status);
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
