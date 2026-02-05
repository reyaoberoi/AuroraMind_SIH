import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory stores (replace with DB later)
const users = new Map(); // email -> { email, password }
const resources = [
  { id: 1, title: 'Breathing Exercise (4-7-8)', type: 'audio' },
  { id: 2, title: 'Grounding 5-4-3-2-1', type: 'guide' },
  { id: 3, title: 'Progressive Muscle Relaxation', type: 'video' },
];
const counsellors = [
  { id: 1, name: 'Dr. Meera Sharma', specialty: 'Anxiety, Stress', availability: 'Mon, Wed, Fri' },
  { id: 2, name: 'Dr. Arjun Rao', specialty: 'Depression, Sleep', availability: 'Tue, Thu' },
  { id: 3, name: 'Ms. Nisha Patel', specialty: 'Relationship, Adjustment', availability: 'Daily (online)' },
];

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Aurora API', endpoints: ['/health', '/auth/login', '/auth/signup', '/counsellors', '/resources'] });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/auth/signup', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  if (users.has(email)) return res.status(409).json({ error: 'user exists' });
  users.set(email, { email, password });
  res.json({ token: `demo-${Buffer.from(email).toString('base64')}`, user: { email } });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = users.get(email);
  if (!user || user.password !== password) return res.status(401).json({ error: 'invalid credentials' });
  res.json({ token: `demo-${Buffer.from(email).toString('base64')}`, user: { email } });
});

app.get('/counsellors', (req, res) => {
  res.json(counsellors);
});

app.get('/resources', (req, res) => {
  res.json(resources);
});

app.listen(PORT, () => {
  console.log(`API server running http://localhost:${PORT}`);
});


