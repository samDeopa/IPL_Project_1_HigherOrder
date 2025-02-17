# IPL Data Analysis Project

## Project Overview

This project analyzes IPL match data to extract meaningful statistics using JavaScript. The goal is to transform raw IPL data into useful insights using various functions and store the results in JSON files.

## Dataset

The dataset used for this project can be downloaded from Kaggle:
[IPL Dataset](https://www.kaggle.com/manasgarg/ipl)

The dataset consists of two files:

- **matches.csv**: Contains information about IPL matches.
- **deliveries.csv**: Contains ball-by-ball data of each match.

## Features Implemented

The project calculates the following statistics:

1. **Number of matches played per year**
2. **Number of matches won per team per year**
3. **Extra runs conceded per team in 2016**
4. **Top 10 economical bowlers in 2015**
5. **Number of times a team won both the toss and the match**
6. **Player with the highest number of Player of the Match awards for each season**
7. **Strike rate of a batsman for each season**
8. **Highest number of times one player has been dismissed by another player**
9. **Bowler with the best economy in super overs**

Each task is implemented as a separate function, and the results are saved as JSON files in the `output` directory.

## Project Structure

```
js-ipl-data-project/
│-- src/
│   │-- server/
│   │   ├── 1-matchesPerYear.js
│   │   ├── 2-matchesWonPerTeamPerYear.js
│   │   ├── ... (other functions)
│   │-- public/
│   │   ├── output/
│   │   │   ├── matchesPerYear.json
│   │   │   ├── ... (other JSON results)
│-- data/
│   ├── matches.csv
│   ├── deliveries.csv
│-- package.json
│-- package-lock.json
│-- .gitignore
│-- README.md
```

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/samDeopa/IPL_Project_1_HigherOrder
   cd IPL_Project_1_HigherOrder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the analysis scripts:
   ```sh
   node src/server/matchesPerYear.js
   ```
   _(Repeat for other scripts)_

## Branches

- Loops - Used for loops for the implementation of the functions.
- main - Used higher order funtions like reduce for the implementation.
