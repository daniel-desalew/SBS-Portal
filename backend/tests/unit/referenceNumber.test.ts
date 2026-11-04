import { describe, expect, it } from 'vitest';
import { generateReferenceNumber } from '../../src/modules/applications/referenceNumber.util';

describe('generateReferenceNumber', () => {
  it('creates a unique SBS-prefixed reference', () => {
    const first = generateReferenceNumber();
    const second = generateReferenceNumber();
    expect(first).toMatch(/^SBS-[A-F0-9]{12}$/);
    expect(second).not.toBe(first);
  });
});