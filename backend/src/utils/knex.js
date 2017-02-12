const knex = require('../knex');


const upsert = async (tableName, where = [], values, trx) => {
  const rows = await knex(tableName).transacting(trx).where(where);
  if (rows.length > 0) {
    return knex(tableName).transacting(trx).where(where).update(Object.assign(values, {
      updated_at: knex.raw('CURRENT_TIMESTAMP')
    }));
  }
  return knex(tableName).transacting(trx).insert(values);
};

module.exports = {
  upsert
};
