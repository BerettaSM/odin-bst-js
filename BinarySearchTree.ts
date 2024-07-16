import { LinkedList } from './LinkedList';

class TreeNode<T> {
    public left: TreeNode<T> | null;
    public right: TreeNode<T> | null;

    constructor(
        public value: T,
        children?: {
            left?: TreeNode<T> | null;
            right?: TreeNode<T> | null;
        }
    ) {
        this.left = children?.left ?? null;
        this.right = children?.right ?? null;
    }
}

export interface Comparable<T> {
    compareTo(e: T): number;
}

export class BinarySearchTree<T extends number | Comparable<T>> {
    private root: TreeNode<T> | null = null;

    constructor(array: T[] | null = null) {
        this.initialize(array);
    }

    insert(value: T, target: TreeNode<T> | null = this.root) {
        if (target === null) return new TreeNode(value);
        if (value === target.value) return target;
        if (value > target.value)
            target.right = this.insert(value, target.right);
        else target.left = this.insert(value, target.left);
        return target;
    }

    deleteItem(value: T, target: TreeNode<T> | null = this.root) {
        if (target === null) return null;
        if (value < target.value) {
            target.left = this.deleteItem(value, target.left);
        } else if (value > target.value) {
            target.right = this.deleteItem(value, target.right);
        } else {
            if (target.left === null) return target.right;
            if (target.right === null) return target.left;
            const min = this.findMinChild(target.right);
            target.value = min.value;
            target.right = this.deleteItem(min.value, target.right);
        }
        return target;
    }

    find(value: T, target: TreeNode<T> | null = this.root): TreeNode<T> | null {
        if (target === null) return null;
        if (target.value === value) return target;
        if (value > target.value) return this.find(value, target.right);
        return this.find(value, target.left);
    }

    levelOrder(): T[];
    levelOrder(callback: (node: TreeNode<T>) => void): void;
    levelOrder(callback?: (node: TreeNode<T>) => void): T[] | void {
        const node = this.root;

        if (!node && !callback) return [];
        if (!node) return;

        const q = new LinkedList<TreeNode<T>>();
        const result: T[] = [];
        q.append(node);

        while (!q.isEmpty()) {
            const node = q.shift();
            if (!node) continue;
            if (callback) callback(node);
            else result.push(node.value);
            if (node.left) q.append(node.left);
            if (node.right) q.append(node.right);
        }

        if (!callback) return result;
    }

    print(node: TreeNode<T> | null = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.print(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    private findMinChild(node: TreeNode<T>) {
        while (node.left) node = node.left;
        return node;
    }

    private initialize(array: T[] | null = null) {
        if (!array) return;
        const parsedArray = this.parseArray(array);
        this.root = this.buildTree(parsedArray);
    }

    private parseArray(array: T[]) {
        const uniques = new Set(array);
        return [...uniques].sort(this.compare);
    }

    private compare(a: T, b: T) {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        if (typeof a === 'number' || typeof b === 'number') {
            throw new Error('Uncomparable types.');
        }
        return a.compareTo(b);
    }

    private buildTree(
        array: T[],
        start: number = 0,
        end: number = array.length - 1
    ): TreeNode<T> | null {
        if (start > end) return null;
        const mid = start + Math.floor((end - start) / 2);
        return new TreeNode<T>(array[mid], {
            left: this.buildTree(array, start, mid - 1),
            right: this.buildTree(array, mid + 1, end),
        });
    }
}
