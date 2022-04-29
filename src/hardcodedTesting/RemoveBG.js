import React from 'react'

import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } from "remove.bg";

const url = "https://domain.tld/path/file.jpg";
const outputFile = `${__dirname}/out/img-removed-from-file.png`;

removeBackgroundFromImageUrl({
  url,
  apiKey: "kg95vEKb51zDh3NyGkkuJ3Ga",
  size: "regular",
  type: "person",
  outputFile
}).then((result: RemoveBgResult) => {
  console.log(`File saved to ${outputFile}`);
  const base64img = result.base64img;
}).catch((errors: Array<RemoveBgError>) => {
  console.log(JSON.stringify(errors));
});

function RemoveBG() {
  return (
    <div>RemoveBG</div>
  )
}

export default RemoveBG