const lodash = require('lodash');

class RouterDecorator {

    constructor (controllerHandlerResolver) {
        this.controllerHandlerResolver = controllerHandlerResolver;
    }

    decorate (config, router) {

        lodash.each(config, (groupRoute, groupName) => {
            lodash.each(groupRoute.routes, (routeConfig, routeName) => {
                let handlers = lodash.concat(
                    groupRoute.middlewares,
                    routeConfig.handlers.map((spec) => {
                        if (lodash.isString(spec)) {
                            return this.controllerHandlerResolver.resolve(spec)
                        }
                        return spec;
                    }));
                router[routeConfig.method](`${groupName}-${routeName}`, routeConfig.url, ...handlers)
            });
        });
    }
}

module.exports = RouterDecorator;
