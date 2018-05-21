import { createLocalVue, shallowMount } from '@vue/test-utils'
import localStorageHelper from '../src/vue-local-storage-decorator'
import Component from 'vue-class-component'
import Vue, { VNode } from 'vue'
const localVue = createLocalVue()
localVue.use(localStorageHelper)

@Component({
  name: 'dummy'
})
class Dummy extends Vue {
  public dummyHello: string = 'I am dummy'
  render(h: any): VNode {
    return h('div', this.dummyHello)
  }
}

class PersistStoreTest {
  public warningMessage: string = ''
  public wrapper: {
    vm: Dummy | any
  }
  public testLocalStorageString: string = 'local storage'
  public testString: string = 'dummy test'
  constructor() {
    // For retrieve the warning message
    console.warn = (message: string) => {
      this.warningMessage = message
    }
  }
  public shallow() {
    this.wrapper = shallowMount(Dummy, {
      localVue
    })
  }

  public setTestLocalStorage() {
    const stateData = {
      dummy: ['dummyHello']
    }
    localStorage.setItem('persistStateData', JSON.stringify(stateData))
    localStorage.setItem('dummyHello', this.testLocalStorageString)
  }
}

describe('<vue-local-storage-decorator.spec.ts>', () => {
  test('persist data method can be set', () => {
    const t = new PersistStoreTest()
    t.shallow()
    expect(t.wrapper.vm.getPersistData).not.toBe(undefined)
    expect(t.wrapper.vm.persistData).not.toBe(undefined)
    expect(t.wrapper.vm.persistDataWithProvidedKey).not.toBe(undefined)
  })

  test('data can be persisted', () => {
    const t = new PersistStoreTest()
    t.shallow()
    t.wrapper.vm.dummyHello = t.testString
    t.wrapper.vm.persistData('dummyHello')
    expect(t.wrapper.vm.getPersistData('dummyHello')).toBe(t.testString)
  })

  test('js object can be persisted', () => {
    const t = new PersistStoreTest()
    t.shallow()
    t.wrapper.vm.dummyHello = {
      test: t.testString
    }
    t.wrapper.vm.persistData('dummyHello')
    expect(t.wrapper.vm.getPersistData('dummyHello')).toEqual({
      test: t.testString
    })
  })

  test('persist circular js object will show warning message', () => {
    const t = new PersistStoreTest()
    t.shallow()
    const dummyTestObj: any = {
      test: 'aa'
    }
    dummyTestObj.test2 = dummyTestObj
    t.wrapper.vm.dummyHello = dummyTestObj
    t.wrapper.vm.persistData('dummyHello')
    expect(t.warningMessage).not.toBe('')
  })

  test('data can be retrieved while in created lifecycle', () => {
    const t = new PersistStoreTest()
    t.setTestLocalStorage()
    t.shallow()
    expect(t.wrapper.vm.dummyHello).toBe(t.testLocalStorageString)
  })
})
