## 一个在页面渲染后，能够记住上次滚动位置的组件
注意点：容器的div高度必须固定，不然滚不起来

### ScrollToPostiion.tsx
```ts
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ScrollContext from "@context/ScrollContext";
import { debounce } from "@utils/debounce";

const ScrollToPosition: React.FC<{ thres: number }> = ({ children, thres }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // 数据加载完成的滚动函数
  const scrollTo = () => {
    let scrollY = sessionStorage.getItem(pathname);

    if (scrollY) {
      // 若滚动距离少于thres，则滚动顶部
      const scrollDist = +scrollY < thres ? 0 : Number(scrollY);

      setTimeout(() => {
        window.scrollTo(0, scrollDist);
      }, 0);
    }
  };

  // 当路由发生改变时，监听scroll事件，在sessionStorage里做记录
  useEffect(() => {
    // 回调进行节流
    const scrollCB = debounce(() => {
      // 切换路由时滚动距离为0
      if (window.scrollY > 0) {
        sessionStorage.setItem(pathname, String(window.scrollY));
      }
    }, 300);
    window.addEventListener("scroll", scrollCB);
    return () => {
      // 切换路由时清除监听
      window.removeEventListener("scroll", scrollCB);
    };
  }, [pathname]);

  return (
    <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>
  );
};

export default ScrollToPosition;
```

### 使用
在自定义路由Router中使用这个组件
```index.ts
ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <Router>
        <ScrollToPosition thres={50}>
          <App />
        </ScrollToPosition>
      </Router>
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);
```
### 组件中的使用
```ts
  useEffect(() => {
    if (highQualityAlbums) scrollTo();
    // window.onload = scrollTo;
  }, [highQualityAlbums]);
```
