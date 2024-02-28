# README


### This project use data of Food Trucks in San Francisco, to help users find the food trucks they like by food more easily.
#

### We can get the json file from https://data.sfgov.org/api/id/rqzj-sfat.json?$query=select%20*%2C%20%3Aid%20, I find the the fooditems field is important so I decide to do something with it.
#

#### Firstly, I save it to Elasticsearch, so in the front end, user can search against the fooditems fields
```
/api/syncToES
```

#
#### Secondly, I parse the fooditems, remove the duplicated ones, so I can send them to frontend for usage, it's like a menu users can choose from.
```
/api/getFoods

// response example
[
  "Water",
  "Brocolli Rabe",
  "chips",
  "Pepper",
  "nachos",
  "Pepsi",
  "7-Up",
  "hot pastas",
  "tea",
  "Everything",
  "Quesadilla",
  ...
]
```
#
#### Thirdly, users can choose from foods from step 2, and  they can also input foods they like, after that they can search from elasticsearch engine with these foods, and best matched items will return
```
/api/getEsFoodTrucks


// post body
{
    "keywords":["egg","sandwiches", "rice"]
}


// response example
[
  {
    "id": "1660622",
    "fooditems": "Corndogs: fried burrito: rice placet: soda: water: sandwiches: soup: noodle plates",
    "locationdescription": "INGALLS ST: CARROLL AVE to DONNER AVE (2600 - 2699)",
    "applicant": "Eva's Catering"
  },
  {
    "id": "1660615",
    "fooditems": "Cold Truck: Burrito: Corn Dog: Salads: Sandwiches: Quesadilla: Tacos: Fried Rice: Cow Mein: Chinese Rice: Noodle Plates: Soup: Bacon: Eggs: Ham: Avacado: Sausages: Beverages",
    "locationdescription": "ORTEGA ST: 18TH AVE to 19TH AVE (1100 - 1199)",
    "applicant": "Eva's Catering"
  },
  ...
]
```
### the returned list will be rendered to the page.

### That's it, thanks for reading!

#

### backend
#### github: https://github.com/Boytobeaman/foodtruck-backend
#### url: https://java.50d.top
#
### frontend
#### github https://github.com/Boytobeaman/foodtruck
#### url: https://foodtruck.50d.top