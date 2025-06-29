import axios from 'axios';

interface FileData {
    name: string;
    url: string;
}

export async function fetchSEs(searchTerm: string = ''): Promise<FileData[]> {
    try {
        const response = await axios.get<FileData[]>('https://files.practa.tech/files');

        const filteredFiles = response.data.filter(file =>
            file.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        return filteredFiles;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
