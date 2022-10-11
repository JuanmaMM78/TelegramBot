const { executeQuery } = require("../helpers/utils");

const create = ({id, is_bot, first_name, last_name, username, language_code}) => {
    return executeQuery('insert into users (telegram_id, is_bot, first_name, last_name, username, language_code) values (?,?,?,?,?,?)', [id, is_bot, first_name, last_name, username, language_code]);
};

module.exports ={
    create
};