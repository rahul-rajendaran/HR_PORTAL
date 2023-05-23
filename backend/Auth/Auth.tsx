require("dotenv").config()
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");

sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/Rahul",
          process.env.CLIENT_ID as string,
          process.env.SECRET_KEY as string
        ),
    },
  });

  export { sp };
