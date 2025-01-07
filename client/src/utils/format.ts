export const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    return date.getDate().toString().padStart(2, '0') + '.'
        + (date.getMonth() + 1).toString().padStart(2, '0') + '.'
        + date.getFullYear();
}

