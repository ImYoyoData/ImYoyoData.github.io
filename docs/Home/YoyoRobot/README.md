# YoyoRobot 机器人插件

>支持面板的机器人
>
>YoyoRobot机器人 [**下载**](https://www.minebbs.net/resources/yoyorobot.4559/)
>
>如果不了解的话可以加qq群[点击添加QQ群](https://jq.qq.com/?_wv=1027&k=OrdpaLLX)

1. [事件文档](./event)
2. [api文档](./api)

## 机器人扩展

> 扩展是在机器人登录完成后才加载的
>
> 欢迎大家开发更多扩展哦(机器人携带一个官方正则扩展) [下载正则扩展](https://wwp.lanzoub.com/iW5we09xwulg)

```
扩展路径 './YoyoRobot'
```

### 扩展require第三方库方法
```js
//扩展调用第三方库使用
const json5 = yoyo.require('json5');
//这样的方法即可 引用nodejs内置库 直接 require 就可以 当然 你用 yoyo.require 也行
```

## 其它优秀扩展

- [CustomGetMap](https://www.minebbs.net/resources/customgetmap-yoyorobot.4341/) - 用于CustomGetMap 的 YoyoRobot机器人正则扩展(群里上传图片到游戏地图画)

## 配置文件 

```
路径 './plugins/Yoyo/YoyoRobot/config.json'
```



``` js

{
    "config": {
        "account": "1536724751",//qq账号
        "password": "*******",//qq密码
        "log_level": "warn"//日志输出等级
        /** 日志等级，默认info (往屏幕打印日志会降低性能，若消息量巨大建议修改此参数或重定向)
        "trace" | "debug" | "info" | "warn" | "error" | "fatal" | "mark" | "off" */
    }
}
```

