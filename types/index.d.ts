

export default class TimeLine extends React.Component<TimeLineProps> {

}

type TimeLineProps = {
    data?: Task[];
    links?: Link[];
    config?: Config;
    onUpdateTask?: (task: Task, props: object) => void;
    onCreateLink?: (link: Link) => void;
    onSelectItem?: (item: object) => void;
    onHorizonChange?: (start: Date, end: Date) => void;
};

type Task = {
    id: string | number;
    start: Date;
    end: Date;
    name: string;
    color?: string;
};

type Link = {
    id: string | number;
    start: string | number;
    end: string | number;
};

export type Config = Partial<{
    header: Partial<{
        top: Partial<{
            style: React.CSSProperties;
        }>;
        middle: Partial<{
            style: React.CSSProperties;
            selectedStyle: React.CSSProperties;
        }>;
        bottom: Partial<{
            style: React.CSSProperties;
            selectedStyle: React.CSSProperties;
        }>;
    }>;
    taskList: Partial<{
        title: Partial<{
            label: string;
            style: React.CSSProperties;
        }>;
        task: Partial<{
            style: React.CSSProperties;
        }>;
        verticalSeparator: Partial<{
            style: React.CSSProperties;
            grip: Partial<{
                style: React.CSSProperties;
            }>;
        }>;
    }>;
    dataViewPort: Partial<{
        rows: Partial<{
            style: React.CSSProperties;
        }>;
        task: Partial<{
            showLabel: boolean;
            style: React.CSSProperties;
            selectedStyle: React.CSSProperties;
        }>;
    }>;
    links: Partial<{
        color: string;
        selectedColor: string;
    }>;
}>;
