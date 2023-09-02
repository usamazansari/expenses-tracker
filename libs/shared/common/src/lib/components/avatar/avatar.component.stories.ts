import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { User } from 'firebase/auth';

import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  component: AvatarComponent,
  title: 'AvatarComponent'
};
export default meta;
type Story = StoryObj<AvatarComponent>;

export const Primary: Story = {
  args: {
    userInput: {
      displayName: 'Test User',
      email: 'test_user@email.com'
    } as User
  }
};

export const Heading: Story = {
  args: {
    userInput: {
      displayName: 'Test User',
      email: 'test_user@email.com'
    } as User
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/avatar works!/gi)).toBeTruthy();
  }
};
