class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let stack = [this.root];
    while (stack.length !== 0) {
      let current = stack.pop();
      if (val < current.val) {
        if (current.left) {
          stack.push(current.left);
        } else {
          current.left = newNode;
          return this;
        }
      } else {
        if (current.right) {
          stack.push(current.right);
        } else {
          current.right = newNode;
          return this;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);
    const tree = this;
    if (!this.root) {
      this.root = newNode;
      return tree;
    }
    function findInsertLocation(node) {
      if (val < node.val) {
        if (node.left) {
          findInsertLocation(node.left);
        } else {
          node.left = newNode;
          return tree;
        }
      }
      if (val > node.val) {
        if (node.right) {
          findInsertLocation(node.right);
        } else {
          node.right = newNode;
          return tree;
        }
      }
    }
    return findInsertLocation(this.root);
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return undefined;
    let stack = [this.root];
    while (stack.length) {
      let current = stack.pop();
      if (current.val === val) return current;
      if (val < current.val) {
        if (!current.left) return undefined;
        stack.push(current.left);
      } else {
        if (!current.right) return undefined;
        stack.push(current.right);
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (!this.root) return undefined;
    function findVal(node) {
      if (node.val === val) return node;
      if (val < node.val) {
        if (!node.left) return undefined;
        return findVal(node.left);
      } else {
        if (!node.right) return undefined;
        return findVal(node.right);
      }
    }
    return findVal(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let nodes = [];
    function traverse(node) {
      nodes.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return nodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let nodes = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      nodes.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return nodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let nodes = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      nodes.push(node.val);
    }
    traverse(this.root);
    return nodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) return [];
    let nodes = [];
    let queue = [this.root];
    while (queue.length) {
      let current = queue.shift();
      nodes.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return nodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

module.exports = BinarySearchTree;