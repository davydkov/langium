/******************************************************************************
 * This file was generated by langium-cli 3.0.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import type { LangiumSharedCoreServices, LangiumCoreServices, LangiumGeneratedCoreServices, LangiumGeneratedSharedCoreServices, LanguageMetaData, Module } from 'langium';
import { RequirementsAndTestsAstReflection } from './ast.js';
import { RequirementsGrammar, TestsGrammar } from './grammar.js';

export const RequirementsLanguageMetaData = {
    languageId: 'requirements-lang',
    fileExtensions: ['.req'],
    caseInsensitive: false
} as const satisfies LanguageMetaData;

export const TestsLanguageMetaData = {
    languageId: 'tests-lang',
    fileExtensions: ['.tst'],
    caseInsensitive: false
} as const satisfies LanguageMetaData;

export const RequirementsAndTestsGeneratedSharedModule: Module<LangiumSharedCoreServices, LangiumGeneratedSharedCoreServices> = {
    AstReflection: () => new RequirementsAndTestsAstReflection()
};

export const RequirementsGeneratedModule: Module<LangiumCoreServices, LangiumGeneratedCoreServices> = {
    Grammar: () => RequirementsGrammar(),
    LanguageMetaData: () => RequirementsLanguageMetaData,
    parser: {}
};

export const TestsGeneratedModule: Module<LangiumCoreServices, LangiumGeneratedCoreServices> = {
    Grammar: () => TestsGrammar(),
    LanguageMetaData: () => TestsLanguageMetaData,
    parser: {}
};
