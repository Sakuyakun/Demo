```
title: Kcptun Shadowsocks加速方案
date: 2017.02.09 16:23:40
categories: 网络
thumbnail: "https://www.tuchuang001.com/images/2017/05/10/2017-05-102.47.07.png"
tags: 
- vps
- kcptun
- Shadowsocks
---
```

这篇文章主要是ss+kcptun配置心得，系统环境是MacOS（Windows也可行，使用如putty之类的工具代替MacOS自带的终端）。断断续续折腾了一个多星期成功翻墙并利用kcptun实现加速。

<!-- more -->

# 购入vps
本人在去年11月份黑五购买的[搬瓦工vps](https://bwh1.net/index.php)，11.40刀一年，服务器地点在美国Arizona，单单要是使用vps翻墙的话，服务器配置不需要太高。购买推荐方案和优惠码建议查看[搬瓦工中文网](http://banwagong.cn/)。官网购入成功后在个人主页Services - My Services页面就可看到购买的所有vps服务器列表。

![Image of Yaktocat](https://github.com/Sakuyakun/markdown-images/blob/master/Blog/serivce.png?raw=true)
列表展示的是一些基础信息，IP地址服务器状态续期日期等等。点击kiwivm control panel进入kiwivm控制面板，里面就是服务器配置管理界面。

# 配置vps
首先要做的就是重装服务器系统，在面板左边列表中Install new OS。本人选择系统为Centos 6 x86_64 minimal。之后在列表中选择Shadowsocks Server安装。自动完成。端口号设置为10442。

完成后Shadowsocks server controls中status应该是显示绿色的Running状态。下方内容也有详细说明，Install Shadowsocks GUI application和Shadowsocks GUI settings。配置完成shadowsocks客户端后即可翻墙。但是速度显然是不能满足需求所以需要kcptun。

> Kcptun 是一个非常简单和快速的，基于 KCP 协议的 UDP 隧道，它可以将 TCP 流转换为 KCP+UDP 流。而 KCP 是一个快速可靠协议，能以比 TCP 浪费10%-20%的带宽的代价，换取平均延迟降低 30%-40%，且最大延迟降低三倍的传输效果。

KCP工作示意图
![kcp wrokflow](https://github.com/Sakuyakun/markdown-images/blob/master/Blog/kcptun.png?raw=true)

# kcp server端配置
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
```json
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

# kcp client端配置
在[Github Kcptun](https://github.com/xtaci/kcptun/releases/tag/v20161222)中Downloads列表选择kcptun-darwin-amd64下载。
终端进入该下载的文件夹，找到lient_darwin_amd64这个exec命令程序后，在当前目录执行
./client_darwin_amd64 -l :10442 -r 198.35.45.141:10443 -conn 4 -key newton -mtu 1400 -sndwnd 1024 -rcvwnd 2048 -mode fast2 -nocomp -crypt aes -dscp 46 &
-l端口参数为本地ss端口参数，-r为kcp server服务器ip以及端口号。其他配置需与kcp server相同。这样就开启了kcp client客户端

可将这句命令保存为xxx.sh脚本文件并保存在lient_darwin_amd64所在的目录。开启kcp时可直接进入当前目录执行./xxx.sh开启kcp加速

# Shadowsocks 客户端配置
ss客户端将地址设置为本地地址，端口为kcp client端地址
![kcpx](https://github.com/Sakuyakun/markdown-images/blob/master/Blog/shadowsocksclient.png?raw=true)
至此就已全部配置成功，如有问题检查
1. 确保shadowsocks server开启
2. 确保连接步骤确保服务器端kcp server开启（安装好后自动开启）
3. 确保开启kcp client
4. 确保开启shadowsocks客户端
5. 配置信息无误

# 手机端shadowsocks配置
安卓shadowsocks客户端可在[Google Play](https://play.google.com/store/apps/details?id=com.github.shadowsocks)进行下载，前提是你翻墙了的情况下。否则可在[Github shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android/releases)下载。iOS客户端在[Github shadowsocks-ios](https://github.com/shadowsocks/shadowsocks-ios/releases)进行下载

手机端的ss与客户的大同小异，ip地址与端口号设置相同。
列表中找到并打开kcp，kcp端口为10443，参数输入`--key newton --mtu 1400 --sndwnd 1024 --rcvwnd 1024 --mode fast2 --nocomp --crypt aes --dscp 46`此处的端口号为kcp server端的端口号。
