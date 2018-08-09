const Collection = require('./collection');

/**
 * A collection which is a paginated result
 */
class PaginatedCollection extends Collection {
    
    /**
     *
     * @param elements
     */
    constructor (elements = []) {
        super(elements);
        
        this.next = false;
    }
    
    /**
     * Set the current page of this collection
     *
     * @param {number} page - The current page
     * @returns {PaginatedCollection}
     */
    setPage (page) {
        this.currentPage = page;
        
        return this;
    }
    
    /**
     * Set the maximum number of items in a page
     *
     * @param {number} items - The maximum number of items in a page
     * @returns {PaginatedCollection}
     */
    setItems (items) {
        this.perPage = items;
        
        return this;
    }
    
    /**
     * Mark this collection as having next page
     *
     * @returns {PaginatedCollection}
     */
    havingNext () {
        this.next = true;
        
        return this;
    }
    
    /**
     * Get the maximum number of items in a page
     *
     * @returns {number}
     */
    items () {
        return this.perPage;
    }
    
    /**
     * Get the current page of this collection
     *
     * @returns {number}
     */
    page () {
        return this.currentPage;
    }
    
    /**
     * Check if this collection has the next page
     *
     * @returns {boolean}
     */
    hasNext () {
        return this.next;
    }
    
    /**
     * @inheritDoc
     *
     * @param callback
     */
    map (callback) {
        let newlyMappedCollection = new PaginatedCollection(this.elements.map(callback))
            .setPage(this.page())
            .setItems(this.items())
        ;
        
        if (this.hasNext()) {
            newlyMappedCollection.havingNext();
        }
        
        return newlyMappedCollection;
    }
    
    /**
     * @inheritDoc
     *
     * @returns {{page: number, items: number, hasNext: boolean, collection: []}}
     */
    toJson () {
        return {
            page      : this.page(),
            items     : this.items(),
            next      : this.hasNext(),
            collection: super.toJson()
        };
    }
}

module.exports = PaginatedCollection;
