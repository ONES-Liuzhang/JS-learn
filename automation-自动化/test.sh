#!/bin/bash
echo "Hello World2"

# 1.变量命名
# 英文字母、数字、下划线，不能以数字开头
# 中间不能有空格，可以使用下划线_
# 不能使用bash关键字

# 定义变量 直接赋值即可
RUNOOB="RUNOOB"
LD_LIBRARY_PATH="LD_LIBRARY_PATH"
_var="_var"
some_var="some_var"

# 使用变量 要借助 $ 符，花括号可加可不加，但在字符串中需要加
echo $RUNOOB
echo ${RUNOOB}
echo "这里要打印一个变量->${RUNOOB}"

# 2.for 语句
for skill in $RUNOOB $LD_LIBRARY_PATH $_var WAAA;
do
  echo "我有${skill}技能"
done

# 可以打印 /etc 下的所有文件名 
# for file in `ls /etc`;
# or for file in $(ls /etc);
# do
#   echo $file
# done

# 3.只读变量 readonly
baiduUrl="www.baidu.com"
readonly baiduUrl
# 重新赋值会报错 baiduUrl="a" 

# 4.删除变量 unset
unset _var
echo $_var # 打印空行
# 不能删除 readonly 变量 unset baiduUrl 报错
# unset baiduUrl

# 5.Shell 字符串
# 单引号
# 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
# 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。
str='this is a string'

# 双引号
# 双引号里可以有变量
# 双引号里可以出现转义字符
your_name='runoob'
str="Hello, I know you are \"$your_name\"! \n"
echo -e $str

# 拼接字符串
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1
# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !' # 变量无效
echo $greeting_2  $greeting_3

# 获取字符串长度
echo "gretting 字符长度为, \${#greeting} = ${#greeting} "
# 提取子字符串 ${str:1:3} 从下标1开始，提取3个字符
echo "${greeting}提取子字符串 \${greeting:0:5} = ${greeting:0:5}"

# 6. 数组
# 数组名=(值1 值2 ... 值n)
# 可以不使用连续的下标，而且下标的范围没有限制
array_name=(value0 value1 value2 value3)
array_name[25]=z

echo ${array_name[25]}
echo ${array_name[@]}

# 元素个数
length=${#array_name[@]}
echo "arr_name 元素个数为 "$length" "

length=${#array_name[*]}
echo "arr_name 元素个数为 "$length" "

length=${#array_name[0]}
echo arr_name[0] 的长度为 $length

:<<EOF
多行注释！！！
ssss
eqewq
EOF

:<<!
多行注释 
:<<之后随便用什么符号都可以
只要注意尾部也要一样的符号作为结束
!