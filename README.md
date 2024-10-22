# Text Analyzer API

## Descrição

Este é um projeto simples de API REST que analisa o texto fornecido e retorna estatísticas básicas, como contagem de palavras, sentenças e caracteres. A API é construída usando Spring Boot.

## Funcionalidades

A API possui o seguinte endpoint:

- `POST /api/analyze`: Recebe um texto como entrada e retorna um JSON com:
  - `wordCount`: Número de palavras no texto.
  - `sentenceCount`: Número de sentenças no texto.
  - `characterCount`: Número de caracteres (excluindo espaços) no texto.

### Exemplo de Entrada

```json
{
  "text": "This is a sample text for analysis. It has multiple sentences and words!"
}
