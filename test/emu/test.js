import YanClient from '../../src/annotation/YanClient';
import GetMapping from '../../src/annotation/GetMapping';
import Header from '../../src/annotation/Header';
import Params from '../../src/annotation/Params';

// @YanClient("user-service", "v1")
export default class UserClient {

    @GetMapping('/users/:userId')
    @Params("params:userId")
    @Header("Content-Type", "application/json")
    @YanClient()
    getUser(userId) {
        console.log('send request.')
    }


    // @PostMapping('/users', RequestBody)
    createUser(user) {
    }
}

let client = new UserClient();

// console.log('========');
// console.log(UserClient.SERVICE_NAME);

const response = client.getUser("test-user-id");
console.log(response);