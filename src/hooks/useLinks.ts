import { useContext } from "react";
import { TimelineContext } from "../context";


export const useTaskLinks = (task_id?: string | number) => {
    const { links } = useContext(TimelineContext)
    return links?.map((x, ix) => ({...x, index: ix})).filter((a) => a.source == task_id || a.target || task_id)
}
export const useLink = (id?: string | number) => {
    const { links } = useContext(TimelineContext)
    console.log(links, id)
    if(!id) {
     //  return addLink(id)
    };
    return links?.map((x, ix) => ({...x, index: ix})).find((a) => a.id == id)
}

export const useLinks = () => {
    const { links } = useContext(TimelineContext)

    return links?.map((x, ix) => ({...x, index: ix}));
}
