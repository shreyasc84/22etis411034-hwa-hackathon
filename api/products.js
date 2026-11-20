const { products } = require('../lib/catalog');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300');
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ ok: true, products }));
};
