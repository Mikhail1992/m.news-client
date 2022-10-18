import Select from './index';
import { storiesOf } from '@storybook/react';
import Grid from '../Grid';

const stories = storiesOf('Selects', module);
const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];
stories.add('Selects', (args: any) => {
  return (
    <Grid type="container" gap={1}>
      <Grid type="item" xs={12}>
        <Select
          {...args}
          placeholder="Placeholder"
          helperText="Helper text"
          label="Label"
          options={options}
        />
      </Grid>
      <Grid type="item" xs={12}>
        <Select
          {...args}
          disabled
          label="Disabled"
          placeholder="Placeholder"
          helperText="Helper text"
          options={options}
        />
      </Grid>
      <Grid type="item" xs={12}>
        <Select
          {...args}
          error
          label="Error"
          placeholder="Placeholder"
          helperText="Helper text"
          options={options}
        />
      </Grid>
    </Grid>
  );
});
