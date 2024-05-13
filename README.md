# ecwid-test-project

This project was developed as part of a frontend developer test assignment. It implements the following functionalities as described in the [test assignment](https://github.com/Ecwid/new-job/blob/master/TypeScript.md):
- Home page with products and product categories
- Category page
- Product page
- Cart page

## Installation Instructions
1. Clone the repository
2. Install required dependencies by `npm install` command
3. Create a `.env` file in the project root and provide next variables from test assigment:
```
VITE_ECWID_API_BASE_URL
VITE_ECWID_API_PUBLIC_TOKEN
VITE_ECWID_API_STORE_ID
```
4. Run project in production mode using `npm run build` command or run it in development mode by `npm run dev`

## Notes
Initially UI was designed in English, but since API with provided credentials responds with products in Russian, texts were translated to Russian too.

## Author
Aleksandr Chernosvitov
