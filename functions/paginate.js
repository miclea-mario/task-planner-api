const Knex = require('knex');

module.exports.attachPaginate = function attachPaginate() {
  function paginate(query) {
    let { per_page: perPage = 30, page: currentPage = 1 } = query;

    if (isNaN(perPage)) {
      throw new Error('Paginate error: perPage must be a number.');
    }

    if (isNaN(currentPage)) {
      throw new Error('Paginate error: currentPage must be a number.');
    }

    if (currentPage < 1) {
      currentPage = 1;
    }

    const offset = (currentPage - 1) * perPage;

    const countQuery = new this.constructor(this.client)
      .count('* as total')
      .from(this.clone().offset(0).clearOrder().as('count__query__'))
      .first()
      .debug(this._debug);

    // This will paginate the data itself
    this.offset(offset).limit(perPage);

    return this.client.transaction(async (trx) => {
      const pages = await this.transacting(trx);
      const countResult = await countQuery.transacting(trx);
      const total = +(countResult.TOTAL || countResult.total);
      const hasNext = total > pages.length + offset;

      // Add pagination data to the page params
      const pageParams = {
        count: +total,
        hasNext: !!hasNext,
        page: +currentPage,
        perPage: +perPage,
      };

      return { pageParams, pages };
    });
  }

  Knex.QueryBuilder.extend('paginate', paginate);
};
