import type { Meta, StoryObj } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormControl } from '@angular/forms';

import { DatePickerComponent } from './datepicker.component';

const meta: Meta<DatePickerComponent> = {
  component: DatePickerComponent,
  title: 'DatePickerComponent'
};
export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Primary: Story = {
  args: {
    idInput: '',
    formControlInput: new FormControl(),
    selectedDateInput: new Date()
  }
};

export const Heading: Story = {
  args: {
    idInput: '',
    formControlInput: new FormControl(),
    selectedDateInput: new Date()
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/datepicker works!/gi)).toBeTruthy();
  }
};
