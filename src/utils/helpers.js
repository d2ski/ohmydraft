export const stringifyCSS = function(props) {
    return Object.entries(props)
        .map(([k, v]) => `${k}: ${v};`)
        .join(' ');
}