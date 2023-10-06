const AccessControl = require("accesscontrol");

const ac = new AccessControl();

exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")
 .readOwn("motifreclamation")
 .updateOwn("motifreclamation")
 .readOwn("habilitation")
 .updateOwn("habilitation")
ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")
 .updateAny("profile")
 .readAny("motifreclamation")
 .updateAny("motifreclamation")
 .readAny("habilitation")
 .updateAny("habilitation")
ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("profile")
 .deleteAny("profile")
 .updateAny("motifreclamation")
 .deleteAny("motifreclamation")
 .updateAny("habilitation")
 .deleteAny("habilitation")
return ac;
})();