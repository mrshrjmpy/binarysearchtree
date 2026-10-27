class Node {
    constructor(value, left = null, right = null){
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

class Tree {
    constructor(array){
        array = [... new Set(array)].sort((a, b) => a - b);
        console.log(array);
        this.root = this.buildTree(array);
    }
    buildTree(array, start = 0, end = array.length-1){
        if(start > end) return null;
        const mid = Math.floor((start + end)/2);
        const root = new Node(array[mid]);
        root.left = this.buildTree(array,start,mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }
    includes(value, root = this.root){
        if(root === null) return false;
        if(value == root.value) return true;
        else if(value < root.value) return this.includes(value, root.left);
        else if(value > root.value) return this.includes(value, root.right);
    }
    insert(value, root = this.root){
        if(this.includes(value)) return;    

        if(value > root.value){
            root.right == null ? root.right = new Node(value) : this.insert(value, root.right);
        } 
        else if(value < root.value) {
            root.left == null ? root.left = new Node(value) : this.insert(value, root.left);
        }
    }
    deleteItem(value, root=this.root){
        if(!this.includes(value)) return;
        if(root === null) return null;
        if(value == root.value){
            console.log("val found");
            if(root.left==null && root.right==null) return null;
            if(root.left===null) return root.right;
            if(root.right===null) return root.left;
            let temp = this.getSuccessor(root);
            root.value = temp.value;
            root.right = this.deleteItem(root.value, root.right);
        }

        else if(value > root.value){
            console.log(root.value);
            root.right = this.deleteItem(value, root.right);
        }

        else if(value < root.value){
            console.log(root.value);
            root.left = this.deleteItem(value, root.left);
        }
        return root;
    }
    getSuccessor(node){
        node = node.right;
        if(node && node.left){
            node = node.left;
        }
        return node;
    }
    levelOrderForEach(callback, root = this.root){
        if(callback === undefined) throw  new Error("Please enter a function");
        if(root === null) return;
        let levelorder = [];
        levelorder.push(root);
        while(levelorder.length != 0){
            callback(levelorder[0].value);
            if(levelorder[0].left !== null) levelorder.push(levelorder[0].left);
            if(levelorder[0].right !== null) levelorder.push(levelorder[0].right);
            levelorder.shift();
        }
    }
    inOrderForEach(callback, root = this.root){
        if(callback === undefined) throw new Error("Please enter a function");;
        if(root === null) return;
        this.inOrderForEach(callback, root.left);
        callback(root.value);
        this.inOrderForEach(callback, root.right);
    }
    preOrderForEach(callback, root = this.root){
        if(callback === undefined) throw new Error("Please enter a function");;
        if(root === null) return;
        callback(root.value);
        this.inOrderForEach(callback, root.left);
        
        this.inOrderForEach(callback, root.right);
    }
    postOrderForEach(callback, root = this.root){
        if(callback === undefined) throw new Error("Please enter a function");;
        if(root === null) return;
        this.inOrderForEach(callback, root.left);
        this.inOrderForEach(callback, root.right);
        callback(root.value);
    }
    depth(value, root = this.root){
        if(!this.includes(value, root)) return undefined;
        let depthValue = 0;

        if(root.value < value) depthValue += this.depth(value, root.right);
        else if(root.value > value) depthValue += this.depth(value, root.left);
        
        return depthValue + 1;
    }
    height(value){
        if(!this.includes(value, this.root)) return undefined;

        function calculateHeight(root){
            if(root == null) return 0;
            let leftHeight = calculateHeight(root.left);
            let rightHeight = calculateHeight(root.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }

        return calculateHeight(this.find(value, this.root));
    }
    find(value, root){
        if(root.value == value) return root;
        if(root.value < value) return this.find(value, root.right);
        if(root.value > value) return this.find(value, root.left);
    }
    isBalanced(root = this.root){
        if(root == null) return true;
        if(root.left && root.right && Math.abs(this.height(root.left.value) - this.height(root.right.value)) > 1)
            return false;
        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }
    rebalance(){
        let sortedarray = [];
        this.inOrderForEach((value) => sortedarray.push(value));
        this.root = this.buildTree(sortedarray);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 40, 45, 47, 6]);
prettyPrint(tree.root);

console.log(tree.isBalanced());
tree.inOrderForEach(value => console.log(value));
tree.preOrderForEach(value => console.log(value));
tree.postOrderForEach(value => console.log(value));

tree.insert(100000)
tree.insert(200);
tree.insert(634);
prettyPrint(tree.root);

console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());


/*

console.log(tree.includes(10));


tree.insert(100000)
tree.insert(2);
tree.insert(6);
prettyPrint(tree.root);

tree.deleteItem(4);
prettyPrint(tree.root);
tree.levelOrderForEach((a) => console.log(a));
//tree.levelOrderForEach();

tree.inOrderForEach((a) => console.log(a));
tree.preOrderForEach((a) => console.log(a));
tree.postOrderForEach((a) => console.log(a));

console.log("depth",tree.depth(6));
console.log("height",tree.height(67));

console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);*/