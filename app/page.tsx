'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#E8E9ED] mb-4">
            🏗️ Agent Architect
          </h1>
          <p className="text-xl text-[#B8BCC8]">
            Transform ideas into secure, deployable AI agents
          </p>
          <p className="text-sm text-[#6C7293] mt-2">
            Standalone microservices • Production ready • Non-technical friendly
          </p>
        </div>

        <div className="bg-[#1A1F3A] rounded-2xl shadow-2xl p-8 border border-[#2A3150]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-[#B8BCC8] mb-2">
                Describe the agent you want to create
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Example: I need an agent that analyzes customer feedback and categorizes it by sentiment and topic..."
                className="w-full px-4 py-3 border border-[#2A3150] bg-[#0A0E27] text-[#E8E9ED] placeholder-[#6C7293] rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
                rows={6}
                required
                minLength={10}
                maxLength={5000}
              />
              <div className="mt-2 text-sm text-[#6C7293]">
                {input.length} / 5000 characters
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || input.length < 10}
              className="w-full bg-[#4A90E2] hover:bg-[#357ABD] disabled:bg-[#2A3150] disabled:text-[#6C7293] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Agent...
                </span>
              ) : (
                '🚀 Generate Agent'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-[#2A1F1F] border border-[#5A3A3A] rounded-lg">
              <p className="text-[#E8B4B4] text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-[#0A0E27] border border-[#2A3150] rounded-lg">
              <h2 className="text-xl font-semibold text-[#E8E9ED] mb-4">
                ✅ Agent Generated Successfully
              </h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-[#B8BCC8] bg-[#1A1F3A] p-4 rounded-lg overflow-x-auto border border-[#2A3150]">
                  {result}
                </pre>
              </div>
              <div className="mt-4 p-4 bg-[#1F2A1F] border border-[#3A5A3A] rounded-lg">
                <p className="text-[#B4E8B4] text-sm">
                  <strong>Next Steps:</strong> Copy the files above, create the project structure, and deploy to Vercel.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#6C7293]">
            Powered by Claude AI • Secure by default • Microservice architecture
          </p>
        </div>
      </div>
    </div>
  );
}
