# 🏗️ Agent Architect

**Transform ideas into secure, deployable AI agents**

Agent Architect is a microservice that generates complete, production-ready Next.js applications powered by Claude AI. Designed for inventors, founders, and creators who understand systems conceptually but don't write code professionally.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- Anthropic API key ([Get one](https://console.anthropic.com))
- Vercel account for deployment ([Sign up](https://vercel.com/signup))

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

4. **Test the agent**
   - Enter a description of the agent you want to create
   - Click "Generate Agent"
   - Receive complete deployment package with all files

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts to deploy.

3. **Add environment variable**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your API key
   - Redeploy

## 🏛️ Architecture

**Deployment Mode**: Standalone microservice  
**Independence**: Fully self-contained  
**Communication**: HTTP/REST API at `/api/agent`  
**Integration**: Optional (can be called by other services)

### API Endpoints

**POST /api/agent**
- Generates a complete AI agent deployment package
- Request body: `{ "input": "description of agent" }`
- Response: `{ "result": "complete agent package with files" }`

**GET /api/agent**
- Health check endpoint
- Response: `{ "status": "healthy", "service": "Agent Architect", "version": "1.0.0" }`

## 🔒 Security Features

✅ API keys secured in environment variables
✅ Input validation (10-5000 characters)
✅ Error messages sanitized
✅ No data persistence (stateless)
✅ Rate limiting via Vercel
✅ TypeScript for type safety
✅ **Professional communication standards enforced**

### Communication Standards

**All generated agents enforce professional, respectful communication**:
- ❌ No condescending language ("calm down", "take a breath")
- ❌ No patronizing phrases ("let me help you understand")
- ❌ No emotional assumptions about users
- ✅ Direct, factual responses
- ✅ Respectful, neutral tone
- ✅ Culturally appropriate language

See [COMMUNICATION_STANDARDS.md](./COMMUNICATION_STANDARDS.md) for complete guidelines.

## 💰 Cost Estimate

- **Vercel**: Free tier (sufficient for testing and moderate use)
- **Claude API**: ~$0.003-0.015 per request (depending on complexity)
- **Expected monthly**: ~$5-50 for 1,000-10,000 requests

## 🔗 Integration Options

### Option 1: Call from Main Application
```typescript
const response = await fetch('https://your-agent-architect.vercel.app/api/agent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    input: 'Create an agent that analyzes customer feedback' 
  })
});
const data = await response.json();
console.log(data.result);
```

### Option 2: Agent-to-Agent Communication
```typescript
// One agent calling Agent Architect
const response = await fetch('https://agent-architect.vercel.app/api/agent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input: agentDescription })
});
```

### Option 3: CLI Tool
```bash
curl -X POST https://your-agent-architect.vercel.app/api/agent \
  -H "Content-Type: application/json" \
  -d '{"input":"Create an agent that scores rental listings"}'
```

## 📦 What You Get

Each generated agent includes:
- ✅ Complete Next.js application
- ✅ Frontend UI with Tailwind CSS
- ✅ Backend API with Claude integration
- ✅ Security features built-in
- ✅ Deployment instructions
- ✅ Environment variable templates
- ✅ TypeScript configuration
- ✅ All dependencies specified

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.18
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **AI**: Anthropic Claude (Sonnet 4)
- **Deployment**: Vercel
- **Runtime**: Node.js 18+

## 📚 What It Won't Do

❌ Generate agents for harmful purposes  
❌ Medical diagnosis or treatment  
❌ Legal or financial advice  
❌ Privacy violations  
❌ Deceptive practices

## 🐛 Troubleshooting

**"Configuration error"**
- Check that `ANTHROPIC_API_KEY` is set in `.env.local`
- Verify your API key is valid at console.anthropic.com

**"Service busy"**
- Rate limit reached - wait a moment and try again
- Consider upgrading your Anthropic plan

**Build errors**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version: `node --version` (should be 18+)

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Microservices Architecture](https://microservices.io)

## 📄 License

Private use only. Not for redistribution.

## 🤝 Support

For issues or questions, refer to DEPLOYMENT.md for detailed instructions.

---

**Built with ❤️ for inventors, founders, and creators**
