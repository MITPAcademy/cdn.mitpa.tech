export async function getImages(searchTerm: string = '') {
    const res = await fetch(`/api/images?q=${encodeURIComponent(searchTerm)}`);
    return res.json();
}
