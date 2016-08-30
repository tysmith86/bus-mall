# bus-mall

## Phase 1
- Create an array with all of the image paths
- Create an empty array to store the images
- Make a function that adds an image to the page
  - Create image and list element
  - Get the image ID
  - Store a random number based on the image paths array in a variable (random index)
  - Set another variable equal to a random index of the image path array
  - Set the attribute of the img element to the random path
  - Add the img to the list, and the list to the DOM
- Make a constructor that takes name and path as properties
 - Initialize view and click properties at 0
 - Have each object push itself into the images array
- Iterate through each image path to create all instances of the image constructor
  - Set the name and path properties
- Create and get necessary elements
 - li, image id
 - Need to get the proper node before anything else, and create the list items once before looping through more
  - Add the event listener before creating the first two list items
- Make the click handler function, taking 'e' as an argument
 - clear the list before drawing more images
- Attach list items (images) to the DOM

## Phase 2
- To track the clicks on each image, I need to increment the this.clicks property in each object as they are clicked.
