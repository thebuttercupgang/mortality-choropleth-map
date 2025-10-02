# choropleth-map-revisited
## Purpose
The aim of this project is to identify trends in healthcare outcomes. This project will look at the relationship between healthcare costs and death rates across the United States to find any correlation apparent that could show the following:

- Is there a positive correlation between insurance charges and mortality rates?
- Do higher mortality rates due COVID-19 correlate to an increase in healthcare costs by region?
- What are the most cost friendly states to live in when it comes to healthcare?
- What states have consistently had higher mortality rates?


## NOTE
This is a revisit of a previous project: https://github.com/Dference/Project-3-Healthcare
- In that project, deaths were sorted into all, natural, chronic, and non-chronic categories. This revisit resorts the data to highlight COVID deaths. That being said, no matter how the data is summed up, the numbers never add up to the "All Cause" column in the original dataset. There is no indication in the documentation why this is.
- In the original project, much of the calculations were done within the js file. Those calculations will be computed in a python file instead. This makes the js file much simpler
- In this revisit, population data was added to the calculations. For each year, the choropleth map displays each state's number of COVID-19 (U071, Underlying Cause of Death) as a proportion of population rather than a proportion of deaths by all causes. Again, this is because the sums of the numbers never add up to the "All Cause" column in the dataset.
- I would like to eventually add buttons to choose not only the year, but also cause of death so users know what the colors on the map indicate
- All code here is written by me.

## Conclusions
- West Virginia, Alabama, Kentucky, Mississippi, and Tennessee appear at least twice in the top 5 states with the largest proportion of COVID-19 deaths
- These states are all considered part of the Southeastern United States, which is coincidentally also where insurance charges tend to be higher
- However, there is no documentation in the insurance charges dataset indicating which specific states are considered the Southeast


## Medical Costs Visualizations (IN PROGRESS)
Full Story available to view on Tableau Public:
- [https://public.tableau.com/app/profile/shareen.rahmathulla/viz/MedicalCostsbyRegion/Story1](https://public.tableau.com/app/profile/shareen.rahmathulla/viz/MedicalCostsbyRegion/Story1)
### Data Summary
- The Southeast has the highest mean insurance charges, though the Northeast has the highest median insurance costs
- Smokers have signficantly higher insurance costs compared to non-smokers
- The Southeast and Northeast have a higher percentage of smokers compared to the Southwest and Northwest



## Source References
- “US Health Insurance Dataset” published by Anirban Datta, last updated 2020
    - https://www.kaggle.com/datasets/teertha/ushealthinsurancedataset/data
- “Weekly Provisional Counts of Deaths by State and Select Causes, 2020-2023” published by NCHS, last updated September 27, 2023
    - https://data.cdc.gov/NCHS/Weekly-Provisional-Counts-of-Deaths-by-State-and-S/muzy-jte6/about_data
https://data.cdc.gov/resource/muzy-jte6.json
