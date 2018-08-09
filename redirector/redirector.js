class Redirector {
    constructor(destination, routeParameters = {}, options = {}) {
        this.destination = destination;
        this.routeParameters = routeParameters;
        this.options = options;
        this.flashes = [];
    }

    getFlashesData() {
        return this.flashes;
    }


    flash(key, value) {
        this.flashes.push({key: key, value: value});
        return this;
    }
}

module.exports = Redirector;
