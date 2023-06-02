export interface BookResponse {
    kind?: string;
    totalItems: number;
    items: Book[];
}
export interface Book {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: BookVolumeInfo;
    isFavorites?: boolean;
}

export interface BookVolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks?: BookImageLink;
    previewLink: string;
}

export interface BookImageLink {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
}
