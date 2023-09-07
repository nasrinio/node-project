import connection from "../../../DB/connection.js";

export const addProduct = (req, res, next) => {
    const {  pName, pDescription, price , userID } = req.body;
    const query = `insert into products (pName, pDescription, price , userID) 
            values ('${pName}','${pDescription}', '${price}' , '${userID}')`;
    connection.execute(query, (err, result) => {
      if (err) {
        return res.json({ message: "ERROR", err });
      } else {
        return res.json({ message: "Done", result });
      }
    });
  };


  export const searchProduct = (req, res, next) => {
    const { price } = req.query;
    const query = `select * from products where price <${price}`;

    connection.execute(query, (err, result) => {
      if (err) {
        return res.json({ message: "ERROR", err });
      } else {
        return res.json({ message: "Done", result });
      }
    });
  };

  export const updateProduct = (req, res, next) => {
    const {  pName, pDescription, price ,id,userID  } = req.body;
    const query = `update user set pName= "${pName}",pDescription = "${pDescription}" ,price"${price}" where id='${id}' and userID=${userID}`;
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
  