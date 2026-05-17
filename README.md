# 🏥 MedQueue

## 🎯 Sobre o Desafio
Este projeto foi desenvolvido durante o **#7DaysOfCode** da [Alura](https://www.alura.com.br)! Uma iniciativa de 7 dias de desafios práticos para aprimorar conhecimentos em **JavaScript**, estruturas de dados com a opção de implementar uma interfaçe grafica.

O desafio específico para este projeto foi focado em **Estruturas de Dados**, como parte da iniciativa [7 Days of Code da Alura](https://7daysofcode.io/matricula/estruturas-de-dados).

---

## 💻 Projeto

O **MedQueue** é um projeto educacional desenvolvido em **JavaScript Vanilla**, com foco no estudo de **listas simplesmente encadeadas** aplicadas a uma interface visual de gerenciamento de pacientes.

O objetivo principal é simular uma fila de pacientes organizada por **ordem de chegada**, permitindo cadastrar, listar e remover pacientes por meio de uma estrutura de dados própria, sem depender de arrays como estrutura principal de armazenamento.

O projeto também utiliza uma arquitetura inspirada no padrão MVC, organização modular de arquivos e interface responsiva.

---

## 📌 Objetivo do Projeto

Este projeto foi desenvolvido para praticar:

- Estruturas de dados em JavaScript
- Lista simplesmente encadeada
- Manipulação do DOM
- Separação de responsabilidades com uma arquitetura inspirada no padrão MVC
- Organização modular de arquivos
- Criação de interfaces responsivas com HTML e CSS
- Uso do Vite como ambiente de desenvolvimento

> Este projeto não tem o objetivo de ser um sistema hospitalar real. Trata-se de um MVP educacional para estudo de lógica, estruturas de dados e interface web.

---

## 🚀 Funcionalidades Atuais

- Cadastro de pacientes por formulário modal
- Inserção de pacientes no final da lista
- Listagem dos pacientes por ordem de chegada
- Remoção de pacientes por ID
- Renderização dos pacientes em cards
- Contagem de pacientes por status
- Máscara visual para o CPF dos pacientes
- Menu lateral responsivo
- Interface com filtros visuais por status
- Campo visual de busca
- Layout modularizado com CSS separado por responsabilidade

---

## 🧠 Estrutura de Dados

O projeto utiliza uma **lista simplesmente encadeada** para armazenar os pacientes. Cada paciente é encapsulado dentro de um nó da lista, representado pela classe `PatientNode`. A lista principal é controlada pela classe `PatientLinkedList`.

As operações disponíveis na lista são:

- Inserir paciente
- Remover paciente por ID
- Buscar paciente por ID
- Listar pacientes por ordem de chegada
- Filtrar pacientes por status
- Buscar pacientes por texto
- Verificar o tamanho da lista
- Verificar se a lista está vazia

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma separação de responsabilidades inspirada no padrão MVC:

```
src/
├── controllers/
│   └── PatientController.js
│
├── model/
│   ├── PatientLinkedList.js
│   └── PatientNode.js
│
├── view/
│   └── PatientView.js
│
├── services/
│   └── IndexedDB.js
│
├── css/
│   ├── animations/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── utilities/
│   └── style.css
│
├── assets/
│   └── (imagens e ícones da interface)
│
└── main.js
```

---

## 📂 Responsabilidade dos Principais Arquivos

### `src/main.js`

Arquivo de entrada da aplicação. Importa o CSS principal, instancia o controller e inicializa o sistema.

### `src/controllers/PatientController.js`

Responsável por controlar o fluxo da aplicação, conectando:

- A estrutura de dados
- A interface visual
- As ações de cadastro, listagem e remoção

### `src/model/PatientNode.js`

Define a estrutura de cada nó da lista encadeada. Cada nó armazena:

- Um objeto representando o paciente
- A referência para o próximo nó (`next`)

### `src/model/PatientLinkedList.js`

Implementa a lista simplesmente encadeada utilizada para armazenar e gerenciar os pacientes.

### `src/view/PatientView.js`

Responsável por manipular o DOM, capturar eventos da interface e renderizar os dados na tela.

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Vite
- Git / GitHub

---

## 📜 Instruções

### 1. Clone o repositório

```bash
git clone https://github.com/Livedriven/medqueue.git
```

### 2. Acesse a pasta do projeto

```bash
cd medqueue
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Acesse no navegador

O Vite exibirá um endereço semelhante a:

```txt
http://localhost:5173/
```

---

## 📦 Scripts Disponíveis

| Comando           | Descrição                                        |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Inicia o servidor de desenvolvimento             |
| `npm run build`   | Gera a versão de produção do projeto             |
| `npm run preview` | Executa uma prévia local da versão de produção   |

---

## 🔐 Privacidade dos Dados

O CPF dos pacientes é armazenado internamente em sua forma completa, mas exibido na interface de forma mascarada para preservar a privacidade:

```
***.***.***-00
```

Essa abordagem mantém o dado original na estrutura de dados sem expô-lo integralmente na interface.

---

## 📊 Status dos Pacientes

Os pacientes podem possuir os seguintes status:

| Status           | Descrição                          |
|------------------|------------------------------------|
| `critico`        | Situação de risco imediato à vida  |
| `urgente`        | Necessita de atendimento prioritário |
| `em-observacao`  | Aguardando evolução do quadro      |
| `estavel`        | Situação clínica controlada        |

Os status são utilizados para:

- Exibir cores nos cards de pacientes
- Atualizar os cartões de resumo no painel
- Representar o estado clínico atual na interface

---

## ⚠️ Limitações da Versão Atual

Esta é uma versão inicial do projeto. Algumas funcionalidades existem apenas como estrutura visual ou estão planejadas para versões futuras:

- O campo de busca ainda não está integrado à renderização da lista
- Os filtros visuais ainda não filtram os pacientes na tela
- Os dados não são persistidos após o recarregamento da página
- O serviço de IndexedDB está reservado para implementação futura
- Não há autenticação de usuários
- Não há integração com backend
- Não há testes automatizados

---

## 🧩 Melhorias Futuras

Possíveis evoluções para as próximas versões:

- Integrar a busca de pacientes à renderização
- Integrar o filtro por status à lista exibida
- Persistir dados com LocalStorage ou IndexedDB
- Adicionar testes unitários
- Aprimorar a validação do formulário de cadastro
- Melhorar a acessibilidade dos componentes interativos
- Criar visualização em lista além da visualização em cards
- Adicionar ordenações e filtros combinados
- Refinar a separação de responsabilidades internas da View

---

## 🧪 Finalidade Educacional

O MedQueue foi criado como projeto de estudo para aplicar estruturas de dados em um contexto visual interativo. A proposta é demonstrar como uma **lista simplesmente encadeada** pode gerenciar uma fila de pacientes, reforçando conceitos como:

- Nós e referências entre eles
- Inserção no final da lista
- Remoção por identificador
- Percurso sequencial
- Conversão dos dados para renderização no DOM

---

## 📌 Versão

```
v0.1.0 — Primeiro MVP funcional
```

---

## 📱 Minhas Redes

* GitHub: [Livedriven GitHub](https://github.com/Livedriven)
* LinkedIn: [Adicione seu LinkedIn aqui]

---

## 📌 Observações

Este projeto foi criado com finalidade educacional para praticar:

* Estruturas de dados
* Lista simplesmente encadeada
* Manipulação do DOM
* Organização de código
* Arquitetura Front-end
* Responsividade

---

## 👨‍💻 Autor

Desenvolvido por **Richard Henrique** como projeto de estudo em JavaScript, manipulação do DOM e estruturas de dados.

---

## 📄 Licença

Este projeto está sob a licença [ISC](https://opensource.org/licenses/ISC).
