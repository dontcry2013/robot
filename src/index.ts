import { startApplication, startApplicationWithStream, startApplicationWithStreamByBatch } from "./application"
import * as display from './types/display';

try {
  // get the filename
  const fileName = process.argv[2];

  // param to identify which way to execute
  const param = process.argv[3];

  if (fileName) {
    if (param == 'WithoutStream') {
      
      startApplication(fileName);

    } else if (param == 'WithStream') {
      
      startApplicationWithStream(fileName);
    
    } else {
    
      startApplicationWithStreamByBatch(fileName, 30);
    
    }
  } else {
    display.log(`Please provide a fileName to run simulation.
    For example: npm start ./src/tests/data/simulation-1`);
  }
} catch(error){
  display.error(`Applicatio error: ${error}`)
}
