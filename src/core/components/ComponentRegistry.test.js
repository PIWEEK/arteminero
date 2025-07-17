import { suite, test, expect } from 'vitest'
import { Component } from './Component.js'
import { ComponentRegistry } from './ComponentRegistry.js'

class SubComponent extends Component {}

class SubSubComponent extends SubComponent {}

suite('ComponentRegistry', () => {
  test('getPrototypeChainUntil', () => {
    /* SubSubComponent */ {
      const component = new SubSubComponent()
      const prototypes = ComponentRegistry.getPrototypeChainUntil(component, Component.prototype)
      expect(prototypes).toHaveLength(3)
      expect(prototypes.includes(SubComponent.prototype)).toBeTruthy()
      expect(prototypes.includes(Component.prototype)).toBeTruthy()
    }
    /* SubComponent */ {
      const component = new SubComponent()
      const prototypes = ComponentRegistry.getPrototypeChainUntil(component, Component.prototype)
      expect(prototypes).toHaveLength(2)
      expect(prototypes.includes(Component.prototype)).toBeTruthy()
    }
  })

  test('getPrototypeChainOf', () => {
    const component = new SubSubComponent()
    const prototypes = ComponentRegistry.getPrototypeChainOf(component)
    expect(prototypes).toHaveLength(5)
    expect(prototypes.includes(SubComponent.prototype)).toBeTruthy()
    expect(prototypes.includes(Component.prototype)).toBeTruthy()
  })

  test('findById', () => {
    const component = new SubSubComponent('test')
    const registry = new ComponentRegistry()
    registry.register(component)

    const registeredComponents = registry.findById('test')
    console.log(registeredComponents)
  })

  test('findByConstructor', () => {
    const component = new SubSubComponent('test')
    const registry = new ComponentRegistry()
    registry.register(component)

    /* SubSubComponent */ {
      const registeredComponents = registry.findByConstructor(SubSubComponent)
      expect(registeredComponents).toHaveLength(1)
      expect(registeredComponents.includes(component)).toBeTruthy()
    }
    /* SubComponent */ {
      const registeredComponents = registry.findByConstructor(SubComponent)
      expect(registeredComponents).toHaveLength(1)
      expect(registeredComponents.includes(component)).toBeTruthy()
    }
    /* Component */ {
      const registeredComponents = registry.findByConstructor(Component)
      expect(registeredComponents).toHaveLength(1)
      expect(registeredComponents.includes(component)).toBeTruthy()
    }
  })

  test('findByIdAndConstructor', () => {

  })
})
