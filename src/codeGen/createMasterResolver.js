import { TAB, TAB2 } from "./utilities";

export default function createMasterResolver(namesWithTables, writeableNames) {
  let resolverImports = namesWithTables.map(n => `import ${n}, { ${n} as ${n}Rest } from './${n}/resolver';`).join("\n");
  let resolverDestructurings = "const " + namesWithTables.map(n => `{ Query: ${n}Query, Mutation: ${n}Mutation } = ${n}`).join(";\nconst ") + ";";

  return `import GraphQLJSON from 'graphql-type-json';\n\n${resolverImports}\n\n${resolverDestructurings}

export default {
${TAB}JSON: GraphQLJSON,
${TAB}Query: Object.assign(
${TAB2}{},
${TAB2}${namesWithTables.map(n => `${n}Query`).join(`,\n${TAB2}`)}
${TAB}),
${TAB}${
    writeableNames.length
      ? `Mutation: Object.assign({},
${TAB2}${writeableNames.map(n => `${n}Mutation`).join(`,\n${TAB2}`)}
${TAB}),`
      : ""
  }
${namesWithTables.length ? TAB : ""}${namesWithTables.map(n => `${n}: { ...${n}Rest }`).join(`,\n  `)}
};

`;
}
