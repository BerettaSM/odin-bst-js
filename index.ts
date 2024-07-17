import { BinarySearchTree } from './BinarySearchTree';

const tree = new BinarySearchTree<number>([1, 4, 7, 9, 14, 16, 20, 26, 27, 30]);

console.log(tree.isBalanced())
tree.insert(31)
tree.print();

tree.insert(13);

tree.print();

tree.deleteItem(26);

tree.print();

console.log(tree.find(16));

console.log(tree.height(tree.find(133)));

console.log(tree.depth(tree.find(133)))
