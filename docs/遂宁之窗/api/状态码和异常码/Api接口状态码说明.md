## Api接口状态码
**调用方式**
```
 config('codeStatus.UpdateError')  //更新失败的状态码7100
```
| 状态标识       |状态码         |说明            
|-------------|--------------:|:--------------|
|NoContent|204| 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档|
|Created|201| 已创建。成功请求并创建了新的资源|
|OK|200| 请求成功。一般用于GET与POST请求|
|Accepted|202| 已接受。已经接受请求，但未处理完成|
|ResetContent|205| 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域|
|PartialContent|206| 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域|
|NoPermissions|207|无权限|
|Non-Auth|203|非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本|
|BadRequest|400|客户端请求的语法错误，服务器无法理解|

| 状态标识       |状态码         |说明            
|-------------|--------------:|:--------------|
|NoMagic|6001|道具不存在|
|NoExt|6002|扩展积分不足|
|Novip|6003|未开通会员|
|Nocertifi|6004|未实名认证|

| 状态标识       |状态码         |说明            
|-------------|--------------:|:--------------|
|NoMoreContent|7000|没有更多数据或无返回数据|
|ApiParamError|7100|客户端参数错误|
|UpdateError|7101|更新失败|
|InsertError|7102|新增失败|

| 状态标识       |状态码         |说明            
|-------------|--------------:|:--------------|
|AccessTimeOut|8001|接口访问超时|
|SignExpired|8002|接口签名过期|
|SignError|8003|接口签名错误|
|TouristTokenExpired|8004|游客令牌失效|
|TokenParamError|8005|令牌参数错误|
|UserTokenExpired|8006|用户令牌失效|
|NoLogin|8007|未登录状态|
|SecureParamError|8008|接口安全参数错误|
|NeedSnappid|8009|平台snappid不能为空|
|NeedAppid|8010|第三方appid不能为空|
|NeedOpenid|8011|第三方openid不能为空|
|NeedToken|8012|令牌不能为空|
|RequestMethodError|8013|请求方式错误|
|RefreshTokenSuccess|8014|刷新令牌成功|
|UserRemoteLogin|8015|该账号已在其他设备登录，请重新登录|
|BadUser|8016|用户账号被禁用|
|CancelUser|8017|用户账号被注销|
|NameOrPasswordError|8100|账号密码错误|
|NoThirdAuthBind|8101|第三方账号未绑定|
|ArticleNoScNoLogin|8102|文章未被收藏未登录|
|ArticleNoScIsLogin|8103|文章未被收藏已登录|
|NoLikeNoLogin|8104|未登录未点赞|
|NoLikeIsLogin|8105|已登录未点赞|
|NoRedbagActivity|8111|没有进行中的发红包活动|
|NoDrawNum|8112|抽奖次数不足|
|NoCashOut|8113|不能达到提现标准|
|NoReward|8114|没有中奖|
|VersionNotUpdated|8115|APP版本验证无最新版本|
|ReceiveReward|8116|领取奖品成功|
|AbandonReward|8117|放弃奖品成功|
|NotSetReward|8118|未设置抽奖奖品信息|
|InviteCodes|8119|邀请码抽奖，提示输入邀请码|
|ActivityNotStart|8120|活动未开始|
|ActivityEnd|8121|活动已结束|
|NoBuyReadJob|8122|未购买查看用户简历|
|NoBinDingKid|8123|信息未绑定商家|
|NoJobPerfect|8124|简历完善度为达到70%|
|KhinfoNameRepeat|8125|商家名称重复|
|NeedWxCode|8200|微信code不能为空|
|WxParamError|8201|微信请求参数错误|

 **支付状态码**
| 状态标识       |状态码         |说明            
|-------------|--------------:|:--------------|
|PayExt|8800|抵扣扩展积分成功|


