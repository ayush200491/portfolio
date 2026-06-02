import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: '/Portfolio_Logo.svg',
    brandTitle: 'Ayush Patidar Components',
    brandUrl: 'https://github.com/ayush200491',
  },
});
