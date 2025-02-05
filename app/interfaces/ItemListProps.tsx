interface ItemListProps {
    items: ItemProps[];
    handleStatusChange: (id: number, newStatus: boolean) => void;
}