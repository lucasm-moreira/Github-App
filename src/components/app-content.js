'use strict'

import React, { PropTypes } from 'react'
import Search from './search'
import UserInfo from './user-info'
import Actions from './actions'
import Repos from './repos'
import App from '../app'

//Componente que fará o gerenciamento da aplicação
const AppContent = ({userinfo, repos, starred, isFetching, handleSearch, getRepos, getStarred}) => (
    //Marcação da Aplicação
    //Passando props no componente Repos
    //Usa !! para converter o valor para booleano na props do componente UserInfo. Se for verdadeiro renderiza, se não não renderiza.
    <div className='app'>
        <Search isDisabled={isFetching} handleSearch={handleSearch}/>
        {isFetching && <div>Carregando...</div>}
        {!!userinfo && <UserInfo userinfo={userinfo} />}
        {!!userinfo && <Actions getRepos={getRepos} getStarred={getStarred} />}
        {!!repos.length && <Repos 
          className='repos' 
          title='Repositórios: '
          repos={repos}
        />}
          {!!starred.length && <Repos 
            className='starred' 
            title='Favoritos: '
            repos={starred}
          />}
    </div>
)

AppContent.propTypes = {
    userinfo: PropTypes.object,
    repos: PropTypes.array.isRequired,
    starred: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    handleSearch: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    getStarred: PropTypes.func.isRequired
}

export default AppContent