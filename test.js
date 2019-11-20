//https://codebeautify.org/jsonviewer

/**
 * Generate a JSON file based on reading an .xlsx file
 * that has been exported from a spreadsheet generating software
 * to be used for translation with i18n.
 */

const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');

function formatKey(unformattedKey) {
  let key = unformattedKey;
  // Replace all special characters with an underscore.
  key = key.replace(/[&\-\/\\#, +()$~%.'":*?<>{}]/g, '_');
  // Replace whitespace with underscore.
  // Lowercase all test.
  // Trim leading and trailing whitespace.
  // 30 chars long max
  key = key.replace(/\s+/g, '_').toLowerCase().slice(0, 30).trim();
  return key;
}

// File path.
readXlsxFile('./trans (2).xlsx').then((rows) => {
  console.log('rows', rows);
  let output = {};
  let json = {};
  // let currentSection = null;
  // let newSection = null;

  for (var idx in rows) {
    console.log('rows[idx]', rows[idx]);
    // newSection = rows[idx][0];

    // 2nd column has keys
    let key = rows[idx][1];
    console.log('key')
    // Some rows are blank. Skip them
    if (key) {
      key = formatKey(key);
      // 3rd column has values
      // json[currentSection][key] = rows[idx][2];
      json[key] = rows[idx][2];
    }

    if (idx == rows.length - 1) {
      // if (newSection !== null || idx == rows.length - 1) {
        // Add section to output if section complete
        if (Object.keys(json).length > 0) {
          Object.assign(output, json);
        }
        // if (newSection !== null) {
          // currentSection = formatKey(newSection);
          // json = {}; // Otherwise re-init json
          // json[currentSection] = {};
        // }
      }
  }
  const finalJson = JSON.stringify(output);
  fs.writeFile('language.json', finalJson, 'utf8', function(out, err) {
    console.log("generated lang file");
  });
})