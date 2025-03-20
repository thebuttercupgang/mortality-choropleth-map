# chloropleth-map-revisited
This is a revisit of a previous project: https://github.com/Dference/Project-3-Healthcare
- In that project, deaths were sorted into all, natural, chronic, and non-chronic categories. This revisit resorts the data to highlight COVID deaths. That being said, no matter how the data is summed up, the numbers never add up to the "All Cause" column in the original dataset. There is no indication in the documentation why this is.
- In the original project, much of the calculations were done within the js file. Those calculations will be computed in a python file instead. This makes the js file much simpler
- In this revisit, population data was added to the calculations. For each year, the choropleth map displays each state's number of COVID-19 (U071, Underlying Cause of Death) as a proportion of population rather than a proportion of deaths by all causes. Again, this is because the sums of the numbers never add up to the "All Cause" column in the dataset.
- I would like to eventually add buttons to choose not only the year, but also cause of death so users know what the colors on the map indicate
- All code here is written by me.
