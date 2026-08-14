export default async function handler(req, res) {
  const { filename } = req.query;

  // ==========================================
  // REPLACE ONLY YOUR API TOKEN HERE
  // ==========================================
  const AROLINKS_API_TOKEN = "export default async function handler(req, res) {

  // ==============================
  // PUT YOUR AROLINKS API TOKEN HERE
  // ==============================
  const API_TOKEN = "b9503af56ceea7b40bc91bcb0a3bdad3105fb124";


  // ==============================
  // GET FILE ID
  // ==============================
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing Arolinks ID");
  }


  // ==============================
  // AROLINKS API
  // ==============================
  try {

    const response = await fetch(
      `https://arolinks.com/api?api=${encodeURIComponent(API_TOKEN)}&url=https://arolinks.com/${encodeURIComponent(id)}`
    );

    const data = await response.json();

    if (!data || !data.status) {
      return res.status(500).json({
        error: "Arolinks API error",
        response: data
      });
    }

    const shortUrl = data.shortenedUrl || data.url;

    if (!shortUrl) {
      return res.status(500).send("Arolinks did not return a URL");
    }

    return res.redirect(302, shortUrl);

  } catch (error) {

    return res.status(500).json({
      error: "Request failed",
      message: error.message
    });

  }
}";

  // ==========================================
  // ADD YOUR DAILY AROLINKS ID + FILE NAME HERE
  // ==========================================
  const LINKS = {
    "Chef_Mantra_Project_Usa_S1_Ep1_486p_AHA_WEB_DL_Telugu_AAC_2_0_H264.mp4":
      "CGh6Z"
  };

  if (!filename) {
    return res.status(400).send("Missing filename");
  }

  // Decode filename
  const decodedFilename = decodeURIComponent(
    Array.isArray(filename) ? filename.join("/") : filename
  );

  // Find Arolinks ID internally
  const id = LINKS[decodedFilename];

  if (!id) {
    return res.status(404).send("File not found");
  }

  try {
    const API_URL = "https://arolinks.com/api";

    const params = new URLSearchParams({
      api: AROLINKS_API_TOKEN,
      url: `https://arolinks.com/${id}`
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    const destination =
      data?.url ||
      data?.shortenedUrl ||
      data?.shortened_url ||
      data?.link ||
      data?.result;

    if (!destination) {
      return res.status(502).json({
        error: "Arolinks API did not return a redirect URL",
        response: data
      });
    }

    return res.redirect(302, destination);

  } catch (error) {
    return res.status(500).json({
      error: "Arolinks API request failed",
      message: error.message
    });
  }
        }
