import React from 'react';
import PropTypes from 'prop-types';

export default class Print extends React.Component {
  render() {
    const { all } = this.props;
    const { name, rotation_period: rotation, orbital_period: orbita, diameter,
      climate, gravity, terrain, surface_water: surface, population, films, created,
      url, edited,
    } = all;

    return (
      <tr data-testid="list">
        <td><img src={ url } alt="" /></td>
        <td>{edited}</td>
        <td>{name}</td>
        <td>{rotation}</td>
        <td>{orbita}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
        <td>{surface}</td>
        <td>{population}</td>
        <td>{films}</td>
        <td>{created}</td>
      </tr>
    );
  }
}

Print.propTypes = {
  all: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rotation_period: PropTypes.string.isRequired,
    orbital_period: PropTypes.string.isRequired,
    diameter: PropTypes.string.isRequired,
    climate: PropTypes.string.isRequired,
    gravity: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
    surface_water: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    films: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    edited: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
