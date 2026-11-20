const subscribers = new Set();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  }

  let payload = req.body;
  if (!payload || typeof payload !== 'object') {
    try {
      let raw = '';
      for await (const chunk of req) raw += chunk;
      payload = raw ? JSON.parse(raw) : {};
    } catch {
      payload = {};
    }
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, error: 'Please enter a valid email address' }));
  }
  subscribers.add(email);
  res.statusCode = 200;
  return res.end(JSON.stringify({ ok: true, message: 'Subscribed' }));
};
