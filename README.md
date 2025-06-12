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
   
## Correções dos erros iniciais

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

## Relatório de Correção de Bugs
Detalhamento dos bugs identificados pelo time de QA, com suas causas e as soluções aplicadas.

Bug 1: Tarefa sendo adicionada duas vezes ao clicar no botão “Salvar”

- Causa: No método responsável por salvar uma nova tarefa, a linha que adiciona a tarefa (`this.todoService.addTodo(newTodo);`) estava duplicada. 
- Solução: Removi a linha duplicada, garantindo que a tarefa seja adicionada apenas uma vez por clique no botão "Salvar".

Bug 2: Problema ao adicionar múltiplas tarefas sem recarregar a página

- Causa: O componente NewTaskComponent utilizava uma variável count para limitar o número de tarefas adicionadas. Após o primeiro cadastro, count era incrementado e bloqueava a execução da função addTask(), impedindo novas adições sem recarregar a página.
- Slução: Removi a variável count e a lógica condicional que impedia múltiplos envios. A função addTask() agora permite adicionar quantas tarefas o usuário desejar, sem necessidade de recarregar a página.

Bug 3: Texto do botão “Clear All” não estava em português

- Causa: O texto do botão responsável por limpar todas as tarefas estava em inglês ("Clear All"), causando inconsistência na interface para usuários que esperam a aplicação em português.
- Solução: Atualizei o valor da variável para o texto em português “Limpar Todas as Tarefas”, garantindo consistência no idioma da interface e melhor experiência para o usuário.

Bug 4: Texto do botão “Exibir Tarefas Concluídas” não refletia a ação executada

- Causa: O botão mostrava o texto baseado no estado atual (showCompletedTasks), em vez de indicar o que aconteceria ao clicar.
- Solução: A condição foi ajustada para que o texto do botão indique corretamente a ação que será executada (exibir ou ocultar tarefas concluídas).

Bug 5: Botão “Ocultar Tarefas Concluídas” exibia as tarefas ao invés de ocultar

- Causa: A lógica da condição estava invertida, fazendo com que o botão executasse a ação contrária à esperada.
- Solução: A mesma correção aplicada no Bug 4 resolveu este caso, ajustando a lógica e o texto exibido no botão para garantir que a ação corresponda à expectativa do usuário.

Bug 6: Limpar Tarefas Concluídas" sem confirmação

- Causa: Ao clicar no botão “Limpar Tarefas Concluídas”, a exclusão era realizada imediatamente, sem confirmação do usuário.
- Solução: Foi implementada uma janela de confirmação (confirm()) para solicitar a autorização do usuário antes de excluir as tarefas concluídas.

Bug 7: Botão “Limpar Tarefas Concluídas” estava removendo tarefas não concluídas

- Causa: O filtro aplicado no método clearCompletedTasks() estava mantendo apenas as tarefas com completed === true, ou seja, removendo as não concluídas.
- Solução: O filtro foi invertido para manter apenas as tarefas com completed === false, garantindo que apenas as tarefas concluídas sejam removidas.

Bug 8: O botão “Editar” não está funcional

- Causa: O botão "Editar" estava presente na interface, mas sem realizar a ação esperada de permitir a edição da tarefa. O comportamento esperado era: preencher o campo de título com o texto da tarefa selecionada e, ao clicar em "Salvar", atualizar a tarefa existente.
- Solução: 
   - Foi adicionada uma referência local (#taskForm) ao componente de criação de tarefas (<app-new-task>) para possibilitar o controle externo do formulário.
   - Foi implementado o método startEditing(todo: Todo) no componente, que:
     -  Preenche o campo de input com o título da tarefa selecionada;
     -  Armazena o ID da tarefa, ativando o modo de edição;
     -  Ao clicar em “Salvar”, chama o método updateTodo() ao invés de addTodo() caso esteja editando;
  - Após salvar, o formulário é limpo e o modo de edição é desativado, permitindo a adição de novas tarefas normalmente.
  
Bug 9: O botão “Editar” estava desalinhado visualmente

  - Causa: Os botões estavam fora de um contêiner comum e sem espaçamento adequado, o que resultava em desalinhamento visual.
  - Solução: Foi criada uma div contêiner para agrupar os botões "Editar" e "Remover". Em seguida, foi aplicada uma margin ao botão "Editar" para garantir espaçamento entre os dois, garantindo alinhamento e uma interface mais limpa e organizada.

Bug 10: O botão “Remover” não possui destaque visual apropriado para uma ação destrutiva

- Causa: Ausência de estilização diferenciada para o botão responsável por excluir tarefas.
- Solução: A cor do botão foi alterada para vermelho, seguindo a convenção de UI para indicar ações destrutivas e alertar visualmente o usuário.

Bug 11:  Lista de tarefas não apresenta barra de rolagem

- Causa: Quando o número de tarefas ultrapassava a altura visível do painel, as tarefas adicionais não podiam ser visualizadas, pois não havia barra de rolagem.
- - Solução: Foi aplicado overflow-y: auto e um max-height apropriado ao container da lista de tarefas, permitindo que a barra de rolagem apareça automaticamente quando necessário. Isso garante que todas as tarefas sejam acessíveis ao usuário.

Bug 12: Salvamento sem título adicionava tarefa em branco

- Status: Já resolvido anteriormente
- Causa: Ausência de validação no campo de entrada permitia o envio de tarefas sem título.
- Solução: A validação if (!this.newTaskTitle.trim()) return; foi implementada durante a resolução do bug 8, impedindo o envio de tarefas com campo vazio.

Bug: 13: Campo com apenas espaços adiciona tarefa em branco

- Status: Já resolvido anteriormente.
- Causa: O campo aceitava entradas contendo apenas espaços.
- Solução: O método trim() na verificação if (!this.newTaskTitle.trim()) return; também impede que entradas com apenas espaços sejam salvas.

## Relatório de Implementação de Melhorias 

Melhoria 1: Implementar um botão “Ordenar de A a Z”

- Abordagem técnica: Foi criado um novo método sortTodosAZ() que utiliza a função localeCompare() para ordenar a lista todos com base no título da tarefa, respeitando a ordem alfabética da língua portuguesa. Um botão foi adicionado à interface para acionar esse método.
- Bibliotecas utilizadas: Nenhuma biblioteca externa foi usada. A ordenação foi feita utilizando recursos nativos do JavaScript.

Melhoria 2: Adicionar tarefa ao pressionar a tecla Enter

- Abordagem técnica: Foi adicionado o evento (keydown.enter)="submitTask()" ao campo de input do formulário de nova tarefa. Com isso, ao pressionar a tecla Enter enquanto o campo está focado, o método submitTask() é executado, permitindo a adição da tarefa sem a necessidade de clicar no botão "Salvar".
- Bibliotecas Utilizadas: Nenhuma biblioteca externa foi utilizada. A funcionalidade foi implementada com recursos nativos do Angular e JavaScript.

Melhoria 3: Permitir a adição de múltiplas tarefas de uma só vez

- Abordagem técnica: Foi modificada a função submitTask() no componente de criação de tarefas (NewTaskComponent) para aceitar múltiplas tarefas separadas pelo caractere |. O conteúdo do campo de texto é dividido com .split('|'), cada segmento é limpo com .trim() e filtrado para remover entradas vazias. Em seguida, cada título válido é transformado em uma nova tarefa (Todo) e adicionada à lista por meio do TodoService.
- Bibliotecas utilizadas: Nenhuma biblioteca externa foi utilizada. A implementação foi feita utilizando apenas funcionalidades nativas do JavaScript (métodos de string e array).

Melhoria 4: Implementar um filtro para impedir a criação de tarefas com palavras ofensivas no campo "Título da Tarefa".

- Abordagem técnica:
    - Foi utilizado a biblioteca bad-words para filtrar palavras ofensivas.
    - Foi criada uma lista personalizada de palavras ofensivas em português, armazenada no array badWords.
    - A função submitTask():
      - Divide o título da tarefa em múltiplos títulos (caso o caractere | seja usado).
      - Verifica se algum dos títulos contém palavras ofensivas com filter.isProfane(title).
      - Se encontrar, exibe um alert() com a mensagem: "Não é permitido cadastrar tarefas com palavras obscenas." e impede o cadastro.
- Bibliotecas utilizadas: bad-words

Melhoria 5: Adicionada a funcionalidade de exportar a lista de tarefas visíveis (filtradas) para um arquivo PDF, permitindo ao usuário salvar ou imprimir sua lista.

- Abordagem técnica:
  - Utilizou-se a biblioteca jsPDF.
  - Criado o método exportToPDF() que:
  - Inicia um novo documento PDF.
  - Define o título "Lista de Tarefas" no topo.
  - Percorre a lista de tarefas filtradas (filteredTodos()), numerando cada uma e indicando seu status ([Concluída] ou [Pendente]).
  - Cuida do espaço vertical (y) e adiciona uma nova página automaticamente se necessário.
  - Salva o arquivo com o nome lista-de-tarefas.pdf.

- Bibliotecas utilizadas: jsPDF

Melhoria 6: 
