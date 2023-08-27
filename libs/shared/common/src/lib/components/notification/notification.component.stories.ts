import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { NotificationComponent } from './notification.component';

const meta: Meta<NotificationComponent> = {
  component: NotificationComponent,
  title: 'NotificationComponent'
};
export default meta;
type Story = StoryObj<NotificationComponent>;

export const Primary: Story = {
  args: {}
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/notification works!/gi)).toBeTruthy();
  }
};
