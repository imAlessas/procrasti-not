import { describe, expect, it } from 'vitest';
import { parseObjectId, parseText } from './http';

const status = (fn: () => unknown): number | undefined => {
    try {
        fn();
    } catch (e: any) {
        return e.status;
    }
};

describe('request validation', () => {
    it('trims valid text', () => expect(parseText('  buy milk ')).toBe('buy milk'));

    it('rejects empty, non-string and too long text', () => {
        expect(status(() => parseText('   '))).toBe(400);
        expect(status(() => parseText(42))).toBe(400);
        expect(status(() => parseText('x'.repeat(501)))).toBe(400);
    });

    it('accepts only 24 character hex object ids', () => {
        expect(parseObjectId('507f1f77bcf86cd799439011')).toBe('507f1f77bcf86cd799439011');
        expect(status(() => parseObjectId('nope'))).toBe(400);
        expect(status(() => parseObjectId({ $ne: null }))).toBe(400);
    });
});
