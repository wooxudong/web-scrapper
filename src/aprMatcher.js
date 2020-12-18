const regexForTarget = /[0-9]*\.[0-9]*%/;

function match(raw) {
  if (!raw) return null;
  const matched = raw.match(regexForTarget);
  return matched && matched.length > 0 ? matched.pop() : null;
}

exports.match = match;