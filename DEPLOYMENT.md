# 📘 Deployment Guide - Agent Architect

**Complete step-by-step instructions for non-technical users**

This guide will walk you through deploying Agent Architect to the web, even if you've never deployed an application before.

---

## 📋 Table of Contents

1. [Prerequisites (One-Time Setup)](#prerequisites)
2. [Local Testing](#local-testing)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Deploy to Microservices App Store](#deploy-to-app-store)
5. [Testing Your Deployment](#testing)
6. [Integration Patterns](#integration)
7. [Updating the Agent](#updating)
8. [Cost Management](#cost-management)
9. [Security Checklist](#security)
10. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites (One-Time Setup) {#prerequisites}

### 1. Install Node.js

**What it is**: JavaScript runtime that lets you run the application  
**Why you need it**: Next.js applications run on Node.js

**Steps**:
1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS version (recommended)
3. Run the installer
4. Verify installation:
   ```bash
   node --version
   ```
   Should show v18 or higher

### 2. Get Anthropic API Key

**What it is**: Your access key to use Claude AI  
**Why you need it**: Agent Architect uses Claude to generate agents

**Steps**:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to API Keys section
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)
6. **IMPORTANT**: Save it securely - you won't see it again

**Cost**: Pay-as-you-go, ~$0.003-0.015 per agent generation

### 3. Create Vercel Account

**What it is**: Platform for deploying web applications  
**Why you need it**: Easiest way to deploy Next.js apps

**Steps**:
1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub, GitLab, or email
3. Verify your email
4. Complete profile setup

**Cost**: Free tier includes:
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Custom domains

### 4. Install Vercel CLI (Optional but Recommended)

**What it is**: Command-line tool for deploying to Vercel  
**Why you need it**: Simplifies deployment process

**Steps**:
```bash
npm install -g vercel
```

Verify installation:
```bash
vercel --version
```

---

## 🧪 Local Testing {#local-testing}

Before deploying, test the agent on your computer.

### Step 1: Navigate to Project

Open terminal/command prompt and navigate to the agent-architect folder:

```bash
cd path/to/agent-architect
```

**Windows example**: `cd C:\Users\YourName\agent-architect`  
**Mac/Linux example**: `cd ~/Downloads/agent-architect`

### Step 2: Install Dependencies

```bash
npm install
```

**What this does**: Downloads all required packages (React, Next.js, Anthropic SDK, etc.)  
**Time**: 1-3 minutes  
**You'll see**: Progress bars and package names

### Step 3: Create Environment File

```bash
cp .env.example .env.local
```

**Windows alternative**:
```bash
copy .env.example .env.local
```

### Step 4: Add Your API Key

Open `.env.local` in any text editor and replace `your_api_key_here` with your actual Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

**CRITICAL**: Never commit this file to Git or share it publicly

### Step 5: Start Development Server

```bash
npm run dev
```

**What this does**: Starts local server at http://localhost:3000  
**You'll see**: "Ready in X ms" message

### Step 6: Test the Application

1. Open browser to [http://localhost:3000](http://localhost:3000)
2. You should see the Agent Architect interface
3. Enter a test description:
   ```
   Create an agent that analyzes customer feedback and categorizes it by sentiment
   ```
4. Click "Generate Agent"
5. Wait 10-30 seconds
6. You should receive a complete agent package

**If it works**: You're ready to deploy!  
**If it doesn't**: See [Troubleshooting](#troubleshooting)

---

## 🚀 Deploy to Vercel {#deploy-to-vercel}

### Method 1: Using Vercel CLI (Recommended)

**Step 1: Login to Vercel**
```bash
vercel login
```
Follow the prompts to authenticate.

**Step 2: Deploy**
```bash
vercel
```

You'll be asked:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → agent-architect (or your choice)
- **Directory?** → ./ (press Enter)
- **Override settings?** → No

**Step 3: Add Environment Variable**

After deployment:
```bash
vercel env add ANTHROPIC_API_KEY
```

When prompted:
- **Value**: Paste your API key
- **Environment**: Production
- **Add to Development?** → Yes
- **Add to Preview?** → Yes

**Step 4: Redeploy**
```bash
vercel --prod
```

**Done!** Your agent is live at the URL shown (e.g., `agent-architect.vercel.app`)

### Method 2: Using Vercel Dashboard

**Step 1: Push to Git**

If you haven't already:
```bash
git init
git add .
git commit -m "Initial commit"
```

Create a repository on GitHub, then:
```bash
git remote add origin https://github.com/yourusername/agent-architect.git
git push -u origin main
```

**Step 2: Import to Vercel**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your repository
4. Click "Import"

**Step 3: Configure**

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: ./
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)

**Step 4: Add Environment Variable**

Before deploying:
1. Click "Environment Variables"
2. Add:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your API key
   - **Environment**: All (Production, Preview, Development)
3. Click "Add"

**Step 5: Deploy**

Click "Deploy" and wait 2-5 minutes.

**Done!** Your agent is live at the assigned URL.

---

## 🏪 Deploy to Microservices App Store {#deploy-to-app-store}

### What is a Microservices App Store?

A marketplace where independent microservices can be discovered, deployed, and integrated. Examples:
- **Vercel Marketplace** (coming soon)
- **AWS Marketplace**
- **Azure Marketplace**
- **Custom internal app stores**

### General Deployment Process

#### 1. Package Your Microservice

Create a deployment descriptor (example for generic app store):

**`app-store.json`**
```json
{
  "name": "agent-architect",
  "displayName": "Agent Architect",
  "version": "1.0.0",
  "description": "Creates secure, deployable Next.js AI agents as standalone microservices",
  "category": "AI & Machine Learning",
  "pricing": "free",
  "author": "Your Name",
  "homepage": "https://agent-architect.vercel.app",
  "repository": "https://github.com/yourusername/agent-architect",
  "documentation": "https://agent-architect.vercel.app/docs",
  "apiEndpoint": "/api/agent",
  "healthCheck": "/api/agent",
  "environmentVariables": [
    {
      "name": "ANTHROPIC_API_KEY",
      "description": "Anthropic API key for Claude AI",
      "required": true,
      "secret": true
    }
  ],
  "capabilities": [
    "code-generation",
    "ai-agents",
    "microservices",
    "deployment-automation"
  ],
  "integration": {
    "type": "rest-api",
    "methods": ["POST", "GET"],
    "authentication": "none",
    "rateLimit": "100/hour"
  }
}
```

#### 2. Deploy to Vercel First

All microservices app stores require a live URL. Follow the [Vercel deployment](#deploy-to-vercel) steps first.

#### 3. Submit to App Store

**For Vercel Marketplace** (when available):
1. Go to Vercel Dashboard
2. Select your project
3. Click "Publish to Marketplace"
4. Fill in details
5. Submit for review

**For AWS Marketplace**:
1. Create AWS account
2. Register as seller
3. Create product listing
4. Provide deployment template (CloudFormation)
5. Submit for review

**For Custom App Store**:
1. Contact app store administrator
2. Provide deployment URL
3. Submit `app-store.json` descriptor
4. Complete integration testing
5. Await approval

#### 4. Configure Integration

Most app stores require:
- **API documentation**: Describe endpoints
- **Health check**: Implement `/api/agent` GET endpoint (already done)
- **Monitoring**: Set up error tracking
- **Support**: Provide contact information

#### 5. Set Pricing (Optional)

Options:
- **Free**: No charge (current setup)
- **Freemium**: Free tier + paid features
- **Pay-per-use**: Charge per API call
- **Subscription**: Monthly/annual fee

**Note**: Agent Architect is designed to be free, with users paying for their own Claude API usage.

---

## ✅ Testing Your Deployment {#testing}

### Test 1: Health Check

```bash
curl https://your-agent-architect.vercel.app/api/agent
```

**Expected response**:
```json
{
  "status": "healthy",
  "service": "Agent Architect",
  "version": "1.0.0",
  "description": "Creates secure, deployable Next.js AI agents as standalone microservices"
}
```

### Test 2: Generate Agent

```bash
curl -X POST https://your-agent-architect.vercel.app/api/agent \
  -H "Content-Type: application/json" \
  -d '{"input":"Create an agent that summarizes long articles"}'
```

**Expected**: JSON response with complete agent package

### Test 3: Frontend UI

1. Open `https://your-agent-architect.vercel.app` in browser
2. Enter agent description
3. Click "Generate Agent"
4. Verify you receive complete package

### Test 4: Error Handling

Test with invalid input:
```bash
curl -X POST https://your-agent-architect.vercel.app/api/agent \
  -H "Content-Type: application/json" \
  -d '{"input":"hi"}'
```

**Expected**: Error message about minimum length

---

## 🔗 Integration Patterns {#integration}

### Pattern 1: Direct API Call

```typescript
async function generateAgent(description: string) {
  const response = await fetch('https://your-agent-architect.vercel.app/api/agent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: description })
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate agent');
  }
  
  const data = await response.json();
  return data.result;
}
```

### Pattern 2: Webhook Integration

```typescript
// Your app receives webhook when user requests agent
app.post('/webhook/generate-agent', async (req, res) => {
  const { description, callbackUrl } = req.body;
  
  // Call Agent Architect
  const response = await fetch('https://your-agent-architect.vercel.app/api/agent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: description })
  });
  
  const data = await response.json();
  
  // Send result to callback URL
  await fetch(callbackUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent: data.result })
  });
  
  res.json({ status: 'processing' });
});
```

### Pattern 3: Orchestration Layer

```typescript
// Central service coordinating multiple agents
async function createAgentEcosystem(requirements: string[]) {
  const agents = await Promise.all(
    requirements.map(req => 
      fetch('https://your-agent-architect.vercel.app/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: req })
      }).then(r => r.json())
    )
  );
  
  return agents.map(a => a.result);
}
```

---

## 🔄 Updating the Agent {#updating}

### Update Code

1. Make changes to your local files
2. Test locally: `npm run dev`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

### Redeploy

**If using Vercel CLI**:
```bash
vercel --prod
```

**If using Git integration**:
- Push to main branch
- Vercel auto-deploys

### Update Environment Variables

```bash
vercel env add ANTHROPIC_API_KEY
```

Or via dashboard:
1. Go to project settings
2. Environment Variables
3. Edit or add new variables
4. Redeploy

---

## 💰 Cost Management {#cost-management}

### Monitor Usage

**Anthropic Console**:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. View usage dashboard
3. Set up billing alerts

**Vercel Dashboard**:
1. Go to project analytics
2. Monitor bandwidth and function invocations
3. Set up usage alerts

### Set Budget Limits

**Anthropic**:
- Set monthly spending limit in console
- Receive alerts at 50%, 75%, 90%

**Vercel**:
- Free tier: 100GB bandwidth/month
- Upgrade to Pro if needed ($20/month)

### Optimize Costs

1. **Cache responses** (if appropriate)
2. **Rate limit requests** (prevent abuse)
3. **Monitor token usage** (optimize prompts)
4. **Use smaller models** (if sufficient)

### Expected Costs

**Low usage** (100 requests/month):
- Anthropic: ~$0.50-1.50
- Vercel: Free
- **Total**: ~$1-2/month

**Medium usage** (1,000 requests/month):
- Anthropic: ~$5-15
- Vercel: Free
- **Total**: ~$5-15/month

**High usage** (10,000 requests/month):
- Anthropic: ~$50-150
- Vercel: Free (or $20 Pro)
- **Total**: ~$50-170/month

---

## 🔒 Security Checklist {#security}

### Before Deployment

- [ ] API key stored in environment variable (not hardcoded)
- [ ] `.env.local` added to `.gitignore`
- [ ] Input validation implemented
- [ ] Error messages sanitized
- [ ] Rate limiting configured
- [ ] HTTPS enabled (automatic with Vercel)

### After Deployment

- [ ] Test health check endpoint
- [ ] Verify API key is not exposed in responses
- [ ] Test error handling with invalid inputs
- [ ] Monitor for unusual activity
- [ ] Set up logging (Vercel provides this)

### Ongoing

- [ ] Rotate API keys periodically
- [ ] Review access logs monthly
- [ ] Update dependencies regularly
- [ ] Monitor for security advisories
- [ ] Backup configuration

---

## 🐛 Troubleshooting {#troubleshooting}

### "Configuration error"

**Cause**: Missing or invalid API key

**Solution**:
1. Check `.env.local` has correct key
2. Verify key starts with `sk-ant-`
3. Test key at console.anthropic.com
4. For Vercel: Check environment variables in dashboard

### "Service busy"

**Cause**: Rate limit reached

**Solution**:
1. Wait 60 seconds and retry
2. Check Anthropic usage limits
3. Consider upgrading plan

### Build Fails

**Cause**: Missing dependencies or configuration

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Module not found"

**Cause**: Dependency not installed

**Solution**:
```bash
npm install
```

### Deployment Fails

**Cause**: Various (check error message)

**Common solutions**:
1. Verify all files committed to Git
2. Check build logs in Vercel dashboard
3. Ensure Node.js version compatible (18+)
4. Verify environment variables set

### API Returns Empty Response

**Cause**: Claude API issue or prompt problem

**Solution**:
1. Check Anthropic status page
2. Verify API key has credits
3. Test with simpler input
4. Check Vercel function logs

---

## 📞 Getting Help

**Vercel Support**:
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

**Anthropic Support**:
- Documentation: [docs.anthropic.com](https://docs.anthropic.com)
- Support: support@anthropic.com

**Next.js**:
- Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Community: [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

---

## 🎉 Success!

You've successfully deployed Agent Architect as a microservice! 

**Next steps**:
1. Share your deployment URL
2. Integrate with other services
3. Monitor usage and costs
4. Generate amazing AI agents!

**Remember**: Each agent you generate is also a standalone microservice that can be deployed the same way.

---

**Built with ❤️ for inventors, founders, and creators**
