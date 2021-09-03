/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import { Connection, Diagnostic } from 'vscode-languageserver/node';
import { DocumentValidator } from '../validation/document-validator';
import { LangiumParser, ParseResult } from '../parser/langium-parser';
import { ScopeComputation } from '../references/scope';
import { LangiumServices } from '../services';
import { LangiumDocument } from './document';

export interface DocumentBuilder {
    build(document: LangiumDocument): BuildResult
    validate(document: LangiumDocument): Diagnostic[] | undefined
}

export interface BuildResult {
    readonly parseResult: ParseResult
    readonly diagnostics: Diagnostic[]
}

export class DefaultDocumentBuilder implements DocumentBuilder {
    protected readonly connection?: Connection;
    protected readonly parser: LangiumParser;
    protected readonly scopeComputation: ScopeComputation;
    protected readonly documentValidator: DocumentValidator;

    constructor(services: LangiumServices) {
        this.connection = services.lsp.Connection;
        this.parser = services.parser.LangiumParser;
        this.scopeComputation = services.references.ScopeComputation;
        this.documentValidator = services.validation.DocumentValidator;
    }

    build(document: LangiumDocument): BuildResult {
        if (!document.parseResult) {
            const parseResult = this.parser.parse(document);
            document.parseResult = parseResult;
        }
        this.process(document);
        let diagnostics: Diagnostic[] | undefined = this.connection ? this.validate(document) : undefined;
        const validator = this.documentValidator;
        return {
            parseResult: document.parseResult,
            get diagnostics() {
                if (!diagnostics) {
                    diagnostics = validator.validateDocument(document);
                }
                return diagnostics;
            }
        };
    }

    validate(document: LangiumDocument): Diagnostic[] | undefined {
        let diagnostics: Diagnostic[] | undefined;
        const validator = this.documentValidator;
        if (this.connection) {
            diagnostics = validator.validateDocument(document);
            // Send the computed diagnostics to VS Code.
            this.connection.sendDiagnostics({ uri: document.textDocument.uri, diagnostics });
        }
        return diagnostics;
    }
    /**
     * Process the document by running precomputations. The default implementation precomputes the scope.
     */
    protected process(document: LangiumDocument): void {
        document.precomputedScopes = this.scopeComputation.computeScope(document);
    }

}
