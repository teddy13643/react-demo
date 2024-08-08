
import React, { useState } from 'react';

function Counter() {
  // 使用 useState 創建狀態
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      {/* 按鈕點擊時更新狀態 */}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
