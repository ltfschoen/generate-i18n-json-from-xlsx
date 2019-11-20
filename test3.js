// // FIXME - WIP

// /**
//  * Generate a multiple JSON files based on reading an .xlsx file
//  * and using sheet 1, which has language names on top row (except first column).
//  * It has been exported from a spreadsheet generating software
//  * to be used for translation with i18n.
//  */

// const fs = require('fs');

// const readXlsxFile = require('read-excel-file/node');

// function formatKey(unformattedKey) {
//   let key = unformattedKey;
//   // Replace all special characters with an underscore.
//   key = key.replace(/[&\-\/\\#, +()$~%.'":*?<>{}]/g, '_');
//   // Replace whitespace with underscore.
//   // Lowercase all test.
//   // Trim leading and trailing whitespace.
//   // 30 chars long max
//   key = key.replace(/\s+/g, '_').toLowerCase().slice(0, 30).trim();
//   return key;
// }

// // File path and what sheet number
// readXlsxFile('./all.xlsx', { sheet: 1 }).then((rows) => {
//   // console.log('rows', rows);
//   let output = {};
//   let json = {};
//   let currentSection = null;
//   let newSection = null;

//   // Quantity of languages in the file
//   let langs = {
//     "English": "en",
//     "Korean": "ko",
//     "Chinese (Simplified)": "zhCN",
//     "Chinese (Traditional)": "zhTW"
//   };
//   // Language names are always in the first row
//   let langRow = rows[0];
//   let langCount = langRow.length - 1;
//   let langFilename = null;

//   for (var langIdx in langRow) {
//     console.log('langIdx', langIdx)
//     console.log('langRow[langIdx]', langRow[langIdx]);
//     // console.log('langs[langRow[langIdx]]', langs[langRow[langIdx]]);
//     // Ignore the first blank column on the first row.
//     // Ignore language specified in first column doesn't match any of the `lang` keys
//     if (langRow[langIdx] !== null && langs[langRow[langIdx]]) {
//       // Use the value in `lang` corresponding to the column's language as the filename for i18n.
//       langFilename = langs[langRow[langIdx]];
//       console.log('langFilename', langFilename)

//       for (var idx in rows) {
//         // console.log('rows[idx]', rows[idx]);
//         // Section name is in the first column always
//         newSection = rows[idx][0];

//         // console.log('idx', idx)
//         // console.log('rows[idx]: ', rows[idx])
//         // console.log('newSection', newSection)
//         if (newSection === null && idx == 0) {
//           console.log('skip')
//           continue;
//         }
    
//         if (newSection !== null || idx == rows.length - 1) {
//           // Add section to output if section complete
//           if (Object.keys(json).length > 0) {
//             Object.assign(output, json);
//           }
//           if (newSection !== null) {
//             currentSection = formatKey(newSection);
//             json = {}; // Otherwise re-init json
//             json[currentSection] = {};
//           }
//         }
    
//         let key = rows[idx][langIdx];
        
//         // Some rows are blank. Skip them
//         if (key) {
//           key = formatKey(key);
//           console.log('key', key);
//           json[currentSection][key] = rows[idx][langIdx];
//         }
//       }
//       const finalJson = JSON.stringify(output);
//       const filename = `${langFilename}.json`
//       console.log('filenamne: ', filename)
//       fs.writeFile(filename, finalJson, 'utf8', function(out, err) {
//         console.log(`generated lang file for ${langFilename}`);
//       });
//     }
//   }
// })
