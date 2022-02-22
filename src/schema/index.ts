import * as fs from "fs"
import * as path from "path"


export default buildGQLFileList(__dirname, []).map((f) => fs.readFileSync(f, "utf8"));

function buildGQLFileList(directory: any, list: any): Array<any> {
  fs.readdirSync(directory, { withFileTypes: true }).map((f, i) => {
    const { name } = f;
    if (f.isDirectory()) {
      buildGQLFileList(path.join(directory, name), list);
    } else {
      if (name.endsWith(".gql")) {
        list.push(path.join(directory, name))
      }
    }
  })
  return list;
}