import fsPromises from 'fs/promises';
import path from 'path'

export default async  function handler(req, res) {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), 'data.json');
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
//   console.log(jsonData);
  const objectData = (jsonData);
  res.status(250).json({
    success: ` ${(objectData)}`,
  });
  

}
