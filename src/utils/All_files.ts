import { getImages } from './Images';
import { fetchSEs } from './SEs';

interface FileData {
    name: string;
    url: string;
}

export async function getAllFiles(searchTerm: string = ''): Promise<FileData[]> {
    try {
        const [images, ses] = await Promise.all([
            getImages(searchTerm),
            fetchSEs(searchTerm)
        ]);

        const allFiles: FileData[] = [...images, ...ses];

        return allFiles;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}