function extractReleaseFromFilename(filename) {
  const hyphenParts = filename.split(" - ");
  const lastPart = hyphenParts[2] || "";

  // Remove extensions
  const noExt = lastPart.replace(/\.en\.srt$|\.srt$/, "").trim();

  const parts = noExt.split(".");
  const hasResolution = parts.some((p) => /\d{3,4}p/.test(p));

  if (hasResolution) {
    const resIndex = parts.findIndex((p) => /\d{3,4}p/.test(p));
    const release = parts.slice(resIndex).join(".");
    const [resolution, rip = "", group] = release.split(".");

    const result = group ? `${resolution} ${rip}.${group}` : `${resolution} ${rip}`;
    return result.replace(/\s+/g, " ").trim();
  } else {
    // No resolution present
    const releaseParts = parts.slice(-2);
    if (releaseParts.length === 2) {
      return releaseParts.join(".").trim();
    } else if (releaseParts.length === 1) {
      return releaseParts[0].trim();
    } else {
      return "UNKNOWN";
    }
  }
}

// تجربة الكود:
console.log(
  extractReleaseFromFilename(
    "Game of Thrones - 1x01 - Winter is Coming.720p HDTV.en.srt"
  )
);
// Output: "720p HDTV"