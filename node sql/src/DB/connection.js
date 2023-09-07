import mysql from "mysql2";

const connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "assignment",
  host: "localhost",
});
export default connection;
