# 事件文档

+ [Event: system](#Event-system) 系统类（上下线、验证码、设备锁等）
+ [Event: message](#Event-message) 聊天消息类（群聊、私聊、讨论组）
+ [Event: request](#Event-request) 请求类（好友申请、群申请、群邀请）
+ [Event: notice](#Event-notice) 通知类（入群退群、禁言、撤回等）

----

实例化client后，使用 `yoyo.listen(事件名,(事件参数,客户端)=>{})` 来监听一个事件，常用的比如：

```js
/** 监听上线事件 */
yoyo.listen("online", (event)=>console.log("logged in!"))
/** 监听全部的消息事件 */
yoyo.listen("message", (event,client)=>console.log(event,client))
/** 监听群消息事件 */
yoyo.listen("messageGroup", (event,client)=>console.log(event,client))
/** 监听私聊消息事件 */
yoyo.listen("messagePrivate", (event,client)=>console.log(event,client))
/** 监听好友申请事件 */
yoyo.listen("requestFriendAdd", (event,client)=>console.log(event,client))
/** 监听入群申请事件 */
yoyo.listen("requestGroupAdd", (event,client)=>console.log(event,client))
/** 监听群邀请事件 */
yoyo.listen("requestGroupInvite", (event,client)=>console.log(event,client))
/** 监听全部的通知事件 */
yoyo.listen("notice", (event,client)=>console.log(event,client))
/** 监听群通知事件 */
yoyo.listen("noticeGroup", (event,client)=>console.log(event,client))
/** 监听成员入群事件 */
yoyo.listen("noticeGroupIncrease", (event,client)=>console.log(event,client))
```

一个事件可以绑定多个监听函数，并且为连续传递，例如：  
为 `notice` 事件绑定的监听器，对所有 `notice*` 事件都有效  
为 `noticeGroup` 事件绑定的监听器，对所有 `noticeGroup*` 事件都有效  

> 使用 VScode 编辑器可以获得完整的智能提示

一个 `event` 的数据可能是如下形式的对象：

```js
{
  self_id: 147258369, //登录账号
  time: 1621582964, //时间戳
  post_type: 'notice', //一级分类
  notice_type: 'group', //二级分类
  sub_type: 'ban', //三级分类
  group_id: 258147369, //群号
  operator_id: 369258147, //操作者
  user_id: 147258369, //被操作者
  duration: 600 //时长(秒)
}
// 这是一个群禁言事件
// 可以通过监听 `notice.group.ban` 或 `notice.group` 或 `notice` 捕获
```

----

## Event: `system`

+ `loginQrcode` 使用扫码登录时收到二维码事件
  + *`image`* Buffer 图片字节集
+ `loginSlider` 收到滑动验证码事件
  + *`url`* string 滑动地址
+ `loginDevice` 需要解设备锁事件
  + *`url`* string 设备锁验证地址（用于扫二维码解锁）
  + *`phone`* string 密保手机号（用于发短信解锁）
+ `loginError` 登陆失败事件
  + *`message`* string "密码错误"等详细原因
  + *`code`* number 错误码
+ `online` 上线事件，可以开始处理消息
+ `offline` 下线事件

----

## Event: `message`

+ `messagePrivate` 私聊消息事件 (拥有五四个三级分类`friend` `single` `group` `other` `self`对应：好友，单向好友，群临时会话，其他临时会话，其他在线设备)
+ `messageGroup` 群聊消息事件 (拥有两个三级分类`normal` `anonymous`对应：普通消息，匿名消息，群临时会话)
+ `messageDiscuss` 讨论组消息事件

----

## Event: `request`

+ `requestFriendAdd` 好友请求事件
+ `requestFriendSingle` 被添加为单向好友事件
+ `requestGroupAdd` 加群申请事件
+ `requestGroupInvite` 群邀请事件

----

## Event: `notice`

+ **noticeFriend**
+ `noticeFriendIncrease` 好友增加事件
+ `noticeFriendDecrease` 好友减少事件 (被拉黑或自己删除都会触发)
+ `noticeFriendRecall` 私聊消息撤回事件
+ `noticeFriendProfile` 好友资料变更事件
+ `noticeFriendPoke` 好友戳一戳事件
+ **noticeGroup**
+ `noticeGroupIncrease` 群员增加事件 (自己入群、他人入群)
+ `noticeGroupDecrease` 群员减少事件 (自己被踢、他人退群/被踢、解散)
+ `noticeGroupRecall` 群消息撤回事件
+ `noticeGroupAdmin` 群管理员变更事件
+ `noticeGroupBan` 群禁言事件
+ `noticeGroupTransfer` 群转让事件
+ `noticeGroupPoke` 群戳一戳事件
+ `noticeGroupSetting` 群设置变更事件

