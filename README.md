# Bem-vindo ao BoraUp Challenge 👋

Este é um projeto **React Native** desenvolvido com **Expo** e **Expo Router**, criado usando `create-expo-app`.


## 🚀 Como começar

Siga os passos abaixo após clonar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

Certifique-se de que você tem o **Node.js** e o **Yarn** instalados em sua máquina.

### 1. Instalar dependências

Acesse o diretório do projeto e instale as dependências:

```bash
yarn install
```

### 2. Executar a aplicação
#### **Expo Go** (RECOMENDADO)
 - Prepare as variáveis de ambiente
```bash
cp .env.example .env
```

 - Execute a aplicação e abra no dispositivo que preferir

```bash
yarn dev | npx expo start --go
```

#### **Build APK** (Esta opção pode conter limitações pois contém um binário incompleto)
![App APK](https://github.com/JairFsl/boraup-challenge/blob/main/src/assets/images/APK/qr-code-apk.jpeg)

 - [Link da build](https://expo.dev/accounts/jairfsl/projects/BoraUp/builds/1a0493a6-21b4-49a5-8fd2-83d8682cdaae)


## Organização das pastas

A estrutura de navegação do app utiliza o **File-Based Routing**, onde cada arquivo dentro da pasta `app/` define uma rota na sua aplicação, simplificando o gerenciamento de telas e a criação de Deep Links.

Porém para facilitar envios de updates de baixa prioridade eu gosto separar as páginas que serão acessadas pelos usuários na pasta `pages/`.
Deixando apenas a responsabilidade de organização das rotas para a pasta `app/`

Para permitir os testes via **Expo Go** alterei o hook `useKeyboardControll` para um conjunto de 'listeners'. Isso prejudica a performance do app porém quebra o galho.

