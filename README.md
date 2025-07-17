# 🍀 sorte.io

**sorte.io** é uma plataforma moderna e intuitiva para criação e participação em sorteios e rifas online. Representada pelo ícone de um **trevo de quatro folhas**, a aplicação oferece uma experiência divertida, confiável e acessível para quem quer testar a sorte — seja organizando ou participando de rifas digitais.

---

## 📚 Sobre o Projeto

Este projeto foi desenvolvido como parte da disciplina de **Desenvolvimento Web** do curso de Engenharia na **Universidade Federal Fluminense (UFF)**.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)

### Backend

-   [Java Spring Boot](https://spring.io/projects/spring-boot)

### Banco de Dados

-   [PostgreSQL](https://www.postgresql.org/)

---

## 🎯 Funcionalidades

-   ✅ Cadastro e login de usuários
-   ✅ Criação de sorteios/rifas com:
    -   Título, descrição e imagem
    -   Definição da quantidade de entradas
    -   Definição do valor por entrada
-   ✅ Listagem de sorteios abertos e finalizados
-   ✅ Compra de entradas por usuários participantes
-   ✅ Sorteio automático e justo de vencedores
-   ✅ Painel pessoal com histórico de sorteios e rifas

---

## 📦 Como rodar o projeto localmente

### Pré-requisitos

-   Node.js v18+
-   Java 17+
-   PostgreSQL rodando localmente

---

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sorte.io.git
cd sorte.io
```

---

### 2. Configure o banco de dados

Crie um banco chamado `sorteio_db` e edite o arquivo:

```properties
# backend/src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sorteio_db
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

---

### 3. Inicialize o Backend

```bash
cd backend
./mvnw spring-boot:run
```

---

### 4. Inicialize o Frontend

```bash
cd frontend
yarn install
yarn dev
```

Acesse o app em: [http://localhost:5173](http://localhost:5173)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** – veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

Desenvolvido por [Gabriel Brevilieri](https://github.com/gabrielbrev)

---

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Crie uma issue ou envie um pull request. 🍀
