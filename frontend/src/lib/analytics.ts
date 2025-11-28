type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    __remiraiAnalyticsQueue__?: Array<{ event: string; payload?: AnalyticsPayload }>;
  }
}

export function trackEvent(event: string, payload?: AnalyticsPayload) {
  if (typeof window !== 'undefined') {
    const detail = { event, payload, timestamp: Date.now() };
    window.dispatchEvent(new CustomEvent('remirai-analytics', { detail }));
    window.__remiraiAnalyticsQueue__ = window.__remiraiAnalyticsQueue__ || [];
    window.__remiraiAnalyticsQueue__!.push(detail);
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${event}`, payload ?? '');
  }
}


