import Aura from '@primeuix/themes/aura';
import { definePreset, palette } from '@primeuix/themes';

const Noir = definePreset(Aura, {
    typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px', // font-size mặc định toàn app
        lineHeight: '1.5',
        heading: {
            fontSize: '1.25rem',
            fontWeight: '600'
        },
        body: {
            fontSize: '0.875rem'
        }
    },
    semantic: {
        primary: palette('{sky}')
    }
});

export default Noir;
