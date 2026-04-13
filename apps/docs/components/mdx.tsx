import defaultMdxComponents from 'fumadocs-ui/mdx';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { ComingSoon } from '@/components/coming-soon';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComingSoon,
    TypeTable,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
