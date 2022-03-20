import client from "./connectionstring";
import "regenerator-runtime/runtime"
import { async } from "regenerator-runtime/runtime";
import UserModel from "../model/UserModel"
import ExceptionModel from "../viewmodels/ExceptionModel"

async function GetUserByUserName(username){

        try {
                await client.connect();
                const query = { UserName: username };
                const options = {
                    projection: { _id: 0, UserName: 1, Password: 1 },
                };

                const db = await client.db("chatera").collection("user");
                const user = await db.findOne(query)

                return user;          
  
          } catch (e) {
              console.warn(e.message);
          }
          finally{
              client.close();
          }
}

export default {
    GetUserByUserName
}