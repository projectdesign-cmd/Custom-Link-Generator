export default async function handler(req, res) {

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
}
