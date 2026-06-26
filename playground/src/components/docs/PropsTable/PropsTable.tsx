'use client';
import { Text, Table, Box } from '@ken/react';
import type { PropDoc } from '@/generated/docs.generated';

export function PropsTable({ props }: { props: PropDoc[] }) {
  if (props.length === 0) return null;
  return (
    <Box as="section" direction="column" gap="space3">
      <Text as="h2" size="subheading">
        Props
      </Text>
      <Table bordered striped>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Prop</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Default</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {props.map((p) => (
            <Table.Row key={p.name}>
              <Table.Cell>
                <Text as="code" size="caption">
                  {p.name}
                  {p.required ? '*' : ''}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text as="code" size="caption" tone="secondary">
                  {p.type}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="caption" tone="secondary">
                  {p.defaultValue ?? '—'}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size="caption" tone="secondary">
                  {p.description}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}
