import YAML from "js-yaml";

function get(state: any, line: any) {
  const pos = state.bMarks[line];
  const max = state.eMarks[line];
  return state.src.substr(pos, max - pos);
}

function meta(md: any, state: any, start: any, end: any, silent: any) {
  if (start !== 0 || state.blkIndent !== 0) {
    return false;
  }
  if (state.tShift[start] < 0) {
    return false;
  }
  if (!get(state, start).match(/^---$/)) {
    return false;
  }
  const data = [];
  let line = start;
  while (line < end) {
    line++;
    const str = get(state, line);
    if (str.match(/^---$/)) {
      break;
    }
    if (state.tShift[line] < 0) {
      break;
    }
    data.push(str);
  }

  md.meta = YAML.load(data.join("\n"), { json: true }) || {};
  state.line = line + 1;
  return true;
}

function MetaPlugin(md: any) {
  md.meta = md.meta || {};
  md.block.ruler.before("code", "meta", meta.bind(null, md), { alt: [] });
}

export default MetaPlugin;
