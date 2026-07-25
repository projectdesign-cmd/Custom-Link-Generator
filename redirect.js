export default function handler(req, res) {
  const { id } = req.query;

  const links = {
    cooku31: "https://arolinks.com/dl85tm",
    movie1: "https://arolinks.com/ofvc6Y"
  };

  if (links[id]) {
    res.writeHead(302, {
      Location: links[id]
    });
    res.end();
  } else {
    res.status(404).send("Link not found");
  }
}
