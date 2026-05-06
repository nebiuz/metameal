import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGeminiClient, GEMINI_MODEL, FOOD_ANALYSIS_PROMPT } from '@/lib/gemini';

// Mock the GoogleGenAI class to prevent actual network calls during testing
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation((config) => {
      return {
        apiKey: config.apiKey,
        models: {
          generateContent: vi.fn().mockResolvedValue({
            text: () => '{"mocked": "data"}'
          })
        }
      };
    }),
  };
});

describe('Gemini Backend Library', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('throws an error if GEMINI_API_KEY is not set', () => {
    delete process.env.GEMINI_API_KEY;
    expect(() => getGeminiClient()).toThrowError("GEMINI_API_KEY environment variable is not set");
  });

  it('initializes the client when GEMINI_API_KEY is provided', () => {
    process.env.GEMINI_API_KEY = 'test-mock-key-123';
    const client = getGeminiClient();
    expect(client).toBeDefined();
    expect(client.apiKey).toBe('test-mock-key-123');
  });

  it('exports the correct model version', () => {
    expect(GEMINI_MODEL).toBe('gemini-3-flash-preview');
  });

  it('exports a valid prompt structure', () => {
    expect(FOOD_ANALYSIS_PROMPT).toContain('foods');
    expect(FOOD_ANALYSIS_PROMPT).toContain('timeline');
    expect(FOOD_ANALYSIS_PROMPT).toContain('energyCurve');
    expect(FOOD_ANALYSIS_PROMPT).toContain('JSON');
  });
});
