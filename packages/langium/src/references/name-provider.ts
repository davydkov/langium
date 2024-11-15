/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import type { AstNode, CstNode } from '../syntax-tree.js';
import { findNodeForProperty } from '../utils/grammar-utils.js';

export interface NamedAstNode extends AstNode {
    name: string;
}

export function isNamed(node: AstNode): node is NamedAstNode {
    return typeof (node as NamedAstNode).name === 'string';
}

/**
 * Utility service for retrieving the `name` of an `AstNode` or the `CstNode` containing a `name`.
 */
export interface NameProvider {
    /**
     * Returns the `name` of a given AstNode.
     * @param node Specified `AstNode` whose name node shall be retrieved.
     */
    getName<N extends NamedAstNode>(node: N): string
    getName<N extends AstNode>(node: N): string | undefined
    /**
     * Returns the `CstNode` which contains the parsed value of the `name` assignment.
     * @param node Specified `AstNode` whose name node shall be retrieved.
     */
    getNameNode<N extends NamedAstNode>(node: N): CstNode
    getNameNode<N extends AstNode>(node: N): CstNode | undefined  
}

export class DefaultNameProvider implements NameProvider {
    
    getName<N extends NamedAstNode>(node: N): string
    getName<N extends AstNode>(node: N): string | undefined {
        if (isNamed(node)) {
            return node.name;
        }
        return undefined;
    }
    
    getNameNode<N extends NamedAstNode>(node: N): CstNode
    getNameNode<N extends AstNode>(node: N): CstNode | undefined {
        return findNodeForProperty(node.$cstNode, 'name');
    }
}
