function getImgUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href;
}

export { getImgUrl };