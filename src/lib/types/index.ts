// Client-safe shapes: what the server sends to the browser (ids are plain strings).

export interface TodoDTO {
    id: string;
    text: string;
    isDone: boolean;
    created: number;
    completed: number | null;
}

export interface UserDTO {
    id: string;
    username?: string;
    email?: string;
    theme: string;
}
