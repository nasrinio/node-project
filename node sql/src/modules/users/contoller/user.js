import connection from "../../../DB/connection.js";


export const signUp = (req, res, next) => {
  const { email, name, password, age } = req.body;
  const query = `insert into users (email, name, password) values ('${email}','${name}', '${password}' , '${age}')`;
  connection.execute(query, (err, result) => {
    if (err) {
      return res.json({ message: "ERROR", err });
    } else {
      return res.json({ message: "Done", result });
    }
  });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  const query = `select * from users where email='${email}' and password ='${password}')`;
  connection.execute(query, (err, result) => {
    if (err) {
      return res.json({ message: "ERROR", err });
    } else {
      if (result.length) {
        return res.json({ message: "Done", result });
      } else {
        return res.json({ message: "email or password invalid" });
      }
    }
  });
};

//searchUser

export const searchUser = (req, res, next) => {
  const { letter, age } = req.body;
  const query = `select * from users where name LIKE'${letter}%' and age < '${age}')`;
  connection.execute(query, (err, result) => {
    if (err) {
      return res.json({ message: "ERROR", err });
    } else {
      return res.json({ message: "Done", result });
    }
  });
};

export const searchUserById = (req, res, next) => {
  const query = `select * from users where id in('${req.query.id}')`;
  connection.execute(query, (err, result) => {
    if (err) {
      return res.json({ message: "ERROR", err });
    } else {
      return res.json({ message: "Done", result });
    }
  });
};

export const deleteUser = (req, res, next) => {
  const { id } = req.params;
  const query = `DELETE from users where id=${id}`;
  connection.execute(query, (err, result) => {
    if (err) {
      return res.json({ message: "ERROR", err });
    } else {
      return result.effectedRows
        ? res.json({ message: "Done", result })
        : res.json({ message: "invalid id" });
    }
  });
};

export const updateUser = (req, res, next) => {
  const { name, price, description } = req.body;
  const query = `INSERT INTO users(email, name, age) VALUES ("${email}","${name}","${age}")`;
  connection.execute(query, (err, result) => {
    if (err) {
      return res.json({ message: "ERROR", err });
    } else {
      return result.effectedRows
        ? res.json({ message: "Done", result })
        : res.json({ message: "invalid id" });
    }
  });
};
