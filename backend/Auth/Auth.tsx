import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");

sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/Rahul",
          "7c4db5e0-bb8e-478b-9c56-5060b7efcae2",
          "wfPNRUnSs0TeiAfqiUpRNJQTw9RpmU4EBBVp1EzyTUI="
        ),
    },
  });

  export { sp };
