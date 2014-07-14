electionmap version 2
===========

2012 US election county, socio-economic, and public health data visualization.
Based on the idea that Austin is a blue island in a sea of red politically speaking,
I wanted to find similar counties in the states.  I then wanted to try and explain
why these counties are blue so I added socio-economic and public health data from measureofamerica.org and countyhealthrankings.org.
A report on the visualization, process, and prediction models can be found [here](https://github.com/diegoolano/masters-courses/tree/master/machine-learning/final_project)

To see the visualization in action go to:   www.diegoolano.com/electionmap/

interactivity options
=====================
![Rollover County View](https://raw.github.com/diegoolano/electionmap/master/version2-home.png)

You can rollover a county and below the map, there will appear information providing:
* the county name
* the elecition results in total votes and percentage for winner between democrats and republicans.  if you see red, republicans one, and blue for democrats
* list of cities within county which can be shown/hidden via the blue minus sign infront of the word "cities" 
* a table of socioeconomic data for that county including population, median earnings, income index, education index, 
	ethnic make up, poverty indicators, education attainment, and labor sector areas.  
        If a number appears in blue, that means it is in the top quarter for that indicator amongst all counties, 
        and similarly if a number appears in red, it is in the lower quarter.  
	For instance in the image above, Travis County has an education index (from 1 to 100) of 87.38 which puts it in the top quarter of counties,
	whereas it is only 52% white, which puts it in the lower quarter amongst counties.  In the calculation of whether a number is in a higher or lower quarter,
	its important to keep in mind that each county, regardless of population size, is counted equally thus skewing national averages in favor of showing what typical
	counties look like.   

Clicking on a county will zoom in on the map and highlight the county in yellow.  To zoom back out, just click on the selected yellow county again. 

![Clicking on Blue Islands](https://raw.github.com/diegoolano/electionmap/master/images/blueislands-on.png)

You may also click on any of the column headers to toggle on/off those counties listed in the map.  In the above example, the BLUE ISLANDS header has been selected.

Additionally you may click on individual county names listed in the columns to select/unselect them on the map.

The image below shows the headings for HEAVIEST GOP (90% up) and BLUE STATES being selected.
![HEAVIEST GOP PERCENT](https://raw.github.com/diegoolano/electionmap/master/images/blueislands-heaviest-gop-percentages.png)
![BLUESTATES HEADER CLICKED](https://raw.github.com/diegoolano/electionmap/master/images/blueislands-bluestates.png)
 



