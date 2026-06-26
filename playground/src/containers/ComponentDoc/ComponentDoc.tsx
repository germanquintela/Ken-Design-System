import { CodePreview } from '@ken/react';
import type { CodeLanguage } from '@ken/react';
import type { DocEntry } from '@/generated/docs.generated';
import { AppWrapper } from '@/components/AppWrapper';
import { parseDoc } from '@/lib/docs/parseDoc';
import { DocLayout } from '@/components/docs/DocLayout';
import { DocSection } from '@/components/docs/DocSection';
import { PropsTable } from '@/components/docs/PropsTable';
import { KenExample } from '@/components/docs/KenExample';

const CODE_LANGS = new Set<CodeLanguage>([
  'tsx',
  'jsx',
  'ts',
  'js',
  'css',
  'bash',
]);
const asLang = (l: string): CodeLanguage =>
  CODE_LANGS.has(l as CodeLanguage) ? (l as CodeLanguage) : 'tsx';

export function ComponentDoc({ entry }: { entry: DocEntry }) {
  const { meta, props } = entry;
  const { lede, sections } = parseDoc(entry.body);

  return (
    <AppWrapper>
      <DocLayout
        title={meta.title}
        description={meta.description}
        lede={lede}
        hero={meta.hero}
      >
        {sections.map((section, i) => (
          <DocSection
            key={i}
            title={section.title}
            description={section.description}
          >
            {section.blocks.length > 0 &&
              section.blocks.map((block, k) =>
                block.lang === 'ken' ? (
                  <KenExample key={k} json={block.src} />
                ) : (
                  <CodePreview
                    key={k}
                    code={block.src}
                    language={asLang(block.lang)}
                  />
                ),
              )}
          </DocSection>
        ))}

        {props.length > 0 && (
          <DocSection>
            <PropsTable props={props} />
          </DocSection>
        )}
      </DocLayout>
    </AppWrapper>
  );
}
