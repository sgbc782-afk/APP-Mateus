# LifeHub

Aplicativo web para organizar tarefas e acompanhar entradas, despesas e orçamento mensal.

## Abrir no celular pela rede Wi-Fi

Esse modo inicia o aplicativo no seu computador e deixa o celular acessá-lo pela mesma rede local.

1. Deixe os arquivos do projeto na mesma pasta e execute `init.bat` no Windows.
2. Se o Windows perguntar, permita o acesso em redes privadas.
3. Conecte o celular à mesma rede Wi-Fi do computador.
4. No celular, abra no navegador o endereço de rede mostrado pelo `init.bat`, por exemplo `http://192.168.0.20:8000/`.

Use o endereço de IP mostrado no computador. `localhost` funciona apenas no próprio computador. Para encerrar o servidor, volte à janela do `init.bat` e pressione `Ctrl+C`.

O script usa Node.js quando disponível e Python 3 como alternativa. Esse endereço local não funciona fora da sua rede Wi-Fi; não configure redirecionamento da porta do roteador para a internet.

## Publicar e obter um link pelo GitHub

O Git guarda e compartilha o código, mas não publica o site sozinho. Para criar um link que abra pela internet, publique o projeto no GitHub e ative o GitHub Pages:

1. Envie os arquivos do projeto para um repositório no GitHub.
2. No repositório, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch que contém os arquivos (por exemplo, `main`) e a pasta `/(root)`, depois salve.
5. Quando a publicação terminar, o GitHub mostrará o link do site, normalmente:

   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

Esse link abre a página inicial. As outras telas ficam disponíveis em:

- `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/app.html`
- `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/fnanceiro.html`

## Sobre os dados

As tarefas e os dados financeiros ficam salvos no armazenamento local do navegador. Eles não são enviados ao GitHub e não são sincronizados entre dispositivos; o celular e o computador terão dados separados.
