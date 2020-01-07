var user = {
    insert: 'INSERT INTO user(id,uuid, name, pwd, phone,createtime) VALUES(0,?,?,?,?,now())',
    update: 'update user set username=?, pwd=? where id=?',
    delete: 'delete from user where id=?',
    queryAll: 'select * from user',
    login: 'select id,uuid as userid,name as username,phone from user where (name=? or phone=?) and pwd=?',
    check: 'select id from user where name=? or phone=?',
};

module.exports = user;