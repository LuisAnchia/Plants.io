import data from '../Data/plants.json';

class RecommendationBuilder {
  constructor(answers) {
    this.answers = answers;
    this.recommendation = {};
  }

  build() {
    this.addPlant();
    this.addSoil();
    this.addPot();
    this.addExtras();
    return this.recommendation;
  }

  addPlant() {
    const { light, pets } = this.answers;
    let toxic = false;

    if (light === 'lowLight') {
      toxic = pets === 'Yes' ? 'toxic' : 'nonToxic';
    } else if (light === 'mediumLight') {
      toxic = pets === 'Yes' ? 'toxic' : 'nonToxic';
    } else if (light === 'outdoor') {
      toxic = pets === 'Yes' ? 'toxic' : 'nonToxic';
    }

    const plantType = data.plants[light][toxic];
    this.recommendation.name = plantType;
  }

  addSoil() {
    const { sunlight } = this.answers;
    this.recommendation.soil = sunlight === 'Yes' ? 'Composted Soil' : 'Fertilized Soil';
  }

  addPot() {
    const { watering, style } = this.answers;
    let potMaterial = '';
    let potStyle = '';

    if (watering === 'Overwater') {
      potMaterial = 'Clay pot';
      this.recommendation.soil = 'Substitute the soil for the easy drainage soil';
    } else if (watering === 'Underwater' || watering === 'Neither') {
      potMaterial = 'Ceramic pot';
    }

    if (style === 'Minimalism') {
      potStyle = 'Simple pot';
    } else if (style === 'Decoration') {
      potStyle = 'Simple pot decorated';
    } else if (style === 'BrightColors') {
      potStyle = 'Painted pot decorated';
    }

    this.recommendation.pot = `${potMaterial} - ${potStyle}`;
  }

  addExtras() {
    const { extras } = this.answers;
    this.recommendation.extras = [];

    if (extras && extras.length > 0) {
      extras.forEach((extra) => {
        switch (extra) {
          case 'MossPole':
            this.recommendation.extras.push('Moss pole');
            break;
          case 'Pebbles':
            this.recommendation.extras.push('Pebbles');
            break;
          case 'SmallerPlants':
            this.recommendation.extras.push('Smaller plants');
            break;
          default:
            break;
        }
      });
    }
  }
}

export default RecommendationBuilder;
