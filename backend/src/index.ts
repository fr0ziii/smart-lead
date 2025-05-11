import * as express from 'express';
import * as cors from 'cors';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000; // Or any port you prefer

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

// LLM-powered Prospect Search API Endpoint
app.post('/api/v1/prospects/search', authenticateToken, async (req, res) => {
  const { industry, companySize, contactPosition } = req.body;

  if (!industry || !companySize || !contactPosition) {
    return res.status(400).json({ error: 'Missing search criteria' });
  }

  try {
    const prompt = `Generate a JSON array of 3-5 fictional B2B prospects based on the following criteria:
Industry: ${industry}
Company Size: ${companySize}
Contact Position: ${contactPosition}

Each prospect object should have the following properties: id (unique string), companyName, industry, website, companySize, contactName, contactPosition. Ensure the data is coherent and credible.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Using gpt-3.5-turbo as a default, can be refined
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
    });

    const llmResponse = completion.choices[0].message.content;
    if (!llmResponse) {
        return res.status(500).json({ error: 'LLM did not return content' });
    }

    let prospects: any[] = [];
    try {
        // The LLM is instructed to return a JSON object containing the array
        const parsedResponse = JSON.parse(llmResponse);
        if (Array.isArray(parsedResponse)) {
             prospects = parsedResponse;
        } else if (parsedResponse && Array.isArray(parsedResponse.prospects)) {
             prospects = parsedResponse.prospects;
        } else {
             // Attempt to find an array within the response if not at the top level
             const potentialArray = Object.values(parsedResponse).find(Array.isArray);
             if (potentialArray) {
                 prospects = potentialArray as any[];
             } else {
                 console.error('LLM response is not a JSON array or an object containing one:', llmResponse);
                 return res.status(500).json({ error: 'Failed to parse LLM response as a list of prospects' });
             }
        }

        // Assign unique IDs if not provided by LLM
        prospects = prospects.map(p => ({
            id: p.id || Math.random().toString(36).substring(2, 15),
            companyName: p.companyName || 'N/A',
            industry: p.industry || industry,
            website: p.website || 'N/A',
            companySize: p.companySize || companySize,
            contactName: p.contactName || 'N/A',
            contactPosition: p.contactPosition || contactPosition,
        }));

    } catch (parseError) {
        console.error('Failed to parse LLM response:', llmResponse, parseError);
        return res.status(500).json({ error: 'Failed to parse LLM response' });
    }


    res.json({
      prospects: prospects,
      metadata: {
        total: prospects.length,
        page: 1,
        pageSize: prospects.length,
      },
    });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to generate prospects using LLM' });
  }
});

// LLM-powered Email Generation Service Endpoint
app.post('/api/v1/prospects/:prospectId/email', authenticateToken, async (req, res) => {
  const prospect = req.body; // Expecting full prospect data in the body

  if (!prospect || !prospect.contactName || !prospect.companyName) {
    return res.status(400).json({ error: 'Missing prospect data in request body' });
  }

  try {
    const prompt = `Write a personalized B2B prospecting email draft for the following prospect:
Contact Name: ${prospect.contactName}
Company Name: ${prospect.companyName}
Contact Position: ${prospect.contactPosition || 'N/A'}
Industry: ${prospect.industry || 'N/A'}
Website: ${prospect.website || 'N/A'}

The email should be professional and persuasive, with a clear subject line. Provide the output as a JSON object with 'subject' and 'body' properties.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Using gpt-3.5-turbo as a default, can be refined
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
    });

    const llmResponse = completion.choices[0].message.content;
     if (!llmResponse) {
        return res.status(500).json({ error: 'LLM did not return content' });
    }

    let emailDraft: { subject: string; body: string };
    try {
        emailDraft = JSON.parse(llmResponse);
        if (typeof emailDraft.subject !== 'string' || typeof emailDraft.body !== 'string') {
             throw new Error('Invalid JSON structure from LLM');
        }
    } catch (parseError) {
        console.error('Failed to parse LLM email response:', llmResponse, parseError);
        return res.status(500).json({ error: 'Failed to parse LLM response as email draft' });
    }


    res.json({
      subject: emailDraft.subject,
      body: emailDraft.body,
      metadata: {
        personalization: {}, // This could be populated with personalization details later
        templateId: 'llm_generated',
      },
    });

  } catch (error) {
    console.error('Error calling OpenAI API for email generation:', error);
    res.status(500).json({ error: 'Failed to generate email draft using LLM' });
  }
});


app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
