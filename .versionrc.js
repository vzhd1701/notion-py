const version_updater_regex = {
  readVersion: function (contents) {
    version_m = contents.match(this.regex);
    if (!version_m)
      throw new Error("Cannot parse version!");
    return version_m[1];
  },
  writeVersion: function (contents, version) {
    new_version = this.regex_repl.replace("$1", version);
    return contents.replace(this.regex, new_version);
  }
}

let version_updater_poetry = {...version_updater_regex};
version_updater_poetry.regex = /^version = \"([^\"]+)\"$/m;
version_updater_poetry.regex_repl = "version = \"$1\"";

let packageFiles = [
  {
    filename: "pyproject.toml",
    updater: version_updater_poetry,
  }
]

module.exports = {
  sign: true,
  packageFiles: packageFiles,
  bumpFiles: packageFiles,
  skip: {
    changelog: true
  }
}
