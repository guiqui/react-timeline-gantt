class Registry {
    constructor() {
        this.data = {}
        this.link = {}
    }

    registerData(list) {
        if (!list)
            return;
        this.data = {}
        const groups = this.groupData(list, 0, list.length);
        Object.values(groups).forEach((group, i) => {
            group.forEach(item => {
                this.data[item.id] = { item, index: i };
            });
        });
    }

    registerLinks(list) {
        if (!list)
            return
        this.link = {}
        let start = 0;
        let end = 0;
        for (let i = 0; i < list.length; i++) {
            start = list[i].start;
            end = list[i].end;
            let value = { link: list[i], index: i }
            this.createAddTo(start, this.link, value, i)
            this.createAddTo(end, this.link, value, i)
        }
    }
    createAddTo(id, list, value, index) {
        if (!list[id])
            list[id] = []
        if (list[id].indexOf(value) == -1)
            list[id].push(value)
    }

    getTask(id) {
        return this.data[id]
    }
    getLinks(id) {
        return this.link[id]
    }
    groupData(list, startIndex, endIndex) {
        const groups = {};
        for (let i = startIndex; i < endIndex; i++) {
            let item = list[i];
            if (!item) break;
            const key = item.groupName !== undefined ? item.groupName : item.id;
            if (groups[key] !== undefined) {
                groups[key].push(item);
            } else {
                groups[key] = [item];
            }
        }
        return groups;
    }

}
const instanceRegistry = new Registry();
export default instanceRegistry;