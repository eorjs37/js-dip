# DIP

```
고수준 모듈은 저수준 모듈에 의존하면 안 되고,
둘 다 추상화에 의존해야 한다.

❌ “구현체를 직접 사용하지 말고”
✅ “규칙(인터페이스/추상화)에 의존하자”
```

## WebClient

```
main.js
 ↓
auth-service
 ↓
api-client
 ↓
errors
 ↓
fetch
```
