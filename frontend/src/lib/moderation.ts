/**
 * Content Moderation Utility (FR-003.5)
 * 
 * Client-side content filtering for harmful/explicit content.
 * This provides a first layer of defense; server-side moderation should also be implemented.
 */

// Common explicit/harmful word patterns (sanitized for code)
const BLOCKED_PATTERNS = [
    // Violence-related patterns
    /\b(kill|murder|attack|harm|hurt)\s+(you|me|them|people|everyone)\b/gi,
    /\bkill\s*yourself\b/gi,
    /\bself[\s-]?harm\b/gi,

    // Explicit content patterns
    /\b(nude|naked|porn|xxx|nsfw)\b/gi,
    /\bsexual\s+(content|act|favor)\b/gi,

    // Harassment patterns
    /\bkys\b/gi,
    /\bshut\s*up\s*(bitch|idiot|moron)\b/gi,

    // Hate speech patterns (simplified)
    /\b(hate|kill)\s+(all|every)\s+\w+\b/gi,

    // Scam/phishing patterns
    /\b(send|give)\s+(me|us)\s+(money|cash|bitcoin|crypto)\b/gi,
    /\bbank\s*(account|details|password)\b/gi,
];

// Warning patterns (less severe, show warning but allow)
const WARNING_PATTERNS = [
    /\b(stupid|idiot|dumb|loser)\b/gi,
    /\b(hate|suck|terrible)\b/gi,
];

export interface ModerationResult {
    /**
     * Whether the content passed moderation
     */
    isAllowed: boolean;

    /**
     * Whether to show a warning (content allowed but borderline)
     */
    showWarning: boolean;

    /**
     * User-facing message explaining the moderation result
     */
    message: string | null;

    /**
     * Categories of violations found
     */
    violations: string[];
}

/**
 * Moderates user input content for harmful/explicit material
 * 
 * @param content - The text content to moderate
 * @returns ModerationResult with allowed status and any warnings
 */
export function moderateContent(content: string): ModerationResult {
    if (!content || typeof content !== 'string') {
        return {
            isAllowed: true,
            showWarning: false,
            message: null,
            violations: [],
        };
    }

    const violations: string[] = [];

    // Check for blocked patterns
    for (const pattern of BLOCKED_PATTERNS) {
        if (pattern.test(content)) {
            violations.push('blocked_content');
            break;
        }
    }

    if (violations.includes('blocked_content')) {
        return {
            isAllowed: false,
            showWarning: false,
            message: 'Your message contains content that violates our community guidelines. Please rephrase and try again.',
            violations,
        };
    }

    // Check for warning patterns
    let hasWarning = false;
    for (const pattern of WARNING_PATTERNS) {
        if (pattern.test(content)) {
            hasWarning = true;
            violations.push('potentially_harmful');
            break;
        }
    }

    if (hasWarning) {
        return {
            isAllowed: true,
            showWarning: true,
            message: 'Your message may be interpreted negatively. Consider rephrasing for a more positive interaction.',
            violations,
        };
    }

    // Check for excessive caps (shouting)
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (content.length > 10 && capsRatio > 0.7) {
        return {
            isAllowed: true,
            showWarning: true,
            message: 'Using excessive capital letters can come across as shouting. Consider using normal case for a calmer conversation.',
            violations: ['excessive_caps'],
        };
    }

    return {
        isAllowed: true,
        showWarning: false,
        message: null,
        violations: [],
    };
}

/**
 * Quick check for content moderation without detailed result
 */
export function isContentAllowed(content: string): boolean {
    return moderateContent(content).isAllowed;
}

/**
 * Sanitize content by removing potentially harmful patterns
 * (less aggressive than full moderation)
 */
export function sanitizeContent(content: string): string {
    let sanitized = content;

    // Replace blocked patterns with [removed]
    for (const pattern of BLOCKED_PATTERNS) {
        sanitized = sanitized.replace(pattern, '[removed]');
    }

    return sanitized;
}
