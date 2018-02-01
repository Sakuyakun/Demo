---
layout:       post
title:        "Shadowsocks 配置 Kcptun 实现水管加速"
subtitle:     "Shadowsocks wubba lubba dub dub Kcptun"
date:         2017.02.09 16:23:40
author:       "Sakuya"
header-img:   "img/about-bg-walle.jpg"
header-mask:  0.4
catalog:      true
tags:
    - kcptun
    - shadowsocks
---

这篇文章主要是 ss + kcptun 配置心得，系统环境是 MacOS（Windows 也可行，使用如 putty 之类的工具代替 MacOS 自带的终端）。断断续续折腾两三天成功利用 kcptun 实现加速。

### 购入vps

本人在2015年11月黑五购买的banwagong vps，不是专线，11.40刀一年，单单使用vps翻墙的话，服务器硬件配置需求不需要太高。购买推荐方案和优惠码建议查看 banwagong.cn。官网购入成功后在个人主页 Services - My Services 页面就可看到购买的所有vps服务器列表。

![banwagong vpslist](/img/in-post/1515753088145.jpg)

列表展示的是一些基础信息，IP地址服务器状态续期日期等等。点击 kiwivm control panel 进入 kiwivm 控制面板，里面就是服务器配置管理界面。

### 配置vps
首先要做的就是重装服务器系统，在面板左边列表中 Install new OS。本人选择系统为Centos 6 x86_64 minimal。之后在列表中选择 Shadowsocks Server 安装。自动完成。端口号设置为10442。

完成后 Shadowsocks server controls 中 status 应该是显示绿色的 Running 状态。下方内容也有详细说明，Install Shadowsocks GUI application和Shadowsocks GUI settings。配置完成 shadowsocks 客户端后即可翻墙。但是速度显然是不能满足需求所以需要kcptun。

> Kcptun 是一个非常简单和快速的，基于 KCP 协议的 UDP 隧道，它可以将 TCP 流转换为 KCP+UDP 流。而 KCP 是一个快速可靠协议，能以比 TCP 浪费10%-20%的带宽的代价，换取平均延迟降低 30%-40%，且最大延迟降低三倍的传输效果。

KCP工作示意图

![kcp wrokflow](https://github.com/xtaci/kcptun/raw/master/kcptun.png)

### kcp server端配置

参考[Kcptun服务端一键安装脚本，喜闻乐见的多用户支持](https://blog.kuoruan.com/110.html)

本人操作步骤如下
1. 使用终端输入ssh root@你的服务器ip -p 端口号连接到你的服务器上。
2. 安装wget（wget安装方法yum -y install wget）
3. 安装kcp-server wget --no-check-certificate https://raw.githubusercontent.com/kuoruan/kcptun_installer/master/kcptun.sh
4. 修改操作权限 chmod +x ./kcptun.sh
5. 输入./kcptun.sh运行安装脚本
6. 配置信息参考上面那篇blog（我的配置信息放在下面）
7. 完成

我的kcp-server配置信息

```
{
  listen: ":10443",
  target: "127.0.0.1:10442",
  key: "newton",
  crypt: "aes",
  mode: "fast2",
  mtu: 1400,
  sndwnd: 1024,
  rcvwnd: 1024
}
```

### kcp client端配置
在[Github Kcptun](https://github.com/xtaci/kcptun/releases/tag/v20161222)中Downloads列表选择kcptun-darwin-amd64下载。
终端进入该下载的文件夹，找到lient_darwin_amd64这个exec命令程序后，在当前目录执行
./client_darwin_amd64 -l :10442 -r 198.35.45.141:10443 -conn 4 -key newton -mtu 1400 -sndwnd 1024 -rcvwnd 2048 -mode fast2 -nocomp -crypt aes -dscp 46 &
-l端口参数为本地ss端口参数，-r为kcp server服务器ip以及端口号。其他配置需与kcp server相同。这样就开启了kcp client客户端

可将这句命令保存为xxx.sh脚本文件并保存在lient_darwin_amd64所在的目录。开启kcp时可直接进入当前目录执行./xxx.sh开启kcp加速

### 客户端ss配置
ss客户端将地址设置为本地地址，端口为 kcp client 端地址

![kcpx](/img/in-post/1515753088146.png)

至此就已全部配置成功，如有问题检查
1. 确保shadowsocks server开启
2. 确保连接步骤确保服务器端kcp server开启（安装好后自动开启）
3. 确保开启kcp client
4. 确保开启shadowsocks客户端
5. 配置信息无误

### 手机端ss配置
安卓shadowsocks客户端可在[Google Play](https://play.google.com/store/apps/details?id=com.github.shadowsocks)进行下载，前提是你翻墙了的情况下。否则可在[Github shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android/releases)下载。iOS客户端可以在 App Store 搜索 Wingy 或者 Shadowrocket。

在手机端安卓环境的 ss 与客户端配置大同小异，ip 地址与端口号设置相同。
列表中找到并打开kcp，kcp端口为10443，参数输入`--key newton --mtu 1400 --sndwnd 1024 --rcvwnd 1024 --mode fast2 --nocomp --crypt aes --dscp 46`此处的端口号为kcp server端的端口号。
