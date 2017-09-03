```
title: Linux常用命令
date: 2015-12-27 00:03:40
tags: Linux
categories: 系统
---
```

Linux大法好。

<!-- more -->

![pic](https://raw.githubusercontent.com/MaxineCaulfield/MarkdownPictures/master/Blog/linuxcom/linuxcover.jpg)

## 系统命令
`chsh -l` 查看所有的shell类型
`命令 --help` 查看帮助
`man 命令` 查看帮助用户手册mannal
`help 命令` 只能显示内置命令帮助信息

### grep文本搜索工具
`cat file |grep -iv "xxx"` 过滤 v反向查找 i无论大小写 查看在file文件里查找除了xxx的内容
`cat file |grep -v "^#"` 查看在file文件里查找除了开头为#的内容
`cat file |grep -v "^$"` 查看在file文件里查找除了空格空行的内容

`cat /proc/cpuinfo` 查看cpu内存
`cat /proc/meninfo` 查看内存信息

`find 目录 -name 文件名` 搜索文件
`shutdown -h now` 关机
`init 0` 关机
`init 6` 重启

---

## 文件与目录管理
`wc` 计算并显示文件内容中行数单词字节等信息
`wc -l file` 查看file文件有多少行
`wc -w file` 查看file文件有多少个单词 根据空格分隔统计

### 重定向
`命令 > 文件` 不在屏幕上显示，以覆盖方式写到指定文件
`命令 >> 文件` 以追加的方式写到指定文件
`命令 < 文件` 使命令从指定的文件中读取数据
`cat << end > file2.txt` 捕捉用户键盘按键

## VIM
`I` 在当前行开始插入文本
`a` 在当前光标位置之后插入文本
`A` 在当前行结束位置插入文本
`o` 在当前光标位置下面创建新行
`O` 在当前光标位置上面创建新行
`G` 移动到最后一行
`2gg 或 2G` 移动到第二行
### 查找
`/字符串` 向后查找指定的字符串
`:noh` 取消查找
### 删除
`x` 删除当前光标所在位置的字符
`d^` 删除当前光标之前到首行的字符
`d$` 删除当前光标之后到尾行的字符
`dd` 删除一行
`3dd` 删除当前光标开始向下三行
### 复制粘贴
`yy` 复制当前行
`5yy` 复制五行
`p` 将复制文本插入当前光标后面
`P` 将复制文本插入当前光标前面
### 末行模式常用命令
`:set nu` 显示行号
`:r filename` 读取其他指定文件的内容并插入到光标下面
`:w filename` 将当前编辑的文件另存为其他文件

---

## 用户与文件权限
用户帐号文件 /etc/passwd
用户密码文件 /etc/shadow

`who` 查看所有用户
`last` 正常登录信息
`lastb` 错误登录信息
`users` 显示登录的用户
`w` 显示当前系统中每个用户和它所运行的进程信息
`lastlog` 查看最近一次登陆和最后一次不成功的登陆

`useradd`
`usermod`
-u 指明用户ID
-g 指定组ID或组名 （-g 基本组 -G 附属组）
-c 指定user全名
-d 指定家目录
-s 指定shell
-M 不创建家目录
-r 创建系统账户

`userdel -r user1` 将user1与其家目录一起删除

`passwd`
-l 锁定用户
-u 解锁用户
-d 清空密码。相比未设置密码的用户不同，通过清空密码的用户可登陆，而未设置密码的用户则不行
-S 显示用户密码的简短状态信息（是否被锁定）

`chage`
-d 指定密码最后修改的日期
-m 修改密码的最小天数
-M 修改密码的最大天数
-W 密码过期前，开始警告天数
-I 密码过期后，锁定帐号的天数
-E 有效期，0表示立即过期，-1表示永不过期

`gpasswd -a [user] [group]`  加入组
`gpasswd -d [user] [group]`  移除组
`gpasswd -M [user],[user],[user] [group]` 同时将多个用户加入组

`umask -S ; umask` 以字符,数字的方式显示umask值
`chown 用户:组名 文件名` 修改文件所属

### UGO
U G O
4 2 1
`chmod u+s（chmod 4755）`设置SUID权限，其他普通用户执行该命令时临时获得了拥有者的root权限
`chgod g+s（chmod 2755）`设置SGID权限。其他普通用户执行该命令时临时获得了拥有者所属组的权限
`chgod o+t（chmod 1755）`设置SBit

---

## 基本磁盘与逻辑卷
主分区与扩展分区序号为1~4
逻辑分区序号从5开始

### fish磁盘分区
`fdisk -l` 查看硬盘信息
`fdisk [新增设备名 /dev/sdb]` 执行分区命令
m 查看所有命令帮助
d 删除硬盘分区
n 创建新分区 page80
p 显示当前硬盘分区信息
t 修改 分区类型
`df -h` 查看硬盘情况
`mkfs -t ext4 分区设备名 / mkfs.ext4 分区设备名` 格式化
`mount` 挂载
`mkswap []` swap格式化
`swapon []` swap启用
`swapoff []`swap停用

### 磁盘配额管理
以支持磁盘配额的方式挂载分区`mount -o usrquota,grpquota [分区名] [挂载目录]`
或者修改/etc/tstab挂载表下的参数使其自动挂载

关闭SELinux已便有权利建立配额文件`setenforce 0`
生成磁盘配额文件 `quotacheck -cugv [挂载目录]`
成功后查看挂载目录会多出 `aquota.group` 和 `aquota.user` 两个文件 用于配置磁盘配额

配置用户磁盘配 `edquota -u [用户名]`
启动指定磁盘分区上的配额功能 `quotaon -ugv [目录]`
查看配额情况 `repquota [挂载目录]`

修改宽限期限 `edquota -t`
停用磁盘配额 `quotaoff [挂载目录]`

创建指定大小的文件 `dd if=/dev/zero of=FileName1 bs=1M count=4 （总大小bs*count）`

### 动态磁盘管理
PV---VG---LV
首先设置sdb5分区类型为8e（LVM）
将sdb5分区转换为LVM系统能识别的物理卷    `pvcreate /dev/sdb5`
将创建的物理卷转为分区               `pvremove /dev/sdb5`
查看物理卷信息                       `pvscan`
查看物理卷详细信息                   `pvdisplay`

将创建的pv物理卷sdb5加入卷组vg01里           `vgcreate [vg01]` `[dev/sdb5]`
增加新的pv物理卷到卷组里             `vgextend vg01 [分区名]`
查看卷组                             `vgdisplay vg01`
移除卷组                 `vgremove [vg名字]`
减少pv物理卷的容量首先`pvmove /dev/sdb8`将数据移到物理卷的其他地方
然后`vgreduce vg01 /dev/sdb8 `

创建逻辑卷lv01方法1     `lvcreate -L [大小]   -n lv01 vg01`
创建逻辑卷lv01方法2     `lvcreate -l [PE数量] -n lv01 vg01`
增加逻辑卷lv01大小  `lvextend -L +[大小] /dev/vg01/lv01`
减少逻辑卷lv01大小300M
1、`e2fsck -f /dev/vg01/lv01`
2、`resize2fs /dev/vg01/lv01 400MB`
3、`lvreduce -L 300MB /dev/vg01/lv01`

删除逻辑卷 `lvremove /dev/vg01/lv01`
刷新逻辑卷的状态 `resize2fs /dev/vg01/lv01`

---

## 网络配置与软件包管理
`/etc/hosts` 设置主机名映射为IP地址
`/etc/sysconfig/network` 设置基本信息，主机名默认网关
`/etc/sysconfig/network-script/ifcfg-eth0` 设置网卡信息
`/etc/resolv.conf` 设置DNS服务器IP地址
`/etc/nsswitch.conf` 指定域名解析顺序
`/etc/services` 用于设置主机不同端口号对应网络服务

### 网卡信息配置
`ONBOOT=yes` 设置系统启动时，是否自动启动该设备

### yum
`/etc/yum.repos.d/rhel-source-repo` 配置文件位置
`baseurl` yum源位置
`gpgcheck` 是否开启数字签名

---

## Samba文件共享服务
NFS——Linux文件共享
Samba——跨平台文件共享
SMB/CIFS——Windows文件共享

### 关于Samba的共享文件
`chmod 1777 共享文件` 创建共享文件的粘滞位，用户A不能删除其他用户创建的文件

### 安装
`rpm -ivh Samba...` 安装Samba
`rpm -qa |grep Samba` 查看以安装的Samba

`/etc/init.d/smb start`启动Samba服务

### 配置文件
`/etc/samba/smb.conf` 主配置文件
`hosts allow = 192.168.1.1 EXCEPT 192.168.1.10` 表示允许IP为1.1~1.10的用户访问Samba

### 客户端
在Linux客户端下查看服务端的Samba共享目录
`smbclient -L [IP]`
挂载并访问Samba
`mount //IP地址/文件夹 /挂载目录`

### 额外操作
`service iptables stop`关闭防火墙`setenforce 0` 关闭SELinux
