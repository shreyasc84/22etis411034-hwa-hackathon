const { products } = require('../lib/catalog');

const orders = [];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 65536) {
        reject(new Error('Request too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function text(value, field, max) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} is required`);
  const clean = value.trim();
  if (clean.length > max) throw new Error(`${field} is too long`);
  return clean;
}

function validate(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid order');
  const c = payload.customer || {};
  const customer = {
    name: text(c.name, 'Name', 100),
    email: text(c.email, 'Email', 200).toLowerCase(),
    address: text(c.address, 'Address', 200),
    city: text(c.city, 'City', 100),
    postcode: text(c.postcode, 'Postcode', 30)
  };
  if (!EMAIL_PATTERN.test(customer.email)) throw new Error('Please enter a valid email address');
  if (!Array.isArray(payload.items) || payload.items.length === 0 || payload.items.length > 20) {
    throw new Error('Your basket needs at least one item');
  }

  const quantities = new Map();
  for (const item of payload.items) {
    if (!item || typeof item.id !== 'string' || !Number.isInteger(item.qty)) {
      throw new Error('Invalid item in basket');
    }
    if (!products.some((product) => product.id === item.id)) throw new Error('One of those products is no longer available');
    if (item.qty < 1 || item.qty > 99) throw new Error('Invalid quantity in basket');
    quantities.set(item.id, (quantities.get(item.id) || 0) + item.qty);
  }

  const items = [...quantities.entries()].map(([id, qty]) => {
    const product = products.find((entry) => entry.id === id);
    return { id, name: product.name, qty, unitPrice: product.price, lineTotal: product.price * qty };
  });
  const total = Math.round(items.reduce((sum, item) => sum + item.lineTotal, 0) * 100) / 100;
  return { customer, items, total };
}

function estimatedDelivery() {
  const date = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed' });

  try {
    const payload = await readBody(req);
    const orderData = validate(payload);
    const order = {
      id: `SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: 'received',
      estimatedDelivery: estimatedDelivery(),
      ...orderData
    };
    orders.push(order);
    return send(res, 200, { ok: true, order });
  } catch (error) {
    return send(res, 400, { ok: false, error: error.message || 'Could not place order' });
  }
};
