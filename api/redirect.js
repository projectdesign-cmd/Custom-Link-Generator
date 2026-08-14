export default async function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).send("Missing filename");
  }

  const API_TOKEN = process.env.AROLINKS_API_TOKEN;

  if (!API_TOKEN) {
    return res.status(500).send("Arolinks API token is not configured");
  }

  // Your Arolinks API request goes here.
  // Replace this URL and parameters with the exact API endpoint
  // shown in your Arolinks dashboard/documentation.

  const response = await fetch("b9503af56ceea7b40bc91bcb0a3bdad3105fb124", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`
    }
  });

  if (!response.ok) {
    return res.status(500).send("Arolinks API request failed");
  }

  const data = await response.json();

  // Adjust this according to the actual Arolinks API response.
  const targetUrl = data.url;

  if (!targetUrl) {
    return res.status(500).send("No redirect URL returned");
  }

  return res.redirect(302, targetUrl);
}
