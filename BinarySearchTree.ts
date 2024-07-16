class TreeNode<T> {
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(
        public value: T,
        children?: {
            left?: TreeNode<T>;
            right?: TreeNode<T>;
        }
    ) {
        this.left = children?.left ?? null;
        this.right = children?.right ?? null;
    }
}
