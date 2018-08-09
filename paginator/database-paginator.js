const PaginatedCollection = require('./paginated-collection');
const VError              = require('verror');

class DatabasePaginator {
    
    /**
     * Set the maximum number of item in a page
     *
     * @param items
     * @returns {DatabasePaginator}
     */
    setItems (items) {
        this.items = items;
        
        return this;
    }
    
    /**
     *
     * @param {knex.QueryBuilder|database|*} query
     * @param {number} page
     * @param {number} items
     * @returns {Promise<DatabasePaginator>}
     */
    async fetch (query, page=1, items = 50) {
        
        if (page <= 0) {
            throw new VError('E_PAGINATOR: Invalid page [%s]', page);
        }
        
        if (null === items) {
            items = this.items;
        }
        
        let startIndex    = (page - 1) * items;
        let rawCollection = await query.limit(items + 1).offset(startIndex);
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

module.exports = DatabasePaginator;
