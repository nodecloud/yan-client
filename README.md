# Yan Client
Yan Client 是一种声明式的 NodeJS Http客户端。默认基于 (request)[]。使用了 ES7 decorators 语法，更加简介，方便。

## 使用
``` 
npm install yan-client --save
```

## 例子
```javascript
import YanClient, {GetMapping, PostMapping, PutMapping, DeleteMapping, Params} from 'yan-client';
export default new class UserClient {
    @GetMapping('http://example.com/users')
    @YanClient()
    getUsers() {}
    
    @GetMapping('http://example.com/users/:userId')
    @Params('params:userId')
    @YanClient()
    getUser(userId) {}
    
    @PostMapping('http://example.com/users')
    @YanClient()
    createUser(user) {}
    
    @DeleteMapping('http://example.com/users/:userId')
    @Params('params:userId')
    @YanClient()
    deleteUser(userId) {}
    
    @PutMapping('http://example.com/users/:userId')
    @Params('params:userId', 'body')
    @YanClient()
    updateUser(userId, user) {}
}
```

## 文档

### @***Mapping(url)

这个装饰器用来设置请求的 URL。

### @Header(key, value)

这个装饰器用来设置请求的 header。

### @Params(...params)

这个装饰器用来确定函数的参数和请求的参数的映射关系，每个参数和函数的参数按照顺序一一对应；
其中每个参数都是由 [prefix]:[postfix] 这样的表达式组成，postfix 可以为空，
当 postfix 为空的时候，对应的参数必须为对象，因为当只有 prefix 的时候，对应的参数会完全替换请求参数。例如：

```javascript
class Test {
    @Params("body")
    test(user) {} // user: {username: 'test', password: 'password'}
}
```

最终生成的 request 对象如下：

```javascript
request.body //{username: 'test', password: 'password'}
```

如果参数是字符串或者数字，那么就不能完全替换，可以加上 postfix 来替换某个属性。例如：

```javascript
class Test {
    @Params("body:username", "body:password")
    test(username, password) {} // username: 'test', password: 'password'
}
```

最终生成的 request 对象如下：

```javascript
request.body //{username:'test', password: 'password'}
```

目前支持的 prefix 有：

* params
* qs
* headers
* body

### @YanClient(client)

这个装饰器必须位于所有的装饰器之后，用来最终发送 http 请求，如果不想使用 默认的 request 库来发送请求，
可以通过 client 参数来进行自定义。

```javascript
const customClient = {
    send(options) {
        /*
            options.url
            options.method
            options.body
            options.params
            options.headers
            options.qs
         */
        
        return /* promise */
    }
}

class Test {
    @YanClient(customClient)
    test() {}
}
```