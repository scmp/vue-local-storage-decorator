# Vue Property Decorator

[![npm](https://img.shields.io/npm/v/vue-local-storage-decorator.svg)](https://www.npmjs.com/package/vue-local-storage-decorator)
[![Build Status](https://travis-ci.com/vip30/vue-local-storage-decorator.svg?branch=master)](https://travis-ci.com/vip30/vue-local-storage-decorator)
[![Coverage](https://codecov.io/gh/vip30/vue-local-storage-decorator/branch/master/graph/badge.svg)](https://codecov.io/gh/vip30/vue-local-storage-decorator)

This library fully depends on [vue-class-component](https://github.com/vuejs/vue-class-component).

## Description

It persist the component data by using local storage

## License

MIT License

## Install

```bash
npm i -S vue-local-storage-decorator
```

## Usage

```typescript
// In main.ts
import VueLocalStorage from 'vue-local-storage-decorator'
Vue.use(VueLocalStorage)

// In component
import { Persist } from 'vue-local-storage-decorator'
@Component
export class DummyComponent extends Vue {
  // It will save in the local storage while the data is changed and will auto resume from local storage in created lifecycle
  @Persist()
  public dummyData: string[] = []
}

```
