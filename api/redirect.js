export default function handler(req, res) {
  const { id } = req.query;

  const redirects = {
    "g76wq0uk8":
      "https://www.effectivecpmnetwork.com/g76wq0uk8?key=7692e6337b3c7e4a5882748459c3129a"
  };

  const destination = redirects[id];

  if (!destination) {
    return res.status(404).send("Link not found");
  }

  return res.redirect(302, destination);
}
