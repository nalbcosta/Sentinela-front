# Sentinel AI - Projeto ProjectLabs

Este é o repositório do **Sentinel AI**, um sistema web para análise de fraudes em tempo real, desenvolvido como projeto em grupo para a disciplina **ProjectLabs**.

--- 

## Descrição

O Sentinel AI é uma aplicação full-stack que permite aos usuários registrar-se, autenticar-se, analisar mensagens suspeitas de fraude e visualizar o histórico de análises. O sistema utiliza uma IA para detecção de fraudes, backend robusto e banco de dados seguro.

## Tecnologias Utilizadas

- **Frontend:** React, React Bootstrap, React Router, SCSS, Axios
- **Backend:** Java Spring Boot (REST API)
- **Banco de Dados:** MySQL
- **IA de Fraude:** Modelo customizado para detecção de fraudes com Python
- **Hospedagem:** Vercel (frontend), Render (backend)

--- 

## Como testar o projeto

- Acesse o frontend: [https://sentinela-front-nine.vercel.app/](https://sentinela-front-nine.vercel.app/)
- API backend: [https://demo-spring-v3.onrender.com](https://demo-spring-v3.onrender.com)

---

## Estrutura do Projeto

- `/src/pages` — Páginas principais (Login, Registro, Chat, Perfil)
- `/src/components` — Componentes reutilizáveis (Sidebar, Loader, AlertMessage, etc)
- `/src/assets` — Imagens e logos
- `/src/main.scss` — Estilos globais
- `.env` — Variáveis de ambiente (URLs das APIs)

--- 

## Funcionalidades

- Cadastro e autenticação de usuários integrados ao backend
- Envio e histórico de mensagens salvos no banco de dados
- Análise de fraude em tempo real via IA
- Edição de perfil do usuário (nome, telefone, senha)
- Loader e alertas visuais para feedback ao usuário
- Interface responsiva e moderna

---

## Integrantes e Responsabilidades

- **Luiz Fernando Brito Ferreira:** Inteligência Artificial de Fraude
- **Lucas Pinheiro Resende:** Backend
- **Natanael do Nascimento Rodrigues:** Backend
- **Heitor Barboza da Silva:** Banco de Dados
- **Nalbert Schwank Costa Santos:** Frontend

## Observações

- O projeto está em desenvolvimento e já possui integração entre frontend, backend e IA.
- Para dúvidas ou sugestões, abra uma issue ou entre em contato com os integrantes.
- Para rodar localmente, configure o arquivo `.env` com as URLs das APIs.

---

Projeto desenvolvido para a disciplina **ProjectLabs**.