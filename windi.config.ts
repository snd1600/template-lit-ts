import { defineConfig } from 'windicss/helpers';
import icons from '@windicss/plugin-icons';
import colors from 'windicss/colors';

export default defineConfig({
  plugins: [icons],
  theme: {
    extend: {
      colors: {
        primary: colors.rose,
        secondary: colors.teal,
      },
    },
  },
});
