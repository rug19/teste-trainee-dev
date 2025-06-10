# Relatório Técnico - Ruan Gomes

## Visão Geral 
O projeto consistia em recuperar e estabilizar uma aplicação Angular para gerenciamento de tarefas, inicialmente entregue de forma incompleta e com diversos erros críticos que impediam sua execução.

Durante o processo, foram diagnosticados e corrigidos os problemas que bloqueavam a inicialização do sistema (npm start), além da resolução de diversos bugs que comprometiam a usabilidade e funcionalidade da aplicação. Também foram implementadas melhorias técnicas no código-fonte, como organização dos componentes, padronização dos serviços e ajustes na navegação, com o objetivo de entregar uma aplicação funcional, estável e intuitiva para os colaboradores da IMTS Group.

## Como Executar a Aplicação

Siga os passos abaixo para clonar, instalar e executar o projeto localmente:

1. **Clone o repositório:**
   
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

3. **Acesse o diretorio do projeto:**
   
   ```bash
   cd nome-do-projeto
4. **Installe as dependências:**
   
   ```bash
   npm install
6. **Acesse no navegador:**
   
   ```bash
   http://localhost:4200
   
## Correções do erros iniciais

1. Ao tentar executar o comando `npm start`, a aplicação não iniciava e o terminal exibia o erro:  
`Missing script: "start"`.

- Causa  
O arquivo `package.json` não possuía o script `start` definido, o que impedia o comando de saber como iniciar a aplicação Angular.

- Solução  
Incluí o script `"start": "ng serve"` no bloco `"scripts"` do `package.json`, permitindo a execução da aplicação com `npm start`.


