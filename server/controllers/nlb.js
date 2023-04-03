const submitSpot = async (data) => {
  const response = await fetch(
    `http://localhost:3001/studyspots/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
}

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
    const faxNumberRegExp = /<faxNumber[^>]*>(.*?)<\/faxNumber>/;
    const georssPointRegExp = /<georss:point[^>]*>(.*?)<\/georss:point>/;

    // Extract the individual items from the RSS feed
    let items = xmlString.match(itemRegExp);
    let counter = 14;
    items.forEach(item => {
      // Extract the title, description, libraryImage, and georss:point elements from the item
      let titleMatch = item.match(titleRegExp);
      let descriptionMatch = item.match(descriptionRegExp);
      let libraryImageMatch = item.match(libraryImageRegExp);
      let addressMatch = item.match(addressRegExp);
      let faxNumberMatch = item.match(faxNumberRegExp);
      let georssPointMatch = item.match(georssPointRegExp);

      let title = titleMatch ? titleMatch[1] : "Untitled";
      let description = descriptionMatch ? descriptionMatch[1] : "";
      let libraryImage = libraryImageMatch ? libraryImageMatch[1] : "";
      let address = addressMatch ? addressMatch[1] : "";
      let postal = address ? address.slice(-6) : "";
      let faxNumber = faxNumberMatch ? faxNumberMatch[1] : "";
      let georssPoint = georssPointMatch ? georssPointMatch[1] : "";

      georssPoint = georssPoint.split(" ").map(Number);
      // Print the extracted data
      // console.log("Counter:", counter);
      // console.log("Name:", title.replace(/<[^>]*>/g, "").trim());
      // console.log("Description:", description.split(".")[0].replace(/<[^>]*>/g, "").trim());
      // console.log("Image url:", libraryImage);
      // console.log("Address:", address.replace(/<[^>]*>/g, "").trim());
      // console.log("Postal Code:", postal);
      // console.log("Phone Number:", faxNumber.replace(/<[^>]*>/g, "").trim());
      // console.log("Coordinates:", georssPoint.trim().replace(" ", ", "));
      // console.log("CoordinatesRAW:", [georssPoint]);
      // console.log("Operating Hours:", operatingHours.replace("<![CDATA[", "").replace("]]>", "").trim());
      // console.log("-------------------------------------------------------------------------------------------");

      //create dataframe
      const data = {
        spotId: counter,
        name: title,
        description: description.split(".")[0].replace(/<[^>]*>/g, "").trim(),
        picturePath: libraryImage,
        isLibrary: true,
        misc: {
          operatingHours : {
            weekdays : "10am - 9pm",
            weekends : "10am - 9pm"
          },
          phoneNumber : faxNumber
        },
        location: {
          address: address,
          postal: postal,
          type: "Point",
          coordinates: georssPoint
        } 
      };
      counter++;
      console.log(data);
      submitSpot(data);
    });
  })
  .catch(error => {
    console.error(`Network error: ${error.message}`);
});
      