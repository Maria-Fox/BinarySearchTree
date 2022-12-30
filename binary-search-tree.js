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
   * Returns the tree. Uses ITERATION. */

  insert(val) {
    // assign the root is empty tree
    if(this.root === null) {
      this.root = new Node(val);
      return this;
    };    

    let currentNode = this.root;

    while(true){
      // check parent values. If less than go into the left subtree
      if(val < currentNode.val){
        // check subtree's children. Is the left val empty? Create a new node
        if(currentNode.left === null){
          currentNode.left = new Node(val);
          return this;
        } else {
          // otherwise, update currentNode and compare again
          currentNode = currentNode.left
        }
    } else if (val > currentNode.val){
      // if the value is greater than the node head to the right.
      if(currentNode.right === null){
        currentNode.right = new Node(val);
        return this;
      } else{
        currentNode = currentNode.right
      }
    }
  }
}

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses RECURSION. */

  insertRecursively(val, currentNode = this.root) {

    // assign root if emtpty tree.
    if(this.root === null){
      this.root = new Node(val);
      return this;
    };

    // initial comparison for "parent"/ initial node
    if(val < currentNode.val){
      // children evaluation. If there's nothing to compare- add node & return
      if(currentNode.left === null){
        currentNode.left = new Node(val);
        return this;
      } else {
        // otherwise, throw the left child back in for evaluation/ comparisson. Since val is less than
        return this.insertRecursively(val, currentNode.left)
      }
    }

    // initial comparison for "parent"/ initial node
    if(val > currentNode.val){
      if(currentNode.right === null){
        currentNode.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, currentNode.right);
      }
    }
  };


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let treeNode = this.root;
    if(!treeNode) return undefined;
    console.log("val is", val)

    while(treeNode){
      if(val === treeNode.val) return treeNode;
      console.log("we're looking at", treeNode.val)

      if(val < treeNode.val) {
          treeNode = treeNode.left;
          console.log("moved left to ", treeNode)
      } else if(val > treeNode.val) {
          treeNode = treeNode.right;
          console.log("moved right to ", treeNode)
      };
    };
    console.log("returning treenode of", treeNode)
    return treeNode ?  treeNode : undefined;
  };

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, nodeToCheck = this.root) {
    let currentNode = nodeToCheck
    if(!currentNode) return undefined;

    // break away case.
    if(val === currentNode.val) return currentNode;

    if(val < currentNode.val){
      if(currentNode.left === null){
        return undefined;
      }
      return this.findRecursively(val, currentNode.left);
    };
    
    if (val > currentNode.val){
      if(currentNode.right === null){
        return undefined;
      } 
      return this.findRecursively(val, currentNode.right);
    };
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // ROOT, LEFT, RIGHT. The output is chronologically in subtree binary order. As in a visible tree.
    
    let visitedNodes = [this.root.val];
    console.log(visitedNodes);
    // console.log("visited nodes is", visitedNodes);

    function traverse(node){
      // first go all the way down to the left.
      if(node.left){
        visitedNodes.push(node.left.val);
        // goes through all the left one's first bc it open a stack of traverse "stack calls" that need to complete.
        traverse(node.left);
      };

      // once all the above stack calls are completed for all nodes w. left the right conditional will run.
      if(node.right){
        visitedNodes.push(node.right.val);
        traverse(node.right);
      }
    }

    traverse(this.root);
    return visitedNodes;

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    // LEFT, ROOT, RIGHT. The output is chornologically in order.
    // root prints when the full left stack is complete
    let visitedNodes = [];

    function traverse(node) {
      console.log(node.val)
      // continously opens left call stacks if there's a left node for given lnode.
      node.left && traverse(node.left); // go left if there's a left
      // once there is no more left nodes push the last node visisted
      visitedNodes.push(node.val); // visit the root / parent of node.
      console.log("visited", visitedNodes)
      node.right && traverse(node.right); // open call stacks is there's a right node, recursively.
    }

    traverse(this.root);
    return visitedNodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    // LEFT, RIGHT, ROOT 
    let visitedNodes = [];

    function traverse(node){
      // go as far left as you can - opens stacks on the left side only.
      node.left && traverse(node.left);
      // go as far right as you can - open stacks
      node.right && traverse(node.right);
      // push the value where either statement above result in false.
      visitedNodes.push(node.val);
    }

    traverse(this.root);
    return visitedNodes;
  }

  /** bfs(): Traverse the array using USING BREADTH FIRST SEARCH - across each level 
   * Return an array of visited nodes. */

  bfs() {
    let visitedNodes = [this.root.val];
    let queue = [];
    let currentNode = this.root;

    queue.push(currentNode);

    while(queue.length){
      currentNode = queue.shift();
      // console.log("currentNode", currentNode.val)
  
      if(currentNode.left){
        visitedNodes.push(currentNode.left.val);
        // re-populate the queue with this nodes left
        queue.push(currentNode.left);
        // console.log("pushed left val", visitedNodes)
      };

      if(currentNode.right){
        visitedNodes.push(currentNode.right.val);
        // re-populate the queue with this nodes left
        queue.push(currentNode.right);
        // console.log("pushed right val", visitedNodes)
      } 
    };
    return visitedNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
