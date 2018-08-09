const PaginatedCollection = require('./paginated-collection');
const VError              = require('verror');

class MongoPaginator {
    /**
     * Set the maximum number of item in a page
     *
     * @param items
     * @returns {MongoPaginator}
     */
    setItems(items) {
        this.items = items;

        return this;
    }

    /**
     *
     * @param {number} page
     * @param {number} items
     * @returns {Promise<PaginatedCollection>}
     */
    async fetch(query, page = 1, items = null) {

        if (page <= 0) {
            throw new VError('E_PAGINATOR: Invalid page [%s]', page);
        }

        if (null === items) {
            items = this.items;
        }

        let startIndex    = (page - 1) * items;
        let rawCollection = await query.skip(startIndex).limit(items + 1).toArray();
        let hasNext       = rawCollection.length > items;

        if (hasNext) {
            rawCollection.pop();
        }

        let collection = new PaginatedCollection(rawCollection)
            .setPage(page)
            .setItems(items)
        ;

        if (hasNext) {
            collection.havingNext();
        }

        return collection;
    }
}

module.exports = MongoPaginator;
