import React, { useState } from 'react';
import data from '../Data/plants.json'; // Ajusta la ruta según la estructura de tus archivos
import RecommendationBuilder from './RecommendationBuilder';

const Form = () => {
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const builder = new RecommendationBuilder(answers);
      const recommendation = builder.build();
      setRecommendation(recommendation);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.type === 'radio') {
      setAnswers({ ...answers, [name]: value });
    } else if (e.target.type === 'checkbox') {
      const updatedExtras = checked
        ? [...(answers.extras || []), value]
        : (answers.extras || []).filter((extra) => extra !== value);
      setAnswers({ ...answers, extras: updatedExtras });
    }
  };

  const validateForm = () => {
    // Implementar validación del formulario aquí si es necesario
    return true;
  };

  const handleClear = () => {
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <div className="container">
      <form id="plantForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Where will you place your plant?
            <br />
            <input type="radio" name="light" value="lowLight" required onChange={handleChange} />
            Inside with some indirect light
            <br />
            <input type="radio" name="light" value="mediumLight" required onChange={handleChange} />
            Inside with a lot of indirect light
            <br />
            <input type="radio" name="light" value="outdoor" required onChange={handleChange} />
            Outside
          </label>
        </div>

        <div className="form-group">
          <label>
            Will it receive direct sunlight?
            <br />
            <input type="radio" name="sunlight" value="Yes" required onChange={handleChange} />
            Yes
            <br />
            <input type="radio" name="sunlight" value="No" required onChange={handleChange} />
            No
          </label>
        </div>

        <div className="form-group">
          <label>
            Do you have pets (cats or dogs)?
            <br />
            <input type="radio" name="pets" value="Yes" required onChange={handleChange} />
            Yes
            <br />
            <input type="radio" name="pets" value="No" required onChange={handleChange} />
            No
          </label>
        </div>

        <div className="form-group">
          <label>
            Do you tend to overwater or underwater?
            <br />
            <input type="radio" name="watering" value="Overwater" required onChange={handleChange} />
            Overwater
            <br />
            <input type="radio" name="watering" value="Underwater" required onChange={handleChange} />
            Underwater
            <br />
            <input type="radio" name="watering" value="Neither" required onChange={handleChange} />
            Neither / I don’t know
          </label>
        </div>

        <div className="form-group">
          <label>
            How do you define your style?
            <br />
            <input type="radio" name="style" value="Minimalism" required onChange={handleChange} />
            I like minimalism and material colors
            <br />
            <input type="radio" name="style" value="Decoration" required onChange={handleChange} />
            I like some decoration and simple colors
            <br />
            <input type="radio" name="style" value="BrightColors" required onChange={handleChange} />
            I like a lot of decoration and bright colors
          </label>
        </div>

        <div className="form-group">
          <label>
            Do you want to add any extra elements to your plant?
            <br />
            <input type="checkbox" name="extras" value="MossPole" onChange={handleChange} />
            Moss pole
            <br />
            <input type="checkbox" name="extras" value="Pebbles" onChange={handleChange} />
            Pebbles
            <br />
            <input type="checkbox" name="extras" value="SmallerPlants" onChange={handleChange} />
            Smaller plants
          </label>
        </div>

        <div className="buttons">
          <button type="submit">Obtener tu planta</button>
          <button type="button" onClick={handleClear}>Limpiar</button>
        </div>
      </form>

      {recommendation && (
        <div className="recommendation">
          <h2>{recommendation.name}</h2>
          <p>Soil: {recommendation.soil}</p>
          <p>Pot: {recommendation.pot}</p>
          {recommendation.extras.length > 0 && (
            <p>Extras: {recommendation.extras.join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
