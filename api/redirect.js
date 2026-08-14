export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing file ID");
  }

  const targetUrl = `https://urlking.in/file_${encodeURIComponent(id)}`;

  res.redirect(302, targetUrl);
}
