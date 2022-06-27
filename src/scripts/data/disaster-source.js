
import API_ENDPOINT from "../globals/api-endpoint.js";

class DisasterSource {
  static async showDisaster() {
    const response = await fetch('./src/scripts/data/filtered-data.php');
    const responseJson = await response.json();
    return responseJson.data;
  }
}

export default DisasterSource;