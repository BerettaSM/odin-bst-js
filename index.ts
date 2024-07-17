import { BinarySearchTree } from './BinarySearchTree';
import { randomNumber } from './utils';

const numbers = [...Array(randomNumber(15, 30))].map(() => randomNumber(0, 100));
const tree = new BinarySearchTree<number>(numbers);

console.log('Is balanced?', tree.isBalanced())

console.log('Level order', tree.levelOrder());
console.log('Pre order', tree.preOrder());
console.log('In order', tree.inOrder());
console.log('Post order', tree.postOrder());

console.log('Unbalancing the tree...');
for(let i = 0;i < 5; i++) {
    tree.insert(randomNumber(100, 200));
}

console.log('Is balanced?', tree.isBalanced());

console.log('Rebalancing the tree...');
tree.rebalance();

console.log('Is balanced?', tree.isBalanced());

console.log('Level order', tree.levelOrder());
console.log('Pre order', tree.preOrder());
console.log('In order', tree.inOrder());
console.log('Post order', tree.postOrder());
