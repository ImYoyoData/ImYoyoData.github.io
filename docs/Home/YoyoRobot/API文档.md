# API

+ [系统类API](#系统类API)
+ [成员变量](#成员变量)
+ [应用类API](#应用类API)
  + [获取列表和资料](#获取群群员列表和资料)
  + [发消息相关](#发消息相关)
  + [系统消息处理](#系统消息处理)
  + [群操作](#群操作)
  + [个人相关](#个人相关)
  + [其他](#其他)
+ [群文件系统](#群文件系统)
+ [segment和cqcode](#segment和cqcode) 支持的消息元素类型

----

## 系统类API

|Name|API|Description|
|-|-|-|
|登录|login(password?)|传密码则使用密码登录，不传则扫码登录|
|登出|logout()||
|提交滑动验证码|sliderLogin(str)|收到滑块后使用|
|发送短信验证码|sendSMSCode()|收到设备锁后使用|
|提交短信验证码|submitSMSCode(str)||
|在线判断|isOnline()||

----

## 成员变量

```ts
client.uin: number; //登录账号
client.nickname: string; //昵称
client.sex: string; //性别
client.age: number; //年龄
client.online_status: number; //在线状态
client.fl: Map<number, FriendInfo>; //好友列表
client.gl: Map<number, GroupInfo>; //群列表
client.sl: Map<number, StrangerInfo>; //陌生人和临时会话列表
client.gml: Map<number, Map<number, MemberInfo>>; //群员列表缓存
client.blacklist: Set<number>; //黑名单
client.logger: log4js.Logger; //日志管理器
client.dir: string; //数据保存文件夹路径
client.config: ConfBot; //配置项
client.stat: Statistics; //统计信息
client.bkn: number; //csrf token
client.cookies; //cookies
```

----

## 应用类API

所有应用类API具有统一的返回值：

```js
{
    retcode: 0, //0成功 1异步 100参数错误 102失败 103超时 104客户端未上线
    status: "ok", //ok或async或failed
    data: null, //返回的数据
    error: null, //failed时提供
}
```

> 调用 `Promise` api 时无需使用`catch()`，需要判断是否成功请使用`retcode`或`status`  
> 大部分API没有`data`返回值  
> API调用失败时你会得到一个`error`(包含`code`和`message`)

----

### 获取群、群员列表和资料

|Name|API|Description|
|-|-|-|
|获取群资料|getGroupInfo(gid, no_cache?)|该方法一般只用于强制刷新，请尽量从缓存中获取<br>`client.gl.get(gid)`|
|获取群员列表|getGroupMemberList(gid, no_cache?)|缓存于`client.gml`中|
|获取群员资料|getGroupMemberInfo(gid, uid, no_cache?)|缓存于`client.gml`中|
|获取陌生人资料|getStrangerInfo(uid, no_cache?)||

```javascript

/** 陌生人资料 */
export interface StrangerInfo {
    readonly user_id: number, //账号
    readonly nickname: string, //昵称
    readonly sex: Gender, //性别
    readonly age: number, //年龄
    readonly area?: string, //地区
    readonly signature?: string, //个性签名
    readonly description?: string, //个人说明
    readonly group_id?: number, //临时会话群号
}
/** 好友资料 */
export interface FriendInfo extends StrangerInfo {
    readonly remark?: string //好友备注
}
/** 群资料 */
export interface GroupInfo {
    readonly group_id: number, //群号
    readonly group_name: string, //群名
    readonly member_count: number, //群员数
    readonly max_member_count: number, //最大群员数
    readonly owner_id: number, //群主账号
    readonly last_join_time: number, //最后入群时间
    readonly last_sent_time: number, //最后发言时间
    readonly shutup_time_whole: number, //全员禁言到期时间
    readonly shutup_time_me: number, //我的禁言到期时间
    readonly create_time: number, //创建时间
    readonly grade: number, //群等级
    readonly max_admin_count: number, //最大管理员数
    readonly active_member_count: number, //活跃群员数
    readonly update_time: number, //当前群资料的最后更新时间
}
/** 群员基础资料 */
export interface MemberBaseInfo {
    readonly user_id: number,
    readonly nickname: string,
    readonly card: string, //群名片
    readonly sex: Gender,
    readonly age: number,
    readonly area: string,
    readonly level: number, //等级
    readonly role: GroupRole, //权限
    readonly title: string, //头衔
}
/** 群员资料 */
export interface MemberInfo extends MemberBaseInfo {
    readonly group_id: number,
    // readonly user_id: number,
    // readonly nickname: string,
    // readonly card: string,
    // readonly sex: Gender,
    // readonly age: number,
    // readonly area: string,
    readonly join_time: number, //入群时间
    readonly last_sent_time: number, //最后发言时间
    // readonly level: number,
    readonly rank: string,
    // readonly role: GroupRole,
    /** @deprecated */
    readonly unfriendly: boolean,
    // readonly title: string,
    readonly title_expire_time: number, //头衔过期时间
    /** @deprecated */
    readonly card_changeable: boolean,
    readonly shutup_time: number, //禁言到期时间
    readonly update_time: number, //此群员资料的最后更新时间
}
```



----

### 发消息相关

|Name|API|Description|
|-|-|-|
|发送私聊|sendPrivateMsg(uid, msg)|返回message_id|
|发送群聊|sendGroupMsg(gid, msg)|返回message_id|
|发送讨论组|sendDiscussMsg(did, msg)||
|发送群临时会话|sendTempMsg(gid, uid, msg)|返回message_id|
|撤回消息|deleteMsg(message_id)||
|上报消息已读|reportReaded(message_id)||
|获取1条历史消息|getMsg(message_id)||
|获取最多20条历史消息|getChatHistory(message_id)||
|获取转发的消息|getForwardMsg(resid)|resid在转发的xml中寻找|
|制作一条合并转发消息|makeForwardMsg(fakes)|得到一个xml元素，可直接发送|

> msg可以使用 `Array` 格式或 `string` 格式，支持CQ码  

----

### 系统消息处理

|Name|API|Description|
|-|-|-|
|处理加好友请求|setFriendAddRequest(flag, approve?)|flag在事件中获得|
|处理群请求|setGroupAddRequest(flag, approve?)|flag在事件中获得|
|获取未处理的请求|getSystemMsg()||

----

### 群操作

|Name|API|Description|
|-|-|-|
|踢人|setGroupKick(gid, uid)||
|禁言|setGroupBan(gid, uid, duration?)|duration默认1800(秒)|
|退群|setGroupLeave(gid)||
|设置群名片|setGroupCard(gid, uid, card?)||
|设置群名|setGroupName(gid, name)||
|设置管理员|setGroupAdmin(gid, uid, enable?)||
|设置头衔|setGroupSpecialTitle(gid, uid, title?)||
|发简易群公告|sendGroupNotice(gid, content)||
|拍一拍|sendGroupPoke(gid, uid)||
|禁止/允许匿名|setGroupAnonymous(gid, enable?)||
|全员禁言|setGroupWholeBan(gid, enable?)||
|禁言匿名玩家|setGroupAnonymousBan(gid, flag, duration)|匿名flag在消息事件中|
|设置群头像|setGroupPortrait(file)|与图片消息中的file同格式|

----

### 个人相关

|Name|API|Description|
|-|-|-|
|设置在线状态|setOnlineStatus(num)|11我在线上 31离开 41隐身 50忙碌 60Q我吧 70请勿打扰<br>aPad和安卓手表无法设置|
|修改昵称|setNickname(str)||
|修改性别|setGender(num)|0未知 1男 2女|
|修改生日|setBirthday(str)|20110202的形式|
|修改签名|setSignature(str)||
|修改个人说明|setDescription(str)||
|修改头像|setPortrait(file)|与图片消息中的file同格式|
|添加好友|addFriend(gid, uid)|仅支持添加群友|
|删除好友|deleteFriend(uid)||
|邀请好友入群|inviteFriend(gid, uid)||
|点赞好友|sendLike(uid, times?)|times默认为1|

----

### 其他

|Name|API|Description|
|-|-|-|
|获取漫游表情|getRoamingStamp()||
|清除缓存文件|cleanCache()||
|重载好友列表|reloadFriendList()|重载完成之前不响应任何请求和事件|
|重载群列表|reloadGroupList()|重载完成之前不响应任何请求和事件|
|用于扩展协议|sendUni()|发送原始uni数据包|
|用于扩展协议|sendOidb()|发送原始oidb数据包|
|用于扩展协议|em()|触发一个oicq标准事件|

----

## 群文件系统

```js
const gfs = yoyo.client.acquireGfs(363457102) //传群号进入一个群文件系统
```

|Name|API|Description|
|-|-|-|
|查看使用空间|gfs.df()||
|列出文件和目录|gfs.ls(fid?, start?, limit?)|gfs.dir()的别名|
|查看文件属性|gfs.stat(fid)||
|创建目录|gfs.mkdir(name)||
|删除文件或目录|gfs.rm(fid)|会删除目录下的全部文件|
|重命名文件或目录|gfs.rename(fid, name)||
|移动文件|gfs.mv(fid, pid)||
|获取下载链接|gfs.download(fid)||
|上传文件|gfs.upload(file, pid?, name?, cb?)|cb是上传进度回调函数|

> fid表示一个文件或目录，pid表示它的父目录  
> 根目录为"/"  
> 只能在根目录下创建目录  
> 调用时需要使用`catch()`捕获`reject`  
> 大文件上传时开启debug可以打印上传进度

----

## segment和cqcode

> 用于快速创建可以发送的消息元素

```js
yoyo.segment   yoyo.cqcode
//segment用于创建对象格式的消息，cqcode用于创建字符串格式的消息
```

|Name|API(segment)|API(cqcode)|Description|
|-|-|-|-|
|文本|segment.text()|cqcode.text()||
|AT|segment.at()|cqcode.at()||
|经典表情|segment.face()|cqcode.face()|id为0~324|
|图片|segment.image()|cqcode.image()||
|闪照|segment.flash()|cqcode.flash()||
|语音|segment.record()|cqcode.record()||
|视频|segment.video()|cqcode.video()|仅支持本地文件|
|小表情|segment.sface()|cqcode.sface()|几乎不再使用|
|原创表情|segment.bface()|cqcode.bface()||
|魔法猜拳|segment.rps()|cqcode.rps()|id为1~3|
|魔法骰子|segment.dice()|cqcode.dice()|id为1~6|
|位置分享|segment.location()|cqcode.location()||
|音乐分享|segment.music()|cqcode.music()||
|链接分享|segment.share()|cqcode.share()||
|JSON消息|segment.json()|cqcode.json()||
|XML消息|segment.xml()|cqcode.xml()||
|窗口抖动|segment.shake()|cqcode.shake()||
|戳一戳|segment.poke()|cqcode.poke()||
|回复|segment.reply()|cqcode.reply()||
|匿名|segment.anonymous()|cqcode.anonymous()||
|转发节点|segment.node()|cqcode.node()||
|MIRAI|segment.mirai()|cqcode.mirai()|一种特殊消息|



----
