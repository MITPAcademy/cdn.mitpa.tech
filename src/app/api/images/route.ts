import { readdir } from 'fs/promises';
import { join, extname } from 'path';
import { NextResponse } from 'next/server';

const imageExtensions = ['.png', '.webp', '.jpg', '.jpeg', '.ico', '.gif', '.bmp', '.tiff'];

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('q')?.toLowerCase() || '';
    const publicDir = join(process.cwd(), 'public');
    const baseUrl = 'https://raw.githubusercontent.com/MITPAcademy/cdn.mitpa.tech/refs/heads/src/public';

    try {
        const files = await readdir(publicDir);

        const imageFiles = files.filter(file => {
            const ext = extname(file).toLowerCase();
            return imageExtensions.includes(ext) && file.toLowerCase().startsWith(searchTerm);
        });

        const fileInfos = imageFiles.map(file => ({
            name: file,
            url: `${baseUrl}/${encodeURIComponent(file)}`
        }));

        return NextResponse.json(fileInfos);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
