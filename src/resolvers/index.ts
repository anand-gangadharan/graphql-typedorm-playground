import { merge } from "lodash"
import * as user from "./users"
import * as kcpinfo from "./kcpinfo"
import * as like from "./like"
export default merge(
  {},
  user,
  kcpinfo,like
)
