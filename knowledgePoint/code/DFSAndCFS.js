// 深度优先遍历
// 递归的方式实现
function deepTraversal1 (node, nodeList = []) {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children ? node.children : []
    for (let i = 0; i < children.length; i++) {
      deepTraversal(children[i], nodeList)
    }
  }
}
// 非递归 
function deepTraversal2 (node) {
  let stack = [];
  let nodeList = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift()
      nodeList.push(item)
      let children = item.children ? item.children : [];
      for (let i = children.length - 1; i > 0; i--) {
        stack.unshift(children[i])
      }
    }
  }
}

// 广度优先遍历
// 队列，先进先出
function widthTraversal (node) {
  let stack = [];
  let nodeList = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift()
      nodeList.push(item)
      let children = item.children ? item.children : [];
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodeList;
}

