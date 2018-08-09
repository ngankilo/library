const Redirector = require('./redirector');

module.exports = async (context, next) => {
    context.redirectTo = function (destination, routeParameters = {}, options = {}) {
        context.shoudRedirect = new Redirector(destination, routeParameters, options);
        return context.shoudRedirect;
    };
    await next();

    if (context.shoudRedirect) {

        if (context.session) {
            context.shoudRedirect.getFlashesData().forEach(flashData => context.session.flash(flashData.key, flashData.value));
        }

        context.redirect(context.router.url(context.shoudRedirect.destination, context.shoudRedirect.routeParameters, context.shoudRedirect.options));
    }
};
