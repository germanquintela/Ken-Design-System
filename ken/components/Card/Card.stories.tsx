import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: { border: true, radius: 'surface', width: 'full' },
  argTypes: {
    border: { control: 'boolean' },
    radius: {
      control: 'inline-radio',
      options: ['none', 'nav', 'control', 'surface'],
    },
    width: { control: 'inline-radio', options: ['full', 'fit', 'auto'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Cards fill their container by default, so the stories constrain width with a
// plain wrapper (raw inline style — story scaffolding, like Button's `Row`).
const Wrap = ({ w = 460, children }: { w?: number; children: ReactNode }) => (
  <div style={{ width: w }}>{children}</div>
);

const Title = ({ children }: { children: ReactNode }) => (
  <span style={{ fontSize: 14, fontWeight: 500 }}>{children}</span>
);
const Para = ({ children }: { children: ReactNode }) => (
  <span style={{ fontSize: 14, color: '#4d505d' }}>{children}</span>
);

// Sections carry NO padding — the consumer owns it via the Box they render
// inside. `Bar` (header/footer) and `Pad` (body) show the canonical pattern.
const Bar = ({ children }: { children: ReactNode }) => (
  <Box width="full" px="space6" py="space4" align="center" justify="between">
    {children}
  </Box>
);
const Pad = ({ children }: { children: ReactNode }) => (
  <Box width="full" p="space6">
    {children}
  </Box>
);

/** A realistic card — header bar, body, footer actions. Drive root props from Controls. */
export const Playground: Story = {
  render: (args) => (
    <Wrap>
      <Card {...args}>
        <Card.Header background="subtle">
          <Bar>
            <Title>Invoice #1042</Title>
            <Para>Due Jun 30</Para>
          </Bar>
        </Card.Header>
        <Card.Body>
          <Pad>
            <Para>
              Body content sits on the card&apos;s white surface, between the
              bars.
            </Para>
          </Pad>
        </Card.Body>
        <Card.Footer>
          <Box width="full" px="space6" py="space4" justify="end" gap="space2">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
            <Button size="sm">Approve</Button>
          </Box>
        </Card.Footer>
      </Card>
    </Wrap>
  ),
};

/** Sections are opt-in — the hairline appears only where a header/footer exists. */
export const Sections: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      <Wrap w={220}>
        <Card>
          <Card.Body>
            <Pad>
              <Para>Body only</Para>
            </Pad>
          </Card.Body>
        </Card>
      </Wrap>
      <Wrap w={220}>
        <Card>
          <Card.Header background="subtle">
            <Bar>
              <Title>Header</Title>
            </Bar>
          </Card.Header>
          <Card.Body>
            <Pad>
              <Para>Header + body</Para>
            </Pad>
          </Card.Body>
        </Card>
      </Wrap>
      <Wrap w={220}>
        <Card>
          <Card.Body>
            <Pad>
              <Para>Body + footer</Para>
            </Pad>
          </Card.Body>
          <Card.Footer>
            <Bar>
              <Title>Footer</Title>
            </Bar>
          </Card.Footer>
        </Card>
      </Wrap>
      <Wrap w={220}>
        <Card>
          <Card.Header background="subtle">
            <Bar>
              <Title>Header</Title>
            </Bar>
          </Card.Header>
          <Card.Body>
            <Pad>
              <Para>All three</Para>
            </Pad>
          </Card.Body>
          <Card.Footer>
            <Bar>
              <Title>Footer</Title>
            </Bar>
          </Card.Footer>
        </Card>
      </Wrap>
    </div>
  ),
};

/** Per-section `background` — `subtle` tints the header/footer bands, body stays white. */
export const TintedSections: Story = {
  name: 'Tinted sections',
  render: () => (
    <Wrap>
      <Card>
        <Card.Header background="subtle">
          <Bar>
            <Title>Subtle header (#fcfcfa)</Title>
          </Bar>
        </Card.Header>
        <Card.Body>
          <Pad>
            <Para>White body between the two tinted bands</Para>
          </Pad>
        </Card.Body>
        <Card.Footer background="subtle">
          <Bar>
            <Title>Subtle footer</Title>
          </Bar>
        </Card.Footer>
      </Card>
    </Wrap>
  ),
};

/** `shadow` casts a soft, subtle shadow onto the body — header down, footer up. */
export const Shadow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Wrap w={300}>
        <Card>
          <Card.Header background="subtle" shadow>
            <Bar>
              <Title>Header — shadow</Title>
            </Bar>
          </Card.Header>
          <Card.Body>
            <Pad>
              <Para>The header casts a soft shadow down onto the body.</Para>
            </Pad>
          </Card.Body>
        </Card>
      </Wrap>
      <Wrap w={300}>
        <Card>
          <Card.Body>
            <Pad>
              <Para>The footer casts a soft shadow up onto the body.</Para>
            </Pad>
          </Card.Body>
          <Card.Footer shadow>
            <Bar>
              <Title>Footer — shadow</Title>
            </Bar>
          </Card.Footer>
        </Card>
      </Wrap>
    </div>
  ),
};

/** `radius` amount + the borderless variant. */
export const RadiusAndBorder: Story = {
  name: 'Radius & border',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      {(['none', 'nav', 'control', 'surface'] as const).map((r) => (
        <Wrap w={200} key={r}>
          <Card radius={r}>
            <Card.Header background="subtle">
              <Bar>
                <Title>radius={r}</Title>
              </Bar>
            </Card.Header>
            <Card.Body>
              <Pad>
                <Para>…</Para>
              </Pad>
            </Card.Body>
          </Card>
        </Wrap>
      ))}
      <Wrap w={200}>
        <Card border={false}>
          <Card.Header background="subtle">
            <Bar>
              <Title>border=false</Title>
            </Bar>
          </Card.Header>
          <Card.Body>
            <Pad>
              <Para>no outer border</Para>
            </Pad>
          </Card.Body>
        </Card>
      </Wrap>
    </div>
  ),
};
