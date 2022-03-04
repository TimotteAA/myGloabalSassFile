# 安装

yarn add craco -D

# 在根路径下配置 craco.config.js

```js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@context": path.resolve(__dirname, "./src/context/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@router": path.resolve(__dirname, "./src/router/"),
      "@store": path.resolve(__dirname, "./src/store/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@service": path.resolve(__dirname, "./src/service/"),
    },
  },
};
```

# 同时修改 package.json 中的 scritps 如下：

```js
"scripts": {
"start": "craco start",
"build": "craco build",
"test": "craco test",
"eject": "craco eject"
},
```

# 最后在 tsconfig.json 中配置

```js
"baseUrl": "./src",
"paths": {
    "@assets/*": ["./assets/*"],
    "@context/*": ["./context/*"],
    "@components/*": ["./components/*"],
    "@pages/*": ["./pages/*"],
    "@router/*": ["./router/*"],
    "@store/*": ["./store/*"],
    "@utils/*": ["./utils/*"],
    "@service/*": ["./service/*"]
}
```
