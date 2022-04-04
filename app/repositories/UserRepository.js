import client from "./connectionstring";
import "regenerator-runtime/runtime"
import { async } from "regenerator-runtime/runtime";
import UserModel from "../model/UserModel"
import { ObjectID } from "bson";

const GetUserById = async (id) => {

    try {
            await client.connect();
            const query = { _id: new ObjectID(id) };
            const options = {
                projection: { UserName: 1 },
            };

            const user = await client.db("chatera").collection("user").findOne(query, options);

            return user;          

      } catch (error) {
          console.warn(error.message);
      }
      finally{
          client.close();
      }
}

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

const UpdateUserById = async (id, usermodel) => {
    try {
        await client.connect();

        const user = await client.db("chatera").collection("user").updateOne({
            _id: new ObjectID(id)
        },{
            $set : {
                UserName : usermodel.UserName,
            }
        },{
            upsert : true
        });

        return user;          

  } catch (error) {
      console.warn(error.message);
  }
  finally{
      client.close();
  }
}

export default {
    GetUserById,
    GetUserByUserName,
    CreateUser,
    UpdateUserById
}