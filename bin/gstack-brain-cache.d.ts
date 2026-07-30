// Type declarations for gstack-brain-cache (Bun shebang script, no .ts extension)
// This file enables TypeScript to resolve imports of '../bin/gstack-brain-cache'.

interface CacheMeta {
  schema_version: string;
  endpoint_hash: string;
  last_refresh: Record<string, number>;
  last_attempt?: Record<string, number>;
}

interface GetResult {
  path: string;
  state: 'warm' | 'cold-refreshed' | 'stale-fallback' | 'missing';
  message?: string;
}

interface LockHandle {
  release: () => void;
}

interface BootstrapDraft {
  product?: { slug: string; title: string; body: string };
  goals?: Array<{ slug: string; title: string; body: string }>;
  developer_persona?: { slug: string; title: string; body: string };
  brand?: { slug: string; title: string; body: string };
  competitive_intel?: { slug: string; title: string; body: string };
}

export function entityDir(entity: { scope: string; file: string }, projectSlug: string | null): string;
export function entityPath(entityName: string, projectSlug: string | null): string;
export function metaPath(scope: 'cross-project' | 'per-project', projectSlug: string | null): string;
export function detectEndpointHash(): string;
export function cmdGet(entityName: string, projectSlug: string | null): GetResult;
export function withRefreshLock<T>(projectSlug: string | null, fn: () => T): T | 'dedup';
export function refreshEntity(entityName: string, projectSlug: string | null): boolean;
export function refreshAll(projectSlug: string | null): { success: number; failed: number };
export function cmdInvalidate(entityName: string, projectSlug: string | null): void;
export function getSalienceAllowlist(): ReadonlyArray<string>;
export function isSalienceSlugAllowed(slug: string, allowlist: ReadonlyArray<string>): boolean;
export function cmdDigest(slug: string): string | null;
export function cmdMeta(projectSlug: string | null): CacheMeta;
export function cmdBootstrap(projectSlug: string): BootstrapDraft;
export function cmdList(projectSlug: string | null): Array<{ type: string; slug: string; title?: string }>;
export function cmdPurge(slug: string): { deleted: boolean; error?: string };
