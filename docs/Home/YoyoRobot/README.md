# YoyoRobot 机器人插件

>支持面板的机器人
>
>如果不了解的话可以加qq群[点击添加QQ群](https://jq.qq.com/?_wv=1027&k=OrdpaLLX)

1. [事件文档](./event)
2. [api文档](./api)

## 机器人扩展

> 扩展是在机器人登录完成后才加载的
>
> 欢迎大家开发更多扩展哦

`路径 './YoyoRobot'`

## 配置文件 

`路径 './plugins/Yoyo/YoyoRobot/config.json'`

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

