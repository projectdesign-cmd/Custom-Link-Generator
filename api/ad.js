export default function handler(req, res) {
  const { id } = req.query;

  const links = {
    "g76wq0uk8": {
      ad: "https://www.effectivecpmnetwork.com/g76wq0uk8?key=7692e6337b3c7e4a5882748459c3129a",
      destination: "https://t.me/+0mLw59MALjU1ZGI9"
    }
  };

  const link = links[id];

  if (!link) {
    return res.status(404).send("Link not found");
  }

  // Open the ad network URL first
  res.redirect(302, link.ad);
}
