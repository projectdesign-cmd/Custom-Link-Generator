export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing ID");
  }

  res.writeHead(302, {
    Location: `https://filedollar.top/${id}`,
    "Cache-Control": "no-cache, no-store, must-revalidate"
  });

  res.end();
}
