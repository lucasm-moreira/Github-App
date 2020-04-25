'use strict'

import React, { PropTypes } from 'react'

const Repos = ({className, title, repos}) => (
    <div className={className}>
        <h2>{title}</h2>
        <ul>
            {repos.map((repo, index) =>(
                <li key={index}>
                    <a href={repo.link}>{repo.name}</a>
                </li>
            ))}        
        </ul>
    </div>
)

//Se não for passado o valor da prop, o padrão será este
Repos.defaultProps = {
    className: '',
}

//Quais os tipos de propriedades que serão passadas e se é obrigatório passar como parâmetro
Repos.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    repos: PropTypes.array
}

export default Repos