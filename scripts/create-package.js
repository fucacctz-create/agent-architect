const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGE_NAME = 'agent-architect-deployment';
const VERSION = '1.0.0';
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const PACKAGE_DIR = path.join(OUTPUT_DIR, PACKAGE_NAME);

const FILES_TO_INCLUDE = [
  'README.md',
  'DEPLOYMENT.md',
  'COMMUNICATION_STANDARDS.md',
  'package.json',
  'tsconfig.json',
  'next.config.js',
  'tailwind.config.ts',
  'postcss.config.js',
  '.gitignore',
  '.env.example',
  'app/layout.tsx',
  'app/globals.css',
  'app/page.tsx',
  'app/api/agent/route.ts',
  'vercel.json'
];

console.log('📦 Creating deployment package for Agent Architect...\n');

if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true });
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(PACKAGE_DIR, { recursive: true });

console.log('✓ Created output directory\n');

FILES_TO_INCLUDE.forEach(file => {
  const sourcePath = path.join(__dirname, '..', file);
  const destPath = path.join(PACKAGE_DIR, file);
  
  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️  Warning: ${file} not found, skipping...`);
    return;
  }
  
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(sourcePath, destPath);
  console.log(`✓ Copied ${file}`);
});

console.log('\n📝 Creating marketplace metadata...\n');

const marketplaceMetadata = {
  name: "Agent Architect",
  version: VERSION,
  category: "AI Development Tools",
  pricing: {
    monthly: 29,
    yearly: 290,
    currency: "USD"
  },
  description: "Transform ideas into secure, deployable AI agents. No coding required.",
  longDescription: "Agent Architect is a standalone microservice that generates complete, production-ready AI agents powered by Claude. Perfect for inventors, founders, and non-technical creators who need custom AI solutions without writing code.",
  features: [
    "Generate complete AI agents from descriptions",
    "Secure by default (API key protection, input validation)",
    "Professional communication standards enforced",
    "Standalone microservice architecture",
    "One-click Vercel deployment",
    "Complete documentation for non-coders",
    "TypeScript + Next.js + Tailwind CSS",
    "No data persistence (stateless)"
  ],
  requirements: {
    technical: [
      "Anthropic API key (console.anthropic.com)",
      "Vercel account (free tier available)",
      "Node.js 18+"
    ],
    skills: [
      "No coding experience required",
      "Basic terminal usage helpful",
      "30-60 minutes for first deployment"
    ]
  },
  support: {
    documentation: "Complete README and DEPLOYMENT guide included",
    updates: "Regular updates with new features",
    compatibility: "Works with all Anthropic Claude models"
  },
  tags: [
    "ai",
    "no-code",
    "microservice",
    "claude",
    "agent",
    "deployment",
    "nextjs",
    "vercel"
  ],
  screenshots: [
    "screenshot-1.png",
    "screenshot-2.png",
    "screenshot-3.png"
  ],
  demo_url: "https://agent-architect-demo.vercel.app",
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    website: "https://yourwebsite.com"
  },
  license: "MIT",
  created: new Date().toISOString(),
  updated: new Date().toISOString()
};

fs.writeFileSync(
  path.join(PACKAGE_DIR, 'marketplace.json'),
  JSON.stringify(marketplaceMetadata, null, 2)
);

console.log('✓ Created marketplace.json\n');

console.log('📝 Creating installation script...\n');

const installScript = `#!/bin/bash

echo "🏗️  Agent Architect - Installation Script"
echo "=========================================="
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "✓ Node.js $(node -v) detected"
echo ""

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed"
    exit 1
fi

echo ""
echo "✓ Installation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Copy .env.example to .env.local"
echo "2. Add your Anthropic API key to .env.local"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:3000"
echo ""
echo "📖 Full instructions: README.md"
echo "🚀 Deployment guide: DEPLOYMENT.md"
`;

fs.writeFileSync(
  path.join(PACKAGE_DIR, 'install.sh'),
  installScript
);

fs.chmodSync(path.join(PACKAGE_DIR, 'install.sh'), '755');

console.log('✓ Created install.sh\n');

const installBat = `@echo off
echo Agent Architect - Installation Script
echo ==========================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    exit /b 1
)

echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo Installation failed
    exit /b 1
)

echo.
echo Installation complete!
echo.
echo Next Steps:
echo 1. Copy .env.example to .env.local
echo 2. Add your Anthropic API key to .env.local
echo 3. Run: npm run dev
echo 4. Visit: http://localhost:3000
echo.
echo Full instructions: README.md
echo Deployment guide: DEPLOYMENT.md
`;

fs.writeFileSync(
  path.join(PACKAGE_DIR, 'install.bat'),
  installBat
);

console.log('✓ Created install.bat\n');

console.log('📝 Creating quick start guide...\n');

const quickStart = `# 🚀 Quick Start Guide

## Installation (5 minutes)

### Option 1: Automated (Recommended)

**Mac/Linux:**
\`\`\`bash
chmod +x install.sh
./install.sh
\`\`\`

**Windows:**
\`\`\`cmd
install.bat
\`\`\`

### Option 2: Manual

\`\`\`bash
npm install
cp .env.example .env.local
# Edit .env.local and add your API key
npm run dev
\`\`\`

## Configuration (2 minutes)

1. Get API key from https://console.anthropic.com
2. Open \`.env.local\`
3. Add: \`ANTHROPIC_API_KEY=sk-ant-your-key-here\`
4. Save file

## Testing (1 minute)

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

## Deployment (5 minutes)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Follow prompts, add API key in Vercel dashboard.

## Support

- **Full Guide**: README.md
- **Deployment**: DEPLOYMENT.md
- **Communication Standards**: COMMUNICATION_STANDARDS.md

## Pricing

- **Vercel**: Free tier (sufficient for testing)
- **Claude API**: Pay per use (~$0.01-0.10 per agent generation)
- **Estimated**: $10-50/month for moderate use

## What You Get

✅ Complete AI agent generator
✅ Professional UI (no gradients)
✅ Secure by default
✅ Communication standards enforced
✅ Production ready
✅ Full documentation

**No coding required. Truly no-code.**
`;

fs.writeFileSync(
  path.join(PACKAGE_DIR, 'QUICKSTART.md'),
  quickStart
);

console.log('✓ Created QUICKSTART.md\n');

console.log('📦 Creating archive...\n');

const archiveName = `${PACKAGE_NAME}-v${VERSION}.zip`;
const archivePath = path.join(OUTPUT_DIR, archiveName);

try {
  process.chdir(OUTPUT_DIR);
  
  if (process.platform === 'win32') {
    execSync(`powershell Compress-Archive -Path "${PACKAGE_NAME}" -DestinationPath "${archiveName}" -Force`);
  } else {
    execSync(`zip -r "${archiveName}" "${PACKAGE_NAME}"`);
  }
  
  console.log(`✓ Created ${archiveName}\n`);
} catch (error) {
  console.error('⚠️  Could not create archive automatically');
  console.log('You can manually zip the folder:', PACKAGE_DIR);
}

console.log('✅ Package creation complete!\n');
console.log('📁 Output location:', OUTPUT_DIR);
console.log('📦 Package folder:', PACKAGE_DIR);
console.log('🗜️  Archive:', archivePath);
console.log('\n🎉 Ready for marketplace deployment!\n');

const summary = {
  package_name: PACKAGE_NAME,
  version: VERSION,
  output_directory: OUTPUT_DIR,
  package_directory: PACKAGE_DIR,
  archive: archivePath,
  files_included: FILES_TO_INCLUDE.length,
  marketplace_ready: true,
  installation_scripts: ['install.sh', 'install.bat'],
  documentation: ['README.md', 'DEPLOYMENT.md', 'QUICKSTART.md', 'COMMUNICATION_STANDARDS.md']
};

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'package-summary.json'),
  JSON.stringify(summary, null, 2)
);

console.log('📋 Package summary saved to package-summary.json');
