export const stringifyCSS = function(props) {
    return Object.entries(props)
        .map(([k, v]) => `${k}: ${v};`)
        .join(' ');
}

export const fmtReadTime = function (minutes) {
    if (minutes < 1) {
        return `${Math.round(minutes * 60)} sec`;
    } else if (minutes < 60) {
        return `${Math.round(minutes)} min`;
    } else {
        return `${Math.round(minutes / 60)} hrs`;
    }
};