import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';
import Avatar, {AvatarProps, AvatarShape, AvatarSize} from "./avatar";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Atoms/Avatar',
    component: Avatar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Avatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    src: 'https://via.placeholder.com/50',
    shape: AvatarShape.rounded,
    size: AvatarSize.regular,
};
