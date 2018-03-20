import * as d from '../../../declarations';
import { catchError } from '../../util';
import { isDecoratorNamed, serializeSymbol } from './utils';
import { toDashCase } from '../../../util/helpers';
import { MEMBER_TYPE, PROP_TYPE } from '../../../util/constants';
import * as ts from 'typescript';


export function getPropDecoratorMeta(checker: ts.TypeChecker, classNode: ts.ClassDeclaration, sourceFile: ts.SourceFile, diagnostics: d.Diagnostic[]) {
  return classNode.members
    .filter(member => Array.isArray(member.decorators) && member.decorators.length > 0)
    .reduce((allMembers: d.MembersMeta, prop: ts.PropertyDeclaration) => {
      const memberData: d.MemberMeta = {};
      const propDecorator = prop.decorators.find(isDecoratorNamed('Prop'));

      if (propDecorator == null) {
        return allMembers;
      }

      const propOptions = getPropOptions(propDecorator, diagnostics);
      const memberName = (prop.name as ts.Identifier).text;
      const symbol = checker.getSymbolAtLocation(prop.name);

      if (propOptions && typeof propOptions.connect === 'string') {
        // @Prop({ connect: 'ion-alert-controller' })
        memberData.memberType = MEMBER_TYPE.PropConnect;
        memberData.ctrlId = propOptions.connect;

      } else if (propOptions && typeof propOptions.context === 'string') {
        // @Prop({ context: 'config' })
        memberData.memberType = MEMBER_TYPE.PropContext;
        memberData.ctrlId = propOptions.context;

      } else {
        // @Prop()
        memberData.memberType = getMemberType(propOptions);
        memberData.attribName = getAttributeName(propOptions, memberName);
        memberData.attribType = getAttribType(sourceFile, prop, diagnostics);
        memberData.reflectToAttr = getreflectToAttr(propOptions);
        memberData.propType = propTypeFromTSType(memberData.attribType.text);
        memberData.jsdoc = serializeSymbol(checker, symbol);
      }

      allMembers[memberName] = memberData;
      return allMembers;
    }, {} as d.MembersMeta);
}


function getPropOptions(propDecorator: ts.Decorator, diagnostics: d.Diagnostic[]) {
  const suppliedOptions = (propDecorator.expression as ts.CallExpression).arguments
  .map(arg => {
    try {
      const fnStr = `return ${arg.getText()};`;
      return new Function(fnStr)();

    } catch (e) {
      const d = catchError(diagnostics, e);
      d.messageText = `parse prop options: ${e}`;
    }
  });

  const propOptions: d.PropOptions = suppliedOptions[0];
  return propOptions;
}


function getMemberType(propOptions: d.PropOptions) {
  if (propOptions && propOptions.mutable === true) {
    return MEMBER_TYPE.PropMutable;
  }

  return MEMBER_TYPE.Prop;
}


function getAttributeName(propOptions: d.PropOptions, memberName: string) {
  if (propOptions && typeof propOptions.attr === 'string' && propOptions.attr.trim().length > 0) {
    return propOptions.attr.trim();
  }
  return toDashCase(memberName);
}


function getreflectToAttr(propOptions: d.PropOptions) {
  if (propOptions && propOptions.reflectToAttr === true) {
    return true;
  }

  return false;
}


function getAttribType(sourceFile: ts.SourceFile, prop: ts.PropertyDeclaration, diagnostics: d.Diagnostic[]) {
  let attribType: d.AttributeTypeInfo;

  // If the @Prop() attribute does not have a defined type then infer it
  if (!prop.type) {
    let attribTypeText = inferPropType(prop.initializer);

    if (!attribTypeText) {
      attribTypeText = 'any';
      diagnostics.push({
        level: 'warn',
        type: 'build',
        header: 'Prop type provided is not supported, defaulting to any',
        messageText: `'${prop.getFullText()}'`,
      });
    }
    attribType = {
      text: attribTypeText,
    };
  } else {
    attribType = getAttributeTypeInfo(prop.type, sourceFile);
  }

  return attribType;
}


function getAttributeTypeInfo(type: ts.TypeNode, sourceFile: ts.SourceFile) {
  const typeInfo: d.AttributeTypeInfo = {
    text: type.getFullText().trim()
  };
  const typeReferences = getAllTypeReferences(type)
    .reduce((allReferences, rt)  => {
      allReferences[rt] = getTypeReferenceLocation(rt, sourceFile);
      return allReferences;
    }, {} as { [key: string]: d.AttributeTypeReference});

  if (Object.keys(typeReferences).length > 0) {
    typeInfo.typeReferences = typeReferences;
  }
  return typeInfo;
}

function getAllTypeReferences(node: ts.TypeNode): string[] {
  const referencedTypes: string[] = [];

  function visit(node: ts.Node): ts.VisitResult<ts.Node> {
    switch (node.kind) {
    case ts.SyntaxKind.TypeReference:
      referencedTypes.push((<ts.TypeReferenceNode>node).typeName.getText().trim());
      if ((<ts.TypeReferenceNode>node).typeArguments) {
        (<ts.TypeReferenceNode>node).typeArguments
          .filter(ta => ts.isTypeReferenceNode(ta))
          .forEach(tr => referencedTypes.push((<ts.TypeReferenceNode>tr).typeName.getText().trim()));
      }
    /* tslint:disable */
    default:
      return ts.forEachChild(node, (node) => {
        return visit(node);
      });
    }
    /* tslint:enable */
  }

  visit(node);

  return referencedTypes;
}

function getTypeReferenceLocation(typeName: string, sourceFile: ts.SourceFile): d.AttributeTypeReference {

  const sourceFileObj = sourceFile.getSourceFile();

  // Loop through all top level imports to find any reference to the type for 'import' reference location
  const importTypeDeclaration = sourceFileObj.statements.find(st => {
    const statement = ts.isImportDeclaration(st) &&
      ts.isImportClause(st.importClause) &&
      st.importClause.namedBindings &&  ts.isNamedImports(st.importClause.namedBindings) &&
      Array.isArray(st.importClause.namedBindings.elements) &&
      st.importClause.namedBindings.elements.find(nbe => nbe.name.getText() === typeName);
    if (!statement) {
      return false;
    }
    return true;
  });

  if (importTypeDeclaration) {
    const localImportPath = (<ts.StringLiteral>(<ts.ImportDeclaration>importTypeDeclaration).moduleSpecifier).text;
    return {
      referenceLocation: 'import',
      importReferenceLocation: localImportPath
    };
  }

  // Loop through all top level exports to find if any reference to the type for 'local' reference location
  const isExported = sourceFileObj.statements.some(st => {
    // Is the interface defined in the file and exported
    const isInterfaceDeclarationExported = ((ts.isInterfaceDeclaration(st) &&
      (<ts.Identifier>st.name).getText() === typeName) &&
      Array.isArray(st.modifiers) &&
      st.modifiers.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword));

    // Is the interface exported through a named export
    const isTypeInExportDeclaration = ts.isExportDeclaration(st) &&
      ts.isNamedExports(st.exportClause) &&
      st.exportClause.elements.some(nee => nee.name.getText() === typeName);

    return isInterfaceDeclarationExported || isTypeInExportDeclaration;
  });

  if (isExported) {
    return {
      referenceLocation: 'local'
    };
  }


  // This is most likely a global type, if it is a local that is not exported then typescript will inform the dev
  return {
    referenceLocation: 'global',
  };
}

function inferPropType(expression: ts.Expression | undefined) {
  if (expression == null) {
    return undefined;
  }
  if (ts.isStringLiteral(expression)) {
    return 'string';
  }
  if (ts.isNumericLiteral(expression)) {
    return 'number';
  }
  if ([ ts.SyntaxKind.BooleanKeyword, ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword ].indexOf(expression.kind) !== -1) {
    return 'boolean';
  }
  if ((ts.SyntaxKind.NullKeyword === expression.kind) ||
      (ts.SyntaxKind.UndefinedKeyword === expression.kind) ||
      (ts.isRegularExpressionLiteral(expression)) ||
      (ts.isArrayLiteralExpression(expression)) ||
      (ts.isObjectLiteralExpression(expression))) {
    return 'any';
  }
  return undefined;
}

function propTypeFromTSType(type: string) {
  switch (type) {
    case 'string':
      return PROP_TYPE.String;
    case 'number':
      return PROP_TYPE.Number;
    case 'boolean':
      return PROP_TYPE.Boolean;
    case 'any':
      return PROP_TYPE.Any;
    default:
      return PROP_TYPE.Unknown;
  }
}
