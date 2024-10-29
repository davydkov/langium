/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

// Ensure that all imports are erased at runtime to avoid circular dependencies.
import type { IParserErrorMessageProvider } from 'chevrotain';
import type { CommentProvider } from './documentation/comment-provider.js';
import type { DocumentationProvider } from './documentation/documentation-provider.js';
import type { Grammar } from './languages/generated/ast.js';
import type { GrammarConfig } from './languages/grammar-config.js';
import type { LanguageMetaData } from './languages/language-meta-data.js';
import type { AsyncParser } from './parser/async-parser.js';
import type { LangiumCompletionParser, LangiumParser } from './parser/langium-parser.js';
import type { Lexer } from './parser/lexer.js';
import type { IParserConfig } from './parser/parser-config.js';
import type { TokenBuilder } from './parser/token-builder.js';
import type { ValueConverter } from './parser/value-converter.js';
import type { Linker } from './references/linker.js';
import type { NameProvider } from './references/name-provider.js';
import type { References } from './references/references.js';
import type { ScopeComputation } from './references/scope-computation.js';
import type { ScopeProvider } from './references/scope-provider.js';
import type { JsonSerializer } from './serializer/json-serializer.js';
import type { ServiceRegistry } from './service-registry.js';
import type { AstReflection } from './syntax-tree.js';
import type { DocumentValidator } from './validation/document-validator.js';
import type { ValidationRegistry } from './validation/validation-registry.js';
import type { AstNodeDescriptionProvider, ReferenceDescriptionProvider } from './workspace/ast-descriptions.js';
import type { AstNodeLocator } from './workspace/ast-node-locator.js';
import type { ConfigurationProvider } from './workspace/configuration.js';
import type { DocumentBuilder } from './workspace/document-builder.js';
import type { LangiumDocumentFactory, LangiumDocuments, TextDocumentProvider } from './workspace/documents.js';
import type { FileSystemProvider } from './workspace/file-system-provider.js';
import type { IndexManager } from './workspace/index-manager.js';
import type { WorkspaceLock } from './workspace/workspace-lock.js';
import type { Hydrator } from './serializer/hydrator.js';
import type { WorkspaceManager } from './workspace/workspace-manager.js';
import type { Environment } from './workspace/environment.js';

/**
 * The services generated by `langium-cli` for a specific language. These are derived from the
 * grammar definition and the language configuration.
 */
export type LangiumGeneratedCoreServices = {
    readonly Grammar: Grammar
    readonly LanguageMetaData: LanguageMetaData
    readonly parser: {
        readonly ParserConfig?: IParserConfig
    }
}

/**
 * Core services for a specific language of which Langium provides default implementations.
 */
export type LangiumDefaultCoreServices = {
    readonly parser: {
        readonly AsyncParser: AsyncParser
        readonly GrammarConfig: GrammarConfig
        readonly ValueConverter: ValueConverter
        readonly LangiumParser: LangiumParser
        readonly ParserErrorMessageProvider: IParserErrorMessageProvider
        readonly CompletionParser: LangiumCompletionParser
        readonly TokenBuilder: TokenBuilder
        readonly Lexer: Lexer
    }
    readonly documentation: {
        readonly CommentProvider: CommentProvider
        readonly DocumentationProvider: DocumentationProvider
    }
    readonly references: {
        readonly Linker: Linker
        readonly NameProvider: NameProvider
        readonly References: References
        readonly ScopeProvider: ScopeProvider
        readonly ScopeComputation: ScopeComputation
    }
    readonly serializer: {
        readonly Hydrator: Hydrator
        readonly JsonSerializer: JsonSerializer
    }
    readonly validation: {
        readonly DocumentValidator: DocumentValidator
        readonly ValidationRegistry: ValidationRegistry
    }
    readonly workspace: {
        readonly AstNodeLocator: AstNodeLocator
        readonly AstNodeDescriptionProvider: AstNodeDescriptionProvider
        readonly ReferenceDescriptionProvider: ReferenceDescriptionProvider
    }
    readonly shared: LangiumSharedCoreServices
}

/**
 * The core set of services available for a language. These are either generated by `langium-cli`
 * or provided as default implementations.
 */
export type LangiumCoreServices = LangiumGeneratedCoreServices & LangiumDefaultCoreServices

/**
 * The services generated by `langium-cli` that are shared between multiple languages. These are
 * derived from the grammar definition.
 */
export type LangiumGeneratedSharedCoreServices = {
    readonly AstReflection: AstReflection
}

/**
 * Core services shared between multiple languages where Langium provides default implementations.
 */
export type LangiumDefaultSharedCoreServices = {
    readonly ServiceRegistry: ServiceRegistry
    readonly workspace: {
        readonly Environment: Environment
        readonly ConfigurationProvider: ConfigurationProvider
        readonly DocumentBuilder: DocumentBuilder
        readonly FileSystemProvider: FileSystemProvider
        readonly IndexManager: IndexManager
        readonly LangiumDocuments: LangiumDocuments
        readonly LangiumDocumentFactory: LangiumDocumentFactory
        readonly TextDocuments?: TextDocumentProvider
        readonly WorkspaceLock: WorkspaceLock
        readonly WorkspaceManager: WorkspaceManager
    }
}

/**
 * The shared core services are a set of services that are used by every language within a Langium project (excluding LSP services)
 * This is necessary to enable features like cross references across different languages.
 */
export type LangiumSharedCoreServices = LangiumDefaultSharedCoreServices & LangiumGeneratedSharedCoreServices

/**
 * A deep partial type definition for services. We look into T to see whether its type definition contains
 * any methods. If it does, it's one of our services and therefore should not be partialized.
 */
//eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T[keyof T] extends Function ? T : {
    [P in keyof T]?: DeepPartial<T[P]>;
}

/**
 * Language-specific core services to be partially overridden via dependency injection.
 */
export type PartialLangiumCoreServices = DeepPartial<LangiumCoreServices>

/**
 * Shared core services to be partially overridden via dependency injection.
 */
export type PartialLangiumSharedCoreServices = DeepPartial<LangiumSharedCoreServices>
