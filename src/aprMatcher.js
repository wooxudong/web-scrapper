
function match(raw) {
  const regexForTarget = /[0-9]*\.[0-9]*%/gi;
  if (!raw) return null;
  const matched = [...raw.matchAll(regexForTarget)];
  return matched && matched.length > 0 ? matched.map(item=>item.pop()) : null;
}

exports.match = match;