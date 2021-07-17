import { DAY_DAY_MODE, DAY_MONTH_MODE, DAY_WEEK_MODE, DAY_YEAR_MODE, VIEW_MODE_DAY, VIEW_MODE_MONTH, VIEW_MODE_WEEK, VIEW_MODE_YEAR } from "../Const";

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


export const getDayWidth = (mode: string) => {
    switch (mode) {
      case VIEW_MODE_DAY:
        return DAY_DAY_MODE;
      case VIEW_MODE_WEEK:
        return DAY_WEEK_MODE;
      case VIEW_MODE_MONTH:
        return DAY_MONTH_MODE;
      case VIEW_MODE_YEAR:
        return DAY_YEAR_MODE;
      default:
        return DAY_MONTH_MODE;
    }
  }
