# OpenAI Integration Guide

**Version:** 1.0.0  
**Date:** 2025-12-27  
**Status:** Active  

---

## 1. Overview

OpenAI API is used for persona synthesis and chat response generation.

---

## 2. Service Location

```
backend/src/modules/openai/openai.service.ts
```

---

## 3. Methods

### 3.1 generatePersona()

**Purpose:** Create persona from survey responses

**Input:**
```typescript
{
  responses: Array<{ question: string; answer: any }>;
  mode: 'FATED' | 'ALCHEMIC';
  archetype?: string;
}
```

**Output:**
```typescript
{
  name: string;
  archetype: string;
  stats: { charisma, intellect, kindness, energy };
  systemPrompt: string;
  greeting: string;
  rarity: string;
}
```

---

### 3.2 generateChatResponse()

**Purpose:** Generate in-character AI response

**Input:**
```typescript
{
  systemPrompt: string;
  personaName: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  userMessage: string;
}
```

**Output:** `string` (AI response)

---

### 3.3 moderateContent()

**Purpose:** Check content safety

**Output:**
```typescript
{ safe: boolean; reason?: string }
```

---

## 4. Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | API key | Required |
| `OPENAI_MODEL` | Model to use | `gpt-4o-mini` |

---

## 5. Rate Limits

| Tier | Requests/min | Tokens/min |
|------|--------------|------------|
| Free | 3 | 40,000 |
| Tier 1 | 500 | 200,000 |
| Tier 2 | 5,000 | 400,000 |

---

## 6. Cost Estimation

| Operation | Input Tokens | Output Tokens | Est. Cost |
|-----------|--------------|---------------|-----------|
| Persona Gen | ~500 | ~200 | $0.002 |
| Chat Reply | ~200 | ~100 | $0.001 |

---

## 7. Error Handling

```typescript
try {
  const response = await openai.chat.completions.create({...});
} catch (error) {
  // Return fallback response
  return { safe: true }; // For moderation
  return 'I need a moment...'; // For chat
}
```
