export default async function handler(req, res) {
  const { id, filename } = req.query;

  // ==============================
  // REPLACE ONLY THIS API TOKEN
  // ==============================
  const AROLINKS_API_TOKEN = "b9503af56ceea7b40bc91bcb0a3bdad3105fb124";

  // Arolinks API endpoint
  const API_URL = "https://arolinks.com/api";

  if (!id) {
    return res.status(400).send("Missing Arolinks ID");
  }

  try {
    const params = new URLSearchParams({
      api: AROLINKS_API_TOKEN,
      url: `https://arolinks.com/${id}`
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    // Try common response formats
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
