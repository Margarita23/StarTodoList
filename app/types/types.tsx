export type  Item = {
    id: number;
    name: string;
    description: string;
    status: boolean;
}

export type Todo = {
    name: string;
    status: boolean;
    items: Item[];
}
