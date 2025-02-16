export interface PathItem {
    name: string;
    size?: string; // Optional, since directories don’t have a size
    mtime: string; // Modification time as a formatted string (YYYY-MM-DD HH:MM:SS)
}

export interface PathTree {
    currentDir: string;
    dirs: PathItem[]; // List of subdirectories (with mtime, no size)
    files: PathItem[]; // List of files (with size and mtime)
}

export interface TableRow {
    name: string;
    type: string;
    size?: string;
    mtime: string;
}

export interface TableData {
    tableRows: TableRow[];
}

export interface WSMessage {
    type: 'connect' | 'disconnect' | 'upload' | 'delete' | 'download';
    client_ip: string;
    path: string;
}