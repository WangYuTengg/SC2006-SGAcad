import { createStudySpot } from "../controllers/studyspots.js";

fetch("https://eservice.nlb.gov.sg/rss/libraries")
  .then(response => {
    // Check if the response was successful
    if (response.ok) {
      return response.text();
    } else {
      throw new Error(`HTTP error: ${response.status}`);
    }
  })
  .then(xmlString => {
    // Define regular expressions to match the individual items in the RSS feed
    const itemRegExp = /<item>([\s\S]*?)<\/item>/g;
    const titleRegExp = /<title[^>]*>(.*?)<\/title>/;
    const descriptionRegExp = /<description[^>]*>([\s\S]*?)<\/description>/;
    const libraryImageRegExp = /<libraryImage[^>]*>(.*?)<\/libraryImage>/;
    const addressRegExp = /<address[^>]*>(.*?)<\/address>/;
    const georssPointRegExp = /<georss:point[^>]*>(.*?)<\/georss:point>/;

    // Extract the individual items from the RSS feed
    let items = xmlString.match(itemRegExp);
    let counter = 100;
    items.forEach(item => {
      // Extract the title, description, libraryImage, and georss:point elements from the item
      let titleMatch = item.match(titleRegExp);
      let descriptionMatch = item.match(descriptionRegExp);
      let libraryImageMatch = item.match(libraryImageRegExp);
      let addressMatch = item.match(addressRegExp);
      let georssPointMatch = item.match(georssPointRegExp);

      let title = titleMatch ? titleMatch[1] : "Untitled";
      let description = descriptionMatch ? descriptionMatch[1] : "";
      let libraryImage = libraryImageMatch ? libraryImageMatch[1] : "";
      let address = addressMatch ? addressMatch[1] : "";
      let georssPoint = georssPointMatch ? georssPointMatch[1] : "";

      // Print the extracted data
      console.log(title);
      console.log(description);
      console.log(libraryImage);
      console.log(address);
      console.log(georssPoint);

      //add the data into database
      // const data = {
      //   spotId: counter,
      //   name: title,
      //   description: description,
      //   picturePath: libraryImage,
      //   location: {
      //     address: address,
      //     type: "Point",
      //     coordinates: [georssPoint]
      //   }
      // };
      // createStudySpot(data);
      // counter++;
    });
  })
  .catch(error => {
    console.error(`Network error: ${error.message}`);
  });