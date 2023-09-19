import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { CalendarComponent } from './calendar.component';

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'CalendarComponent'
};
export default meta;
type Story = StoryObj<CalendarComponent>;

export const Primary: Story = {
  args: {
    selectedDateInput: new Date()
  }
};

export const Heading: Story = {
  args: {
    selectedDateInput: new Date()
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/calendar works!/gi)).toBeTruthy();
  }
};
