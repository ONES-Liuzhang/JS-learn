// 双指针
const ListNode = function (val) {
  this.val = val;
  this.next = null;
};

// 快慢指针
// 1.判断是否含有环
function hasCycle(head) {
  let fast, slow;
  fast = slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) return true;
  }
  return false;
}

// 2.已知列表中有环，返回环的起始位置
//
function detectCycle(head) {
  let fast, slow;
  fast = slow = head;
  // 第一次相遇，fast比slow多走k->环的长度
  // 设当前距离环的起点为m
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  if (!fast || !fast.next) return null;
  fast = head;
  // fast从head开始向前，和slow相遇时刚好是环起点位置
  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}

// 左右指针 假设数组均为升序数组
// 二分法 在数组nums中找到target
function binarySearch(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
  }
  return -1;
}

let nums = [1, 2, 3, 4, 6, 20];

console.log(binarySearch(nums, 4));

// 两数之和

// 反转数组
