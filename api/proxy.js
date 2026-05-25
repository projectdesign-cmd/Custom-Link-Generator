export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing url');
  
  const response = await fetch(decodeURIComponent(target));
  const buffer = await response.arrayBuffer();
  
  res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
  res.send(Buffer.from(buffer));
}
