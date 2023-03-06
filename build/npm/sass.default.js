import * as util from "util"
import * as immutable from "immutable"
import * as fs from "fs"
import * as stream from "stream"
import _cliPkgModule from "./sass.dart.js";

// Bundlers may try to resolve this file eagerly, in which case
// sass.dart.js won't be able to accurately detect that it's being imported
// rather than required. Fortunately, in that case, exports will be defiend and
// we can load the library that way instead.
const _cliPkgLibrary =
    'load' in _cliPkgModule ? _cliPkgModule : window._cliPkgExports;
delete window._cliPkgExports;
const _cliPkgExports = {};
_cliPkgLibrary.load({util, immutable, fs, stream}, _cliPkgExports);

export const compileString = _cliPkgExports.compileString;
export const compileStringAsync = _cliPkgExports.compileStringAsync;
