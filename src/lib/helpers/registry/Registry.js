class Registry {
    constructor() {
        this.data = {}
        this.link = {}
    }

    registerData(list, groupByName) {
        if (!list)
            return;
        this.data = {}
        if (groupByName) {
            const groups = {};
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (!item) break;
                if (groups[item.name] !== undefined) {
                    groups[item.name].push(item);
                } else {
                    groups[item.name] = [item];
                }
            }
            Object.values(groups).forEach((group, i) => {
                group.forEach(item => {
                    this.data[item.id] = { item, index: i };
                });
            });
        } else {
            for (let i = 0; i < list.length; i++) {
                this.data[list[i].id] = { item: list[i], index: i };
            }
        }
    }
    registerLinks(list, groupByName) {
        if (!list)
            return
        this.link = {}
        let start = 0;
        let end = 0;
        if (groupByName) {
            const groups = {};
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (!item) break;
                if (groups[item.id] !== undefined) {
                    groups[item.id].push(item);
                } else {
                    groups[item.id] = [item];
                }
            }
            Object.values(groups).forEach((group, i) => {
                group.forEach(item => {
                    start = item.start;
                    end = item.end;
                    let value = { link: item, index: i }
                    this.createAddTo(start, this.link, value, i)
                    this.createAddTo(end, this.link, value, i)
                });
            });
        } else {
            for (let i = 0; i < list.length; i++) {
                start = list[i].start;
                end = list[i].end;
                let value = { link: list[i], index: i }
                this.createAddTo(start, this.link, value, i)
                this.createAddTo(end, this.link, value, i)
            }
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

}
const instanceRegistry = new Registry();
export default instanceRegistry;