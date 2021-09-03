// Vue-router中的生命周期函数调用
// 通过回调把函数顺序的控制交给外部函数
let time
const queue = [
    (next) => {
        console.log("第一个调用")
        time = Date.now()
        setTimeout(() => {
            next()
        }, 1000)
    },
    (next) => {
        console.log("第二个函数调用: ", Date.now() - time)
        next()
    }
]

// 必须调用next，才会进行下一个调用
function iterator(hooks, next) {
    hooks(() => {
        next()
    })
}

function runQueue(queue, iterator, onComplate) {
    const step = index => {
        if(index >= queue.length) {
            onComplate()
        } else {
            if(queue[index]) {
                iterator(queue[index], () => {
                    step(index + 1)
                })
            } else {
                step(index + 1)
            }
        }
    }

    step(0)
}

runQueue(queue, iterator, () => {
    console.log(`队列调用结束`)
})