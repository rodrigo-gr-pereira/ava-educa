# AVA-EDUCA+ 🎓

O **AVA-EDUCA+** é um Ambiente Virtual de Aprendizagem onde o usuário cadastrado pode visualizar e acompanhar os cursos nos quais está matriculado. O projeto resolve o problema de centralização de informações de matrículas e cadastro, oferecendo uma interface web intuitiva e responsiva para que gestores possam registrar novos alunos, listar os cursos disponíveis.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as principais tecnologias web de front-end, aplicando boas práticas de desenvolvimento e estruturação de código:

* **HTML5**: Estruturação semântica das páginas e formulários de cadastro.
* **CSS3**: Estilização completa da interface de utilizador.
* **Design Responsivo & Mobile First**: Adaptação fluida para dispositivos móveis (até 768px) e ecrãs maiores utilizando Media Queries.
* **Layout Moderno**: Utilização intensiva de CSS Grid e Flexbox para o alinhamento de cartões de cursos e campos de formulário.
* **Mídia Fluida e Unidades Relativas**: Uso de `rem`, `%`, `vw`/`vh` e `object-fit` para garantir que imagens e componentes visuais não quebrem o layout.
* **JavaScript (ES6+)**: Implementação da lógica de negócio e interatividade da aplicação.
* **Programação Assíncrona**: Utilização de `Promises` e `async/await` para simular o carregamento e a filtragem de dados.
* **Persistência de Dados**: Uso de `LocalStorage` para armazenar a listagem de cursos e os dados dos alunos localmente no navegador, dispensando temporariamente um backend.

---

## 📦 Estrutura do Projeto

```text
ava-educa-plus
┣ 📂 css
┃ ┗ 📜 style.css              # Estilos globais, responsividade e layout
┣ 📂 js
┃ ┣ 📂 dados
┃ ┃ ┗ 📜 listagem-cursos.js   # Mock de dados iniciais dos cursos
┃ ┣ 📜 app.js                 # Lógica principal de inicialização
┃ ┗ 📜 cursos.js              # Funções assíncronas (Promises) e filtros
┣ 📂 assets
┃ ┗ 📜 image.png              # Imagens, ícones e recursos visuais
┣ 📜 index.html               # Dashboard e listagem de cursos
┣ 📜 cadastro.html            # Página com o formulário de registo de alunos
┗ 📜 README.md                # Documentação do projeto
```

---

## 🔧 Como Executar

Por ser um projeto focado exclusivamente no ecossistema de Front-end (Client-side), a sua execução é simples e não exige a instalação de dependências complexas.

1. **Faça o clone deste repositório na sua máquina local:**
   ```bash
   git clone [https://github.com/seu-usuario/ava-educa-plus.git](https://github.com/rodrigo-gr-pereira/ava-educa.git
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd ava-educa-plus
   ```

3. **Abra o arquivo `index.html` diretamente no seu navegador de preferência.**

💡 **Recomendação:** Para ter uma melhor experiência e evitar problemas com políticas de CORS ao importar módulos JavaScript (`type="module"`), utilize a extensão **Live Server** do VS Code ou um servidor local simples, como:
```bash
# Usando Node.js
npx serve

# Ou usando Python
python -m http.server
```

---

## 🔮 Melhorias Futuras

Embora o sistema seja totalmente funcional, existem várias oportunidades de evolução mapeadas para as próximas versões:

* **Integração com Backend e Base de Dados**: Substituir o `LocalStorage` por uma API REST (ex: Node.js/Express) conectada a uma base de dados real (PostgreSQL ou MongoDB).
* **Autenticação de Utilizadores**: Implementar um sistema de login seguro para separar o acesso entre "Administradores" (que gerem cursos/alunos) e "Alunos" (que apenas visualizam os seus cursos).
* **Validação Avançada de Formulários**: Adicionar validações complexas em tempo real nos campos de CPF (formato brasileiro) ou NIF (português) e Data de Nascimento no formulário de registo.
* **Feedback Visual Completo**: Adicionar Toasts ou Modais estilizados de sucesso e erro ao interagir com as Promises do JavaScript.
