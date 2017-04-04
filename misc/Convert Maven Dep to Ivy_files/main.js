var deps = []

class MavenDep {
  constructor(group, artifact, version) {
    this.group = group;
    this.artifact = artifact;
    this.version = version;
  }

  get ivy() {
    return new IvyDep(this.group, this.artifact, this.version)
  }
}

class IvyDep {
  constructor(org, name, rev) {
    this.org = org;
    this.name = name;
    this.rev = rev;
  }
  get text() {
    return `<dependency org="${this.org}" name="${this.name}" rev="${this.rev}"/>`
  }
}

function mavenDepXmlFactory(text) {
  function grabVal(name) {
    return xmlDoc.getElementsByTagName(name)[0].childNodes[0].nodeValue;
  }
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(text,"text/xml");
  return new MavenDep(grabVal("groupId"), grabVal("artifactId"), grabVal("version"));
}

let k = new MavenDep("de.mukis", "de.mukis.jama", "2.0.0.M1")
console.log(k)
console.log(k.ivy)
$("#convert").on("click", function(e) {
  let text = $("#maven")[0].value;
  let dep = mavenDepXmlFactory(text);
  $("#ivy").val(dep.ivy.text)
  // console.log(dep.ivy.text)
})
