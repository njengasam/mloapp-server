import { db } from '../database/connection';

/**
   * check for existence helper method
   * @param {string} tbName table name
   * @param {{}} condition Object. {column : value, ...}
   * @returns {Boolean} True or False
   */
const checkForExistence = (tbName, condition) => {
  
      let query = db(tbName).where(condition);
      let exists = db.raw(query).wrap('exists (', ')');
  
      return( 
        db.select(exists).then(result => {
            return result[0].exists;
        }).catch(err => {
            return(err + '');
        })
      );
  
  }

  export{
      checkForExistence
  }