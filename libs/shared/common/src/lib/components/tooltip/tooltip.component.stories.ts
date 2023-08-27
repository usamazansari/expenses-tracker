import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { TooltipComponent } from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  component: TooltipComponent,
  title: 'TooltipComponent'
};
export default meta;
type Story = StoryObj<TooltipComponent>;

export const Primary: Story = {
  args: {
    tooltipPosition: 'above'
  }
};

export const Heading: Story = {
  args: {
    tooltipPosition: 'above'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tooltip works!/gi)).toBeTruthy();
  }
};
