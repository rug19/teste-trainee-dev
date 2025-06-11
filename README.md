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

- Causa: O arquivo `package.json` não possuía o script `start` definido, o que impedia o comando de saber como iniciar a aplicação Angular.

- Solução: Incluí o script `"start": "ng serve"` no bloco `"scripts"` do `package.json`, permitindo a execução da aplicação com `npm start`.

2. Nome incorreto da classe HeaderComponent

- Causa: O nome da classe exportada no arquivo `header.component.ts` estava escrito incorretamente como `HeadeComponent`, o que impedia sua importação correta no `AppModule`.

- Solução: Corrigi a digitação da classe exportada, renomeando de `HeadeComponent` para `HeaderComponent`, o que normalizou o import e o uso do componente na aplicação.

3. Erro de injeção do TodoService no NewTaskComponent

- Causa: O erro foi causado pela ausência da importação do serviço `TodoService` no arquivo `new-task.component.ts`. 

- Solução: Foi adicionada a importação do `TodoService` no arquivo `new-task.component.ts`. 

4. FontAwesome não encontrado

- Causa: A biblioteca `@fortawesome/fontawesome-free` estava sendo referenciada no `angular.json`, mas não havia sido instalada, o que impedia a aplicação de compilar.

- Solução: Instalei a dependência com `npm install @fortawesome/fontawesome-free`, permitindo que o Angular encontrasse os arquivos CSS e finalizasse a build com sucesso.



