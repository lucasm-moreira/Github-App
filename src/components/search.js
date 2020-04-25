'use strict'

import React, { PropTypes } from 'react'

//Método onKeyUp recebe a prop (função) handleSearch. A função será executada quando apertar a tecla enter na barra de pesquisa
//O caminho será Search -> AppContent -> App. Executa a arrow function dentro de <AppContent></AppContent> passando o parâmetro 'e' para a função handleSearch do App 
const Search = ({isDisabled, handleSearch}) => (
    <div className='search'>
        <input type='search' 
        placeholder='Digite o nome do usuário do Github' 
        disabled={isDisabled}
        onKeyUp={handleSearch}
        />
    </div>
)

Search.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    handleSearch: PropTypes.func.isRequired
}

export default Search