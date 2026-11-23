<h1 align="center">🎄 Advento Natalino Infantil Cristão</h1>

<p align="center"><strong>24 dias de fé, brincadeiras e momentos em família</strong></p>

<p align="center">
  🌟 <strong><a href="https://adventonatalino.com.br/">adventonatalino.com.br</a></strong>
</p>

<p align="center">
  <a href="https://adventonatalino.com.br/">
    <img src="assets/noite.webp" width="680" alt="Paisagem noturna natalina usada como fundo do site">
  </a>
</p>

## 🎁 Sobre o projeto

Projeto de portfólio front-end para apresentar um Advento Natalino infantil em PDF. A página mostra como funciona o material, oferece uma prévia das atividades para imprimir em casa e conduz as famílias interessadas ao checkout da Kiwify.

## ✨ O que o site faz

- **Galeria de atividades** — mostra prévias de caça-palavras, jogo dos sete erros, anjinho de algodão e jogo de ligar. Ao selecionar um cartão, o site carrega a imagem em tamanho maior e abre um modal nativo com `<dialog>`.
- **Contagem regressiva** — exibe dias, horas, minutos e segundos até 1º de dezembro de 2026, à meia-noite no horário de Brasília. Quando a data chega, o relógio dá lugar à mensagem de que o Advento começou.
- **Cenário natalino interativo** — a página combina neve animada, deslocamento suave do fundo durante a rolagem e uma estrela que brilha ao ser clicada. O código consulta a preferência de movimento reduzido do dispositivo para os efeitos.
- **Trilha sonora** — um botão permite ligar ou pausar a música de Natal, que toca em loop.
- **Fluxo de compra** — os botões da página levam à oferta. O botão final dispara o evento `advento:checkout-click` e redireciona ao checkout da Kiwify. Em telas menores, uma barra de compra aparece após a abertura e some quando a seção da oferta está visível.

## 🛠️ Como o código está organizado

O site é estático e usa **HTML, CSS e JavaScript puro**.

| Arquivo | Responsabilidade |
| --- | --- |
| [`index.html`](index.html) | Estrutura da página, navegação, galeria, oferta, perguntas frequentes e metadados de SEO e compartilhamento. |
| [`style.css`](style.css) | Identidade visual natalina, layouts responsivos, estilos da galeria e animações. |
| [`app.js`](app.js) | Interações da galeria, controle da música, efeitos de rolagem, contagem regressiva e redirecionamento para o checkout. |
| [`assets/`](assets/) | Ilustrações, prévias em WebP, imagens ampliadas, favicon e trilha sonora. |
| [`robots.txt`](robots.txt) e [`sitemap.xml`](sitemap.xml) | Orientações de rastreamento e indicação da URL canônica aos buscadores. |

## 🖥️ Como rodar localmente

Na raiz do projeto, execute o comando abaixo com o Python 3 instalado. Depois, acesse [localhost:8000](http://localhost:8000).

```bash
python3 -m http.server 8000
```
