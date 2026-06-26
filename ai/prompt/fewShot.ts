export const FEW_SHOT: { role: 'user' | 'assistant'; content: string }[] = [
  {
    role: 'user',
    content:
      'A small form to add a new expense: amount and category, with a save button.',
  },
  {
    role: 'assistant',
    content: JSON.stringify({
      observations: [
        {
          title: 'Understanding the request',
          detail: 'A compact expense form.',
        },
        { title: 'Using a Card, constrained to a narrow column' },
        { title: 'Padding each Card section with a Box' },
        { title: 'Stacking amount + category inputs and a Save button' },
      ],
      message:
        "Here's a compact expense form with amount and category fields and a Save button. Want me to add a date field too?",
      spec: {
        type: 'Box',
        props: { direction: 'column', maxWidth: 'space96' },
        children: [
          {
            type: 'Card',
            children: [
              {
                type: 'Card.Header',
                children: [
                  {
                    type: 'Box',
                    props: { px: 'space6', py: 'space4' },
                    children: [
                      {
                        type: 'Text',
                        props: { size: 'subheading' },
                        children: ['New expense'],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'Card.Body',
                children: [
                  {
                    type: 'Box',
                    props: { direction: 'column', gap: 'space4', p: 'space6' },
                    children: [
                      {
                        type: 'Input',
                        props: {
                          label: 'Amount',
                          placeholder: '0.00',
                          prefix: {
                            type: 'Icon',
                            props: { name: 'DollarSign' },
                          },
                        },
                      },
                      {
                        type: 'Select',
                        props: {
                          placeholder: 'Category',
                          options: [
                            { value: 'food', label: 'Food' },
                            { value: 'travel', label: 'Travel' },
                          ],
                        },
                      },
                      {
                        type: 'Button',
                        props: { variant: 'default' },
                        children: ['Save'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    }),
  },
  {
    role: 'user',
    content: 'A table of recent transactions with merchant and amount.',
  },
  {
    role: 'assistant',
    content: JSON.stringify({
      observations: [
        { title: 'Understanding the request', detail: 'A transactions table.' },
        { title: 'Labeling the section with a heading above the table' },
        { title: 'Using a striped, hoverable Table' },
        { title: 'Right-aligning the amount column' },
      ],
      message:
        "Here's a striped transactions table with merchant and right-aligned amount columns. Want me to add a status column?",
      spec: {
        type: 'Box',
        props: { direction: 'column', gap: 'space4' },
        children: [
          {
            type: 'Text',
            props: { size: 'subheading' },
            children: ['Recent transactions'],
          },
          {
            type: 'Table',
            props: { striped: true, hover: true },
            children: [
              {
                type: 'Table.Head',
                children: [
                  {
                    type: 'Table.Row',
                    children: [
                      { type: 'Table.HeaderCell', children: ['Merchant'] },
                      {
                        type: 'Table.HeaderCell',
                        props: { align: 'right' },
                        children: ['Amount'],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'Table.Body',
                children: [
                  {
                    type: 'Table.Row',
                    children: [
                      { type: 'Table.Cell', children: ['Uber'] },
                      {
                        type: 'Table.Cell',
                        props: { align: 'right' },
                        children: ['$24.10'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    }),
  },
  {
    role: 'user',
    content:
      'An overview with two stat cards: current balance and monthly spend.',
  },
  {
    role: 'assistant',
    content: JSON.stringify({
      observations: [
        {
          title: 'Understanding the request',
          detail: 'A two-card overview.',
        },
        { title: 'Stacking a heading and the card row with a section gap' },
        { title: 'Placing two equal stat Cards side by side' },
        { title: 'Padding each card body and stacking its label + value' },
      ],
      message:
        "Here's an overview with current-balance and monthly-spend stat cards. Want me to add a sparkline or a percent-change indicator?",
      spec: {
        type: 'Box',
        props: { direction: 'column', gap: 'space6', maxWidth: 'space160' },
        children: [
          {
            type: 'Text',
            props: { size: 'headingLg' },
            children: ['Overview'],
          },
          {
            type: 'Box',
            props: { direction: 'row', gap: 'space4' },
            children: [
              {
                type: 'Card',
                props: { width: 'full' },
                children: [
                  {
                    type: 'Card.Body',
                    children: [
                      {
                        type: 'Box',
                        props: {
                          direction: 'column',
                          gap: 'space2',
                          p: 'space6',
                        },
                        children: [
                          {
                            type: 'Text',
                            props: { size: 'footnote', tone: 'secondary' },
                            children: ['Current balance'],
                          },
                          {
                            type: 'Text',
                            props: { size: 'headingLg' },
                            children: ['$12,480.50'],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'Card',
                props: { width: 'full' },
                children: [
                  {
                    type: 'Card.Body',
                    children: [
                      {
                        type: 'Box',
                        props: {
                          direction: 'column',
                          gap: 'space2',
                          p: 'space6',
                        },
                        children: [
                          {
                            type: 'Text',
                            props: { size: 'footnote', tone: 'secondary' },
                            children: ['Monthly spend'],
                          },
                          {
                            type: 'Text',
                            props: { size: 'headingLg' },
                            children: ['$3,210.00'],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    }),
  },
];
