import client from "./connectionstring";
import "regenerator-runtime/runtime"
import { async } from "regenerator-runtime/runtime";
import UserModel from "../model/UserModel"
import ExceptionModel from "../viewmodels/ExceptionModel"

const GetUserByUserName = async (username) => {

        try {
                await client.connect();
                const query = { UserName: username };
                const options = {
                    projection: { _id: 0, UserName: 1, Password: 1 },
                };

                const user = await client.db("chatera").collection("user").findOne(query);

                return user;          
  
          } catch (error) {
              console.warn(error.message);
          }
          finally{
              client.close();
          }
}

const CreateUser = async (usermodel) => {
    try {
        await client.connect();
        const user = await client.db("chatera").collection("user").insertOne(usermodel);
        return user;
        
    } catch (error) {
        console.log(error.message);
    }
    finally{
        client.close();
    }
}

const UpdateUserById = async () => {

}

export default {
    GetUserByUserName,
    CreateUser
}