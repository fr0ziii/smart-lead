import * as express from 'express';

const app = express();
const port = 3000; // Or any port you prefer

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Simplified Authentication Endpoint for Demo
app.post('/api/v1/auth/login', (req, res) => {
  // In a real application, you would validate credentials and generate a real JWT
  const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // Dummy JWT

  res.json({ token: dummyToken });
});

// Middleware to check for Bearer token (simplified for demo)
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  // In a real application, you would validate the token
  next();
};

// Simplified Prospect Search API Endpoint for Demo
app.post('/api/v1/prospects/search', authenticateToken, (req, res) => {
  // In a real application, you would use the search criteria to find prospects
  const mockProspects = [
    {
      id: '1',
      companyName: 'Tech Solutions Inc.',
      industry: 'Technology',
      website: 'https://techsolutions.com',
      companySize: '101-500',
      contactName: 'Alice Smith',
      contactPosition: 'CTO',
    },
    {
      id: '2',
      companyName: 'Innovate Marketing',
      industry: 'Marketing',
      website: 'https://innovatemarketing.com',
      companySize: '51-100',
      contactName: 'Bob Johnson',
      contactPosition: 'Marketing Manager',
    },
  ];

  res.json({
    prospects: mockProspects,
    metadata: {
      total: mockProspects.length,
      page: 1,
      pageSize: mockProspects.length,
    },
  });
});

// Simplified Email Generation Service Endpoint for Demo
app.post('/api/v1/prospects/:prospectId/email', authenticateToken, (req, res) => {
  const { prospectId } = req.params;

  // In a real application, you would generate a personalized email based on the prospectId
  const mockEmail = {
    subject: `Introduction to Your Company (Prospect ID: ${prospectId})`,
    body: `Dear [Prospect Name],\n\nThis is a simplified email for prospect ${prospectId}. In a real application, this would be a personalized email draft.\n\nBest regards,\nSales Team`,
    metadata: {
      personalization: {},
      templateId: 'demo_template',
    },
  };

  res.json(mockEmail);
});


app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
