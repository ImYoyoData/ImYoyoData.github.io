# YoyoRobot 机器人插件

>支持面板的机器人
>
>YoyoRobot机器人 [**下载**](https://www.minebbs.net/resources/yoyorobot.4559/)
>
>如果不了解的话可以加qq群[点击添加QQ群](https://jq.qq.com/?_wv=1027&k=OrdpaLLX)<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=GELx1rLzuxYlNOkxDL6eFPBlKRc7gqu3&jump_from=webapi&authKey=+MSPf+1VOAK4WWUmK0l52KB9FkSDbd7GI/07Ruv6hr3XTmsEzWsuNln+T0acdBmE"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="(Yoyo)MCBE交流群&lt;$ǿĀD&gt;&lt;%" title="(Yoyo)MCBE交流群&lt;$ǿĀD&gt;&lt;%"></a>

1. [事件文档](./event)
2. [api文档](./api)


## 搭建教程
<iframe src="//player.bilibili.com/player.html?aid=947720928&bvid=BV1WW4y137wA&cid=962195041&page=1" width="1024" height="640" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 第三方调用

### http api 调用(有返回值)

请求地址: http://你的主机地址(本地可以直接 localhost或者127.0.0.1):4000/key密钥/api的函数名

方式: POST

请求头类型: application/json

Body数据: Array   []

举例 发送群聊信息:

```json
地址: http://localhost:4000/NmcBLnKynv/sendGroupMsg

数据:[363457102,"我是机器人,我是通过http发送的"]

返回: 
{
	"code": 200,
	"message": "success",
	"data": {
		"seq": 28199,
		"rand": 1358019652,
		"time": 1661865554,
		"message_id": "FanqTluYjw8AAG4nUPG8RGMODlIB"
	}
}
```



### websocket 调用支持监听(调用无返回值)

握手地址: ws://你的主机地址(本地可以直接 localhost或者127.0.0.1):5000/key密钥

注意Key错误会被拒绝 并强制断开

#### 发送Api调用

举例 发送群聊信息:

```json
{
type:'sendGroupMsg',//api函数名
data:[
       363457102,
       "我是机器人,我通过websocket发送的信息"
    ]//对呀函数的数据
}
```





# 新版本 llse api 调用 支持事件和 api使用 (>=0.1.18)

```javascript
//新版本调用举例


const yoyorobot = require('../yoyorobot/llseapi.js');//这个是nodejs 插件去调用的路径
//const yoyorobot = require('./nodejs/yoyorobot/llseapi.js');//这个是 js 插件去调用的路径

//这是一个初始化函数 在这个里面才能使用 yoyo 变量 你可以在顶部定义一个变量 来赋值 也可以的
yoyorobot((yoyo) => {
   
    //等机器人上线后才可以 进行发送聊天等操作哦
    yoyo.listen('online', (event) => {
        // 监听到机器人上线了
        log('监听到机器人上线了1');
        yoyo.client.sendGroupMsg(569211842, [yoyo.segment.text('我是通过segment转义发送的文本')]).then(res => {
            log('回调触发:', res);
        });
    });


    yoyo.listen('messageGroup', (event) => {
        // 监听到机器人群消息
        log('群消息:', event);

    });

}, 'test2');//这个 test2  就是你当前的 插件名（可以自定义的）
```





## (旧版本不推荐使用)LLSE API 调用(无返回值,因为异步的原因返回不了....)

发送信息举例:

```js
mc.listen("onServerStarted", () => {
    if (ll.hasExported('yoyorobot', 'api')) {
        let yoyorobot = ll.import('yoyorobot', 'api');
        setTimeout(() => {
            yoyorobot('sendGroupMsg', [363457102, '我是用llse插件调用发送的哦' + new Date()]);
        }, 3000);//这里为啥要延迟呢?因为不知道是否已经登录成功  只有登录成功 才可以发送
    } else {
        logger.error('没有检测到 YoyoRobot 接口');
    }
});
```



## 机器人扩展

> 扩展是在机器人登录完成后才加载的
>
> 欢迎大家开发更多扩展哦(机器人携带一个官方正则扩展) [下载正则扩展](https://wwrw.lanzoub.com/i6fD60i5az8h)

```js
//扩展路径 './YoyoRobot'
yoyo.__dirname  //返回当前扩展绝对路径
```

## 其它优秀扩展

- [CustomGetMap](https://www.minebbs.net/resources/customgetmap-yoyorobot.4341/) - 用于CustomGetMap 的 YoyoRobot机器人正则扩展(群里上传图片到游戏地图画)
- [Robot客服一问一答](https://www.minebbs.com/resources/robot-yoyorobot.4608/)
- [在群内重启BDS服务端](https://www.minebbs.com/resources/bds-yoyorobot.4602/)

## 配置文件 

```
路径 './plugins/Yoyo/YoyoRobot/config.json'
```



``` js
{
    "config": {
        "account": "1536724751",//qq账号
        "password": "****",//qq密码
        "log_level": "warn",//日志输出等级
         /** 日志等级，默认info (往屏幕打印日志会降低性能，若消息量巨大建议修改此参数或重定向)
        "trace" | "debug" | "info" | "warn" | "error" | "fatal" | "mark" | "off" */
        "platform": 5,/** 1:安卓手机(默认) 2:aPad 3:安卓手表 4:MacOS 5:iPad */
        "ports": {
            "http": 4000,//http 默认端口
            "websocket": 5000,//websocket 默认端口
            "isIncrement": true//检测端口被占用 是否进行端口自增 然后尝试开启(会导致可能和设置的默认端口不一致)
        },
        "key": "****",//http 和 websocket 连接需要 key 进行身份验证
        "isHttp": true,//是否启动http
        "isWebSocket": true//是否启动 websocket
    }
}
```

