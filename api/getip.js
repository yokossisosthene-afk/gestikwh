export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() 
             || req.socket.remoteAddress;

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,query`);
    const data = await response.json();
    res.json({ 
      ip: data.query || ip, 
      country: data.country || "?", 
      city: data.city || "?" 
    });
  } catch(e) {
    res.json({ ip, country: "?", city: "?" });
  }
}
