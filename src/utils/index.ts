export const getBackgroundWidth = (mode: string) => {
    switch(mode){
        case 'year':
            return 7;
        case 'month':
            return 1;
        case 'week':
            return 1;
        case 'day':
            return 1 / 24;
        default:
            return 1;
    }
}

export const getBackgroundPosition = (mode: string) => {
    switch(mode){
        case 'year':
            return '12px'
        default:
            return 0;
    }
}