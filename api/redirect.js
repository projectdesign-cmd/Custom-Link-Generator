export default async function handler(req, res) {
  const { filename } = req.query;

  // ==========================================
  // REPLACE ONLY YOUR AROLINKS API TOKEN
  // ==========================================
  const AROLINKS_API_TOKEN = "b9503af56ceea7b40bc91bcb0a3bdad3105fb124";

  // ==========================================
  // DAILY AROLINKS ID + FILE NAME
  // ==========================================
  const LINKS = {
    "Chef_Mantra_Project_Usa_S1_Ep1_486p_AHA_WEB_DL_Telugu_AAC_2_0_H264.mp4":
      "CGh6Z"
  };

  if (!filename) {
    return res.status(400).send("Missing filename");
  }

  const decodedFilename = decodeURIComponent(
    Array.isArray(filename) ? filename.join("/") : filename
  );

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
