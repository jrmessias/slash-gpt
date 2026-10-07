// Fonte: learn.chatgpt.com/docs/reference/slash-commands (app desktop) e menu "/" do chat web.
// c = comando, d = o que faz, ex = o que digitar, r = o que acontece

export const categories = [
  {
    id: 'conversa',
    name: 'Conversa',
    desc: 'Criar, organizar e arrumar o histórico dos seus chats.',
    items: [
      { c: '/new', d: 'Abre um chat em branco no mesmo workspace local.', ex: '/new', r: 'Termina uma tarefa e começa a próxima sem carregar o contexto antigo.' },
      { c: '/chat', d: 'Escolhe um chat sem projeto antes de iniciar um novo.', ex: '/chat', r: 'Faz uma pergunta solta sem vincular a nenhuma pasta de código.' },
      { c: '/side', d: 'Abre um chat lateral temporário sem interromper o principal.', ex: '/side Qual a diferença entre rebase e merge?', r: 'Tira uma dúvida rápida enquanto a tarefa principal continua rodando.' },
      { c: '/fork', d: 'Copia um chat local para um novo chat ou worktree.', ex: '/fork', r: 'Testa uma abordagem alternativa sem perder a conversa original.' },
      { c: '/rename', d: 'Renomeia o chat atual.', ex: '/rename Migração do checkout', r: 'Troca o título automático por um nome que você acha depois.' },
      { c: '/pin', d: 'Fixa ou desafixa o chat atual.', ex: '/pin', r: 'Deixa no topo da lista o chat que você usa todo dia.' },
      { c: '/archive', d: 'Arquiva o chat atual.', ex: '/archive', r: 'Tira da lista um chat concluído, sem apagar o histórico.' },
      { c: '/compact', d: 'Compacta o contexto do chat atual.', ex: '/compact', r: 'Libera espaço quando a conversa ficou longa e o modelo começa a esquecer o início.' },
      { c: '/status', d: 'Mostra o ID do chat, o uso de contexto e os limites de uso.', ex: '/status', r: 'Confere quanto contexto ainda resta antes de pedir uma tarefa grande.' },
    ],
  },
  {
    id: 'modelo',
    name: 'Modelo e raciocínio',
    desc: 'Controlar quanto o ChatGPT pensa, planeja e quanto isso custa.',
    items: [
      { c: '/model', d: 'Escolhe o modelo do chat atual.', ex: '/model', r: 'Muda para um modelo mais forte numa tarefa difícil.' },
      { c: '/reasoning', d: 'Define o esforço de raciocínio do chat atual.', ex: '/reasoning', r: 'Sobe o esforço para um bug complicado ou baixa para respostas rápidas.' },
      { c: '/fast', d: 'Liga ou desliga o nível de serviço Fast, quando disponível.', ex: '/fast', r: 'Troca custo por velocidade quando você está esperando a resposta.' },
      { c: '/plan', d: 'Alterna o modo de plano para tarefas com vários passos.', ex: '/plan Migrar o login para OAuth', r: 'Recebe um plano para aprovar antes de qualquer alteração no código.' },
      { c: '/goal', d: 'Define uma meta persistente para o ChatGPT perseguir.', ex: '/goal Deixar todos os testes passando', r: 'O ChatGPT segue trabalhando até cumprir a meta, sem você repetir o pedido.' },
      { c: '/usage', d: 'Abre as configurações de uso e cobrança.', ex: '/usage', r: 'Vê quanto do seu plano já foi consumido neste período.' },
    ],
  },
  {
    id: 'projeto',
    name: 'Projeto e execução',
    desc: 'Escolher onde o trabalho roda: máquina local, nuvem ou worktree.',
    items: [
      { c: '/project', d: 'Escolhe o projeto para novos chats.', ex: '/project', r: 'Aponta o próximo chat para o repositório certo.' },
      { c: '/local', d: 'Roda o chat no projeto local selecionado.', ex: '/local', r: 'Trabalha direto nos arquivos da sua máquina.' },
      { c: '/cloud', d: 'Roda o chat na nuvem, quando a execução em nuvem está disponível.', ex: '/cloud', r: 'Deixa uma tarefa longa rodando sem prender seu computador.' },
      { c: '/cloud-environment', d: 'Escolhe o ambiente de nuvem do chat.', ex: '/cloud-environment', r: 'Seleciona o ambiente com as dependências do seu projeto.' },
      { c: '/worktree', d: 'Roda o chat em um novo Git worktree.', ex: '/worktree', r: 'Isola as alterações numa cópia do repositório, longe do que você está editando.' },
      { c: '/init', d: 'Gera um esqueleto de AGENTS.md para o projeto atual.', ex: '/init', r: 'Cria o arquivo de instruções que o ChatGPT lê antes de mexer no código.' },
      { c: '/ide-context', d: 'Liga ou desliga o contexto compartilhado do IDE.', ex: '/ide-context', r: 'Deixa o ChatGPT enxergar o arquivo e a seleção abertos no editor.' },
    ],
  },
  {
    id: 'revisao',
    name: 'Revisão e permissões',
    desc: 'Revisar alterações e controlar o que o ChatGPT pode acessar.',
    items: [
      { c: '/review', d: 'Inicia o modo de revisão de código para alterações não commitadas.', ex: '/review', r: 'Recebe apontamentos de bugs antes de abrir o pull request.' },
      { c: '/approve', d: 'Aprova uma nova tentativa de uma ação recusada pela revisão automática.', ex: '/approve', r: 'Libera uma ação bloqueada que você confirmou ser segura.' },
      { c: '/mcp', d: 'Abre o status do MCP com os servidores conectados.', ex: '/mcp', r: 'Confere se a integração com Jira ou GitHub está conectada.' },
    ],
  },
  {
    id: 'app',
    name: 'Memória e app',
    desc: 'Preferências, memória e suporte do aplicativo.',
    items: [
      { c: '/memories', d: 'Configura o uso de memória, quando disponível.', ex: '/memories', r: 'Decide o que o ChatGPT pode lembrar entre conversas.' },
      { c: '/pet', d: 'Chama ou guarda o mascote da área de trabalho.', ex: '/pet', r: 'Esconde o mascote durante uma apresentação.' },
      { c: '/feedback', d: 'Abre o diálogo para enviar feedback e logs.', ex: '/feedback', r: 'Reporta um erro anexando os logs da sessão.' },
    ],
  },
  {
    id: 'web',
    name: 'Chat web',
    desc: 'Atalhos do menu "/" no chat do navegador. A lista muda conforme plano e plataforma.',
    items: [
      { c: '/search', d: 'Faz uma busca na web e cita as fontes na resposta.', ex: '/search preço do dólar hoje', r: 'Obtém informação atual em vez de depender só do treinamento.' },
      { c: '/image', d: 'Gera uma imagem a partir da sua descrição.', ex: '/image logotipo minimalista de uma padaria, tons de azul', r: 'Cria a imagem direto na conversa.' },
      { c: '/research', d: 'Inicia uma pesquisa profunda com navegação em várias etapas e relatório citado.', ex: '/research mercado de energia solar residencial no Brasil', r: 'Recebe um relatório com fontes, sem montar a pesquisa à mão.' },
      { c: '/canvas', d: 'Abre o Canvas para editar texto longo ou código lado a lado.', ex: '/canvas rascunho do relatório trimestral', r: 'Edita o documento junto com o ChatGPT em vez de reescrever o chat inteiro.' },
      { c: '/study', d: 'Ativa o modo de estudo guiado, com perguntas e quizzes.', ex: '/study ensine-me derivadas do zero', r: 'Aprende com perguntas passo a passo, não com a resposta pronta.' },
      { c: '/voice', d: 'Inicia uma sessão de voz com o contexto da conversa atual.', ex: '/voice', r: 'Continua a conversa falando, sem teclado.' },
      { c: '/temporary', d: 'Move a conversa para um chat temporário que não fica salvo no histórico.', ex: '/temporary', r: 'Faz uma pergunta sensível sem deixar rastro no histórico.' },
    ],
  },
]
