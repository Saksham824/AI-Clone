// Detect heading: starts with ** and ends with *
export function checkHeading(str) {
  return /^(\*\*)(.*)\*$/.test(str.trim());
}

export function replaceHeadingStars(str) {
  return str.trim().replace(/^(\*\*)/, "").replace(/\*$/, "").trim();
}

// Detect list items
export function isListItem(str) {
  return /^(\d+\.|\-)\s+/.test(str.trim());
}

// Detect code block start or end
export function isCodeBlockMarker(str) {
  return /^```/.test(str.trim());
}
