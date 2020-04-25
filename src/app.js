
'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content'
import ajax from '@fdaciuk/ajax'

//Componente principal da aplicação, é statefull, smart, container. Não é stateless, dumb, presentation
class App extends Component {
  constructor() {
    super()
    this.state = {
      userinfo: null,
      repos: [],
      starred: [],
      isFetching: false
    }
  }

  //Método para montar as possíveis url para request no github
  getGitHubApiUrl (username, type) {
    const internalUsername = username ? `/${username}` : ''
    const internalType = type ? `/${type}` : ''
    return `https://api.github.com/users${internalUsername}${internalType}`
  }

  //Método passado como propriedade para o compoente AppContent, que passará para o componente Search
  //Utiliza o método onKeyUp pois é um input do tipo controlado, captura o valor digitado por meio do value = e.target.value
  //Se o valor digitado for 13 (valor do ENTER) faz uma requisição ajax para api do github, utilizando o valor digitado como parâmetro na url
  //Usa o método de callback then passando como parâmetro o resultado da requisição ajax e seta o estado da aplicação com as propriedades do retorno da requisição (result)  
  //Objeto de evento 'e' é sintético, não é o mesmo do navegador. Trabalha de forma síncrona, se precisar utilizar de forma assíncrona é preciso atribuir ele a uma variável
  handleSearch (e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13    

    if (keyCode === ENTER) {  
      this.setState({ isFetching: true })
        ajax().get(this.getGitHubApiUrl(value))
        .then((result) => {
            this.setState({
              userinfo: {
                username: result.name,
                photo: result.avatar_url,
                login: result.login,
                repos: result.public_repos,
                followers: result.followers,
                following: result.following
              },
              repos: [],
              starred: []
            })
        })
        .always(() => this.setState({ isFetching: false }))
    }
  }

  //Função que retorna função
  //[type] nomeia a propriedade do objeto com o parâmetro recebido  
  getRepos (type) {
    return (e) => {
      const username = this.state.userinfo.login
      ajax().get(this.getGitHubApiUrl(username, type))
      .then((result) => {
        this.setState({
          [type]: result.map((repo) => ({
              name: repo.name,
              link: repo.html_url
          }))
        })
      })
    }
  }

  //handleSearch recebe arrow function com parâmetro 'e' porque precisa pegar o que está sendo digitado no evento
  //getRepos e getStarred não tem arrow function e nem recebe o 'e' como parâmetro porque o parâmetro passado é sempre o mesmo, repos ou starred
  render () {
    return (
      <AppContent 
      userinfo={this.state.userinfo}
      repos={this.state.repos}
      starred={this.state.starred}
      isFetching={this.state.isFetching}
      handleSearch={(e) => this.handleSearch(e)}
      getRepos={this.getRepos('repos')}
      getStarred={this.getRepos('starred')}
      />
    )
  }
}

export default App