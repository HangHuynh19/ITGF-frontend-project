## Breweries App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

A simple e-commerce website using the API endpoint from [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/). The website can be viewed [here](https://grandeur-baazard-e-commerce-website.onrender.com/).

#### Table of content

- [Technologies](#technologies)
- [Project structure](#project-structure)
- [Getting started](#getting-started)

#### Technologies <a name="technologies"></a>

- SASS
- React
- TypeScript

#### Project structure <a name="project-structure"></a>

```
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── logo.png
│   ├── classes
│   │   └── CustomError.ts
│   ├── components
│   │   ├── AddProductForm.tsx
│   │   ├── CartButton.tsx
│   │   ├── CartItem.tsx
│   │   ├── CategoryPicker.tsx
│   │   ├── EditProductForm.tsx
│   │   ├── EditProfileForm.tsx
│   │   ├── Header.tsx
│   │   ├── LoginForm.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductListItem.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── Search.tsx
│   │   ├── SideMenu.tsx
│   │   ├── SortConditionPicker.tsx
│   │   └── UserAccount.tsx
│   ├── contexts
│   │   └── MainContext.tsx
│   ├── graphql
│   │   ├── apiCalls.ts
│   │   └── queries.ts
│   ├── hooks
│   │   ├── useAppDispatch.ts
│   │   ├── useAppSelector.ts
│   │   └── useInputHook.ts
│   ├── index.css
│   ├── index.tsx
│   ├── interfaces
│   │   ├── Category.ts
│   │   ├── Product.ts
│   │   ├── ServerResponses.ts
│   │   └── User.ts
│   ├── pages
│   │   ├── CartPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── Root.tsx
│   │   └── SearchPage.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── store
│   │   ├── reducers
│   │   │   ├── authReducer.ts
│   │   │   ├── cartReducer.ts
│   │   │   ├── categoryReducer.ts
│   │   │   ├── productReducer.ts
│   │   │   └── userReducer.ts
│   │   └── store.ts
│   ├── styles
│   │   ├── components
│   │   │   ├── _add-product-form.scss
│   │   │   ├── _cart.scss
│   │   │   ├── _edit-product-form.scss
│   │   │   ├── _form.scss
│   │   │   ├── _header.scss
│   │   │   ├── _product-detail.scss
│   │   │   ├── _product-list.scss
│   │   │   ├── _profile.scss
│   │   │   └── _register-form.scss
│   │   ├── styles.scss
│   │   └── variables
│   │       ├── _colors.scss
│   │       └── _fonts.scss
│   ├── styles.css
│   ├── styles.css.map
│   └── theme
│       └── globalTheme.ts
└── tsconfig.json
```

#### Getting started <a name="getting-started"></a>

- Clone the repository from GitHub using `git clone`
- Run `npm install` to install all dependencies
