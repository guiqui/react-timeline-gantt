import { useContext } from "react";
import { TimelineContext } from "../context";

export const useDataItem = (id: string | number) => {
    const { data } = useContext(TimelineContext)

    let item = data?.map((x, ix) => ({...x, index: ix})).find((a) => a.id == id)
    return item //data?.map((x, ix) => ({...x, index: ix})).find((a) => a.id == id)
}

export const useData = () => {
    const { data } = useContext(TimelineContext)

    return data?.map((x, ix) => ({...x, index: ix}));
}
