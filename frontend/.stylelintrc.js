module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'color-hex-length': 'long',
        'declaration-property-value-allowed-list': {
            '/^(color|background|border|fill|stroke)/': [
                '/^var\\(--/',  // Allow CSS variables
                'transparent',
                'currentColor',
                'inherit',
                'initial',
                'none'
            ],
        },
        'color-no-hex': true, // Disallow hex codes to enforce variable usage
    },
};
