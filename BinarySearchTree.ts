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

export class BinarySearchTree<T> {
    private root: TreeNode<T> | null = null;

    constructor(array: T[] | null = null) {
        this.initialize(array);
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

    private initialize(array: T[] | null = null) {
        if (!array) return;
        const parsedArray = this.parseArray(array);
        this.root = this.buildTree(parsedArray);
    }

    private parseArray(array: T[]) {
        const uniques = new Set(array);
        return [...uniques].sort();
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
