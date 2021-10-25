# 部署

## 服务器

谈到部署, 肯定得先有一个自己的服务器. 因为咱们是上课教学, 我就随便找个便宜的演示一下..

https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=fyhp3q4t

选 ecs 服务器, 按量付费/月/年 都行, 随便选个镜像即可.

## Linux 安装 Nodejs

1. 下载安装包

`wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz `

2. 解压

`tar xf node-v10.9.0-linux-x64.tar.xz `

3. 设置软链接

`ln -s /root/node-v10.9.0-linux-x64/bin/node /usr/local/bin/node`
`ln -s /root/node-v10.9.0-linux-x64/bin/npm /usr/local/bin/npm`

4. 查看 Node 版本和 npm 版本

`node -v`
`npm -v`

5. 设置 npm 源

`npm config set registry https://registry.npm.taobao.org`

6. 服务器安装 pm2

`npm install -g pm2`
`ln -s /root/node-v10.9.0-linux-x64/bin/pm2 /usr/local/bin/`

7. 配置 ssh

- 本地生成秘钥对: `ssh-keygen -t rsa` demo_id_rsa
- 将公钥放到服务器上: `scp ~/.ssh/demo_id_rsa.pub root@39.107.238.161:/root/.ssh/authorized_keys`
- 修改 ssh 配置 `vi ~/.ssh/config`

```
Host lubai
HostName 39.107.238.161
User root
Port 22
IdentityFile ~/.ssh/demo_id_rsa
```

- 服务器上修改 ssh 配置 `vim /etc/ssh/sshd_config`

PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

- 最后就可以 ssh 登录了! `ssh lubai`

8. 将本地代码同步到服务器

`rsync -avzp -e "ssh" ./Internet/ lubai:/root/app`

9. 服务器上启动 http

`pm2 start /root/app/http-server.js`

10. 本地修改发布命令

10.1 新建 deploy.sh 文件

```sh
#!/bin/bash

HOST=lubai

# -a 递归复制、如果目标地址没有文件夹会创建一个
# -v 把结果输出到终端
# -z 压缩 zip
# -p 显示progress
# -e 表示指定以ssh协议传输
rsync -avzp -e "ssh" ./Internet/ $HOST:/root/app
ssh $HOST "pm2 restart /root/app/http-server.js"

echo 'deploy success'
```

10.2 初始化 npm 命令

`npm init`
新增 scripts "deploy": "./deploy.sh"

10.3 发布

`npm run deploy`

11. 修改 http-server 的监听 host

```js
const http = require("http");
const host = "0.0.0.0";
const port = 80;
http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("Hello World");
  })
  .listen(port, host);

console.log(`Server running at http://${host}:${port}/`);
```

12. ECS 安全组添加 80 端口
13. 查看服务器上是否已正常监听 80 端口

`netstat -tpln`

14. 通过 ip+端口访问

39.107.238.161:80
