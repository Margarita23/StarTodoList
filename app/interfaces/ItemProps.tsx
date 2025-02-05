interface ItemProps {
    id: number;
    name: string;
    description: string;
    status: boolean;
    handleStatusChange?: (id: number, newStatus: boolean) => void;
}