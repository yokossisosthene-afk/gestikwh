export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const response = await fetch(`https://ipwho.is/${ip}`);
  const data = await response.json();
  res.json({ ip, country: data.country, city: data.city });
}
